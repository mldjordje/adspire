import { NextResponse } from "next/server";

import { isDatabaseConfigured } from "@/lib/db";
import { createCall, getOpenCallDays } from "@/lib/calls/store";
import { callSubmissionSchema } from "@/lib/calls/types";
import { checkRateLimit } from "@/lib/crm/rateLimit";
import { callMeetUrl } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  request.headers.get("x-real-ip") ??
  "unknown";

/** Open slots for the next two working weeks. Read on every widget open. */
export async function GET() {
  if (!isDatabaseConfigured()) return NextResponse.json({ days: [] });
  try {
    return NextResponse.json(
      { days: await getOpenCallDays() },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    // No slots is a usable answer: the widget still offers "call me asap".
    console.error("call_slots_failed", { error });
    return NextResponse.json({ days: [] });
  }
}

export async function POST(request: Request) {
  const limit = checkRateLimit(`call:${clientIp(request)}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { code: "rate", message: "Previše pokušaja. Probajte za koji minut." },
      { status: 429, headers: { "retry-after": String(limit.retryAfterSeconds) } },
    );
  }

  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ code: "invalid" }, { status: 400 });
  }

  // A filled honeypot gets the same answer a person gets, so the bot learns nothing.
  if (typeof raw.website === "string" && raw.website !== "") {
    return NextResponse.json({ ok: true, id: "ok", asap: Boolean(raw.asap) }, { status: 201 });
  }

  const parsed = callSubmissionSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { code: "invalid", fields: parsed.error.issues.map((issue) => issue.path.join(".")) },
      { status: 400 },
    );
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ code: "unavailable" }, { status: 503 });
  }

  try {
    const result = await createCall(parsed.data);
    if (!result.ok) {
      return NextResponse.json(result, { status: result.code === "taken" ? 409 : 422 });
    }
    // The standing room is not secret — it goes out in every Meet confirmation —
    // so the success screen can show it right away.
    const meetUrl = parsed.data.channel === "meet" ? callMeetUrl() : null;
    return NextResponse.json({ ...result, meetUrl }, { status: 201 });
  } catch (error) {
    console.error("call_create_failed", { requestId: parsed.data.requestId, error });
    return NextResponse.json({ code: "unavailable" }, { status: 500 });
  }
}
