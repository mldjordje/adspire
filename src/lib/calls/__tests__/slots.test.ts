import { describe, expect, it } from "vitest";

import { asapPromise, CALL_DAY_SLOTS, callEnd, hourOf, openCallDays, slotProblem } from "../slots";
import { callSubmissionSchema, topicForPath } from "../types";

const empty = () => ({ calls: new Set<string>(), eduHours: new Set<string>(), closed: new Set<string>() });

// 2026-09-28 is a Monday.
const mondayMorning = { date: "2026-09-28", minutes: 8 * 60 };

describe("call grid", () => {
  it("offers 09:00–16:30 on a 30-minute grid, last call ending 16:50", () => {
    expect(CALL_DAY_SLOTS[0]).toBe("09:00");
    expect(CALL_DAY_SLOTS.at(-1)).toBe("16:30");
    expect(CALL_DAY_SLOTS).toHaveLength(16);
    expect(callEnd("16:30")).toBe("16:50");
  });

  it("maps a call to the education hour it starts in", () => {
    expect(hourOf("09:30")).toBe("09:00");
    expect(hourOf("14:00")).toBe("14:00");
  });
});

describe("openCallDays", () => {
  it("skips weekends and keeps the 90-minute lead time", () => {
    const days = openCallDays(empty(), mondayMorning);
    const dates = days.map((d) => d.date);
    expect(dates).not.toContain("2026-10-03"); // Saturday
    expect(dates).not.toContain("2026-10-04"); // Sunday
    // 08:00 + 90 min → 09:30 is the first bookable start today
    expect(days[0]).toMatchObject({ date: "2026-09-28" });
    expect(days[0].slots[0]).toBe("09:30");
  });

  it("blocks both calls inside a booked education hour, and taken calls", () => {
    const taken = empty();
    taken.eduHours.add("2026-09-29 10:00");
    taken.calls.add("2026-09-29 14:30");
    const tuesday = openCallDays(taken, mondayMorning).find((d) => d.date === "2026-09-29");
    expect(tuesday?.slots).not.toContain("10:00");
    expect(tuesday?.slots).not.toContain("10:30");
    expect(tuesday?.slots).not.toContain("14:30");
    expect(tuesday?.slots).toContain("11:00");
  });

  it("drops closed days entirely", () => {
    const taken = empty();
    taken.closed.add("2026-09-30");
    expect(openCallDays(taken, mondayMorning).map((d) => d.date)).not.toContain("2026-09-30");
  });
});

describe("slotProblem", () => {
  it("refuses off-grid, weekend, too-soon and taken slots", () => {
    const taken = empty();
    taken.calls.add("2026-09-29 11:00");
    expect(slotProblem("2026-09-29", "09:15", taken, mondayMorning)).toBe("invalid");
    expect(slotProblem("2026-10-03", "10:00", taken, mondayMorning)).toBe("closed");
    expect(slotProblem("2026-09-28", "09:00", taken, mondayMorning)).toBe("past");
    expect(slotProblem("2026-09-29", "11:00", taken, mondayMorning)).toBe("taken");
    expect(slotProblem("2026-09-29", "11:30", taken, mondayMorning)).toBeNull();
  });
});

describe("asapPromise", () => {
  it("promises today on a working day before 16:00, else the next working morning", () => {
    expect(asapPromise({ date: "2026-09-28", minutes: 10 * 60 })).toEqual({ sameDay: true, date: "2026-09-28" });
    expect(asapPromise({ date: "2026-10-02", minutes: 16 * 60 + 30 })).toEqual({ sameDay: false, date: "2026-10-05" });
    expect(asapPromise({ date: "2026-10-03", minutes: 9 * 60 })).toEqual({ sameDay: false, date: "2026-10-05" });
  });
});

describe("callSubmissionSchema", () => {
  const base = {
    requestId: "web_test_1234567",
    topic: "sajt",
    fullName: "Ana Anić",
    locale: "sr",
  };

  it("needs a phone for phone calls and an email for Meet", () => {
    expect(callSubmissionSchema.safeParse({ ...base, channel: "phone", asap: true }).success).toBe(false);
    expect(callSubmissionSchema.safeParse({ ...base, channel: "phone", asap: true, phone: "+381 60 123 4567" }).success).toBe(true);
    expect(callSubmissionSchema.safeParse({ ...base, channel: "meet", asap: true, phone: "060123456" }).success).toBe(false);
    expect(callSubmissionSchema.safeParse({ ...base, channel: "meet", asap: true, email: "Ana@Example.com" }).success).toBe(true);
  });

  it("needs a slot unless the call is 'as soon as possible'", () => {
    const phone = { ...base, channel: "phone", phone: "060 123 4567" };
    expect(callSubmissionSchema.safeParse({ ...phone, asap: false }).success).toBe(false);
    expect(callSubmissionSchema.safeParse({ ...phone, asap: false, date: "2026-09-29", slot: "10:00" }).success).toBe(true);
  });
});

describe("topicForPath", () => {
  it("reads the topic off the page the button sits on", () => {
    expect(topicForPath("/izrada-web-shopa")).toBe("shop");
    expect(topicForPath("/softver-za-salon-lepote")).toBe("zakazivanje");
    expect(topicForPath("/ai-chatbot-za-sajt")).toBe("ai");
    expect(topicForPath("/interni-softver-umesto-excel-tabela")).toBe("softver");
    expect(topicForPath("/prezentacioni-sajt-za-firmu")).toBe("sajt");
    expect(topicForPath("/")).toBeNull();
    expect(topicForPath("/contact-us")).toBeNull();
    expect(topicForPath("/en/why-online-store-not-selling")).toBe("shop");
  });
});
