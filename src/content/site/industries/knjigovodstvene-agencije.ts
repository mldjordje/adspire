import type { IndustryPage } from "./types";

export const knjigovodstveneAgencije: IndustryPage = {
  slug: "softver-za-knjigovodstvenu-agenciju",
  sector: "profesionalne-usluge",
  navLabel: "Knjigovodstvene agencije",
  seo: {
    title: "Softver za knjigovodstvenu agenciju",
    metaDescription:
      "Sistem po meri za knjigovodstvenu agenciju: portal za klijente koji sami dostavljaju dokumenta, kalendar poreskih rokova po klijentu, praćenje šta fali, naplata paušala i dodatnog rada, raspodela klijenata po knjigovođi.",
    keywords: [
      "softver za knjigovodstvenu agenciju",
      "portal za klijente knjigovodstvo",
      "dostava dokumentacije knjigovođi",
      "rokovi poreskih prijava",
      "naplata knjigovodstvenih usluga",
      "program za knjigovođe",
      "evidencija klijenata agencija",
    ],
  },
  hero: {
    eyebrow: "Profesionalne usluge · knjigovodstvo",
    title: "Agencija u kojoj se dokumentacija ne moli svakog petog u mesecu",
    lead: "Pravimo portal kroz koji klijent sam dostavlja papire, sistem koji vidi ko šta duguje i kalendar rokova po klijentu koji se ne vodi u glavi.",
  },
  summary:
    "Knjigovodstvenoj agenciji sistem rešava ono što knjigovodstveni program ne radi: klijent dostavlja dokumenta kroz portal umesto preko Vibera i kesa, agencija na jednom ekranu vidi ko je šta poslao a ko kasni, rokovi poreskih prijava stoje po klijentu sa statusom, a naplata paušala i dodatnog rada se prati bez ručnog sabiranja. Adspire to pravi po meri — sajt koji donosi klijente, portal za klijente, mobilnu aplikaciju za slanje računa slikanjem i interni admin za rokove i naplatu.",
  audience: [
    "Agencija sa dvadeset do dvesta klijenata i dva do deset knjigovođa",
    "Agencija koja radi paušalce i preduzetnike sa sezonskim obimom",
    "Agencija koja vodi i obračun zarada za više firmi",
    "Knjigovođa koji radi sam i gubi vreme na jurenje dokumentacije",
  ],
  dayInTheLife: [
    {
      title: "Dokumentacija stiže na pet kanala",
      body: "Viber, mejl, kesa doneta u kancelariju, slika snimljena ukoso. Prvo se sve to preslaže i imenuje, pa tek onda počinje knjiženje.",
    },
    {
      title: "Jurenje onoga što fali",
      body: "Petog u mesecu počinje krug poziva: fali izvod, fali ulazna faktura, fali putni nalog. Ista ta tri klijenta kasne svakog meseca, ali to niko ne meri.",
    },
    {
      title: "Rokovi se pamte po grupama",
      body: "PDV, porez i doprinosi, završni račun. Zna se šta kada dospeva, ali ne i za koga je već urađeno, a za koga se još čeka podatak.",
    },
    {
      title: "Dodatni rad se ne naplaćuje",
      body: "Klijent pozove sa pitanjem, traži potvrdu, pa izveštaj za banku. Pojedinačno je to deset minuta, ukupno nedelja rada koja nije u paušalu.",
    },
    {
      title: "Paušal se ne menja godinama",
      body: "Firma je narasla sa trideset na tri stotine dokumenata mesečno, a cena je ostala ista. Bez brojke o stvarnom obimu, teško je i tražiti povećanje.",
    },
  ],
  layers: {
    site: {
      lead: "Sajt agencije ne prodaje knjigovodstvo nego sigurnost — i odvaja vas od agencije koja ima samo broj telefona.",
      items: [
        {
          title: "Strana po tipu klijenta",
          body: "Paušalac, preduzetnik sa knjigama, doo, firma sa zaposlenima, IT freelancer. Svako od njih traži druge reči i drugu cenu.",
        },
        {
          title: "Odgovori na pitanja koja se guglaju",
          body: "Kako se prelazi sa paušala, šta je potrebno za otvaranje firme, kako se knjiži ulazna faktura iz inostranstva. Ti tekstovi dovode tačno one ljude koje hoćete.",
        },
        {
          title: "Prelazak iz druge agencije",
          body: "Najveći deo novih klijenata dolazi od nekog drugog. Strana koja objasni kako se prenose podaci i šta klijent treba da uradi skida najveću kočnicu.",
        },
        {
          title: "Upit sa obimom posla",
          body: "Delatnost, broj dokumenata, broj zaposlenih, da li ima PDV. Sa tim se ponuda daje isti dan umesto posle tri poruke.",
        },
      ],
    },
    webApp: {
      lead: "Portal je mesto gde klijent radi svoj deo posla — i jedino mesto, da ne bi bilo pet kanala.",
      items: [
        {
          title: "Dostava dokumenata sa statusom",
          body: "Klijent učita ili slika dokument, vidi da je stiglo i da li je prihvaćeno. Nestaje pitanje „da li si dobila ono što sam poslao“.",
        },
        {
          title: "Spisak onoga što fali",
          body: "Klijent vidi šta se čeka od njega za tekući mesec. Jurenje prestaje da bude posao knjigovođe i postaje obaveza klijenta.",
        },
        {
          title: "Uplatnice i obaveze na jednom mestu",
          body: "Šta se plaća, koliko i do kada, sa gotovim nalozima. Klijent koji propusti uplatu zove agenciju, pa je to i njen problem.",
        },
        {
          title: "Izveštaji za banku i tendere",
          body: "Standardne potvrde i izveštaji koje klijent može sam da preuzme. Ono što se traži pedeset puta godišnje ne mora da prođe kroz čoveka.",
        },
      ],
    },
    mobile: {
      lead: "Mobilna aplikacija je za klijenta koji plaća gorivo na pumpi i račun mu je u ruci.",
      items: [
        {
          title: "Slikaj i pošalji",
          body: "Račun se slika na licu mesta i odmah odlazi u dokumentaciju. Fiskalni isečak koji se ne pošalje odmah izbledi u novčaniku do kraja meseca.",
        },
        {
          title: "Prepoznavanje osnovnih podataka",
          body: "Iznos, datum i izdavalac se čitaju sa slike i predlažu, pa se samo potvrđuju. Manje kucanja i manje grešaka u prepisu.",
        },
        {
          title: "Podsetnik pred rok",
          body: "Obaveštenje klijentu nekoliko dana pre dospeća obaveze i pre isteka roka za dostavu. Poruka je jeftinija od poziva.",
        },
        {
          title: "Pitanje vezano za dokument",
          body: "Klijent pita uz konkretan račun, a ne u opštoj poruci. Odgovor traje minut umesto pet minuta traženja o čemu se radi.",
        },
      ],
    },
    internal: {
      lead: "Interni deo je kontrolna tabla agencije: ko kasni, šta dospeva, ko koliko stvarno radi.",
      items: [
        {
          title: "Klijenti sa profilom obaveza",
          body: "Oblik poslovanja, PDV status, zaposleni, rokovi koji se na njih odnose. Novi klijent dobija svoj kalendar obaveza automatski.",
        },
        {
          title: "Kalendar rokova po klijentu",
          body: "Ne samo šta dospeva nego i za koga je urađeno, za koga se čeka podatak i gde je zastoj. Mesec se vidi unapred, ne poslednjeg dana.",
        },
        {
          title: "Šta nedostaje, po klijentu",
          body: "Spisak nedostajuće dokumentacije, sa automatskim podsetnikom. Urgencija ide sama, pa knjigovođa ne troši dan na telefoniranje.",
        },
        {
          title: "Raspodela po knjigovođi",
          body: "Ko vodi koje klijente i koliko dokumenata to nosi. Preopterećenje se vidi pre nego što se pojavi greška ili otkaz.",
        },
        {
          title: "Paušal i dodatni rad",
          body: "Ugovorena mesečna naknada i sve preko nje, evidentirano dok se radi. Poskupljenje se traži sa brojkom, ne sa osećajem.",
        },
        {
          title: "Predaja prijava i potvrde",
          body: "Status svake prijave i mesto gde stoji potvrda o predaji. Kad se posle dve godine traži dokaz, nalazi se za minut.",
        },
      ],
    },
  },
  compliance: [
    {
      title: "Podaci klijenata i poslovna tajna",
      body: "Agencija drži finansijske i lične podatke desetina firmi. Prava pristupa po knjigovođi, zapis pristupa i šifrovane rezervne kopije su uslov, ne dodatak.",
    },
    {
      title: "Rokovi čuvanja dokumentacije",
      body: "Knjigovodstvena dokumentacija ima propisane rokove čuvanja. Digitalna arhiva sa pretragom i izvozom čini da se dokument nađe i kad se traži posle više godina.",
    },
    {
      title: "Sistem e-faktura i elektronska evidencija",
      body: "Ulazne i izlazne fakture klijenata prolaze kroz sistem e-faktura. Portal se pravi tako da dopunjuje taj tok, a ne da ga duplira.",
    },
    {
      title: "Granica odgovornosti",
      body: "Šta je obaveza agencije, a šta klijenta — kad je dokument dostavljen i šta ako kasni. Sistem beleži vreme dostave, pa je to pitanje činjenica umesto rasprave.",
    },
  ],
  value: {
    title: "Šta tačno dobijate za novac",
    lead: "Dani koji odlaze na sređivanje i jurenje papira vraćaju se u posao. Ti dani su ceo mesec godišnje.",
    items: [
      {
        title: "Dokumentacija stiže u upotrebljivom obliku",
        body: "Jedan kanal, imenovano, vezano za klijenta i period. Priprema pre knjiženja se skraćuje svakog meseca, za svakog klijenta.",
      },
      {
        title: "Urgencija ide sama",
        body: "Podsetnik i spisak onoga što fali rade posao koji je do sada radio čovek telefonom. To je najdosadniji deo posla i prvi koji treba da nestane.",
      },
      {
        title: "Dodatni rad postaje vidljiv",
        body: "Kad se meri, vidi se koji klijent troši tri puta više vremena nego što plaća. Tek tada razgovor o ceni ima osnov.",
      },
      {
        title: "Agencija može da primi više klijenata",
        body: "Isti ljudi vode veći broj firmi jer im je sređivanje skraćeno. Rast bez zapošljavanja je jedini rast koji se odmah vidi u zaradi.",
      },
    ],
  },
  proof: [],
  faq: [
    {
      q: "Imamo knjigovodstveni program. Da li ovo znači da ga menjamo?",
      a: "Ne. Program radi knjiženje i ostaje. Ovo je sloj ispred njega: dostava dokumentacije, rokovi, komunikacija sa klijentom i naplata. Tamo gde program ima izvoz ili API, podaci se prosleđuju umesto da se kucaju ponovo.",
    },
    {
      q: "Naši klijenti neće da koriste portal.",
      a: "Deo neće, i za njih ostaje stari način. Ali čim tri od deset klijenata pređu, dobija se dan mesečno. Portal se pravi tako da je slanje računa slikom brže od slanja na Viber, inače nema šanse.",
    },
    {
      q: "Da li se povezuje sa sistemom e-faktura?",
      a: "Ulazne i izlazne fakture klijenata se povlače tamo gde je pristup moguć, da se ne unose ručno. Detalji se dogovaraju po klijentu, jer nemaju svi isti nivo pristupa.",
    },
    {
      q: "Šta sa obračunom zarada?",
      a: "Obračun ostaje u programu koji ga radi. Sistem vodi ono oko njega: podaci o zaposlenima, bolovanja, promene i rok za predaju, plus dostava obračunskih listića zaposlenima.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Prva faza je portal za dostavu i spisak onoga što fali — tu se odmah vraća vreme. Rokovi, raspodela i naplata idu kao druga faza, sa svojim obimom i rokom.",
    },
    {
      q: "Da li je bezbedno držati dokumentaciju klijenata online?",
      a: "Bezbednije je nego u kesi i na Viberu. Pristup po ulozi, zapis ko je šta otvorio, šifrovane rezervne kopije i server koji vi kontrolišete. To su stvari koje se ugrađuju od početka.",
    },
  ],
  inquiryService: "interne-poslovne-aplikacije",
  related: [
    { href: "/interni-softver-umesto-excel-tabela", label: "Interni softver umesto Excel tabela" },
    { href: "/softver-za-advokatsku-kancelariju", label: "Advokatske kancelarije" },
    { href: "/our-services/interne-poslovne-aplikacije", label: "Interne poslovne aplikacije" },
  ],
};
