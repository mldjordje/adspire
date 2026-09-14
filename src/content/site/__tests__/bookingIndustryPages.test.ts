import { describe, expect, it } from "vitest";

import { bookingProof } from "@/content/site/bookingLandingPage";
import {
  bookingIndustryPages,
  bookingIndustryPath,
  getBookingIndustryPage,
} from "@/content/site/bookingIndustryPages";
import { getNavMenu } from "@/components/site/v4/navMenu";

describe("bookingIndustryPages", () => {
  it("has unique slugs that resolve", () => {
    const slugs = bookingIndustryPages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(getBookingIndustryPage(slug)?.slug).toBe(slug);
  });

  it("only cites proof that exists on the booking landing", () => {
    const names = new Set(bookingProof.items.map((item) => item.name));
    for (const page of bookingIndustryPages) {
      expect(page.proof.length).toBeGreaterThan(0);
      for (const name of page.proof) expect(names.has(name), `${page.slug}: ${name}`).toBe(true);
    }
  });

  it("keeps SEO fields within search-result limits", () => {
    for (const page of bookingIndustryPages) {
      expect(page.seo.title.length, page.slug).toBeLessThanOrEqual(70);
      expect(page.seo.metaDescription.length, page.slug).toBeLessThanOrEqual(220);
      expect(page.faq.length, page.slug).toBeGreaterThanOrEqual(3);
    }
  });

  it("is reachable from the Serbian navigation", () => {
    const hrefs = new Set(getNavMenu("sr").groups.flatMap((g) => g.items.map((i) => i.href)));
    for (const page of bookingIndustryPages) expect(hrefs.has(bookingIndustryPath(page.slug))).toBe(true);
  });
});
