# Greylyn Wayne — greylynwayne.com

> Business context, brand, SEO: `~/.claude/projects/-Users-haydenlaverty/memory/greylyn-wayne/README.md`

## Stack
- Next.js 16.1.6 / React 19 / TailwindCSS 4 / TypeScript
- Mostly static, prerendered — plus ONE serverless route handler (`src/app/api/lead/route.ts`, which **persists form/chat leads to Supabase + emails them via Resend**) and `src/middleware.ts` (noindex on the *.vercel.app host). Lead persistence is the only DB use: write-only into `website_leads` in the `greylynwayne-admin` Supabase project (`hhtmipyjhogvbycnfjji`); nothing is read back at runtime. Visitors are GA4/Meta-only (no visitor table).
- Repo: **164investments/greylynwayne** (GitHub)

## Deploy
⚠️ **GitHub→Vercel auto-deploy still does not fire** (verified again 2026-09-03: merge `cb11cbe` produced no build after 2 min). But the git link itself is **fine** — the repo moved `cascadelogic` → `164investments` and Vercel stores the old org name against the correct `repoId` `1167109930`, so "relink it" is not the fix.

⛔ **`vercel --prod` is blocked by a guard** (added after 2026-07-23, when a working-tree deploy silently reverted live features). Do not defeat it with `VERCEL_ALLOW_PROD=1` — it is right that shipping the working tree is the wrong move.

**Deploy: merge to `main`, then trigger a build OF THAT COMMIT from git.**
```bash
npm run build                                  # always verify first
gh pr create … && gh pr merge <n> --squash     # main is the production branch
# then force the build Vercel missed (builds the real commit, not your working tree):
#   POST /v13/deployments?teamId=…&forceNew=1
#   {"name":"greylynwayne","target":"production",
#    "gitSource":{"type":"github","repoId":1167109930,"ref":"main"}}
```
Recipe + polling + gotchas: memory `shared/vercel-git-source-deploy-api.md`. The response's
`meta.githubCommitSha` proves which commit is building — check it. Ready in ~1 min; the
deployment's `alias` list covers `greylynwayne.com` and `www.greylynwayne.com`.

## Environment Variables (all set in Vercel, production + preview)
- `NEXT_PUBLIC_GA_ID` — `G-3NTVSELKP5` (GA4)
- `NEXT_PUBLIC_GOOGLE_ADS_ID` — `AW-16716198764` (Google Ads tag)
- `NEXT_PUBLIC_META_PIXEL_ID` — `1596777147987027` (Meta Pixel, browser)
- `NEXT_PUBLIC_GADS_LABEL_FORM` / `_CHAT` / `_PHONE` / `_TEXT` — Google Ads conversion labels
- `META_PIXEL_ID` / `META_CAPI_TOKEN` — server-side Meta CAPI (never exposed to client)
- `RESEND_API_KEY` / `LEAD_FROM_EMAIL` / `LEAD_TO_EMAIL` — lead email (see Lead capture)
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — server-only; durable lead persistence to `website_leads` in the `greylynwayne-admin` Supabase project (see Lead capture). Service-role key is RLS-bypassing — never expose as `NEXT_PUBLIC_*`.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile on the lead forms (see Lead capture / Anti-spam)
- `NEXT_PUBLIC_GTM_ID` — legacy Vercel env only; no code reads it. GTM was removed from the site because GA4 is now in code.
- Set env vars via the Vercel **API** (not `vercel env add` piping) + `.trim()` every read — avoids the trailing-newline bug that silently breaks inlined `NEXT_PUBLIC_*` scripts.

## Analytics & Conversion Tracking
Built to the WNF/Stay-Portland playbook — see ARCHITECTURE.md §3a. Full setup record: memory `greylyn-wayne/tracking-setup-2026-06-16.md`.
- **Tag loaders (in code, layout.tsx)**: `GtagScripts.tsx` = single Google tag (GA4 `G-3NTVSELKP5`, with pageviews owned by `SiteTracker`, + Google Ads `AW-16716198764`, enhanced conversions on). `MetaPixel.tsx` = Meta Pixel `1596777147987027` + PageView. **GTM removed** (its only tag duplicated the GA4 config).
- **Tracking lib**: `src/lib/tracking.ts` — `buildLeadTracking()` (mints shared eventId + applies enhanced-conversions/advanced-matching), `fireLeadConversions()` (GA4 + Google Ads `send_to` + Meta `Lead`), `fireClickConversion()` (phone/text). `trackEvent()` for plain GA4 events.
- **Server CAPI**: `src/lib/server-tracking.ts` ← `app/api/lead/route.ts` — Meta CAPI `Lead` w/ shared eventId (dedup), hashed em/ph/fn/ln, `_fbp`/`_fbc`, IP/UA.
- **Site tracking**: `src/components/SiteTracker.tsx` — delegated listener: route→`page_view`; `phone_click` (+ Ads/Meta conversion); raw `sms:` click (+ Ads/Meta conversion); widget-opening `text_cta_click` (GA4-only, paid lead fires after chat capture); `email_click`; `social_click`; `consultation_cta_click`.
- **Google Ads conversions** (account `151-338-1890`, all PRIMARY): Lead-Form Submit, Lead-Chat Capture, Lead-Phone Click, Lead-Text Click. GA4-imported `generate_lead` is now Secondary (backup). `middleware.ts` captures `gclid`→`_gw_gclid` cookie.
- **Pending**: enable Enhanced Conversions for Leads in the Google Ads UI (terms acceptance, 1 click); verify domain greylynwayne.com in Meta Business Manager `399867133852218` (after DNS cutover).

## Key Paths
- Pages: `src/app/` (home-staging, interior-design, portfolio, reviews, about, contact, + 10 more)
- City pages: `src/app/service-areas/[city]/page.tsx` (33 cities via `generateStaticParams`)
- City data: `src/data/service-areas.ts`
- Blog: `src/app/blog/[slug]/page.tsx` renders posts authored as `src/data/blog/<slug>.json` (typed by `blog/_schema.ts`), registered in `src/data/blog-posts.ts`. Add a post = drop a JSON + 1 import line; it auto-wires the index, sitemap, and BlogPosting/FAQ schema. See ARCHITECTURE.md §6c. **No fabricated stats** (CRO zombie-stat rule).
- JSON-LD: `src/components/JsonLd.tsx` (LocalBusiness, Breadcrumb, FAQ, Service, **BlogPosting** schemas)
- Sitemap: `src/app/sitemap.ts` (auto-generates all 61 URLs — 18 static + 33 city + 10 blog)
- `next.config.ts` — full 301 redirect map (old Wix slugs → new slugs) for the migration.

## Lead capture
- **Endpoint**: `src/app/api/lead/route.ts` — for Contact, Furniture Request, AND chat leads: (1) **persists to Supabase** `website_leads` via `persistLead()` then (2) emails design@greylynwayne.com via **Resend** (reply-to = customer). Env: `RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `LEAD_TO_EMAIL` (GW's own Resend account, domain **verified** 2026-06-17, sends from `leads@greylynwayne.com`).
- **Durable lead store**: `persistLead()` writes name/email/phone/service/message + attribution (`page_path`/`gclid`/`event_id`/`fbp`/`fbc`/`ua`/`ip`) + `raw` jsonb to `website_leads` (Supabase `greylynwayne-admin` project `hhtmipyjhogvbycnfjji`, RLS-on/service-role-only). **Decoupled from email** — runs first, never throws; DB failure ≠ email failure. Schema: `greylynwayne-admin/supabase/migrations/*_website_leads.sql` (`supabase db push`). Query leads with the service-role key via PostgREST `/rest/v1/website_leads`. No visitor table (GA4/Meta only).
- **Anti-spam (layered — see ARCHITECTURE.md §7)**: honeypot `company` field (silent-accept) → content filter `isSpammyContent` (≥5 links / BBCode → silent-accept) → per-IP rate limit (`src/lib/rate-limit.ts`, 5 well-formed submissions / 10 min → 429) → **Cloudflare Turnstile** (`src/components/Turnstile.tsx` + `verifyTurnstile()` in route; invisible managed CAPTCHA, server-verified before send, fail-open on misconfig/network, **chat exempt**). Phone number is intentionally public (`tel:` links + JSON-LD) — by design, no on-site mitigation possible.
- **Turnstile keys**: site key `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, secret `TURNSTILE_SECRET_KEY` (both in Vercel prod+preview). Widget "Greylyn Wayne Lead Forms" managed via Cloudflare account `hayden.laverty@gmail.com` (acct `bb4b10946203d44f10399e80c4f94a84`); domains greylynwayne.com/www/vercel.app. To add a domain: `PATCH /accounts/{acct}/challenges/widgets/{sitekey}`.
- **Forms**: `src/app/contact/page.tsx` + `src/app/furniture-request/page.tsx` POST JSON to `/api/lead` (loading/error states).
- **CTAs are Text-first** (most leads are call/text): "Text Us" (primary) opens `ChatWidget.tsx` (captures name+phone → /api/lead → SMS handoff); Call is secondary + in the header. "Text Us" buttons carry `data-open-chat` → SiteTracker dispatches `gw:open-chat`.

## Brand — official Brand Guidelines (Summer 2025)
Source: `~/Downloads/_Inbox/GW_Brand_Guidelines_Summer_2025.pdf`. Applied 2026-06-17.
- **Palette (6 official colors, mapped to stable token names in `globals.css`)**: GW Teal `#6E9294` (`--color-teal`) · GW Grey Shade `#3E4242` (`--color-charcoal`, `--color-teal-dark`) · GW Grey `#6B7070` (`--color-charcoal-light`) · GW Almost White `#F5F6F4` (`--color-warm`) · GW Grey Tint `#E0E3E3` (`--color-teal-bg`) · GW Teal Tint `#D2D9D8` (`--color-teal-light`, `--color-cream`). Brand has **no warm cream/beige** — the legacy `cream`/`warm` tokens now point at brand neutrals.
- **Fonts**: **EB Garamond** = display headings + body copy (loaded into the `--font-playfair` variable slot, so all `var(--font-playfair)` heading refs render Garamond — name kept to avoid 165 edits). **Montserrat** = uppercase labels/eyebrows/nav/buttons (`--font-montserrat` / `--font-sans`), applied globally via `globals.css` rule `.uppercase:not([class*="playfair"])`. Ogg (print-only H1) is not used on web.
- **Token names are kept stable** — retuning a brand color = edit the hex in `globals.css @theme inline` only; never hardcode hexes in components (lead-email template in `api/lead/route.ts` is the one exception — email-safe inline styles, also on brand hexes).
- Logo: `/public/images/logo-teal.png`, `logo-offwhite.png`; flourish mark `flourish-offwhite.webp`

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
