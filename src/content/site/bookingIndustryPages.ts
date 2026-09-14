/**
 * Copy for /online-zakazivanje/[slug] — one booking page per industry.
 *
 * The generic booking landing (/online-zakazivanje-za-salone-i-klinike) is the
 * paid-traffic page and stays untouched. These pages exist for search: a barber
 * searches "zakazivanje za berbernicu", not "sistem za salone i klinike", and an
 * answer engine quotes the page that answers that exact question.
 *
 * Same rule as bookingLandingPage.ts: every claim is checkable on a live client
 * system or phrased as what we do — no client numbers nobody measured.
 * `proof` names must match entries in bookingProof.
 */

export type BookingIndustryPage = {
  slug: string;
  /** Short label for navigation and cross-links. */
  navLabel: string;
  seo: { title: string; metaDescription: string; keywords: string[] };
  hero: { eyebrow: string; title: string; lead: string };
  /** Two or three sentences that answer the search on their own — for AI answers and snippets. */
  summary: string;
  audience: string[];
  pains: { before: string; after: string }[];
  features: { title: string; body: string }[];
  proof: string[];
  faq: { q: string; a: string }[];
};

export const BOOKING_INDUSTRY_BASE = "/online-zakazivanje";

export function bookingIndustryPath(slug: string) {
  return `${BOOKING_INDUSTRY_BASE}/${slug}`;
}

export const bookingIndustryPages: BookingIndustryPage[] = [
  {
    slug: "frizerski-saloni-i-berbernice",
    navLabel: "Frizeri i berbernice",
    seo: {
      title: "Online zakazivanje za frizerske salone i berbernice",
      metaDescription:
        "Sistem za online zakazivanje šišanja za frizerske salone i berbernice: termin po frizeru, trajanje po usluzi, podsetnici i admin kalendar na telefonu. Radi kod Doctor Barbera u Nišu.",
      keywords: [
        "zakazivanje frizer online",
        "aplikacija za zakazivanje berbernica",
        "online zakazivanje šišanja",
        "sistem za zakazivanje frizerski salon",
        "booking za berbernicu",
        "zakazivanje termina frizer Niš",
      ],
    },
    hero: {
      eyebrow: "Online zakazivanje · frizeri i berbernice",
      title: "Termin za šišanje bez poziva",
      lead:
        "Klijent bira frizera, uslugu i slobodan termin sa telefona, a vi ne prekidate šišanje da biste se javili. Sistem pravimo po vašim uslugama i ljudima, na osnovi koja već radi u berbernici.",
    },
    summary:
      "Online zakazivanje za frizerski salon ili berbernicu je javna strana na kojoj klijent sam bira frizera, uslugu i slobodan termin, uz kalendar za svakog frizera i automatske podsetnike. Adspire Digital iz Niša pravi takav sistem po meri salona — isti tip sistema radi kod berbernice Doctor Barber kao PWA sa klijentskim nalogom i admin kalendarom.",
    audience: ["Berbernice", "Frizerski saloni", "Muški i ženski saloni", "Saloni sa više stolica i smena"],
    pains: [
      {
        before: "Telefon zvoni dok su makaze u ruci. Ili prekidate klijenta, ili gubite novog.",
        after: "Termin se zakazuje sam, i uveče kad je salon zatvoren.",
      },
      {
        before: "Klijent hoće baš svog frizera, a vi tražite po svesci ko je slobodan.",
        after: "Svaki frizer ima svoj kalendar, klijent vidi samo njegove slobodne termine.",
      },
      {
        before: "Brada, šišanje i farbanje ne traju isto, pa se raspored raspadne do podne.",
        after: "Trajanje je upisano po usluzi i kalendar ne nudi termin koji ne može da stane.",
      },
      {
        before: "Neko ne dođe, stolica stoji prazna pola sata.",
        after: "Podsetnik ide automatski dan ranije, a otkazan termin se odmah vraća u ponudu.",
      },
    ],
    features: [
      { title: "Izbor frizera", body: "Klijent bira osobu ili „bilo ko slobodan“ — oba slučaja su česta i oba moraju da rade." },
      { title: "Trajanje po usluzi", body: "Šišanje, brada, paket, farbanje — svako sa svojim trajanjem i cenom." },
      { title: "Smene i pauze", body: "Radno vreme po frizeru, pauze i slobodni dani, uključujući izmenu istog jutra." },
      { title: "Stalni klijenti", body: "Opcioni nalog za one koji dolaze svake dve nedelje — ponovo zakazivanje u dva dodira." },
      { title: "Radi kao aplikacija", body: "PWA: klijent doda salon na početni ekran telefona, bez prodavnice aplikacija." },
      { title: "Upis sa telefona", body: "Poziv i dalje stiže — vi ga za pet sekundi upišete u isti kalendar." },
    ],
    proof: ["Doctor Barber", "Salon Srđan"],
    faq: [
      {
        q: "Da li klijent mora da izabere određenog frizera?",
        a: "Ne. Može da izabere osobu ili prvi slobodan termin kod bilo koga. Sistem to podešava po salonu — neki saloni žele da klijent uvek bira, neki ne.",
      },
      {
        q: "Koliko košta sistem za zakazivanje za berbernicu?",
        a: "Za custom razvoj raspon je uglavnom 2.500–6.000 €, a za manji salon sa jednostavnim pravilima pada na donji kraj. Za salon sa jednom stolicom i standardnim uslugama gotova platforma je često dovoljna — to kažemo otvoreno. Tačna cena ide u ponudu.",
      },
      {
        q: "Da li mora da se instalira aplikacija?",
        a: "Ne. Zakazivanje radi u pretraživaču telefona, a može da se doda na početni ekran kao aplikacija (PWA), kao kod Doctor Barbera.",
      },
      {
        q: "Šta sa klijentima koji i dalje zovu?",
        a: "Zovu kao i do sada. Vi termin upišete u isti kalendar iz panela, pa nema duplih termina između poziva i online zakazivanja.",
      },
    ],
  },
  {
    slug: "kozmeticki-saloni-i-estetske-klinike",
    navLabel: "Kozmetika i estetika",
    seo: {
      title: "Online zakazivanje za kozmetičke salone i estetske klinike",
      metaDescription:
        "Sistem za zakazivanje tretmana za kozmetičke salone i estetske klinike: trajanje po tretmanu, kabine i aparati, karton klijenta, kapare i podsetnici. Zakazivanje povezano sa evidencijom kao kod Dr Igića.",
      keywords: [
        "zakazivanje kozmetički salon",
        "online zakazivanje tretmana",
        "softver za estetsku kliniku",
        "sistem za zakazivanje beauty salon",
        "aplikacija za kozmetički salon",
        "zakazivanje estetska klinika",
      ],
    },
    hero: {
      eyebrow: "Online zakazivanje · beauty i estetika",
      title: "Tretmani zakazani, kartoni na mestu",
      lead:
        "Kozmetički salon ne zakazuje samo vreme, nego i kabinu, aparat i osobu obučenu za tretman. Sistem to zna pre nego što ponudi termin, a karton klijenta je vezan za svaki dolazak.",
    },
    summary:
      "Sistem za online zakazivanje za kozmetički salon ili estetsku kliniku povezuje termin sa trajanjem tretmana, kabinom ili aparatom, zaposlenim i kartonom klijenta, uz podsetnike i kaparu za skuplje tretmane. Adspire Digital pravi takve sisteme po meri; zakazivanje spojeno sa evidencijom pacijenata radi u estetskoj klinici Dr Igić.",
    audience: ["Kozmetički saloni", "Estetske klinike", "Saloni za nokte i depilaciju", "Spa i wellness centri"],
    pains: [
      {
        before: "Isti aparat je zakazan u dve kabine u isto vreme.",
        after: "Aparat i kabina su resurs u sistemu — zauzet resurs se ne nudi.",
      },
      {
        before: "Istorija tretmana i alergije su u svesci ili u nečijoj glavi.",
        after: "Karton klijenta je vezan za svaki termin: tretmani, beleške, fotografije pre i posle.",
      },
      {
        before: "Klijent ne dođe na tretman od sat i po, a termin je bio ceo blok.",
        after: "Za duge tretmane termin se potvrđuje tek posle kapare.",
      },
      {
        before: "Paket od deset tretmana se broji na papiru.",
        after: "Paket i preostali dolasci su u sistemu, i klijent i vi vidite isto stanje.",
      },
    ],
    features: [
      { title: "Kabine i aparati", body: "Resursi koji ograničavaju raspored, ne samo ljudi." },
      { title: "Karton klijenta", body: "Istorija, alergije, kontraindikacije i fotografije, sa pravima pristupa po zaposlenom." },
      { title: "Paketi i serije", body: "Serija tretmana u razmacima, sa brojem preostalih dolazaka." },
      { title: "Kapare", body: "Termin za skuplji tretman čeka uplatu pre potvrde." },
      { title: "Pripremno vreme", body: "Vreme za čišćenje kabine između dva klijenta ulazi u kalendar." },
      { title: "Podsetnici i priprema", body: "Poruka pre tretmana, uz uputstvo šta klijent treba da uradi ili izbegne." },
    ],
    proof: ["Dr Igić", "Doctor Barber"],
    faq: [
      {
        q: "Može li zakazivanje da se veže za karton klijenta?",
        a: "Da, i to je glavni razlog zašto klinike biraju sopstveni sistem. Kod Dr Igića termin i evidencija pacijenta nisu dva odvojena programa.",
      },
      {
        q: "Da li sistem zna da tretman traži određen aparat?",
        a: "Da. Aparat ili kabina se vode kao resurs, pa kalendar nudi samo termine u kojima su slobodni i osoba i oprema.",
      },
      {
        q: "Koliko košta sistem za kozmetički salon ili kliniku?",
        a: "Za custom razvoj raspon je uglavnom 2.500–6.000 €. Kartoni sa zdravstvenim podacima, paketi tretmana i kapare pomeraju cenu ka gornjem delu. Tačna cena ide u ponudu posle razgovora o opsegu.",
      },
      {
        q: "Gde se čuvaju podaci klijenata?",
        a: "U vašoj bazi, sa pristupom po ulozi zaposlenog. Kod i podaci su vaši i mogu da se izvezu u svakom trenutku.",
      },
    ],
  },
  {
    slug: "stomatoloske-i-medicinske-ordinacije",
    navLabel: "Ordinacije",
    seo: {
      title: "Online zakazivanje pregleda za stomatološke i medicinske ordinacije",
      metaDescription:
        "Sistem za online zakazivanje pregleda za privatne stomatološke i medicinske ordinacije: termini po lekaru, vrste pregleda, evidencija pacijenata, podsetnici i prava pristupa. Po meri ordinacije.",
      keywords: [
        "online zakazivanje pregleda",
        "zakazivanje stomatolog online",
        "softver za ordinaciju",
        "sistem za zakazivanje privatna ordinacija",
        "aplikacija za zakazivanje pacijenata",
        "zakazivanje termina ordinacija Niš",
      ],
    },
    hero: {
      eyebrow: "Online zakazivanje · ordinacije",
      title: "Pacijent zakazuje, sestra ne dežura na telefonu",
      lead:
        "Privatna ordinacija gubi najviše vremena na pozive koji su samo pitanje „imate li nešto sutra“. Pacijent to vidi sam, a vi dobijate raspored po lekaru i evidenciju vezanu za svaki pregled.",
    },
    summary:
      "Online zakazivanje za stomatološku ili privatnu medicinsku ordinaciju omogućava pacijentu da izabere vrstu pregleda, lekara i slobodan termin, dok ordinacija dobija kalendar po lekaru, evidenciju pacijenata sa pravima pristupa i automatske podsetnike. Adspire Digital pravi takve sisteme po meri; zakazivanje povezano sa evidencijom pacijenata radi u klinici Dr Igić.",
    audience: ["Stomatološke ordinacije", "Privatne medicinske ordinacije", "Fizikalna terapija", "Psiholozi i savetovališta"],
    pains: [
      {
        before: "Pola dana sestre ode na pozive za slobodne termine.",
        after: "Slobodni termini su javni, pacijent zakazuje sam, sestra potvrđuje ako treba.",
      },
      {
        before: "Kontrola posle šest meseci se zaboravi, pacijent se ne vrati.",
        after: "Sistem podseti pacijenta na kontrolu kad dođe vreme.",
      },
      {
        before: "Prvi pregled i intervencija se zakazuju u isti slot od pola sata.",
        after: "Svaka vrsta pregleda ima svoje trajanje i lekara koji je radi.",
      },
      {
        before: "Podaci o pacijentu su razbacani po fasciklama i Excelu.",
        after: "Evidencija je vezana za termin, sa pristupom samo onima kojima pripada.",
      },
    ],
    features: [
      { title: "Vrste pregleda", body: "Prvi pregled, kontrola, intervencija — svaka sa trajanjem i lekarom." },
      { title: "Raspored po lekaru", body: "Ordinacije, smene i dani kad lekar radi na drugoj lokaciji." },
      { title: "Evidencija pacijenata", body: "Istorija pregleda i beleške vezane za termin, sa pravima po ulozi." },
      { title: "Podsetnik za kontrolu", body: "Automatska poruka kad pacijentu ističe period do sledeće kontrole." },
      { title: "Potvrda termina", body: "Online zahtev može da ide na potvrdu pre nego što postane termin." },
      { title: "Dnevni pregled", body: "Ko dolazi danas, zašto i šta je rađeno prošli put — na jednom ekranu." },
    ],
    proof: ["Dr Igić", "Eduka"],
    faq: [
      {
        q: "Da li online zakazani termin mora da potvrdi ordinacija?",
        a: "Po vašem izboru. Neke ordinacije puštaju direktno zakazivanje za kontrole, a prve preglede i intervencije stavljaju na potvrdu.",
      },
      {
        q: "Kako se čuvaju zdravstveni podaci?",
        a: "U vašoj bazi, sa pristupom po ulozi — lekar, sestra, recepcija ne vide isto. Kod i podaci pripadaju ordinaciji. Zdravstveni podaci traže pažljivije podešavanje prava, i to ulazi u opseg od početka.",
      },
      {
        q: "Koliko košta sistem za zakazivanje za ordinaciju?",
        a: "Za custom razvoj raspon je uglavnom 2.500–6.000 €, u zavisnosti od broja lekara, vrsta pregleda i toga da li ide evidencija pacijenata. Tačna cena ide u ponudu.",
      },
      {
        q: "Mogu li pacijenti koji ne koriste internet i dalje da zovu?",
        a: "Da. Termin sa telefona se upisuje u isti kalendar, pa online i telefonsko zakazivanje nikad ne naprave dupli termin.",
      },
    ],
  },
  {
    slug: "tattoo-i-pirsing-studiji",
    navLabel: "Tattoo studiji",
    seo: {
      title: "Online zakazivanje i kapare za tattoo i pirsing studije",
      metaDescription:
        "Sistem za zakazivanje tetovaža: upit sa referentnim slikama, procena, kalendar sesija po umetniku, kapare pre potvrde i pregled naplate. Radi kod Dropz Tattoo studija.",
      keywords: [
        "zakazivanje tetovaže online",
        "sistem za tattoo studio",
        "kapara za tetovažu",
        "booking tattoo studio",
        "aplikacija za tattoo salon",
      ],
    },
    hero: {
      eyebrow: "Online zakazivanje · tattoo i pirsing",
      title: "Od skice do sesije, sa kaparom",
      lead:
        "Tetovaža se ne zakazuje kao šišanje. Prvo ide ideja i referenca, pa procena, pa kapara, pa jedna ili više sesija. Sistem prati taj tok umesto da ga gura u formu za termin od pola sata.",
    },
    summary:
      "Sistem za zakazivanje za tattoo studio prima upit sa opisom i referentnim slikama, omogućava procenu i termin sesije po umetniku i potvrđuje termin tek posle kapare, uz mesečni pregled naplate. Adspire Digital je takav sistem napravio za Dropz Tattoo studio.",
    audience: ["Tattoo studiji", "Pirsing studiji", "Samostalni tattoo umetnici", "Studiji sa gostujućim umetnicima"],
    pains: [
      {
        before: "Ideje i reference stižu u DM, pomešane sa porukama od prijatelja.",
        after: "Upit sa opisom, veličinom, mestom i slikama stiže na jedno mesto.",
      },
      {
        before: "Klijent rezerviše ceo dan i ne pojavi se.",
        after: "Sesija se potvrđuje tek kad kapara prođe.",
      },
      {
        before: "Veliki rad u tri sesije se prati po sećanju.",
        after: "Serija sesija je vezana za isti rad i istog klijenta.",
      },
      {
        before: "Na kraju meseca niko ne zna tačno koliko je naplaćeno.",
        after: "Kapare i uplate su u mesečnom pregledu.",
      },
    ],
    features: [
      { title: "Upit sa referencama", body: "Klijent šalje opis, veličinu, mesto na telu i slike pre termina." },
      { title: "Kalendar po umetniku", body: "Svaki umetnik svoj raspored, uključujući gostujuće." },
      { title: "Kapare", body: "Termin čeka uplatu, pravila povraćaja su upisana u sistem." },
      { title: "Više sesija", body: "Jedan rad, više termina, sa beleškama između." },
      { title: "Pregled naplate", body: "Kapare i uplate po mesecu i po umetniku." },
      { title: "Portfolio uz zakazivanje", body: "Radovi po stilu na istom sajtu na kom se zakazuje." },
    ],
    proof: ["Dropz Tattoo"],
    faq: [
      {
        q: "Može li klijent da pošalje referentne slike pre termina?",
        a: "Da. Upit ima polje za slike i opis, pa umetnik procenjuje rad pre nego što se termin zauzme — kao kod Dropz Tattoo studija.",
      },
      {
        q: "Kako radi kapara?",
        a: "Termin se rezerviše, a potvrđuje tek posle uplate. Rok i pravilo povraćaja kod otkazivanja su upisani u sistem, ne dogovaraju se svaki put.",
      },
      {
        q: "Koliko košta sistem za tattoo studio?",
        a: "Za custom razvoj raspon je uglavnom 2.500–6.000 €. Online naplata kapara i više umetnika pomeraju cenu gore. Tačna cena ide u ponudu.",
      },
    ],
  },
  {
    slug: "auto-servisi-i-vulkanizeri",
    navLabel: "Auto servisi",
    seo: {
      title: "Online zakazivanje servisa za auto servise i vulkanizere",
      metaDescription:
        "Sistem za online zakazivanje servisnih termina za auto servise, vulkanizere i perionice: vrsta usluge, radno mesto ili dizalica, podsetnici za sezonsku zamenu guma i admin panel.",
      keywords: [
        "online zakazivanje auto servis",
        "zakazivanje vulkanizer",
        "zakazivanje zamene guma",
        "softver za auto servis",
        "sistem za zakazivanje servisa",
      ],
    },
    hero: {
      eyebrow: "Online zakazivanje · auto servisi",
      title: "Servisni termin umesto reda ispred vrata",
      lead:
        "U sezoni guma telefon ne prestaje, a red se napravi pre otvaranja. Kad se prijem vozila zakazuje unapred, znate koliko dizalica i ljudi treba svakog sata.",
    },
    summary:
      "Online zakazivanje za auto servis ili vulkanizera omogućava vozaču da izabere uslugu i slobodan termin, a servisu da raspored vodi po dizalici ili radnom mestu, uz podsetnike za sezonsku zamenu guma i redovan servis. Adspire Digital je napravio sajt i admin panel sa zakazivanjem servisnih termina za Auto Delić.",
    audience: ["Auto servisi", "Vulkanizeri", "Perionice i detailing", "Tehnički pregledi"],
    pains: [
      {
        before: "U sezoni guma telefon zvoni ceo dan, a u radionici niko nema slobodne ruke.",
        after: "Vozač bira termin sam, a vi vidite ceo dan unapred.",
      },
      {
        before: "Red ispred servisa se napravi pre otvaranja, pa pola ljudi ode.",
        after: "Prijem vozila je raspoređen po satima.",
      },
      {
        before: "Mali i veliki servis dobiju isti termin.",
        after: "Svaka usluga ima trajanje i radno mesto koje zauzima.",
      },
      {
        before: "Klijent zaboravi na zamenu guma dok ne padne sneg.",
        after: "Sistem ga podseti na vreme, pre gužve.",
      },
    ],
    features: [
      { title: "Usluge sa trajanjem", body: "Zamena guma, mali servis, dijagnostika, pranje — svaka sa svojim vremenom." },
      { title: "Dizalice i radna mesta", body: "Raspored po mestu u radionici, ne samo po majstoru." },
      { title: "Podaci o vozilu", body: "Marka, model i registracija uz termin, istorija servisa po vozilu." },
      { title: "Sezonski podsetnici", body: "Poruka za zamenu guma i redovan servis kad dođe vreme." },
      { title: "Hotel za gume", body: "Evidencija uskladištenih guma vezana za klijenta, ako je nudite." },
      { title: "Dnevni plan radionice", body: "Ko dolazi, sa kojim vozilom i zbog čega — na jednom ekranu." },
    ],
    proof: ["Auto Delić", "Prevoz Kop"],
    faq: [
      {
        q: "Da li vozač mora da ostavi podatke o vozilu?",
        a: "Po vašem izboru. Obično su dovoljni ime, telefon, usluga i registracija; ostalo se dopuni na prijemu.",
      },
      {
        q: "Može li sistem da šalje podsetnik za zamenu guma?",
        a: "Da. Podsetnik ide svima koji su prošle sezone menjali gume kod vas, pre nego što nastane gužva.",
      },
      {
        q: "Koliko košta sistem za zakazivanje za auto servis?",
        a: "Za custom razvoj raspon je uglavnom 2.500–6.000 €, u zavisnosti od broja radnih mesta, istorije vozila i evidencije guma. Tačna cena ide u ponudu.",
      },
    ],
  },
];

export function getBookingIndustryPage(slug: string) {
  return bookingIndustryPages.find((page) => page.slug === slug);
}
