import type { Metadata } from "next";
import type { AiIndexCopy, AiPage } from "@/content/site/aiPages";
import { aiPagePath, getAiPages } from "@/content/site/aiPages";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl } from "@/lib/seo/site";
import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";

const base = () => getSiteUrl();

const SCHEMA_LANG: Record<LocaleCode, string> = {
  sr: "sr-RS",
  en: "en",
  de: "de",
};

export function aiPageMetadata(page: AiPage, locale: LocaleCode = defaultLocale): Metadata {
  return pageMetadata({
    path: aiPagePath(page.slug),
    title: page.title,
    description: page.metaDescription,
    keywords: page.keywords,
    locale,
  });
}

export function aiIndexMetadata(
  index: AiIndexCopy,
  locale: LocaleCode = defaultLocale,
): Metadata {
  return pageMetadata({
    path: index.path,
    title: index.title,
    description: index.metaDescription,
    keywords: index.keywords,
    locale,
  });
}

/**
 * The Service node for one industry page. Each task becomes an offer inside it
 * rather than a Service of its own — six standalone Services per industry would
 * describe fifty-four businesses instead of one offer with fifty-four jobs.
 */
function aiServiceJsonLd(page: AiPage, locale: LocaleCode) {
  const url = absoluteUrl(localePath(aiPagePath(page.slug), locale));
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.serviceName,
    description: page.answer,
    url,
    inLanguage: SCHEMA_LANG[locale],
    serviceType: page.keywords[0],
    provider: { "@id": `${base()}/#organization` },
    audience: { "@type": "BusinessAudience", name: page.industry },
    areaServed: [
      { "@type": "Country", name: "Serbia" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: page.serviceName,
      itemListElement: page.tasks.map((task, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: task.name,
            description: `${task.problem} ${task.solution}`,
          },
        },
      })),
    },
  };
}

/**
 * HowTo for the introduction process. It is deliberately the process and not
 * the technology — "how do I introduce AI into my company" is the question
 * people actually ask, and it is the one an answer engine can quote back.
 */
function aiHowToJsonLd(page: AiPage, locale: LocaleCode) {
  const url = absoluteUrl(localePath(aiPagePath(page.slug), locale));
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name: `${page.howTo.name} — ${page.industry}`,
    description: page.lead,
    inLanguage: SCHEMA_LANG[locale],
    totalTime: "P28D",
    step: page.howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${url}#korak-${index + 1}`,
    })),
  };
}

export function aiPageJsonLd(page: AiPage, locale: LocaleCode = defaultLocale) {
  const path = localePath(aiPagePath(page.slug), locale);
  const url = absoluteUrl(path);
  const indexPath = localePath("/ai", locale);
  return [
    webPageAboutOrganizationJsonLd(
      path,
      `${page.title} | Adspire Digital`,
      page.metaDescription,
      SCHEMA_LANG[locale],
    ),
    aiServiceJsonLd(page, locale),
    aiHowToJsonLd(page, locale),
    breadcrumbJsonLd([
      { name: "Adspire Digital", path: localePath("/", locale) },
      { name: page.eyebrow, path: indexPath },
      { name: page.industry, path },
    ]),
    faqPageJsonLd(page.faq, url),
  ];
}

export function aiIndexJsonLd(index: AiIndexCopy, locale: LocaleCode = defaultLocale) {
  const path = localePath(index.path, locale);
  const url = absoluteUrl(path);
  return [
    webPageAboutOrganizationJsonLd(
      path,
      `${index.title} | Adspire Digital`,
      index.metaDescription,
      SCHEMA_LANG[locale],
    ),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${url}#itemlist`,
      name: index.h1,
      itemListElement: getAiPages(locale).map((page, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: page.industry,
        url: absoluteUrl(localePath(aiPagePath(page.slug), locale)),
      })),
    },
    breadcrumbJsonLd([
      { name: "Adspire Digital", path: localePath("/", locale) },
      { name: index.eyebrow, path },
    ]),
    faqPageJsonLd(index.faq, url),
  ];
}
