import type { IndustryPage } from "./types";

export const restoraniIKafici: IndustryPage = {
  slug: "softver-za-restoran-i-kafic",
  sector: "ugostiteljstvo-i-turizam",
  navLabel: "Restorani i kafići",
  seo: {
    title: "Softver i sajt za restoran i kafić",
    metaDescription:
      "Sistem po meri za restoran i kafić: digitalni meni sa QR kodom, rezervacija stolova, sopstvena dostava bez provizije, normativi i utrošak namirnica, smene konobara i kuvara, praćenje prometa po satu.",
    keywords: [
      "softver za restoran",
      "digitalni meni qr kod",
      "rezervacija stola online",
      "sopstvena dostava hrane sajt",
      "normativi u ugostiteljstvu",
      "program za kafić",
      "evidencija smena restoran",
    ],
  },
  hero: {
    eyebrow: "Ugostiteljstvo · restorani",
    title: "Restoran koji ne plaća proviziju na svaku porudžbinu",
    lead: "Gradimo sopstveni kanal: meni bez štampe, rezervacija stola sa sajta i dostava preko vaše strane, uz normative i smene u pozadini.",
  },
  summary:
    "Restoranu i kafiću sistem donosi ono što tuđe platforme ne daju: porudžbina za dostavu stiže na vašu stranu bez provizije po računu, meni se menja bez ponovne štampe, rezervacija stola ulazi u raspored sale umesto u poruke, a u pozadini stoje normativi po jelu, utrošak namirnica i smene osoblja. Adspire to pravi po meri — sajt sa menijem i rezervacijom, web aplikaciju za goste koji naručuju, mobilnu aplikaciju za salu i kuhinju i interni admin za nabavku, kalkulaciju i promet.",
  audience: [
    "Restoran sa salom, baštom i redovnim rezervacijama za veće grupe",
    "Kafić i pekara sa brzim prometom i kratkim menijem",
    "Restoran koji radi dostavu i plaća visoku proviziju platformi",
    "Objekat sa dnevnim menijem koji se menja svakog jutra",
  ],
  dayInTheLife: [
    {
      title: "Provizija pojede maržu",
      body: "Platforma uzme znatan deo svake porudžbine, a gost misli da je naručio od vas. Bez sopstvenog kanala, ta cena se plaća i kad je gost stalni i kad je porudžbina velika.",
    },
    {
      title: "Meni se štampa svaki put iznova",
      body: "Poskupela je jedna stavka, a menja se ceo tiraž. U međuvremenu konobar objašnjava da cena nije ta, što gost nikad ne primi dobro.",
    },
    {
      title: "Rezervacije stoje u tri poruke i svesci",
      body: "Instagram poruka, poziv i rezervacija primljena na vratima. Subota uveče se slaže napamet, a dupla rezervacija istog stola se otkriva kad gosti stoje na vratima.",
    },
    {
      title: "Ne zna se koliko jelo stvarno košta",
      body: "Cena namirnica se menja svakog meseca, a cena jela ostaje. Bez normativa i evidencije utroška, marža se pretpostavlja i najčešće precenjuje.",
    },
    {
      title: "Lager se broji kad nešto nestane",
      body: "Popis je posao koji se odlaže. Kalo, otpis i ono što nestane bez računa se ne razdvajaju, pa se gubitak vidi tek u mesečnom rezultatu.",
    },
  ],
  layers: {
    site: {
      lead: "Sajt restorana je mesto gde gost odlučuje — i gde porudžbina ne mora da prođe kroz posrednika.",
      items: [
        {
          title: "Meni koji se menja za minut",
          body: "Cene, dnevni meni i nedostupna jela se ažuriraju iz admina i odmah važe na sajtu i na QR kodu. Bez štampe i bez ispravljanja rukom.",
        },
        {
          title: "Dostava preko vaše strane",
          body: "Porudžbina, adresa, vreme i plaćanje bez provizije po računu. Gost koji jednom naruči direktno najčešće nastavi tako.",
        },
        {
          title: "Rezervacija stola sa kapacitetom",
          body: "Broj osoba, vreme i deo sale. Sistem zna koliko stolova ima i ne prima rezervaciju koju ne može da ispuni.",
        },
        {
          title: "Fotografije jela i sastav",
          body: "Slika, opis, alergeni i težina porcije. Gost koji to vidi ređe pita konobara i češće naruči skuplje jelo.",
        },
      ],
    },
    webApp: {
      lead: "Web aplikacija je za gosta za stolom i za onog koji naručuje od kuće — bez instalacije, preko QR koda ili linka.",
      items: [
        {
          title: "Poručivanje sa stola",
          body: "Gost skenira kod, naručuje i plaća bez čekanja konobara. U špicu to znači više obrta po stolu, a ne manje posla za osoblje.",
        },
        {
          title: "Status porudžbine za dostavu",
          body: "Primljeno, u pripremi, kreće. Gost koji vidi status ne zove da pita, a poziv u špicu prekida i salu i kuhinju.",
        },
        {
          title: "Ponovi prethodnu porudžbinu",
          body: "Stalni gost naručuje isto, u dva dodira. To je najveći deo prometa u dostavi i najlakši način da se zadrži.",
        },
        {
          title: "Pogodnost za stalne goste",
          body: "Broj poseta ili potrošnja koja donosi nešto nazad. Program vernosti pod vašim imenom, ne pod tuđim.",
        },
      ],
    },
    mobile: {
      lead: "Mobilna aplikacija je za salu i kuhinju — brza, bez čitanja, upotrebljiva jednom rukom u špicu.",
      items: [
        {
          title: "Porudžbina od stola do šanka",
          body: "Konobar unosi porudžbinu kod stola, a ona se odmah deli na kuhinju i šank. Nestaje trčanje do kase i prepisivanje sa papirića.",
        },
        {
          title: "Ekran u kuhinji",
          body: "Šta se sprema, koliko čeka, šta ide zajedno za isti sto. Jela za isti sto izlaze u isto vreme, što je najčešća zamerka gostiju.",
        },
        {
          title: "Nedostupno jelo jednim potezom",
          body: "Kad nešto nestane, kuvar to označi i stavka odmah nestaje sa menija, sajta i iz poručivanja. Kraj objašnjavanja po stolovima.",
        },
        {
          title: "Prijava smene i pauze",
          body: "Ko je došao, kada je otišao, ko je menjao koga. Evidencija koja posle služi i za obračun i za raspored.",
        },
      ],
    },
    internal: {
      lead: "Interni deo je ono što odlučuje da li restoran zarađuje: normativ, nabavka, otpis i promet po satu.",
      items: [
        {
          title: "Normativ po jelu",
          body: "Sastojci i količine po porciji, sa trenutnom nabavnom cenom. Kad namirnica poskupi, odmah se vidi koje jelo više ne nosi maržu.",
        },
        {
          title: "Utrošak i lager",
          body: "Očekivani utrošak po prodatim jelima naspram stvarnog stanja. Razlika je podatak koji se do sada samo naslućivao.",
        },
        {
          title: "Nabavka i dobavljači",
          body: "Cene po dobavljaču, narudžbine i prijem robe. Poređenje cena kroz vreme pokazuje gde se tiho poskupljuje.",
        },
        {
          title: "Promet po satu i po danu",
          body: "Kada je špic, koji dan nosi nedelju, šta se prodaje ujutru a šta uveče. Raspored osoblja se pravi po brojkama umesto po osećaju.",
        },
        {
          title: "Smene i obračun",
          body: "Sati, napojnica ako se deli, zamene i prekovremeno. Obračun izlazi iz evidencije, pa se ne pravi svakog prvog po sećanju.",
        },
        {
          title: "Šta se prodaje, a šta stoji na meniju",
          body: "Rang jela po prodaji i po marži. Meni se skraćuje na osnovu podataka, a kraći meni znači manje otpisa i bržu kuhinju.",
        },
      ],
    },
  },
  compliance: [
    {
      title: "Fiskalizacija svakog računa",
      body: "Račun gostu se fiskalizuje. Sistem se povezuje sa fiskalnim rešenjem koje koristite, pa se porudžbina ne kuca dvaput i promet se slaže na kraju smene.",
    },
    {
      title: "Alergeni u meniju",
      body: "Sastav jela i alergeni moraju da budu dostupni gostu. Digitalni meni to nosi uz svaku stavku, bez zatrpavanja štampane kartice sitnim slovima.",
    },
    {
      title: "HACCP i sledljivost namirnica",
      body: "Prijem robe, rokovi, temperature i otpis se vode po propisanom postupku. Evidencija koja se vodi u sistemu spremna je za kontrolu, a ne piše se noć pre.",
    },
    {
      title: "Radno vreme i evidencija zaposlenih",
      body: "Smene, pauze i prekovremeno se beleže. U delatnosti sa čestim promenama osoblja to je i zakonska obaveza i jedini način da obračun bude tačan.",
    },
  ],
  value: {
    title: "Šta tačno dobijate za novac",
    lead: "Provizija koja ostaje kod vas i porcija koja košta onoliko koliko mislite. Oba se mere prvog meseca.",
    items: [
      {
        title: "Direktna dostava umesto provizije",
        body: "Svaka porudžbina koja pređe sa platforme na vašu stranu vraća deo računa koji je do sada odlazio posredniku. Kod stalnih gostiju to je najveći deo.",
      },
      {
        title: "Meni bez troška štampe",
        body: "Promena cene ne košta ništa i važi odmah. U godini sa stalnim poskupljenjima to nije sitnica nego stalan trošak koji nestaje.",
      },
      {
        title: "Marža prestaje da bude procena",
        body: "Normativ sa aktuelnim cenama pokazuje koje jelo nosi, a koje se pravi iz navike. Jedno ispravljeno jelo na meniju vraća više nego što izgleda.",
      },
      {
        title: "Manje razlike na popisu",
        body: "Poređenje očekivanog i stvarnog utroška sužava prostor za gubitak. Ono što se meri prestaje da nestaje.",
      },
    ],
  },
  proof: [],
  faq: [
    {
      q: "Imamo POS kasu. Da li je ovo zamena?",
      a: "Nije. Kasa radi naplatu i fiskalizaciju i ostaje. Ovo je sloj oko nje: sopstveni kanal za dostavu i rezervacije, digitalni meni, normativi i izveštaji. Tamo gde kasa ima izvoz, promet se povlači da se ne unosi dvaput.",
    },
    {
      q: "Da li ćemo izgubiti goste ako izađemo sa platformi?",
      a: "Ne predlažemo izlazak. Predlažemo drugi kanal pored njih: platforma donosi nove goste, vaš sajt zadržava stalne. Cilj je da udeo direktnih porudžbina raste iz meseca u mesec, ne da se preko noći sve prebaci.",
    },
    {
      q: "Ko vozi dostavu ako ne platforma?",
      a: "Ili vaš vozač, ili kurirska služba sa kojom imate dogovor. Sistem vodi porudžbine i status u oba slučaja. Za restorane koji nemaju vozača, direktna dostava ima smisla tek u užem krugu.",
    },
    {
      q: "Konobari neće da uče novu aplikaciju.",
      a: "Ako unos porudžbine traje duže od pisanja na blok, neće je koristiti — i biće u pravu. Zato se ekran za salu pravi za špic: krupna dugmad, najčešća jela prva, bez listanja.",
    },
    {
      q: "Normativi zvuče kao mnogo posla za unos.",
      a: "Jesu, jednom. Unos normativa za pedeset jela je nekoliko dana rada, ali posle toga svaka promena cene namirnice sama pokazuje efekat. Zato se ta faza radi posle, kad sistem već donosi porudžbine.",
    },
    {
      q: "Koliko traje izrada?",
      a: "Prva faza je sajt sa menijem, rezervacijom i dostavom, jer odmah donosi promet. Normativi, lager i izveštaji idu kao druga faza, sa svojim obimom i rokom.",
    },
  ],
  inquiryService: "interne-poslovne-aplikacije",
  related: [
    { href: "/online-zakazivanje/restorani-i-kafici", label: "Samo rezervacija stolova" },
    { href: "/izrada-web-shopa", label: "Web shop i online prodaja" },
    { href: "/interni-softver-umesto-excel-tabela", label: "Interni softver umesto Excel tabela" },
  ],
};
