import type { LocaleCode } from "@/lib/site-config";

/**
 * All visible landing copy for HomeV4 / AiDemoV4, keyed by locale.
 * Structural data (hrefs, images, accents, tech tags, scene params) lives in
 * the components; only translatable text lives here and is zipped by index.
 */

export type V4Copy = {
  actions: { inquiry: string; help: string; ai: string; process: string; faq: string; value: [string, string, string] };
  nav: {
    cta: string;
    /** header links to real pages — `pricing` is SR-only, there is no
     *  localized /cena-izrade-sajta route yet */
    links: { services: string; work: string; pricing: string; blog: string; about: string; booking: string; contact: string };
  };
  rail: string[]; // hero, manifesto, value, projects, services, aiDemo, process, faq, cta
  hero: {
    badge: string;
    title: [string, string, string]; // line1, outline line, last line (dot appended)
    sub: string;
    ctaPrimary: string;
    ctaGhost: string;
    trust: [string, string, string];
    scroll: string;
    /** affordance for the draggable sculpture — hidden once actually used */
    drag: string;
  };
  marquee: string;
  manifesto: string;
  value: {
    eyebrow: string;
    title: string;
    items: { title: string; desc: string }[]; // 3
  };
  projects: {
    eyebrow: string;
    title: string;
    hint: string;
    link: string;
    open: string; // custom-cursor label
    items: { cat: string; summary: string }[]; // 6, order matches PROJECTS
  };
  services: {
    eyebrow: string;
    title: string;
    panelCta: string;
    items: { title: string; desc: string; tags: string[] }[]; // 8, order matches SERVICES
  };
  aiDemo: {
    eyebrow: string;
    title: string;
    note: string;
    prev: string;
    next: string;
    chats: { name: string; solve: string; msgs: [who: "agent" | "user", text: string][] }[];
  };
  process: {
    eyebrow: string;
    title: string;
    items: { title: string; desc: string }[]; // 4
  };
  tech: { eyebrow: string; title: string };
  metrics: string[]; // 4 labels, order matches METRICS
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[]; // 6
  };
  cta: {
    eyebrow: string;
    titleLine1: string;
    titleLine2Pre: string;
    titleAccent: string;
    altPrefix: string;
    note: string;
  };
};

const sr: V4Copy = {
  actions: { inquiry: "Opiši šta ti treba", help: "Nisi siguran šta ti treba? Pitaj nas", ai: "Želim ovakvu automatizaciju", process: "Razgovarajmo o tvom projektu", faq: "Imaš drugo pitanje? Javi se", value: ["Pogledaj sajtove", "Pogledaj aplikacije", "Pogledaj web shop"] },
  nav: {
    cta: "Pošalji upit",
    links: { services: "Usluge", work: "Radovi", pricing: "Cene", blog: "Blog", about: "O nama", booking: "Zakazivanje", contact: "Kontakt" },
  },
  rail: ["Početak", "Manifest", "Vrednost", "Radovi", "Usluge", "AI demo", "Proces", "FAQ", "Kontakt"],
  hero: {
    badge: "IT FIRMA I WEB AGENCIJA — NIŠ",
    title: ["NIKO NE PAMTI", "PROSEČAN", "SAJT"],
    sub: "Pravimo sajtove koji dovode klijente i aplikacije koje štede vreme. Web shop, zakazivanje i AI — po meri tvog posla.",
    ctaPrimary: "Opiši šta ti treba",
    ctaGhost: "Pogledaj radove",
    trust: ["13 sistema u produkciji", "5 javnih studija slučaja", "Prototip za 48h"],
    scroll: "skroluj",
    drag: "prevuci · zavrti scenu",
  },
  marquee: "WEB · APLIKACIJE · E-COMMERCE · AI · WEBGL · DIZAJN · ",
  manifesto:
    "Tvoj posao zaslužuje više od lepog sajta. Više upita, lakšu prodaju i manje ručnog rada.",
  value: {
    eyebrow: "Kreni od svog cilja",
    title: "ŠTA TI TREBA?",
    items: [
      { title: "Više upita", desc: "Sajt sa jasnom ponudom i lakim putem do kontakta." },
      { title: "Manje posla", desc: "Zakazivanje, evidencija i izveštaji na jednom mestu." },
      { title: "Lakša prodaja", desc: "Web shop koji prima porudžbine i kad ti ne radiš." },
    ],
  },
  projects: {
    eyebrow: "Radovi / 01—06",
    title: "IZDVOJENI PROJEKTI",
    hint: "Skroluj — priča ide udesno →",
    link: "Pogledaj projekat →",
    open: "otvori",
    items: [
      { cat: "Estetska klinika", summary: "Sajt, online termini i administracija klinike u jednom sistemu." },
      { cat: "Transport · Logistika", summary: "Upiti sa sajta povezani sa prodajnom evidencijom." },
      { cat: "Modni brend", summary: "Web prodavnica, porudžbine i lager na jednom mestu." },
      { cat: "EdTech", summary: "Prijave i intervjui nastavnika kroz jedan online proces." },
      { cat: "Barber studio", summary: "Klijenti sami biraju termin. Salon prati raspored." },
      { cat: "Tattoo studio", summary: "Upiti sa referencama, kalendar termina i kapare na jednom mestu." },
    ],
  },
  services: {
    eyebrow: "Rešenja za tvoj posao",
    title: "USLUGE",
    panelCta: "Pogledaj uslugu →",
    items: [
      { title: "Web sajtovi", desc: "Brz sajt koji posetioca vodi do upita.", tags: ["Next.js", "SEO"] },
      { title: "Web shop", desc: "Prodaja i porudžbine u jednom toku.", tags: ["Katalog", "Plaćanje"] },
      { title: "Mobilne aplikacije", desc: "Aplikacije za korisnike i timove.", tags: ["PWA", "iOS / Android"] },
      { title: "CMS sistemi", desc: "Izmene sadržaja bez programera.", tags: ["Admin", "Sadržaj"] },
      { title: "AI automatizacija", desc: "Manje ručnog rada u prodaji i podršci.", tags: ["LLM", "n8n"] },
      { title: "SEO & marketing", desc: "Vidljivost i merljivi rezultati.", tags: ["SEO", "Ads"] },
      { title: "Security & GDPR", desc: "Sigurnost i zaštita podataka.", tags: ["Audit", "GDPR"] },
      { title: "UI/UX dizajn", desc: "Interfejs koji jasno vodi korisnika.", tags: ["Figma", "Motion"] },
    ],
  },
  aiDemo: {
    eyebrow: "Primeri AI automatizacije",
    title: "MANJE RUTINE.",
    note: "Zakazivanje, podrška i upiti — pogledaj simulacije razgovora. Rešenje prilagođavamo tvom poslu.",
    prev: "Prethodni",
    next: "Sledeći",
    chats: [
      {
        name: "AI agent · Zakazivanje",
        solve: "Rešava: propuštene termine i duple rezervacije",
        msgs: [
          ["user","Mogu li sutra da zakažem termin?"],
          ["agent","Slobodni su 10h i 15h. Koji ti odgovara?"],
          ["user","U 15h."],
          ["agent","Termin je rezervisan. Potvrda stiže na email."],
        ],
      },
      {
        name: "AI agent · Podrška",
        solve: "Rešava: sporu podršku i ponavljajuća pitanja",
        msgs: [
          ["user","Gde je moja porudžbina?"],
          ["agent","Pošalji broj porudžbine da proverim status."],
          ["user","Broj 1042."],
          ["agent","Predata je kuriru. Evo linka za praćenje."],
        ],
      },
      {
        name: "AI agent · Leadovi",
        solve: "Rešava: nekvalifikovane upite i izgubljeno vreme",
        msgs: [
          ["user","Tražim stan u Nišu."],
          ["agent","Koji su budžet i željeni deo grada?"],
          ["user","Do 100.000 €, blizu centra."],
          ["agent","Proslediću tvoje kriterijume agentu da predloži odgovarajuće stanove."],
        ],
      },
      {
        name: "AI agent · Dokumenti",
        solve: "Rešava: ručno čitanje ugovora i dosijea",
        msgs: [
          ["user","Koji je rok za raskid ovog ugovora?"],
          ["agent","U članu 8 piše: 30 dana unapred."],
          ["user","Pokaži mi gde."],
          ["agent","Strana 4, član 8. Proveri originalnu odredbu pre odluke."],
        ],
      },
    ],
  },
  process: {
    eyebrow: "Kako radimo",
    title: "PROCES",
    items: [
      { title: "Razgovor", desc: "Opiši problem. Dogovaramo cilj i sledeći korak." },
      { title: "Predlog rešenja", desc: "Vidiš pravac, obim, cenu i rok pre početka izrade." },
      { title: "Izrada", desc: "Pratiš napredak i daješ povratne informacije." },
      { title: "Lansiranje i podrška", desc: "Puštamo sistem u rad i dogovaramo dalje održavanje." },
    ],
  },
  tech: { eyebrow: "Alati koje vozimo", title: "STACK" },
  metrics: [
    "Klijentskih sistema u produkciji",
    "Sajtova i aplikacija koje rade uživo",
    "Od prvog poziva do prototipa",
    "Vaš sistem radi i kad vi ne radite",
  ],
  faq: {
    eyebrow: "Pre nego što se javiš",
    title: "FAQ",
    items: [
      { q: "Koliko košta izrada sajta ili aplikacije?", a: "Zavisi od funkcija i obima. Posle razgovora dobijaš konkretnu ponudu sa cenom i rokom, pre početka izrade." },
      { q: "Koliko traje izrada?", a: "Rok dogovaramo prema obimu i spremnosti sadržaja. Tokom izrade redovno vidiš napredak." },
      { q: "Šta je interna aplikacija?", a: "Alat za tvoj tim: termini, evidencija, porudžbine ili izveštaji — umesto rasutih tabela i ručnog rada." },
      { q: "Da li radite AI automatizaciju?", a: "Da. Povezujemo AI sa zakazivanjem, podrškom i obradom upita. Krenemo od zadatka koji ti oduzima najviše vremena." },
      { q: "Radite li sa firmama van Niša?", a: "Da, širom Srbije i inostranstva. Sarađujemo online, na srpskom, engleskom i nemačkom." },
      { q: "Šta dobijam posle lansiranja?", a: "Uputstvo za korišćenje i podršku prema dogovoru. Održavanje i dalji razvoj definišemo u ponudi." },
    ],
  },
  cta: {
    eyebrow: "Prvi korak, bez obaveze",
    titleLine1: "HAJDE DA NAPRAVIMO",
    titleLine2Pre: "NEŠTO ",
    titleAccent: "VELIKO.",
    altPrefix: "ili odmah:",
    note: "Napiši šta ti treba. Đorđe odgovara lično, obično isti ili sledeći radni dan.",
  },
};

const en: V4Copy = {
  actions: {"inquiry":"Tell us what you need","help":"Not sure what you need? Ask us","ai":"I’d like this automation","process":"Let’s discuss your project","faq":"Have another question? Get in touch","value":["Explore websites","Explore business apps","Explore online stores"]},
  nav: {
    cta: "Start a project",
    links: { services: "Services", work: "Work", pricing: "Pricing", blog: "Blog", about: "About", booking: "Booking", contact: "Contact" },
  },
  rail: ["Start", "Manifesto", "Value", "Work", "Services", "AI demo", "Process", "FAQ", "Contact"],
  hero: {
    badge: "Web · Apps · AI — Niš",
    title: ["NOBODY REMEMBERS", "AVERAGE", "SITES"],
    sub: "Websites that bring clients. Apps that save time. Online stores, booking and AI, built around your business.",
    ctaPrimary: "Tell us what you need",
    ctaGhost: "See our work",
    trust: ["13 production systems", "5 public case studies", "Prototype in 48h"],
    scroll: "scroll",
    drag: "drag · spin the scene",
  },
  marquee: "WEB · APPS · E-COMMERCE · AI · WEBGL · DESIGN · ",
  manifesto:
    "Your business deserves more than a good-looking website. More enquiries, easier sales and less manual work.",
  value: {
    eyebrow: "Start with your goal",
    title: "WHAT DO YOU NEED?",
    items: [
      {"title":"More enquiries","desc":"A clear offer and an easy way to get in touch."},
      {"title":"Less admin","desc":"Appointments, records and reports in one place."},
      {"title":"Easier sales","desc":"An online store that takes orders around the clock."},
    ],
  },
  projects: {
    eyebrow: "Work / 01—06",
    title: "SELECTED PROJECTS",
    hint: "Scroll — the story runs right →",
    link: "View project →",
    open: "open",
    items: [
      { cat: "Aesthetic clinic", summary: "Website, online appointments and clinic administration in one system." },
      { cat: "Transport · Logistics", summary: "Website enquiries connected to the sales pipeline." },
      { cat: "Fashion brand", summary: "Online store, orders and inventory in one place." },
      { cat: "EdTech", summary: "Teacher applications and interviews in one online process." },
      { cat: "Barber studio", summary: "Clients choose a time. The salon manages its schedule." },
      { cat: "Tattoo studio", summary: "Inquiries with references, an appointment calendar and deposits in one place." },
    ],
  },
  services: {
    eyebrow: "What we do — hover the list",
    title: "SERVICES",
    panelCta: "View service →",
    items: [
      { title: "Websites", desc: "A fast site that leads visitors to an enquiry.", tags: ["Next.js", "SEO"] },
      { title: "Online store", desc: "Sales and orders in one smooth flow.", tags: ["Catalog", "Payments"] },
      { title: "Mobile apps", desc: "Apps for customers and teams.", tags: ["PWA", "iOS / Android"] },
      { title: "CMS systems", desc: "Edit content without a developer.", tags: ["Admin", "Content"] },
      { title: "AI automation", desc: "Less manual work in sales and support.", tags: ["LLM", "n8n"] },
      { title: "SEO & marketing", desc: "Visibility and measurable results.", tags: ["SEO", "Ads"] },
      { title: "Security & GDPR", desc: "Security and data protection.", tags: ["Audit", "GDPR"] },
      { title: "UI/UX design", desc: "An interface that clearly guides the user.", tags: ["Figma", "Motion"] },
    ],
  },
  aiDemo: {
    eyebrow: "AI automation examples",
    title: "LESS ROUTINE.",
    note: "Booking, support and enquiries — explore simulated conversations. We tailor the solution to your business.",
    prev: "Previous",
    next: "Next",
    chats: [
      {
        name: "AI agent · Scheduling",
        solve: "Fixes: missed appointments and double bookings",
        msgs: [
          ["user","Can I book an appointment for tomorrow?"],
          ["agent","10am and 3pm are available. Which suits you?"],
          ["user","3pm, please."],
          ["agent","Booked. Your confirmation will arrive by email."],
        ],
      },
      {
        name: "AI agent · Support",
        solve: "Fixes: slow support and repetitive questions",
        msgs: [
          ["user","Where is my order?"],
          ["agent","Send your order number and I’ll check."],
          ["user","Order 1042."],
          ["agent","It’s with the courier. Here’s your tracking link."],
        ],
      },
      {
        name: "AI agent · Leads",
        solve: "Fixes: unqualified enquiries and wasted time",
        msgs: [
          ["user","I’m looking for a flat in Niš."],
          ["agent","What is your budget and preferred area?"],
          ["user","Up to €100,000, near the centre."],
          ["agent","I’ll share your criteria with the agent for matching listings."],
        ],
      },
      {
        name: "AI agent · Documents",
        solve: "Fixes: reading contracts and files by hand",
        msgs: [
          ["user","What is the notice period in this contract?"],
          ["agent","Clause 8 says 30 days."],
          ["user","Show me where."],
          ["agent","Page 4, clause 8. Check the original wording before deciding."],
        ],
      },
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "PROCESS",
    items: [
      {"title":"Conversation","desc":"Tell us the problem. We agree on the goal and next step."},
      {"title":"Proposal","desc":"You see the scope, price and timeline before development starts."},
      {"title":"Development","desc":"Follow progress and share feedback along the way."},
      {"title":"Launch & support","desc":"We launch your system and agree on ongoing maintenance."},
    ],
  },
  tech: { eyebrow: "Tools we run", title: "STACK" },
  metrics: [
    "Client systems running in production",
    "Sites & apps running live",
    "From first call to prototype",
    "Your system runs when you don't",
  ],
  faq: {
    eyebrow: "Questions everyone asks",
    title: "FAQ",
    items: [
      {"q":"How much does a website or app cost?","a":"It depends on features and scope. After our conversation, you get a proposal with a price and timeline before development starts."},
      {"q":"How long does it take?","a":"We agree a timeline based on scope and content readiness. You regularly review progress during development."},
      {"q":"What is an internal app?","a":"A tool for your team: appointments, records, orders or reports, replacing scattered spreadsheets and manual work."},
      {"q":"Do you offer AI automation?","a":"Yes. We connect AI to booking, support and enquiries, starting with the task that takes the most time."},
      {"q":"Do you work outside Niš?","a":"Yes, across Serbia and internationally. We collaborate online in Serbian, English and German."},
      {"q":"What do I get after launch?","a":"Guidance on using your system and support as agreed. Maintenance and future development are defined in the proposal."},
    ],
  },
  cta: {
    eyebrow: "First step · No commitment",
    titleLine1: "LET'S BUILD",
    titleLine2Pre: "SOMETHING ",
    titleAccent: "BIG.",
    altPrefix: "or right now:",
    note: "Tell us what you need. Đorđe replies personally, usually the same or next business day.",
  },
};

const de: V4Copy = {
  actions: {"inquiry":"Vorhaben beschreiben","help":"Noch unsicher? Fragen Sie uns","ai":"Ich möchte diese Automatisierung","process":"Lassen Sie uns Ihr Projekt besprechen","faq":"Weitere Fragen? Schreiben Sie uns","value":["Websites entdecken","Business-Apps entdecken","Onlineshops entdecken"]},
  nav: {
    cta: "Projekt starten",
    links: { services: "Leistungen", work: "Arbeiten", pricing: "Preise", blog: "Blog", about: "Über uns", booking: "Buchung", contact: "Kontakt" },
  },
  rail: ["Start", "Manifest", "Mehrwert", "Arbeiten", "Leistungen", "KI-Demo", "Prozess", "FAQ", "Kontakt"],
  hero: {
    badge: "Web · Apps · KI — Niš",
    title: ["NIEMAND MERKT SICH", "DURCHSCHNITT", "SEITEN"],
    sub: "Websites, die Kunden bringen. Apps, die Zeit sparen. Onlineshops, Buchungssysteme und KI nach Maß.",
    ctaPrimary: "Vorhaben beschreiben",
    ctaGhost: "Arbeiten ansehen",
    trust: ["13 Produktivsysteme", "5 öffentliche Fallstudien", "Prototyp in 48 h"],
    scroll: "scrollen",
    drag: "ziehen · Szene drehen",
  },
  marquee: "WEB · APPS · E-COMMERCE · KI · WEBGL · DESIGN · ",
  manifesto:
    "Ihr Unternehmen verdient mehr als eine schöne Website. Mehr Anfragen, einfacheren Verkauf und weniger Handarbeit.",
  value: {
    eyebrow: "Ihr Ziel ist der Anfang",
    title: "WAS BRAUCHEN SIE?",
    items: [
      {"title":"Mehr Anfragen","desc":"Ein klares Angebot und ein einfacher Weg zum Kontakt."},
      {"title":"Weniger Aufwand","desc":"Termine, Verwaltung und Berichte an einem Ort."},
      {"title":"Einfacher verkaufen","desc":"Ein Onlineshop, der rund um die Uhr Bestellungen annimmt."},
    ],
  },
  projects: {
    eyebrow: "Arbeiten / 01—06",
    title: "AUSGEWÄHLTE PROJEKTE",
    hint: "Scrollen — die Story läuft nach rechts →",
    link: "Projekt ansehen →",
    open: "öffnen",
    items: [
      { cat: "Ästhetische Klinik", summary: "Website, Online-Termine und Klinikverwaltung in einem System." },
      { cat: "Transport · Logistik", summary: "Website-Anfragen direkt mit dem Vertrieb verbunden." },
      { cat: "Modemarke", summary: "Onlineshop, Bestellungen und Lagerbestand an einem Ort." },
      { cat: "EdTech", summary: "Bewerbungen und Interviews für Lehrkräfte in einem Online-Prozess." },
      { cat: "Barber-Studio", summary: "Kunden wählen ihren Termin. Der Salon verwaltet den Kalender." },
      { cat: "Tattoo-Studio", summary: "Anfragen mit Referenzen, Terminkalender und Anzahlungen an einem Ort." },
    ],
  },
  services: {
    eyebrow: "Was wir tun — über die Liste fahren",
    title: "LEISTUNGEN",
    panelCta: "Leistung ansehen →",
    items: [
      { title: "Websites", desc: "Eine schnelle Website, die Besucher zur Anfrage führt.", tags: ["Next.js", "SEO"] },
      { title: "Onlineshop", desc: "Verkauf und Bestellungen in einem Fluss.", tags: ["Katalog", "Zahlung"] },
      { title: "Mobile Apps", desc: "Apps für Kunden und Teams.", tags: ["PWA", "iOS / Android"] },
      { title: "CMS-Systeme", desc: "Inhalte ändern ohne Entwickler.", tags: ["Admin", "Inhalt"] },
      { title: "KI-Automatisierung", desc: "Weniger Handarbeit in Vertrieb und Support.", tags: ["LLM", "n8n"] },
      { title: "SEO & Marketing", desc: "Sichtbarkeit und messbare Ergebnisse.", tags: ["SEO", "Ads"] },
      { title: "Security & DSGVO", desc: "Sicherheit und Datenschutz.", tags: ["Audit", "DSGVO"] },
      { title: "UI/UX-Design", desc: "Eine Oberfläche, die den Nutzer klar führt.", tags: ["Figma", "Motion"] },
    ],
  },
  aiDemo: {
    eyebrow: "Beispiele für KI-Automatisierung",
    title: "WENIGER ROUTINE.",
    note: "Buchung, Support und Anfragen: Entdecken Sie simulierte Gespräche. Wir passen die Lösung Ihrem Unternehmen an.",
    prev: "Zurück",
    next: "Weiter",
    chats: [
      {
        name: "KI-Agent · Terminbuchung",
        solve: "Löst: verpasste Termine und Doppelbuchungen",
        msgs: [
          ["user","Kann ich morgen einen Termin buchen?"],
          ["agent","10 und 15 Uhr sind frei. Was passt Ihnen?"],
          ["user","15 Uhr, bitte."],
          ["agent","Gebucht. Die Bestätigung kommt per E-Mail."],
        ],
      },
      {
        name: "KI-Agent · Support",
        solve: "Löst: langsamen Support und wiederkehrende Fragen",
        msgs: [
          ["user","Wo ist meine Bestellung?"],
          ["agent","Nennen Sie mir die Bestellnummer."],
          ["user","Bestellung 1042."],
          ["agent","Das Paket ist beim Versanddienstleister. Hier ist der Tracking-Link."],
        ],
      },
      {
        name: "KI-Agent · Leads",
        solve: "Löst: unqualifizierte Anfragen und verlorene Zeit",
        msgs: [
          ["user","Ich suche eine Wohnung in Niš."],
          ["agent","Welches Budget und welchen Stadtteil bevorzugen Sie?"],
          ["user","Bis 100.000 €, zentrumsnah."],
          ["agent","Ich leite Ihre Kriterien für passende Angebote an den Makler weiter."],
        ],
      },
      {
        name: "KI-Agent · Dokumente",
        solve: "Löst: Verträge und Akten von Hand lesen",
        msgs: [
          ["user","Welche Kündigungsfrist steht im Vertrag?"],
          ["agent","Laut Ziffer 8 beträgt sie 30 Tage."],
          ["user","Wo genau?"],
          ["agent","Seite 4, Ziffer 8. Prüfen Sie vor einer Entscheidung den Originaltext."],
        ],
      },
    ],
  },
  process: {
    eyebrow: "Wie wir arbeiten",
    title: "PROZESS",
    items: [
      {"title":"Gespräch","desc":"Sie beschreiben das Problem. Wir vereinbaren Ziel und nächsten Schritt."},
      {"title":"Lösungsvorschlag","desc":"Umfang, Preis und Zeitplan stehen vor Entwicklungsbeginn fest."},
      {"title":"Entwicklung","desc":"Sie verfolgen den Fortschritt und geben Feedback."},
      {"title":"Start & Betreuung","desc":"Wir starten Ihr System und vereinbaren die weitere Wartung."},
    ],
  },
  tech: { eyebrow: "Womit wir arbeiten", title: "STACK" },
  metrics: [
    "Kundensysteme im Produktivbetrieb",
    "Websites & Apps live im Einsatz",
    "Vom ersten Anruf zum Prototyp",
    "Ihr System läuft, wenn Sie frei haben",
  ],
  faq: {
    eyebrow: "Fragen, die alle stellen",
    title: "FAQ",
    items: [
      {"q":"Was kostet eine Website oder App?","a":"Das hängt von Funktionen und Umfang ab. Nach dem Gespräch erhalten Sie ein Angebot mit Preis und Zeitplan, bevor die Entwicklung beginnt."},
      {"q":"Wie lange dauert die Umsetzung?","a":"Wir vereinbaren den Zeitplan nach Umfang und verfügbaren Inhalten. Während der Entwicklung sehen Sie regelmäßig den Fortschritt."},
      {"q":"Was ist eine interne App?","a":"Ein Werkzeug für Ihr Team: Termine, Verwaltung, Bestellungen oder Berichte statt verstreuter Tabellen und Handarbeit."},
      {"q":"Bieten Sie KI-Automatisierung an?","a":"Ja. Wir verbinden KI mit Buchung, Support und Anfragen. Wir beginnen bei der Aufgabe, die am meisten Zeit kostet."},
      {"q":"Arbeiten Sie außerhalb von Niš?","a":"Ja, in Serbien und international. Wir arbeiten online auf Serbisch, Englisch und Deutsch zusammen."},
      {"q":"Was bekomme ich nach dem Start?","a":"Eine Einführung in Ihr System und die vereinbarte Unterstützung. Wartung und Weiterentwicklung definieren wir im Angebot."},
    ],
  },
  cta: {
    eyebrow: "Erster Schritt · Unverbindlich",
    titleLine1: "WIR BAUEN",
    titleLine2Pre: "ETWAS ",
    titleAccent: "GROSSES.",
    altPrefix: "oder sofort:",
    note: "Beschreiben Sie Ihr Vorhaben. Đorđe antwortet persönlich, meist am selben oder nächsten Werktag.",
  },
};

const COPY: Record<LocaleCode, V4Copy> = { sr, en, de };

export function getV4Copy(locale: LocaleCode): V4Copy {
  return COPY[locale] ?? sr;
}

/** FAQ items for the given locale — used by both the accordion and JSON-LD. */
export function getV4Faq(locale: LocaleCode): { q: string; a: string }[] {
  return getV4Copy(locale).faq.items;
}
