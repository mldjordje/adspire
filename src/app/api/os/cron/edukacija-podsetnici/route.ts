import { NextResponse } from "next/server";

import { runEducationReminders } from "@/lib/education/reminders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Daily edukacija reminders: today's agenda to the owner, tomorrow's heads-up
 * to each buyer.
 *
 * Vercel Cron calls this with `Authorization: Bearer $CRON_SECRET`. Without the
 * secret the route refuses to run: an open endpoint that sends mail is a way to
 * flood inboxes from outside.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { message: "CRON_SECRET nije postavljen — podsetnici su isključeni." },
      { status: 503 },
    );
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "Neautorizovano." }, { status: 401 });
  }

  try {
    const result = await runEducationReminders();
    console.log("edu_reminders", result);
    return NextResponse.json(result);
  } catch (error) {
    // Logged, but answered 200: a retry storm helps nobody, tomorrow's run
    // picks up whatever was not claimed.
    console.error("edu_reminders_failed", { error });
    return NextResponse.json({ message: "Podsetnici nisu poslati." }, { status: 200 });
  }
}
