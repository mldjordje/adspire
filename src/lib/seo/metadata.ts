import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/seo/site";
import { defaultLocale, locales, localePath, type LocaleCode } from "@/lib/site-config";

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") {
    return base;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

const OG_LOCALE: Record<LocaleCode, string> = {
  sr: "sr_RS",
  en: "en_US",
  de: "de_DE",
};

/**
 * Paths whose page body is genuinely localized. Only the home route reads the
 * locale (HomeV4); every other page renders Serbian copy at /en/* and /de/*
 * because the V4 components hardcode it. Serving Serbian text under lang="en"
 * with an hreflang claiming English makes Google discard the hreflang and file
 * the URL as a duplicate of the Serbian original — so untranslated prefixed
 * routes stay out of both the index and the hreflang map until their component
 * consumes getSiteContent(locale). Add a path here once that is true of it.
 */
const TRANSLATED_PATHS = new Set<string>(["/"]);

export function isTranslatedPath(path: string): boolean {
  return TRANSLATED_PATHS.has(path);
}

/** hreflang map (sr/en/de + x-default → sr) for a default-locale (unprefixed) path. */
export function hreflangAlternates(basePath: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(localePath(basePath, locale));
  }
  languages["x-default"] = absoluteUrl(basePath);
  return languages;
}

type PageMetaInput = {
  /** Default-locale (unprefixed) path, e.g. "/contact-us". */
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  locale?: LocaleCode;
};

/** Osnovni SEO blok sa ispravnim canonical-om po ruti + hreflang alternativama. */
export function pageMetadata({
  path,
  title,
  description,
  keywords,
  locale = defaultLocale,
}: PageMetaInput): Metadata {
  const canonical = absoluteUrl(localePath(path, locale));
  const socialTitle = `${title} | Adspire Digital`;
  const translated = isTranslatedPath(path);
  const noindex = !translated && locale !== defaultLocale;
  return {
    title,
    description,
    keywords,
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    alternates: {
      canonical,
      ...(translated ? { languages: hreflangAlternates(path) } : {}),
    },
    openGraph: {
      url: canonical,
      title: socialTitle,
      description,
      locale: OG_LOCALE[locale],
    },
    twitter: {
      title: socialTitle,
      description,
    },
  };
}
