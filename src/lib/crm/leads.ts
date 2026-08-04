import "server-only";

import { getSql } from "@/lib/db";
import type { LeadSubmission } from "./validation";

export type LeadIntakeResult = {
  leadId: string;
  created: boolean;
};

/**
 * Stores one website submission: company, contact, lead and its first activity.
 *
 * IDEMPOTENT on `requestId` — a retried submit returns the existing lead
 * instead of a duplicate. The guard is the unique index on leads.request_id,
 * not the lookup below: the lookup avoids the work, the index makes the
 * guarantee.
 *
 * The steps are separate statements because Neon's HTTP driver cannot feed one
 * statement's result into the next inside a transaction. The cost of that is a
 * contact row without a lead if the last insert fails — a stray contact, not a
 * lost or duplicated lead.
 */
export async function createLeadIntake(submission: LeadSubmission): Promise<LeadIntakeResult> {
  const sql = getSql();
  const attribution = submission.attribution ?? {};

  const existing = (await sql`
    select id from leads where request_id = ${submission.requestId}
  `) as { id: string }[];
  if (existing[0]) return { leadId: existing[0].id, created: false };

  let companyId: string | null = null;
  if (submission.company?.trim()) {
    const rows = (await sql`
      insert into companies (name) values (${submission.company.trim()}) returning id
    `) as { id: string }[];
    companyId = rows[0].id;
  }

  const email = submission.email.trim().toLowerCase();
  const contact = (await sql`
    insert into contacts (company_id, full_name, email, phone)
    values (${companyId}, ${submission.fullName}, ${email}, ${submission.phone ?? null})
    on conflict (lower(email)) do update
      set full_name = excluded.full_name,
          phone = coalesce(excluded.phone, contacts.phone),
          company_id = coalesce(contacts.company_id, excluded.company_id),
          updated_at = now()
    returning id
  `) as { id: string }[];

  const lead = (await sql`
    insert into leads (
      contact_id, company_id, market, service, message, budget_range, timeline,
      landing_page, referrer, utm_source, utm_medium, utm_campaign, utm_content,
      utm_term, first_touch, last_touch, consent_at, request_id
    ) values (
      ${contact[0].id}, ${companyId}, ${submission.market}, ${submission.service},
      ${submission.message}, ${submission.budgetRange ?? null}, ${submission.timeline ?? null},
      ${attribution.landingPage ?? null}, ${attribution.referrer ?? null},
      ${attribution.utmSource ?? null}, ${attribution.utmMedium ?? null},
      ${attribution.utmCampaign ?? null}, ${attribution.utmContent ?? null},
      ${attribution.utmTerm ?? null}, ${JSON.stringify(attribution)}::jsonb,
      ${JSON.stringify(attribution)}::jsonb, now(), ${submission.requestId}
    )
    on conflict (request_id) do nothing
    returning id
  `) as { id: string }[];

  if (!lead[0]) {
    // Lost a race with a concurrent retry: the winner's row is the one that counts.
    const winner = (await sql`
      select id from leads where request_id = ${submission.requestId}
    `) as { id: string }[];
    if (!winner[0]) throw new Error("Lead intake nije upisan.");
    return { leadId: winner[0].id, created: false };
  }

  await sql`
    insert into activities (lead_id, type, body, metadata)
    values (${lead[0].id}, 'form_submission', 'Upit sa sajta', ${JSON.stringify(submission)}::jsonb)
  `;

  return { leadId: lead[0].id, created: true };
}
