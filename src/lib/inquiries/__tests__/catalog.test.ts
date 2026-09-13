import { describe, expect, it } from "vitest";

import { getInquiryServices, isInquiryServiceSlug, serviceTitles } from "../catalog";

describe("inquiry catalog", () => {
  it("offers every service from the site content", () => {
    const services = getInquiryServices();
    expect(services.length).toBeGreaterThan(0);
    expect(services.every((service) => service.slug && service.title)).toBe(true);
  });

  it("recognises a slug that /our-services also serves", () => {
    const [first] = getInquiryServices();
    expect(isInquiryServiceSlug(first.slug)).toBe(true);
    expect(isInquiryServiceSlug("ne-postoji")).toBe(false);
  });

  it("offers edukacija in the brief in every language", () => {
    expect(isInquiryServiceSlug("edukacija")).toBe(true);
    expect(isInquiryServiceSlug("edukacija", "en")).toBe(true);
    expect(isInquiryServiceSlug("edukacija", "de")).toBe(true);
    expect(serviceTitles(["edukacija"])).toEqual(["Edukacija 1-na-1 (AI)"]);
  });

  it("keeps an unknown slug readable instead of dropping it", () => {
    const [first] = getInquiryServices();
    expect(serviceTitles([first.slug, "stara-usluga"])).toEqual([first.title, "stara-usluga"]);
  });
});
