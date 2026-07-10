import { getSiteContent } from "@/content/site";
import { defaultLocale, type LocaleCode } from "@/lib/site-config";

/** Look up a service by slug from the localized site content. */
export function findServiceBySlug(slug: string, locale: LocaleCode = defaultLocale) {
  return getSiteContent(locale).servicesPage.items.find((item) => item.slug === slug) ?? null;
}
