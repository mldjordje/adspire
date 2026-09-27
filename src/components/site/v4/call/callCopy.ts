import type { LocaleCode } from "@/lib/site-config";

/** Razgovor widget copy. SR and EN only; DE visitors get English. */
export type CallCopy = {
  lang: "sr" | "en";
  eyebrow: string;
  title: string;
  lead: string;
  steps: [string, string, string];
  topicQuestion: string;
  whenQuestion: string;
  asapTitle: string;
  asapToday: string;
  asapTomorrow: string;
  orPick: string;
  noSlots: string;
  loading: string;
  howQuestion: string;
  phone: string;
  phoneHint: string;
  meet: string;
  meetHint: string;
  name: string;
  phoneField: string;
  emailField: string;
  emailOptional: string;
  company: string;
  note: string;
  notePlaceholder: string;
  optional: string;
  submit: string;
  sending: string;
  back: string;
  change: string;
  close: string;
  weekdays: string[];
  months: string[];
  errors: { name: string; phone: string; email: string; slot: string; taken: string; generic: string };
  done: {
    title: string;
    timed: string;
    asapToday: string;
    asapTomorrow: string;
    phone: string;
    meet: string;
    meetLater: string;
    mail: string;
    addCalendar: string;
  };
  trust: string[];
  /** Short labels for buttons around the site. */
  cta: string;
  ctaShort: string;
  dock: string;
};

const sr: CallCopy = {
  lang: "sr",
  eyebrow: "Razgovor · 20 min",
  title: "Zakažite kratak razgovor",
  lead: "Nemate vremena da čitate sajt? Recite mi šta vam treba, za 20 minuta znate šta ima smisla i koliko otprilike košta.",
  steps: ["Tema", "Termin", "Kontakt"],
  topicQuestion: "O čemu pričamo?",
  whenQuestion: "Kada vam odgovara?",
  asapTitle: "Pozovite me što pre",
  asapToday: "Javljam se danas",
  asapTomorrow: "Javljam se prvog radnog jutra",
  orPick: "ili izaberite termin",
  noSlots: "Nema slobodnih termina u naredne dve nedelje. Izaberite „što pre“ i javiću se.",
  loading: "Učitavam termine…",
  howQuestion: "Kako da razgovaramo?",
  phone: "Telefon",
  phoneHint: "Ja vas zovem",
  meet: "Google Meet",
  meetHint: "Video, link stiže mejlom",
  name: "Ime i prezime",
  phoneField: "Broj telefona",
  emailField: "Mejl (za Meet link)",
  emailOptional: "Mejl za potvrdu",
  company: "Firma",
  note: "Nešto što treba da znam unapred?",
  notePlaceholder: "npr. imamo salon, termini idu preko Instagrama",
  optional: "opciono",
  submit: "Zakaži razgovor",
  sending: "Zakazujem…",
  back: "Nazad",
  change: "promeni",
  close: "Zatvori",
  weekdays: ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"],
  months: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"],
  errors: {
    name: "Upišite ime.",
    phone: "Upišite broj na koji mogu da vas pozovem.",
    email: "Za Meet mi treba mejl, tamo šaljem link.",
    slot: "Izaberite termin ili „što pre“.",
    taken: "Neko je upravo uzeo taj termin. Izaberite drugi.",
    generic: "Nije prošlo. Pokušajte ponovo ili pišite na djordje@adspire.rs.",
  },
  done: {
    title: "Zakazano.",
    timed: "Vidimo se {when}.",
    asapToday: "Javljam se danas, čim se oslobodim.",
    asapTomorrow: "Javljam se prvog radnog jutra.",
    phone: "Zovem vas na {phone}.",
    meet: "Link za Meet:",
    meetLater: "Link za Meet vam stiže mejlom.",
    mail: "Potvrda i termin za kalendar su vam u mejlu.",
    addCalendar: "Dodaj u Google kalendar",
  },
  trust: ["Bez obaveze", "Pričate sa mnom, ne sa botom"],
  cta: "Zakaži razgovor · 20 min",
  ctaShort: "Zakaži razgovor",
  dock: "Razgovor 20 min",
};

const en: CallCopy = {
  lang: "en",
  eyebrow: "Intro call · 20 min",
  title: "Book a short call",
  lead: "No time to read through the site? Tell me what you need. In 20 minutes you will know what makes sense and roughly what it costs.",
  steps: ["Topic", "Time", "Contact"],
  topicQuestion: "What is it about?",
  whenQuestion: "When suits you?",
  asapTitle: "Call me as soon as possible",
  asapToday: "I will call you today",
  asapTomorrow: "I will call you the next working morning",
  orPick: "or pick a time (Belgrade time, CET)",
  noSlots: "No free times in the next two weeks. Choose “as soon as possible” and I will get back to you.",
  loading: "Loading times…",
  howQuestion: "How should we talk?",
  phone: "Phone",
  phoneHint: "I call you",
  meet: "Google Meet",
  meetHint: "Video, link by email",
  name: "Full name",
  phoneField: "Phone number",
  emailField: "Email (for the Meet link)",
  emailOptional: "Email for the confirmation",
  company: "Company",
  note: "Anything I should know first?",
  notePlaceholder: "e.g. we run a clinic, bookings come in over WhatsApp",
  optional: "optional",
  submit: "Book the call",
  sending: "Booking…",
  back: "Back",
  change: "change",
  close: "Close",
  weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  errors: {
    name: "Please enter your name.",
    phone: "Please enter a number I can call.",
    email: "Meet needs an email, that is where the link goes.",
    slot: "Pick a time or “as soon as possible”.",
    taken: "Someone just took that time. Please pick another.",
    generic: "That did not go through. Try again or email djordje@adspire.rs.",
  },
  done: {
    title: "Booked.",
    timed: "Talk to you {when}.",
    asapToday: "I will call you today, as soon as I am free.",
    asapTomorrow: "I will call you the next working morning.",
    phone: "I will call you on {phone}.",
    meet: "Meet link:",
    meetLater: "The Meet link is on its way to your inbox.",
    mail: "The confirmation and a calendar invite are in your inbox.",
    addCalendar: "Add to Google Calendar",
  },
  trust: ["No commitment", "You talk to me, not a bot"],
  cta: "Book a 20-min call",
  ctaShort: "Book a call",
  dock: "20-min call",
};

export function getCallCopy(locale: LocaleCode | string = "sr"): CallCopy {
  return locale === "sr" ? sr : en;
}
