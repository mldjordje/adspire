import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

import { drainHits } from "@/lib/analytics/drain";
import { recordCrawlerHits } from "@/lib/analytics/crawlerLog";
import { readLogDrainEnv } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Vercel log drain receiver — the only way to see which pages AI crawlers read.
 *
 * Why not middleware: `src/middleware.ts` is off limits by project rule. Why
 * not Vercel Web Analytics: it is a browser script, and crawlers do not run
 * JavaScript, so no bot has ever appeared in it or ever will. The drain is the
 * server-side request log, which sees every request including the statically
 * served pages that never run our code.
 *
 * /llms.txt and /robots.txt record themselves without any of this; the drain is
 * what extends the picture to the rest of the site. Configure it at
 * Vercel → Project → Observability → Log Drains, pointing at
 * https://adspire.rs/api/logs/drain, and set VERCEL_LOG_DRAIN_SECRET to the
 * secret Vercel generates.
 */

/** Vercel proves it owns the endpoint with a GET before it will send anything. */
export function GET() {
  const env = readLogDrainEnv();
  if (!env?.verify) return new NextResponse(null, { status: 404 });
  return new NextResponse("ok", {
    status: 200,
    headers: { "x-vercel-verify": env.verify },
  });
}

/** Constant-time compare that cannot throw on a length mismatch. */
function signatureMatches(expected: string, received: string | null): boolean {
  if (!received) return false;
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(received, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const env = readLogDrainEnv();
  // 404, not 401: an endpoint that is not configured should not advertise that
  // it exists and is merely waiting for the right secret.
  if (!env) return new NextResponse(null, { status: 404 });

  const body = await request.text();
  const expected = createHmac("sha1", env.secret).update(body).digest("hex");
  if (!signatureMatches(expected, request.headers.get("x-vercel-signature"))) {
    return new NextResponse(null, { status: 401 });
  }

  await recordCrawlerHits(
    drainHits(body).map((hit) => ({ ...hit, source: "drain" as const })),
  );

  // Always 200 once the signature checks out. A non-2xx makes Vercel retry the
  // whole batch, and a batch we already stored is one we do not want twice.
  return new NextResponse(null, { status: 200 });
}
