import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatDateTime,
  MARKET_LABELS,
  SERVICE_LABELS,
  StatusBadge,
  STATUS_LABELS,
} from "@/components/os/leadUi";
import { addLeadNote, updateLeadStatus } from "@/lib/crm/actions";
import { getLeadDetail } from "@/lib/crm/queries";
import { LEAD_STATUSES } from "@/lib/crm/types";

export const dynamic = "force-dynamic";

export default async function OsLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLeadDetail(id);
  if (!lead) notFound();

  return (
    <>
      <p className="os-sub">
        <Link href="/os/leads">← Svi leadovi</Link>
      </p>
      <h1 className="os-h1">
        {lead.fullName} <StatusBadge status={lead.status} />
      </h1>
      <p className="os-sub">
        {lead.company ?? "bez firme"} · stiglo {formatDateTime(lead.createdAt)}
      </p>

      <section className="os-section">
        <h2>Sledeći korak</h2>
        <form action={updateLeadStatus} className="os-stageform">
          <input type="hidden" name="leadId" value={lead.id} />
          <select name="status" defaultValue={lead.status} aria-label="Faza">
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <button className="os-btn" type="submit">
            Sačuvaj fazu
          </button>
        </form>
      </section>

      <section className="os-section">
        <h2>Poruka</h2>
        <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{lead.message}</p>
      </section>

      <section className="os-section">
        <h2>Podaci</h2>
        <dl className="os-kv">
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${lead.email}`}>{lead.email}</a>
          </dd>
          <dt>Telefon</dt>
          <dd>{lead.phone ? <a href={`tel:${lead.phone}`}>{lead.phone}</a> : "—"}</dd>
          <dt>Usluga</dt>
          <dd>{SERVICE_LABELS[lead.service] ?? lead.service}</dd>
          <dt>Tržište</dt>
          <dd>{MARKET_LABELS[lead.market] ?? lead.market}</dd>
          <dt>Budžet</dt>
          <dd>{lead.budgetRange ?? "—"}</dd>
          <dt>Rok</dt>
          <dd>{lead.timeline ?? "—"}</dd>
        </dl>
      </section>

      <section className="os-section">
        <h2>Odakle je došao</h2>
        <dl className="os-kv">
          <dt>Stranica</dt>
          <dd>{lead.landingPage ?? "—"}</dd>
          <dt>Referrer</dt>
          <dd>{lead.referrer ?? "—"}</dd>
          <dt>UTM source</dt>
          <dd>{lead.source ?? "—"}</dd>
          <dt>UTM medium</dt>
          <dd>{lead.utmMedium ?? "—"}</dd>
          <dt>UTM campaign</dt>
          <dd>{lead.utmCampaign ?? "—"}</dd>
          <dt>Request ID</dt>
          <dd>
            <code>{lead.requestId}</code>
          </dd>
        </dl>
      </section>

      <section className="os-section">
        <h2>Beleške i istorija</h2>
        <form action={addLeadNote} className="os-stageform" style={{ marginBottom: 16 }}>
          <input type="hidden" name="leadId" value={lead.id} />
          <input
            name="body"
            placeholder="Kratka beleška…"
            aria-label="Beleška"
            style={{
              flex: "1 1 260px",
              font: "inherit",
              padding: "9px 12px",
              border: "1px solid var(--os-line)",
              borderRadius: 8,
            }}
          />
          <button className="os-btn os-btn--ghost" type="submit">
            Dodaj
          </button>
        </form>

        {lead.activities.length === 0 ? (
          <p className="os-empty">Nema aktivnosti.</p>
        ) : (
          <div className="os-tablewrap">
            <table className="os-table">
              <thead>
                <tr>
                  <th>Kada</th>
                  <th>Tip</th>
                  <th>Opis</th>
                </tr>
              </thead>
              <tbody>
                {lead.activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>{formatDateTime(activity.createdAt)}</td>
                    <td>{activity.type}</td>
                    <td>{activity.body ?? "—"}</td>
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
