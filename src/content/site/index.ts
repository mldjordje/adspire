import { enContent } from "@/content/site/en";
import { srContent } from "@/content/site/sr";
import type { LocalizedPageContent } from "@/content/site/types";
import { defaultLocale, type LocaleCode } from "@/lib/site-config";

const contentByLocale: Record<LocaleCode, LocalizedPageContent> = {
  sr: srContent,
  en: enContent,
};

export function getSiteContent(locale: LocaleCode): LocalizedPageContent {
  return contentByLocale[locale] ?? contentByLocale[defaultLocale];
}
