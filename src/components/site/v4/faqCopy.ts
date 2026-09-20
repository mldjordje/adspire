import type { LocaleCode } from "@/lib/site-config";
import { FAQ_ITEMS } from "./faqData";

/**
 * FAQ copy per locale. The items are the same six questions in all three
 * languages, in the same order, because the route publishes them as FAQPage
 * JSON-LD — a translated page that answered different questions than its
 * Serbian original would describe itself wrongly to an answer engine.
 *
 * `faqCopy.test.ts` keeps the three lists in step.
 */

export type FaqItem = { q: string; a: string };

export type FaqCopy = {
  eyebrow: string;
  /** Two display lines of the page title; the dot is added by the component. */
  title: [string, string];
  intro: string;
  items: readonly FaqItem[];
  cta: { label: string; title: string; button: string };
};

const sr: FaqCopy = {
  eyebrow: "FAQ / Najcesca pitanja",
  title: ["PITANJA PRE", "PRVOG POZIVA"],
  intro:
    "Kratki odgovori o ceni, rokovima, procesu, AI automatizaciji i tome sta dobijate posle lansiranja.",
  items: FAQ_ITEMS,
  cta: {
    label: "Nema odgovora koji trazite?",
    title: "Posaljite kratak opis projekta.",
    button: "Kontaktiraj nas",
  },
};

const en: FaqCopy = {
  eyebrow: "FAQ / Common questions",
  title: ["QUESTIONS BEFORE", "THE FIRST CALL"],
  intro:
    "Short answers on price, timelines, process, AI automation and what you get after launch.",
  items: [
    {
      q: "How much does a website or an application cost?",
      a: "It depends on scope — a presentation site, a web shop and an internal application are not the same league. That is why we start with a free 30-minute call and a clickable prototype within 48 hours, and only then quote a price. You know exactly what you are paying for before you sign anything.",
    },
    {
      q: "How long does it take?",
      a: "Prototype in 48 hours. MVP in 2 weeks. A complete system usually 4–8 weeks, in sprints with a weekly demo — you see the progress every week.",
    },
    {
      q: "What is an internal application and how does it save me time?",
      a: "A tool cut to fit your team: scheduling, work orders, reports, records, invoices — everything you do by hand today through notebooks, Excel and phone calls. It typically gives owners and managers several hours a week back.",
    },
    {
      q: "Do you build AI integrations and automation?",
      a: "Yes — AI agents for scheduling, support and lead qualification, process automation through n8n and LLM integrations (Claude, GPT). The agent runs 24/7 and hands over to a person only what is genuinely complex.",
    },
    {
      q: "Do you work with companies outside Niš?",
      a: "Yes. Niš is our base, but we work with clients from all of Serbia, the region and Germany — meetings online, communication in Serbian, English or German.",
    },
    {
      q: "What do I get after launch?",
      a: "Measurement of results, maintenance, SEO and iterations. A site without measurement is a cost — our job is done when you see more enquiries or more hours saved, not when the site goes online.",
    },
  ],
  cta: {
    label: "Not finding your answer?",
    title: "Send a short description of your project.",
    button: "Get in touch",
  },
};

const de: FaqCopy = {
  eyebrow: "FAQ / Häufige Fragen",
  title: ["FRAGEN VOR", "DEM ERSTEN GESPRÄCH"],
  intro:
    "Kurze Antworten zu Preis, Terminen, Ablauf, KI-Automatisierung und dem, was Sie nach dem Launch bekommen.",
  items: [
    {
      q: "Was kostet eine Website oder eine Anwendung?",
      a: "Das hängt vom Umfang ab — eine Präsentationswebsite, ein Webshop und eine interne Anwendung sind nicht dieselbe Liga. Deshalb beginnen wir mit einem kostenlosen 30-Minuten-Gespräch und einem klickbaren Prototyp innerhalb von 48 Stunden, und erst danach nennen wir den Preis. Sie wissen genau, wofür Sie zahlen, bevor Sie irgendetwas unterschreiben.",
    },
    {
      q: "Wie lange dauert die Umsetzung?",
      a: "Prototyp in 48 Stunden. MVP in 2 Wochen. Ein komplettes System in der Regel 4–8 Wochen, in Sprints mit wöchentlicher Demo — Sie sehen den Fortschritt jede Woche.",
    },
    {
      q: "Was ist eine interne Anwendung und wie spart sie mir Zeit?",
      a: "Ein auf Ihr Team zugeschnittenes Werkzeug: Terminplanung, Aufträge, Berichte, Erfassung, Rechnungen — alles, was Sie heute von Hand über Hefte, Excel und Telefonate erledigen. Inhabern und Führungskräften gibt das typischerweise mehrere Stunden pro Woche zurück.",
    },
    {
      q: "Machen Sie KI-Integrationen und Automatisierung?",
      a: "Ja — KI-Agenten für Terminvergabe, Support und Lead-Qualifizierung, Prozessautomatisierung über n8n und LLM-Integrationen (Claude, GPT). Der Agent arbeitet rund um die Uhr und übergibt an einen Menschen nur das, was wirklich komplex ist.",
    },
    {
      q: "Arbeiten Sie auch mit Unternehmen außerhalb von Niš?",
      a: "Ja. Unsere Basis ist Niš, aber wir arbeiten mit Kunden aus ganz Serbien, der Region und Deutschland — Termine online, Kommunikation auf Serbisch, Englisch oder Deutsch.",
    },
    {
      q: "Was bekomme ich nach dem Launch?",
      a: "Messung der Ergebnisse, Wartung, SEO und Iterationen. Eine Website ohne Messung ist eine Ausgabe — unsere Arbeit endet, wenn Sie mehr Anfragen oder mehr eingesparte Stunden sehen, nicht wenn die Website online geht.",
    },
  ],
  cta: {
    label: "Ihre Antwort ist nicht dabei?",
    title: "Schicken Sie eine kurze Projektbeschreibung.",
    button: "Kontakt aufnehmen",
  },
};

const COPY: Record<LocaleCode, FaqCopy> = { sr, en, de };

export function getFaqCopy(locale: LocaleCode): FaqCopy {
  return COPY[locale] ?? sr;
}

export const FAQ_COPY_BY_LOCALE = COPY;
