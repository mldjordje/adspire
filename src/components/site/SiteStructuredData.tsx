"use client";

import { usePathname } from "next/navigation";
import toJsonLdList from "@/lib/structuredData";
import { stripLocalePrefix } from "@/lib/locale";
import { defaultLocale, type LocaleCode } from "@/lib/site-config";

type SiteStructuredDataProps = {
  locale: LocaleCode;
};

export function SiteStructuredData({ locale }: SiteStructuredDataProps) {
  const pathname = usePathname() || "/";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adspire.rs";
  const canonicalPath =
    locale === defaultLocale ? stripLocalePrefix(pathname) : pathname;
  const canonicalUrl =
    canonicalPath === "/" ? siteUrl : `${siteUrl}${canonicalPath}`;
  const entries = toJsonLdList({
    siteUrl,
    canonicalUrl,
    locale,
  });

  return (
    <>
      {entries.map((entry, index) => (
        <script
          key={`${locale}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
