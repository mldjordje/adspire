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

export function getInquiryServices(locale: LocaleCode = defaultLocale): InquiryService[] {
  return getSiteContent(locale).servicesPage.items.map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    bullets: item.bullets,
  }));
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
