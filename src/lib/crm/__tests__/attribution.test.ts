import { describe, expect, it } from "vitest";
import { normalizeAttribution } from "../attribution";

describe("normalizeAttribution", () => {
  it("keeps only supported attribution fields", () => {
    expect(
      normalizeAttribution({
        landingPage: " /de/contact-us ",
        referrer: "https://google.com/",
        utmSource: " Google ",
        utmMedium: "CPC",
        utmCampaign: "Booking-DE",
        gclid: "test-click-id",
        ignored: "secret",
      }),
    ).toEqual({
      landingPage: "/de/contact-us",
      referrer: "https://google.com/",
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "booking-de",
      utmContent: null,
      utmTerm: null,
      gclid: "test-click-id",
      gbraid: null,
      wbraid: null,
      msclkid: null,
    });
  });

  it("falls back to the site root when the landing page is missing", () => {
    expect(normalizeAttribution({}).landingPage).toBe("/");
  });

  it("ignores non-string values", () => {
    const result = normalizeAttribution({ landingPage: "/", utmSource: 42, referrer: null });
    expect(result.utmSource).toBeNull();
    expect(result.referrer).toBeNull();
  });
});
