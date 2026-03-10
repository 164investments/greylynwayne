"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { trackFormSubmit } from "@/lib/tracking";

export default function FurnitureRequestPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const interest = (form.elements.namedItem("interest") as HTMLSelectElement)?.value;
    trackFormSubmit("furniture_request", interest || undefined);
    setSubmitted(true);
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
              <button
                type="submit"
                className="bg-teal text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-teal-dark transition-colors w-full font-medium"
              >
                Submit Furniture Inquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
