import "server-only";
import { AI_SOURCE_HOSTS, aiSourceEngine } from "@/lib/analytics/aiReferrers";

import { getSql } from "@/lib/db";
import { crawlerEngine, crawlerKind } from "@/lib/analytics/crawlers";

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
  /**
   * Visits that arrived from an AI assistant, split from everything else.
   *
   * This is the half of "are we showing up in AI" that involves a person: the
   * assistant named us, they clicked, they are on the site. The crawler log
   * carries the other half.
   */
  ai: { sessions: number; submits: number; byEngine: { engine: string; sessions: number }[] };
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

  // Sessions whose source is an assistant. Counted over the full window rather
  // than off the `sources` rows above, which are capped at fifteen and would
  // silently drop an engine the moment the tail grows.
  const aiRows = (await sql`
    select
      coalesce(nullif(utm_source, ''), nullif(referrer_host, '')) as source,
      count(distinct session_id)::int as sessions,
      count(distinct session_id) filter (where name = 'form_submitted')::int as submits
    from site_events
    where created_at > now() - make_interval(days => ${days})
      and coalesce(nullif(utm_source, ''), nullif(referrer_host, '')) is not null
    group by 1
  `) as { source: string; sessions: number; submits: number }[];

  const aiByEngine = new Map<string, number>();
  let aiSessions = 0;
  let aiSubmits = 0;
  for (const row of aiRows) {
    const engine = aiSourceEngine(row.source);
    if (!engine) continue;
    aiSessions += row.sessions;
    aiSubmits += row.submits;
    aiByEngine.set(engine, (aiByEngine.get(engine) ?? 0) + row.sessions);
  }

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
    ai: {
      sessions: aiSessions,
      submits: aiSubmits,
      byEngine: Array.from(aiByEngine, ([engine, sessions]) => ({ engine, sessions })).sort(
        (a, b) => b.sessions - a.sessions,
      ),
    },
  };
}


export type CrawlerBotRow = { bot: string; engine: string; hits: number; paths: number; lastSeen: string };
export type CrawlerPathRow = { path: string; hits: number; bots: number };

export type CrawlerOverview = {
  days: number;
  hits: number;
  bots: number;
  /** True once anything has ever been recorded — separates "no bots" from "not wired up". */
  everRecorded: boolean;
  /** Whether the log drain is delivering, or we are only seeing /llms.txt and /robots.txt. */
  drainHits: number;
  byBot: CrawlerBotRow[];
  byPath: CrawlerPathRow[];
  /** Crawlers that got a non-2xx. Invisible in every other dashboard we have. */
  errors: { path: string; bot: string; status: number; hits: number }[];
  /**
   * Fetches made while a person was mid-conversation — ChatGPT-User,
   * Claude-User, Perplexity-User. The nearest thing to "we came up in
   * someone's answer". Everything else in `byBot` is indexing.
   */
  live: { hits: number; paths: number; byBot: CrawlerBotRow[]; lastSeen: string | null };
};

/**
 * Which AI engines read the site, and what they read.
 *
 * This is the feedback loop on the schema work. A page that no engine has ever
 * fetched cannot be recommended by one, however good its markup is — and that
 * distinction is not visible in Vercel Analytics, which is a browser script no
 * crawler ever executes.
 */
export async function getCrawlerOverview(days = 30): Promise<CrawlerOverview> {
  const sql = getSql();

  const byBot = (await sql`
    select
      bot,
      count(*)::int as hits,
      count(distinct path)::int as paths,
      max(created_at) as last_seen
    from crawler_hits
    where created_at > now() - make_interval(days => ${days})
    group by bot
    order by hits desc
  `) as { bot: string; hits: number; paths: number; last_seen: string }[];

  const byPath = (await sql`
    select path, count(*)::int as hits, count(distinct bot)::int as bots
    from crawler_hits
    where created_at > now() - make_interval(days => ${days})
    group by path
    order by hits desc
    limit 25
  `) as { path: string; hits: number; bots: number }[];

  const errors = (await sql`
    select path, bot, status, count(*)::int as hits
    from crawler_hits
    where created_at > now() - make_interval(days => ${days})
      and status is not null and status >= 400
    group by path, bot, status
    order by hits desc
    limit 10
  `) as { path: string; bot: string; status: number; hits: number }[];

  const totals = (await sql`
    select
      count(*)::int as hits,
      count(*) filter (where source = 'drain')::int as drain_hits,
      (select count(*)::int from crawler_hits) as ever
    from crawler_hits
    where created_at > now() - make_interval(days => ${days})
  `) as { hits: number; drain_hits: number; ever: number }[];

  // Split in JS rather than in SQL: which agents count as a live fetch is a
  // property of the crawler registry, and duplicating that list into a query
  // is how the two drift apart.
  const liveRows = byBot
    .filter((row) => crawlerKind(row.bot) === "live")
    .map((row) => ({
      bot: row.bot,
      engine: crawlerEngine(row.bot),
      hits: Number(row.hits),
      paths: Number(row.paths),
      lastSeen: String(row.last_seen),
    }));

  return {
    days,
    hits: Number(totals[0]?.hits ?? 0),
    bots: byBot.length,
    everRecorded: Number(totals[0]?.ever ?? 0) > 0,
    drainHits: Number(totals[0]?.drain_hits ?? 0),
    byBot: byBot.map((row) => ({
      bot: row.bot,
      engine: crawlerEngine(row.bot),
      hits: Number(row.hits),
      paths: Number(row.paths),
      lastSeen: String(row.last_seen),
    })),
    byPath: byPath.map((row) => ({
      path: row.path,
      hits: Number(row.hits),
      bots: Number(row.bots),
    })),
    errors: errors.map((row) => ({
      path: row.path,
      bot: row.bot,
      status: Number(row.status),
      hits: Number(row.hits),
    })),
    live: {
      hits: liveRows.reduce((sum, row) => sum + row.hits, 0),
      paths: liveRows.reduce((sum, row) => Math.max(sum, row.paths), 0),
      byBot: liveRows,
      lastSeen: liveRows.length > 0 ? liveRows.map((r) => r.lastSeen).sort().reverse()[0] : null,
    },
  };
}
