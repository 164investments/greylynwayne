import type { NextConfig } from "next";

/**
 * 301 redirect map: old Wix slugs → new Next.js slugs.
 *
 * WHY THIS EXISTS: greylynwayne.com is migrating from Wix to this Next.js app
 * on the SAME domain. Wix used long, keyword-stuffed slugs that differ from our
 * clean slugs. Without 301s, every live Google ranking on an old URL 404s at
 * cutover and we lose the link equity (DR 26, 263 referring domains) that is
 * attached to those URLs. Each entry below maps a real, indexed Wix URL
 * (confirmed against the live Wix sitemap + Google Search Console) to its new
 * home. Update this map if a slug changes.
 *
 * Pages whose slug is unchanged (/meet-jody-wallace, /privacy-policy,
 * /qr-code-link-directory) need no entry — they already resolve on the new site.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // --- Core / service pages (exact Wix slug → new slug) ---
      { source: "/home-staging-portland", destination: "/home-staging", permanent: true },
      { source: "/interior-design-portland", destination: "/interior-design", permanent: true },
      { source: "/new-construction-home-staging", destination: "/new-construction-staging", permanent: true },
      { source: "/short-term-rental-design-project", destination: "/short-term-rental-design", permanent: true },
      { source: "/street-of-dreams-luxury-home-design", destination: "/street-of-dreams", permanent: true },
      { source: "/allafamiglia", destination: "/alla-famiglia", permanent: true },
      { source: "/home-staging-interior-design-portfolio", destination: "/portfolio", permanent: true },
      { source: "/home-staging-before-and-after-portland", destination: "/before-and-after", permanent: true },
      { source: "/home-staging-interior-design-reviews", destination: "/reviews", permanent: true },
      { source: "/about-greylyn-wayne-home-staging-design", destination: "/about", permanent: true },
      { source: "/home-staging-interior-design-service-areas", destination: "/service-areas", permanent: true },
      { source: "/contact-home-staging-interior-design-portland", destination: "/contact", permanent: true },
      { source: "/designer-furniture-request", destination: "/furniture-request", permanent: true },
      { source: "/job-opportunities", destination: "/careers", permanent: true },

      // --- Location pages: /location/home-staging-{city} → /service-areas/{city} ---
      // Single wildcard covers all 17 live Wix location pages (and any not yet
      // discovered). Every Wix location city exists in the new city list, so the
      // 1:1 slug rebase is safe.
      { source: "/location/home-staging-:city", destination: "/service-areas/:city", permanent: true },

      // --- Blog: new site has no per-post pages, so all old posts → /blog ---
      { source: "/home-staging-interior-design-blog", destination: "/blog", permanent: true },
      { source: "/home-staging-interior-design-blog/:path*", destination: "/blog", permanent: true },
      { source: "/post/:slug*", destination: "/blog", permanent: true },

      // --- Legacy Wix asset: Alla Famiglia house-details PDF ---
      // The PDF isn't re-hosted yet (the original is ~18MB — needs a
      // web-optimized version before committing). Point old links at the
      // Alla Famiglia page so they don't 404. TODO: host a compressed PDF
      // and restore a direct download.
      {
        source: "/_files/ugd/1ee6bf_d5872a7968b949709a7395ba5ceb9a63.pdf",
        destination: "/alla-famiglia",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
