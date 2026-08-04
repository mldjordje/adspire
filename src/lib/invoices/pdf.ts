import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { settlementAccount, type InvoiceKind, type InvoiceScope } from "./rules";

// Invoice / proforma renderer.
//
// Two templates, one layout: the Serbian document and the English one for DACH
// buyers. They differ in language, in which account is printed and in the VAT
// sentence — not in structure, so they share every measurement here.
//
// FONTS. The PDF standard faces are WinAnsi-encoded, which has no č, ć, š, ž or
// đ — a Serbian invoice drawn with Helvetica either throws or silently drops
// the diacritics. Noto Sans (OFL, bundled in ./fonts) is embedded instead.

export type InvoiceParty = {
  name?: string | null;
  companyName?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  pib?: string | null;
  mb?: string | null;
  email?: string | null;
  phone?: string | null;
};

export type InvoiceLine = {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type InvoiceDocumentData = {
  kind: InvoiceKind;
  scope: InvoiceScope;
  number: string;
  issueDate: Date;
  /** The day the service was delivered — a mandatory element of a Serbian
   *  invoice, and not the same as the issue date. A proforma has none. */
  supplyDate: Date | null;
  dueDate: Date | null;
  placeOfIssue: string | null;
  paymentMethod: string;
  currency: string;
  items: InvoiceLine[];
  total: number;
  /** Dinar equivalent and the rate it was frozen at, for a foreign-currency
   *  amount. Absent when the invoice is already in RSD. */
  rsd?: { amount: number; rate: number; date: string } | null;
  seller: InvoiceParty & {
    bankAccount?: string | null;
    eurAccount?: string | null;
    swift?: string | null;
    bankName?: string | null;
    bankAddress?: string | null;
  };
  buyer: InvoiceParty;
  /** Numeric model-97 reference, when the issuer uses one. Null means the
   *  payment purpose is printed instead — see rules.ts. */
  reference: string | null;
  paymentPurpose: string;
  settlementNote?: string | null;
  vatNote: string;
  note?: string | null;
};

const A4 = { width: 595.28, height: 841.89 };
const MARGIN = 50;
const INK = rgb(0.05, 0.05, 0.07);
const MUTED = rgb(0.42, 0.42, 0.47);
const LINE = rgb(0.85, 0.85, 0.88);
// The house trust-blue, #2f6bff.
const ACCENT = rgb(0.184, 0.42, 1);

const LABELS = {
  sr: {
    proforma: "PREDRAČUN",
    invoice: "RAČUN",
    number: "Broj",
    issued: "Datum izdavanja",
    place: "Mesto izdavanja",
    supply: "Datum prometa",
    due: "Rok plaćanja",
    buyer: "Kupac",
    description: "Naziv",
    qty: "Kol.",
    price: "Cena",
    total: "Iznos",
    grandTotal: "UKUPNO ZA UPLATU",
    payment: "Podaci za uplatu",
    recipient: "Primalac",
    account: "Račun",
    method: "Način plaćanja",
    reference: "Poziv na broj",
    model: "Model",
    purpose: "Svrha uplate",
    pib: "PIB",
    mb: "Matični broj",
    note: "Napomena",
    rateNote: (rate: string, date: string) =>
      `Obračunato po srednjem kursu NBS ${rate} RSD na dan ${date}.`,
    proformaNote:
      "Ovo je predračun i ne predstavlja poresku ispravu. Račun se izdaje nakon evidentirane uplate.",
    footer: "Dokument je izdat elektronski i punovažan je bez pečata i potpisa.",
  },
  en: {
    proforma: "PROFORMA INVOICE",
    invoice: "INVOICE",
    number: "No.",
    issued: "Date of issue",
    place: "Place of issue",
    supply: "Date of supply",
    due: "Payment due",
    buyer: "Customer",
    description: "Description",
    qty: "Qty",
    price: "Price",
    total: "Amount",
    grandTotal: "TOTAL DUE",
    payment: "Payment details",
    recipient: "Beneficiary",
    account: "Account / IBAN",
    method: "Payment method",
    reference: "Payment reference",
    model: "Model",
    purpose: "Payment purpose",
    pib: "Tax ID",
    mb: "Company No.",
    note: "Note",
    rateNote: (rate: string, date: string) =>
      `RSD equivalent at the NBS middle rate ${rate} on ${date}.`,
    proformaNote:
      "This is a proforma invoice and is not a tax document. The invoice follows once payment is received.",
    footer: "Issued electronically; valid without signature or stamp.",
  },
} as const;

let fontCache: { regular: Uint8Array; bold: Uint8Array } | null = null;

async function loadFonts() {
  if (fontCache) return fontCache;
  const dir = path.join(process.cwd(), "src", "lib", "invoices", "fonts");
  const [regular, bold] = await Promise.all([
    readFile(path.join(dir, "NotoSans-Regular.ttf")),
    readFile(path.join(dir, "NotoSans-Bold.ttf")),
  ]);
  fontCache = { regular: new Uint8Array(regular), bold: new Uint8Array(bold) };
  return fontCache;
}

function money(amount: number, currency: string): string {
  const formatted = amount.toLocaleString("sr-RS", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formatted} ${currency.toUpperCase()}`;
}

/** Quantities print as integers when they are whole: "1", not "1,00". */
function quantity(value: number): string {
  return Number.isInteger(value)
    ? String(value)
    : value.toLocaleString("sr-RS", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(date: Date): string {
  const d = String(date.getUTCDate()).padStart(2, "0");
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${d}.${m}.${date.getUTCFullYear()}.`;
}

/** Wraps to `width`, measured in the font it will be drawn with — a character
 *  count breaks on the wide glyphs company names are full of. */
function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const lines: string[] = [];
  let current = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= width || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function renderInvoicePdf(doc: InvoiceDocumentData): Promise<Uint8Array> {
  const t = LABELS[doc.scope === "foreign" ? "en" : "sr"];
  const fonts = await loadFonts();

  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  const regular = await pdf.embedFont(fonts.regular, { subset: true });
  const bold = await pdf.embedFont(fonts.bold, { subset: true });
  let page = pdf.addPage([A4.width, A4.height]);

  const title = doc.kind === "proforma" ? t.proforma : t.invoice;
  pdf.setTitle(`${title} ${doc.number}`);
  pdf.setProducer("Adspire OS");
  pdf.setCreationDate(doc.issueDate);

  const right = A4.width - MARGIN;
  const contentWidth = right - MARGIN;
  let y = A4.height - MARGIN;

  const text = (
    value: string,
    x: number,
    size: number,
    options: { font?: PDFFont; color?: typeof INK; align?: "left" | "right" } = {},
  ) => {
    const font = options.font ?? regular;
    const drawX = options.align === "right" ? x - font.widthOfTextAtSize(value, size) : x;
    page.drawText(value, { x: drawX, y, size, font, color: options.color ?? INK });
  };

  const rule = (atY: number) =>
    page.drawLine({
      start: { x: MARGIN, y: atY },
      end: { x: right, y: atY },
      thickness: 0.7,
      color: LINE,
    });

  /** Starts a new page when the next block would run into the footer. Item
   *  tables on maintenance invoices are short, but a project invoice with a
   *  dozen lines must not silently draw off the bottom edge. */
  const ensureSpace = (needed: number) => {
    if (y - needed > MARGIN + 60) return;
    page = pdf.addPage([A4.width, A4.height]);
    y = A4.height - MARGIN;
  };

  // ---- header: who issues, and what this document is -----------------------
  text("ADSPIRE", MARGIN, 17, { font: bold });
  page.drawCircle({
    x: MARGIN + bold.widthOfTextAtSize("ADSPIRE", 17) + 5,
    y: y + 3,
    size: 2.6,
    color: ACCENT,
  });
  text(title, right, 16, { font: bold, align: "right", color: ACCENT });
  y -= 18;
  text(`${t.number}: ${doc.number}`, right, 10, { align: "right", color: MUTED });

  for (const line of [
    doc.seller.companyName ?? doc.seller.name,
    doc.seller.address,
    [doc.seller.city, doc.seller.country].filter(Boolean).join(", ") || null,
    doc.seller.pib ? `${t.pib}: ${doc.seller.pib}` : null,
    doc.seller.mb ? `${t.mb}: ${doc.seller.mb}` : null,
    doc.seller.email,
  ]) {
    if (!line) continue;
    text(line, MARGIN, 9, { color: MUTED });
    y -= 12;
  }

  y -= 4;
  // "Mesto i datum izdavanja" is one required element — only the date half is
  // usually printed — and the supply date is a second, separate one.
  for (const line of [
    doc.placeOfIssue ? `${t.place}: ${doc.placeOfIssue}` : null,
    `${t.issued}: ${formatDate(doc.issueDate)}`,
    doc.supplyDate ? `${t.supply}: ${formatDate(doc.supplyDate)}` : null,
    doc.dueDate ? `${t.due}: ${formatDate(doc.dueDate)}` : null,
  ]) {
    if (!line) continue;
    text(line, right, 9, { align: "right", color: MUTED });
    y -= 12;
  }

  y -= 10;
  rule(y);
  y -= 22;

  // ---- buyer ---------------------------------------------------------------
  text(t.buyer, MARGIN, 8, { color: MUTED });
  y -= 14;
  text(doc.buyer.companyName?.trim() || doc.buyer.name?.trim() || "—", MARGIN, 12, { font: bold });
  y -= 15;
  for (const line of [
    doc.buyer.address,
    [doc.buyer.city, doc.buyer.country].filter(Boolean).join(", ") || null,
    doc.buyer.pib ? `${t.pib}: ${doc.buyer.pib}` : null,
    doc.buyer.mb ? `${t.mb}: ${doc.buyer.mb}` : null,
    doc.buyer.email,
  ]) {
    if (!line) continue;
    text(line, MARGIN, 9, { color: MUTED });
    y -= 12;
  }

  y -= 18;

  // ---- items ---------------------------------------------------------------
  const columns = { qty: right - 210, price: right - 120, total: right };
  const nameWidth = columns.qty - MARGIN - 25;

  text(t.description, MARGIN, 8, { color: MUTED });
  text(t.qty, columns.qty, 8, { color: MUTED, align: "right" });
  text(`${t.price} (${doc.currency})`, columns.price, 8, { color: MUTED, align: "right" });
  text(`${t.total} (${doc.currency})`, columns.total, 8, { color: MUTED, align: "right" });
  y -= 8;
  rule(y);
  y -= 16;

  for (const item of doc.items) {
    const lines = wrap(item.name, regular, 10, nameWidth);
    ensureSpace(lines.length * 13 + 20);
    const rowTop = y;
    for (const line of lines) {
      text(line, MARGIN, 10);
      y -= 13;
    }
    y = rowTop;
    text(quantity(item.quantity), columns.qty, 10, { align: "right" });
    text(money(item.unitPrice, doc.currency), columns.price, 10, { align: "right" });
    text(money(item.total, doc.currency), columns.total, 10, { align: "right" });
    y -= 13 * Math.max(lines.length, 1) + 4;
  }

  y -= 6;
  rule(y);
  y -= 22;

  // ---- total ---------------------------------------------------------------
  text(t.grandTotal, columns.price, 11, { font: bold, align: "right" });
  text(money(doc.total, doc.currency), columns.total, 13, { font: bold, align: "right" });
  y -= 16;
  if (doc.rsd) {
    text(money(doc.rsd.amount, "RSD"), columns.total, 10, { align: "right", color: MUTED });
    y -= 13;
    text(
      t.rateNote(
        doc.rsd.rate.toLocaleString("sr-RS", {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        }),
        doc.rsd.date,
      ),
      right,
      8,
      { align: "right", color: MUTED },
    );
    y -= 12;
  }

  y -= 20;
  ensureSpace(150);

  // ---- how to pay ----------------------------------------------------------
  // The account follows the SCOPE, not only the currency: a domestic transfer
  // settles in dinars whatever the invoice is denominated in.
  const accountValue = settlementAccount(doc.scope, doc.currency, {
    domestic: doc.seller.bankAccount,
    eur: doc.seller.eurAccount,
  });

  text(t.payment, MARGIN, 8, { color: MUTED });
  y -= 15;
  const payRows: [string, string | null | undefined][] = [
    [t.recipient, doc.seller.companyName ?? doc.seller.name],
    [t.account, accountValue],
    [t.method, doc.paymentMethod],
    ...(doc.scope === "foreign"
      ? ([
          ["SWIFT/BIC", doc.seller.swift],
          ["Bank", doc.seller.bankName],
          ["Bank address", doc.seller.bankAddress],
        ] as [string, string | null | undefined][])
      : []),
    // The model line only appears next to a reference that actually has check
    // digits — a "Poziv na broj" the bank refuses is worse than none.
    ...(doc.reference
      ? ([
          [t.model, "97"],
          [t.reference, doc.reference],
        ] as [string, string | null | undefined][])
      : []),
    [t.purpose, doc.paymentPurpose],
  ];
  for (const [label, value] of payRows) {
    if (!value) continue;
    text(`${label}:`, MARGIN, 9, { color: MUTED });
    text(value, MARGIN + 110, 9, { font: bold });
    y -= 14;
  }

  if (doc.settlementNote) {
    y -= 2;
    for (const line of wrap(doc.settlementNote, regular, 8.5, contentWidth)) {
      text(line, MARGIN, 8.5, { color: MUTED });
      y -= 11;
    }
  }

  y -= 14;

  // ---- notes ---------------------------------------------------------------
  for (const note of [
    doc.kind === "proforma" ? t.proformaNote : null,
    doc.note ? `${t.note}: ${doc.note}` : null,
    doc.vatNote,
  ]) {
    if (!note) continue;
    ensureSpace(40);
    for (const line of wrap(note, regular, 8.5, contentWidth)) {
      text(line, MARGIN, 8.5, { color: MUTED });
      y -= 11;
    }
    y -= 6;
  }

  // ---- footer --------------------------------------------------------------
  y = MARGIN + 14;
  rule(y + 12);
  text(t.footer, MARGIN, 8, { color: MUTED });

  return pdf.save();
}
