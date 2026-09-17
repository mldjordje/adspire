import {
  breadcrumbJsonLd,
  translationRefs,
  webPageAboutOrganizationJsonLd,
} from "@/lib/seo/jsonld";
import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";
import { founderRef, itemListId, orgId, orgRef, webPageId } from "@/lib/seo/ids";
import { absoluteUrl } from "@/lib/seo/metadata";
import { ORGANIZATION, getSiteUrl } from "@/lib/seo/site";

/**
 * Schema for the pages that carried none.
 *
 * /contact-us, /about-us and the three index pages were the site's only answer
 * to "how do I reach them", "who are they" and "what have they built" — the
 * three questions an assistant has to answer before it recommends anyone — and
 * all three shipped as prose an unrendered crawl never sees.
 */

const base = () => getSiteUrl();

/** ContactPage + the reachable channels, so "how do I contact Adspire" is answerable. */
export function contactPageJsonLd(input: {
  path: string;
  title: string;
  description: string;
  inLanguage?: string;
  homeLabel?: string;
}) {
  const url = absoluteUrl(input.path);
  return [
    {
      ...webPageAboutOrganizationJsonLd(input.path, input.title, input.description, {
        inLanguage: input.inLanguage,
      }),
      "@type": "ContactPage",
    },
    {
      "@context": "https://schema.org",
      "@type": "ContactPoint",
      "@id": `${url}#contactpoint`,
      contactType: "sales",
      email: ORGANIZATION.email,
      telephone: ORGANIZATION.telephone,
      availableLanguage: ["sr", "en", "de"],
      areaServed: ["RS", "BA", "HR", "SI", "ME", "DE", "AT", "CH"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      url,
    },
    breadcrumbJsonLd([
      { name: input.homeLabel ?? "Početna", path: "/" },
      { name: input.title, path: input.path },
    ]),
  ];
}

/** AboutPage whose subject is the founder, not the page. */
export function aboutPageJsonLd(input: {
  /** Default-locale path; the locale prefix is applied here. */
  path: string;
  title: string;
  description: string;
  inLanguage?: string;
  locale?: LocaleCode;
  homeLabel?: string;
  aboutLabel?: string;
}) {
  const locale = input.locale ?? defaultLocale;
  const localisedPath = localePath(input.path, locale);
  return [
    {
      ...webPageAboutOrganizationJsonLd(localisedPath, input.title, input.description, {
        inLanguage: input.inLanguage,
        mainEntity: orgId(),
      }),
      "@type": "AboutPage",
      ...translationRefs(input.path, locale),
      // The Organization is what the page is about; the founder is who it is
      // about. Both matter — an assistant asked "who runs Adspire" needs the
      // second one and cannot infer it from the first.
      mentions: [founderRef(), orgRef()],
    },
    breadcrumbJsonLd([
      { name: input.homeLabel ?? "Početna", path: localePath("/", locale) },
      { name: input.aboutLabel ?? input.title, path: localisedPath },
    ]),
  ];
}

export type CollectionItem = {
  name: string;
  path: string;
  description?: string;
  image?: string;
  datePublished?: string;
};

/**
 * CollectionPage + ItemList for an index route. The ItemList is what lets an
 * assistant enumerate the work instead of guessing at it from a nav menu.
 */
export function collectionPageJsonLd(input: {
  path: string;
  title: string;
  description: string;
  items: CollectionItem[];
  inLanguage?: string;
  homeLabel?: string;
}) {
  const url = absoluteUrl(input.path);
  return [
    {
      ...webPageAboutOrganizationJsonLd(input.path, input.title, input.description, {
        inLanguage: input.inLanguage,
        mainEntity: itemListId(url),
      }),
      "@type": "CollectionPage",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": itemListId(url),
      name: input.title,
      numberOfItems: input.items.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
        ...(item.description || item.image || item.datePublished
          ? {
              item: {
                "@id": webPageId(absoluteUrl(item.path)),
                url: absoluteUrl(item.path),
                name: item.name,
                ...(item.description ? { description: item.description } : {}),
                ...(item.image ? { image: `${base()}${item.image}` } : {}),
                ...(item.datePublished ? { datePublished: item.datePublished } : {}),
              },
            }
          : {}),
      })),
    },
    breadcrumbJsonLd([
      { name: input.homeLabel ?? "Početna", path: "/" },
      { name: input.title, path: input.path },
    ]),
  ];
}

/**
 * The inquiry routes are where a recommendation is supposed to land, so they
 * publish the action itself: an assistant that knows the entry point can tell
 * someone what to do next instead of only naming the company.
 */
export function inquiryPageJsonLd(input: {
  path: string;
  title: string;
  description: string;
  actionName: string;
  homeLabel?: string;
}) {
  const url = absoluteUrl(input.path);
  return [
    {
      ...webPageAboutOrganizationJsonLd(input.path, input.title, input.description),
      potentialAction: {
        "@type": "CommunicateAction",
        name: input.actionName,
        target: { "@type": "EntryPoint", urlTemplate: url, actionPlatform: "https://schema.org/DesktopWebPlatform" },
        recipient: orgRef(),
      },
    },
    breadcrumbJsonLd([
      { name: input.homeLabel ?? "Početna", path: "/" },
      { name: input.title, path: input.path },
    ]),
  ];
}

/** Minimal, honest markup for the legal routes — publisher and language, nothing invented. */
export function legalPageJsonLd(input: {
  path: string;
  title: string;
  description: string;
  /** ISO date matching the "poslednja izmena" line the page itself shows. */
  dateModified?: string;
}) {
  return [
    {
      ...webPageAboutOrganizationJsonLd(input.path, input.title, input.description, {
        dateModified: input.dateModified,
      }),
      publisher: orgRef(),
      author: founderRef(),
    },
    breadcrumbJsonLd([
      { name: "Početna", path: "/" },
      { name: input.title, path: input.path },
    ]),
  ];
}
