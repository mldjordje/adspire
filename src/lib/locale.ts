import { defaultLocale, locales, type LocaleCode } from "@/lib/site-config";

export function isLocale(value: string): value is LocaleCode {
  return (locales as readonly string[]).includes(value);
}

export function normalizeLocale(value?: string): LocaleCode {
  if (value && isLocale(value)) {
    return value;
  }

  return defaultLocale;
}

export function withLocalePrefix(locale: LocaleCode, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) {
    return normalized;
  }

  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function stripLocalePrefix(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) {
      return "/";
    }

    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }

  return pathname;
}
