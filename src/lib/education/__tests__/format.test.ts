import { describe, expect, it } from "vitest";

import { cleanUrl, formatDay, formatHours, formatMonth, ledgerReason } from "../format";

describe("formatHours", () => {
  it("uses the three Serbian forms", () => {
    expect(formatHours(1)).toBe("1 sat");
    expect(formatHours(3)).toBe("3 sata");
    expect(formatHours(5)).toBe("5 sati");
    expect(formatHours(12)).toBe("12 sati");
    expect(formatHours(21)).toBe("21 sat");
    expect(formatHours(1.5)).toBe("1,5 sati");
  });
});

describe("dates", () => {
  it("formats calendar days from the string, never through a timezone", () => {
    expect(formatDay("2026-09-01")).toBe("1. septembar 2026.");
    expect(formatDay(null)).toBe("—");
    expect(formatMonth("2026-12")).toBe("decembar 2026.");
  });
});

describe("ledgerReason", () => {
  it("files grants as purchase only when tied to an invoice", () => {
    expect(ledgerReason(5)).toBe("manual");
    expect(ledgerReason(5, null, true)).toBe("purchase");
  });

  it("keeps offline use apart from corrections", () => {
    expect(ledgerReason(-1, "offline")).toBe("offline");
    expect(ledgerReason(-1, "correction")).toBe("correction");
    expect(ledgerReason(-1, "refund")).toBe("correction");
    expect(ledgerReason(-1)).toBe("correction");
  });
});

describe("cleanUrl", () => {
  it("accepts only http(s)", () => {
    expect(cleanUrl("https://meet.google.com/abc-defg-hij")).toBe(
      "https://meet.google.com/abc-defg-hij",
    );
    expect(cleanUrl("javascript:alert(1)")).toBeNull();
    expect(cleanUrl("not a url")).toBeNull();
    expect(cleanUrl("")).toBeNull();
  });
});
