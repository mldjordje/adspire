import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  fetchGoogleProfile,
  GOOGLE_STATE_COOKIE,
  isAllowedAdminEmail,
  readGoogleState,
} from "@/lib/os/google";
import { startSession } from "@/lib/os/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Google's redirect back. A session starts only for a verified email on
 * ADMIN_EMAILS — anyone else's Google account bounces to the login page.
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const store = await cookies();
  const stateOk = readGoogleState(store.get(GOOGLE_STATE_COOKIE)?.value, params.get("state"));
  store.delete({ name: GOOGLE_STATE_COOKIE, path: "/api/os/google" });

  const failed = (error: string) => new URL(`/os/login?error=${error}`, request.url);
  const code = params.get("code");
  if (!stateOk || !code) return NextResponse.redirect(failed("google"));

  try {
    const profile = await fetchGoogleProfile(code);
    if (!profile) return NextResponse.redirect(failed("google"));
    if (!isAllowedAdminEmail(profile.email)) return NextResponse.redirect(failed("forbidden"));

    await startSession({ userId: profile.email, email: profile.email });
  } catch (error) {
    console.error("os_google_login_failed", { error });
    return NextResponse.redirect(failed("google"));
  }

  return NextResponse.redirect(new URL("/os", request.url));
}
