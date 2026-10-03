const buckets = new Map<string, number[]>();
let lastSweep = 0;

const SWEEP_INTERVAL_MS = 60_000;
const MAX_WINDOW_MS = 24 * 60 * 60 * 1000;

const sweep = (now: number): void => {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  for (const [key, hits] of buckets) {
    const fresh = hits.filter((t) => now - t < MAX_WINDOW_MS);
    if (fresh.length === 0) buckets.delete(key);
    else buckets.set(key, fresh);
  }
};

export interface RateLimitResult {
  ok: boolean;
  retryAfterSec: number;
}

/**
 * Sliding-window limiter held in instance memory. Fluid Compute reuses instances, so this
 * catches bursts, but it is per-instance; pair with a Vercel Firewall rule for a hard cap.
 */
export const hitRateLimit = (key: string, limit: number, windowMs: number): RateLimitResult => {
  const now = Date.now();
  sweep(now);

  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    const oldest = hits[0] ?? now;
    buckets.set(key, hits);
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)) };
  }

  hits.push(now);
  buckets.set(key, hits);
  return { ok: true, retryAfterSec: 0 };
};
