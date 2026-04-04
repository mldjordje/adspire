export const locales = ["sr", "en"] as const;

export type LocaleCode = (typeof locales)[number];

export const defaultLocale: LocaleCode = "sr";
