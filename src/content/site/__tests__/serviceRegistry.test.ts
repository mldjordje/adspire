import { describe, expect, it } from "vitest";

import { getSiteContent } from "@/content/site";
import { serviceCatalog, serviceSlugs } from "@/data/serviceCatalog";
import { findServiceBySlug } from "@/lib/services";
import { locales } from "@/lib/site-config";

/**
 * A service is described in two places: serviceCatalog.ts (SEO, schema,
 * llms.txt) and the servicesPage items in sr/en/de (the card and the page
 * body). /our-services/[slug] needs BOTH and calls notFound() when either is
 * missing.
 *
 * That failure is silent in the worst possible way: generateStaticParams reads
 * the catalog, so the route is generated and lands in the sitemap, and then
 * serves a 404 to everyone including the crawlers the sitemap invited. Two new
 * services shipped exactly that way before this test existed.
 */

describe("service registry", () => {
  it("resolves every catalog slug to a real page", () => {
    const missing = serviceSlugs.filter((slug) => !findServiceBySlug(slug));
    expect(missing, "in the catalog but not in servicesPage — these 404").toEqual([]);
  });

  it("has no page item without a catalog entry", () => {
    const items = getSiteContent("sr").servicesPage.items;
    const orphans = items.map((item) => item.slug).filter((slug) => !serviceSlugs.includes(slug));
    expect(orphans, "on the services page but missing SEO and schema data").toEqual([]);
  });

  it("keeps the localized service lists index-aligned", () => {
    // en.ts and de.ts build their items by mapping over the Serbian array and
    // indexing a parallel translation array, so a service added to one side
    // only would throw at import or silently mistranslate a card.
    const sr = getSiteContent("sr").servicesPage.items;
    for (const locale of locales) {
      const items = getSiteContent(locale).servicesPage.items;
      expect(items.length, locale).toBe(sr.length);
      expect(items.map((item) => item.slug), locale).toEqual(sr.map((item) => item.slug));
      for (const item of items) {
        expect(item.title.length, `${locale}/${item.slug}`).toBeGreaterThan(0);
        expect(item.summary.length, `${locale}/${item.slug}`).toBeGreaterThan(0);
        expect(item.bullets.length, `${locale}/${item.slug}`).toBeGreaterThan(0);
      }
    }
  });

  it("points every service href at its own route", () => {
    for (const item of getSiteContent("sr").servicesPage.items) {
      // The hotel system is catalogued like any other service but lives on its
      // own landing page, so it is the one allowed exception.
      if (item.slug === "hotelski-rezervacioni-sistem") continue;
      expect(item.href, item.slug).toBe(`/our-services/${item.slug}`);
    }
  });

  it("gives every catalog entry the fields the schema and llms.txt read", () => {
    for (const entry of serviceCatalog) {
      expect(entry.metaDescriptionSr.length, entry.slug).toBeGreaterThan(0);
      expect(entry.keywordSr.length, entry.slug).toBeGreaterThan(0);
      expect(entry.aiSummarySr.length, entry.slug).toBeGreaterThan(0);
      expect(entry.faqItems.length, entry.slug).toBeGreaterThanOrEqual(3);
    }
  });
});
