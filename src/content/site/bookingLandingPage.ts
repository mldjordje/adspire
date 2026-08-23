/**
 * Copy for /online-zakazivanje-za-salone-i-klinike.
 *
 * This route outgrew the generic guide layout: it is the page ads point at, so
 * it gets its own sections, its own proof rail and its own chrome. Everything
 * written here is content only — the layout lives in BookingLandingV4.
 *
 * Rule for this file: every claim is either checkable on a live client site or
 * phrased as what we do, never as a number nobody measured.
 */

export type BookingStat = { value: string; label: string };
export type BookingNavItem = { id: string; label: string };

export const bookingSeo = {
  path: "/online-zakazivanje-za-salone-i-klinike",
  title:
    "Online zakazivanje za salone, klinike i servise — sistem koji skida termine sa telefona",
  metaDescription:
    "Sistem za online zakazivanje termina za frizerske i kozmetičke salone, klinike, ordinacije i servise: kalendar po zaposlenom, automatski podsetnici, kapare i admin panel. Osnova je već u produkciji — implementacija za oko dve nedelje.",
  keywords: [
    "online zakazivanje termina",
    "sistem za zakazivanje",
    "aplikacija za zakazivanje salon",
    "zakazivanje termina frizerski salon",
    "softver za kliniku zakazivanje",
    "zakazivanje servisa",
    "booking sistem Srbija",
  ],
} as const;

export const bookingHero = {
  eyebrow: "Online zakazivanje",
  title: "Zakazivanje umesto telefona",
  lead:
    "Dok se raspored drži u svesci i u dva telefona, vi ste jedina baza podataka u firmi. Ovde piše šta sistem zakazivanja preuzima umesto vas, kako izgleda kod ljudi kojima već radi i koliko traje da proradi kod vas.",
  primary: { label: "Pošaljite upit za sistem", href: "/upit/brzo?usluga=sistemi-za-zakazivanje" },
  secondary: { label: "Vidite gotove sisteme", href: "#gotovi-sistemi" },
  stats: [
    { value: "13", label: "živih klijentskih sistema" },
    { value: "2", label: "nedelje do puštanja u rad" },
    { value: "24/7", label: "termin može da se zakaže" },
    { value: "0", label: "mesečnih licenci po zaposlenom" },
  ] as BookingStat[],
};

/**
 * Order is the reading order for someone who arrived from an ad after
 * searching for a booking system: they already want the thing, so proof that
 * it exists and what it costs come before the long "how it could go wrong"
 * material. The section markup in BookingLandingV4 follows this list.
 */
export const bookingNav: BookingNavItem[] = [
  { id: "dan-danas", label: "Kako sad izgleda" },
  { id: "gotovi-sistemi", label: "Gotovi sistemi" },
  { id: "sta-preuzima", label: "Šta preuzima" },
  { id: "tok", label: "Rok i tok" },
  { id: "cena", label: "Cena" },
  { id: "platforma-ili-sistem", label: "Platforma ili sistem" },
  { id: "pravila", label: "Vaša pravila" },
  { id: "greske", label: "Greške" },
  { id: "pitanja", label: "Pitanja" },
];

/** Left column is the day as it is now, right column the same day with a system. */
export const bookingContrast = {
  eyebrow: "Pre i posle",
  title: "Isti dan, dva rasporeda",
  lead:
    "Nijedna od ovih stavki nije izmišljena zbog teksta — to su stvari koje se ponove u svakom razgovoru sa salonom, ordinacijom ili servisom.",
  beforeTitle: "Danas",
  afterTitle: "Sa sistemom",
  rows: [
    {
      before: "Zvoni tokom tretmana. Ili prekidate posao, ili propuštate termin.",
      after: "Klijent bira slobodan termin sam, vi vidite potvrdu kad završite.",
    },
    {
      before: "Poruke stižu na tri mesta — Instagram, Viber, poziv. Nešto se izgubi.",
      after: "Sve zakazivanje ulazi u isti kalendar, bez obzira odakle je krenulo.",
    },
    {
      before: "Dupli termin se otkrije tek kad oboje dođu.",
      after: "Zauzet slot se ne nudi. Duplog termina nema jer ne postoji način da nastane.",
    },
    {
      before: "Nedolasci se ne broje i ne naplaćuju.",
      after: "Podsetnik ide sam, a za skuplje tretmane može i kapara pre potvrde.",
    },
    {
      before: "Ne znate koja usluga najviše puni raspored ni koji dan je najslabiji.",
      after: "Vidi se šta se traži, kod koga i u koje vreme — jer se konačno beleži.",
    },
    {
      before: "Kad vas nema, niko ne zna šta je zakazano.",
      after: "Raspored je na telefonu svakom zaposlenom, sa pravima koja mu vi date.",
    },
  ],
};

export const bookingCapabilities = {
  eyebrow: "Šta ulazi u sistem",
  title: "Devet stvari koje prestanete da radite ručno",
  lead:
    "Ovo je osnova koju već imamo napisanu. Ne krećemo od prazne fascikle, nego od koda koji radi kod berbernice, klinike i servisa — pa ga podešavamo vašim uslugama.",
  items: [
    {
      title: "Javna strana za zakazivanje",
      body: "Usluga, osoba, datum, termin, potvrda. Bez registracije, bez šest koraka, radi na telefonu jer se odatle i zakazuje.",
    },
    {
      title: "Kalendar po zaposlenom",
      body: "Svaki radnik vidi svoj dan, vi vidite ceo salon. Dnevni, nedeljni i pregled po osobi.",
    },
    {
      title: "Podsetnici koji seku nedolaske",
      body: "Automatska poruka dan ranije i sat pre. Najjeftinija stavka u celom sistemu, a jedina koja direktno vraća novac.",
    },
    {
      title: "Kapare i avansi",
      body: "Za duge i skupe tretmane termin se potvrđuje tek posle uplate. Dropz tako radi sa tetovažama.",
    },
    {
      title: "Karton klijenta",
      body: "Istorija dolazaka, tretmani, beleške, alergije, fotografije pre i posle — koliko vam struka traži.",
    },
    {
      title: "Pravila otkazivanja",
      body: "Rok, ko sme da otkaže, šta se dešava sa kaparom. Napisano u sistemu, ne u glavi.",
    },
    {
      title: "Više lokacija i smene",
      body: "Svaka lokacija svoj kalendar i svoje ljude, sa smenama, pauzama i slobodnim danima.",
    },
    {
      title: "Admin panel bez obuke",
      body: "Izmena cene, dodavanje usluge, zatvaranje dana — vi to radite sami, ne šaljete nama mejl.",
    },
    {
      title: "Izveštaji na jednoj strani",
      body: "Popunjenost, najtraženija usluga, otkazivanja, promet po zaposlenom. Brojke koje do sada nisu ni postojale.",
    },
  ],
};

export const bookingProof = {
  eyebrow: "Dokaz",
  title: "Gotovi sistemi",
  lead:
    "Sve navedeno je živo i može da se otvori. Nema mokapa ni koncepata — to su sajtovi i paneli koji su nekome danas u upotrebi.",
  items: [
    {
      name: "Doctor Barber",
      sector: "Berbernica · Niš",
      note: "Javni sajt, online zakazivanje, klijentski nalog, admin kalendar i notifikacije. Radi kao PWA, pa se sa telefona otvara kao aplikacija.",
      href: "/our-projects/doctor-barber-online-booking-sistem",
      cta: "Studija slučaja",
    },
    {
      name: "Dr Igić",
      sector: "Estetska klinika",
      note: "Zakazivanje spojeno sa evidencijom pacijenata — termin i karton nisu dva odvojena sveta. Najveći sistem u portfoliju.",
      href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
      cta: "Studija slučaja",
    },
    {
      name: "Prevoz Kop",
      sector: "Betonska baza · Niš",
      note: "Najrazuđeniji admin u portfoliju: upiti i ponude, proizvodi, radnici, vozila i termini isporuke betona. Dokaz da zakazivanje ne mora da bude stolica u salonu — može biti mikser u devet ujutru.",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      cta: "Studija slučaja",
    },
    {
      name: "Toza AI",
      sector: "AI video studio",
      note: "Paketi, naplata, sati u nalogu, termini i fakture u jednom sistemu. Klijent kupi sate za rad jedan na jedan, pa ih zakazuje iz svog naloga — termin i naplata su ista stvar, ne dve.",
      href: "/our-projects/toza-ai-platforma-za-ai-video-studio",
      cta: "Studija slučaja",
    },
    {
      name: "Stan na dan Niš",
      sector: "Izdavanje apartmana · Niš",
      note: "Rezervacija po datumima umesto po satu: dolazak, odlazak, broj gostiju i provera dostupnosti, uz self check-in. Isti kalendar, druga jedinica mere — noć umesto pola sata.",
      href: "https://nis-apartmani.rs",
      cta: "nis-apartmani.rs",
      external: true,
    },
    {
      name: "Dropz Tattoo",
      sector: "Tattoo studio",
      note: "WebGL naslovna, upiti sa referentnim slikama, kalendar termina, kapare i mesečni pregled naplate. Zakazivanje tetovaže ne liči na zakazivanje šišanja — i sistem to zna.",
      href: "/our-projects/dropz-tattoo-sajt-i-sistem-zakazivanja",
      cta: "Studija slučaja",
    },
    {
      name: "Auto Delić",
      sector: "Auto servis",
      note: "Sajt i admin panel za servis: upiti i zakazivanje servisnih termina, pa se prijem vozila planira unapred umesto da se gomila pred vratima.",
      href: "https://autodelic.com",
      cta: "autodelic.com",
      external: true,
    },
    {
      name: "Salon Srđan",
      sector: "Frizerski salon",
      note: "Salonski sajt sa uslugama, cenovnikom i kontaktom kao ulazom u termin — primer lakše varijante, za salon koji ne želi ceo panel odmah.",
      href: "https://frizerskisalonsrdjan.com",
      cta: "frizerskisalonsrdjan.com",
      external: true,
    },
    {
      name: "Eduka",
      sector: "Stomatološka edukacija",
      note: "Prijave na kurseve i polaznici na jednom mestu. Ista logika kao termin: ograničen broj mesta, potvrda i evidencija ko je došao.",
      href: "https://eduka.co.rs",
      cta: "eduka.co.rs",
      external: true,
    },
  ],
};

export const bookingRules = {
  eyebrow: "Podešavanje",
  title: "Sistem prvo mora da nauči vaša pravila",
  lead:
    "Ovde padaju gotove platforme. One pretpostave da svaka usluga traje isto i da su svi zaposleni zamenjivi, a onda se vi prilagođavate softveru umesto obrnuto.",
  items: [
    "Trajanje po usluzi — šišanje nije isto što i tretman od sat i po, a kalendar to mora da zna pre nego što ponudi termin.",
    "Ko radi šta. Nije svaki zaposleni obučen za svaku uslugu, a klijent često traži tačno određenu osobu.",
    "Pauze, smene i slobodni dani, uključujući izmenu u poslednjem trenutku kad neko ode kod lekara.",
    "Pripremno vreme između termina, ako sto, stolica ili oprema moraju da se srede.",
    "Sezona i špic. Subota ujutru nije isti raspored kao utorak u dva.",
    "Više lokacija, ako ih ima — svaka sa svojim kalendarom, cenama i ljudima.",
  ],
};

export const bookingProcess = {
  eyebrow: "Kako ide posao",
  title: "Od prvog razgovora do prvog online termina",
  lead:
    "Oko dve nedelje za standardan sistem. Ne zato što se žuri, nego zato što se osnova ne piše iznova — prilagođava se.",
  steps: [
    {
      when: "Dan 1",
      title: "Razgovor o rasporedu",
      body: "Prolazimo kroz vaše usluge, ljude i pravila. Sat vremena, bez obaveze i bez prezentacije.",
    },
    {
      when: "Dan 2–3",
      title: "Ponuda sa fiksnom cenom",
      body: "Tačan opseg, cena i rok, napisano. Cena se ne menja usput ako se opseg ne menja.",
    },
    {
      when: "Nedelja 1",
      title: "Postavka i vaš brend",
      body: "Usluge, trajanja, ljudi, smene, boje i tekstovi. Vidite sistem na svom sadržaju, ne na demo podacima.",
    },
    {
      when: "Nedelja 2",
      title: "Probni rad",
      body: "Zaposleni ulaze u panel, prolazimo par dana paralelno sa starim načinom dok ne bude očigledno da radi.",
    },
    {
      when: "Posle",
      title: "Puštanje i podrška",
      body: "Sistem ide uživo, mi ostajemo na vezi. Održavanje je opciono, a ne uslov da vam vaš sistem radi.",
    },
  ],
};

export const bookingCompare = {
  eyebrow: "Odluka",
  title: "Gotova platforma ili vaš sistem",
  lead:
    "Poštena verzija: gotova platforma je za mnoge sasvim dovoljna. Ne prodajemo custom onome kome treba pretplata od dvadeset evra.",
  columns: {
    saas: "Gotova platforma",
    custom: "Vaš sistem",
  },
  rows: [
    { label: "Start", saas: "Isti dan, nalog i kartica.", custom: "Oko dve nedelje sa podešavanjem." },
    { label: "Trošak", saas: "Mesečno, obično po zaposlenom — raste kad raste tim.", custom: "Jednokratno, pa održavanje po želji." },
    { label: "Pravila zakazivanja", saas: "Njihova. Vi se uklapate.", custom: "Vaša. Sistem se uklapa." },
    { label: "Podaci o klijentima", saas: "Na njihovom serveru, po njihovim uslovima.", custom: "Vaša baza, vaš izvoz, vaše pravo." },
    { label: "Povezivanje", saas: "Samo ono što nude preko integracija.", custom: "Karton, naplata, zalihe, izveštaji — što god treba." },
    { label: "Izgled", saas: "Njihov brend uz vaš logo.", custom: "Vaš brend, bez tuđeg potpisa u dnu." },
    { label: "Ako ugase servis", saas: "Selite se i gubite istoriju.", custom: "Kod i baza su vaši, ne selite se nikuda." },
  ],
  verdict:
    "Kratko: jedna lokacija, jednostavne usluge i standardna pravila — uzmite platformu. Posebna pravila, više lokacija, podaci koji moraju da ostanu vaši ili zakazivanje koje mora da se veže za naplatu i kartone — tu se sopstveni sistem isplati brzo.",
};

export const bookingPricing = {
  eyebrow: "Cena",
  title: "Šta pomera cenu gore",
  lead:
    "Za custom razvoj raspon je uglavnom 2.500–6.000 €. Gde ćete pasti u tom rasponu zavisi od nekoliko stvari, i o njima se priča pre ponude, ne posle.",
  drivers: [
    { title: "Broj zaposlenih i lokacija", body: "Jedan kalendar i deset kalendara nisu isti posao." },
    { title: "Složenost pravila", body: "Pripremno vreme, resursi, paketi tretmana i serije termina dodaju logiku." },
    { title: "Naplata", body: "Kapare, online plaćanje i fakture su zaseban sloj." },
    { title: "Kartoni i istorija", body: "Zdravstveni podaci traže više pažnje oko prava pristupa." },
    { title: "Preseljenje sa starog", body: "Prenos postojeće baze klijenata i termina." },
  ],
  note:
    "Tačna cifra ide u ponudu, vama, sa opsegom uz nju. Detaljan pregled šta diže cenu je na stranici o ceni izrade.",
  linkLabel: "Koliko košta izrada sajta i aplikacije",
  linkHref: "/cena-izrade-sajta",
};

export const bookingMistakes = {
  eyebrow: "Iz iskustva",
  title: "Četiri načina da uvođenje propadne",
  lead: "Sve četiri smo videli. Ne košta ništa da se izbegnu ako se zna unapred.",
  items: [
    {
      title: "Sve usluge odjednom",
      body: "Katalog od četrdeset stavki prvog dana zbuni i klijenta i zaposlene. Krenite sa dve-tri najtraženije i širite kad se ustali.",
    },
    {
      title: "Telefon ostaje ravnopravan zauvek",
      body: "Ako se termini i dalje upisuju u svesku, kalendar opet nije jedan izvor istine. Telefon ostaje, ali termin sa telefona ulazi u sistem odmah.",
    },
    {
      title: "Registracija pre zakazivanja",
      body: "Svaki dodatni korak pre potvrde obara broj zakazivanja. Ime, telefon i termin su dovoljni; nalog neka bude ponuda, ne uslov.",
    },
    {
      title: "Nema otkaznog roka",
      body: "Bez pravila o otkazivanju sistem samo brže proizvodi haos. Rok i posledica se definišu pre puštanja, ne posle prve svađe.",
    },
  ],
};

export const bookingResistance = {
  eyebrow: "Ljudi",
  title: "Zaposleni neće da pređu. Šta onda",
  body: [
    "Otpor skoro nikad nije prema tehnologiji, nego prema tome što novi način traži više klikova nego sveska. To je opravdano i rešava se redosledom.",
    "Prvo se digitalizuje ono što njima olakšava dan — sopstveni raspored na telefonu, bez zvanja da pitaju šta je zakazano za sutra. Kad to proradi nedelju dana, ostalo ide bez rasprave. Obuka je pola sata, a ne kurs.",
  ],
};

export const bookingFaq = {
  eyebrow: "Pitanja",
  title: "Ono što nas pitaju pre nego što se odluče",
  items: [
    {
      q: "Koliko košta sistem za online zakazivanje?",
      a: "Za custom razvoj raspon je uglavnom 2.500–6.000 €, u zavisnosti od pravila zakazivanja, broja zaposlenih i lokacija, i toga da li se povezuje sa naplatom ili evidencijom klijenata. Tačna cena ide u ponudu posle razgovora o opsegu.",
    },
    {
      q: "Koliko traje implementacija?",
      a: "Oko dve nedelje za standardan sistem. Osnova je već u produkciji kod Doctor Barbera, Dr Igića i Dropz-a — prilagođava se vašim uslugama, terminima i brendu, ne piše se od nule.",
    },
    {
      q: "Da li klijent mora da pravi nalog da bi zakazao?",
      a: "Ne, i bolje je da ne mora. Ime, telefon i izbor termina su dovoljni. Nalog može da bude opcion za one koji dolaze često, jer njima štedi vreme — ali kao uslov samo obara broj zakazivanja.",
    },
    {
      q: "Šta sa klijentima koji ne koriste internet?",
      a: "Zovu kao i do sada, a vi im upišete termin u isti kalendar iz panela. Poenta nije da se telefon ukine, nego da postoji jedno mesto na kom piše istina o rasporedu.",
    },
    {
      q: "Da li mogu da naplatim kaparu unapred?",
      a: "Da. Termin se rezerviše, a potvrđuje tek kad uplata prođe. Ima smisla za duge i skupe tretmane; za šišanje od dvadeset minuta je više smetnja nego korist.",
    },
    {
      q: "Da li sistem šalje SMS ili Viber?",
      a: "Podržava mejl, SMS i Viber. Razlika je u ceni poruke i u tome koga zovete — mlađa publika čita Viber, stariji klijenti pouzdanije otvaraju SMS.",
    },
    {
      q: "Ko je vlasnik koda i podataka?",
      a: "Vi. Baza je vaša, kod je vaš, izvoz je vaš. Nema zaključavanja u kom vam sopstvena istorija klijenata ostane kod nas.",
    },
    {
      q: "Radi li na telefonu?",
      a: "Prvo na telefonu. Većina zakazivanja dolazi sa mobilnog, uveče, van radnog vremena — pa se javna strana i pravi za taj slučaj, a ne za desktop.",
    },
    {
      q: "Šta ako već imam sajt?",
      a: "Zakazivanje se dodaje na postojeći sajt ako je tehnički zdrav. Ako nije, kažemo to otvoreno pre nego što se posao započne.",
    },
  ],
};

export const bookingFinalCta = {
  eyebrow: "Sledeći korak",
  title: "Recite kako danas zakazujete termine",
  body:
    "Pet polja, minut posla. Odgovor stiže od Đorđa, ne od šablona — sa procenom opsega i cene, ili sa poštenim „ovo vam ne treba, uzmite gotovu platformu“.",
  primary: { label: "Pošaljite upit", href: "/upit/brzo?usluga=sistemi-za-zakazivanje" },
  secondary: { label: "Pun brief za sistem", href: "/upit" },
  reassure: "Bez naplate za razgovor. Bez pretplate na poziv.",
};

export const bookingRelated = [
  { label: "Rezervacioni sistemi u Nišu", href: "/rezervacioni-sistemi-nis" },
  { label: "Koliko košta izrada sajta", href: "/cena-izrade-sajta" },
  { label: "Interni softver umesto Excel tabela", href: "/interni-softver-umesto-excel-tabela" },
  { label: "Usluga: sistemi za zakazivanje", href: "/our-services/sistemi-za-zakazivanje" },
  { label: "Svi vodiči", href: "/vodici" },
];
