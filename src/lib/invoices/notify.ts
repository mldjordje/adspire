import "server-only";

import { getClient } from "@/lib/billing/clients";
import { leadNotificationRecipient } from "@/lib/env";
import { sendAndLog } from "@/lib/messages/store";
import { getSettings } from "@/lib/os/settings";
import { renderStoredInvoice } from "./issue";
import { getInvoiceDetail } from "./queries";
import { paymentReferenceFor, referenceModel } from "./rules";

/**
 * Sending a document to the buyer.
 *
 * The PDF is rendered from the stored row at send time, never from a file, so
 * what the client receives is byte-for-byte what `/os` shows and what a
 * re-download a year from now produces.
 *
 * Everything a payer needs is in the body as well as the attachment: half of
 * small-business Serbia pays from a phone without opening the PDF, and an
 * account number they have to hunt for is a payment that arrives a week late.
 */

const money = (amount: number, currency: string) =>
  `${amount.toLocaleString("sr-RS", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${currency}`;

const date = (iso: string | null) => {
  if (!iso) return "—";
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${d}.${m}.${y}.`;
};

export type InvoiceMailResult =
  | { ok: true; to: string }
  | { ok: false; reason: "no-email" | "not-found" | "send-failed"; error?: string | null };

export async function sendInvoiceMail(
  invoiceId: string,
  options: { createdBy?: string | null; correction?: boolean } = {},
): Promise<InvoiceMailResult> {
  const invoice = await getInvoiceDetail(invoiceId);
  if (!invoice) return { ok: false, reason: "not-found" };

  // The buyer snapshot on the row wins: it is the address the document was
  // issued against. The client record is the fallback for documents issued
  // before an address was on file.
  const client = invoice.clientId ? await getClient(invoice.clientId) : null;
  const to = invoice.buyer.email?.trim() || client?.email?.trim() || null;
  if (!to) return { ok: false, reason: "no-email" };

  const [settings, rendered] = await Promise.all([
    getSettings(),
    renderStoredInvoice(invoiceId),
  ]);
  if (!rendered) return { ok: false, reason: "not-found" };

  const proforma = invoice.kind === "proforma";
  const label = proforma ? "Predračun" : "Račun";
  const reference = paymentReferenceFor(
    invoice.number,
    referenceModel(settings.payment_reference_model),
  );

  // A correction goes out under the same number: the PDF is re-rendered from
  // the row plus the current issuer details, so a fixed setting reaches the
  // buyer without cancelling a document whose figures were never wrong. Both
  // subject and first line say so, or the client files two copies of one debt.
  const correction = options.correction === true;
  const issuer = settings.company_name.split(" PR ")[0] || "Adspire Digital";
  const subject = `${correction ? `Ispravljen ${label.toLowerCase()}` : label} ${invoice.number} — ${issuer}`;

  const body = [
    `Poštovani,`,
    "",
    correction
      ? `u prilogu je ispravljen ${label.toLowerCase()} ${invoice.number}${
          invoice.periodLabel ? ` za period ${invoice.periodLabel}` : ""
        }. Na prethodno poslatoj verziji su bili netačni podaci izdavaoca; broj dokumenta, iznos i stavke su nepromenjeni. Ovaj dokument zamenjuje prethodni — prethodni obrišite.`
      : `u prilogu je ${label.toLowerCase()} ${invoice.number}${
          invoice.periodLabel ? ` za period ${invoice.periodLabel}` : ""
        }.`,
    "",
    `Iznos: ${money(invoice.total, invoice.currency)}`,
    ...(invoice.totalRsd && invoice.currency !== "RSD"
      ? [`Protivvrednost: ${money(invoice.totalRsd, "RSD")}`]
      : []),
    `Rok plaćanja: ${date(invoice.dueDate)}`,
    `Račun: ${invoice.bankAccount ?? "—"}`,
    reference ? `Poziv na broj: ${reference}` : `Svrha uplate: ${invoice.number}`,
    "",
    ...(proforma
      ? ["Po evidentiranoj uplati šaljem račun.", ""]
      : []),
    "Ako nešto nije u redu na dokumentu, samo odgovorite na ovaj mejl.",
    "",
    "Đorđe Mladenović",
    "Adspire Digital · adspire.rs",
    "+381 60 149 149 1",
  ].join("\n");

  const result = await sendAndLog({
    to,
    cc: client?.emailCc?.trim() || null,
    // Copy to the owner's mailbox: SMTP leaves nothing in the cPanel "Sent"
    // folder, so without this a sent invoice exists only inside /os.
    bcc: leadNotificationRecipient(),
    subject,
    body,
    invoiceId,
    clientId: invoice.clientId,
    createdBy: options.createdBy ?? null,
    attachments: [
      {
        filename: `${invoice.number.replace("/", "-")}.pdf`,
        content: Buffer.from(rendered.bytes),
        contentType: "application/pdf",
      },
    ],
  });

  if (!result.ok) return { ok: false, reason: "send-failed", error: result.error };
  return { ok: true, to };
}
