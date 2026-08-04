import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, InvoiceStatusBadge, money } from "@/components/os/billingUi";
import { setInvoiceStatusAction } from "@/lib/billing/actions";
import { getInvoiceDetail } from "@/lib/invoices/queries";

export const dynamic = "force-dynamic";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoice = await getInvoiceDetail(id);
  if (!invoice) notFound();

  const title = invoice.kind === "proforma" ? "Predračun" : "Račun";

  return (
    <>
      <p className="os-sub">
        <Link href="/os/fakture">← Fakture</Link>
      </p>
      <h1 className="os-h1">
        {title} {invoice.number} <InvoiceStatusBadge status={invoice.status} />
      </h1>
      <p className="os-sub">
        {invoice.clientName} · {money(invoice.total, invoice.currency)}
      </p>

      <section className="os-section">
        <p className="os-stageform">
          <a className="os-btn" href={`/api/os/fakture/${invoice.id}/pdf`}>
            Preuzmi PDF
          </a>
          {invoice.status !== "paid" ? (
            <form action={setInvoiceStatusAction}>
              <input type="hidden" name="id" value={invoice.id} />
              <input type="hidden" name="status" value="paid" />
              <button className="os-btn os-btn--ghost" type="submit">
                Označi kao plaćeno
              </button>
            </form>
          ) : (
            <form action={setInvoiceStatusAction}>
              <input type="hidden" name="id" value={invoice.id} />
              <input type="hidden" name="status" value="issued" />
              <button className="os-btn os-btn--ghost" type="submit">
                Vrati na neplaćeno
              </button>
            </form>
          )}
          {invoice.status !== "cancelled" ? (
            <form action={setInvoiceStatusAction}>
              <input type="hidden" name="id" value={invoice.id} />
              <input type="hidden" name="status" value="cancelled" />
              <button className="os-btn os-btn--ghost" type="submit">
                Storniraj
              </button>
            </form>
          ) : null}
        </p>
        <p className="os-note">
          Dokument se ne menja posle izdavanja — greška se ispravlja storniranjem i novim
          dokumentom, jer je broj već dodeljen.
        </p>
      </section>

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
