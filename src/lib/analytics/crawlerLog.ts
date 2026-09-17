import "server-only";

import { getSql, isDatabaseConfigured } from "@/lib/db";
import { identifyCrawler } from "@/lib/analytics/crawlers";

export type CrawlerHit = {
  bot: string;
  path: string;
  source: "route" | "drain";
  status?: number;
};

/**
 * Per-instance throttle.
 *
 * Bytespider and CCBot re-fetch the same URL dozens of times an hour. The
 * dashboard question is "did this engine read this page", not "how many times",
 * so one row per bot+path per window is the whole signal — and it keeps a
 * crawl burst from turning into a bill on a per-write database.
 */
const WINDOW_MS = 10 * 60 * 1000;
const lastSeen = new Map<string, number>();

function shouldRecord(key: string, now: number): boolean {
  const previous = lastSeen.get(key);
  if (previous && now - previous < WINDOW_MS) return false;
  lastSeen.set(key, now);
  // Serverless instances are short-lived, but a long-running one should not
  // grow this map forever.
  if (lastSeen.size > 5000) {
    for (const [entry, seen] of Array.from(lastSeen.entries())) {
      if (now - seen > WINDOW_MS) lastSeen.delete(entry);
    }
  }
  return true;
}

/**
 * Writes crawler hits. Never throws and never blocks the response — a failed
 * measurement must not cost us the crawl it was measuring.
 */
export async function recordCrawlerHits(hits: CrawlerHit[]): Promise<number> {
  if (hits.length === 0 || !isDatabaseConfigured()) return 0;

  const now = Date.now();
  const fresh = hits.filter((hit) => shouldRecord(`${hit.source}:${hit.bot}:${hit.path}`, now));
  if (fresh.length === 0) return 0;

  try {
    const sql = getSql();
    await sql`
      insert into crawler_hits (bot, path, source, status)
      select * from unnest(
        ${fresh.map((hit) => hit.bot)}::text[],
        ${fresh.map((hit) => hit.path)}::text[],
        ${fresh.map((hit) => hit.source)}::text[],
        ${fresh.map((hit) => hit.status ?? null)}::int[]
      )
    `;
    return fresh.length;
  } catch {
    return 0;
  }
}

/**
 * Records the current request if an AI crawler made it.
 *
 * Called from the routes AI crawlers fetch by name (/llms.txt, /robots.txt).
 * Those are the only places we can see a crawler without middleware, which the
 * project rules put off limits.
 */
export async function recordCrawlerRequest(request: Request, path: string): Promise<void> {
  const crawler = identifyCrawler(request.headers.get("user-agent"));
  if (!crawler) return;
  await recordCrawlerHits([{ bot: crawler.id, path, source: "route", status: 200 }]);
}
