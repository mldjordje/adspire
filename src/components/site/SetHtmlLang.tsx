"use client";

import { useEffect } from "react";

/**
 * Sets <html lang> after hydration for prefixed locales. Done in an effect
 * (not an inline pre-hydration script) so it doesn't cause a hydration
 * mismatch against the root layout's server-rendered lang="sr".
 */
export function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
