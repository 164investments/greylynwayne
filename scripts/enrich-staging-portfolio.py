#!/usr/bin/env python3
"""
Enrich the curated staging-portfolio showcase with real listing photos + Redfin links.

Pipeline per address (see memory: shared/cloudflare-bypass-curl-cffi.md):
  1. DuckDuckGo HTML search `site:redfin.com {address}` -> canonical Redfin URL (+ home id)
  2. Fetch the Redfin property page via Chrome-TLS impersonation (curl_cffi) -> 200
  3. Extract og:image (listing photo), og:title, og:description (beds/baths/sqft)
  4. Download the photo to public/images/staging/{ref}.jpg (self-host; survives listing expiry)
  5. Build a deterministic Zillow deep-link from the address

Input : /tmp/gw_staging_candidates.json  (pulled from the ops Supabase, 88 homes)
Output: src/data/staging-portfolio.json   (the page reads this; failures degrade gracefully)

Re-runnable: skips homes already enriched (photo on disk + entry in output).
Rate-limited (~2.5s/home) to stay polite to DDG + Redfin. ~88 homes ~= 4-5 min.

NOTE (copyright): listing photos are MLS-sourced. Many show GW's own staging work.
Hayden opted into self-hosting; entries are easy to swap/remove via this data file.
"""
import json, os, re, sys, time, html, urllib.parse as up
from curl_cffi import requests

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CAND = "/tmp/gw_staging_candidates.json"
OUT  = os.path.join(ROOT, "src/data/staging-portfolio.json")
IMGDIR = os.path.join(ROOT, "public/images/staging")
os.makedirs(IMGDIR, exist_ok=True)

IMPERSONATIONS = ["chrome131", "chrome124", "chrome120", "safari17_0", "chrome116"]

# DDG's site: search returns the NEAREST indexed Redfin property, which is often a
# *neighbor* (10831 -> 10850, 2393 -> 2425). We MUST verify the resolved URL is the
# exact same house before trusting its photo, or we'd show the wrong home.
DIRS = {"n","s","e","w","ne","nw","se","sw","north","south","east","west"}
SUFFIX = {"st","ave","blvd","rd","dr","ln","ct","pl","ter","way","cir","loop","pkwy","hwy","sts","aly","trl"}

def norm_tokens(street):
    # "2630 Lafave St" -> ("2630", {"lafave"}); "6491C SE Ramona St" -> ("6491", {"ramona"})
    s = re.sub(r'\([^)]*\)', '', street)          # drop "(Lot 11)"
    s = re.sub(r'#.*$', '', s)                     # drop unit
    toks = re.findall(r'[a-z0-9]+', s.lower())
    num = None
    if toks:
        m = re.match(r'(\d+)', toks[0])           # leading digits only -> "6491c" => "6491"
        if m:
            num = m.group(1)
    names = {t for t in toks if not t[0].isdigit() and t not in DIRS and t not in SUFFIX}
    return num, names

def url_matches(url, our_street, our_zip):
    """True only if the Redfin URL is the SAME house (exact number + name + zip)."""
    m = re.search(r'redfin\.com/[A-Z]{2}/[^/]+/([^/]+?)-(\d{5})/home/\d+', url)
    if not m:
        return False
    url_street_slug, url_zip = m.group(1), m.group(2)
    onum, onames = norm_tokens(our_street)
    unum, unames = norm_tokens(url_street_slug.replace("-", " "))
    if our_zip and url_zip and our_zip != url_zip:
        return False
    if onum and unum and onum != unum:            # different house number -> reject
        return False
    if onames and not (onames & unames):          # street names don't overlap -> reject
        return False
    return True

def ddg_redfin_url(addr, our_street, our_zip):
    """Resolve an address to its EXACT canonical Redfin URL via DDG HTML, with backoff."""
    for attempt in range(4):
        sess = requests.Session(impersonate=IMPERSONATIONS[attempt % len(IMPERSONATIONS)])
        try:
            r = sess.post("https://html.duckduckgo.com/html/",
                          data={"q": f"site:redfin.com {addr}"}, timeout=25)
            if r.status_code in (202, 403, 429):          # rate-limited -> back off
                time.sleep(25 + attempt * 25)
                continue
            if r.status_code != 200:
                return None
            hits = re.findall(r'redfin\.com/[A-Z]{2}/[^"&<> ]+?/home/\d+', r.text)
            verified = [h for h in dict.fromkeys(hits) if url_matches("https://www." + h, our_street, our_zip)]
            return ("https://www." + verified[0]) if verified else None
        except Exception:
            time.sleep(8)
    return None

def scrape_redfin(url):
    """Return dict(photo, title, desc) from a Redfin property page, or None."""
    try:
        sess = requests.Session(impersonate="chrome131")
        r = sess.get(url, timeout=25)
        if r.status_code != 200:
            return None
        h = r.text
        def meta(prop):
            m = re.search(r'<meta property="%s" content="([^"]+)"' % re.escape(prop), h)
            return html.unescape(m.group(1)) if m else None
        photo = meta("og:image")
        # reject the placeholder Redfin logo (means no real photo)
        if not photo or "redfin-icon" in photo or "logos/" in photo:
            photo = None
        # Fallback: some listings carry a logo og:image but still have a hero photo in
        # the page (the subject's first bigphoto/genMid). Use it. First one = subject hero.
        if not photo:
            m = re.search(r'https://ssl\.cdn-redfin\.com/photo/\d+/bigphoto/\d+/\d+_\d+\.jpg', h) \
                or re.search(r'https://ssl\.cdn-redfin\.com/photo/\d+/mbpaddedwide/\d+/genMid\.\d+_\d+\.jpg', h)
            if m:
                photo = m.group(0)
        return {"photo": photo, "title": meta("og:title"), "desc": meta("og:description")}
    except Exception:
        return None

def download(photo_url, ref):
    ext = ".jpg"
    path = os.path.join(IMGDIR, f"{ref}{ext}")
    if os.path.exists(path) and os.path.getsize(path) > 5000:
        return f"/images/staging/{ref}{ext}"
    try:
        sess = requests.Session(impersonate="chrome131")
        r = sess.get(photo_url, timeout=30)
        if r.status_code == 200 and len(r.content) > 5000:
            with open(path, "wb") as f:
                f.write(r.content)
            return f"/images/staging/{ref}{ext}"
    except Exception:
        pass
    return None

def zillow_link(street, city, state, zip):
    # Zillow accepts dash-joined address slugs (no encoded commas).
    parts = f"{street} {city} {state} {zip}".strip()
    slug = re.sub(r'[^A-Za-z0-9]+', '-', parts).strip('-')
    return f"https://www.zillow.com/homes/{slug}_rb/"

def redfin_search_link(street, city, state, zip):
    # Fallback when we can't verify an exact property page: Redfin in-site search.
    q = up.quote(f"{street}, {city}, {state} {zip}".strip())
    return f"https://www.redfin.com/?q={q}"

def parse_beds_baths(desc):
    if not desc:
        return None
    m = re.search(r'(\d+)\s*bed', desc, re.I)
    n = re.search(r'(\d+(?:\.\d)?)\s*bath', desc, re.I)
    s = re.search(r'([\d,]+)\s*(?:sq\.?\s*ft|square ?f)', desc, re.I)
    out = {}
    if m: out["beds"] = int(m.group(1))
    if n: out["baths"] = float(n.group(1))
    if s: out["sqft"] = int(s.group(1).replace(",", ""))
    return out or None

def main():
    cands = json.load(open(CAND))
    existing = {}
    if os.path.exists(OUT):
        for e in json.load(open(OUT)):
            existing[e["ref"]] = e

    out = []
    n_photo = 0
    for i, c in enumerate(cands):
        p = c["properties"]
        ref = c["reference_id"]
        street, city = p["street"], p["city"]
        state, zip = p.get("state", "OR"), p.get("zip", "")
        addr = f'{street}, {city}, {state} {zip}'.strip()

        # Skip if we already resolved a VERIFIED photo on a prior run.
        if ref in existing and existing[ref].get("photo") and existing[ref].get("redfin_verified"):
            out.append(existing[ref]); n_photo += 1
            print(f"[{i+1}/{len(cands)}] {ref} cached", flush=True)
            continue

        entry = {
            "ref": ref, "street": street, "city": city, "state": state, "zip": zip,
            "status": c["status"],
            "installed_on": c.get("installed_on"),
            "signed_total_cents": c.get("signed_total_cents"),
            "zillow": zillow_link(street, city, state, zip),
            "redfin": redfin_search_link(street, city, state, zip),
            "redfin_verified": False, "photo": None, "beds_baths": None,
        }

        rf = ddg_redfin_url(addr, street, zip)   # exact-match-verified URL or None
        if rf:
            entry["redfin"] = rf                  # verified -> deep-link straight to the home
            entry["redfin_verified"] = True
            time.sleep(2)
            data = scrape_redfin(rf)
            if data:
                entry["beds_baths"] = parse_beds_baths(data.get("desc"))
                if data["photo"]:
                    local = download(data["photo"], ref)
                    if local:
                        entry["photo"] = local
                        n_photo += 1
        print(f'[{i+1}/{len(cands)}] {ref} {addr[:38]:38} {"VERIFIED" if entry["redfin_verified"] else "search":8} photo={"Y" if entry["photo"] else "-"}', flush=True)
        out.append(entry)
        json.dump(out, open(OUT, "w"), indent=2)  # checkpoint each home
        time.sleep(8)                             # be polite to DDG (avoid the 202 wall)

    json.dump(out, open(OUT, "w"), indent=2)
    print(f"\nDONE: {len(out)} homes, {n_photo} with verified listing photos -> {OUT}", flush=True)

if __name__ == "__main__":
    main()
