"use client";

/**
 * Greylyn Wayne — client-side conversion tracking.
 *
 * Built to the WNF / Stay Portland playbook:
 *  - Module-level gtag/dataLayer stub so events queue before gtag.js loads.
 *  - Lead conversions fire on MULTIPLE paths so no single point of failure:
 *      Google Ads = direct gtag('event','conversion') + GA4-imported backup.
 *      Meta       = browser fbq('track','Lead') + server-side CAPI (api/lead),
 *                   sharing one eventID so Meta dedups the pair.
 *  - Enhanced Conversions / Advanced Matching: we have the lead's identity at
 *    submit time, so user_data is attached to both platforms.
 *  - transport_type:'beacon' so fires survive the SMS / navigation that follows.
 *
 * Conversion LABELS come from env (set after the native Google Ads conversion
 * actions are created). If a label is absent the Ads fire is skipped gracefully
 * — GA4-imported conversions still cover it — so the site never errors.
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

// Initialize dataLayer + gtag stub at module level so events queue before the
// async gtag.js / GTM scripts load (prevents the useEffect-before-script race).
if (typeof window !== "undefined") {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
}

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();

export type LeadSource =
  | "contact"
  | "furniture_request"
  | "chat"
  | "phone"
  | "text";

// Google Ads conversion labels (the part after AW-XXXX/ ). Filled from env once
// the native conversion actions exist. Keyed by lead source.
const ADS_LABELS: Record<LeadSource, string | undefined> = {
  contact: process.env.NEXT_PUBLIC_GADS_LABEL_FORM?.trim(),
  furniture_request: process.env.NEXT_PUBLIC_GADS_LABEL_FORM?.trim(),
  chat: process.env.NEXT_PUBLIC_GADS_LABEL_CHAT?.trim(),
  phone: process.env.NEXT_PUBLIC_GADS_LABEL_PHONE?.trim(),
  text: process.env.NEXT_PUBLIC_GADS_LABEL_TEXT?.trim(),
};

export interface LeadIdentity {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

/** Tracking context shared between the browser fire and the server-side CAPI. */
export interface LeadTracking {
  eventId: string;
  fbp?: string;
  fbc?: string;
  gclid?: string;
  pagePath: string;
  /** Identity echoed to the server so CAPI can hash it for advanced matching. */
  identity: LeadIdentity;
}

/* ------------------------------------------------------------------ */
/* Low-level helpers                                                   */
/* ------------------------------------------------------------------ */

/** Push a GA4 event via gtag (standalone gtag.js processes it → GA4). */
export function trackEvent(
  event: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined" || !window.gtag) return;
  if (params) window.gtag("event", event, params);
  else window.gtag("event", event);
}

/** Push an object-style event to the GTM dataLayer (for GTM-managed tags). */
export function trackGTMEvent(
  event: string,
  data?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") + "=([^;]*)",
    ),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function newEventId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `gw-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

/* ------------------------------------------------------------------ */
/* Enhanced Conversions / Advanced Matching                            */
/* ------------------------------------------------------------------ */

/**
 * Attach the lead's identity to BOTH platforms before the conversion fires.
 * Google hashes user_data client-side (send plaintext, lowercase/trimmed).
 * Meta advanced matching: re-init the pixel with the user data (Meta merges
 * and hashes). Server-side CAPI hashes the same fields for the strongest match.
 */
function applyIdentity(identity: LeadIdentity) {
  if (typeof window === "undefined") return;
  const email = identity.email?.trim().toLowerCase() || undefined;
  const phone = identity.phone?.replace(/[^\d+]/g, "") || undefined;
  const firstName = identity.firstName?.trim().toLowerCase() || undefined;
  const lastName = identity.lastName?.trim().toLowerCase() || undefined;

  if (window.gtag && (email || phone)) {
    window.gtag("set", "user_data", {
      ...(email ? { email } : {}),
      ...(phone ? { phone_number: phone } : {}),
      ...(firstName || lastName
        ? {
            address: {
              ...(firstName ? { first_name: firstName } : {}),
              ...(lastName ? { last_name: lastName } : {}),
              country: "us",
            },
          }
        : {}),
    });
  }

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  if (window.fbq && pixelId && (email || phone)) {
    window.fbq("init", pixelId, {
      ...(email ? { em: email } : {}),
      ...(phone ? { ph: phone } : {}),
      ...(firstName ? { fn: firstName } : {}),
      ...(lastName ? { ln: lastName } : {}),
    });
  }
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

/**
 * Build the tracking context for a lead. Call this BEFORE POSTing to /api/lead
 * and pass the returned object in the request body, so the server CAPI fire and
 * the browser fbq fire share one eventID (Meta dedup). Also applies identity to
 * gtag/fbq for enhanced conversions.
 */
export function buildLeadTracking(identity: LeadIdentity): LeadTracking {
  applyIdentity(identity);
  return {
    eventId: newEventId(),
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
    gclid: readCookie("_gw_gclid") || readCookie("gclid"),
    pagePath: typeof window !== "undefined" ? window.location.pathname : "",
    identity,
  };
}

/**
 * Fire the browser-side lead conversions for a form/chat submission.
 * Server-side CAPI (Meta) + GA4-import (Ads) cover the same event for resiliency.
 */
export function fireLeadConversions(
  source: LeadSource,
  tracking: LeadTracking,
  service?: string,
) {
  const params: Record<string, string> = {
    lead_source: source,
    page_path: tracking.pagePath,
  };
  if (service) params.service_type = service;

  // GA4 (standalone gtag.js) + GTM dataLayer backup.
  trackEvent("generate_lead", params);
  trackGTMEvent("generate_lead", params);

  fireAdsConversion(source, tracking.eventId);
  fireMetaLead(source, tracking.eventId, service);
}

/** Direct Google Ads conversion fire (skipped if the label isn't configured). */
export function fireAdsConversion(source: LeadSource, eventId: string) {
  const label = ADS_LABELS[source];
  if (typeof window === "undefined" || !window.gtag || !ADS_ID || !label) return;
  window.gtag("event", "conversion", {
    send_to: `${ADS_ID}/${label}`,
    transaction_id: eventId,
    transport_type: "beacon",
  });
}

/** Browser Meta Lead fire with a dedup eventID (server CAPI reuses it). */
export function fireMetaLead(source: LeadSource, eventId: string, service?: string) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq(
    "track",
    "Lead",
    {
      content_category: service || source,
      lead_source: source,
    },
    { eventID: eventId },
  );
}

/**
 * Phone / text-CTA clicks: high-intent lead signals with no captured identity.
 * Browser-only (no server CAPI / no order id needed). Primary conversions per
 * the GW config — fire Ads conversion + Meta Lead with a fresh eventID.
 */
export function fireClickConversion(source: "phone" | "text") {
  const eventId = newEventId();
  fireAdsConversion(source, eventId);
  fireMetaLead(source, eventId);
}
