import type { IndustryPage } from "./types";

export const advokatskeKancelarije: IndustryPage = {
  slug: "softver-za-advokatsku-kancelariju",
  sector: "profesionalne-usluge",
  navLabel: "Advokatske kancelarije",
  seo: {
    title: "Softver za advokatsku kancelariju",
    metaDescription:
      "Sistem po meri za advokatsku kancelariju: predmeti i stranke, rokovi za žalbu i podnesak, ročišta u kalendaru, obračun po satu ili po tarifi, dokumenta uz predmet i klijentski pristup sa pravima.",
    keywords: [
      "softver za advokatsku kancelariju",
      "program za advokate",
      "evidencija predmeta advokat",
      "rokovi za žalbu podsetnik",
      "obračun po satu advokat",
      "upravljanje dokumentima kancelarija",
      "kalendar ročišta softver",
    ],
  },
  hero: {
    eyebrow: "Profesionalne usluge · pravo",
    title: "Kancelarija u kojoj nijedan rok ne zavisi od toga ko se setio",
    lead: "Gradimo sistem u kome predmet nosi svoje rokove, ročišta i dokumenta, a obračun rada izlazi iz onoga što je stvarno odrađeno.",
  },
  summary:
    "Advokatskoj kancelariji sistem rešava ono što se ne sme prepustiti sećanju: rokovi za žalbu i podnesak računaju se od datuma prijema i javljaju se unapred, ročišta stoje u zajedničkom kalendaru sa predmetom uz sebe, sva dokumenta i prepiska vezani su za predmet umesto za nečiji folder, a rad se beleži dok traje pa se obračun po satu ili po tarifi ne rekonstruiše na kraju meseca. Adspire to pravi po meri — sajt koji donosi upite, klijentski pristup, mobilnu aplikaciju za sud i teren i interni admin za predmete i naplatu.",
  audience: [
    "Samostalni advokat sa velikim brojem manjih predmeta",
    "Kancelarija sa više advokata i pripravnika koji dele predmete",
    "Kancelarija koja radi za firme, sa mesečnim paušalom i izveštavanjem",
    "Kancelarija sa više oblasti, gde se tokovi po predmetu bitno razlikuju",
  ],
  dayInTheLife: [
    {
      title: "Rok se drži u rokovniku i u glavi",
      body: "Osam dana od prijema, petnaest od dostavljanja. Ako se jedan zavede pogrešno, ne postoji drugi zapis koji bi to uhvatio. Propušten rok u ovom poslu nije nezgoda nego odgovornost.",
    },
    {
      title: "Spis živi u fascikli i u mejlu",
      body: "Podnesak u fascikli, prepiska u mejlu, dokaz na telefonu, beleška u svesci. Kad kolega preuzme ročište, pola sata ode na sastavljanje slike.",
    },
    {
      title: "Klijent zove da pita dokle se stiglo",
      body: "Odgovor traje minut, ali poziv prekida rad na drugom predmetu. Deset takvih poziva dnevno je sat i po rada koji se ne naplaćuje.",
    },
    {
      title: "Sati se ne beleže dok se radi",
      body: "Priprema, poziv, dopis, konsultacija. Na kraju meseca se sabira po sećanju, i uvek naniže — jer se ono čega se ne sećate ne fakturiše.",
    },
    {
      title: "Ročišta se preklope",
      body: "Dva suda, isti termin, dva advokata koji misle da je onaj drugi slobodan. Bez zajedničkog kalendara, to se otkriva prekasno.",
    },
  ],
  layers: {
    site: {
      lead: "Sajt kancelarije ne prodaje advokaturu nego poverenje i jasnoću — i donosi upit koji se može proceniti.",
      items: [
        {
          title: "Strana po oblasti prava",
          body: "Radno, naknada štete, privredno, porodično, nekretnine. Čovek traži rešenje svog problema, ne spisak oblasti kojima se bavite.",
        },
        {
          title: "Objašnjeno šta klijent može da očekuje",
          body: "Koliko traje postupak, šta se predaje, koji su koraci. Tekst koji to objasni bez pravničkog jezika donosi više poziva od bilo koje reference.",
        },
        {
          title: "Upit sa osnovnim podacima",
          body: "Vrsta predmeta, kratak opis i rok ako postoji. Upit sa tim se procenjuje isti dan, a bez toga se troše dva poziva pre nego što razgovor počne.",
        },
        {
          title: "Granica onoga što se sme napisati",
          body: "Advokatski kodeks ograničava reklamiranje. Sajt se pravi tako da informiše i ne obećava ishod — i to je istovremeno i pravilo i dobra prodaja.",
        },
      ],
    },
    webApp: {
      lead: "Klijentski pristup je za stranku — da vidi svoj predmet bez poziva, i samo ono što sme da vidi.",
      items: [
        {
          title: "Stanje predmeta",
          body: "Šta je predato, šta se čeka, kada je sledeće ročište. Klijent koji to vidi zove dvostruko ređe.",
        },
        {
          title: "Razmena dokumenata bez mejla",
          body: "Stranka učitava dokaze i potpisane papire kroz pristup sa pravima, umesto da ih šalje na privatnu adresu. Osetljiv dokument prestaje da kruži.",
        },
        {
          title: "Pregled troškova",
          body: "Šta je obračunato, po kom osnovu i šta je plaćeno. Rasprava o računu se rešava pre nego što nastane.",
        },
        {
          title: "Poruke vezane za predmet",
          body: "Komunikacija stoji uz spis, ne u mejlu koji se izgubi. Kad predmet preuzme kolega, prepiska je tu gde treba.",
        },
      ],
    },
    mobile: {
      lead: "Mobilna aplikacija je za sud i put — spis u džepu, bez nošenja fascikle.",
      items: [
        {
          title: "Spis i ročište na telefonu",
          body: "Predmet, protivna strana, sudija, broj predmeta i podnesci. Sve što je potrebno pred vratima sudnice.",
        },
        {
          title: "Beleška odmah posle ročišta",
          body: "Šta je rečeno, šta je zadato i koji je sledeći rok, upisano u hodniku. Petnaest minuta kasnije već se zaboravlja polovina.",
        },
        {
          title: "Merenje vremena u jednom dodiru",
          body: "Start i stop na predmetu, ili unos posle. Vreme koje se ne izmeri kad se troši, ne naplati se nikad.",
        },
        {
          title: "Slika dokumenta u spis",
          body: "Rešenje preuzeto na pisarnici se slika i pada u predmet, a datum prijema pokreće računanje roka.",
        },
      ],
    },
    internal: {
      lead: "Interni sistem je kancelarija: predmeti, rokovi, ljudi, dokumenta i novac na jednom mestu.",
      items: [
        {
          title: "Predmet kao celina",
          body: "Stranke, protivna strana, sud, broj predmeta, faza postupka i istorija radnji. Jedan ekran zamenjuje fasciklu, mejl i svesku.",
        },
        {
          title: "Rokovi koji se računaju sami",
          body: "Od datuma prijema, po vrsti roka, sa upozorenjem nekoliko dana ranije i sa potvrdom da je radnja izvršena. Rok koji niko nije potvrdio ostaje crven.",
        },
        {
          title: "Kalendar ročišta cele kancelarije",
          body: "Ko je gde i kada, sa predmetom uz termin. Preklapanje se vidi pri zakazivanju, ne dan pre.",
        },
        {
          title: "Dokumenta sa verzijama",
          body: "Podnesci, prilozi i šabloni vezani za predmet, sa istorijom izmena. Prestaje da postoji pet verzija istog dopisa sa različitim imenima fajlova.",
        },
        {
          title: "Obračun po satu, tarifi ili paušalu",
          body: "Svaki model naplate iz istih podataka. Faktura se pravi iz evidentiranog rada, sa specifikacijom koju klijent razume.",
        },
        {
          title: "Šta se isplati, a šta ne",
          body: "Utrošeni sati naspram naplaćenog, po vrsti predmeta. Posle jednog kvartala se vidi koja oblast nosi kancelariju, a koja je samo navika.",
        },
      ],
    },
  },
  compliance: [
    {
      title: "Advokatska tajna i prava pristupa",
      body: "Spis sme da vidi samo onaj ko na njemu radi. Sistem vodi uloge, prava i zapis o tome ko je šta otvorio — to nije udobnost nego uslov posla.",
    },
    {
      title: "Ograničenja u oglašavanju",
      body: "Kodeks advokatske etike ograničava reklamiranje i obećavanje ishoda. Tekstovi na sajtu se pišu u tom okviru, jer prekršaj košta više od svakog dobijenog upita.",
    },
    {
      title: "Zaštita podataka stranaka",
      body: "Predmeti sadrže naročito osetljive podatke. Šifrovano čuvanje, rezervne kopije i kontrolisan izvoz su deo sistema od početka, ne naknadni dodatak.",
    },
    {
      title: "Evidencija i izdavanje računa",
      body: "Obračun po advokatskoj tarifi i faktura pravnom licu kroz sistem e-faktura. Specifikacija rada se izvodi iz evidencije, pa izdržava i proveru.",
    },
  ],
  value: {
    title: "Šta tačno dobijate za novac",
    lead: "Rok koji se ne propusti i sat koji se naplati. Prvo je odgovornost, drugo je prihod.",
    items: [
      {
        title: "Rizik od propuštenog roka pada",
        body: "Automatsko računanje i upozorenje unapred uklanjaju najveću opasnost u ovom poslu. Jedan propušten rok košta više od celog sistema.",
      },
      {
        title: "Naplaćuje se ono što je odrađeno",
        body: "Vreme se beleži dok se troši, pa specifikacija odgovara stvarnom radu. Kancelarije koje počnu da mere redovno otkriju da su fakturisale manje nego što su radile.",
      },
      {
        title: "Predmet može da preuzme kolega",
        body: "Kad je sve uz spis, zamena zbog bolesti ili preklapanja traje pola sata umesto pola dana. Kancelarija prestaje da zavisi od jednog čoveka.",
      },
      {
        title: "Manje poziva, više rada",
        body: "Klijentski pristup skida najveći deo pitanja o stanju predmeta. To vreme se vraća u posao koji se naplaćuje.",
      },
    ],
  },
  proof: [],
  faq: [
    {
      q: "Imamo li pravo da klijentu damo pristup spisu online?",
      a: "Imate, uz kontrolu ko šta vidi. Zato se pravi sa ulogama i zapisom pristupa, i sa mogućnošću da se pojedini dokument ne deli. Šta se objavljuje klijentu ostaje vaša odluka po predmetu.",
    },
    {
      q: "Postoje gotovi programi za advokate.",
      a: "Postoje i neki rade dobro. Po meri se ide kad vam treba tok koji program ne predviđa, kad plaćate po korisniku pa raste sa pripravnicima, ili kad hoćete klijentski pristup pod svojim imenom. Ako vam postojeći program radi posao, nemojte menjati.",
    },
    {
      q: "Da li se povezuje sa portalom sudova?",
      a: "Ono što je javno dostupno i ima izvoz može da se povuče. Ono što nema, unosi se pri prijemu pismena — najčešće slikanjem, uz automatsko računanje roka. Šta je moguće proverava se konkretno pre početka.",
    },
    {
      q: "Ne želimo da merimo svaki minut.",
      a: "Onda se meri po radnji, ne štopericom: podnesak, ročište, konsultacija, svaka sa svojim uobičajenim trajanjem. Model naplate se prilagođava vama, ne obrnuto.",
    },
    {
      q: "Radimo i za firme, po mesečnom paušalu.",
      a: "Paušal se vodi kao ugovor sa obimom, a rad se i dalje beleži. Tako se na kraju godine vidi da li je paušal još realan ili radite dvostruko više nego što je dogovoreno.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Prva faza su predmeti, rokovi i kalendar — tu je najveći rizik i najveća korist. Dokumenta, klijentski pristup i obračun idu kao sledeća faza, sa svojim obimom i rokom.",
    },
  ],
  inquiryService: "interne-poslovne-aplikacije",
  related: [
    { href: "/interni-softver-umesto-excel-tabela", label: "Interni softver umesto Excel tabela" },
    { href: "/our-services/interne-poslovne-aplikacije", label: "Interne poslovne aplikacije" },
    { href: "/resenja-po-delatnosti", label: "Ostale delatnosti" },
  ],
};
