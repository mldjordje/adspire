import { INQUIRY_STATUS_LABEL, type InquiryStatus } from "./types";

/**
 * Whose move it is on an upit, derived from the correspondence.
 *
 * The stored status only moves on a quote or an answer to it. Most briefs get a
 * question first, so "submitted" alone cannot tell "nobody answered" from "I
 * asked, waiting on them" — the last message can.
 */

export type ThreadState = {
  /** Last mail that actually reached the buyer. */
  lastOut: string | null;
  /** Last reply the buyer wrote on the upit page. */
  lastIn: string | null;
};

export type Turn = "owner" | "buyer" | "closed";

const OPEN: readonly InquiryStatus[] = ["submitted", "quoted"];

export const clientReplied = (state: ThreadState) =>
  state.lastIn !== null && (state.lastOut === null || state.lastIn > state.lastOut);

export function inquiryTurn(status: InquiryStatus, state: ThreadState): Turn {
  if (!OPEN.includes(status)) return "closed";
  if (clientReplied(state)) return "owner";
  if (status === "submitted" && state.lastOut === null) return "owner";
  return "buyer";
}

/** Label for the operator. The buyer page keeps INQUIRY_STATUS_LABEL. */
export function osStatusLabel(status: InquiryStatus, state: ThreadState): string {
  if (OPEN.includes(status) && clientReplied(state)) return "Klijent odgovorio";
  if (status === "submitted") return state.lastOut ? "Odgovoreno" : "Novi";
  return INQUIRY_STATUS_LABEL[status];
}

/** Filter chips in /os: "submitted" means "no price yet", not "sent". */
export const OS_STATUS_FILTER_LABEL: Record<InquiryStatus, string> = {
  ...INQUIRY_STATUS_LABEL,
  submitted: "Bez ponude",
};

/** When the current wait started: the buyer's last word, or the brief itself. */
export const waitingSince = (createdAt: string, state: ThreadState) =>
  clientReplied(state) && state.lastIn ? state.lastIn : createdAt;
