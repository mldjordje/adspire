import type { LocaleCode } from "@/lib/site-config";
import { MARKETS, SERVICES, type Market, type Service } from "@/lib/crm/types";

/**
 * Visible copy for ContactV4, keyed by locale. Field names, enum values and
 * the payload sent to /api/leads stay locale-independent — only labels change.
 */

export type ContactCopy = {
  eyebrow: string;
  title: [string, string];
  intro: string;
  channels: { email: string; phone: string; location: string; languages: string };
  locationValue: string;
  steps: string[];
  /** Cross-link to the brief at /upit: this page is for questions, that one is
   *  the path to a written quote. */
  briefCta: { label: string; body: string };
  labels: {
    fullName: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    market: string;
    budget: string;
    timeline: string;
    message: string;
    messagePlaceholder: string;
    skip: string;
  };
  services: Record<Service, string>;
  markets: Record<Market, string>;
  budgets: string[];
  timelines: string[];
  consent: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
};

const sr: ContactCopy = {
  eyebrow: "Kontakt / Hajde da počnemo",
  title: ["RECI CILJ,", "VRAĆAMO PLAN"],
  intro:
    "Besplatan poziv od 30 minuta. Kažemo vam tačno šta bi vam donelo najviše klijenata ili uštedelo najviše vremena — pre nego što potrošite dinar.",
  channels: { email: "Email", phone: "Telefon", location: "Lokacija", languages: "Jezici" },
  locationValue: "Niš, Srbija",
  briefCta: {
    label: "Popuni upit →",
    body: "Znaš već šta ti treba? Upit daje konkretan brief — cena i rok stižu na mejl, bez naloga.",
  },
  steps: [
    "Javimo se u roku od 24h — bez auto-odgovora.",
    "Kratak poziv od 30 minuta da razumemo cilj i rok.",
    "Klikabilan prototip i jasna cena — pre ugovora.",
  ],
  labels: {
    fullName: "Ime i prezime",
    company: "Firma",
    email: "Email",
    phone: "Telefon",
    service: "Šta vam treba?",
    market: "Gde poslujete?",
    budget: "Okvirni budžet",
    timeline: "Kada bi krenulo?",
    message: "O čemu se radi?",
    messagePlaceholder: "Šta pokušavate da rešite? Šta vas sada najviše koči?",
    skip: "Preskoči",
  },
  services: {
    booking: "Sistem za zakazivanje",
    "web-platform": "Web platforma / sajt",
    ecommerce: "Web shop",
    automation: "Automatizacija / AI",
    mobile: "Mobilna aplikacija",
    "white-label": "White-label za agenciju",
    other: "Nešto drugo",
  },
  markets: {
    rs: "Srbija / region",
    dach: "Nemačka, Austrija, Švajcarska",
    "white-label": "Agencija — tražim razvojnog partnera",
  },
  budgets: ["Još ne znam", "do 1.500 €", "1.500 – 4.000 €", "4.000 – 10.000 €", "preko 10.000 €"],
  timelines: ["Što pre", "1–3 meseca", "3–6 meseci", "Samo istražujem"],
  consent:
    "Saglasan sam da Adspire Digital čuva ove podatke radi odgovora na moj upit. Ne šaljemo newsletter i ne prosleđujemo podatke trećim licima.",
  submit: "Pošalji upit →",
  sending: "Šaljem…",
  success: "Stiglo je. Javljamo se u roku od 24h.",
  error: "Nešto nije prošlo. Piši direktno na djordje@adspire.rs.",
};

const en: ContactCopy = {
  eyebrow: "Contact / Let's start",
  title: ["TELL US THE GOAL,", "WE SEND A PLAN"],
  intro:
    "A free 30-minute call. We tell you exactly what would bring the most clients or save the most time — before you spend a cent.",
  channels: { email: "Email", phone: "Phone", location: "Location", languages: "Languages" },
  locationValue: "Niš, Serbia",
  briefCta: {
    label: "Send a brief →",
    body: "Already know what you need? The brief gets you a written price and timeline by email — no account.",
  },
  steps: [
    "We reply within 24h — no autoresponders.",
    "A short 30-minute call to understand the goal and the deadline.",
    "A clickable prototype and a clear price — before any contract.",
  ],
  labels: {
    fullName: "Full name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    service: "What do you need?",
    market: "Where do you operate?",
    budget: "Rough budget",
    timeline: "When would it start?",
    message: "What is it about?",
    messagePlaceholder: "What are you trying to solve? What is holding you back right now?",
    skip: "Skip",
  },
  services: {
    booking: "Booking system",
    "web-platform": "Web platform / website",
    ecommerce: "Online store",
    automation: "Automation / AI",
    mobile: "Mobile app",
    "white-label": "White-label for an agency",
    other: "Something else",
  },
  markets: {
    rs: "Serbia / the region",
    dach: "Germany, Austria, Switzerland",
    "white-label": "Agency — looking for a development partner",
  },
  budgets: [
    "Not sure yet",
    "up to €1,500",
    "€1,500 – €4,000",
    "€4,000 – €10,000",
    "over €10,000",
  ],
  timelines: ["As soon as possible", "1–3 months", "3–6 months", "Just exploring"],
  consent:
    "I agree that Adspire Digital may store this data in order to answer my enquiry. We send no newsletter and share no data with third parties.",
  submit: "Send enquiry →",
  sending: "Sending…",
  success: "Received. We'll get back to you within 24h.",
  error: "Something didn't go through. Write directly to djordje@adspire.rs.",
};

const de: ContactCopy = {
  eyebrow: "Kontakt / Auf geht's",
  title: ["NENNEN SIE DAS ZIEL,", "WIR LIEFERN DEN PLAN"],
  intro:
    "Ein kostenloses 30-Minuten-Gespräch. Wir sagen Ihnen genau, was die meisten Kunden bringt oder die meiste Zeit spart — bevor Sie einen Cent ausgeben.",
  channels: { email: "E-Mail", phone: "Telefon", location: "Standort", languages: "Sprachen" },
  locationValue: "Niš, Serbien",
  briefCta: {
    label: "Anfrage senden →",
    body: "Sie wissen schon, was Sie brauchen? Die Anfrage bringt Preis und Termin per E-Mail — ohne Konto.",
  },
  steps: [
    "Wir antworten innerhalb von 24 Stunden — ohne Autoresponder.",
    "Ein kurzes 30-Minuten-Gespräch zu Ziel und Termin.",
    "Klickbarer Prototyp und klarer Preis — vor dem Vertrag.",
  ],
  labels: {
    fullName: "Vor- und Nachname",
    company: "Firma",
    email: "E-Mail",
    phone: "Telefon",
    service: "Was brauchen Sie?",
    market: "Wo sind Sie tätig?",
    budget: "Ungefähres Budget",
    timeline: "Wann soll es losgehen?",
    message: "Worum geht es?",
    messagePlaceholder: "Was möchten Sie lösen? Was bremst Sie im Moment am meisten?",
    skip: "Überspringen",
  },
  services: {
    booking: "Buchungssystem",
    "web-platform": "Webplattform / Website",
    ecommerce: "Onlineshop",
    automation: "Automatisierung / KI",
    mobile: "Mobile App",
    "white-label": "White-Label für Agenturen",
    other: "Etwas anderes",
  },
  markets: {
    rs: "Serbien / Region",
    dach: "Deutschland, Österreich, Schweiz",
    "white-label": "Agentur — auf der Suche nach einem Entwicklungspartner",
  },
  budgets: [
    "Noch unklar",
    "bis 1.500 €",
    "1.500 – 4.000 €",
    "4.000 – 10.000 €",
    "über 10.000 €",
  ],
  timelines: ["So schnell wie möglich", "1–3 Monate", "3–6 Monate", "Ich schaue mich nur um"],
  consent:
    "Ich bin damit einverstanden, dass Adspire Digital diese Daten zur Beantwortung meiner Anfrage speichert. Wir versenden keinen Newsletter und geben keine Daten an Dritte weiter.",
  submit: "Anfrage senden →",
  sending: "Wird gesendet…",
  success: "Angekommen. Wir melden uns innerhalb von 24 Stunden.",
  error: "Etwas hat nicht geklappt. Schreiben Sie direkt an djordje@adspire.rs.",
};

const COPY: Record<LocaleCode, ContactCopy> = { sr, en, de };

export function getContactCopy(locale: LocaleCode): ContactCopy {
  return COPY[locale] ?? sr;
}

export { MARKETS, SERVICES };
