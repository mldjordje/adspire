import type { Metadata } from "next";
import { withLocalePrefix } from "@/lib/locale";
import { locales, type LocaleCode } from "@/lib/site-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs";

function absoluteUrl(path: string): string {
  if (path === "/") {
    return siteUrl;
  }

  return `${siteUrl}${path}`;
}

export function buildPageMetadata(
  locale: LocaleCode,
  path: string,
  title: string,
  description: string
): Metadata {
  const canonicalPath = withLocalePrefix(locale, path);
  const languages = Object.fromEntries(
    [
      ...locales.map((lang) => [lang, absoluteUrl(withLocalePrefix(lang, path))]),
      ["x-default", absoluteUrl(path)],
    ]
  );

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonicalPath),
      siteName: "Adspire",
      type: "website",
      images: [
        {
          url: "/images/banner/banner-one-thumb.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/banner/banner-one-thumb.png"],
    },
  };
}
