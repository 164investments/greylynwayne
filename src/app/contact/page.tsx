"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { trackFormSubmit } from "@/lib/tracking";
import { RatingBadge } from "@/components/Proof";

const serviceOptions = [
  "Home Staging — Vacant Property",
  "Home Staging — Occupied Property",
  "Home Staging — Luxury / Estate",
  "Interior Design — Full Service",
  "Interior Design — Consultation Only",
  "Furniture Rental",
  "Short-Term Rental / Airbnb Design",
  "New Construction / Model Home",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | null)?.value?.trim() || "";
    const service = get("service");

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "contact",
          firstName: get("firstName"),
          lastName: get("lastName"),
          email: get("email"),
          phone: get("phone"),
          service,
          message: get("message"),
          company: get("company"), // honeypot
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      trackFormSubmit("contact", service || undefined);
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call us at (971) 930-0220.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Free Consultation
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Let&apos;s Talk About Your Project
            </h1>
            <p className="text-charcoal-light text-lg max-w-2xl mx-auto mb-2">
              Tell us about your space and we&apos;ll get back to you within 24
              hours with next steps.
            </p>
            <p className="text-teal text-sm font-medium mb-8">
              Free &middot; No obligation &middot; Same-week availability
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                data-open-chat
                className="inline-flex items-center justify-center gap-2 bg-teal text-white px-8 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors font-medium"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-2.685.16 4.486 4.486 0 001.276-2.876c.026-.198-.07-.392-.246-.487A8.225 8.225 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                Text Us
              </button>
              <a
                href="tel:9719300220"
                className="inline-flex items-center justify-center gap-2 border border-teal text-teal px-8 py-4 text-sm tracking-wider uppercase hover:bg-teal hover:text-white transition-colors font-medium"
              >
                Call (971) 930-0220
              </a>
            </div>
            <p className="text-charcoal-light text-sm mt-6">
              Prefer the form below? It reaches us just as fast.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-teal-bg p-12 text-center">
                  <svg
                    className="h-12 w-12 text-teal mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4">
                    Message Received!
                  </h2>
                  <p className="text-charcoal-light mb-2">
                    Thank you for reaching out. We&apos;ll review your project
                    details and get back to you within 24 hours.
                  </p>
                  <p className="text-charcoal-light text-sm mb-6">
                    Need something sooner? Call us at{" "}
                    <a
                      href="tel:9719300220"
                      className="text-teal font-medium hover:text-teal-dark"
                    >
                      (971) 930-0220
                    </a>
                  </p>
                  <Link
                    href="/"
                    className="text-teal text-sm tracking-wider uppercase hover:text-teal-dark transition-colors font-medium"
                  >
                    &larr; Back to Home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot — hidden from real users, catches bots */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  {/* Trust signal above form */}
                  <div className="bg-warm p-4 flex items-center gap-3 text-sm text-charcoal-light mb-2">
                    <svg
                      className="h-5 w-5 text-teal flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                    <span>
                      Your information is private and never shared. We respond
                      within 24 hours.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm text-charcoal-light mb-2"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        autoComplete="given-name"
                        placeholder="Jane"
                        className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm text-charcoal-light mb-2"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        autoComplete="family-name"
                        placeholder="Smith"
                        className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm text-charcoal-light mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="jane@example.com"
                        className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm text-charcoal-light mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        placeholder="(503) 555-0100"
                        className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm text-charcoal-light mb-2"
                    >
                      What service are you interested in?
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors bg-white"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm text-charcoal-light mb-2"
                    >
                      Tell us about your project{" "}
                      <span className="text-charcoal-light/60">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Optional — a quick note on your home, goals, or timeline helps us reply faster. Or just say hi and we'll take it from there."
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors resize-vertical placeholder:text-gray-400"
                    />
                  </div>
                  {error && (
                    <p
                      role="alert"
                      className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3"
                    >
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors w-full font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Sending…"
                      : "Send Message & Get Your Free Consultation"}
                  </button>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1 text-center">
                    <RatingBadge />
                    <span className="text-xs text-charcoal-light">
                      We typically respond within 24 hours.
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2">
              <div className="bg-warm p-8 lg:p-10 mb-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-6">
                  Contact Information
                </h3>
                <ul className="space-y-4 text-sm text-charcoal-light">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    <a href="tel:9719300220" className="hover:text-teal transition-colors font-medium">(971) 930-0220</a>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    <a href="mailto:design@greylynwayne.com" className="hover:text-teal transition-colors">design@greylynwayne.com</a>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    <span>Portland, Oregon 97214</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Mon – Sat, 8:00 AM – 8:00 PM</span>
                  </li>
                </ul>
              </div>

              <div className="bg-teal p-8 lg:p-10 text-white mb-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-4">
                  Prefer to Talk?
                </h3>
                <p className="text-teal-bg text-sm leading-relaxed mb-6">
                  Call us directly for immediate help with your project. We&apos;re
                  happy to discuss your needs over the phone.
                </p>
                <a
                  href="tel:9719300220"
                  className="inline-flex items-center gap-2 bg-white text-teal-dark px-6 py-3 text-sm tracking-wider uppercase font-medium hover:bg-cream transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  Call (971) 930-0220
                </a>
              </div>

              {/* Trust signals */}
              <div className="border border-gray-200 p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                  Why Choose Greylyn Wayne
                </h4>
                <ul className="space-y-3 text-sm text-charcoal-light">
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-0.5">&#10003;</span>
                    4x Street of Dreams Featured Designer
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-0.5">&#10003;</span>
                    People&apos;s &amp; Professional&apos;s Choice Award Winner
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-0.5">&#10003;</span>
                    2,500+ Homes Staged Since 2015
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-0.5">&#10003;</span>
                    Family-Run Portland Business
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-0.5">&#10003;</span>
                    Free, No-Obligation Consultations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24 lg:py-32 bg-warm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
            Where We Work
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-8">
            Home Staging &amp; Interior Design Service Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">
                Portland Metro
              </h3>
              <p className="text-charcoal-light text-sm leading-relaxed">
                Pearl District, Irvington, Laurelhurst, Sellwood, Alberta Arts,
                Eastmoreland, Lake Oswego, West Linn, Beaverton, Tigard,
                Happy Valley, Milwaukie, Sherwood, Oregon City
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">
                Greater Oregon
              </h3>
              <p className="text-charcoal-light text-sm leading-relaxed">
                Bend, Eugene, Salem, Hood River, Cannon Beach, Astoria,
                Manzanita, Seaside, Lincoln City, Sunriver, Government Camp
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">
                SW Washington
              </h3>
              <p className="text-charcoal-light text-sm leading-relaxed">
                Vancouver, Camas, Ridgefield, and surrounding communities
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
