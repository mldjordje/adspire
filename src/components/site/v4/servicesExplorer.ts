import { bookingIndustryPages, bookingIndustryPath } from "@/content/site/bookingIndustryPages";
import { industryPages, industryPath, industrySectorLabels, INDUSTRY_HUB_PATH } from "@/content/site/industries";
import { nichePages, nichePath } from "@/content/site/nichePages";
import { HOTEL_PATH } from "@/content/site/hotel";
import { DIASPORA_PATH } from "@/content/site/diasporaPage";
import { AEO_PATH } from "@/content/site/aeoPage";

/**
 * Every service page the site has, in a handful of named groups — the SR
 * services index.
 *
 * The index used to list only the fourteen catalog services, so the pages
 * added since (per-trade software, booking by trade, AI education and video,
 * AEO, the diaspora offer) were reachable from the menu but not from the page
 * that claims to show everything. Registries are read directly, so a new
 * niche, trade or booking page shows up here without touching this file.
 */

export type ExplorerItem = { href: string; label: string; hint?: string };

export type ExplorerGroup = {
  id: string;
  title: string;
  /** One line under the collapsed title, like the mobile menu. */
  hint: string;
  /** Short intro above the items once the group is open. */
  lead: string;
  items: ExplorerItem[];
  /** Closing link to the page that covers the whole group. */
  more?: ExplorerItem;
};

/** Niche pages carry no sector; these two match the industry pages' labels. */
const nicheSector: Record<string, string> = {
  "softver-za-salon-lepote": industrySectorLabels["lepota-i-nega"],
  "softver-za-teretanu": industrySectorLabels["sport-i-rekreacija"],
};

const niche = (slug: string) => nichePages.find((p) => p.slug === slug);

export function servicesExplorer(): ExplorerGroup[] {
  const nicheSoftware = nichePages.filter((p) => p.slug.startsWith("softver-za-"));

  return [
    {
      id: "sajt-i-prodaja",
      title: "Sajt i online prodaja",
      hint: "Sajt za firmu, web shop, hotel, redizajn",
      lead: "Sajt koji objašnjava šta radite i vodi do upita ili porudžbine.",
      items: [
        { href: nichePath("prezentacioni-sajt-za-firmu"), label: niche("prezentacioni-sajt-za-firmu")?.navLabel ?? "Prezentacioni sajt", hint: "Sajt koji donosi upite" },
        { href: nichePath("izrada-web-shopa"), label: "Web shop po meri", hint: "Prodaja, plaćanje karticom, lager" },
        { href: HOTEL_PATH, label: "Hotelski rezervacioni sistem", hint: "Direktne rezervacije bez provizije" },
        { href: nichePath("sajt-za-gradjevinsku-firmu"), label: "Sajt za građevinsku firmu", hint: "Upiti, ponude, gradilišta" },
        { href: "/our-services/web-prezentacije", label: "Web sajtovi i prezentacije", hint: "Next.js, SEO, CMS" },
        { href: "/our-services/e-commerce-web-shop", label: "E-commerce sistemi", hint: "Headless prodavnice, pretplate" },
        { href: "/our-services/cms-sistemi", label: "CMS sistemi", hint: "Sadržaj menjate sami" },
        { href: "/our-services/interaktivne-web-tehnologije", label: "Interaktivni i 3D sajtovi", hint: "WebGL i animacije" },
        { href: "/prenos-sajta-sa-druge-agencije", label: "Prenos sajta sa druge agencije", hint: "Bez gubitka pozicija na Google-u" },
      ],
    },
    {
      id: "zakazivanje",
      title: "Online zakazivanje",
      hint: "Termini bez telefona, po delatnosti",
      lead: "Klijent sam bira termin, podsetnik stiže sam, vi ne dežurate na telefonu.",
      items: [
        ...bookingIndustryPages.map((p) => ({ href: bookingIndustryPath(p.slug), label: p.navLabel, hint: p.hero.title })),
        { href: "/our-services/sistemi-za-zakazivanje", label: "Sistem za zakazivanje po meri", hint: "Za delatnost koje nema na listi" },
        { href: "/rezervacioni-sistemi-nis", label: "Rezervacioni sistemi u Nišu", hint: "Sastanak uživo" },
      ],
      more: { href: "/online-zakazivanje-za-salone-i-klinike", label: "Sve o online zakazivanju" },
    },
    {
      id: "po-delatnosti",
      title: "Softver po delatnosti",
      hint: "Ordinacije, saloni, servisi, kancelarije…",
      lead: "Sajt, aplikacija i interni sistem složeni za jednu branšu i njen dan.",
      items: [
        ...nicheSoftware.map((p) => ({ href: nichePath(p.slug), label: p.navLabel, hint: nicheSector[p.slug] })),
        ...industryPages.map((p) => ({ href: industryPath(p.slug), label: p.navLabel, hint: industrySectorLabels[p.sector] })),
      ],
      more: { href: INDUSTRY_HUB_PATH, label: "Sve delatnosti na jednom mestu" },
    },
    {
      id: "aplikacije",
      title: "Aplikacije i interni softver",
      hint: "Umesto Excel tabela, mobilne aplikacije, SaaS",
      lead: "Alati koji vama i timu vraćaju sate svake nedelje.",
      items: [
        { href: "/our-services/interne-poslovne-aplikacije", label: "Interne poslovne aplikacije", hint: "Evidencija, izveštaji, fakture" },
        { href: "/our-services/mobilne-aplikacije", label: "Mobilne aplikacije", hint: "iOS, Android, PWA" },
        { href: "/our-services/saas-razvoj", label: "SaaS razvoj", hint: "Od MVP-a do pretplata" },
        { href: "/our-services/business-intelligence-analitika", label: "Analitika i izveštaji", hint: "Svi podaci na jednom ekranu" },
        { href: "/our-services/industrijska-resenja", label: "Industrijska rešenja", hint: "Proizvodnja, logistika" },
        { href: "/interni-softver-umesto-excel-tabela", label: "Interni softver umesto Excela", hint: "Kada se isplati" },
        { href: "/izrada-aplikacija-nis", label: "Izrada aplikacija u Nišu" },
      ],
    },
    {
      id: "ai",
      title: "AI",
      hint: "Edukacija, AI video, automatizacija, chatbot",
      lead: "Tri različite stvari: da naučite, da mi napravimo, ili da AI radi deo posla.",
      items: [
        { href: "/edukacija", label: "AI edukacija 1-na-1", hint: "Naučite da pravite viralne klipove" },
        { href: "/ai-video-za-vas-biznis", label: "AI video za vaš biznis", hint: "Mi pravimo klipove, vi objavljujete" },
        { href: "/ai-u-biznisu", label: "AI u biznisu", hint: "Automatizacija posla koji se ponavlja" },
        { href: "/ai-chatbot-za-sajt", label: "AI chatbot za sajt", hint: "Odgovara na upite umesto vas" },
        { href: "/our-services/ai-integracije-automatizacija", label: "AI integracije", hint: "Agenti, n8n, LLM" },
        { href: "/ai", label: "AI po delatnostima", hint: "Šta AI radi u vašoj branši" },
      ],
    },
    {
      id: "vidljivost",
      title: "Vidljivost i rast",
      hint: "Google, AI preporuke, oglasi, pregled sajta",
      lead: "Da vas nađu oni koji već traže ono što prodajete.",
      items: [
        { href: AEO_PATH, label: "Da vas AI preporuči", hint: "Budite odgovor kad kupac pita ChatGPT" },
        { href: "/our-services/seo-digitalni-marketing", label: "SEO i digitalni marketing", hint: "Google, oglasi, analitika" },
        { href: "/seo-optimizacija-nis", label: "SEO optimizacija u Nišu" },
        { href: "/besplatan-pregled-sajta", label: "Besplatan pregled sajta", hint: "Šta vam koči upite" },
        { href: "/google-oglasi-ili-seo", label: "Google oglasi ili SEO?", hint: "Šta prvo" },
      ],
    },
    {
      id: "odrzavanje",
      title: "Održavanje i sigurnost",
      hint: "Podrška, hosting, zaštita podataka",
      lead: "Sistem koji radi i posle predaje, i podaci koji ostaju vaši.",
      items: [
        { href: "/odrzavanje-i-podrska", label: "Održavanje i podrška", hint: "Izmene, ažuriranja, dežurstvo" },
        { href: "/our-services/hosting-infrastruktura", label: "Hosting i infrastruktura", hint: "Cloud, backup, monitoring" },
        { href: "/our-services/cyber-security-gdpr", label: "Sigurnost i GDPR", hint: "Audit i zaštita podataka" },
      ],
    },
    {
      id: "za-koga",
      title: "Za koga još radimo",
      hint: "Dijaspora, agencije, firme iz Niša",
      lead: "Isti tim, drugačiji dogovor.",
      items: [
        { href: DIASPORA_PATH, label: "Naši ljudi sa firmom u EU", hint: "Dogovor na našem jeziku" },
        { href: "/white-label", label: "Agencije (white-label)", hint: "Radimo pod vašim imenom" },
        { href: "/it-firma-nis", label: "IT firma u Nišu" },
        { href: "/izrada-sajta-i-aplikacija-nis", label: "Sajt i aplikacija u Nišu" },
        { href: "/web-shop-nis", label: "Web shop u Nišu" },
      ],
    },
  ];
}
