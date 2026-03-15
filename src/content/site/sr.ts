import type { LocalizedPageContent } from "@/content/site/types";

const services = [
  {
    title: "Web dizajn i razvoj",
    summary:
      "Skalabilni sajtovi i napredne web aplikacije u Next.js tehnologiji za ozbiljne poslovne procese.",
    bullets: [
      "Arhitektura za velike kolicine podataka i performanse",
      "React frontend i robustan backend API sloj",
      "ERP, CRM i payment integracije",
    ],
    slug: "web-dizajn-i-razvoj",
    href: "/usluge/web-dizajn-i-razvoj",
    cta: "Detalji usluge",
  },
  {
    title: "E-commerce",
    summary: "Prodajni sajtovi fokusirani na konverzije i iskustvo kupaca.",
    bullets: [
      "Custom shop ili Shopify/Headless",
      "Placanja i dostava",
      "Optimizovan checkout",
    ],
    slug: "e-commerce",
    href: "/usluge/e-commerce",
    cta: "Detalji usluge",
  },
  {
    title: "Booking sistemi",
    summary: "Online zakazivanje prilagodjeno za usluzne biznise.",
    bullets: [
      "Samostalno zakazivanje i potvrde",
      "Admin kalendar, usluge i tim",
      "Podsetnici i kontrola no-show",
    ],
    slug: "booking-sistemi",
    href: "/usluge/booking-sistemi",
    cta: "Detalji usluge",
  },
  {
    title: "Booking za salone bez sistema",
    summary: "Uvodjenje online zakazivanja za salone bez postojeceg softvera.",
    bullets: [
      "Prelazak sa poziva i DM poruka na centralni kalendar",
      "Varijante za jedan salon ili vise lokala",
      "Primeri vec rade u produkciji",
    ],
    slug: "booking-za-salone-bez-sistema",
    href: "/usluge/booking-za-salone-bez-sistema",
    cta: "Detalji usluge",
  },
  {
    title: "Web pozivnice za veselja",
    summary: "Digitalne pozivnice sa RSVP pregledom u realnom vremenu.",
    bullets: [
      "Nizi trosak od stampe",
      "RSVP pregled gostiju",
      "Brze izmene i instant deljenje",
    ],
    slug: "web-pozivnice-za-veselja",
    href: "/usluge/web-pozivnice-za-veselja",
    cta: "Detalji usluge",
  },
  {
    title: "SEO i sadrzaj",
    summary: "Tehnicki SEO i content strategija za stabilan organski rast.",
    bullets: [
      "Tehnicki SEO i brzina",
      "On-page optimizacija",
      "Plan i produkcija sadrzaja",
    ],
    slug: "seo-i-sadrzaj",
    href: "/usluge/seo-i-sadrzaj",
    cta: "Detalji usluge",
  },
  {
    title: "Performance marketing",
    summary: "Google i Meta kampanje povezane sa pravim merenjem leadova i prodaje.",
    bullets: [
      "Postavka pracenja konverzija i publika",
      "Optimizacija troska po leadu i prodaji",
      "Jasan reporting za rast budzeta",
    ],
    slug: "performance-marketing",
    href: "/usluge/performance-marketing",
    cta: "Detalji usluge",
  },
  {
    title: "Brending i identitet",
    summary: "Vizuelni identitet i komunikacija koji stvaraju prepoznatljivost i poverenje.",
    bullets: [
      "Pozicioniranje i brand poruka",
      "Logo, paleta, tipografija i smernice",
      "Sistem koji radi kroz web i kampanje",
    ],
    slug: "brending-i-identitet",
    href: "/usluge/brending-i-identitet",
    cta: "Detalji usluge",
  },
  {
    title: "Drustvene mreze i sadrzaj",
    summary: "Planiranje i produkcija sadrzaja za kanale koji treba da donesu rezultat, ne samo objave.",
    bullets: [
      "Plan objava i content stubovi",
      "UGC, short-form i prodajni kreativi",
      "Uskladjivanje sa lead i ad sistemom",
    ],
    slug: "drustvene-mreze-i-sadrzaj",
    href: "/usluge/drustvene-mreze-i-sadrzaj",
    cta: "Detalji usluge",
  },
  {
    title: "Odrzavanje i podrska",
    summary: "Tehnicka podrska posle lansiranja da sajt ostane brz, siguran i stabilan.",
    bullets: [
      "Bezbednosna i sistemska azuriranja",
      "Monitoring performansi i ispravke",
      "Iterativna poboljsanja bez haosa",
    ],
    slug: "odrzavanje-i-podrska",
    href: "/usluge/odrzavanje-i-podrska",
    cta: "Detalji usluge",
  },
  {
    title: "Analitika i CRO",
    summary: "GA4, Tag Manager i optimizacija konverzija za odluke zasnovane na podacima.",
    bullets: [
      "Precizno merenje izvora i leadova",
      "Funnel analiza i otkrivanje gubitaka",
      "Testovi i izmene koje dizu konverziju",
    ],
    slug: "analitika-i-cro",
    href: "/usluge/analitika-i-cro",
    cta: "Detalji usluge",
  },
];

const portfolio = [
  { name: "tamitrade.com", category: "Korporativni sajt", image: "/images/portfolio/one.png", url: "https://tamitrade.com" },
  { name: "prevozkop.rs", category: "Booking + servis", image: "/images/portfolio/two.png", url: "https://prevozkop.rs" },
  { name: "aircoolplus.rs", category: "Lead generation", image: "/images/portfolio/three.png", url: "https://aircoolplus.rs" },
  { name: "infinity-gym.rs", category: "Brand sajt", image: "/images/portfolio/four.png", url: "https://infinity-gym.rs" },
  { name: "autodelic.com", category: "Katalog proizvoda", image: "/images/portfolio/five.png", url: "https://autodelic.com" },
  { name: "mlgroup.rs", category: "Poslovna platforma", image: "/images/portfolio/six.png", url: "https://mlgroup.rs" },
];

export const srContent: LocalizedPageContent = {
  localeLabel: "SR",
  nav: {
    home: "Pocetna",
    about: "O nama",
    services: "Usluge",
    projects: "Projekti",
    contact: "Kontakt",
    blog: "Blog",
    faq: "FAQ",
    portfolio: "Portfolio",
  },
  hero: {
    line1: "Web sistemi,",
    line2: "koji rastu sa biznisom",
    body:
      "Dizajniramo, razvijamo i optimizujemo sajtove, aplikacije i prodajne tokove koji pretvaraju saobracaj u upite, rezervacije i prihod.",
  },
  digitalHero: {
    title: "Jedan proizvodni tok za dizajn, razvoj i rast",
    body:
      "Strategija, UI/UX, development, SEO i automatizacija rade kao jedan sistem. Bez prebacivanja odgovornosti izmedju timova.",
    bullets: ["Strategija", "UI/UX", "Development", "SEO", "Automatizacija", "Performanse"],
  },
  freelancerHero: {
    title: "Od ideje do lansiranja bez uskih grla",
    body:
      "Pravimo interfejse za konverziju, tehnicki SEO baseline i stabilan release koji moze da izdrzi realan rast i operativni pritisak.",
    tags: ["Next.js", "SEO", "Automatizacija", "Analytics", "CRO", "Growth ops"],
  },
  designerHero: {
    title: "Partner za ozbiljne web isporuke",
    status: "Otvoreni za nove projekte",
    body: "Ulazimo od discovery faze do produkcije, sa jasnim scope-om, realnim roadmap-om i fokusom na rezultat posle lansiranja.",
  },
  services: {
    pageTitle: "Nase usluge",
    pageSubtitle: "Kompletna digitalna isporuka od planiranja do merenja rezultata.",
    items: [...services],
  },
  portfolio: {
    pageTitle: "Odabrani projekti",
    pageSubtitle: "Primeri gde su dizajn, performanse i poslovni cilj radili kao jedan sistem.",
    items: [...portfolio],
  },
  cta: {
    kicker: "Krenimo",
    title: "Spreman si da ideju pretvorimo u sistem koji raste?",
    body: "Mozemo krenuti discovery pozivom i jasnim planom implementacije.",
    primaryLabel: "Pokreni projekat",
    primaryHref: "/contact-us",
    secondaryLabel: "Pogledaj projekte",
    secondaryHref: "/our-projects",
  },
  testimonials: {
    title: "Utisci klijenata",
    subtitle: "Sta timovi kazu posle lansiranja.",
    items: [
      {
        name: "Milan R.",
        role: "Osnivac",
        quote:
          "Novi sajt i kampanje su povecali broj upita i doneli jasniji prodajni proces.",
      },
      {
        name: "Jelena P.",
        role: "Marketing menadzer",
        quote: "Brz tim, jasna komunikacija i fokus na rezultat.",
      },
      {
        name: "Nikola S.",
        role: "Vlasnik biznisa",
        quote: "Booking automatizacija je smanjila haos i ubrzala zakazivanje.",
      },
    ],
  },
  faq: {
    title: "Najcesca pitanja",
    subtitle: "Brzi odgovori o rokovima, procesu i podrsci.",
    items: [
      {
        q: "Koliko traje isporuka?",
        a: "Manji sajtovi se rade brzo, a veci sistemi kroz jasno definisane faze.",
      },
      {
        q: "Da li radite odrzavanje nakon lansiranja?",
        a: "Da, podrska, azuriranja i iterativna optimizacija su deo redovne isporuke.",
      },
      {
        q: "Mozemo li krenuti sa manjim budzetom?",
        a: "Da. Definisemo MVP i sirimo sistem po prioritetima.",
      },
    ],
  },
  contact: {
    title: "Kontakt",
    subtitle: "Posalji cilj i rok, vracamo konkretan sledeci korak.",
    phone: "+381 60 149 149 1",
    email: "djordje@adspire.rs",
    address: "Dimitrija Leka 66, Nis",
    form: {
      name: "Ime i prezime",
      email: "Email",
      subject: "Tema",
      message: "Poruka",
      submit: "Posalji poruku",
      subjectOptions: {
        project: "Novi projekat",
        service: "Usluga",
        budget: "Budzet",
        support: "Podrska",
      },
      success: "Poruka je uspesno poslata.",
      error: "Poruka nije poslata.",
      sending: "Slanje...",
    },
  },
  article: {
    title: "Kako gradimo web sisteme spremne za kampanje i rast",
    subtitle: "Proces koji povezuje strategiju, dizajn, development i merenje.",
    bodyTitle: "Od briefa do lansiranja bez izgubljenih koraka",
    body:
      "Svaki projekat pocinje merljivim poslovnim ciljem. Zatim mapiramo korisnicki tok, definisemo ogranicenja i gradimo sprintove oko onoga sto najbrze pomera upite, rezervacije ili prodaju.",
    principles: [
      "Mobile-first interfejs i jasan funnel",
      "Performanse, schema i SEO osnova u prvom sprintu",
      "Strukturisana analitika i conversion tracking od prvog dana",
    ],
  },
  team: {
    title: "Timska isporuka bez handoff haosa",
    subtitle: "Model rada u kome strategija, dizajn i development dele isti cilj.",
    leadName: "Djordje",
    leadRole: "Strategija, prodaja i rast",
    leadBio:
      "Vodi discovery, scope, prioritetizaciju i growth sisteme kako bi ceo projekat ostao usmeren na merljiv ishod, a ne samo na isporuku dizajna.",
    bullets: [
      "Discovery radionice i KPI uskladjivanje",
      "Scope, funnel i planiranje konverzija",
      "Roadmap, lansiranje i optimizacija posle go-live",
    ],
  },
  project: {
    title: "Detalj projekta",
    subtitle: "Pregled procesa, isporuke i poslovnog efekta.",
    bodyTitle: "Case pregled",
    body:
      "Produkcioni primer fokusiran na UX za konverziju, brzu implementaciju i dugorocnu odrzivost unutar realnog poslovnog okruzenja.",
    bullets: [
      "Discovery faza i KPI mapiranje pre dizajna",
      "Dizajn sistem, development i integracije",
      "Ucvrscivanje performansi, SEO osnove i pracenja",
    ],
    liveLabel: "Pogledaj live projekat",
  },
  footer: {
    tagline: "Gradimo digitalne sisteme koji pretvaraju paznju u prihod.",
    cta: "Kontaktiraj nas",
    copyright: "Sva prava zadrzana.",
  },
};
