import { identifyCrawler } from "@/lib/analytics/crawlers";

/**
 * Parsing for the Vercel log drain payload, kept free of `server-only` and the
 * database so the shape handling can be tested against real deliveries. The
 * route does signature checking and writing; everything fragile is here.
 */

export type DrainEntry = {
  path?: string;
  host?: string;
  proxy?: {
    path?: string;
    userAgent?: string[] | string;
    statusCode?: number;
  };
};

export type ParsedHit = {
  bot: string;
  path: string;
  status?: number;
};

/** A delivery is either a JSON array or newline-delimited JSON, depending on age. */
export function parseDrainBody(body: string): DrainEntry[] {
  const trimmed = body.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith("[")) {
    try {
      const parsed: unknown = JSON.parse(trimmed);
      return Array.isArray(parsed) ? (parsed as DrainEntry[]) : [];
    } catch {
      return [];
    }
  }
  return trimmed.split("\n").flatMap((line) => {
    if (!line.trim()) return [];
    try {
      return [JSON.parse(line) as DrainEntry];
    } catch {
      // One malformed line must not discard the rest of the batch.
      return [];
    }
  });
}

/**
 * The receiver's own path.
 *
 * Vercel logs the POST it makes to this endpoint, then delivers that log line
 * back to the same endpoint, which produces another line — a loop that runs at
 * the delivery cadence forever, with no traffic on the site at all. In one
 * 3h44m export it was 265 of 434 rows. Nothing reached the database, because
 * VercelDrain is not a crawler, but the check is written down rather than
 * relied upon: if the user-agent list ever grows a token that matches, the
 * dashboard would start charting the site visiting itself.
 *
 * This only silences the rows. Breaking the loop itself is a path exclusion in
 * the Drain's settings on Vercel, which no API reachable from here can set.
 */
const RECEIVER_PATH = "/api/logs/drain";

/** The crawler hit an entry describes, or null when a human made the request. */
export function drainEntryToHit(entry: DrainEntry): ParsedHit | null {
  const agentField = entry.proxy?.userAgent;
  const userAgent = Array.isArray(agentField) ? agentField[0] : agentField;
  const crawler = identifyCrawler(userAgent);
  if (!crawler) return null;

  const path = entry.proxy?.path ?? entry.path;
  if (!path) return null;
  if (path.split("?")[0] === RECEIVER_PATH) return null;

  return {
    bot: crawler.id,
    // Query strings can carry parameters that belong to someone else and are
    // never the thing being measured.
    path: path.split("?")[0].slice(0, 200) || "/",
    status: entry.proxy?.statusCode,
  };
}

export function drainHits(body: string): ParsedHit[] {
  return parseDrainBody(body)
    .map(drainEntryToHit)
    .filter((hit): hit is ParsedHit => hit !== null);
}
