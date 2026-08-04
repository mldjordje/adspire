#!/usr/bin/env node
// Applies db/migrations/*.sql in filename order, once each.
//
// Uses the WebSocket client rather than the HTTP one: a migration file is many
// statements (and `do $$ ... $$` blocks that cannot be split on semicolons),
// and only a real session can run the whole file as one command.

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { Client, neonConfig } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL nije postavljen. Dodaj Neon connection string u .env.local.");
  process.exit(1);
}

// Node 22+ ships a global WebSocket; the driver only needs to be told about it.
if (!neonConfig.webSocketConstructor && globalThis.WebSocket) {
  neonConfig.webSocketConstructor = globalThis.WebSocket;
}

const dir = path.join(process.cwd(), "db", "migrations");
const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();

const client = new Client(url);
await client.connect();

await client.query(`
  create table if not exists _migrations (
    name text primary key,
    applied_at timestamptz not null default now()
  )
`);

const { rows } = await client.query("select name from _migrations");
const applied = new Set(rows.map((r) => r.name));

for (const file of files) {
  if (applied.has(file)) {
    console.log(`= ${file} (već primenjeno)`);
    continue;
  }
  const sql = await readFile(path.join(dir, file), "utf8");
  try {
    await client.query("begin");
    await client.query(sql);
    await client.query("insert into _migrations (name) values ($1)", [file]);
    await client.query("commit");
    console.log(`+ ${file}`);
  } catch (error) {
    await client.query("rollback");
    console.error(`! ${file} nije prošlo:`, error.message);
    await client.end();
    process.exit(1);
  }
}

await client.end();
console.log("Migracije gotove.");
