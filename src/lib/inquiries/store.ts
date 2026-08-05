import "server-only";

import { randomBytes } from "node:crypto";

import { getSql } from "@/lib/db";
import { createLeadIntake } from "@/lib/crm/leads";
import { serviceTitles } from "./catalog";
import {
  isSerbia,
  TIMEFRAME_LABEL,
  type InquiryBrief,
  type InquiryStatus,
} from "./types";
import type { InquirySubmission } from "./validation";

/**
 * Writes and reads for upiti.
 *
 * Every upit also creates a lead, so `/os/leads` and the pipeline keep showing
 * the whole funnel — the inquiry row is the brief and its quote, not a second
 * place to look for who wrote in.
 *
 * The steps are separate statements because Neon's HTTP driver cannot feed one
 * statement's result into the next inside a transaction. The cost is a lead
 * without its inquiry if the last insert fails — a stray lead, never a lost or
 * duplicated brief, because `request_id` is unique on both tables.
 */

export type InquiryRow = {
  id: string;
  reference: string;
  access_token: string;
  lead_id: string | null;
  portal_user_id: string | null;
  services: string[];
  buyer_type: string;
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  pib: string | null;
  mb: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  business_name: string;
  business_description: string;
  brief: InquiryBrief;
  budget_eur: number | null;
  status: InquiryStatus;
  quoted_amount: number | null;
  currency: string;
  turnaround_days: number | null;
  quote_valid_until: string | null;
  quote_note: string | null;
  admin_note: string | null;
  quoted_at: string | null;
  responded_at: string | null;
  decline_reason: string | null;
  created_at: string;
};

const SELECT_COLUMNS = `
  id, reference, access_token, lead_id, portal_user_id, services, buyer_type,
  full_name, email, phone, company_name, pib, mb, address, city, country,
  business_name, business_description, brief, budget_eur::float8 as budget_eur,
  status, quoted_amount::float8 as quoted_amount, currency, turnaround_days,
  quote_valid_until::text as quote_valid_until, quote_note, admin_note,
  quoted_at, responded_at, decline_reason, created_at
`;

/** DACH is the second market the site sells into — see docs/plan-adspire-2026-h2.md.
 *  Everything else is filed under `rs`, which is where it is worked from. */
const DACH = ["nemačka", "germany", "deutschland", "austrija", "austria", "österreich", "švajcarska", "switzerland", "schweiz"];

function marketFor(country: string): string {
  const value = country.trim().toLowerCase();
  if (isSerbia(value)) return "rs";
  return DACH.includes(value) ? "dach" : "rs";
}

export type CreateInquiryResult = {
  id: string;
  reference: string;
  accessToken: string;
  leadId: string | null;
  created: boolean;
};

export async function createInquiry(
  submission: InquirySubmission,
  options: { portalUserId?: string | null } = {},
): Promise<CreateInquiryResult> {
  const sql = getSql();

  // IDEMPOTENT on `requestId`: a double click or a retried submit returns the
  // brief that already exists instead of a second one.
  const existing = (await sql`
    select id, reference, access_token, lead_id from inquiries
    where request_id = ${submission.requestId}
  `) as { id: string; reference: string; access_token: string; lead_id: string | null }[];
  if (existing[0]) {
    return {
      id: existing[0].id,
      reference: existing[0].reference,
      accessToken: existing[0].access_token,
      leadId: existing[0].lead_id,
      created: false,
    };
  }

  const titles = serviceTitles(submission.services);
  const brief: InquiryBrief = {
    idea: submission.idea,
    wishes: submission.wishes,
    timeframe: submission.timeframe,
  };

  // The lead's message is what the owner reads in the pipeline preview, so it
  // carries the brief rather than pointing at it.
  const message = [
    `Usluge: ${titles.join(" + ")}`,
    `Biznis: ${submission.businessName}`,
    "",
    submission.businessDescription,
    "",
    "Šta traži:",
    submission.idea,
    ...(submission.wishes ? ["", "Želje:", submission.wishes] : []),
  ].join("\n");

  const lead = await createLeadIntake({
    requestId: submission.requestId,
    fullName: submission.fullName,
    email: submission.email,
    company: submission.companyName || submission.businessName,
    phone: submission.phone,
    market: marketFor(submission.country),
    service: submission.services[0],
    message,
    budgetRange: submission.budgetEur != null ? `${submission.budgetEur} EUR` : null,
    timeline: TIMEFRAME_LABEL[submission.timeframe],
    attribution: submission.attribution,
  });

  const owner = (await sql`
    select contact_id, company_id from leads where id = ${lead.leadId}
  `) as { contact_id: string | null; company_id: string | null }[];

  const accessToken = randomBytes(24).toString("base64url");
  const attribution = submission.attribution;

  const rows = (await sql`
    insert into inquiries (
      reference, access_token, lead_id, portal_user_id, contact_id, company_id,
      services, buyer_type, full_name, email, phone,
      company_name, pib, mb, address, city, country,
      business_name, business_description, brief, budget_eur,
      request_id, landing_page, referrer, utm_source, utm_medium, utm_campaign,
      utm_content, utm_term, consent_at
    ) values (
      next_inquiry_reference(), ${accessToken}, ${lead.leadId},
      ${options.portalUserId ?? null}, ${owner[0]?.contact_id ?? null},
      ${owner[0]?.company_id ?? null},
      ${submission.services}::text[], ${submission.buyerType}, ${submission.fullName},
      ${submission.email}, ${submission.phone || null},
      ${submission.companyName || null}, ${submission.pib || null}, ${submission.mb || null},
      ${submission.address || null}, ${submission.city || null}, ${submission.country},
      ${submission.businessName}, ${submission.businessDescription},
      ${JSON.stringify(brief)}::jsonb, ${submission.budgetEur},
      ${submission.requestId}, ${attribution.landingPage ?? null},
      ${attribution.referrer ?? null}, ${attribution.utmSource ?? null},
      ${attribution.utmMedium ?? null}, ${attribution.utmCampaign ?? null},
      ${attribution.utmContent ?? null}, ${attribution.utmTerm ?? null}, now()
    )
    on conflict (request_id) do nothing
    returning id, reference, access_token
  `) as { id: string; reference: string; access_token: string }[];

  if (!rows[0]) {
    // Lost a race with a concurrent retry: the winner's row is the one that counts.
    const winner = (await sql`
      select id, reference, access_token from inquiries where request_id = ${submission.requestId}
    `) as { id: string; reference: string; access_token: string }[];
    if (!winner[0]) throw new Error("Upit nije upisan.");
    return {
      id: winner[0].id,
      reference: winner[0].reference,
      accessToken: winner[0].access_token,
      leadId: lead.leadId,
      created: false,
    };
  }

  return {
    id: rows[0].id,
    reference: rows[0].reference,
    accessToken: rows[0].access_token,
    leadId: lead.leadId,
    created: true,
  };
}

export async function getInquiryByToken(token: string): Promise<InquiryRow | null> {
  const sql = getSql();
  const rows = (await sql.query(
    `select ${SELECT_COLUMNS} from inquiries where access_token = $1`,
    [token],
  )) as InquiryRow[];
  return rows[0] ?? null;
}

export async function getInquiryById(id: string): Promise<InquiryRow | null> {
  const sql = getSql();
  const rows = (await sql.query(
    `select ${SELECT_COLUMNS} from inquiries where id = $1`,
    [id],
  )) as InquiryRow[];
  return rows[0] ?? null;
}

export async function listInquiries(limit = 100): Promise<InquiryRow[]> {
  const sql = getSql();
  return (await sql.query(
    `select ${SELECT_COLUMNS} from inquiries order by created_at desc limit $1`,
    [limit],
  )) as InquiryRow[];
}

export async function listInquiriesForPortalUser(
  portalUserId: string,
  email: string,
): Promise<InquiryRow[]> {
  const sql = getSql();
  // Matched on the address too, so a brief sent before the account existed
  // shows up the moment its owner logs in with the same mailbox.
  return (await sql.query(
    `select ${SELECT_COLUMNS} from inquiries
     where portal_user_id = $1 or lower(email) = lower($2)
     order by created_at desc limit 100`,
    [portalUserId, email],
  )) as InquiryRow[];
}

/** Attaches every brief sent from this address to the account that just logged
 *  in. Called on login, which is the first moment the two are known to be the
 *  same person. */
export async function claimInquiriesForPortalUser(
  portalUserId: string,
  email: string,
): Promise<void> {
  const sql = getSql();
  await sql`
    update inquiries set portal_user_id = ${portalUserId}, updated_at = now()
    where portal_user_id is null and lower(email) = lower(${email})
  `;
}

export type QuoteInput = {
  amount: number;
  currency: string;
  turnaroundDays: number | null;
  validUntil: string | null;
  note: string | null;
};

/** Sends the price. Only a brief that has not been answered yet can be quoted —
 *  re-quoting an accepted job would change the paper under a buyer who already
 *  said yes. */
export async function quoteInquiry(id: string, quote: QuoteInput): Promise<InquiryRow | null> {
  const sql = getSql();
  const rows = (await sql.query(
    `update inquiries
     set status = 'quoted', quoted_amount = $2, currency = $3, turnaround_days = $4,
         quote_valid_until = $5, quote_note = $6, quoted_at = now(), updated_at = now()
     where id = $1 and status in ('submitted', 'quoted')
     returning ${SELECT_COLUMNS}`,
    [id, quote.amount, quote.currency, quote.turnaroundDays, quote.validUntil, quote.note],
  )) as InquiryRow[];
  return rows[0] ?? null;
}

export async function setInquiryStatus(
  id: string,
  status: InquiryStatus,
  adminNote?: string | null,
): Promise<void> {
  const sql = getSql();
  await sql`
    update inquiries
    set status = ${status},
        admin_note = coalesce(${adminNote ?? null}, admin_note),
        updated_at = now()
    where id = ${id}
  `;
}

/** The buyer's answer to a quote, from the status link or from `/nalog`. Guarded
 *  on `status = 'quoted'` so a reload of the confirmation page cannot flip a
 *  decision that was already recorded. */
export async function respondToQuote(
  token: string,
  answer: "accepted" | "declined",
  reason: string | null,
): Promise<InquiryRow | null> {
  const sql = getSql();
  const rows = (await sql.query(
    `update inquiries
     set status = $2, responded_at = now(), decline_reason = $3, updated_at = now()
     where access_token = $1 and status = 'quoted'
     returning ${SELECT_COLUMNS}`,
    [token, answer, answer === "declined" ? reason : null],
  )) as InquiryRow[];
  return rows[0] ?? null;
}

export type InquirySummary = {
  waiting: number;
  quoted: number;
  accepted: number;
};

/** Counts for the `/os` dashboard: what the owner owes an answer, what is out
 *  with a price on it, and what has been said yes to. */
export async function getInquirySummary(): Promise<InquirySummary> {
  const sql = getSql();
  const rows = (await sql`
    select
      count(*) filter (where status = 'submitted')::int as waiting,
      count(*) filter (where status = 'quoted')::int as quoted,
      count(*) filter (where status = 'accepted')::int as accepted
    from inquiries
  `) as InquirySummary[];
  return rows[0] ?? { waiting: 0, quoted: 0, accepted: 0 };
}
