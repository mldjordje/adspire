/**
 * Invoice rules that are pure functions of their input.
 *
 * Kept free of imports from the app so tests can exercise the numbering, the
 * payment reference and the date handling without a database.
 */

export type InvoiceKind = "proforma" | "invoice";
export type InvoiceScope = "domestic" | "foreign";

/** "34/2026" — the form Serbian accounting already reads, and the form the
 *  issuer's existing documents use. */
export function invoiceNumber(seq: number, year: number): string {
  return `${seq}/${year}`;
}

const SERBIA = new Set(["rs", "srb", "srbija", "serbia", "република србија", "republika srbija"]);

export function invoiceScope(country: string | null | undefined): InvoiceScope {
  const value = country?.trim().toLowerCase();
  // No country stated means a domestic buyer: this issuer's default client is
  // Serbian, and a domestic document sent abroad is a smaller error than an
  // English one with a foreign-currency account sent to a Niš company.
  if (!value) return "domestic";
  return SERBIA.has(value) ? "domestic" : "foreign";
}

/**
 * Payment reference, the "poziv na broj" on a Serbian transfer order.
 *
 * NOT a mandatory element of an invoice — it is a banking convenience that lets
 * incoming payments be matched to documents automatically. Two consequences:
 *
 *   - The field takes DIGITS. A reference with letters or a slash in it cannot
 *     be entered in e-banking, so the payer drops it and the matching the field
 *     exists for is lost.
 *   - Under model 97 the first two digits are a checksum (ISO 7064, MOD 97-10)
 *     that the bank verifies; an invalid one gets the order refused.
 *
 * So the model is a setting. An issuer who does not use poziv na broj gets the
 * document number printed as the payment purpose instead.
 */
export type ReferenceModel = "none" | "97";

export function referenceModel(value: string | null | undefined): ReferenceModel {
  return value?.trim() === "97" ? "97" : "none";
}

/**
 * ISO 7064 MOD 97-10 check digits for a numeric string.
 *
 * The remainder is accumulated digit by digit rather than by building one huge
 * integer: a 20-digit reference overflows a double long before Number can
 * divide it, and a silently wrong checksum is worse than none.
 */
export function mod97CheckDigits(digits: string): string {
  if (!/^[0-9]+$/.test(digits)) throw new Error("mod97CheckDigits: samo cifre");
  // Appending "00" is what makes the result the digits that COMPLETE the number
  // to a multiple of 97, rather than just its remainder.
  let remainder = 0;
  for (const ch of `${digits}00`) {
    remainder = (remainder * 10 + Number(ch)) % 97;
  }
  return String(98 - remainder).padStart(2, "0");
}

/** Strip a document number down to what a bank field accepts: "34/2026" -> "342026". */
export function referenceDigits(source: string): string {
  const digits = source.replace(/\D/g, "");
  // Truncated from the RIGHT so the part that distinguishes two documents
  // survives. 20 characters total, two of which are the check digits.
  return digits.slice(-18) || "0";
}

/** The reference to print, or null when the issuer prints the payment purpose
 *  instead. */
export function paymentReferenceFor(
  documentNumber: string,
  model: ReferenceModel,
): string | null {
  if (model !== "97") return null;
  const body = referenceDigits(documentNumber);
  return `${mod97CheckDigits(body)}${body}`;
}

export type SellerAccounts = {
  domestic?: string | null;
  eur?: string | null;
  usd?: string | null;
};

const clean = (value: string | null | undefined) => value?.trim() || null;

/** The account that can receive a given currency. A dollar invoice must not
 *  print the euro account: the buyer's bank would convert on the way in and
 *  charge both sides for a conversion nobody agreed to. */
export function accountForCurrency(
  currency: string,
  accounts: SellerAccounts,
): string | null {
  switch (currency.trim().toUpperCase()) {
    case "RSD":
      return clean(accounts.domestic);
    case "EUR":
      return clean(accounts.eur);
    case "USD":
      return clean(accounts.usd);
    default:
      // An unfamiliar currency has no dedicated account; the foreign-currency
      // one is the closest thing to right, and the alternative is an invoice
      // with no account on it at all.
      return clean(accounts.eur) ?? clean(accounts.usd);
  }
}

/**
 * Which account the buyer actually pays into.
 *
 * A domestic invoice settles in DINARS whatever it is denominated in. Two
 * Serbian residents may agree a price in euros — the currency clause is
 * ordinary — but the payment between them is a dinar payment, so printing the
 * euro account on a domestic document points the buyer at a transfer they
 * should not be making. Foreign buyers pay the currency of the invoice.
 */
export function settlementAccount(
  scope: InvoiceScope,
  currency: string,
  accounts: SellerAccounts,
): string | null {
  if (scope === "domestic") {
    return clean(accounts.domestic) ?? accountForCurrency(currency, accounts);
  }
  return accountForCurrency(currency, accounts) ?? clean(accounts.domestic);
}

/** The currencies the UI offers and the document knows how to settle. */
export const CURRENCIES = ["RSD", "EUR", "USD"] as const;
export type Currency = (typeof CURRENCIES)[number];

export type InvoiceItemInput = {
  name: string;
  quantity: number;
  unitPrice: number;
};

/** Line and document totals, rounded to the para so the printed lines always
 *  add up to the printed total. */
export function itemTotals(items: InvoiceItemInput[]) {
  const round = (value: number) => Math.round(value * 100) / 100;
  const lines = items.map((item) => ({
    ...item,
    total: round(item.quantity * item.unitPrice),
  }));
  return { lines, total: round(lines.reduce((sum, line) => sum + line.total, 0)) };
}

/**
 * Today in Belgrade, as YYYY-MM-DD plus the year.
 *
 * The issue date and the number series must not be read from the server clock:
 * on Vercel that is UTC, so anything issued between midnight and 01:00/02:00
 * local would be dated to the previous day — and across New Year, into the
 * previous year's sequence.
 */
export function belgradeToday(now = new Date()): { iso: string; year: number } {
  // en-CA is the locale that formats as YYYY-MM-DD.
  const iso = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Belgrade",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  return { iso, year: Number(iso.slice(0, 4)) };
}

/** Adds whole days to a YYYY-MM-DD date without dragging a timezone into it. */
export function addDays(iso: string, days: number): string {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
