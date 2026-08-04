import "server-only";

import { getSql } from "@/lib/db";

/** The single issuer row (id = 1). Every document renders from it. */
export type SettingsRow = {
  company_name: string;
  address: string | null;
  city: string;
  country: string;
  email: string | null;
  phone: string | null;
  pib: string | null;
  mb: string | null;
  bank_account: string | null;
  eur_account: string | null;
  swift: string | null;
  bank_name: string | null;
  bank_address: string | null;
  vat_note_domestic: string;
  vat_note_foreign: string;
  payment_method: string;
  invoice_due_days: number;
  payment_reference_model: string;
  invoice_seq_offset: number;
};

const COLUMNS = `company_name, address, city, country, email, phone, pib, mb,
  bank_account, eur_account, swift, bank_name, bank_address,
  vat_note_domestic, vat_note_foreign, payment_method, invoice_due_days,
  payment_reference_model, invoice_seq_offset`;

export async function getSettings(): Promise<SettingsRow> {
  const sql = getSql();
  // sql.query, not the tag: an interpolation into the tag becomes a bound
  // parameter, which cannot be a column list.
  const rows = (await sql.query(
    `select ${COLUMNS} from settings where id = 1`,
  )) as SettingsRow[];
  if (!rows[0]) throw new Error("Nedostaje red u tabeli settings — pokreni migracije.");
  return rows[0];
}

export type SettingsUpdate = Partial<Omit<SettingsRow, "invoice_due_days" | "invoice_seq_offset">> & {
  invoice_due_days?: number;
  invoice_seq_offset?: number;
};

/** Whitelist for the update below. A column name cannot be a bound parameter,
 *  so the only safe source for one is this list — never a key off a form. */
const UPDATABLE = new Set([
  "company_name", "address", "city", "country", "email", "phone", "pib", "mb",
  "bank_account", "eur_account", "swift", "bank_name", "bank_address",
  "vat_note_domestic", "vat_note_foreign", "payment_method", "invoice_due_days",
  "payment_reference_model", "invoice_seq_offset",
]);

export async function updateSettings(patch: SettingsUpdate): Promise<void> {
  const sql = getSql();
  const entries = Object.entries(patch).filter(
    ([column, value]) => value !== undefined && UPDATABLE.has(column),
  );
  if (entries.length === 0) return;

  const assignments = entries.map(([column], index) => `${column} = $${index + 1}`).join(", ");
  await sql.query(
    `update settings set ${assignments} where id = 1`,
    entries.map(([, value]) => value),
  );
}
