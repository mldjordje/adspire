import { NextResponse } from "next/server";

import { isDatabaseConfigured } from "@/lib/db";
import { cancelBookingAsBuyer } from "@/lib/education/store";
import { getPortalSession } from "@/lib/portal/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Cancel own booking: frees the slot and refunds the hours. The cutoff lives
 *  in the store, so this route and the page cannot disagree about it. */
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getPortalSession();
  if (!session || !isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, message: "Prijavi se ponovo." }, { status: 401 });
  }

  try {
    const result = await cancelBookingAsBuyer(session.userId, (await params).id);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, code: result.code, message: result.message },
        { status: result.code === "not_found" ? 404 : 409 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("edu_cancel_failed", { error });
    return NextResponse.json({ ok: false, message: "Termin nije otkazan." }, { status: 500 });
  }
}
