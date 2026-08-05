import "server-only";

import { getSql } from "@/lib/db";

/**
 * "Šta danas mora da se uradi", computed instead of eyeballed.
 *
 * The dashboard used to show four counters and a table; deciding what to touch
 * first was still the operator's job every morning. This is the one query that
 * answers it: unanswered briefs, cold leads, reminders that came due, and
 * invoices past their date — sorted by how long they have been waiting.
 */

export type WorkKind = "upit" | "lead" | "podsetnik" | "faktura";

export type WorkItem = {
  kind: WorkKind;
  id: string;
  href: string;
  title: string;
  subtitle: string;
  /** Days since the thing started waiting. Drives the sort and the red flag. */
  waitingDays: number;
};

export type OsCounters = {
  newLeads: number;
  waitingInquiries: number;
  dueFollowUps: number;
  overdueInvoices: number;
};

type RawItem = {
  kind: WorkKind;
  /** Which detail screen the row opens. Chosen in SQL — a reminder can belong
   *  to either an upit or a lead, and the kind alone cannot tell them apart. */
  target: "upiti" | "leads" | "fakture";
  id: string;
  title: string;
  subtitle: string | null;
  waiting_days: string;
};

/**
 * One round trip for the whole list: four small selects unioned, because the
 * Neon HTTP driver charges a network hop per statement and this runs on every
 * dashboard load.
 */
export async function getWorkQueue(limit = 12): Promise<WorkItem[]> {
  const sql = getSql();

  const rows = (await sql`
    (
      select 'upit'::text as kind, 'upiti'::text as target, i.id::text as id,
             i.reference || ' · ' || i.business_name as title,
             'Brief čeka ponudu' as subtitle,
             extract(day from now() - i.created_at)::int as waiting_days
      from inquiries i
      where i.status = 'submitted'
    )
    union all
    (
      select 'lead', 'leads', l.id::text,
             coalesce(ct.full_name, 'Bez imena') || coalesce(' · ' || co.name, ''),
             'Lead bez odgovora',
             extract(day from now() - l.created_at)::int
      from leads l
      left join contacts ct on ct.id = l.contact_id
      left join companies co on co.id = l.company_id
      where l.status = 'new'
        and not exists (
          select 1 from inquiries i
          where i.lead_id = l.id and i.status = 'submitted'
        )
    )
    union all
    (
      select 'podsetnik', 'upiti', i.id::text,
             i.reference || ' · ' || i.business_name,
             'Podsetnik: javi se',
             (now()::date - i.follow_up_on)
      from inquiries i
      where i.follow_up_on is not null and i.follow_up_on <= now()::date
        and i.status in ('submitted', 'quoted')
    )
    union all
    (
      select 'podsetnik', 'leads', l.id::text,
             coalesce(ct.full_name, 'Bez imena'),
             'Podsetnik: javi se',
             (now()::date - l.follow_up_on)
      from leads l
      left join contacts ct on ct.id = l.contact_id
      where l.follow_up_on is not null and l.follow_up_on <= now()::date
        and l.status not in ('won', 'lost')
    )
    union all
    (
      select 'faktura', 'fakture', inv.id::text,
             inv.number || ' · ' || coalesce(c.company_name, inv.buyer->>'companyName', '—'),
             'Faktura van roka',
             (now()::date - inv.due_date)
      from invoices inv
      left join clients c on c.id = inv.client_id
      where inv.status = 'issued' and inv.kind = 'invoice' and inv.due_date < current_date
    )
    order by waiting_days desc
    limit ${limit}
  `) as RawItem[];

  return rows.map((row) => ({
    kind: row.kind,
    id: row.id,
    href: `/os/${row.target}/${row.id}`,
    title: row.title,
    subtitle: row.subtitle ?? "",
    waitingDays: Number(row.waiting_days ?? 0),
  }));
}

/** Sidebar badges. Cheap enough to run on every `/os` page render. */
export async function getOsCounters(): Promise<OsCounters> {
  const sql = getSql();
  const rows = (await sql`
    select
      (select count(*) from leads where status = 'new')::int as new_leads,
      (select count(*) from inquiries where status = 'submitted')::int as waiting_inquiries,
      (
        (select count(*) from inquiries
          where follow_up_on is not null and follow_up_on <= now()::date
            and status in ('submitted', 'quoted'))
        +
        (select count(*) from leads
          where follow_up_on is not null and follow_up_on <= now()::date
            and status not in ('won', 'lost'))
      )::int as due_follow_ups,
      (select count(*) from invoices
        where status = 'issued' and kind = 'invoice' and due_date < current_date)::int
        as overdue_invoices
  `) as {
    new_leads: number;
    waiting_inquiries: number;
    due_follow_ups: number;
    overdue_invoices: number;
  }[];

  const row = rows[0];
  return {
    newLeads: Number(row?.new_leads ?? 0),
    waitingInquiries: Number(row?.waiting_inquiries ?? 0),
    dueFollowUps: Number(row?.due_follow_ups ?? 0),
    overdueInvoices: Number(row?.overdue_invoices ?? 0),
  };
}
