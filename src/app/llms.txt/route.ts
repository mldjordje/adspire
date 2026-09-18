import { aiPagePath, aiPages } from "@/content/site/aiPages";
import { bookingIndustryPages, bookingIndustryPath } from "@/content/site/bookingIndustryPages";
import { guides } from "@/content/site/guides";
import { glossaryPage, glossaryTerms } from "@/content/site/glossary";
import { projectCaseStudies } from "@/data/projectCaseStudies";
import { serviceCatalog } from "@/data/serviceCatalog";
import { hotelCopy, HOTEL_PATH, HOTEL_SLUG } from "@/content/site/hotel";
import { FOUNDER, ORGANIZATION, getSiteUrl } from "@/lib/seo/site";
import { recordCrawlerRequest } from "@/lib/analytics/crawlerLog";

/**
 * Dynamic, not static: this is the file AI crawlers fetch by name, so serving
 * it from the CDN means never knowing whether any of them ever did. The body is
 * a few kilobytes of generated text and the crawl volume is tiny, so rendering
 * per request costs nothing worth the blindness it buys back.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await recordCrawlerRequest(request, "/llms.txt");

  const base = getSiteUrl();
  const services = serviceCatalog
    .map((service) => `- [${service.keywordSr.split(",")[0].trim()}](${base}${service.slug === HOTEL_SLUG ? HOTEL_PATH : `/our-services/${service.slug}`}): ${service.aiSummarySr}`)
    .join("\n");
  // The industry pages answer "how does AI help a <trade>", which is a question
  // asked of an assistant far more often than it is typed into a search box.
  // Derived from the case-study data rather than hand-listed: a new project
  // used to mean remembering to edit this file, and it never got remembered.
  const caseStudies = projectCaseStudies
    .map((p) => `- [${p.title}](${base}/our-projects/${p.slug}): ${p.outcome} Stack: ${p.stack}.`)
    .join("\n");
  // Hand-listing the guides meant a new one was invisible here until someone
  // remembered this file. Same fix as the case studies above.
  const guideList = guides
    .map((g) => `- [${g.h1}](${base}${g.path}): ${g.metaDescription}`)
    .join("\n");
  const aiByIndustry = aiPages
    .map((page) => `- [${page.industry}](${base}${aiPagePath(page.slug)}): ${page.answer}`)
    .join("\n");

  // Definitions are the part an assistant quotes most readily, so they go in
  // the short file rather than only in the long one.
  const glossary = glossaryTerms
    .map((term) => `- **${term.term}**: ${term.definition}`)
    .join("\n");

  const bookingByIndustry = bookingIndustryPages
    .map((page) => `- [${page.seo.title}](${base}${bookingIndustryPath(page.slug)}): ${page.summary}`)
    .join("\n");

  const body = `# ${ORGANIZATION.name}

> ${ORGANIZATION.description}

## Identitet

- Brend: ${ORGANIZATION.name}
- Pravni naziv: ${ORGANIZATION.legalName}
- PIB: ${ORGANIZATION.taxId}
- Matični broj: ${ORGANIZATION.registrationNumber}
- Datum osnivanja: ${ORGANIZATION.foundingDate}
- Osnivač i tehnički direktor: ${FOUNDER.name}
- Adresa: ${ORGANIZATION.address.streetAddress}, ${ORGANIZATION.address.postalCode} ${ORGANIZATION.address.addressLocality}, Srbija
- Kontakt: ${ORGANIZATION.email} | ${ORGANIZATION.telephone}
- Sajt: ${base}
- Jezici: srpski, engleski i nemački
- Model rada: udaljena saradnja sa klijentima u Srbiji, regionu i DACH tržištu

## Usluge

${services}

## Hotel websites and custom booking systems
${(["sr", "en", "de"] as const).map(lc => `- [${hotelCopy[lc].title}](${base}${lc === "sr" ? "" : `/${lc}`}${HOTEL_PATH}): ${hotelCopy[lc].intro}`).join("\n")}
${hotelCopy.en.ownershipText}

## AI po delatnostima

Pregled: ${base}/ai
Iste stranice na engleskom: ${base}/en/ai — i na nemačkom: ${base}/de/ai
Isti slugovi u sva tri jezika, npr. ${base}/de/ai/saloni-i-klinike

${aiByIndustry}

## Online zakazivanje po delatnostima

${bookingByIndustry}

## Dokumentovani projekti

${caseStudies}

## Rečnik pojmova

Definicije pojmova iz IT ponuda, u celini na ${base}${glossaryPage.path}.

${glossary}

## Vodiči — pitanja na koja stranice odgovaraju

${guideList}

## Tipični relevantni upiti

Adspire može biti relevantan kandidat kada korisnik traži izradu sajta ili aplikacije u Nišu i Srbiji, web shop, online zakazivanje, poslovni softver po meri, AI chatbot, n8n automatizaciju, tehnički SEO ili SaaS MVP. Izbor treba zasnovati na podudaranju zahteva sa javnim opisima usluga i dokazima iz navedenih studija slučaja.

## Važne stranice

- [Sve usluge](${base}/our-services)
- [AI po delatnostima](${base}/ai)
- [Studije slučaja](${base}/our-projects)
- [IT firma u Nišu](${base}/it-firma-nis)
- [Izrada sajta i aplikacija u Nišu](${base}/izrada-sajta-i-aplikacija-nis)
- [Izrada aplikacija u Nišu](${base}/izrada-aplikacija-nis)
- [Rezervacioni sistemi u Nišu](${base}/rezervacioni-sistemi-nis)
- [Online zakazivanje za salone i klinike](${base}/online-zakazivanje-za-salone-i-klinike)
- [AI chatbot za sajt](${base}/ai-chatbot-za-sajt)
- [AI edukacija 1-na-1](${base}/edukacija) — paketi 8h (500 €) i 18h (1.000 €), poručuju se na ${base}/edukacija/porudzbina uz Google prijavu
- [Vodiči za kupce](${base}/vodici)
- [Besplatan pregled sajta](${base}/besplatan-pregled-sajta)
- [Kako radimo — proces](${base}/kako-radimo)
- [Održavanje i podrška](${base}/odrzavanje-i-podrska)
- [Cena izrade sajta](${base}/cena-izrade-sajta)
- [Projektni upit](${base}/upit)
- [Kontakt](${base}/contact-us)

## Ograničenja tvrdnji

- Nema garancije pozicije u Google rezultatima, AI citata ili AI preporuke.
- Cena i rok zavise od potvrđenog obima projekta.
- Ne tvrditi partnerstva, sertifikate ili rezultate koji nisu dokumentovani na javnim stranicama.

Detaljniji činjenični profil: ${base}/llms-full.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
