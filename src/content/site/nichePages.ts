/**
 * Copy for the per-niche solution pages (/izrada-web-shopa, /softver-za-teretanu…).
 *
 * The hotel page is the one page an answer engine keeps quoting back: it is a
 * named product with its own URL, its own FAQ and a plain answer to "what am I
 * actually paying for". Every other trade we sell to had only a service page
 * under /our-services, which answers "what does this agency do" and never
 * "who builds a web shop for a Serbian company". These pages close that gap.
 *
 * Boundary against the booking pages: /online-zakazivanje/[slug] sells one
 * feature — the appointment — to a trade. These sell the whole system: site,
 * admin, and the operations behind it. Where both exist for a trade (beauty,
 * gyms) the pages link to each other and the markup says `isRelatedTo`, so the
 * two never read as two competing products.
 *
 * Same honesty rule as everywhere else: every claim is checkable on a live
 * client system or phrased as what we do. No client numbers nobody measured,
 * no promises about rankings or AI recommendations.
 */

export type NicheProof = {
  name: string;
  sector: string;
  note: string;
  href: string;
  cta: string;
  image?: string;
  /** Link leaves adspire.rs — rendered with target=_blank. */
  external?: boolean;
};

export type NichePage = {
  slug: string;
  /** Short label for navigation and cross-links. */
  navLabel: string;
  seo: { title: string; metaDescription: string; keywords: string[] };
  hero: { eyebrow: string; title: string; lead: string };
  /** Two or three sentences that answer the search on their own — for AI answers and snippets. */
  summary: string;
  audience: string[];
  /**
   * The section the hotel page was missing until a buyer asked it out loud:
   * what does the money buy, in hours and in fees that stop leaving.
   */
  value: { title: string; lead: string; items: { title: string; body: string }[] };
  pains: { before: string; after: string }[];
  features: { title: string; body: string }[];
  phases: { title: string; text: string; items: string[] }[];
  proof: NicheProof[];
  faq: { q: string; a: string }[];
  /** SoftwareApplication / Service markup. */
  product: { name: string; category: string; audience: string };
  /** Service slug for /upit/brzo?usluga=… — must exist in the inquiry catalog. */
  inquiryService: string;
  related: { href: string; label: string }[];
};

export function nichePath(slug: string) {
  return `/${slug}`;
}

const drIgic: NicheProof = {
  name: "Dr Igić",
  sector: "Estetska klinika",
  note: "Zakazivanje spojeno sa evidencijom pacijenata — termin i karton nisu dva odvojena sveta. Najveći sistem u portfoliju.",
  href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
  cta: "Studija slučaja",
  image: "/images/case-studies/drigic-mobileview.webp",
};

const doctorBarber: NicheProof = {
  name: "Doctor Barber",
  sector: "Berbernica · Niš",
  note: "Javni sajt, online zakazivanje, klijentski nalog, admin kalendar i notifikacije. Radi kao PWA, pa se sa telefona otvara kao aplikacija.",
  href: "/our-projects/doctor-barber-online-booking-sistem",
  cta: "Studija slučaja",
  image: "/images/case-studies/doctorbarber.webp",
};

const santos: NicheProof = {
  name: "Santos & Santorini",
  sector: "Web shop · maloprodaja",
  note: "Storefront, korpa, checkout, CMS, admin, lager i integracije sa marketplace-ima. Prodavnica i skladište gledaju u istu bazu.",
  href: "/our-projects/santos-santorini-web-shop-admin-platforma",
  cta: "Studija slučaja",
  image: "/images/case-studies/santos-desktop.webp",
};

const prevozKop: NicheProof = {
  name: "Prevoz Kop",
  sector: "Betonska baza · Niš",
  note: "Javni SEO sajt spojen sa operativom: upiti i ponude, proizvodi, radnici, vozila i termini isporuke betona u jednom adminu.",
  href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
  cta: "Studija slučaja",
  image: "/images/case-studies/prevozkop-desktop.webp",
};

const tozaAi: NicheProof = {
  name: "Toza AI",
  sector: "Studio · paketi i naplata",
  note: "Paketi, naplata, sati u nalogu, termini i fakture u jednom sistemu. Klijent kupi paket, pa ga troši iz svog naloga — članarina po istoj logici.",
  href: "/our-projects/toza-ai-platforma-za-ai-video-studio",
  cta: "Studija slučaja",
  image: "/images/case-studies/tozai-desktop.webp",
};

const salonSrdjan: NicheProof = {
  name: "Salon Srđan",
  sector: "Frizerski salon",
  note: "Salonski sajt sa uslugama, cenovnikom i kontaktom kao ulazom u termin — lakša varijanta, za salon koji ne želi ceo panel odmah.",
  href: "https://frizerskisalonsrdjan.com",
  cta: "frizerskisalonsrdjan.com",
  external: true,
};

const autoDelic: NicheProof = {
  name: "Auto Delić",
  sector: "Auto servis",
  note: "Sajt i admin panel: upiti i zakazivanje servisnih termina, pa se prijem vozila planira unapred umesto da se gomila pred vratima.",
  href: "https://autodelic.com",
  cta: "autodelic.com",
  external: true,
};

const eduka: NicheProof = {
  name: "Eduka",
  sector: "Stomatološka edukacija",
  note: "Prijave na kurseve i polaznici na jednom mestu: ograničen broj mesta, potvrda i evidencija ko je došao.",
  href: "https://eduka.co.rs",
  cta: "eduka.co.rs",
  external: true,
};

export const nichePages: NichePage[] = [
  {
    slug: "softver-za-salon-lepote",
    navLabel: "Saloni lepote i estetika",
    seo: {
      title: "Softver i sajt za salon lepote i estetske tretmane",
      metaDescription:
        "Sajt i softver po meri za salon lepote: nokti, depilacija, trepavice, botoks i fileri. Online zakazivanje po tretmanu, kartoni klijenata, podsetnici i admin na telefonu.",
      keywords: [
        "softver za salon lepote",
        "program za kozmetički salon",
        "sajt za salon noktiju",
        "zakazivanje depilacija online",
        "softver za estetsku kliniku",
        "aplikacija za salon trepavica",
        "sistem za botoks i filere",
      ],
    },
    hero: {
      eyebrow: "Salon lepote · estetski tretmani",
      title: "Salon koji se zakazuje sam",
      lead:
        "Nokti, depilacija, trepavice, botoks i fileri ne traju isto, ne koštaju isto i ne zahtevaju istu pripremu. Pravimo sajt i softver koji to zna — po tretmanu, po osobi i po prostoriji.",
    },
    summary:
      "Softver za salon lepote je sajt sa online zakazivanjem po tretmanu plus admin deo u kome stoje klijenti, termini, cene i istorija tretmana. Adspire iz Niša pravi takav sistem po meri salona — isti tip sistema radi u estetskoj klinici Dr Igić, gde su termin i karton pacijenta ista stvar, a ne dva odvojena programa.",
    audience: [
      "Saloni noktiju i manikira",
      "Studiji za trepavice i obrve",
      "Saloni za depilaciju i lasersku epilaciju",
      "Estetske klinike: botoks, fileri, tretmani lica",
      "Kozmetički saloni sa više kabina i radnica",
    ],
    value: {
      title: "Šta tačno plaćate",
      lead:
        "Plaćate da sati koji odu na telefon, poruke i svesku prestanu da odlaze — i da termini prestanu da propadaju.",
      items: [
        {
          title: "Sate na telefonu i u porukama",
          body:
            "Zakazivanje preko Instagram poruka i poziva traje ceo dan i prekida tretman u toku. Javna strana za zakazivanje prima termine i noću, dok je salon zatvoren.",
        },
        {
          title: "Prazne kabine",
          body:
            "Termin koji se otkaže bez najave je izgubljen sat. Automatski podsetnik dan ranije i otkazivanje koje odmah vraća termin u ponudu smanjuju broj praznih mesta u rasporedu.",
        },
        {
          title: "Prepisivanje iz sveske",
          body:
            "Kartoni, alergije, korišćeni preparat i datum poslednjeg tretmana stoje uz klijenta, a ne u svesci koja se traži. Kod hemijskih i injekcionih tretmana to nije udobnost nego evidencija.",
        },
        {
          title: "Proviziju platformama",
          body:
            "Sajt sa sopstvenim zakazivanjem je vaš kanal. Adspire ne uzima procenat od termina. Ako koristite platformu koja naplaćuje proviziju po rezervaciji, sopstveni kanal je tu da je zameni, ne da joj se doda.",
        },
      ],
    },
    pains: [
      {
        before: "Poruke stižu na Instagram, Viber i telefon, a raspored je u svesci.",
        after: "Jedno mesto gde termin ulazi, bez obzira odakle je klijent došao.",
      },
      {
        before: "Nokti traju sat, fileri traju petnaest minuta plus priprema — kalendar to ne zna.",
        after: "Trajanje i priprema upisani po tretmanu, pa raspored ne puca do podne.",
      },
      {
        before: "Ko je radio tretman, čime i kada — zna se dok se neko ne seti pogrešno.",
        after: "Istorija tretmana stoji uz klijenta, sa datumom, izvođačem i preparatom.",
      },
      {
        before: "Novi klijent traži cenovnik u poruci, pa odustane dok čeka odgovor.",
        after: "Cene i trajanja su na sajtu, a zakazivanje je sledeći klik, ne sledeći dan.",
      },
    ],
    features: [
      { title: "Zakazivanje po tretmanu", body: "Svaki tretman ima svoje trajanje, cenu, pripremu i pauzu posle — kalendar nudi samo ono što stvarno može da stane." },
      { title: "Izbor radnice ili kabine", body: "Klijent bira osobu kod koje ide, ili prvi slobodan termin. Kod tretmana vezanih za aparat rezerviše se i prostorija." },
      { title: "Karton klijenta", body: "Istorija tretmana, beleške, saglasnosti i kontraindikacije uz osobu. Pristup po ulogama — ne vidi svako sve." },
      { title: "Podsetnici i otkazivanje", body: "Automatska potvrda i podsetnik, pravila otkazivanja i kapara za tretmane kod kojih izostanak košta." },
      { title: "Sajt koji prodaje tretman", body: "Stranica po tretmanu sa cenom, trajanjem, pripremom i fotografijama — to je i ono što pretraga i AI asistenti čitaju." },
      { title: "Admin na telefonu", body: "Upis termina koji je stigao pozivom, izmena rasporeda i pregled dana sa telefona, bez laptopa u salonu." },
    ],
    phases: [
      {
        title: "Sajt i zakazivanje",
        text: "Javni deo koji prima termine.",
        items: ["Stranice tretmana sa cenom i trajanjem", "Online zakazivanje i email/SMS potvrde", "Tehnički SEO i sadržaj čitljiv AI asistentima"],
      },
      {
        title: "Salon iznutra",
        text: "Deo koji koristi ekipa.",
        items: ["Kartoni klijenata i istorija tretmana", "Radno vreme, smene, pauze i godišnji", "Uloge i prava pristupa po radnici"],
      },
      {
        title: "Rast i lojalnost",
        text: "Kada osnova radi.",
        items: ["Paketi tretmana i praćenje iskorišćenosti", "Podsetnik na ponovni dolazak posle N nedelja", "Izveštaji: tretmani, radnice, prihod po periodu"],
      },
    ],
    proof: [drIgic, doctorBarber, salonSrdjan],
    faq: [
      {
        q: "Da li je ovo gotov program za salon ili se pravi po meri?",
        a: "Pravi se po meri salona. Osnova zakazivanja i kartona već radi kod klijenata, pa se ne piše iz nule, ali tretmani, trajanja, uloge i pravila otkazivanja podešavaju se za vaš salon.",
      },
      {
        q: "Koliko košta i koliko traje izrada?",
        a: "Zavisi od broja tretmana, broja radnica, da li je potreban karton klijenta i da li se prenose postojeći podaci. Posle kratkog razgovora dobijate ponudu sa obimom, cenom i rokom po fazi, i posebno navedenim tekućim troškovima (hosting, domen, održavanje).",
      },
      {
        q: "Da li uzimate proviziju od zakazanih termina?",
        a: "Ne. Adspire ne naplaćuje procenat po terminu. Plaćate izradu po ponudi i tekuće troškove koji se navode zasebno. Naknade platnih procesora ili SMS provajdera, ako ih uključimo, idu odvojeno i vidljivo.",
      },
      {
        q: "Radimo botoks i filere — da li sistem podržava saglasnosti i kontraindikacije?",
        a: "Da, kao deo kartona klijenta: obrazac saglasnosti, beleške o preparatu i dozi, i istorija po datumu. Obim, pravila čuvanja i rokove definišemo u ponudi; za obradu podataka o zdravlju uslove potvrđujemo pisano pre nego što ih ugradimo.",
      },
      {
        q: "Imamo Instagram i tamo nam se javljaju svi klijenti. Da li nam treba sajt?",
        a: "Instagram ostaje, ali nije kalendar i nije vaša baza klijenata. Sajt sa zakazivanjem prima termine i kad ne gledate telefon, a podaci o klijentima ostaju vaši i izvoze se kad god zatražite.",
      },
      {
        q: "Možemo li da počnemo samo sa sajtom i zakazivanjem?",
        a: "Da, to je i najčešći prvi korak. Kartoni, paketi i izveštaji su sledeća faza i rade se tek kada prvi deo bude u upotrebi.",
      },
    ],
    product: {
      name: "Softver i sajt za salon lepote",
      category: "BusinessApplication",
      audience: "Saloni lepote, kozmetički saloni i estetske klinike",
    },
    inquiryService: "sistemi-za-zakazivanje",
    related: [
      { href: "/online-zakazivanje/kozmeticki-saloni-i-estetske-klinike", label: "Samo online zakazivanje za salone i klinike" },
      { href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike", label: "Studija slučaja: Dr Igić" },
      { href: "/softver-za-frizerski-salon-i-berbernicu", label: "Softver za frizerski salon i berbernicu" },
      { href: "/gotova-aplikacija-ili-svoj-sistem-za-zakazivanje", label: "Gotova aplikacija ili svoj sistem za zakazivanje" },
      { href: "/cena-izrade-sajta", label: "Koliko košta izrada sajta" },
    ],
  },

  {
    slug: "izrada-web-shopa",
    navLabel: "Web shop",
    seo: {
      title: "Izrada web shopa po meri — prodavnica, lager i admin",
      metaDescription:
        "Izrada web shopa po meri: katalog, korpa, checkout, plaćanje karticom i pouzećem, lager, admin i integracije sa marketplace-ima. Bez mesečne provizije na prodaju.",
      keywords: [
        "izrada web shopa",
        "izrada online prodavnice",
        "web shop po meri Srbija",
        "e-commerce sajt cena",
        "online prodavnica sa lagerom",
        "web shop bez provizije",
      ],
    },
    hero: {
      eyebrow: "E-commerce · prodavnica po meri",
      title: "Prodavnica koja ne uzima procenat",
      lead:
        "Katalog, korpa, checkout, lager i admin na jednom mestu — vaša platforma, vaša baza kupaca. Bez mesečne pretplate koja raste kad prodaja raste.",
    },
    summary:
      "Izrada web shopa po meri znači sopstvenu online prodavnicu: katalog proizvoda, korpa i checkout, plaćanje karticom i pouzećem, praćenje lagera i admin za porudžbine. Adspire iz Niša gradi web shopove u Next.js-u — Santos & Santorini radi na toj osnovi, zajedno sa CMS-om, lagerom i integracijama sa marketplace-ima.",
    audience: [
      "Maloprodaje koje prodaju i van radnje",
      "Brendovi koji žele svoj kanal pored marketplace-a",
      "Proizvođači sa B2B i B2C cenovnikom",
      "Prodavnice sa većim katalogom i varijantama",
      "Firme koje prelaze sa Shopify ili WooCommerce platforme",
    ],
    value: {
      title: "Šta tačno plaćate",
      lead:
        "Plaćate jednom izradu umesto da doživotno plaćate procenat prodaje i sate koje neko troši na prepisivanje porudžbina.",
      items: [
        {
          title: "Proviziju i pretplatu platformama",
          body:
            "Gotove platforme naplaćuju mesečnu pretplatu, dodatke i u nekim paketima procenat prodaje — trošak koji raste baš kada vam ide dobro. Sopstveni shop ima cenu izrade i predvidive tekuće troškove (hosting, domen, održavanje). Naknade banke i platnog procesora postoje nezavisno od nas i navode se zasebno.",
        },
        {
          title: "Ručno prepisivanje porudžbina",
          body:
            "Porudžbina, lager, otpremnica i kurirska služba obično žive u tri programa i jednom Excelu. Kad su u istom sistemu, porudžbina se obradi bez prekucavanja.",
        },
        {
          title: "Prodaju koja se izgubi u checkoutu",
          body:
            "Spor sajt i checkout u pet koraka gube kupca koji je već bio spreman. Brzina i kratak tok plaćanja su deo posla, ne dodatak.",
        },
        {
          title: "Bazu kupaca koja nije vaša",
          body:
            "Na tuđoj platformi kupac je gost platforme. Ovde su kupci, porudžbine i istorija u vašoj bazi, sa izvozom kad god zatražite.",
        },
      ],
    },
    pains: [
      {
        before: "Platforma naplaćuje pretplatu i dodatke, pa svaki novi modul znači novu stavku.",
        after: "Funkcije koje vam trebaju ulaze u vaš sistem, bez mesečnog brojanja dodataka.",
      },
      {
        before: "Lager u prodavnici i lager na sajtu se razilaze do vikenda.",
        after: "Jedan lager iza oba, sa evidencijom svake izmene.",
      },
      {
        before: "Porudžbine se prepisuju u Excel pa u kurirsku službu.",
        after: "Porudžbina se obrađuje iz admina, sa statusima i obaveštenjima kupcu.",
      },
      {
        before: "Sajt je spor na telefonu, a tu je većina poseta.",
        after: "Mobile-first prodavnica sa optimizovanim slikama i brzim checkoutom.",
      },
    ],
    features: [
      { title: "Katalog i varijante", body: "Kategorije, filteri, veličine i boje, opisi i galerije. Proizvod se uređuje iz admina, bez zvanja agencije." },
      { title: "Korpa i checkout", body: "Kratak tok do plaćanja, gost-checkout, troškovi dostave i kod za popust. Kartica, pouzeće ili uplatnica, po dogovoru sa bankom." },
      { title: "Lager i porudžbine", body: "Stanje po proizvodu i varijanti, rezervacija pri porudžbini, statusi i obaveštenja kupcu na svaki korak." },
      { title: "Admin i CMS", body: "Proizvodi, akcije, banneri i tekstualne stranice — sadržaj menja vaš čovek, ne developer." },
      { title: "Integracije", body: "Marketplace, kurirska služba, fiskalizacija ili ERP — povezujemo ono što stvarno koristite, po dostupnoj dokumentaciji." },
      { title: "SEO i merenje", body: "Stranice proizvoda i kategorija sa strukturiranim podacima, plus merenje odakle stižu porudžbine." },
    ],
    phases: [
      {
        title: "Prodavnica",
        text: "Deo koji prodaje.",
        items: ["Katalog, korpa i checkout", "Plaćanje i dostava po vašim pravilima", "Tehnički SEO i brzina na telefonu"],
      },
      {
        title: "Operativa",
        text: "Deo koji obrađuje porudžbine.",
        items: ["Lager, statusi i obaveštenja", "Admin za ekipu, sa ulogama", "Izveštaji: prodaja, proizvodi, povrati"],
      },
      {
        title: "Kanali i rast",
        text: "Kada osnova radi.",
        items: ["Integracije sa marketplace-ima i kurirskim službama", "Popusti, paketi i email tokovi", "B2B cenovnik i nalozi za veleprodaju"],
      },
    ],
    proof: [santos, prevozKop, tozaAi],
    faq: [
      {
        q: "Zašto shop po meri umesto Shopify ili WooCommerce platforme?",
        a: "Ako prodajete jednostavan katalog i sve vam radi, gotova platforma je razumna i to ćemo vam i reći. Shop po meri ima smisla kada imate lager, varijante, B2B cene, integracije ili tok porudžbine koji gotova platforma ne pokriva bez gomile dodataka.",
      },
      {
        q: "Koliko košta izrada web shopa?",
        a: "Zavisi od veličine kataloga, načina plaćanja, integracija i toga da li se prenose postojeći podaci. Okvirni rasponi su na stranici o ceni izrade sajta, a tačna cena ide u ponudu sa obimom i rokom po fazi.",
      },
      {
        q: "Da li naplaćujete procenat od prodaje?",
        a: "Ne. Adspire ne uzima procenat prodaje. Plaćate izradu po ponudi i tekuće troškove koji se navode zasebno. Banka i platni procesor naplaćuju svoje naknade nezavisno od nas.",
      },
      {
        q: "Možemo li da prenesemo postojeći shop i podatke?",
        a: "Prvo proveravamo šta je moguće izvesti — proizvode, kupce, porudžbine i URL strukturu. Na osnovu toga predlažemo migraciju sa preusmerenjima, da ne izgubite pozicije koje već imate, i podatke testiramo pre prelaska.",
      },
      {
        q: "Da li se povezuje sa marketplace-ima i kurirskim službama?",
        a: "Da, kada postoji dostupna i dozvoljena integracija. Santos & Santorini radi sa marketplace integracijom. Mogućnosti i troškove proveravamo pre nego što ih uvrstimo u ponudu.",
      },
      {
        q: "Ko uređuje proizvode posle lansiranja?",
        a: "Vi. Admin i CMS su deo isporuke, uz obuku. Ako želite da mi održavamo sadržaj, to je posebna stavka u ponudi.",
      },
    ],
    product: {
      name: "Web shop po meri",
      category: "BusinessApplication",
      audience: "Maloprodaje, brendovi i proizvođači koji prodaju online",
    },
    inquiryService: "e-commerce-web-shop",
    related: [
      { href: "/kako-napraviti-web-shop", label: "Vodič: kako napraviti web shop" },
      { href: "/our-projects/santos-santorini-web-shop-admin-platforma", label: "Studija slučaja: Santos & Santorini" },
      { href: "/our-services/e-commerce-web-shop", label: "Usluga: e-commerce" },
      { href: "/sta-mora-da-ima-web-shop-u-srbiji", label: "Šta mora da ima web shop u Srbiji" },
      { href: "/placanje-karticom-na-sajtu-srbija", label: "Plaćanje karticom na sajtu" },
    ],
  },

  {
    slug: "prezentacioni-sajt-za-firmu",
    navLabel: "Prezentacioni sajt",
    seo: {
      title: "Prezentacioni sajt za firmu koji donosi upite",
      metaDescription:
        "Izrada prezentacionog sajta za firmu: jasna ponuda, stranice usluga, reference i kontakt tok koji se meri. Brz Next.js sajt, CMS i tehnički SEO, bez šablona.",
      keywords: [
        "prezentacioni sajt za firmu",
        "izrada sajta za firmu",
        "korporativni sajt",
        "web prezentacija cena",
        "izrada sajta Niš",
        "sajt za malu firmu",
      ],
    },
    hero: {
      eyebrow: "Korporativni sajt · web prezentacija",
      title: "Sajt koji radi kao prodavac",
      lead:
        "Vizit-karta na internetu ne donosi posao. Pravimo prezentacioni sajt sa jasnom ponudom, dokazima i kontakt tokom koji se meri — da znate odakle je stigao svaki upit.",
    },
    summary:
      "Prezentacioni sajt za firmu je sajt koji objašnjava šta firma radi, kome i sa kakvim rezultatom, i vodi posetioca do upita. Adspire iz Niša pravi ih u Next.js-u sa CMS-om, tehničkim SEO-om i merenjem izvora svakog upita — isti pristup po kome Prevoz Kop ima javni SEO sajt spojen sa sistemom za upite i ponude.",
    audience: [
      "Firme kojima postojeći sajt ne donosi upite",
      "Proizvodne i uslužne firme sa B2B kupcima",
      "Kompanije koje prvi put izlaze na internet",
      "Firme koje prelaze sa WordPress šablona",
      "Timovi kojima treba sajt na srpskom i engleskom",
    ],
    value: {
      title: "Šta tačno plaćate",
      lead:
        "Plaćate da prestane da se objašnjava isto — i da upit prestane da bude slučajnost koja se ne može izmeriti.",
      items: [
        {
          title: "Sate na objašnjavanje istog",
          body:
            "Šta radite, kako radite, koliko traje i šta je potrebno od klijenta — ista pitanja u svakom razgovoru. Kada su odgovorena na sajtu, do vas stiže pripremljen sagovornik, ne početak razgovora.",
        },
        {
          title: "Upite koji odu konkurenciji",
          body:
            "Kupac koji ne razume ponudu ili ne nađe cenovni okvir odlazi na sledeći rezultat. Struktura stranica po nameri kupca i jasan sledeći korak su razlika između posete i upita.",
        },
        {
          title: "Slepilo u marketingu",
          body:
            "Bez merenja izvora se ne zna da li upiti dolaze sa pretrage, Instagrama ili preporuke — pa se budžet troši naslepo. Svaki upit nosi izvor, što je osnova za kasniju Ads optimizaciju.",
        },
        {
          title: "Nevidljivost u pretrazi i AI odgovorima",
          body:
            "Sadržaj koji objašnjava posao u tekstu, sa strukturiranim podacima i usklađenim podacima o firmi, jeste ono što pretraživači i AI asistenti mogu da citiraju. Bez garancije pozicija ili AI preporuka — to niko ne može da garantuje.",
        },
      ],
    },
    pains: [
      {
        before: "Sajt je katalog stranica: Početna, O nama, Usluge, Kontakt — i ništa ne vodi do upita.",
        after: "Struktura po nameri kupca, sa jasnim sledećim korakom na svakoj strani.",
      },
      {
        before: "Šablon sa fotografijama sa stoka, isti kao kod još sto firmi.",
        after: "Dizajn i fotografija vezani za ono što stvarno radite i što ste isporučili.",
      },
      {
        before: "Promena teksta znači zvati agenciju i čekati.",
        after: "CMS za stranice, reference i vesti — vaš čovek menja sadržaj sam.",
      },
      {
        before: "Ne zna se da li sajt uopšte donosi upite.",
        after: "Svaki upit se beleži sa izvorom, i vidi se u izveštaju.",
      },
    ],
    features: [
      { title: "Stranica po usluzi", body: "Svaka usluga ima svoju stranicu sa problemom, rešenjem, tokom rada i pitanjima — to je ono što pretraga i AI asistenti čitaju." },
      { title: "Dokazi umesto pridevâ", body: "Reference, projekti i brojke koje možete da potkrepite. Ono što se ne meri, ne pišemo." },
      { title: "Kontakt tok koji se meri", body: "Forma sa zaštitom od spama, potvrdom i atribucijom izvora, plus poziv i WhatsApp za one koji ne pišu forme." },
      { title: "Brzina i mobilni", body: "Next.js, optimizovane slike i Core Web Vitals — jer je većina poseta sa telefona." },
      { title: "CMS bez developera", body: "Stranice, vesti, reference i tim se uređuju iz admina, bez izlaska iz posla." },
      { title: "Više jezika", body: "Srpski, engleski i nemački kada prodajete van Srbije, sa ispravnim jezičkim oznakama." },
    ],
    phases: [
      {
        title: "Osnova",
        text: "Sajt koji stoji.",
        items: ["Struktura stranica po nameri kupca", "Dizajn, tekst i fotografija", "Kontakt tok i tehnički SEO"],
      },
      {
        title: "Sadržaj i rast",
        text: "Sajt koji se puni.",
        items: ["CMS za stranice i vesti", "Stranice usluga i lokacija", "Merenje poseta i izvora upita"],
      },
      {
        title: "Prodajni deo",
        text: "Kada upiti krenu.",
        items: ["Evidencija upita i status svakog", "Automatski odgovor i praćenje", "Ponude i dokumenta po potrebi"],
      },
    ],
    proof: [prevozKop, autoDelic, eduka],
    faq: [
      {
        q: "Koliko košta prezentacioni sajt za firmu?",
        a: "Zavisi od broja stranica, količine teksta i fotografija, jezika i toga da li je potreban CMS. Okvirni rasponi stoje na stranici o ceni izrade sajta, a tačna cena ide u ponudu sa obimom i rokom.",
      },
      {
        q: "Koliko traje izrada?",
        a: "Manji prezentacioni sajt obično ide brže od sistema sa adminom, ali rok najčešće zavisi od toga koliko brzo stignu tekstovi, fotografije i podaci o firmi. Rok se piše u ponudi zajedno sa tim šta je potrebno od vas i do kada.",
      },
      {
        q: "Da li radite tekstove i fotografije?",
        a: "Tekst pišemo zajedno: vi znate posao, mi znamo šta kupac traži i kako to čita pretraga. Fotografisanje i izrada video materijala su posebna stavka u ponudi ako vam treba.",
      },
      {
        q: "Šta je sa postojećim sajtom i pozicijama u Google-u?",
        a: "Pre prelaska popisujemo postojeće adrese i postavljamo preusmerenja, da se ne izgubi ono što već radi. Praćenje indeksiranja posle lansiranja je deo posla, ali pozicije se ne garantuju.",
      },
      {
        q: "Da li je WordPress dovoljan?",
        a: "Ponekad jeste i onda to kažemo. Vodič o WordPress-u i sajtu po meri objašnjava kada je koji izbor razuman, bez prodaje skupljeg rešenja bez razloga.",
      },
      {
        q: "Ko održava sajt posle lansiranja?",
        a: "Možete vi, kroz CMS i obuku, ili mi kroz mesečno održavanje. Šta održavanje obuhvata i koliko košta stoji na posebnoj stranici i u ponudi.",
      },
    ],
    product: {
      name: "Prezentacioni sajt za firmu",
      category: "WebApplication",
      audience: "Firme i preduzetnici u Srbiji i regionu",
    },
    inquiryService: "web-prezentacije",
    related: [
      { href: "/sajt-ne-donosi-upite", label: "Sajt ne donosi upite — šta prvo proveriti" },
      { href: "/wordpress-ili-custom-sajt", label: "WordPress ili sajt po meri" },
      { href: "/da-li-mi-treba-sajt-ako-imam-instagram", label: "Da li mi treba sajt ako imam Instagram" },
      { href: "/cena-izrade-sajta", label: "Koliko košta izrada sajta" },
    ],
  },

  {
    slug: "sajt-za-gradjevinsku-firmu",
    navLabel: "Građevinske firme",
    seo: {
      title: "Sajt i sistem za građevinsku firmu — upiti, ponude, gradilišta",
      metaDescription:
        "Izrada sajta za građevinsku firmu: reference sa fotografijama, stranice usluga, tok upita i ponuda, evidencija radnika, mehanizacije i isporuka. Rađeno za betonsku bazu Prevoz Kop.",
      keywords: [
        "sajt za građevinsku firmu",
        "izrada sajta građevina",
        "softver za građevinsku firmu",
        "program za gradilište",
        "evidencija radnika i mehanizacije",
        "ponude za građevinske radove",
      ],
    },
    hero: {
      eyebrow: "Građevina · izvođači i proizvođači materijala",
      title: "Od upita sa sajta do isporuke na gradilište",
      lead:
        "Reference koje se vide, upit koji ne ostane u porukama i operativa koja zna ko radi, čime i gde. Sajt i sistem po meri za izvođače i proizvođače materijala.",
    },
    summary:
      "Sajt za građevinsku firmu je javni deo sa referencama i uslugama, spojen sa evidencijom upita i ponuda, a po potrebi i sa operativom: radnici, mehanizacija i termini isporuke. Adspire iz Niša napravio je takav sistem za betonsku bazu Prevoz Kop — SEO sajt, CRM za upite, ponude, proizvodi, radnici, vozila i isporuke u jednom adminu.",
    audience: [
      "Izvođači građevinskih radova",
      "Betonare i proizvođači materijala",
      "Firme za iskop, transport i mehanizaciju",
      "Investitori i firme koje prodaju stanove",
      "Zanatske ekipe sa stalnim podizvođačima",
    ],
    value: {
      title: "Šta tačno plaćate",
      lead:
        "Plaćate da upit ne ostane u nečijem telefonu, da se ponuda ne piše iz nule svaki put, i da se stanje na gradilištu ne saznaje pozivima.",
      items: [
        {
          title: "Upite koji se izgube",
          body:
            "Upit koji stigne na privatni broj ili Viber nema status i nema vlasnika. Kada svaki upit ulazi u isti spisak, sa izvorom i statusom, prestaje da zavisi od toga ko je taj dan bio na gradilištu.",
        },
        {
          title: "Sate na pisanje ponuda",
          body:
            "Ponuda koja se svaki put kuca iz nule, sa istim stavkama i prepisanim cenama, troši sate i pravi greške. Iz sistema se ponuda sastavlja od postojećih stavki i šalje kao dokument.",
        },
        {
          title: "Pozive radi stanja",
          body:
            "Ko je gde raspoređen, koje vozilo je slobodno, kada ide isporuka — to se obično saznaje sa pet poziva. U sistemu je to jedan ekran.",
        },
        {
          title: "Posao koji ode firmi sa boljim sajtom",
          body:
            "Investitor koji traži izvođača gleda reference, opremu i to da li firma izgleda ozbiljno. Sajt sa dokumentovanim radovima i jasnim uslugama je ono što se poredi — i ono što pretraživači i AI asistenti mogu da citiraju.",
        },
      ],
    },
    pains: [
      {
        before: "Reference postoje samo kao slike na nečijem telefonu.",
        after: "Galerija radova po tipu posla, sa lokacijom, obimom i fotografijama.",
      },
      {
        before: "Upiti stižu na tri broja i dva Vibera, pa se neki nikad ne odgovore.",
        after: "Svi upiti u jednom spisku, sa izvorom, statusom i ko ga je preuzeo.",
      },
      {
        before: "Ponuda se kuca u Wordu, pa se ne zna koja je verzija poslata.",
        after: "Ponuda se sastavlja iz sistema, sa istorijom verzija i datumom slanja.",
      },
      {
        before: "Raspored radnika i mehanizacije je u glavi jednog čoveka.",
        after: "Raspored u sistemu, dostupan sa telefona, sa izmenom istog jutra.",
      },
    ],
    features: [
      { title: "Reference koje prodaju", body: "Projekti po tipu radova, sa fotografijama pre i posle, lokacijom i obimom — to je prvo što investitor gleda." },
      { title: "Stranice usluga i materijala", body: "Svaka usluga ili proizvod ima stranicu sa opisom, primenom i pitanjima koja kupci stvarno postavljaju." },
      { title: "Upiti i ponude", body: "Upit sa sajta ulazi u spisak sa izvorom i statusom; ponuda se sastavlja od stavki i šalje kao dokument." },
      { title: "Radnici i mehanizacija", body: "Ko je na kom gradilištu, koje vozilo je zauzeto i do kada — evidencija umesto poziva." },
      { title: "Termini isporuke", body: "Planiranje isporuka po danu i satu, sa potvrdom naručiocu. Kod betona i materijala termin je proizvod." },
      { title: "Lokalni SEO", body: "Stranice po gradu i delatnosti, usklađeni podaci o firmi i strukturirani podaci — osnova da vas nađu iz pretrage." },
    ],
    phases: [
      {
        title: "Sajt i reference",
        text: "Javni deo koji donosi upite.",
        items: ["Stranice usluga i galerija radova", "Kontakt tok sa evidencijom izvora", "Tehnički i lokalni SEO"],
      },
      {
        title: "Upiti i ponude",
        text: "Deo koji pretvara upit u posao.",
        items: ["Spisak upita sa statusima", "Sastavljanje i slanje ponuda", "Podsetnici na neodgovorene upite"],
      },
      {
        title: "Operativa",
        text: "Deo koji vodi gradilište.",
        items: ["Radnici, vozila i raspored", "Proizvodi i termini isporuke", "Izveštaji po periodu i po gradilištu"],
      },
    ],
    proof: [prevozKop, autoDelic, santos],
    faq: [
      {
        q: "Treba li nam ceo sistem ili je dovoljan sajt?",
        a: "Najčešće se kreće od sajta sa referencama i evidencijom upita. Operativa — radnici, vozila, isporuke — ima smisla tek kada vas broj poslova natera na nju, i radi se kao posebna faza sa svojom cenom.",
      },
      {
        q: "Koliko košta izrada?",
        a: "Sajt sa referencama i upitima je jedna kategorija, sistem sa operativom druga. Cena i rok po fazi idu u ponudu posle razgovora, uz posebno navedene tekuće troškove.",
      },
      {
        q: "Naši ljudi nisu za kompjutere. Da li će to iko koristiti?",
        a: "Zato se pravi po meri: ekipa na terenu dobija ekran sa dve stvari koje su joj potrebne, na telefonu, a ne ceo program. Obuka je deo isporuke, a prvu fazu biramo tako da odmah skida posao nekome.",
      },
      {
        q: "Imamo li neku referencu iz građevine?",
        a: "Da. Prevoz Kop, betonska baza kod Niša, ima javni SEO sajt spojen sa sistemom za upite i ponude, proizvode, radnike, vozila i termine isporuke betona. Studija slučaja je javna.",
      },
      {
        q: "Da li se povezuje sa knjigovodstvom?",
        a: "Povezivanje je moguće kada postoji dostupan i dozvoljen način razmene podataka. Proveravamo dokumentaciju i pristup pre nego što to uđe u ponudu sa rokom.",
      },
      {
        q: "Radite li i za firme van Niša?",
        a: "Da. Adspire je iz Niša i radi sa firmama u celoj Srbiji i inostranstvu, udaljeno, sa sastancima uživo kad ima potrebe.",
      },
    ],
    product: {
      name: "Sajt i operativni sistem za građevinsku firmu",
      category: "BusinessApplication",
      audience: "Građevinske firme, izvođači i proizvođači materijala",
    },
    inquiryService: "web-prezentacije",
    related: [
      { href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem", label: "Studija slučaja: Prevoz Kop" },
      { href: "/interni-softver-umesto-excel-tabela", label: "Interni softver umesto Excel tabela" },
      { href: "/it-firma-nis", label: "IT firma u Nišu" },
      { href: "/softver-za-betonsku-bazu-i-proizvodnju-materijala", label: "Softver za betonsku bazu" },
      { href: "/softver-za-transport-i-prevoz-tereta", label: "Softver za transport i prevoz tereta" },
    ],
  },

  {
    slug: "softver-za-teretanu",
    navLabel: "Teretane i fitnes",
    seo: {
      title: "Softver za teretanu: članarine, ulazak i grupni treninzi",
      metaDescription:
        "Sajt i softver za teretanu i fitnes studio: članarine i podsetnici na isticanje, prijave na grupne treninge, evidencija dolazaka i admin na telefonu. Bez provizije po članu.",
      keywords: [
        "softver za teretanu",
        "program za teretanu",
        "aplikacija za fitnes studio",
        "evidencija članarina teretana",
        "prijava na grupne treninge",
        "sajt za teretanu",
      ],
    },
    hero: {
      eyebrow: "Teretana · fitnes studio",
      title: "Članarina koja se ne zaboravi",
      lead:
        "Ko je platio, do kad važi, ko dolazi i ko je prestao — bez sveske na recepciji. Plus prijave na grupne treninge koje same zatvore listu kad se popuni.",
    },
    summary:
      "Softver za teretanu je sajt i admin u kome stoje članovi, članarine, dolasci i prijave na grupne treninge, sa automatskim podsetnikom pre isteka članarine. Adspire iz Niša pravi takav sistem po meri — logika paketa, naplate i termina iz naloga već radi u sistemu za Toza AI, a zakazivanje i klijentski nalog u berbernici Doctor Barber.",
    audience: [
      "Teretane i fitnes centri",
      "Studiji za grupne treninge i pilates",
      "Borilački i plesni klubovi",
      "Personalni treneri sa terminima",
      "Objekti sa više lokacija i članarinom koja važi na obe",
    ],
    value: {
      title: "Šta tačno plaćate",
      lead:
        "Plaćate da se članarine same podsećaju, da recepcija prestane da bude spisak u svesci i da se zna ko je prestao da dolazi — pre nego što ode zauvek.",
      items: [
        {
          title: "Članarine koje isteknu u tišini",
          body:
            "Član zaboravi da mu je istekla, niko ga ne podseti, i posle mesec dana više ne dolazi. Automatski podsetnik pred istek je najjeftiniji način da se zadrži član kojeg već imate.",
        },
        {
          title: "Sate na recepciji",
          body:
            "Upis, provera ko je platio, prijave za grupni trening i telefon — sve to radi jedan čovek između dve serije. Kada član sam plaća i sam se prijavljuje, recepcija radi svoj posao.",
        },
        {
          title: "Mesta na grupnim treninzima",
          body:
            "Prijave preko poruka znače prebrojavanje i neprijatne razgovore kad dođe jedan višak. Lista se sama zatvara kad se popuni, sa listom čekanja ako je želite.",
        },
        {
          title: "Proviziju aplikacijama za članarine",
          body:
            "Platforme koje naplaćuju po članu ili procenat po naplati koštaju sve više kako rastete. Vaš sistem ima cenu izrade i predvidive tekuće troškove; Adspire ne uzima procenat članarine, a naknade platnog procesora, ako se uvede plaćanje karticom, idu zasebno i vidljivo.",
        },
      ],
    },
    pains: [
      {
        before: "Ko je platio i do kad — piše u svesci na recepciji.",
        after: "Članovi i članarine u sistemu, sa datumom isteka i statusom.",
      },
      {
        before: "Prijave za grupni trening stižu u poruke, pa se broje ručno.",
        after: "Prijava sa telefona, ograničen broj mesta i lista čekanja.",
      },
      {
        before: "Ne zna se ko je prestao da dolazi dok ne prođu meseci.",
        after: "Vidi se ko nije dolazio i kome ističe članarina — na vreme za poruku.",
      },
      {
        before: "Novi član zove da pita cene i termine grupnih treninga.",
        after: "Cene, raspored i prijava su na sajtu, a upis je sledeći korak.",
      },
    ],
    features: [
      { title: "Članovi i članarine", body: "Paketi po trajanju i tipu, datum isteka, istorija plaćanja i pauze — bez sveske i bez pamćenja." },
      { title: "Podsetnik pred istek", body: "Automatska poruka pre isteka i posle isteka, sa jasnim pozivom na produženje." },
      { title: "Grupni treninzi", body: "Raspored po danu i treneru, ograničen broj mesta, prijava, otkazivanje i lista čekanja." },
      { title: "Evidencija dolazaka", body: "Ulazak se beleži — od jednostavne potvrde na recepciji do QR koda u nalogu člana, po dogovoru." },
      { title: "Nalog člana", body: "Član vidi svoju članarinu, prijave i raspored. Radi kao PWA — dodaje se na početni ekran telefona." },
      { title: "Sajt koji upisuje", body: "Cene, raspored, treneri i prijava na probni trening — sa merenjem odakle je došao svaki upis." },
    ],
    phases: [
      {
        title: "Sajt i upis",
        text: "Javni deo.",
        items: ["Cene, raspored i treneri", "Prijava na probni trening", "Tehnički i lokalni SEO"],
      },
      {
        title: "Članovi i termini",
        text: "Deo koji vodi teretanu.",
        items: ["Članarine sa datumom isteka", "Grupni treninzi sa brojem mesta", "Podsetnici i evidencija dolazaka"],
      },
      {
        title: "Rast i zadržavanje",
        text: "Kada osnova radi.",
        items: ["Nalog člana i PWA na telefonu", "Izveštaji: aktivni članovi, odlivi, popunjenost termina", "Plaćanje karticom i automatsko produženje po dogovoru"],
      },
    ],
    proof: [tozaAi, doctorBarber, drIgic],
    faq: [
      {
        q: "Da li je ovo gotov program za teretane?",
        a: "Ne, pravi se po meri. Delovi koji se ponavljaju — paketi, naplata, termini, nalog korisnika — već rade kod klijenata i ne pišu se iz nule, ali pravila članarine i raspored podešavamo za vaš objekat.",
      },
      {
        q: "Koliko košta i koliko traje?",
        a: "Zavisi od toga da li vam treba samo evidencija članarina ili i grupni treninzi, nalog člana i plaćanje karticom. Posle razgovora dobijate ponudu sa obimom, cenom i rokom po fazi, i posebno navedenim tekućim troškovima.",
      },
      {
        q: "Da li naplaćujete po članu ili procenat članarine?",
        a: "Ne. Adspire ne naplaćuje po članu ni procenat članarine. Plaćate izradu po ponudi i tekuće troškove koji se navode zasebno. Ako uvedete plaćanje karticom, procesor naplaćuje svoju naknadu nezavisno od nas.",
      },
      {
        q: "Može li sistem da radi sa rampom ili čitačem kartica na ulazu?",
        a: "Povezivanje sa postojećom kontrolom pristupa je moguće kada uređaj ima dostupnu dokumentaciju i način razmene podataka. To proveravamo pre nego što uđe u ponudu — bez provere nema potvrđenog obima ni roka.",
      },
      {
        q: "Imamo dve lokacije. Da li članarina važi na obe?",
        a: "Da, to je pravilo koje se podešava: članarina može da važi na jednoj lokaciji, na obe, ili različito po paketu. Definiše se u obimu pre izrade.",
      },
      {
        q: "Šta sa članovima koji ne koriste aplikacije?",
        a: "Recepcija upisuje i produžava članarinu iz istog sistema, za pet sekundi. Nalog člana je mogućnost, ne uslov.",
      },
    ],
    product: {
      name: "Softver za teretanu i fitnes studio",
      category: "BusinessApplication",
      audience: "Teretane, fitnes studiji i sportski klubovi",
    },
    inquiryService: "sistemi-za-zakazivanje",
    related: [
      { href: "/online-zakazivanje/teretane-i-fitnes-studiji", label: "Samo online zakazivanje za teretane" },
      { href: "/our-projects/toza-ai-platforma-za-ai-video-studio", label: "Studija slučaja: paketi i naplata" },
      { href: "/cena-izrade-sajta", label: "Koliko košta izrada sajta" },
    ],
  },
];

export function getNichePage(slug: string) {
  return nichePages.find((page) => page.slug === slug);
}
