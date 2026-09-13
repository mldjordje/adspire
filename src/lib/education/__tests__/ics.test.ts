import { describe, expect, it } from "vitest";

import { belgradeToUtc, sessionIcs } from "../ics";

describe("belgradeToUtc", () => {
  it("applies summer and winter offsets", () => {
    expect(belgradeToUtc("2026-07-02", "10:00").toISOString()).toBe("2026-07-02T08:00:00.000Z");
    expect(belgradeToUtc("2026-12-01", "10:00").toISOString()).toBe("2026-12-01T09:00:00.000Z");
  });
});

describe("sessionIcs", () => {
  it("writes a UTC event of the booked length with escaped text", () => {
    const ics = sessionIcs(
      {
        uid: "edu-1@adspire.rs",
        date: "2026-07-02",
        startSlot: "10:00",
        hours: 2,
        summary: "Edukacija, Adspire",
        description: "Tema: n8n; webhook\nlink na nalogu",
        url: "https://adspire.rs/nalog/edukacija",
      },
      new Date("2026-06-01T00:00:00Z"),
    );
    expect(ics).toContain("DTSTART:20260702T080000Z");
    expect(ics).toContain("DTEND:20260702T100000Z");
    expect(ics).toContain("SUMMARY:Edukacija\\, Adspire");
    expect(ics).toContain("DESCRIPTION:Tema: n8n\\; webhook\\nlink na nalogu");
    expect(ics.split("\r\n")[0]).toBe("BEGIN:VCALENDAR");
  });
});
