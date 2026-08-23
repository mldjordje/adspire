import { defaultLocale, type LocaleCode } from "@/lib/site-config";
import { serviceDetailEn } from "./serviceDetail.en";
import { serviceDetailDe } from "./serviceDetail.de";

/**
 * Translations for the service detail pages.
 *
 * Serbian stays where it always was — in serviceCatalog.ts — because it is
 * also the source for JSON-LD, llms.txt and the metadata. This file only adds
 * what a non-Serbian visitor needs, keyed by the same slug.
 *
 * Prices are deliberately absent from the en/de answers. The public ranges
 * were approved for the Serbian market only; abroad the number goes in the
 * quote, not on the page.
 */

export type ServiceDetailTranslation = {
  h1: string;
  /** Hero intro under the title. */
  intro: string;
  /** The "what we solve" paragraph — the en/de counterpart of aiSummarySr. */
  overview: string;
  /** Focus chips in the side panel. */
  tags: string[];
  bestFor: string[];
  deliverables: string[];
  /** Case-study blurbs, keyed by the proof title in serviceCatalog. */
  proofResults?: Record<string, string>;
  faq: { q: string; a: string }[];
};

/** Section labels and CTAs around the translated body. */
export type ServiceDetailChrome = {
  eyebrow: string;
  overviewLabel: string;
  focusLabel: string;
  quoteCta: string;
  bestForTitle: string;
  deliverablesTitle: string;
  proofLabel: string;
  proofTitle: string;
  proofLink: string;
  faqTitle: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
};

const chrome: Record<LocaleCode, ServiceDetailChrome> = {
  sr: {
    eyebrow: "Usluga / Adspire Digital",
    overviewLabel: "Šta rešavamo",
    focusLabel: "Fokus",
    quoteCta: "Zatraži ponudu",
    bestForTitle: "Za koga ima smisla",
    deliverablesTitle: "Šta dobijate",
    proofLabel: "Dokazi iz produkcije",
    proofTitle: "Relevantni projekti",
    proofLink: "Pogledaj studiju slučaja →",
    faqTitle: "Najčešća pitanja",
    ctaTitle: "Da li je ovo prava usluga za vas?",
    ctaText: "Pošaljite nam cilj i trenutni problem. Vraćamo konkretan plan, rok i prvi prototip.",
    ctaButton: "Pošalji upit",
  },
  en: {
    eyebrow: "Service / Adspire Digital",
    overviewLabel: "What we solve",
    focusLabel: "Focus",
    quoteCta: "Request a quote",
    bestForTitle: "Who this is for",
    deliverablesTitle: "What you get",
    proofLabel: "Proof from production",
    proofTitle: "Relevant projects",
    proofLink: "Read the case study →",
    faqTitle: "Frequently asked questions",
    ctaTitle: "Is this the right service for you?",
    ctaText: "Send us the goal and the problem you have today. You get back a concrete plan, a timeline and a first prototype.",
    ctaButton: "Get in touch",
  },
  de: {
    eyebrow: "Leistung / Adspire Digital",
    overviewLabel: "Was wir lösen",
    focusLabel: "Fokus",
    quoteCta: "Angebot anfordern",
    bestForTitle: "Für wen das sinnvoll ist",
    deliverablesTitle: "Was Sie bekommen",
    proofLabel: "Belege aus der Produktion",
    proofTitle: "Passende Projekte",
    proofLink: "Fallstudie lesen →",
    faqTitle: "Häufige Fragen",
    ctaTitle: "Ist das die richtige Leistung für Sie?",
    ctaText: "Schicken Sie uns das Ziel und das heutige Problem. Sie bekommen einen konkreten Plan, einen Termin und einen ersten Prototyp.",
    ctaButton: "Kontakt aufnehmen",
  },
};

export function getServiceDetailChrome(locale: LocaleCode = defaultLocale): ServiceDetailChrome {
  return chrome[locale] ?? chrome[defaultLocale];
}

const translations: Partial<Record<LocaleCode, Record<string, ServiceDetailTranslation>>> = {
  en: serviceDetailEn,
  de: serviceDetailDe,
};

/**
 * Returns null for Serbian and for any slug without a translation — the caller
 * then falls back to the Serbian catalog rather than rendering an empty page.
 */
export function getServiceDetailTranslation(
  slug: string,
  locale: LocaleCode,
): ServiceDetailTranslation | null {
  if (locale === defaultLocale) return null;
  return translations[locale]?.[slug] ?? null;
}

/** True when every service the catalog knows about is translated for `locale`. */
export function hasFullServiceTranslations(slugs: string[], locale: LocaleCode): boolean {
  if (locale === defaultLocale) return true;
  const map = translations[locale];
  if (!map) return false;
  return slugs.every((slug) => Boolean(map[slug]));
}
