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
