import "server-only";

import { getSql } from "@/lib/db";
import { createLeadIntake } from "@/lib/crm/leads";
import { addDays, belgradeNow } from "@/lib/education/slots";
import { notifyCallBooked } from "./notify";
import { CALL_HORIZON_DAYS, openCallDays, slotProblem, type CallDay, type TakenInput } from "./slots";
import {
  TOPIC_LABELS,
  TOPIC_TO_SERVICE,
  type CallBookingResult,
  type CallChannel,
  type CallStatus,
  type CallSubmission,
  type CallTopic,
} from "./types";

/**
 * Everything that blocks a call slot in the booking window: other calls, the
 * owner's edukacija hours and days closed by hand. One round trip — this runs
 * on every widget open.
 */
async function readTaken(): Promise<TakenInput> {
  const sql = getSql();
  const today = belgradeNow().date;
  const until = addDays(today, CALL_HORIZON_DAYS + 1);
  const rows = (await sql`
    select 'call' as kind, date::text || ' ' || start_slot as key
      from discovery_calls
      where status = 'zakazano' and date >= ${today}::date and date < ${until}::date
    union all
    select 'edu', date::text || ' ' || slot
      from edu_booking_slots
      where date >= ${today}::date and date < ${until}::date
    union all
    select 'closed', date::text
      from discovery_call_closed_days
      where date >= ${today}::date and date < ${until}::date
  `) as { kind: "call" | "edu" | "closed"; key: string }[];

  const taken: TakenInput = { calls: new Set(), eduHours: new Set(), closed: new Set() };
  for (const row of rows) {
    if (row.kind === "call") taken.calls.add(row.key);
    else if (row.kind === "edu") taken.eduHours.add(row.key);
    else taken.closed.add(row.key);
  }
  return taken;
}

export async function getOpenCallDays(): Promise<CallDay[]> {
  return openCallDays(await readTaken());
}

const MESSAGES: Record<"sr" | "en", Record<"invalid" | "closed" | "past" | "taken", string>> = {
  sr: {
    invalid: "Termin nije ispravan. Izaberite ponovo.",
    closed: "Taj dan nije otvoren za razgovore.",
    past: "Taj termin je prekratko pred nama. Izaberite kasniji.",
    taken: "Neko je upravo uzeo taj termin. Izaberite drugi.",
  },
  en: {
    invalid: "That time is not valid. Please pick again.",
    closed: "That day is not open for calls.",
    past: "That time is too close. Please pick a later one.",
    taken: "Someone just took that time. Please pick another.",
  },
};

/**
 * Book a call. Idempotent on requestId: a double tap returns the first call.
 * Every refusal is a code the widget turns into "pick another time" rather
 * than an error page.
 */
export async function createCall(input: CallSubmission): Promise<CallBookingResult> {
  const lang = input.locale === "sr" ? "sr" : "en";
  const sql = getSql();

  const existing = (await sql`
    select id, asap from discovery_calls where request_id = ${input.requestId}
  `) as { id: string; asap: boolean }[];
  if (existing[0]) return { ok: true, id: existing[0].id, asap: existing[0].asap };

  const date = input.asap ? null : (input.date ?? null);
  const slot = input.asap ? null : (input.slot ?? null);
  if (date && slot) {
    const problem = slotProblem(date, slot, await readTaken());
    if (problem) return { ok: false, code: problem, message: MESSAGES[lang][problem] };
  }

  const inserted = (await sql`
    insert into discovery_calls (
      request_id, channel, date, start_slot, asap, full_name, phone, email, company,
      service, note, locale, source, attribution
    ) values (
      ${input.requestId}, ${input.channel}, ${date}::date, ${slot}, ${input.asap},
      ${input.fullName}, ${input.phone}, ${input.email}, ${input.company},
      ${input.topic}, ${input.note}, ${input.locale}, ${input.source},
      ${JSON.stringify(input.attribution ?? {})}::jsonb
    )
    on conflict do nothing
    returning id
  `) as { id: string }[];

  if (!inserted[0]) {
    // Either the same requestId won a race (fine) or the slot index refused.
    const again = (await sql`
      select id, asap from discovery_calls where request_id = ${input.requestId}
    `) as { id: string; asap: boolean }[];
    if (again[0]) return { ok: true, id: again[0].id, asap: again[0].asap };
    return { ok: false, code: "taken", message: MESSAGES[lang].taken };
  }
  const id = inserted[0].id;

  // The CRM needs an email to hold a contact. A phone-only call still reaches
  // the owner through /os/razgovori and the notification mail.
  let leadId: string | null = null;
  if (input.email) {
    try {
      const lead = await createLeadIntake({
        requestId: input.requestId,
        fullName: input.fullName,
        email: input.email,
        company: input.company ?? "",
        phone: input.phone ?? "",
        market: input.locale === "sr" ? "rs" : "dach",
        service: TOPIC_TO_SERVICE[input.topic],
        message: callSummary(input),
        attribution: attributionOf(input),
      });
      leadId = lead.leadId;
      // A booked slot is already the next step; "new" would put it in the
      // "nobody answered" queue next to leads that really wait.
      if (!input.asap) {
        await sql`update leads set status = 'meeting_booked' where id = ${leadId} and status = 'new'`;
      }
      await sql`update discovery_calls set lead_id = ${leadId} where id = ${id}`;
    } catch (error) {
      console.error("call_lead_failed", { id, error });
    }
  }

  await notifyCallBooked({ ...input, id, date, slot, leadId });
  return { ok: true, id, asap: input.asap };
}

function callSummary(input: CallSubmission): string {
  const when = input.asap ? "što pre" : `${input.date} ${input.slot}`;
  const how = input.channel === "meet" ? "Google Meet" : `telefon ${input.phone ?? ""}`;
  return [
    `Razgovor (20 min): ${TOPIC_LABELS.sr[input.topic]} — ${when}, ${how}.`,
    input.note ? `Napomena: ${input.note}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function attributionOf(input: CallSubmission) {
  const a = (input.attribution ?? {}) as Record<string, unknown>;
  const str = (key: string) => (typeof a[key] === "string" ? (a[key] as string) : null);
  return {
    landingPage: str("landingPage") ?? input.source,
    referrer: str("referrer"),
    utmSource: str("utmSource"),
    utmMedium: str("utmMedium"),
    utmCampaign: str("utmCampaign"),
    utmContent: str("utmContent"),
    utmTerm: str("utmTerm"),
  };
}

// ── /os ─────────────────────────────────────────────────────────────────────

export type OsCall = {
  id: string;
  status: CallStatus;
  channel: CallChannel;
  date: string | null;
  startSlot: string | null;
  asap: boolean;
  fullName: string;
  phone: string | null;
  email: string | null;
  company: string | null;
  topic: CallTopic;
  note: string | null;
  locale: string;
  source: string | null;
  leadId: string | null;
  ownerNote: string | null;
  createdAt: string;
};

export type CallFilter = "open" | "past" | "all";

export async function listCalls(filter: CallFilter): Promise<OsCall[]> {
  const sql = getSql();
  const today = belgradeNow().date;
  const rows = (await sql`
    select id, status, channel, date::text as date, start_slot as "startSlot", asap,
      full_name as "fullName", phone, email, company, service as topic, note, locale,
      source, lead_id as "leadId", owner_note as "ownerNote",
      to_char(created_at at time zone 'Europe/Belgrade', 'DD.MM. HH24:MI') as "createdAt"
    from discovery_calls
    where case ${filter}::text
      when 'open' then status = 'zakazano' and (asap or date >= ${today}::date)
      when 'past' then not (status = 'zakazano' and (asap or date >= ${today}::date))
      else true
    end
    -- "Što pre" first: somebody is waiting by the phone right now.
    order by (status = 'zakazano' and asap) desc, date nulls first, start_slot, created_at desc
    limit 200
  `) as OsCall[];
  return rows;
}

export async function setCallStatus(id: string, status: CallStatus, ownerNote: string | null) {
  const sql = getSql();
  const rows = (await sql`
    update discovery_calls
    set status = ${status}, owner_note = coalesce(${ownerNote}, owner_note), updated_at = now()
    where id = ${id}
    returning lead_id as "leadId"
  `) as { leadId: string | null }[];
  // A held call means contact was made; the lead is no longer "new".
  const leadId = rows[0]?.leadId;
  if (leadId && status === "odrzano") {
    await sql`update leads set status = 'contacted' where id = ${leadId} and status = 'new'`;
  }
  return rows.length > 0;
}

export async function listClosedDays(): Promise<{ date: string; note: string | null }[]> {
  const sql = getSql();
  return (await sql`
    select date::text as date, note from discovery_call_closed_days
    where date >= ${belgradeNow().date}::date order by date
  `) as { date: string; note: string | null }[];
}

export async function setClosedDay(date: string, closed: boolean, note: string | null) {
  const sql = getSql();
  if (closed) {
    await sql`
      insert into discovery_call_closed_days (date, note) values (${date}::date, ${note})
      on conflict (date) do update set note = excluded.note
    `;
  } else {
    await sql`delete from discovery_call_closed_days where date = ${date}::date`;
  }
}
