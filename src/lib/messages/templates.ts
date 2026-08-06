/**
 * Canned first replies.
 *
 * One operator answering everything by hand is how leads go cold on a busy
 * week. These are starting points, not final text: the composer drops one into
 * the box and the owner edits before sending.
 *
 * No `server-only` import — the composer that renders them is a client
 * component, and the send action reads nothing from here.
 */

export type ReplyContext = {
  firstName: string;
  reference?: string | null;
  businessName?: string | null;
  subjectHint?: string | null;
};

export type ReplyTemplate = {
  id: string;
  label: string;
  subject: (ctx: ReplyContext) => string;
  body: (ctx: ReplyContext) => string;
};

const signature = [
  "",
  "Đorđe Mladenović",
  "Adspire Digital · adspire.rs",
  "+381 60 149 149 1",
].join("\n");

const tag = (ctx: ReplyContext) =>
  ctx.reference ? ` [${ctx.reference}]` : "";

export const REPLY_TEMPLATES: ReplyTemplate[] = [
  {
    id: "prvi-kontakt",
    label: "Prvi odgovor",
    subject: (ctx) => `Adspire — odgovor na tvoj upit${tag(ctx)}`,
    body: (ctx) =>
      [
        `Zdravo ${ctx.firstName},`,
        "",
        `hvala na javljanju${ctx.businessName ? ` u vezi sa ${ctx.businessName}` : ""}.`,
        "Pročitao sam šta ti treba i mogu to da uradim.",
        "",
        "Da ne bih pogodio pogrešno, tri pitanja:",
        "1. Do kada bi želeo da sve bude gotovo?",
        "2. Postoji li sajt/sistem koji sada koristiš?",
        "3. Da li ti je bliži jednokratan posao ili i održavanje posle?",
        "",
        "Odgovori u par rečenica, pa ti šaljem cenu i rok.",
        signature,
      ].join("\n"),
  },
  {
    id: "poziv",
    label: "Predlog poziva",
    subject: (ctx) => `Kratak poziv?${tag(ctx)}`,
    body: (ctx) =>
      [
        `Zdravo ${ctx.firstName},`,
        "",
        "Ovo se najbrže rešava kroz 15 minuta razgovora.",
        "Odgovara li ti danas posle 17h ili sutra pre podne?",
        "",
        "Ako ti je lakše, pozovi direktno na +381 60 149 149 1.",
        signature,
      ].join("\n"),
  },
  {
    id: "ponuda-stize",
    label: "Ponuda stiže",
    subject: (ctx) => `Ponuda stiže do sutra${tag(ctx)}`,
    body: (ctx) =>
      [
        `Zdravo ${ctx.firstName},`,
        "",
        "Primio sam sve što treba. Cenu i rok šaljem najkasnije sutra do kraja dana.",
        "Ako se u međuvremenu nešto promeni u obimu, javi.",
        signature,
      ].join("\n"),
  },
  {
    id: "materijali",
    label: "Traži materijale",
    subject: (ctx) => `Treba mi još par stvari${tag(ctx)}`,
    body: (ctx) =>
      [
        `Zdravo ${ctx.firstName},`,
        "",
        "Da bih krenuo, treba mi:",
        "— logo (vektor ako postoji)",
        "— tekstovi i fotografije koje već imaš",
        "— pristup domenu i hostingu (ili podatke kod koga su)",
        "",
        "Pošalji šta imaš, ostalo rešavamo usput.",
        signature,
      ].join("\n"),
  },
  {
    id: "podsetnik",
    label: "Podsetnik na ponudu",
    subject: (ctx) => `Da li je ponuda i dalje aktuelna?${tag(ctx)}`,
    body: (ctx) =>
      [
        `Zdravo ${ctx.firstName},`,
        "",
        "Javljam se samo da proverim da li ti je ponuda i dalje aktuelna.",
        "Ako je nešto skupo ili predugo, reci — obim se može smanjiti.",
        "Ako ti sada ne odgovara, i to je uredu, samo da znam da zatvorim stavku.",
        signature,
      ].join("\n"),
  },
  {
    id: "odbijanje",
    label: "Ljubazno odbijanje",
    subject: (ctx) => `Odgovor na upit${tag(ctx)}`,
    body: (ctx) =>
      [
        `Zdravo ${ctx.firstName},`,
        "",
        "Hvala na poverenju, ali ovaj posao trenutno ne mogu da preuzmem kako treba.",
        "Ne želim da ti uzmem rok koji ne mogu da ispoštujem.",
        "",
        "Ako se u narednih mesec dana oslobodi termin, javljam se prvi.",
        signature,
      ].join("\n"),
  },
];

export const firstNameOf = (fullName: string): string =>
  fullName.trim().split(/\s+/)[0] || "zdravo";
