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
  const loaderId = ADS_ID || GA_ID;
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
            ${GA_ID ? `gtag('config', '${GA_ID}', { send_page_view: true });` : ""}
            ${ADS_ID ? `gtag('config', '${ADS_ID}', { allow_enhanced_conversions: true });` : ""}
          `,
        }}
      />
    </>
  );
}
