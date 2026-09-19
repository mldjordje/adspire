import { CONTACT_LANGUAGES, FOUNDER, ORGANIZATION, getOrgSameAs, getSiteUrl, serviceAreaServed } from "@/lib/seo/site";
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
import { nichePages, nichePath } from "@/content/site/nichePages";
import { bookingIndustryPages, bookingIndustryPath } from "@/content/site/bookingIndustryPages";
import { diasporaPage, DIASPORA_PATH } from "@/content/site/diasporaPage";
import { aeoPage, AEO_PATH } from "@/content/site/aeoPage";

const base = () => getSiteUrl();

export const SCHEMA_LANG = { sr: "sr-RS", en: "en-US", de: "de-DE" } as const;

/** Link actual translations of a work; ranking signals are not guaranteed. */
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
    // "Adspire Digital" stays here on purpose: it is the name the site carried
    // for two years, so it is what the Knowledge Graph, every index and every
    // old link know us by. Dropping it entirely would ask a crawler to treat
    // the rename as a different company.
    alternateName: ["Adspire Digital", "Adspire Niš", "Adspire IT firma Niš"],
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
    // A translated site does not imply sales conversations in that language.
    knowsLanguage: CONTACT_LANGUAGES,
    // Spelling the channels out lets an assistant answer "how do I reach them"
    // with something actionable instead of a bare page link.
    contactPoint: [
      {
        "@type": "ContactPoint",
        "@id": `${base()}/#contact-sales`,
        contactType: "sales",
        email: ORGANIZATION.email,
        telephone: ORGANIZATION.telephone,
        availableLanguage: CONTACT_LANGUAGES,
        areaServed: ["RS", "BA", "HR", "SI", "ME", "DE", "AT", "CH", "SE"],
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
    areaServed: serviceAreaServed(),
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
    // The catalog keywords answer "what does this company sell". These answer
    // "what can it be asked about" — the questions the newer pages exist for,
    // and the ones an assistant matches a user's sentence against.
    knowsAbout: [
      ...serviceCatalog.map((s) => s.keywordSr.split(",")[0].trim()),
      ...nichePages.map((page) => page.product.name),
      "Rad sa klijentima iz dijaspore",
      "Fakturisanje usluga firmama u EU u evrima",
      "Reverse charge za usluge iz Srbije",
      "Izbor izvođača za sajt i procena ponude",
    ],
    // Two catalogs: the services this company sells, and the solution pages
    // that deliver them to a named trade or a named audience. The second one
    // is what lets an assistant enumerate those pages from the organization
    // node instead of having to crawl into them.
    hasOfferCatalog: [
      solutionsOfferCatalogJsonLd(),
      {
        "@type": "OfferCatalog",
        "@id": `${base()}/#offercatalog`,
        name: "Usluge Adspire",
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
    ],
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
    name: "Adspire",
    url: base(),
    description: ORGANIZATION.description,
    publisher: orgRef(),
    inLanguage: ["sr-RS", "en-US", "de-DE"],
    potentialAction: {
      "@type": "ContactAction",
      name: "Kontakt — Adspire",
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
  /** Published sources linked in the visible page content. */
  citations?: string[];
  /** CSS selectors for speakable content; no guarantee of AI use. */
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
    ...(opts.citations?.length ? { citation: opts.citations } : {}),
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
    // Keep these answers identical to the visible FAQ; citation is not guaranteed.
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
    areaServed: serviceAreaServed(),
    serviceType: localized?.serviceType ?? entry.keywordSr,
    ...(localized ? { sameAs: serviceUrl(entry.slug) } : {}),
  };
}

/**
 * Every solution page, as one list the organization owns.
 *
 * `hasOfferCatalog` lists the service catalog — the answer to "what does this
 * company do". It has never listed the pages that answer "who builds X for my
 * trade" or "who works with a company abroad", so those pages existed in the
 * graph only as islands reachable by crawling to them. An assistant reading
 * the organization node could not enumerate them, which is exactly the moment
 * a recommendation gets made.
 *
 * Nothing new is declared here. Every entry references an `@id` the page
 * already publishes, so this is membership, not a second copy of the entity —
 * the failure mode `ids.ts` was written to prevent.
 */
export function solutionEntries() {
  return [
    ...nichePages.map((page) => ({
      id: `${base()}${nichePath(page.slug)}#service`,
      name: page.product.name,
      description: page.summary,
      url: `${base()}${nichePath(page.slug)}`,
    })),
    ...bookingIndustryPages.map((page) => ({
      id: `${base()}${bookingIndustryPath(page.slug)}#service`,
      name: page.seo.title,
      description: page.summary,
      url: `${base()}${bookingIndustryPath(page.slug)}`,
    })),
    {
      id: `${base()}${DIASPORA_PATH}#service`,
      name: diasporaPage.seo.title,
      description: diasporaPage.summary,
      url: `${base()}${DIASPORA_PATH}`,
    },
    {
      id: `${base()}${AEO_PATH}#service`,
      name: aeoPage.seo.title,
      description: aeoPage.summary,
      url: `${base()}${AEO_PATH}`,
    },
  ];
}

/** The catalog node itself, attached to the organization. */
export function solutionsOfferCatalogJsonLd() {
  const entries = solutionEntries();
  return {
    "@type": "OfferCatalog",
    "@id": `${base()}/#solutionscatalog`,
    name: "Rešenja po delatnosti i po publici",
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Offer",
        itemOffered: { "@id": entry.id },
        seller: orgRef(),
        url: entry.url,
      },
    })),
  };
}

/**
 * The same list as a plain ItemList, published on /our-services.
 *
 * The offer catalog says the organization offers these; this says the services
 * index is where they are listed. Both carry URLs, which is what makes the set
 * enumerable without crawling the navigation.
 */
export function itemListSolutionsJsonLd() {
  const indexUrl = `${base()}/our-services`;
  const entries = solutionEntries();
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${indexUrl}#solutions`,
    name: "Rešenja po delatnosti i po publici",
    numberOfItems: entries.length,
    inLanguage: SCHEMA_LANG[defaultLocale],
    itemListElement: entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: entry.url,
      item: { "@id": entry.id, name: entry.name, description: entry.description },
    })),
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
    name: "Usluge Adspire",
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
