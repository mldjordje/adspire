import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, InvoiceStatusBadge, money } from "@/components/os/billingUi";
import { formatDateTime } from "@/components/os/leadUi";
import { Timeline } from "@/components/os/Timeline";
import { sendInvoiceAction, setInvoiceStatusAction } from "@/lib/billing/actions";
import { getInvoiceDetail } from "@/lib/invoices/queries";
import { listMessagesForInvoice } from "@/lib/messages/store";

export const dynamic = "force-dynamic";

const MAIL_FLASH: Record<string, { tone: "ok" | "bad"; text: string }> = {
  poslato: { tone: "ok", text: "Dokument je poslat klijentu, sa PDF-om u prilogu." },
  "no-email": {
    tone: "bad",
    text: "Klijent nema mejl adresu. Upiši je na kartici klijenta, pa pošalji ponovo.",
  },
  "send-failed": {
    tone: "bad",
    text: "Slanje nije uspelo. Razlog je zapisan u prepisci ispod.",
  },
  "not-found": { tone: "bad", text: "Dokument nije pronađen." },
};

export default async function InvoiceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mail?: string }>;
}) {
  const [{ id }, { mail }] = await Promise.all([params, searchParams]);
  const invoice = await getInvoiceDetail(id);
  if (!invoice) notFound();

  const messages = await listMessagesForInvoice(id).catch(() => []);
  const flash = mail ? MAIL_FLASH[mail] : undefined;
  const title = invoice.kind === "proforma" ? "Predračun" : "Račun";
  const recipient = invoice.buyer.email ?? null;

  return (
    <>
      <p className="os-crumbs">
        <Link href="/os/fakture">← Fakture</Link>
      </p>
      <h1 className="os-h1">
        {title} {invoice.number} <InvoiceStatusBadge status={invoice.status} />
        {invoice.sentAt ? <span className="os-badge">Poslato</span> : null}
      </h1>
      <p className="os-sub">
        {invoice.clientName} · {money(invoice.total, invoice.currency)}
        {invoice.sentAt ? ` · poslato ${formatDateTime(invoice.sentAt)}` : ""}
      </p>

      {flash ? (
        <p className={`os-flash is-${flash.tone}`} role="status">
          {flash.text}
        </p>
      ) : null}

      <section className="os-section">
        <div className="os-actions">
          <a className="os-btn os-btn--ghost os-btn--sm" href={`/api/os/fakture/${invoice.id}/pdf`}>
            Preuzmi PDF
          </a>
          {invoice.status !== "cancelled" ? (
            <form action={sendInvoiceAction}>
              <input type="hidden" name="id" value={invoice.id} />
              <button className="os-btn os-btn--sm" type="submit">
                {invoice.sentAt ? "Pošalji ponovo" : `Pošalji ${title.toLowerCase()} klijentu`}
              </button>
            </form>
          ) : null}
          {invoice.status !== "paid" ? (
            <form action={setInvoiceStatusAction}>
              <input type="hidden" name="id" value={invoice.id} />
              <input type="hidden" name="status" value="paid" />
              <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
                Označi kao plaćeno
              </button>
            </form>
          ) : (
            <form action={setInvoiceStatusAction}>
              <input type="hidden" name="id" value={invoice.id} />
              <input type="hidden" name="status" value="issued" />
              <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
                Vrati na neplaćeno
              </button>
            </form>
          )}
          {invoice.status !== "cancelled" ? (
            <form action={setInvoiceStatusAction}>
              <input type="hidden" name="id" value={invoice.id} />
              <input type="hidden" name="status" value="cancelled" />
              <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
                Storniraj
              </button>
            </form>
          ) : null}
        </div>
        <p className="os-note" style={{ marginTop: 12 }}>
          Šalje se na <strong>{recipient ?? "— klijent nema mejl —"}</strong>, kopija ide na tvoju
          adresu. Dokument se ne menja posle izdavanja — greška se ispravlja storniranjem i novim
          dokumentom, jer je broj već dodeljen.
        </p>
      </section>

      {messages.length > 0 ? (
        <section className="os-section">
          <h2>Prepiska o ovom dokumentu</h2>
          <Timeline messages={messages} activities={[]} />
        </section>
      ) : null}

      <section className="os-section">
        <h2>Stavke</h2>
        <div className="os-tablewrap">
          <table className="os-table">
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Kol.</th>
                <th>Cena</th>
                <th>Iznos</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{money(item.unitPrice, invoice.currency)}</td>
                  <td>{money(item.total, invoice.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="os-total">
          Ukupno: {money(invoice.total, invoice.currency)}
          {invoice.totalRsd ? ` (${money(invoice.totalRsd, "RSD")})` : ""}
        </p>
      </section>

      <section className="os-section">
        <h2>Podaci dokumenta</h2>
        <dl className="os-kv">
          <dt>Datum izdavanja</dt>
          <dd>{formatDate(invoice.issueDate)}</dd>
          <dt>Datum prometa</dt>
          <dd>{formatDate(invoice.supplyDate)}</dd>
          <dt>Rok plaćanja</dt>
          <dd>{formatDate(invoice.dueDate)}</dd>
          <dt>Mesto izdavanja</dt>
          <dd>{invoice.place}</dd>
          <dt>Način plaćanja</dt>
          <dd>{invoice.paymentMethod}</dd>
          <dt>Račun</dt>
          <dd>{invoice.bankAccount ?? "—"}</dd>
          <dt>Period</dt>
          <dd>{invoice.periodLabel ?? "—"}</dd>
          <dt>Napomena</dt>
          <dd>{invoice.note ?? "—"}</dd>
          <dt>PDV napomena</dt>
          <dd>{invoice.vatNote || "—"}</dd>
        </dl>
      </section>

      <section className="os-section">
        <h2>Kupac (kako je odštampano)</h2>
        <dl className="os-kv">
          <dt>Naziv</dt>
          <dd>{invoice.buyer.companyName ?? "—"}</dd>
          <dt>Adresa</dt>
          <dd>{[invoice.buyer.address, invoice.buyer.city].filter(Boolean).join(", ") || "—"}</dd>
          <dt>PIB</dt>
          <dd>{invoice.buyer.pib ?? "—"}</dd>
          <dt>Matični broj</dt>
          <dd>{invoice.buyer.mb ?? "—"}</dd>
          <dt>Email</dt>
          <dd>{invoice.buyer.email ?? "—"}</dd>
        </dl>
        {invoice.clientId ? (
          <p>
            <Link href={`/os/klijenti/${invoice.clientId}`}>Otvori klijenta →</Link>
          </p>
        ) : null}
      </section>
    </>
  );
}
