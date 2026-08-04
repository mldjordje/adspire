#!/usr/bin/env node
// Imports clients and their subscriptions from a JSON file.
//
//   node scripts/import-clients.mjs data/klijenti.json
//
// Shape (subscriptions optional):
// [
//   {
//     "companyName": "Auto Delić d.o.o.",
//     "contactPerson": "Marko", "email": "marko@example.rs",
//     "address": "Bulevar Nemanjića 1", "city": "Niš", "country": "Srbija",
//     "pib": "100000000", "mb": "20000000", "phone": "",
//     "subscriptions": [
//       { "title": "Održavanje", "itemDescription": "Mesečno održavanje web sajta",
//         "quantity": 1, "monthlyPrice": 6000, "currency": "RSD" }
//     ]
//   }
// ]
//
// Idempotent on the company name: re-running updates the client instead of
// creating a second one, and skips a subscription whose title already exists.

import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const file = process.argv[2];
if (!file) {
  console.error("Upotreba: node scripts/import-clients.mjs <fajl.json>");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL nije postavljen.");
  process.exit(1);
}

const clients = JSON.parse(await readFile(file, "utf8"));
if (!Array.isArray(clients)) {
  console.error("Fajl mora sadržati niz klijenata.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
let created = 0;
let updated = 0;
let subs = 0;

for (const client of clients) {
  const name = String(client.companyName ?? "").trim();
  if (!name) {
    console.warn("Preskočen red bez companyName:", JSON.stringify(client).slice(0, 80));
    continue;
  }

  const existing = await sql`
    select id from clients where lower(company_name) = lower(${name}) limit 1
  `;

  let id;
  if (existing[0]) {
    id = existing[0].id;
    await sql`
      update clients set
        contact_person = coalesce(${client.contactPerson ?? null}, contact_person),
        email = coalesce(${client.email ?? null}, email),
        address = coalesce(${client.address ?? null}, address),
        city = coalesce(${client.city ?? null}, city),
        country = coalesce(${client.country ?? null}, country),
        pib = coalesce(${client.pib ?? null}, pib),
        mb = coalesce(${client.mb ?? null}, mb),
        phone = coalesce(${client.phone ?? null}, phone),
        updated_at = now()
      where id = ${id}
    `;
    updated += 1;
  } else {
    const rows = await sql`
      insert into clients (company_name, contact_person, email, address, city, country, pib, mb, phone, notes)
      values (${name}, ${client.contactPerson ?? null}, ${client.email ?? null},
              ${client.address ?? null}, ${client.city ?? null}, ${client.country ?? "Srbija"},
              ${client.pib ?? null}, ${client.mb ?? null}, ${client.phone ?? null},
              ${client.notes ?? null})
      returning id
    `;
    id = rows[0].id;
    created += 1;
  }

  for (const subscription of client.subscriptions ?? []) {
    const title = String(subscription.title ?? "").trim();
    if (!title) continue;

    const already = await sql`
      select id from subscriptions where client_id = ${id} and lower(title) = lower(${title})
    `;
    if (already[0]) continue;

    await sql`
      insert into subscriptions (client_id, title, item_description, quantity, monthly_price, currency)
      values (${id}, ${title}, ${subscription.itemDescription ?? title},
              ${subscription.quantity ?? 1}, ${subscription.monthlyPrice ?? 0},
              ${subscription.currency ?? "RSD"})
    `;
    subs += 1;
  }
}

console.log(`Gotovo: ${created} novih, ${updated} ažuriranih klijenata, ${subs} pretplata.`);
