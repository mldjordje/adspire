import { describe, expect, it } from "vitest";

import { serviceCatalog, serviceSlugs } from "@/data/serviceCatalog";
import { serviceDetailDe } from "../serviceDetail.de";
import { serviceDetailEn } from "../serviceDetail.en";
import {
  getServiceDetailTranslation,
  hasFullServiceTranslations,
} from "../serviceDetail.i18n";

/**
 * /en/our-services and /de/our-services are indexed as whole subtrees (see
 * TRANSLATED_PREFIXES in src/lib/seo/metadata.ts). That is only honest while
 * every catalog slug has a translation — a new service added to the catalog
 * without one would silently publish a Serbian page as English or German.
 */

const locales = [
  ["en", serviceDetailEn],
  ["de", serviceDetailDe],
] as const;

describe("service detail translations", () => {
  it.each(locales)("covers every catalog slug in %s", (_locale, map) => {
    const missing = serviceSlugs.filter((slug) => !map[slug]);
    expect(missing).toEqual([]);
  });

  it.each(locales)("has no translation for a slug the catalog dropped (%s)", (_locale, map) => {
    const orphans = Object.keys(map).filter((slug) => !serviceSlugs.includes(slug));
    expect(orphans).toEqual([]);
  });

  it("reports full coverage for both prefixed locales", () => {
    expect(hasFullServiceTranslations(serviceSlugs, "en")).toBe(true);
    expect(hasFullServiceTranslations(serviceSlugs, "de")).toBe(true);
  });

  it.each(locales)("keeps every %s entry complete", (_locale, map) => {
    for (const slug of serviceSlugs) {
      const entry = map[slug];
      expect(entry.h1.length, slug).toBeGreaterThan(0);
      expect(entry.intro.length, slug).toBeGreaterThan(0);
      expect(entry.overview.length, slug).toBeGreaterThan(0);
      expect(entry.tags.length, slug).toBeGreaterThan(0);
      expect(entry.bestFor.length, slug).toBe(3);
      expect(entry.deliverables.length, slug).toBe(3);
      expect(entry.faq.length, slug).toBeGreaterThanOrEqual(5);
    }
  });

  it.each(locales)("names a real case study in every %s proof blurb", (_locale, map) => {
    for (const entry of serviceCatalog) {
      const translated = map[entry.slug];
      const titles = (entry.proof ?? []).map((p) => p.title);
      for (const key of Object.keys(translated.proofResults ?? {})) {
        expect(titles, `${entry.slug} proofResults`).toContain(key);
      }
    }
  });

  // The public price ranges were approved for the Serbian market only.
  it.each(locales)("quotes no prices in %s", (_locale, map) => {
    const priced: string[] = [];
    for (const [slug, entry] of Object.entries(map)) {
      const text = [
        entry.intro,
        entry.overview,
        ...entry.bestFor,
        ...entry.deliverables,
        ...entry.faq.flatMap((item) => [item.q, item.a]),
      ].join(" ");
      if (/\d[\d.,]*\s*(€|EUR|eur\b)/i.test(text)) priced.push(slug);
    }
    expect(priced).toEqual([]);
  });

  it("falls back to Serbian rather than inventing a translation", () => {
    expect(getServiceDetailTranslation("sistemi-za-zakazivanje", "sr")).toBeNull();
    expect(getServiceDetailTranslation("does-not-exist", "en")).toBeNull();
  });
});
