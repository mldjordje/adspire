import "server-only";

import { callMeetUrl, leadNotificationRecipient } from "@/lib/env";
import { sendMail } from "@/lib/mail";
import { getSiteUrl } from "@/lib/seo/site";
import { formatDay } from "@/lib/education/format";
import { belgradeToUtc } from "@/lib/education/ics";
import { asapPromise, CALL_MINUTES, callEnd } from "./slots";
import { TOPIC_LABELS, type CallSubmission } from "./types";

/**
 * Mails a booked call produces: a confirmation with a calendar file for the
 * visitor (when they gave an email) and a notification for the owner.
 *
 * Both fail quietly. The call is already in the database; a mailbox that is
 * down must not turn it into "it did not go through" on the visitor's screen.
 */

type BookedCall = CallSubmission & {
  id: string;
  date: string | null;
  slot: string | null;
  leadId: string | null;
};

const lines = (...rows: (string | null | false | undefined)[]) =>
  rows.filter((row): row is string => typeof row === "string").join("\n");

const stamp = (value: Date) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const escapeIcs = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/** Calendar file for a timed call. UTC times — every client reads those right. */
export function callIcs(call: {
  id: string;
  date: string;
  slot: string;
  summary: string;
  description: string;
  location: string | null;
}): string {
  const start = belgradeToUtc(call.date, call.slot);
  const end = new Date(start.getTime() + CALL_MINUTES * 60_000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Adspire//Razgovor//SR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:call-${call.id}@adspire.rs`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escapeIcs(call.summary)}`,
    `DESCRIPTION:${escapeIcs(call.description)}`,
    call.location ? `LOCATION:${escapeIcs(call.location)}` : null,
    call.location?.startsWith("https://") ? `URL:${call.location}` : null,
    // Fifteen minutes is enough to find headphones; a day-before alarm is
    // noise for a twenty-minute call.
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcs(call.summary)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ]
    .filter((row): row is string => row !== null)
    .join("\r\n");
}

async function send(to: string | null, subject: string, text: string, ics?: string) {
  if (!to) return false;
  try {
    return await sendMail({
      to,
      subject,
      text,
      attachments: ics
        ? [{ filename: "razgovor-adspire.ics", contentType: "text/calendar; charset=utf-8", content: Buffer.from(ics) }]
        : undefined,
    });
  } catch (error) {
    console.error("call_mail_failed", { subject, error });
    return false;
  }
}

export async function notifyCallBooked(call: BookedCall): Promise<void> {
  const sr = call.locale === "sr";
  const meet = callMeetUrl();
  const topic = TOPIC_LABELS[sr ? "sr" : "en"][call.topic];
  const first = call.fullName.trim().split(/\s+/)[0];
  const timed = call.date && call.slot ? { date: call.date, slot: call.slot } : null;
  const promise = asapPromise();

  const whenSr = timed
    ? `${formatDay(timed.date)}, ${timed.slot}–${callEnd(timed.slot)}`
    : promise.sameDay
      ? "danas, čim se oslobodim"
      : `${formatDay(promise.date)} pre podne`;
  const whenEn = timed
    ? `${timed.date}, ${timed.slot}–${callEnd(timed.slot)} (Belgrade time, CET)`
    : promise.sameDay
      ? "today, as soon as I am free"
      : `${promise.date} in the morning (Belgrade time)`;

  const howSr =
    call.channel === "meet"
      ? meet
        ? `Google Meet: ${meet}`
        : "Google Meet. Link vam šaljem mejlom pre razgovora."
      : `Zovem vas na ${call.phone}.`;
  const howEn =
    call.channel === "meet"
      ? meet
        ? `Google Meet: ${meet}`
        : "Google Meet. I will email you the link before the call."
      : `I will call you on ${call.phone}.`;

  if (call.email) {
    const ics =
      timed &&
      callIcs({
        id: call.id,
        date: timed.date,
        slot: timed.slot,
        summary: sr ? "Razgovor sa Adspire (20 min)" : "Call with Adspire (20 min)",
        description: lines(
          `${sr ? "Tema" : "Topic"}: ${topic}`,
          sr ? howSr : howEn,
          call.note ? `${sr ? "Napomena" : "Note"}: ${call.note}` : null,
        ),
        location: call.channel === "meet" ? meet : call.phone,
      });

    await send(
      call.email,
      sr
        ? timed
          ? `Razgovor zakazan: ${formatDay(timed.date)} u ${timed.slot}`
          : "Primio sam zahtev, javljam se uskoro"
        : timed
          ? `Call booked: ${timed.date} at ${timed.slot}`
          : "Got your request, I will call you shortly",
      sr
        ? lines(
            `Zdravo ${first},`,
            "",
            timed ? `Razgovor je zakazan: ${whenSr}.` : `Javljam vam se ${whenSr}.`,
            `Tema: ${topic}`,
            howSr,
            ics ? "U prilogu je termin za vaš kalendar." : null,
            "",
            "Dvadeset minuta, bez obaveze. Kažete šta vam treba, a ja vam kažem da li to ima smisla i otprilike koliko košta.",
            "Ako vam termin ne odgovara, samo odgovorite na ovaj mejl.",
            "",
            "Đorđe, Adspire",
            getSiteUrl(),
          )
        : lines(
            `Hi ${first},`,
            "",
            timed ? `Your call is booked: ${whenEn}.` : `I will get back to you ${whenEn}.`,
            `Topic: ${topic}`,
            howEn,
            ics ? "A calendar invite is attached." : null,
            "",
            "Twenty minutes, no strings. You tell me what you need, I tell you whether it makes sense and roughly what it costs.",
            "If the time does not work, just reply to this email.",
            "",
            "Đorđe, Adspire",
            getSiteUrl(),
          ),
      ics || undefined,
    );
  }

  const ownerIcs =
    timed &&
    callIcs({
      id: `${call.id}-owner`,
      date: timed.date,
      slot: timed.slot,
      summary: `Razgovor: ${call.fullName}${call.company ? ` (${call.company})` : ""}`,
      description: lines(
        `Tema: ${TOPIC_LABELS.sr[call.topic]}`,
        call.channel === "meet" ? `Meet · ${call.email}` : `Telefon · ${call.phone}`,
        call.note ? `Napomena: ${call.note}` : null,
      ),
      location: call.channel === "meet" ? meet : call.phone,
    });

  await send(
    leadNotificationRecipient(),
    `${timed ? "Razgovor" : "HITNO — pozovi"}: ${call.fullName} · ${
      timed ? `${timed.date} ${timed.slot}` : "što pre"
    } · ${call.channel === "meet" ? "Meet" : "telefon"}`,
    lines(
      timed ? `Zakazan razgovor ${timed.date} u ${timed.slot}.` : `Traži da ga pozoveš ${whenSr}.`,
      "",
      `Ime: ${call.fullName}`,
      call.company ? `Firma: ${call.company}` : null,
      `Tema: ${TOPIC_LABELS.sr[call.topic]}`,
      `Kanal: ${call.channel === "meet" ? "Google Meet" : "telefon"}`,
      call.phone ? `Telefon: ${call.phone}` : null,
      call.email ? `Mejl: ${call.email}` : "Mejl: nije ostavio",
      call.note ? `Napomena: ${call.note}` : null,
      `Jezik: ${call.locale.toUpperCase()}`,
      call.source ? `Sa strane: ${call.source}` : null,
      "",
      `${getSiteUrl()}/os/razgovori`,
      call.channel === "meet" && !meet ? "PAŽNJA: CALL_MEET_URL nije podešen — pošalji mu link ručno." : null,
    ),
    ownerIcs || undefined,
  );
}
