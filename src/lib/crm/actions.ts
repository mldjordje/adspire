"use server";

import { revalidatePath } from "next/cache";
import { getSql } from "@/lib/db";
import { getSession } from "@/lib/os/session";
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
