/**
 * Commercial-intent landing page for the "koliko košta / cena izrade sajta"
 * query family — the highest-volume buying query in the market and the one
 * Adspire currently ranks nowhere for.
 *
 * It honours the no-public-pricelist rule by shipping ranges plus the drivers
 * behind them instead of a per-package price. A range is what the query and the
 * SERP need; a fixed pricelist is what locks us into a comparison with the 147€
 * tier. Every path out of this page ends at /upit, where the real number is
 * scoped.
 *
 * ⚠ RANGES NEED ĐORĐE'S SIGN-OFF. They are written for a custom Next.js studio,
 * not for the template tier, but they are estimates — correct them here and the
 * page, its JSON-LD and the FAQ all follow.
 */
export const pricingGuidePage = {
  path: "/cena-izrade-sajta",
  title: "Koliko košta izrada sajta — cene, rasponi i šta ih određuje",
  metaDescription:
    "Koliko realno košta izrada sajta, web shopa, sistema za zakazivanje ili interne aplikacije u 2026. Rasponi po tipu projekta, šta diže i šta spušta cenu, i zašto ponuda uvek ide po obimu posla.",
  h1: "Koliko košta izrada sajta?",
  lead:
    "Pošten odgovor je: zavisi od obima, a ne od broja stranica. Ali „zavisi“ nikome ne pomaže, pa je ovde raspisano šta konkretno određuje cenu, u kojim rasponima se projekti realno završavaju i gde tačno cena skače. Ako vam treba tačan broj za vaš slučaj, opis posla kroz upit se vraća kao ponuda.",

  rangesHeading: "Rasponi po tipu projekta",
  rangesIntro:
    "Rasponi važe za custom razvoj (Next.js / React), sa dizajnom, responzivnošću, SEO osnovama i puštanjem u produkciju. Ne odnose se na gotove šablone i ne uključuju reklamni budžet.",
  ranges: [
    {
      label: "Prezentacioni sajt",
      price: "1.200 – 3.000 €",
      note: "5–10 strana, custom dizajn, CMS za izmene teksta, kontakt forma, SEO osnove.",
      href: "/our-services/web-prezentacije",
    },
    {
      label: "Web shop / e-commerce",
      price: "3.000 – 8.000 €",
      note: "Katalog, korpa, plaćanje, admin za porudžbine i zalihe. Integracije sa kurirskom službom i knjigovodstvom podižu gornju granicu.",
      href: "/our-services/e-commerce-web-shop",
    },
    {
      label: "Sistem za zakazivanje",
      price: "2.500 – 6.000 €",
      note: "Termini, kalendar, podsetnici, više lokacija ili više zaposlenih. Cena raste sa pravilima zakazivanja, ne sa dizajnom.",
      href: "/our-services/sistemi-za-zakazivanje",
    },
    {
      label: "Interna poslovna aplikacija",
      price: "4.000 – 15.000 €",
      note: "CRM, operativa, ponude i fakture, uloge i dozvole. Najširi raspon jer zavisi od broja procesa koje zamenjuje.",
      href: "/our-services/interne-poslovne-aplikacije",
    },
    {
      label: "AI automatizacija",
      price: "800 – 4.000 €",
      note: "n8n tokovi, LLM integracije, automatski odgovori i obrada dokumenata. Često se radi kao dogradnja na postojeći sistem.",
      href: "/our-services/ai-integracije-automatizacija",
    },
    {
      label: "SaaS proizvod (MVP)",
      price: "8.000 – 25.000 €",
      note: "Višekorisnička platforma, pretplate, naplata, admin. Radi se fazno — prvi cilj je proizvod koji može da naplati.",
      href: "/our-services/saas-razvoj",
    },
    {
      label: "Održavanje, mesečno",
      price: "80 – 300 € / mesec",
      note: "Ažuriranja, bezbednost, rezervne kopije, sitne izmene i praćenje. Opciono, ali preporučeno za sisteme u produkciji.",
      href: "/our-services/hosting-infrastruktura",
    },
  ],

  upHeading: "Šta diže cenu",
  upDrivers: [
    "Integracije sa tuđim sistemima — knjigovodstvo, ERP, kuriri, platni promet. Svaka integracija je poseban posao i poseban rizik.",
    "Uloge i dozvole. Sajt na kome svi vide sve je jedan posao; sistem u kome vlasnik, zaposleni i klijent vide tri različite stvari je drugi.",
    "Migracija postojećih podataka. Prenošenje 8.000 proizvoda iz starog sistema ume da košta više od samog izgleda sajta.",
    "Višejezičnost. Nije prevod teksta — to su URL-ovi, SEO signali i sadržaj koji neko mora da održava na svakom jeziku.",
    "Nedefinisan obim. Kada se tokom rada dodaje „samo još ovo“, cena raste kod svakog izvođača, bez izuzetka.",
  ],

  downHeading: "Šta spušta cenu",
  downDrivers: [
    "Spreman sadržaj — tekstovi, fotografije, cenovnik, podaci o firmi. Čekanje na sadržaj je najčešći razlog kašnjenja.",
    "Jasan prioritet. Ako znate koja jedna stvar mora da radi u prvoj verziji, ostalo ide u drugu fazu i ne plaća se odmah.",
    "Faze umesto svega odjednom. Prvo ono što donosi upite, pa nadogradnja iz prihoda koji je sistem doneo.",
    "Postojeći brend. Ako logo, boje i ton već postoje, dizajn deo se skraćuje.",
  ],

  whyHeading: "Zašto nema fiksnog cenovnika",
  whyBody:
    "Zato što ista rečenica znači različit posao. „Treba mi sajt za salon“ može da bude prezentacija od pet strana ili sistem za zakazivanje sa smenama, podsetnicima i tri lokacije — razlika u ceni je nekoliko puta. Paket-cena taj problem ne rešava, samo ga premešta: ili plaćate ono što vam ne treba, ili se posle potpisa ispostavi da ono što vam treba nije uključeno. Zato ponuda ide po opisu posla, i u njoj piše šta jeste i šta nije uključeno.",

  includedHeading: "Šta je uključeno u svaku ponudu",
  included: [
    "Vlasništvo nad kodom i podacima — sistem je vaš, bez zaključavanja kod izvođača.",
    "Responzivnost i brzina učitavanja kao uslov isporuke, ne kao doplata.",
    "SEO osnove: struktura, meta podaci, sitemap, strukturisani podaci.",
    "Analitika, da se posle vidi šta radi a šta ne.",
    "Obuka za korišćenje admin dela i predaja pristupa.",
  ],

  faqHeading: "Česta pitanja o ceni",
  faq: [
    {
      q: "Koliko košta izrada sajta u Srbiji?",
      a: "Za custom razvoj, prezentacioni sajt se realno kreće u rasponu 1.200–3.000 €, web shop 3.000–8.000 €, a interne poslovne aplikacije 4.000–15.000 €. Ponude ispod 300 € po pravilu znače gotov šablon sa zamenjenim tekstom, što je legitiman izbor za neke slučajeve, ali nije isti proizvod.",
    },
    {
      q: "Zašto se cene toliko razlikuju između ponuđača?",
      a: "Zato što se pod istim imenom prodaju različite stvari: gotova tema sa izmenjenim tekstom, sklapanje kroz page builder, i custom razvoj. Razlika se ne vidi na dan isporuke — vidi se kada zatreba izmena, integracija ili kada sajt treba da izdrži kampanju.",
    },
    {
      q: "Da li se plaća odjednom?",
      a: "Ne. Uobičajeno je plaćanje u fazama vezanim za isporuke — avans na početku, ostatak po fazama. Za veće sisteme se radi mesečna dinamika.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Prezentacioni sajt obično 2–4 nedelje, web shop 4–8 nedelja, interna aplikacija 6 nedelja i naviše. Najčešći razlog produženja nije razvoj nego čekanje na sadržaj i povratne informacije.",
    },
    {
      q: "Da li postoje troškovi posle isporuke?",
      a: "Da — domen i hosting, i opciono održavanje. Domen i hosting su reda veličine nekoliko desetina evra godišnje za manje sajtove; održavanje je 80–300 € mesečno i pokriva ažuriranja, bezbednost, rezervne kopije i sitne izmene.",
    },
    {
      q: "Kako da dobijem tačnu cenu za svoj projekat?",
      a: "Kroz kratak upit na adspire.rs/upit — opišete šta treba da radi i za koga, i dobijate ponudu sa obimom i cenom. Nalog nije obavezan.",
    },
  ],

  cta: { label: "Pošalji opis posla i dobij ponudu", href: "/upit" },
  secondaryCta: { label: "Pogledaj usluge", href: "/our-services" },

  // This page is footer-linked from everywhere, so it is also the entry point
  // that keeps the guides two clicks from any page instead of orphaned.
  relatedHeading: "Ako još biraš šta ti treba",
  related: [
    {
      label: "WordPress ili custom sajt — kada se koji isplati",
      href: "/wordpress-ili-custom-sajt",
    },
    {
      label: "Online zakazivanje za salone i klinike",
      href: "/online-zakazivanje-za-salone-i-klinike",
    },
    {
      label: "Kako izabrati agenciju za izradu sajta",
      href: "/kako-izabrati-web-agenciju",
    },
    {
      label: "Sajt ne donosi upite — gde tačno pada",
      href: "/sajt-ne-donosi-upite",
    },
    {
      label: "Svi vodiči",
      href: "/vodici",
    },
  ],
} as const;
