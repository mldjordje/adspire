import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { isDatabaseConfigured } from "@/lib/db";
import { claimInquiriesForPortalUser } from "@/lib/inquiries/store";
import { fetchGoogleProfile, GOOGLE_STATE_COOKIE, readGoogleState } from "@/lib/portal/google";
import { safeNextPath } from "@/lib/portal/next";
import { startPortalSession } from "@/lib/portal/session";
import { upsertPortalUser } from "@/lib/portal/users";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Google's redirect back. Same outcome as spending a magic link: the account
 * for that verified address, a session, and any earlier upiti claimed.
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const store = await cookies();
  const state = readGoogleState(store.get(GOOGLE_STATE_COOKIE)?.value, params.get("state"));
  store.delete({ name: GOOGLE_STATE_COOKIE, path: "/api/portal/google" });

  const next = safeNextPath(state?.next);
  const failed = new URL(`/nalog/prijava?greska=google&next=${encodeURIComponent(next)}`, request.url);
  const code = params.get("code");
  if (!state || !code || !isDatabaseConfigured()) return NextResponse.redirect(failed);

  try {
    const profile = await fetchGoogleProfile(code);
    if (!profile) return NextResponse.redirect(failed);

    const user = await upsertPortalUser(profile.email, { fullName: profile.name });
    await startPortalSession({ userId: user.id, email: user.email });
    await claimInquiriesForPortalUser(user.id, user.email).catch((error) => {
      console.error("portal_claim_failed", { error });
    });
  } catch (error) {
    console.error("portal_google_failed", { error });
    return NextResponse.redirect(failed);
  }

  return NextResponse.redirect(new URL(next, request.url));
}
