import { bookingIndustryPages, bookingIndustryPath } from "@/content/site/bookingIndustryPages";
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

/** `cta` becomes data-cta, which is how /os/analitika counts the click. */
export type NavItem = { href: string; label: string; hint?: string; cta?: string };

/** `hint` is the one-line summary under a collapsed group in the mobile menu. */
export type NavGroup = { title: string; hint?: string; items: NavItem[] };

export type NavAction = NavItem & { cta: string };

/**
 * The footer is its own short map, not a dump of every page. It used to list
 * 25 links in one wrapped run, which read as noise on a phone. A few columns of
 * at most seven, plus a faint row for the local Niš pages (they are there for
 * internal linking, not for browsing).
 */
export type NavFooter = {
  blurb: string;
  status: string;
  columns: NavGroup[];
  local?: NavGroup;
  legal: NavItem[];
  rights: string;
};

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
  /**
   * The way back into the client account.
   *
   * It used to exist only at the bottom of the mobile menu, so a buyer with
   * hours on the wallet had no visible way in from a desktop browser.
   */
  account: NavItem;
  feature: { eyebrow: string; title: string; text: string; href: string; cta: string };
  footer: NavFooter;
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
      hint: "Sajt, web shop, hotel, aplikacije, chatbot",
      items: [
        // These point at the per-niche pages, not the catalog entries: a buyer
        // clicking "Web shop" wants the page that answers what it costs and
        // what it replaces, not the one that lists what the agency offers.
        { href: "/prezentacioni-sajt-za-firmu", label: "Sajt za firmu", hint: "Sajt koji donosi upite" },
        { href: HOTEL_PATH, label: "Hotelski sistem", hint: "Direktne rezervacije" },
        { href: "/izrada-web-shopa", label: "Web shop", hint: "Prodaja, plaćanje, lager" },
        { href: "/softver-za-salon-lepote", label: "Salon lepote", hint: "Tretmani, termini, kartoni" },
        { href: "/softver-za-teretanu", label: "Teretana", hint: "Članarine i grupni treninzi" },
        { href: "/sajt-za-gradjevinsku-firmu", label: "Građevinska firma", hint: "Upiti, ponude, gradilišta" },
        { href: "/our-services/mobilne-aplikacije", label: "Aplikacije i interni softver", hint: "Umesto Excel tabela" },
        { href: "/ai-chatbot-za-sajt", label: "AI chatbot i automatizacija", hint: "Odgovara na upite umesto tebe" },
        { href: "/resenja-po-delatnosti", label: "Po delatnosti", hint: "Sve delatnosti, sloj po sloj" },
        { href: "/our-services", label: "Sve usluge →" },
      ],
    },
    {
      // One page per trade: people search "zakazivanje za berbernicu", not "booking system".
      title: "Online zakazivanje",
      hint: "Termini bez telefona, po delatnosti",
      items: [
        ...bookingIndustryPages.map((page) => ({ href: bookingIndustryPath(page.slug), label: page.navLabel })),
        { href: "/online-zakazivanje-za-salone-i-klinike", label: "Sve o zakazivanju →" },
      ],
    },
    {
      title: "AI i znanje",
      hint: "Edukacija, AI video, automatizacija, vodiči",
      items: [
        { href: "/edukacija", label: "AI edukacija 1-na-1", hint: "Nauči da praviš viralne klipove" },
      { href: "/ai-video-za-vas-biznis", label: "AI video za tvoj biznis", hint: "Mi pravimo klipove, ti objavljuješ" },
      { href: "/ai-u-biznisu", label: "AI u biznisu", hint: "Automatizacija posla koji se ponavlja" },
        { href: "/ai", label: "AI po delatnostima", hint: "Šta AI radi u tvojoj branši" },
        { href: "/vodici", label: "Vodiči", hint: "Kako izabrati, koliko traje" },
        { href: "/da-vas-ai-preporuci", label: "Da vas AI preporuči", hint: "Budite odgovor kad kupac pita AI" },
        { href: "/recnik", label: "Rečnik pojmova", hint: "Šta znače reči iz ponude" },
        { href: "/blog", label: "Blog" },
      ],
    },
    {
      title: "Kreni odavde",
      hint: "Upit, cene, besplatan pregled, nalog",
      items: [
        { href: "/upit/brzo", label: "Brzi upit", hint: "5 polja, bez naloga" },
        { href: "/za-nase-ljude-u-dijaspori", label: "Za naše u inostranstvu", hint: "Firma u EU, dogovor na našem jeziku" },
        { href: "/upit", label: "Detaljan brief", hint: "Za tačnu ponudu" },
        { href: "/edukacija/porudzbina", label: "Poruči AI edukaciju", hint: "Paket sati, odmah" },
        { href: "/nalog", label: "Moj nalog", hint: "Sati, termini i upiti" },
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
    { href: "/edukacija", label: "AI edukacija", hint: "Viralni klipovi, 1-na-1, paketi 8h i 18h", cta: "menu-edukacija" },
  ],
  account: { href: "/nalog", label: "Nalog" },
  feature: {
    eyebrow: "Ne znaš odakle da kreneš?",
    title: "Opiši u jednoj rečenici šta ti treba.",
    text: "Pet polja, bez naloga. Javljam se lično i kažem ti šta ima smisla.",
    href: "/upit/brzo",
    cta: "Pošalji upit",
  },
  footer: {
    blurb: "Studio za web, aplikacije i AI automatizaciju. Sajtovi koji dovode klijente, sistemi koji štede vreme.",
    status: "Dostupni za nove projekte",
    columns: [
      {
        title: "Usluge",
        items: [
          { href: "/prezentacioni-sajt-za-firmu", label: "Sajt za firmu" },
          { href: "/izrada-web-shopa", label: "Web shop" },
          { href: "/online-zakazivanje-za-salone-i-klinike", label: "Online zakazivanje" },
          { href: HOTEL_PATH, label: "Hotelski sistem" },
          { href: "/our-services/mobilne-aplikacije", label: "Aplikacije i softver" },
          { href: "/odrzavanje-i-podrska", label: "Održavanje" },
          { href: "/our-services", label: "Sve usluge →" },
        ],
      },
      {
        title: "AI",
        items: [
          { href: "/edukacija", label: "AI edukacija" },
          { href: "/ai-video-za-vas-biznis", label: "AI video za biznis" },
          { href: "/ai-u-biznisu", label: "AI u biznisu" },
          { href: "/ai-chatbot-za-sajt", label: "AI chatbot" },
          { href: "/da-vas-ai-preporuci", label: "Da vas AI preporuči" },
        ],
      },
      {
        title: "Firma",
        items: [
          { href: "/our-projects", label: "Projekti" },
          { href: "/about-us", label: "O nama" },
          { href: "/kako-radimo", label: "Kako radimo" },
          { href: "/cena-izrade-sajta", label: "Cene" },
          { href: "/vodici", label: "Vodiči" },
          { href: "/blog", label: "Blog" },
        ],
      },
      {
        title: "Kontakt",
        items: [
          { href: "/upit/brzo", label: "Pošalji upit", cta: "footer-upit" },
          { href: "/besplatan-pregled-sajta", label: "Besplatan pregled", cta: "footer-pregled" },
          { href: "/contact-us", label: "Kontakt" },
          { href: "/nalog", label: "Moj nalog" },
        ],
      },
    ],
    local: {
      title: "Niš",
      items: [
        { href: "/it-firma-nis", label: "IT firma Niš" },
        { href: "/izrada-sajta-i-aplikacija-nis", label: "Izrada sajta i aplikacija" },
        { href: "/izrada-aplikacija-nis", label: "Izrada aplikacija" },
        { href: "/rezervacioni-sistemi-nis", label: "Rezervacioni sistemi" },
      ],
    },
    legal: [
      { href: "/politika-privatnosti", label: "Privatnost" },
      { href: "/politika-kolacica", label: "Kolačići" },
      { href: "/uslovi-koriscenja", label: "Uslovi" },
    ],
    rights: "© 2026 Adspire — Niš, Srbija",
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
      hint: "Websites, web shops, hotels, apps, AI",
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
      hint: "AI by industry, blog, FAQ",
      items: [
        { href: "/ai", label: "AI by industry", hint: "What AI does in your field" },
        { href: "/blog", label: "Blog" },
        { href: "/faq", label: "FAQ" },
      ],
    },
    {
      title: "Start here",
      hint: "Quote, our work",
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
  account: { href: "/nalog", label: "Account" },
  feature: {
    eyebrow: "Not sure where to start?",
    title: "Describe what you need in one sentence.",
    text: "No account, no obligation. You get a personal reply.",
    href: "/contact-us",
    cta: "Request a quote",
  },
  footer: {
    blurb: "Studio for web, apps and AI automation. Sites that bring clients, systems that save time.",
    status: "Available for new projects",
    columns: [
      {
        title: "Services",
        items: [
          { href: "/our-services/web-prezentacije", label: "Websites" },
          { href: "/our-services/e-commerce-web-shop", label: "Web shops" },
          { href: HOTEL_PATH, label: hotelCopy.en.nav },
          { href: "/our-services/mobilne-aplikacije", label: "Apps & internal tools" },
          { href: "/our-services/ai-integracije-automatizacija", label: "AI & automation" },
          { href: "/our-services", label: "All services →" },
        ],
      },
      {
        title: "Company",
        items: [
          { href: "/our-projects", label: "Work" },
          { href: "/about-us", label: "About" },
          { href: "/ai", label: "AI by industry" },
          { href: "/blog", label: "Blog" },
          { href: "/faq", label: "FAQ" },
        ],
      },
      {
        title: "Contact",
        items: [
          { href: "/contact-us", label: "Request a quote", cta: "footer-upit" },
          { href: "/nalog", label: "Account" },
        ],
      },
    ],
    legal: [
      { href: "/politika-privatnosti", label: "Privacy" },
      { href: "/politika-kolacica", label: "Cookies" },
      { href: "/uslovi-koriscenja", label: "Terms" },
    ],
    rights: "© 2026 Adspire — Niš, Serbia",
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
      hint: "Websites, Shops, Hotels, Apps, KI",
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
      hint: "KI nach Branche, Blog, FAQ",
      items: [
        { href: "/ai", label: "KI nach Branche", hint: "Was KI in Ihrer Branche leistet" },
        { href: "/blog", label: "Blog" },
        { href: "/faq", label: "FAQ" },
      ],
    },
    {
      title: "Hier starten",
      hint: "Angebot, Projekte",
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
  account: { href: "/nalog", label: "Konto" },
  feature: {
    eyebrow: "Unsicher, wo Sie anfangen?",
    title: "Beschreiben Sie Ihr Vorhaben in einem Satz.",
    text: "Ohne Konto, unverbindlich. Sie erhalten eine persönliche Antwort.",
    href: "/contact-us",
    cta: "Angebot anfordern",
  },
  footer: {
    blurb: "Studio für Web, Apps und KI-Automatisierung. Websites, die Kunden bringen, Systeme, die Zeit sparen.",
    status: "Offen für neue Projekte",
    columns: [
      {
        title: "Leistungen",
        items: [
          { href: "/our-services/web-prezentacije", label: "Websites" },
          { href: "/our-services/e-commerce-web-shop", label: "Onlineshops" },
          { href: HOTEL_PATH, label: hotelCopy.de.nav },
          { href: "/our-services/mobilne-aplikacije", label: "Apps & interne Software" },
          { href: "/our-services/ai-integracije-automatizacija", label: "KI & Automatisierung" },
          { href: "/our-services", label: "Alle Leistungen →" },
        ],
      },
      {
        title: "Unternehmen",
        items: [
          { href: "/our-projects", label: "Projekte" },
          { href: "/about-us", label: "Über uns" },
          { href: "/ai", label: "KI nach Branche" },
          { href: "/blog", label: "Blog" },
          { href: "/faq", label: "FAQ" },
        ],
      },
      {
        title: "Kontakt",
        items: [
          { href: "/contact-us", label: "Angebot anfordern", cta: "footer-upit" },
          { href: "/nalog", label: "Konto" },
        ],
      },
    ],
    legal: [
      { href: "/politika-privatnosti", label: "Datenschutz" },
      { href: "/politika-kolacica", label: "Cookies" },
      { href: "/uslovi-koriscenja", label: "AGB" },
    ],
    rights: "© 2026 Adspire — Niš, Serbien",
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
