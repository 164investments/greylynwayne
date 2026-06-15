# Greylyn Wayne — greylynwayne.com

> Business context, brand, SEO: `~/.claude/projects/-Users-haydenlaverty/memory/greylyn-wayne/README.md`

## Stack
- Next.js 16.1.6 / React 19 / TailwindCSS 4 / TypeScript
- Fully static site — no database, no API routes, no server-side processing
- Vercel (auto-deploy on push to main)
- Repo: cascadelogic/greylynwayne

## Deploy
Push to `main` triggers auto-deploy. No manual Vercel CLI needed.
```bash
npm run build  # always verify before pushing
```

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
- `next.config.ts` — empty (no redirects, headers, or custom config)

## Contact Form
- **Component**: `src/app/contact/page.tsx` (client component)
- **Important**: Client-side only — form data is NOT sent anywhere (no backend/email). `handleSubmit` fires tracking events (`trackFormSubmit`) and shows a success message.
- **Fields**: firstName, lastName, email, phone, service (9 options), message

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
