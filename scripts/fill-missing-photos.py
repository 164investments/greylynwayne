#!/usr/bin/env python3
"""
Retry ONLY the photo-less homes in staging-portfolio.json, smarter:

  - If a home already has a verified Redfin URL, RE-VALIDATE it against the current
    (fixed) verifier — catches old wrong matches like 6491C -> 6841 — then re-scrape
    that URL directly (no DDG) so the new bigphoto/genMid fallback can find a hero
    photo even when og:image is the Redfin logo placeholder.
  - If there's no good URL, DDG-resolve with the strict verifier.
  - Reset redfin/redfin_verified so a home that no longer verifies loses its wrong link.

Reuses the resolver/verifier/downloader from enrich-staging-portfolio.py. Idempotent.
"""
import json, os, time, importlib.util

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src/data/staging-portfolio.json")
spec = importlib.util.spec_from_file_location("enr", os.path.join(ROOT, "scripts/enrich-staging-portfolio.py"))
enr = importlib.util.module_from_spec(spec)
spec.loader.exec_module(enr)


def main():
    homes = json.load(open(OUT))
    missing = [h for h in homes if not h.get("photo")]
    print(f"{len(missing)} photo-less homes to retry\n", flush=True)
    fixed = 0
    for i, h in enumerate(missing):
        street, zip = h["street"], h.get("zip", "")
        addr = f'{street}, {h["city"]}, {h.get("state","OR")} {zip}'.strip()

        # 1) trust an existing verified URL only if it still passes the fixed verifier
        used_ddg = False
        if h.get("redfin_verified") and h.get("redfin") and enr.url_matches(h["redfin"], street, zip):
            rf = h["redfin"]                       # good URL — re-scrape directly, skip DDG
        else:
            used_ddg = True
            rf = enr.ddg_redfin_url(addr, street, zip)
            if rf:
                time.sleep(2)

        note = "-"
        if rf:
            h["redfin"] = rf
            h["redfin_verified"] = True
            data = enr.scrape_redfin(rf)
            if data:
                if data.get("desc"):
                    h["beds_baths"] = enr.parse_beds_baths(data["desc"]) or h.get("beds_baths")
                if data.get("photo"):
                    local = enr.download(data["photo"], h["ref"])
                    if local:
                        h["photo"] = local
                        fixed += 1
                        note = "PHOTO"
        else:
            # no verifiable listing — drop the (possibly wrong) deep link to a search link
            h["redfin"] = enr.redfin_search_link(street, h["city"], h.get("state", "OR"), zip)
            h["redfin_verified"] = False

        print(f'[{i+1}/{len(missing)}] {h["ref"]:10} {addr[:38]:38} {("ok " if rf else "no-match ")}{note}', flush=True)
        json.dump(homes, open(OUT, "w"), indent=2)
        time.sleep(7 if used_ddg else 1)          # only pace DDG calls; direct re-scrapes are cheap
    json.dump(homes, open(OUT, "w"), indent=2)
    print(f"\nDONE: filled {fixed} new photos", flush=True)


if __name__ == "__main__":
    main()
