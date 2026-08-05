import Link from "next/link";
import { SERVICE_LABELS, since, STATUS_LABELS } from "@/components/os/leadUi";
import { listLeads } from "@/lib/crm/queries";
import { LEAD_STATUSES } from "@/lib/crm/types";

export const dynamic = "force-dynamic";

/** Open stages only — won/lost belong in reporting, not in the working board. */
const OPEN_STAGES = LEAD_STATUSES.filter((s) => s !== "won" && s !== "lost");

export default async function OsPipelinePage() {
  const rows = await listLeads({ limit: 300 });
  const open = rows.filter((row) => row.status !== "won" && row.status !== "lost");
  const won = rows.filter((row) => row.status === "won").length;
  const lost = rows.filter((row) => row.status === "lost").length;

  return (
    <>
      <header className="os-head">
        <div>
          <h1 className="os-h1">Pipeline</h1>
          <p className="os-sub">
            {open.length} otvorenih · {won} dobijenih · {lost} izgubljenih. Fazu menjaš na
            strani leada.
          </p>
        </div>
      </header>

      {/* A board rather than stacked tables: the point of a pipeline is seeing
          where things pile up, and that only reads across columns. */}
      <div className="os-board">
        {OPEN_STAGES.map((stage) => {
          const stageRows = open.filter((row) => row.status === stage);
          return (
            <section key={stage} className="os-board__col">
              <header>
                <span>{STATUS_LABELS[stage]}</span>
                <span className="os-board__count">{stageRows.length}</span>
              </header>
              {stageRows.length === 0 ? (
                <p className="os-board__empty">—</p>
              ) : (
                stageRows.map((row) => (
                  <Link key={row.id} className="os-lead-card" href={`/os/leads/${row.id}`}>
                    <strong>{row.fullName}</strong>
                    <span>{row.company ?? SERVICE_LABELS[row.service] ?? row.service}</span>
                    <span className="os-lead-card__foot">
                      {since(row.createdAt)}
                      {row.followUpOn ? ` · podsetnik ${row.followUpOn}` : ""}
                    </span>
                  </Link>
                ))
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
