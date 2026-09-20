import type { IndustryPage } from "./types";
import { autoDelicProof } from "./proof";

export const autoServisi: IndustryPage = {
  slug: "softver-za-auto-servis",
  sector: "auto-i-transport",
  navLabel: "Auto servisi i vulkanizeri",
  seo: {
    title: "Softver i sajt za auto servis",
    metaDescription:
      "Sistem po meri za auto servis: zakazivanje prijema vozila, radni nalog sa utrošenim delovima i satima, istorija po vozilu, podsetnik za mali servis i registraciju, lager delova i naplata. Sajt, web i mobilna aplikacija, interni admin.",
    keywords: [
      "softver za auto servis",
      "program za auto servis",
      "radni nalog auto servis",
      "zakazivanje servisa vozila",
      "evidencija vozila servis",
      "lager delova program",
      "sajt za auto servis",
    ],
  },
  hero: {
    eyebrow: "Auto i transport · servis",
    title: "Servis u kome se zna čije je vozilo, šta je rađeno i šta sledi",
    lead: "Gradimo sistem koji vodi vozilo kroz servis: zakazan prijem, radni nalog sa delovima i satima, istorija po šasiji i podsetnik koji vraća mušteriju pre nego što je odvuče prvi konkurent.",
  },
  summary:
    "Auto servisu digitalni sistem rešava tri stvari koje se najskuplje plaćaju: prijem vozila se planira unapred umesto da se svi pojave u ponedeljak ujutru, radni nalog beleži utrošene delove i sate pa se ne zaboravlja šta je naplaćeno, a istorija po vozilu pokazuje šta je rađeno prošli put i šta stiže na red. Adspire to pravi po meri — sajt sa zakazivanjem, web aplikacija za vlasnika vozila, mobilna aplikacija za majstore i interni admin za lager i naplatu.",
  audience: [
    "Servis sa dve do deset dizalica, gde vlasnik istovremeno radi i prima mušterije",
    "Vulkanizer sa sezonskim špicem i depoom guma",
    "Servis koji održava vozni park firme i fakturiše mesečno",
    "Ovlašćeni servis koji mora da dokaže šta je rađeno pod garancijom",
  ],
  dayInTheLife: [
    {
      title: "Ponedeljak ujutru se gomila pred kapijom",
      body: "Šest vozila stiže u isto vreme jer se termin dogovara rečima „dovezi ujutru“. Polovina čeka do popodne, vlasnici zovu da pitaju dokle se stiglo, a majstor prekida posao da javi.",
    },
    {
      title: "Sezona guma obori sve",
      body: "Dve nedelje u proleće i dve u jesen donose više posla nego dva meseca zajedno. Bez zakazivanja po satu i bez evidencije depoa, pola vremena ode na traženje čijih je koja guma i gde stoji.",
    },
    {
      title: "Šta je tačno ugrađeno pre godinu dana",
      body: "Mušterija se vraća sa istim šumom. Da li je menjan ležaj ili samo čaure, koji proizvođač, da li je u garanciji — zna se otprilike, a otprilike ne prolazi kad se raspravlja o reklamaciji.",
    },
    {
      title: "Delovi se poruče pa se zaborave",
      body: "Deo stigne za tri dana, vozilo zauzima dizalicu, a niko ne prati koje vozilo čeka koji deo. Dizalica koja stoji je najskuplji kvadrat u servisu.",
    },
    {
      title: "Mali servis se ne podseća",
      body: "Vozilo se vraća na godinu dana ili kad se nešto pokvari, a moglo bi na šest meseci. Bez podsetnika po kilometraži i po datumu, redovno održavanje se prepušta tome da li se čovek setio.",
    },
  ],
  layers: {
    site: {
      lead: "Sajt servisa ne prodaje priču o kvalitetu — daje termin i pokazuje da se posao radi organizovano.",
      items: [
        {
          title: "Zakazivanje prijema po tipu posla",
          body: "Mali servis, dijagnostika, klima, trap i zamena guma ne traju isto. Termin se nudi po realnom trajanju, pa dan ima raspored umesto reda pred kapijom.",
        },
        {
          title: "Strana po usluzi sa cenom rada ili rasponom",
          body: "Čovek koji traži „zamena kvačila cena“ traži broj. Strana koja odgovori rasponom i objasni od čega zavisi dobija poziv; strana koja ćuti ga ne dobija.",
        },
        {
          title: "Marke i modeli koje radite",
          body: "Specijalizacija je razlog zbog kog neko vozi vozilo trideset kilometara dalje. To mora da piše na sajtu, u obliku u kom se pretražuje.",
        },
        {
          title: "Sezonska najava za gume i klimu",
          body: "Najava termina za sezonu pre nego što špic počne razvlači posao na tri nedelje umesto na pet dana ludila.",
        },
      ],
    },
    webApp: {
      lead: "Web aplikacija je za vlasnika vozila — da ne mora da zove da bi saznao gde je njegov auto.",
      items: [
        {
          title: "Status popravke bez poziva",
          body: "Primljeno, u radu, čeka deo, gotovo za preuzimanje. Jedan link koji se otvori na telefonu skida najveći deo poziva sa majstorove ruke.",
        },
        {
          title: "Odobravanje dodatnog posla",
          body: "Majstor otvori trap i nađe još dva problema. Predračun ide na telefon, vlasnik potvrdi šta radi, a potvrda ostaje zabeležena — bez naknadne rasprave o tome ko je šta odobrio.",
        },
        {
          title: "Servisna knjižica koja ne može da se izgubi",
          body: "Sve što je rađeno na vozilu, sa datumima i kilometražom. Vredi vlasniku pri prodaji vozila, a servisu vraća mušteriju koja zna gde joj je istorija.",
        },
        {
          title: "Vozni park na jednom nalogu",
          body: "Firma sa deset vozila vidi sva vozila, troškove po vozilu i šta je sledeće na redu, bez zvanja i bez tabele koju niko ne ažurira.",
        },
      ],
    },
    mobile: {
      lead: "Mobilna aplikacija je za ljude u radionici, sa rukavicama i prljavim rukama — mora da radi u tri dodira.",
      items: [
        {
          title: "Radni nalog na telefonu",
          body: "Majstor otvara svoj nalog, upisuje utrošene delove i vreme dok radi, ne uveče po sećanju. Ono što se ne upiše dok je sveže, ne naplati se.",
        },
        {
          title: "Fotografija štete pri prijemu",
          body: "Stanje vozila se slika pri preuzimanju i vezuje za nalog. Rasprava o ogrebotini koja je „bila ranije“ prestaje da bude reč protiv reči.",
        },
        {
          title: "Skeniranje šasije i dela",
          body: "Broj šasije i kod dela se očitaju kamerom umesto da se prepisuju. Greška u jednoj cifri košta pogrešno poručen deo i tri izgubljena dana.",
        },
        {
          title: "Podsetnik majstoru šta je sledeće",
          body: "Kad deo stigne ili se dizalica oslobodi, obaveštenje ide onome ko radi na tom vozilu — a ne na zajedničku grupu koju svi ignorišu.",
        },
      ],
    },
    internal: {
      lead: "Interni sistem je mesto gde se vidi da li servis zarađuje na radu ili samo prodaje delove sa malom maržom.",
      items: [
        {
          title: "Kartoteka vozila po šasiji",
          body: "Svaka intervencija vezana za vozilo, ne za ime vlasnika. Vozilo promeni vlasnika, istorija ostaje — a to je podatak koji vredi i pri reklamaciji i pri sledećem servisu.",
        },
        {
          title: "Radni nalog kao dokument",
          body: "Delovi, sati, majstor, cena rada i odobrenja na jednom mestu. Iz naloga se pravi račun ili faktura bez ponovnog kucanja.",
        },
        {
          title: "Lager delova i naručivanje",
          body: "Šta ima na polici, šta je rezervisano za vozilo koje čeka, šta je poručeno i kada stiže. Prestaje da se poručuje ono što već stoji u magacinu.",
        },
        {
          title: "Depo guma sa lokacijom",
          body: "Čije su gume, koji set, na kojoj polici i kada je poslednji put menjan. Sezona prestaje da zavisi od toga da li se neko seća gde je šta odloženo.",
        },
        {
          title: "Podsetnici po kilometraži i datumu",
          body: "Mali servis, registracija, zamena klime. Poruka ide sama, u pravo vreme, i vraća vozilo u servis bez ijednog poziva.",
        },
        {
          title: "Zarada po nalogu i po majstoru",
          body: "Koliko je naplaćeno rada, koliko delova, gde se gubi vreme. Odluka o novoj dizalici ili novom čoveku prestaje da bude osećaj.",
        },
      ],
    },
  },
  compliance: [
    {
      title: "Fiskalni račun i e-faktura",
      body: "Fizičkom licu ide fiskalni račun, firmi faktura kroz sistem e-faktura. Radni nalog se povezuje sa onim što već koristite, pa se isti iznos ne kuca na dva mesta i ne razilazi se sa knjigovodstvom.",
    },
    {
      title: "Garancija na ugrađeni deo i rad",
      body: "Rok garancije teče od datuma ugradnje i vezuje se za konkretan deo. Sistem to vodi umesto sveske, pa se reklamacija rešava iz evidencije, a ne iz sećanja.",
    },
    {
      title: "Opasan otpad i evidencija",
      body: "Staro ulje, filteri, akumulatori i gume imaju propisan tok predaje. Evidencija količina i preuzimanja se vodi u sistemu, pa je spremna kad je neko zatraži.",
    },
    {
      title: "Podaci o vlasniku vozila",
      body: "Ime, telefon, tablice i šasija su lični podaci. Vode se sa pravima pristupa i rokom čuvanja, a ne u zajedničkoj tabeli koju svako otvara.",
    },
  ],
  value: {
    title: "Šta tačno dobijate za novac",
    lead: "Dizalica koja ne stoji i posao koji se naplati ceo. To su dva mesta gde servis gubi novac bez da to primeti.",
    items: [
      {
        title: "Dan se planira, ne dešava",
        body: "Zakazan prijem po realnom trajanju znači da se više vozila provuče kroz isti broj dizalica. Kapacitet raste bez ijednog novog kvadrata.",
      },
      {
        title: "Ono što je urađeno se i naplati",
        body: "Sat rada i sitan deo koji se ne upiše nestaju iz računa. Upis dok se radi vraća taj novac, i vraća ga svaki dan.",
      },
      {
        title: "Mušterija se vraća sama",
        body: "Podsetnik po kilometraži pretvara jednokratnu popravku u vozilo koje dolazi dva puta godišnje. To je najjeftiniji posao koji servis može da dobije.",
      },
      {
        title: "Telefon prestaje da prekida rad",
        body: "Pozivi „dokle se stiglo“ nestaju kad status stoji na linku. Majstor radi bez prekida, a prekid je skuplji nego što izgleda.",
      },
    ],
  },
  proof: [autoDelicProof],
  faq: [
    {
      q: "Imamo svesku i radi nam godinama. Zašto menjati?",
      a: "Sveska radi dok je jedan majstor i dvadeset mušterija. Puca na trenutku kad treba naći šta je rađeno pre godinu dana, kad dva čoveka upisuju isto vozilo, ili kad se traži garancija. Ako nemate ta tri problema, sistem vam ne treba — i to ćemo vam reći.",
    },
    {
      q: "Mogu li majstori da nauče da rade u tome?",
      a: "Ako ne mogu, sistem je loše napravljen. Unos radnog naloga mora da bude brži od pisanja rukom, inače ga niko neće koristiti. Zato se ekran za majstora pravi posebno — velika dugmad, malo polja, radi sa telefona.",
    },
    {
      q: "Da li se povezuje sa katalogom delova ili dobavljačem?",
      a: "Može, ako dobavljač ima izvoz ili API. Najčešće se radi uvoz cenovnika i šifara, pa se deo na nalogu bira iz spiska umesto da se kuca. Šta je moguće proverava se pre početka, sa konkretnim dobavljačem.",
    },
    {
      q: "Šta ako imamo više poslovnica?",
      a: "Onda su lager i termini po poslovnici, a izveštaji zajednički. Kartoteka vozila je zajednička — mušterija koja dođe u drugu poslovnicu ne kreće od nule.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Prvo ide deo koji odmah rasterećuje: zakazivanje i radni nalog. Lager, depo guma i izveštaji idu kao sledeća faza. Svaka faza ima svoj obim, cenu i rok, i posle svake sistem već radi nešto korisno.",
    },
    {
      q: "Čiji su podaci?",
      a: "Vaši. Baza stoji na vašem serveru ili hostingu, sa rezervnim kopijama i vašim pristupom. Nema mesečne pretplate po korisniku niti zaključavanja podataka ako se saradnja prekine.",
    },
  ],
  inquiryService: "interne-poslovne-aplikacije",
  related: [
    { href: "/online-zakazivanje/auto-servisi-i-vulkanizeri", label: "Samo zakazivanje servisnih termina" },
    { href: "/interni-softver-umesto-excel-tabela", label: "Interni softver umesto Excel tabela" },
    { href: "/cena-izrade-sajta", label: "Okvirni rasponi cena" },
  ],
};
