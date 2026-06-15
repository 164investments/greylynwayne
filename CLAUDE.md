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

## Environment Variables
- `NEXT_PUBLIC_GTM_ID` — `GTM-T9FTK8JN` (Google Tag Manager, set in Vercel)
- No other env vars — all config is static

## Analytics & Tracking
- **GTM**: `src/components/GoogleTagManager.tsx` — loads GTM, no consent gate
- **Site tracking**: `src/components/SiteTracker.tsx` — client-side delegated event listener:
  - Route changes → `page_view`
  - Phone clicks → `phone_click` (with `cta_location`)
  - Email clicks → `email_click`
  - Social clicks → `social_click` (per platform)
  - Consultation CTAs → `consultation_cta_click`
  - High-intent page views: `/contact`, `/portfolio`, `/furniture-request`
- **Tracking lib**: `src/lib/tracking.ts` — `trackEvent()`, `trackFormSubmit()` (fires `form_submit` + `generate_lead` to gtag + dataLayer)
- **GA4**: `G-3NTVSELKP5` (configured via GTM, not in code)

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
