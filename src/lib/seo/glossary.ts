import type { Metadata } from "next";

import { glossaryGroups, glossaryPage, glossaryTerms } from "@/content/site/glossary";
import { breadcrumbJsonLd, webPageAboutOrganizationJsonLd } from "@/lib/seo/jsonld";
import { founderRef, orgRef } from "@/lib/seo/ids";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

/**
 * The glossary as a DefinedTermSet.
 *
 * A definition is the shape of text an assistant quotes most readily: short,
 * self-contained and checkable. The service pages answer "who does this"; the
 * glossary answers "what is this", which is the question that comes first — and
 * it is asked of an assistant far more often than it is typed into a search box.
 *
 * Every term points at the service that deals with it, so a definition is not a
 * dead end: the entity that explains the word is the same entity that sells the
 * fix, and the graph says so.
 */

const URL = absoluteUrl(glossaryPage.path);
const setId = `${URL}#terms`;

export const glossaryTermId = (id: string) => `${URL}#${id}`;

export function glossaryMetadata(): Metadata {
  return pageMetadata({
    path: glossaryPage.path,
    title: glossaryPage.title,
    description: glossaryPage.metaDescription,
    keywords: [...glossaryPage.keywords],
  });
}

export function glossaryJsonLd() {
  return [
    {
      ...webPageAboutOrganizationJsonLd(
        glossaryPage.path,
        `${glossaryPage.title} | Adspire Digital`,
        glossaryPage.metaDescription,
        {
          mainEntity: setId,
          // The opening paragraph answers the query on its own, so it is the
          // part worth reading aloud or lifting into an answer.
          speakable: ["[data-answer]"],
        },
      ),
      author: founderRef(),
      publisher: orgRef(),
    },
    {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      "@id": setId,
      name: glossaryPage.h1,
      description: glossaryPage.metaDescription,
      url: URL,
      inLanguage: "sr-RS",
      publisher: orgRef(),
      hasDefinedTerm: glossaryTerms.map((term) => ({
        "@type": "DefinedTerm",
        "@id": glossaryTermId(term.id),
        name: term.term,
        description: term.definition,
        inDefinedTermSet: { "@id": setId },
        url: `${URL}#${term.id}`,
        ...(term.aliases?.length ? { alternateName: term.aliases } : {}),
        // The service that deals with the term, so the definition leads
        // somewhere instead of ending at itself.
        ...(term.service ? { subjectOf: { "@id": `${absoluteUrl(term.service.href)}#service` } } : {}),
      })),
    },
    breadcrumbJsonLd([
      { name: "Početna", path: "/" },
      { name: glossaryPage.h1, path: glossaryPage.path },
    ]),
  ];
}

/** Flat list used by the page body, grouped as authored. */
export { glossaryGroups };
