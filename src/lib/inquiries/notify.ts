import "server-only";

import { leadNotificationRecipient } from "@/lib/env";
import { sendMail } from "@/lib/mail";
import { getSiteUrl } from "@/lib/seo/site";
import { serviceTitles } from "./catalog";
import { BUYER_TYPE_LABEL, isSerbia, TIMEFRAME_LABEL, type BuyerType } from "./types";
import type { InquiryRow } from "./store";
import type { InquirySubmission } from "./validation";

/**
 * The three mails an upit produces.
 *
 * All of them return a boolean instead of throwing: the brief is already in the
 * database by the time these run, and a mailbox that is down must not turn a
 * stored upit into a 500 the buyer reads as "it did not go through".
 */

export const statusUrl = (accessToken: string) =>
  `${getSiteUrl()}/upit/status/${accessToken}`;

const money = (amount: number, currency: string) =>
  `${new Intl.NumberFormat("sr-RS", { minimumFractionDigits: 2 }).format(amount)} ${currency}`;

/** The confirmation the buyer gets. Carries the status link, which is the only
 *  way back in for someone who never made an account. */
export async function notifyBuyerOfInquiry(
  submission: InquirySubmission,
  inquiry: { reference: string; accessToken: string },
): Promise<boolean> {
  const titles = serviceTitles(submission.services);
  return sendMail({
    to: submission.email,
    subject: `Upit ${inquiry.reference} je stigao — ${titles.join(" + ")}`,
    replyTo: "djordje@adspire.rs",
    text: [
      `Zdravo ${submission.fullName.split(" ")[0]},`,
      "",
      `Primili smo tvoj upit za: ${titles.join(" + ")}.`,
      "",
      "Šta sledi:",
      "1. Pregledamo opis, želje i rok koji si naveo.",
      "2. Cena i vreme izrade stižu na tvoj mejl, obično u roku od dva radna dana.",
      "3. Tek tada odlučuješ. Do tada te ništa ne obavezuje.",
      "",
      "Status upita možeš pratiti ovde:",
      statusUrl(inquiry.accessToken),
      "",
      "Link je privatan — čuvaj ga, on je tvoj ulaz u ovaj upit.",
      "",
      "Đorđe Mladenović",
      "Adspire Digital · djordje@adspire.rs · +381 60 149 149 1",
    ].join("\n"),
  });
}

/** What the owner reads. Everything needed to price the job is in the body, so
 *  a quote can be written from the phone without opening `/os`. */
export async function notifyOwnerOfInquiry(
  submission: InquirySubmission,
  inquiry: { id: string; reference: string; accessToken: string },
): Promise<boolean> {
  const to = leadNotificationRecipient();
  if (!to) return false;

  const titles = serviceTitles(submission.services);
  const domestic = isSerbia(submission.country);
  const buyer = BUYER_TYPE_LABEL[submission.buyerType as BuyerType];

  return sendMail({
    to,
    replyTo: submission.email,
    subject: `Novi upit ${inquiry.reference} — ${submission.businessName}`,
    text: [
      `${submission.fullName} (${submission.email}${submission.phone ? `, ${submission.phone}` : ""})`,
      `Usluge: ${titles.join(" + ")}`,
      `Naručilac: ${buyer}${submission.companyName ? ` — ${submission.companyName}` : ""}`,
      `Zemlja: ${submission.country}${domestic ? "" : " — inostrani predračun (EN, IBAN/SWIFT)"}`,
      ...(submission.buyerType === "company" && domestic
        ? [`PIB: ${submission.pib} · MB: ${submission.mb}`]
        : []),
      `Rok: ${TIMEFRAME_LABEL[submission.timeframe]}`,
      `Budžet: ${submission.budgetEur != null ? `${submission.budgetEur} EUR` : "nije naveden"}`,
      "",
      `Biznis: ${submission.businessName}`,
      submission.businessDescription,
      "",
      "Šta traži:",
      submission.idea,
      ...(submission.wishes ? ["", "Želje i funkcionalnosti:", submission.wishes] : []),
      "",
      `Pošalji ponudu: ${getSiteUrl()}/os/upiti/${inquiry.id}`,
    ].join("\n"),
  });
}

/** The quote's subject and body, exported so `/os` can log and preview exactly
 *  what the buyer received. */
export function quoteMailSubject(inquiry: InquiryRow): string {
  return `Ponuda za upit ${inquiry.reference} — ${serviceTitles(inquiry.services).join(" + ")}`;
}

export function quoteMailBody(inquiry: InquiryRow): string {
  const titles = serviceTitles(inquiry.services);
  return [
    `Zdravo ${inquiry.full_name.split(" ")[0]},`,
    "",
    `Evo procene za: ${titles.join(" + ")}.`,
    "",
    `Cena: ${inquiry.quoted_amount != null ? money(inquiry.quoted_amount, inquiry.currency) : "—"}`,
    ...(inquiry.turnaround_days ? [`Rok izrade: ${inquiry.turnaround_days} dana`] : []),
    ...(inquiry.quote_valid_until ? [`Ponuda važi do: ${inquiry.quote_valid_until}`] : []),
    ...(inquiry.quote_note ? ["", inquiry.quote_note] : []),
    "",
    "Prihvati ili odbij ovde:",
    statusUrl(inquiry.access_token),
    "",
    "Ako nešto ne stoji, samo odgovori na ovaj mejl — menjamo obim dok ne bude tačno.",
    "",
    "Đorđe Mladenović",
    "Adspire Digital",
  ].join("\n");
}

/** The quote itself. Sent when the owner prices the brief in `/os`. */
export async function notifyBuyerOfQuote(inquiry: InquiryRow): Promise<boolean> {
  return sendMail({
    to: inquiry.email,
    replyTo: "djordje@adspire.rs",
    subject: quoteMailSubject(inquiry),
    text: quoteMailBody(inquiry),
  });
}

/** The buyer's answer, back to the owner. */
export async function notifyOwnerOfResponse(inquiry: InquiryRow): Promise<boolean> {
  const to = leadNotificationRecipient();
  if (!to) return false;

  const accepted = inquiry.status === "accepted";
  return sendMail({
    to,
    replyTo: inquiry.email,
    subject: `${accepted ? "PRIHVAĆENO" : "Odbijeno"} — upit ${inquiry.reference} (${inquiry.business_name})`,
    text: [
      `${inquiry.full_name} (${inquiry.email}) je ${accepted ? "prihvatio" : "odbio"} ponudu.`,
      `Usluge: ${serviceTitles(inquiry.services).join(" + ")}`,
      ...(inquiry.quoted_amount != null
        ? [`Cena: ${money(inquiry.quoted_amount, inquiry.currency)}`]
        : []),
      ...(inquiry.decline_reason ? ["", `Razlog: ${inquiry.decline_reason}`] : []),
      "",
      `${getSiteUrl()}/os/upiti/${inquiry.id}`,
    ].join("\n"),
  });
}

/** The login link for the optional account. */
export async function sendPortalLoginLink(
  email: string,
  token: string,
): Promise<boolean> {
  return sendMail({
    to: email,
    subject: "Prijava na Adspire nalog",
    text: [
      "Klikni da se prijaviš:",
      `${getSiteUrl()}/api/portal/verifikacija?token=${encodeURIComponent(token)}`,
      "",
      "Link važi 30 minuta i može se iskoristiti jednom.",
      "Ako nisi tražio prijavu, samo ignoriši ovaj mejl.",
      "",
      "Adspire Digital",
    ].join("\n"),
  });
}
