import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

import { GOOGLE_STATE_COOKIE, GOOGLE_STATE_MAX_AGE_SECONDS, googleAuthUrl } from "@/lib/os/google";
import { isSessionConfigured } from "@/lib/os/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Starts the owner's Google login: sets the CSRF nonce and hands over to Google. */
export async function GET(request: Request) {
  const nonce = randomBytes(24).toString("base64url");
  const target = isSessionConfigured() ? googleAuthUrl(nonce) : null;
  if (!target) {
    return NextResponse.redirect(new URL("/os/login?error=setup", request.url));
  }

  const response = NextResponse.redirect(target);
  response.cookies.set(GOOGLE_STATE_COOKIE, nonce, {
    httpOnly: true,
    // Lax still rides along on Google's top-level redirect back to us.
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/os/google",
    maxAge: GOOGLE_STATE_MAX_AGE_SECONDS,
  });
  return response;
}
