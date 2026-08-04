import "server-only";

import { getSql } from "@/lib/db";

export type OsUserRow = {
  id: string;
  email: string;
  password_hash: string;
  display_name: string;
};

export async function findUserByEmail(email: string): Promise<OsUserRow | null> {
  const sql = getSql();
  const rows = (await sql`
    select id, email, password_hash, display_name
    from os_users
    where lower(email) = lower(${email})
    limit 1
  `) as OsUserRow[];
  return rows[0] ?? null;
}
