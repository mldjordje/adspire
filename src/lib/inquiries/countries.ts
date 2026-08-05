/**
 * The country list on the brief.
 *
 * It decides which invoice template a buyer gets if they accept — domestic or
 * the English one with IBAN/SWIFT — so it is asked of individuals too. Short on
 * purpose: the markets the site actually sells into, then "Ostalo" rather than
 * an ISO list nobody scrolls.
 */
export const COUNTRIES = [
  "Srbija",
  "Nemačka",
  "Austrija",
  "Švajcarska",
  "Crna Gora",
  "Bosna i Hercegovina",
  "Hrvatska",
  "Severna Makedonija",
  "Slovenija",
  "Italija",
  "Francuska",
  "Holandija",
  "Velika Britanija",
  "Sjedinjene Američke Države",
  "Ostalo",
] as const;

export const DEFAULT_COUNTRY = "Srbija";
