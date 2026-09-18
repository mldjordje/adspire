import { hotelCopy, HOTEL_PATH, HOTEL_SLUG } from "@/content/site/hotel";
import { absoluteUrl, pageMetadata } from "./metadata";
import { breadcrumbJsonLd, faqPageJsonLd, SCHEMA_LANG, translationRefs, webPageAboutOrganizationJsonLd } from "./jsonld";
import { localePath, type LocaleCode } from "@/lib/site-config";
import { softwareProductJsonLd } from "./products";
import { productId } from "./ids";

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
        mainEntity: productId(absoluteUrl(path)),
      }),
      ...translationRefs(HOTEL_PATH, locale),
    },
    // The system is a named product, not only a service we perform. An
    // assistant asked "who makes a hotel booking system" matches a product.
    softwareProductJsonLd({
      path,
      name: t.title,
      description: t.intro,
      category: "BusinessApplication",
      // What it does, plus what it replaces — the second half is the part a
      // buyer (and an assistant answering "is it worth it") asks about.
      featureList: [...t.phases.flatMap((phase) => phase.items), ...t.valueItems.map((item) => item.title)],
      audience: "Hoteli, apartmani i smeštajni objekti",
      serviceSlug: HOTEL_SLUG,
      inLanguage: SCHEMA_LANG[locale],
    }),
    { "@context": "https://schema.org", "@type": "Service", "@id": `${absoluteUrl(path)}#service`, name: t.title, description: t.intro, serviceType: t.title, url: absoluteUrl(path), provider: { "@id": `${absoluteUrl("/")}/#organization` }, availableChannel: { "@type": "ServiceChannel", serviceUrl: `${absoluteUrl(path)}#hotel-inquiry` } },
    breadcrumbJsonLd([{ name: t.home, path: localePath("/", locale) }, { name: t.title, path }]),
    faqPageJsonLd(t.faq, absoluteUrl(path)),
  ];
}
