import Link from "next/link";
import { LeadTable, STATUS_LABELS } from "@/components/os/leadUi";
import { listLeads } from "@/lib/crm/queries";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/crm/types";

export const dynamic = "force-dynamic";

const isLeadStatus = (value: string | undefined): value is LeadStatus =>
  typeof value === "string" && (LEAD_STATUSES as readonly string[]).includes(value);

export default async function OsLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = isLeadStatus(status) ? status : undefined;
  const rows = await listLeads({ status: active });

  return (
    <>
      <h1 className="os-h1">Leadovi</h1>
      <p className="os-sub">Svaki upit sa sajta, sa izvorom sa kojeg je došao.</p>

      <section className="os-section">
        <h2>Filter</h2>
        <div className="os-stageform">
          <Link className={`os-badge${active ? " os-badge--muted" : ""}`} href="/os/leads">
            Svi
          </Link>
          {LEAD_STATUSES.map((s) => (
            <Link
              key={s}
              className={`os-badge${active === s ? "" : " os-badge--muted"}`}
              href={`/os/leads?status=${s}`}
            >
              {STATUS_LABELS[s]}
            </Link>
          ))}
        </div>
      </section>

      <section className="os-section">
        <h2>{rows.length} leadova</h2>
        <LeadTable rows={rows} />
      </section>
    </>
  );
}
