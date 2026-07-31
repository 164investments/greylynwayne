"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent, fireClickConversion } from "@/lib/tracking";

/**
 * Site-wide tracking via delegated click listeners + route-change events.
 * Mounted once in layout.tsx — no per-page modifications needed.
 */
export default function SiteTracker() {
  const pathname = usePathname();

  // Track client-side route changes
  useEffect(() => {
    trackEvent("page_view", { page_path: pathname });
  }, [pathname]);

  // High-intent page views
  useEffect(() => {
    if (pathname === "/contact") {
      trackEvent("contact_page_view");
    } else if (pathname === "/portfolio") {
      trackEvent("portfolio_view");
    } else if (pathname === "/furniture-request") {
      trackEvent("furniture_request_view");
    }
  }, [pathname]);

  // Delegated click tracking for links across the entire site
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      // "Text Us" CTAs anywhere on the page open the chat-capture widget.
      const chatTrigger = (e.target as Element).closest("[data-open-chat]");
      if (chatTrigger) {
        e.preventDefault();
        window.dispatchEvent(new Event("gw:open-chat"));
        trackEvent("text_cta_click", { cta_location: getLocation(chatTrigger) });
        return;
      }

      const link = (e.target as Element).closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const isMobileCTA = !!link.closest("[data-mobile-cta]");

      // Phone clicks
      if (href.startsWith("tel:")) {
        e.preventDefault();
        trackEvent("phone_click", {
          link_url: href,
          cta_location: isMobileCTA ? "mobile_cta" : getLocation(link),
        });
        fireClickConversion("phone"); // Primary conversion.
        window.setTimeout(() => {
          window.location.href = href;
        }, 200);
        return;
      }

      // Raw SMS links only. Widget-opening "Text Us" buttons are GA4-only here;
      // the paid lead conversion fires after the chat capture succeeds.
      if (href.startsWith("sms:")) {
        e.preventDefault();
        trackEvent("text_cta_click", {
          link_url: href,
          cta_location: isMobileCTA ? "mobile_cta" : getLocation(link),
        });
        fireClickConversion("text");
        window.setTimeout(() => {
          window.location.href = href;
        }, 200);
        return;
      }

      // Email clicks
      if (href.startsWith("mailto:")) {
        trackEvent("email_click", {
          link_url: href,
          cta_location: getLocation(link),
        });
        return;
      }

      // Social clicks
      if (
        href.includes("instagram.com") ||
        href.includes("facebook.com") ||
        href.includes("pinterest.com") ||
        href.includes("tiktok.com")
      ) {
        trackEvent("social_click", {
          link_url: href,
          platform: getSocialPlatform(href),
        });
        return;
      }

      // Consultation CTA clicks (internal links to /contact)
      if (
        (href === "/contact" || href.startsWith("/contact?")) &&
        link.textContent?.toLowerCase().includes("consult")
      ) {
        trackEvent("consultation_cta_click", {
          cta_location: isMobileCTA ? "mobile_cta" : getLocation(link),
        });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

function getLocation(el: Element): string {
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  if (el.closest("[data-mobile-cta]")) return "mobile_cta";
  if (el.closest("section")) return "page";
  return "unknown";
}

function getSocialPlatform(href: string): string {
  if (href.includes("instagram.com")) return "instagram";
  if (href.includes("facebook.com")) return "facebook";
  if (href.includes("pinterest.com")) return "pinterest";
  if (href.includes("tiktok.com")) return "tiktok";
  return "other";
}
