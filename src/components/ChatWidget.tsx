"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import {
  trackEvent,
  buildLeadTracking,
  fireLeadConversions,
} from "@/lib/tracking";

/**
 * Capture-then-text lead widget. Optimizes for speed-to-lead on a local service
 * business: it grabs name + phone (firing the lead into the /api/lead email
 * pipeline immediately, so the lead is owned even if the visitor never sends the
 * text), then hands off to the visitor's SMS app pre-addressed to the business
 * line for the fastest possible reply. Desktop (no SMS handler) still captures
 * the lead and shows a confirmation.
 */

const BUSINESS_SMS = "+19719300220";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState("");

  function toggle() {
    setOpen((v) => {
      const next = !v;
      if (next) trackEvent("chat_open");
      return next;
    });
  }

  // Let any "Text Us" CTA elsewhere on the page open this widget (so those
  // CTAs capture the lead instead of leaking to a raw sms: link). SiteTracker
  // dispatches `gw:open-chat` when a [data-open-chat] element is clicked.
  useEffect(() => {
    function openFromCta() {
      setDone(false);
      setOpen(true);
      trackEvent("chat_open", { source: "cta" });
    }
    window.addEventListener("gw:open-chat", openFromCta);
    return () => window.removeEventListener("gw:open-chat", openFromCta);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | null)?.value?.trim() || "";
    const name = get("name");
    const phoneVal = get("phone");
    const message = get("message");

    if (!name || !phoneVal) {
      setError("Please enter your name and phone number.");
      return;
    }

    setLoading(true);
    setError(null);

    // Build tracking BEFORE the POST so server CAPI + browser fbq share one
    // eventID. Fire the conversions BEFORE the SMS hand-off (beacon transport in
    // fireAdsConversion survives the window.location navigation below).
    const tracking = buildLeadTracking({ phone: phoneVal, firstName: name });

    // Capture first (safety net) — don't block the SMS handoff on its result.
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "chat",
          name,
          phone: phoneVal,
          message,
          company: get("company"), // honeypot
          tracking,
        }),
      });
      fireLeadConversions("chat", tracking);
    } catch {
      // Lead capture failed; still hand off to text so the visitor isn't blocked.
    }

    // Hand off to the visitor's SMS app, pre-filled.
    const body = `Hi Greylyn Wayne, this is ${name}.${message ? ` ${message}` : " I'd like to talk about staging / interior design."}`;
    const smsHref = `sms:${BUSINESS_SMS}?&body=${encodeURIComponent(body)}`;
    setPhone(phoneVal);
    setLoading(false);
    setDone(true);
    trackEvent("chat_text_handoff");
    window.location.href = smsHref;
  }

  return (
    <div className="fixed right-4 bottom-20 lg:right-6 lg:bottom-6 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-[min(20rem,calc(100vw-2rem))] bg-white border border-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
          <div className="bg-teal text-white px-5 py-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Text Greylyn Wayne</p>
              <p className="text-teal-bg text-xs">We usually reply in minutes</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/80 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {done ? (
            <div className="p-5 text-center">
              <svg className="h-10 w-10 text-teal mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-charcoal text-sm mb-2">
                Your text should be opening now. If it doesn&apos;t, we already have your
                number — we&apos;ll text you at <span className="font-medium">{phone}</span> shortly.
              </p>
              <p className="text-charcoal-light text-xs">
                Prefer to talk?{" "}
                <a href="tel:9719300220" className="text-teal font-medium hover:text-teal-dark">
                  Call (971) 930-0220
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <p className="text-charcoal-light text-xs leading-relaxed">
                Send us a quick text about your project and we&apos;ll get right back to you.
              </p>
              {/* Honeypot */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name *"
                className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-teal placeholder:text-gray-400"
              />
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                placeholder="Mobile number *"
                className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-teal placeholder:text-gray-400"
              />
              <input
                type="text"
                name="message"
                placeholder="How can we help? (optional)"
                className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-teal placeholder:text-gray-400"
              />
              {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal text-white py-3 text-sm tracking-wider uppercase font-medium hover:bg-teal-dark transition-colors disabled:opacity-60"
              >
                {loading ? "Sending…" : "Text Us Now"}
              </button>
              <p className="text-[11px] text-charcoal-light text-center">
                We&apos;ll only use your number to reply about your project.
              </p>
            </form>
          )}
        </div>
      )}

      <button
        onClick={toggle}
        aria-label={open ? "Close chat" : "Text us"}
        aria-expanded={open}
        // Desktop-only floating handle. On mobile the sticky bottom bar is the
        // single persistent Text action — avoids two stacked "Text Us" controls.
        // The panel still opens on mobile via any [data-open-chat] CTA.
        className={`${open ? "flex" : "hidden lg:flex"} items-center gap-2 bg-teal text-white pl-4 pr-5 py-3.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:bg-teal-dark transition-colors`}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-2.685.16 4.486 4.486 0 001.276-2.876c.026-.198-.07-.392-.246-.487A8.225 8.225 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
        <span className="text-sm font-medium tracking-wide">{open ? "Close" : "Text Us"}</span>
      </button>
    </div>
  );
}
