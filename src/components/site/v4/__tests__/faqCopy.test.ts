import { describe, expect, it } from "vitest";

import { FAQ_ITEMS } from "../faqData";
import { FAQ_COPY_BY_LOCALE, getFaqCopy } from "../faqCopy";
import { isTranslatedPath } from "@/lib/seo/metadata";
import { locales } from "@/lib/site-config";

/**
 * /faq is listed in TRANSLATED_PATHS, so /en/faq and /de/faq are indexed and
 * carry hreflang. That is only honest while all three locales answer the same
 * questions — the route publishes them as FAQPage JSON-LD, and a translation
 * that dropped or invented a question would describe the page wrongly to an
 * answer engine.
 */

describe("FAQ copy", () => {
  it("is declared translated, which is what makes /en/faq indexable", () => {
    expect(isTranslatedPath("/faq")).toBe(true);
  });

  it("covers every locale", () => {
    for (const locale of locales) {
      expect(FAQ_COPY_BY_LOCALE[locale]).toBeDefined();
    }
  });

  it("answers the same questions in every locale, in the same order", () => {
    for (const locale of locales) {
      expect(getFaqCopy(locale).items).toHaveLength(FAQ_ITEMS.length);
    }
  });

  it("leaves no answer empty or untranslated from the Serbian original", () => {
    const sr = getFaqCopy("sr").items;
    for (const locale of locales) {
      if (locale === "sr") continue;
      const items = getFaqCopy(locale).items;
      items.forEach((item, i) => {
        expect(item.q.trim().length).toBeGreaterThan(0);
        expect(item.a.trim().length).toBeGreaterThan(0);
        expect(item.q).not.toBe(sr[i].q);
        expect(item.a).not.toBe(sr[i].a);
      });
    }
  });

  it("keeps the Serbian list pointing at the shared FAQ source", () => {
    expect(getFaqCopy("sr").items).toBe(FAQ_ITEMS);
  });
});
