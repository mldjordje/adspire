import type { IndustryPage } from "./types";

export const rentACar: IndustryPage = {
  slug: "softver-za-rent-a-car",
  sector: "auto-i-transport",
  navLabel: "Rent-a-car i iznajmljivanje",
  seo: {
    title: "Softver i sajt za rent-a-car",
    metaDescription:
      "Sistem po meri za rent-a-car: online rezervacija sa proverom dostupnosti, ugovor i primopredaja sa fotografijama, kalendar flote, cenovnik po sezoni, depozit i kazne, rokovi registracije i servisa.",
    keywords: [
      "softver za rent a car",
      "program za iznajmljivanje vozila",
      "online rezervacija automobila",
      "ugovor o najmu vozila softver",
      "kalendar flote vozila",
      "evidencija šteta na vozilu",
      "sajt za rent a car",
    ],
  },
  hero: {
    eyebrow: "Auto i transport · iznajmljivanje",
    title: "Flota u kojoj se zna gde je svako vozilo i u kakvom je stanju vraćeno",
    lead: "Pravimo sistem sa kalendarom flote, rezervacijom koja ne može da se preklopi i primopredajom sa fotografijama koje rešavaju svaku raspravu o šteti.",
  },
  summary:
    "Rent-a-car firmi sistem rešava četiri stvari: dostupnost vozila se proverava sama pa se isti auto ne izda dvaput, ugovor i primopredaja sa fotografijama i stanjem goriva ukidaju raspravu o oštećenjima, cenovnik po sezoni i po trajanju radi bez ručnog računanja, a rokovi registracije i servisa javljaju se pre nego što vozilo mora da stane. Adspire to pravi po meri — sajt sa rezervacijom, web aplikaciju za stalne klijente i firme, mobilnu aplikaciju za primopredaju i interni admin za flotu i naplatu.",
  audience: [
    "Rent-a-car sa pet do sto vozila i jednom ili više lokacija",
    "Firma koja izdaje vozila i dugoročno, firmama na više meseci",
    "Iznajmljivanje kombija, prikolica ili građevinske mehanizacije",
    "Rent-a-car koji radi preuzimanje na aerodromu i van radnog vremena",
  ],
  dayInTheLife: [
    {
      title: "Dva rezervisana termina za isti auto",
      body: "Rezervacija primljena telefonom, druga porukom, treća iz mejla. Preklapanje se otkriva na dan preuzimanja, a tada je jedini izlaz skuplji auto ili izgubljen klijent.",
    },
    {
      title: "Rasprava o ogrebotini",
      body: "Klijent tvrdi da je bila pre, firma tvrdi suprotno. Bez datiranih fotografija sa primopredaje, naplaćuje se teško ili se ne naplaćuje uopšte.",
    },
    {
      title: "Gorivo i kilometraža se upisuju napamet",
      body: "Stanje pri izdavanju se zapamti, pa se pri vraćanju poredi sa sećanjem. Razlika od četvrtine rezervoara se ponavlja na svakom drugom najmu.",
    },
    {
      title: "Cena se računa u glavi",
      body: "Sedam dana u sezoni, sa dodatnim vozačem i dečjim sedištem, uz kasko. Svaki radnik računa malo drugačije, a klijent to primeti.",
    },
    {
      title: "Kazna stigne mesecima kasnije",
      body: "Prekršaj načinjen pre pola godine dolazi na firmu. Ko je tada vozio auto — traži se po ugovorima, ako se ugovor uopšte nađe.",
    },
  ],
  layers: {
    site: {
      lead: "Sajt rent-a-cara mora da završi rezervaciju, ne da pozove na poziv — klijent često rezerviše iz druge zemlje i u pola noći.",
      items: [
        {
          title: "Provera dostupnosti u realnom vremenu",
          body: "Datumi, lokacija preuzimanja i vraćanja, pa spisak vozila koja su stvarno slobodna. Formular koji samo šalje upit gubi klijenta koji je spreman da plati odmah.",
        },
        {
          title: "Cena koja se odmah vidi",
          body: "Ukupno za izabrane datume, sa dodacima i depozitom. Skrivena cena u ovom poslu znači da će klijent otvoriti sledeći sajt.",
        },
        {
          title: "Uslovi napisani bez sitnih slova",
          body: "Godine vozača, minimalno trajanje vozačke dozvole, ograničenje kilometraže, izlazak iz zemlje, politika goriva. Ovo se traži pre rezervacije, ne posle.",
        },
        {
          title: "Više jezika za goste iz inostranstva",
          body: "Aerodrom i turizam donose klijente koji ne čitaju srpski. Rezervacija na engleskom je razlika između posla i praznog vozila.",
        },
      ],
    },
    webApp: {
      lead: "Web aplikacija je za one koji se vraćaju — stalne klijente i firme sa mesečnim najmom.",
      items: [
        {
          title: "Nalog sa sačuvanim podacima",
          body: "Vozačka, lična, prethodni najmovi. Druga rezervacija traje trideset sekundi umesto pet minuta ponovnog unosa.",
        },
        {
          title: "Produženje najma bez dolaska",
          body: "Klijent traži još dva dana iz aplikacije, sistem proveri da li je vozilo slobodno i doračuna. Produženje dogovoreno telefonom se često zaboravi upisati.",
        },
        {
          title: "Firma sa više vozača",
          body: "Jedna firma, više zaposlenih koji uzimaju vozila, jedan mesečni račun. Ko je kada vozio se vidi bez zvanja administracije.",
        },
        {
          title: "Ugovori i računi na jednom mestu",
          body: "Svi ugovori i fakture dostupni za preuzimanje. Klijentu treba za putne troškove, a firmi za knjigovodstvo.",
        },
      ],
    },
    mobile: {
      lead: "Mobilna aplikacija je primopredaja — najvažnijih pet minuta celog posla, najčešće na parkingu.",
      items: [
        {
          title: "Fotografije vozila po šemi",
          body: "Obilazak vozila sa tačkama koje se moraju slikati, sa datumom i vremenom. To je dokaz koji rešava svaki kasniji spor o šteti.",
        },
        {
          title: "Stanje goriva i kilometraže",
          body: "Upisuje se pri izdavanju i pri vraćanju, uz sliku instrument-table. Razlika se doračunava po pravilu, ne po proceni.",
        },
        {
          title: "Potpis ugovora na ekranu",
          body: "Ugovor se potpisuje na telefonu i odmah šalje klijentu. Nema traženja štampača ni fascikle sa papirima u kolima.",
        },
        {
          title: "Skeniranje dokumenata",
          body: "Vozačka i lična se slikaju i vezuju za ugovor. Podaci se čitaju sa dokumenta umesto da se prekucavaju.",
        },
      ],
    },
    internal: {
      lead: "Interni sistem je flota: ko je gde, do kada, po kojoj ceni i koliko to vozilo stvarno donosi.",
      items: [
        {
          title: "Kalendar flote",
          body: "Svako vozilo sa svojim najmovima, servisima i blokadama. Preklapanje je nemoguće jer sistem ne dozvoli da se zauzet termin proda ponovo.",
        },
        {
          title: "Cenovnik po sezoni i trajanju",
          body: "Dnevna, nedeljna i mesečna cena, sezonski koeficijent, dodaci i osiguranje. Cena se računa sama, pa je ista kod svakog radnika.",
        },
        {
          title: "Depozit, kazne i naplata",
          body: "Blokiran depozit, evidencija oštećenja, naplata razlike goriva i prekoračenja kilometraže. Svaka stavka ima osnov u ugovoru.",
        },
        {
          title: "Prekršaji vezani za ugovor",
          body: "Kad stigne kazna, po datumu i vremenu se odmah zna ko je vozio. Prosleđivanje odgovornosti postaje posao od jednog minuta.",
        },
        {
          title: "Servisi i rokovi",
          body: "Registracija, servis po kilometraži, zamena guma, osiguranje. Vozilo se blokira u kalendaru unapred, pa servis ne pada usred rezervisanog termina.",
        },
        {
          title: "Zarada po vozilu",
          body: "Prihod naspram amortizacije, servisa i stajanja. Vozilo koje stoji dve trećine meseca postaje vidljivo, a odluka o prodaji dobija osnov.",
        },
      ],
    },
  },
  compliance: [
    {
      title: "Ugovor o najmu i obavezni podaci",
      body: "Ugovor nosi podatke o vozaču, vozilu, periodu i uslovima. Sistem ga generiše iz rezervacije, pa nema ugovora sa praznim poljima koja se posle traže.",
    },
    {
      title: "Podaci iz ličnih dokumenata",
      body: "Kopija vozačke i lične su osetljivi podaci sa svrhom i rokom čuvanja. Čuvaju se šifrovano i brišu po isteku, umesto da stoje u fascikli u kancelariji.",
    },
    {
      title: "Osiguranje i prijava štete",
      body: "Kasko, franšiza i postupak prijave se vezuju za ugovor. Kad se šteta dogodi, dokumentacija je već na okupu.",
    },
    {
      title: "Fiskalizacija i e-faktura",
      body: "Najam fizičkom licu ide kroz fiskalni račun, firmi kroz sistem e-faktura. Depozit se vodi odvojeno od prihoda, kako i treba.",
    },
  ],
  value: {
    title: "Šta tačno dobijate za novac",
    lead: "Vozilo koje ne stoji i šteta koja se naplati. To su jedine dve poluge u ovom poslu.",
    items: [
      {
        title: "Rezervacija se završava na sajtu",
        body: "Klijent koji može da rezerviše u dva ujutru ne zove konkurenciju ujutru. Posebno kad dolazi iz inostranstva.",
      },
      {
        title: "Nema dvostruko izdatog vozila",
        body: "Preklapanje košta skuplji zamenski auto ili izgubljenog klijenta sa lošom ocenom. Kalendar koji to ne dozvoljava rešava problem jednom zauvek.",
      },
      {
        title: "Oštećenja se naplaćuju",
        body: "Datirane fotografije sa primopredaje pretvaraju raspravu u činjenicu. Deo šteta koji se do sada otpisivao postaje naplativ.",
      },
      {
        title: "Servis ne obara rezervaciju",
        body: "Blokada vozila u kalendaru pre servisa sprečava da se termin proda pa otkaže. Otkazivanje u ovom poslu ostaje zabeleženo u oceni.",
      },
    ],
  },
  proof: [],
  faq: [
    {
      q: "Koristimo Booking i slične platforme. Da li nam treba svoj sajt?",
      a: "Platforme donose klijente, ali uzimaju proviziju od svake rezervacije. Svoj sajt sa pravom rezervacijom postepeno prebacuje deo posla na direktan kanal. Platforme ostaju, samo prestaju da budu jedini izvor.",
    },
    {
      q: "Da li se kalendar sinhronizuje sa platformama?",
      a: "Tamo gde platforma daje pristup kalendaru — da, da se izbegne dvostruka rezervacija. Gde ne daje, dostupnost se ažurira ručno, a sistem upozorava na konflikt pri unosu.",
    },
    {
      q: "Kako se rešava depozit?",
      a: "Najčešće blokadom na kartici pri preuzimanju, uz evidenciju iznosa i razloga oslobađanja. Sistem vodi stanje depozita odvojeno, pa se ne meša sa prihodom i zna se kome se šta duguje.",
    },
    {
      q: "Izdajemo i mehanizaciju, ne samo automobile.",
      a: "Logika je ista: jedinica sa kalendarom, cenom po vremenu, primopredajom i stanjem. Razlikuju se parametri — radni sati umesto kilometraže, transport do gradilišta, obučen rukovalac.",
    },
    {
      q: "Radimo preuzimanje na aerodromu van radnog vremena.",
      a: "Onda je mobilna primopredaja obavezna, jer se ugovor potpisuje na parkingu. Sistem mora da radi sa telefona i bez štampača, a potvrda odmah odlazi klijentu.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Prva faza je kalendar flote i rezervacija na sajtu, jer to odmah zaustavlja preklapanja i donosi direktne rezervacije. Primopredaja, depoziti i izveštaji idu kao druga faza.",
    },
  ],
  inquiryService: "sistemi-za-zakazivanje",
  related: [
    { href: "/softver-za-auto-servis", label: "Auto servisi i vulkanizeri" },
    { href: "/rezervacioni-sistemi-nis", label: "Rezervacioni sistemi" },
    { href: "/interni-softver-umesto-excel-tabela", label: "Interni softver umesto Excel tabela" },
  ],
};
