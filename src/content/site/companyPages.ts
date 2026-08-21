import type { Guide } from "./guides";

/**
 * Process and retainer pages.
 *
 * They render through GuideV4 because the layout is the right one — sections,
 * proof, FAQ, CTA — but they are not guides and stay out of the `guides` array:
 * /vodici lists problem-intent reading, and "how we work" is not that. They
 * still link into the guides and case studies, so nothing is an orphan.
 *
 * WHY THESE TWO EXIST AT ALL. Every buyer who is close to writing asks the same
 * two questions before they do — what happens after I send this, and who keeps
 * it alive afterwards. Answering them on the site removes the two objections
 * that were previously only answerable on a call that never happened.
 */

export const howWeWorkPage: Guide = {
  path: "/kako-radimo",
  eyebrow: "Proces",
  title: "Kako radimo — proces izrade sajta i aplikacije od upita do isporuke",
  metaDescription:
    "Šta se konkretno dešava od prvog upita do puštanja u rad: šta dobijate u kojoj fazi, koliko traje, ko piše tekst, kako se testira i šta ostaje vama posle isporuke.",
  h1: "Kako radimo",
  lead:
    "Najveći deo lošeg iskustva sa agencijama nije loš kod nego nejasan proces: ne zna se šta je sledeće, ko šta duguje i kada je gotovo. Ovde piše kako izgleda posao sa nama — faza po faza, sa onim što se traži od vas.",
  keywords: [
    "proces izrade sajta",
    "kako radi web agencija",
    "faze izrade sajta",
    "specifikacija za sajt",
    "ugovor za izradu sajta",
  ],
  sections: [
    {
      heading: "1. Razgovor i brief — 1 do 3 dana",
      body: [
        "Prvi korak nije ponuda nego pitanja. Šta posao zaista radi, ko su kupci, šta se sada radi ručno i po čemu ćemo znati da je projekat uspeo.",
        "Ako ste popunili upit na sajtu, veći deo ovoga je već odgovoren i razgovor je kratak. Ako niste, tridesetak minuta poziva je dovoljno.",
      ],
      bullets: [
        "Vi dajete: opis posla, primere sajtova koji vam se sviđaju i ne sviđaju, i ko donosi odluku.",
        "Dobijate: pisani rezime dogovorenog, da se ne oslanjamo na pamćenje.",
      ],
    },
    {
      heading: "2. Ponuda sa fiksnim obimom — do 3 radna dana",
      body: [
        "Ponuda je spisak onoga što ulazi u cenu, spisak onoga što ne ulazi, rok i način plaćanja. Cena je fiksna za taj obim, ne po satu — pa promena cene znači da se obim menjao, i to se vidi crno na belo.",
        "Ako je posao veliki ili neizvestan, prvo ide plaćena mala faza: specifikacija i prototip. Tada u razvoj ulazite sa tačnom cenom umesto sa procenom.",
      ],
      bullets: [
        "Plaćanje je najčešće 50% na početku i 50% pred puštanje u rad.",
        "Račun izdaje Đorđe Mladenović PR Adspire Niš, sa PIB-om i matičnim brojem — knjigovodstveno uredno.",
      ],
    },
    {
      heading: "3. Struktura i dizajn — 1 do 2 nedelje",
      body: [
        "Prvo raspored i tekst, pa onda izgled. Sajt koji lepo izgleda a ne kaže šta prodajete ne donosi upite — to je najčešći razlog zašto se sajt menja posle godinu dana.",
        "Tekst pišemo mi na osnovu razgovora, vi ga ispravljate. Vaš posao poznajete bolje; naš je da ga napišemo tako da ga razume neko ko za vas prvi put čuje.",
      ],
    },
    {
      heading: "4. Razvoj — 2 do 8 nedelja",
      body: [
        "Radi se na test adresi koju vidite sve vreme, ne tek na kraju. Jednom nedeljno dobijete kratak izveštaj: šta je urađeno, šta je sledeće i gde nešto čeka na vas.",
        "Sve je custom kod — Next.js, TypeScript, Postgres — bez tema i dodataka koje neko treći može da prestane da održava.",
      ],
      bullets: [
        "Brzina i SEO se rade tokom razvoja, ne kao naknadna popravka.",
        "Sadržaj menjate sami kroz admin, gde god to ima smisla.",
        "Kod stoji u Git repozitorijumu kojem imate pristup.",
      ],
    },
    {
      heading: "5. Testiranje i puštanje u rad — 3 do 5 dana",
      bullets: [
        "Provera na telefonu, tabletu i računaru, u glavnim pretraživačima.",
        "Svaka forma se testira slanjem, ne pogledom — forma koja ćuti je najskuplji kvar na sajtu.",
        "Analitika i praćenje upita se postavljaju pre puštanja, da prvi mesec ne bude slepa mrlja.",
        "Prenos domena, hostinga, mejlova i SSL-a, sa spiskom pristupa koji ostaje kod vas.",
      ],
    },
    {
      heading: "6. Posle isporuke — 30 dana garancije",
      body: [
        "Trideset dana posle puštanja u rad sve što ne radi kako je dogovoreno popravlja se bez naplate. To je garancija na posao, ne održavanje — nove funkcije su nov posao i tako se naplaćuju.",
        "Dalje možete raditi sami, s nama po satu, ili kroz mesečno održavanje ako želite da neko drugi brine o ažuriranjima i rezervnim kopijama.",
      ],
    },
  ],
  proofHeading: "Rađeno ovim procesom",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Prodajni i operativni sistem za transport i mehanizaciju.",
    },
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Web shop sa admin platformom i upravljanjem asortimanom.",
    },
    {
      label: "Dr Igić",
      href: "/our-projects/dr-igic-web-aplikacija-za-estetske-klinike",
      note: "Web aplikacija za estetske klinike, u upotrebi svakog dana.",
    },
  ],
  faqHeading: "Česta pitanja o procesu",
  faq: [
    {
      q: "Koliko mog vremena ovo traži?",
      a: "Realno 3–5 sati kroz ceo projekat: razgovor na početku, pregled teksta i strukture, i provera pred puštanje u rad. Sve ostalo je naš posao.",
    },
    {
      q: "Šta ako se predomislim usred posla?",
      a: "Manje izmene ulaze u dogovoreni obim. Veće promene se pišu kao dopuna ponude sa svojom cenom i rokom, da ne bi rok tiho klizio bez objašnjenja.",
    },
    {
      q: "Ko je vlasnik koda, domena i naloga?",
      a: "Vi. Domen se registruje na vaše ime, kod i pristupi se predaju na kraju. Ne držimo klijente preko hostinga ili naloga koji glase na nas.",
    },
    {
      q: "Radite li sa firmama van Niša?",
      a: "Da, veći deo posla se ionako radi na daljinu. Klijenti su iz Srbije, Nemačke i Grčke; sastanci uživo su mogući u Nišu i okolini.",
    },
    {
      q: "Šta ako već imam sajt?",
      a: "Onda prvo ide pregled šta na njemu vredi zadržati — tekst, sadržaj, pozicije u pretrazi — pa plan prelaska sa preusmerenjima, da ne izgubite ono što ste već zaradili u pretrazi.",
    },
  ],
  cta: { label: "Opiši posao ukratko", href: "/upit" },
  secondaryCta: { label: "Koliko to košta", href: "/cena-izrade-sajta" },
};

export const maintenancePage: Guide = {
  path: "/odrzavanje-i-podrska",
  eyebrow: "Održavanje",
  title: "Održavanje sajta i podrška — šta pokriva i kada vam zaista treba",
  metaDescription:
    "Mesečno održavanje sajta i web aplikacije: bezbednosna ažuriranja, rezervne kopije, praćenje dostupnosti, sitne izmene i prioritetna podrška. Šta ulazi u koji nivo i kada je bacanje para.",
  h1: "Održavanje i podrška",
  lead:
    "Sajt nije nameštaj. Ima zavisnosti koje zastarevaju, sertifikate koji ističu i formu koja može da prestane da šalje mejlove a da to niko ne primeti mesecima. Ovde piše šta održavanje pokriva, šta ne pokriva i kada vam realno treba.",
  keywords: [
    "održavanje sajta",
    "podrška za sajt",
    "mesečno održavanje web aplikacije",
    "backup sajta",
    "ugovor o održavanju sajta",
  ],
  sections: [
    {
      heading: "Šta se kvari kada niko ne gleda",
      bullets: [
        "Forma tiho prestane da šalje mejlove — vidi se tek kada se neko požali da mu se niko nije javio.",
        "Istekne SSL sertifikat i pretraživač počne da prikazuje upozorenje posetiocima.",
        "Zastarele zavisnosti postanu poznata bezbednosna rupa; kod WordPress sajtova to je najčešći način provale.",
        "Baza raste bez rezervne kopije, pa jedan otkaz servera znači gubitak podataka bez povratka.",
        "Sadržaj ostari — cene, tim i usluge se razlikuju od onoga što sajt tvrdi.",
      ],
    },
    {
      heading: "Šta pokriva održavanje kod nas",
      body: [
        "Tri nivoa, sve mesečno i bez obaveze na godinu dana. Otkazuje se kad god — usluga koja se drži ugovorom umesto rezultatom ionako ne valja.",
      ],
      bullets: [
        "Osnovno — ažuriranja i bezbednosne zakrpe, dnevna rezervna kopija, praćenje dostupnosti sa obaveštenjem kada sajt padne, SSL i domen na oku, kratak mesečni izveštaj.",
        "Prošireno — sve iz osnovnog, plus dogovoreni sati za sitne izmene (tekst, slike, nova strana, izmena cenovnika) i mesečni izveštaj o posetama i upitima sa preporukom šta popraviti.",
        "Partnerski — sve iz proširenog, plus prioritetno vreme odgovora, planiranje razvoja po kvartalu i rad na novim funkcijama po unapred dogovorenoj satnici.",
      ],
    },
    {
      heading: "Šta održavanje nije",
      body: [
        "Održavanje čuva ono što postoji. Nova funkcija, redizajn ili nov modul su nov posao sa svojom ponudom. Tako je pošteno prema obe strane: paket koji pokriva sve u praksi znači ili preplaćen mesec ili odbijen zahtev.",
      ],
    },
    {
      heading: "Kada vam ne treba",
      body: [
        "Ako imate prezentacioni sajt od pet strana koji se ne menja i nemate ni formu ni naplatu, mesečno održavanje je verovatno bacanje para. Dovoljna je godišnja provera i uredan hosting.",
        "Isplati se kada sajt radi posao: prima upite, zakazuje termine, naplaćuje ili drži podatke bez kojih ne možete raditi.",
      ],
    },
  ],
  proofHeading: "Sistemi koje održavamo",
  proof: [
    {
      label: "Doctor Barber",
      href: "/our-projects/doctor-barber-online-booking-sistem",
      note: "Booking sistem u dnevnoj upotrebi — zastoj znači izgubljene termine.",
    },
    {
      label: "TeachFromHome",
      href: "/our-projects/teachfromhome-onboarding-sistem-za-remote-nastavnike",
      note: "Platforma sa korisničkim podacima i rezervnim kopijama.",
    },
  ],
  faqHeading: "Česta pitanja o održavanju",
  faq: [
    {
      q: "Koliko košta mesečno održavanje?",
      a: "Zavisi od toga šta sistem radi i koliko se često menja. Za prezentacioni sajt je mali mesečni iznos, za aplikaciju sa korisnicima i naplatom osetno veći. Tačan iznos ide u ponudu posle kratkog pregleda — ne naplaćujemo paušal za posao koji ne postoji.",
    },
    {
      q: "Održavate li sajt koji nije rađen kod vas?",
      a: "Da, uz prethodni pregled. Ako je sajt na tehnologiji koja se više ne održava ili nema pristupa kodu, prvo kažemo koliki je rizik pa vi odlučujete.",
    },
    {
      q: "Koliko brzo reagujete kada sajt padne?",
      a: "Praćenje dostupnosti javi nama pre nego što vi primetite. U radno vreme se kreće odmah; van radnog vremena zavisi od nivoa podrške koji imate.",
    },
    {
      q: "Mogu li da dobijem rezervnu kopiju svojih podataka?",
      a: "Da, u svakom trenutku i bez objašnjenja. Vaši podaci su vaši i to je uslov saradnje koji ne pregovaramo.",
    },
  ],
  cta: { label: "Traži pregled i ponudu za održavanje", href: "/upit" },
  secondaryCta: { label: "Kako radimo", href: "/kako-radimo" },
};

export const siteAuditPage: Guide = {
  path: "/besplatan-pregled-sajta",
  eyebrow: "Besplatno",
  title: "Besplatan pregled sajta — šta ne radi i šta se prvo isplati popraviti",
  metaDescription:
    "Pošaljite adresu sajta i dobićete pisani pregled: zašto ne donosi upite, šta koči brzinu i vidljivost u pretrazi, i spisak popravki poređan po tome šta se prvo isplati.",
  h1: "Besplatan pregled sajta",
  lead:
    "Ako sajt postoji ali ne donosi upite, prvi korak nije nov sajt nego dijagnoza. Pošaljite adresu i dobićete pisani pregled sa spiskom popravki poređanim po dobitku — bez poziva, bez obaveze i bez pokušaja da vam se odmah nešto proda.",
  keywords: [
    "besplatan pregled sajta",
    "analiza sajta",
    "audit sajta",
    "provera sajta",
    "zašto sajt ne donosi upite",
  ],
  sections: [
    {
      heading: "Šta konkretno dobijate",
      bullets: [
        "Da li je sajt uopšte indeksiran i šta Google od njega vidi.",
        "Za koje rečenice bi sajt mogao da rangira, a trenutno nema stranu koja na njih odgovara.",
        "Brzina na telefonu, sa konkretnim uzrocima — slike, fontovi, skripte.",
        "Put od dolaska do upita: gde posetilac gubi nit i zašto ne popuni formu.",
        "Provera da li forma zaista šalje mejlove. Češće je pokvarena nego što iko očekuje.",
        "Osnovna provera bezbednosti i sertifikata.",
        "Spisak popravki poređan po odnosu dobitka i truda, sa procenom vremena za svaku.",
      ],
    },
    {
      heading: "Kako izgleda",
      body: [
        "Pisani dokument, obično dve do tri strane, na srpskom i bez žargona. Svaka stavka kaže šta je nalaz, zašto je to problem u novcu i šta je popravka.",
        "Rok je do tri radna dana. Ako je sajt veliki ili ima prodavnicu, javljamo unapred da će trebati koji dan više.",
      ],
    },
    {
      heading: "Zašto je besplatno",
      body: [
        "Jer je to najpošteniji način da vidite kako radimo pre nego što bilo šta platite. Veći deo nalaza možete da sprovedete sami ili preko svoje trenutne agencije — i to je u redu.",
        "Ako posle pregleda želite da to uradimo mi, dobijate ponudu sa fiksnom cenom za tačno te stavke. Ako ne želite, pregled ostaje vama i time je priča završena.",
      ],
    },
    {
      heading: "Šta nam treba od vas",
      bullets: [
        "Adresa sajta.",
        "Jedna rečenica o tome šta bi sajt trebalo da radi, a ne radi.",
        "Ako imate pristup Google Analytics-u ili Search Console-u, pregled je precizniji — ali nije uslov.",
      ],
    },
  ],
  proofHeading: "Pročitajte pre nego što pošaljete",
  proof: [
    {
      label: "Zašto sajt ne donosi upite",
      href: "/sajt-ne-donosi-upite",
      note: "Najčešći uzroci, poređani po tome koliko koštaju.",
    },
    {
      label: "Prenos sajta sa druge agencije",
      href: "/prenos-sajta-sa-druge-agencije",
      note: "Ako je problem vlasnički, a ne tehnički.",
    },
    {
      label: "Kako radimo",
      href: "/kako-radimo",
      note: "Šta sledi ako odlučite da nastavimo zajedno.",
    },
  ],
  faqHeading: "Česta pitanja",
  faq: [
    {
      q: "Da li je zaista besplatno?",
      a: "Jeste. Nema skrivenog uslova ni obaveze da bilo šta naručite posle toga.",
    },
    {
      q: "Da li ćete me zvati telefonom posle?",
      a: "Ne, osim ako sami ne tražite poziv. Pregled stiže mejlom i tu se završava ako vi tako želite.",
    },
    {
      q: "Radite li pregled sajta koji nije rađen kod vas?",
      a: "To je i poenta — najveći deo pregleda radimo upravo za tuđe sajtove.",
    },
    {
      q: "Šta ako nalaz bude da je sajt u redu?",
      a: "Onda to i piše. Bilo je takvih slučajeva i tada je preporuka da se novac uloži u sadržaj i oglašavanje, a ne u nov sajt.",
    },
  ],
  cta: { label: "Pošalji adresu sajta", href: "/upit" },
  secondaryCta: { label: "Zašto sajt ne donosi upite", href: "/sajt-ne-donosi-upite" },
};
