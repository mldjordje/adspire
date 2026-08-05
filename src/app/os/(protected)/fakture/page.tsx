import Link from "next/link";
import { formatDate, InvoiceStatusBadge, money } from "@/components/os/billingUi";
import { getBillingSummary, listInvoices } from "@/lib/invoices/queries";

export const dynamic = "force-dynamic";

/** Filters are applied in memory: the whole document set for one owner is a few
 *  hundred rows, and a query per filter buys nothing. */
const FILTERS = [
  { key: "sve", label: "Sve" },
  { key: "racuni", label: "Računi" },
  { key: "predracuni", label: "Predračuni" },
  { key: "neplaceno", label: "Neplaćeno" },
  { key: "van-roka", label: "Van roka" },
  { key: "neposlato", label: "Nije poslato" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ f?: string; q?: string }>;
}) {
  const [{ f, q }, invoices, summary] = await Promise.all([
    searchParams,
    listInvoices(),
    getBillingSummary(),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const active = (FILTERS.find((item) => item.key === f)?.key ?? "sve") as FilterKey;
  const query = (q ?? "").trim().toLowerCase();

  const rows = invoices
    .filter((invoice) => {
      switch (active) {
        case "racuni":
          return invoice.kind === "invoice";
        case "predracuni":
          return invoice.kind === "proforma";
        case "neplaceno":
          return invoice.status === "issued";
        case "van-roka":
          return (
            invoice.status === "issued" && Boolean(invoice.dueDate && invoice.dueDate < today)
          );
        case "neposlato":
          return invoice.sentAt === null && invoice.status !== "cancelled";
        default:
          return true;
      }
    })
    .filter(
      (invoice) =>
        !query ||
        invoice.number.toLowerCase().includes(query) ||
        invoice.clientName.toLowerCase().includes(query),
    );

  const filterHref = (key: FilterKey) => {
    const params = new URLSearchParams();
    if (key !== "sve") params.set("f", key);
    if (query) params.set("q", query);
    const search = params.toString();
    return `/os/fakture${search ? `?${search}` : ""}`;
  };

  const shown = rows.reduce((sum, invoice) => sum + (invoice.currency === "RSD" ? invoice.total : 0), 0);

  return (
    <>
      <header className="os-head">
        <div>
          <h1 className="os-h1">Fakture</h1>
          <p className="os-sub">
            {summary.issuedThisYear} računa u {new Date().getFullYear()}. ·{" "}
            {money(summary.billedThisYear, "RSD")} fakturisano
          </p>
        </div>
        <div className="os-actions">
          <form className="os-search" action="/os/fakture">
            {active !== "sve" ? <input type="hidden" name="f" value={active} /> : null}
            <input
              type="search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Broj ili klijent…"
              aria-label="Pretraga dokumenata"
            />
            <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
              Traži
            </button>
          </form>
          <Link className="os-btn os-btn--sm" href="/os/fakture/nova">
            Novi dokument
          </Link>
        </div>
      </header>

      <div className="os-cards">
        <div className="os-card">
          <div className="os-card__label">Fakturisano ove godine</div>
          <div className="os-card__value">{money(summary.billedThisYear, "RSD")}</div>
        </div>
        <Link
          className={`os-card${summary.unpaidCount > 0 ? " os-card--alert" : ""}`}
          href="/os/fakture?f=neplaceno"
        >
          <div className="os-card__label">Neplaćeno</div>
          <div className="os-card__value">{money(summary.unpaidTotal, "RSD")}</div>
        </Link>
        <Link
          className={`os-card${summary.overdueCount > 0 ? " os-card--alert" : ""}`}
          href="/os/fakture?f=van-roka"
        >
          <div className="os-card__label">Van roka</div>
          <div className="os-card__value">{summary.overdueCount}</div>
        </Link>
        <div className="os-card">
          <div className="os-card__label">MRR</div>
          <div className="os-card__value">{money(summary.mrr, "RSD")}</div>
        </div>
      </div>

      <div className="os-filters">
        {FILTERS.map((item) => (
          <Link
            key={item.key}
            className={`os-chip${active === item.key ? " is-on" : ""}`}
            href={filterHref(item.key)}
          >
            {item.label}
          </Link>
        ))}
        {query ? (
          <Link
            className="os-chip os-chip--clear"
            href={active === "sve" ? "/os/fakture" : `/os/fakture?f=${active}`}
          >
            Očisti „{query}"
          </Link>
        ) : null}
      </div>

      <section className="os-section">
        <h2>
          {rows.length} dokumenata{" "}
          <span className="os-note">zbir dinarskih: {money(shown, "RSD")}</span>
        </h2>

        {rows.length === 0 ? (
          <p className="os-empty">
            {invoices.length === 0 ? "Još nema izdatih dokumenata." : "Nema dokumenata po ovom filteru."}
          </p>
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
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((invoice) => {
                  const overdue = Boolean(
                    invoice.status === "issued" && invoice.dueDate && invoice.dueDate < today,
                  );
                  return (
                      <tr key={invoice.id} className={overdue ? "is-stale" : undefined}>
                        <td>
                          {/* The "PR-" prefix is part of the stored number itself. */}
                          <Link href={`/os/fakture/${invoice.id}`}>{invoice.number}</Link>
                          <div className="os-note">
                            {invoice.kind === "proforma" ? "predračun" : "račun"}
                          </div>
                        </td>
                        <td>{invoice.clientName}</td>
                        <td>{formatDate(invoice.issueDate)}</td>
                        <td>{formatDate(invoice.dueDate)}</td>
                        <td>{money(invoice.total, invoice.currency)}</td>
                        <td>
                          <InvoiceStatusBadge status={invoice.status} overdue={overdue} />
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
                        <td className="os-table__actions">
                          <a
                            className="os-btn os-btn--ghost os-btn--sm"
                            href={`/api/os/fakture/${invoice.id}/pdf`}
                          >
                            PDF
                          </a>
                        </td>
                      </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
