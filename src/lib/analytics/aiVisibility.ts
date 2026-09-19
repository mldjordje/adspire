import "server-only";
import { getSql } from "@/lib/db";
import { aiSourceName } from "./aiVisibilitySource";

export type AiVisibilityRow = { source: string; sessions: number; submits: number };
type SourceCounts = { utm_source: string | null; referrer_host: string | null; sessions: number; submits: number };

export function groupAiSources(rows: SourceCounts[]): AiVisibilityRow[] {
  const groups = new Map<string, AiVisibilityRow>();
  for (const row of rows) {
    const source = aiSourceName(row.utm_source, row.referrer_host);
    if (!source) continue;
    const group = groups.get(source) ?? { source, sessions: 0, submits: 0 };
    group.sessions += Number(row.sessions);
    group.submits += Number(row.submits);
    groups.set(source, group);
  }
  return Array.from(groups.values()).sort((a, b) => b.sessions - a.sessions);
}

export async function getAiVisibility(days: number): Promise<AiVisibilityRow[]> {
  const sql = getSql();
  // One row per session before grouping: form/page events cannot inflate visits.
  // No top-source limit: small AI sources must not disappear behind larger channels.
  const rows = await sql`
    with sessions as (
      select session_id,
        (array_agg(utm_source order by created_at, id)
          filter (where nullif(utm_source, '') is not null))[1] as utm_source,
        (array_agg(referrer_host order by created_at, id)
          filter (where nullif(referrer_host, '') is not null))[1] as referrer_host,
        bool_or(name = 'form_submitted') as submitted
      from site_events
      where created_at > now() - make_interval(days => ${days})
      group by session_id
    )
    select utm_source, referrer_host, count(*)::int as sessions,
      count(*) filter (where submitted)::int as submits
    from sessions
    group by utm_source, referrer_host
  ` as SourceCounts[];
  return groupAiSources(rows);
}
