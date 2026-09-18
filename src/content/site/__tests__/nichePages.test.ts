import { describe, expect, it } from "vitest";

import { getNichePage, nichePages, nichePath } from "@/content/site/nichePages";
import { getInquiryServices } from "@/lib/inquiries/catalog";
import { getNavMenu } from "@/components/site/v4/navMenu";

describe("nichePages", () => {
  it("has unique slugs that resolve", () => {
    const slugs = nichePages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(getNichePage(slug)?.slug).toBe(slug);
  });

  it("keeps SEO fields within search-result limits", () => {
    for (const page of nichePages) {
      expect(page.seo.title.length, page.slug).toBeLessThanOrEqual(70);
      expect(page.seo.metaDescription.length, page.slug).toBeLessThanOrEqual(220);
      expect(page.seo.keywords.length, page.slug).toBeGreaterThanOrEqual(3);
      expect(page.faq.length, page.slug).toBeGreaterThanOrEqual(3);
    }
  });

  it("answers what the buyer pays for", () => {
    for (const page of nichePages) {
      expect(page.value.items.length, page.slug).toBeGreaterThanOrEqual(3);
      for (const item of page.value.items) expect(item.body.length, `${page.slug}: ${item.title}`).toBeGreaterThan(60);
    }
  });

  it("points every inquiry link at a service the picker knows", () => {
    const slugs = new Set(getInquiryServices("sr").map((service) => service.slug));
    for (const page of nichePages) expect(slugs.has(page.inquiryService), page.slug).toBe(true);
  });

  it("cites proof with a link", () => {
    for (const page of nichePages) {
      expect(page.proof.length, page.slug).toBeGreaterThan(0);
      for (const item of page.proof) {
        expect(item.href, `${page.slug}: ${item.name}`).toMatch(item.external ? /^https?:\/\// : /^\//);
      }
    }
  });

  it("is reachable from the Serbian navigation", () => {
    const hrefs = new Set(getNavMenu("sr").groups.flatMap((g) => g.items.map((i) => i.href)));
    for (const page of nichePages) expect(hrefs.has(nichePath(page.slug)), page.slug).toBe(true);
  });
});
