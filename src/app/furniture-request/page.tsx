"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import Link from "next/link";
import { buildLeadTracking, fireLeadConversions } from "@/lib/tracking";
import Turnstile, {
  turnstileEnabled,
  type TurnstileHandle,
} from "@/components/Turnstile";

export default function FurnitureRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | null)?.value?.trim() || "";
    const interest = get("interest");
    const company = get("company");
    if (company) {
      setSubmitted(true);
      return;
    }

    if (turnstileEnabled && !token) {
      setError("Please wait a moment for the security check to finish, then try again.");
      return;
    }

    const tracking = buildLeadTracking({
      email: get("email"),
      phone: get("phone"),
      firstName: get("name"),
    });

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "furniture_request",
          name: get("name"),
          email: get("email"),
          phone: get("phone"),
          interest,
          details: get("details"),
          company, // honeypot
          turnstileToken: token,
          tracking,
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      fireLeadConversions("furniture_request", tracking, interest || undefined);
      setSubmitted(true);
    } catch (err) {
      // Token is single-use — reset the widget so a retry gets a fresh one.
      turnstileRef.current?.reset();
      setToken("");
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
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <p className="text-teal text-sm tracking-[0.3em] uppercase mb-4">
              Furniture Rental & Sales
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Furniture Inquiries
            </h1>
            <p className="text-charcoal-light text-lg max-w-2xl mx-auto">
              Interested in renting or purchasing designer furniture from our
              curated staging inventory? Fill out the form below and we&apos;ll
              get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          {submitted ? (
            <div className="bg-teal-bg p-12 text-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4">
                Request Received!
              </h2>
              <p className="text-charcoal-light mb-6">
                We&apos;ll review your furniture inquiry and get back to you
                within 48 hours with availability and pricing.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-charcoal-light mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-charcoal-light mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-charcoal-light mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors"
                />
              </div>
              <div>
                <label htmlFor="interest" className="block text-sm text-charcoal-light mb-2">
                  Interest Type
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors bg-white"
                >
                  <option value="">Select an option</option>
                  <option value="rental">Furniture Rental</option>
                  <option value="purchase">Furniture Purchase</option>
                  <option value="both">Both / Not Sure</option>
                </select>
              </div>
              <div>
                <label htmlFor="details" className="block text-sm text-charcoal-light mb-2">
                  What are you looking for? *
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={5}
                  required
                  placeholder="Describe the pieces you're interested in, your space, and your timeline."
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors resize-vertical placeholder:text-gray-400"
                />
              </div>
              <Turnstile
                ref={turnstileRef}
                onVerify={setToken}
                onExpire={() => setToken("")}
              />
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
                {loading ? "Sending…" : "Submit Furniture Inquiry"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
