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

/** The crawler hit an entry describes, or null when a human made the request. */
export function drainEntryToHit(entry: DrainEntry): ParsedHit | null {
  const agentField = entry.proxy?.userAgent;
  const userAgent = Array.isArray(agentField) ? agentField[0] : agentField;
  const crawler = identifyCrawler(userAgent);
  if (!crawler) return null;

  const path = entry.proxy?.path ?? entry.path;
  if (!path) return null;

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
