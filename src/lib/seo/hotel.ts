import { hotelCopy, HOTEL_PATH } from "@/content/site/hotel";
import { absoluteUrl, pageMetadata } from "./metadata";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "./jsonld";
import { localePath, type LocaleCode } from "@/lib/site-config";

export function hotelMetadata(locale: LocaleCode) {
  const t = hotelCopy[locale];
  return pageMetadata({ path: HOTEL_PATH, locale, title: t.title, description: t.description });
}
export function hotelJsonLd(locale: LocaleCode) {
  const t = hotelCopy[locale];
  const path = localePath(HOTEL_PATH, locale);
  return [
    webPageAboutOrganizationJsonLd(path, t.title, t.description, locale),
    { "@context": "https://schema.org", "@type": "Service", "@id": `${absoluteUrl(path)}#service`, name: t.title, description: t.intro, serviceType: t.title, url: absoluteUrl(path), provider: { "@id": `${absoluteUrl("/")}/#organization` }, availableChannel: { "@type": "ServiceChannel", serviceUrl: `${absoluteUrl(path)}#hotel-inquiry` } },
    breadcrumbJsonLd([{ name: t.home, path: localePath("/", locale) }, { name: t.title, path }]),
    faqPageJsonLd(t.faq, absoluteUrl(path)),
  ];
}
