import Link from "next/link";

/**
 * Single source of truth for Greylyn Wayne's headline proof.
 * Numbers are the real, verifiable Google Business Profile figures and must
 * match the aggregateRating in JsonLd.tsx (4.9 / 163). Do not show "5.0" —
 * it both contradicts the schema and reads as fake (Spiegel: rating credibility
 * peaks at 4.0–4.7 and declines toward a perfect 5.0).
 */
export const RATING = "4.9";
export const REVIEW_COUNT = "163";
// TODO(Hayden): swap for the direct Google Business Profile reviews URL (g.page/... or a Place-ID link).
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Greylyn+Wayne+Interior+Design+%26+Home+Staging+Portland+reviews";

export function RatingStars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="inline-flex" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={className} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/** Compact "4.9 ★ · 163 Google reviews" badge, links to Google. */
export function RatingBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  const text = tone === "dark" ? "text-white" : "text-charcoal";
  const sub = tone === "dark" ? "text-white/80" : "text-charcoal-light";
  return (
    <Link
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 group"
      aria-label={`Rated ${RATING} stars from ${REVIEW_COUNT} Google reviews`}
    >
      <span className="text-amber-400">
        <RatingStars />
      </span>
      <span className={`text-sm font-semibold ${text}`}>{RATING}</span>
      <span className={`text-sm ${sub} group-hover:underline`}>
        {REVIEW_COUNT} Google reviews
      </span>
    </Link>
  );
}

/** Google's 4-color "G" mark. */
export function GoogleG({ className = "h-[17px] w-[17px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

/**
 * Hero social proof — a recognizable Google review badge over a quiet credential
 * line. Designed for a light background (e.g. the split-hero cream panel).
 */
export function HeroProof({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Link
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 bg-white border border-[#e7e1d6] rounded-full pl-4 pr-5 py-2.5 shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition-shadow"
        aria-label={`Rated ${RATING} stars from ${REVIEW_COUNT} Google reviews`}
      >
        <GoogleG />
        <span className="text-[#e0a82e]">
          <RatingStars className="h-[15px] w-[15px]" />
        </span>
        <span className="text-sm font-bold text-charcoal">{RATING}</span>
        <span className="w-px h-4 bg-[#e0d9cc]" aria-hidden="true" />
        <span className="text-sm text-charcoal-light">{REVIEW_COUNT} Google reviews</span>
      </Link>
      <p className="mt-3.5 text-xs tracking-wider uppercase text-charcoal-light/75">
        <span className="font-semibold text-charcoal-light">
          4&times; Street of Dreams Designer
        </span>{" "}
        &middot; 500+ Homes Staged Since 2015
      </p>
    </div>
  );
}

/**
 * Horizontal trust strip for placement under a page H1.
 * tone="dark" for use over dark hero imagery, "light" for light backgrounds.
 */
export function ProofStrip({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const text = tone === "dark" ? "text-white/90" : "text-charcoal-light";
  const divider = tone === "dark" ? "text-white/30" : "text-teal";
  const items = ["4x Street of Dreams Designer", "500+ Homes Staged Since 2015"];
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm ${text} ${className}`}
    >
      <RatingBadge tone={tone} />
      {items.map((item) => (
        <span key={item} className="flex items-center gap-4">
          <span className={`${divider} hidden sm:inline`} aria-hidden="true">
            &middot;
          </span>
          <span>{item}</span>
        </span>
      ))}
    </div>
  );
}
