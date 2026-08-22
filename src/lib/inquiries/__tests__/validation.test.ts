import { describe, expect, it } from "vitest";

import { inquirySubmissionSchema, parseInquirySubmission } from "../validation";
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

const quick = {
  intake: "quick",
  services: ["web-prezentacije"],
  fullName: "Ana Anić",
  email: " ANA@EXAMPLE.COM ",
  businessName: "Ordinacija Dent",
  idea: "z".repeat(MIN.quickIdea),
  consent: true,
  requestId: "web_1234567890",
  attribution: { landingPage: "/upit/brzo" },
};

describe("quick intake", () => {
  it("accepts five fields and fills the rest with blanks, not guesses", () => {
    const parsed = parseInquirySubmission(quick);
    expect(parsed.intake).toBe("quick");
    expect(parsed.email).toBe("ana@example.com");
    expect(parsed.pib).toBe("");
    expect(parsed.businessDescription).toBe("");
    expect(parsed.budgetEur).toBeNull();
    // Not asked, so it must not jump the queue ahead of a paying deadline.
    expect(parsed.timeframe).toBe("flex");
  });

  it("still refuses a one-word answer and a bad address", () => {
    expect(() => parseInquirySubmission({ ...quick, idea: "treba" })).toThrow();
    expect(() => parseInquirySubmission({ ...quick, email: "ana" })).toThrow();
  });

  it("does not let the short form skip the long form's rules", () => {
    // Same payload without the flag is held to the full brief and fails.
    const { intake: _intake, ...withoutFlag } = quick;
    expect(() => parseInquirySubmission(withoutFlag)).toThrow();
  });

  it("keeps an old client that never sends intake on the full brief", () => {
    expect(parseInquirySubmission(base).intake).toBe("full");
  });
});
