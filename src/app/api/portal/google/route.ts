import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

import {
  encodeGoogleState,
  GOOGLE_STATE_COOKIE,
  GOOGLE_STATE_MAX_AGE_SECONDS,
  googleAuthUrl,
} from "@/lib/portal/google";
import { safeNextPath } from "@/lib/portal/next";
import { isPortalConfigured } from "@/lib/portal/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Starts the Google login: sets the CSRF nonce and hands over to Google. */
export async function GET(request: Request) {
  const next = safeNextPath(new URL(request.url).searchParams.get("next"));
  const nonce = randomBytes(24).toString("base64url");
  const target = isPortalConfigured() ? googleAuthUrl(nonce) : null;
  if (!target) {
    return NextResponse.redirect(
      new URL(`/nalog/prijava?greska=google&next=${encodeURIComponent(next)}`, request.url),
    );
  }

  const response = NextResponse.redirect(target);
  response.cookies.set(GOOGLE_STATE_COOKIE, encodeGoogleState(nonce, next), {
    httpOnly: true,
    // Lax still rides along on Google's top-level redirect back to us.
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/portal/google",
    maxAge: GOOGLE_STATE_MAX_AGE_SECONDS,
  });
  return response;
}
