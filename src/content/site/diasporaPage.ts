/**
 * Copy for /za-nase-ljude-u-dijaspori.
 *
 * The audience is not "a German company". It is a business owner abroad whose
 * mother tongue is ours and whose customers are there — DE, AT, CH, SE, UK,
 * IE, NL, NO, DK, FR, IT, US, CA, AU. That distinction decides everything on
 * the page: it is written in Serbian, and language plus timezone come without
 * having to speak German.
 *
 * Price leads. An owner comparing a Serbian shop to a local one is doing it
 * for the rate first, so the hero says that and the headline is the argument,
 * not the language. Language and timezone are what keep them here afterwards.
 *
 * The country list is long on purpose: it is the only place a search for
 * "cheaper website than in England" has to match, and it feeds areaServed in
 * the markup. Outside the EU (UK, CH, NO, US, CA, AU) reverse charge does not
 * apply, so those notes say import-of-service instead.
 *
 * Two honesty rules this page is built around, both of them load-bearing:
 *
 * 1. No claim about what anyone else charges. "A German agency wants 20k" is
 *    unverifiable and is exactly the kind of line that was stripped from the
 *    site in August. The page converts the same argument into hours: we say
 *    how long the work takes, the reader multiplies by the rate in the quote
 *    they already hold. Their own arithmetic is more persuasive than our
 *    claim, and it stays true in every country and every year.
 *
 * 2. No invented track record. Adspire has not yet invoiced a client in the
 *    EU. Every sentence about invoicing is written as how it works, never as
 *    how it went — and the FAQ says so outright, because a buyer who finds out
 *    later trusts nothing else on the page.
 *
 * Ordering is deliberate: why it costs less comes BEFORE how much. An owner
 * used to local prices reads a number three times lower as a warning, not as a
 * saving, unless the reason arrives first.
 */

export const DIASPORA_SLUG = "za-nase-ljude-u-dijaspori";
export const DIASPORA_PATH = `/${DIASPORA_SLUG}`;

export type DiasporaCountry = {
  name: string;
  /** What the buyer's own VAT number is called locally — the word they know. */
  taxIdLabel: string;
  note: string;
};

export const diasporaPage = {
  seo: {
    title: "Sajt iz Srbije — jeftinije nego u EU, Engleskoj ili Americi",
    metaDescription:
      "Za naše ljude sa firmom u Nemačkoj, Austriji, Švajcarskoj, Engleskoj, Americi i dalje: sajt, web shop i softver po meri, po ceni iz Srbije. Dogovor na našem jeziku, faktura u evrima.",
    keywords: [
      "izrada sajta iz Srbije za firmu u inostranstvu",
      "jeftinija izrada sajta nego u Nemačkoj",
      "jeftinija izrada sajta nego u Engleskoj",
      "izrada sajta cena Amerika vs Srbija",
      "programer koji priča srpski Nemačka",
      "programer koji priča srpski London",
      "sajt za firmu u Austriji",
      "sajt za firmu u Engleskoj",
      "naš čovek za sajt u inostranstvu",
      "web developer Srbija za EU firme",
      "faktura iz Srbije za firmu u EU",
      "outsourcing izrade sajta u Srbiju",
    ],
  },

  hero: {
    eyebrow: "Za naše ljude u inostranstvu",
    title: "Isti posao, cena iz Srbije.",
    lead:
      "Sajt, web shop ili program po meri za vašu firmu u Nemačkoj, Austriji, Švajcarskoj, Engleskoj, Americi ili bilo gde drugde — po ceni koja se pravi u Nišu, a ne u Minhenu, Londonu ili Čikagu. Dogovor na našem jeziku, faktura u evrima, isto ili blisko radno vreme.",
  },

  /** The paragraph a search snippet or an assistant lifts whole. */
  summary:
    "Adspire je IT firma iz Niša koja pravi sajtove, web shopove i softver po meri za firme u inostranstvu — najčešće za naše ljude koji vode posao u Nemačkoj, Austriji, Švajcarskoj, Švedskoj, Engleskoj, Irskoj, Holandiji, Norveškoj, Francuskoj, Italiji, Americi, Kanadi i Australiji. Glavni razlog zašto dolaze je cena: isti posao se u Srbiji plaća znatno manje nego kod domaće agencije u EU, Britaniji ili SAD, jer je troškovna baza ovde niža. Dogovor ide na srpskom, faktura je u evrima bez PDV-a po reverse-charge principu, a cene su javne: prezentacioni sajt 850 – 2.100 €, web shop 2.100 – 5.600 €, poslovna aplikacija 2.800 – 10.500 €.",

  audienceHeading: "Ako se prepoznajete, strana je za vas",
  audience: [
    "Zanatska ili građevinska firma sa 3–20 ljudi",
    "Transport, selidbe, logistika",
    "Gastro: restoran, kafić, dostava",
    "Salon, studio, ordinacija",
    "Trgovina koja hoće da prodaje i online",
    "Bilo koji posao gde vam je lakše da objasnite na svom jeziku",
  ],

  whyCheaper: {
    title: "Zašto košta manje",
    lead:
      "Ovo pitanje dolazi pre cene, ne posle nje. Ako je razlika velika, prva pomisao nije „ušteda“ nego „u čemu je kvaka“ — i to je zdrava pomisao. Evo gde je razlika, bez uvijanja.",
    items: [
      {
        title: "Radi jedan čovek, ne četiri",
        body:
          "U agenciji se na isti projekat najčešće naplaćuju project manager, account manager, dizajner i programer. Ovde je to jedna osoba koja radi i priča sa vama. Manje ljudi na računu, ali i manje prepričavanja između njih.",
      },
      {
        title: "Troškovna baza je u Srbiji",
        body:
          "Kancelarija, plate i doprinosi u Nišu nisu isti kao u Minhenu ili Cirihu. Isti sati rada se drugačije i plaćaju. To je ceo trik — nema drugog.",
      },
      {
        title: "Nema faze koja se naplaćuje pre nego što išta postoji",
        body:
          "Discovery radionice, brend audit i strateški dokument od 40 strana su stavke pre nego što se napiše prva linija koda. Kod nas se razgovor o obimu ne naplaćuje; naplaćuje se ono što ostane kod vas.",
      },
      {
        title: "Nema marže na tuđe račune",
        body:
          "Hosting, domen i licence plaćate po ceni koju taj servis naplaćuje, na svoj nalog ako hoćete. Ne prolaze kroz nas sa dodatkom.",
      },
    ],
  },

  math: {
    title: "Uporedite kako treba — u satima",
    lead:
      "Nećemo vam reći šta traži agencija kod vas; to ne možemo da znamo ni da dokažemo. Umesto toga evo koliko posao traje kod nas, pa ponudu koju već imate podelite satnicom i uporedite brojeve sami.",
    rows: [
      { label: "Prezentacioni sajt za firmu, sa CMS-om", hours: "40 – 90 sati", price: "850 – 2.100 €" },
      { label: "Web shop sa katalogom, korpom i adminom", hours: "90 – 200 sati", price: "2.100 – 5.600 €" },
      { label: "Sistem za zakazivanje ili evidenciju", hours: "80 – 170 sati", price: "1.750 – 4.200 €" },
      { label: "Poslovna aplikacija po meri", hours: "120 – 350 sati", price: "2.800 – 10.500 €" },
    ],
    note:
      "Sati su procena obima, ne obećanje. Tačan broj i cena idu u ponudu posle razgovora, zajedno sa tim šta jeste i šta nije uključeno.",
  },

  notCheaper: {
    title: "Šta nije jeftinije",
    lead:
      "Ako strana kaže samo šta dobijate, nije vredna čitanja. Evo gde ušteda ne postoji, da se ne iznenadite kasnije.",
    items: [
      {
        title: "Vreme isporuke",
        body:
          "Jedan čovek nije brži od tima. Veći posao traje koliko traje, i rok dobijate napisan u ponudi, a ne optimističnu procenu preko telefona.",
      },
      {
        title: "Obim posla",
        body:
          "Pet jezika, integracija sa vašim ERP-om ili uvoz 8.000 proizvoda su isti posao gde god da se radi. Cena raste i kod nas, samo se kreće od niže osnove.",
      },
      {
        title: "Sastanci uživo",
        body:
          "Radimo udaljeno. Video poziv, telefon, WhatsApp — koliko treba. Dolazak kod vas je moguć, ali je posebna stavka i nema smisla za manji posao.",
      },
      {
        title: "Pravni i poreski saveti",
        body:
          "Objašnjavamo kako ide naša faktura i šta na njoj piše. Kako to knjižite kod sebe potvrđuje vaš knjigovođa — to nije naš posao i nećemo se praviti da jeste.",
      },
    ],
  },

  how: {
    title: "Kako ide plaćanje",
    lead:
      "Ovo je deo oko koga se najviše dvoumi, pa neka stoji napismeno.",
    items: [
      {
        title: "Faktura u evrima",
        body:
          "Cena se ugovara u evrima i faktura glasi na evre. Uplata ide na devizni račun u Srbiji, po podacima sa fakture.",
      },
      {
        title: "Bez PDV-a, reverse charge",
        body:
          "Usluga se fakturiše bez PDV-a, a obavezu obračuna preuzima primalac u svojoj zemlji — mehanizam koji vaš knjigovođa zna kao reverse charge. Treba nam vaš poreski broj firme; ostatak je stvar između vas i vašeg knjigovođe.",
      },
      {
        title: "Plaćanje po fazama",
        body:
          "Avans na početku, ostatak vezan za isporuke. Nema plaćanja celog iznosa unapred i nema naplate posla koji nije predat.",
      },
      {
        title: "Ugovor pre početka",
        body:
          "Obim, rok, cena po fazi i šta se dešava ako se predomislite — sve u jednom dokumentu, pre nego što se krene.",
      },
    ],
  },

  countriesHeading: "Zemlje u kojima radimo",
  countriesLead:
    "Isti način rada svuda, razlikuje se samo papirologija: unutar EU faktura ide bez PDV-a po reverse-charge principu, van EU se PDV ne obračunava, a vaš knjigovođa uvozi uslugu po pravilima svoje zemlje. Naziv ispod je ono što traži vaš knjigovođa kada mu date našu fakturu.",
  countries: [
    {
      name: "Nemačka",
      taxIdLabel: "USt-IdNr.",
      note: "Najviše naših firmi je tu, i najviše ih je u građevini, transportu i gastronomiji.",
    },
    {
      name: "Austrija",
      taxIdLabel: "UID-Nummer",
      note: "Beč i Graz — zanati, selidbe, ugostiteljstvo i sve više saloni.",
    },
    {
      name: "Švajcarska",
      taxIdLabel: "MWST-Nummer",
      note: "Van EU je, pa se postupak razlikuje — proveravamo pre ponude, ne posle.",
    },
    {
      name: "Švedska",
      taxIdLabel: "Momsregistreringsnummer",
      note: "Malmö, Geteborg, Stokholm — servisi, dostava i trgovina.",
    },
    {
      name: "Engleska i ostatak Velike Britanije",
      taxIdLabel: "VAT number",
      note: "London, Birmingem, Mančester. Posle Bregzita je van EU: faktura je bez PDV-a, a vi ga obračunavate kod sebe.",
    },
    {
      name: "Irska",
      taxIdLabel: "VAT number",
      note: "Dablin i okolina — usluge, gradnja i sve više mali softverski poslovi.",
    },
    {
      name: "Holandija",
      taxIdLabel: "btw-nummer",
      note: "Transport, logistika i trgovina. Reverse charge unutar EU, rutinski za knjigovođu.",
    },
    {
      name: "Norveška",
      taxIdLabel: "Organisasjonsnummer (MVA)",
      note: "Van EU, kao i Švajcarska — postupak se proverava pre ponude.",
    },
    {
      name: "Danska",
      taxIdLabel: "CVR-nummer",
      note: "Kopenhagen i Orhus — zanati, servisi i ugostiteljstvo.",
    },
    {
      name: "Francuska",
      taxIdLabel: "numéro de TVA",
      note: "Pariz i jug. Sajt radimo na francuskom, dogovor ide na našem jeziku ili engleskom.",
    },
    {
      name: "Italija",
      taxIdLabel: "Partita IVA",
      note: "Sever Italije — gradnja, proizvodnja i gastro.",
    },
    {
      name: "Sjedinjene Američke Države",
      taxIdLabel: "EIN (nema PDV-a)",
      note: "Čikago, Njujork, Feniks. Razlika u vremenu je 6–9 sati, pa se dogovara zajednički termin; faktura je u evrima ili dolarima, po dogovoru. Obično traže popunjen W-8BEN-E.",
    },
    {
      name: "Kanada",
      taxIdLabel: "GST/HST broj",
      note: "Toronto, Misisoga, Vankuver. Isto kao SAD — termin se dogovara, faktura je bez PDV-a.",
    },
    {
      name: "Australija",
      taxIdLabel: "ABN",
      note: "Sidnej i Melburn. Razlika u vremenu je najveća, pa se radi asinhrono uz jedan fiksan poziv nedeljno.",
    },
  ] as DiasporaCountry[],

  proofHeading: "Šta je već napravljeno",
  proofLead:
    "Sistemi koji rade, mogu da se otvore i da se probaju. Svi su za klijente u Srbiji — prvi klijent iz inostranstva tek dolazi, i to je pošteno da stoji ovde, a ne da se sazna kasnije.",
  proof: [
    {
      name: "Santos & Santorini",
      sector: "Web shop",
      note: "Katalog, korpa, checkout, lager i admin za porudžbine, uz integracije sa marketplace-ima.",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      cta: "Studija slučaja",
      image: "/images/case-studies/santos-desktop.webp",
    },
    {
      name: "Prevoz Kop",
      sector: "Građevina i transport",
      note: "Javni sajt spojen sa operativom: upiti i ponude, proizvodi, radnici, vozila i termini isporuke.",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      cta: "Studija slučaja",
      image: "/images/case-studies/prevozkop-desktop.webp",
    },
    {
      name: "Doctor Barber",
      sector: "Usluge sa terminima",
      note: "Sajt, online zakazivanje, klijentski nalog i admin kalendar. Radi kao aplikacija na telefonu.",
      href: "/our-projects/doctor-barber-online-booking-sistem",
      cta: "Studija slučaja",
      image: "/images/case-studies/doctorbarber.webp",
    },
  ],

  faqHeading: "Pitanja koja nam stvarno stižu",
  faq: [
    {
      q: "Da li ste već radili za firmu u inostranstvu?",
      a: "Sistemi u portfoliju su za klijente u Srbiji i prvog klijenta iz inostranstva tek tražimo. Ovo piše ovde namerno: radije ćemo izgubiti posao zbog iskrene rečenice nego ga dobiti na osnovu utiska koji se raspadne na prvom pitanju. Ono što jeste provereno je sam posao — sajtovi, web shopovi i poslovni sistemi koji rade u produkciji i mogu da se otvore.",
    },
    {
      q: "Zašto je izrada sajta u Srbiji jeftinija nego u Nemačkoj, Engleskoj ili Americi?",
      a: "Zato što je troškovna baza drugačija i zato što radi jedan čovek umesto agencijskog tima sa project i account menadžerom. Isti sati rada se prosto različito plaćaju u Nišu, Minhenu, Londonu i Čikagu — razlika je u ceni rada na tom tržištu, ne u količini posla. Nije zato što se preskaču koraci: analiza, izrada, testiranje i predaja su isti.",
    },
    {
      q: "Jeftinije znači lošije?",
      a: "Znači manje ljudi na računu i niži troškovi života, ne manje posla. Ono što se stvarno razlikuje između jeftine i skupe izrade nije zemlja nego da li je sajt sklopljen iz gotove teme ili pisan za vas. Mi radimo drugo, i to se vidi kad zatreba izmena ili integracija. Pitajte za pristup živom sistemu pre nego što potpišete bilo šta — kod nas ili kod bilo koga.",
    },
    {
      q: "Radite li samo za EU ili i za firme u Britaniji, Americi i Australiji?",
      a: "I za njih. Unutar EU je papirologija najjednostavnija (reverse charge), a van EU — Britanija, Švajcarska, Norveška, SAD, Kanada, Australija — faktura ide bez PDV-a, a uvoz usluge knjižite po pravilima svoje zemlje. Jedina stvarna razlika je vreme: sa Britanijom je razlika sat vremena, sa Amerikom 6–9, sa Australijom najviše, pa se termin poziva dogovara unapred, a posao između poziva ide asinhrono.",
    },
    {
      q: "Kako plaćam firmu iz Srbije?",
      a: "Bankarskim prenosom u evrima, po podacima sa fakture, na devizni račun u Srbiji. Cena se ugovara u evrima, pa nema iznenađenja zbog kursa. Iz zemalja van evrozone (Britanija, Švajcarska, SAD, Kanada, Australija) plaćanje ide isto, samo vaša banka radi konverziju — iznos u evrima je fiksan, kurs je stvar vaše banke.",
    },
    {
      q: "Kako moj knjigovođa knjiži fakturu iz Srbije?",
      a: "Usluga se fakturiše bez PDV-a, a obavezu obračuna preuzimate vi u svojoj zemlji — postupak koji se zove reverse charge i koji je za knjigovođu rutinska stvar kod usluga iz inostranstva. Nama treba poreski broj vaše firme da bi stajao na fakturi. Konkretno knjiženje i vaše obaveze potvrdite sa svojim knjigovođom; mi vodimo softver, ne vaše knjige.",
    },
    {
      q: "Moram li da pričam nemački sa vama?",
      a: "Ne, i to je i poenta. Dogovor ide na srpskom, bosanskom ili hrvatskom — kako vam je lakše. Sam sajt pravimo na jeziku vaših kupaca: nemačkom, engleskom, švedskom ili koliko jezika treba. Tekstove na stranom jeziku radimo uz lekturu izvornog govornika kada je to deo obima.",
    },
    {
      q: "Kako radimo ako smo u različitim gradovima?",
      a: "Isto kao i sa klijentima u Srbiji, jer se i tamo radi udaljeno: video poziv za dogovor, poruke između, i link na kome vidite kako sajt napreduje dok se radi. Razlika u vremenu je nula do jedan sat, pa se javljamo dok vam je radni dan, a ne sutradan.",
    },
    {
      q: "Šta ako posle godinu dana hoću kod nekog drugog?",
      a: "Kod i podaci su vaši, domen i hosting mogu da glase na vaše ime od prvog dana. Predaja drugom izvođaču je stvar jednog transfera pristupa. Nema zaključavanja — sistem koji vas drži silom nije proizvod nego zamka.",
    },
  ],

  cta: {
    title: "Recite šta radite i gde ste",
    body:
      "Pet polja, bez naloga. Napišite čime se firma bavi, u kojoj je zemlji i šta vam treba. Odgovor stiže lično — sa procenom obima i cene, ili sa poštenim „ovo vam ne treba“.",
    primary: { label: "Pošaljite upit", href: "/upit/brzo?usluga=web-prezentacije" },
    secondary: { label: "Pun brief za ponudu", href: "/upit" },
  },

  related: [
    { href: "/saradnja-iz-srbije-kako-funkcionise", label: "Kako izgleda saradnja sa firmom iz Srbije" },
    { href: "/cena-izrade-sajta", label: "Koliko košta izrada sajta — svi rasponi" },
    { href: "/kako-izabrati-web-agenciju", label: "Kako izabrati izvođača i šta pitati" },
    {
      href: "/blog/izrada-sajta-iz-srbije-za-firmu-u-inostranstvu",
      label: "Ponuda vam se čini previsoka? Kako da je proverite",
    },
  ],
} as const;
