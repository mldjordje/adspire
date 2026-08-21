import { aiPagePath, aiPages } from "@/content/site/aiPages";
import { guides } from "@/content/site/guides";
import { howWeWorkPage, maintenancePage } from "@/content/site/companyPages";
import { projectCaseStudies } from "@/data/projectCaseStudies";
import { serviceCatalog } from "@/data/serviceCatalog";
import { FOUNDER, ORGANIZATION, getSiteUrl } from "@/lib/seo/site";

export const dynamic = "force-static";

/**
 * The long factual profile that /llms.txt promises at its foot.
 *
 * That link pointed at a 404 for as long as the short file existed, which is
 * the worst outcome: an answer engine that follows it learns nothing and the
 * short file loses credibility. Everything here is generated from the same data
 * the pages render, so the profile cannot drift from the site — the failure
 * mode that makes a hand-written AI profile worse than none at all.
 */
export function GET() {
  const base = getSiteUrl();

  const services = serviceCatalog
    .map(
      (service) =>
        `### ${service.keywordSr.split(",")[0].trim()}\n` +
        `URL: ${base}/our-services/${service.slug}\n` +
        `${service.aiSummarySr}\n`,
    )
    .join("\n");

  const cases = projectCaseStudies
    .map(
      (project) =>
        `### ${project.title}\n` +
        `URL: ${base}/our-projects/${project.slug}\n` +
        `Živi sajt: ${project.website}\n` +
        `Kategorija: ${project.category}\n` +
        `Tehnologije: ${project.stack}\n` +
        `Rezultat: ${project.outcome}\n`,
    )
    .join("\n");

  const guideList = [...guides, howWeWorkPage, maintenancePage]
    .map((guide) => `- [${guide.h1}](${base}${guide.path}): ${guide.metaDescription}`)
    .join("\n");

  // The FAQ answers are the part an assistant can quote verbatim, so they are
  // reproduced rather than linked.
  const faqs = [...guides, howWeWorkPage, maintenancePage]
    .flatMap((guide) =>
      guide.faq.slice(0, 3).map((item) => `**${item.q}**\n${item.a}\n`),
    )
    .join("\n");

  const aiByIndustry = aiPages
    .map((page) => `- [${page.industry}](${base}${aiPagePath(page.slug)}): ${page.answer}`)
    .join("\n");

  const body = `# ${ORGANIZATION.name} — činjenični profil

> ${ORGANIZATION.description}

Ovaj dokument je duža verzija ${base}/llms.txt. Sve u njemu je izvedeno iz javnih
stranica sajta.

## Identitet i pravni podaci

- Brend: ${ORGANIZATION.name}
- Pravni naziv: ${ORGANIZATION.legalName}
- PIB: ${ORGANIZATION.taxId}
- Matični broj: ${ORGANIZATION.registrationNumber}
- Datum osnivanja: ${ORGANIZATION.foundingDate}
- Osnivač i lead developer: ${FOUNDER.name}
- Adresa: ${ORGANIZATION.address.streetAddress}, ${ORGANIZATION.address.postalCode} ${ORGANIZATION.address.addressLocality}, Srbija
- Kontakt: ${ORGANIZATION.email} | ${ORGANIZATION.telephone}
- Jezici: srpski, engleski, nemački
- Tržišta: Srbija i region, DACH (${base}/de), pojedinačni klijenti u Grčkoj

## Kako se radi

${howWeWorkPage.sections
  .map((section) => `### ${section.heading}\n${(section.body ?? []).join(" ")}\n${(section.bullets ?? []).map((b) => `- ${b}`).join("\n")}`)
  .join("\n\n")}

Puna stranica: ${base}${howWeWorkPage.path}

## Usluge

${services}

## Dokumentovani projekti u produkciji

${cases}

## AI po delatnostima

${aiByIndustry}

## Vodiči i stranice sa odgovorima

${guideList}

## Česta pitanja i odgovori

${faqs}

## Ograničenja tvrdnji

- Nema garancije pozicije u Google rezultatima, AI citata ili AI preporuke.
- Cena i rok zavise od potvrđenog obima projekta; javno su navedeni rasponi, ne cenovnik.
- Ne tvrditi partnerstva, sertifikate, nagrade ni rezultate koji nisu dokumentovani na javnim stranicama.
- Broj klijenata i projekata navoditi samo onako kako piše na javnim stranicama sajta.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
