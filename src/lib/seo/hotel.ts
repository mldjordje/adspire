import { hotelCopy, HOTEL_PATH } from "@/content/site/hotel";
import { absoluteUrl, pageMetadata } from "./metadata";
import { breadcrumbJsonLd, faqPageJsonLd, SCHEMA_LANG, translationRefs, webPageAboutOrganizationJsonLd } from "./jsonld";
import { localePath, type LocaleCode } from "@/lib/site-config";
import { orgRef } from "./ids";
import { serviceAreaServed } from "./site";

export function hotelMetadata(locale: LocaleCode) {
  const t = hotelCopy[locale];
  return pageMetadata({ path: HOTEL_PATH, locale, title: t.title, description: t.description });
}
export function hotelJsonLd(locale: LocaleCode) {
  const t = hotelCopy[locale];
  const path = localePath(HOTEL_PATH, locale);
  return [
    {
      ...webPageAboutOrganizationJsonLd(path, t.title, t.description, {
        inLanguage: SCHEMA_LANG[locale],
        mainEntity: `${absoluteUrl(path)}#service`,
      }),
      ...translationRefs(HOTEL_PATH, locale),
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${absoluteUrl(path)}#service`,
      name: t.title,
      description: t.intro,
      serviceType: t.title,
      url: absoluteUrl(path),
      provider: orgRef(),
      areaServed: serviceAreaServed(),
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${absoluteUrl(path)}#hotel-inquiry`,
      },
    },
    breadcrumbJsonLd([{ name: t.home, path: localePath("/", locale) }, { name: t.title, path }]),
    faqPageJsonLd(t.faq, absoluteUrl(path)),
  ];
}
