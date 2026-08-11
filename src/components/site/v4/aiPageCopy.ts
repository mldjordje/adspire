import { defaultLocale, type LocaleCode } from "@/lib/site-config";

/**
 * Section headings and CTA labels for the AI pages.
 *
 * Kept out of aiPages*.ts because these are chrome, not content — repeating
 * them inside nine page objects per locale would be twenty-seven chances to
 * introduce a heading that differs for no reason.
 */

export type AiPageUi = {
  tasksHeading: string;
  /**
   * The industry name is interpolated as written. Lower-casing it would read
   * naturally in Serbian and mangle German, where nouns are capitalised —
   * "Häufige Fragen — salons und praxen" is a spelling error, not a style.
   */
  faqHeading: (industry: string) => string;
  indexFaqHeading: string;
  chooseIndustryHeading: string;
  ctaPrimary: string;
  ctaSecondary: string;
  relatedServices: string;
  otherIndustries: string;
  related: string;
  labelProblem: string;
  labelSolution: string;
  labelDelivery: string;
};

const sr: AiPageUi = {
  tasksHeading: "Šta se konkretno automatizuje",
  faqHeading: (industry) => `Česta pitanja — ${industry}`,
  indexFaqHeading: "Česta pitanja",
  chooseIndustryHeading: "Izaberi delatnost",
  ctaPrimary: "Pošalji upit",
  ctaSecondary: "Zakaži razgovor",
  relatedServices: "Povezane usluge:",
  otherIndustries: "Druge delatnosti:",
  related: "Vezano:",
  labelProblem: "Problem",
  labelSolution: "Rešenje",
  labelDelivery: "Isporuka",
};

const en: AiPageUi = {
  tasksHeading: "What actually gets automated",
  faqHeading: (industry) => `FAQ — ${industry}`,
  indexFaqHeading: "Frequently asked",
  chooseIndustryHeading: "Pick your industry",
  ctaPrimary: "Send an enquiry",
  ctaSecondary: "Book a call",
  relatedServices: "Related services:",
  otherIndustries: "Other industries:",
  related: "Related:",
  labelProblem: "Problem",
  labelSolution: "Solution",
  labelDelivery: "Delivered",
};

const de: AiPageUi = {
  tasksHeading: "Was konkret automatisiert wird",
  faqHeading: (industry) => `Häufige Fragen — ${industry}`,
  indexFaqHeading: "Häufige Fragen",
  chooseIndustryHeading: "Branche wählen",
  ctaPrimary: "Anfrage senden",
  ctaSecondary: "Gespräch vereinbaren",
  relatedServices: "Passende Leistungen:",
  otherIndustries: "Weitere Branchen:",
  related: "Verwandt:",
  labelProblem: "Problem",
  labelSolution: "Lösung",
  labelDelivery: "Lieferumfang",
};

const byLocale: Record<LocaleCode, AiPageUi> = { sr, en, de };

export function getAiPageUi(locale: LocaleCode = defaultLocale): AiPageUi {
  return byLocale[locale] ?? byLocale[defaultLocale];
}
