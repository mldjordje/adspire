import Link from "next/link";
import { LeadTable, STATUS_LABELS } from "@/components/os/leadUi";
import { getDashboardData } from "@/lib/crm/queries";
import { getBillingSummary } from "@/lib/invoices/queries";
import { getInquirySummary } from "@/lib/inquiries/store";
import { getWorkQueue, type WorkItem } from "@/lib/os/workqueue";
import { money } from "@/components/os/billingUi";

export const dynamic = "force-dynamic";

const KIND_LABEL: Record<WorkItem["kind"], string> = {
  upit: "Upit",
  lead: "Lead",
  podsetnik: "Podsetnik",
  faktura: "Faktura",
};

const waitLabel = (days: number) =>
  days <= 0 ? "danas" : days === 1 ? "1 dan" : `${days} dana`;

/** Serbian plural: 1 stavka, 2–4 stavke, 5+ stavki (and 11–14 take "stavki"). */
const itemsLabel = (count: number) => {
  const last = count % 10;
  const teens = count % 100;
  if (last === 1 && teens !== 11) return `${count} stavka`;
  if (last >= 2 && last <= 4 && (teens < 12 || teens > 14)) return `${count} stavke`;
  return `${count} stavki`;
};

export default async function OsDashboardPage() {
  const [data, billing, inquiries, queue] = await Promise.all([
    getDashboardData(),
    getBillingSummary(),
    getInquirySummary(),
    getWorkQueue(),
  ]);
  const stageMax = Math.max(1, ...data.byStage.map((s) => s.count));

  return (
    <>
      <header className="os-head">
        <div>
          <h1 className="os-h1">Pregled</h1>
          <p className="os-sub">Šta danas mora da se uradi.</p>
        </div>
        <div className="os-actions">
          <Link className="os-btn os-btn--sm" href="/os/upiti">
            Upiti
          </Link>
          <Link className="os-btn os-btn--ghost os-btn--sm" href="/os/fakture/nova">
            Nova faktura
          </Link>
        </div>
      </header>

      <section className="os-section os-section--focus">
        <h2>
          Red čekanja{" "}
          <span className="os-note">{queue.length ? itemsLabel(queue.length) : "prazno"}</span>
        </h2>
        {queue.length === 0 ? (
          <p className="os-empty">Ništa ne čeka odgovor. Retko, ali lepo.</p>
        ) : (
          <ul className="os-queue">
            {queue.map((item) => (
              <li key={`${item.kind}-${item.id}`} className={item.waitingDays >= 2 ? "is-late" : ""}>
                <Link href={item.href}>
                  <span className={`os-badge os-badge--${item.kind}`}>{KIND_LABEL[item.kind]}</span>
                  <span className="os-queue__title">{item.title}</span>
                  <span className="os-queue__sub">{item.subtitle}</span>
                  <span className="os-queue__age">{waitLabel(item.waitingDays)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="os-cards">
        <Link className={`os-card${inquiries.waiting > 0 ? " os-card--alert" : ""}`} href="/os/upiti?status=submitted">
          <div className="os-card__label">Upiti bez ponude</div>
          <div className="os-card__value">{inquiries.waiting}</div>
        </Link>
        <Link className={`os-card${data.untouched > 0 ? " os-card--alert" : ""}`} href="/os/leads?status=new">
          <div className="os-card__label">Leadovi bez odgovora</div>
          <div className="os-card__value">{data.untouched}</div>
        </Link>
        <Link className="os-card" href="/os/upiti?status=quoted">
          <div className="os-card__label">Ponuda na čekanju</div>
          <div className="os-card__value">{inquiries.quoted}</div>
        </Link>
        <Link className="os-card" href="/os/pipeline">
          <div className="os-card__label">Otvoreno u pipeline-u</div>
          <div className="os-card__value">{data.open}</div>
        </Link>
      </div>

      <section className="os-section">
        <h2>
          Novac <Link href="/os/fakture">→ fakture</Link>
        </h2>
        <div className="os-cards os-cards--tight">
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

      <div className="os-grid2">
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
          <h2>Izvori (poslednjih 10 leadova)</h2>
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
      </div>

      <section className="os-section">
        <h2>
          Najnoviji leadovi <Link href="/os/leads">→ svi</Link>
        </h2>
        <LeadTable rows={data.latest} />
      </section>
    </>
  );
}
