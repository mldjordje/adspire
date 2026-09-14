/**
 * Edukacija hour packages — the one public price list on the site.
 *
 * Đorđe approved these as public on 2026-09-14; everything else still gets its
 * price in the offer. Hours are still credited from /os after payment.
 */

export type EduPackage = {
  id: string;
  hours: number;
  priceEur: number;
  label: string;
  note: string;
  featured?: boolean;
};

export const EDU_PACKAGES: EduPackage[] = [
  {
    id: "8h",
    hours: 8,
    priceEur: 500,
    label: "Start",
    note: "Za jedan pravac: AI asistenti, automatizacija ili sajt uz AI.",
  },
  {
    id: "18h",
    hours: 18,
    priceEur: 1000,
    label: "Dubinski",
    note: "Za kombinovanje pravaca ili tim — najniža cena po satu.",
    featured: true,
  },
];

export const pricePerHour = (p: EduPackage) => Math.round((p.priceEur / p.hours) * 10) / 10;

export const formatEur = (value: number) =>
  `${value.toLocaleString("sr-RS", { maximumFractionDigits: 1 })} €`;

/** Pre-selects edukacija on the quick brief. Which package was clicked is
 *  measured through `data-cta`, not the URL. */
export const PACKAGE_INQUIRY_HREF = "/upit/brzo?usluga=edukacija";
