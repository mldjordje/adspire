import { describe, expect, it } from "vitest";
import { leadSubmissionSchema } from "../validation";

const base = {
  fullName: "Ana Petrović",
  email: "ana@example.com",
  market: "rs" as const,
  service: "booking" as const,
  message: "Želimo booking sistem za dve ordinacije.",
  consent: true as const,
  requestId: "req_1234567890",
  attribution: { landingPage: "/contact-us" },
};

describe("leadSubmissionSchema", () => {
  it("normalizes a valid Serbian lead", () => {
    const parsed = leadSubmissionSchema.parse({
      ...base,
      fullName: "  Ana Petrović ",
      email: " ANA@EXAMPLE.COM ",
      company: "Klinika Ana",
      phone: "+381 60 123 456",
      attribution: { landingPage: "/our-services/sistemi-za-zakazivanje" },
    });

    expect(parsed.fullName).toBe("Ana Petrović");
    expect(parsed.email).toBe("ana@example.com");
    expect(parsed.company).toBe("Klinika Ana");
  });

  it("defaults optional text fields to empty strings", () => {
    const parsed = leadSubmissionSchema.parse(base);
    expect(parsed.company).toBe("");
    expect(parsed.phone).toBe("");
    expect(parsed.website).toBe("");
  });

  it("rejects a filled honeypot", () => {
    expect(() =>
      leadSubmissionSchema.parse({ ...base, website: "https://spam.example" }),
    ).toThrow();
  });

  it("rejects a missing consent", () => {
    expect(() => leadSubmissionSchema.parse({ ...base, consent: false })).toThrow();
  });

  it("rejects an unknown service", () => {
    expect(() => leadSubmissionSchema.parse({ ...base, service: "seo" })).toThrow();
  });

  it("rejects a malformed email", () => {
    expect(() => leadSubmissionSchema.parse({ ...base, email: "ana@" })).toThrow();
  });
});
