import type { LocaleCode } from "@/lib/site-config";

/**
 * Projects index copy per locale.
 *
 * The case studies themselves are Serbian and stay that way, so /en and /de
 * list the work in their own language and link into the Serbian write-up. That
 * is how a portfolio normally reads: the index is for the visitor, the case
 * study is the record.
 */

export type ProjectsChrome = {
  eyebrow: string;
  /** Two display lines of the page title; the dot is added by the component. */
  title: [string, string];
  intro: string;
  rowLink: string;
  cta: { title: string; text: string; button: string };
};

export type ProjectRowCopy = { category: string; outcome: string };

const chrome: Record<LocaleCode, ProjectsChrome> = {
  sr: {
    eyebrow: "Radovi / Case studies",
    title: ["SISTEMI KOJI", "RADE ZA KLIJENTE"],
    intro:
      "Ne screenshotovi za portfolio — produkcijski sistemi koji svakodnevno rade za realne firme. Svaki dovodi upite, prodaje ili štedi sate rada.",
    rowLink: "Pogledaj case study →",
    cta: {
      title: "Vaš sistem je sledeći.",
      text: "Ispričajte nam problem — vraćamo konkretan predlog i prototip za 48h.",
      button: "Zakaži besplatan poziv →",
    },
  },
  en: {
    eyebrow: "Work / Case studies",
    title: ["SYSTEMS THAT", "WORK FOR CLIENTS"],
    intro:
      "Not portfolio screenshots. These are production systems running every day for real companies, each one bringing in enquiries, selling, or saving hours of work. The case studies are written in Serbian.",
    rowLink: "Read the case study →",
    cta: {
      title: "Your system is next.",
      text: "Tell us the problem. You get a concrete proposal and a prototype within 48 hours.",
      button: "Book a free call →",
    },
  },
  de: {
    eyebrow: "Arbeiten / Case Studies",
    title: ["SYSTEME, DIE FÜR", "KUNDEN ARBEITEN"],
    intro:
      "Keine Portfolio-Screenshots. Das sind Produktivsysteme, die täglich für echte Firmen laufen und Anfragen bringen, verkaufen oder Arbeitsstunden sparen. Die Case Studies sind auf Serbisch verfasst.",
    rowLink: "Case Study lesen →",
    cta: {
      title: "Ihr System ist das nächste.",
      text: "Schildern Sie uns das Problem. Sie bekommen einen konkreten Vorschlag und einen Prototyp binnen 48 Stunden.",
      button: "Kostenloses Gespräch buchen →",
    },
  },
};

/** Per-project row text, keyed by case-study slug. */
const rows: Record<LocaleCode, Record<string, ProjectRowCopy>> = {
  sr: {},
  en: {
    "dr-igic-web-aplikacija-za-estetske-klinike": {
      category: "Booking + clinic",
      outcome: "Site, booking, admin calendar, Beauty Pass and analytics run as one system.",
    },
    "prevozkop-digitalni-prodajni-operativni-sistem": {
      category: "SEO + operations",
      outcome: "Public SEO site, lead CRM, quotes, products, staff, vehicles and deliveries.",
    },
    "santos-santorini-web-shop-admin-platforma": {
      category: "E-commerce",
      outcome: "Storefront, cart, checkout, CMS, admin, stock and marketplace integrations.",
    },
    "teachfromhome-onboarding-sistem-za-remote-nastavnike": {
      category: "Recruiting platform",
      outcome: "Google sign-in, audio applications, admin review, referrals and funnel analytics.",
    },
    "toza-ai-platforma-za-ai-video-studio": {
      category: "Billing + scheduling",
      outcome: "Packages, billing, hours on account, sessions, invoices and site content in one system.",
    },
    "dropz-tattoo-sajt-i-sistem-zakazivanja": {
      category: "WebGL + booking",
      outcome: "WebGL home page, enquiries with references, appointment calendar, deposits and a monthly billing view.",
    },
    "doctor-barber-online-booking-sistem": {
      category: "Booking system",
      outcome: "Public site, online booking, client account, admin calendar and notifications.",
    },
  },
  de: {
    "dr-igic-web-aplikacija-za-estetske-klinike": {
      category: "Buchung + Klinik",
      outcome: "Website, Buchung, Admin-Kalender, Beauty Pass und Auswertung laufen als ein System.",
    },
    "prevozkop-digitalni-prodajni-operativni-sistem": {
      category: "SEO + Betrieb",
      outcome: "Öffentliche SEO-Website, Lead-CRM, Angebote, Produkte, Mitarbeiter, Fahrzeuge und Lieferungen.",
    },
    "santos-santorini-web-shop-admin-platforma": {
      category: "E-Commerce",
      outcome: "Storefront, Warenkorb, Kasse, CMS, Admin, Lager und Marktplatz-Anbindungen.",
    },
    "teachfromhome-onboarding-sistem-za-remote-nastavnike": {
      category: "Recruiting-Plattform",
      outcome: "Google-Anmeldung, Audio-Bewerbungen, Admin-Prüfung, Empfehlungen und Funnel-Auswertung.",
    },
    "toza-ai-platforma-za-ai-video-studio": {
      category: "Abrechnung + Termine",
      outcome: "Pakete, Abrechnung, Stundenkonto, Termine, Rechnungen und Seiteninhalte in einem System.",
    },
    "dropz-tattoo-sajt-i-sistem-zakazivanja": {
      category: "WebGL + Buchung",
      outcome: "WebGL-Startseite, Anfragen mit Referenzen, Terminkalender, Anzahlungen und monatliche Abrechnungsübersicht.",
    },
    "doctor-barber-online-booking-sistem": {
      category: "Buchungssystem",
      outcome: "Öffentliche Website, Online-Terminbuchung, Kundenkonto, Admin-Kalender und Benachrichtigungen.",
    },
  },
};

export function getProjectsChrome(locale: LocaleCode): ProjectsChrome {
  return chrome[locale] ?? chrome.sr;
}

/** Translated row text, or undefined to keep the Serbian original. */
export function getProjectRowCopy(slug: string, locale: LocaleCode): ProjectRowCopy | undefined {
  return rows[locale]?.[slug];
}

export const PROJECT_ROWS_BY_LOCALE = rows;
