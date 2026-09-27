import { describe, expect, it } from "vitest";
import { guides } from "../guides";
import {
  adsOrSeoGuide,
  aiClientDataGuide,
  appOrWebAppGuide,
  appointmentReminderGuide,
  bookingPlatformChoiceGuide,
  cardPaymentsGuide,
  portalCmsGuide,
  instagramOrSiteGuide,
  sefInvoicesGuide,
  webShopLegalGuide,
} from "../guidesAnswers";
import {
  appointmentNoShowGuide,
  modernWebsiteMustHavesGuide,
  webShopNotSellingGuide,
} from "../guidesGeo";
import {
  appointmentNoShowGuideDe,
  modernWebsiteMustHavesGuideDe,
  webShopNotSellingGuideDe,
} from "../guidesGeo.de";
import {
  appointmentNoShowGuideEn,
  modernWebsiteMustHavesGuideEn,
  webShopNotSellingGuideEn,
} from "../guidesGeo.en";
import { guideMetadata } from "@/lib/seo/guide";

const answerGuides = [
  portalCmsGuide,
  bookingPlatformChoiceGuide,
  appointmentReminderGuide,
  appOrWebAppGuide,
  cardPaymentsGuide,
  webShopLegalGuide,
  aiClientDataGuide,
  sefInvoicesGuide,
  adsOrSeoGuide,
  instagramOrSiteGuide,
  webShopNotSellingGuide,
  appointmentNoShowGuide,
  modernWebsiteMustHavesGuide,
];

describe("guides", () => {
  it("have unique paths", () => {
    const paths = guides.map((g) => g.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("only name related guides that exist", () => {
    const paths = new Set(guides.map((g) => g.path));
    for (const guide of guides) {
      for (const path of guide.related ?? []) {
        expect(paths.has(path), `${guide.path} → ${path}`).toBe(true);
        expect(path, guide.path).not.toBe(guide.path);
      }
    }
  });

  // The lead carries data-answer and is what an answer engine quotes; past
  // about sixty words it stops being an answer and gets cut mid-sentence.
  it("open the answer guides with a quotable lead", () => {
    for (const guide of answerGuides) {
      const words = guide.lead.trim().split(/\s+/).length;
      expect(words, guide.path).toBeLessThanOrEqual(60);
      expect(guide.updated, guide.path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(guide.faq.length, guide.path).toBeGreaterThanOrEqual(4);
    }
  });

  // Adspire does not build free booking systems; the page competes on
  // ownership and fit, never on price zero.
  it("never pitch the booking comparison as free", () => {
    const text = JSON.stringify(bookingPlatformChoiceGuide).toLowerCase();
    expect(text).not.toMatch(/besplatn/);
  });

  it("never emit noindex on translated guides", () => {
    const deGuides = [webShopNotSellingGuideDe, appointmentNoShowGuideDe, modernWebsiteMustHavesGuideDe];
    for (const g of deGuides) {
      const meta = guideMetadata(g, "de");
      expect(meta.robots, g.path).toBeUndefined();
    }
    const enGuides = [webShopNotSellingGuideEn, appointmentNoShowGuideEn, modernWebsiteMustHavesGuideEn];
    for (const g of enGuides) {
      const meta = guideMetadata(g, "en");
      expect(meta.robots, g.path).toBeUndefined();
    }
  });
});
