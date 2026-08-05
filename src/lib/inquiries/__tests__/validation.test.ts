import { describe, expect, it } from "vitest";

import { inquirySubmissionSchema } from "../validation";
import { MIN } from "../types";

const base = {
  services: ["web-prezentacije"],
  buyerType: "individual",
  fullName: "Ana Anić",
  email: " ANA@EXAMPLE.COM ",
  phone: "+381600000000",
  country: "Srbija",
  businessName: "Primer",
  businessDescription: "x".repeat(MIN.businessDescription),
  idea: "y".repeat(MIN.idea),
  wishes: "",
  timeframe: "1-3m",
  consent: true,
  requestId: "web_1234567890",
  attribution: { landingPage: "/upit" },
};

describe("inquirySubmissionSchema", () => {
  it("accepts a minimal individual brief and normalizes the email", () => {
    const parsed = inquirySubmissionSchema.parse(base);
    expect(parsed.email).toBe("ana@example.com");
    expect(parsed.budgetEur).toBeNull();
  });

  it("treats a blank budget as unanswered rather than zero", () => {
    expect(inquirySubmissionSchema.parse({ ...base, budgetEur: "" }).budgetEur).toBeNull();
    expect(inquirySubmissionSchema.parse({ ...base, budgetEur: "2500" }).budgetEur).toBe(2500);
  });

  it("rejects a budget that was typed and is nonsense", () => {
    expect(inquirySubmissionSchema.safeParse({ ...base, budgetEur: 0 }).success).toBe(false);
    expect(inquirySubmissionSchema.safeParse({ ...base, budgetEur: -5 }).success).toBe(false);
  });

  it("rejects a description shorter than the hint promises", () => {
    const short = { ...base, businessDescription: "prekratko" };
    expect(inquirySubmissionSchema.safeParse(short).success).toBe(false);
  });

  it("requires at least one service and caps the list", () => {
    expect(inquirySubmissionSchema.safeParse({ ...base, services: [] }).success).toBe(false);
    expect(
      inquirySubmissionSchema.safeParse({ ...base, services: ["a", "b", "c", "d"] }).success,
    ).toBe(false);
  });

  it("demands PIB and matični broj only from a Serbian company", () => {
    const domestic = {
      ...base,
      buyerType: "company",
      companyName: "Primer DOO",
      address: "Ulica 1",
      city: "Niš",
    };
    expect(inquirySubmissionSchema.safeParse(domestic).success).toBe(false);
    expect(
      inquirySubmissionSchema.safeParse({ ...domestic, pib: "123456789", mb: "12345678" }).success,
    ).toBe(true);

    // A company abroad is not held up by a format it cannot meet.
    const foreign = { ...domestic, country: "Nemačka" };
    expect(inquirySubmissionSchema.safeParse(foreign).success).toBe(true);
  });

  it("keeps an individual free of company fields", () => {
    expect(inquirySubmissionSchema.safeParse({ ...base, country: "Nemačka" }).success).toBe(true);
  });

  it("rejects a filled honeypot and a missing consent", () => {
    expect(inquirySubmissionSchema.safeParse({ ...base, website: "spam" }).success).toBe(false);
    expect(inquirySubmissionSchema.safeParse({ ...base, consent: false }).success).toBe(false);
  });
});
