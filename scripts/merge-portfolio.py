#!/usr/bin/env python3
"""
Merge the listing index into the committed page snapshot.

`build-listing-index.py` is the new truth for who was staged, where, and what the
listing did. `staging-portfolio.json` is what the build reads, and it holds one thing
the index cannot regenerate: the downloaded photo, plus list prices that were read off
a detail page in an earlier pass.

The whole point of this step is deciding, per home, whether an over-ask claim is still
honest:

  - The sale is unchanged since the last detail-page read (same sold price, same
    sold/not-sold) -> the list price we captured then still describes that sale, so
    carry it and keep `ask_verified`.
  - The sale moved (Active -> Sold is the common one) -> the old list price predates
    the sale and may miss a price cut. Drop it. The card shows "Sold $X" with no
    over-ask number until `enrich-photos.py` reads both off one page again.

Run: python3 scripts/merge-portfolio.py [--dry-run]
"""
import argparse, json, os, re, sys, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(ROOT, "src/data/listing-index.json")
SNAPSHOT = os.path.join(ROOT, "src/data/staging-portfolio.json")
IMGDIR = os.path.join(ROOT, "public/images/staging")

MONTHS = {m: i for i, m in enumerate(
    ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"], 1)}


def iso_date(v):
    """gis-csv writes 'June-5-2026'; the page and every comparison want '2026-06-05'."""
    if not v:
        return None
    if re.fullmatch(r"\d{4}-\d{2}-\d{2}", v):
        return v
    m = re.fullmatch(r"([A-Za-z]+)-(\d{1,2})-(\d{4})", v.strip())
    if not m or m.group(1) not in MONTHS:
        return None
    return f"{m.group(3)}-{MONTHS[m.group(1)]:02d}-{int(m.group(2)):02d}"


def zillow_url(street, city, state, zip_code):
    slug = re.sub(r"\([^)]*\)", "", street)
    slug = re.sub(r"[^A-Za-z0-9 #-]", "", slug).strip().replace(" ", "-")
    parts = "-".join(p for p in [slug, city, state] if p)
    return f"https://www.zillow.com/homes/{urllib.parse.quote(parts)}_{zip_code or ''}_rb/"


def num(v):
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    index = json.load(open(INDEX))
    prior = {h["ref"]: h for h in json.load(open(SNAPSHOT))}

    out, kept_ask, dropped_ask, with_photo = [], 0, 0, 0
    stale_sales = []
    for e in index:
        if e.get("match") != "listing" or not e.get("redfin"):
            continue
        ref = e["ref"]
        old = prior.get(ref, {})
        sale = dict(e.get("sale") or {})
        sale["sold_date"] = iso_date(sale.get("sold_date"))

        # A 730-day sold window can return a sale that happened BEFORE we staged the
        # house. Presenting that as "we staged it and it sold" would be a false claim
        # about our own work, so the sale is dropped and only the live link remains.
        if (sale.get("is_sold") and sale.get("sold_date") and e.get("installed_on")
                and sale["sold_date"] < e["installed_on"]):
            stale_sales.append(ref)
            sale = {"status": None, "is_sold": False, "source": sale.get("source")}

        old_sale = old.get("sale") or {}
        unchanged = (
            old_sale.get("list_price_cents") is not None
            and old_sale.get("price_cents") == sale.get("price_cents")
            and bool(old_sale.get("is_sold")) == bool(sale.get("is_sold"))
        )
        if unchanged:
            sale["list_price_cents"] = old_sale["list_price_cents"]
            sale["ask_verified"] = True
            # The detail page is the only place a sold home's days-on-market lives.
            if old_sale.get("dom") is not None and sale.get("dom") is None:
                sale["dom"] = old_sale["dom"]
            kept_ask += 1
        elif old_sale.get("list_price_cents") is not None:
            dropped_ask += 1

        photo_path = os.path.join(IMGDIR, f"{ref}.jpg")
        photo = f"/images/staging/{ref}.jpg" if os.path.exists(photo_path) else None
        if photo:
            with_photo += 1

        bb = e.get("beds_baths") or {}
        out.append({
            "ref": ref,
            "street": e["street"],
            "city": e.get("city") or e.get("listing_city") or "",
            "state": e.get("state") or "OR",
            "zip": e.get("zip") or e.get("listing_zip") or "",
            "status": e["status"],
            "installed_on": e.get("installed_on"),
            "signed_total_cents": e.get("signed_total_cents"),
            "zillow": zillow_url(e["street"], e.get("city"), e.get("state") or "OR", e.get("zip")),
            "redfin": e["redfin"],
            "redfin_verified": True,
            "photo": photo,
            "beds_baths": {
                "beds": num(bb.get("beds")),
                "baths": num(bb.get("baths")),
                "sqft": num(bb.get("sqft")),
            } if any(bb.values()) else None,
            "sale": sale or None,
        })

    # Carry forward homes the index did not match this run. They were resolved by the old
    # DuckDuckGo pipeline and verified then; gis-csv missing them now (a delisted listing,
    # a unit-number format it writes differently) is not evidence the home was never staged.
    # Dropping a card that is already live — photo and all — would be a regression, so their
    # existing record stands and only its sale data goes stale.
    matched_refs = {h["ref"] for h in out}
    carried = 0
    for ref, old in prior.items():
        if ref in matched_refs or not old.get("redfin_verified") or not old.get("photo"):
            continue
        kept = dict(old)
        kept["carried_over"] = True
        out.append(kept)
        carried += 1

    out.sort(key=lambda h: (h["installed_on"] or ""), reverse=True)
    print(f"{len(out)} homes matched to a listing")
    print(f"  {with_photo} with a photo (the page renders only these)")
    print(f"  {kept_ask} kept a verified ask, {dropped_ask} dropped a stale one")
    if stale_sales:
        print(f"  {len(stale_sales)} had a sale predating their staging - sale dropped: "
              f"{', '.join(stale_sales[:6])}{' ...' if len(stale_sales) > 6 else ''}")
    print(f"  {carried} carried over from the previous snapshot (index missed them, photo kept)")
    lost = set(prior) - {h["ref"] for h in out}
    if lost:
        print(f"  {len(lost)} dropped entirely (no photo, no match): "
              f"{', '.join(sorted(lost)[:8])}{' ...' if len(lost) > 8 else ''}")
    if args.dry_run:
        print("\n(dry run - snapshot not written)")
        return
    json.dump(out, open(SNAPSHOT, "w"), indent=2)
    print(f"\nwrote {SNAPSHOT}")


if __name__ == "__main__":
    main()
