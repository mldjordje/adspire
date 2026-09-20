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
        "Prezentacioni sajt (dizajn, forma, SEO osnove): 3–6 nedelja.",
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

/**
 * The page that removes the actual objection.
 *
 * A diaspora buyer does not stall on whether the work can be done from Serbia.
 * They stall on the paperwork: who signs what, what the invoice looks like,
 * what their accountant does with it, where the data sits, and what happens if
 * they want to leave. None of that was answered anywhere on the site, and it is
 * the most citable kind of page there is - factual, checkable, and written by
 * nobody else in this market.
 *
 * Deliberately not legal or tax advice, and it says so. We describe our own
 * invoice and our own contract; what the buyer owes in their country is
 * between them and their accountant.
 */
export const cooperationGuide: Guide = {
  path: "/saradnja-iz-srbije-kako-funkcionise",
  eyebrow: "Saradnja preko granice",
  title: "Kako izgleda saradnja sa firmom iz Srbije - ugovor, faktura, podaci",
  metaDescription:
    "Ako vam je firma u EU a izvođač u Srbiji: kako ide ugovor, kako izgleda faktura u evrima bez PDV-a, šta radi vaš knjigovođa, gde stoje podaci i ko drži domen i hosting.",
  h1: "Saradnja sa firmom iz Srbije",
  lead:
    "Posao se radi udaljeno svejedno da li je izvođač u Beogradu ili u Berlinu. Ono što se stvarno razlikuje je papirologija — i to je jedino što vredi objasniti unapred.",
  keywords: [
    "saradnja sa firmom iz Srbije",
    "faktura iz Srbije za firmu u EU",
    "reverse charge usluga iz Srbije",
    "ugovor sa izvođačem iz inostranstva",
    "plaćanje firme iz Srbije iz Nemačke",
    "GDPR podaci izvođač van EU",
  ],
  background: "aurora",
  sections: [
    {
      heading: "Šta se zapravo menja kada je izvođač u drugoj zemlji",
      body: [
        "Manje nego što ljudi očekuju. Sam posao — dogovor o obimu, dizajn, izrada, testiranje i predaja — radi se preko ekrana i kada su obe strane u istom gradu. Poslednji put kada je izrada sajta zahtevala da neko sedi u istoj prostoriji bilo je pre petnaest godina.",
        "Menjaju se tri stvari: koji dokument potpisujete, kako izgleda faktura i ko je odgovoran za podatke. Sve tri su rešive unapred i sve tri su opisane niže.",
      ],
    },
    {
      heading: "Ugovor: jedan dokument, pre početka",
      body: [
        "Pre nego što se krene, potpisuje se ugovor u kome stoje obim po fazama, cena po fazi, rok, i šta se dešava ako se predomislite u toku rada. Potpisuje se elektronski; ne morate nigde da putujete.",
        "U ugovoru stoji i ko je vlasnik onoga što nastane. Kratak odgovor: vi. Kod, dizajn i podaci su vaši od trenutka plaćanja faze u kojoj su nastali.",
      ],
      bullets: [
        "Obim po fazama — šta jeste i šta nije uključeno, napisano, ne podrazumevano.",
        "Cena i rok po fazi, ne jedan iznos za sve.",
        "Vlasništvo nad kodom, dizajnom i podacima prelazi na vas.",
        "Poverljivost — šta smemo da pokažemo kao referencu, a šta ne.",
        "Izlaz: šta dobijate i u kom roku ako prekinete saradnju.",
      ],
    },
    {
      heading: "Faktura: u evrima, bez PDV-a",
      body: [
        "Cena se ugovara u evrima i faktura glasi na evre, pa nema iznenađenja zbog kursa. Uplata ide bankarskim prenosom na devizni račun u Srbiji, po podacima sa fakture.",
        "Usluga se fakturiše bez PDV-a. Obavezu obračuna preuzima primalac u svojoj zemlji — postupak koji vaš knjigovođa zna kao reverse charge i koji je kod usluga iz inostranstva rutinska stvar. Da bi faktura bila ispravna, treba nam poreski broj vaše firme: USt-IdNr. u Nemačkoj, UID u Austriji, MWST u Švajcarskoj, momsregistreringsnummer u Švedskoj.",
        "Ovo je opis naše fakture, ne poreski savet. Šta konkretno vi prijavljujete i kako se to knjiži kod vas potvrđuje vaš knjigovođa — to je pitanje vaših propisa, ne našeg posla.",
      ],
      bullets: [
        "Valuta: evro, ugovorena unapred.",
        "PDV: nije obračunat; obavezu preuzima primalac usluge.",
        "Na fakturi stoji vaš poreski broj i broj ugovora.",
        "Dinamika: avans na početku, ostatak vezan za isporuke.",
        "Ništa se ne naplaćuje pre nego što je predato.",
      ],
    },
    {
      heading: "Podaci: gde stoje i ko im pristupa",
      body: [
        "Sajt i baza se postavljaju u region koji vi izaberete. Za firmu u EU to po pravilu znači EU region kod provajdera kao što su Vercel ili Neon, tako da podaci ne izlaze iz EU. Ako želite nemački hosting, radi se i to; razlika u ceni je mala i navodi se u ponudi.",
        "Pristup podacima ima onoliko ljudi koliko posao zahteva, a to je po pravilu jedan. Ako obrađujemo lične podatke vaših kupaca, potpisuje se ugovor o obradi podataka; on definiše šta smemo, koliko dugo i šta se briše na kraju.",
        "Nalozi kod provajdera mogu da glase na vaše ime od prvog dana. Preporučujemo baš tako — izvođač koji drži vaš domen je rizik nezavisno od toga koliko je dobar.",
      ],
      bullets: [
        "Region hostinga birate vi; EU region je podrazumevan za firme u EU.",
        "Ugovor o obradi podataka kada se obrađuju podaci vaših kupaca.",
        "Domen i hosting na vaše ime i vašu karticu, ako tako hoćete.",
        "Rezervne kopije i izvoz podataka na zahtev, u formatu koji se čita.",
      ],
    },
    {
      heading: "Jezik i radno vreme",
      body: [
        "Dogovor ide na srpskom, bosanskom ili hrvatskom — kako vam je lakše. To je i razlog zašto ovu stranu čitate: objasniti šta vam treba na maternjem jeziku je brže i preciznije nego se boriti sa tehničkim rečnikom na stranom.",
        "Sam sajt se pravi na jeziku vaših kupaca. Tekstovi na nemačkom, engleskom ili švedskom idu uz lekturu izvornog govornika kada je to deo obima — to se navodi u ponudi, ne podrazumeva.",
        "Razlika u vremenu između Srbije i Nemačke, Austrije, Švajcarske ili Švedske je nula do jedan sat. Poruka poslata ujutru dobija odgovor tog jutra, a ne sutradan.",
      ],
    },
    {
      heading: "Šta se dešava posle predaje",
      body: [
        "Posle lansiranja imate izbor: da održavate sami, jer su admin i obuka deo isporuke, ili da to radi izvođač po mesečnom dogovoru. Održavanje je zasebna stavka i može da se otkaže — nije uslov da sajt nastavi da radi.",
        "Ako posle godinu dana pređete kod nekog drugog, predaja je transfer pristupa i ništa više. Nema zaključavanja u sopstvenu platformu i nema koda koji radi samo na našem serveru.",
      ],
    },
  ],
  faqHeading: "Pitanja pre potpisa",
  faq: [
    {
      q: "Kako plaćam firmu iz Srbije iz Nemačke ili Austrije?",
      a: "Običnim bankarskim prenosom u evrima, po podacima sa fakture, na devizni račun u Srbiji. Cena je ugovorena u evrima, pa je iznos koji plaćate isti bez obzira na kurs.",
    },
    {
      q: "Da li na fakturi ima PDV?",
      a: "Ne. Usluga se fakturiše bez PDV-a, a obavezu obračuna preuzimate vi u svojoj zemlji po reverse-charge principu. Na fakturi stoji vaš poreski broj. Kako se to knjiži kod vas potvrdite sa svojim knjigovođom.",
    },
    {
      q: "Da li je izvođač van EU problem za GDPR?",
      a: "Nije sam po sebi, ali se rešava napismeno: sajt i baza mogu da stoje u EU regionu, a za obradu ličnih podataka vaših kupaca potpisuje se ugovor o obradi. Šta je za vaš slučaj dovoljno potvrđuje vaš pravnik — mi opisujemo kako postavljamo sistem, ne šta je vaša obaveza.",
    },
    {
      q: "Ko drži domen i hosting?",
      a: "Vi, ako tako želite — nalozi mogu da glase na vaše ime i vašu karticu od prvog dana. To je i preporuka: izvođač koji drži vaš domen je rizik nezavisno od toga koliko je dobar.",
    },
    {
      q: "Šta ako nešto krene naopako a vi ste u drugoj državi?",
      a: "Isto što i da smo u istom gradu: javite problem, dobijete odgovor u toku radnog dana i popravku po dogovorenom roku. Ono što stvarno štiti je ugovor sa obimom i rokom po fazi, i to da plaćate po isporukama. Fizička blizina nije garancija — ugovor jeste.",
    },
    {
      q: "Da li mogu da vidim kako posao napreduje?",
      a: "Da. Dok se radi, postoji link na kome vidite trenutno stanje sajta ili sistema. Ne morate da čekate kraj da biste prvi put videli šta ste kupili.",
    },
    {
      q: "Da li ste već radili za klijente u EU?",
      a: "Sistemi u portfoliju su za klijente u Srbiji i prvog klijenta iz EU tek tražimo. Piše ovde namerno, jer je to pitanje koje bi svako trebalo da postavi i jer se svakako sazna. Način rada opisan na ovoj strani je isti onaj po kome rade sistemi koji su već u produkciji.",
    },
  ],
  cta: { label: "Opišite posao i recite gde ste", href: "/upit/brzo?usluga=web-prezentacije" },
  secondaryCta: { label: "Za naše ljude u inostranstvu", href: "/za-nase-ljude-u-dijaspori" },
};
