import { defaultLocale, type LocaleCode } from "@/lib/site-config";

// ─────────────────────────────────────────────────────────────────────────────
// UI strings that live OUTSIDE LocalizedPageContent: chrome (menu/footer/loader),
// the composite landing page, and a post-pass map that translates the recurring
// hardcoded-SR phrases emitted by azurioContentTransform render functions.
// ─────────────────────────────────────────────────────────────────────────────

type LandingService = {
  title: string;
  tags: readonly string[];
  summary: string;
};

type LandingSlide = {
  eyebrow: string;
  heading: string;
  body: string;
};

type CraftItem = {
  strong: string;
  em: string;
};

type LandingProject = {
  cat: string;
  title: string;
  summary: string;
  outcome: string;
};

export type UiStrings = {
  // Chrome / navigation
  menuCaption: string;
  nav: {
    home: string;
    services: string;
    servicesOverview: string;
    projects: string;
    pages: string;
    about: string;
    faq: string;
    nisDev: string;
    blog: string;
    contact: string;
  };
  loading: string;
  backToTop: string;
  headerCta: string;
  copyrightReserved: string;
  langLabel: string;
  // Composite landing
  landing: {
    heroTitle: string;
    heroMark: string;
    heroScroll: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    services: LandingService[];
    servicesKnowMore: string;
    cinema: { eyebrowSuffixes: string[]; slides: LandingSlide[] };
    craft: { eyebrow: string; heading: string; desc: string; items: CraftItem[] };
    metrics: { num: string; label: string }[];
    projectsAria: string;
    projects: LandingProject[];
    projectsLink: string;
  };
};

// Service hrefs/scenes/videos are structural — kept in the composite. The dict
// only carries title/tags/summary in display order (8 services).

const sr: UiStrings = {
  menuCaption:
    "Razvojni i tehnološki partner — web, aplikacije, poslovni sistemi i AI automatizacija.",
  nav: {
    home: "Početna",
    services: "Usluge",
    servicesOverview: "Sve usluge",
    projects: "Projekti",
    pages: "Stranice",
    about: "O nama",
    faq: "FAQ",
    nisDev: "Izrada u Nišu",
    blog: "Blog",
    contact: "Kontakt",
  },
  loading: "Učitavanje",
  backToTop: "Nazad na vrh",
  headerCta: "Pokreni projekat",
  copyrightReserved: "Sva prava zadržana",
  langLabel: "Jezik",
  landing: {
    heroTitle: "Sajt koji donosi upite.",
    heroMark: "Adspire Digital",
    heroScroll: "Istraži",
    heroCtaPrimary: "Zakaži poziv",
    heroCtaSecondary: "Radovi",
    services: [
      { title: "Web sajtovi", tags: ["Next.js", "SEO"], summary: "Brz sajt koji posetioca vodi do upita." },
      { title: "Web shop", tags: ["Katalog", "Plaćanje"], summary: "Prodaja i porudžbine u jednom toku." },
      { title: "Mobilne aplikacije", tags: ["PWA", "iOS / Android"], summary: "Aplikacije za korisnike i timove." },
      { title: "CMS sistemi", tags: ["Admin", "Sadržaj"], summary: "Izmene sadržaja bez programera." },
      { title: "AI automatizacija", tags: ["LLM", "n8n"], summary: "Manje ručnog rada u prodaji i podršci." },
      { title: "SEO & marketing", tags: ["SEO", "Ads"], summary: "Vidljivost i merljivi rezultati." },
      { title: "Security & GDPR", tags: ["Audit", "GDPR"], summary: "Sigurnost i zaštita podataka." },
      { title: "UI/UX dizajn", tags: ["Figma", "Motion"], summary: "Interfejs koji jasno vodi korisnika." },
    ],
    servicesKnowMore: "Saznaj više",
    cinema: {
      eyebrowSuffixes: ["UI/UX & Motion", "Next.js · WebGL", "Core Web Vitals"],
      slides: [
        { eyebrow: "/ 01", heading: "Svaki piksel<br>ima razlog", body: "Design sistem i pixel-perfect izrada — interfejs koji ubeđuje pre prvog reda teksta." },
        { eyebrow: "/ 02", heading: "Produkcijski<br>kod od dana 1", body: "TypeScript, server components i 3D efekti — arhitektura spremna za rast." },
        { eyebrow: "/ 03", heading: "100/100<br>od prvog deploya", body: "LCP ispod 1.2s, CLS nula. Performanse i SEO gradimo u prvoj iteraciji." },
      ],
    },
    craft: {
      eyebrow: "Naš pristup",
      heading: "Stack koji nosi produkciju",
      desc: "Biramo tehnologije dokazane u produkciji. Svaki sloj ima razlog.",
      items: [
        { strong: "Next.js · TypeScript", em: "Brz, indeksiran, skalabilan" },
        { strong: "Three.js · WebGL · Spline", em: "3D scene i scroll animacije" },
        { strong: "Figma → produkcijski kod", em: "Design sistem bez kompromisa" },
        { strong: "AI · LLM · n8n", em: "Automatizacija prodaje i podrške" },
      ],
    },
    metrics: [
      { num: "100", label: "Core Web Vitals — Lighthouse" },
      { num: "5+", label: "Produkcijskih sistema, live" },
      { num: "48h", label: "Od brifa do prototipa" },
      { num: "3D", label: "WebGL · Three.js u produkciji" },
    ],
    projectsAria: "Odabrani projekti",
    projects: [
      { cat: "Estetska klinika", title: "Booking platforma + admin kalendar", summary: "Javni sajt, online zakazivanje i admin panel za Dr Igić Clinic.", outcome: "Termini, klijenti i analitika u jednom sistemu." },
      { cat: "Transport · Logistika", title: "SEO sajt + CRM panel", summary: "Katalog usluga, upit forma i interni panel za Prevoz Kop.", outcome: "Upiti sa sajta ulaze pravo u prodajni tok." },
      { cat: "Modni brend", title: "E-commerce + admin platforma", summary: "Web shop i administracija za Santos & Santorini.", outcome: "Prodaja, lager i porudžbine iz jedne platforme." },
      { cat: "EdTech", title: "Onboarding aplikacija", summary: "Prijava, audio intervju i referral za TeachFromHome.", outcome: "Prijave u merljivom funnel-u, ne u inboxu." },
      { cat: "Barber studio", title: "Booking sistem 24/7", summary: "Online termini i admin kalendar za Doctor Barber.", outcome: "Raspored radi 24/7, bez ručnog dogovaranja." },
    ],
    projectsLink: "Pogledaj projekat →",
  },
};

const en: UiStrings = {
  menuCaption:
    "Development & technology partner — web, apps, business systems and AI automation.",
  nav: {
    home: "Home",
    services: "Services",
    servicesOverview: "All services",
    projects: "Projects",
    pages: "Pages",
    about: "About",
    faq: "FAQ",
    nisDev: "Built in Niš",
    blog: "Blog",
    contact: "Contact",
  },
  loading: "Loading",
  backToTop: "Back to top",
  headerCta: "Start a project",
  copyrightReserved: "All rights reserved",
  langLabel: "Language",
  landing: {
    heroTitle: "A website that brings leads.",
    heroMark: "Adspire Digital",
    heroScroll: "Explore",
    heroCtaPrimary: "Book a call",
    heroCtaSecondary: "Work",
    services: [
      { title: "Websites", tags: ["Next.js", "SEO"], summary: "Fast sites that guide visitors to an enquiry." },
      { title: "Web shop", tags: ["Catalog", "Payments"], summary: "Sales and orders in one flow." },
      { title: "Mobile apps", tags: ["PWA", "iOS / Android"], summary: "Apps for customers and internal teams." },
      { title: "CMS systems", tags: ["Admin", "Content"], summary: "Edit content without a developer." },
      { title: "AI automation", tags: ["LLM", "n8n"], summary: "Less manual work in sales and support." },
      { title: "SEO & marketing", tags: ["SEO", "Ads"], summary: "Visibility and measurable results." },
      { title: "Security & GDPR", tags: ["Audit", "GDPR"], summary: "Security and data protection." },
      { title: "UI/UX design", tags: ["Figma", "Motion"], summary: "Interfaces that guide the user clearly." },
    ],
    servicesKnowMore: "Learn more",
    cinema: {
      eyebrowSuffixes: ["UI/UX & Motion", "Next.js · WebGL", "Core Web Vitals"],
      slides: [
        { eyebrow: "/ 01", heading: "Every pixel<br>has a reason", body: "A design system and pixel-perfect build — an interface that convinces before the first line of copy." },
        { eyebrow: "/ 02", heading: "Production code<br>from day 1", body: "TypeScript, server components and 3D effects — an architecture ready to scale." },
        { eyebrow: "/ 03", heading: "100/100<br>from first deploy", body: "LCP under 1.2s, zero CLS. We build performance and SEO into the first iteration." },
      ],
    },
    craft: {
      eyebrow: "Our approach",
      heading: "A stack that ships to production",
      desc: "We pick technologies proven in production. Every layer has a reason.",
      items: [
        { strong: "Next.js · TypeScript", em: "Fast, indexed, scalable" },
        { strong: "Three.js · WebGL · Spline", em: "3D scenes and scroll animations" },
        { strong: "Figma → production code", em: "A design system without compromise" },
        { strong: "AI · LLM · n8n", em: "Automating sales and support" },
      ],
    },
    metrics: [
      { num: "100", label: "Core Web Vitals — Lighthouse" },
      { num: "5+", label: "Production systems, live" },
      { num: "48h", label: "From brief to prototype" },
      { num: "3D", label: "WebGL · Three.js in production" },
    ],
    projectsAria: "Selected projects",
    projects: [
      { cat: "Aesthetic clinic", title: "Booking platform + admin calendar", summary: "Public site, online booking and admin panel for Dr Igić Clinic.", outcome: "Appointments, clients and analytics in one system." },
      { cat: "Transport · Logistics", title: "SEO site + CRM panel", summary: "Service catalog, enquiry form and internal panel for Prevoz Kop.", outcome: "Site enquiries flow straight into the sales pipeline." },
      { cat: "Fashion brand", title: "E-commerce + admin platform", summary: "Web shop and administration for Santos & Santorini.", outcome: "Sales, stock and orders from a single platform." },
      { cat: "EdTech", title: "Onboarding application", summary: "Sign-up, audio interview and referral for TeachFromHome.", outcome: "Applications in a measurable funnel, not an inbox." },
      { cat: "Barber studio", title: "24/7 booking system", summary: "Online appointments and admin calendar for Doctor Barber.", outcome: "Scheduling runs 24/7, no manual back-and-forth." },
    ],
    projectsLink: "View project →",
  },
};

const de: UiStrings = {
  menuCaption:
    "Entwicklungs- und Technologiepartner — Web, Apps, Geschäftssysteme und KI-Automatisierung.",
  nav: {
    home: "Start",
    services: "Leistungen",
    servicesOverview: "Alle Leistungen",
    projects: "Projekte",
    pages: "Seiten",
    about: "Über uns",
    faq: "FAQ",
    nisDev: "Entwickelt in Niš",
    blog: "Blog",
    contact: "Kontakt",
  },
  loading: "Lädt",
  backToTop: "Nach oben",
  headerCta: "Projekt starten",
  copyrightReserved: "Alle Rechte vorbehalten",
  langLabel: "Sprache",
  landing: {
    heroTitle: "Eine Website, die Anfragen bringt.",
    heroMark: "Adspire Digital",
    heroScroll: "Entdecken",
    heroCtaPrimary: "Termin buchen",
    heroCtaSecondary: "Arbeiten",
    services: [
      { title: "Websites", tags: ["Next.js", "SEO"], summary: "Schnelle Seiten, die Besucher zur Anfrage führen." },
      { title: "Onlineshop", tags: ["Katalog", "Zahlung"], summary: "Verkauf und Bestellungen in einem Ablauf." },
      { title: "Mobile Apps", tags: ["PWA", "iOS / Android"], summary: "Apps für Kunden und interne Teams." },
      { title: "CMS-Systeme", tags: ["Admin", "Inhalte"], summary: "Inhalte ohne Entwickler ändern." },
      { title: "KI-Automatisierung", tags: ["LLM", "n8n"], summary: "Weniger manuelle Arbeit in Vertrieb und Support." },
      { title: "SEO & Marketing", tags: ["SEO", "Ads"], summary: "Sichtbarkeit und messbare Ergebnisse." },
      { title: "Security & DSGVO", tags: ["Audit", "DSGVO"], summary: "Sicherheit und Datenschutz." },
      { title: "UI/UX-Design", tags: ["Figma", "Motion"], summary: "Interfaces, die den Nutzer klar führen." },
    ],
    servicesKnowMore: "Mehr erfahren",
    cinema: {
      eyebrowSuffixes: ["UI/UX & Motion", "Next.js · WebGL", "Core Web Vitals"],
      slides: [
        { eyebrow: "/ 01", heading: "Jedes Pixel<br>hat einen Grund", body: "Ein Designsystem und pixelgenaue Umsetzung — ein Interface, das überzeugt, bevor die erste Zeile Text kommt." },
        { eyebrow: "/ 02", heading: "Produktionscode<br>ab Tag 1", body: "TypeScript, Server Components und 3D-Effekte — eine Architektur, die skaliert." },
        { eyebrow: "/ 03", heading: "100/100<br>ab dem ersten Deploy", body: "LCP unter 1,2s, null CLS. Performance und SEO bauen wir in die erste Iteration ein." },
      ],
    },
    craft: {
      eyebrow: "Unser Ansatz",
      heading: "Ein Stack für die Produktion",
      desc: "Wir setzen auf in der Produktion bewährte Technologien. Jede Schicht hat einen Grund.",
      items: [
        { strong: "Next.js · TypeScript", em: "Schnell, indexiert, skalierbar" },
        { strong: "Three.js · WebGL · Spline", em: "3D-Szenen und Scroll-Animationen" },
        { strong: "Figma → Produktionscode", em: "Ein Designsystem ohne Kompromisse" },
        { strong: "KI · LLM · n8n", em: "Vertrieb und Support automatisieren" },
      ],
    },
    metrics: [
      { num: "100", label: "Core Web Vitals — Lighthouse" },
      { num: "5+", label: "Produktivsysteme, live" },
      { num: "48h", label: "Vom Brief zum Prototyp" },
      { num: "3D", label: "WebGL · Three.js in Produktion" },
    ],
    projectsAria: "Ausgewählte Projekte",
    projects: [
      { cat: "Ästhetikklinik", title: "Buchungsplattform + Admin-Kalender", summary: "Website, Online-Buchung und Admin-Panel für Dr Igić Clinic.", outcome: "Termine, Kunden und Analytics in einem System." },
      { cat: "Transport · Logistik", title: "SEO-Website + CRM-Panel", summary: "Leistungskatalog, Anfrageformular und internes Panel für Prevoz Kop.", outcome: "Anfragen fließen direkt in den Vertrieb." },
      { cat: "Modemarke", title: "E-Commerce + Admin-Plattform", summary: "Onlineshop und Verwaltung für Santos & Santorini.", outcome: "Verkauf, Lager und Bestellungen aus einer Plattform." },
      { cat: "EdTech", title: "Onboarding-Anwendung", summary: "Anmeldung, Audio-Interview und Referral für TeachFromHome.", outcome: "Bewerbungen im messbaren Funnel statt im Postfach." },
      { cat: "Barbershop", title: "24/7-Buchungssystem", summary: "Online-Termine und Admin-Kalender für Doctor Barber.", outcome: "Terminplanung läuft rund um die Uhr." },
    ],
    projectsLink: "Projekt ansehen →",
  },
};

const uiByLocale: Record<LocaleCode, UiStrings> = { sr, en, de };

export function getUiStrings(locale: LocaleCode): UiStrings {
  return uiByLocale[locale] ?? uiByLocale[defaultLocale];
}

// ─── Post-pass: translate the recurring hardcoded-SR phrases in transformed HTML
// for non-SR locales. Keys are the exact SR phrases emitted by render functions.
// Order matters: longer phrases first so they are not partially matched.

const PHRASE_MAP: Record<Exclude<LocaleCode, "sr">, Array<[string, string]>> = {
  en: [
    ["Pregled svih usluga", "All services"],
    ["Pogledaj live projekat", "View live project"],
    ["Često postavljena pitanja", "Frequently asked questions"],
    ["Pokreni razgovor", "Start a conversation"],
    ["Pogledaj usluge", "View services"],
    ["Pogledaj projekte", "View projects"],
    ["Sledeći projekat", "Next project"],
    ["Sledeci projekat", "Next project"],
    ["Sledeća usluga", "Next service"],
    ["Sledeca usluga", "Next service"],
    ["Nastavi skrolovanje", "Scroll to explore"],
    ["Više o projektu", "More about the project"],
    ["Sve usluge", "All services"],
    ["Svi projekti", "All projects"],
    ["Radno vreme", "Office hours"],
    ["Uspešno poslato", "Sent successfully"],
    ["Uspesno poslato", "Sent successfully"],
    ["Saznaj više", "Learn more"],
    ["Početna", "Home"],
    ["Pocetna", "Home"],
    ["Projekti", "Projects"],
    ["Usluge", "Services"],
    ["Kontakt", "Contact"],
    ["Firma", "Company"],
    ["Telefon", "Phone"],
  ],
  de: [
    ["Pregled svih usluga", "Alle Leistungen ansehen"],
    ["Pogledaj live projekat", "Live-Projekt ansehen"],
    ["Često postavljena pitanja", "Häufige Fragen"],
    ["Pokreni razgovor", "Gespräch starten"],
    ["Pogledaj usluge", "Leistungen ansehen"],
    ["Pogledaj projekte", "Projekte ansehen"],
    ["Sledeći projekat", "Nächstes Projekt"],
    ["Sledeci projekat", "Nächstes Projekt"],
    ["Sledeća usluga", "Nächste Leistung"],
    ["Sledeca usluga", "Nächste Leistung"],
    ["Nastavi skrolovanje", "Weiterscrollen"],
    ["Više o projektu", "Mehr zum Projekt"],
    ["Sve usluge", "Alle Leistungen"],
    ["Svi projekti", "Alle Projekte"],
    ["Radno vreme", "Öffnungszeiten"],
    ["Uspešno poslato", "Erfolgreich gesendet"],
    ["Uspesno poslato", "Erfolgreich gesendet"],
    ["Saznaj više", "Mehr erfahren"],
    ["Početna", "Start"],
    ["Pocetna", "Start"],
    ["Projekti", "Projekte"],
    ["Usluge", "Leistungen"],
    ["Kontakt", "Kontakt"],
    ["Firma", "Firma"],
    ["Telefon", "Telefon"],
  ],
};

export function localizeUiPhrases(html: string, locale: LocaleCode): string {
  if (locale === "sr") return html;
  const pairs = PHRASE_MAP[locale];
  if (!pairs) return html;
  let out = html;
  for (const [from, to] of pairs) {
    out = out.split(from).join(to);
  }
  return out;
}
