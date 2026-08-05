import { NextResponse } from "next/server";

import { claimInquiriesForPortalUser } from "@/lib/inquiries/store";
import { startPortalSession } from "@/lib/portal/session";
import { consumeLoginToken } from "@/lib/portal/users";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Spends a login link and opens the session.
 *
 * A GET that changes state, because it is what an email client can offer: the
 * token is single use, so a scanner that prefetches the link burns it and the
 * buyer asks for another. The alternative — a page with a button — costs every
 * buyer a click to protect against an inconvenience.
 */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const failed = new URL("/nalog/prijava?greska=link", request.url);
  if (!token) return NextResponse.redirect(failed);

  const user = await consumeLoginToken(token);
  if (!user) return NextResponse.redirect(failed);

  await startPortalSession({ userId: user.id, email: user.email });
  // Briefs sent from this address before the account existed are its own.
  await claimInquiriesForPortalUser(user.id, user.email).catch((error) => {
    console.error("portal_claim_failed", { error });
  });

  return NextResponse.redirect(new URL("/nalog", request.url));
}
