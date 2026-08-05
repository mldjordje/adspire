import { NextResponse } from "next/server";

import { currentPeriod, runRecurring } from "@/lib/billing/recurring";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Issuing documents is sequential and renders a PDF per mail; the default 10s
// is not enough once there are a dozen subscriptions.
export const maxDuration = 60;

/**
 * The monthly maintenance run, unattended.
 *
 * Vercel Cron calls this with `Authorization: Bearer $CRON_SECRET`. Without the
 * secret set the route refuses to run at all rather than defaulting to open:
 * an unauthenticated endpoint here would let anyone burn invoice numbers.
 *
 * Sending is opt-in through RECURRING_AUTOSEND. Off by default, because a cron
 * that mails a wrong figure to every client at 03:00 is not a saved afternoon.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { message: "CRON_SECRET nije postavljen — automatsko fakturisanje je isključeno." },
      { status: 503 },
    );
  }

  const provided = request.headers.get("authorization");
  if (provided !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "Neautorizovano." }, { status: 401 });
  }

  const url = new URL(request.url);
  const period = url.searchParams.get("period") ?? currentPeriod();
  const send = process.env.RECURRING_AUTOSEND?.trim() === "1";

  const outcomes = await runRecurring(period, { send, createdBy: "cron" });

  const summary = {
    period,
    send,
    issued: outcomes.filter((row) => row.status === "issued").length,
    skipped: outcomes.filter((row) => row.status === "skipped").length,
    failed: outcomes.filter((row) => row.status === "failed").length,
    mailed: outcomes.filter((row) => row.mailed).length,
    outcomes,
  };

  // Logged as well as returned: the cron's own response is only visible in
  // Vercel's dashboard for a short while.
  console.log("recurring_run", summary);

  return NextResponse.json(summary, { status: summary.failed > 0 ? 207 : 200 });
}
