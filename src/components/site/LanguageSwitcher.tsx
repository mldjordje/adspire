"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  locales,
  localePath,
  splitLocaleFromPath,
  type LocaleCode,
} from "@/lib/site-config";

const LABELS: Record<LocaleCode, string> = { sr: "SR", en: "EN", de: "DE" };

type LanguageSwitcherProps = {
  current: LocaleCode;
};

/**
 * Renders SR / EN / DE links that keep the visitor on the equivalent path
 * under the chosen locale prefix.
 */
export function LanguageSwitcher({ current }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const { basePath } = splitLocaleFromPath(pathname);

  return (
    <div className="adspire-lang" role="group" aria-label="Language">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={localePath(basePath, locale)}
          className={`adspire-lang__item${locale === current ? " is-active" : ""}`}
          hrefLang={locale}
          aria-current={locale === current ? "true" : undefined}
        >
          {LABELS[locale]}
        </Link>
      ))}
    </div>
  );
}
