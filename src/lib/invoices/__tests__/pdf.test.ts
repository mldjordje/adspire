import { writeFile } from "node:fs/promises";
import { describe, expect, it, vi } from "vitest";
import { renderInvoicePdf } from "../pdf";
import { itemTotals } from "../rules";

// "server-only" throws outside a Server Component; under vitest there is none.
vi.mock("server-only", () => ({}));

const { lines, total } = itemTotals([
  { name: "Mesečno održavanje web sajta — jul 2026.", quantity: 1, unitPrice: 6000 },
  { name: "Dodatne izmene na sajtu (sat)", quantity: 2.5, unitPrice: 2400 },
]);

const document = {
  kind: "invoice" as const,
  scope: "domestic" as const,
  number: "34/2026",
  issueDate: new Date("2026-07-31T12:00:00Z"),
  supplyDate: new Date("2026-07-31T12:00:00Z"),
  dueDate: new Date("2026-08-07T12:00:00Z"),
  placeOfIssue: "Niš",
  paymentMethod: "Uplata na tekući račun",
  currency: "RSD",
  items: lines,
  total,
  seller: {
    companyName: "Đorđe Milovanović PR Informacione usluge Adspire Niš",
    address: "Dimitrija Leka 66",
    city: "Niš",
    country: "Srbija",
    pib: "114723739",
    mb: "67804961",
    email: "djordje@adspire.rs",
    bankAccount: "170-0050047824000-76",
  },
  buyer: {
    companyName: "Auto Delić d.o.o.",
    address: "Bulevar Nemanjića 1",
    city: "Niš",
    country: "Srbija",
    pib: "100000000",
    mb: "20000000",
  },
  reference: null,
  paymentPurpose: "34/2026",
  vatNote: "PDV nije obračunat u skladu sa članom 33. Zakona o PDV.",
  note: null,
};

describe("renderInvoicePdf", () => {
  it("renders a PDF with the Serbian template", async () => {
    const bytes = await renderInvoicePdf(document);

    expect(Buffer.from(bytes.slice(0, 5)).toString()).toBe("%PDF-");
    // Diacritics come from the embedded font, so a document that renders at all
    // is a document whose č/ć/š/ž/đ did not throw.
    expect(bytes.byteLength).toBeGreaterThan(5000);

    // Eyeballing the layout: INVOICE_PDF_OUT=<path> npx vitest run pdf
    if (process.env.INVOICE_PDF_OUT) {
      await writeFile(process.env.INVOICE_PDF_OUT, Buffer.from(bytes));
    }
  });

  it("renders the English template for a foreign buyer", async () => {
    const bytes = await renderInvoicePdf({
      ...document,
      scope: "foreign",
      currency: "EUR",
      seller: { ...document.seller, eurAccount: "RS35170…", swift: "UBBKRSBG" },
      buyer: { companyName: "Muster GmbH", city: "München", country: "Deutschland" },
      rsd: { amount: 105_000, rate: 117.2, date: "2026-07-31" },
    });

    expect(Buffer.from(bytes.slice(0, 5)).toString()).toBe("%PDF-");
  });
});
