/**
 * Dependency-free, fixed-window rate limiter for the lead endpoint.
 *
 * Caps how many lead submissions a single client IP can make per window so a
 * spammer can't flood the inbox or burn through the Resend quota / sender
 * reputation. State lives in a module-level Map, so it's per-serverless-
 * instance: under Vercel's model each warm instance enforces its own counter.
 * For a low-traffic local-business site that's an effective ceiling (the
 * honeypot + content filter in the route catch the rest). If real abuse ever
 * outgrows it, swap the body for a shared store (e.g. Upstash Redis) behind
 * this same checkRateLimit() signature — callers don't change.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Drop expired buckets so the Map can't grow unbounded over a long uptime. */
function prune(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
};

/**
 * Record a hit for `key` and report whether it's within `limit` per `windowMs`.
 * Each call counts as one hit when allowed.
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  if (buckets.size > 5000) prune(now); // safety valve against unbounded growth

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSec: 0 };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { ok: true, remaining: limit - bucket.count, retryAfterSec: 0 };
}
