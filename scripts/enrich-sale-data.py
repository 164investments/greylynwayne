#!/usr/bin/env python3
"""
Second-pass enrichment: add real SALE data to each verified staged home.

Reads src/data/staging-portfolio.json, and for every home with a verified Redfin
URL, fetches the Redfin page (Chrome-TLS impersonation — no DDG, so no throttling)
and extracts from the embedded JSON:
  - mls_status        Active | Pending | Closed | Coming Soon | ...
  - sold_price_cents  (when Closed)
  - list_price_cents  (original/listing price)
  - sold_date         ISO yyyy-mm-dd
  - dom               days on market (Redfin "time on Redfin")
Derived (computed in the TS wrapper, not here): over-ask $/%, "sold fast".

Idempotent + additive: only fills the `sale` object; never touches photos/links.
Run: python3 scripts/enrich-sale-data.py
"""
import json, os, re, time
from curl_cffi import requests

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src/data/staging-portfolio.json")
session = requests.Session(impersonate="chrome131")


def first(pat, h, flags=0):
    m = re.search(pat, h, flags)
    return m.group(1) if m else None


def extract_sale(url):
    try:
        r = session.get(url, timeout=25)
        if r.status_code != 200:
            return None
        h = r.text
        # The page carries an UNescaped JSON region — match plain "key":value first,
        # fall back to the backslash-escaped region.
        status = first(r'"mlsStatusDisplay":\{"displayValue":"([^"]+)"', h) or \
                 first(r'mlsStatusDisplay\\":\{\\"displayValue\\":\\"([^\\"]+)', h)
        amount = first(r'"priceInfo":\{"amount":(\d+)', h) or \
                 first(r'priceInfo\\":\{\\"amount\\":(\d+)', h)
        label = first(r'"priceInfo":\{"amount":\d+,"label":"([^"]+)"', h) or \
                first(r'priceInfo.{0,60}?label\\":\\"([^\\"]+)', h)
        listp = first(r'"listingPrice":"(\d+)_US_DOLLAR"', h) or \
                first(r'listingPrice\\":\\"(\d+)_US_DOLLAR', h)
        dom = first(r'"DaysOnMarket":"(\d+)"', h)
        sold_ms = first(r'"soldDate":(\d{12,13})', h) or \
                  first(r'soldDate\\":(\d{12,13})', h)

        sale = {}
        if status:
            sale["status"] = status.strip()
        if amount:
            sale["price_cents"] = int(amount) * 100
        if label:
            sale["price_label"] = label.strip()   # "Sold Price" | "Price" | "List Price"
        if listp:
            sale["list_price_cents"] = int(listp) * 100
        if dom is not None:
            sale["dom"] = int(dom)
        # Only trust soldDate when the listing is actually sold (else it's a prior sale).
        is_sold = (sale.get("status") in ("Sold", "Closed")) or sale.get("price_label") == "Sold Price"
        sale["is_sold"] = bool(is_sold)
        if sold_ms and is_sold:
            sale["sold_date"] = time.strftime("%Y-%m-%d", time.gmtime(int(sold_ms) / 1000))
        return sale or None
    except Exception as e:
        return {"_error": str(e)[:80]}


def main():
    homes = json.load(open(OUT))
    verified = [h for h in homes if h.get("redfin_verified") and h.get("redfin")]
    print(f"{len(verified)} verified homes to enrich with sale data\n", flush=True)
    n_sold = n_active = 0
    for i, h in enumerate(homes):
        if not (h.get("redfin_verified") and h.get("redfin")):
            continue
        sale = extract_sale(h["redfin"])
        h["sale"] = sale
        st = (sale or {}).get("status", "?")
        if st in ("Sold", "Closed"):
            n_sold += 1
        elif st in ("Active", "Pending", "Coming Soon"):
            n_active += 1
        px = (sale or {}).get("price_cents")
        lp = (sale or {}).get("list_price_cents")
        delta = ""
        if px and lp:
            d = (px - lp) // 100
            delta = f"  {'+' if d>=0 else ''}{d:,} vs ask"
        print(f"[{i+1}/{len(homes)}] {h['ref']:10} {st:12} {('$'+format((px or 0)//100,',')) :>10}{delta}", flush=True)
        json.dump(homes, open(OUT, "w"), indent=2)
        time.sleep(2.5)
    json.dump(homes, open(OUT, "w"), indent=2)
    print(f"\nDONE: {n_sold} sold/closed, {n_active} active/pending enriched", flush=True)


if __name__ == "__main__":
    main()
