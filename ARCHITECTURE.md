# Greylyn Wayne — Architecture

> Structural source of truth: **where code goes and why.** `CLAUDE.md` = how we work (stack, deploy, env); `README.md` = how to run it.
> If you change structure, update this file **in the same PR**. A stale doc is how spaghetti starts.

## 1. What this app is

A marketing/lead-generation website for Greylyn Wayne (home staging + interior design, Portland OR). Next.js 16 App Router on Vercel. It is **content-first and almost entirely static** — 18 hand-built pages + 33 data-driven city pages, all prerendered at build time. The only dynamic surface is one API route that emails form submissions. There is no database, no auth, and no user-generated content. Treat it as a fast static site with a single serverless lead endpoint bolted on, not a web app.

## 2. Layering rule (one-way dependencies)

Dependencies flow **one direction only**:

```
app/ (routes, metadata, JSON-LD wiring)
  → components/ (presentational + a few "use client" interactive leaves)
  → lib/ (tracking) and data/ (city dataset)
```

- `data/` and `lib/` import nothing above them. `components/` may use `lib`/`data`. Routes wire it all together.
- **Litmus test for "is this `data`/`lib`?":** could I use it without rendering React? `service-areas.ts` (plain data + a lookup fn) and `tracking.ts` (gtag/dataLayer helpers) both pass → they live below components.
- Components never import from a sibling page route. Shared UI goes in `components/`.

This is a layer-based structure on purpose. The site is small; feature-slicing would be over-engineering (see §9).

## 3. Server/client boundary

- **Server Components by default.** Every page is a Server Component except the three interactive ones, which carry `"use client"`: `Header.tsx` (mobile menu state), `StickyMobileCTA.tsx` + `SiteTracker.tsx` (scroll/route listeners), and the two form pages (`contact`, `furniture-request`) plus `lib/tracking.ts`.
- Push `"use client"` to the leaves — don't mark a whole page client just to add one interactive widget.
- **Secrets never reach the client.** `RESEND_API_KEY`, the lead from/to addresses, and `META_CAPI_TOKEN` / `META_PIXEL_ID` are read **only** inside `app/api/lead/route.ts` + `lib/server-tracking.ts` (server). Anything exposed to the browser must be `NEXT_PUBLIC_*` (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GADS_LABEL_*`). Do not import the API route or read a server-only `process.env` from any component.

## 3a. Conversion tracking (Google Ads + Meta)

Built to the WNF/Stay-Portland playbook. Conversions fire on multiple paths so no single failure loses a lead.

- **Tag loaders (in code, `layout.tsx`):** `GtagScripts.tsx` = the SINGLE Google tag — one `gtag.js` configuring GA4 (`G-3NTVSELKP5`, `send_page_view`) **and** Google Ads (`AW-16716198764`, `allow_enhanced_conversions`). `MetaPixel.tsx` = Meta Pixel `1596777147987027` base + `PageView`. **GTM was removed** — its only tag duplicated the GA4 config (two Google tags for one property breaks GA4 `session_engaged`). Don't re-add a GA4 config in GTM while GA4 lives in `gtag.js`.
- **Lead conversions** (`lib/tracking.ts`): `buildLeadTracking(identity)` runs BEFORE the `/api/lead` POST — it applies enhanced-conversions/advanced-matching user_data and mints one `eventId` (passed in the POST body so server CAPI shares it for dedup). On success, `fireLeadConversions()` fires the GA4 event, the direct Google Ads conversion (`send_to`, `transport_type:'beacon'`), and the browser Meta `Lead` (same `eventID`). Phone/text clicks → `fireClickConversion()` (browser-only).
- **Server-side (`lib/server-tracking.ts` ← `app/api/lead/route.ts`):** Meta CAPI `Lead` with the shared `eventId`, hashed em/ph/fn/ln, `_fbp`/`_fbc`, IP/UA — the resilient, high-EMQ half. Best-effort: never blocks or fails the email send.
- **Conversion LABELS** are env-driven (`NEXT_PUBLIC_GADS_LABEL_*`) so the codebase carries no account-specific values; a missing label simply skips that fire (GA4-import covers it). `middleware.ts` persists `gclid`/`gbraid`/`wbraid` → `_gw_gclid` cookie.

## 4. Where things live (the decision table)

| You're adding… | Put it in | Notes |
|---|---|---|
| A new standalone page | `src/app/<slug>/page.tsx` | Export `metadata` (title + description). Add to `sitemap.ts` if indexable. |
| A new service area (city) | `src/data/service-areas.ts` | Add a `CityData` entry — it auto-generates the page, sitemap entry, schema, and FAQ. **Write genuinely unique** `description`/`highlights`/`nearby` (real neighborhoods), never spun boilerplate. |
| Content derived from the ops DB + an external source | offline script in `scripts/` → generated `src/data/*.json` → typed wrapper `*.ts` | See §6b. The page imports the **committed JSON snapshot**, never fetches at build/runtime. Re-running the script is a manual, reviewed step. |
| A shared UI piece (used 2+ places) | `src/components/` | Keep presentational. No data fetching, no business logic. |
| Page-specific markup used once | Inline in that `page.tsx` | Don't pre-abstract (Rule of Three). |
| Structured data / schema | `src/components/JsonLd.tsx` | One exported component per schema type. Reuse `LocalBusinessJsonLd`, `ServiceJsonLd`, `FAQJsonLd`, `BreadcrumbJsonLd`. |
| Analytics event | `src/lib/tracking.ts` | Add a helper; fire from `SiteTracker.tsx` (delegated) or a component. Don't call `gtag` directly in pages. |
| A new lead/conversion type | `src/lib/tracking.ts` (+ server in `lib/server-tracking.ts`) | Add a `LeadSource`, a label env var, and create the matching native Google Ads conversion action. See §3a. |
| An old Wix URL that needs to survive | `next.config.ts` `redirects()` | 301/permanent map — see §6. |
| A form field / new lead source | `app/api/lead/route.ts` + the form page | Keep the single `/api/lead` endpoint; branch on `formType`. |

## 5. SEO & metadata (this is a marketing site — SEO is a first-class concern)

- **Canonical host is `https://www.greylynwayne.com`** — set once in `layout.tsx` `metadataBase` + per-page `alternates.canonical`. The authority (DR 26, 263 referring domains) and all GSC history sit on this host. Never let www and apex both serve 200 — Vercel handles apex→www + http→https at the domain layer.
- Every page exports `metadata` with a CTR-focused title + description (local hook + use-case + keyword; no price).
- `sitemap.ts` lists every indexable URL; `robots.ts` allows all but `/api/`. **PPC/ad landing pages, if added, must set `robots:{index:false,follow:true}` AND be excluded from `sitemap.ts`** (avoid cannibalization).
- Pages that should never be indexed (404, the QR link hub) set `robots:{index:false}` in their `metadata`.
- AI-visibility files live in `public/llm.txt`, `public/llm-full.txt`, `public/.well-known/llm.txt`.

## 6. Migration: the 301 redirect map (`next.config.ts`)

The site replaced a Wix site on the **same domain**. Wix used long, keyword-stuffed slugs. Every indexed old URL is 301-redirected to its new slug so ranking/link-equity transfers. The map is in `next.config.ts` `redirects()`:
- Exact maps for the ~14 core pages whose slug changed.
- One wildcard `/location/home-staging-:city → /service-areas/:city` covers all location pages.
- `/post/:slug*` and the old blog paths → `/blog` (the new blog has no per-post pages).
- The legacy Wix `_files` PDF → the locally re-hosted `/alla-famiglia-house-details.pdf`.

Next.js `permanent: true` emits **HTTP 308**, which Google treats identically to 301. **When a slug changes, add a redirect from the old slug in the same PR.**

`src/middleware.ts` sends `X-Robots-Tag: noindex` on the `*.vercel.app` host so the preview domain isn't indexed as a duplicate (a post-cutover upgrade to a 301→www is commented in-file).

## 6b. Offline-enriched data (`scripts/` → `src/data/*.json` → `*.ts`)

The **Staged Homes** portfolio (`/staged-homes`) is the first page whose content is *generated*, not hand-authored. The pattern, and the rule for anything like it:

```
scripts/enrich-staging-portfolio.py   (offline; never runs at build/deploy time)
  → src/data/staging-portfolio.json    (committed snapshot — the build reads THIS)
  → src/data/staging-portfolio.ts       (typed wrapper: types + region grouping + status labels)
  → src/app/staged-homes/page.tsx        (Server Component; imports the wrapper)
```

- **Source of truth is the committed JSON.** The page never hits the network or the ops DB during build or render — keeps the site fully static and deploys deterministic. Regenerating is a deliberate, reviewed step (a human re-runs the script and commits the diff), exactly like editing `service-areas.ts` by hand.
- **The script** pulls the curated showcase (recent real stagings, last ~12 mo) from the `greylynwayne-admin` Supabase, then enriches each with a **verified** Redfin deep-link + listing photo and a Zillow link. Photo lookup goes DuckDuckGo (`site:redfin.com {address}`) → exact-match guard (`url_matches`: house number + street name + zip must all match, or we reject — a neighbor's photo is worse than none) → impersonated Redfin page fetch → `og:image` → self-hosted in `public/images/staging/{ref}.jpg`. It is rate-limited + idempotent (skips already-verified homes) and **degrades gracefully**: any home without a verified photo still renders an editorial address card with working Redfin/Zillow links.
- **Why self-host the photos:** hot-linking MLS CDN images breaks when a listing expires. Caveat below (§10).
- **Don't** make the page `async`/fetch live, and don't widen this into a general scraping layer. If staging content needs to be self-served by staff, that's the CMS trigger (§9), not more scripts.

## 7. The lead endpoint (`app/api/lead/route.ts`)

The only server-side logic. Both forms POST JSON here; it validates, drops honeypot hits, and emails a formatted notification via **Resend** (raw `fetch`, no SDK dependency) with `reply_to` = the customer. Config via env (`RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `LEAD_TO_EMAIL`). On misconfig or send failure it returns a friendly error the form renders. Keep this the single lead path — new forms add a `formType`, not a new endpoint.

## 8. Conventions & gates

- **TypeScript strict**; no new `any`/`@ts-ignore` without a justifying comment.
- **Always `npm run build` before pushing** — it typechecks + prerenders all 58 pages and is the real gate (no test suite yet). Push to `main` auto-deploys on Vercel.
- Iterate on `localhost:3000`; don't push per-tweak (Vercel build minutes — see `CLAUDE.md`).
- Brand tokens (teal/warm/cream/charcoal, Playfair/Inter) come from `globals.css`; use the utility classes, don't hardcode hexes in components.
- Images: always `next/image` with explicit `width`/`height`; assets in `public/images/` (webp preferred).
- **Per-project photo galleries** live in `public/images/<set>/<slug>/NN.webp` (`NN` 1-padded, `01` = the project's hero card image) and render through the shared client component `components/SodGallery.tsx` (thumbnail grid → full-screen lightbox). Used on `street-of-dreams` (`sod/<slug>/`, the SOD homes) and `interior-design` (`interiors/<slug>/`, the furnished/STR projects — NE 56th, NW Kearney, SE 12th, Adelynn). Each page holds the project list (title/location/description/count) as a hardcoded array. Source photos are GW's own project/RMLS photography pulled from the 164 Investments "Listing Photos" Drive, curated + downscaled to ≤1800px webp offline (not scraped at build).

## 9. Right-sizing — what we deliberately are NOT doing

- **No feature-slicing, no `dependency-cruiser`, no Zod-env, no test framework.** At ~20 files with one server route, layer-based + `tsc`/ESLint/build is the right amount of discipline. The forcing function to revisit: a real backend (CMS, bookings, auth) or the file count making `components/` crowded.
- **No CMS.** Blog posts + reviews + the *design* portfolio are hardcoded arrays; the *staging* portfolio is a generated JSON snapshot (§6b). Fine until Jody needs to self-edit content — then introduce a CMS/MDX layer (and update this doc).

## 10. Known debt

- **Forms email-only** — no CRM/DB persistence. If lead volume grows, also write to the `greylynwayne-admin` Supabase. (Acceptable now: design@ inbox is the system of record.)
- **`aggregateRating` = 9/5.0** (on-page testimonials). Bump to true Google Business Profile count + average when available — it's more credible and aids rich results.
- **`alla-famiglia-house-details.pdf` is ~18 MB** — large for the repo. Compress (ghostscript `/ebook`) if it ever blocks a clone or matters for the download.
- **Blog has no per-post pages** — all old `/post/*` URLs collapse to `/blog`. Build real post pages if blog SEO becomes a priority.
- **Design portfolio / before-after reuse a small image set** — replace with real project photography for credibility + unique image SEO. (The *staging* portfolio at `/staged-homes` already uses real per-home listing photos.)
- **Staged Homes listing photos are MLS-sourced** (`© RMLS`/agent copyright) and self-hosted (§6b). Hayden opted into this tradeoff; they show GW's own staging work but the underlying photo copyright is the listing photographer's. Easy to swap/remove per-home via the JSON. If a takedown is ever requested, delete that home's `photo` field + the `public/images/staging/{ref}.jpg` file (the card falls back cleanly). The cleaner long-term fix is GW's own photography.
- **Staged Homes data goes stale** — it's a snapshot from the date the script last ran. Status framing (On the Market / Sold) reflects that moment; the live Redfin/Zillow links are always current. Re-run `scripts/enrich-staging-portfolio.py` periodically to refresh.

## 11. Reviewer checklist (every PR)

- [ ] Layering respected — no upward imports, no cross-page imports, secrets only in `app/api/`?
- [ ] New page exports `metadata` (title + description) and is in `sitemap.ts` (or intentionally `noindex` + excluded)?
- [ ] Slug change? → matching 301 added to `next.config.ts` in this PR.
- [ ] New city = genuinely unique copy, not spun boilerplate?
- [ ] `npm run build` green (typecheck + all pages prerender)?
- [ ] This file updated if structure changed?
