#!/usr/bin/env python3
"""
Build the staged-homes listing index from the ops DB + Redfin's gis-csv API.

Replaces the DuckDuckGo -> guess-the-URL -> scrape-the-detail-page resolver in
`enrich-staging-portfolio.py`. That pipeline stopped being viable in 2026-09: Redfin's
WAF now walls the IP after roughly six detail-page loads (a 202 or 429 with a ~2KB
body), which made an 88-home pass take hours and a 230-home pass impossible.

`gis-csv` is a different door and is not throttled the same way - 10 queries in 7.5s,
all 200. It is unauthenticated, capped at 350 rows per query, and accepts a `poly`
bounding box, so we ask it for a small box around each staged address and get back:

    canonical Redfin URL | city | zip | sold price | sold date | beds/baths/sqft

which is everything the old pipeline scraped, minus the listing photo (still detail-page
only, so photos are a separate slow-drip pass) and minus the original list price (sold
rows carry the sold price only - see the over-ask note in enrich-photos).

Addresses reach us from the ops DB with a street and often no city/zip (only the 2026
sheet tab has a city column), so we geocode first to get a point to search around, then
match Redfin's answer back against the address with a strict guard.

Run: python3 scripts/build-listing-index.py [--since 2025-08-01] [--out FILE]
"""
import argparse, csv, io, json, os, re, sys, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ADMIN_ENV = os.path.expanduser("~/greylynwayne-admin/.env.local")
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")
CENSUS = "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress"
GIS = "https://www.redfin.com/stingray/api/gis-csv"
STATUSES = ("renting", "closed", "destaged", "installed")

DIRS = {"n", "s", "e", "w", "ne", "nw", "se", "sw",
        "north", "south", "east", "west", "northeast", "northwest", "southeast", "southwest"}
SUFFIX = {"st", "ave", "blvd", "rd", "dr", "ln", "ct", "pl", "ter", "way", "cir", "loop",
          "pkwy", "hwy", "aly", "trl", "street", "avenue", "road", "drive", "lane", "court",
          "place", "terrace", "circle", "parkway", "highway", "trail", "boulevard"}
DIR_ALIASES = [{"s", "sw"}]        # Portland's 2020 S-quadrant rename; Census still says SW

# Everywhere GW has ever staged, as loose lat/lon boxes: the Portland-Vancouver metro
# and the Willamette Valley run, plus Bend/Sunriver, Hood River and the north coast.
# A geocode landing outside all of these is a wrong-city match, not a staged home.
REGION_BOXES = [
    (44.85, 46.05, -123.35, -122.20),   # Portland metro + SW Washington + valley north
    (43.80, 44.35, -121.65, -121.15),   # Bend / Sunriver / Deschutes
    (45.60, 45.80, -121.70, -121.35),   # Hood River
    (43.95, 44.15, -123.25, -122.95),   # Eugene
    (45.65, 46.25, -124.10, -123.75),   # north coast: Cannon Beach / Astoria / Seaside
    (44.85, 45.10, -124.10, -123.85),   # Lincoln City
]


def IN_REGION(lat, lon):
    return any(a <= lat <= b and c <= lon <= d for a, b, c, d in REGION_BOXES)


def env():
    return dict(re.findall(r'^(\w+)=["\']?([^"\'\n]+)', open(ADMIN_ENV).read(), re.M))


def ops(cfg, path):
    req = urllib.request.Request(
        f"{cfg['NEXT_PUBLIC_SUPABASE_URL']}/rest/v1/{path}",
        headers={"apikey": cfg["SUPABASE_SERVICE_ROLE_KEY"],
                 "Authorization": f"Bearer {cfg['SUPABASE_SERVICE_ROLE_KEY']}"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def parse_street(s):
    """('2113 NE 77th Ave #4') -> ('2113', {'ne'}, {'77th'}). Ordinals are NAMES."""
    s = re.sub(r"\([^)]*\)", "", s)
    s = re.sub(r"#.*$", "", s)
    toks = re.findall(r"[a-z0-9]+", s.lower())
    num = None
    if toks and toks[0][0].isdigit():
        m = re.match(r"(\d+)", toks[0])
        num = m.group(1) if m else None
        toks = toks[1:]
    dirs = {t for t in toks if t in DIRS}
    names = {t for t in toks if t not in DIRS and t not in SUFFIX and not t.isdigit()}
    return num, dirs, names


def dirs_ok(ours, theirs):
    if ours == theirs or not ours or not theirs:
        return True
    return any(ours <= a and theirs <= a for a in DIR_ALIASES)


def same_house(our_street, their_street):
    onum, odirs, onames = parse_street(our_street)
    tnum, tdirs, tnames = parse_street(their_street)
    if not onum or onum != tnum:
        return False
    if not (onames & tnames):
        return False
    return dirs_ok(odirs, tdirs)


def clean_for_geocode(street):
    """Strip the builder/unit decorations the ops sheet carries.

    Rows arrive as '1222 W Sparrow Ave (Lot 31)', '4124 SE Franklin St Cottage 1
    (Cha Cha Cha)', '575 SW Sheridan St #146'. The Census geocoder matches none of
    those - it wants the plain street address, and the unit is irrelevant to the
    point we are searching around anyway.
    """
    s = re.sub(r"\([^)]*\)", " ", street)                       # "(Lot 31)"
    s = re.sub(r"#.*$", " ", s)                                  # "#146"
    s = re.sub(r"\b(?:cottage|unit|apt|apartment|ste|suite|lot|bldg|building)\b[\s.]*[\w-]*",
               " ", s, flags=re.I)
    return re.sub(r"\s+", " ", s).strip(" ,-")


def geocode(street, state_hint):
    url = CENSUS + "?" + urllib.parse.urlencode({
        "address": f"{clean_for_geocode(street)}, {state_hint}",
        "benchmark": "Public_AR_Current", "format": "json"})
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            m = json.load(r)["result"]["addressMatches"]
    except Exception:
        return None
    if not m:
        return None
    c = m[0]["coordinates"]
    parts = [p.strip() for p in m[0]["matchedAddress"].split(",")]
    return {"lat": c["y"], "lon": c["x"], "street": parts[0],
            "city": parts[1].title() if len(parts) > 1 else None,
            "state": parts[2] if len(parts) > 2 else None,
            "zip": parts[-1] if len(parts) > 3 else None}


CAP = 350          # gis-csv truncates at 350 rows, silently
NEAR_CAP = 340


def gis_page(lat, lon, box, sold_days=None, status=None, lo=None, hi=None):
    poly = (f"{lon-box} {lat-box},{lon+box} {lat-box},{lon+box} {lat+box},"
            f"{lon-box} {lat+box},{lon-box} {lat-box}")
    q = {"al": 1, "market": "portland", "num_homes": CAP, "ord": "redfin-recommended-asc",
         "page_number": 1, "poly": poly, "uipt": "1,2,3,4,6", "v": 8}
    if sold_days:
        q["sold_within_days"] = sold_days
    if status:
        q["status"] = status
    if lo is not None:
        q["min_price"] = lo
    if hi is not None:
        q["max_price"] = hi
    req = urllib.request.Request(GIS + "?" + urllib.parse.urlencode(q), headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read().decode("utf-8", "replace")
    except Exception:
        return []
    return [r for r in csv.DictReader(io.StringIO(body)) if r.get("ADDRESS")]


def gis(lat, lon, box=0.004, sold_days=None, status=None, lo=None, hi=None, depth=0):
    """Query gis-csv, splitting by price band until every shard clears the 350 cap.

    A truncated response looks exactly like a complete one - no error, no flag - so an
    inner-Portland box silently drops most of its sales and the address you wanted is
    simply absent. Anything at or near the cap gets split and re-asked.
    """
    rows = gis_page(lat, lon, box, sold_days, status, lo, hi)
    if len(rows) < NEAR_CAP or depth >= 5:
        return rows
    mid = (lo or 0) + ((hi or 4_000_000) - (lo or 0)) // 2
    if hi is not None and mid <= (lo or 0):
        return rows
    time.sleep(0.2)
    return (gis(lat, lon, box, sold_days, status, lo, mid, depth + 1) +
            gis(lat, lon, box, sold_days, status, mid + 1, hi, depth + 1))


def url_of(row):
    for k, v in row.items():
        if k and k.startswith("URL"):
            return v
    return None


MONTHS = {m: i for i, m in enumerate(
    ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"], 1)}


def iso_sold(v):
    """gis-csv writes SOLD DATE as 'June-5-2026'."""
    if not v:
        return None
    m = re.fullmatch(r"([A-Za-z]+)-(\d{1,2})-(\d{4})", v.strip())
    if not m or m.group(1) not in MONTHS:
        return None
    return f"{m.group(3)}-{MONTHS[m.group(1)]:02d}-{int(m.group(2)):02d}"


def cents(v):
    """Redfin sometimes carries a 0 price on withheld/off-market rows - that is 'unknown',
    not 'free', and it must never render as a $0 sale on the page."""
    try:
        n = int(float(v))
    except (TypeError, ValueError):
        return None
    return n * 100 if n > 0 else None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--since", default="2025-08-01", help="earliest installed_on to include")
    ap.add_argument("--out", default=os.path.join(ROOT, "src/data/listing-index.json"))
    ap.add_argument("--limit", type=int, default=None)
    args = ap.parse_args()
    cfg = env()

    sel = "reference_id,status,installed_on,signed_total_cents,properties(street,city,state,zip)"
    projects = ops(cfg, f"projects?select={sel}&installed_on=gte.{args.since}"
                        f"&status=in.({','.join(STATUSES)})&order=installed_on.desc&limit=1000")
    projects = [p for p in projects if (p.get("properties") or {}).get("street")]
    if args.limit:
        projects = projects[: args.limit]
    print(f"{len(projects)} staged homes since {args.since}\n", flush=True)

    out, matched, unmatched = [], 0, 0
    for i, p in enumerate(projects, 1):
        prop = p["properties"]
        street = prop["street"].strip()
        entry = {"ref": p["reference_id"], "street": street, "city": prop.get("city"),
                 "state": prop.get("state"), "zip": prop.get("zip"),
                 "status": p["status"], "installed_on": p["installed_on"],
                 "signed_total_cents": p.get("signed_total_cents")}

        # Prefer the address the ops DB already knows (the 2026 sheet tab carries city +
        # zip). A bare street plus a state is genuinely ambiguous: '407 NW 46th St, WA'
        # geocodes to Seattle, 170 miles from any home GW has ever staged.
        hints = []
        if prop.get("city") and prop.get("state"):
            hints.append(f"{prop['city']}, {prop['state']} {prop.get('zip') or ''}".strip())
        hints += [prop["state"]] if prop.get("state") else ["OR", "WA"]
        g = None
        for hint in hints:
            g = geocode(street, hint)
            if g and (not g["lat"] or IN_REGION(g["lat"], g["lon"])):
                break
            g = None
        if not g:
            entry["match"] = "no-geocode"
            out.append(entry)
            unmatched += 1
            print(f"[{i}/{len(projects)}] {entry['ref']:11} no-geocode  {street}", flush=True)
            continue
        entry.setdefault("city", None)
        entry["city"] = entry["city"] or g["city"]
        entry["state"] = entry["state"] or g["state"]
        entry["zip"] = entry["zip"] or g["zip"]

        # Start tight, widen once. A 0.004 box (~0.3 mi) keeps the 350-row cap far away
        # in dense inner Portland; a listing just outside it (large lots, new plats on
        # the metro edge) is worth a second, wider ask.
        hit = None
        for box in (0.004, 0.012):
            sold = gis(g["lat"], g["lon"], box=box, sold_days=730)
            live = gis(g["lat"], g["lon"], box=box, status=139)
            def ours(rows):
                return [r for r in rows if same_house(street, r["ADDRESS"])
                        and (not entry["zip"] or r["ZIP OR POSTAL CODE"] == entry["zip"])]
            sold_hits, live_hits = ours(sold), ours(live)
            # A 730-day sold window can surface a sale that closed BEFORE we staged the
            # house. A current listing always describes the staging; an older sale does
            # not, so prefer the live row and drop a sale that predates the install.
            fresh = [r for r in sold_hits
                     if not p["installed_on"]
                     or (iso_sold(r.get("SOLD DATE")) or "9999") >= p["installed_on"]]
            hit = next(iter(live_hits or fresh or sold_hits), None)
            if hit:
                break
        if not hit:
            entry["match"] = "no-listing"
            out.append(entry)
            unmatched += 1
            print(f"[{i}/{len(projects)}] {entry['ref']:11} no-listing  {street}", flush=True)
            time.sleep(0.3)
            continue

        # `STATUS` is the ONLY trustworthy sold signal. In the active feed Redfin sets
        # SALE TYPE to 'PAST SALE' and fills SOLD DATE with the home's *previous* sale
        # (2009, 2002) while STATUS says 'Pending' and PRICE is the CURRENT asking price.
        # Trusting SALE TYPE would print "Sold $830K, June 2009" on a home under contract
        # today, at a price that is actually its ask.
        status = (hit.get("STATUS") or "").strip()
        sold = status.lower() in ("sold", "closed")
        entry.update({
            "match": "listing",
            "redfin": url_of(hit),
            "redfin_verified": True,
            "listing_city": hit.get("CITY"),
            "listing_zip": hit.get("ZIP OR POSTAL CODE"),
            "beds_baths": {"beds": hit.get("BEDS") or None, "baths": hit.get("BATHS") or None,
                           "sqft": hit.get("SQUARE FEET") or None},
            "sale": {
                "status": status or None,
                "price_cents": cents(hit.get("PRICE")),
                "price_label": "Sold Price" if sold else "Price",
                "is_sold": bool(sold),
                # Only meaningful when this row IS the sale; on a live listing it is the
                # prior owner's sale and has nothing to do with our staging.
                "sold_date": (hit.get("SOLD DATE") or None) if sold else None,
                "dom": int(hit["DAYS ON MARKET"]) if (hit.get("DAYS ON MARKET") or "").isdigit() else None,
                "source": "gis-csv",
            },
        })
        out.append(entry)
        matched += 1
        px = (entry["sale"]["price_cents"] or 0) // 100
        print(f"[{i}/{len(projects)}] {entry['ref']:11} {entry['sale']['status'] or '?':10} "
              f"${px:>10,}  {street}, {entry['city']}", flush=True)
        time.sleep(0.3)

    json.dump(out, open(args.out, "w"), indent=2)
    print(f"\nDONE: {matched} matched to a listing, {unmatched} unmatched, {len(out)} total")
    print(f"wrote {args.out}")


if __name__ == "__main__":
    main()
