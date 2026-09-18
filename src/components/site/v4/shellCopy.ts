import { defaultLocale, localePath, type LocaleCode } from "@/lib/site-config";
import { hotelCopy, HOTEL_PATH } from "@/content/site/hotel";

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

export type ShellLink = { href: string; label: string };

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
  footerLinks: ShellLink[];
  footerRights: string;
  menuOpen: string;
  menuClose: string;
};

const sr: ShellCopy = {
  navCta: "Pošalji upit",
  // The short form is the default ask everywhere. The full brief is one link
  // away for whoever wants a price without a conversation first.
  navCtaHref: "/upit/brzo",
  clockCity: "NIŠ",
  footerLinks: [
    { href: "/our-projects", label: "Projekti" },
    { href: "/our-services", label: "Usluge" },
    { href: "/ai", label: "AI po delatnostima" },
    { href: "/about-us", label: "O nama" },
    { href: "/blog", label: "Blog" },
    { href: "/it-firma-nis", label: "IT firma Niš" },
    { href: "/izrada-sajta-i-aplikacija-nis", label: "Izrada sajta i aplikacija" },
    { href: "/rezervacioni-sistemi-nis", label: "Rezervacioni sistemi" },
    { href: "/online-zakazivanje-za-salone-i-klinike", label: "Zakazivanje saloni" },
    { href: "/edukacija", label: "AI edukacija" },
    { href: "/ai-video-za-vas-biznis", label: "AI video za biznis" },
    { href: "/ai-u-biznisu", label: "AI u biznisu" },
    { href: "/vodici", label: "Vodiči" },
    { href: "/kako-radimo", label: "Kako radimo" },
    { href: "/odrzavanje-i-podrska", label: "Održavanje" },
    { href: "/besplatan-pregled-sajta", label: "Besplatan pregled" },
    { href: "/cena-izrade-sajta", label: "Cene" },
    { href: "/upit/brzo", label: "Brzi upit" },
    { href: "/upit", label: "Pun brief" },
    { href: "/contact-us", label: "Kontakt" },
    { href: "/nalog", label: "Moj nalog" },
    { href: "/politika-privatnosti", label: "Privatnost" },
    { href: "/politika-kolacica", label: "Kolačići" },
    { href: "/uslovi-koriscenja", label: "Uslovi" },
  ],
  footerRights: "© 2026 Adspire Digital — Niš, Srbija",
  menuOpen: "Otvori meni",
  menuClose: "Zatvori meni",
};

const en: ShellCopy = {
  navCta: "Request a quote",
  navCtaHref: "/contact-us",
  clockCity: "NIŠ",
  footerLinks: [
    { href: "/our-projects", label: "Work" },
    { href: "/our-services", label: "Services" },
    { href: "/ai", label: "AI by industry" },
    { href: "/about-us", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/upit", label: "Project brief" },
    { href: "/contact-us", label: "Contact" },
    { href: "/politika-privatnosti", label: "Privacy" },
    { href: "/politika-kolacica", label: "Cookies" },
    { href: "/uslovi-koriscenja", label: "Terms" },
  ],
  footerRights: "© 2026 Adspire Digital — Niš, Serbia",
  menuOpen: "Open menu",
  menuClose: "Close menu",
};

const de: ShellCopy = {
  navCta: "Angebot anfordern",
  navCtaHref: "/contact-us",
  clockCity: "NIŠ",
  footerLinks: [
    { href: "/our-projects", label: "Projekte" },
    { href: "/our-services", label: "Leistungen" },
    { href: "/ai", label: "KI nach Branche" },
    { href: "/about-us", label: "Über uns" },
    { href: "/blog", label: "Blog" },
    { href: "/upit", label: "Projektanfrage" },
    { href: "/contact-us", label: "Kontakt" },
    { href: "/politika-privatnosti", label: "Datenschutz" },
    { href: "/politika-kolacica", label: "Cookies" },
    { href: "/uslovi-koriscenja", label: "AGB" },
  ],
  footerRights: "© 2026 Adspire Digital — Niš, Serbien",
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
  const copy = byLocale[locale] ?? byLocale[defaultLocale];
  const hotel = { href: HOTEL_PATH, label: hotelCopy[locale].nav };
  return { ...copy, footerLinks: [hotel, ...copy.footerLinks] };
}
