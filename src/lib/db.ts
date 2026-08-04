import "server-only";

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Neon connection for Adspire OS.
 *
 * Nothing throws at import time: the public site builds and serves without a
 * database, and `/os` renders a setup notice instead of a stack trace. Callers
 * that genuinely need the connection use `getSql()` and let it throw.
 */

// DATES. This driver decodes `date` columns into JS Date objects, and it does
// it in UTC: the day 2026-08-04 comes back as 2026-08-03T22:00:00Z in Belgrade,
// which prints as the wrong day on an invoice. Custom type parsers are ignored
// over HTTP, so every query that reads a date casts it with `::text` and the
// value stays the calendar day Postgres stored.

let cached: NeonQueryFunction<false, false> | null = null;

export function databaseUrl(): string | null {
  const value = process.env.DATABASE_URL;
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

export function isDatabaseConfigured(): boolean {
  return databaseUrl() !== null;
}

export function getSql(): NeonQueryFunction<false, false> {
  if (cached) return cached;
  const url = databaseUrl();
  if (!url) {
    throw new Error("Baza nije konfigurisana: nedostaje DATABASE_URL (Neon).");
  }
  cached = neon(url);
  return cached;
}
