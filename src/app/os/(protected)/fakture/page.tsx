import Link from "next/link";
import { formatDate, InvoiceStatusBadge, money } from "@/components/os/billingUi";
import { getBillingSummary, listInvoices } from "@/lib/invoices/queries";

export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  const [invoices, summary] = await Promise.all([listInvoices(), getBillingSummary()]);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <h1 className="os-h1">Fakture</h1>
      <p className="os-sub">
        {summary.issuedThisYear} računa u {new Date().getFullYear()}. ·{" "}
        {money(summary.billedThisYear, "RSD")} fakturisano
      </p>

      <div className="os-cards">
        <div className="os-card">
          <div className="os-card__label">Fakturisano ove godine</div>
          <div className="os-card__value">{money(summary.billedThisYear, "RSD")}</div>
        </div>
        <div className={`os-card${summary.unpaidCount > 0 ? " os-card--alert" : ""}`}>
          <div className="os-card__label">Neplaćeno</div>
          <div className="os-card__value">{money(summary.unpaidTotal, "RSD")}</div>
        </div>
        <div className={`os-card${summary.overdueCount > 0 ? " os-card--alert" : ""}`}>
          <div className="os-card__label">Van roka</div>
          <div className="os-card__value">{summary.overdueCount}</div>
        </div>
        <div className="os-card">
          <div className="os-card__label">MRR</div>
          <div className="os-card__value">{money(summary.mrr, "RSD")}</div>
        </div>
      </div>

      <section className="os-section">
        <p>
          <Link className="os-btn" href="/os/fakture/nova">
            Novi dokument
          </Link>
        </p>

        {invoices.length === 0 ? (
          <p className="os-empty">Još nema izdatih dokumenata.</p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Broj</th>
                  <th>Klijent</th>
                  <th>Izdata</th>
                  <th>Rok</th>
                  <th>Iznos</th>
                  <th>Status</th>
                  <th>Poslato</th>
                  <th>PDF</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      {/* The "PR-" prefix is part of the stored number itself. */}
                      <Link href={`/os/fakture/${invoice.id}`}>{invoice.number}</Link>
                    </td>
                    <td>{invoice.clientName}</td>
                    <td>{formatDate(invoice.issueDate)}</td>
                    <td>{formatDate(invoice.dueDate)}</td>
                    <td>{money(invoice.total, invoice.currency)}</td>
                    <td>
                      <InvoiceStatusBadge
                        status={invoice.status}
                        overdue={Boolean(invoice.dueDate && invoice.dueDate < today)}
                      />
                    </td>
                    <td>
                      {invoice.sentAt ? (
                        formatDate(invoice.sentAt)
                      ) : invoice.status === "cancelled" ? (
                        "—"
                      ) : (
                        <span className="os-badge os-badge--muted">nije poslato</span>
                      )}
                    </td>
                    <td>
                      <a href={`/api/os/fakture/${invoice.id}/pdf`}>preuzmi</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
