import type { LocaleCode } from "@/lib/site-config";

/**
 * All visible landing copy for HomeV4 / AiDemoV4, keyed by locale.
 * Structural data (hrefs, images, accents, tech tags, scene params) lives in
 * the components; only translatable text lives here and is zipped by index.
 */

export type V4Copy = {
  nav: {
    cta: string;
    /** header links to real pages — `pricing` is SR-only, there is no
     *  localized /cena-izrade-sajta route yet */
    links: { services: string; work: string; pricing: string; blog: string; about: string };
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
    items: { cat: string; summary: string }[]; // 5, order matches PROJECTS
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
  footer: {
    blurb: string;
    mapTitle: string;
    map: [string, string, string, string]; // Projects, Services, Blog, Contact
    contactTitle: string;
    location: string;
    statusTitle: string;
    status: string;
    copyright: string;
    credit: string;
  };
};

const sr: V4Copy = {
  nav: {
    cta: "Pokreni projekat",
    links: { services: "Usluge", work: "Radovi", pricing: "Cene", blog: "Blog", about: "O nama" },
  },
  rail: ["Početak", "Manifest", "Vrednost", "Radovi", "Usluge", "AI demo", "Proces", "FAQ", "Kontakt"],
  hero: {
    badge: "Web · Aplikacije · AI — Niš",
    title: ["NIKO NE PAMTI", "PROSEČAN", "SAJT"],
    sub: "Ručno kodirani sajtovi i AI sistemi koji pretvaraju posetioce u klijente.",
    ctaPrimary: "Postavi pitanje — odgovor isti dan",
    ctaGhost: "Pogledaj radove",
    trust: ["13 sistema u produkciji", "5 javnih studija slučaja", "Prototip za 48h"],
    scroll: "skroluj",
    drag: "prevuci · zavrti scenu",
  },
  marquee: "WEB · APLIKACIJE · E-COMMERCE · AI · WEBGL · DIZAJN · ",
  manifesto:
    "Vaš sajt ima jedan posao: da vam dovodi klijente. Vaši procesi drugi: da vam ne jedu vreme. Mi gradimo oba — sajt koji prodaje dok spavate i sisteme koji dosadan posao rade umesto vas.",
  value: {
    eyebrow: "Bez magle — ovo dobijate",
    title: "ŠTA PLAĆATE",
    items: [
      { title: "Više upita", desc: "Sajt koji pretvara posetioce u pozive i porudžbine. Ne vizit-karta — prodavac koji radi 24 sata dnevno." },
      { title: "Više vremena", desc: "Aplikacije koje same zakazuju termine, prave izveštaje i sređuju papire. Vama ostaju sati — svake nedelje." },
      { title: "Više novca", desc: "Web shop, AI agenti i automatska prodaja. Sistem odgovara kupcima i prodaje — i kad vi ne radite." },
    ],
  },
  projects: {
    eyebrow: "Radovi / 01—05",
    title: "IZDVOJENI PROJEKTI",
    hint: "Skroluj — priča ide udesno →",
    link: "Pogledaj projekat →",
    open: "otvori",
    items: [
      { cat: "Estetska klinika", summary: "Booking platforma, javni sajt i admin kalendar — termini, klijenti i analitika u jednom sistemu." },
      { cat: "Transport · Logistika", summary: "SEO sajt i CRM panel — upiti sa sajta ulaze pravo u prodajni tok." },
      { cat: "Modni brend", summary: "E-commerce i admin platforma — prodaja, lager i porudžbine iz jednog mesta." },
      { cat: "EdTech", summary: "Onboarding aplikacija — prijava, audio intervju i referral u merljivom funnel-u." },
      { cat: "Barber studio", summary: "Booking sistem 24/7 — online termini i admin kalendar, bez ručnog dogovaranja." },
    ],
  },
  services: {
    eyebrow: "Šta radimo — pređi preko liste",
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
    eyebrow: "AI agent uživo",
    title: "NIJE SNIMAK.",
    note: "Ovakav agent već radi kod naših klijenata: odgovara kupcima, zakazuje termine i beleži svaki upit — 24 sata dnevno, bez pauze. Prevuci i pogledaj prave razgovore.",
    prev: "Prethodni",
    next: "Sledeći",
    chats: [
      {
        name: "AI agent · Zakazivanje",
        solve: "Rešava: propuštene termine i duple rezervacije",
        msgs: [
          ["agent", "Zdravo! Koliko termina vodite dnevno?"],
          ["user", "Oko 30, sve preko telefona."],
          ["agent", "To pravi duple rezervacije i jede vreme. AI agent + booking preuzima zakazivanje 24/7 — bez osoblja."],
          ["user", "Koliko brzo se postavlja?"],
          ["agent", "MVP za 2 nedelje. Da rezervišem besplatnu konsultaciju?"],
          ["user", "Može, sutra."],
          ["agent", "Zakazano ✓ Sutra 15h. Potvrda na mejlu. Vidimo se!"],
        ],
      },
      {
        name: "AI agent · Podrška",
        solve: "Rešava: sporu podršku i ponavljajuća pitanja",
        msgs: [
          ["agent", "Koliko upita podrške dobijate dnevno na webshopu?"],
          ["user", "Previše — gde mi je porudžbina, povraćaj, dostupnost..."],
          ["agent", "90% toga je ponavljajuće. AI agent odgovara odmah, na srpskom, 24/7 — a čoveku predaje samo složeno."],
          ["user", "A integracija sa našim sistemom?"],
          ["agent", "Povezujemo se na shop i CRM preko API-ja. Tiketi se sami kategorišu."],
          ["agent", "Hoćete primer na vašim podacima?"],
        ],
      },
      {
        name: "AI agent · Leadovi",
        solve: "Rešava: nekvalifikovane upite i izgubljeno vreme",
        msgs: [
          ["agent", "Koliko upita za nekretnine dobijate nedeljno?"],
          ["user", "Mnogo, ali većina nije ozbiljna."],
          ["agent", "AI agent kvalifikuje svaki upit — budžet, lokacija, rok — i zakazuje obilazak samo sa ozbiljnima."],
          ["user", "Znači filtrira umesto agenta?"],
          ["agent", "Tako je. Tim priča samo sa spremnim kupcima, ostalo agent neguje automatski."],
          ["agent", "Da pokažem na vašoj ponudi?"],
        ],
      },
      {
        name: "AI agent · Dokumenti",
        solve: "Rešava: ručno čitanje ugovora i dosijea",
        msgs: [
          ["agent", "Koliko vremena trošite na čitanje ugovora i dosijea?"],
          ["user", "Sate. Sve ručno."],
          ["agent", "AI čita, sumira i vadi ključne klauzule i rokove — za sekunde, sa referencama na izvor."],
          ["user", "A poverljivost podataka?"],
          ["agent", "Radi privatno, na vašoj infrastrukturi. Ništa ne napušta firmu."],
          ["agent", "Hoćete demo na jednom vašem dokumentu?"],
        ],
      },
    ],
  },
  process: {
    eyebrow: "Kako radimo",
    title: "PROCES",
    items: [
      { title: "Analiza", desc: "Poziv od 30 minuta. Razumemo biznis, cilj i gde curi novac — bez žargona." },
      { title: "Prototip za 48h", desc: "Klikabilan prototip pre ugovora — vidite tačno šta kupujete, pre nego što platite bilo šta." },
      { title: "Sprint", desc: "MVP za 2 nedelje. Nedeljni demo, transparentan napredak, bez iznenađenja." },
      { title: "Launch & rast", desc: "Merenje, iteracije, AI automatizacija. Sistem koji raste sa biznisom." },
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
    eyebrow: "Pitanja koja svi postavljaju",
    title: "FAQ",
    items: [
      { q: "Koliko košta izrada sajta ili aplikacije?", a: "Zavisi od obima — prezentacioni sajt, web shop i interna aplikacija nisu ista liga. Zato prvo radimo besplatan poziv od 30 minuta i klikabilan prototip za 48h, pa tek onda cenu. Znate tačno šta plaćate pre nego što potpišete bilo šta." },
      { q: "Koliko traje izrada?", a: "Prototip za 48 sati. MVP za 2 nedelje. Kompletan sistem obično 4–8 nedelja, u sprintovima sa nedeljnim demo pregledom — vidite napredak svake nedelje." },
      { q: "Šta je interna aplikacija i kako mi štedi vreme?", a: "Alat skrojen za vaš tim: zakazivanje, nalozi, izveštaji, evidencija, fakture — sve što danas radite ručno kroz sveske, Excel i telefonske pozive. Vlasnicima i menadžerima tipično vraća više sati nedeljno." },
      { q: "Da li radite AI integracije i automatizaciju?", a: "Da — AI agenti za zakazivanje, podršku i kvalifikaciju leadova, automatizacija procesa kroz n8n i LLM integracije (Claude, GPT). Agent radi 24/7 i predaje čoveku samo ono što je stvarno složeno." },
      { q: "Radite li sa firmama van Niša?", a: "Da. Baza nam je Niš, ali radimo sa klijentima iz cele Srbije, regiona i Nemačke — sastanci online, komunikacija na srpskom, engleskom ili nemačkom." },
      { q: "Šta dobijam posle lansiranja?", a: "Merenje rezultata, održavanje, SEO i iteracije. Sajt bez merenja je trošak — naš posao se završava kad vidite više upita ili više ušteđenih sati, ne kad sajt ode online." },
    ],
  },
  cta: {
    eyebrow: "Besplatan poziv · 30 min",
    titleLine1: "HAJDE DA NAPRAVIMO",
    titleLine2Pre: "NEŠTO ",
    titleAccent: "VELIKO.",
    altPrefix: "ili odmah:",
    note: "Kažemo ti koliko vremena i novca možeš da vratiš — pre nego što potpišeš bilo šta.",
  },
  footer: {
    blurb: "Studio za web, aplikacije i AI automatizaciju. Sajtovi koji dovode klijente, sistemi koji štede vreme.",
    mapTitle: "Mapa",
    map: ["Projekti", "Usluge", "Blog", "Kontakt"],
    contactTitle: "Kontakt",
    location: "Niš, Srbija",
    statusTitle: "Status",
    status: "Dostupni za nove projekte",
    copyright: "© 2026 Adspire Digital — Niš. Sva prava zadržana.",
    credit: "Dizajn i kod: Adspire — ručno, bez šablona.",
  },
};

const en: V4Copy = {
  nav: {
    cta: "Start a project",
    links: { services: "Services", work: "Work", pricing: "Pricing", blog: "Blog", about: "About" },
  },
  rail: ["Start", "Manifesto", "Value", "Work", "Services", "AI demo", "Process", "FAQ", "Contact"],
  hero: {
    badge: "Web · Apps · AI — Niš",
    title: ["NOBODY REMEMBERS", "AVERAGE", "SITES"],
    sub: "Hand-coded websites and AI systems that turn visitors into clients.",
    ctaPrimary: "Book a free call",
    ctaGhost: "See our work",
    trust: ["13 production systems", "5 public case studies", "Prototype in 48h"],
    scroll: "scroll",
    drag: "drag · spin the scene",
  },
  marquee: "WEB · APPS · E-COMMERCE · AI · WEBGL · DESIGN · ",
  manifesto:
    "Your website has one job: to bring you clients. Your processes another: to stop eating your time. We build both — a site that sells while you sleep and systems that do the boring work for you.",
  value: {
    eyebrow: "No fluff — here's what you get",
    title: "WHAT YOU PAY FOR",
    items: [
      { title: "More leads", desc: "A site that turns visitors into calls and orders. Not a business card — a salesperson working 24 hours a day." },
      { title: "More time", desc: "Apps that book appointments, generate reports and handle the paperwork. You get hours back — every week." },
      { title: "More money", desc: "Web shop, AI agents and automated sales. The system answers customers and sells — even when you're off." },
    ],
  },
  projects: {
    eyebrow: "Work / 01—05",
    title: "SELECTED PROJECTS",
    hint: "Scroll — the story runs right →",
    link: "View project →",
    open: "open",
    items: [
      { cat: "Aesthetic clinic", summary: "Booking platform, public site and admin calendar — appointments, clients and analytics in one system." },
      { cat: "Transport · Logistics", summary: "SEO site and CRM panel — enquiries from the site drop straight into the sales pipeline." },
      { cat: "Fashion brand", summary: "E-commerce and admin platform — sales, stock and orders from a single place." },
      { cat: "EdTech", summary: "Onboarding app — sign-up, audio interview and referral in a measurable funnel." },
      { cat: "Barber studio", summary: "24/7 booking system — online slots and admin calendar, no manual scheduling." },
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
    eyebrow: "AI agent live",
    title: "NOT A RECORDING.",
    note: "This kind of agent already runs for our clients: it answers customers, books appointments and logs every enquiry — 24 hours a day, no breaks. Swipe through real conversations.",
    prev: "Previous",
    next: "Next",
    chats: [
      {
        name: "AI agent · Scheduling",
        solve: "Fixes: missed appointments and double bookings",
        msgs: [
          ["agent", "Hi! How many appointments do you run per day?"],
          ["user", "About 30, all over the phone."],
          ["agent", "That causes double bookings and eats time. An AI agent + booking takes over scheduling 24/7 — no staff needed."],
          ["user", "How fast can it be set up?"],
          ["agent", "MVP in 2 weeks. Shall I book a free consultation?"],
          ["user", "Sure, tomorrow works."],
          ["agent", "Booked ✓ Tomorrow 3pm. Confirmation on its way by email. See you!"],
        ],
      },
      {
        name: "AI agent · Support",
        solve: "Fixes: slow support and repetitive questions",
        msgs: [
          ["agent", "How many support questions a day do you get on the shop?"],
          ["user", "Too many — where's my order, returns, availability..."],
          ["agent", "90% of that is repetitive. The AI agent answers instantly, in English, 24/7 — and hands a human only the complex cases."],
          ["user", "And integration with our system?"],
          ["agent", "We connect to your shop and CRM via API. Tickets categorize themselves."],
          ["agent", "Want an example on your own data?"],
        ],
      },
      {
        name: "AI agent · Leads",
        solve: "Fixes: unqualified enquiries and wasted time",
        msgs: [
          ["agent", "How many property enquiries do you get per week?"],
          ["user", "A lot, but most aren't serious."],
          ["agent", "The AI agent qualifies each one — budget, location, timeline — and books a viewing only with serious buyers."],
          ["user", "So it filters instead of an agent?"],
          ["agent", "Exactly. The team only talks to ready buyers; the rest the agent nurtures automatically."],
          ["agent", "Shall I show it on your listings?"],
        ],
      },
      {
        name: "AI agent · Documents",
        solve: "Fixes: reading contracts and files by hand",
        msgs: [
          ["agent", "How much time do you spend reading contracts and files?"],
          ["user", "Hours. All by hand."],
          ["agent", "The AI reads, summarizes and pulls key clauses and deadlines — in seconds, with references to the source."],
          ["user", "And data confidentiality?"],
          ["agent", "It runs privately, on your infrastructure. Nothing leaves the company."],
          ["agent", "Want a demo on one of your documents?"],
        ],
      },
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "PROCESS",
    items: [
      { title: "Analysis", desc: "A 30-minute call. We understand the business, the goal and where money leaks — no jargon." },
      { title: "Prototype in 48h", desc: "A clickable prototype before any contract — you see exactly what you're buying before you pay anything." },
      { title: "Sprint", desc: "MVP in 2 weeks. Weekly demo, transparent progress, no surprises." },
      { title: "Launch & growth", desc: "Measurement, iteration, AI automation. A system that grows with the business." },
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
      { q: "How much does a website or app cost?", a: "It depends on scope — a brochure site, a web shop and an internal app aren't the same league. That's why we start with a free 30-minute call and a clickable prototype in 48h, and only then a price. You know exactly what you're paying before you sign anything." },
      { q: "How long does it take?", a: "Prototype in 48 hours. MVP in 2 weeks. A complete system usually 4–8 weeks, in sprints with a weekly demo — you see progress every week." },
      { q: "What is an internal app and how does it save me time?", a: "A tool tailored to your team: scheduling, orders, reports, records, invoices — everything you do by hand today through notebooks, Excel and phone calls. It typically gives owners and managers several hours back each week." },
      { q: "Do you do AI integrations and automation?", a: "Yes — AI agents for scheduling, support and lead qualification, process automation via n8n and LLM integrations (Claude, GPT). The agent runs 24/7 and hands a human only what's genuinely complex." },
      { q: "Do you work with companies outside Niš?", a: "Yes. We're based in Niš but work with clients across Serbia, the region and Germany — meetings online, communication in Serbian, English or German." },
      { q: "What do I get after launch?", a: "Result tracking, maintenance, SEO and iteration. A site without measurement is a cost — our job ends when you see more enquiries or more saved hours, not when the site goes live." },
    ],
  },
  cta: {
    eyebrow: "Free call · 30 min",
    titleLine1: "LET'S BUILD",
    titleLine2Pre: "SOMETHING ",
    titleAccent: "BIG.",
    altPrefix: "or right now:",
    note: "We'll tell you how much time and money you can win back — before you sign anything.",
  },
  footer: {
    blurb: "Studio for web, apps and AI automation. Sites that bring clients, systems that save time.",
    mapTitle: "Sitemap",
    map: ["Projects", "Services", "Blog", "Contact"],
    contactTitle: "Contact",
    location: "Niš, Serbia",
    statusTitle: "Status",
    status: "Available for new projects",
    copyright: "© 2026 Adspire Digital — Niš. All rights reserved.",
    credit: "Design & code: Adspire — handmade, no templates.",
  },
};

const de: V4Copy = {
  nav: {
    cta: "Projekt starten",
    links: { services: "Leistungen", work: "Arbeiten", pricing: "Preise", blog: "Blog", about: "Über uns" },
  },
  rail: ["Start", "Manifest", "Mehrwert", "Arbeiten", "Leistungen", "KI-Demo", "Prozess", "FAQ", "Kontakt"],
  hero: {
    badge: "Web · Apps · KI — Niš",
    title: ["NIEMAND MERKT SICH", "DURCHSCHNITT", "SEITEN"],
    sub: "Handcodierte Websites und KI-Systeme, die Besucher zu Kunden machen.",
    ctaPrimary: "Kostenloses Gespräch buchen",
    ctaGhost: "Arbeiten ansehen",
    trust: ["13 Produktivsysteme", "5 öffentliche Fallstudien", "Prototyp in 48 h"],
    scroll: "scrollen",
    drag: "ziehen · Szene drehen",
  },
  marquee: "WEB · APPS · E-COMMERCE · KI · WEBGL · DESIGN · ",
  manifesto:
    "Ihre Website hat eine Aufgabe: Ihnen Kunden zu bringen. Ihre Prozesse eine andere: Ihnen keine Zeit zu rauben. Wir bauen beides — eine Website, die verkauft, während Sie schlafen, und Systeme, die die langweilige Arbeit für Sie erledigen.",
  value: {
    eyebrow: "Ohne Umschweife — das bekommen Sie",
    title: "WOFÜR SIE ZAHLEN",
    items: [
      { title: "Mehr Anfragen", desc: "Eine Website, die Besucher zu Anrufen und Bestellungen macht. Keine Visitenkarte — ein Verkäufer, der rund um die Uhr arbeitet." },
      { title: "Mehr Zeit", desc: "Apps, die Termine buchen, Berichte erstellen und den Papierkram erledigen. Sie gewinnen Stunden zurück — jede Woche." },
      { title: "Mehr Umsatz", desc: "Webshop, KI-Agenten und automatischer Verkauf. Das System antwortet Kunden und verkauft — auch wenn Sie frei haben." },
    ],
  },
  projects: {
    eyebrow: "Arbeiten / 01—05",
    title: "AUSGEWÄHLTE PROJEKTE",
    hint: "Scrollen — die Story läuft nach rechts →",
    link: "Projekt ansehen →",
    open: "öffnen",
    items: [
      { cat: "Ästhetische Klinik", summary: "Buchungsplattform, öffentliche Website und Admin-Kalender — Termine, Kunden und Analytik in einem System." },
      { cat: "Transport · Logistik", summary: "SEO-Website und CRM-Panel — Anfragen von der Website landen direkt im Vertriebsprozess." },
      { cat: "Modemarke", summary: "E-Commerce- und Admin-Plattform — Verkauf, Lager und Bestellungen an einem Ort." },
      { cat: "EdTech", summary: "Onboarding-App — Anmeldung, Audio-Interview und Empfehlung in einem messbaren Funnel." },
      { cat: "Barber-Studio", summary: "Buchungssystem rund um die Uhr — Online-Termine und Admin-Kalender, ohne manuelle Absprache." },
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
    eyebrow: "KI-Agent live",
    title: "KEINE AUFZEICHNUNG.",
    note: "So ein Agent läuft bereits bei unseren Kunden: Er antwortet Kunden, bucht Termine und protokolliert jede Anfrage — rund um die Uhr, ohne Pause. Wischen Sie durch echte Gespräche.",
    prev: "Zurück",
    next: "Weiter",
    chats: [
      {
        name: "KI-Agent · Terminbuchung",
        solve: "Löst: verpasste Termine und Doppelbuchungen",
        msgs: [
          ["agent", "Hallo! Wie viele Termine haben Sie pro Tag?"],
          ["user", "Etwa 30, alle per Telefon."],
          ["agent", "Das führt zu Doppelbuchungen und kostet Zeit. Ein KI-Agent + Buchung übernimmt die Terminplanung rund um die Uhr — ohne Personal."],
          ["user", "Wie schnell ist das eingerichtet?"],
          ["agent", "MVP in 2 Wochen. Soll ich eine kostenlose Beratung buchen?"],
          ["user", "Gern, morgen passt."],
          ["agent", "Gebucht ✓ Morgen 15 Uhr. Bestätigung kommt per E-Mail. Bis dann!"],
        ],
      },
      {
        name: "KI-Agent · Support",
        solve: "Löst: langsamen Support und wiederkehrende Fragen",
        msgs: [
          ["agent", "Wie viele Support-Anfragen bekommen Sie täglich im Shop?"],
          ["user", "Zu viele — wo ist meine Bestellung, Rückgabe, Verfügbarkeit..."],
          ["agent", "90 % davon wiederholen sich. Der KI-Agent antwortet sofort, auf Deutsch, rund um die Uhr — und übergibt einem Menschen nur das Komplexe."],
          ["user", "Und die Integration mit unserem System?"],
          ["agent", "Wir verbinden uns per API mit Shop und CRM. Tickets kategorisieren sich selbst."],
          ["agent", "Möchten Sie ein Beispiel mit Ihren Daten?"],
        ],
      },
      {
        name: "KI-Agent · Leads",
        solve: "Löst: unqualifizierte Anfragen und verlorene Zeit",
        msgs: [
          ["agent", "Wie viele Immobilien-Anfragen bekommen Sie pro Woche?"],
          ["user", "Viele, aber die meisten sind nicht ernst."],
          ["agent", "Der KI-Agent qualifiziert jede Anfrage — Budget, Lage, Zeitrahmen — und bucht eine Besichtigung nur mit ernsthaften Käufern."],
          ["user", "Also filtert er statt eines Maklers?"],
          ["agent", "Genau. Das Team spricht nur mit kaufbereiten Interessenten, den Rest pflegt der Agent automatisch."],
          ["agent", "Soll ich es an Ihren Angeboten zeigen?"],
        ],
      },
      {
        name: "KI-Agent · Dokumente",
        solve: "Löst: Verträge und Akten von Hand lesen",
        msgs: [
          ["agent", "Wie viel Zeit kostet das Lesen von Verträgen und Akten?"],
          ["user", "Stunden. Alles von Hand."],
          ["agent", "Die KI liest, fasst zusammen und zieht die wichtigsten Klauseln und Fristen heraus — in Sekunden, mit Verweis auf die Quelle."],
          ["user", "Und die Vertraulichkeit der Daten?"],
          ["agent", "Sie läuft privat, auf Ihrer Infrastruktur. Nichts verlässt das Unternehmen."],
          ["agent", "Möchten Sie eine Demo mit einem Ihrer Dokumente?"],
        ],
      },
    ],
  },
  process: {
    eyebrow: "Wie wir arbeiten",
    title: "PROZESS",
    items: [
      { title: "Analyse", desc: "Ein 30-minütiges Gespräch. Wir verstehen das Geschäft, das Ziel und wo Geld verloren geht — ohne Fachjargon." },
      { title: "Prototyp in 48 h", desc: "Ein klickbarer Prototyp vor jedem Vertrag — Sie sehen genau, was Sie kaufen, bevor Sie etwas zahlen." },
      { title: "Sprint", desc: "MVP in 2 Wochen. Wöchentliche Demo, transparenter Fortschritt, keine Überraschungen." },
      { title: "Launch & Wachstum", desc: "Messung, Iteration, KI-Automatisierung. Ein System, das mit dem Geschäft wächst." },
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
      { q: "Was kostet eine Website oder App?", a: "Das hängt vom Umfang ab — eine Präsentationswebsite, ein Webshop und eine interne App sind nicht dieselbe Liga. Deshalb starten wir mit einem kostenlosen 30-minütigen Gespräch und einem klickbaren Prototyp in 48 h, und erst dann kommt der Preis. Sie wissen genau, wofür Sie zahlen, bevor Sie etwas unterschreiben." },
      { q: "Wie lange dauert die Umsetzung?", a: "Prototyp in 48 Stunden. MVP in 2 Wochen. Ein komplettes System meist 4–8 Wochen, in Sprints mit wöchentlicher Demo — Sie sehen jede Woche Fortschritt." },
      { q: "Was ist eine interne App und wie spart sie mir Zeit?", a: "Ein auf Ihr Team zugeschnittenes Tool: Terminplanung, Aufträge, Berichte, Erfassung, Rechnungen — alles, was Sie heute per Hand über Hefte, Excel und Anrufe erledigen. Inhabern und Managern gibt es typischerweise mehrere Stunden pro Woche zurück." },
      { q: "Macht ihr KI-Integrationen und Automatisierung?", a: "Ja — KI-Agenten für Terminbuchung, Support und Lead-Qualifizierung, Prozessautomatisierung über n8n und LLM-Integrationen (Claude, GPT). Der Agent läuft rund um die Uhr und übergibt einem Menschen nur das wirklich Komplexe." },
      { q: "Arbeitet ihr mit Firmen außerhalb von Niš?", a: "Ja. Wir sitzen in Niš, arbeiten aber mit Kunden in ganz Serbien, der Region und Deutschland — Meetings online, Kommunikation auf Serbisch, Englisch oder Deutsch." },
      { q: "Was bekomme ich nach dem Launch?", a: "Ergebnismessung, Wartung, SEO und Iteration. Eine Website ohne Messung ist ein Kostenfaktor — unsere Arbeit endet, wenn Sie mehr Anfragen oder mehr gesparte Stunden sehen, nicht wenn die Website online geht." },
    ],
  },
  cta: {
    eyebrow: "Kostenloses Gespräch · 30 Min",
    titleLine1: "WIR BAUEN",
    titleLine2Pre: "ETWAS ",
    titleAccent: "GROSSES.",
    altPrefix: "oder sofort:",
    note: "Wir sagen Ihnen, wie viel Zeit und Geld Sie zurückholen können — bevor Sie etwas unterschreiben.",
  },
  footer: {
    blurb: "Studio für Web, Apps und KI-Automatisierung. Websites, die Kunden bringen, Systeme, die Zeit sparen.",
    mapTitle: "Sitemap",
    map: ["Projekte", "Leistungen", "Blog", "Kontakt"],
    contactTitle: "Kontakt",
    location: "Niš, Serbien",
    statusTitle: "Status",
    status: "Verfügbar für neue Projekte",
    copyright: "© 2026 Adspire Digital — Niš. Alle Rechte vorbehalten.",
    credit: "Design & Code: Adspire — handgemacht, ohne Vorlagen.",
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
