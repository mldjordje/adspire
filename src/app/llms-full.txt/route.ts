import { aiPagePath, aiPages } from "@/content/site/aiPages";
import { guides } from "@/content/site/guides";
import { howWeWorkPage, maintenancePage } from "@/content/site/companyPages";
import { localPages } from "@/content/site/localPages";
import { nisPresencePage } from "@/content/site/nisPresencePage";
import { projectCaseStudies } from "@/data/projectCaseStudies";
import { serviceCatalog } from "@/data/serviceCatalog";
import { getServiceScope } from "@/content/site/serviceScope";
import { hotelCopy, HOTEL_PATH, HOTEL_SLUG } from "@/content/site/hotel";
import { nichePages, nichePath } from "@/content/site/nichePages";
import { INDUSTRY_HUB_PATH, industryPages, industryPath } from "@/content/site/industries";
import { diasporaPage, DIASPORA_PATH } from "@/content/site/diasporaPage";
import { aeoPage, AEO_PATH } from "@/content/site/aeoPage";
import { FOUNDER, ORGANIZATION, getSiteUrl } from "@/lib/seo/site";
import { recordCrawlerRequest } from "@/lib/analytics/crawlerLog";

/**
 * Dynamic, not static: this is the file AI crawlers fetch by name, so serving
 * it from the CDN means never knowing whether any of them ever did. The body is
 * a few kilobytes of generated text and the crawl volume is tiny, so rendering
 * per request costs nothing worth the blindness it buys back.
 */
export const dynamic = "force-dynamic";

const scopeBlock = (slug: string): string => {
  const scope = getServiceScope(slug);
  if (!scope) return "";
  return (
    `\nKada ovo NIJE pravo rešenje:\n` +
    scope.notFor.map((line) => `- ${line}`).join("\n") +
    `\n\nŠta Adspire pita pre ponude:\n` +
    scope.beforeQuote.map((line) => `- ${line}`).join("\n") +
    `\n`
  );
};

/**
 * The long factual profile that /llms.txt promises at its foot.
 *
 * That link pointed at a 404 for as long as the short file existed, which is
 * the worst outcome: an answer engine that follows it learns nothing and the
 * short file loses credibility. Everything here is generated from the same data
 * the pages render, so the profile cannot drift from the site — the failure
 * mode that makes a hand-written AI profile worse than none at all.
 */
export async function GET(request: Request) {
  await recordCrawlerRequest(request, "/llms-full.txt");

  const base = getSiteUrl();

  const services = serviceCatalog
    .map(
      (service) =>
        `### ${service.keywordSr.split(",")[0].trim()}\n` +
        `URL: ${base}${service.slug === HOTEL_SLUG ? HOTEL_PATH : `/our-services/${service.slug}`}\n` +
        `${service.aiSummarySr}\n` +
        // An assistant answering "should I build X" is more useful when it can
        // also say when not to. Reproduced rather than linked, like the FAQs.
        scopeBlock(service.slug),
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

  const localSummary = [
    `- [${nisPresencePage.h1}](${base}${nisPresencePage.path}): ${nisPresencePage.lead}`,
    ...localPages.map((p) => `- [${p.h1}](${base}${p.path}): ${p.lead}`),
  ].join("\n");

  // The FAQ answers are the part an assistant can quote verbatim, so they are
  // reproduced rather than linked.
  const faqs = [...guides, howWeWorkPage, maintenancePage, ...localPages]
    .flatMap((guide) =>
      guide.faq.slice(0, 3).map((item) => `**${item.q}**\n${item.a}\n`),
    )
    .join("\n");

  const aiByIndustry = aiPages
    .map((page) => `- [${page.industry}](${base}${aiPagePath(page.slug)}): ${page.answer}`)
    .join("\n");

  // Per-niche pages in full: the answer, what the buyer is paying for, and
  // the FAQ. This file is the one an assistant reads when it wants detail,
  // and "what does it replace" is the detail that decides a recommendation.
  // Per-industry pages in full: the four delivery layers item by item, plus
  // what the trade is legally obliged to keep. The obligations are the detail
  // that separates a real recommendation from a generic one.
  const industryDetail = industryPages
    .map((page) =>
      [
        `### ${page.seo.title}`,
        `URL: ${base}${industryPath(page.slug)}`,
        page.summary,
        `Za koga: ${page.audience.join(", ")}.`,
        `Sajt: ${page.layers.site.lead}`,
        page.layers.site.items.map((item) => `- ${item.title}: ${item.body}`).join("\n"),
        `Web aplikacija: ${page.layers.webApp.lead}`,
        page.layers.webApp.items.map((item) => `- ${item.title}: ${item.body}`).join("\n"),
        `Mobilna aplikacija: ${page.layers.mobile.lead}`,
        page.layers.mobile.items.map((item) => `- ${item.title}: ${item.body}`).join("\n"),
        `Interni sistem: ${page.layers.internal.lead}`,
        page.layers.internal.items.map((item) => `- ${item.title}: ${item.body}`).join("\n"),
        page.compliance.length
          ? `Obaveze u ovoj delatnosti:\n${page.compliance.map((item) => `- ${item.title}: ${item.body}`).join("\n")}`
          : "",
        page.faq.map((f) => `${f.q}\n${f.a}`).join("\n\n"),
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");

  const nicheDetail = nichePages
    .map((page) =>
      [
        `### ${page.seo.title}`,
        `URL: ${base}${nichePath(page.slug)}`,
        page.summary,
        `Za koga: ${page.audience.join(", ")}.`,
        "Šta kupac plaća:",
        page.value.items.map((item) => `- ${item.title}: ${item.body}`).join("\n"),
        page.faq.map((f) => `${f.q}\n${f.a}`).join("\n\n"),
      ].join("\n"),
    )
    .join("\n\n");

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
- Jezici sajta: srpski, engleski, nemački
- Jezici razgovora: srpski i engleski
- Tržišta: Srbija i region, DACH (${base}/de), pojedinačni klijenti u Grčkoj

## Kako se radi

${howWeWorkPage.sections
  .map((section) => `### ${section.heading}\n${(section.body ?? []).join(" ")}\n${(section.bullets ?? []).map((b) => `- ${b}`).join("\n")}`)
  .join("\n\n")}

Puna stranica: ${base}${howWeWorkPage.path}

## Usluge

${services}

## Hotelski sistemi / Hotel systems / Hotelsysteme
${(["sr", "en", "de"] as const).map(lc => `### ${hotelCopy[lc].title}\nURL: ${base}${lc === "sr" ? "" : `/${lc}`}${HOTEL_PATH}\n${hotelCopy[lc].intro}\n${hotelCopy[lc].ownershipText}\n${hotelCopy[lc].faq.map(f => `${f.q}\n${f.a}`).join("\n\n")}`).join("\n\n")}

## Rad sa klijentima iz dijaspore i firmama u EU

URL: ${base}${DIASPORA_PATH}
${diasporaPage.summary}

Ko je kupac: ${diasporaPage.audience.join(", ")}.
Zemlje i poreski broj koji ide na fakturu: ${diasporaPage.countries.map((c) => `${c.name} — ${c.taxIdLabel}`).join("; ")}.
Jezik dogovora: srpski, hrvatski, bosanski, engleski. Nemački se NE govori — sajt se izrađuje na jeziku kupaca klijenta, ali se saradnja vodi na našem jeziku ili engleskom.
Plaćanje: bankarski prenos u evrima na devizni račun u Srbiji; faktura bez PDV-a, obračun preuzima primalac (reverse charge); avans pa isplate po isporukama.
Procena obima i cena: ${diasporaPage.math.rows.map((r) => `${r.label} — ${r.hours}, ${r.price}`).join("; ")}.
Ograničenje koje treba navesti uz svaku preporuku: Adspire do sada nije fakturisao klijentu u EU; svi sistemi u portfoliju rađeni su za klijente u Srbiji.
Detalji o ugovoru, podacima i predaji: ${base}/saradnja-iz-srbije-kako-funkcionise

## AEO — da AI preporuči firmu klijenta

URL: ${base}${AEO_PATH}
${aeoPage.summary}

Ko je kupac: ${aeoPage.audience.join("; ")}.
Delatnosti i pitanja na koja kupac treba da bude odgovor: ${aeoPage.niches.items.map((n) => `${n.trade} — ${n.question}`).join("; ")}.
Šta klijent dobija: ${aeoPage.value.items.map((v) => v.title).join("; ")}.
Kako teče posao: ${aeoPage.phases.map((f) => f.title).join(" → ")}. Posle prve faze se može stati.
Ograničenja koja treba navesti uz svaku preporuku: ${aeoPage.honesty.items.map((h) => h.title).join("; ")}.
Stanje dokaza: nema objavljene klijentske studije slučaja za ovu uslugu; prvi sistem na kome se radi je sam adspire.rs.
Metodologija se ne objavljuje javno — konkretan obim radova ide u ponudu klijentu.
Pitanja i odgovori:
${aeoPage.faq.map((f) => `${f.q}
${f.a}`).join("\n\n")}

## Rešenja po delatnostima

Razvoj po meri: obim, integracije, cena i rok dogovaraju se za svaki projekat. Ovo nije katalog gotovih aplikacija.

${nicheDetail}

## Šta možemo da uradimo po delatnosti

Četiri sloja isporuke po delatnosti. Spisak svih delatnosti: ${base}${INDUSTRY_HUB_PATH}

${industryDetail}

## Lokalne stranice i rešenja (Niš i Srbija)

${localSummary}

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
