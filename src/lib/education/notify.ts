import "server-only";

import { leadNotificationRecipient } from "@/lib/env";
import { sendMail, type MailAttachment } from "@/lib/mail";
import { getSiteUrl } from "@/lib/seo/site";
import { formatDay, formatHours, KIND_LABEL, type EduKind } from "./format";
import { sessionIcs } from "./ics";
import { CANCEL_CUTOFF_HOURS, endSlot } from "./slots";

/**
 * The mails edukacija produces.
 *
 * Every one returns quietly: the booking, refund or grant is already in the
 * database when these run, and a mailbox that is down must not turn it into an
 * error the buyer reads as "it did not go through".
 */

export type Person = { email: string; fullName: string | null };

export type SessionInfo = {
  id?: string;
  kind: EduKind;
  date: string;
  startSlot: string;
  hours: number;
  topic: string | null;
  meetUrl?: string | null;
};

const accountUrl = () => `${getSiteUrl()}/nalog/edukacija`;
const osUrl = () => `${getSiteUrl()}/os/edukacija`;
const SIGNATURE = "Adspire Digital";

const greeting = (person: Person) => {
  const first = person.fullName?.trim().split(/\s+/)[0];
  return first ? `Zdravo ${first},` : "Zdravo,";
};

const when = (s: SessionInfo) =>
  `${formatDay(s.date)} ${s.startSlot}–${endSlot(s.startSlot, s.hours)}`;

const lines = (...rows: (string | null | false)[]) =>
  rows.filter((row): row is string => typeof row === "string").join("\n");

async function send(
  to: string | null,
  subject: string,
  text: string,
  attachments?: MailAttachment[],
): Promise<boolean> {
  if (!to) return false;
  try {
    return await sendMail({ to, subject, text, attachments });
  } catch (error) {
    console.error("edu_mail_failed", { subject, error });
    return false;
  }
}

export async function notifyBooked(person: Person, session: SessionInfo): Promise<void> {
  const calendar = session.id
    ? [
        {
          filename: "termin-adspire.ics",
          contentType: "text/calendar; charset=utf-8",
          content: Buffer.from(
            sessionIcs({
              uid: `edu-${session.id}@adspire.rs`,
              date: session.date,
              startSlot: session.startSlot,
              hours: session.hours,
              summary: `${KIND_LABEL[session.kind]} — Adspire`,
              description: lines(
                session.topic ? `Tema: ${session.topic}` : null,
                `Link za sastanak je na nalogu: ${accountUrl()}`,
              ),
              url: accountUrl(),
            }),
          ),
        },
      ]
    : undefined;

  await send(
    person.email,
    `Termin zakazan — ${formatDay(session.date)} u ${session.startSlot}`,
    lines(
      greeting(person),
      "",
      `Termin je rezervisan: ${when(session)} (${KIND_LABEL[session.kind]}).`,
      session.topic ? `Tema: ${session.topic}` : null,
      `Sa stanja je skinuto ${formatHours(session.hours)}.`,
      calendar ? "U prilogu je termin za tvoj kalendar." : null,
      "",
      `Link za sastanak stiže mejlom i na nalog pre termina: ${accountUrl()}`,
      `Otkazivanje je moguće do ${CANCEL_CUTOFF_HOURS}h pre početka — sati se tada vraćaju.`,
      "",
      SIGNATURE,
    ),
    calendar,
  );

  await send(
    leadNotificationRecipient(),
    `Nov termin — ${session.date} ${session.startSlot} · ${person.email}`,
    lines(
      `${person.fullName ?? "Klijent"} (${person.email}) je zakazao termin.`,
      `${when(session)} · ${formatHours(session.hours)} · ${KIND_LABEL[session.kind]}`,
      session.topic ? `Tema: ${session.topic}` : null,
      "",
      "Nalepi link za sastanak ovde:",
      osUrl(),
    ),
  );
}

export async function notifyCanceledByBuyer(person: Person, session: SessionInfo): Promise<void> {
  await send(
    leadNotificationRecipient(),
    `Otkazan termin — ${session.date} ${session.startSlot} · ${person.email}`,
    lines(
      `${person.fullName ?? "Klijent"} (${person.email}) je otkazao termin.`,
      `${when(session)} · ${formatHours(session.hours)}`,
      "Sati su vraćeni na stanje, a slot je ponovo slobodan.",
      "",
      osUrl(),
    ),
  );
}

export async function notifyCanceledByStudio(
  person: Person,
  session: SessionInfo,
  options: { refund: boolean; reason: string | null },
): Promise<void> {
  await send(
    person.email,
    `Otkazan termin — ${formatDay(session.date)} u ${session.startSlot}`,
    lines(
      greeting(person),
      "",
      `Termin ${when(session)} je otkazan.`,
      options.reason ? `Razlog: ${options.reason}` : null,
      options.refund
        ? `Vraćeno ti je ${formatHours(session.hours)} na stanje — novi termin biraš ovde:`
        : "Novi termin biraš ovde:",
      accountUrl(),
      "",
      SIGNATURE,
    ),
  );
}

export async function notifyMeetLink(person: Person, session: SessionInfo): Promise<void> {
  if (!session.meetUrl) return;
  await send(
    person.email,
    `Link za termin ${formatDay(session.date)} u ${session.startSlot}`,
    lines(
      greeting(person),
      "",
      `Link za sastanak (${when(session)}):`,
      session.meetUrl,
      "",
      `Stoji ti i na nalogu: ${accountUrl()}`,
      "",
      SIGNATURE,
    ),
  );
}

export async function notifyHoursGranted(
  person: Person,
  grant: { hours: number; kind: EduKind; note: string | null },
): Promise<boolean> {
  return send(
    person.email,
    `Dodato ${formatHours(grant.hours)} na tvoj nalog`,
    lines(
      greeting(person),
      "",
      `Na nalog ti je dodato ${formatHours(grant.hours)} (${KIND_LABEL[grant.kind]}).`,
      grant.note ? `Napomena: ${grant.note}` : null,
      "",
      "Termine biraš sam u kalendaru. Prijava ide linkom na mejl, bez lozinke:",
      accountUrl(),
      "",
      SIGNATURE,
    ),
  );
}

/**
 * The last bookable hour is gone. The buyer hears it once, while the plan is
 * still fresh, and the owner gets the renewal conversation as a lead instead of
 * finding out when the client quietly stops booking.
 */
export async function notifyLowBalance(
  person: Person,
  wallet: { kind: EduKind; remaining: number },
): Promise<void> {
  await send(
    person.email,
    `Ostalo ti je ${formatHours(wallet.remaining)} — ${KIND_LABEL[wallet.kind]}`,
    lines(
      greeting(person),
      "",
      `Upravo si zakazao poslednji pun sat sa stanja (${KIND_LABEL[wallet.kind]}).`,
      "Ako hoćeš da nastavimo posle zakazanih termina, odgovori na ovaj mejl i dogovorićemo sledeći paket sati.",
      "",
      SIGNATURE,
    ),
  );

  await send(
    leadNotificationRecipient(),
    `Dopuna sati: ${person.fullName ?? person.email} (${formatHours(wallet.remaining)} ostalo)`,
    lines(
      `${person.fullName ?? "Klijent"} (${person.email}) je potrošio sate za ${KIND_LABEL[wallet.kind]}.`,
      "Dobar trenutak da se ponudi sledeći paket.",
      "",
      osUrl(),
    ),
  );
}

export async function notifyBuyerReminder(person: Person, session: SessionInfo): Promise<boolean> {
  return send(
    person.email,
    `Podsetnik: sutra u ${session.startSlot} — ${KIND_LABEL[session.kind]}`,
    lines(
      greeting(person),
      "",
      `Sutra imamo termin: ${when(session)}.`,
      session.topic ? `Tema: ${session.topic}` : null,
      session.meetUrl ? `Link za sastanak: ${session.meetUrl}` : `Link stiže na nalog: ${accountUrl()}`,
      "",
      SIGNATURE,
    ),
  );
}

export async function notifyOwnerAgenda(
  sessions: (SessionInfo & Person)[],
): Promise<boolean> {
  if (sessions.length === 0) return false;
  return send(
    leadNotificationRecipient(),
    `Danas: ${sessions.length} ${sessions.length === 1 ? "termin" : "termina"} edukacije`,
    lines(
      ...sessions.map((s) =>
        lines(
          `${s.startSlot}–${endSlot(s.startSlot, s.hours)} · ${KIND_LABEL[s.kind]} · ${s.fullName ?? s.email}`,
          s.topic ? `  Tema: ${s.topic}` : null,
          s.meetUrl ? `  Link: ${s.meetUrl}` : "  BEZ LINKA — nalepi ga pre termina.",
        ),
      ),
      "",
      osUrl(),
    ),
  );
}

/**
 * A package was ordered from the site.
 *
 * Two mails, because there is no payment gateway: the buyer needs to know what
 * happens next (an invoice arrives, hours follow the payment), and the owner
 * needs the order while it is still warm.
 */
export async function notifyOrderPlaced(
  person: Person,
  order: {
    packageLabel: string;
    hours: number;
    priceEur: number;
    goal: string | null;
    phone: string | null;
  },
): Promise<void> {
  const price = `${order.priceEur.toLocaleString("sr-RS")} €`;

  await send(
    person.email,
    `Porudžbina primljena — paket ${order.packageLabel} (${formatHours(order.hours)})`,
    lines(
      greeting(person),
      "",
      `Primljena je porudžbina: paket ${order.packageLabel}, ${formatHours(order.hours)}, ${price}.`,
      "",
      "Šta sledi:",
      "1. Javljam se lično, obično isti radni dan, sa predračunom i kratkim dogovorom o temama.",
      "2. Posle uplate sati se pojave na tvom nalogu.",
      "3. Termine biraš sam u kalendaru — 1 do 4 sata po terminu.",
      "",
      `Nalog ti je već otvoren: ${accountUrl()}`,
      "",
      SIGNATURE,
    ),
  );

  await send(
    leadNotificationRecipient(),
    `NOVA PORUDŽBINA edukacije: ${person.fullName ?? person.email} — ${order.packageLabel}, ${price}`,
    lines(
      `Paket: ${order.packageLabel} · ${formatHours(order.hours)} · ${price}`,
      `Klijent: ${person.fullName ?? "—"} (${person.email})`,
      order.phone ? `Telefon: ${order.phone}` : null,
      order.goal ? `Cilj: ${order.goal}` : null,
      "",
      "Sati se dodaju klikom na „Plaćeno → dodaj sate\" u:",
      osUrl(),
    ),
  );
}
