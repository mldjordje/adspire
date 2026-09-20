/**
 * Per-industry pages: "what can digital work do for my trade".
 *
 * Three page layers already touch an industry and this one must not repeat
 * them. `/online-zakazivanje/[slug]` sells one feature — the appointment — to a
 * trade. The five root `nichePages` sell a whole system to a trade we have a
 * case study for. These sell the whole *business*, split into the four ways we
 * can deliver it: the public site, a web app, a mobile app, and the internal
 * system nobody outside the company ever sees.
 *
 * The four layers are the point. A dentist searching "program za zakazivanje
 * pacijenata" does not know that the same build can also hold the patient
 * record, the recall reminder and the monthly invoice run — and no service page
 * ever tells them, because service pages are organised by what we sell rather
 * than by what their day looks like.
 *
 * Content rule, enforced in the tests: an industry without real, named
 * workflows does not get a page. Google treats a template with the trade name
 * swapped in as scaled content abuse, and that penalty lands on the domain, not
 * on the page. Same honesty rules as everywhere else — `proof` holds only live
 * client systems, and stays empty when there are none.
 */

export type IndustrySector =
  | "zdravstvo"
  | "lepota-i-nega"
  | "auto-i-transport"
  | "proizvodnja-i-gradnja"
  | "trgovina"
  | "ugostiteljstvo-i-turizam"
  | "obrazovanje"
  | "profesionalne-usluge"
  | "sport-i-rekreacija"
  | "kreativne-industrije";

export const industrySectorLabels: Record<IndustrySector, string> = {
  zdravstvo: "Zdravstvo",
  "lepota-i-nega": "Lepota i nega",
  "auto-i-transport": "Auto i transport",
  "proizvodnja-i-gradnja": "Proizvodnja i gradnja",
  trgovina: "Trgovina",
  "ugostiteljstvo-i-turizam": "Ugostiteljstvo i turizam",
  obrazovanje: "Obrazovanje",
  "profesionalne-usluge": "Profesionalne usluge",
  "sport-i-rekreacija": "Sport i rekreacija",
  "kreativne-industrije": "Kreativne industrije",
};

/** Order the hub renders sectors in. */
export const industrySectorOrder: IndustrySector[] = [
  "zdravstvo",
  "lepota-i-nega",
  "auto-i-transport",
  "proizvodnja-i-gradnja",
  "trgovina",
  "ugostiteljstvo-i-turizam",
  "obrazovanje",
  "profesionalne-usluge",
  "sport-i-rekreacija",
  "kreativne-industrije",
];

export type IndustryProof = {
  name: string;
  sector: string;
  note: string;
  href: string;
  cta: string;
  image?: string;
  /** Link leaves adspire.rs — rendered with target=_blank. */
  external?: boolean;
};

export type IndustryLayer = {
  /** One sentence: what this delivery layer is for in this trade. */
  lead: string;
  items: { title: string; body: string }[];
};

export type IndustryPage = {
  slug: string;
  sector: IndustrySector;
  /** Short label for the hub, cross-links and breadcrumbs. */
  navLabel: string;
  seo: { title: string; metaDescription: string; keywords: string[] };
  hero: { eyebrow: string; title: string; lead: string };
  /** Two or three sentences that answer the search on their own — `data-answer` + speakable. */
  summary: string;
  /** Who this is for, concretely: "ordinacija sa 2–6 stolica", not "mala preduzeća". */
  audience: string[];
  /** Where the hours actually leak in this trade, in its own words. */
  dayInTheLife: { title: string; body: string }[];
  /** The four delivery layers. Every one of them, every page — the tests check it. */
  layers: {
    site: IndustryLayer;
    webApp: IndustryLayer;
    mobile: IndustryLayer;
    internal: IndustryLayer;
  };
  /**
   * Obligations that shape the build in this trade: e-faktura, fiskalizacija,
   * a patient record, HACCP, a licence register. Empty only when the trade
   * genuinely has none.
   */
  compliance: { title: string; body: string }[];
  /** "Šta tačno plaćate" — hours and fees that stop, never a price. */
  value: { title: string; lead: string; items: { title: string; body: string }[] };
  /** Live client systems only. Empty is fine; inventing one is not. */
  proof: IndustryProof[];
  faq: { q: string; a: string }[];
  /** Service slug for /upit/brzo?usluga=… — must exist in the inquiry catalog. */
  inquiryService: string;
  related: { href: string; label: string }[];
};

export function industryPath(slug: string) {
  return `/${slug}`;
}

export const INDUSTRY_HUB_PATH = "/resenja-po-delatnosti";
