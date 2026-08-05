/**
 * Draft storage for the brief.
 *
 * The form asks for a description, a wish list and billing details — several
 * minutes of typing. A closed tab, a phone call or a stray back button must not
 * cost the buyer all of it, so every keystroke lands in localStorage and the
 * form comes back the way they left it.
 *
 * Deliberately local only: nothing is sent anywhere until they press send, so a
 * half-written brief is never a lead we saw and they did not send.
 */

const KEY = "adspire.upit.draft.v1";

/** Older drafts are noise, not help: a brief from three weeks ago is a
 *  different project, and restoring it silently would be confusing. */
const MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;

export type InquiryDraft<T> = {
  savedAt: number;
  services: string[];
  form: T;
};

export function saveDraft<T>(services: string[], form: T): void {
  if (typeof window === "undefined") return;
  try {
    const draft: InquiryDraft<T> = { savedAt: Date.now(), services, form };
    window.localStorage.setItem(KEY, JSON.stringify(draft));
  } catch {
    // Private mode, or a full quota. Losing the draft is not worth an error.
  }
}

export function readDraft<T>(): InquiryDraft<T> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as InquiryDraft<T>;
    if (typeof draft?.savedAt !== "number" || !draft.form) return null;
    if (Date.now() - draft.savedAt > MAX_AGE_MS) {
      clearDraft();
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* see saveDraft */
  }
}
