import { defaultLocale, type LocaleCode } from "@/lib/site-config";

/**
 * Copy for the about page. Same reason as servicesCopy: the v4 rewrite left
 * Serbian hardcoded in the component, so /en and /de served Serbian text.
 *
 * The founder's name, the mail and the phone are identity, not copy — they
 * stay in the component and never get translated.
 */

export type AboutCopy = {
  /** <title> and meta description — written for the SERP, not for the page. */
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  /** Hero title, two lines; the dot is appended by the component. */
  title: [string, string];
  intro: string;
  /** Three story paragraphs. The second sentence of the first one is bolded. */
  story: [string, string, string];
  /** Emphasised word inside the first paragraph. */
  storyEmphasis: string;
  metrics: { num: string; label: string }[];
  principlesTitle: string;
  principles: { num: string; title: string; desc: string }[];
  founderRole: string;
  founderBio: string;
  stackTitle: string;
  ctaTitle: string;
  ctaButton: string;
};

const sr: AboutCopy = {
  metaTitle: "O nama — razvojni partner iz Niša",
  metaDescription:
    "Adspire Digital je studio iz Niša za web, aplikacije i AI automatizaciju. 13 klijentskih sistema u produkciji, prototip za 48h, rad na srpskom, engleskom i nemačkom.",
  eyebrow: "O nama / Ko smo",
  title: ["RAZVOJNI PARTNER", "IZ NIŠA"],
  intro:
    "Adspire Digital je studio za web, aplikacije i AI automatizaciju. Naš posao je jednostavan: da vam donesemo više klijenata i vratimo sate koje danas trošite na ručni rad.",
  story: [
    "Počeli smo sa jednim uverenjem: većina firmi ne treba još jedan lep sajt — treba im sistem koji {em}. Koji dovodi upite dok spavaju, koji im skida papirologiju s vrata, koji prodaje bez dodatnog zaposlenog.",
    "Zato ne pravimo brošure. Pravimo digitalne proizvode — sajtove koji konvertuju, interne aplikacije koje vlasnicima i menadžerima vraćaju vreme, i AI sisteme koji automatizuju ono što se ponavlja.",
    "Baza nam je Niš, ali radimo sa klijentima iz cele Srbije, regiona i Nemačke — na srpskom, engleskom i nemačkom.",
  ],
  storyEmphasis: "radi",
  metrics: [
    { num: "13", label: "Klijentskih sistema u produkciji" },
    { num: "48h", label: "Od brifa do prototipa" },
    { num: "5", label: "Javnih studija slučaja" },
    { num: "3", label: "Jezika — SR · EN · DE" },
  ],
  principlesTitle: "Kako razmišljamo",
  principles: [
    {
      num: "01",
      title: "Rezultat, ne dekor",
      desc: "Sajt bez upita je trošak. Merimo uspeh brojem klijenata i ušteđenih sati, ne lepotom.",
    },
    {
      num: "02",
      title: "Jedan tim, ceo put",
      desc: "Od strategije preko dizajna do koda i održavanja — bez prebacivanja odgovornosti i bez podizvođača.",
    },
    {
      num: "03",
      title: "Bez šablona",
      desc: "Svaki sistem gradimo za konkretan biznis. Nema kupljenih tema ni copy-paste rešenja.",
    },
    {
      num: "04",
      title: "Transparentno",
      desc: "Prototip pre ugovora, nedeljni demo, jasna cena. Uvek znate gde je projekat i šta plaćate.",
    },
  ],
  founderRole: "Osnivač i tehnički direktor",
  founderBio:
    "Vodim Adspire od strategije do produkcije. Pišem kod, projektujem sisteme i sedim na pozivima sa klijentima — jer verujem da najbolji proizvod nastaje kada ista osoba razume i biznis i tehnologiju.",
  stackTitle: "Stack koji nosi produkciju",
  ctaTitle: "Hajde da napravimo nešto veliko.",
  ctaButton: "Zakaži besplatan poziv →",
};

const en: AboutCopy = {
  metaTitle: "About — a development partner from Niš",
  metaDescription:
    "Adspire Digital is a studio in Niš, Serbia for web, applications and AI automation. 13 client systems in production, a prototype in 48h, work in Serbian, English and German.",
  eyebrow: "About / Who we are",
  title: ["A DEVELOPMENT PARTNER", "FROM NIŠ"],
  intro:
    "Adspire Digital is a studio for web, applications and AI automation. The job is simple: bring you more clients, and give back the hours you currently spend on manual work.",
  story: [
    "We started from one conviction: most companies do not need another handsome website — they need a system that {em}. One that brings in enquiries overnight, takes the paperwork off their desk, and sells without another hire.",
    "So we do not build brochures. We build digital products — sites that convert, internal applications that give owners and managers their time back, and AI systems that automate whatever repeats.",
    "We are based in Niš and work with clients across Serbia, the region and Germany — in Serbian, English and German.",
  ],
  storyEmphasis: "works",
  metrics: [
    { num: "13", label: "Client systems in production" },
    { num: "48h", label: "From brief to prototype" },
    { num: "5", label: "Public case studies" },
    { num: "3", label: "Languages — SR · EN · DE" },
  ],
  principlesTitle: "How we think",
  principles: [
    {
      num: "01",
      title: "Results, not decoration",
      desc: "A site without enquiries is a cost. We measure success in clients won and hours saved, not in looks.",
    },
    {
      num: "02",
      title: "One team, the whole way",
      desc: "From strategy through design to code and maintenance — no handoffs, no subcontractors.",
    },
    {
      num: "03",
      title: "No templates",
      desc: "Every system is built for a specific business. No bought themes, no copy-paste solutions.",
    },
    {
      num: "04",
      title: "Transparent",
      desc: "Prototype before contract, weekly demo, a clear price. You always know where the project stands and what you are paying for.",
    },
  ],
  founderRole: "Founder and technical director",
  founderBio:
    "I run Adspire from strategy through to production. I write the code, design the systems and sit on the client calls — because the best product comes out when one person understands both the business and the technology.",
  stackTitle: "The stack that carries production",
  ctaTitle: "Let's build something substantial.",
  ctaButton: "Book a free call →",
};

const de: AboutCopy = {
  metaTitle: "Über uns — Entwicklungspartner aus Niš",
  metaDescription:
    "Adspire Digital ist ein Studio aus Niš für Web, Anwendungen und KI-Automatisierung. 13 Kundensysteme in Produktion, Prototyp in 48 h, Arbeit auf Serbisch, Englisch und Deutsch.",
  eyebrow: "Über uns / Wer wir sind",
  title: ["ENTWICKLUNGSPARTNER", "AUS NIŠ"],
  intro:
    "Adspire Digital ist ein Studio für Web, Anwendungen und KI-Automatisierung. Die Aufgabe ist einfach: mehr Kunden bringen und die Stunden zurückgeben, die heute in Handarbeit fließen.",
  story: [
    "Wir haben mit einer Überzeugung angefangen: Die meisten Unternehmen brauchen keine weitere hübsche Website — sie brauchen ein System, das {em}. Eines, das über Nacht Anfragen bringt, den Papierkram vom Tisch nimmt und verkauft, ohne dass jemand eingestellt werden muss.",
    "Deshalb bauen wir keine Broschüren. Wir bauen digitale Produkte — Websites, die konvertieren, interne Anwendungen, die Inhabern und Führungskräften Zeit zurückgeben, und KI-Systeme, die automatisieren, was sich wiederholt.",
    "Unsere Basis ist Niš, gearbeitet wird mit Kunden aus ganz Serbien, der Region und Deutschland — auf Serbisch, Englisch und Deutsch.",
  ],
  storyEmphasis: "funktioniert",
  metrics: [
    { num: "13", label: "Kundensysteme in Produktion" },
    { num: "48h", label: "Vom Briefing zum Prototyp" },
    { num: "5", label: "Öffentliche Fallstudien" },
    { num: "3", label: "Sprachen — SR · EN · DE" },
  ],
  principlesTitle: "Wie wir denken",
  principles: [
    {
      num: "01",
      title: "Ergebnis, kein Dekor",
      desc: "Eine Website ohne Anfragen ist ein Kostenposten. Erfolg messen wir in gewonnenen Kunden und gesparten Stunden, nicht in Schönheit.",
    },
    {
      num: "02",
      title: "Ein Team, den ganzen Weg",
      desc: "Von der Strategie über das Design bis zu Code und Wartung — keine Übergaben, keine Subunternehmer.",
    },
    {
      num: "03",
      title: "Keine Vorlagen",
      desc: "Jedes System wird für ein konkretes Geschäft gebaut. Keine gekauften Themes, keine Copy-paste-Lösungen.",
    },
    {
      num: "04",
      title: "Transparent",
      desc: "Prototyp vor Vertrag, wöchentliche Demo, klarer Preis. Sie wissen jederzeit, wo das Projekt steht und wofür Sie zahlen.",
    },
  ],
  founderRole: "Gründer und technischer Leiter",
  founderBio:
    "Ich führe Adspire von der Strategie bis in die Produktion. Ich schreibe den Code, entwerfe die Systeme und sitze in den Kundengesprächen — weil das beste Produkt entsteht, wenn dieselbe Person Geschäft und Technik versteht.",
  stackTitle: "Der Stack, der die Produktion trägt",
  ctaTitle: "Bauen wir etwas Großes.",
  ctaButton: "Kostenloses Gespräch buchen →",
};

const byLocale: Record<LocaleCode, AboutCopy> = { sr, en, de };

export function getAboutCopy(locale: LocaleCode = defaultLocale): AboutCopy {
  return byLocale[locale] ?? byLocale[defaultLocale];
}
