import { describe, expect, it } from "vitest";

import { diasporaPage, DIASPORA_PATH } from "@/content/site/diasporaPage";
import { pricingGuidePage } from "@/content/site/pricingGuidePage";
import { guides } from "@/content/site/guides";
import { getNavMenu } from "@/components/site/v4/navMenu";

describe("diaspora page", () => {
  /**
   * The page repeats prices that are authored on /cena-izrade-sajta. Two
   * copies of a price list drift the first time one of them is edited, and the
   * cheaper-looking page is the one a buyer quotes back at you.
   */
  it("quotes only prices that the pricing page publishes", () => {
    const published = new Set(pricingGuidePage.ranges.map((range) => range.price));
    for (const row of diasporaPage.math.rows) {
      expect(published.has(row.price), `${row.label}: ${row.price}`).toBe(true);
    }
  });

  it("repeats those same prices in the quotable summary", () => {
    for (const row of diasporaPage.math.rows.slice(0, 2)) {
      // The summary is what an assistant lifts; if it disagrees with the table
      // below it, the page argues with itself in the answer.
      expect(diasporaPage.summary).toContain(row.price.split(" – ")[0]);
    }
  });

  /**
   * There is no EU client yet. The page is allowed to say how invoicing works;
   * it is not allowed to imply it has happened. This test pins the one FAQ
   * answer that states it outright, so a later edit cannot quietly drop it.
   */
  it("keeps the admission that there is no EU client yet", () => {
    const answers = diasporaPage.faq.map((item) => item.a).join(" ");
    expect(answers).toMatch(/prvog klijenta iz inostranstva tek tražimo/);
    expect(diasporaPage.proofLead).toMatch(/prvi klijent iz inostranstva tek dolazi/);
  });

  it("names no competitor's price", () => {
    // The argument is hours times the reader's own rate. A number attributed to
    // an agency abroad is unverifiable and was stripped from this site once.
    const text = JSON.stringify(diasporaPage);
    expect(text).not.toMatch(/nemačk\w+ agencij/i);
    expect(text).not.toMatch(/20\.000|20k/i);
  });

  it("keeps SEO fields within search-result limits", () => {
    expect(diasporaPage.seo.title.length).toBeLessThanOrEqual(70);
    expect(diasporaPage.seo.metaDescription.length).toBeLessThanOrEqual(220);
    expect(diasporaPage.faq.length).toBeGreaterThanOrEqual(5);
  });

  it("is reachable from the Serbian navigation", () => {
    const hrefs = new Set(getNavMenu("sr").groups.flatMap((g) => g.items.map((i) => i.href)));
    expect(hrefs.has(DIASPORA_PATH)).toBe(true);
  });

  it("ships alongside the guide it links to", () => {
    const paths = new Set(guides.map((guide) => guide.path));
    for (const link of diasporaPage.related) {
      if (link.href.startsWith("/saradnja")) expect(paths.has(link.href)).toBe(true);
    }
  });
});
