# Greylyn Wayne — greylynwayne.com

The marketing and lead site for Greylyn Wayne, Jody Wallace's home staging and interior design business in Portland, Oregon. It is a mostly static Next.js site with one server route that saves and emails leads. It must never lose a lead, break the 301 redirects from the old Wix URLs, or break conversion tracking.

- **Owner:** @cascadelogic.
- **Registry:** `164investments/team-agents` `registry/repos.json` entry `greylynwayne`.
- **Company rules:** [engineering delivery](https://github.com/164investments/team-agents/blob/main/policies/engineering-delivery.md).
- Read [ARCHITECTURE.md](ARCHITECTURE.md) before changing code. It covers where code goes, the lead endpoint and its spam defenses, conversion tracking, SEO, the redirect map and the blog.
- On Hayden's Mac, business context, brand and SEO notes are in his agent memory under `greylyn-wayne/`.

## Release lane

- **Production:** `main` is production: Vercel project `greylynwayne` (team `simplyvrm`), serving `www.greylynwayne.com` and `greylynwayne.com`.
- **Deploys don't start on their own.** GitHub pushes don't trigger Vercel builds, and relinking the repository doesn't fix it. After a merge, start a production build of `main` from git through the Vercel API: `POST /v13/deployments?teamId=…&forceNew=1` with `{"name":"greylynwayne","target":"production","gitSource":{"type":"github","repoId":1167109930,"ref":"main"}}`. Check that the response's `meta.githubCommitSha` is your merge commit.
- Never deploy a working tree with `vercel --prod`, and never get around its guard with `VERCEL_ALLOW_PROD=1`.
- **Other lanes:** none.
- **Feature work:** a `feat/*` or `fix/*` branch from `origin/main` in its own worktree, and a ready pull request with auto-merge on (`gh pr merge --auto --squash`). This repository has no CI and no required check, so run the fast check before you push.

## Data boundaries

- **Database:** write-only. The lead route saves each lead to `website_leads` in the `greylynwayne-admin` Supabase project (registry `greylynwayne-admin-db-prod`). Nothing is read back at runtime, and there is no visitor table. The table's schema lives in the `greylynwayne-admin` repository.
- **Reading leads:** PostgREST `/rest/v1/website_leads` with the service-role key.
- **Writes outside the site:** each lead is emailed through Greylyn Wayne's own Resend account, from `leads@greylynwayne.com` to `design@greylynwayne.com`. Leads also go to Meta's server-side Conversions API.
- **Guest-facing content:** no VRM guests. The whole site is public marketing copy.
- **Secrets:** Vercel environment variables (production and preview); ARCHITECTURE.md §3 and §7 list the names. Set them through the Vercel API, not by piping into `vercel env add`, and `.trim()` every read: a trailing newline silently breaks the inlined `NEXT_PUBLIC_*` scripts. Never expose the service-role key or `META_CAPI_TOKEN` as `NEXT_PUBLIC_*`.

## Commands

- Install: `npm ci`
- Fast check, run before you push: `npm run lint && npm run build`. `prebuild` runs `npm run typecheck`, and the build prerenders every page. There is no test suite.
- Dev server: `npm run dev -- -H 0.0.0.0`
- Production check, run after the deploy: confirm the production deployment's `meta.githubCommitSha` is the merge commit, then `curl -fsS -o /dev/null https://www.greylynwayne.com/`.

## Rules for this repository

- Never fabricate stats, ROI figures or study citations, in blog posts, city pages or anywhere else.
- When a slug changes, add a 301 from the old slug in `next.config.ts` in the same pull request.
- Brand colors are tokens in `src/app/globals.css` `@theme inline`. Retune a color there, and never hardcode hexes in components. The one exception is the lead email template in `src/app/api/lead/route.ts`.
- The `--font-playfair` variable renders EB Garamond, for headings and body; the name is kept on purpose. Montserrat is the uppercase label, nav and button font.
- Calls to action are text-first: "Text Us" is primary and opens `ChatWidget.tsx`, and Call is secondary. Write benefit-driven button text ("Get Your Free Consultation", not "Submit").
- The phone number is public on purpose (`tel:` links and JSON-LD). Don't hide it.
- The Turnstile widget "Greylyn Wayne Lead Forms" is in Hayden's Cloudflare account. To allow a new domain, `PATCH /accounts/{account}/challenges/widgets/{sitekey}`.
- This repository is public. Never commit account IDs, emails, keys or other private details.
