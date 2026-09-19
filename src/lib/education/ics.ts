import { belgradeNow, minutesUntil } from "./slots";

/**
 * A calendar file for a booked session, attached to the confirmation mail so
 * the session lands in the buyer's own calendar with one tap.
 *
 * Times are written in UTC. A local time with TZID would need a VTIMEZONE block
 * that several mail clients render wrong; UTC every client gets right.
 */

/** The instant a Belgrade wall-clock (date, slot) happens. */
export function belgradeToUtc(date: string, slot: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = slot.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, h, min);
  // Read the guess back as Belgrade time; the gap is the zone offset.
  const drift = minutesUntil(date, slot, belgradeNow(new Date(guess))) ?? 0;
  return new Date(guess + drift * 60_000);
}

const stamp = (value: Date) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const escape = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

export type IcsSession = {
  uid: string;
  date: string;
  startSlot: string;
  hours: number;
  summary: string;
  description: string;
  url: string;
};

export function sessionIcs(session: IcsSession, now: Date = new Date()): string {
  const start = belgradeToUtc(session.date, session.startSlot);
  const end = new Date(start.getTime() + Math.round(session.hours) * 3_600_000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Adspire//Edukacija//SR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${session.uid}`,
    `DTSTAMP:${stamp(now)}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escape(session.summary)}`,
    `DESCRIPTION:${escape(session.description)}`,
    `URL:${session.url}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escape(session.summary)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
