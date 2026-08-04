import Link from "next/link";
import type { LeadListRow } from "@/lib/crm/queries";
import type { LeadStatus } from "@/lib/crm/types";

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
    status === "won" ? " os-badge--won" : status === "lost" ? " os-badge--lost" : "";
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

export function LeadTable({ rows }: { rows: LeadListRow[] }) {
  if (rows.length === 0) {
    return <p className="os-empty">Još nema leadova.</p>;
  }

  return (
    <div className="os-tablewrap">
      <table className="os-table">
        <thead>
          <tr>
            <th>Stiglo</th>
            <th>Ime</th>
            <th>Firma</th>
            <th>Usluga</th>
            <th>Tržište</th>
            <th>Izvor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{formatDateTime(row.createdAt)}</td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
