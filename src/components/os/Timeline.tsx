import type { MessageRow } from "@/lib/messages/store";
import { formatDateTime } from "./leadUi";

/**
 * One list for everything that happened: sent mail, status moves, notes.
 *
 * Two separate boxes ("aktivnosti" and "poruke") make the operator reconstruct
 * the order in their head. Merged and sorted, the column reads like a story of
 * the deal.
 */

export type ActivityRow = {
  id: string;
  type: string;
  body: string | null;
  createdAt: string;
};

const ACTIVITY_LABEL: Record<string, string> = {
  form_submission: "Stigao upit",
  lead_created: "Stigao upit",
  status_change: "Promena faze",
  note: "Beleška",
  email: "Mejl",
  quote_sent: "Ponuda poslata",
};

type Entry = {
  key: string;
  at: string;
  label: string;
  tone: "default" | "ok" | "bad";
  summary: string;
  detail: string | null;
};

function toEntries(messages: MessageRow[], activities: ActivityRow[]): Entry[] {
  const fromMessages: Entry[] = messages.map((message) => ({
    key: `m-${message.id}`,
    at: message.createdAt,
    label: message.direction === "in" ? "Odgovor klijenta" : "Mejl poslat",
    tone: message.status === "sent" ? "ok" : "bad",
    summary:
      message.status === "sent"
        ? `${message.subject ?? "(bez naslova)"} → ${message.toEmail ?? "—"}`
        : `NIJE POSLATO: ${message.subject ?? "(bez naslova)"}${
            message.error ? ` — ${message.error}` : ""
          }`,
    detail: message.body,
  }));

  // A logged mail already tells the story; its activity twin would double it.
  const fromActivities: Entry[] = activities
    .filter((activity) => activity.type !== "email")
    .map((activity) => ({
      key: `a-${activity.id}`,
      at: activity.createdAt,
      label: ACTIVITY_LABEL[activity.type] ?? activity.type,
      tone: "default" as const,
      summary: activity.body ?? "—",
      detail: null,
    }));

  return [...fromMessages, ...fromActivities].sort((a, b) => (a.at < b.at ? 1 : -1));
}

export function Timeline({
  messages,
  activities,
}: {
  messages: MessageRow[];
  activities: ActivityRow[];
}) {
  const entries = toEntries(messages, activities);
  if (entries.length === 0) {
    return <p className="os-empty">Još nema prepiske ni aktivnosti.</p>;
  }

  return (
    <ol className="os-timeline">
      {entries.map((entry) => (
        <li key={entry.key} className={`os-timeline__item is-${entry.tone}`}>
          <div className="os-timeline__meta">
            <span className="os-timeline__label">{entry.label}</span>
            <time>{formatDateTime(entry.at)}</time>
          </div>
          <div className="os-timeline__summary">{entry.summary}</div>
          {entry.detail ? (
            <details className="os-timeline__detail">
              <summary>Prikaži tekst</summary>
              <pre>{entry.detail}</pre>
            </details>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
