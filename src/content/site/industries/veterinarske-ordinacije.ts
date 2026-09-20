import type { IndustryPage } from "./types";

export const veterinarskeOrdinacije: IndustryPage = {
  slug: "softver-za-veterinarsku-ambulantu",
  sector: "zdravstvo",
  navLabel: "Veterinarske ambulante",
  seo: {
    title: "Softver i sajt za veterinarsku ambulantu",
    metaDescription:
      "Sistem po meri za veterinarsku ambulantu: karton životinje, podsetnik za vakcinu i revakcinaciju, zakazivanje pregleda, terapija i doziranje po težini, lager lekova i vakcina, naplata i saradnja sa vlasnikom.",
    keywords: [
      "softver za veterinarsku ambulantu",
      "program za veterinare",
      "karton životinje softver",
      "podsetnik za vakcinaciju pasa",
      "zakazivanje kod veterinara",
      "evidencija vakcina veterina",
      "sajt za veterinarsku ordinaciju",
    ],
  },
  hero: {
    eyebrow: "Zdravstvo · veterina",
    title: "Ambulanta koja sama zove kad je vakcina na redu",
    lead: "Pravimo sistem u kome svaka životinja ima svoj karton, vlasnik dobije podsetnik pre isteka vakcine, a doza se računa po aktuelnoj težini umesto po sećanju.",
  },
  summary:
    "Veterinarskoj ambulanti sistem rešava tri stvari koje papir ne može: karton je vezan za životinju kroz ceo njen život, sa težinom, terapijama i alergijama; podsetnik za vakcinu i antiparazitsku terapiju stiže vlasniku pre roka, ne posle; a doziranje se računa po poslednjoj izmerenoj težini, što smanjuje prostor za grešku. Adspire to pravi po meri — sajt sa zakazivanjem, web aplikaciju za vlasnika ljubimca, mobilnu aplikaciju za terenske izlaske i interni admin za lager lekova i naplatu.",
  audience: [
    "Gradska ambulanta za male životinje, sa jednim do tri veterinara",
    "Ambulanta koja radi i teren za stoku, sa izlascima na gazdinstva",
    "Klinika sa stacionarom, hirurgijom i laboratorijom",
    "Ambulanta koja sarađuje sa azilom ili udruženjem i vodi čipovanje",
  ],
  dayInTheLife: [
    {
      title: "Vakcinalna knjižica je jedini zapis",
      body: "Ako je vlasnik zaboravi ili izgubi, istorija nestaje. Šta je dato pre godinu dana, koja serija vakcine i da li je bilo reakcije — zna se samo ako se neko seti.",
    },
    {
      title: "Revakcinacija se propušta",
      body: "Vlasnik dođe tri meseca kasno ili ne dođe uopšte. Ambulanta gubi pregled koji je najlakši i najredovniji, a životinja ostaje nezaštićena.",
    },
    {
      title: "Težina se pamti po utisku",
      body: "Doza terapije zavisi od kilograma. Bez merenja koje se beleži uz svaku posetu, doziranje se procenjuje, a kod male životinje razlika nije bezazlena.",
    },
    {
      title: "Hitan slučaj ruši raspored",
      body: "Zakazan pregled čeka jer je stigla povreda. Niko nije obavestio one koji su na redu, pa čekaonica postaje mesto za svađu umesto za čekanje.",
    },
    {
      title: "Lekovi isteknu na polici",
      body: "Vakcine i ampule imaju rok i uslove čuvanja. Bez evidencije po seriji i roku, deo se baci, a deo zatreba baš onda kad ga nema.",
    },
  ],
  layers: {
    site: {
      lead: "Sajt ambulante mora da radi u panici: čovek čiji je pas povređen traži telefon i adresu za tri sekunde.",
      items: [
        {
          title: "Hitan kontakt iznad svega",
          body: "Telefon, adresa i radno vreme na vrhu, bez skrolovanja. Sve ostalo na sajtu je manje važno od toga da se broj vidi odmah.",
        },
        {
          title: "Zakazivanje po vrsti pregleda",
          body: "Vakcinacija, sistematski, kontrola i hirurgija ne traju isto. Termin se nudi po realnom trajanju, pa se hitni slučajevi lakše uguraju bez rušenja dana.",
        },
        {
          title: "Odgovori na pitanja koja se traže noću",
          body: "Šta raditi kad pas pojede čokoladu, kako prepoznati toplotni udar, kada mače dobija prvu vakcinu. Ti tekstovi dovode ljude na sajt pre nego što im zatreba ambulanta.",
        },
        {
          title: "Usluge i uslovi jasno napisani",
          body: "Čipovanje, pasoš za putovanje, sterilizacija, stacionar. Čovek koji planira put u inostranstvo traži tačno tu stranu, mesecima unapred.",
        },
      ],
    },
    webApp: {
      lead: "Web aplikacija je za vlasnika ljubimca — digitalna knjižica koja ne može da se izgubi.",
      items: [
        {
          title: "Karton ljubimca na telefonu",
          body: "Vakcine sa datumima, terapije, težina kroz vreme i preporuke. Vlasnik koji putuje ili menja veterinara nosi celu istoriju sa sobom.",
        },
        {
          title: "Podsetnik pre isteka",
          body: "Vakcina, antiparazitska terapija, kontrola posle operacije. Poruka stiže pre roka, pa se pregled zakazuje umesto da se propusti.",
        },
        {
          title: "Zakazivanje i pomeranje termina",
          body: "Vlasnik bira slobodan termin i menja ga sam. Kad hitan slučaj pomeri raspored, obaveštenje ide svima koje to dotiče odjednom.",
        },
        {
          title: "Nalazi i preporuke posle pregleda",
          body: "Nalaz laboratorije, uputstvo za terapiju i doziranje u pisanom obliku. Uputstvo izgovoreno na vratima zaboravi se do večeri.",
        },
      ],
    },
    mobile: {
      lead: "Mobilna aplikacija je za veterinara na terenu — gazdinstvo, štala, kuća, često bez signala.",
      items: [
        {
          title: "Karton na izlasku",
          body: "Istorija životinje ili celog stada dostupna na licu mesta, bez vraćanja u ambulantu po podatak.",
        },
        {
          title: "Unos zahvata dok traje",
          body: "Dat lek, serija, doza i vreme upisuju se odmah. Beleška napisana uveče je beleška koja fali ili greši.",
        },
        {
          title: "Očitavanje mikročipa i oznake",
          body: "Broj čipa ili ušne markice se unosi skeniranjem umesto prepisivanjem. Jedna pogrešna cifra pravi pogrešan karton.",
        },
        {
          title: "Radi bez interneta",
          body: "Teren najčešće nema vezu. Podaci se upisuju offline i sinhronizuju kad se veterinar vrati u domet.",
        },
      ],
    },
    internal: {
      lead: "Interni deo drži ono što se po zakonu mora voditi i ono što odlučuje da li ambulanta zarađuje.",
      items: [
        {
          title: "Karton vezan za životinju, ne za vlasnika",
          body: "Vrsta, rasa, čip, težina kroz vreme, alergije, terapije i operacije. Životinja promeni vlasnika, istorija ostaje.",
        },
        {
          title: "Evidencija vakcina po seriji",
          body: "Koja vakcina, koje serije, kome i kada. To je podatak koji se traži i pri kontroli i kad se pojavi problem sa određenom serijom.",
        },
        {
          title: "Lager lekova sa rokovima",
          body: "Stanje po seriji, rok trajanja i upozorenje pre isteka. Manje bačenog leka i manje situacija kad terapija mora da se odloži.",
        },
        {
          title: "Doziranje po težini",
          body: "Predlog doze na osnovu poslednje izmerene težine i vrste. Sistem ne zamenjuje veterinara, ali sprečava grešku u računu.",
        },
        {
          title: "Stacionar i raspored dežurstava",
          body: "Ko je primljen, u kom boksu, koja terapija i u koliko sati. Smena koja preuzima vidi sve, bez usmene predaje koja nešto izostavi.",
        },
        {
          title: "Naplata i saradnja sa udruženjima",
          body: "Naplata vlasniku, ali i obračun prema azilu, udruženju ili gradu ako radite po ugovoru. Dve vrste računa iz iste evidencije.",
        },
      ],
    },
  },
  compliance: [
    {
      title: "Obavezna evidencija u veterini",
      body: "Vakcinacija, čipovanje i primena lekova se vode propisanom evidencijom sa rokovima čuvanja. Sistem je vodi u obliku koji može da se odštampa ili izveze kad ga neko zatraži.",
    },
    {
      title: "Lekovi na recept i uslovi čuvanja",
      body: "Serija, rok i temperatura čuvanja se prate po stavci. Evidencija izdatih lekova mora da postoji i onda kad se sve dogodilo u pet minuta između dva pacijenta.",
    },
    {
      title: "Mikročip i registar kućnih ljubimaca",
      body: "Broj čipa se vezuje za životinju i vlasnika, sa podacima koji se prijavljuju u registar. Greška u broju se ispravlja teže nego što se pravi.",
    },
    {
      title: "Podaci vlasnika",
      body: "Ime, adresa i telefon su lični podaci. Podsetnik o vakcini je deo usluge, a reklamna poruka traži pristanak — sistem to razdvaja i beleži.",
    },
  ],
  value: {
    title: "Šta tačno dobijate za novac",
    lead: "Revakcinacija koja se ne propusti i lek koji se ne baci. To su dva mesta gde ambulanta tiho gubi.",
    items: [
      {
        title: "Redovni pregledi se vraćaju sami",
        body: "Podsetnik pre isteka vakcine vraća deo vlasnika koji bi inače kasnili ili ne bi došli. To je najjednostavniji pregled u ambulanti.",
      },
      {
        title: "Manje bačenog materijala",
        body: "Upozorenje pre isteka roka omogućava da se serija iskoristi na vreme. Vakcina koja se baci je čist trošak bez ijednog prihoda.",
      },
      {
        title: "Čekaonica prestaje da bude problem",
        body: "Zakazivanje po trajanju i obaveštenje o kašnjenju smanjuju gužvu i nervozu. U prostoriji sa uplašenim životinjama to nije sitnica.",
      },
      {
        title: "Manje prostora za grešku u dozi",
        body: "Doza po izmerenoj težini, uz evidenciju alergija i prethodnih terapija. Greška koja se ne dogodi je najjeftinija greška.",
      },
    ],
  },
  proof: [],
  faq: [
    {
      q: "Nemate veterinarski sistem u portfoliju. Zašto bismo vas zvali?",
      a: "Tačno, nemamo — i nećemo se pretvarati da imamo. Ono što imamo je sistem sa zdravstvenim kartonom, terminima i evidencijom terapija koji radi u estetskoj klinici, i to je isti tip problema. Na prvom razgovoru kažemo šta znamo, a šta tek treba da naučimo o vašem poslu.",
    },
    {
      q: "Imamo program koji je došao uz laboratorijski aparat.",
      a: "Taj program vodi nalaze i najčešće treba da ostane. Ono što mu fali je karton, termini i podsetnici. Sistem se pravi oko toga, a nalazi se uvoze ili se aparat poveže, zavisno od toga šta podržava.",
    },
    {
      q: "Da li vlasnici stvarno koriste aplikaciju za ljubimca?",
      a: "Koriste je oni koji putuju, koji imaju više životinja i koji su izgubili knjižicu. Ostalima je dovoljan podsetnik porukom. Zato se aplikacija pravi kao dodatak, a podsetnik radi i bez nje.",
    },
    {
      q: "Radimo i teren za stoku, ne samo male životinje.",
      a: "Onda su to dva različita toka u istom sistemu: kućni ljubimac ima svoj karton, a gazdinstvo ima grla, oznake i grupne tretmane. Terenski deo mora da radi offline, jer signala najčešće nema.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Prva faza je karton i podsetnici, jer to odmah vraća preglede. Lager, stacionar i naplata idu kao druga faza, sa svojim obimom i rokom.",
    },
    {
      q: "Ko drži podatke?",
      a: "Vi. Baza je na vašem hostingu, sa rezervnim kopijama i vašim pristupom. Nema mesečne pretplate po korisniku i nema gubitka podataka ako prekinemo saradnju.",
    },
  ],
  inquiryService: "interne-poslovne-aplikacije",
  related: [
    { href: "/softver-za-stomatolosku-ordinaciju", label: "Stomatološke ordinacije" },
    { href: "/interni-softver-umesto-excel-tabela", label: "Interni softver umesto Excel tabela" },
    { href: "/online-zakazivanje-za-salone-i-klinike", label: "Online zakazivanje za klinike" },
  ],
};
