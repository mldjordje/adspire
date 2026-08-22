import { defaultLocale, type LocaleCode } from "@/lib/site-config";

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
  navLinks: ShellLink[];
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
  menuPagesLabel: string;
  menuSectionsLabel: string;
  menuPages: ShellLink[];
};

const sr: ShellCopy = {
  navLinks: [
    { href: "/our-services", label: "Usluge" },
    { href: "/our-projects", label: "Projekti" },
    { href: "/ai", label: "AI" },
    { href: "/about-us", label: "O nama" },
  ],
  navCta: "Zatraži ponudu",
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
    { href: "/it-firma-nis", label: "Niš" },
    { href: "/vodici", label: "Vodiči" },
    { href: "/kako-radimo", label: "Kako radimo" },
    { href: "/odrzavanje-i-podrska", label: "Održavanje" },
    { href: "/besplatan-pregled-sajta", label: "Besplatan pregled" },
    { href: "/cena-izrade-sajta", label: "Cene" },
    { href: "/upit/brzo", label: "Brzi upit" },
    { href: "/upit", label: "Pun brief" },
    { href: "/contact-us", label: "Kontakt" },
    { href: "/politika-privatnosti", label: "Privatnost" },
    { href: "/politika-kolacica", label: "Kolačići" },
    { href: "/uslovi-koriscenja", label: "Uslovi" },
  ],
  footerRights: "© 2026 Adspire Digital — Niš, Srbija",
  menuOpen: "Otvori meni",
  menuClose: "Zatvori meni",
  menuPagesLabel: "Stranice",
  menuSectionsLabel: "Sekcije na početnoj strani",
  menuPages: [
    { href: "/", label: "Početna" },
    { href: "/our-projects", label: "Projekti" },
    { href: "/our-services", label: "Usluge" },
    { href: "/ai", label: "AI po delatnostima" },
    { href: "/about-us", label: "O nama" },
    { href: "/blog", label: "Blog" },
    { href: "/kako-radimo", label: "Kako radimo" },
    { href: "/upit/brzo", label: "Postavi pitanje" },
    { href: "/upit", label: "Zatraži ponudu" },
    { href: "/contact-us", label: "Kontakt" },
  ],
};

const en: ShellCopy = {
  navLinks: [
    { href: "/our-services", label: "Services" },
    { href: "/our-projects", label: "Work" },
    { href: "/ai", label: "AI" },
    { href: "/about-us", label: "About" },
  ],
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
  menuPagesLabel: "Pages",
  menuSectionsLabel: "Sections on this page",
  menuPages: [
    { href: "/", label: "Home" },
    { href: "/our-projects", label: "Work" },
    { href: "/our-services", label: "Services" },
    { href: "/ai", label: "AI by industry" },
    { href: "/about-us", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/upit", label: "Request a quote" },
    { href: "/contact-us", label: "Contact" },
  ],
};

const de: ShellCopy = {
  navLinks: [
    { href: "/our-services", label: "Leistungen" },
    { href: "/our-projects", label: "Projekte" },
    { href: "/ai", label: "KI" },
    { href: "/about-us", label: "Über uns" },
  ],
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
  menuPagesLabel: "Seiten",
  menuSectionsLabel: "Abschnitte auf dieser Seite",
  menuPages: [
    { href: "/", label: "Startseite" },
    { href: "/our-projects", label: "Projekte" },
    { href: "/our-services", label: "Leistungen" },
    { href: "/ai", label: "KI nach Branche" },
    { href: "/about-us", label: "Über uns" },
    { href: "/blog", label: "Blog" },
    { href: "/upit", label: "Angebot anfordern" },
    { href: "/contact-us", label: "Kontakt" },
  ],
};

const byLocale: Record<LocaleCode, ShellCopy> = { sr, en, de };

export function getShellCopy(locale: LocaleCode = defaultLocale): ShellCopy {
  return byLocale[locale] ?? byLocale[defaultLocale];
}
