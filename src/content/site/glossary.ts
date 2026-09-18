/**
 * Rečnik pojmova — definicije koje kupac sretne u ponudi, a niko mu ih ne objasni.
 *
 * ZAŠTO POSTOJI. Definicija je oblik teksta koji asistent najradije citira: kratka,
 * samostalna i proverljiva. Strana usluge odgovara na „ko ovo radi"; rečnik odgovara
 * na „šta je ovo uopšte", a to je pitanje koje dolazi pre njega. Svaki pojam je vezan
 * za uslugu koja ga rešava, pa definicija ne visi u vazduhu nego vodi negde.
 *
 * PRAVILA. Definicija mora da stoji sama, bez ostatka strane — tako je asistent uzima.
 * Bez marketinga u definiciji: pojam se objašnjava pošteno, uključujući i kad naše
 * rešenje nije pravi izbor. Rečnik koji hvali sve što opisuje niko ne citira dvaput.
 */

export type GlossaryTerm = {
  /** Slug za #fragment i za @id u DefinedTerm čvoru. */
  id: string;
  term: string;
  /** Druga imena pod kojima se isti pojam traži. */
  aliases?: string[];
  /** Samostalna definicija — prva rečenica mora da odgovori sama. */
  definition: string;
  /** Zašto je bitno vlasniku firme, ne programeru. */
  matters?: string;
  /** Usluga koja se time bavi. Proverava se testom da ruta postoji. */
  service?: { label: string; href: string };
};

export type GlossaryGroup = {
  heading: string;
  terms: GlossaryTerm[];
};

export const glossaryPage = {
  path: "/recnik",
  eyebrow: "Rečnik",
  title: "Rečnik pojmova — šta zaista znače reči iz IT ponude",
  metaDescription:
    "Objašnjenja pojmova iz web i softverskih ponuda: statični sajt, headless CMS, Core Web Vitals, API, SaaS, MVP, rezervacioni sistem, schema, llms.txt i ostalo.",
  h1: "Rečnik pojmova",
  lead:
    "Ponude su pune reči koje niko ne objasni, a od kojih zavisi šta tačno plaćate. Ovde je svaka objašnjena u par rečenica, bez ulepšavanja i sa napomenom kada vam ne treba.",
  answer:
    "Rečnik objašnjava pojmove koji se pojavljuju u ponudama za izradu sajta i softvera — statični sajt, headless CMS, Core Web Vitals, API, webhook, SaaS, MVP, rezervacioni sistem, strukturirani podaci i llms.txt — svaki u nekoliko rečenica i sa napomenom šta znači za firmu koja plaća. Sastavio ga je Adspire Digital, IT firma iz Niša, na osnovu pitanja koja se stvarno ponavljaju u razgovoru sa klijentima.",
  keywords: [
    "rečnik IT pojmova",
    "šta je headless CMS",
    "šta je Core Web Vitals",
    "šta je API",
    "šta je statični sajt",
    "objašnjenje pojmova izrada sajta",
  ],
} as const;

export const glossaryGroups: GlossaryGroup[] = [
  {
    heading: "Sajt i kako je napravljen",
    terms: [
      {
        id: "staticni-sajt",
        term: "Statični sajt",
        aliases: ["static site", "statička strana"],
        definition:
          "Sajt čije su strane unapred generisane i serviraju se kao gotovi fajlovi, bez baze i bez admin panela. Sadržaj se menja izmenom fajlova i ponovnim objavljivanjem, a ne kroz ekran za unos.",
        matters:
          "Najbrže se učitava i najjeftinije se održava, ali svaku izmenu teksta radi neko ko ima pristup kodu. Ako sadržaj menjate nekoliko puta godišnje, to je prednost, ne mana.",
        service: { label: "Statični sajtovi", href: "/our-services/staticni-sajtovi" },
      },
      {
        id: "cms",
        term: "CMS",
        aliases: ["sistem za upravljanje sadržajem", "content management system"],
        definition:
          "Administrativni deo sajta kroz koji sami menjate tekst, slike i strane, bez programera. WordPress je najpoznatiji primer, ali CMS može biti i napravljen po meri.",
        matters:
          "Ima smisla kada sadržaj menjate često i sami. Ako se to svede na dve izmene godišnje, plaćate i održavate alat koji ne otvarate.",
        service: { label: "CMS sistemi", href: "/our-services/cms-sistemi" },
      },
      {
        id: "headless-cms",
        term: "Headless CMS",
        definition:
          "CMS koji čuva i isporučuje sadržaj, ali ne određuje kako sajt izgleda. Sadržaj se preuzima preko API-ja, pa isti tekst može da se prikaže na sajtu, u aplikaciji i na ekranu u prodavnici.",
        matters:
          "Vredi kada isti sadržaj ide na više mesta ili kada dizajn ne sme da bude ograničen šablonima CMS-a. Za jedan sajt sa pet strana je nepotrebna složenost.",
        service: { label: "CMS sistemi", href: "/our-services/cms-sistemi" },
      },
      {
        id: "landing-strana",
        term: "Landing strana",
        aliases: ["landing page", "sletna strana"],
        definition:
          "Jedna strana napravljena za jedan cilj, najčešće za saobraćaj sa reklame. Nema meni koji odvlači pažnju i ima jednu jasnu akciju.",
        matters:
          "Reklama koja vodi na početnu gubi ljude jer moraju sami da nađu ono što im je obećano. Landing strana im to daje odmah.",
        service: { label: "Statični sajtovi", href: "/our-services/staticni-sajtovi" },
      },
      {
        id: "core-web-vitals",
        term: "Core Web Vitals",
        definition:
          "Skup Google-ovih mera stvarnog iskustva na sajtu: koliko brzo se pojavi glavni sadržaj, koliko brzo strana reaguje na dodir i koliko se sadržaj pomera dok se učitava.",
        matters:
          "To su brojevi koje Google meri kod stvarnih posetilaca, a ne u testu. Loše ocene se najviše osete na telefonu i na slabijoj mreži, gde je i većina saobraćaja.",
        service: { label: "SEO i digitalni marketing", href: "/our-services/seo-digitalni-marketing" },
      },
      {
        id: "pwa",
        term: "PWA",
        aliases: ["progressive web app", "progresivna web aplikacija"],
        definition:
          "Sajt koji se ponaša kao aplikacija: može da se doda na početni ekran telefona, radi i bez veze za deo sadržaja i šalje obaveštenja.",
        matters:
          "Jeftinije od prave mobilne aplikacije i bez odobravanja u prodavnicama aplikacija. Nema pristup svemu čemu native aplikacija ima, pa izbor zavisi od toga šta treba da radi.",
        service: { label: "Mobilne aplikacije", href: "/our-services/mobilne-aplikacije" },
      },
      {
        id: "hosting-i-domen",
        term: "Hosting i domen",
        definition:
          "Domen je adresa sajta koju zakupljujete godišnje. Hosting je prostor i server sa kojih se sajt isporučuje. To su dve odvojene stavke i mogu da budu kod različitih firmi.",
        matters:
          "Vlasništvo nad domenom je vlasništvo nad adresom. Ako je domen registrovan na agenciju umesto na vas, selidba kasnije zavisi od njihove dobre volje.",
        service: { label: "Hosting i infrastruktura", href: "/our-services/hosting-infrastruktura" },
      },
    ],
  },
  {
    heading: "Sistemi i integracije",
    terms: [
      {
        id: "api",
        term: "API",
        definition:
          "Dogovoren način da dva programa razmene podatke bez čoveka između. Jedan traži podatak ili akciju, drugi odgovara u obliku koji je unapred definisan.",
        matters:
          "Sve integracije se svode na ovo: da li druga strana ima API i šta kroz njega dozvoljava. Ako nema, povezivanje je zaobilazno, sporije i krhkije.",
        service: { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
      },
      {
        id: "webhook",
        term: "Webhook",
        definition:
          "Poruka koju jedan sistem sam pošalje drugom čim se nešto dogodi — na primer kada stigne porudžbina. Suprotno od stalnog proveravanja „ima li šta novo“.",
        matters:
          "Zbog toga stvari izgledaju trenutno: porudžbina se pojavi u sistemu u sekundi, a ne kad sledeća provera naiđe.",
        service: { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
      },
      {
        id: "crm",
        term: "CRM",
        definition:
          "Evidencija kupaca i razgovora sa njima: ko je pitao, šta je ponuđeno, šta je dogovoreno i šta je sledeći korak.",
        matters:
          "Bez toga istorija klijenta živi u tuđem telefonu i tuđem mejlu. Kad taj čovek ode ili zaboravi, istorija ode sa njim.",
        service: { label: "Interne poslovne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
      },
      {
        id: "erp",
        term: "ERP",
        definition:
          "Sistem koji na jednom mestu vodi operativu firme — zalihe, nabavku, proizvodnju, finansije. Široki, gotovi ERP-ovi pokrivaju mnogo toga i traže da se firma prilagodi njima.",
        matters:
          "Za manju firmu je često prevelik. Interni sistem koji pokriva tri procesa koja stvarno boli obično donese više od ERP-a koji se nikad ne uvede do kraja.",
        service: { label: "Interne poslovne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
      },
      {
        id: "rezervacioni-sistem",
        term: "Rezervacioni sistem",
        aliases: ["booking sistem", "sistem za zakazivanje"],
        definition:
          "Softver koji vodi termine ili jedinice koje se izdaju: ko je zauzeo šta i kada, sa pravilima trajanja, otkazivanja i dostupnosti. Za smeštaj vodi noćenja, za usluge termine, za restoran stolove.",
        matters:
          "Glavna vrednost nije zakazivanje nego to što se isti termin ne može prodati dvaput i što se podseti onaj ko bi inače zaboravio.",
        service: { label: "Sistemi za zakazivanje", href: "/our-services/sistemi-za-zakazivanje" },
      },
      {
        id: "no-show",
        term: "No-show",
        aliases: ["nedolazak"],
        definition:
          "Zakazan termin na koji klijent ne dođe i ne otkaže. Mesto ostaje zauzeto u rasporedu, a prazno u stvarnosti.",
        matters:
          "Najskuplja vrsta praznog hoda jer ste ga mogli prodati. Podsetnik i otkazivanje u jedan klik su najjeftinija mera protiv toga.",
        service: { label: "Sistemi za zakazivanje", href: "/our-services/sistemi-za-zakazivanje" },
      },
      {
        id: "channel-manager",
        term: "Channel manager",
        aliases: ["kanal menadžer"],
        definition:
          "Alat koji drži dostupnost i cene usklađene između sopstvenog sajta i platformi kao što su Booking.com ili Airbnb, da se ista soba ne proda dvaput.",
        matters:
          "Bez njega se dostupnost održava ručno na više mesta, a dupla rezervacija je pitanje vremena, ne sreće.",
        service: { label: "Hotelski rezervacioni sistem", href: "/hotelski-rezervacioni-sistem" },
      },
      {
        id: "saas",
        term: "SaaS",
        definition:
          "Softver koji se koristi preko interneta uz pretplatu, bez instalacije i bez kupovine licence. Proizvođač održava sistem, korisnik plaća korišćenje.",
        matters:
          "Ako gradite SaaS, prihod je ponavljajući ali i obaveza je stalna — održavanje, podrška i dostupnost su deo proizvoda, ne dodatak.",
        service: { label: "SaaS razvoj", href: "/our-services/saas-razvoj" },
      },
      {
        id: "mvp",
        term: "MVP",
        aliases: ["minimalno održiv proizvod"],
        definition:
          "Prva verzija proizvoda koja radi jednu stvar dovoljno dobro da se na njoj proveri da li je ljudi uopšte žele. Nije nedovršen proizvod nego namerno uzak.",
        matters:
          "Poenta je da se pogrešna pretpostavka otkrije pre nego što se na njoj sagradi godina posla.",
        service: { label: "SaaS razvoj", href: "/our-services/saas-razvoj" },
      },
      {
        id: "backup",
        term: "Backup",
        aliases: ["rezervna kopija"],
        definition:
          "Kopija podataka i sajta sa ranijeg trenutka, čuvana odvojeno od originala. Backup koji stoji na istom serveru nije backup.",
        matters:
          "Vrednost se ne meri postojanjem kopije nego time koliko traje povratak sa nje. Kopija koju niko nikad nije probao da vrati je pretpostavka, ne osiguranje.",
        service: { label: "Hosting i infrastruktura", href: "/our-services/hosting-infrastruktura" },
      },
    ],
  },
  {
    heading: "Prodaja, merenje i vidljivost",
    terms: [
      {
        id: "konverzija",
        term: "Konverzija",
        definition:
          "Radnja zbog koje sajt postoji: poslat upit, obavljena kupovina, zakazan termin, pozvan broj. Stopa konverzije je udeo posetilaca koji je urade.",
        matters:
          "Bez definisane konverzije svaki izveštaj je broj poseta, a posete se ne naplaćuju.",
        service: { label: "Analitika i business intelligence", href: "/our-services/business-intelligence-analitika" },
      },
      {
        id: "levak",
        term: "Levak",
        aliases: ["funnel", "prodajni levak"],
        definition:
          "Put od prvog dodira do kupovine, izražen kao koraci sa brojem ljudi na svakom. Na svakom koraku deo ljudi otpadne.",
        matters:
          "Pokazuje gde se tačno gubi — u saobraćaju, na strani ili u formi. Bez toga se popravlja nasumično i najčešće ono što nije problem.",
        service: { label: "Analitika i business intelligence", href: "/our-services/business-intelligence-analitika" },
      },
      {
        id: "seo",
        term: "SEO",
        definition:
          "Rad na tome da se sajt pojavi u rezultatima pretrage za ono što ljudi zaista kucaju. Deli se na tehnički deo, sadržaj i spoljne signale.",
        matters:
          "Efekat je odložen i kumulativan. Ko obeća prvu poziciju u roku, prodaje nešto što ne može da garantuje.",
        service: { label: "SEO i digitalni marketing", href: "/our-services/seo-digitalni-marketing" },
      },
      {
        id: "aeo",
        term: "AEO i GEO",
        aliases: ["optimizacija za AI pretragu", "answer engine optimization"],
        definition:
          "Prilagođavanje sadržaja tako da ga AI asistenti i sažeci u pretrazi mogu pročitati, razumeti i citirati. Razlika u odnosu na SEO je cilj: ne klik na sajt, nego pominjanje u odgovoru.",
        matters:
          "Traži kratke samostalne odgovore, jasna pitanja i odgovore i strukturirane podatke. Nijedan alat ne može da garantuje da će vas asistent preporučiti.",
        service: { label: "AI preporuka i vidljivost", href: "/our-services/ai-preporuka" },
      },
      {
        id: "strukturirani-podaci",
        term: "Strukturirani podaci",
        aliases: ["schema.org", "JSON-LD", "šema"],
        definition:
          "Nevidljiv zapis u strani koji mašini kaže šta je šta: da je ovo firma, ovo usluga, ovo cena, ovo pitanje i odgovor. Piše se po rečniku schema.org.",
        matters:
          "Bez toga pretraživač i asistent pogađaju iz teksta. Sa tim, entitet firme i njenih usluga je izričito naveden i može da se poveže sa drugim izvorima.",
        service: { label: "AI preporuka i vidljivost", href: "/our-services/ai-preporuka" },
      },
      {
        id: "llms-txt",
        term: "llms.txt",
        definition:
          "Tekstualni fajl na sajtu napisan za AI modele, po ugledu na robots.txt. Sadrži sažet i tačan profil firme, usluga i dokaza, na jednom mestu.",
        matters:
          "Nije standard koji iko mora da poštuje i ne garantuje ništa. Košta malo, a asistentu koji ga pročita daje tačne podatke umesto sklopljenih iz delova sajta.",
        service: { label: "AI preporuka i vidljivost", href: "/our-services/ai-preporuka" },
      },
      {
        id: "robots-txt",
        term: "robots.txt",
        definition:
          "Fajl kojim sajt kaže automatskim posetiocima šta smeju da preuzimaju. Poštuju ga ozbiljni crawleri, uključujući AI crawlere koji se predstavljaju imenom.",
        matters:
          "Zabrana tu ne štiti podatke — ko ne poštuje pravila, ne poštuje ni ovaj fajl. Služi da se privatni delovi sajta drže van indeksa i van AI odgovora.",
        service: { label: "AI preporuka i vidljivost", href: "/our-services/ai-preporuka" },
      },
      {
        id: "ai-asistent",
        term: "AI asistent nad vašim podacima",
        aliases: ["RAG", "chatbot nad dokumentima"],
        definition:
          "Asistent koji ne odgovara iz opšteg znanja nego iz vaših dokumenata i podataka: cenovnika, rasporeda, uputstava. Pre odgovora pronađe odgovarajući deo i odgovara iz njega.",
        matters:
          "Tačnost zavisi od izvora. Asistent nad zastarelim cenovnikom brže širi zastarelu cenu — sređivanje podataka je prvi korak, ne drugi.",
        service: { label: "AI chatbot za sajt", href: "/ai-chatbot-za-sajt" },
      },
      {
        id: "automatizacija-toka",
        term: "Automatizacija toka",
        aliases: ["workflow automatizacija", "n8n"],
        definition:
          "Lanac koraka koji se izvršava sam kada se nešto dogodi: upit stigne, upiše se u evidenciju, pošalje se potvrda, obavesti se odgovorna osoba.",
        matters:
          "Najveći dobitak nije brzina nego to što se nijedan korak ne preskoči kad je gužva ili kad neko nije tu.",
        service: { label: "AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
      },
      {
        id: "web-shop",
        term: "Web shop",
        aliases: ["e-commerce", "online prodavnica"],
        definition:
          "Sajt kroz koji se proizvod bira, plaća i isporučuje, sa katalogom, korpom, plaćanjem i administracijom porudžbina i zaliha.",
        matters:
          "Težina nije u izgledu prodavnice nego u onome što dolazi posle porudžbine: zalihe, isporuka, povrat i knjigovodstvo.",
        service: { label: "E-commerce i web shop", href: "/our-services/e-commerce-web-shop" },
      },
    ],
  },
];

export const glossaryTerms: GlossaryTerm[] = glossaryGroups.flatMap((group) => group.terms);

/**
 * The glossary rendered through the existing guide layout.
 *
 * One section per term rather than one per group: a term with its own heading
 * is separately addressable, which is what lets a search engine deep-link a
 * definition and an assistant lift exactly one of them. Grouping stays in the
 * data for ordering and for the schema.
 */
export function glossaryAsGuide(): import("./guides").Guide {
  return {
    path: glossaryPage.path,
    eyebrow: glossaryPage.eyebrow,
    title: glossaryPage.title,
    metaDescription: glossaryPage.metaDescription,
    h1: glossaryPage.h1,
    lead: glossaryPage.lead,
    keywords: [...glossaryPage.keywords],
    sections: glossaryTerms.map((term) => ({
      heading: term.aliases?.length ? `${term.term} (${term.aliases.join(", ")})` : term.term,
      body: [term.definition, ...(term.matters ? [term.matters] : [])],
      ...(term.service ? { bullets: [`Usluga koja se time bavi: ${term.service.label}`] } : {}),
    })),
    faqHeading: "O rečniku",
    faq: [
      {
        q: "Zašto je ovaj rečnik uopšte potreban?",
        a: "Zato što se u ponudama pojavljuju reči od kojih zavisi cena, a retko ih neko objasni. Kupac koji zna šta je CMS, a šta statični sajt, drugačije čita dve ponude koje se razlikuju za hiljadu evra.",
      },
      {
        q: "Da li su definicije pisane da bi se prodala usluga?",
        a: "Ne. Uz svaki pojam piše i kada vam ne treba — CMS koji ne otvarate, ERP koji je prevelik, PWA koja ne može ono što native aplikacija može. Rečnik koji hvali sve što opisuje ne vredi čitati.",
      },
      {
        q: "Šta ako pojam koji tražim nije ovde?",
        a: "Pošaljite ga kroz upit i biće dodat, sa objašnjenjem. Rečnik je sastavljen od pitanja koja se stvarno ponavljaju u razgovoru, pa raste onako kako ta pitanja stižu.",
      },
    ],
    cta: { label: "Pošalji upit", href: "/upit" },
    secondaryCta: { label: "Usluge", href: "/our-services" },
  };
}
