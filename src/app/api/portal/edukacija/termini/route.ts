import { NextResponse } from "next/server";

import { isDatabaseConfigured } from "@/lib/db";
import { createBooking, type BookingFailure } from "@/lib/education/store";
import { getPortalSession } from "@/lib/portal/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The buyer books a session against their own wallet. Who is booking comes from
 * the session cookie only — nothing in the body identifies the account.
 */

const STATUS: Record<BookingFailure, number> = {
  invalid: 400,
  past: 409,
  closed: 409,
  taken: 409,
  balance: 402,
  not_found: 404,
  too_late: 409,
};

export async function POST(request: Request) {
  const session = await getPortalSession();
  if (!session || !isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, message: "Prijavi se ponovo." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "Neispravan zahtev." }, { status: 400 });
  }

  try {
    const result = await createBooking(session.userId, {
      date: typeof body.date === "string" ? body.date : "",
      startSlot: typeof body.startSlot === "string" ? body.startSlot : "",
      hours: Number(body.hours ?? 1),
      kind: body.kind,
      topic: typeof body.topic === "string" ? body.topic : null,
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, code: result.code, message: result.message },
        { status: STATUS[result.code] },
      );
    }
    return NextResponse.json({ ok: true, booking: result.booking });
  } catch (error) {
    console.error("edu_booking_failed", { error });
    return NextResponse.json({ ok: false, message: "Termin nije zakazan." }, { status: 500 });
  }
}
