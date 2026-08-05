import Link from "next/link";
import { money } from "@/components/os/billingUi";
import { listClients } from "@/lib/billing/clients";

export const dynamic = "force-dynamic";

export default async function OsClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; f?: string }>;
}) {
  const [{ q, f }, clients] = await Promise.all([searchParams, listClients()]);
  const query = (q ?? "").trim().toLowerCase();
  const onlyActive = f !== "svi";

  const rows = clients
    .filter((client) => (onlyActive ? client.active : true))
    .filter(
      (client) =>
        !query ||
        client.companyName.toLowerCase().includes(query) ||
        (client.contactPerson ?? "").toLowerCase().includes(query) ||
        (client.email ?? "").toLowerCase().includes(query) ||
        (client.pib ?? "").includes(query),
    );

  const mrr = clients.reduce((sum, client) => sum + (client.active ? client.mrr : 0), 0);
  const withoutEmail = clients.filter((client) => client.active && !client.email).length;

  return (
    <>
      <header className="os-head">
        <div>
          <h1 className="os-h1">Klijenti</h1>
          <p className="os-sub">
            {clients.filter((client) => client.active).length} aktivnih · MRR{" "}
            {money(mrr, "RSD")}
          </p>
        </div>
        <div className="os-actions">
          <form className="os-search" action="/os/klijenti">
            {f ? <input type="hidden" name="f" value={f} /> : null}
            <input
              type="search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Firma, kontakt, mejl, PIB…"
              aria-label="Pretraga klijenata"
            />
            <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
              Traži
            </button>
          </form>
          <Link className="os-btn os-btn--sm" href="/os/klijenti/novi">
            Novi klijent
          </Link>
        </div>
      </header>

      <div className="os-filters">
        <Link className={`os-chip${onlyActive ? " is-on" : ""}`} href="/os/klijenti">
          Aktivni
        </Link>
        <Link className={`os-chip${onlyActive ? "" : " is-on"}`} href="/os/klijenti?f=svi">
          Svi
        </Link>
      </div>

      {/* A client without an address is a client who cannot be invoiced by
          mail — worth saying once, not per row. */}
      {withoutEmail > 0 ? (
        <p className="os-flash is-bad">
          {withoutEmail} aktivnih klijenata nema mejl adresu — njima se dokument ne može poslati
          iz OS-a.
        </p>
      ) : null}

      <section className="os-section">
        <h2>{rows.length} klijenata</h2>
        {rows.length === 0 ? (
          <p className="os-empty">
            {clients.length === 0 ? "Još nema klijenata." : "Nema klijenata po ovoj pretrazi."}
          </p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Firma</th>
                  <th>Kontakt</th>
                  <th>Mejl</th>
                  <th>PIB</th>
                  <th>MRR</th>
                  <th>Dokumenata</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <Link href={`/os/klijenti/${client.id}`}>{client.companyName}</Link>
                      {client.active ? null : (
                        <span className="os-badge os-badge--muted">neaktivan</span>
                      )}
                    </td>
                    <td>{client.contactPerson ?? "—"}</td>
                    <td>
                      {client.email ? (
                        <a href={`mailto:${client.email}`}>{client.email}</a>
                      ) : (
                        <span className="os-badge os-badge--muted">nema</span>
                      )}
                    </td>
                    <td>{client.pib ?? "—"}</td>
                    <td>{client.mrr > 0 ? money(client.mrr, "RSD") : "—"}</td>
                    <td>{client.invoiceCount}</td>
                    <td className="os-table__actions">
                      <Link
                        className="os-btn os-btn--ghost os-btn--sm"
                        href={`/os/fakture/nova?clientId=${client.id}`}
                      >
                        Faktura
                      </Link>
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
