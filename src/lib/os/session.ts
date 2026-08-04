import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Owner session, carried in a signed cookie.
 *
 * There is one operator, so a session table would only add a round trip to
 * every page. The cookie holds the user id and an expiry, signed with
 * OS_SESSION_SECRET — the payload is readable but not forgeable, and it carries
 * nothing worth reading.
 *
 * Rotating OS_SESSION_SECRET invalidates every session. That is the logout-
 * everywhere switch.
 */

const COOKIE = "os_session";
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

export type OsSession = { userId: string; email: string };

type Payload = OsSession & { exp: number };

function secret(): string | null {
  const value = process.env.OS_SESSION_SECRET;
  return typeof value === "string" && value.trim().length >= 16 ? value.trim() : null;
}

const b64url = (input: Buffer | string) =>
  Buffer.from(input).toString("base64url");

function sign(data: string, key: string): string {
  return createHmac("sha256", key).update(data).digest("base64url");
}

export function isSessionConfigured(): boolean {
  return secret() !== null;
}

export function createSessionToken(session: OsSession): string {
  const key = secret();
  if (!key) throw new Error("OS_SESSION_SECRET nije postavljen (min. 16 karaktera).");
  const payload: Payload = {
    ...session,
    exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS,
  };
  const body = b64url(JSON.stringify(payload));
  return `${body}.${sign(body, key)}`;
}

export function readSessionToken(token: string | undefined): OsSession | null {
  const key = secret();
  if (!key || !token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = Buffer.from(sign(body, key));
  const provided = Buffer.from(signature);
  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as Payload;
    if (!payload.userId || typeof payload.exp !== "number") return null;
    if (payload.exp * 1000 < Date.now()) return null;
    return { userId: payload.userId, email: payload.email };
  } catch {
    return null;
  }
}

export async function startSession(session: OsSession): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, createSessionToken(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getSession(): Promise<OsSession | null> {
  const store = await cookies();
  return readSessionToken(store.get(COOKIE)?.value);
}
