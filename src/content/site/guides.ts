/**
 * Problem-intent landing pages.
 *
 * The service pages answer "who does X" — someone who already knows the name of
 * what they need. These answer the sentence a buyer types before they know that
 * name ("ne mogu da stignem da javljam termine", "sajt mi ne donosi ništa").
 * That query family is where the traffic is and where Adspire currently has no
 * page at all.
 *
 * A guide is pure data. Adding one means appending an entry here and creating a
 * four-line route that renders <GuideV4 guide={...} /> — no new component.
 */

export type GuideSection = {
  heading: string;
  /** Paragraphs. Rendered before the bullets. */
  body?: string[];
  bullets?: string[];
};

export type GuideProof = {
  label: string;
  href: string;
  note: string;
};

export type Guide = {
  /** Top-level Serbian slug, e.g. "/online-zakazivanje-za-salone-i-klinike". */
  path: string;
  eyebrow: string;
  /** <title> — written for the SERP, not for the page. */
  title: string;
  metaDescription: string;
  h1: string;
  lead: string;
  keywords: string[];
  sections: GuideSection[];
  proofHeading?: string;
  proof?: GuideProof[];
  faqHeading: string;
  faq: { q: string; a: string }[];
  cta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const bookingGuide: Guide = {
  path: "/online-zakazivanje-za-salone-i-klinike",
  eyebrow: "Zakazivanje",
  title: "Online zakazivanje za salone i klinike — kako izgleda sistem koji stvarno smanji telefon",
  metaDescription:
    "Kako radi sistem za online zakazivanje termina za frizerske i kozmetičke salone, klinike i servise: kalendar, podsetnici, više zaposlenih i lokacija, i šta se realno promeni u dnevnom radu.",
  h1: "Online zakazivanje za salone i klinike",
  lead:
    "Ako se termini i dalje dogovaraju preko poziva, poruka i sveske, problem nije u organizaciji nego u tome što je jedan čovek jedina baza podataka. Ovde piše šta sistem za zakazivanje konkretno preuzima, gde se najviše dobija i gde se najčešće greši pri uvođenju.",
  keywords: [
    "online zakazivanje termina",
    "sistem za zakazivanje",
    "aplikacija za zakazivanje salon",
    "zakazivanje termina frizerski salon",
    "softver za kliniku zakazivanje",
    "booking sistem",
  ],
  sections: [
    {
      heading: "Šta se realno menja",
      bullets: [
        "Termini se zakazuju i van radnog vremena. Najveći deo online zakazivanja se dešava uveče, kada niko ne javlja na telefon.",
        "Nema duplih termina. Kalendar je jedan izvor istine, a ne dogovor između sveske i dva telefona.",
        "Podsetnik smanjuje nedolaske. Automatska poruka dan ranije je najjeftinija stvar koja direktno vraća novac.",
        "Vidi se šta se traži. Koja usluga, koji termin, koji zaposleni — podaci koji do sada nisu ni postojali.",
      ],
    },
    {
      heading: "Šta sistem mora da zna o vašem poslu",
      body: [
        "Ovo je deo koji određuje da li će sistem raditi ili će vam smetati. Gotova rešenja padaju upravo ovde — pretpostave da svaka usluga traje isto i da su svi zaposleni zamenjivi.",
      ],
      bullets: [
        "Trajanje po usluzi — šišanje nije isto što i tretman od sat i po.",
        "Ko radi šta. Nije svaki zaposleni obučen za svaku uslugu, i klijent često traži tačno određenu osobu.",
        "Pauze, smene i slobodni dani, uključujući izmene u poslednjem trenutku.",
        "Pripremno vreme između termina, ako prostor ili oprema moraju da se srede.",
        "Više lokacija, ako ih ima — svaka sa svojim kalendarom i svojim ljudima.",
      ],
    },
    {
      heading: "Najčešće greške pri uvođenju",
      bullets: [
        "Puštanje svih usluga odjednom. Bolje je krenuti sa dve-tri najtraženije i proširiti kada se ustali.",
        "Ostavljanje telefona kao ravnopravnog kanala zauvek. Ako se termini i dalje upisuju ručno, kalendar opet nije jedan izvor istine.",
        "Traženje registracije pre zakazivanja. Svaki dodatni korak pre potvrde termina obara broj zakazivanja.",
        "Zaboravljen otkazni rok. Bez pravila o otkazivanju, sistem samo ubrza haos umesto da ga smanji.",
      ],
    },
    {
      heading: "Gotovo rešenje ili sopstveni sistem",
      body: [
        "Gotove platforme za zakazivanje su brze i jeftine na startu i sasvim su dobar izbor ako je posao standardan — jedna lokacija, jednostavne usluge, bez posebnih pravila. Plaća se mesečno po zaposlenom i radi se po njihovim pravilima.",
        "Sopstveni sistem ima smisla kada pravila zakazivanja ne staju u tuđi model, kada podaci o klijentima treba da ostanu vaši, ili kada zakazivanje mora da se poveže sa nečim drugim — kartonom pacijenta, naplatom, zalihama, izveštajima. Tada je jednokratno ulaganje umesto pretplate koja raste sa timom.",
      ],
    },
  ],
  proofHeading: "Rađeno u produkciji",
  proof: [
    {
      label: "Doctor Barber",
      href: "/our-projects/doctor-barber-online-booking-sistem",
      note: "Online booking sistem za berbernicu — termini, zaposleni, potvrde.",
    },
    {
      label: "Dr Igić",
      href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
      note: "Web aplikacija za estetske klinike — zakazivanje spojeno sa evidencijom pacijenata.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta sistem za online zakazivanje?",
      a: "Za custom razvoj raspon je uglavnom 2.500–6.000 €, u zavisnosti od pravila zakazivanja, broja zaposlenih i lokacija, i toga da li se povezuje sa naplatom ili evidencijom klijenata. Detaljan pregled šta diže cenu je na stranici o ceni izrade sajta.",
    },
    {
      q: "Da li klijent mora da pravi nalog da bi zakazao?",
      a: "Ne, i bolje je da ne mora. Svaki korak pre potvrde termina smanjuje broj zakazivanja. Ime, telefon i izbor termina su dovoljni; nalog može da bude opcion za one koji često dolaze.",
    },
    {
      q: "Šta ako zaposleni ne žele da pređu na sistem?",
      a: "Najčešći razlog otpora je što sistem traži više klikova nego sveska. Zato se prvo digitalizuje ono što im olakšava dan — pregled sopstvenog rasporeda na telefonu — a tek onda ostalo.",
    },
    {
      q: "Koliko traje uvođenje?",
      a: "Osnovni sistem sa kalendarom i podsetnicima obično 3–6 nedelja. Duže traje kada postoje smene, više lokacija ili integracija sa postojećom evidencijom.",
    },
    {
      q: "Da li podsetnici idu SMS-om ili mejlom?",
      a: "Oba su moguća; u praksi SMS i Viber/WhatsApp imaju znatno veću stopu čitanja od mejla za podsetnik na termin. SMS ima trošak po poruci, pa se obično kombinuje.",
    },
  ],
  cta: { label: "Opiši kako zakazuješ sada", href: "/upit" },
  secondaryCta: { label: "Usluga: sistemi za zakazivanje", href: "/our-services/sistemi-za-zakazivanje" },
};

const noLeadsGuide: Guide = {
  path: "/sajt-ne-donosi-upite",
  eyebrow: "Dijagnostika",
  title: "Sajt ne donosi upite — kako da nađeš gde tačno pada",
  metaDescription:
    "Sajt postoji, izgleda uredno, a upita nema. Redom: da li uopšte ima posetilaca, da li dolaze pravi ljudi, i da li stranica traži akciju. Kako da proveriš svaki korak sam.",
  h1: "Sajt ne donosi upite. Gde tačno pada?",
  lead:
    "„Sajt ne radi ništa“ je uvek jedan od tri različita problema, i leče se različito. Ili nema posetilaca, ili dolaze pogrešni, ili dolaze pravi ali stranica ne traži ništa od njih. Redosled provere je bitan, jer redizajn ne rešava prva dva.",
  keywords: [
    "sajt ne donosi upite",
    "sajt nema posetilaca",
    "zašto sajt ne radi",
    "kako da sajt donosi klijente",
    "povećanje konverzija sajt",
    "sajt bez rezultata",
  ],
  sections: [
    {
      heading: "Korak 1 — ima li uopšte posetilaca",
      body: [
        "Bez analitike sve ostalo je nagađanje. Otvorite Google Analytics ili Search Console i pogledajte broj poseta u poslednjih 30 dana. Ako je ispod nekoliko desetina dnevno, problem nije u sajtu nego u tome što ga niko ne vidi — i redizajn neće promeniti ništa.",
      ],
      bullets: [
        "Nema analitike uopšte → to je prvi posao, pre svake izmene.",
        "Ispod ~10 poseta dnevno → problem je vidljivost, ne stranica.",
        "Posete ima, ali skoro sve su direktne ili sa društvenih mreža → ne postojite u pretrazi.",
        "Search Console pokazuje impresije bez klikova → pojavljujete se, ali naslov i opis ne ubeđuju.",
      ],
    },
    {
      heading: "Korak 2 — dolaze li pravi ljudi",
      body: [
        "Posete same po sebi ne znače ništa. Bitno je za šta ste pronađeni. Ako vas nalaze po imenu firme, to su ljudi koji su vas već znali — sajt tu nije doveo nikoga novog, samo je potvrdio da postojite.",
      ],
      bullets: [
        "U Search Console → Performance → Queries pogledajte po kojim upitima dolazite.",
        "Ako su svi upiti ime firme, nemate nijednu stranicu koja hvata upit kupca koji vas ne zna.",
        "Kupac ne traži „digitalna transformacija“ — traži „koliko košta“, „ko radi“, „kako da“.",
        "Za svaku uslugu koju prodajete treba jedna stranica pisana rečima kojima kupac opisuje svoj problem.",
      ],
    },
    {
      heading: "Korak 3 — traži li stranica išta",
      body: [
        "Ako prva dva koraka izgledaju dobro a upita i dalje nema, tek onda je problem u stranici. Najčešće nije u dizajnu nego u tome što posetilac ne zna šta se od njega očekuje niti zašto bi verovao.",
      ],
      bullets: [
        "Jedna jasna akcija po stranici. Tri ravnopravna dugmeta znače nijedno.",
        "Forma koja traži pet polja umesto dvanaest. Svako dodatno polje je izgubljeni deo upita.",
        "Dokaz iznad obećanja — konkretan posao, konkretan rezultat, ime klijenta.",
        "Odgovor na cenu. Stranica koja ćuti o ceni gubi ljude koji ne žele da zovu da bi to saznali.",
        "Brzina učitavanja na telefonu. Većina saobraćaja je mobilna, a spor sajt gubi posetioca pre nego što išta pročita.",
      ],
    },
    {
      heading: "Čest slučaj: redizajn koji je obrisao rezultate",
      body: [
        "Ako je sajt nedavno menjan i posete su pale, prvo proverite da li stare adrese i dalje rade. Kada se sajt prepravi a stare adrese ostanu bez preusmerenja, sve što je Google godinama indeksirao odjednom vraća grešku — i pozicije nestaju bez ijedne druge promene.",
        "Provera je jednostavna: u Search Console → Pages pogledajte broj stranica sa greškom 404. Ako ih ima, svaka od njih je adresa koja je nekada radila i koju treba preusmeriti na odgovarajuću novu.",
      ],
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko treba da čekam da sajt počne da donosi upite?",
      a: "Za novu stranicu u pretrazi realno 3–6 meseci do stabilnih pozicija, i to samo ako postoji sadržaj koji odgovara na upite kupaca. Plaćene kampanje daju rezultat odmah, ali prestaju kada prestane budžet.",
    },
    {
      q: "Da li mi treba redizajn?",
      a: "Samo ako ste prošli prva dva koraka i utvrdili da posetilaca ima, da su pravi, i da ipak ne šalju upit. U svakom drugom slučaju redizajn troši budžet na problem koji nije uzrok.",
    },
    {
      q: "Koliko poseta je normalno za mali biznis?",
      a: "Zavisi od delatnosti, ali za lokalni uslužni biznis sa uređenom vidljivošću 300–1.500 poseta mesečno je uobičajen red veličine. Ispod 100 mesečno znači da sajt praktično ne postoji u pretrazi.",
    },
    {
      q: "Da li društvene mreže mogu da zamene sajt?",
      a: "Za dolazak ljudi mogu, za zaključivanje posla teže. Profil je tuđa platforma sa tuđim pravilima i bez pretrage po nameri kupca — čovek koji sada traži uslugu traži je u pretraživaču, ne skrolovanjem.",
    },
  ],
  cta: { label: "Pošalji adresu sajta na pregled", href: "/upit" },
  secondaryCta: { label: "Usluga: SEO i digitalni marketing", href: "/our-services/seo-digitalni-marketing" },
};

const platformChoiceGuide: Guide = {
  path: "/wordpress-ili-custom-sajt",
  eyebrow: "Izbor tehnologije",
  title: "WordPress ili custom sajt — kada se koji isplati",
  metaDescription:
    "Poređenje WordPress-a, page buildera i custom razvoja: šta koji realno košta kroz dve godine, gde svaki puca, i po kojim pitanjima da odlučite koji vam treba.",
  h1: "WordPress ili custom sajt?",
  lead:
    "Nema tačnog odgovora bez konteksta — ima pogrešnog izbora za konkretan slučaj. Ovde je poređenje bez navijanja: šta svaki pristup radi dobro, gde puca, i koja tri pitanja odlučuju umesto vas.",
  keywords: [
    "wordpress ili custom sajt",
    "wordpress vs next.js",
    "da li mi treba wordpress",
    "custom izrada sajta",
    "page builder ili custom",
    "koju platformu za sajt",
  ],
  sections: [
    {
      heading: "Tri pristupa, ukratko",
      bullets: [
        "Gotova tema na WordPress-u — najjeftinije i najbrže. Izgled je tuđi, izmenjen je tekst i boje.",
        "WordPress sa page builderom — više slobode u izgledu, ali sajt postaje težak i spor jer builder nosi sopstveni teret.",
        "Custom razvoj (Next.js / React) — piše se za konkretan slučaj. Najskuplje na startu, najjeftinije za menjanje kasnije.",
      ],
    },
    {
      heading: "Kada je WordPress pravi izbor",
      bullets: [
        "Sadržajni sajt — blog, magazin, portal — gde je bitno objavljivati mnogo i često.",
        "Standardna prezentacija bez posebne logike, gde brzina izlaska na tržište znači više od svega.",
        "Budžet koji ne podnosi custom, a sajt mora da postoji sada.",
        "Postoji neko ko će održavati ažuriranja — WordPress bez održavanja postaje bezbednosni problem, ne samo zastareo sajt.",
      ],
    },
    {
      heading: "Kada WordPress počne da smeta",
      body: [
        "Prelomna tačka je skoro uvek isto: kada sajt treba da uradi nešto što nije objavljivanje sadržaja. Tada se dodaje dodatak, pa još jedan, pa treći koji povezuje prva dva — i sajt polako postaje sistem koji niko ne razume u celini.",
      ],
      bullets: [
        "Sopstvena poslovna pravila — zakazivanje sa smenama, cenovnik koji zavisi od parametara, uloge i dozvole.",
        "Integracije sa knjigovodstvom, ERP-om, kurirskom službom ili internim sistemom.",
        "Brzina kao uslov, ne kao želja — deset dodataka se ne mogu optimizovati do brzine pisanog koda.",
        "Bezbednost i GDPR obaveze, gde svaki dodatak trećeg lica širi površinu napada.",
        "Deset i više dodataka. To je pouzdan znak da platforma radi posao za koji nije predviđena.",
      ],
    },
    {
      heading: "Trošak kroz dve godine, ne na dan isporuke",
      body: [
        "Poređenje po početnoj ceni je najskuplja greška u ovom izboru. Gotova tema od 300 € koja se svakih par meseci lomi pri ažuriranju, kojoj treba plaćeni dodatak za svaku ozbiljniju funkciju i koja ne prolazi test brzine, kroz dve godine ume da košta više od custom sajta — a sve to vreme ne donosi upite.",
        "Suprotno takođe važi: custom sajt za firmu kojoj treba pet strana i kontakt forma je potrošen novac. Ako nema poslovne logike, nema ni šta da se piše po meri.",
      ],
    },
    {
      heading: "Tri pitanja koja odlučuju",
      bullets: [
        "Da li sajt treba nešto da radi, ili samo da prikazuje? Ako radi — custom. Ako prikazuje — WordPress je dovoljan.",
        "Ko će ga menjati za godinu dana? Ako niko tehnički, treba admin pisan za tu osobu, ne opšti panel.",
        "Šta se dešava ako uspe? Ako deset puta više saobraćaja i porudžbina ruši sistem, jeftin start je bio skup.",
      ],
    },
  ],
  proofHeading: "Primeri custom pristupa",
  proof: [
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Web shop sa sopstvenim admin panelom umesto gotove prodavnice.",
    },
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Prodajni i operativni sistem — posao koji nijedan dodatak ne pokriva.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Da li je custom sajt bolji za SEO od WordPress-a?",
      a: "Sam po sebi nije. Google ne gleda čime je sajt napravljen nego kako se ponaša — brzina, struktura, sadržaj, mobilni prikaz. Custom olakšava da se to uradi dobro, ali loše napisan custom sajt gubi od dobro održavanog WordPress-a.",
    },
    {
      q: "Mogu li kasnije da pređem sa WordPress-a na custom?",
      a: "Da. Sadržaj se prenosi, a adrese stranica se preusmeravaju da se ne izgube pozicije u pretrazi. Prelazak bez preusmerenja je najčešći način da se posle redizajna izgubi sav dotadašnji saobraćaj.",
    },
    {
      q: "Koliko košta jedno u odnosu na drugo?",
      a: "Gotova tema sa izmenama je red veličine nekoliko stotina evra. Custom prezentacioni sajt kreće od oko 1.200 €, a sistemi sa sopstvenom logikom idu naviše. Rasponi po tipu projekta su na stranici o ceni izrade sajta.",
    },
    {
      q: "Da li ću moći sam da menjam sadržaj na custom sajtu?",
      a: "Da, ako je tako naručeno. Custom ne znači da svaka izmena teksta traži programera — znači da je admin panel pisan za vaše potrebe, sa poljima koja vam zaista trebaju.",
    },
  ],
  cta: { label: "Opiši šta sajt treba da radi", href: "/upit" },
  secondaryCta: { label: "Usluga: web prezentacije", href: "/our-services/web-prezentacije" },
};

const chooseAgencyGuide: Guide = {
  path: "/kako-izabrati-web-agenciju",
  eyebrow: "Izbor izvođača",
  title: "Kako izabrati agenciju za izradu sajta — pitanja koja otkrivaju razliku",
  metaDescription:
    "Ponude za isti sajt idu od 150 do 5.000 €. Kako da uporedite šta zaista dobijate: osam pitanja koja treba postaviti pre potpisa i znaci upozorenja koje vredi primetiti na vreme.",
  h1: "Kako izabrati agenciju za izradu sajta",
  lead:
    "Tri ponude za isti opis posla ume da se razlikuju deset puta. To najčešće ne znači da je neko pošten a neko ne — znači da se pod istim imenom prodaju tri različita proizvoda. Ova pitanja otkrivaju koji je koji, pre nego što potpišete.",
  keywords: [
    "kako izabrati web agenciju",
    "agencija za izradu sajta",
    "izbor izvođača za sajt",
    "poređenje ponuda za sajt",
    "na šta paziti pri izradi sajta",
  ],
  sections: [
    {
      heading: "Osam pitanja pre potpisa",
      bullets: [
        "Ko je vlasnik koda i podataka posle isporuke? Ako odgovor nije „vi“, zaključani ste kod izvođača za svaku buduću izmenu.",
        "Na čemu se sajt pravi i zašto baš na tome? Odgovor ne mora da bude tehnički, ali mora da postoji.",
        "Šta konkretno nije uključeno u cenu? Ovo pitanje otkriva više od spiska onoga što jeste.",
        "Ko piše tekstove i ko nabavlja fotografije? Najčešći uzrok kašnjenja, i najčešće neizgovoren u ponudi.",
        "Šta se dešava mesec dana posle puštanja, ako nešto ne radi? Da li je to plaćeno, i po kojoj ceni?",
        "Mogu li da vidim tri sajta koja ste radili i koji su i danas živi? Živi, ne screenshot iz portfolija.",
        "Ko će održavati sajt i koliko to košta mesečno? Sajt bez održavanja postaje bezbednosni problem, ne samo star sajt.",
        "Kako merimo da li je uspelo? Ako niko ne pominje brojke, niko neće ni odgovarati za rezultat.",
      ],
    },
    {
      heading: "Znaci upozorenja",
      bullets: [
        "Garantovano prvo mesto na Google-u. Niko to ne može da garantuje; ko obeća, ili ne zna ili računa da vi ne znate.",
        "Ponuda bez opisa obima. Jedan iznos i jedna rečenica znače da će se svaka nesuglasica rešavati posle, kada je kasno.",
        "Plaćanje sve unapred. Uobičajeno je u fazama, vezano za isporuke.",
        "Portfolio bez ijednog linka. Slike sajtova koje ne možete da otvorite obično znače da više ne postoje.",
        "Domen i hosting registrovani na izvođača, ne na vas. To je najtiši oblik zaključavanja i najteže se posle ispravlja.",
        "Odbijanje da se objasni cena. Ne morate da razumete svaku stavku, ali imate pravo da znate za šta plaćate.",
      ],
    },
    {
      heading: "Šta se stvarno poredi kada su ponude različite",
      body: [
        "Najskuplja greška je poređenje po iznosu. Ponuda od 200 € i ponuda od 2.500 € najčešće nisu isti posao: prva je gotova tema sa izmenjenim tekstom, druga je sajt pisan za konkretan slučaj. Obe mogu biti ispravan izbor — ali ne za isti problem.",
        "Poredite šta ostaje vama posle isporuke: kod, podaci, pristupi, mogućnost da promenite izvođača bez pravljenja sajta iz početka. To je jedina razlika koja se oseti kroz dve godine.",
      ],
    },
    {
      heading: "Agencija, frilenser ili studio",
      bullets: [
        "Velika agencija — više ljudi, više procesa, viša cena. Ima smisla za velike projekte gde je potrebna zamenjivost ljudi.",
        "Frilenser — najjeftinije i najbrže dok traje. Rizik je jedan čovek: bolest, drugi posao ili nestanak zaustavljaju sve.",
        "Mali studio — sredina: direktan kontakt sa onim ko radi, uz to da posao ne staje ako jedan čovek nije tu.",
        "Ni jedno nije po sebi bolje. Bitno je da znate koji rizik prihvatate i da je to zapisano u dogovoru.",
      ],
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko ponuda treba da tražim?",
      a: "Tri je dovoljno. Više od toga uglavnom ne daje novu informaciju, a produžava odluku. Bitno je da sve tri dobiju isti opis posla — inače poredite različite stvari.",
    },
    {
      q: "Da li je skuplja ponuda uvek bolja?",
      a: "Ne. Viša cena znači više uloženog vremena, ali ne garantuje da je uloženo u ono što vama treba. Zato se pita šta je uključeno, a ne koliko košta.",
    },
    {
      q: "Šta ako već imam sajt kod nekoga i nisam zadovoljan?",
      a: "Prvo obezbedite pristupe — domen, hosting i admin moraju da budu na vaše ime. Zatim se procenjuje da li se postojeći sajt popravlja ili je jeftinije praviti novi, uz preusmerenje starih adresa da se ne izgube pozicije u pretrazi.",
    },
    {
      q: "Da li ugovor mora da bude pisani?",
      a: "Da, makar u obliku prihvaćene ponude sa opisom obima, rokovima, dinamikom plaćanja i onim što nije uključeno. To štiti obe strane i skraćuje sve kasnije rasprave.",
    },
  ],
  cta: { label: "Pošalji opis posla na procenu", href: "/upit" },
  secondaryCta: { label: "Pogledaj radove", href: "/our-projects" },
};

const beyondExcelGuide: Guide = {
  path: "/interni-softver-umesto-excel-tabela",
  eyebrow: "Interni sistemi",
  title: "Kada Excel prestane da bude dovoljan — interni softver za firmu",
  metaDescription:
    "Znaci da su tabele prerasle svoju ulogu: dupli unos, verzije fajlova, greške u ponudama. Šta interni sistem preuzima, kako se uvodi u fazama i koliko realno košta.",
  h1: "Kada Excel prestane da bude dovoljan",
  lead:
    "Tabele su najbolji alat na svetu dok ih koristi jedan čovek. Problem počinje kada ih koristi petoro, kada se šalju mejlom, i kada niko ne zna koja je verzija poslednja. Ovde je kako da prepoznate tu tačku i šta se radi posle nje.",
  keywords: [
    "interni softver za firmu",
    "program za vođenje firme",
    "zamena excel tabela",
    "custom crm",
    "softver za evidenciju",
    "digitalizacija poslovanja",
  ],
  sections: [
    {
      heading: "Znaci da su tabele prerasle svoju ulogu",
      bullets: [
        "Isti podatak se unosi na dva mesta. Svaki dupli unos je mesto gde će pre ili kasnije nastati razlika.",
        "Fajlovi sa nazivima tipa „ponude_finalno_v3_novo“. Ne postoji jedan tačan podatak, postoji nekoliko kandidata.",
        "Neko mora ručno da sklopi izveštaj koji se traži svakog meseca.",
        "Izlazak jednog čoveka na godišnji zaustavlja proces, jer samo on zna kako tabela radi.",
        "Greške u ponudama i fakturama koje se otkriju kod klijenta, ne kod vas.",
        "Nema traga ko je šta promenio i kada.",
      ],
    },
    {
      heading: "Šta interni sistem preuzima",
      body: [
        "Cilj nije da sve izgleda modernije. Cilj je da podatak postoji na jednom mestu, da ga unosi onaj ko ga prvi ima, i da se sve ostalo računa iz njega.",
      ],
      bullets: [
        "Jedan izvor istine — klijenti, ponude, nalozi i cene ne žive u pet fajlova.",
        "Uloge i dozvole — svako vidi ono što mu treba za posao, ne sve.",
        "Automatsko računanje — ponuda, marža, rok, PDV, bez ručnog prekucavanja.",
        "Trag izmena — ko je promenio, šta i kada.",
        "Izveštaji koji se generišu, umesto da se sklapaju.",
        "Integracije — knjigovodstvo, mejl, sajt, kurirska služba.",
      ],
    },
    {
      heading: "Kako se uvodi bez zaustavljanja posla",
      body: [
        "Najčešći razlog neuspeha nije tehnika nego pokušaj da se sve zameni odjednom. Sistem koji od prvog dana traži da svi promene ceo način rada po pravilu bude napušten u drugom mesecu.",
      ],
      bullets: [
        "Prvo jedan proces — onaj koji najviše boli, obično ponude ili nalozi.",
        "Postojeći podaci se prenose, ne prekucavaju.",
        "Tabele ostaju kao rezerva dok se ne stekne poverenje u sistem.",
        "Sledeći proces se dodaje tek kada prvi radi bez pitanja.",
      ],
    },
    {
      heading: "Gotovo rešenje ili sopstveno",
      body: [
        "Gotov ERP ili CRM je jeftiniji na startu i ima smisla ako radite standardno. Plaća se po korisniku mesečno, i vaš proces se prilagođava njihovom modelu.",
        "Sopstveni sistem se isplati kada je vaš način rada upravo ono po čemu ste konkurentni, kada gotovo rešenje traži da radite drugačije nego što posao zahteva, ili kada pretplata za ceo tim kroz par godina pređe cenu izrade. Tada je i podatak vaš, u vašoj bazi.",
      ],
    },
  ],
  proofHeading: "Rađeno u produkciji",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Prodajni i operativni sistem — ponude, nalozi i evidencija na jednom mestu.",
    },
    {
      label: "TeachFromHome",
      href: "/our-projects/teachfromhome-onboarding-sistem-za-remote-nastavnike",
      note: "Onboarding sistem — proces koji se ranije vodio ručno kroz tabele i mejlove.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta interni softver za firmu?",
      a: "Raspon je 4.000–15.000 € za custom razvoj, i najviše zavisi od broja procesa koje sistem preuzima. Jedan proces je znatno jeftiniji od celokupne operative, zato se i preporučuje uvođenje u fazama.",
    },
    {
      q: "Šta sa podacima koji su sada u tabelama?",
      a: "Prenose se. Migracija postojećih podataka je poseban deo posla i planira se od početka — prekucavanje ručno je i skuplje i nepouzdanije od jednokratnog uvoza.",
    },
    {
      q: "Da li zaposleni moraju da budu tehnički?",
      a: "Ne. Ako sistem traži obuku dužu od jednog dana za svakodnevni rad, napravljen je pogrešno. Interni alat mora da bude jednostavniji od tabele koju zamenjuje, inače se neće koristiti.",
    },
    {
      q: "Šta ako firma poraste ili se proces promeni?",
      a: "Zato je bitno ko je vlasnik koda. Sopstveni sistem se menja kada se promeni posao; gotovo rešenje se menja kada to njegov proizvođač odluči.",
    },
  ],
  cta: { label: "Opiši proces koji te najviše koči", href: "/upit" },
  secondaryCta: { label: "Usluga: interne poslovne aplikacije", href: "/our-services/interne-poslovne-aplikacije" },
};

const chatbotGuide: Guide = {
  path: "/ai-chatbot-za-sajt",
  eyebrow: "AI u poslovanju",
  title: "AI chatbot za sajt — kada ima smisla, a kada samo smeta",
  metaDescription:
    "Šta AI chatbot na sajtu realno može, gde greši, koje podatke mora da ima da bi bio koristan, i kako se meri da li se isplatio. Bez obećanja koja se ne mogu ispuniti.",
  h1: "AI chatbot za sajt",
  lead:
    "Chatbot koji odgovara pogrešno je gori od nikakvog — jednom kada posetilac dobije netačan odgovor, ne pita drugi put i ne veruje ostatku sajta. Ovde je gde se realno isplati, šta mora da zna pre puštanja, i kako da se izmeri da li radi.",
  keywords: [
    "ai chatbot za sajt",
    "chatbot za biznis",
    "ai asistent za sajt",
    "automatski odgovori na pitanja klijenata",
    "chatgpt za moj biznis",
  ],
  sections: [
    {
      heading: "Kada se isplati",
      bullets: [
        "Ista pitanja se ponavljaju svakog dana — radno vreme, cene, dostupnost, kako se naručuje.",
        "Upiti stižu van radnog vremena, a odgovor sutradan znači izgubljenog kupca.",
        "Katalog je veliki, pa posetilac ne ume sam da nađe ono što traži.",
        "Postoji dokumentacija koju niko ne čita — uputstva, uslovi, specifikacije.",
        "Prvi korak pre čoveka: bot prikupi šta treba, čovek preuzme spreman kontekst.",
      ],
    },
    {
      heading: "Kada je promašaj",
      bullets: [
        "Malo poseta. Bot ne dovodi posetioce — radi samo sa onima koji već dođu.",
        "Odluke koje traže poverenje ili pregovor. Tu bot najviše smeta, jer klijent hoće čoveka.",
        "Nema izvora znanja. Bez pouzdanog sadržaja bot izmišlja, a to izmišljanje ide u vaše ime.",
        "Kao zamena za čoveka, ne kao filter pred njim. Blokiran put do živog kontakta gubi kupce.",
      ],
    },
    {
      heading: "Šta mora da ima da bi bio koristan",
      body: [
        "Razlika između bota koji pomaže i bota koji šteti nije u modelu nego u tome na čemu je zasnovan. Bot koji odgovara iz opšteg znanja govori uopšteno i greši u detaljima koji su vama najbitniji.",
      ],
      bullets: [
        "Sopstveni izvor — vaše usluge, cene, uslovi i česta pitanja, a ne opšte znanje modela.",
        "Jasne granice: šta sme da tvrdi, a šta mora da prosledi čoveku.",
        "Predaju čoveku u jednom kliku, bez ponavljanja svega od početka.",
        "Zapis razgovora, da se vidi šta ljudi zaista pitaju — to je najkorisniji sporedni proizvod.",
        "Odgovor „ne znam, evo kontakta“ umesto izmišljanja. Ovo se podešava, ne dešava samo.",
      ],
    },
    {
      heading: "Kako se meri da li se isplatio",
      bullets: [
        "Koliko razgovora završi bez potrebe za čovekom.",
        "Koliko upita dođe van radnog vremena, koji ranije nisu ni postojali.",
        "Koliko razgovora pređe u konkretan upit ili zakazan termin.",
        "Koliko vremena se oslobodi kod onog ko je do sada odgovarao ručno.",
        "Bez merenja ovoga chatbot je trošak sa dobrim osećajem, ne alat.",
      ],
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta AI chatbot na sajtu?",
      a: "Za rešenje zasnovano na vašem sadržaju raspon je uglavnom 800–4.000 €, u zavisnosti od količine izvora, integracija i toga da li bot samo odgovara ili i pokreće akciju — zakazivanje, upit, porudžbinu. Tome se dodaje mesečni trošak korišćenja modela, koji zavisi od broja razgovora.",
    },
    {
      q: "Da li može da odgovara na srpskom?",
      a: "Da. Kvalitet na srpskom je danas dovoljan za korisničku podršku, uz uslov da su izvorni tekstovi na srpskom — bot piše najbolje na jeziku na kom je njegov izvor.",
    },
    {
      q: "Šta ako izmisli odgovor?",
      a: "To se svodi na minimum tako što bot odgovara isključivo iz vašeg sadržaja i ima uputstvo da prizna kada nema podatak. Nula rizika ne postoji, zato se osetljive teme — cene, rokovi, obaveze — po pravilu prosleđuju čoveku.",
    },
    {
      q: "Da li zamenjuje korisničku podršku?",
      a: "Ne, i ne treba tako da se postavlja. Preuzima ponovljiva pitanja i priprema kontekst za čoveka. Podrška koja je u potpunosti prepuštena botu gubi upravo one klijente do kojih je najviše stalo.",
    },
    {
      q: "Koliko traje uvođenje?",
      a: "Bot zasnovan na postojećem sadržaju obično 2–4 nedelje. Najviše vremena odlazi na sređivanje izvora, ne na samu integraciju.",
    },
  ],
  cta: { label: "Opiši pitanja koja stalno dobijaš", href: "/upit" },
  secondaryCta: { label: "Usluga: AI integracije i automatizacija", href: "/our-services/ai-integracije-automatizacija" },
};

const webShopGuide: Guide = {
  path: "/kako-napraviti-web-shop",
  eyebrow: "E-commerce",
  title: "Kako napraviti web shop — šta treba rešiti pre prve porudžbine",
  metaDescription:
    "Plaćanje, dostava, PDV, povraćaj i zalihe — odluke koje određuju da li web shop radi ili pravi problem. Šta se rešava pre izrade i koliko realno košta u Srbiji.",
  h1: "Kako napraviti web shop",
  lead:
    "Web shop nije sajt sa dugmetom „kupi“. Najveći deo posla je izvan izgleda — plaćanje, dostava, PDV, povraćaj i zalihe. Ako se to reši pre izrade, ostatak je predvidiv; ako se ostavi za kasnije, ispravlja se posle prve porudžbine, uz klijenta koji čeka.",
  keywords: [
    "kako napraviti web shop",
    "izrada web shopa",
    "online prodavnica",
    "web shop cena",
    "internet prodavnica Srbija",
    "e-commerce izrada",
  ],
  sections: [
    {
      heading: "Šta se rešava pre izrade",
      bullets: [
        "Plaćanje — kartice, pouzeće, uplatnica, na rate. Svaki način ima svoj trošak i svoj postupak.",
        "Dostava — koji kurir, ko plaća, kako se računa cena po težini ili vrednosti.",
        "PDV i fiskalizacija — da li ste u sistemu PDV-a i kako se izdaje račun.",
        "Povraćaj i reklamacija — zakonski rok i vaš postupak moraju biti opisani pre puštanja.",
        "Zalihe — odakle sistem zna koliko čega ima, i šta se dešava kada nestane.",
        "Ko pakuje i šalje. Sistem koji ne odgovara načinu rada magacina pravi više posla nego što ga skida.",
      ],
    },
    {
      heading: "Gde web shopovi najčešće gube kupca",
      body: [
        "Većina napuštenih korpi nema veze sa cenom proizvoda. Kupac odustane na mestima koja se lako poprave, ali se retko provere.",
      ],
      bullets: [
        "Cena dostave se pojavi tek na kraju. Najčešći razlog napuštanja korpe, i najlakši za ispraviti.",
        "Obavezna registracija pre kupovine. Kupovina kao gost mora da postoji.",
        "Predugačka forma. Svako polje koje nije neophodno za isporuku je izgubljeni deo porudžbina.",
        "Nema informacije kada stiže. „2–4 radna dana“ vredi više od tri fotografije proizvoda.",
        "Spora pretraga i loše kategorije kada ima mnogo artikala.",
        "Sajt spor na telefonu. Većina kupovina počinje na telefonu, i tamo se najbrže odustaje.",
      ],
    },
    {
      heading: "Gotova platforma ili custom",
      body: [
        "Gotove platforme su brz i razuman start: mesečna pretplata, gotovo plaćanje i dostava, ograničena sloboda. Za standardan asortiman i standardan način prodaje to je sasvim dovoljno.",
        "Custom ima smisla kada proizvod nije standardan — konfigurator, cena po dimenziji, veleprodajne cene po kupcu, povezivanje sa magacinom ili knjigovodstvom. Tada gotova platforma traži niz dodataka koji se međusobno sudaraju, i ušteda sa početka nestane.",
      ],
    },
    {
      heading: "Posle puštanja",
      bullets: [
        "Merenje od prvog dana — koliko poseta, koliko korpi, koliko porudžbina. Bez toga se ne zna šta popraviti.",
        "Opis proizvoda pisan za kupca, ne prepisan od dobavljača — to je i jedini deo koji vas razlikuje u pretrazi.",
        "Fotografije. Najisplativije ulaganje u web shopu i najčešće zanemareno.",
        "Praćenje napuštenih korpi — podsetnik na korpu je najjeftiniji izvor dodatnih porudžbina.",
      ],
    },
  ],
  proofHeading: "Rađeno u produkciji",
  proof: [
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Web shop sa sopstvenim admin panelom za porudžbine i asortiman.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Koliko košta izrada web shopa?",
      a: "Za custom razvoj raspon je 3.000–8.000 €. Gornju granicu podižu integracije — kurirska služba, knjigovodstvo, veleprodajne cene, uvoz velikog kataloga. Detaljan pregled je na stranici o ceni izrade sajta.",
    },
    {
      q: "Da li mi treba prihvatanje kartica na sajtu?",
      a: "Ne odmah. U Srbiji pouzeće i dalje nosi veliki deo porudžbina, pa mnogi krenu bez kartica i uvedu ih kada obim to opravda. Kartično plaćanje traži ugovor sa bankom ili procesorom i ima svoj trošak po transakciji.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Uobičajeno 4–8 nedelja. Najduže traje priprema kataloga — fotografije, opisi i cene su posao koji ne može da odradi izvođač umesto vas.",
    },
    {
      q: "Šta ako imam mnogo proizvoda u drugom sistemu?",
      a: "Uvoze se automatski, ne prekucavaju. Migracija kataloga je poseban deo posla i za veće asortimane ume da bude značajan deo cene — planira se od početka.",
    },
    {
      q: "Da li web shop sam po sebi donosi kupce?",
      a: "Ne. Prodavnica bez posetilaca je prazan izlog. Uz izradu ide i plan po čemu treba da vas nađu — kategorije, opisi i stranice pisane po onome što kupci zaista traže.",
    },
  ],
  cta: { label: "Opiši asortiman i način prodaje", href: "/upit" },
  secondaryCta: { label: "Usluga: e-commerce i web shop", href: "/our-services/e-commerce-web-shop" },
};

export const guides = [
  bookingGuide,
  webShopGuide,
  beyondExcelGuide,
  chatbotGuide,
  platformChoiceGuide,
  chooseAgencyGuide,
  noLeadsGuide,
] as const;

export const bookingSystemsGuide = bookingGuide;
export const siteWithoutLeadsGuide = noLeadsGuide;
export const wordpressOrCustomGuide = platformChoiceGuide;
export const howToChooseAgencyGuide = chooseAgencyGuide;
export const internalSoftwareGuide = beyondExcelGuide;
export const aiChatbotGuide = chatbotGuide;
export const webShopHowToGuide = webShopGuide;
