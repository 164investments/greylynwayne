import Script from "next/script";

/**
 * Standalone gtag.js — the SINGLE Google tag for both GA4 and Google Ads.
 *
 * WHY IN CODE (not GTM): the site fires `window.gtag("event", ...)` directly
 * from tracking.ts / SiteTracker. GTM's internal gtag instance ignores those
 * arguments-style calls, so a standalone gtag.js library MUST be loaded or the
 * custom GA4 events (phone_click, generate_lead, …) are silently dropped.
 *
 * ONE Google tag per GA4 property: GA4 (G-…) is configured HERE, so the
 * duplicate "GA4 - Configuration" tag is removed from the GTM container. Two
 * config tags for the same property break session_engaged (engagementRate → 0).
 * `send_page_view:false` is intentional: SiteTracker owns initial + SPA route
 * pageviews so the first page load is not counted twice.
 *
 * Google Ads (AW-…) is configured in the same instance with enhanced
 * conversions on, so direct `gtag("event","conversion",{send_to})` works.
 *
 * `.trim()` on every env read defends against the Vercel trailing-newline bug
 * that silently broke tracking on Highland Farms / Historic Tattoo.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();

export function GtagScripts() {
  // gtag.js can be loaded with either id; load it once and config both.
  //
  // Prefer the GA4 id as the loader so the primary bundle is the property this
  // site actually owns. `gtag/js?id=G-3NTVSELKP5` carries only itself, whereas
  // `gtag/js?id=AW-16716198764` embeds the retired Wix-era GA4 property
  // G-WBRPWBZPD1 (property 458213556) as a *linked destination*.
  //
  // ⚠️ THIS DOES NOT STOP THE DUPLICATE HIT, and no code change can.
  // Verified 2026-07-31 with a headless page load: `gtag('config', ADS_ID)`
  // below makes gtag.js fetch the AW- bundle anyway, which brings its linked
  // destinations with it, so a collect hit still fires to tid=G-WBRPWBZPD1.
  // The only real fix is removing G-WBRPWBZPD1 from the Ads Google tag's
  // linked destinations in the Google Ads UI. Dropping the AW- config is not
  // an option — the `send_to` conversion fires in tracking.ts depend on it.
  // NB: grepping page HTML cannot detect linked destinations; grep the loader
  // bundle itself, or capture /g/collect requests and read the `tid` param.
  const loaderId = GA_ID || ADS_ID;
  if (!loaderId) return null;

  return (
    <>
      <Script
        id="gtag-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            ${GA_ID ? `gtag('config', '${GA_ID}', { send_page_view: false });` : ""}
            ${ADS_ID ? `gtag('config', '${ADS_ID}', { allow_enhanced_conversions: true });` : ""}
          `,
        }}
      />
    </>
  );
}
