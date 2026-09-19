import type { Metadata } from "next";
import type { Guide } from "@/content/site/guides";
import { breadcrumbJsonLd, faqPageJsonLd, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { founderRef, orgRef } from "@/lib/seo/ids";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

/** Metadata for a guide route — keeps every guide page's SEO block identical. */
export function guideMetadata(guide: Guide): Metadata {
  return pageMetadata({
    path: guide.path,
    title: guide.title,
    description: guide.metaDescription,
    keywords: guide.keywords,
  });
}

/**
 * The guide as an authored article.
 *
 * Without this the guides were WebPages with nobody behind them. Attribution is
 * the difference between "some site says this" and "a named practitioner with a
 * public profile says this", and the second is what an answer engine weighs
 * when it decides whose explanation to repeat.
 */
function guideArticleJsonLd(guide: Guide) {
  const url = absoluteUrl(guide.path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: guide.h1,
    name: guide.title,
    description: guide.metaDescription,
    url,
    author: founderRef(),
    publisher: orgRef(),
    inLanguage: "sr-RS",
    about: orgRef(),
    keywords: guide.keywords.join(", "),
    // The section headings are the guide's actual outline; publishing them
    // lets an assistant see what the page covers without fetching the body.
    articleSection: guide.sections.map((section) => section.heading),
    isPartOf: { "@id": `${url}#webpage` },
  };
}

/** HowTo, but only for the guides that declare real sequential steps. */
function guideHowToJsonLd(guide: Guide) {
  if (!guide.howTo) return [];
  const url = absoluteUrl(guide.path);
  const steps = guide.howTo.stepHeadings.flatMap((heading, index) => {
    const section = guide.sections.find((item) => item.heading === heading);
    if (!section) return [];
    const text = [...(section.body ?? []), ...(section.bullets ?? [])].join(" ");
    if (!text) return [];
    return [
      {
        "@type": "HowToStep",
        position: index + 1,
        name: heading,
        text,
        url: `${url}#korak-${index + 1}`,
      },
    ];
  });
  if (steps.length === 0) return [];
  return [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: guide.howTo.name,
      description: guide.metaDescription,
      inLanguage: "sr-RS",
      ...(guide.howTo.totalTime ? { totalTime: guide.howTo.totalTime } : {}),
      step: steps,
    },
  ];
}

/**
 * JSON-LD for a guide route. The FAQ ships as FAQPage because those answers are
 * what answer engines quote; leaving them only in the body makes them invisible
 * to anything that does not render the page.
 */
export function guideJsonLd(guide: Guide) {
  const pageUrl = absoluteUrl(guide.path);
  return [
    webPageAboutOrganizationJsonLd(
      guide.path,
      `${guide.title} | Adspire`,
      guide.metaDescription,
      { mainEntity: `${pageUrl}#article` },
    ),
    guideArticleJsonLd(guide),
    ...guideHowToJsonLd(guide),
    breadcrumbJsonLd([
      { name: "Početna", path: "/" },
      { name: guide.h1, path: guide.path },
    ]),
    faqPageJsonLd(
      guide.faq.map((item) => ({ q: item.q, a: item.a })),
      pageUrl,
    ),
  ];
}
