/**
 * Copy for /ai-video-za-vas-biznis — we make the clips, the client approves.
 *
 * The third of three separate AI offers, and the only one sold per campaign:
 * /edukacija teaches someone to make clips themselves, /ai-u-biznisu automates
 * the work behind the business, and this one is done-for-you production.
 *
 * NO PUBLIC PRICE. A month of clips for a barber and for a hotel are not the
 * same job, so the number lives in the offer — the form asks for a budget
 * instead, because that is what decides how many clips a month make sense.
 */

export const AI_VIDEO_SERVICE_SLUG = "ai-video";

export const aiVideoSeo = {
  path: "/ai-video-za-vas-biznis",
  title: "AI video klipovi za vaš biznis — kratki video bez snimanja",
  metaDescription:
    "Pravimo kratke video klipove za vaš posao uz AI alate: ideja, scenario, scene, glas, titlovi i montaža. Vi odobravate i objavljujete na TikTok, Reels i Shorts. Bez kamere, ekipe i snimanja.",
  keywords: [
    "AI video za biznis",
    "izrada video klipova za društvene mreže",
    "kratki video za firme",
    "video za TikTok i Reels za firme",
    "AI video produkcija Srbija",
    "reklamni video bez snimanja",
  ],
} as const;

export const aiVideoHero = {
  eyebrow: "Video produkcija uz AI",
  title: "Video klipovi i reklame za tvoj posao, bez snimanja",
  lead:
    "Nemaš ekipu, kameru ni vreme — a video je ono što se danas gleda. Mi pravimo kratke klipove za tvoju firmu uz AI alate: od ideje i scenarija do gotovog klipa sa titlovima. Ti kažeš da ili ne i objaviš.",
  primary: { label: "Pošalji upit i budžet", href: "#upit" },
  secondary: { label: "Kako izgleda posao", href: "#kako" },
  education: {
    label: "Hoćeš sam da naučiš? Edukacija 1-na-1",
    href: "/edukacija",
  },
  facts: [
    { value: "0", label: "dana snimanja" },
    { value: "9:16", label: "format za TikTok, Reels i Shorts" },
    { value: "Ti", label: "odobravaš pre objave" },
    { value: "Mesečno", label: "ili jednokratno, kako ti treba" },
  ],
};

export const aiVideoNav = [
  { id: "za-koga", label: "Za koga" },
  { id: "sta-dobijas", label: "Šta dobijaš" },
  { id: "formati", label: "Formati" },
  { id: "kako", label: "Kako radimo" },
  { id: "cena", label: "Cena" },
  { id: "pitanja", label: "Pitanja" },
  { id: "upit", label: "Upit" },
];

export const aiVideoAudience = {
  eyebrow: "Za koga",
  title: "Za posao koji se najlakše objasni tako što se vidi",
  items: [
    {
      title: "Lokalne usluge",
      body: "Saloni, ordinacije, teretane, auto servisi. Klip pokazuje kako izgleda dolazak kod tebe, a ne samo logo i broj telefona.",
    },
    {
      title: "Proizvodi i web shop",
      body: "Proizvod u upotrebi, u više varijanti i u više formata, bez studija i bez fotografisanja svakog artikla.",
    },
    {
      title: "Ugostiteljstvo i smeštaj",
      body: "Atmosfera, ponuda i lokacija u petnaest sekundi — ono što gost traži pre nego što rezerviše.",
    },
    {
      title: "Firme koje prodaju drugim firmama",
      body: "Objašnjenje usluge koje niko neće pročitati u tri pasusa, a pogledaće u kratkom klipu.",
    },
  ],
};

export const aiVideoDeliverables = {
  eyebrow: "Šta dobijaš",
  title: "Gotov klip, spreman za objavu",
  lead:
    "Ne dobijaš sirovi materijal koji neko treba da složi. Svaki klip stiže završen, u formatu za mrežu na kojoj ga objavljuješ.",
  points: [
    "Ideja i scenario napisani za tvoj posao i tvoju publiku",
    "Scene generisane AI alatima ili složene od materijala koji već imaš",
    "Naracija: AI glas na srpskom ili tvoj snimljeni glas",
    "Titlovi, natpisi i muzika bez problema sa autorskim pravima",
    "Vertikalni format 9:16, po potrebi i kvadratni ili horizontalni",
    "Jedna runda izmena po klipu je uračunata",
  ],
};

export const aiVideoFormats = {
  eyebrow: "Formati",
  title: "Četiri stvari koje kratak klip može da uradi",
  lead:
    "Koji format ide u plan zavisi od toga šta ti trenutno fali — pregledi, poverenje ili poziv.",
  tracks: [
    {
      title: "Klip koji zaustavlja skrol",
      bullets: [
        "Jedna scena, jedna poruka, prve tri sekunde nose sve",
        "Za nalog koji tek kreće ili je stao",
        "Najbolje radi u seriji, ne pojedinačno",
      ],
    },
    {
      title: "Klip koji objašnjava uslugu",
      bullets: [
        "Šta radiš, za koga i kako izgleda proces",
        "Isti klip stoji i na sajtu, ne samo na mreži",
        "Skida pitanja koja ti se svakodnevno ponavljaju u porukama",
      ],
    },
    {
      title: "Video reklama za oglase",
      bullets: [
        "Više varijanti iste reklame, da se testira koja donosi upite",
        "Format i trajanje po pravilima platforme",
        "Jasan poziv na akciju na kraju",
      ],
    },
    {
      title: "Klip koji gradi poverenje",
      bullets: [
        "Pre i posle, iskustvo klijenta, pogled iza scene",
        "Za posao gde odluka ide preko preporuke",
        "Radi zajedno sa recenzijama i Google profilom",
      ],
    },
  ],
};

export const aiVideoProcess = {
  eyebrow: "Kako radimo",
  title: "Od upita do prvog klipa",
  steps: [
    {
      when: "Korak 1",
      title: "Upit sa budžetom",
      body: "Napišeš čime se baviš i koliko mesečno hoćeš da uložiš. Od toga zavisi koliko klipova ima smisla, pa nema praznog dogovaranja.",
    },
    {
      when: "Korak 2",
      title: "Plan i ponuda",
      body: "Javljam se lično sa predlogom: koji formati, koliko klipova i šta mi treba od tebe. Cena je fiksna za taj obim.",
    },
    {
      when: "Korak 3",
      title: "Prvi klip na odobrenje",
      body: "Pravimo prvi klip i šaljemo ga na pregled. Jedna runda izmena je uračunata — tu se podešava ton za sve sledeće.",
    },
    {
      when: "Korak 4",
      title: "Isporuka po dogovoru",
      body: "Klipovi stižu u dogovorenom ritmu, spremni za objavu. Ako hoćeš, kažem ti i kada i kako da ih objaviš.",
    },
  ],
};

export const aiVideoPricing = {
  eyebrow: "Cena",
  title: "Cena ide u ponudu, ne na sajt",
  lead:
    "Mesec klipova za berbernicu i za hotel nisu isti posao, pa bi cena na sajtu bila ili previsoka za jedne ili nerealna za druge. Zato u upitu pitam za budžet: na osnovu njega kažem koliko klipova mesečno ima smisla i šta u tom obimu možeš da očekuješ.",
  points: [
    "Fiksna cena za dogovoren obim, ne po satu",
    "Mesečno ili jednokratno — bez ugovora na godinu",
    "Pretplate na AI alate ulaze u cenu, ne plaćaš ih posebno",
    "Ako ti posle prvog meseca ne odgovara, staje se bez penala",
  ],
};

export const aiVideoFaq = {
  eyebrow: "Pitanja",
  title: "Pre nego što pošalješ upit",
  items: [
    {
      q: "Da li mi treba da snimam bilo šta?",
      a: "Ne mora. Scene se generišu AI alatima ili slažu od materijala koji već imaš — fotografija proizvoda, snimaka sa telefona, logotipa. Ako imaš svoj materijal, koristimo ga, jer pravi prostor uvek deluje uverljivije.",
    },
    {
      q: "Da li se vidi da je AI?",
      a: "Zavisi od formata. Tamo gde bi izgledalo jeftino ne koristimo generisane ljude, nego animaciju, tekst i tvoj materijal. Cilj je klip koji izgleda kao tvoj posao, ne kao demo AI alata.",
    },
    {
      q: "Koliko klipova mesečno je dovoljno?",
      a: "Jedan klip nije kampanja. Ritam koji se drži nedeljama radi bolje od jednog savršenog klipa, pa plan pravim tako da staje u tvoj budžet i da može da se održi.",
    },
    {
      q: "Ko objavljuje klipove?",
      a: "Ti, sa svog naloga — nalozi i publika ostaju tvoji. Ako ti treba da neko to preuzme, dogovaramo posebno.",
    },
    {
      q: "Šta ako mi se klip ne svidi?",
      a: "Jedna runda izmena po klipu je uračunata. Prvi klip se namerno radi prvi i sam, da se ton podesi pre nego što krene ostatak.",
    },
    {
      q: "Može li ovo da se koristi kao video reklama na Instagramu ili Facebooku?",
      a: "Da, to je jedan od formata. Reklamni klip pravimo u dve ili tri varijante iste poruke, u trajanju koje platforma traži i sa pozivom na akciju na kraju. Razlika u odnosu na običan klip je što se reklama testira: pustiš varijante, ostaviš onu koja donosi upite, ostale gasiš.",
    },
    {
      q: "Da li mogu sam da naučim ovo?",
      a: "Možeš, i to je zasebna usluga: edukacija 1-na-1 gde te učim da praviš klipove sam, sa svojim alatima i svojim tempom.",
      link: { label: "AI edukacija 1-na-1 →", href: "/edukacija" },
    },
  ],
};

export const aiVideoForm = {
  eyebrow: "Upit",
  title: "Reci čime se baviš i koliko hoćeš da uložiš",
  lead:
    "Pet polja i budžet. Bez naloga i bez obaveze — javljam se lično sa predlogom šta u tom iznosu ima smisla.",
};

export const aiVideoFinalCta = {
  eyebrow: "Prvi korak",
  title: "Prvi klip je najteži. Taj radimo zajedno.",
  body: "Napiši čime se baviš i koliki ti je mesečni budžet. Odgovor stiže lično, obično isti radni dan.",
  primary: { label: "Pošalji upit", href: "#upit" },
  secondary: { label: "Hoću sam da naučim", href: "/edukacija" },
};

/** The quick brief, reworded for someone buying clips rather than a build. */
export const aiVideoQuickCopy = {
  business: "Firma ili brend *",
  businessPlaceholder: "npr. Berbernica Kalča, Vinarija Malča",
  idea: "Čime se baviš i šta bi klipovi trebalo da urade? *",
  ideaPlaceholder:
    "npr. Berbernica u Nišu. Hoću kratke klipove za Instagram da bi nas videli ljudi iz kraja i zakazali online.",
  ideaHint: "Napiši šta prodaješ, kome i šta ti trenutno fali — pregledi, upiti ili poverenje.",
  send: "Pošalji upit",
  note: "Bez naloga i bez obaveze. Odgovaram lično, obično isti radni dan.",
};
