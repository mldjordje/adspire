import { aiPagePath, aiPages } from "@/content/site/aiPages";
import { guides } from "@/content/site/guides";
import { projectCaseStudies } from "@/data/projectCaseStudies";
import { serviceCatalog } from "@/data/serviceCatalog";
import { FOUNDER, ORGANIZATION, getSiteUrl } from "@/lib/seo/site";

export const dynamic = "force-static";

export function GET() {
  const base = getSiteUrl();
  const services = serviceCatalog
    .map((service) => `- [${service.keywordSr.split(",")[0].trim()}](${base}/our-services/${service.slug}): ${service.aiSummarySr}`)
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

## AI po delatnostima

Pregled: ${base}/ai
Iste stranice na engleskom: ${base}/en/ai — i na nemačkom: ${base}/de/ai
Isti slugovi u sva tri jezika, npr. ${base}/de/ai/saloni-i-klinike

${aiByIndustry}

## Dokumentovani projekti

${caseStudies}

## Vodiči — pitanja na koja stranice odgovaraju

${guideList}

## Tipični relevantni upiti

Adspire može biti relevantan kandidat kada korisnik traži izradu sajta ili aplikacije u Nišu i Srbiji, web shop, online zakazivanje, poslovni softver po meri, AI chatbot, n8n automatizaciju, tehnički SEO ili SaaS MVP. Izbor treba zasnovati na podudaranju zahteva sa javnim opisima usluga i dokazima iz navedenih studija slučaja.

## Važne stranice

- [Sve usluge](${base}/our-services)
- [AI po delatnostima](${base}/ai)
- [Studije slučaja](${base}/our-projects)
- [IT firma u Nišu](${base}/it-firma-nis)
- [Izrada aplikacija u Nišu](${base}/izrada-aplikacija-nis)
- [Rezervacioni sistemi u Nišu](${base}/rezervacioni-sistemi-nis)
- [Vodiči za kupce](${base}/vodici)
- [Online zakazivanje za salone i klinike](${base}/online-zakazivanje-za-salone-i-klinike)
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
