#!/usr/bin/env python3
"""
Retry ONLY the photo-less homes in staging-portfolio.json.

Several homes missed a verified Redfin match on the first run (DDG throttling /
cold session), even though they resolve fine on retry. This re-runs the exact
same strict-verified resolver (reused from enrich-staging-portfolio.py) over just
the homes that currently lack a photo, and fills in redfin URL + photo + beds/baths.

Leaves the 58 already-good homes untouched. Idempotent.
"""
import json, os, time, importlib.util

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src/data/staging-portfolio.json")

# reuse the verified resolver + downloader from the main enrichment script
spec = importlib.util.spec_from_file_location("enr", os.path.join(ROOT, "scripts/enrich-staging-portfolio.py"))
enr = importlib.util.module_from_spec(spec)
spec.loader.exec_module(enr)


def main():
    homes = json.load(open(OUT))
    missing = [h for h in homes if not h.get("photo")]
    print(f"{len(missing)} photo-less homes to retry\n", flush=True)
    fixed = 0
    for i, h in enumerate(missing):
        addr = f'{h["street"]}, {h["city"]}, {h.get("state","OR")} {h.get("zip","")}'.strip()
        rf = enr.ddg_redfin_url(addr, h["street"], h.get("zip", ""))
        got = "-"
        if rf:
            h["redfin"] = rf
            h["redfin_verified"] = True
            time.sleep(2)
            data = enr.scrape_redfin(rf)
            if data:
                if data.get("desc"):
                    h["beds_baths"] = enr.parse_beds_baths(data["desc"]) or h.get("beds_baths")
                if data.get("photo"):
                    local = enr.download(data["photo"], h["ref"])
                    if local:
                        h["photo"] = local
                        fixed += 1
                        got = "PHOTO"
        print(f'[{i+1}/{len(missing)}] {h["ref"]:10} {addr[:40]:40} {("VERIFIED " if rf else "no-match ")}{got}', flush=True)
        json.dump(homes, open(OUT, "w"), indent=2)
        time.sleep(8)
    json.dump(homes, open(OUT, "w"), indent=2)
    print(f"\nDONE: filled {fixed} new photos", flush=True)


if __name__ == "__main__":
    main()
