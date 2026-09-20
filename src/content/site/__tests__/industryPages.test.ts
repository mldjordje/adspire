import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { industryPages, industryPath, industrySectorLabels } from "@/content/site/industries";
import { nichePages } from "@/content/site/nichePages";
import { bookingIndustryPages } from "@/content/site/bookingIndustryPages";
import { serviceCatalog } from "@/data/serviceCatalog";

const appDir = join(process.cwd(), "src", "app");

/** Sentences, normalised enough that punctuation and casing do not hide a copy. */
function sentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.toLowerCase().replace(/[^0-9a-zà-ž ]/g, "").replace(/\s+/g, " ").trim())
    .filter((s) => s.split(" ").length >= 6);
}

/** Every sentence a page puts in front of a reader. */
function pageProse(page: (typeof industryPages)[number]) {
  const layers = Object.values(page.layers);
  return [
    page.hero.lead,
    page.summary,
    ...page.dayInTheLife.flatMap((item) => [item.title, item.body]),
    ...layers.flatMap((layer) => [layer.lead, ...layer.items.flatMap((i) => [i.title, i.body])]),
    ...page.compliance.flatMap((item) => [item.title, item.body]),
    page.value.lead,
    ...page.value.items.flatMap((item) => [item.title, item.body]),
    ...page.faq.flatMap((item) => [item.q, item.a]),
  ].flatMap(sentences);
}

describe("industryPages", () => {
  it("has unique slugs", () => {
    const slugs = industryPages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("does not collide with a niche or booking page slug", () => {
    const taken = new Set([
      ...nichePages.map((p) => p.slug),
      ...bookingIndustryPages.map((p) => p.slug),
    ]);
    for (const page of industryPages) expect(taken.has(page.slug), page.slug).toBe(false);
  });

  it("has a generated route for every page", () => {
    for (const page of industryPages) {
      expect(existsSync(join(appDir, page.slug, "page.tsx")), `npm run gen:industries — /${page.slug}`).toBe(true);
    }
  });

  it("points at an inquiry service that exists", () => {
    const slugs = new Set(serviceCatalog.map((s) => s.slug));
    for (const page of industryPages) expect(slugs.has(page.inquiryService), page.slug).toBe(true);
  });

  it("uses a known sector", () => {
    for (const page of industryPages) expect(industrySectorLabels[page.sector], page.slug).toBeTruthy();
  });

  it("fills all four delivery layers", () => {
    for (const page of industryPages) {
      for (const [name, layer] of Object.entries(page.layers)) {
        expect(layer.lead.length, `${page.slug} · ${name}`).toBeGreaterThan(40);
        expect(layer.items.length, `${page.slug} · ${name}`).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("carries enough substance to deserve a page", () => {
    for (const page of industryPages) {
      expect(page.dayInTheLife.length, page.slug).toBeGreaterThanOrEqual(3);
      expect(page.faq.length, page.slug).toBeGreaterThanOrEqual(5);
      expect(page.audience.length, page.slug).toBeGreaterThanOrEqual(2);
      expect(page.value.items.length, page.slug).toBeGreaterThanOrEqual(3);
      expect(page.seo.keywords.length, page.slug).toBeGreaterThanOrEqual(4);
      // The summary is what a search snippet and an AI answer lift verbatim.
      expect(page.summary.length, page.slug).toBeGreaterThan(220);
    }
  });

  it("keeps metadata inside what search engines render", () => {
    for (const page of industryPages) {
      expect(page.seo.title.length, page.slug).toBeLessThanOrEqual(65);
      expect(page.seo.metaDescription.length, page.slug).toBeGreaterThan(120);
    }
  });

  it("links related pages that exist on this site", () => {
    for (const page of industryPages) {
      expect(page.related.length, page.slug).toBeGreaterThanOrEqual(2);
      for (const item of page.related) expect(item.href.startsWith("/"), `${page.slug} → ${item.href}`).toBe(true);
    }
  });

  it("makes no public price claim", () => {
    for (const page of industryPages) {
      const prose = pageProse(page).join(" ");
      expect(prose, page.slug).not.toMatch(/\d\s?(?:€|eur|rsd|din)\b/i);
    }
  });

  /**
   * The guard the whole plan rests on.
   *
   * A set of pages built from one template with the trade name swapped in is
   * what Google calls scaled content abuse, and the penalty lands on the domain
   * rather than on the page. So no two industry pages may share more than a
   * couple of full sentences, and the shared ones are allowed only because
   * short section leads legitimately repeat a framing.
   */
  it("does not repeat itself across industries", () => {
    const byPage = industryPages.map((page) => ({ slug: page.slug, lines: new Set(pageProse(page)) }));

    for (let i = 0; i < byPage.length; i += 1) {
      for (let j = i + 1; j < byPage.length; j += 1) {
        const a = byPage[i];
        const b = byPage[j];
        const shared = Array.from(a.lines).filter((line) => b.lines.has(line));
        const ratio = shared.length / Math.min(a.lines.size, b.lines.size);
        expect(
          ratio,
          `${a.slug} ↔ ${b.slug} dele ${shared.length} rečenica: ${shared.slice(0, 3).join(" | ")}`,
        ).toBeLessThan(0.05);
      }
    }
  });

  it("builds a path from the slug", () => {
    for (const page of industryPages) expect(industryPath(page.slug)).toBe(`/${page.slug}`);
  });
});
