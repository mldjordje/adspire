import Link from "next/link";
import { formatDateTime, SERVICE_LABELS, STATUS_LABELS } from "@/components/os/leadUi";
import { listLeads } from "@/lib/crm/queries";
import { LEAD_STATUSES } from "@/lib/crm/types";

export const dynamic = "force-dynamic";

/** Open stages only — won/lost belong in reporting, not in the working board. */
const OPEN_STAGES = LEAD_STATUSES.filter((s) => s !== "won" && s !== "lost");

export default async function OsPipelinePage() {
  const rows = await listLeads({ limit: 300 });

  return (
    <>
      <h1 className="os-h1">Pipeline</h1>
      <p className="os-sub">Otvorene prilike po fazama. Fazu menjaš na strani leada.</p>

      {OPEN_STAGES.map((stage) => {
        const stageRows = rows.filter((row) => row.status === stage);
        return (
          <section key={stage} className="os-section">
            <h2>
              {STATUS_LABELS[stage]} <span className="os-badge">{stageRows.length}</span>
            </h2>
            {stageRows.length === 0 ? (
              <p className="os-empty">Prazno.</p>
            ) : (
              <div className="os-tablewrap">
                <table className="os-table">
                  <thead>
                    <tr>
                      <th>Ime</th>
                      <th>Firma</th>
                      <th>Usluga</th>
                      <th>Stiglo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stageRows.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <Link href={`/os/leads/${row.id}`}>{row.fullName}</Link>
                        </td>
                        <td>{row.company ?? "—"}</td>
                        <td>{SERVICE_LABELS[row.service] ?? row.service}</td>
                        <td>{formatDateTime(row.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}
