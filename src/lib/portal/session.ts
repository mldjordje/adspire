import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Client portal session, carried in a signed cookie.
 *
 * Same construction as the owner session in src/lib/os/session.ts, and
 * deliberately a separate module with a separate secret: a client cookie must
 * never validate as an operator cookie. `kind` is a second belt — a payload
 * from elsewhere is rejected even if a secret is ever reused by accident.
 *
 * A missing PORTAL_SESSION_SECRET disables login only. Sending an upit does not
 * need an account and keeps working.
 */

const COOKIE = "portal_session";
const KIND = "portal";
const MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

export type PortalSession = { userId: string; email: string };

type Payload = PortalSession & { kind: typeof KIND; exp: number };

function secret(): string | null {
  const value = process.env.PORTAL_SESSION_SECRET;
  return typeof value === "string" && value.trim().length >= 16 ? value.trim() : null;
}

export function isPortalConfigured(): boolean {
  return secret() !== null;
}

function sign(data: string, key: string): string {
  return createHmac("sha256", key).update(data).digest("base64url");
}

export function createPortalToken(session: PortalSession): string {
  const key = secret();
  if (!key) throw new Error("PORTAL_SESSION_SECRET nije postavljen (min. 16 karaktera).");
  const payload: Payload = {
    ...session,
    kind: KIND,
    exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body, key)}`;
}

export function readPortalToken(token: string | undefined): PortalSession | null {
  const key = secret();
  if (!key || !token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = Buffer.from(sign(body, key));
  const provided = Buffer.from(signature);
  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as Payload;
    if (payload.kind !== KIND) return null;
    if (!payload.userId || typeof payload.exp !== "number") return null;
    if (payload.exp * 1000 < Date.now()) return null;
    return { userId: payload.userId, email: payload.email };
  } catch {
    return null;
  }
}

export async function startPortalSession(session: PortalSession): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, createPortalToken(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endPortalSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getPortalSession(): Promise<PortalSession | null> {
  const store = await cookies();
  return readPortalToken(store.get(COOKIE)?.value);
}
