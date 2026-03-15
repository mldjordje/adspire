"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, locales, type LocaleCode } from "@/lib/site-config";
import { stripLocalePrefix, withLocalePrefix } from "@/lib/locale";

export function LocaleSwitcher({ locale }: { locale: LocaleCode }) {
  const pathname = usePathname() || "/";
  const withoutLocale = stripLocalePrefix(pathname);

  return (
    <div className="mxd-locale-switcher" role="group" aria-label="Language switcher">
      {locales.map((nextLocale) => {
        const href = withLocalePrefix(nextLocale, withoutLocale);
        const isActive = nextLocale === locale;

        return (
          <Link
            key={nextLocale}
            href={href}
            locale={false}
            className={`mxd-round-btn ${isActive ? "is-active" : ""}`}
          >
            {nextLocale === defaultLocale ? "SR" : "EN"}
          </Link>
        );
      })}
    </div>
  );
}
