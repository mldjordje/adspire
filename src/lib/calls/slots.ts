// Pure calendar rules for razgovor (discovery call). Shared by the API, the
// booking widget and the tests, so the widget never offers a time the server
// then refuses. No DB and no `server-only` on purpose.

import {
  addDays,
  belgradeNow,
  minutesToSlot,
  minutesUntil,
  slotToMinutes,
  weekday,
  type WallClock,
} from "@/lib/education/slots";

/** Length of the call itself. */
export const CALL_MINUTES = 20;

/**
 * Starts sit on a 30-minute grid: 20 minutes of call and 10 to write the note
 * and breathe before the next one. Back-to-back 20s would leave no room for a
 * call that runs two minutes long.
 */
export const CALL_GRID_MINUTES = 30;

/** Working window, Belgrade wall clock. The last call ends at 17:00 at the latest. */
export const CALL_DAY_START = 9 * 60;
export const CALL_DAY_END = 17 * 60;

/** A call booked for "in ten minutes" cannot be prepared for and usually is missed. */
export const CALL_MIN_LEAD_MINUTES = 90;

/** How far ahead the widget shows days. Two working weeks is enough to decide. */
export const CALL_HORIZON_DAYS = 14;

/** Every start time a working day offers, before anything is taken. */
export const CALL_DAY_SLOTS: string[] = (() => {
  const out: string[] = [];
  for (let m = CALL_DAY_START; m + CALL_MINUTES <= CALL_DAY_END; m += CALL_GRID_MINUTES) {
    out.push(minutesToSlot(m));
  }
  return out;
})();

export const isCallSlot = (slot: string): boolean => CALL_DAY_SLOTS.includes(slot);

/** Monday–Friday. */
export const isWorkingDay = (date: string): boolean => weekday(date) < 5;

/**
 * The education hour ("HH:00") a call falls into. Edukacija books whole hours,
 * so a call blocks the hour it starts in and a booked hour blocks both calls
 * inside it. Calls never cross an hour boundary on this grid (:00 and :30,
 * 20 minutes long).
 */
export function hourOf(slot: string): string | null {
  const minutes = slotToMinutes(slot);
  if (minutes === null) return null;
  return minutesToSlot(Math.floor(minutes / 60) * 60);
}

export type CallDay = { date: string; slots: string[] };

export type TakenInput = {
  /** Live calls: "YYYY-MM-DD HH:MM". */
  calls: Set<string>;
  /** Booked education hours: "YYYY-MM-DD HH:00". */
  eduHours: Set<string>;
  /** Days the owner closed for calls. */
  closed: Set<string>;
};

/** Free call slots from today through the horizon, grouped per day, empty days dropped. */
export function openCallDays(taken: TakenInput, now: WallClock = belgradeNow()): CallDay[] {
  const days: CallDay[] = [];
  for (let i = 0; i < CALL_HORIZON_DAYS; i += 1) {
    const date = addDays(now.date, i);
    if (!isWorkingDay(date) || taken.closed.has(date)) continue;
    const slots = CALL_DAY_SLOTS.filter((slot) => {
      if ((minutesUntil(date, slot, now) ?? -1) < CALL_MIN_LEAD_MINUTES) return false;
      if (taken.calls.has(`${date} ${slot}`)) return false;
      return !taken.eduHours.has(`${date} ${hourOf(slot)}`);
    });
    if (slots.length > 0) days.push({ date, slots });
  }
  return days;
}

/**
 * Why a requested (date, slot) cannot be booked, or null when it can. The
 * unique index is still what decides a race; this is the readable refusal.
 */
export function slotProblem(
  date: string,
  slot: string,
  taken: TakenInput,
  now: WallClock = belgradeNow(),
): "invalid" | "closed" | "past" | "taken" | null {
  if (!isCallSlot(slot) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return "invalid";
  if (!isWorkingDay(date) || taken.closed.has(date)) return "closed";
  const until = minutesUntil(date, slot, now);
  if (until === null) return "invalid";
  if (until < CALL_MIN_LEAD_MINUTES) return "past";
  if (until > CALL_HORIZON_DAYS * 1440) return "closed";
  if (taken.calls.has(`${date} ${slot}`) || taken.eduHours.has(`${date} ${hourOf(slot)}`)) {
    return "taken";
  }
  return null;
}

/** "09:30" → "09:50": what the confirmation shows. */
export function callEnd(slot: string): string {
  const minutes = slotToMinutes(slot);
  return minutes === null ? slot : minutesToSlot(minutes + CALL_MINUTES);
}

/**
 * When the owner will call back on an "as soon as possible" request, in words
 * the visitor can hold us to. A working day before 16:00: today. Later, and on
 * weekends: the next working morning.
 */
export function asapPromise(now: WallClock = belgradeNow()): { sameDay: boolean; date: string } {
  if (isWorkingDay(now.date) && now.minutes < CALL_DAY_END - 60) {
    return { sameDay: true, date: now.date };
  }
  let date = addDays(now.date, 1);
  while (!isWorkingDay(date)) date = addDays(date, 1);
  return { sameDay: false, date };
}
