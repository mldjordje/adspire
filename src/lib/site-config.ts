export const locales = ["sr", "en"] as const;

export type LocaleCode = (typeof locales)[number];
export type ThemeName = "dark" | "light";
export type HeroVariant = "main" | "digital-agency" | "freelancer-portfolio" | "designer";

export type LandingCompositionConfig = {
  heroOrder: HeroVariant[];
  sectionOrder: ["cta", "services", "portfolio", "cta"];
  heroVideoByTheme: Record<ThemeName, string>;
};

export const defaultLocale: LocaleCode = "sr";

export const landingCompositionConfig: LandingCompositionConfig = {
  heroOrder: ["main", "digital-agency", "freelancer-portfolio", "designer"],
  sectionOrder: ["cta", "services", "portfolio", "cta"],
  heroVideoByTheme: {
    dark: "/hero-video.mp4",
    light: "/hero-video-bg.mp4",
  },
};

export const THEME_STORAGE_KEY = "adspire-theme";
