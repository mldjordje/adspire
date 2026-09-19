import { describe, expect, it } from "vitest";

import { aeoPage, AEO_PATH } from "@/content/site/aeoPage";
import { getInquiryServices } from "@/lib/inquiries/catalog";
import { getNavMenu } from "@/components/site/v4/navMenu";

describe("AEO page", () => {
  it("keeps SEO fields within search-result limits", () => {
    expect(aeoPage.seo.title.length).toBeLessThanOrEqual(70);
    expect(aeoPage.seo.metaDescription.length).toBeLessThanOrEqual(220);
    expect(aeoPage.seo.keywords.length).toBeGreaterThanOrEqual(3);
    expect(aeoPage.faq.length).toBeGreaterThanOrEqual(5);
  });

  /**
   * The whole product is the method. A competitor reading this page must not
   * be able to reproduce the work from it, so the words that name a technique
   * are banned from the copy — the concrete scope goes in the quote instead.
   */
  it("never publishes the method", () => {
    const text = JSON.stringify(aeoPage);
    for (const term of ["llms.txt", "ai.txt", "schema", "JSON-LD", "strukturisan", "markup", "entitet", "speakable"]) {
      expect(text.toLowerCase(), `method leaked: ${term}`).not.toContain(term.toLowerCase());
    }
  });

  /**
   * Nobody can honestly promise what an assistant answers. The refusal to
   * promise it is the page's credibility, so it is pinned here rather than
   * left to survive the next copy edit.
   */
  it("refuses to promise a recommendation", () => {
    const answers = aeoPage.faq.map((item) => item.a).join(" ");
    expect(answers).toMatch(/[Nn]e, i niko ne može/);
    expect(aeoPage.summary).toMatch(/[Bb]ez garancije/);
    expect(aeoPage.honesty.items[0].title).toMatch(/[Nn]e garantujemo/);
  });

  /** There is no client case study for this service yet, and the page says so. */
  it("keeps the admission that the first system is our own site", () => {
    expect(aeoPage.proof.lead).toMatch(/[Nn]ema klijentske studije slučaja/);
    expect(aeoPage.proof.items.some((item) => item.name === "adspire.rs")).toBe(true);
  });

  it("names a real buyer sentence for every trade", () => {
    expect(aeoPage.niches.items.length).toBeGreaterThanOrEqual(5);
    for (const item of aeoPage.niches.items) {
      expect(item.question, item.trade).toMatch(/[?“]/);
      expect(item.gain.length, item.trade).toBeGreaterThan(60);
    }
  });

  /**
   * The self-test is the page's strongest sales move: it asks the reader to go
   * check in their own chat window. It must stay an instruction they can act
   * on, and its verdict must stay a conditional — "most firms in Serbia get no
   * result" is a statistic nobody measured, and this site does not publish
   * those.
   */
  it("tells the reader how to check for themselves, without inventing a statistic", () => {
    expect(aeoPage.selfTest.steps.length).toBeGreaterThanOrEqual(3);
    expect(aeoPage.selfTest.lead).toMatch(/ChatGPT|Gemini/);
    expect(aeoPage.selfTest.verdict).toMatch(/^Ako /);
    expect(aeoPage.selfTest.verdict).not.toMatch(/[Vv]ećina|\d+\s?%|[Vv]iše od/);
  });

  /** The hero numbers frame the opportunity; none may pose as a client result. */
  it("keeps the hero numbers free of client results", () => {
    expect(aeoPage.heroStats).toHaveLength(4);
    const text = aeoPage.heroStats.map((s) => `${s.value} ${s.label}`).join(" ");
    expect(text).not.toMatch(/klijen|upit[ae]? više|rast|puta više/i);
  });

  /** The free first step is the reason a cold reader sends the form at all. */
  it("puts the free first step in the hero", () => {
    expect(aeoPage.hero.note).toMatch(/[Bb]esplat/);
    expect(aeoPage.phases[0].items.join(" ")).toMatch(/ne isplati/);
  });

  it("points the inquiry link at a service the picker knows", () => {
    const slugs = new Set(getInquiryServices("sr").map((service) => service.slug));
    const slug = new URL(aeoPage.cta.primary.href, "https://adspire.rs").searchParams.get("usluga")!;
    expect(slugs.has(slug), slug).toBe(true);
  });

  it("is reachable from the Serbian navigation", () => {
    const hrefs = new Set(getNavMenu("sr").groups.flatMap((g) => g.items.map((i) => i.href)));
    expect(hrefs.has(AEO_PATH)).toBe(true);
  });
});
