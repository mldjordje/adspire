import type { IndustryPage } from "./types";
import { prevozKopProof } from "./proof";

export const proizvodnjaGradjevinskogMaterijala: IndustryPage = {
  slug: "softver-za-betonsku-bazu-i-proizvodnju-materijala",
  sector: "proizvodnja-i-gradnja",
  navLabel: "Betonske baze i proizvodnja materijala",
  seo: {
    title: "Softver za betonsku bazu i proizvodnju materijala",
    metaDescription:
      "Sistem po meri za betonsku bazu, separaciju i proizvodnju građevinskog materijala: upit i ponuda, recepture i klase, termini isporuke, otpremnica i vaga, vozila i radnici, naplata po gradilištu.",
    keywords: [
      "softver za betonsku bazu",
      "program za proizvodnju betona",
      "evidencija isporuke betona",
      "otpremnica beton softver",
      "softver za separaciju",
      "planiranje isporuke materijala",
      "sistem za proizvodnju građevinskog materijala",
    ],
  },
  hero: {
    eyebrow: "Proizvodnja i gradnja · materijali",
    title: "Od upita do otpremnice, bez telefona kao jedinog sistema",
    lead: "Pravimo sistem koji vodi porudžbinu materijala od prvog poziva do isporučenog kubika: ponuda, klasa, termin, vozilo, otpremnica i naplata po gradilištu.",
  },
  summary:
    "Betonskoj bazi i proizvodnji građevinskog materijala sistem rešava ono što se inače drži telefonom: upit i ponuda se vode kao dokument sa istorijom, isporuka se planira po vozilu i satu jer beton ne trpi čekanje, otpremnica nosi količinu i klasu, a naplata se prati po gradilištu i po kupcu. Adspire to gradi po meri — javni sajt koji donosi upite, web aplikaciju za stalne kupce, mobilnu aplikaciju za vozače i otpremu, i interni admin za proizvodnju i naplatu.",
  audience: [
    "Betonska baza sa sopstvenim vozilima i pumpama",
    "Separacija i proizvodnja agregata sa kolskom vagom",
    "Proizvodnja betonske galanterije, ivičnjaka i blokova",
    "Stovarište materijala koje prodaje i isporučuje na gradilište",
  ],
  dayInTheLife: [
    {
      title: "Ponuda se daje preko telefona i nigde ne ostaje",
      body: "Cena po kubiku se kaže usmeno, sa popustom koji se dogovori u tom trenutku. Dve nedelje kasnije niko se ne seća šta je obećano, a kupac se seća — uvek niže.",
    },
    {
      title: "Isporuka se slaže na papiriću ujutru",
      body: "Ko ide prvi, koliko kubika, na koje gradilište, sa kojom pumpom. Jedan pomeren termin ruši ceo dan, a vest o tome stiže preko tri poziva.",
    },
    {
      title: "Beton ne čeka",
      body: "Meša se za tačan sat i tačnu adresu. Ako se gradilište ne javi ili pumpa kasni, roba propada — a taj trošak se nigde ne vodi kao trošak.",
    },
    {
      title: "Otpremnice se skupljaju u kabini",
      body: "Papir se vrati uveče, ili se ne vrati. Fakturisanje kasni, a rasprava o tome koliko je kubika stvarno isporučeno rešava se sećanjem vozača.",
    },
    {
      title: "Gradilište duguje, a isporuka ide dalje",
      body: "Kupac nije platio prošli mesec, ali naručuje ponovo. Bez pregleda dugovanja po kupcu, odluka o isporuci se donosi bez podatka koji je najvažniji.",
    },
  ],
  layers: {
    site: {
      lead: "Sajt proizvođača materijala radi jedno: da izvođač koji traži beton ili agregat vas nađe i pošalje upit koji se može ceniti.",
      items: [
        {
          title: "Upit sa količinom, klasom i lokacijom",
          body: "Šta, koliko, kada i gde. Upit sa te četiri stavke dobija ponudu isti dan, a upit bez njih troši dva poziva pre nego što razgovor počne.",
        },
        {
          title: "Proizvodi sa klasama i primenom",
          body: "Klase betona, frakcije agregata, dimenzije galanterije i za šta se koja koristi. Izvođač traži tačnu oznaku, ne opštu reč „beton“.",
        },
        {
          title: "Zona isporuke i mogućnosti",
          body: "Dokle se isporučuje, koja vozila i pumpe postoje, koliki je minimalni nalog. To su pitanja od kojih svaki razgovor počinje — bolje da odgovor stoji napisan.",
        },
        {
          title: "Reference sa gradilišta",
          body: "Objekti na kojima je materijal ugrađen, sa količinom i klasom. U ovom poslu referenca prodaje više od bilo kakvog opisa.",
        },
      ],
    },
    webApp: {
      lead: "Web aplikacija je za izvođača koji naručuje redovno — da ne mora da zove svako jutro.",
      items: [
        {
          title: "Porudžbina za termin",
          body: "Izvođač bira dan, sat, klasu i količinu, po ceni iz svoje ponude. Termin ulazi u plan proizvodnje umesto u nečiju svesku.",
        },
        {
          title: "Svoja gradilišta na nalogu",
          body: "Više gradilišta pod istom firmom, svako sa svojom adresom, kontaktom i istorijom isporuka. Faktura zna na koje gradilište ide koji kubik.",
        },
        {
          title: "Otpremnice i stanje duga",
          body: "Šta je isporučeno, šta je fakturisano, šta je plaćeno. Usaglašavanje na kraju meseca traje minut umesto pola dana.",
        },
        {
          title: "Potvrda ponude bez papira",
          body: "Ponuda se pregleda i prihvati online, sa zabeleženim vremenom. Dogovorena cena prestaje da bude stvar sećanja.",
        },
      ],
    },
    mobile: {
      lead: "Mobilna aplikacija je za vozače i ljude na vagi — spolja, na buci i prašini, sa rukavicama.",
      items: [
        {
          title: "Nalog za isporuku u kabini",
          body: "Gradilište, kontakt, količina, klasa i redosled vožnji. Vozač ne zove bazu da pita gde ide sledeći put.",
        },
        {
          title: "Potvrda istovara na licu mesta",
          body: "Potpis primaoca i vreme istovara na ekranu telefona. Otpremnica je zatvorena pre nego što se vozilo vrati u bazu.",
        },
        {
          title: "Slika sa gradilišta",
          body: "Stanje pri istovaru i eventualni problem sa pristupom. Kad se posle raspravlja o kašnjenju, postoji zapis umesto dve verzije priče.",
        },
        {
          title: "Merenje na vagi bez prepisivanja",
          body: "Bruto, tara i neto vezani za konkretnu vožnju i nalog. Prepisivanje brojeva sa vage u svesku je mesto gde greška uđe najlakše.",
        },
      ],
    },
    internal: {
      lead: "Interni sistem je proizvodni i komercijalni sto u jednom: plan dana, recepture, vozila, ljudi i novac.",
      items: [
        {
          title: "Upit i ponuda sa istorijom",
          body: "Svaka ponuda ima verziju, cenu, rok važenja i ishod. Vidi se šta je prihvaćeno, šta je odbijeno i po kojoj ceni se sklapa posao.",
        },
        {
          title: "Plan isporuke po satu",
          body: "Vozila, pumpe i vozači raspoređeni po terminima. Preklapanje se vidi pre nego što se dogodi, a pomeranje jednog termina odmah pokazuje šta još pomera.",
        },
        {
          title: "Recepture i klase",
          body: "Sastav po klasi, utrošak cementa, agregata i aditiva po kubiku. Poređenje planirane i stvarne potrošnje pokazuje gde se gubi marža.",
        },
        {
          title: "Otpremnica i vaga u istom toku",
          body: "Nalog, merenje, isporuka i potvrda u jednom lancu. Faktura se pravi iz otpremnica, pa se ne fakturiše ni manje ni više nego što je izašlo.",
        },
        {
          title: "Radnici, vozila i održavanje",
          body: "Smene, angažovanje po danu, servisi i rokovi registracije. Vozilo koje stane u sezoni košta više od svega što se uštedi izbegavanjem evidencije.",
        },
        {
          title: "Naplata po kupcu i gradilištu",
          body: "Dugovanje, valuta i istorija plaćanja pre nego što se odobri nova isporuka. Odluka o tome da li se šalje mikser postaje odluka zasnovana na podatku.",
        },
      ],
    },
  },
  compliance: [
    {
      title: "Dokaz o kvalitetu i klasi",
      body: "Klasa betona i prateći dokumenti se vezuju za isporuku, pa se na zahtev izvođača ili nadzora izvlače iz sistema umesto iz arhive papira.",
    },
    {
      title: "Merenje i evidencija na vagi",
      body: "Kolska vaga traži urednu evidenciju merenja. Bruto, tara i neto se beleže uz vožnju, sa vremenom, tako da se količina može dokazati.",
    },
    {
      title: "E-faktura i otpremnica",
      body: "Kupci su pravna lica, pa faktura ide kroz sistem e-faktura. Veza otpremnica–faktura se vodi u sistemu, što ubrzava i usaglašavanje sa knjigovodstvom.",
    },
    {
      title: "Bezbednost na radu i evidencija angažovanja",
      body: "Ko je radio, na čemu i koliko. Evidencija angažovanja i obuka stoji uz radnika, pa je dostupna kad je neko zatraži.",
    },
  ],
  value: {
    title: "Šta tačno dobijate za novac",
    lead: "Kubik koji se ne baci i faktura koja izađe na vreme. Sve ostalo dolazi posle toga.",
    items: [
      {
        title: "Manje propale robe",
        body: "Potvrđen termin, potvrđeno gradilište i redosled vožnji smanjuju broj tura koje se vrate pune. Jedna spašena tura mesečno plaća dosta.",
      },
      {
        title: "Fakturisanje bez kašnjenja",
        body: "Otpremnica se zatvara na gradilištu, ne uveče u kancelariji. Novac stiže ranije jer faktura izlazi ranije.",
      },
      {
        title: "Marža se vidi po klasi",
        body: "Stvarni utrošak po recepturi u odnosu na planirani pokazuje gde cena više ne pokriva trošak. Bez toga se poskupljenje sirovine primeti tek u bilansu.",
      },
      {
        title: "Isporuka se ne šalje dužniku",
        body: "Stanje duga stoji uz kupca pre nego što se potvrdi nova isporuka. To je najjeftiniji način da se naplata popravi.",
      },
    ],
  },
  proof: [prevozKopProof],
  faq: [
    {
      q: "Imamo softver na betonskoj bazi koji je došao uz opremu.",
      a: "Taj softver obično upravlja mešanjem i recepturom, i to treba da ostane kod njega. Ono što mu nedostaje je komercijalni deo: upit, ponuda, plan isporuke, naplata. Sistem se pravi oko toga, a po potrebi se povezuje sa postojećim upravljačkim delom.",
    },
    {
      q: "Da li se povezuje sa kolskom vagom?",
      a: "Najčešće da, zavisno od toga šta vaga nudi — izvoz merenja, serijski izlaz ili bazu. Proverava se konkretan model pre početka, jer se od toga razlikuje i obim posla.",
    },
    {
      q: "Šta ako radimo i prevoz za druge, ne samo svoju robu?",
      a: "Onda prevoz postaje svoja celina u istom sistemu: nalozi za vožnju, vozači i obračun, uz proizvodnju i isporuku. Tako je rađeno kod klijenta koji ima i bazu i prevoz.",
    },
    {
      q: "Sezona je kratka, a zimi skoro ne radimo.",
      a: "Zato se pravi po fazama i kreće van sezone. Do proleća radi deo koji najviše rasterećuje, a ostalo se dodaje kad se vidi kako sistem stoji u punom pogonu.",
    },
    {
      q: "Ko unosi podatke ako nemamo administratora?",
      a: "Sistem se pravi tako da se podatak unese tamo gde nastaje: vozač na gradilištu, vaga pri merenju, komercijala pri ponudi. Ako unos zahteva posebnog čoveka, loše je projektovan.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Prva faza je upit, ponuda i plan isporuke, jer tu se najviše gubi. Otpremnice, vaga i naplata idu posle, kao zasebna faza sa svojim obimom i rokom.",
    },
  ],
  inquiryService: "interne-poslovne-aplikacije",
  related: [
    { href: "/sajt-za-gradjevinsku-firmu", label: "Sajt i sistem za građevinsku firmu" },
    { href: "/softver-za-transport-i-prevoz-tereta", label: "Transport i prevoz tereta" },
    { href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem", label: "Studija slučaja: Prevoz Kop" },
  ],
};
