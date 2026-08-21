import type { Guide } from "./guides";

/**
 * Second batch of problem-intent guides.
 *
 * Kept in their own file because guides.ts is already long enough that adding
 * to it means scrolling past 700 lines to find the array. Type-only import, so
 * there is no runtime cycle with guides.ts importing these two back.
 *
 * Both target searches the site had no page for at all: a buyer asking how long
 * this takes (the question that decides whether they even start), and a buyer
 * who already has a site and an agency they are unhappy with — the warmest lead
 * on the internet, because they are past deciding that they need one.
 */

export const timelineGuide: Guide = {
  path: "/koliko-traje-izrada-sajta",
  eyebrow: "Rokovi",
  title: "Koliko traje izrada sajta — realni rokovi po tipu projekta",
  metaDescription:
    "Koliko realno traje izrada sajta, web shopa i web aplikacije, šta produžava rok, koji delovi zavise od vas i kako se rok drži umesto da klizi mesecima.",
  h1: "Koliko traje izrada sajta",
  lead:
    "Kratak odgovor: prezentacioni sajt 3–6 nedelja, web shop 6–12, aplikacija po meri 2–6 meseci. Duži odgovor je važniji — jer rok najčešće ne probije razvoj nego čekanje na materijale, izmene usred posla i odluke koje nema ko da donese.",
  keywords: [
    "koliko traje izrada sajta",
    "rok za izradu sajta",
    "koliko se čeka sajt",
    "izrada web shopa rok",
    "izrada aplikacije koliko traje",
  ],
  sections: [
    {
      heading: "Realni rokovi po tipu posla",
      bullets: [
        "Prezentacioni sajt (5–10 strana, forma, SEO osnove): 3–6 nedelja.",
        "Sajt sa zakazivanjem termina: 4–8 nedelja, zavisno od pravila kalendara i broja zaposlenih.",
        "Web shop: 6–12 nedelja. Najviše vremena odnese asortiman, varijante proizvoda i način isporuke i plaćanja.",
        "Interna aplikacija ili sistem po meri: 2–6 meseci, po fazama, sa upotrebljivom prvom verzijom mnogo pre kraja.",
        "Redizajn postojećeg sajta sa čuvanjem pozicija u pretrazi: 4–8 nedelja, plus vreme za mapu preusmerenja.",
      ],
    },
    {
      heading: "Šta zaista produžava rok",
      body: [
        "U praksi razvoj retko probije rok. Probiju ga stvari koje se ne vide u ponudi:",
      ],
      bullets: [
        "Tekst i fotografije koje čekaju na vas. Ovo je ubedljivo prvi razlog kašnjenja i jedini koji ne možemo da rešimo umesto vas — zato tekst pišemo mi, a vi ga samo ispravljate.",
        "Odluka koju donosi neko ko nije bio na prvom razgovoru, pa se pola dogovorenog vraća unazad.",
        "Nove ideje usred razvoja. Nisu problem same po sebi; problem je kada uđu bez novog roka.",
        "Tuđi sistemi — fiskalna kasa, ERP, platni provajder, kurirska služba. Njihova dokumentacija i njihova podrška diktiraju tempo.",
        "Pristupi koje treba tražiti od bivše agencije ili hosting provajdera, ponekad nedeljama.",
      ],
    },
    {
      heading: "Kako se rok drži",
      bullets: [
        "Obim je zapisan pre početka, sa spiskom onoga što nije u obimu.",
        "Radi se na test adresi koju vidite sve vreme — nema iznenađenja na kraju.",
        "Nedeljni izveštaj kaže i gde nešto čeka na vas, pa se kašnjenje vidi iste nedelje kada nastane, ne mesec dana kasnije.",
        "Veće izmene idu kao dopuna ponude sa svojim rokom, umesto da tiho pojedu postojeći.",
      ],
    },
    {
      heading: "Može li brže",
      body: [
        "Može, i to na dva poštena načina. Prvi je manji obim za prvu verziju: pustite u rad ono što donosi upite, a ostalo u drugoj fazi. Drugi je da su materijali i odluke spremni pre početka.",
        "Ono što ne radimo je da obećamo sajt za nedelju dana pa da ga isporučimo kao šablon sa tuđim tekstom. Takav sajt se ionako menja za godinu dana i tada se plaća dvaput.",
      ],
    },
  ],
  proofHeading: "Primeri iz prakse",
  proof: [
    {
      label: "Doctor Barber",
      href: "/our-projects/doctor-barber-online-booking-sistem",
      note: "Booking sistem — kalendar, usluge i potvrde termina.",
    },
    {
      label: "Santos & Santorini",
      href: "/our-projects/santos-santorini-web-shop-admin-platforma",
      note: "Web shop sa admin platformom — asortiman je uvek najduži deo.",
    },
  ],
  faqHeading: "Česta pitanja o rokovima",
  faq: [
    {
      q: "Koliko brzo mogu da dobijem ponudu?",
      a: "Do tri radna dana od trenutka kada znamo šta se traži. Ako je posao veći, prvo ide kratak poziv pa onda ponuda sa fiksnim obimom.",
    },
    {
      q: "Da li mogu da pustim sajt u fazama?",
      a: "Da, i najčešće je to najbolji izbor. Prva faza pušta ono što donosi upite, druga dodaje ostalo. Tako sajt počne da radi mesecima ranije.",
    },
    {
      q: "Šta ako mi treba do određenog datuma — sajam, sezona, otvaranje?",
      a: "Recite datum na početku. Ako je izvodljiv, obim se planira unazad od njega. Ako nije, bolje je da to čujete odmah nego dve nedelje pre roka.",
    },
    {
      q: "Koliko traje prebacivanje sa starog sajta?",
      a: "Sama zamena je jedan dan, uz pripremljena preusmerenja. Priprema traje duže i ne sme da se preskoči — bez nje se gube pozicije u pretrazi koje ste godinama gradili.",
    },
  ],
  cta: { label: "Reci rok koji ti treba", href: "/upit" },
  secondaryCta: { label: "Kako radimo", href: "/kako-radimo" },
};

export const migrationGuide: Guide = {
  path: "/prenos-sajta-sa-druge-agencije",
  eyebrow: "Prelazak",
  title: "Prenos sajta sa druge agencije — šta tražiti i kako preći bez gubitka",
  metaDescription:
    "Kako preuzeti sajt, domen, hosting i mejlove od agencije sa kojom više ne sarađujete: spisak pristupa koje morate imati, kako ne izgubiti pozicije u pretrazi i šta raditi kada agencija ne odgovara.",
  h1: "Prenos sajta sa druge agencije",
  lead:
    "Ako čekate danima na izmenu cene na sajtu, ne znate ko drži vaš domen ili vam je rečeno da kod ne možete dobiti — problem nije tehnički nego vlasnički. Ovde piše šta je zaista vaše, kako to preuzeti i kako preći bez gubitka pozicija u pretrazi.",
  keywords: [
    "prenos sajta",
    "preuzimanje sajta od agencije",
    "promena web agencije",
    "prenos domena",
    "ko je vlasnik sajta",
    "migracija sajta bez gubitka SEO",
  ],
  sections: [
    {
      heading: "Šta je po pravilu vaše",
      body: [
        "Ovo je deo koji većina ljudi sazna prekasno. Ako nije drugačije napisano u ugovoru, ovo pripada vama i ne može se uslovljavati:",
      ],
      bullets: [
        "Domen. Registruje se na ime vaše firme; agencija sme da bude samo tehnički kontakt.",
        "Sadržaj — tekst, fotografije, logo i sve što ste vi dali ili platili.",
        "Podaci — kupci, porudžbine, termini, korisnički nalozi. Izvoz baze je vaše pravo, i po GDPR-u vi ste rukovalac tim podacima.",
        "Nalozi na servisima koje plaćate: hosting, Google Analytics, Google Business Profile, reklamni nalozi, mejlovi.",
        "Kod, ako je plaćen kao izrada po meri. Ovde ugovor odlučuje, pa ga pročitajte pre nego što tražite.",
      ],
    },
    {
      heading: "Spisak pristupa koje treba tražiti",
      bullets: [
        "Pristup registru domena (ili kod za transfer i otključan domen).",
        "Pristup hostingu i bazi podataka, plus jedna kompletna rezervna kopija.",
        "Repozitorijum sa kodom ili arhiva izvornog koda.",
        "Pristup mejlovima i DNS zapisima — mejlovi padnu najčešće i najbolnije pri lošem prelasku.",
        "Google Analytics, Search Console i Google Business Profile kao vlasnik, ne kao gost.",
        "Nalozi za platni provajder, kurirsku službu i sve što je vezano za naplatu.",
      ],
    },
    {
      heading: "Kako preći bez gubitka pozicija u pretrazi",
      body: [
        "Najveća šteta pri promeni agencije nije prekid rada od par sati nego tiho gubljenje saobraćaja iz pretrage mesec dana kasnije, kada se stare adrese više ne otvaraju.",
      ],
      bullets: [
        "Pre svega: popis svih postojećih adresa i onoga što na njima rangira.",
        "Mapa preusmerenja stara → nova adresa, jedan na jedan, bez lenjog vraćanja svega na početnu stranu.",
        "Zadržati naslove i tekst koji već rangiraju; redizajn nije razlog da se dobar tekst baci.",
        "Novi sajt prvo na test adresi zatvorenoj za pretraživače, zamena tek kada je proveren.",
        "Posle zamene: nova mapa sajta u Search Console i praćenje grešaka prvih nedelju dana.",
        "Mejlovi i DNS se sele planirano, sa smanjenim TTL-om dan ranije.",
      ],
    },
    {
      heading: "Ako agencija ne odgovara ili odbija",
      body: [
        "Dešava se, i nije kraj. Domen se može preneti preko registra na osnovu dokaza da je firma vlasnik. Sadržaj sajta se može preuzeti sa živog sajta. Podaci iz baze su vaši i imate pravo da ih tražite pisanim putem.",
        "Ono što se ponekad zaista izgubi je kod, ako je pisan na tuđoj platformi ili nikada nije bio vaš po ugovoru. Tada je najbrži put nova izrada uz zadržavanje sadržaja i preusmerenja — što je posao od nekoliko nedelja, ne od nekoliko meseci.",
      ],
    },
    {
      heading: "Kako to kod nas izgleda",
      bullets: [
        "Prvo besplatan pregled: šta imate, šta nedostaje i koliki je rizik.",
        "Spisak pristupa koji treba tražiti, napisan tako da možete da ga prosledite bez prevođenja.",
        "Domen se vodi na vaše ime. Uvek.",
        "Na kraju dobijate spisak svih naloga i pristupa — ista lista koju biste tražili od nas ako jednog dana odete drugom.",
      ],
    },
  ],
  proofHeading: "Sistemi koje smo preuzeli i vodili dalje",
  proof: [
    {
      label: "Prevoz Kop",
      href: "/our-projects/prevozkop-digitalni-prodajni-operativni-sistem",
      note: "Prodajni i operativni sistem, razvijan dalje u produkciji.",
    },
    {
      label: "Kako radimo",
      href: "/kako-radimo",
      note: "Proces, faze i šta ostaje kod vas posle isporuke.",
    },
  ],
  faqHeading: "Česta pitanja o prelasku",
  faq: [
    {
      q: "Da li sajt mora da bude nedostupan tokom prelaska?",
      a: "Ne. Stari sajt radi sve dok novi nije proveren; zamena je onda pitanje minuta. Nedostupnost se dešava kada se seli bez plana, ne zato što je selidba takva.",
    },
    {
      q: "Šta ako je domen registrovan na agenciju?",
      a: "Traži se transfer. Ako odbiju, registar rešava spor na osnovu dokaza o vlasništvu nad imenom firme. Neprijatno je, ali nije bezizlazno.",
    },
    {
      q: "Hoću li izgubiti pozicije u Google pretrazi?",
      a: "Ne ako se preusmerenja urade jedan na jedan i sadržaj zadrži. Kratkotrajno kolebanje prvih nedelja je normalno; trajan pad je znak da preusmerenja nisu urađena.",
    },
    {
      q: "Možete li da preuzmete WordPress sajt i samo ga održavate?",
      a: "Možemo, uz pregled stanja. Ako je pun zastarelih dodataka, prvo kažemo šta je bezbednosni rizik pa vi odlučujete da li se krpi ili se ide u novu izradu.",
    },
    {
      q: "Koliko traje ceo prelazak?",
      a: "Samo prenos i preusmerenja: 1–2 nedelje. Ako se sajt istovremeno pravi iznova, važe uobičajeni rokovi za izradu.",
    },
  ],
  cta: { label: "Traži besplatan pregled stanja", href: "/upit" },
  secondaryCta: { label: "Kako izabrati agenciju", href: "/kako-izabrati-web-agenciju" },
};
