/**
 * Copy for /da-vas-ai-preporuci — the AEO service sold as its own money page.
 *
 * Three rules this page is written around, all of them load-bearing:
 *
 * 1. **The method stays out.** Every other page on this site explains how the
 *    work is done, because that is what earns trust for a build. This one does
 *    not: the deliverable IS the method, and a competitor who reads the page
 *    can copy it in an afternoon. So the page argues outcomes, audiences and
 *    what the buyer gets — never which files, which markup or which signals.
 *    A buyer who wants the detail gets it in the quote, under their name.
 *
 * 2. **No promise of a ranking or a recommendation.** Nobody can honestly
 *    guarantee what an assistant says. The page says so out loud, in its own
 *    section, because that sentence is the reason a sceptical buyer keeps
 *    reading — and because the opposite claim is the one every chancer makes.
 *
 * 3. **The proof is our own site.** There is no client case study for this
 *    service yet. What exists is measurable: adspire.rs is the system this is
 *    run on first, and /os separates "showed up in an AI answer" from "visit
 *    that arrived from one". The page says exactly that and nothing more.
 *
 * The niche section is the conversion engine. A carpenter does not recognise
 * himself in "AI visibility"; he recognises himself in "someone asks which
 * workshop makes fitted kitchens in Niš". One line per trade, in the buyer's
 * own words, is what turns this from a buzzword page into an inquiry.
 */

export const AEO_SLUG = "da-vas-ai-preporuci";
export const AEO_PATH = `/${AEO_SLUG}`;

export type AeoNiche = {
  /** The trade, as its owner would name it. */
  trade: string;
  /** The sentence a real buyer types into ChatGPT or Google. */
  question: string;
  /** What being the answer to that question is worth to this trade. */
  gain: string;
};

export const aeoPage = {
  seo: {
    title: "Da AI preporuči baš vašu firmu — AEO optimizacija",
    metaDescription:
      "Sve više kupaca pita ChatGPT, Gemini i Google AI za preporuku umesto da pretražuje. AEO optimizacija sprema vašu firmu da bude odgovor na ta pitanja. Pošaljite upit.",
    keywords: [
      "kako da AI preporuci moju firmu",
      "AEO optimizacija",
      "AI SEO Srbija",
      "optimizacija za ChatGPT preporuke",
      "da me ChatGPT preporuci",
      "vidljivost u AI odgovorima",
      "generative engine optimization Srbija",
    ],
  },

  hero: {
    eyebrow: "AEO — optimizacija za AI odgovore",
    title: "Želite da AI preporuči baš vašu firmu?",
    lead:
      "Vaš sledeći kupac više ne otvara deset kartica u Google-u. Pita ChatGPT, Gemini ili Google AI „koga da zovem za ovo“ — i dobije tri imena. Ako vaše nije među njima, taj posao ste izgubili pre nego što ste čuli za njega. Ovo je posao da jedno od tih imena bude vaše.",
    /** Free first step, said before the price question can form. */
    note: "Prvi korak je besplatan: proverimo kako vas AI sistemi danas opisuju i kažemo da li ovo uopšte ima smisla za vaš posao.",
  },

  /**
   * Four numbers in the hero. None of them is a client result, because there
   * is no client result to quote yet — they are the shape of the opportunity,
   * and every one of them is checkable by the reader in a minute.
   */
  heroStats: [
    { value: "3", label: "imena stane u jedan AI odgovor" },
    { value: "0 din", label: "po kliku — nije oglas" },
    { value: "1 pitanje", label: "odlučuje ko dobija poziv" },
    { value: "2–3 mes.", label: "do prve ozbiljne slike" },
  ],

  /** The paragraph a search snippet or an assistant lifts whole. */
  summary:
    "AEO (Answer Engine Optimization) je priprema firme da bude preporučena kada neko pita AI asistenta za preporuku — na primer koja stolarija radi kuhinje po meri, koji salon ima online zakazivanje ili ko pravi web shop. Adspire iz Niša radi tu pripremu kao uslugu za firme u Srbiji i regionu: definišemo za koja pitanja firma treba da bude relevantan odgovor, sređujemo ono što AI sistemi o firmi mogu da pročitaju, i merimo posete koje stvarno stignu iz AI odgovora. Bez garancije konkretnog odgovora — to niko ne može pošteno da obeća.",

  audienceHeading: "Ima smisla ako se prepoznajete",
  audience: [
    "Radite dobar posao, ali vas kupci nalaze samo preko preporuke",
    "Imate sajt koji stoji i ne donosi upite",
    "Konkurencija sa slabijom uslugom je vidljivija od vas",
    "Prodajete uslugu koju ljudi biraju pitanjem „koga da zovem“",
    "Već ulažete u Google oglase i hoćete kanal koji ne troši budžet po kliku",
  ],

  /**
   * The strongest thing this page can do is make the reader stop reading and
   * go check. Ten seconds in someone else's chat window beats any paragraph we
   * could write — and whatever they find, they come back knowing they need an
   * answer. Sales pages argue; this one hands over the evidence.
   */
  selfTest: {
    title: "Ne verujte nama — proverite za trideset sekundi",
    lead:
      "Otvorite ChatGPT, Gemini ili Google AI na telefonu i pitajte ono što bi pitao vaš kupac. Rezultat je vaš odgovor na pitanje da li vam ovo treba.",
    steps: [
      {
        title: "Pitajte kao kupac, ne kao vlasnik",
        body:
          "Ne kucajte ime svoje firme — to ništa ne dokazuje. Kucajte celu rečenicu kupca: „ko radi [vaša usluga] u [vaš grad] i koga preporučuješ“.",
      },
      {
        title: "Pogledajte ko je nabrojan",
        body:
          "Dobićete dva-tri imena i razlog zašto baš ta. Ako ste tamo — dobro, vredi znati zašto i zadržati to. Ako nije niko iz vašeg grada, mesto je slobodno.",
      },
      {
        title: "Pitajte dopunsko pitanje",
        body:
          "„Zašto baš oni?“ Odgovor je doslovno ono na osnovu čega se preporuka pravi. To je materijal sa kojim se radi — i razlog zašto je ovo posao, a ne reklama.",
      },
    ],
    verdict:
      "Ako na toj proveri ne dobijete nijedno ime iz svog grada, mesto je prazno. Neko će ga zauzeti u sledećih godinu dana — pitanje je samo ko.",
  },

  shift: {
    title: "Zašto je ovo novi SEO",
    lead:
      "Ne zato što je SEO mrtav, nego zato što se promenio korak pre klika. Pretraga je nekada davala deset linkova da vi izaberete. AI daje jedan odgovor sa dva-tri imena — i izbor je već napravljen umesto kupca.",
    items: [
      {
        title: "Pitanje je zamenilo ključnu reč",
        body:
          "Niko ne kucka „stolarija Niš“ u ChatGPT. Piše celu rečenicu: „treba mi neko da mi napravi kuhinju po meri u Nišu, koga da zovem“. To je drugačije pitanje, i firma koja je spremna za njega se ne bira slučajno.",
      },
      {
        title: "Odgovor je kratak lista, ne strana rezultata",
        body:
          "Na desetoj poziciji u Google-u niste izgubljeni — neko vas ipak može naći. U AI odgovoru koji nabraja tri firme, četvrta firma ne postoji. Nema druge strane rezultata.",
      },
      {
        title: "Kupac stiže odlučen",
        body:
          "Onaj ko vas dobije kao preporuku od asistenta ne dolazi da uporedi ponude, nego da zakaže. Zato je upit iz AI odgovora najtopliji upit koji danas postoji na internetu — po kvalitetu je bliži preporuci od komšije nego kliku na oglas.",
      },
      {
        title: "Još je rano, i to je jedina prednost koju imate",
        body:
          "Za pozicije u Google-u se bije rat dvadeset godina i mesta su zauzeta. Za AI odgovore se u Srbiji skoro niko ne bori. Ta razlika neće trajati — ali dok traje, mala firma može da prestigne veliku.",
      },
    ],
  },

  niches: {
    title: "Šta to znači za vašu delatnost",
    lead:
      "Ne prodajemo „vidljivost“. Prodajemo to da budete odgovor na konkretno pitanje koje vaš kupac već kuca — evo kako to pitanje zvuči po delatnostima.",
    items: [
      {
        trade: "Stolarija i nameštaj po meri",
        question: "„Ko radi kuhinje po meri u Nišu i koliko se čeka?“",
        gain:
          "Kupac kuhinje bira jednom u deset godina i nema od koga da pita. Firma koju asistent navede kao odgovor dobija poziv pre nego što je bilo koji konkurent uopšte kontaktiran.",
      },
      {
        trade: "Saloni, studiji i estetske klinike",
        question: "„Gde mogu online da zakažem tretman u Nišu?“",
        gain:
          "Ovde se odlučuje u minutu, sa telefona. Kad asistent kaže ime salona i doda da termin može da se zakaže odmah, termin je praktično već zakazan.",
      },
      {
        trade: "Hoteli i smeštaj",
        question: "„Koji hotel u ovom gradu ima svoje rezervacije bez provizije?“",
        gain:
          "Svaka rezervacija koja stigne direktno umesto preko platforme je 15–20% manje provizije na istoj noći. Preporuka iz AI odgovora je direktan kanal po definiciji.",
      },
      {
        trade: "Auto servisi i tehničke usluge",
        question: "„Kome da odnesem auto za ovaj kvar, u ovom gradu?“",
        gain:
          "Kvar je hitan i kupac nema strpljenja za poređenje. Prvo ime koje dobije, to i zove — a lojalnost kod servisa traje godinama posle prvog dolaska.",
      },
      {
        trade: "Građevina, transport i proizvodnja",
        question: "„Ko isporučuje beton / radi ovu vrstu radova u mom kraju?“",
        gain:
          "Jedan posao ovde vredi koliko stotinu klikova na oglas. Dovoljno je da vas asistent navede u nekoliko upita mesečno da ceo kanal bude isplativ.",
      },
      {
        trade: "Advokati, knjigovođe i konsultanti",
        question: "„Treba mi neko za ovu vrstu predmeta, koga da tražim?“",
        gain:
          "Struke u kojima je oglašavanje ograničeno ili im se ljudi opiru. Preporuka u odgovoru je ponašanjem najbliža preporuci kolege, a stiže bez oglasa.",
      },
      {
        trade: "Prodavnice i web shopovi",
        question: "„Gde u Srbiji mogu da kupim ovo i da stigne brzo?“",
        gain:
          "Kupovina sve češće počinje pitanjem asistentu, a ne odlaskom na marketplace. Prodavnica koja se pominje u odgovoru prodaje bez marketplace provizije.",
      },
      {
        trade: "Teretane, škole i klubovi",
        question: "„Koja teretana u blizini ima grupne treninge i članarinu na mesec?“",
        gain:
          "Član koji se upiše ostaje mesecima. Jedan upit iz AI odgovora vredi koliko cela mesečna članarina, a često i više.",
      },
    ] as AeoNiche[],
  },

  value: {
    title: "Šta tačno dobijate",
    lead:
      "Kako se posao radi ostaje naš deo dogovora — to je ono za šta se plaća. Ovo je šta ostaje kod vas kada se završi.",
    items: [
      {
        title: "Mapu pitanja za koja treba da budete odgovor",
        body:
          "Spisak stvarnih rečenica koje vaši kupci kucaju kada traže ono što vi radite — po usluzi, po gradu i po situaciji u kojoj se jave. Sa tim spiskom u ruci vidite gde ste sada odgovor, a gde je odgovor neko drugi.",
      },
      {
        title: "Vaše stranice sređene da izdrže to pitanje",
        body:
          "Ono što firma o sebi javno kaže je jedini materijal sa kojim AI sistemi rade. Prepravljamo i dopunjavamo taj materijal tako da na svako od tih pitanja postoji jasan, proverljiv i nedvosmislen odgovor koji dolazi od vas, a ne nagađanje o vama.",
      },
      {
        title: "Dokaze postavljene tako da se mogu proveriti",
        body:
          "Asistent koji preporučuje firmu traži razlog. Radove, rezultate, iskustvo i sve što stvarno stoji iza vas pretvaramo u javno proverljiv trag — bez izmišljanja brojki, jer izmišljena brojka pukne na prvoj proveri i odnese sa sobom i ono što je istina.",
      },
      {
        title: "Merenje koje razdvaja pojavljivanje od posete",
        body:
          "Dve različite stvari: koliko puta ste se pojavili u nečijem AI odgovoru i koliko je ljudi zbog toga stvarno došlo kod vas. Merimo obe, odvojeno, i izveštaj dobijate u brojevima — ne u utisku.",
      },
      {
        title: "Jednu osobu sa kojom pričate",
        body:
          "Bez account menadžera i prepričavanja. Radi čovek koji je posao i osmislio, javlja se u istom radnom vremenu i piše vam šta je urađeno kada je urađeno.",
      },
    ],
  },

  pains: [
    {
      before: "Kupac pita AI za preporuku i dobije tri firme. Vi niste među njima.",
      after: "Kada je pitanje relevantno za ono što radite, postoji jasan razlog da vas navede.",
    },
    {
      before: "Sajt priča o vama, ali ne odgovara ni na jedno pitanje koje kupac stvarno postavlja.",
      after: "Svako pitanje sa mape ima svoj jasan odgovor na vašem sajtu, napisan vašim rečima.",
    },
    {
      before: "Rezultati postoje, ali nigde javno ne stoje — pa ih niko, ni čovek ni AI, ne vidi.",
      after: "Ono što je urađeno stoji javno i može da se proveri, pa radi za vas i kad vi ne radite.",
    },
    {
      before: "Upiti stižu, ali ne znate odakle. Budžet ide na kanal za koji se samo nadate da radi.",
      after: "Vidite koliko upita stiže iz AI odgovora, sa kojih strana i na koja pitanja.",
    },
    {
      before: "Svaki novi kupac je nova cena po kliku. Prestanete da plaćate — prestanu upiti.",
      after: "Ono što je jednom sređeno ostaje vaše i radi bez dnevnog budžeta.",
    },
  ],

  phases: [
    {
      title: "Pregled i mapa pitanja",
      text:
        "Prvo utvrdimo gde ste sada: za koja pitanja vas AI sistemi već navode, za koja navode konkurenciju i za koja ne navodi niko. Na kraju ove faze imate spisak pitanja i pošten odgovor da li uopšte ima smisla ići dalje.",
      items: [
        "Provera kako vas AI sistemi danas opisuju",
        "Mapa pitanja po uslugama, gradovima i situacijama",
        "Ko je sada odgovor umesto vas",
        "Preporuka — uključujući „ovo vam se ne isplati“ ako je tako",
      ],
    },
    {
      title: "Priprema",
      text:
        "Glavni deo posla. Sređujemo sve što o vašoj firmi može javno da se pročita tako da na pitanja sa mape postoji jasan odgovor koji dolazi od vas. Šta se tačno radi stoji u ponudi — to je ono za šta se plaća.",
      items: [
        "Rad na postojećim stranicama i, gde treba, nove",
        "Dokazi i rezultati postavljeni javno i proverljivo",
        "Sve što se tvrdi mora da izdrži proveru",
        "Sve ostaje na vašem sajtu i u vašem vlasništvu",
      ],
    },
    {
      title: "Merenje i održavanje",
      text:
        "AI sistemi se menjaju brže od Google-a. Zato posle prve isporuke ide praćenje: šta se pojavilo, odakle su stigle posete i šta treba dopuniti kada se pitanja promene.",
      items: [
        "Mesečni izveštaj u brojevima",
        "Odvojeno: pojavljivanja u odgovorima i posete iz njih",
        "Dopune kada se pitanja kupaca promene",
        "Može i jednokratno, bez održavanja — ali tada rezultat stari",
      ],
    },
  ],

  honesty: {
    title: "Šta vam niko pošten neće obećati",
    lead:
      "Ako vam neko garantuje da će vas ChatGPT preporučiti, obećava nešto što ne kontroliše. Evo granica, unapred, da ih ne saznate posle.",
    items: [
      {
        title: "Ne garantujemo konkretan odgovor",
        body:
          "Nijedan AI sistem ne prodaje pozicije i nijedan ne daje isti odgovor dva puta. Ono što se radi je da razlog da vas navede postoji i da je jak. Odluku donosi model.",
      },
      {
        title: "Ne radi ako iza firme ne stoji posao",
        body:
          "Ovo pojačava ono što jeste, ne pravi ono što nije. Firmi bez ijednog završenog posla i bez ičega što može da se proveri ovo ne treba — treba joj prvo nekoliko dobro odrađenih poslova.",
      },
      {
        title: "Ne dešava se za nedelju dana",
        body:
          "Prve promene se vide u roku od nekoliko nedelja, a ozbiljnija slika tek posle dva do tri meseca. Ko obeća rezultat za sedam dana, prodaje nešto drugo.",
      },
      {
        title: "Ne pišemo brojke koje ne postoje",
        body:
          "Izmišljen broj klijenata ili procenat rasta je najbrži način da izgubite poverenje i čoveka i sistema koji ga proverava. Radimo sa onim što stvarno stoji — i to je dovoljno.",
      },
    ],
  },

  proof: {
    title: "Na čemu je prvo isprobano",
    lead:
      "Nema klijentske studije slučaja za ovu uslugu i neće je biti dok je ne bude stvarno. Ono što postoji je naš sajt — prvi sistem na kome se ovo radi, i jedini na kome sve može da se izmeri.",
    items: [
      {
        name: "adspire.rs",
        sector: "Naš sajt",
        note:
          "Svaka stranica ovog sajta je napisana tako da odgovara na jedno pitanje kupca. Isti način rada je ono što se prodaje kao usluga.",
        href: "/our-services",
        cta: "Sve usluge",
      },
      {
        name: "Merenje AI poseta",
        sector: "Sopstvena analitika",
        note:
          "Naš interni sistem odvojeno broji pojavljivanja u AI odgovorima i posete koje iz njih stignu. Isti izveštaj dobija klijent — bez kolačića i bez praćenja ljudi.",
        href: "/ai-u-biznisu",
        cta: "Kako merimo",
      },
      {
        name: "Rečnik pojmova",
        sector: "Primer u praksi",
        note:
          "Javna stranica koja odgovara na 27 pitanja iz IT ponuda. Primer kako izgleda sadržaj napisan da bude odgovor, a ne reklama.",
        href: "/recnik",
        cta: "Otvorite rečnik",
      },
    ],
  },

  faqHeading: "Pitanja pre odluke",
  faq: [
    {
      q: "Možete li da garantujete da će me ChatGPT preporučiti?",
      a: "Ne, i niko ne može. AI sistemi ne prodaju pozicije, ne daju isti odgovor dva puta i menjaju se iz meseca u mesec. Ono što možemo je da za svako relevantno pitanje postoji jasan, proverljiv razlog da vas navede — i da merimo koliko se to stvarno dešava. Ko vam garantuje odgovor, ili ne razume kako ovo radi ili računa da vi ne razumete.",
    },
    {
      q: "Zašto ne pišete tačno kako to radite?",
      a: "Zato što je to ceo posao. Kad bi metod stajao na javnoj stranici, prepisala bi ga svaka agencija u zemlji za jedno popodne i vrednost bi nestala — i za vas, jer bi svi radili isto. U ponudi dobijate konkretan spisak šta se radi na vašem sajtu, sa obimom i cenom, pre nego što bilo šta potpišete.",
    },
    {
      q: "Po čemu se ovo razlikuje od klasičnog SEO-a?",
      a: "Klasičan SEO se bori za mesto u listi od deset linkova, gde je i deseto mesto nešto. Ovde se odgovor svodi na dva-tri imena i četvrto ime ne postoji. Različit cilj, različit posao. Dobra vest: ovo što radimo pomaže i u Google-u, jer se isti materijal koristi — ali se ne radi zbog Google-a.",
    },
    {
      q: "Koliko košta?",
      a: "Zavisi od toga koliko pitanja pokrivamo, u kakvom je stanju sajt i da li ide i održavanje. Cena ide u ponudu posle kratkog razgovora, sa tačnim obimom i rokom. Prvi pregled i razgovor se ne naplaćuju — ako nema smisla, to ćete čuti umesto ponude.",
    },
    {
      q: "Moram li da menjam sajt?",
      a: "Najčešće se radi na postojećem sajtu i on ostaje kakav jeste — menja se i dopunjava ono što piše i kako je posloženo. Ako je sajt tehnički toliko star da ga AI sistemi teško čitaju, to ćemo reći na pregledu, pre nego što uzmemo posao.",
    },
    {
      q: "Za koliko vremena se vidi efekat?",
      a: "Prve promene u roku od nekoliko nedelja, ozbiljnija slika posle dva do tri meseca. Brže nego kod klasičnog SEO-a, jer su AI sistemi brži u preuzimanju novih informacija — ali i dalje ne za sedam dana.",
    },
    {
      q: "Radite li ovo i van Niša?",
      a: "Da. Posao je udaljen po prirodi: video poziv, poruke i sređivanje vašeg sajta. Radimo za firme iz cele Srbije i regiona, a razgovor ide na srpskom.",
    },
    {
      q: "Šta ako posle godinu dana hoću da prekinem?",
      a: "Sve što je napravljeno ostaje na vašem sajtu i u vašem vlasništvu — stranice, tekstovi, dokazi. Nema pretplate koja drži nešto zaključano kod nas. Ako prekinete, gubite dalje dopune i praćenje, ne ono što je već urađeno.",
    },
  ],

  cta: {
    title: "Recite čime se bavite i koga tražite",
    body:
      "Pet polja, bez naloga. Napišite šta radite i kome prodajete. Odgovor stiže lično — sa procenom obima i cene, ili sa poštenim „ovo vam još ne treba“.",
    primary: { label: "Pošaljite upit", href: "/upit/brzo?usluga=ai-preporuka" },
    secondary: { label: "Pun brief za ponudu", href: "/upit" },
  },

  related: [
    { href: "/our-services/ai-preporuka", label: "Usluga u katalogu: AI preporuka i vidljivost" },
    { href: "/recnik", label: "Rečnik pojmova — šta znače reči iz ponude" },
    { href: "/ai-u-biznisu", label: "AI u biznisu — automatizacija posla koji se ponavlja" },
    { href: "/besplatan-pregled-sajta", label: "Besplatan pregled sajta" },
  ],
} as const;
