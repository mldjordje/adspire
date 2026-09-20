import type { IndustryPage } from "./types";

export const agencijeZaNekretnine: IndustryPage = {
  slug: "softver-za-agenciju-za-nekretnine",
  sector: "profesionalne-usluge",
  navLabel: "Agencije za nekretnine",
  seo: {
    title: "Softver i sajt za agenciju za nekretnine",
    metaDescription:
      "Sistem po meri za agenciju za nekretnine: sopstveni sajt sa pretragom, baza nekretnina i vlasnika, slanje oglasa na portale iz jednog mesta, evidencija obilazaka, ekskluzive i rokovi, provizija po agentu.",
    keywords: [
      "softver za agenciju za nekretnine",
      "sajt za nekretnine sa pretragom",
      "baza nekretnina program",
      "slanje oglasa na portale",
      "evidencija obilazaka nekretnina",
      "provizija agenata nekretnine",
      "crm za nekretnine",
    ],
  },
  hero: {
    eyebrow: "Profesionalne usluge · nekretnine",
    title: "Agencija koja ima svoju bazu, a ne samo nalog na tuđem portalu",
    lead: "Gradimo sistem u kome nekretnina, vlasnik i kupac stoje na jednom mestu, oglas odlazi na sve portale iz jednog unosa, a ekskluzive i obilasci imaju zapis.",
  },
  summary:
    "Agenciji za nekretnine sistem rešava zavisnost od tuđih portala i haos oko ponuda: nekretnine, vlasnici i tražioci se vode u sopstvenoj bazi, oglas se unosi jednom pa odlazi na sajt agencije i na portale, obilasci i zainteresovani se beleže uz nekretninu, a ekskluzivni ugovori nose rokove koji sami javljaju. Adspire to pravi po meri — sajt sa ozbiljnom pretragom, web aplikaciju za vlasnike i kupce, mobilnu aplikaciju za agente na terenu i interni admin za bazu, provizije i izveštaje.",
  audience: [
    "Agencija sa dva do dvadeset agenata i sopstvenom bazom",
    "Agencija koja radi i izdavanje, sa mesečnim praćenjem zakupa",
    "Agencija specijalizovana za novogradnju i prodaju celih zgrada",
    "Agent koji radi sam i plaća skupe pakete na portalima",
  ],
  dayInTheLife: [
    {
      title: "Isti stan se unosi na četiri mesta",
      body: "Sajt agencije, dva portala i društvene mreže. Kad se cena promeni, menja se na jednom mestu, a na ostala tri ostane stara — i kupac zove zbog cene koja više ne važi.",
    },
    {
      title: "Baza je u glavi agenta",
      body: "Ko je zvao za dvosoban na Duvaništu, ko traži do određene cene, ko je već gledao taj stan. Kad agent ode iz agencije, ode i kontakt.",
    },
    {
      title: "Ista nekretnina se nudi dvaput",
      body: "Dva agenta vode istog vlasnika bez znanja jedan o drugom, pa kupac dobije dve različite cene za isti stan. Poverenje se gubi u jednom pozivu.",
    },
    {
      title: "Obilasci se ne beleže",
      body: "Vlasnik pita koliko je ljudi videlo stan i šta su rekli. Odgovor je „bilo ih je nekoliko“, i to je trenutak kad se ekskluziva ne produžava.",
    },
    {
      title: "Provizija se dogovara napamet",
      body: "Ko je doveo kupca, ko je vodio obilazak, ko je zatvorio posao. Bez zapisa po koraku, podela provizije završava u raspravi.",
    },
  ],
  layers: {
    site: {
      lead: "Sajt agencije ima jedan zadatak: da bude mesto gde se pretražuje, a ne vizitkarta koja upućuje na portal.",
      items: [
        {
          title: "Pretraga koja se stvarno koristi",
          body: "Kvadratura, broj soba, sprat, grejanje, deo grada, cena po kvadratu. Pretraga koja se zaustavi na „stan ili kuća“ šalje čoveka nazad na portal.",
        },
        {
          title: "Oglas koji odgovara na sve",
          body: "Plan, orijentacija, uknjiženost, troškovi održavanja, godina izgradnje. Oglas koji to ima dobija ozbiljan poziv umesto pet pitanja u poruci.",
        },
        {
          title: "Strane po delovima grada",
          body: "Ljudi traže „stan na prodaju Medijana“, ne „nekretnine Srbija“. Strana po lokaciji sa stvarnim opisom kraja je ono što se pojavi u pretrazi.",
        },
        {
          title: "Upit vlasnika koji prodaje",
          body: "Polovina posla je naći nekretninu, ne kupca. Strana za vlasnike sa procenom i objašnjenjem šta agencija radi donosi upravo tu stranu.",
        },
      ],
    },
    webApp: {
      lead: "Web aplikacija razdvaja dve vrste ljudi: onoga ko traži i onoga ko prodaje preko vas.",
      items: [
        {
          title: "Sačuvana pretraga sa obaveštenjem",
          body: "Kupac postavi kriterijume i dobija poruku čim se pojavi nešto što odgovara. Prvi poziv najčešće dobija posao.",
        },
        {
          title: "Nalog vlasnika sa izveštajem",
          body: "Koliko pregleda je oglas imao, koliko obilazaka, šta su zainteresovani rekli. Vlasnik koji to vidi lakše prihvata korekciju cene.",
        },
        {
          title: "Zakazivanje obilaska",
          body: "Ponuđeni termini umesto pet poruka u oba smera. Termin pada u kalendar agenta i vlasnika istovremeno.",
        },
        {
          title: "Dokumenta uz nekretninu",
          body: "List nepokretnosti, plan, energetski pasoš, ugovor. Sve uz nekretninu, dostupno onome ko sme da ga vidi, u trenutku kad zatreba.",
        },
      ],
    },
    mobile: {
      lead: "Mobilna aplikacija je za agenta koji je ceo dan na terenu i retko sedne za računar.",
      items: [
        {
          title: "Unos nekretnine na licu mesta",
          body: "Podaci, fotografije i lokacija dok je agent u stanu. Unos odložen za kancelariju znači unos koji se radi uveče ili se ne radi.",
        },
        {
          title: "Zapis obilaska odmah",
          body: "Ko je došao, koliko je ostao, šta mu smeta. Tri rečenice posle obilaska su ono od čega se kasnije pravi izveštaj vlasniku.",
        },
        {
          title: "Baza u džepu",
          body: "Kad kupac na obilasku kaže da mu ovo ne odgovara, agent odmah nalazi tri slična. Najbolji trenutak za sledeću ponudu je taj, a ne sutra.",
        },
        {
          title: "Fotografije bez prebacivanja",
          body: "Slike idu pravo u oglas, sa automatskim smanjenjem i vodenim žigom agencije. Prebacivanje sa telefona na računar je korak koji se najčešće preskače.",
        },
      ],
    },
    internal: {
      lead: "Interni sistem je baza agencije — jedina imovina koja ostaje kad agent ode ili portal poskupi.",
      items: [
        {
          title: "Nekretnina, vlasnik i status",
          body: "Aktivno, rezervisano, prodato, povučeno. Jedna nekretnina, jedan zapis, jedan zaduženi agent — kraj dupliranja ponude.",
        },
        {
          title: "Slanje na portale iz jednog unosa",
          body: "Unos jednom, objava na sajtu i na portalima koji imaju izvoz ili API. Promena cene se propagira svuda, pa nema oglasa sa starom cenom.",
        },
        {
          title: "Tražioci i uparivanje",
          body: "Šta ko traži i do koje cene. Kad stigne nova nekretnina, sistem odmah pokazuje kome je zvati. To je najbrži put do posla.",
        },
        {
          title: "Ekskluzive i rokovi",
          body: "Ugovor sa vlasnikom, period važenja i obaveze agencije. Podsetnik pre isteka daje vreme da se ekskluziva produži pre nego što je uzme drugi.",
        },
        {
          title: "Provizija po agentu i po ulozi",
          body: "Ko je uneo nekretninu, ko je doveo kupca, ko je zatvorio. Podela je definisana unapred i računa se sama.",
        },
        {
          title: "Izdavanje i zakup",
          body: "Ugovori, dospeća, depozit i produženja. Izdavanje je prihod koji se ponavlja, ali samo ako neko prati datume.",
        },
      ],
    },
  },
  compliance: [
    {
      title: "Registar posrednika i obavezni podaci",
      body: "Posredovanje u prometu nepokretnosti traži upis u registar i ugovor o posredovanju u propisanom obliku. Sistem vodi ugovore sa rokovima, pa je evidencija spremna za kontrolu.",
    },
    {
      title: "Podaci vlasnika i kupaca",
      body: "Agencija drži lične podatke, podatke o imovini i finansijskoj sposobnosti. Pristup ide po ulozi, a kontakt vlasnika ne mora da bude vidljiv svakom agentu.",
    },
    {
      title: "Tačnost oglasa",
      body: "Kvadratura, uknjiženost i tereti moraju da odgovaraju stvarnom stanju. Sistem vezuje dokumente uz nekretninu, pa se oglas pravi iz podataka, ne iz opisa koji je vlasnik izdiktirao telefonom.",
    },
    {
      title: "Sprečavanje pranja novca",
      body: "Posrednici imaju obaveze provere kod većih transakcija. Evidencija provera i dokumentacije se vodi uz posao, jer se traži unazad.",
    },
  ],
  value: {
    title: "Šta tačno dobijate za novac",
    lead: "Sopstvena baza i prvi poziv. To su dve stvari koje portal ne može da vam da, jer mu nije u interesu.",
    items: [
      {
        title: "Manje zavisnosti od portala",
        body: "Kad sajt agencije ima pravu pretragu i kad ga ljudi nađu po lokaciji, deo upita dolazi direktno. Svaki takav upit je ušteđen paket na portalu.",
      },
      {
        title: "Prvi ste kod kupca",
        body: "Automatsko uparivanje nove nekretnine sa spiskom tražilaca daje prednost od nekoliko sati. U ovom poslu toliko i treba.",
      },
      {
        title: "Ekskluziva se produžava",
        body: "Izveštaj o pregledima i obilascima daje vlasniku razlog da ostane. Bez tog izveštaja, produženje zavisi od raspoloženja.",
      },
      {
        title: "Baza ostaje agenciji",
        body: "Kad agent ode, kontakti i istorija ostaju u sistemu. To je razlika između agencije i grupe ljudi koji dele kancelariju.",
      },
    ],
  },
  proof: [],
  faq: [
    {
      q: "Portali već imaju sve. Zašto sopstveni sajt?",
      a: "Zato što na portalu stojite pored konkurencije i plaćate da biste bili viđeni. Sopstveni sajt ne zamenjuje portal nego smanjuje zavisnost: donosi upite po lokaciji i po vlasnicima koji prodaju, a tu portal ne konkuriše jednako.",
    },
    {
      q: "Da li se oglasi šalju automatski na portale?",
      a: "Tamo gde portal ima izvoz ili API — da. Gde nema, ostaje ručna objava, ali podaci i fotografije su spremni pa objava traje minut. Šta je moguće proverava se za svaki portal konkretno pre početka.",
    },
    {
      q: "Agenti ne vole da unose podatke.",
      a: "Unose ako unos traje dva minuta sa telefona, u stanu, sa fotografijama koje već slikaju. Ako traži sedenje za računarom uveče, neće ga biti — i to je greška u izradi, ne u agentima.",
    },
    {
      q: "Kako se sprečava da dva agenta vode istog vlasnika?",
      a: "Nekretnina i vlasnik se zavode sa adresom i kontaktom, pa sistem upozorava na duplikat pri unosu. Ko je prvi zaveo, taj je zadužen — pravilo je jasno jer ga sistem primenjuje.",
    },
    {
      q: "Radimo i izdavanje. Da li je to isti sistem?",
      a: "Isti sistem, drugi tok: ugovor o zakupu, mesečna dospeća, depozit i produženje. Izdavanje ima manju proviziju po poslu ali se ponavlja, pa se isplati samo ako se prati automatski.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Prva faza je sajt sa pretragom i baza nekretnina, jer to odmah donosi upite. Uparivanje, ekskluzive i provizije idu kao druga faza, sa svojim obimom i rokom.",
    },
  ],
  inquiryService: "interne-poslovne-aplikacije",
  related: [
    { href: "/prezentacioni-sajt-za-firmu", label: "Prezentacioni sajt za firmu" },
    { href: "/interni-softver-umesto-excel-tabela", label: "Interni softver umesto Excel tabela" },
    { href: "/resenja-po-delatnosti", label: "Ostale delatnosti" },
  ],
};
