import "server-only";

import { createHash, randomBytes } from "node:crypto";

import { getSql } from "@/lib/db";

/**
 * Portal accounts and their magic links.
 *
 * Passwordless on purpose: the only thing an account holds is the buyer's own
 * upiti, and a password we would have to store is a liability out of proportion
 * to that. Possession of the mailbox is the proof.
 *
 * Only the sha256 hash of a link token is stored, so a database dump does not
 * hand out live logins. Tokens are single use and short lived.
 */

const TOKEN_TTL_MINUTES = 30;

export type PortalUser = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
};

const hash = (token: string) => createHash("sha256").update(token).digest("hex");

/** Finds or creates the account for an address. Name and phone are filled in
 *  from the brief only when the row does not have them yet — a buyer who edited
 *  their name in one upit should not have it overwritten by an older one. */
export async function upsertPortalUser(
  email: string,
  details: { fullName?: string | null; phone?: string | null } = {},
): Promise<PortalUser> {
  const sql = getSql();
  const rows = (await sql`
    insert into portal_users (email, full_name, phone)
    values (${email.trim().toLowerCase()}, ${details.fullName ?? null}, ${details.phone ?? null})
    on conflict (lower(email)) do update
      set full_name = coalesce(portal_users.full_name, excluded.full_name),
          phone = coalesce(portal_users.phone, excluded.phone)
    returning id, email, full_name, phone
  `) as PortalUser[];
  return rows[0];
}

export async function findPortalUserByEmail(email: string): Promise<PortalUser | null> {
  const sql = getSql();
  const rows = (await sql`
    select id, email, full_name, phone from portal_users
    where lower(email) = lower(${email.trim()})
  `) as PortalUser[];
  return rows[0] ?? null;
}

export async function getPortalUser(id: string): Promise<PortalUser | null> {
  const sql = getSql();
  const rows = (await sql`
    select id, email, full_name, phone from portal_users where id = ${id}
  `) as PortalUser[];
  return rows[0] ?? null;
}

/** Issues a login link for an account. Returns the raw token — it exists only
 *  in the mail that is about to be sent and in the link the buyer clicks. */
export async function createLoginToken(portalUserId: string): Promise<string> {
  const sql = getSql();
  const token = randomBytes(32).toString("base64url");
  await sql`
    insert into portal_login_tokens (token_hash, portal_user_id, expires_at)
    values (
      ${hash(token)}, ${portalUserId},
      now() + ${`${TOKEN_TTL_MINUTES} minutes`}::interval
    )
  `;
  return token;
}

/**
 * Spends a login token.
 *
 * The `used_at is null` guard is in the UPDATE rather than in a preceding read,
 * so two clicks on the same link race in Postgres and only one of them wins.
 */
export async function consumeLoginToken(token: string): Promise<PortalUser | null> {
  const sql = getSql();
  const rows = (await sql`
    update portal_login_tokens
    set used_at = now()
    where token_hash = ${hash(token)} and used_at is null and expires_at > now()
    returning portal_user_id
  `) as { portal_user_id: string }[];
  if (!rows[0]) return null;

  const users = (await sql`
    update portal_users set last_login_at = now()
    where id = ${rows[0].portal_user_id}
    returning id, email, full_name, phone
  `) as PortalUser[];
  return users[0] ?? null;
}
