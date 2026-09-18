/**
 * Copy for /edukacija — learning to make viral AI video clips.
 *
 * ONE SUBJECT, ON PURPOSE. This page used to sell "AI in your work" — assistants,
 * automation, building a site with AI, marketing — which is a different product
 * with a different buyer. That offer now lives on /ai-u-biznisu, and doing it
 * for the client lives on /ai-video-za-vas-biznis. Mixing the three is what made
 * the page impossible to act on.
 *
 * Content only; the layout lives in EducationLandingV4. Every claim is what we
 * do or how the system works, never a number nobody measured. Hour packages are
 * public (approved 2026-09-14) — see lib/education/packages.ts.
 */

export const EDUCATION_SERVICE_SLUG = "edukacija";

/** The buy path. The brief stays only for a team plan that needs a talk first. */
const orderHref = "/edukacija/porudzbina";
const inquiryHref = `/upit/brzo?usluga=${EDUCATION_SERVICE_SLUG}`;

export const educationSeo = {
  path: "/edukacija",
  title: "AI edukacija: nauči da praviš viralne video klipove",
  metaDescription:
    "Obuka uživo, jedan na jedan: kako se pravi kratak video koji se ne preskače — ideja i hook, generisanje scena AI alatima, glas, montaža i objavljivanje na TikTok, Reels i Shorts. Kupuješ sate, termine biraš sam.",
  keywords: [
    "AI video edukacija",
    "kako napraviti viralni video",
    "AI generisanje videa obuka",
    "kurs za TikTok i Reels",
    "AI video alati obuka",
    "kratki video za društvene mreže",
    "AI mentorstvo Srbija",
  ],
} as const;

export const educationHero = {
  eyebrow: "Edukacija 1-na-1",
  title: "Nauči da praviš viralne AI klipove",
  lead:
    "Ne kurs sa snimcima koje nikad ne pogledaš. Uživo, jedan na jedan: od ideje i prve sekunde koja zaustavlja skrol, preko scena koje generišeš AI alatima, do objave na TikTok, Reels i Shorts. Radimo na tvom nalogu i tvojoj temi.",
  primary: { label: "Izaberi paket i počni", href: orderHref },
  secondary: { label: "Pogledaj program", href: "#program" },
  account: { label: "Već imaš sate? Uđi na nalog", href: "/nalog/edukacija" },
  facts: [
    { value: "1:1", label: "samo ti i predavač" },
    { value: "Uživo", label: "online, preko Google Meet-a" },
    { value: "1–4h", label: "trajanje termina biraš sam" },
    { value: "24h", label: "otkažeš ranije — sati se vraćaju" },
  ],
};

export const educationNav = [
  { id: "za-koga", label: "Za koga" },
  { id: "program", label: "Program" },
  { id: "cene", label: "Cene" },
  { id: "nalog", label: "Kako se zakazuje" },
  { id: "tok", label: "Prvi koraci" },
  { id: "ko-predaje", label: "Ko predaje" },
  { id: "pitanja", label: "Pitanja" },
];

export const educationAudience = {
  eyebrow: "Za koga",
  title: "Za one koji hoće da objave klip ove nedelje, ne sertifikat",
  items: [
    {
      title: "Vlasnici malih firmi",
      body: "Znaš da video prodaje, ali nemaš ni ekipu ni vreme za snimanje. Učiš da sam napraviš klip za svoj posao, bez kamere i bez studija.",
    },
    {
      title: "Kreatori i marketing ljudi",
      body: "Već objavljuješ, ali sporo i neujednačeno. Postavljamo tok kojim se od ideje do gotovog klipa stiže za sat vremena, a ne za dan.",
    },
    {
      title: "Oni koji bi da rade to kao uslugu",
      body: "Hoćeš da praviš klipove za tuđe firme i da ih naplaćuješ. Učiš alate, ali i kako se posao pakuje i isporučuje klijentu.",
    },
    {
      title: "Timovi u firmi",
      body: "Jedan čovek u firmi dobije zadatak „nešto za društvene mreže“. Postavljamo način rada koji tim zaista koristi, sa šablonima i bibliotekom.",
    },
  ],
};

export const educationProgram = {
  eyebrow: "Program",
  title: "Četiri celine, složene po tvojoj meri",
  lead:
    "Prvi termin je razgovor o tome šta prodaješ i kome. Plan se pravi od tvojih tema, ne od generičkog kursa — možeš ostati na jednoj celini ili proći sve četiri.",
  tracks: [
    {
      title: "Ideja, hook i format",
      bullets: [
        "Prve tri sekunde: zašto se klip preskače i kako se to menja",
        "Formati koji rade za uslugu, proizvod i lični brend",
        "Kako se čita tuđi klip koji je prošao, a ne prepisuje",
        "Skripta za 15–45 sekundi, bez ukočenog teksta",
      ],
    },
    {
      title: "Generisanje scena AI alatima",
      bullets: [
        "Alati za video iz teksta i iz slike — kad koji ima smisla",
        "Promptovi koji daju upotrebljiv kadar, a ne nasumičan",
        "Lik, proizvod i stil koji ostaju isti kroz ceo klip",
        "AI glas i naracija na srpskom, i kada je bolji tvoj",
      ],
    },
    {
      title: "Montaža, titlovi i zvuk",
      bullets: [
        "Tempo i rez: gde klip gubi gledaoca",
        "Titlovi, natpisi i bezbedna zona po platformi",
        "Muzika i zvučni efekti bez problema sa autorskim pravima",
        "Šablon koji ti sledeći klip skraćuje na pola vremena",
      ],
    },
    {
      title: "Objavljivanje i šta posle",
      bullets: [
        "TikTok, Reels i Shorts: isti klip, tri različite objave",
        "Serije umesto pojedinačnih klipova — zašto to drži nalog",
        "Šta zaista meriš: zadržavanje, sačuvano, poruke",
        "Kako se gledanost prevodi u upit, poziv ili prodaju",
      ],
    },
  ],
};

export const educationPricing = {
  eyebrow: "Cene",
  title: "Dva paketa, bez skrivenih stavki",
  lead:
    "Kupuješ sate unapred i trošiš ih kad tebi odgovara. Poručuješ ovde, prijavljuješ se Google nalogom, a čim uplata legne sati stoje na tvom nalogu.",
  includes: [
    "Plan napravljen od tvojih tema i tvog posla",
    "Termini uživo preko Google Meet-a",
    "Sati ne ističu dok ih ne potrošiš",
    "Otkazivanje do 24h pre — sati se vraćaju",
  ],
  cta: "Poruči paket",
  /** The one case still worth a conversation before money moves. */
  team: { label: "Treba ti plan za tim ili nešto van ova dva paketa? Piši mi.", href: inquiryHref },
};

export const educationAccount = {
  eyebrow: "Kako se zakazuje",
  title: "Sati na stanju, termini kad tebi odgovara",
  lead:
    "Nalog otvaraš Google prijavom, bez lozinke i bez registracije. Tu vidiš koliko sati imaš, biraš slobodan termin i dobijaš link za sastanak.",
  points: [
    "Biraš dan, trajanje i početak — vidiš samo slobodne termine",
    "Potvrda stiže na mejl, sa terminom spremnim za tvoj kalendar",
    "Dan pre termina stiže podsetnik",
    "Otkažeš najkasnije 24h pre početka i sati se vraćaju na stanje",
  ],
  mockCaption: "Primer prikaza naloga",
};

export const educationProcess = {
  eyebrow: "Prvi koraci",
  title: "Od paketa do prvog objavljenog klipa",
  steps: [
    {
      when: "Korak 1",
      title: "Izaberi paket",
      body: "8 ili 18 sati. Poručuješ na sajtu — potvrda porudžbine nije uplata.",
    },
    {
      when: "Korak 2",
      title: "Prijava Google nalogom",
      body: "Jedan klik, bez lozinke. Tu se otvara tvoj nalog sa stanjem sati i kalendarom.",
    },
    {
      when: "Korak 3",
      title: "Uplata i sati",
      body: "Javljam se lično sa predračunom i dogovorom o temama. Čim uplata legne, sati stoje na nalogu.",
    },
    {
      when: "Korak 4",
      title: "Termini",
      body: "Na prvom terminu izlazi prvi klip. Između dva termina objavljuješ i praviš sledeći, pa gledamo šta je prošlo.",
    },
  ],
};

export const educationTeacher = {
  eyebrow: "Ko predaje",
  title: "Uči od nekoga ko iste alate koristi za klijente, ne na slajdovima",
  body: [
    "Adspire pravi sajtove, sisteme za zakazivanje i automatizacije, a klipove za društvene mreže radi i kao uslugu. Na edukaciji pokazujem isti tok koji koristim na živim nalozima — zajedno sa greškama koje sam već napravio, da ih ti ne bi pravio.",
    "Zato nema unapred snimljenog kursa. Radimo na onome što ti treba da objaviš ove nedelje.",
  ],
  signature: "Đorđe Mladenović, Adspire Digital",
};

export const educationFaq = {
  eyebrow: "Pitanja",
  title: "Pre nego što poručiš",
  items: [
    {
      q: "Da li mi treba kamera, studio ili predznanje?",
      a: "Ne. Radi se na računaru, a scene se generišu AI alatima ili slažu od materijala koji već imaš. Ako umeš da koristiš računar i internet, to je dovoljno.",
    },
    {
      q: "Koliko košta i kako se plaća?",
      a: "Paket od 8 sati je 500 €, paket od 18 sati je 1.000 €. Paket poručuješ na sajtu, a plaćanje ide po predračunu — nema kartice na sajtu. Sati se troše onako kako tebi odgovara, po 1 do 4 sata po terminu.",
    },
    {
      q: "Da li alati koje koristimo koštaju dodatno?",
      a: "Deo posla se završava besplatnim planovima, ali za ozbiljnije generisanje videa i glasa plaćaju se pretplate. Na prvom terminu prolazimo šta ti se od toga zaista isplati, da ne plaćaš pet alata umesto jednog.",
    },
    {
      q: "Kako izgleda jedan termin?",
      a: "Online, preko Google Meet-a. Deliš ekran i pravimo klip za tvoj posao, ne vežbu. Termin traje od 1 do 4 sata — trajanje biraš pri zakazivanju.",
    },
    {
      q: "Šta ako ne mogu da stignem?",
      a: "Termin otkažeš sa naloga najkasnije 24 sata pre početka i sati se automatski vraćaju na stanje. Kasnije otkazivanje dogovaramo direktno.",
    },
    {
      q: "Ne bih da učim — može da radite umesto mene?",
      a: "Može. To je zasebna usluga: klipove pravimo mi, a ti samo odobravaš i objavljuješ. Cena zavisi od broja klipova mesečno, pa ide kroz upit.",
      link: { label: "AI video klipovi za tvoj biznis →", href: "/ai-video-za-vas-biznis" },
    },
    {
      q: "Da li je ovo kurs sa sertifikatom?",
      a: "Nije. Cilj je da posle termina sam objaviš klip koji pre nisi mogao da napraviš, a ne papir.",
    },
  ],
};

export const educationFinalCta = {
  eyebrow: "Prvi korak",
  title: "Reci šta prodaješ. Prvi klip pravimo zajedno.",
  body: "Izaberi paket, uloguj se Google nalogom i termine biraš sam. Javljam se lično, obično isti radni dan.",
  primary: { label: "Poruči paket", href: orderHref },
  secondary: { label: "Uđi na nalog", href: "/nalog/edukacija" },
};

/** The quick brief, reworded for someone who wants to learn rather than buy a
 *  build — a creator has no "naziv firme" and should not bounce off one. */
export const educationQuickCopy = {
  business: "Firma, brend ili zanimanje *",
  businessPlaceholder: "npr. frilenser, Salon Lana, knjigovodstvena agencija",
  idea: "Šta želiš da naučiš? *",
  ideaPlaceholder:
    "npr. Imam mali online shop i hoću sam da pravim kratke klipove za Reels, ali ne znam odakle da krenem.",
  ideaHint: "Napiši čime se baviš i kakve klipove bi objavljivao.",
  send: "Pošalji i zakaži razgovor",
};
