"use client";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Initialize dataLayer + gtag stub at module level so events queue
// before the async GTM script loads (prevents race condition with useEffect)
if (typeof window !== "undefined") {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
}

/** Push a GA4 event via gtag */
export function trackEvent(
  event: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  if (params) {
    window.gtag("event", event, params);
  } else {
    window.gtag("event", event);
  }
}

/** Push an event to the GTM dataLayer */
export function trackGTMEvent(
  event: string,
  data?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

/** Track a form submission — fires to both gtag and dataLayer */
export function trackFormSubmit(
  formType: string,
  serviceType?: string,
) {
  const params: Record<string, string> = {
    form_type: formType,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  };
  if (serviceType) params.service_type = serviceType;

  trackEvent("form_submit", params);
  trackEvent("generate_lead", params);
  trackGTMEvent("form_submit", params);
  trackGTMEvent("generate_lead", params);
}
