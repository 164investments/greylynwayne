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
- **Secrets never reach the client.** `RESEND_API_KEY` and the lead from/to addresses are read **only** inside `app/api/lead/route.ts` (server). Anything exposed to the browser must be `NEXT_PUBLIC_*` (only `NEXT_PUBLIC_GTM_ID` qualifies today). Do not import the API route or read `process.env.RESEND_*` from any component.

## 4. Where things live (the decision table)

| You're adding… | Put it in | Notes |
|---|---|---|
| A new standalone page | `src/app/<slug>/page.tsx` | Export `metadata` (title + description). Add to `sitemap.ts` if indexable. |
| A new service area (city) | `src/data/service-areas.ts` | Add a `CityData` entry — it auto-generates the page, sitemap entry, schema, and FAQ. **Write genuinely unique** `description`/`highlights`/`nearby` (real neighborhoods), never spun boilerplate. |
| A shared UI piece (used 2+ places) | `src/components/` | Keep presentational. No data fetching, no business logic. |
| Page-specific markup used once | Inline in that `page.tsx` | Don't pre-abstract (Rule of Three). |
| Structured data / schema | `src/components/JsonLd.tsx` | One exported component per schema type. Reuse `LocalBusinessJsonLd`, `ServiceJsonLd`, `FAQJsonLd`, `BreadcrumbJsonLd`. |
| Analytics event | `src/lib/tracking.ts` | Add a helper; fire from `SiteTracker.tsx` (delegated) or a component. Don't call `gtag` directly in pages. |
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

## 7. The lead endpoint (`app/api/lead/route.ts`)

The only server-side logic. Both forms POST JSON here; it validates, drops honeypot hits, and emails a formatted notification via **Resend** (raw `fetch`, no SDK dependency) with `reply_to` = the customer. Config via env (`RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `LEAD_TO_EMAIL`). On misconfig or send failure it returns a friendly error the form renders. Keep this the single lead path — new forms add a `formType`, not a new endpoint.

## 8. Conventions & gates

- **TypeScript strict**; no new `any`/`@ts-ignore` without a justifying comment.
- **Always `npm run build` before pushing** — it typechecks + prerenders all 58 pages and is the real gate (no test suite yet). Push to `main` auto-deploys on Vercel.
- Iterate on `localhost:3000`; don't push per-tweak (Vercel build minutes — see `CLAUDE.md`).
- Brand tokens (teal/warm/cream/charcoal, Playfair/Inter) come from `globals.css`; use the utility classes, don't hardcode hexes in components.
- Images: always `next/image` with explicit `width`/`height`; assets in `public/images/` (webp preferred).

## 9. Right-sizing — what we deliberately are NOT doing

- **No feature-slicing, no `dependency-cruiser`, no Zod-env, no test framework.** At ~20 files with one server route, layer-based + `tsc`/ESLint/build is the right amount of discipline. The forcing function to revisit: a real backend (CMS, bookings, auth) or the file count making `components/` crowded.
- **No CMS.** Blog posts + reviews + portfolio are hardcoded arrays. Fine until Jody needs to self-edit content — then introduce a CMS/MDX layer (and update this doc).

## 10. Known debt

- **Forms email-only** — no CRM/DB persistence. If lead volume grows, also write to the `greylynwayne-admin` Supabase. (Acceptable now: design@ inbox is the system of record.)
- **`aggregateRating` = 9/5.0** (on-page testimonials). Bump to true Google Business Profile count + average when available — it's more credible and aids rich results.
- **`alla-famiglia-house-details.pdf` is ~18 MB** — large for the repo. Compress (ghostscript `/ebook`) if it ever blocks a clone or matters for the download.
- **Blog has no per-post pages** — all old `/post/*` URLs collapse to `/blog`. Build real post pages if blog SEO becomes a priority.
- **Portfolio/before-after reuse a small image set** — replace with real project photography for credibility + unique image SEO.

## 11. Reviewer checklist (every PR)

- [ ] Layering respected — no upward imports, no cross-page imports, secrets only in `app/api/`?
- [ ] New page exports `metadata` (title + description) and is in `sitemap.ts` (or intentionally `noindex` + excluded)?
- [ ] Slug change? → matching 301 added to `next.config.ts` in this PR.
- [ ] New city = genuinely unique copy, not spun boilerplate?
- [ ] `npm run build` green (typecheck + all pages prerender)?
- [ ] This file updated if structure changed?
