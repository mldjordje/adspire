import type { LocalizedPageContent, ProjectItem, ServiceItem } from "@/content/site/types";

const services: ServiceItem[] = [
  {
    title: "Web prezentacije",
    summary:
      "U Adspire timu iz Niša gradimo moderne, brze i SEO optimizovane sajtove — od korporativnih prezentacija do landing stranica i višejezičkih platformi, uz merljive konverzije.",
    bullets: [
      "Next.js, React, TypeScript, Tailwind CSS",
      "SEO, blog, CMS, analytics i conversion tracking",
      "PWA, Core Web Vitals, cloud (Vercel / custom server)",
    ],
    slug: "web-prezentacije",
    href: "/our-services/web-prezentacije",
    cta: "Detalji usluge",
  },
  {
    title: "E-commerce i web shop sistemi",
    summary:
      "Adspire projektuje klasične i headless e-commerce platforme: admin, plaćanja, zalihe, pretplate i automatizacija — od MVP prodavnice do ozbiljnog shop sistema.",
    bullets: [
      "Custom shop, headless, subscription, digitalni proizvodi",
      "Kartična plaćanja, loyalty, kuponi, CRM integracija",
      "AI preporuke, email marketing, mobilna optimizacija",
    ],
    slug: "e-commerce-web-shop",
    href: "/our-services/e-commerce-web-shop",
    cta: "Detalji usluge",
  },
  {
    title: "Mobilne aplikacije (PWA + native)",
    summary:
      "Kod nas PWA brzo stiže do korisnika bez čekanja store odobrenja; native (Flutter / React Native) za iOS i Android kada trebaju plaćanja, GPS i puni pristup uređaju.",
    bullets: [
      "PWA: booking, loyalty, meniji, push, offline režim",
      "Native: plaćanja, GPS, QR/barcode, chat, App Store / Play",
      "Booking, loyalty, e-commerce, CRM i SaaS mobilni proizvodi",
    ],
    slug: "mobilne-aplikacije",
    href: "/our-services/mobilne-aplikacije",
    cta: "Detalji usluge",
  },
  {
    title: "CMS sistemi",
    summary:
      "Pravimo CMS i admin panele po meri vašeg tima — bez forsiranja generičkih rešenja kada proces zahteva poseban tok.",
    bullets: [
      "Admin panel, blog, galerija, korisnici",
      "Role-based pristup (admin, editor, user)",
      "Dashboard i jasna struktura sadržaja",
    ],
    slug: "cms-sistemi",
    href: "/our-services/cms-sistemi",
    cta: "Detalji usluge",
  },
  {
    title: "Interne poslovne aplikacije",
    summary:
      "Digitalizacija operativa u Adspire pristupu: CRM, termini, task manager i mini ERP povezani sa vašim stvarnim procesom, ne sa šablonom sa polica.",
    bullets: [
      "CRM, zaposleni, termini, prodaja, QR članarine",
      "Fakturisanje, izveštaji, API integracije",
      "Interni dashboard za vlasnike",
    ],
    slug: "interne-poslovne-aplikacije",
    href: "/our-services/interne-poslovne-aplikacije",
    cta: "Detalji usluge",
  },
  {
    title: "AI integracije i automatizacija",
    summary:
      "Uvodimo AI i automatizaciju (uključujući n8n tokove) tamo gde smanjuju ručni rad — prodaja, podrška, sadržaj i interni alarmi.",
    bullets: [
      "AI chatbot, support, zakazivanje, ponude, blog, SEO",
      "Voice agent, CRM asistent, lead scoring",
      "Marketing funnel, email, n8n workflow automatizacija",
    ],
    slug: "ai-integracije-automatizacija",
    href: "/our-services/ai-integracije-automatizacija",
    cta: "Detalji usluge",
  },
  {
    title: "Business intelligence i analitika",
    summary:
      "Gradimo dashboard-e i izveštaje koji se vezuju za vaše izvore istine — da vlasnici i timovi vide KPI, a ne samo skrinšotove iz alata.",
    bullets: [
      "Custom dashboard, KPI, grafici prodaje",
      "CRM analitika, heatmap, ponašanje korisnika",
      "Automatizovani mesečni izveštaji",
    ],
    slug: "business-intelligence-analitika",
    href: "/our-services/business-intelligence-analitika",
    cta: "Detalji usluge",
  },
  {
    title: "SEO i digitalni marketing",
    summary:
      "Adspire spaja tehnički SEO (uključujući performanse Next.js stacka) sa kampanjama i CRO — merljivo, iterativno.",
    bullets: [
      "Tehnički i on-page SEO, analiza konkurencije",
      "Google Ads, Meta Ads, conversion tracking, remarketing",
      "Core Web Vitals, CRO, A/B testiranje",
    ],
    slug: "seo-digitalni-marketing",
    href: "/our-services/seo-digitalni-marketing",
    cta: "Detalji usluge",
  },
  {
    title: "Cyber security i GDPR",
    summary:
      "Pomažemo da sajt, forme i skladištenje podataka prate razuman nivo bezbednosti i očekivanja oko privatnosti (GDPR, pristanak, backup).",
    bullets: [
      "Security audit, GDPR setup, cookie consent",
      "Backup, disaster recovery, monitoring",
      "Enkripcija podataka",
    ],
    slug: "cyber-security-gdpr",
    href: "/our-services/cyber-security-gdpr",
    cta: "Detalji usluge",
  },
  {
    title: "Hosting i infrastruktura",
    summary:
      "Postavljamo i dokumentujemo produkciju: cloud ili custom server, SSL, mail, domen i rezervne kopije — da znate šta gde živi.",
    bullets: [
      "Cloud i custom server deployment",
      "Email server, domen, SSL",
      "Backup i cloud storage",
    ],
    slug: "hosting-infrastruktura",
    href: "/our-services/hosting-infrastruktura",
    cta: "Detalji usluge",
  },
  {
    title: "SaaS razvoj",
    summary:
      "Od MVP-a do proizvoda sa pretplatom: Adspire gradi autentikaciju, naplatu, admin i korisnički deo kao jednu celinu.",
    bullets: [
      "Booking, CRM, subscription i white-label SaaS",
      "Industrijski SaaS sistemi",
      "Monetizacija digitalnog proizvoda za klijenta",
    ],
    slug: "saas-razvoj",
    href: "/our-services/saas-razvoj",
    cta: "Detalji usluge",
  },
  {
    title: "Industrijska rešenja",
    summary:
      "Vertikalni softver za klinike, teretane, restorane, građevinu, advokate i druge niše — zakazivanje, katalozi i operativa u jednom sistemu.",
    bullets: [
      "Klinike, teretane, restorani, građevina, fabrike",
      "Advokati, auto saloni, agencije, nekretnine",
      "Prilagođeni tokovi zakazivanja, kataloga i operativa",
    ],
    slug: "industrijska-resenja",
    href: "/our-services/industrijska-resenja",
    cta: "Detalji usluge",
  },
  {
    title: "Interaktivne web tehnologije",
    summary:
      "3D, virtual showroom i 360° kada brend treba iskustvo, ne samo statičnu stranicu — uz pažnju na performanse i mobilni prikaz.",
    bullets: [
      "3D web prezentacije, virtual showroom",
      "360° prikaz proizvoda",
      "Interaktivne prezentacije i napredne animacije",
    ],
    slug: "interaktivne-web-tehnologije",
    href: "/our-services/interaktivne-web-tehnologije",
    cta: "Detalji usluge",
  },
];

const projects: ProjectItem[] = [
  {
    name: "tamitrade.com",
    category: "Korporativni sajt",
    image: "/images/portfolio/one.png",
    url: "https://tamitrade.com",
    summary:
      "Korporativna prezentacija sa jasnim prodajnim tokom i uredjenim sadrzajnim slojem za B2B publiku.",
    outcome: "Jasnije predstavljanje ponude i stabilniji inbound upiti.",
  },
  {
    name: "prevozkop.rs",
    category: "Booking + servis",
    image: "/images/portfolio/two.png",
    url: "https://prevozkop.rs",
    summary:
      "Sistem za rezervacije i operativni tok koji smanjuje rucnu koordinaciju i ubrzava obradu zahteva.",
    outcome: "Manje administracije i brzi put od upita do potvrde.",
  },
  {
    name: "aircoolplus.rs",
    category: "Lead generation",
    image: "/images/portfolio/three.png",
    url: "https://aircoolplus.rs",
    summary:
      "Servisni i prodajni sajt optimizovan za lokalnu traznju, upite i jednostavno odrzavanje.",
    outcome: "Vise relevantnih leadova iz organskog i placenog saobracaja.",
  },
  {
    name: "infinity-gym.rs",
    category: "Brand sajt",
    image: "/images/portfolio/four.png",
    url: "https://infinity-gym.rs",
    summary:
      "Vizuelno jaci nastup za lokalni brend uz jasnije sekcije, bolji ritam stranice i CTA tok.",
    outcome: "Jacanje brenda i bolja konverzija sa mobilnih uredjaja.",
  },
  {
    name: "autodelic.com",
    category: "Katalog proizvoda",
    image: "/images/portfolio/five.png",
    url: "https://autodelic.com",
    summary:
      "Pregledan katalog sa fokusom na navigaciju, organizaciju ponude i tehnicku odrzivost.",
    outcome: "Brze snalazenje kroz proizvode i manje frikcije u prodajnom toku.",
  },
  {
    name: "mlgroup.rs",
    category: "Poslovna platforma",
    image: "/images/portfolio/six.png",
    url: "https://mlgroup.rs",
    summary:
      "Slozeniji poslovni nastup sa jasnijim informacijama, strukturisanim sekcijama i modernijim sistemom.",
    outcome: "Ozbiljniji digitalni nastup i lakse predstavljanje usluga i referenci.",
  },
];

const blogPosts = [
  {
    slug: "web-sistemi-spremni-za-rast",
    title: "Kako gradimo web sisteme spremne za kampanje i rast",
    excerpt:
      "Proces koji povezuje strategiju, dizajn, development i merenje da sajt ne ostane samo lep nego i upotrebljiv u prodaji.",
    category: "Strategija i development",
    date: "03.04.2026",
    image: "/images/blog/one.png",
    href: "/blog-single",
  },
  {
    slug: "booking-sistemi-bez-haosa",
    title: "Booking sistemi koji smanjuju haos u operativi",
    excerpt:
      "Kako prelazak sa poziva i poruka na centralni kalendar menja dnevni rad usluznih biznisa.",
    category: "Booking sistemi",
    date: "28.03.2026",
    image: "/images/blog/two.png",
    href: "/blog-single",
  },
  {
    slug: "seo-i-performanse-u-prvom-sprintu",
    title: "Zasto SEO i performanse postavljamo vec u prvom sprintu",
    excerpt:
      "Tehnicka osnova ne ide na kraj projekta kada nema vremena, nego na pocetak kada najvise vredi.",
    category: "SEO i performance",
    date: "21.03.2026",
    image: "/images/blog/three.png",
    href: "/blog-single",
  },
  {
    slug: "sta-znaci-dobar-agency-stack",
    title: "Sta za nas znaci dobar agency stack",
    excerpt:
      "Spoj procesa, alata i odgovornosti koji omogucava da dizajn, development i growth rade kao jedan tim.",
    category: "Agency sistem",
    date: "13.03.2026",
    image: "/images/blog/four.png",
    href: "/blog-single",
  },
];

export const srContent: LocalizedPageContent = {
  localeLabel: "SR",
  siteTitle: "Adspire Digital",
  siteDescription:
    "Adspire Digital iz Niša — web platforme, e-commerce, PWA i native aplikacije, poslovni sistemi, AI automatizacija, SaaS i hosting. Kontakt: djordje@adspire.rs, +381 60 149 149 1.",
  nav: [
    { label: "Pocetna", href: "/" },
    { label: "O nama", href: "/about-us" },
    { label: "Usluge", href: "/our-services" },
    { label: "Projekti", href: "/our-projects" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/contact-us" },
  ],
  headerCta: {
    label: "Pokreni projekat",
    href: "/contact-us",
  },
  home: {
    heroStack: {
      intro: {
        eyebrow: "Agency mix / Hero 01",
        title: "Web sistemi koji rastu sa biznisom",
        description:
          "Adspire Digital iz Niša dizajnira, razvija i optimizuje sajtove, aplikacije i prodajne tokove koji pretvaraju saobraćaj u upite, rezervacije i prihod.",
        badges: ["Next.js", "SEO", "Booking sistemi", "Automatizacija"],
        primary: {
          label: "Pokreni projekat",
          href: "/contact-us",
        },
        secondary: {
          label: "Pogledaj projekte",
          href: "/our-projects",
        },
        gallery: [
          {
            image: "/images/portfolio/one.png",
            alt: "Adspire projekat jedan",
            href: "/our-projects",
          },
          {
            image: "/images/portfolio/two.png",
            alt: "Adspire projekat dva",
            href: "/project-single",
          },
          {
            image: "/images/portfolio/three.png",
            alt: "Adspire projekat tri",
            href: "/our-projects",
          },
          {
            image: "/images/portfolio/four.png",
            alt: "Adspire projekat cetiri",
            href: "/our-projects",
          },
        ],
      },
      capability: {
        eyebrow: "Agency mix / Hero 02",
        title: "Jedan proizvodni tok za dizajn, razvoj i rast",
        description:
          "Kod nas strategija, UI/UX, development, SEO i automatizacija rade kao jedan sistem — bez prebacivanja odgovornosti između timova i bez uskih grla kada projekat krene da raste.",
        tags: ["Strategija", "UI/UX", "Development", "SEO", "Analytics", "CRO"],
        stats: [
          { value: "3 sloja", label: "Strategija, proizvod i growth u istom toku" },
          { value: "MVP +", label: "Mogucnost da krenemo brzo pa sirimo sistem" },
          { value: "Jedan tim", label: "Jasan scope, roadmap i podrska posle go-live" },
        ],
        primary: {
          label: "Nas proces",
          href: "/about-us",
        },
        secondary: {
          label: "Sve usluge",
          href: "/our-services",
        },
        video: "/azurio/video/1280x720.mp4",
        poster: "/images/banner/video-bg.png",
      },
      showcase: {
        eyebrow: "Agency mix / Hero 03",
        title: "Partner za ozbiljne web isporuke",
        description:
          "Adspire ulazi od discovery faze do produkcije, sa jasnim opsegom, realnim roadmap-om i fokusom na rezultat posle lansiranja. Ispod su konkretni primeri radova.",
        primary: {
          label: "Odabrani projekti",
          href: "/our-projects",
        },
        secondary: {
          label: "Kontaktiraj nas",
          href: "/contact-us",
        },
        slides: [
          {
            title: "PrevozKop",
            description: "Booking tok, servisna organizacija i digitalni upiti u jednom sistemu.",
            image: "/images/portfolio/two.png",
            href: "/project-single",
          },
          {
            title: "Tami Trade",
            description: "Korporativna prezentacija sa jasnijim prodajnim i sadrzajnim tokom.",
            image: "/images/portfolio/one.png",
            href: "/our-projects",
          },
          {
            title: "Infinity Gym",
            description: "Brend sajt koji spaja jaci vizuelni identitet i bolji CTA ritam.",
            image: "/images/portfolio/four.png",
            href: "/our-projects",
          },
        ],
      },
    },
    servicesSection: {
      eyebrow: "Usluge",
      title: "Kompletan spektar digitalnih i tehnoloških rešenja",
      description:
        "Od web prezentacija i e-commercea, preko PWA i native aplikacija, do internih sistema, AI automatizacije, SaaS-a i infrastrukture — sve na jednom mestu.",
      items: services.slice(0, 6),
    },
    projectsSection: {
      eyebrow: "Selected work",
      title: "Projekti u kojima dizajn, performanse i cilj rade zajedno",
      description:
        "Biramo radove koji pokazuju kako proizvodni i growth deo mogu da funkcionisu kao jedna celina.",
      items: projects,
    },
    testimonialsSection: {
      eyebrow: "Testimonials",
      title: "Sta timovi kazu posle lansiranja",
      description:
        "Najvaznije nam je da se posle go-live oseti manje haosa, vise jasnoce i bolja kontrola nad upitima i prodajom.",
      items: [
        {
          name: "Milan R.",
          role: "Osnivac",
          company: "B2B firma",
          quote:
            "Novi sajt i kampanje su povecali broj upita i doneli jasniji prodajni proces.",
        },
        {
          name: "Jelena P.",
          role: "Marketing menadzer",
          company: "Lokalni brend",
          quote: "Brz tim, jasna komunikacija i fokus na rezultat.",
        },
        {
          name: "Nikola S.",
          role: "Vlasnik biznisa",
          company: "Usluzni biznis",
          quote: "Booking automatizacija je smanjila haos i ubrzala zakazivanje.",
        },
      ],
    },
    faqSection: {
      eyebrow: "FAQ",
      title: "Brzi odgovori o procesu, rokovima i podrsci",
      description:
        "Na home-u ostavljamo najbitnija pitanja, a kompletnu FAQ stranicu vodimo kao posebnu rutu.",
      items: [
        {
          q: "Koliko traje isporuka?",
          a: "Manji sajtovi se rade brzo, a veci sistemi prolaze kroz jasno definisane faze sa prioritetima i sprintovima.",
        },
        {
          q: "Da li radite odrzavanje nakon lansiranja?",
          a: "Da. Podrska, azuriranja i iterativna optimizacija su deo redovne isporuke kada projekat to zahteva.",
        },
        {
          q: "Mozemo li krenuti sa manjim budzetom?",
          a: "Da. Definisemo MVP i sirimo sistem po prioritetima kako bi ulaganje pratilo rast projekta.",
        },
      ],
    },
    ctaSection: {
      kicker: "Krenimo",
      title: "Spreman si da ideju pretvorimo u sistem koji raste?",
      body: "Mozemo krenuti discovery pozivom i jasnim planom implementacije.",
      primary: {
        label: "Pokreni projekat",
        href: "/contact-us",
      },
      secondary: {
        label: "Pogledaj projekte",
        href: "/our-projects",
      },
    },
  },
  aboutPage: {
    hero: {
      eyebrow: "O nama",
      title: "Adspire Digital — razvojni i tehnološki partner",
      description:
        "Specijalizovani smo za moderne web platforme, mobilne aplikacije, poslovne sisteme i AI automatizaciju. Gradimo skalabilna, brza i dugoročno održiva rešenja za digitalizaciju i rast na domaćem i internacionalnom tržištu.",
      primary: {
        label: "Zakazi razgovor",
        href: "/contact-us",
      },
      secondary: {
        label: "Pogledaj usluge",
        href: "/our-services",
      },
    },
    manifesto:
      "Radimo kao white-label development partner, tehnički partner za agencije, podugovarač na kompleksnim projektima, dugoročni maintenance partner i SaaS razvojni tim.",
    storyTitle: "Kako saradjujemo",
    storyParagraphs: [
      "Svaki projekat počinje jasnim poslovnim ciljem i kontekstom. Mapiramo tok korisnika, ograničenja budžeta i rokova, pa gradimo roadmap koji donosi vrednost što pre.",
      "Ne isporučujemo samo „sajt“ — gradimo deo prodajnog, operativnog ili produktnog sistema. SEO, analitika, bezbednost i mogućnost širenja su deo osnovne arhitekture, ne naknadni dodatak.",
      "Dugoročno ostajemo uz klijenta kroz održavanje, nadogradnje i automatizaciju — tako digitalni proizvod ostaje stabilan dok biznis raste.",
    ],
    metrics: [
      { value: "Partnerstvo", label: "White-label, agencijski partner, podugovarač ili SaaS tim — po potrebi" },
      { value: "Isporuka", label: "Web, mobilno, interni sistemi, AI i infrastruktura u jednom toku" },
      { value: "Rast", label: "SEO, marketing, BI i automatizacija za merljiv napredak posle lansiranja" },
    ],
    team: {
      title: "Vodeci fokus",
      subtitle: "Strategija, prodaja i rast",
      leadName: "Djordje",
      leadRole: "Strategija, prodaja i rast",
      leadBio:
        "Vodi komunikaciju sa klijentima, definisanje obima i prioriteta, kao i usklađivanje development i growth aktivnosti oko merljivog ishoda.",
      bullets: [
        "Discovery radionice i KPI uskladjivanje",
        "Scope, funnel i planiranje konverzija",
        "Roadmap, lansiranje i optimizacija posle go-live",
      ],
    },
    cta: {
      kicker: "Sledeci korak",
      title: "Ako vec imas ideju, mozemo odmah da je prevedemo u realan plan.",
      body: "Krecemo od cilja, konteksta i prioriteta, pa tek onda od dizajna.",
      primary: {
        label: "Javi se",
        href: "/contact-us",
      },
      secondary: {
        label: "Pogledaj projekte",
        href: "/our-projects",
      },
    },
  },
  servicesPage: {
    hero: {
      eyebrow: "Usluge",
      title: "Adspire Digital — šta radimo i kako to isporučujemo",
      description:
        "Iz Niša pokrivamo ceo spektar: web prezentacije i e-commerce, PWA i native mobilne aplikacije, CMS i interne poslovne sisteme, AI i automatizaciju, BI, SEO, bezbednost, hosting, SaaS i industrijska rešenja. Svaka usluga ima svoju stranicu sa detaljima.",
      primary: {
        label: "Kontakt",
        href: "/contact-us",
      },
      secondary: {
        label: "Projekti",
        href: "/our-projects",
      },
    },
    introTitle: "Jedan partner za ceo digitalni proizvod",
    introBody:
      "Adspire može preuzeti ceo životni ciklus — od ideje i arhitekture, preko dizajna i razvoja, do deploy-a, održavanja i automatizacije. Biramo obim prema vašim prioritetima i budžetu; kontakt: djordje@adspire.rs.",
    process: [
      "Definisemo poslovni cilj, scope i merilo uspeha.",
      "Mapiramo korisnicki tok, CTA logiku i prioritete.",
      "Isporcujemo build koji je spreman za SEO, analitiku i dalji rast.",
    ],
    items: services,
    cta: {
      kicker: "Usluge + cilj",
      title: "Treba ti kombinacija vise usluga, a ne izolovan task?",
      body: "Mozemo sloziti faze i obim tako da budzet i rok prate realne prioritete.",
      primary: {
        label: "Pokreni razgovor",
        href: "/contact-us",
      },
    },
  },
  projectsPage: {
    hero: {
      eyebrow: "Projects",
      title: "Odabrani projekti i proizvodni tokovi koji su zavrsili u realnoj upotrebi",
      description:
        "Ovde nisu samo lepi ekrani. Fokus je na tome kako je sajt ili sistem pomogao prodaji, rezervacijama ili jasnijem nastupu.",
      primary: {
        label: "Kontakt",
        href: "/contact-us",
      },
      secondary: {
        label: "Detalj projekta",
        href: "/project-single",
      },
    },
    introTitle: "Sta gledamo kod projekta",
    introBody:
      "Dobar projekat za nas ima dobar ritam stranice, jasne CTA tacke, zdrave performanse i sistem koji klijent moze da koristi bez dodatnog haosa.",
    items: projects,
    cta: {
      kicker: "Imas slican izazov?",
      title: "Mozemo pogledati sta od ovoga ima najvise smisla za tvoj biznis.",
      body: "Ne kopiramo sablone, nego zadrzavamo ono sto radi i prevodimo ga na tvoj kontekst.",
      primary: {
        label: "Kontaktiraj nas",
        href: "/contact-us",
      },
    },
  },
  projectPage: {
    hero: {
      eyebrow: "Project detail",
      title: "Pregled procesa, isporuke i poslovnog efekta",
      description:
        "Produkcioni primer fokusiran na UX za konverziju, brzu implementaciju i dugorocnu odrzivost unutar realnog poslovnog okruzenja.",
      primary: {
        label: "Live projekat",
        href: "https://prevozkop.rs",
      },
      secondary: {
        label: "Svi projekti",
        href: "/our-projects",
      },
    },
    client: "PrevozKop",
    website: "https://prevozkop.rs",
    overview:
      "Case pregled booking sistema i servisnog sajta koji je povezao digitalne upite, pregled usluga i operativnu organizaciju tima.",
    challenge:
      "Glavni izazov bio je da se korisnicima skrati put od informisanja do slanja zahteva, a da se interni tim ne zatrpa dodatnim rucnim koracima.",
    solution:
      "Napravljen je jasan informativni sloj, fokusiran booking tok i struktura koja podrzava buduce dogradnje bez loma sistema.",
    outcomes: [
      "Jasniji funnel od prve posete do konkretnog upita",
      "Manje rucne koordinacije oko rezervacija",
      "Stabilnija osnova za SEO i buduce growth aktivnosti",
    ],
    services: [
      "Discovery i scope definicija",
      "UX i struktura stranica",
      "Next.js development i integracije",
      "SEO osnova i analitika",
    ],
    metrics: [
      { value: "1 sistem", label: "Sajt i booking tok rade zajedno" },
      { value: "Brze izmene", label: "Sadrzaj i sekcije su lakse za odrzavanje" },
      { value: "Growth-ready", label: "Osnova spremna za dalje kampanje i optimizaciju" },
    ],
    testimonial: {
      name: "Nikola S.",
      role: "Vlasnik biznisa",
      company: "PrevozKop",
      quote: "Booking automatizacija je smanjila haos i ubrzala zakazivanje.",
    },
    gallery: [
      "/images/booking/booking-form.png",
      "/images/booking/booking-admin-calendar.png",
      "/images/booking/booking-my-appointments.png",
    ],
    liveLabel: "Pogledaj live projekat",
  },
  contactPage: {
    hero: {
      eyebrow: "Contact",
      title: "Posalji cilj i rok, vracamo konkretan sledeci korak",
      description:
        "Najbrze napredujemo kada znamo sta pokusavas da postignes, koji je kontekst projekta i sta je trenutno najvece usko grlo.",
    },
    introTitle: "Kako da nam pises",
    introBody:
      "Nije potreban savrsen brief. Dovoljno je da napises cilj, rok i sta ti trenutno deluje kao problem. Od toga pravimo realan sledeci korak.",
    phone: "+381 60 149 149 1",
    email: "djordje@adspire.rs",
    address: "Dimitrija Leka 66, Nis",
    officeHours: ["Ponedeljak - petak", "09:00 - 17:00", "Odgovaramo i van termina kada je projekat hitan"],
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
  faqPage: {
    hero: {
      eyebrow: "FAQ",
      title: "Najcesca pitanja o procesu, rokovima i saradnji",
      description:
        "Najveci deo neizvesnosti nestaje kada su scope, prioriteti i naredni koraci jasno postavljeni od pocetka.",
      primary: {
        label: "Kontakt",
        href: "/contact-us",
      },
    },
    introTitle: "Ono sto klijenti najcesce pitaju",
    introBody:
      "Ako tvoj slucaj nije pokriven ovde, dovoljno je da posaljes poruku i vracamo konkretan odgovor, ne genericki pitch.",
    items: [
      {
        q: "Koliko traje isporuka sajta ili sistema?",
        a: "Zavisi od obima. Manji sajt moze ici brzo, dok veci sistemi prolaze kroz discovery, dizajn, development i optimizaciju. Na pocetku dobijas jasan raspored faza.",
      },
      {
        q: "Da li radite samo development ili i strategiju?",
        a: "Radimo i jedno i drugo. Nekad ulazimo samo kao development partner, a nekad od positioning i UX faze pa sve do growth postavke.",
      },
      {
        q: "Mozemo li krenuti bez kompletnog budzeta za sve faze?",
        a: "Da. Cesto definisemo MVP, lansiramo ono sto najvise vredi sada i onda sirimo sistem po prioritetima.",
      },
      {
        q: "Sta se desava posle lansiranja?",
        a: "Po potrebi ostajemo na odrzavanju, analitici, SEO radu i iterativnoj optimizaciji. Ideja je da sistem ostane upotrebljiv i stabilan.",
      },
      {
        q: "Da li mozete da preuzmete postojeci sajt i unapredite ga?",
        a: "Da. Ako postoji dobra osnova, ne rusimo sve bez razloga. Prvo utvrdimo sta vredi zadrzati, a sta treba presloziti.",
      },
    ],
    cta: {
      kicker: "Nema tvog pitanja?",
      title: "Posalji kontekst projekta i vracamo konkretan odgovor.",
      body: "To je najbrzi nacin da procenimo sledeci korak i realan obim posla.",
      primary: {
        label: "Javi se",
        href: "/contact-us",
      },
    },
  },
  blogPage: {
    hero: {
      eyebrow: "Blog",
      title: "Zapisi o sistemima, growth logici i web isporuci",
      description:
        "Blog nije home obavezni blok u V1, ali ostaje posebna stranica za teme koje objasnjavaju kako radimo i zasto neke odluke donosimo rano.",
    },
    featured: blogPosts[0],
    posts: blogPosts,
    cta: {
      kicker: "Hoces ovo u praksi?",
      title: "Ako ti je blizi konkretan projekat nego teorija, mozemo odmah da predjemo na tvoj slucaj.",
      body: "Pisemo kada treba objasniti pristup, ali najveci deo vrednosti pravimo kroz implementaciju.",
      primary: {
        label: "Pokreni razgovor",
        href: "/contact-us",
      },
    },
  },
  articlePage: {
    hero: {
      eyebrow: "Blog single",
      title: "Kako gradimo web sisteme spremne za kampanje i rast",
      description:
        "Proces koji povezuje strategiju, dizajn, development i merenje. Ne radimo sajt da bi stajao, nego da bi izdrzao realnu upotrebu i dalji rast.",
      secondary: {
        label: "Nazad na blog",
        href: "/blog",
      },
    },
    post: blogPosts[0],
    intro:
      "Svaki projekat pocinje merljivim poslovnim ciljem. Zatim mapiramo korisnicki tok, definisemo ogranicenja i gradimo sprintove oko onoga sto najbrze pomera upite, rezervacije ili prodaju.",
    sections: [
      {
        title: "Od briefa do prvog prioriteta",
        paragraphs: [
          "Prvi korak nije dizajn ekrana nego razumevanje gde se trenutno gubi energija i novac. Nekad je to spor sajt, nekad slab CTA, a nekad potpuni manjak operativnog toka posle forme.",
          "Kada to znamo, lakse odlucujemo sta ide u MVP, sta ide u sledecu fazu i sta nema smisla raditi prerano.",
        ],
      },
      {
        title: "Dizajn i development kao jedan sprint",
        paragraphs: [
          "Najveca greska je kada se UX, copy, development i SEO razdvoje toliko da projekat stalno ceka sledeci tim. Mi to spajamo u jedan proizvodni tok.",
          "To znaci da se struktura, CTA logika, performanse i tehnicki temelji dogovaraju dok se stranica oblikuje, a ne kad sve vec ode predaleko.",
        ],
      },
      {
        title: "Sta ostaje posle go-live",
        paragraphs: [
          "Lansiranje je samo sredina posla. Posle njega dolaze podaci, iteracije i odluke koje prave razliku izmedju lepog sajta i korisnog sistema.",
          "Zato rano postavljamo analitiku, conversion tracking i okvir za naredna poboljsanja.",
        ],
      },
    ],
    principles: [
      "Mobile-first interfejs i jasan funnel",
      "Performanse, schema i SEO osnova u prvom sprintu",
      "Strukturisana analitika i conversion tracking od prvog dana",
    ],
    cta: {
      kicker: "Sledece citanje nije obavezno",
      title: "Ako zelis, mozemo odmah da pogledamo tvoj konkretan projekat.",
      body: "Najkorisniji sledeci korak je obicno kratak razgovor i pregled prioriteta.",
      primary: {
        label: "Kontaktiraj nas",
        href: "/contact-us",
      },
      secondary: {
        label: "Vidi projekte",
        href: "/our-projects",
      },
    },
  },
  footer: {
    tagline:
      "Adspire Digital pruža kompletna digitalna rešenja od weba i mobilnih aplikacija do AI automatizacije i SaaS razvoja.",
    cta: {
      label: "Kontaktiraj nas",
      href: "/contact-us",
    },
    copyright: "Sva prava zadrzana.",
    contactItems: [
      {
        label: "Email",
        value: "djordje@adspire.rs",
        href: "mailto:djordje@adspire.rs",
      },
      {
        label: "Telefon",
        value: "+381 60 149 149 1",
        href: "tel:+381601491491",
      },
      {
        label: "Lokacija",
        value: "Dimitrija Leka 66, Nis",
      },
    ],
  },
};
