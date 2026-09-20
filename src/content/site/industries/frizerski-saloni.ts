import type { IndustryPage } from "./types";
import { doctorBarberProof } from "./proof";

export const frizerskiSaloni: IndustryPage = {
  slug: "softver-za-frizerski-salon-i-berbernicu",
  sector: "lepota-i-nega",
  navLabel: "Frizerski saloni i berbernice",
  seo: {
    title: "Softver i sajt za frizerski salon i berbernicu",
    metaDescription:
      "Sistem po meri za salon i berbernicu: zakazivanje po radniku i usluzi, podsetnici protiv nedolazaka, kartica stalne mušterije, provizija po radniku, potrošnja boje i dnevni pazar. Sajt, web i mobilna aplikacija, interni admin.",
    keywords: [
      "softver za frizerski salon",
      "program za berbernicu",
      "zakazivanje u salonu online",
      "aplikacija za frizere",
      "provizija radnika salon",
      "sajt za berbernicu",
      "evidencija mušterija salon",
    ],
  },
  hero: {
    eyebrow: "Lepota i nega · frizeri",
    title: "Salon u kome je stolica puna, a niko ne vodi termine u svesci",
    lead: "Pravimo sistem koji drži raspored po radniku, podseća mušteriju dan pre, pamti šta je kome rađeno i sam računa proviziju na kraju smene.",
  },
  summary:
    "Frizerskom salonu i berbernici sistem rešava četiri svakodnevne stvari: mušterija bira radnika i slobodan termin sa telefona umesto da zove usred šišanja, podsetnik dan ranije smanjuje broj praznih stolica, kartica mušterije pamti formulu boje i prethodne usluge, a provizija po radniku i dnevni pazar se računaju sami. Adspire gradi to po meri — javni sajt sa zakazivanjem, web aplikaciju za mušterije, mobilnu aplikaciju za ekipu i interni admin za pazar, proviziju i zalihe.",
  audience: [
    "Berbernica sa dva do osam stolica i stalnom ekipom",
    "Frizerski salon sa bojenjem, gde se formula mora pamtiti",
    "Salon sa radnicima koji rade po provizijama ili po zakupu stolice",
    "Salon sa dve lokacije i mušterijama koje idu na obe",
  ],
  dayInTheLife: [
    {
      title: "Telefon zvoni dok su ruke u kosi",
      body: "Poziv usred šišanja znači ili prekinut posao ili propuštenu mušteriju. Uveče se u svesku prepisuje ono što se zapamtilo, a zapamti se otprilike.",
    },
    {
      title: "Sveska zna samo jedan dan",
      body: "Ko je došao prošlog meseca, koliko često dolazi, šta je radio — to se ne vidi nigde. Mušterija koja je prestala da dolazi nestane tiho, bez ijednog signala.",
    },
    {
      title: "Prazna stolica u subotu popodne",
      body: "Neko ne dođe i ne javi. Termin je bio rezervisan, radnik je čekao, a u redu je bilo troje koji bi došli da su znali da je slobodno.",
    },
    {
      title: "Formula boje živi u glavi jedne osobe",
      body: "Radnica koja je mešala boju je na godišnjem, a mušterija hoće isti ton. Pogađa se, pa se popravlja, pa se gubi sat i poverenje.",
    },
    {
      title: "Provizija se računa u nedelju uveče",
      body: "Ko je koliko uradio, koliko je prodato proizvoda, koliko ide kome. Sat i po na kalkulatoru svake nedelje, uz svađu kad se brojevi ne slože.",
    },
  ],
  layers: {
    site: {
      lead: "Sajt salona radi jedno: pretvara pretragu u zakazan termin, umesto u poziv koji se propusti.",
      items: [
        {
          title: "Izbor radnika, ne samo termina",
          body: "Ljudi u ovom poslu ne dolaze u salon — dolaze kod svog frizera. Zakazivanje koje ne nudi izbor osobe propušta razlog zbog kog mušterija uopšte dolazi.",
        },
        {
          title: "Cenovnik koji se ne krije",
          body: "Šišanje, brada, bojenje, pramenovi, tretman — sa cenom ili rasponom. Skrivena cena u ovom poslu ne pravi misteriju nego sumnju.",
        },
        {
          title: "Galerija radova kao glavni argument",
          body: "Fade, brada, balajaž — slike sopstvenih radova prodaju bolje od bilo kog teksta. Sajt ih prikazuje po vrsti usluge, tako da se pretraga poklopi sa slikom.",
        },
        {
          title: "Poklon vaučer koji se kupuje online",
          body: "Vaučer za šišanje je čest poklon i najlakši prihod koji salon može da doda. Kupi se sa sajta, iskoristi se u salonu, evidencija ide sama.",
        },
      ],
    },
    webApp: {
      lead: "Web aplikacija je za mušteriju koja dolazi redovno — da zakazivanje traje deset sekundi, bez instalacije.",
      items: [
        {
          title: "Ponovi poslednji termin",
          body: "Isti radnik, ista usluga, sledeći slobodan sličan termin. Jedno dugme, jer devedeset posto mušterija u ovom poslu traži tačno to.",
        },
        {
          title: "Lista čekanja za pun termin",
          body: "Kad se neko otkaže, obaveštenje ide onima koji čekaju taj dan. Prazna stolica se popuni sama, bez zvanja po spisku.",
        },
        {
          title: "Kartica stalne mušterije",
          body: "Broj poseta, pogodnost posle određenog broja dolazaka, istorija usluga. Vernost prestaje da bude osećaj i postaje razlog da se vrati.",
        },
        {
          title: "Otkazivanje sa pravilom",
          body: "Otkazivanje do određenog roka je slobodno, kasnije nije. Pravilo stoji napisano i primenjuje se samo — bez neprijatnog razgovora na vratima.",
        },
      ],
    },
    mobile: {
      lead: "Mobilna aplikacija je za ekipu: svako vidi svoj dan i svoj novac, bez pitanja šefu.",
      items: [
        {
          title: "Svoj raspored u džepu",
          body: "Radnik vidi svoje termine, pauze i slobodna mesta. Zamena smene se dogovara u sistemu umesto u grupi na Viberu.",
        },
        {
          title: "Svoja zarada u realnom vremenu",
          body: "Koliko je uradio danas i koliko mu ide. Transparentan broj ukida najčešći izvor trvenja u salonu.",
        },
        {
          title: "Slika rada pravo u karticu mušterije",
          body: "Fotografija posle usluge ide u karticu i u galeriju, uz zabeležen pristanak za objavu. Dva posla u jednom dodiru.",
        },
        {
          title: "Push podsetnik mušterijama",
          body: "Podsetnik dan pre termina bez troška po poruci. Salon koji podseća ima osetno manje praznih stolica od salona koji ne podseća.",
        },
      ],
    },
    internal: {
      lead: "Interni deo je ono što razdvaja salon koji zna svoje brojeve od salona koji broji pazar na kraju smene.",
      items: [
        {
          title: "Kartica mušterije sa formulom",
          body: "Formula boje, vreme držanja, alergije, omiljena dužina i beleške. Znanje ostaje u salonu i kad radnica ode na godišnji ili promeni posao.",
        },
        {
          title: "Raspored po radniku i po stolici",
          body: "Trajanje po usluzi, pauze, smene i godišnji. Dan se ne preklapa, a neko ko radi popodne ne dobija termin u osam ujutru.",
        },
        {
          title: "Pazar i naplata po danu",
          body: "Gotovina, kartica, vaučer i prodati proizvodi na jednom mestu. Na kraju smene stoji broj, ne procena.",
        },
        {
          title: "Provizija koja se računa sama",
          body: "Procenat po usluzi, po radniku ili po zakupu stolice. Obračun je gotov kad se smena zatvori — ne u nedelju uveče.",
        },
        {
          title: "Potrošnja boje i zalihe",
          body: "Koliko je utrošeno po tretmanu i šta treba naručiti. Boja je najveći tihi trošak u salonu i jedini koji se meri samo ako se beleži.",
        },
        {
          title: "Ko je prestao da dolazi",
          body: "Spisak mušterija koje nisu bile duže nego što im je uobičajeno. Jedna poruka tom spisku vraća više ljudi nego bilo koja objava.",
        },
      ],
    },
  },
  compliance: [
    {
      title: "Fiskalizacija svake usluge",
      body: "Usluga fizičkom licu se fiskalizuje. Sistem se povezuje sa fiskalnim rešenjem koje već koristite, pa se isti iznos ne kuca dvaput i pazar se slaže sa evidencijom.",
    },
    {
      title: "Podaci mušterija i pristanak za poruke",
      body: "Telefon i beleške o tretmanu su lični podaci. Podsetnik o terminu je deo usluge, ali reklamna poruka traži pristanak — sistem to razdvaja i beleži.",
    },
    {
      title: "Pristanak za objavu fotografije",
      body: "Slika rada sa prepoznatljivim licem ide u galeriju samo uz zabeležen pristanak koji može da se povuče. Objava prati taj status automatski.",
    },
    {
      title: "Evidencija radnog vremena i smena",
      body: "Raspored i sati se vode u sistemu, pa je podatak spreman i za obračun zarade i za slučaj da ga neko zatraži.",
    },
  ],
  value: {
    title: "Šta tačno dobijate za novac",
    lead: "Popunjena stolica i obračun koji ne jede nedelju uveče. Sve ostalo je posledica ta dva.",
    items: [
      {
        title: "Manje praznih termina",
        body: "Podsetnik dan pre i lista čekanja popunjavaju mesta koja bi inače propala. Svaka popunjena subota se vidi u pazaru iste nedelje.",
      },
      {
        title: "Zakazivanje van radnog vremena",
        body: "Najviše termina se zakazuje uveče, kad salon ne radi i telefon ne zvoni. To je posao koji se inače prosto ne dogodi.",
      },
      {
        title: "Obračun bez kalkulatora",
        body: "Provizija je gotova kad se smena zatvori. Vreme koje je išlo na sabiranje ide na mušterije, a rasprave o brojevima prestaju.",
      },
      {
        title: "Mušterije se vraćaju češće",
        body: "Kartica i podsetnik skraćuju razmak između dolazaka. Isti broj ljudi, više poseta godišnje — to je najjeftiniji rast koji salon ima.",
      },
    ],
  },
  proof: [doctorBarberProof],
  faq: [
    {
      q: "Postoje gotove aplikacije za zakazivanje. Zašto praviti svoje?",
      a: "Ako gotova aplikacija radi posao i mesečna cena vam odgovara — ostanite na njoj. Svoje ima smisla kad plaćate po radniku pa raste sa ekipom, kad hoćete zakazivanje na sopstvenom sajtu umesto na tuđoj platformi, ili kad vam treba nešto što ta aplikacija ne radi: zakup stolice, formula boje, dve lokacije.",
    },
    {
      q: "Da li mušterije zaista zakazuju preko interneta?",
      a: "Mlađe da, starije i dalje zovu. Poenta nije da telefon nestane nego da se prepolovi, i da termini dolaze i kad je salon zatvoren. Telefon ostaje, samo ne zvoni svakih deset minuta.",
    },
    {
      q: "Šta sa mušterijama koje ne dolaze na zakazan termin?",
      a: "Podsetnik dan ranije skida najveći deo. Ostatak se rešava pravilom: ponovljeno nedolaženje traži potvrdu ili akontaciju za sledeći termin. Sistem to prati umesto da neko pamti ko je koliko puta izneverio.",
    },
    {
      q: "Radi li ovo ako radnici rade po zakupu stolice?",
      a: "Radi, i tu je obračun najkorisniji. Svaki radnik ima svoj kalendar i svoj obračun, a salon vidi zbir. Model naplate — procenat, fiksni zakup ili kombinacija — podešava se po vašem dogovoru.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Sajt sa zakazivanjem je prva faza i najbrže vraća uloženo. Kartica mušterije, provizija i zalihe idu posle, kao zasebna faza sa svojim obimom i rokom.",
    },
    {
      q: "Šta ako otvorimo drugu lokaciju?",
      a: "Sistem se pravi sa više lokacija od početka, i kad postoji samo jedna. Dodavanje druge je podešavanje, ne nova aplikacija — kalendar i pazar se razdvajaju, kartica mušterije ostaje zajednička.",
    },
  ],
  inquiryService: "sistemi-za-zakazivanje",
  related: [
    { href: "/online-zakazivanje/frizerski-saloni-i-berbernice", label: "Samo online zakazivanje termina" },
    { href: "/softver-za-salon-lepote", label: "Salon lepote i estetski tretmani" },
    { href: "/our-projects/doctor-barber-online-booking-sistem", label: "Studija slučaja: Doctor Barber" },
  ],
};
