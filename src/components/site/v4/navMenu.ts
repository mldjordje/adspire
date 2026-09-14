import { hotelCopy, HOTEL_PATH } from "@/content/site/hotel";
import { defaultLocale, type LocaleCode } from "@/lib/site-config";

/**
 * One navigation map for the landing header, the inner-page shell and the
 * mobile menu.
 *
 * The three used to keep their own lists, so the header carried eight tiny
 * uppercase links and still had no route to the inquiry form or the education
 * page, while the mobile menu listed fifteen pages in 70px type with the form
 * at the very bottom. A visitor should find "send an inquiry" and "AI
 * education" in the first glance, so both are promoted to actions and every
 * other page sits in a small number of named groups.
 *
 * Hrefs are default-locale paths; the components run them through shellPath().
 * EN/DE only list routes that exist under [locale].
 */

export type NavItem = { href: string; label: string; hint?: string };

export type NavGroup = { title: string; items: NavItem[] };

export type NavAction = NavItem & { cta: string };

export type NavMenu = {
  navLabel: string;
  megaLabel: string;
  /** Plain links next to the dropdown trigger in the desktop bar. */
  top: NavItem[];
  /** Columns of the desktop dropdown; also the mobile menu groups. */
  groups: NavGroup[];
  /** Mobile-only group for pages that are already top-level on desktop. */
  company: NavGroup;
  /** The two things people come looking for — cards at the top of the mobile menu. */
  actions: [NavAction, NavAction];
  feature: { eyebrow: string; title: string; text: string; href: string; cta: string };
  sectionsLabel: string;
  menuLabel: string;
};

const sr = (): NavMenu => ({
  navLabel: "Glavna navigacija",
  megaLabel: "Usluge",
  top: [
    { href: "/our-projects", label: "Projekti" },
    { href: "/edukacija", label: "AI edukacija" },
    { href: "/cena-izrade-sajta", label: "Cene" },
    { href: "/about-us", label: "O nama" },
    { href: "/contact-us", label: "Kontakt" },
  ],
  groups: [
    {
      title: "Šta pravimo",
      items: [
        { href: "/our-services/web-prezentacije", label: "Sajtovi", hint: "Sajt koji donosi upite" },
        { href: "/online-zakazivanje-za-salone-i-klinike", label: "Online zakazivanje", hint: "Saloni, klinike, termini" },
        { href: HOTEL_PATH, label: "Hotelski sistem", hint: "Direktne rezervacije" },
        { href: "/our-services/e-commerce-web-shop", label: "Web shop", hint: "Prodaja, plaćanje, lager" },
        { href: "/our-services/mobilne-aplikacije", label: "Aplikacije i interni softver", hint: "Umesto Excel tabela" },
        { href: "/ai-chatbot-za-sajt", label: "AI chatbot i automatizacija", hint: "Odgovara na upite umesto tebe" },
        { href: "/our-services", label: "Sve usluge →" },
      ],
    },
    {
      title: "AI i znanje",
      items: [
        { href: "/edukacija", label: "AI edukacija 1-na-1", hint: "Paketi od 8 i 18 sati" },
        { href: "/ai", label: "AI po delatnostima", hint: "Šta AI radi u tvojoj branši" },
        { href: "/vodici", label: "Vodiči", hint: "Kako izabrati, koliko traje" },
        { href: "/blog", label: "Blog" },
      ],
    },
    {
      title: "Kreni odavde",
      items: [
        { href: "/upit/brzo", label: "Brzi upit", hint: "5 polja, bez naloga" },
        { href: "/upit", label: "Detaljan brief", hint: "Za tačnu ponudu" },
        { href: "/besplatan-pregled-sajta", label: "Besplatan pregled sajta" },
        { href: "/cena-izrade-sajta", label: "Cene izrade sajta", hint: "Okvirni rasponi" },
        { href: "/kako-radimo", label: "Kako radimo" },
      ],
    },
  ],
  company: {
    title: "Firma",
    items: [
      { href: "/", label: "Početna" },
      { href: "/our-projects", label: "Projekti" },
      { href: "/about-us", label: "O nama" },
      { href: "/contact-us", label: "Kontakt" },
      { href: "/nalog", label: "Moj nalog" },
    ],
  },
  actions: [
    { href: "/upit/brzo", label: "Pošalji upit", hint: "5 polja, bez naloga i obaveze", cta: "menu-upit" },
    { href: "/edukacija", label: "AI edukacija", hint: "1-na-1, paketi od 8 i 18 sati", cta: "menu-edukacija" },
  ],
  feature: {
    eyebrow: "Ne znaš odakle da kreneš?",
    title: "Opiši u jednoj rečenici šta ti treba.",
    text: "Pet polja, bez naloga. Javljam se lično i kažem ti šta ima smisla.",
    href: "/upit/brzo",
    cta: "Pošalji upit",
  },
  sectionsLabel: "Na ovoj strani",
  menuLabel: "Glavni meni",
});

const en = (): NavMenu => ({
  navLabel: "Main navigation",
  megaLabel: "Services",
  top: [
    { href: "/our-projects", label: "Work" },
    { href: "/ai", label: "AI" },
    { href: "/about-us", label: "About" },
    { href: "/contact-us", label: "Contact" },
  ],
  groups: [
    {
      title: "What we build",
      items: [
        { href: "/our-services/web-prezentacije", label: "Websites", hint: "Sites that bring inquiries" },
        { href: HOTEL_PATH, label: hotelCopy.en.nav, hint: "Direct bookings, no commission" },
        { href: "/our-services/e-commerce-web-shop", label: "Web shops", hint: "Sales, payments, stock" },
        { href: "/our-services/mobilne-aplikacije", label: "Apps & internal tools" },
        { href: "/our-services/ai-integracije-automatizacija", label: "AI & automation" },
        { href: "/our-services", label: "All services →" },
      ],
    },
    {
      title: "AI & insights",
      items: [
        { href: "/ai", label: "AI by industry", hint: "What AI does in your field" },
        { href: "/blog", label: "Blog" },
        { href: "/faq", label: "FAQ" },
      ],
    },
    {
      title: "Start here",
      items: [
        { href: "/contact-us", label: "Request a quote", hint: "Reply from a real person" },
        { href: "/our-projects", label: "See our work" },
      ],
    },
  ],
  company: {
    title: "Company",
    items: [
      { href: "/", label: "Home" },
      { href: "/our-projects", label: "Work" },
      { href: "/about-us", label: "About" },
      { href: "/contact-us", label: "Contact" },
    ],
  },
  actions: [
    { href: "/contact-us", label: "Request a quote", hint: "Tell us what you need", cta: "menu-upit" },
    { href: "/our-services", label: "Services", hint: "Websites, booking, AI", cta: "menu-services" },
  ],
  feature: {
    eyebrow: "Not sure where to start?",
    title: "Describe what you need in one sentence.",
    text: "No account, no obligation. You get a personal reply.",
    href: "/contact-us",
    cta: "Request a quote",
  },
  sectionsLabel: "On this page",
  menuLabel: "Main menu",
});

const de = (): NavMenu => ({
  navLabel: "Hauptnavigation",
  megaLabel: "Leistungen",
  top: [
    { href: "/our-projects", label: "Projekte" },
    { href: "/ai", label: "KI" },
    { href: "/about-us", label: "Über uns" },
    { href: "/contact-us", label: "Kontakt" },
  ],
  groups: [
    {
      title: "Was wir bauen",
      items: [
        { href: "/our-services/web-prezentacije", label: "Websites", hint: "Websites, die Anfragen bringen" },
        { href: HOTEL_PATH, label: hotelCopy.de.nav, hint: "Direktbuchungen ohne Provision" },
        { href: "/our-services/e-commerce-web-shop", label: "Onlineshops", hint: "Verkauf, Zahlung, Lager" },
        { href: "/our-services/mobilne-aplikacije", label: "Apps & interne Software" },
        { href: "/our-services/ai-integracije-automatizacija", label: "KI & Automatisierung" },
        { href: "/our-services", label: "Alle Leistungen →" },
      ],
    },
    {
      title: "KI & Wissen",
      items: [
        { href: "/ai", label: "KI nach Branche", hint: "Was KI in Ihrer Branche leistet" },
        { href: "/blog", label: "Blog" },
        { href: "/faq", label: "FAQ" },
      ],
    },
    {
      title: "Hier starten",
      items: [
        { href: "/contact-us", label: "Angebot anfordern", hint: "Persönliche Antwort" },
        { href: "/our-projects", label: "Unsere Arbeiten" },
      ],
    },
  ],
  company: {
    title: "Unternehmen",
    items: [
      { href: "/", label: "Startseite" },
      { href: "/our-projects", label: "Projekte" },
      { href: "/about-us", label: "Über uns" },
      { href: "/contact-us", label: "Kontakt" },
    ],
  },
  actions: [
    { href: "/contact-us", label: "Angebot anfordern", hint: "Beschreiben Sie Ihr Vorhaben", cta: "menu-upit" },
    { href: "/our-services", label: "Leistungen", hint: "Websites, Buchung, KI", cta: "menu-services" },
  ],
  feature: {
    eyebrow: "Unsicher, wo Sie anfangen?",
    title: "Beschreiben Sie Ihr Vorhaben in einem Satz.",
    text: "Ohne Konto, unverbindlich. Sie erhalten eine persönliche Antwort.",
    href: "/contact-us",
    cta: "Angebot anfordern",
  },
  sectionsLabel: "Auf dieser Seite",
  menuLabel: "Hauptmenü",
});

const byLocale: Record<LocaleCode, () => NavMenu> = { sr, en, de };

export function getNavMenu(locale: LocaleCode = defaultLocale): NavMenu {
  return (byLocale[locale] ?? byLocale[defaultLocale])();
}

/** True when `href` is the page being viewed (or a parent section of it). */
export function isCurrentPath(href: string, pathname: string | null) {
  if (!pathname) return false;
  const path = pathname.replace(/^\/(en|de)(?=\/|$)/, "") || "/";
  if (href === "/") return path === "/";
  return path === href || (href !== "/upit" && path.startsWith(`${href}/`));
}
