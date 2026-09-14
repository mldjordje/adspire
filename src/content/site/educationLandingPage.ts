/**
 * Copy for /edukacija — the page AI-account ads point at.
 *
 * Content only; the layout lives in EducationLandingV4. Same rule as the booking
 * landing: every claim is what we do or how the system works, never a number
 * nobody measured. Hour packages are public (approved 2026-09-14) — see
 * lib/education/packages.ts.
 */

export const EDUCATION_SERVICE_SLUG = "edukacija";

const inquiryHref = `/upit/brzo?usluga=${EDUCATION_SERVICE_SLUG}`;

export const educationSeo = {
  path: "/edukacija",
  title: "AI edukacija 1-na-1 — nauči da koristiš AI u svom poslu",
  metaDescription:
    "Edukacija uživo, jedan na jedan: AI asistenti (ChatGPT, Claude), automatizacija posla, pravljenje sajta i alata uz AI i AI za marketing. Kupuješ sate, termine biraš sam na svom nalogu.",
  keywords: [
    "AI edukacija",
    "AI obuka 1 na 1",
    "kurs veštačke inteligencije",
    "ChatGPT obuka",
    "n8n automatizacija obuka",
    "kako koristiti AI u poslu",
    "AI mentorstvo Srbija",
  ],
} as const;

export const educationHero = {
  eyebrow: "Edukacija 1-na-1",
  title: "Nauči AI na svom poslu",
  lead:
    "Ne kurs sa snimcima koje nikad ne pogledaš. Uživo, jedan na jedan, na tvojim zadacima — od ChatGPT-a i Claude-a do automatizacija i sajta koji praviš sam uz AI. Kupuješ sate, termine biraš sam.",
  primary: { label: "Zakaži uvodni razgovor", href: inquiryHref },
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
  title: "Za ljude kojima treba rezultat u ponedeljak, ne sertifikat",
  items: [
    {
      title: "Vlasnici malih firmi",
      body: "Hoćeš da AI preuzme ponude, mejlove, objave i tabele — a nemaš vremena da sam kopaš po tutorijalima.",
    },
    {
      title: "Frilenseri i kreativci",
      body: "Pišeš, dizajniraš, montiraš ili prodaješ. Učimo alate koji skraćuju posao i oslobađaju vreme za bolje plaćen rad.",
    },
    {
      title: "Timovi u firmi",
      body: "Firma plaća ChatGPT ili Copilot, a niko ne zna šta sa njim. Postavljamo način rada koji tim zaista koristi.",
    },
    {
      title: "Oni koji žele da prave",
      body: "Imaš ideju za sajt, aplikaciju ili mali alat. Učiš da ga napraviš uz AI agente, korak po korak.",
    },
  ],
};

export const educationProgram = {
  eyebrow: "Program",
  title: "Četiri pravca, složena po tvojoj meri",
  lead:
    "Prvi termin je razgovor o tome šta radiš. Plan se pravi od tvojih zadataka, ne od generičkog kursa — možeš ostati na jednom pravcu ili kombinovati sve.",
  tracks: [
    {
      title: "AI asistenti u svakodnevnom poslu",
      bullets: [
        "ChatGPT, Claude i Gemini — kad koji ima smisla",
        "Promptovi koji daju upotrebljiv odgovor iz prve",
        "Mejlovi, ponude, sažeci i istraživanje",
        "Rad sa dokumentima, tabelama i PDF-ovima",
      ],
    },
    {
      title: "Automatizacija posla",
      bullets: [
        "n8n i Make: tok umesto ručnog prepisivanja",
        "Upit sa sajta → tabela → mejl, bez tebe",
        "AI korak unutar automatizacije",
        "Šta vredi automatizovati, a šta ne",
      ],
    },
    {
      title: "Sajt i alati uz AI",
      bullets: [
        "Pravljenje sajta i alata uz AI agente (Claude Code, Cursor)",
        "Kako da AI piše kod koji možeš da održavaš",
        "Objavljivanje: domen, hosting, Vercel",
        "Gde AI greši i kako to da uhvatiš na vreme",
      ],
    },
    {
      title: "AI za marketing i sadržaj",
      bullets: [
        "Plan objava i tekstovi u tvom tonu",
        "Slike i kratki video uz AI alate",
        "Varijante oglasa i čitanje rezultata",
        "Kako AI sadržaj da ne izgleda jeftino",
      ],
    },
  ],
};

export const educationPricing = {
  eyebrow: "Cene",
  title: "Dva paketa, bez skrivenih stavki",
  lead:
    "Kupuješ sate unapred i trošiš ih kad tebi odgovara. Uvodni razgovor pre kupovine je besplatan — tek kad se dogovorimo oko plana, sati idu na tvoj nalog.",
  includes: [
    "Plan napravljen od tvojih zadataka",
    "Termini uživo preko Google Meet-a",
    "Sati ne ističu dok ih ne potrošiš",
    "Otkazivanje do 24h pre — sati se vraćaju",
  ],
  cta: "Izaberi paket",
};

export const educationAccount = {
  eyebrow: "Kako se zakazuje",
  title: "Sati na stanju, termini kad tebi odgovara",
  lead:
    "Posle dogovora dobijaš nalog bez lozinke — prijava je link na mejl. Tu vidiš koliko sati imaš, biraš slobodan termin i dobijaš link za sastanak.",
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
  title: "Od upita do prvog termina",
  steps: [
    {
      when: "Korak 1",
      title: "Kratak upit",
      body: "Pet polja: ko si, čime se baviš i šta bi AI trebalo da ti olakša. Bez naloga i bez obaveze.",
    },
    {
      when: "Korak 2",
      title: "Razgovor i plan",
      body: "Javljam se lično, dogovaramo teme i biraš paket od 8 ili 18 sati.",
    },
    {
      when: "Korak 3",
      title: "Sati na nalogu",
      body: "Posle uplate sati se pojave na tvom nalogu, a na mejl stiže link za prijavu.",
    },
    {
      when: "Korak 4",
      title: "Termini",
      body: "Biraš termine sam. Između dva termina radiš na svom zadatku, sledeći put nastavljamo odatle.",
    },
  ],
};

export const educationTeacher = {
  eyebrow: "Ko predaje",
  title: "Uči od nekoga ko AI koristi u produkciji, ne na slajdovima",
  body: [
    "Adspire pravi sajtove, sisteme za zakazivanje i automatizacije za klijente, i veliki deo tog posla danas ide uz AI alate. Na edukaciji pokazujem isti način rada koji koristim na živim projektima — zajedno sa greškama koje sam već napravio, da ih ti ne bi pravio.",
    "Zato nema unapred snimljenog kursa. Radimo na onome što ti treba ove nedelje.",
  ],
  signature: "Đorđe Mladenović, Adspire Digital",
};

export const educationFaq = {
  eyebrow: "Pitanja",
  title: "Pre nego što pošalješ upit",
  items: [
    {
      q: "Da li mi treba predznanje?",
      a: "Ne. Ako koristiš računar i internet, to je dovoljno. Tempo i nivo se prilagođavaju tebi, a za programiranje ne moraš znati nijednu liniju koda unapred.",
    },
    {
      q: "Koliko košta?",
      a: "Paket od 8 sati je 500 €, paket od 18 sati je 1.000 €. Sati se kupuju u paketu i troše onako kako tebi odgovara — po 1 do 4 sata po terminu.",
    },
    {
      q: "Kako izgleda jedan termin?",
      a: "Online, preko Google Meet-a. Deliš ekran i radimo na tvom stvarnom zadatku. Termin traje od 1 do 4 sata — trajanje biraš pri zakazivanju.",
    },
    {
      q: "Šta ako ne mogu da stignem?",
      a: "Termin otkažeš sa naloga najkasnije 24 sata pre početka i sati se automatski vraćaju na stanje. Kasnije otkazivanje dogovaramo direktno.",
    },
    {
      q: "Može li edukacija za ceo tim?",
      a: "Može. Sati se koriste za jednu osobu ili za manji tim na istom pozivu — to se dogovara u planu.",
    },
    {
      q: "Da li je ovo kurs sa sertifikatom?",
      a: "Nije. Cilj je da posle termina sam uradiš nešto što pre nisi mogao, a ne papir.",
    },
  ],
};

export const educationFinalCta = {
  eyebrow: "Prvi korak",
  title: "Reci šta radiš. Plan pravimo zajedno.",
  body: "Pet polja, bez obaveze. Javljam se lično, obično isti radni dan.",
  primary: { label: "Zakaži uvodni razgovor", href: inquiryHref },
  secondary: { label: "Uđi na nalog", href: "/nalog/edukacija" },
};

/** The quick brief, reworded for someone who wants to learn rather than buy a
 *  build — a freelancer has no "naziv firme" and should not bounce off one. */
export const educationQuickCopy = {
  business: "Firma, brend ili zanimanje *",
  businessPlaceholder: "npr. frilenser, Salon Lana, knjigovodstvena agencija",
  idea: "Šta želiš da naučiš? *",
  ideaPlaceholder:
    "npr. Imam mali online shop i hoću da AI piše opise proizvoda i odgovara na poruke. Ne znam odakle da krenem.",
  ideaHint: "Napiši čime se baviš i šta bi AI trebalo da ti olakša.",
  send: "Pošalji i zakaži razgovor",
};
