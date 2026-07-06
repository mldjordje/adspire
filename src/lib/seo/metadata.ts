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
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: hreflangAlternates(path),
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
