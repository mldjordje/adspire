import { getSiteContent } from "@/content/site";
import { defaultLocale, type LocaleCode } from "@/lib/site-config";

/**
 * The service catalogue behind the brief.
 *
 * Read from the same `servicesPage.items` that renders /our-services, so adding
 * a service there puts it in the picker without a second edit — and the slug in
 * /upit/<slug> is the slug in /our-services/<slug>.
 *
 * One brief can cover several services, so both routes that render the form —
 * /upit and /upit/[slug] — need the whole list, not only the one in the URL.
 */

export type InquiryService = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
};

/**
 * Offers that are sold through the brief but are not a build service, so they
 * have no /our-services page. Edukacija is quoted like any other upit and then
 * delivered as hours on the client's account.
 */
const EXTRA_SERVICES: Record<LocaleCode, InquiryService[]> = {
  sr: [
    {
      slug: "edukacija",
      title: "Edukacija 1-na-1 (AI)",
      summary: "Uživo, jedan na jedan: AI alati, automatizacija, sajt uz AI i AI za marketing.",
      bullets: ["Plan po tvojim zadacima", "Sati na nalogu, termine biraš sam", "Online preko Google Meet-a"],
    },
  ],
  en: [
    {
      slug: "edukacija",
      title: "1-on-1 AI training",
      summary: "Live, one to one: AI tools, automation, building with AI and AI for marketing.",
      bullets: ["Plan built on your own tasks", "Hours on your account, you pick the slots", "Online over Google Meet"],
    },
  ],
  de: [
    {
      slug: "edukacija",
      title: "1:1 KI-Schulung",
      summary: "Live und persönlich: KI-Tools, Automatisierung, Entwicklung mit KI und KI im Marketing.",
      bullets: ["Plan nach Ihren Aufgaben", "Stunden im Konto, Termine selbst wählen", "Online über Google Meet"],
    },
  ],
};

export function getInquiryServices(locale: LocaleCode = defaultLocale): InquiryService[] {
  const services = getSiteContent(locale).servicesPage.items.map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    bullets: item.bullets,
  }));
  return [...services, ...(EXTRA_SERVICES[locale] ?? EXTRA_SERVICES.sr)];
}

export function isInquiryServiceSlug(
  slug: string,
  locale: LocaleCode = defaultLocale,
): boolean {
  return getInquiryServices(locale).some((item) => item.slug === slug);
}

/** Titles for the slugs stored on an upit, in the order the buyer picked them.
 *  An unknown slug keeps its raw value rather than disappearing: a renamed
 *  service must not make an old brief unreadable in `/os`. */
export function serviceTitles(
  slugs: readonly string[],
  locale: LocaleCode = defaultLocale,
): string[] {
  const services = getInquiryServices(locale);
  return slugs.map((slug) => services.find((item) => item.slug === slug)?.title ?? slug);
}
