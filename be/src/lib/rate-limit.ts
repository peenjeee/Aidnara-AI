type RateLimitEntry = {
  count: number;
  resetAt: number;
};

export type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
  now?: number;
};

const buckets = new Map<string, RateLimitEntry>();

export function assertRateLimit(options: RateLimitOptions) {
  const now = options.now ?? Date.now();
  const existing = buckets.get(options.key);

  // ponytail: in-memory best-effort; move to Redis/Upstash when multi-instance limits matter.
  if (!existing || existing.resetAt <= now) {
    buckets.set(options.key, { count: 1, resetAt: now + options.windowMs });
    return;
  }

  if (existing.count >= options.limit) {
    const retryAfterSeconds = Math.ceil((existing.resetAt - now) / 1000);
    throw new Error(`Rate limit exceeded. Retry after ${retryAfterSeconds}s`);
  }

  existing.count += 1;
}

export function resetRateLimits() {
  buckets.clear();
}

export const backendRateLimits = {
  aiReport: { limit: 5, windowMs: 60 * 60 * 1000 },
  certificate: { limit: 10, windowMs: 60 * 60 * 1000 },
  proof: { limit: 10, windowMs: 60 * 60 * 1000 },
  upload: { limit: 30, windowMs: 60 * 60 * 1000 },
} as const;
