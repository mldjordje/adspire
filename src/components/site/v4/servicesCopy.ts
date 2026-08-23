import { defaultLocale, type LocaleCode } from "@/lib/site-config";

/**
 * Copy for the services index.
 *
 * The v4 redesign hardcoded Serbian inside ServicesV4 and stopped reading
 * en.ts/de.ts, so `/en/our-services` and `/de/our-services` served Serbian
 * bodies under localized metadata — which is why they were noindex. This is
 * where their copy lives now, in the same shape as copy.ts and shellCopy.ts.
 *
 * Slugs stay Serbian in all three languages: they are the live URLs, and
 * renaming them would break links and rankings for a cosmetic gain.
 */

export type ServiceCard = {
  slug: string;
  title: string;
  desc: string;
  tags: string[];
};

export type ServicesCopy = {
  /** <title> and meta description — written for the SERP, not for the page. */
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  /** Hero title, two lines; the dot is appended by the component. */
  title: [string, string];
  intro: string;
  groups: { label: string; blurb: string; services: ServiceCard[] }[];
  processTitle: string;
  process: { num: string; title: string; desc: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  /**
   * The brief is a Serbian-only flow, so en/de point at the contact page —
   * same rule as navCtaHref in shellCopy.
   */
  ctaHref: string;
};

const sr: ServicesCopy = {
  metaTitle: "Usluge — izrada sajtova, aplikacija i AI automatizacije",
  metaDescription:
    "Sajtovi, web shopovi, sistemi za zakazivanje, interne aplikacije, AI automatizacija, SEO i hosting. Adspire Digital, Niš — jedan tim od ideje do produkcije.",
  eyebrow: "Usluge / Šta radimo",
  title: ["SVE ZA VAŠ", "DIGITALNI RAST"],
  intro:
    "Sajtovi koji dovode klijente, aplikacije koje štede vreme, AI koji radi umesto vas. Jedan tim od ideje do produkcije — bez šablona, bez agencijske magle.",
  groups: [
    {
      label: "Web i prodaja",
      blurb: "Digitalni izlog koji dovodi upite, ne samo posetioce.",
      services: [
        {
          slug: "web-prezentacije",
          title: "Web sajtovi i prezentacije",
          desc: "Brzi Next.js sajtovi sa SEO, PWA i CMS-om. Posetilac za par sekundi zna šta nudite i klikne dalje.",
          tags: ["Next.js", "SEO", "CMS", "PWA"],
        },
        {
          slug: "e-commerce-web-shop",
          title: "E-commerce i web shop",
          desc: "Custom i headless prodavnice — plaćanja, lager, pretplate i CRM u jednom sistemu koji prodaje.",
          tags: ["Web shop", "Plaćanja", "Lager"],
        },
        {
          slug: "seo-digitalni-marketing",
          title: "SEO i digitalni marketing",
          desc: "Vidljivost na Google i AI pretragama, merljive kampanje i sadržaj koji donosi kvalifikovane upite.",
          tags: ["SEO", "Ads", "Analitika"],
        },
      ],
    },
    {
      label: "Aplikacije i sistemi",
      blurb: "Alati koji vlasnicima i timovima vraćaju sate rada svake nedelje.",
      services: [
        {
          slug: "sistemi-za-zakazivanje",
          title: "Sistemi za zakazivanje",
          desc: "Online zakazivanje 24/7 za klinike, salone, frizere i servise — podsetnici seku nedolaske, kalendar se puni dok spavate.",
          tags: ["Booking", "Podsetnici", "Kalendar"],
        },
        {
          slug: "interne-poslovne-aplikacije",
          title: "Interne poslovne aplikacije",
          desc: "Zakazivanje, izveštaji, evidencija, fakture — sve što danas radite ručno kroz Excel i telefon, automatizovano.",
          tags: ["Interni sistem", "Dashboard", "Automatizacija"],
        },
        {
          slug: "mobilne-aplikacije",
          title: "Mobilne aplikacije",
          desc: "iOS, Android i PWA aplikacije za korisnike i timove — jedan kod, sve platforme.",
          tags: ["iOS", "Android", "PWA"],
        },
        {
          slug: "cms-sistemi",
          title: "CMS sistemi",
          desc: "Menjajte sadržaj, cene i blogove sami, bez programera i bez čekanja.",
          tags: ["Headless CMS", "Admin"],
        },
        {
          slug: "saas-razvoj",
          title: "SaaS razvoj",
          desc: "Od MVP-a do skalabilnog SaaS proizvoda — pretplate, multi-tenant, billing i analitika.",
          tags: ["SaaS", "Multi-tenant", "Billing"],
        },
      ],
    },
    {
      label: "AI i automatizacija",
      blurb: "Sistemi koji prodaju i odgovaraju dok vi spavate.",
      services: [
        {
          slug: "ai-integracije-automatizacija",
          title: "AI integracije i automatizacija",
          desc: "AI agenti za zakazivanje, podršku i kvalifikaciju leadova. n8n i LLM automatizacija procesa 24/7.",
          tags: ["AI agenti", "n8n", "LLM"],
        },
        {
          slug: "business-intelligence-analitika",
          title: "Business intelligence i analitika",
          desc: "Podaci iz svih sistema na jednom mestu — dashboardi koji pokazuju gde se zarađuje i gde curi novac.",
          tags: ["BI", "Dashboard", "Podaci"],
        },
        {
          slug: "interaktivne-web-tehnologije",
          title: "Interaktivne web tehnologije",
          desc: "WebGL, 3D scene i scroll animacije — prezentacija koja se pamti i deli.",
          tags: ["WebGL", "Three.js", "Motion"],
        },
      ],
    },
    {
      label: "Infrastruktura i sigurnost",
      blurb: "Temelj koji radi bez pauze i štiti vaše podatke.",
      services: [
        {
          slug: "hosting-infrastruktura",
          title: "Hosting i infrastruktura",
          desc: "Cloud hosting, CI/CD, monitoring i skaliranje — sistem koji radi 24/7 bez brige.",
          tags: ["Cloud", "CI/CD", "Monitoring"],
        },
        {
          slug: "cyber-security-gdpr",
          title: "Cyber security i GDPR",
          desc: "Security audit, zaštita podataka i GDPR usklađenost — sigurnost bez kompromisa.",
          tags: ["Audit", "GDPR", "Security"],
        },
        {
          slug: "industrijska-resenja",
          title: "Industrijska rešenja",
          desc: "Rešenja skrojena za specifične branše — od zdravstva do logistike i proizvodnje.",
          tags: ["Custom", "Integracije"],
        },
      ],
    },
  ],
  processTitle: "Kako radimo",
  process: [
    { num: "01", title: "Besplatan poziv", desc: "30 minuta. Razumemo biznis i gde curi novac ili vreme." },
    { num: "02", title: "Prototip za 48h", desc: "Klikabilan prototip pre ugovora. Vidite tačno šta plaćate." },
    { num: "03", title: "Sprint · MVP 2 nedelje", desc: "Nedeljni demo, transparentan napredak, bez iznenađenja." },
    { num: "04", title: "Launch i rast", desc: "Merenje, iteracije, AI automatizacija — sistem koji raste." },
  ],
  ctaTitle: "Ne znate odakle da počnete?",
  ctaText:
    "Zakažite besplatan poziv. Kažemo vam tačno šta bi vam donelo najviše — pre nego što potrošite dinar.",
  ctaButton: "Zakaži besplatan poziv →",
  ctaHref: "/upit",
};

const en: ServicesCopy = {
  metaTitle: "Services — websites, applications and AI automation",
  metaDescription:
    "Websites, web shops, appointment booking systems, internal applications, AI automation, SEO and hosting. Adspire Digital, Niš — one team from idea to production.",
  eyebrow: "Services / What we build",
  title: ["EVERYTHING FOR", "YOUR DIGITAL GROWTH"],
  intro:
    "Websites that bring in clients, applications that save time, AI that works while you don't. One team from idea to production — no templates, no agency fog.",
  groups: [
    {
      label: "Web and sales",
      blurb: "A storefront that produces enquiries, not just visitors.",
      services: [
        {
          slug: "web-prezentacije",
          title: "Websites and marketing sites",
          desc: "Fast Next.js sites with SEO, PWA and a CMS. A visitor knows what you offer within seconds and clicks through.",
          tags: ["Next.js", "SEO", "CMS", "PWA"],
        },
        {
          slug: "e-commerce-web-shop",
          title: "E-commerce and web shops",
          desc: "Custom and headless stores — payments, stock, subscriptions and CRM in one system that actually sells.",
          tags: ["Web shop", "Payments", "Inventory"],
        },
        {
          slug: "seo-digitalni-marketing",
          title: "SEO and digital marketing",
          desc: "Visibility in Google and in AI answers, measurable campaigns, and content that brings qualified enquiries.",
          tags: ["SEO", "Ads", "Analytics"],
        },
      ],
    },
    {
      label: "Applications and systems",
      blurb: "Tools that hand owners and teams back hours every week.",
      services: [
        {
          slug: "sistemi-za-zakazivanje",
          title: "Appointment booking systems",
          desc: "24/7 online booking for clinics, salons, barbers and workshops — reminders cut no-shows, the calendar fills while you sleep.",
          tags: ["Booking", "Reminders", "Calendar"],
        },
        {
          slug: "interne-poslovne-aplikacije",
          title: "Internal business applications",
          desc: "Scheduling, reports, records, invoices — everything you do by hand in Excel and over the phone, automated.",
          tags: ["Internal system", "Dashboard", "Automation"],
        },
        {
          slug: "mobilne-aplikacije",
          title: "Mobile applications",
          desc: "iOS, Android and PWA apps for customers and teams — one codebase, every platform.",
          tags: ["iOS", "Android", "PWA"],
        },
        {
          slug: "cms-sistemi",
          title: "CMS systems",
          desc: "Change content, prices and posts yourself, without a developer and without waiting.",
          tags: ["Headless CMS", "Admin"],
        },
        {
          slug: "saas-razvoj",
          title: "SaaS development",
          desc: "From MVP to a scalable SaaS product — subscriptions, multi-tenancy, billing and analytics.",
          tags: ["SaaS", "Multi-tenant", "Billing"],
        },
      ],
    },
    {
      label: "AI and automation",
      blurb: "Systems that sell and answer while you sleep.",
      services: [
        {
          slug: "ai-integracije-automatizacija",
          title: "AI integration and automation",
          desc: "AI agents for booking, support and lead qualification. n8n and LLM process automation, running 24/7.",
          tags: ["AI agents", "n8n", "LLM"],
        },
        {
          slug: "business-intelligence-analitika",
          title: "Business intelligence and analytics",
          desc: "Data from every system in one place — dashboards that show where you earn and where money leaks.",
          tags: ["BI", "Dashboard", "Data"],
        },
        {
          slug: "interaktivne-web-tehnologije",
          title: "Interactive web technology",
          desc: "WebGL, 3D scenes and scroll animation — a presentation people remember and share.",
          tags: ["WebGL", "Three.js", "Motion"],
        },
      ],
    },
    {
      label: "Infrastructure and security",
      blurb: "Foundations that never pause and keep your data safe.",
      services: [
        {
          slug: "hosting-infrastruktura",
          title: "Hosting and infrastructure",
          desc: "Cloud hosting, CI/CD, monitoring and scaling — a system that runs 24/7 without babysitting.",
          tags: ["Cloud", "CI/CD", "Monitoring"],
        },
        {
          slug: "cyber-security-gdpr",
          title: "Cyber security and GDPR",
          desc: "Security audits, data protection and GDPR compliance — safety without compromise.",
          tags: ["Audit", "GDPR", "Security"],
        },
        {
          slug: "industrijska-resenja",
          title: "Industry solutions",
          desc: "Solutions cut for a specific trade — from healthcare to logistics and manufacturing.",
          tags: ["Custom", "Integrations"],
        },
      ],
    },
  ],
  processTitle: "How we work",
  process: [
    { num: "01", title: "Free call", desc: "30 minutes. We work out the business and where money or time leaks." },
    { num: "02", title: "Prototype in 48h", desc: "A clickable prototype before any contract. You see exactly what you are paying for." },
    { num: "03", title: "Sprint · MVP in 2 weeks", desc: "Weekly demo, visible progress, no surprises." },
    { num: "04", title: "Launch and growth", desc: "Measurement, iteration, AI automation — a system that keeps growing." },
  ],
  ctaTitle: "Not sure where to start?",
  ctaText:
    "Book a free call. We will tell you exactly what would move the needle most — before you spend anything.",
  ctaButton: "Book a free call →",
  ctaHref: "/contact-us",
};

const de: ServicesCopy = {
  metaTitle: "Leistungen — Websites, Anwendungen und KI-Automatisierung",
  metaDescription:
    "Websites, Webshops, Terminbuchungssysteme, interne Anwendungen, KI-Automatisierung, SEO und Hosting. Adspire Digital, Niš — ein Team von der Idee bis zur Produktion.",
  eyebrow: "Leistungen / Was wir bauen",
  title: ["ALLES FÜR IHR", "DIGITALES WACHSTUM"],
  intro:
    "Websites, die Kunden bringen, Anwendungen, die Zeit sparen, KI, die arbeitet, wenn Sie es nicht tun. Ein Team von der Idee bis zur Produktion — keine Vorlagen, kein Agenturnebel.",
  groups: [
    {
      label: "Web und Vertrieb",
      blurb: "Ein Schaufenster, das Anfragen bringt, nicht nur Besucher.",
      services: [
        {
          slug: "web-prezentacije",
          title: "Websites und Unternehmensauftritte",
          desc: "Schnelle Next.js-Websites mit SEO, PWA und CMS. Der Besucher weiß in Sekunden, was Sie anbieten, und klickt weiter.",
          tags: ["Next.js", "SEO", "CMS", "PWA"],
        },
        {
          slug: "e-commerce-web-shop",
          title: "E-Commerce und Webshops",
          desc: "Individuelle und Headless-Shops — Zahlungen, Lager, Abos und CRM in einem System, das verkauft.",
          tags: ["Webshop", "Zahlungen", "Lager"],
        },
        {
          slug: "seo-digitalni-marketing",
          title: "SEO und digitales Marketing",
          desc: "Sichtbarkeit bei Google und in KI-Antworten, messbare Kampagnen und Inhalte, die qualifizierte Anfragen bringen.",
          tags: ["SEO", "Ads", "Analytics"],
        },
      ],
    },
    {
      label: "Anwendungen und Systeme",
      blurb: "Werkzeuge, die Inhabern und Teams jede Woche Stunden zurückgeben.",
      services: [
        {
          slug: "sistemi-za-zakazivanje",
          title: "Terminbuchungssysteme",
          desc: "Online-Terminbuchung rund um die Uhr für Kliniken, Salons, Friseure und Werkstätten — Erinnerungen senken Nichterscheinen, der Kalender füllt sich über Nacht.",
          tags: ["Buchung", "Erinnerungen", "Kalender"],
        },
        {
          slug: "interne-poslovne-aplikacije",
          title: "Interne Unternehmensanwendungen",
          desc: "Termine, Berichte, Erfassung, Rechnungen — alles, was heute per Excel und Telefon läuft, automatisiert.",
          tags: ["Internes System", "Dashboard", "Automatisierung"],
        },
        {
          slug: "mobilne-aplikacije",
          title: "Mobile Anwendungen",
          desc: "iOS-, Android- und PWA-Apps für Kunden und Teams — eine Codebasis, alle Plattformen.",
          tags: ["iOS", "Android", "PWA"],
        },
        {
          slug: "cms-sistemi",
          title: "CMS-Systeme",
          desc: "Inhalte, Preise und Beiträge selbst ändern — ohne Entwickler und ohne Wartezeit.",
          tags: ["Headless CMS", "Admin"],
        },
        {
          slug: "saas-razvoj",
          title: "SaaS-Entwicklung",
          desc: "Vom MVP bis zum skalierbaren SaaS-Produkt — Abos, Mandantenfähigkeit, Billing und Analytics.",
          tags: ["SaaS", "Multi-Tenant", "Billing"],
        },
      ],
    },
    {
      label: "KI und Automatisierung",
      blurb: "Systeme, die verkaufen und antworten, während Sie schlafen.",
      services: [
        {
          slug: "ai-integracije-automatizacija",
          title: "KI-Integration und Automatisierung",
          desc: "KI-Agenten für Terminbuchung, Support und Lead-Qualifizierung. n8n- und LLM-Prozessautomatisierung rund um die Uhr.",
          tags: ["KI-Agenten", "n8n", "LLM"],
        },
        {
          slug: "business-intelligence-analitika",
          title: "Business Intelligence und Analytics",
          desc: "Daten aus allen Systemen an einem Ort — Dashboards, die zeigen, wo verdient wird und wo Geld versickert.",
          tags: ["BI", "Dashboard", "Daten"],
        },
        {
          slug: "interaktivne-web-tehnologije",
          title: "Interaktive Web-Technologien",
          desc: "WebGL, 3D-Szenen und Scroll-Animationen — ein Auftritt, den man sich merkt und teilt.",
          tags: ["WebGL", "Three.js", "Motion"],
        },
      ],
    },
    {
      label: "Infrastruktur und Sicherheit",
      blurb: "Ein Fundament, das nie pausiert und Ihre Daten schützt.",
      services: [
        {
          slug: "hosting-infrastruktura",
          title: "Hosting und Infrastruktur",
          desc: "Cloud-Hosting, CI/CD, Monitoring und Skalierung — ein System, das rund um die Uhr läuft.",
          tags: ["Cloud", "CI/CD", "Monitoring"],
        },
        {
          slug: "cyber-security-gdpr",
          title: "Cyber Security und DSGVO",
          desc: "Security-Audit, Datenschutz und DSGVO-Konformität — Sicherheit ohne Kompromisse.",
          tags: ["Audit", "DSGVO", "Security"],
        },
        {
          slug: "industrijska-resenja",
          title: "Branchenlösungen",
          desc: "Lösungen, zugeschnitten auf die jeweilige Branche — von Gesundheit über Logistik bis Produktion.",
          tags: ["Individuell", "Integrationen"],
        },
      ],
    },
  ],
  processTitle: "So arbeiten wir",
  process: [
    { num: "01", title: "Kostenloses Gespräch", desc: "30 Minuten. Wir verstehen das Geschäft und wo Geld oder Zeit verloren geht." },
    { num: "02", title: "Prototyp in 48 h", desc: "Ein klickbarer Prototyp vor jedem Vertrag. Sie sehen genau, wofür Sie zahlen." },
    { num: "03", title: "Sprint · MVP in 2 Wochen", desc: "Wöchentliche Demo, sichtbarer Fortschritt, keine Überraschungen." },
    { num: "04", title: "Launch und Wachstum", desc: "Messung, Iteration, KI-Automatisierung — ein System, das mitwächst." },
  ],
  ctaTitle: "Sie wissen nicht, wo Sie anfangen sollen?",
  ctaText:
    "Buchen Sie ein kostenloses Gespräch. Wir sagen Ihnen genau, was am meisten bringt — bevor Sie etwas ausgeben.",
  ctaButton: "Kostenloses Gespräch buchen →",
  ctaHref: "/contact-us",
};

const byLocale: Record<LocaleCode, ServicesCopy> = { sr, en, de };

export function getServicesCopy(locale: LocaleCode = defaultLocale): ServicesCopy {
  return byLocale[locale] ?? byLocale[defaultLocale];
}
