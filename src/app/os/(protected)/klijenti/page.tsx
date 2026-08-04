import Link from "next/link";
import { money } from "@/components/os/billingUi";
import { listClients } from "@/lib/billing/clients";

export const dynamic = "force-dynamic";

export default async function OsClientsPage() {
  const clients = await listClients();
  const mrr = clients.reduce((sum, client) => sum + client.mrr, 0);

  return (
    <>
      <h1 className="os-h1">Klijenti</h1>
      <p className="os-sub">
        {clients.length} klijenata · MRR {money(mrr, "RSD")}
      </p>

      <section className="os-section">
        <p>
          <Link className="os-btn" href="/os/klijenti/novi">
            Novi klijent
          </Link>
        </p>

        {clients.length === 0 ? (
          <p className="os-empty">Još nema klijenata.</p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Firma</th>
                  <th>Kontakt</th>
                  <th>PIB</th>
                  <th>MRR</th>
                  <th>Faktura</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <Link href={`/os/klijenti/${client.id}`}>{client.companyName}</Link>
                      {client.active ? null : <span className="os-badge os-badge--muted">neaktivan</span>}
                    </td>
                    <td>{client.contactPerson ?? client.email ?? "—"}</td>
                    <td>{client.pib ?? "—"}</td>
                    <td>{client.mrr > 0 ? money(client.mrr, "RSD") : "—"}</td>
                    <td>{client.invoiceCount}</td>
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
