#!/usr/bin/env python3
"""
Refresh the SALE data on every verified staged home (successor to enrich-sale-data.py).

Why this exists: `enrich-sale-data.py` paced at 2.5s and wrote `h["sale"] = sale`
unconditionally. Redfin tightened its WAF (2026-09: ~6 requests then a 202 wall on the
whole IP), so that script now blanks good sale data with `None` the moment it gets
throttled. This one:

  - NEVER overwrites a good `sale` with a failure. A blocked/unparseable fetch leaves
    the previous snapshot value alone and is retried on the next pass.
  - Backs off properly (fresh session + rotating Chrome-TLS impersonation, exponential
    sleep on 202/403/429) and paces slowly by default.
  - Is resumable: `sale_checked_on` records the day each home was last confirmed, and a
    re-run skips anything already checked today. Ctrl-C is safe (JSON written per home).

Run: python3 scripts/refresh-sale-data.py [--pace 30] [--only REF,REF] [--force]
"""
import argparse, json, os, random, re, sys, time
from curl_cffi import requests

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src/data/staging-portfolio.json")
IMPERSONATIONS = ["chrome131", "chrome124", "chrome120", "safari17_0", "chrome116"]
TODAY = time.strftime("%Y-%m-%d")


def first(pat, h, flags=0):
    m = re.search(pat, h, flags)
    return m.group(1) if m else None


def fetch(url, max_attempts=4):
    """Return page HTML, or None if Redfin kept blocking us."""
    for attempt in range(max_attempts):
        sess = requests.Session(impersonate=IMPERSONATIONS[attempt % len(IMPERSONATIONS)])
        try:
            r = sess.get(url, timeout=30, headers={
                "Referer": "https://www.google.com/",
                "Accept-Language": "en-US,en;q=0.9",
            })
        except Exception:
            time.sleep(20 * (attempt + 1))
            continue
        if r.status_code == 200 and len(r.text) > 20000:
            return r.text
        if r.status_code in (202, 403, 429) or len(r.text) < 20000:
            # WAF wall - it is IP-level, so only real time gets us past it.
            time.sleep(60 * (2 ** attempt) + random.uniform(0, 15))
            continue
        return None
    return None


def parse_sale(h):
    """Extract the SUBJECT property's sale facts. Returns None if the page told us nothing."""
    status = first(r'"mlsStatusDisplay":\{"displayValue":"([^"]+)"', h) or \
             first(r'mlsStatusDisplay\\":\{\\"displayValue\\":\\"([^\\"]+)', h)
    amount = first(r'"priceInfo":\{"amount":(\d+)', h) or \
             first(r'priceInfo\\":\{\\"amount\\":(\d+)', h)
    label = first(r'"priceInfo":\{"amount":\d+,"label":"([^"]+)"', h) or \
            first(r'priceInfo.{0,60}?label\\":\\"([^\\"]+)', h)
    listp = first(r'"listingPrice":"(\d+)_US_DOLLAR"', h) or \
            first(r'listingPrice\\":\\"(\d+)_US_DOLLAR', h)
    dom = first(r'DaysOnMarket\\?":\\?"(\d+)', h)
    sold_ms = first(r'"soldDate":(\d{12,13})', h) or first(r'soldDate\\":(\d{12,13})', h)

    if not (status or amount):
        return None                                  # page loaded but told us nothing

    sale = {}
    if status:
        sale["status"] = status.strip()
    if amount:
        sale["price_cents"] = int(amount) * 100
    if label:
        sale["price_label"] = label.strip()
    if listp:
        sale["list_price_cents"] = int(listp) * 100
    if dom is not None:
        sale["dom"] = int(dom)
    is_sold = (sale.get("status") in ("Sold", "Closed")) or sale.get("price_label") == "Sold Price"
    sale["is_sold"] = bool(is_sold)
    if sold_ms and is_sold:
        sale["sold_date"] = time.strftime("%Y-%m-%d", time.gmtime(int(sold_ms) / 1000))
    return sale


def summarize(sale):
    if not sale:
        return "-"
    px = (sale.get("price_cents") or 0) // 100
    lp = (sale.get("list_price_cents") or 0) // 100
    delta = f"  {'+' if px - lp >= 0 else ''}{px - lp:,} vs ask" if px and lp else ""
    return f"{sale.get('status', '?'):12} ${px:,}{delta}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pace", type=float, default=30.0, help="seconds between homes")
    ap.add_argument("--only", default="", help="comma-separated refs to refresh")
    ap.add_argument("--force", action="store_true", help="re-check homes already checked today")
    args = ap.parse_args()
    only = {r.strip() for r in args.only.split(",") if r.strip()}

    homes = json.load(open(OUT))
    todo = [h for h in homes if h.get("redfin_verified") and h.get("redfin")]
    if only:
        todo = [h for h in todo if h["ref"] in only]
    if not args.force:
        todo = [h for h in todo if h.get("sale_checked_on") != TODAY]
    print(f"{len(todo)} homes to refresh (pace {args.pace}s)\n", flush=True)

    changed = blocked = 0
    for i, h in enumerate(todo, 1):
        page = fetch(h["redfin"])
        sale = parse_sale(page) if page else None
        if sale is None:
            blocked += 1
            print(f"[{i}/{len(todo)}] {h['ref']:10} BLOCKED/EMPTY - kept prior: {summarize(h.get('sale'))}", flush=True)
        else:
            before = h.get("sale") or {}
            if {k: v for k, v in sale.items() if k != "dom"} != {k: v for k, v in before.items() if k != "dom"}:
                changed += 1
                print(f"[{i}/{len(todo)}] {h['ref']:10} CHANGED {summarize(before)}  ->  {summarize(sale)}", flush=True)
            else:
                print(f"[{i}/{len(todo)}] {h['ref']:10} same    {summarize(sale)}", flush=True)
            h["sale"] = sale
            h["sale_checked_on"] = TODAY
            json.dump(homes, open(OUT, "w"), indent=2)
        time.sleep(args.pace + random.uniform(0, args.pace * 0.4))

    json.dump(homes, open(OUT, "w"), indent=2)
    print(f"\nDONE: {changed} changed, {blocked} blocked/kept, {len(todo) - changed - blocked} unchanged", flush=True)


if __name__ == "__main__":
    main()
