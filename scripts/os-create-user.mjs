#!/usr/bin/env node
// Creates or updates the owner account.
//
//   node scripts/os-create-user.mjs djordje@adspire.rs "lozinka" "Đorđe"
//
// The hash format must stay in sync with src/lib/os/password.ts.

import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";
import { neon } from "@neondatabase/serverless";

const scryptAsync = promisify(scrypt);

const [email, password, displayName = "Owner"] = process.argv.slice(2);
if (!email || !password) {
  console.error('Upotreba: node scripts/os-create-user.mjs <email> "<lozinka>" [ime]');
  process.exit(1);
}
if (password.length < 8) {
  console.error("Lozinka mora imati bar 8 karaktera.");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL nije postavljen.");
  process.exit(1);
}

const N = 16384;
const R = 8;
const P = 1;
const salt = randomBytes(16);
const derived = await scryptAsync(password, salt, 64, { N, r: R, p: P });
const hash = ["scrypt", N, R, P, salt.toString("base64"), derived.toString("base64")].join("$");

const sql = neon(process.env.DATABASE_URL);
const rows = await sql`
  insert into os_users (email, password_hash, display_name)
  values (${email.toLowerCase()}, ${hash}, ${displayName})
  -- The unique index is on lower(email); the conflict target has to match it.
  on conflict (lower(email)) do update
    set password_hash = excluded.password_hash,
        display_name = excluded.display_name
  returning id, email
`;

console.log("Nalog spreman:", rows[0].email, rows[0].id);
