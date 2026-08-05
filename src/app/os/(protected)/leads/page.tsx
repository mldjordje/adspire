import Link from "next/link";
import { LeadTable, plural, STATUS_LABELS } from "@/components/os/leadUi";
import { listLeads } from "@/lib/crm/queries";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/crm/types";

export const dynamic = "force-dynamic";

const isLeadStatus = (value: string | undefined): value is LeadStatus =>
  typeof value === "string" && (LEAD_STATUSES as readonly string[]).includes(value);

export default async function OsLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const active = isLeadStatus(status) ? status : undefined;
  const query = (q ?? "").trim();
  const rows = await listLeads({ status: active, query });

  const filterHref = (value?: LeadStatus) => {
    const params = new URLSearchParams();
    if (value) params.set("status", value);
    if (query) params.set("q", query);
    const search = params.toString();
    return `/os/leads${search ? `?${search}` : ""}`;
  };

  return (
    <>
      <header className="os-head">
        <div>
          <h1 className="os-h1">Leadovi</h1>
          <p className="os-sub">Svaki upit sa sajta, sa izvorom sa kojeg je došao.</p>
        </div>
        {/* GET form: the filter state lives in the URL, so a filtered list can be
            bookmarked and reloaded without re-typing. */}
        <form className="os-search" action="/os/leads">
          {active ? <input type="hidden" name="status" value={active} /> : null}
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Ime, mejl, firma, tekst poruke…"
            aria-label="Pretraga leadova"
          />
          <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
            Traži
          </button>
        </form>
      </header>

      <div className="os-filters">
        <Link className={`os-chip${active ? "" : " is-on"}`} href={filterHref()}>
          Svi
        </Link>
        {LEAD_STATUSES.map((value) => (
          <Link
            key={value}
            className={`os-chip${active === value ? " is-on" : ""}`}
            href={filterHref(value)}
          >
            {STATUS_LABELS[value]}
          </Link>
        ))}
        {query ? (
          <Link className="os-chip os-chip--clear" href={active ? `/os/leads?status=${active}` : "/os/leads"}>
            Očisti „{query}"
          </Link>
        ) : null}
      </div>

      <section className="os-section">
        <h2>{plural(rows.length, "lead", "leada", "leadova")}</h2>
        <LeadTable rows={rows} />
      </section>
    </>
  );
}
