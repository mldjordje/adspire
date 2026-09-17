import { FOUNDER, ORGANIZATION, getOrgSameAs, getSiteUrl } from "@/lib/seo/site";
import { serviceCatalog, type ServiceCatalogEntry } from "@/data/serviceCatalog";
import { defaultLocale, localePath, prefixedLocales, type LocaleCode } from "@/lib/site-config";
import {
  breadcrumbId,
  faqId,
  founderId,
  founderRef,
  itemListId,
  orgId,
  orgRef,
  serviceId,
  servicePath,
  serviceUrl,
  webPageId,
  websiteId,
  websiteRef,
} from "@/lib/seo/ids";

const base = () => getSiteUrl();

export const SCHEMA_LANG = { sr: "sr-RS", en: "en-US", de: "de-DE" } as const;

/**
 * Cross-links a page's language versions.
 *
 * hreflang tells a crawler which URL to serve; it does not say the pages are
 * one work. Without `translationOfWork` the German page is a separate document
 * that happens to look similar, and every signal the Serbian original earned
 * has to be earned again from zero. Only pass paths that are genuinely
 * translated — see isTranslatedPath.
 */
export function translationRefs(basePath: string, locale: LocaleCode) {
  const canonical = `${base()}${localePath(basePath, defaultLocale)}`;
  if (locale === defaultLocale) {
    return {
      workTranslation: prefixedLocales.map((lc) => ({
        "@id": webPageId(`${base()}${localePath(basePath, lc)}`),
      })),
    };
  }
  return { translationOfWork: { "@id": webPageId(canonical) } };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId(),
    // Wikidata's "software company" — the entity a search or answer engine
    // resolves "IT firma" to. ProfessionalService alone does not say which trade.
    additionalType: "https://www.wikidata.org/wiki/Q1058914",
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    taxID: ORGANIZATION.taxId,
    foundingDate: ORGANIZATION.foundingDate,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Matični broj",
      value: ORGANIZATION.registrationNumber,
    },
    alternateName: ["Adspire", "Adspire Digital Niš", "Adspire IT firma Niš"],
    url: ORGANIZATION.url,
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    description: ORGANIZATION.description,
    image: `${base()}/images/logo.png`,
    logo: {
      "@type": "ImageObject",
      "@id": `${base()}/#logo`,
      url: `${base()}/images/logo.png`,
      caption: ORGANIZATION.name,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.address.streetAddress,
      addressLocality: ORGANIZATION.address.addressLocality,
      addressRegion: ORGANIZATION.address.addressRegion,
      postalCode: ORGANIZATION.address.postalCode,
      addressCountry: ORGANIZATION.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ORGANIZATION.geo.latitude,
      longitude: ORGANIZATION.geo.longitude,
    },
    // The business is run in these three languages; an answer engine asked in
    // German has no other way to know it may recommend a Serbian company.
    knowsLanguage: ["sr", "en", "de"],
    // Spelling the channels out lets an assistant answer "how do I reach them"
    // with something actionable instead of a bare page link.
    contactPoint: [
      {
        "@type": "ContactPoint",
        "@id": `${base()}/#contact-sales`,
        contactType: "sales",
        email: ORGANIZATION.email,
        telephone: ORGANIZATION.telephone,
        availableLanguage: ["sr", "en", "de"],
        areaServed: ["RS", "BA", "HR", "SI", "ME", "DE", "AT", "CH"],
        url: `${base()}/contact-us`,
      },
      {
        "@type": "ContactPoint",
        "@id": `${base()}/#contact-support`,
        contactType: "technical support",
        email: ORGANIZATION.email,
        availableLanguage: ["sr", "en"],
        url: `${base()}/odrzavanje-i-podrska`,
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Serbia" },
      { "@type": "AdministrativeArea", name: "Niš" },
      { "@type": "Country", name: "Bosnia and Herzegovina" },
      { "@type": "Country", name: "Croatia" },
      { "@type": "Country", name: "Slovenia" },
      { "@type": "Country", name: "Montenegro" },
      // adspireagency.de is a live German-language front for this same company;
      // without the DACH countries here the German site is an entity with no
      // stated market.
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
    ],
    priceRange: "$$",
    currenciesAccepted: "RSD, EUR",
    paymentAccepted: "Bank Transfer, Invoice, Cash",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    knowsAbout: serviceCatalog.map((s) => s.keywordSr.split(",")[0].trim()),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "@id": `${base()}/#offercatalog`,
      name: "Usluge Adspire Digital",
      itemListElement: serviceCatalog.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            // The catalog entry and the service page used to publish two
            // unrelated nodes for one service, so neither carried the full
            // signal. Same @id on both sides merges them into one.
            "@id": serviceId(s.slug),
            name: s.keywordSr.split(",")[0].trim(),
            description: s.metaDescriptionSr,
            url: serviceUrl(s.slug),
            provider: orgRef(),
          },
        },
      })),
    },
    founder: founderRef(),
    employee: founderRef(),
    ...(getOrgSameAs().length > 0 ? { sameAs: getOrgSameAs() } : {}),
  };
}

/**
 * The founder as a first-class node rather than an object nested inside the
 * Organization. Nested, it was unaddressable: nothing could cite it as the
 * author of a case study or a guide, which is the signal that says a real
 * named person stands behind the work.
 */
export function founderJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": founderId(),
    name: FOUNDER.name,
    givenName: "Đorđe",
    familyName: "Mladenović",
    jobTitle: FOUNDER.jobTitle,
    url: `${base()}/about-us`,
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    worksFor: orgRef(),
    founderOf: orgRef(),
    knowsLanguage: ["sr", "en"],
    knowsAbout: serviceCatalog.map((s) => s.keywordSr.split(",")[0].trim()),
    address: {
      "@type": "PostalAddress",
      addressLocality: ORGANIZATION.address.addressLocality,
      addressCountry: ORGANIZATION.address.addressCountry,
    },
    sameAs: [...FOUNDER.sameAs],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(),
    name: "Adspire Digital",
    url: base(),
    description: ORGANIZATION.description,
    publisher: orgRef(),
    inLanguage: ["sr-RS", "en-US", "de-DE"],
    potentialAction: {
      "@type": "ContactAction",
      name: "Kontakt — Adspire Digital",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base()}/contact-us`,
      },
    },
  };
}

type WebPageOptions = {
  /** BCP 47 tag. Only prefixed-locale pages pass it; the site is Serbian by default. */
  inLanguage?: string;
  /** ISO date. Only pass a real one — a build timestamp on static copy is a lie. */
  dateModified?: string;
  datePublished?: string;
  /** Node ids this page's content is primarily about (a Service, Product, …). */
  mainEntity?: string;
  /** CSS selectors whose text an assistant may read aloud or quote. */
  speakable?: string[];
};

export function webPageAboutOrganizationJsonLd(
  path: string,
  title: string,
  description: string,
  /** BCP 47 tag, or the full options object. */
  options: string | WebPageOptions = "sr-RS",
) {
  const opts: WebPageOptions = typeof options === "string" ? { inLanguage: options } : options;
  const url = `${base()}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    "@type": "WebPage",
    "@id": webPageId(url),
    url,
    name: title,
    description,
    isPartOf: websiteRef(),
    about: orgRef(),
    primaryImageOfPage: { "@type": "ImageObject", url: `${base()}/images/logo.png` },
    inLanguage: opts.inLanguage ?? "sr-RS",
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.mainEntity ? { mainEntity: { "@id": opts.mainEntity } } : {}),
    ...(opts.speakable
      ? {
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: opts.speakable,
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const last = items[items.length - 1];
  const pageUrl = `${base()}${last.path.startsWith("/") ? last.path : `/${last.path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(pageUrl),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${base()}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

export function faqPageJsonLd(
  qa: { q: string; a: string }[],
  pageUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": faqId(pageUrl),
    url: pageUrl,
    // Google retired FAQ rich results for most sites, but the answer engines
    // still parse this — it is the block they quote verbatim.
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/**
 * `localized` lets a translated page describe itself at its own URL. Without it
 * the German page would publish a Serbian Service node, which is worse than no
 * node at all — it tells the crawler the page is about something it is not.
 */
export function serviceJsonLd(
  entry: ServiceCatalogEntry,
  title: string,
  localized?: { path: string; name: string; description: string; serviceType?: string },
) {
  const url = `${base()}${localized?.path ?? servicePath(entry.slug)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    // A translated page gets its own id; the default-locale page keeps the
    // canonical one so it merges with the Organization's offer catalog.
    "@id": localized ? `${url}#service` : serviceId(entry.slug),
    name: localized?.name ?? entry.h1Sr ?? title,
    description: localized?.description ?? entry.metaDescriptionSr,
    url,
    provider: orgRef(),
    areaServed: { "@type": "Country", name: "Serbia" },
    serviceType: localized?.serviceType ?? entry.keywordSr,
    ...(localized ? { sameAs: serviceUrl(entry.slug) } : {}),
  };
}

export function itemListServicesJsonLd(
  servicePaths: string[],
  locale: LocaleCode = defaultLocale,
) {
  const indexUrl = `${base()}${localePath("/our-services", locale)}`;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": itemListId(indexUrl),
    name: "Usluge Adspire Digital",
    numberOfItems: servicePaths.length,
    inLanguage: SCHEMA_LANG[locale],
    itemListElement: servicePaths.map((path, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${base()}${localePath(path, locale)}`,
      // The default-locale list points at the canonical Service nodes so the
      // index, the service page and the org catalog are all the same entity.
      ...(locale === defaultLocale ? { item: { "@id": `${base()}${path}#service` } } : {}),
    })),
  };
}
