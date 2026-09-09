import { deContent } from "@/content/site/de";
import { enContent } from "@/content/site/en";
import { srContent } from "@/content/site/sr";
import type { LocalizedPageContent } from "@/content/site/types";
import { defaultLocale, type LocaleCode } from "@/lib/site-config";
import { hotelService } from "./hotel";

const contentByLocale: Record<LocaleCode, LocalizedPageContent> = {
  sr: srContent,
  en: enContent,
  de: deContent,
};

export function getSiteContent(locale: LocaleCode): LocalizedPageContent {
  const content = contentByLocale[locale] ?? contentByLocale[defaultLocale];
  return { ...content, servicesPage: { ...content.servicesPage, items: [...content.servicesPage.items, hotelService(locale)] } };
}
