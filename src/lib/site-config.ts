export const locales = ["sr", "en", "de"] as const;

export type LocaleCode = (typeof locales)[number];

export const defaultLocale: LocaleCode = "sr";

/** Non-default locales get a URL prefix (sr is canonical at the root). */
export const prefixedLocales: LocaleCode[] = locales.filter((l) => l !== defaultLocale);

export function isLocale(value: string): value is LocaleCode {
  return (locales as readonly string[]).includes(value);
}

/**
 * Prefixes an internal href with the locale segment for non-default locales.
 * External links (http, mailto, tel, #) and the default locale are untouched.
 */
export function localePath(href: string, locale: LocaleCode): string {
  if (locale === defaultLocale) return href;
  if (!href.startsWith("/")) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

/** Splits a pathname into its locale (if any) and the remaining default-locale path. */
export function splitLocaleFromPath(pathname: string): {
  locale: LocaleCode;
  basePath: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0]) && segments[0] !== defaultLocale) {
    const rest = "/" + segments.slice(1).join("/");
    return { locale: segments[0], basePath: rest === "/" ? "/" : rest.replace(/\/$/, "") };
  }
  return { locale: defaultLocale, basePath: pathname === "" ? "/" : pathname };
}
