import "server-only";

import { getSql } from "@/lib/db";
import { LEAD_STATUSES, type LeadStatus } from "./types";

export type LeadListRow = {
  id: string;
  createdAt: string;
  status: LeadStatus;
  market: string;
  service: string;
  fullName: string;
  email: string;
  phone: string | null;
  company: string | null;
  source: string | null;
  landingPage: string | null;
  followUpOn: string | null;
};

export type DashboardData = {
  newToday: number;
  newThisWeek: number;
  untouched: number;
  open: number;
  byStage: { status: LeadStatus; count: number }[];
  topSources: { source: string; count: number }[];
  latest: LeadListRow[];
};

type RawLead = {
  id: string;
  created_at: string;
  status: LeadStatus;
  market: string;
  service: string;
  utm_source: string | null;
  referrer: string | null;
  landing_page: string | null;
  follow_up_on: string | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  company_name: string | null;
};

const LEAD_SELECT = `
  select l.id, l.created_at::text, l.status, l.market, l.service, l.utm_source,
         l.referrer, l.landing_page, l.follow_up_on::text,
         ct.full_name, ct.email, ct.phone, co.name as company_name
  from leads l
  left join contacts ct on ct.id = l.contact_id
  left join companies co on co.id = l.company_id
`;

function toRow(raw: RawLead): LeadListRow {
  return {
    id: raw.id,
    createdAt: raw.created_at,
    status: raw.status,
    market: raw.market,
    service: raw.service,
    fullName: raw.full_name ?? "—",
    email: raw.email ?? "—",
    phone: raw.phone ?? null,
    company: raw.company_name,
    source: raw.utm_source ?? (raw.referrer ? "referral" : "direct"),
    landingPage: raw.landing_page,
    followUpOn: raw.follow_up_on,
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  const sql = getSql();

  const [rawCounts, rawStages, rawLatest] = await Promise.all([
    sql`
      select
        count(*) filter (where created_at >= date_trunc('day', now())) as new_today,
        count(*) filter (where created_at >= now() - interval '7 days') as new_week,
        count(*) filter (where status = 'new') as untouched,
        count(*) filter (where status not in ('won', 'lost')) as open
      from leads
    `,
    sql`select status, count(*) as count from leads group by status`,
    sql.query(`${LEAD_SELECT} order by l.created_at desc limit 10`),
  ]);

  const counts = rawCounts as Record<string, string>[];
  const stages = rawStages as { status: LeadStatus; count: string }[];
  const latest = rawLatest as RawLead[];

  const stageCounts = new Map<LeadStatus, number>(LEAD_STATUSES.map((s) => [s, 0]));
  for (const row of stages) stageCounts.set(row.status, Number(row.count));

  const rows = latest.map(toRow);
  const sourceCounts = new Map<string, number>();
  for (const row of rows) {
    const key = row.source ?? "direct";
    sourceCounts.set(key, (sourceCounts.get(key) ?? 0) + 1);
  }

  const c = counts[0] ?? {};
  return {
    newToday: Number(c.new_today ?? 0),
    newThisWeek: Number(c.new_week ?? 0),
    untouched: Number(c.untouched ?? 0),
    open: Number(c.open ?? 0),
    byStage: LEAD_STATUSES.map((status) => ({ status, count: stageCounts.get(status) ?? 0 })),
    topSources: Array.from(sourceCounts.entries())
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    latest: rows,
  };
}

export async function listLeads(
  options: { status?: LeadStatus; query?: string; limit?: number } = {},
): Promise<LeadListRow[]> {
  const sql = getSql();
  const limit = options.limit ?? 100;

  // Built by hand because the filters are optional and the driver has no
  // query builder. Values stay parameterised — never interpolated.
  const where: string[] = [];
  const values: (string | number)[] = [];

  if (options.status) {
    values.push(options.status);
    where.push(`l.status = $${values.length}`);
  }
  const search = options.query?.trim();
  if (search) {
    values.push(`%${search.toLowerCase()}%`);
    const p = `$${values.length}`;
    where.push(
      `(lower(ct.full_name) like ${p} or lower(ct.email) like ${p}
        or lower(coalesce(co.name, '')) like ${p} or lower(l.message) like ${p})`,
    );
  }

  values.push(limit);
  const rows = (await sql.query(
    `${LEAD_SELECT}
     ${where.length ? `where ${where.join(" and ")}` : ""}
     order by l.created_at desc limit $${values.length}`,
    values,
  )) as RawLead[];
  return rows.map(toRow);
}

export type LeadDetail = LeadListRow & {
  message: string;
  budgetRange: string | null;
  timeline: string | null;
  referrer: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  requestId: string;
  /** The brief this lead came from, when it came through `/upit`. */
  inquiry: { id: string; reference: string } | null;
  activities: { id: string; type: string; body: string | null; createdAt: string }[];
};

export async function getLeadDetail(id: string): Promise<LeadDetail | null> {
  const sql = getSql();
  const rows = (await sql`
    select l.id, l.created_at::text, l.status, l.market, l.service, l.utm_source,
           l.referrer, l.landing_page, l.message, l.budget_range, l.timeline,
           l.utm_medium, l.utm_campaign, l.request_id, l.follow_up_on::text,
           ct.full_name, ct.email, ct.phone, co.name as company_name
    from leads l
    left join contacts ct on ct.id = l.contact_id
    left join companies co on co.id = l.company_id
    where l.id = ${id}
  `) as (RawLead & {
    message: string;
    budget_range: string | null;
    timeline: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    request_id: string;
  })[];

  const raw = rows[0];
  if (!raw) return null;

  const [rawActivities, rawInquiries] = await Promise.all([
    sql`
      select id, type, body, created_at::text from activities
      where lead_id = ${id} order by created_at desc limit 50
    `,
    sql`select id, reference from inquiries where lead_id = ${id} limit 1`,
  ]);

  const activities = rawActivities as {
    id: string;
    type: string;
    body: string | null;
    created_at: string;
  }[];
  const inquiries = rawInquiries as { id: string; reference: string }[];

  return {
    ...toRow(raw),
    message: raw.message,
    budgetRange: raw.budget_range,
    inquiry: inquiries[0] ?? null,
    timeline: raw.timeline,
    referrer: raw.referrer,
    utmMedium: raw.utm_medium,
    utmCampaign: raw.utm_campaign,
    requestId: raw.request_id,
    activities: activities.map((a) => ({
      id: a.id,
      type: a.type,
      body: a.body,
      createdAt: a.created_at,
    })),
  };
}
