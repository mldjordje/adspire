import { NextResponse } from "next/server";

import { isDatabaseConfigured } from "@/lib/db";
import { getAvailableMonth } from "@/lib/education/store";
import { isMonth, MAX_BOOKING_HOURS } from "@/lib/education/slots";
import { getPortalSession } from "@/lib/portal/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Free slots for the buyer's calendar: the studio's schedule minus everything
 * booked and everything past, so the buyer is never shown a slot the POST would
 * refuse.
 */
export async function GET(request: Request) {
  const session = await getPortalSession();
  if (!session || !isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, message: "Prijavi se ponovo." }, { status: 401 });
  }

  const month = new URL(request.url).searchParams.get("mesec") ?? "";
  if (!isMonth(month)) {
    return NextResponse.json({ ok: false, message: "mesec=YYYY-MM" }, { status: 400 });
  }

  try {
    const days = await getAvailableMonth(month);
    return NextResponse.json({ ok: true, month, days, maxHours: MAX_BOOKING_HOURS });
  } catch (error) {
    console.error("edu_availability_failed", { error });
    return NextResponse.json(
      { ok: false, message: "Ne mogu da učitam slobodne termine." },
      { status: 500 },
    );
  }
}
