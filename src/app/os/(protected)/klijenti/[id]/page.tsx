import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientForm } from "@/components/os/ClientForm";
import { formatDate, InvoiceStatusBadge, money } from "@/components/os/billingUi";
import { addSubscriptionAction, toggleSubscriptionAction } from "@/lib/billing/actions";
import { getClient, listSubscriptions } from "@/lib/billing/clients";
import { listInvoices } from "@/lib/invoices/queries";

export const dynamic = "force-dynamic";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();

  const [subscriptions, invoices] = await Promise.all([
    listSubscriptions(id),
    listInvoices({ clientId: id, limit: 50 }),
  ]);
  const mrr = subscriptions
    .filter((s) => s.active)
    .reduce((sum, s) => sum + s.monthlyPrice * s.quantity, 0);

  return (
    <>
      <p className="os-sub">
        <Link href="/os/klijenti">← Klijenti</Link>
      </p>
      <h1 className="os-h1">{client.companyName}</h1>
      <p className="os-sub">
        MRR {money(mrr, "RSD")} · {invoices.length} dokumenata
      </p>

      <section className="os-section">
        <h2>Pretplate (održavanje)</h2>
        {subscriptions.length === 0 ? (
          <p className="os-empty">Nema pretplata.</p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Naziv</th>
                  <th>Stavka na fakturi</th>
                  <th>Kol.</th>
                  <th>Mesečno</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id}>
                    <td>
                      {subscription.title}
                      {subscription.active ? null : (
                        <span className="os-badge os-badge--muted">pauzirano</span>
                      )}
                    </td>
                    <td>{subscription.itemDescription}</td>
                    <td>{subscription.quantity}</td>
                    <td>{money(subscription.monthlyPrice, subscription.currency)}</td>
                    <td>
                      <form action={toggleSubscriptionAction}>
                        <input type="hidden" name="id" value={subscription.id} />
                        <input type="hidden" name="clientId" value={client.id} />
                        <input
                          type="hidden"
                          name="active"
                          value={subscription.active ? "0" : "1"}
                        />
                        <button className="os-btn os-btn--ghost" type="submit">
                          {subscription.active ? "Pauziraj" : "Aktiviraj"}
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <form action={addSubscriptionAction} className="os-form" style={{ marginTop: 16 }}>
          <input type="hidden" name="clientId" value={client.id} />
          <label>
            Naziv
            <input name="title" required placeholder="Održavanje sajta" />
          </label>
          <label>
            Stavka na fakturi
            <input name="itemDescription" placeholder="Mesečno održavanje web sajta" />
          </label>
          <label>
            Količina
            <input name="quantity" defaultValue="1" inputMode="decimal" />
          </label>
          <label>
            Mesečna cena
            <input name="monthlyPrice" required inputMode="decimal" placeholder="6000" />
          </label>
          <label>
            Valuta
            <select name="currency" defaultValue="RSD">
              <option value="RSD">RSD</option>
              <option value="EUR">EUR</option>
            </select>
          </label>
          <div className="os-form__wide">
            <button className="os-btn os-btn--ghost" type="submit">
              Dodaj pretplatu
            </button>
          </div>
        </form>
      </section>

      <section className="os-section">
        <h2>Dokumenta</h2>
        <p>
          <Link className="os-btn" href={`/os/fakture/nova?clientId=${client.id}`}>
            Nova faktura
          </Link>
        </p>
        {invoices.length === 0 ? (
          <p className="os-empty">Nema faktura.</p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Broj</th>
                  <th>Izdata</th>
                  <th>Iznos</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      <Link href={`/os/fakture/${invoice.id}`}>{invoice.number}</Link>
                    </td>
                    <td>{formatDate(invoice.issueDate)}</td>
                    <td>{money(invoice.total, invoice.currency)}</td>
                    <td>
                      <InvoiceStatusBadge status={invoice.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="os-section">
        <h2>Podaci klijenta</h2>
        <ClientForm client={client} />
      </section>
    </>
  );
}
