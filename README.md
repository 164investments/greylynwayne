# Greylyn Wayne — greylynwayne.com

Marketing and lead site for Greylyn Wayne (home staging and interior design in
Portland, Oregon), built with Next.js 16, React 19, and Tailwind CSS v4.

- Architecture, routes, redirects, SEO, and lead endpoint: [ARCHITECTURE.md](ARCHITECTURE.md)
- Repository rules and release workflow: [AGENTS.md](AGENTS.md)

## Local development

Use Node 26 and npm (`package-lock.json`):

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

This repository has no CI workflow or test suite; run checks locally before
pushing:

```bash
npm run lint
npm run build
```

`prebuild` runs `npm run typecheck` (`next typegen && tsrs --version && tsrs --noEmit`)
and `next build` prerenders every page.

## Deployment

Merging to `main` deploys production to `www.greylynwayne.com` and
`greylynwayne.com` on Vercel. Environment variable names are listed in
[ARCHITECTURE.md](ARCHITECTURE.md).
