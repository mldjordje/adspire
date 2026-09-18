import { describe, expect, it } from "vitest";

import { glossaryAsGuide, glossaryGroups, glossaryPage, glossaryTerms } from "@/content/site/glossary";
import { glossaryJsonLd, glossaryTermId } from "@/lib/seo/glossary";
import { serviceCatalog } from "@/data/serviceCatalog";
import { HOTEL_PATH } from "@/content/site/hotel";

type Node = Record<string, unknown>;

/**
 * The glossary exists to be quoted. A definition that only makes sense with the
 * rest of the page around it is worthless to an assistant, and a term that
 * points at a service route which does not exist sends a reader to a 404 — so
 * both are checked here rather than discovered in production.
 */

const serviceRoutes = new Set([
  ...serviceCatalog.map((entry) => `/our-services/${entry.slug}`),
  HOTEL_PATH,
  "/ai-chatbot-za-sajt",
]);

describe("glossary", () => {
  it("has unique ids and terms", () => {
    const ids = glossaryTerms.map((term) => term.id);
    const names = glossaryTerms.map((term) => term.term);
    expect(new Set(ids).size, "duplicate id").toBe(ids.length);
    expect(new Set(names).size, "duplicate term").toBe(names.length);
  });

  it("uses kebab-case ids that can be a URL fragment", () => {
    for (const term of glossaryTerms) {
      expect(term.id, term.term).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("writes definitions that stand on their own", () => {
    for (const term of glossaryTerms) {
      // Long enough to actually define something, short enough to be lifted
      // whole into an answer.
      expect(term.definition.length, term.term).toBeGreaterThan(80);
      expect(term.definition.length, term.term).toBeLessThan(600);
      // A definition that opens with "It is..." needs the heading to make
      // sense, which is exactly what a quoted snippet loses.
      expect(term.definition.trimStart().startsWith("To je"), term.term).toBe(false);
    }
  });

  it("points every term at a service route that exists", () => {
    for (const term of glossaryTerms) {
      if (!term.service) continue;
      expect(serviceRoutes.has(term.service.href), `${term.term} → ${term.service.href}`).toBe(true);
    }
  });

  it("keeps the groups and the flat list in sync", () => {
    expect(glossaryTerms.length).toBe(glossaryGroups.reduce((n, g) => n + g.terms.length, 0));
    expect(glossaryGroups.every((group) => group.terms.length > 0)).toBe(true);
  });

  it("publishes every term as a DefinedTerm inside one set", () => {
    const nodes = glossaryJsonLd() as Node[];
    const set = nodes.find((node) => node["@type"] === "DefinedTermSet");
    expect(set, "no DefinedTermSet").toBeDefined();

    const terms = set!.hasDefinedTerm as Node[];
    expect(terms.length).toBe(glossaryTerms.length);
    expect(terms.map((t) => t["@id"])).toEqual(glossaryTerms.map((t) => glossaryTermId(t.id)));
    for (const term of terms) {
      expect(term.name, JSON.stringify(term["@id"])).toBeTruthy();
      expect(term.description, JSON.stringify(term["@id"])).toBeTruthy();
    }
  });

  it("marks the answer paragraph as speakable", () => {
    const nodes = glossaryJsonLd() as Node[];
    const page = nodes.find((node) => String(node["@type"]).endsWith("WebPage"));
    expect((page?.speakable as Node)?.cssSelector).toEqual(["[data-answer]"]);
  });

  it("keeps the page metadata inside search-result limits", () => {
    expect(glossaryPage.metaDescription.length).toBeGreaterThan(70);
    expect(glossaryPage.metaDescription.length).toBeLessThanOrEqual(200);
    expect(glossaryPage.answer.length).toBeGreaterThan(200);
    expect(glossaryPage.answer.length).toBeLessThan(800);
  });

  it("renders through the guide layout with a section per term", () => {
    const guide = glossaryAsGuide();
    expect(guide.path).toBe(glossaryPage.path);
    expect(guide.sections.length).toBe(glossaryTerms.length);
    expect(guide.faq.length).toBeGreaterThanOrEqual(3);
    for (const section of guide.sections) {
      expect(section.heading.length).toBeGreaterThan(0);
      expect(section.body?.length ?? 0).toBeGreaterThan(0);
    }
  });
});
