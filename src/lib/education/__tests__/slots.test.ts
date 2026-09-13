import { describe, expect, it } from "vitest";

import {
  addDays,
  belgradeNow,
  endSlot,
  isDate,
  minutesUntil,
  monthCells,
  shiftMonth,
  slotSequence,
  startsFor,
  weekday,
} from "../slots";

describe("slotSequence", () => {
  it("lists the consecutive hours a session occupies", () => {
    expect(slotSequence("10:00", 3)).toEqual(["10:00", "11:00", "12:00"]);
  });

  it("refuses fractions, zero, the cap and sessions past midnight", () => {
    expect(slotSequence("10:00", 1.5)).toBeNull();
    expect(slotSequence("10:00", 0)).toBeNull();
    expect(slotSequence("10:00", 5)).toBeNull();
    expect(slotSequence("23:00", 2)).toBeNull();
    expect(slotSequence("25:00", 1)).toBeNull();
  });
});

describe("startsFor", () => {
  it("only offers starts with enough free hours behind them", () => {
    const free = ["09:00", "10:00", "11:00", "14:00", "15:00"];
    expect(startsFor(free, 1)).toEqual(free);
    expect(startsFor(free, 2)).toEqual(["09:00", "10:00", "14:00"]);
    expect(startsFor(free, 3)).toEqual(["09:00"]);
    expect(startsFor(free, 4)).toEqual([]);
  });
});

describe("Belgrade clock", () => {
  it("reads the wall clock in Belgrade, not UTC", () => {
    // 22:30 UTC in July is 00:30 the next day in Belgrade (CEST).
    expect(belgradeNow(new Date("2026-07-01T22:30:00Z"))).toEqual({
      date: "2026-07-02",
      minutes: 30,
    });
  });

  it("counts minutes to a slot across days", () => {
    const now = { date: "2026-09-13", minutes: 10 * 60 };
    expect(minutesUntil("2026-09-13", "11:00", now)).toBe(60);
    expect(minutesUntil("2026-09-14", "10:00", now)).toBe(1440);
    expect(minutesUntil("2026-09-12", "10:00", now)).toBe(-1440);
  });
});

describe("calendar helpers", () => {
  it("builds a Monday-first grid", () => {
    // 1 September 2026 is a Tuesday.
    const cells = monthCells("2026-09");
    expect(cells[0]).toBeNull();
    expect(cells[1]).toBe("2026-09-01");
    expect(cells.filter(Boolean)).toHaveLength(30);
  });

  it("knows weekdays, month shifts and day arithmetic", () => {
    expect(weekday("2026-09-14")).toBe(0);
    expect(weekday("2026-09-13")).toBe(6);
    expect(shiftMonth("2026-12", 1)).toBe("2027-01");
    expect(shiftMonth("2026-01", -1)).toBe("2025-12");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(endSlot("10:00", 2)).toBe("12:00");
  });

  it("validates dates", () => {
    expect(isDate("2026-09-14")).toBe(true);
    expect(isDate("2026-13-01")).toBe(false);
  });
});
