import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";

/**
 * Chrome labels for the inner-page shell.
 *
 * Until now PageShellV4 hardcoded Serbian, which is why every prefixed inner
 * route is noindex in pageMetadata — a German page under a Serbian nav is not
 * a German page. Anything that starts serving localized body copy needs this
 * too, otherwise the translation stops at the article and the buyer sees it.
 *
 * Hrefs stay in default-locale form; the shell runs them through localePath().
 */

export type ShellCopy = {
  navCta: string;
  /**
   * Where the nav button goes. NOT run through localePath(): the brief is a
   * Serbian-only flow, so /en/upit and /de/upit were 404s. English and German
   * visitors are sent to the contact page, which is localised.
   */
  navCtaHref: string;
  /** Prefixes the clock in the nav CTA, e.g. " · NIŠ 14:20". */
  clockCity: string;
  menuOpen: string;
  menuClose: string;
};

const sr: ShellCopy = {
  navCta: "Pošalji upit",
  // The short form is the default ask everywhere. The full brief is one link
  // away for whoever wants a price without a conversation first.
  navCtaHref: "/upit/brzo",
  clockCity: "NIŠ",
  menuOpen: "Otvori meni",
  menuClose: "Zatvori meni",
};

const en: ShellCopy = {
  navCta: "Request a quote",
  navCtaHref: "/contact-us",
  clockCity: "NIŠ",
  menuOpen: "Open menu",
  menuClose: "Close menu",
};

const de: ShellCopy = {
  navCta: "Angebot anfordern",
  navCtaHref: "/contact-us",
  clockCity: "NIŠ",
  menuOpen: "Menü öffnen",
  menuClose: "Menü schließen",
};

const byLocale: Record<LocaleCode, ShellCopy> = { sr, en, de };

/**
 * Legal documents, the full brief and the client account exist only in Serbian.
 *
 * A prefixed copy of these is a 404, so they keep their bare path in every
 * locale — the account especially: /en/nalog would send a signed-in buyer to a
 * missing page.
 */
const UNPREFIXED = [
  "/upit",
  "/nalog",
  "/edukacija",
  "/ai-video-za-vas-biznis",
  "/ai-u-biznisu",
  "/edukacija/porudzbina",
  "/politika-privatnosti",
  "/politika-kolacica",
  "/uslovi-koriscenja",
];

export function shellPath(path: string, locale: LocaleCode) {
  if (UNPREFIXED.includes(path)) return path;
  return localePath(path, locale);
}

export function getShellCopy(locale: LocaleCode = defaultLocale): ShellCopy {
  return byLocale[locale] ?? byLocale[defaultLocale];
}
