import { describe, expect, it } from "vitest";

import {
  aiIndex,
  aiPagePath,
  aiPages,
  getAiIndex,
  getAiPage,
  getAiPageFor,
  getAiPages,
} from "@/content/site/aiPages";
import { projectCaseStudySlugs } from "@/data/projectCaseStudies";
import { serviceCatalog } from "@/data/serviceCatalog";
import { getAiPageUi } from "@/components/site/v4/aiPageCopy";
import { locales } from "@/lib/site-config";

/** Non-service internal routes a page may link to. Kept explicit so a typo in a
 *  related link fails here instead of shipping a 404. */
const KNOWN_STATIC_ROUTES = new Set([
  "/online-zakazivanje-za-salone-i-klinike",
  "/interni-softver-umesto-excel-tabela",
  "/ai-chatbot-za-sajt",
  "/cena-izrade-sajta",
]);

const serviceRoutes = new Set(serviceCatalog.map((s) => `/our-services/${s.slug}`));
const caseStudyRoutes = new Set(
  projectCaseStudySlugs.map((slug) => `/our-projects/${slug}`),
);

describe("aiPages", () => {
  it("has unique slugs", () => {
    const slugs = aiPages.map((page) => page.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves each slug through getAiPage", () => {
    for (const page of aiPages) {
      expect(getAiPage(page.slug)?.industry).toBe(page.industry);
    }
    expect(getAiPage("ne-postoji")).toBeUndefined();
  });

  it("uses kebab-case slugs without diacritics", () => {
    for (const page of aiPages) {
      expect(page.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("builds the path from the slug", () => {
    expect(aiPagePath("saloni-i-klinike")).toBe("/ai/saloni-i-klinike");
  });
});

describe("aiPages — answer engine surface", () => {
  it("opens with an answer long enough to stand alone and short enough to quote", () => {
    for (const page of aiPages) {
      expect(page.answer.length, page.slug).toBeGreaterThan(200);
      expect(page.answer.length, page.slug).toBeLessThan(800);
    }
    expect(aiIndex.answer.length).toBeGreaterThan(200);
  });

  it("keeps meta descriptions inside the length search engines render", () => {
    for (const page of aiPages) {
      expect(page.metaDescription.length, page.slug).toBeGreaterThan(70);
      expect(page.metaDescription.length, page.slug).toBeLessThanOrEqual(200);
    }
    expect(aiIndex.metaDescription.length).toBeGreaterThan(70);
    expect(aiIndex.metaDescription.length).toBeLessThanOrEqual(220);
  });

  it("gives every page keywords and a FAQ worth marking up", () => {
    for (const page of aiPages) {
      expect(page.keywords.length, page.slug).toBeGreaterThanOrEqual(4);
      expect(page.faq.length, page.slug).toBeGreaterThanOrEqual(3);
    }
    expect(aiIndex.faq.length).toBeGreaterThanOrEqual(3);
  });

  it("describes a full introduction process for the HowTo markup", () => {
    for (const page of aiPages) {
      expect(page.howTo.steps.length, page.slug).toBeGreaterThanOrEqual(4);
      for (const step of page.howTo.steps) {
        expect(step.name.length).toBeGreaterThan(0);
        expect(step.text.length).toBeGreaterThan(20);
      }
    }
  });
});

describe("aiPages — doorway guard", () => {
  it("gives every page tasks written for its own trade", () => {
    const seen = new Map<string, string>();
    for (const page of aiPages) {
      expect(page.tasks.length, page.slug).toBeGreaterThanOrEqual(4);
      for (const task of page.tasks) {
        const previous = seen.get(task.name);
        expect(previous, `"${task.name}" repeats on ${page.slug} and ${previous}`).toBeUndefined();
        seen.set(task.name, page.slug);
      }
    }
  });

  it("does not repeat a question verbatim across pages", () => {
    const seen = new Map<string, string>();
    for (const page of aiPages) {
      for (const item of page.faq) {
        const previous = seen.get(item.q);
        expect(previous, `"${item.q}" repeats on ${page.slug} and ${previous}`).toBeUndefined();
        seen.set(item.q, page.slug);
      }
    }
  });

  it("states problem, solution and deliverable for every task", () => {
    for (const page of aiPages) {
      for (const task of page.tasks) {
        expect(task.problem.length, `${page.slug}/${task.name}`).toBeGreaterThan(30);
        expect(task.solution.length, `${page.slug}/${task.name}`).toBeGreaterThan(30);
        expect(task.delivery.length, `${page.slug}/${task.name}`).toBeGreaterThan(15);
      }
    }
  });
});

describe("aiPages — links", () => {
  it("only links proof to case studies that exist", () => {
    for (const page of aiPages) {
      for (const proof of page.proof ?? []) {
        expect(caseStudyRoutes.has(proof.href), `${page.slug} → ${proof.href}`).toBe(true);
      }
    }
  });

  it("only links related services to real routes", () => {
    for (const page of aiPages) {
      expect(page.relatedServices.length, page.slug).toBeGreaterThanOrEqual(2);
      for (const service of page.relatedServices) {
        const known = serviceRoutes.has(service.href) || KNOWN_STATIC_ROUTES.has(service.href);
        expect(known, `${page.slug} → ${service.href}`).toBe(true);
      }
    }
  });

  it("labels a proof heading whenever there is proof", () => {
    for (const page of aiPages) {
      if (page.proof && page.proof.length > 0) {
        expect(page.proofHeading, page.slug).toBeTruthy();
      }
    }
  });
});

describe("aiPages — claim discipline", () => {
  // No client has sent a figure yet, so no page may imply one. When the numbers
  // arrive they belong in `proof` with a named client, not in body copy.
  const NUMERIC_CLAIM = /\b\d+\s?(%|posto|odsto)\b|\bza \d+\s?(puta|x)\b/i;

  it("makes no percentage or multiplier claims in prose", () => {
    for (const page of aiPages) {
      const prose = [
        page.lead,
        page.answer,
        ...page.tasks.flatMap((t) => [t.problem, t.solution, t.delivery]),
        ...page.sections.flatMap((s) => [...(s.body ?? []), ...(s.bullets ?? [])]),
        ...page.faq.map((f) => f.a),
      ];
      for (const text of prose) {
        expect(NUMERIC_CLAIM.test(text), `${page.slug}: "${text.slice(0, 80)}"`).toBe(false);
      }
    }
  });
});

describe("aiPages — localisation", () => {
  it("serves the same nine slugs in every locale", () => {
    const srSlugs = aiPages.map((p) => p.slug);
    for (const locale of locales) {
      expect(getAiPages(locale).map((p) => p.slug), locale).toEqual(srSlugs);
    }
  });

  it("resolves a slug in every locale", () => {
    for (const locale of locales) {
      const page = getAiPageFor("saloni-i-klinike", locale);
      expect(page, locale).toBeDefined();
      expect(getAiPageFor("ne-postoji", locale), locale).toBeUndefined();
    }
  });

  it("keeps task and step counts in step across locales", () => {
    for (const locale of locales) {
      for (const page of getAiPages(locale)) {
        const sr = getAiPage(page.slug);
        expect(sr, page.slug).toBeDefined();
        expect(page.tasks.length, `${locale}/${page.slug} tasks`).toBe(sr!.tasks.length);
        expect(page.howTo.steps.length, `${locale}/${page.slug} steps`).toBe(
          sr!.howTo.steps.length,
        );
        // The HowTo step anchors are rendered by index, so a locale with fewer
        // steps would emit JSON-LD urls pointing at ids that are not on the page.
        expect(page.proof?.length ?? 0, `${locale}/${page.slug} proof`).toBe(
          sr!.proof?.length ?? 0,
        );
      }
    }
  });

  it("translates every visible string away from the Serbian original", () => {
    for (const locale of locales) {
      if (locale === "sr") continue;
      for (const page of getAiPages(locale)) {
        const sr = getAiPage(page.slug)!;
        expect(page.h1, `${locale}/${page.slug}`).not.toBe(sr.h1);
        expect(page.answer, `${locale}/${page.slug}`).not.toBe(sr.answer);
        expect(page.metaDescription, `${locale}/${page.slug}`).not.toBe(sr.metaDescription);
      }
      const index = getAiIndex(locale);
      expect(index.h1, locale).not.toBe(aiIndex.h1);
      expect(index.answer, locale).not.toBe(aiIndex.answer);
    }
  });

  it("keeps the AEO surface intact in every locale", () => {
    for (const locale of locales) {
      for (const page of getAiPages(locale)) {
        expect(page.answer.length, `${locale}/${page.slug}`).toBeGreaterThan(200);
        expect(page.answer.length, `${locale}/${page.slug}`).toBeLessThan(900);
        expect(page.metaDescription.length, `${locale}/${page.slug}`).toBeGreaterThan(70);
        expect(page.metaDescription.length, `${locale}/${page.slug}`).toBeLessThanOrEqual(220);
        expect(page.faq.length, `${locale}/${page.slug}`).toBeGreaterThanOrEqual(3);
        expect(page.keywords.length, `${locale}/${page.slug}`).toBeGreaterThanOrEqual(4);
      }
    }
  });

  it("only links to routes that exist, in every locale", () => {
    for (const locale of locales) {
      for (const page of getAiPages(locale)) {
        for (const proof of page.proof ?? []) {
          expect(caseStudyRoutes.has(proof.href), `${locale} → ${proof.href}`).toBe(true);
        }
        for (const service of page.relatedServices) {
          const known = serviceRoutes.has(service.href) || KNOWN_STATIC_ROUTES.has(service.href);
          expect(known, `${locale} → ${service.href}`).toBe(true);
        }
      }
    }
  });

  it("applies the same claim discipline in every locale", () => {
    const NUMERIC_CLAIM = /\b\d+\s?(%|posto|odsto|Prozent|percent)\b|\b\d+\s?(puta|x|mal)\b/i;
    for (const locale of locales) {
      for (const page of getAiPages(locale)) {
        const prose = [
          page.lead,
          page.answer,
          ...page.tasks.flatMap((t) => [t.problem, t.solution, t.delivery]),
          ...page.sections.flatMap((s) => [...(s.body ?? []), ...(s.bullets ?? [])]),
          ...page.faq.map((f) => f.a),
        ];
        for (const text of prose) {
          expect(NUMERIC_CLAIM.test(text), `${locale}/${page.slug}: "${text.slice(0, 80)}"`).toBe(
            false,
          );
        }
      }
    }
  });
});

describe("aiPages — heading helper", () => {
  // Regression: the heading used to lower-case the industry, which reads fine in
  // Serbian and is a spelling error in German, where nouns are capitalised.
  it("keeps the industry name capitalised as written", () => {
    expect(getAiPageUi("de").faqHeading("Salons und Praxen")).toContain("Salons und Praxen");
    expect(getAiPageUi("en").faqHeading("Salons and clinics")).toContain("Salons and clinics");
    expect(getAiPageUi("sr").faqHeading("Saloni i klinike")).toContain("Saloni i klinike");
  });
});
