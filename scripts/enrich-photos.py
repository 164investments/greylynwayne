#!/usr/bin/env python3
"""
Slow-drip the two things gis-csv cannot give us: the listing photo and the final ask.

`build-listing-index.py` resolves every staged home to its canonical Redfin URL, sale
status, sold price and sold date without touching a detail page. Two fields still live
only on the detail page:

  - `og:image`      the listing cover photo (the page only renders homes that have one)
  - `listingPrice`  the final list price, which is what "sold $X over asking" is measured
                    against. gis-csv carries the SOLD price on a sold row and nothing else,
                    so an over-ask number built from it and a list price captured months
                    earlier would silently ignore any price cut in between. This script is
                    the only thing allowed to set `ask_verified`, because it reads both
                    numbers off the same page in the same request.

Redfin's WAF walls this route after roughly six requests, so the script is built to run
for a long time in the background and be killed and resumed freely: it writes after every
home, skips anything already done, and never overwrites a good value with a failure.

Run: python3 scripts/enrich-photos.py [--pace 45] [--limit N] [--refresh-ask]
"""
import argparse, json, os, random, re, time
from curl_cffi import requests

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(ROOT, "src/data/listing-index.json")
IMGDIR = os.path.join(ROOT, "public/images/staging")
IMPERSONATIONS = ["chrome131", "chrome124", "chrome120", "safari17_0", "chrome116"]
TODAY = time.strftime("%Y-%m-%d")
os.makedirs(IMGDIR, exist_ok=True)


def first(pat, h, flags=0):
    m = re.search(pat, h, flags)
    return m.group(1) if m else None


def fetch(url, max_attempts=4):
    for attempt in range(max_attempts):
        sess = requests.Session(impersonate=IMPERSONATIONS[attempt % len(IMPERSONATIONS)])
        try:
            r = sess.get(url, timeout=30, headers={
                "Referer": "https://www.google.com/", "Accept-Language": "en-US,en;q=0.9"})
        except Exception:
            time.sleep(20 * (attempt + 1))
            continue
        # A block is a 202/403/429 with a ~2KB challenge body. A real page is ~17KB+.
        if r.status_code == 200 and len(r.text) > 20000:
            return r.text
        time.sleep(60 * (2 ** attempt) + random.uniform(0, 15))
    return None


def download(photo_url, dest, referer):
    for imp in IMPERSONATIONS[:3]:
        try:
            r = requests.Session(impersonate=imp).get(
                photo_url, timeout=45, headers={"Referer": referer})
            if r.status_code == 200 and len(r.content) > 8000:
                open(dest, "wb").write(r.content)
                return True
        except Exception:
            pass
        time.sleep(5)
    return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pace", type=float, default=45.0)
    ap.add_argument("--limit", type=int, default=None)
    ap.add_argument("--refresh-ask", action="store_true",
                    help="also re-read homes that already have a photo, to verify the ask")
    args = ap.parse_args()

    homes = json.load(open(INDEX))
    todo = [h for h in homes if h.get("redfin")]
    if not args.refresh_ask:
        todo = [h for h in todo
                if not (h.get("photo") and os.path.exists(os.path.join(ROOT, h["photo"].lstrip("/"))))]
    todo = [h for h in todo if h.get("photo_checked_on") != TODAY]
    if args.limit:
        todo = todo[: args.limit]
    print(f"{len(todo)} homes to enrich (pace {args.pace}s)\n", flush=True)

    got_photo = got_ask = blocked = 0
    for i, h in enumerate(todo, 1):
        page = fetch(h["redfin"])
        if not page:
            blocked += 1
            print(f"[{i}/{len(todo)}] {h['ref']:11} BLOCKED", flush=True)
            time.sleep(args.pace)
            continue
        h["photo_checked_on"] = TODAY

        listp = first(r'"listingPrice":"(\d+)_US_DOLLAR"', page) or \
                first(r'listingPrice\\":\\"(\d+)_US_DOLLAR', page)
        dom = first(r'DaysOnMarket\\?":\\?"(\d+)', page)
        sale = h.setdefault("sale", {}) or {}
        h["sale"] = sale
        if listp:
            sale["list_price_cents"] = int(listp) * 100
            # Both numbers now come off one page in one request, so an over-ask figure
            # built from them is real. Nothing else may set this flag.
            sale["ask_verified"] = bool(sale.get("price_cents"))
            got_ask += 1
        if dom is not None:
            sale["dom"] = int(dom)

        og = first(r'property="og:image"\s+content="([^"]+)"', page) or \
             first(r'content="([^"]+)"\s+property="og:image"', page)
        # Redfin serves its own logo as og:image on photo-withheld listings.
        if og and "redfin.com/stingray/api/logo" not in og and "/logos/" not in og:
            dest = os.path.join(IMGDIR, f"{h['ref']}.jpg")
            if download(og, dest, h["redfin"]):
                h["photo"] = f"/images/staging/{h['ref']}.jpg"
                got_photo += 1

        print(f"[{i}/{len(todo)}] {h['ref']:11} "
              f"{'photo' if h.get('photo') else 'no-photo':8} "
              f"{'ask ' + str((sale.get('list_price_cents') or 0) // 100) if listp else 'no-ask'}",
              flush=True)
        json.dump(homes, open(INDEX, "w"), indent=2)
        time.sleep(args.pace + random.uniform(0, args.pace * 0.4))

    json.dump(homes, open(INDEX, "w"), indent=2)
    print(f"\nDONE: {got_photo} photos, {got_ask} asks verified, {blocked} blocked")


if __name__ == "__main__":
    main()
