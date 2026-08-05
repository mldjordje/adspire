import Link from "next/link";
import type { LeadListRow } from "@/lib/crm/queries";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/crm/types";
import { updateLeadStatus } from "@/lib/crm/actions";

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Novi",
  contacted: "Kontaktiran",
  qualified: "Kvalifikovan",
  meeting_booked: "Poziv zakazan",
  proposal_sent: "Ponuda poslata",
  negotiation: "Pregovori",
  won: "Dobijen",
  lost: "Izgubljen",
};

export const SERVICE_LABELS: Record<string, string> = {
  booking: "Zakazivanje",
  "web-platform": "Web platforma",
  ecommerce: "Web shop",
  automation: "Automatizacija / AI",
  mobile: "Mobilna app",
  "white-label": "White-label",
  other: "Drugo",
};

export const MARKET_LABELS: Record<string, string> = {
  rs: "RS",
  dach: "DACH",
  "white-label": "Agencija",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const modifier =
    status === "won"
      ? " os-badge--won"
      : status === "lost"
        ? " os-badge--lost"
        : status === "new"
          ? " os-badge--new"
          : "";
  return <span className={`os-badge${modifier}`}>{STATUS_LABELS[status]}</span>;
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("sr-RS", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

/** "danas" / "pre 3 dana" — how long someone has been waiting reads faster
 *  than a timestamp, and waiting is the thing that costs deals. */
export function since(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "danas";
  if (days === 1) return "juče";
  if (days < 7) return `pre ${days} dana`;
  if (days < 30) return `pre ${Math.floor(days / 7)} ned.`;
  return `pre ${Math.floor(days / 30)} mes.`;
}

/** Serbian plural for counted nouns: 1 lead, 2–4 leada, 5+ leadova. */
export function plural(count: number, one: string, few: string, many: string): string {
  const last = count % 10;
  const teens = count % 100;
  if (last === 1 && teens !== 11) return `${count} ${one}`;
  if (last >= 2 && last <= 4 && (teens < 12 || teens > 14)) return `${count} ${few}`;
  return `${count} ${many}`;
}

export function ageDays(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
}

/** One-click stage moves. The select stays for the rare jump; these cover the
 *  three moves that happen every day. */
export function LeadStatusPills({
  leadId,
  current,
}: {
  leadId: string;
  current: LeadStatus;
}) {
  const quick: LeadStatus[] = ["contacted", "meeting_booked", "proposal_sent", "won", "lost"];
  return (
    <div className="os-chips">
      {quick
        .filter((status) => status !== current)
        .map((status) => (
          <form key={status} action={updateLeadStatus}>
            <input type="hidden" name="leadId" value={leadId} />
            <input type="hidden" name="status" value={status} />
            <button className="os-chip" type="submit">
              → {STATUS_LABELS[status]}
            </button>
          </form>
        ))}
    </div>
  );
}

export function LeadStatusSelect({
  leadId,
  current,
}: {
  leadId: string;
  current: LeadStatus;
}) {
  return (
    <form action={updateLeadStatus} className="os-inline">
      <input type="hidden" name="leadId" value={leadId} />
      <select name="status" defaultValue={current} aria-label="Faza">
        {LEAD_STATUSES.map((status) => (
          <option key={status} value={status}>
            {STATUS_LABELS[status]}
          </option>
        ))}
      </select>
      <input name="note" placeholder="Zašto (opciono)" aria-label="Razlog promene" />
      <button className="os-btn os-btn--ghost os-btn--sm" type="submit">
        Sačuvaj fazu
      </button>
    </form>
  );
}

export function LeadTable({ rows }: { rows: LeadListRow[] }) {
  if (rows.length === 0) {
    return <p className="os-empty">Još nema leadova.</p>;
  }

  return (
    <div className="os-tablewrap">
      <table className="os-table">
        <thead>
          <tr>
            <th>Čeka</th>
            <th>Ko</th>
            <th>Firma</th>
            <th>Usluga</th>
            <th>Tržište</th>
            <th>Izvor</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const stale = row.status === "new" && ageDays(row.createdAt) >= 2;
            return (
              <tr key={row.id} className={stale ? "is-stale" : undefined}>
                <td title={formatDateTime(row.createdAt)}>
                  {since(row.createdAt)}
                  {stale ? <span className="os-dot" aria-label="bez odgovora" /> : null}
                </td>
                <td>
                  <Link href={`/os/leads/${row.id}`}>{row.fullName}</Link>
                  <div className="os-note">{row.email}</div>
                </td>
                <td>{row.company ?? "—"}</td>
                <td>{SERVICE_LABELS[row.service] ?? row.service}</td>
                <td>{MARKET_LABELS[row.market] ?? row.market}</td>
                <td>{row.source ?? "direct"}</td>
                <td>
                  <StatusBadge status={row.status} />
                  {row.followUpOn ? (
                    <div className="os-note">podsetnik {row.followUpOn}</div>
                  ) : null}
                </td>
                <td className="os-table__actions">
                  <Link className="os-btn os-btn--ghost os-btn--sm" href={`/os/leads/${row.id}`}>
                    Otvori
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
