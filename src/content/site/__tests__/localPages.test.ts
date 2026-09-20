import { describe, expect, it } from "vitest";

import { localPages } from "@/content/site/localPages";
import { nisPresencePage } from "@/content/site/nisPresencePage";

/**
 * Local pages are the easiest thing on the site to turn into a doorway set:
 * copy the page, swap the service, ship six of them. Google filters exactly
 * that. These tests are the guard — each page has to carry its own words, its
 * own questions and its own proof, or it does not belong in the set.
 */
describe("localPages", () => {
  it("has unique paths", () => {
    const paths = localPages.map((page) => page.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("keeps SEO fields within search-result limits", () => {
    for (const page of localPages) {
      expect(page.title.length, page.path).toBeLessThanOrEqual(70);
      expect(page.metaDescription.length, page.path).toBeLessThanOrEqual(220);
      expect(page.keywords.length, page.path).toBeGreaterThanOrEqual(4);
      expect(page.faq.length, page.path).toBeGreaterThanOrEqual(4);
      expect(page.sections.length, page.path).toBeGreaterThanOrEqual(4);
    }
  });

  it("says Niš in the words a local buyer searches", () => {
    for (const page of localPages) {
      expect(page.h1, page.path).toMatch(/Niš/);
      expect(page.keywords.some((k) => /Niš/i.test(k)), page.path).toBe(true);
    }
  });

  it("does not repeat another page's lead or headings", () => {
    const leads = localPages.map((page) => page.lead);
    expect(new Set(leads).size).toBe(leads.length);

    const seen = new Map<string, string>();
    for (const page of localPages) {
      for (const section of page.sections) {
        const previous = seen.get(section.heading);
        expect(previous, `${page.path} repeats "${section.heading}" from ${previous}`).toBeUndefined();
        seen.set(section.heading, page.path);
      }
    }
  });

  it("asks a different question set on every page", () => {
    const questions = new Map<string, string>();
    for (const page of localPages) {
      for (const item of page.faq) {
        const previous = questions.get(item.q);
        expect(previous, `${page.path} repeats "${item.q}" from ${previous}`).toBeUndefined();
        questions.set(item.q, page.path);
      }
    }
  });

  it("writes answers long enough to be worth quoting", () => {
    for (const page of localPages) {
      for (const item of page.faq) {
        expect(item.a.length, `${page.path}: ${item.q}`).toBeGreaterThan(80);
      }
    }
  });

  it("links proof and calls to action inside the site", () => {
    for (const page of localPages) {
      for (const item of page.proof ?? []) {
        expect(item.href, `${page.path}: ${item.label}`).toMatch(/^\//);
      }
      expect(page.cta.href, page.path).toMatch(/^\//);
      expect(page.secondaryCta.href, page.path).toMatch(/^\//);
    }
  });

  it("is listed on the Niš entity page", () => {
    const linked = new Set<string>(nisPresencePage.siblings.map((item) => item.href));
    for (const page of localPages) {
      if (page.path === nisPresencePage.path) continue;
      expect(linked.has(page.path), page.path).toBe(true);
    }
  });
});
