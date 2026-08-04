import { describe, expect, it } from "vitest";
import {
  addDays,
  belgradeToday,
  invoiceNumber,
  invoiceScope,
  itemTotals,
  mod97CheckDigits,
  paymentReferenceFor,
  referenceDigits,
  referenceModel,
  settlementAccount,
} from "../rules";

describe("invoiceNumber", () => {
  it("prints the Serbian seq/year form", () => {
    expect(invoiceNumber(34, 2026)).toBe("34/2026");
  });
});

describe("invoiceScope", () => {
  it("treats an unset country as domestic", () => {
    expect(invoiceScope(null)).toBe("domestic");
    expect(invoiceScope("")).toBe("domestic");
  });

  it("recognises Serbia however it is spelled", () => {
    for (const value of ["Srbija", "SERBIA", " rs ", "Republika Srbija"]) {
      expect(invoiceScope(value)).toBe("domestic");
    }
  });

  it("sends everything else to the foreign template", () => {
    expect(invoiceScope("Deutschland")).toBe("foreign");
    expect(invoiceScope("Österreich")).toBe("foreign");
  });
});

describe("payment reference", () => {
  it("produces digits a bank field accepts", () => {
    expect(referenceDigits("34/2026")).toBe("342026");
  });

  it("prefixes valid MOD 97-10 check digits", () => {
    const reference = paymentReferenceFor("34/2026", "97");
    expect(reference).toMatch(/^[0-9]+$/);

    // Model 97 carries the check digits FIRST. The ISO 7064 property they have
    // to satisfy is on the body with the digits appended: body||KK ≡ 1 (mod 97).
    const check = reference!.slice(0, 2);
    const body = reference!.slice(2);
    expect(body).toBe("342026");
    expect(BigInt(body + check) % BigInt(97)).toBe(BigInt(1));
  });

  it("returns null when the issuer does not use poziv na broj", () => {
    expect(paymentReferenceFor("34/2026", "none")).toBeNull();
    expect(referenceModel("nesto")).toBe("none");
    expect(referenceModel(" 97 ")).toBe("97");
  });

  it("rejects non-digits rather than producing a wrong checksum", () => {
    expect(() => mod97CheckDigits("34/2026")).toThrow(/cifre/);
  });
});

describe("settlementAccount", () => {
  const accounts = { domestic: "170-1234-56", eur: "RS35170…" };

  it("keeps a domestic payment in dinars even when the invoice is in EUR", () => {
    expect(settlementAccount("domestic", "EUR", accounts)).toBe("170-1234-56");
  });

  it("gives a foreign buyer the foreign account", () => {
    expect(settlementAccount("foreign", "EUR", accounts)).toBe("RS35170…");
  });
});

describe("itemTotals", () => {
  it("rounds each line and sums the rounded lines", () => {
    const { lines, total } = itemTotals([
      { name: "Održavanje", quantity: 1, unitPrice: 6000 },
      { name: "Sati", quantity: 3, unitPrice: 2333.335 },
    ]);
    expect(lines[0].total).toBe(6000);
    expect(lines[1].total).toBe(7000.01);
    // The printed lines must add up to the printed total.
    expect(total).toBe(lines[0].total + lines[1].total);
  });
});

describe("dates", () => {
  it("reads the Belgrade day, not the server's UTC day", () => {
    // 31 December 2026, 23:30 UTC is already 1 January 2027 in Belgrade — and
    // therefore the first document of the next number series.
    const { iso, year } = belgradeToday(new Date("2026-12-31T23:30:00Z"));
    expect(iso).toBe("2027-01-01");
    expect(year).toBe(2027);
  });

  it("adds days across a month boundary", () => {
    expect(addDays("2026-01-30", 7)).toBe("2026-02-06");
  });
});
