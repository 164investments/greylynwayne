import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { GoogleG, RatingStars, RATING, REVIEW_COUNT } from "@/components/Proof";

/**
 * Stacked editorial hero (mobile), mirroring the old Wix homepage pattern:
 * a clean full-width photo on top with NO text on it, then the headline,
 * proof, and CTAs in a solid brand-teal band directly below. Keeps the
 * photograph reading as a photograph (no overlay) — the look the brand wants.
 *
 * Server component — "Text Us" uses [data-open-chat], delegated by SiteTracker.
 */
export default function HeroStacked({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <section className="pt-20">
      {/* Clean photo — no overlay, no text */}
      <div className="relative w-full aspect-[3/2]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Solid teal band with the headline + proof + CTAs */}
      <div className="bg-teal text-white px-6 py-10 text-center">
        <p className="text-white/80 text-sm tracking-[0.3em] uppercase mb-4">
          {eyebrow}
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] leading-[1.08] text-4xl sm:text-5xl mb-4">
          {title}
        </h1>
        <p className="text-white/90 text-lg leading-relaxed mb-7 max-w-md mx-auto">
          {subtitle}
        </p>

        {/* Google review proof on a white pill */}
        <Link
          href="/reviews"
          className="inline-flex items-center gap-2.5 bg-white rounded-full pl-3.5 pr-4 py-2 mb-8 shadow-sm"
          aria-label={`Rated ${RATING} stars from ${REVIEW_COUNT} Google reviews`}
        >
          <GoogleG className="h-[15px] w-[15px]" />
          <span className="text-[#e0a82e]">
            <RatingStars className="h-[13px] w-[13px]" />
          </span>
          <span className="text-sm font-bold text-charcoal">{RATING}</span>
          <span className="w-px h-3.5 bg-[#e0d9cc]" aria-hidden="true" />
          <span className="text-sm text-charcoal-light">
            {REVIEW_COUNT} Google reviews
          </span>
        </Link>

        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          <button
            type="button"
            data-open-chat
            className="inline-flex items-center justify-center gap-2 bg-white text-teal px-8 py-4 text-sm tracking-wider uppercase hover:bg-warm transition-colors duration-200 font-medium"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-2.685.16 4.486 4.486 0 001.276-2.876c.026-.198-.07-.392-.246-.487A8.225 8.225 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            Text Us
          </button>
          <a
            href="tel:9719300220"
            className="inline-flex items-center justify-center gap-2 border border-white/70 text-white px-8 py-4 text-sm tracking-wider uppercase hover:bg-white/10 transition-colors duration-200 font-medium"
          >
            Call (971) 930-0220
          </a>
        </div>
      </div>
    </section>
  );
}
