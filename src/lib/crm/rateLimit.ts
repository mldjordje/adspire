/**
 * Minimal in-memory rate limiter for the public lead endpoint.
 *
 * Per-instance only — good enough to blunt a form-spam script, not a
 * distributed limiter. Replace with a Supabase- or Upstash-backed counter if
 * abuse ever becomes real.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 } = {},
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Test seam. */
export function resetRateLimits() {
  buckets.clear();
}
