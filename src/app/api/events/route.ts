import { NextResponse } from "next/server";
import { getSql, isDatabaseConfigured } from "@/lib/db";
import { checkRateLimit } from "@/lib/crm/rateLimit";
import { siteEventBatchSchema } from "@/lib/analytics/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  request.headers.get("x-real-ip") ??
  "unknown";

/**
 * Funnel ingest. Always answers 204 — the browser has nothing useful to do
 * with a failure and a red line in the console on a marketing page costs more
 * than the lost row.
 *
 * The IP is used for rate limiting only and is never stored.
 */
export async function POST(request: Request) {
  const noContent = new NextResponse(null, { status: 204 });

  const limit = checkRateLimit(`events:${clientIp(request)}`, {
    // A real reader fires page views, two scroll depths and a few clicks per
    // page; 120 batches per 10 minutes is far above that and far below a bot.
    limit: 120,
    windowMs: 10 * 60 * 1000,
  });
  if (!limit.allowed) return noContent;

  if (!isDatabaseConfigured()) return noContent;

  let events;
  try {
    const parsed = siteEventBatchSchema.parse(await request.json());
    events = parsed.events;
  } catch {
    return noContent;
  }

  try {
    const sql = getSql();
    // One statement for the batch: the Neon HTTP driver charges a round trip
    // per query, and this endpoint runs on every page view on the site.
    await sql`
      insert into site_events
        (name, session_id, path, referrer_host, utm_source, utm_medium, utm_campaign,
         locale, device, label, request_id)
      select * from unnest(
        ${events.map((e) => e.name)}::text[],
        ${events.map((e) => e.sessionId)}::text[],
        ${events.map((e) => e.path)}::text[],
        ${events.map((e) => e.referrerHost ?? null)}::text[],
        ${events.map((e) => e.utmSource ?? null)}::text[],
        ${events.map((e) => e.utmMedium ?? null)}::text[],
        ${events.map((e) => e.utmCampaign ?? null)}::text[],
        ${events.map((e) => e.locale ?? null)}::text[],
        ${events.map((e) => e.device ?? null)}::text[],
        ${events.map((e) => e.label ?? null)}::text[],
        ${events.map((e) => e.requestId ?? null)}::text[]
      )
    `;
  } catch (error) {
    console.error("site_events_insert_failed", error);
  }

  return noContent;
}
