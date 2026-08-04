import Link from "next/link";
import { LeadTable, STATUS_LABELS } from "@/components/os/leadUi";
import { getDashboardData } from "@/lib/crm/queries";
import { getBillingSummary } from "@/lib/invoices/queries";
import { money } from "@/components/os/billingUi";

export const dynamic = "force-dynamic";

export default async function OsDashboardPage() {
  const [data, billing] = await Promise.all([getDashboardData(), getBillingSummary()]);
  const stageMax = Math.max(1, ...data.byStage.map((s) => s.count));

  return (
    <>
      <h1 className="os-h1">Pregled</h1>
      <p className="os-sub">Šta danas mora da se uradi.</p>

      <div className="os-cards">
        <div className="os-card">
          <div className="os-card__label">Novi danas</div>
          <div className="os-card__value">{data.newToday}</div>
        </div>
        <div className="os-card">
          <div className="os-card__label">Ove nedelje</div>
          <div className="os-card__value">{data.newThisWeek}</div>
        </div>
        <div className={`os-card${data.untouched > 0 ? " os-card--alert" : ""}`}>
          <div className="os-card__label">Bez odgovora</div>
          <div className="os-card__value">{data.untouched}</div>
        </div>
        <div className="os-card">
          <div className="os-card__label">Otvoreno</div>
          <div className="os-card__value">{data.open}</div>
        </div>
      </div>

      <section className="os-section">
        <h2>
          Novac <Link href="/os/fakture">→ fakture</Link>
        </h2>
        <div className="os-cards">
          <div className="os-card">
            <div className="os-card__label">MRR (RSD)</div>
            <div className="os-card__value">{money(billing.mrr, "RSD")}</div>
          </div>
          <div className="os-card">
            <div className="os-card__label">Fakturisano {new Date().getFullYear()}.</div>
            <div className="os-card__value">{money(billing.billedThisYear, "RSD")}</div>
          </div>
          <div className={`os-card${billing.unpaidCount > 0 ? " os-card--alert" : ""}`}>
            <div className="os-card__label">Neplaćeno</div>
            <div className="os-card__value">{money(billing.unpaidTotal, "RSD")}</div>
          </div>
          <div className={`os-card${billing.overdueCount > 0 ? " os-card--alert" : ""}`}>
            <div className="os-card__label">Van roka</div>
            <div className="os-card__value">{billing.overdueCount}</div>
          </div>
        </div>
      </section>

      <section className="os-section">
        <h2>Pipeline</h2>
        <div className="os-pipeline">
          {data.byStage.map(({ status, count }) => (
            <div key={status} className="os-pipe-row">
              <span>{STATUS_LABELS[status]}</span>
              <span className="os-pipe-bar">
                <span style={{ width: `${(count / stageMax) * 100}%` }} />
              </span>
              <span className="os-pipe-count">{count}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="os-section">
        <h2>Izvori (poslednjih 10)</h2>
        {data.topSources.length === 0 ? (
          <p className="os-empty">Nema podataka.</p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Izvor</th>
                  <th>Leadova</th>
                </tr>
              </thead>
              <tbody>
                {data.topSources.map(({ source, count }) => (
                  <tr key={source}>
                    <td>{source}</td>
                    <td>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="os-section">
        <h2>Najnoviji leadovi</h2>
        <LeadTable rows={data.latest} />
      </section>
    </>
  );
}
