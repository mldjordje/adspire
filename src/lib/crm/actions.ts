"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSql } from "@/lib/db";
import { getSession } from "@/lib/os/session";
import { createClient } from "@/lib/billing/clients";
import { sendAndLog } from "@/lib/messages/store";
import { getLeadDetail } from "./queries";
import { LEAD_STATUSES, type LeadStatus } from "./types";

const isLeadStatus = (value: string): value is LeadStatus =>
  (LEAD_STATUSES as readonly string[]).includes(value);

/**
 * Pipeline stage change. Writes the new status and a matching activity so the
 * lead timeline always explains how it got where it is.
 */
export async function updateLeadStatus(formData: FormData) {
  const leadId = String(formData.get("leadId") ?? "");
  const status = String(formData.get("status") ?? "");
  const note = String(formData.get("note") ?? "").trim();

  if (!leadId || !isLeadStatus(status)) return;
  if (!(await getSession())) return;

  const sql = getSql();
  const previous = (await sql`select status from leads where id = ${leadId}`) as {
    status: LeadStatus;
  }[];
  if (!previous[0]) return;

  await sql`
    update leads set status = ${status}::lead_status, updated_at = now() where id = ${leadId}
  `;
  await sql`
    insert into activities (lead_id, type, body, metadata)
    values (
      ${leadId}, 'status_change',
      ${note || `${previous[0].status} → ${status}`},
      ${JSON.stringify({ from: previous[0].status, to: status })}::jsonb
    )
  `;

  revalidatePath("/os");
  revalidatePath("/os/leads");
  revalidatePath(`/os/leads/${leadId}`);
}

/** Free-text note on a lead. */
export async function addLeadNote(formData: FormData) {
  const leadId = String(formData.get("leadId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!leadId || !body) return;
  if (!(await getSession())) return;

  const sql = getSql();
  await sql`insert into activities (lead_id, type, body) values (${leadId}, 'note', ${body})`;

  revalidatePath(`/os/leads/${leadId}`);
}

/**
 * Replies to the lead by mail from inside `/os`.
 *
 * Answering used to mean leaving for webmail, which is where follow-ups get
 * lost. The send is logged either way and the lead moves off `new`, so the
 * "bez odgovora" counter on the dashboard means what it says.
 */
export async function sendLeadReply(formData: FormData) {
  const leadId = String(formData.get("leadId") ?? "");
  const to = String(formData.get("to") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!leadId) return;
  const session = await getSession();
  if (!session) return;
  if (!to || !subject || !body) redirect(`/os/leads/${leadId}?mail=prazno`);

  const result = await sendAndLog({
    to,
    subject,
    body,
    leadId,
    createdBy: session.email,
  });

  const sql = getSql();
  await sql`
    insert into activities (lead_id, type, body, metadata)
    values (${leadId}, 'email', ${subject}, ${JSON.stringify({
      to,
      ok: result.ok,
    })}::jsonb)
  `;

  if (result.ok) {
    await sql`
      update leads set status = 'contacted', updated_at = now()
      where id = ${leadId} and status = 'new'
    `;
  }

  revalidatePath("/os");
  revalidatePath("/os/leads");
  revalidatePath(`/os/leads/${leadId}`);
  redirect(`/os/leads/${leadId}?mail=${result.ok ? "poslato" : "greska"}`);
}

/** Owner's own reminder date. Drives the "za danas" list on the dashboard. */
export async function setLeadFollowUp(formData: FormData) {
  const leadId = String(formData.get("leadId") ?? "");
  const date = String(formData.get("followUpOn") ?? "").trim() || null;
  if (!leadId) return;
  if (!(await getSession())) return;

  const sql = getSql();
  await sql`update leads set follow_up_on = ${date}, updated_at = now() where id = ${leadId}`;

  revalidatePath("/os");
  revalidatePath(`/os/leads/${leadId}`);
}

/**
 * Promotes a lead to a paying client so an invoice can be issued against it.
 * Billing identity (PIB, MB, legal address) is not something the lead form
 * collects — the client screen is where it gets completed.
 */
export async function convertLeadToClient(formData: FormData) {
  const leadId = String(formData.get("leadId") ?? "");
  if (!leadId) return;
  if (!(await getSession())) return;

  const lead = await getLeadDetail(leadId);
  if (!lead) return;

  const clientId = await createClient({
    companyName: lead.company ?? lead.fullName,
    contactPerson: lead.fullName,
    email: lead.email === "—" ? null : lead.email,
    emailCc: null,
    address: null,
    city: null,
    country: lead.market === "dach" ? "Nemačka" : "Srbija",
    pib: null,
    mb: null,
    phone: lead.phone,
    notes: `Iz leada ${leadId}`,
    active: true,
  });

  const sql = getSql();
  await sql`
    insert into activities (lead_id, type, body)
    values (${leadId}, 'note', ${"Prebačen u klijente."})
  `;
  await sql`
    update leads set status = 'won', updated_at = now()
    where id = ${leadId} and status <> 'won'
  `;

  revalidatePath("/os/klijenti");
  revalidatePath(`/os/leads/${leadId}`);
  redirect(`/os/klijenti/${clientId}`);
}
