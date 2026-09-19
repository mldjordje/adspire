import "server-only";

import { getSql } from "@/lib/db";
import { mailTransportStatus } from "@/lib/mail";
import type { EduKind } from "./format";
import { notifyBuyerReminder, notifyOwnerAgenda } from "./notify";
import { addDays, belgradeNow } from "./slots";

/**
 * The daily reminder run: the owner's agenda for today and a heads-up to every
 * buyer whose session is tomorrow.
 *
 * Daily rather than "an hour before" because a Vercel Hobby cron runs at most
 * once a day. Each booking is claimed with a guarded UPDATE before its mail goes
 * out — claim-then-send can lose one reminder if the process dies in between,
 * send-then-claim would send twice every time two runs overlap.
 */

type Row = {
  id: string;
  kind: EduKind;
  date: string;
  startSlot: string;
  hours: number;
  topic: string | null;
  meetUrl: string | null;
  email: string;
  fullName: string | null;
};

const SELECT = `
  select b.id, b.kind, b.date::text as "date", b.start_slot as "startSlot", b.hours,
    b.topic, b.meet_url as "meetUrl", u.email, u.full_name as "fullName"
  from edu_bookings b join portal_users u on u.id = b.portal_user_id
`;

export async function runEducationReminders(): Promise<{
  agenda: number;
  buyers: number;
  skipped?: "no-mail-transport";
}> {
  // Claiming happens before sending, so a run without a mail transport would
  // mark every reminder as delivered and burn it for good. Production had no
  // SMTP or Resend credentials at all while this cron sat behind a 503, so the
  // first successful run would have been the destructive one.
  if (!mailTransportStatus().provider) {
    return { agenda: 0, buyers: 0, skipped: "no-mail-transport" };
  }

  const sql = getSql();
  const today = belgradeNow().date;
  const tomorrow = addDays(today, 1);

  const agenda = (await sql.query(
    `with claimed as (
       update edu_bookings set owner_reminded = true
       where date = $1::date and status = 'zakazano' and owner_reminded = false
       returning id
     )
     ${SELECT} where b.id in (select id from claimed)
     order by b.start_slot`,
    [today],
  )) as Row[];
  if (agenda.length > 0) await notifyOwnerAgenda(agenda);

  const due = (await sql.query(
    `${SELECT} where b.date = $1::date and b.status = 'zakazano' and b.buyer_reminded = false`,
    [tomorrow],
  )) as Row[];

  let buyers = 0;
  for (const booking of due) {
    const claimed = (await sql`
      update edu_bookings set buyer_reminded = true
      where id = ${booking.id} and buyer_reminded = false
      returning id
    `) as { id: string }[];
    if (claimed.length === 0) continue;
    if (await notifyBuyerReminder(booking, booking)) buyers += 1;
  }

  return { agenda: agenda.length, buyers };
}
