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
 * delivered as hours on the client's account; the video service is quoted per
 * campaign, because a month of clips for a salon and for a hotel are not the
 * same job.
 */
const EXTRA_SERVICES: Record<LocaleCode, InquiryService[]> = {
  sr: [
    {
      slug: "edukacija",
      title: "Edukacija 1-na-1: viralni AI video",
      summary: "Uživo, jedan na jedan: ideja i hook, generisanje scena AI alatima, montaža i objava.",
      bullets: ["Plan po tvojim temama", "Sati na nalogu, termine biraš sam", "Online preko Google Meet-a"],
    },
    {
      slug: "ai-video",
      title: "AI video klipovi za tvoj biznis",
      summary: "Mi pravimo kratke klipove za tvoj posao — ti odobravaš i objavljuješ.",
      bullets: ["Ideja, scenario i montaža", "Formati za TikTok, Reels i Shorts", "Mesečno ili jednokratno"],
    },
  ],
  en: [
    {
      slug: "edukacija",
      title: "1-on-1 training: viral AI video",
      summary: "Live, one to one: idea and hook, generating scenes with AI tools, editing and publishing.",
      bullets: ["Plan built on your own topics", "Hours on your account, you pick the slots", "Online over Google Meet"],
    },
    {
      slug: "ai-video",
      title: "AI video clips for your business",
      summary: "We make the short clips for your business — you approve and publish.",
      bullets: ["Idea, script and editing", "Formats for TikTok, Reels and Shorts", "Monthly or one-off"],
    },
  ],
  de: [
    {
      slug: "edukacija",
      title: "1:1 Schulung: virale KI-Videos",
      summary: "Live und persönlich: Idee und Hook, Szenen mit KI-Tools, Schnitt und Veröffentlichung.",
      bullets: ["Plan nach Ihren Themen", "Stunden im Konto, Termine selbst wählen", "Online über Google Meet"],
    },
    {
      slug: "ai-video",
      title: "KI-Videoclips für Ihr Unternehmen",
      summary: "Wir produzieren die Kurzclips für Ihr Unternehmen — Sie geben frei.",
      bullets: ["Idee, Skript und Schnitt", "Formate für TikTok, Reels und Shorts", "Monatlich oder einmalig"],
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
