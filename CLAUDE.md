# Greylyn Wayne — greylynwayne.com

> Business context, brand, SEO: `~/.claude/projects/-Users-haydenlaverty/memory/greylyn-wayne/README.md`

## Stack
- Next.js 16.1.6 / React 19 / TailwindCSS 4 / TypeScript
- Mostly static, prerendered — plus ONE serverless route handler (`src/app/api/lead/route.ts`, emails form/chat leads via Resend) and `src/middleware.ts` (noindex on the *.vercel.app host). No database.
- Repo: **164investments/greylynwayne** (GitHub)

## Deploy
⚠️ **GitHub→Vercel auto-deploy is BROKEN** (last auto-deploy 2026-03-10). Pushing to `main` lands on GitHub but does NOT build on Vercel. **Deploy manually:**
```bash
npm run build               # always verify first
vercel --prod --yes         # from ~/greylynwayne; ships WORKING TREE, resolves under the simplyvrm Vercel scope
```
Note: `vercel --prod` also aliases greylynwayne.com (already added to the project) — harmless while DNS still points to Wix.

## Environment Variables (all set in Vercel, production + preview)
- `NEXT_PUBLIC_GA_ID` — `G-3NTVSELKP5` (GA4)
- `NEXT_PUBLIC_GOOGLE_ADS_ID` — `AW-16716198764` (Google Ads tag)
- `NEXT_PUBLIC_META_PIXEL_ID` — `1596777147987027` (Meta Pixel, browser)
- `NEXT_PUBLIC_GADS_LABEL_FORM` / `_CHAT` / `_PHONE` / `_TEXT` — Google Ads conversion labels
- `META_PIXEL_ID` / `META_CAPI_TOKEN` — server-side Meta CAPI (never exposed to client)
- `RESEND_API_KEY` / `LEAD_FROM_EMAIL` / `LEAD_TO_EMAIL` — lead email (see Lead capture)
- `NEXT_PUBLIC_GTM_ID` — `GTM-T9FTK8JN` — **legacy/unused** (GTM removed from the site; GA4 is now in code). Safe to delete.
- Set env vars via the Vercel **API** (not `vercel env add` piping) + `.trim()` every read — avoids the trailing-newline bug that silently breaks inlined `NEXT_PUBLIC_*` scripts.

## Analytics & Conversion Tracking
Built to the WNF/Stay-Portland playbook — see ARCHITECTURE.md §3a. Full setup record: memory `greylyn-wayne/tracking-setup-2026-06-16.md`.
- **Tag loaders (in code, layout.tsx)**: `GtagScripts.tsx` = single Google tag (GA4 `G-3NTVSELKP5` + Google Ads `AW-16716198764`, enhanced conversions on). `MetaPixel.tsx` = Meta Pixel `1596777147987027` + PageView. **GTM removed** (its only tag duplicated the GA4 config).
- **Tracking lib**: `src/lib/tracking.ts` — `buildLeadTracking()` (mints shared eventId + applies enhanced-conversions/advanced-matching), `fireLeadConversions()` (GA4 + Google Ads `send_to` + Meta `Lead`), `fireClickConversion()` (phone/text). `trackEvent()` for plain GA4 events.
- **Server CAPI**: `src/lib/server-tracking.ts` ← `app/api/lead/route.ts` — Meta CAPI `Lead` w/ shared eventId (dedup), hashed em/ph/fn/ln, `_fbp`/`_fbc`, IP/UA.
- **Site tracking**: `src/components/SiteTracker.tsx` — delegated listener: route→`page_view`; `phone_click` (+ Ads/Meta conversion); `text_cta_click` (+ Ads/Meta conversion); `email_click`; `social_click`; `consultation_cta_click`.
- **Google Ads conversions** (account `151-338-1890`, all PRIMARY): Lead-Form Submit, Lead-Chat Capture, Lead-Phone Click, Lead-Text Click. GA4-imported `generate_lead` is now Secondary (backup). `middleware.ts` captures `gclid`→`_gw_gclid` cookie.
- **Pending**: enable Enhanced Conversions for Leads in the Google Ads UI (terms acceptance, 1 click); verify domain greylynwayne.com in Meta Business Manager `399867133852218` (after DNS cutover).

## Key Paths
- Pages: `src/app/` (home-staging, interior-design, portfolio, reviews, about, contact, + 10 more)
- City pages: `src/app/service-areas/[city]/page.tsx` (33 cities via `generateStaticParams`)
- City data: `src/data/service-areas.ts`
- JSON-LD: `src/components/JsonLd.tsx` (LocalBusiness, Breadcrumb, FAQ, Service schemas)
- Sitemap: `src/app/sitemap.ts` (auto-generates all 51 URLs)
- `next.config.ts` — full 301 redirect map (old Wix slugs → new slugs) for the migration.

## Lead capture
- **Endpoint**: `src/app/api/lead/route.ts` — emails Contact, Furniture Request, AND chat leads to design@greylynwayne.com via **Resend** (reply-to = customer; honeypot `company` field). Env: `RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `LEAD_TO_EMAIL` (set in Vercel; GW's own Resend account, sends from `leads@greylynwayne.com`).
- **Forms**: `src/app/contact/page.tsx` + `src/app/furniture-request/page.tsx` POST JSON to `/api/lead` (loading/error states).
- **CTAs are Text-first** (most leads are call/text): "Text Us" (primary) opens `ChatWidget.tsx` (captures name+phone → /api/lead → SMS handoff); Call is secondary + in the header. "Text Us" buttons carry `data-open-chat` → SiteTracker dispatches `gw:open-chat`.

## Brand
- Colors: teal #6b8f90, warm #faf8f5, cream #f0ebe4, charcoal #2a2a2a
- Fonts: Playfair Display (headings) + Inter (body)
- Logo: `/public/images/logo-teal.png`, `logo-offwhite.png`

## SEO Patterns
- Every page has metadata export + OG image
- City pages each get: 2x Service JSON-LD, BreadcrumbJsonLd, FAQJsonLd (3 city-specific Q&As)
- AI visibility files: `/public/llm.txt`, `/public/llm-full.txt`, `/public/.well-known/llm.txt`
- Home Staging and Interior Design are the money pages; other pages support SEO

## Conventions
- Benefit-driven CTAs ("Get Your Free Consultation" not "Submit")
- Sticky mobile CTA bar appears after 600px scroll (`src/components/StickyMobileCTA.tsx`)
- DNS still on Wix — needs A record → 76.76.21.21 to go live on Vercel

## Business
- Owner: Jody Wallace
- Services: Home Staging + Interior Design, Portland OR
- Phone: (971) 930-0220
- Email: design@greylynwayne.com
