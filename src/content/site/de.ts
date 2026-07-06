import type {
  BlogPost,
  LocalizedPageContent,
  ProjectItem,
  ServiceItem,
} from "@/content/site/types";
import { srContent } from "@/content/site/sr";

// German content. Structural data (slugs, hrefs, images, dates, phone, email,
// brand project names) is reused from srContent; only human-readable copy is
// translated and kept deliberately tight.

const cta = "Details ansehen";

const serviceText: Array<Pick<ServiceItem, "title" | "summary" | "bullets">> = [
  {
    title: "Web-Präsentationen",
    summary:
      "Moderne, schnelle und SEO-optimierte Websites — von der Firmenpräsentation bis zur mehrsprachigen Plattform, mit messbaren Conversions.",
    bullets: [
      "Next.js, React, TypeScript, Tailwind CSS",
      "SEO, Blog, CMS, Analytics, Conversion-Tracking",
      "PWA, Core Web Vitals, Cloud (Vercel / eigener Server)",
    ],
  },
  {
    title: "E-Commerce & Onlineshop",
    summary:
      "Klassische und Headless-Shopsysteme: Admin, Zahlungen, Lager, Abos und Automatisierung — vom MVP bis zum ausgereiften Shop.",
    bullets: [
      "Custom-Shop, Headless, Abo, digitale Produkte",
      "Kartenzahlung, Loyalty, Gutscheine, CRM-Anbindung",
      "KI-Empfehlungen, E-Mail-Marketing, mobile Optimierung",
    ],
  },
  {
    title: "Mobile Apps (PWA + Native)",
    summary:
      "PWAs erreichen Nutzer ohne Store-Wartezeit; native Apps (Flutter / React Native) für iOS und Android, wenn Zahlungen, GPS und voller Gerätezugriff nötig sind.",
    bullets: [
      "PWA: Buchung, Loyalty, Menüs, Push, Offline",
      "Native: Zahlungen, GPS, QR, Chat, App Store / Play",
      "Buchung, Loyalty, E-Commerce, CRM, SaaS",
    ],
  },
  {
    title: "CMS-Systeme",
    summary:
      "CMS und Admin-Panels nach Maß Ihres Teams — keine generischen Lösungen, wenn der Prozess einen eigenen Ablauf braucht.",
    bullets: [
      "Admin-Panel, Blog, Galerie, Nutzer",
      "Rollenbasierter Zugriff (Admin, Editor, User)",
      "Dashboard und klare Inhaltsstruktur",
    ],
  },
  {
    title: "Interne Geschäftsanwendungen",
    summary:
      "Digitalisierung der Abläufe: CRM, Termine, Task-Manager und Mini-ERP, verbunden mit Ihrem realen Prozess statt mit einer Schablone.",
    bullets: [
      "CRM, Mitarbeiter, Termine, Vertrieb, QR-Mitgliedschaften",
      "Rechnungen, Reports, API-Integrationen",
      "Internes Dashboard für Inhaber",
    ],
  },
  {
    title: "KI-Integration & Automatisierung",
    summary:
      "KI und Automatisierung (inkl. n8n-Flows) dort, wo sie manuelle Arbeit reduzieren — Vertrieb, Support, Inhalte und interne Alerts.",
    bullets: [
      "KI-Chatbot, Support, Terminierung, Angebote, SEO",
      "Voice-Agent, CRM-Assistent, Lead-Scoring",
      "Marketing-Funnel, E-Mail, n8n-Workflow-Automatisierung",
    ],
  },
  {
    title: "KI-Empfehlung für Ihr Business",
    summary:
      "Wenn jemand die KI fragt, welchen Handwerker, Salon, welche Klinik oder Agentur er wählen soll, bereiten wir Ihre digitale Spur so auf, dass die KI versteht, warum Sie eine relevante Empfehlung sind.",
    bullets: [
      "Klar erklärt: wer Sie sind, was Sie tun, für wen Sie die beste Wahl sind",
      "Seiten, FAQ und strukturierte Daten, die KI leichter deutet",
      "Beispiele: Tischlerei, Klinik, Salon, Restaurant, lokaler Service",
    ],
  },
  {
    title: "Business Intelligence & Analytics",
    summary:
      "Dashboards und Reports, die an Ihre Datenquellen andocken — damit Inhaber und Teams KPIs sehen, nicht nur Screenshots aus Tools.",
    bullets: [
      "Custom-Dashboard, KPIs, Verkaufsgrafiken",
      "CRM-Analytics, Heatmap, Nutzerverhalten",
      "Automatisierte Monatsreports",
    ],
  },
  {
    title: "SEO & digitales Marketing",
    summary:
      "Technisches SEO (inkl. Next.js-Performance) verbunden mit Kampagnen und CRO — messbar und iterativ.",
    bullets: [
      "Technisches und On-Page-SEO, Wettbewerbsanalyse",
      "Google Ads, Meta Ads, Conversion-Tracking, Remarketing",
      "Core Web Vitals, CRO, A/B-Tests",
    ],
  },
  {
    title: "Cyber Security & DSGVO",
    summary:
      "Wir sorgen dafür, dass Website, Formulare und Datenhaltung ein sinnvolles Sicherheits- und Datenschutzniveau halten (DSGVO, Consent, Backup).",
    bullets: [
      "Security-Audit, DSGVO-Setup, Cookie-Consent",
      "Backup, Disaster Recovery, Monitoring",
      "Datenverschlüsselung",
    ],
  },
  {
    title: "Hosting & Infrastruktur",
    summary:
      "Wir richten die Produktion ein und dokumentieren sie: Cloud oder eigener Server, SSL, Mail, Domain und Backups — damit klar ist, wo was liegt.",
    bullets: [
      "Cloud- und Server-Deployment",
      "Mailserver, Domain, SSL",
      "Backup und Cloud-Storage",
    ],
  },
  {
    title: "SaaS-Entwicklung",
    summary:
      "Vom MVP zum Abo-Produkt: Authentifizierung, Abrechnung, Admin- und Kundenbereich als eine Einheit.",
    bullets: [
      "Buchung, CRM, Abo und White-Label-SaaS",
      "Branchen-SaaS-Systeme",
      "Monetarisierung des digitalen Produkts",
    ],
  },
  {
    title: "Branchenlösungen",
    summary:
      "Vertikale Software für Kliniken, Fitnessstudios, Restaurants, Bau, Anwälte und weitere Nischen — Buchung, Kataloge und Betrieb in einem System.",
    bullets: [
      "Kliniken, Studios, Restaurants, Bau, Fabriken",
      "Anwälte, Autohäuser, Agenturen, Immobilien",
      "Maßgeschneiderte Buchungs-, Katalog- und Betriebsabläufe",
    ],
  },
  {
    title: "Interaktive Web-Technologien",
    summary:
      "3D, Virtual Showroom und 360°, wenn eine Marke ein Erlebnis braucht statt einer statischen Seite — mit Fokus auf Performance und Mobile.",
    bullets: [
      "3D-Web-Präsentationen, Virtual Showroom",
      "360°-Produktansicht",
      "Interaktive Präsentationen und Animationen",
    ],
  },
];

const services: ServiceItem[] = srContent.servicesPage.items.map((s, i) => ({
  ...s,
  title: serviceText[i].title,
  summary: serviceText[i].summary,
  bullets: serviceText[i].bullets,
  cta,
}));

const projectText: Array<Pick<ProjectItem, "category" | "summary" | "outcome">> = [
  {
    category: "Buchung + Klinik",
    summary:
      "Web-Anwendung für eine Ästhetikklinik mit Website, Online-Buchung, Beauty-Pass-Bereich und Admin-Kalender.",
    outcome: "Marketing, Termine, Kunden, Behandlungen und Analytics in einem System.",
  },
  {
    category: "SEO + Betrieb",
    summary:
      "SEO-Website, Katalog, Online-Anfragen und internes Admin-Panel für Leads, Angebote, Mitarbeiter, Fahrzeuge und Lieferungen.",
    outcome: "Anfragen fließen in den Vertrieb, der Betrieb hat einen zentralen Arbeitsplatz.",
  },
  {
    category: "E-Commerce",
    summary:
      "Onlineshop und Admin-Plattform für eine Premium-Modemarke: Katalog, Warenkorb, Checkout, Inhalte und Integrationen.",
    outcome: "Verkauf, Lager, Bestellungen und Promotions laufen aus einer Plattform.",
  },
  {
    category: "Recruiting-Plattform",
    summary:
      "Onboarding-App für Remote-Lehrkräfte mit Google-Login, Audio-Bewerbung, Admin-Review und Referral-System.",
    outcome: "Bewerbungen landen im messbaren Funnel mit klaren Status, nicht im Postfach.",
  },
  {
    category: "Buchungssystem",
    summary:
      "Buchungs-App für ein Barbershop mit Website, Online-Terminen, Kundenkonto und Admin-Kalender.",
    outcome: "Der Laden hat einen Plan, der 24/7 läuft, weniger manueller Aufwand.",
  },
];

const projects: ProjectItem[] = srContent.home.projectsSection.items.map((p, i) => ({
  ...p,
  category: projectText[i].category,
  summary: projectText[i].summary,
  outcome: projectText[i].outcome,
}));

const blogText: Array<Pick<BlogPost, "title" | "excerpt" | "category">> = [
  {
    title: "Wie wir Websysteme bauen, die Kampagnen und Skalierung tragen",
    excerpt:
      "Next.js, TypeScript und klare Architektur von Tag 1 — warum ein gutes System bedeutet, Code nicht neu zu schreiben, wenn der Kunde wächst.",
    category: "Web-Entwicklung",
  },
  {
    title: "Buchungssysteme, die Anrufe, Nachrichten und Excel ersetzen",
    excerpt:
      "Zentraler Kalender, Online-Termine und ein Admin-Panel, das 24/7 läuft — wie Dienstleister manuelle Arbeit um 60 % senken.",
    category: "Buchungssysteme",
  },
  {
    title: "SEO und Performance kommen nicht ans Projektende",
    excerpt:
      "LCP unter 1,2s, strukturierte Daten und Core Web Vitals 100 sind kein Bonus — sie gehören in den ersten Sprint, weil es dort am günstigsten ist.",
    category: "SEO & Performance",
  },
  {
    title: "Three.js und WebGL in Produktion — was Agenturen verschweigen",
    excerpt:
      "3D-Animationen sind beeindruckend, doch Bundle-Größe, FPS auf dem Handy und Fallbacks sind die Stellen, an denen Projekte scheitern.",
    category: "Frontend & 3D",
  },
  {
    title: "KI-Automatisierung ist nicht nur für Konzerne — konkrete Beispiele",
    excerpt:
      "n8n-Workflows, LLM-Agenten und Integrationen, die manuelle Arbeit in Vertrieb, Support und Betrieb senken — ohne Enterprise-Budget.",
    category: "KI & Automatisierung",
  },
  {
    title: "E-Commerce, der wirklich verkauft — Katalogseite vs. System",
    excerpt:
      "Checkout-Flow, Upsell, Lager-Integrationen und Analytics — was einen Shop, der konvertiert, von einem unterscheidet, der es nicht tut.",
    category: "E-Commerce",
  },
];

const blogPosts: BlogPost[] = srContent.blogPage.posts.map((p, i) => ({
  ...p,
  title: blogText[i].title,
  excerpt: blogText[i].excerpt,
  category: blogText[i].category,
}));

export const deContent: LocalizedPageContent = {
  localeLabel: "DE",
  siteTitle: "Adspire Digital",
  siteDescription:
    "Adspire Digital — Webplattformen, E-Commerce, PWA- und native Apps, Geschäftssysteme, KI-Automatisierung, SaaS und Hosting. Kontakt: djordje@adspire.rs, +381 60 149 149 1.",
  nav: [
    { label: "Start", href: "/" },
    { label: "Über uns", href: "/about-us" },
    { label: "Leistungen", href: "/our-services" },
    { label: "Projekte", href: "/our-projects" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/contact-us" },
  ],
  headerCta: { label: "Projekt starten", href: "/contact-us" },
  home: {
    heroStack: {
      intro: {
        eyebrow: "Agency mix / Hero 01",
        title: "Websysteme, die mit dem Business wachsen",
        description:
          "Adspire Digital gestaltet, entwickelt und optimiert Websites, Apps und Verkaufsabläufe, die Traffic in Anfragen, Buchungen und Umsatz verwandeln.",
        badges: ["Next.js", "SEO", "Buchungssysteme", "Automatisierung"],
        primary: { label: "Projekt starten", href: "/contact-us" },
        secondary: { label: "Projekte ansehen", href: "/our-projects" },
        gallery: srContent.home.heroStack.intro.gallery,
      },
      capability: {
        eyebrow: "Agency mix / Hero 02",
        title: "Ein Produktionsablauf für Design, Entwicklung und Wachstum",
        description:
          "Strategie, UI/UX, Entwicklung, SEO und Automatisierung arbeiten als ein System — ohne Übergabeverluste und ohne Engpässe, wenn das Projekt wächst.",
        tags: ["Strategie", "UI/UX", "Entwicklung", "SEO", "Analytics", "CRO"],
        stats: [
          { value: "3 Ebenen", label: "Strategie, Produkt und Growth in einem Ablauf" },
          { value: "MVP +", label: "Schnell starten und das System ausbauen" },
          { value: "Ein Team", label: "Klarer Scope, Roadmap und Support nach Go-live" },
        ],
        primary: { label: "Unser Prozess", href: "/about-us" },
        secondary: { label: "Alle Leistungen", href: "/our-services" },
        video: srContent.home.heroStack.capability.video,
        poster: srContent.home.heroStack.capability.poster,
      },
      showcase: {
        eyebrow: "Agency mix / Hero 03",
        title: "Partner für ernsthafte Web-Lieferungen",
        description:
          "Von der Discovery bis zur Produktion, mit klarem Scope, realistischer Roadmap und Fokus auf das Ergebnis nach dem Launch. Unten konkrete Arbeiten.",
        primary: { label: "Ausgewählte Projekte", href: "/our-projects" },
        secondary: { label: "Kontakt", href: "/contact-us" },
        slides: srContent.home.heroStack.showcase.slides,
      },
    },
    servicesSection: {
      eyebrow: "Leistungen",
      title: "Das komplette Spektrum digitaler und technischer Lösungen",
      description:
        "Von Web und E-Commerce über PWA- und native Apps bis zu internen Systemen, KI-Automatisierung, SaaS und Infrastruktur — alles an einem Ort.",
      items: services.slice(0, 6),
    },
    projectsSection: {
      eyebrow: "Selected work",
      title: "Projekte, in denen Design, Performance und Ziel zusammenspielen",
      description:
        "Wir zeigen Arbeiten, in denen Produkt- und Growth-Teil als eine Einheit funktionieren.",
      items: projects,
    },
    testimonialsSection: {
      eyebrow: "Testimonials",
      title: "Was Teams nach dem Launch sagen",
      description:
        "Wichtig ist uns, dass es nach dem Go-live weniger Chaos, mehr Klarheit und bessere Kontrolle über Anfragen und Vertrieb gibt.",
      items: [
        { name: "Milan R.", role: "Gründer", company: "B2B-Firma", quote: "Neue Website und Kampagnen brachten mehr Anfragen und einen klareren Verkaufsprozess." },
        { name: "Jelena P.", role: "Marketing-Managerin", company: "Lokale Marke", quote: "Schnelles Team, klare Kommunikation, Fokus auf Ergebnis." },
        { name: "Nikola S.", role: "Inhaber", company: "Dienstleister", quote: "Die Buchungs-Automatisierung hat das Chaos reduziert und die Terminierung beschleunigt." },
      ],
    },
    faqSection: {
      eyebrow: "FAQ",
      title: "Schnelle Antworten zu Prozess, Fristen und Support",
      description:
        "Auf der Startseite die wichtigsten Fragen, die vollständige FAQ ist eine eigene Seite.",
      items: [
        { q: "Wie lange dauert die Lieferung?", a: "Kleine Websites gehen schnell, größere Systeme laufen in klar definierten Phasen mit Prioritäten und Sprints." },
        { q: "Macht ihr Wartung nach dem Launch?", a: "Ja. Support, Updates und iterative Optimierung gehören zur regulären Lieferung, wenn das Projekt es erfordert." },
        { q: "Können wir mit kleinerem Budget starten?", a: "Ja. Wir definieren ein MVP und bauen das System nach Prioritäten aus, sodass die Investition dem Wachstum folgt." },
      ],
    },
    ctaSection: {
      kicker: "Los geht's",
      title: "Bereit, aus der Idee ein wachsendes System zu machen?",
      body: "Wir starten mit einem Discovery-Call und einem klaren Umsetzungsplan.",
      primary: { label: "Projekt starten", href: "/contact-us" },
      secondary: { label: "Projekte ansehen", href: "/our-projects" },
    },
  },
  aboutPage: {
    hero: {
      eyebrow: "Über uns",
      title: "Adspire Digital — Entwicklungs- und Technologiepartner",
      description:
        "Spezialisiert auf moderne Webplattformen, mobile Apps, Geschäftssysteme und KI-Automatisierung. Wir bauen skalierbare, schnelle und langfristig tragfähige Lösungen für den lokalen und internationalen Markt.",
      primary: { label: "Gespräch buchen", href: "/contact-us" },
      secondary: { label: "Leistungen ansehen", href: "/our-services" },
    },
    manifesto:
      "Wir arbeiten als White-Label-Entwicklungspartner, technischer Partner für Agenturen, Subunternehmer bei komplexen Projekten, langfristiger Wartungspartner und SaaS-Entwicklungsteam.",
    storyTitle: "Wie wir zusammenarbeiten",
    storyParagraphs: [
      "Jedes Projekt beginnt mit einem klaren Geschäftsziel und Kontext. Wir mappen den Nutzerfluss, Budget- und Zeitgrenzen und bauen eine Roadmap, die früh Wert liefert.",
      "Wir liefern nicht nur eine Website — wir bauen einen Teil des Vertriebs-, Betriebs- oder Produktsystems. SEO, Analytics, Sicherheit und Ausbaufähigkeit gehören zur Architektur, nicht als Nachtrag.",
      "Langfristig bleiben wir über Wartung, Upgrades und Automatisierung dabei — so bleibt das Produkt stabil, während das Business wächst.",
    ],
    metrics: [
      { value: "Partnerschaft", label: "White-Label, Agenturpartner, Subunternehmer oder SaaS-Team — nach Bedarf" },
      { value: "Lieferung", label: "Web, Mobile, interne Systeme, KI und Infrastruktur in einem Ablauf" },
      { value: "Wachstum", label: "SEO, Marketing, BI und Automatisierung für messbaren Fortschritt nach dem Launch" },
    ],
    team: {
      title: "Leitender Fokus",
      subtitle: "Strategie, Vertrieb und Wachstum",
      leadName: "Đorđe",
      leadRole: "Strategie, Vertrieb und Wachstum",
      leadBio:
        "Führt die Kundenkommunikation, definiert Scope und Prioritäten und richtet Entwicklung und Growth auf ein messbares Ergebnis aus.",
      bullets: [
        "Discovery-Workshops und KPI-Abstimmung",
        "Scope, Funnel und Conversion-Planung",
        "Roadmap, Launch und Optimierung nach Go-live",
      ],
    },
    cta: {
      kicker: "Nächster Schritt",
      title: "Wenn Sie schon eine Idee haben, machen wir sofort einen realen Plan daraus.",
      body: "Wir starten bei Ziel, Kontext und Prioritäten — und erst dann beim Design.",
      primary: { label: "Melden Sie sich", href: "/contact-us" },
      secondary: { label: "Projekte ansehen", href: "/our-projects" },
    },
  },
  servicesPage: {
    hero: {
      eyebrow: "Leistungen",
      title: "Adspire Digital — was wir tun und wie wir liefern",
      description:
        "Das gesamte Spektrum: Web und E-Commerce, PWA- und native Apps, CMS und interne Systeme, KI und Automatisierung, BI, SEO, Sicherheit, Hosting, SaaS und Branchenlösungen. Jede Leistung hat eine eigene Detailseite.",
      primary: { label: "Kontakt", href: "/contact-us" },
      secondary: { label: "Projekte", href: "/our-projects" },
    },
    introTitle: "Ein Partner für das gesamte digitale Produkt",
    introBody:
      "Adspire kann den ganzen Lebenszyklus übernehmen — von Idee und Architektur über Design und Entwicklung bis zu Deployment, Wartung und Automatisierung. Den Umfang richten wir nach Ihren Prioritäten und Ihrem Budget; Kontakt: djordje@adspire.rs.",
    process: [
      "Wir definieren Geschäftsziel, Scope und Erfolgsmaß.",
      "Wir mappen Nutzerfluss, CTA-Logik und Prioritäten.",
      "Wir liefern einen Build, der für SEO, Analytics und Wachstum bereit ist.",
    ],
    items: services,
    cta: {
      kicker: "Leistungen + Ziel",
      title: "Brauchen Sie eine Kombination aus mehreren Leistungen statt eines isolierten Tasks?",
      body: "Wir strukturieren Phasen und Umfang so, dass Budget und Frist den realen Prioritäten folgen.",
      primary: { label: "Gespräch starten", href: "/contact-us" },
    },
  },
  projectsPage: {
    hero: {
      eyebrow: "Projects",
      title: "Ausgewählte Projekte und Produktionsabläufe in echtem Einsatz",
      description:
        "Hier geht es nicht nur um schöne Screens. Der Fokus liegt darauf, wie Website oder System dem Vertrieb, den Buchungen oder dem Auftritt geholfen hat.",
      primary: { label: "Kontakt", href: "/contact-us" },
      secondary: { label: "Projektdetail", href: "/project-single" },
    },
    introTitle: "Worauf wir bei einem Projekt achten",
    introBody:
      "Ein gutes Projekt hat für uns einen guten Seitenrhythmus, klare CTAs, gesunde Performance und ein System, das der Kunde ohne zusätzliches Chaos nutzen kann.",
    items: projects,
    cta: {
      kicker: "Ähnliche Herausforderung?",
      title: "Wir schauen, was davon für Ihr Business am meisten Sinn ergibt.",
      body: "Wir kopieren keine Schablonen, sondern behalten, was funktioniert, und übertragen es auf Ihren Kontext.",
      primary: { label: "Kontakt", href: "/contact-us" },
    },
  },
  projectPage: {
    hero: {
      eyebrow: "Project detail",
      title: "Überblick über Prozess, Lieferung und Geschäftswirkung",
      description:
        "Ein Produktionsbeispiel mit Fokus auf Conversion-UX, schnelle Umsetzung und langfristige Tragfähigkeit im realen Umfeld.",
      primary: { label: "Live-Projekt", href: "https://prevozkop.rs" },
      secondary: { label: "Alle Projekte", href: "/our-projects" },
    },
    client: "PrevozKop",
    website: "https://prevozkop.rs",
    overview:
      "Case-Überblick eines Buchungssystems und einer Service-Website, die digitale Anfragen, Leistungsübersicht und Betrieb verbunden hat.",
    challenge:
      "Die Herausforderung war, den Weg vom Informieren bis zur Anfrage zu verkürzen, ohne das interne Team mit manuellen Schritten zu überlasten.",
    solution:
      "Es entstand eine klare Info-Ebene, ein fokussierter Buchungsablauf und eine Struktur, die künftige Ausbauten ohne Systembruch trägt.",
    outcomes: [
      "Klarerer Funnel vom ersten Besuch bis zur konkreten Anfrage",
      "Weniger manuelle Koordination bei Buchungen",
      "Stabilere Basis für SEO und künftiges Growth",
    ],
    services: [
      "Discovery und Scope-Definition",
      "UX und Seitenstruktur",
      "Next.js-Entwicklung und Integrationen",
      "SEO-Basis und Analytics",
    ],
    metrics: [
      { value: "1 System", label: "Website und Buchung arbeiten zusammen" },
      { value: "Schnelle Änderungen", label: "Inhalte und Sektionen leichter zu pflegen" },
      { value: "Growth-ready", label: "Basis bereit für Kampagnen und Optimierung" },
    ],
    testimonial: {
      name: "Nikola S.",
      role: "Inhaber",
      company: "PrevozKop",
      quote: "Die Buchungs-Automatisierung hat das Chaos reduziert und die Terminierung beschleunigt.",
    },
    gallery: srContent.projectPage.gallery,
    liveLabel: "Live-Projekt ansehen",
  },
  contactPage: {
    hero: {
      eyebrow: "Contact",
      title: "Schicken Sie Ziel und Frist — Sie bekommen einen konkreten nächsten Schritt",
      description:
        "Am schnellsten kommen wir voran, wenn wir wissen, was Sie erreichen wollen, was der Projektkontext ist und wo gerade der größte Engpass liegt.",
    },
    introTitle: "So erreichen Sie uns",
    introBody:
      "Ein perfektes Briefing ist nicht nötig. Es reicht, Ziel, Frist und das aktuelle Problem zu nennen. Daraus machen wir einen realen nächsten Schritt.",
    phone: "+381 60 149 149 1",
    email: "djordje@adspire.rs",
    address: "Dimitrija Leka 66, Niš",
    officeHours: ["Montag - Freitag", "09:00 - 17:00", "Bei dringenden Projekten auch außerhalb der Zeiten erreichbar"],
    form: {
      name: "Vor- und Nachname",
      email: "E-Mail",
      subject: "Betreff",
      message: "Nachricht",
      submit: "Nachricht senden",
      subjectOptions: {
        project: "Neues Projekt",
        service: "Leistung",
        budget: "Budget",
        support: "Support",
      },
      success: "Nachricht erfolgreich gesendet.",
      error: "Nachricht konnte nicht gesendet werden.",
      sending: "Senden...",
    },
  },
  faqPage: {
    hero: {
      eyebrow: "FAQ",
      title: "Häufige Fragen zu Prozess, Fristen und Zusammenarbeit",
      description:
        "Die meiste Unsicherheit verschwindet, wenn Scope, Prioritäten und nächste Schritte von Anfang an klar sind.",
      primary: { label: "Kontakt", href: "/contact-us" },
    },
    introTitle: "Was Kunden am häufigsten fragen",
    introBody:
      "Ist Ihr Fall hier nicht abgedeckt, schreiben Sie kurz — Sie bekommen eine konkrete Antwort, keinen generischen Pitch.",
    items: [
      { q: "Wie lange dauert eine Website oder ein System?", a: "Je nach Umfang. Eine kleine Website geht schnell, größere Systeme durchlaufen Discovery, Design, Entwicklung und Optimierung. Zu Beginn erhalten Sie einen klaren Phasenplan." },
      { q: "Macht ihr nur Entwicklung oder auch Strategie?", a: "Beides. Mal kommen wir nur als Entwicklungspartner, mal von der Positionierung und UX bis zum Growth-Setup." },
      { q: "Können wir ohne vollständiges Budget für alle Phasen starten?", a: "Ja. Oft definieren wir ein MVP, launchen das Wertvollste zuerst und bauen das System nach Prioritäten aus." },
      { q: "Was passiert nach dem Launch?", a: "Bei Bedarf bleiben wir bei Wartung, Analytics, SEO und iterativer Optimierung. Ziel ist, dass das System nutzbar und stabil bleibt." },
      { q: "Könnt ihr eine bestehende Website übernehmen und verbessern?", a: "Ja. Gibt es eine gute Basis, reißen wir nicht alles ohne Grund ab. Erst klären wir, was bleibt und was neu strukturiert wird." },
    ],
    cta: {
      kicker: "Ihre Frage fehlt?",
      title: "Schicken Sie den Projektkontext — Sie bekommen eine konkrete Antwort.",
      body: "So schätzen wir am schnellsten den nächsten Schritt und den realen Umfang ein.",
      primary: { label: "Melden Sie sich", href: "/contact-us" },
    },
  },
  blogPage: {
    hero: {
      eyebrow: "Blog",
      title: "Notizen zu Systemen, Growth-Logik und Web-Lieferung",
      description:
        "Der Blog ist kein Pflichtblock auf der Startseite, sondern eine eigene Seite für Themen, die erklären, wie wir arbeiten und warum wir manche Entscheidungen früh treffen.",
    },
    featured: blogPosts[0],
    posts: blogPosts,
    cta: {
      kicker: "Lieber in der Praxis?",
      title: "Wenn Ihnen ein konkretes Projekt näher ist als Theorie, gehen wir sofort zu Ihrem Fall über.",
      body: "Wir schreiben, wenn ein Ansatz erklärt werden muss — den größten Wert schaffen wir durch Umsetzung.",
      primary: { label: "Gespräch starten", href: "/contact-us" },
    },
  },
  articlePage: {
    hero: {
      eyebrow: "Blog single",
      title: "Wie wir Websysteme bauen, die für Kampagnen und Wachstum bereit sind",
      description:
        "Ein Prozess, der Strategie, Design, Entwicklung und Messung verbindet. Wir bauen keine Website, die nur dasteht, sondern eine, die realen Einsatz und Wachstum trägt.",
      secondary: { label: "Zurück zum Blog", href: "/blog" },
    },
    post: blogPosts[0],
    intro:
      "Jedes Projekt beginnt mit einem messbaren Geschäftsziel. Dann mappen wir den Nutzerfluss, definieren Grenzen und bauen Sprints um das, was Anfragen, Buchungen oder Verkäufe am schnellsten bewegt.",
    sections: [
      {
        title: "Vom Brief zur ersten Priorität",
        paragraphs: [
          "Der erste Schritt ist nicht das Design, sondern zu verstehen, wo gerade Energie und Geld verloren gehen. Mal ist es eine langsame Seite, mal ein schwacher CTA, mal ein fehlender Betriebsablauf nach dem Formular.",
          "Wissen wir das, fällt die Entscheidung leichter, was ins MVP geht, was in die nächste Phase und was zu früh wäre.",
        ],
      },
      {
        title: "Design und Entwicklung als ein Sprint",
        paragraphs: [
          "Der größte Fehler ist, UX, Copy, Entwicklung und SEO so zu trennen, dass das Projekt ständig auf das nächste Team wartet. Wir führen das in einen Ablauf zusammen.",
          "Das heißt: Struktur, CTA-Logik, Performance und technische Basis werden abgestimmt, während die Seite entsteht — nicht, wenn alles schon zu weit ist.",
        ],
      },
      {
        title: "Was nach dem Go-live bleibt",
        paragraphs: [
          "Der Launch ist nur die Mitte der Arbeit. Danach kommen Daten, Iterationen und Entscheidungen, die den Unterschied zwischen schöner Seite und nützlichem System machen.",
          "Deshalb richten wir früh Analytics, Conversion-Tracking und einen Rahmen für weitere Verbesserungen ein.",
        ],
      },
    ],
    principles: [
      "Mobile-first-Interface und klarer Funnel",
      "Performance, Schema und SEO-Basis im ersten Sprint",
      "Strukturierte Analytics und Conversion-Tracking ab Tag 1",
    ],
    cta: {
      kicker: "Weiterlesen ist optional",
      title: "Wenn Sie möchten, schauen wir uns sofort Ihr konkretes Projekt an.",
      body: "Der nützlichste nächste Schritt ist meist ein kurzes Gespräch und ein Blick auf die Prioritäten.",
      primary: { label: "Kontakt", href: "/contact-us" },
      secondary: { label: "Projekte ansehen", href: "/our-projects" },
    },
  },
  footer: {
    tagline:
      "Adspire Digital bietet komplette digitale Lösungen — von Web und mobilen Apps bis zu KI-Automatisierung und SaaS-Entwicklung.",
    cta: { label: "Kontakt", href: "/contact-us" },
    copyright: "Alle Rechte vorbehalten.",
    contactItems: [
      { label: "E-Mail", value: "djordje@adspire.rs", href: "mailto:djordje@adspire.rs" },
      { label: "Telefon", value: "+381 60 149 149 1", href: "tel:+381601491491" },
      { label: "Standort", value: "Dimitrija Leka 66, Niš" },
    ],
  },
};
