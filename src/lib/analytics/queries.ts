import "server-only";

import { getSql } from "@/lib/db";

/**
 * Reads for /os/analitika.
 *
 * The screen answers one question — "where do visitors stop before they become
 * an upit" — so every query here is sessions-based, not hits-based. A page with
 * 400 views from 12 sessions is one bot; a page with 12 views from 12 sessions
 * that produced 3 briefs is the best page on the site.
 */

export type FunnelStep = { label: string; sessions: number };

export type PageRow = {
  path: string;
  sessions: number;
  starts: number;
  submits: number;
};

export type SourceRow = { source: string; sessions: number; submits: number };

export type CtaRow = { label: string; clicks: number; sessions: number };

export type AnalyticsOverview = {
  days: number;
  sessions: number;
  pageViews: number;
  formStarts: number;
  formSubmits: number;
  contactIntents: number;
  mobileShare: number;
  funnel: FunnelStep[];
  pages: PageRow[];
  sources: SourceRow[];
  ctas: CtaRow[];
  /** Leads actually stored in the same window — the reality check on the funnel. */
  leads: number;
};

function pct(part: number, whole: number) {
  return whole > 0 ? Math.round((part / whole) * 100) : 0;
}

export async function getAnalyticsOverview(days = 30): Promise<AnalyticsOverview> {
  const sql = getSql();

  // One round trip for the headline numbers: the Neon HTTP driver bills a hop
  // per statement, and this page loads four blocks at once.
  const totalsRows = (await sql`
    select
      count(distinct session_id)::int as sessions,
      count(*) filter (where name = 'page_view')::int as page_views,
      count(distinct session_id) filter (where name = 'form_started')::int as starts,
      count(distinct session_id) filter (where name = 'form_submitted')::int as submits,
      count(distinct session_id) filter (where name = 'contact_intent')::int as intents,
      count(distinct session_id) filter (where name = 'scroll_50')::int as engaged,
      count(distinct session_id) filter (where device = 'mobile')::int as mobile
    from site_events
    where created_at > now() - make_interval(days => ${days})
  `) as {
    sessions: number;
    page_views: number;
    starts: number;
    submits: number;
    intents: number;
    engaged: number;
    mobile: number;
  }[];

  const t = totalsRows[0];
  const sessions = Number(t?.sessions ?? 0);

  const pages = (await sql`
    select
      path,
      count(distinct session_id)::int as sessions,
      count(distinct session_id) filter (where name = 'form_started')::int as starts,
      count(distinct session_id) filter (where name = 'form_submitted')::int as submits
    from site_events
    where created_at > now() - make_interval(days => ${days})
      and path not like '/os%'
    group by path
    order by sessions desc
    limit 25
  `) as PageRow[];

  // `utm_source` when the visit was tagged, the referring host otherwise, and
  // 'direktno' when there is neither — the three buckets an owner can act on.
  const sources = (await sql`
    select
      coalesce(nullif(utm_source, ''), nullif(referrer_host, ''), 'direktno') as source,
      count(distinct session_id)::int as sessions,
      count(distinct session_id) filter (where name = 'form_submitted')::int as submits
    from site_events
    where created_at > now() - make_interval(days => ${days})
    group by 1
    order by sessions desc
    limit 15
  `) as SourceRow[];

  const ctas = (await sql`
    select label, count(*)::int as clicks, count(distinct session_id)::int as sessions
    from site_events
    where created_at > now() - make_interval(days => ${days})
      and name = 'cta_click' and label is not null
    group by label
    order by clicks desc
    limit 15
  `) as CtaRow[];

  const leadRows = (await sql`
    select count(*)::int as leads
    from leads
    where created_at > now() - make_interval(days => ${days})
  `) as { leads: number }[];

  return {
    days,
    sessions,
    pageViews: Number(t?.page_views ?? 0),
    formStarts: Number(t?.starts ?? 0),
    formSubmits: Number(t?.submits ?? 0),
    contactIntents: Number(t?.intents ?? 0),
    mobileShare: pct(Number(t?.mobile ?? 0), sessions),
    funnel: [
      { label: "Posete", sessions },
      { label: "Pročitali (50% strane)", sessions: Number(t?.engaged ?? 0) },
      { label: "Počeli formu", sessions: Number(t?.starts ?? 0) },
      { label: "Poslali upit", sessions: Number(t?.submits ?? 0) },
    ],
    pages: pages.map((row) => ({
      path: row.path,
      sessions: Number(row.sessions),
      starts: Number(row.starts),
      submits: Number(row.submits),
    })),
    sources: sources.map((row) => ({
      source: row.source,
      sessions: Number(row.sessions),
      submits: Number(row.submits),
    })),
    ctas: ctas.map((row) => ({
      label: row.label,
      clicks: Number(row.clicks),
      sessions: Number(row.sessions),
    })),
    leads: Number(leadRows[0]?.leads ?? 0),
  };
}
