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
    note: "Za jednu celinu: ideja i hook, generisanje scena ili montaža i objava.",
  },
  {
    id: "18h",
    hours: 18,
    priceEur: 1000,
    label: "Dubinski",
    note: "Za ceo tok od ideje do objave, ili za tim — najniža cena po satu.",
    featured: true,
  },
];

export const pricePerHour = (p: EduPackage) => Math.round((p.priceEur / p.hours) * 10) / 10;

export const formatEur = (value: number) =>
  `${value.toLocaleString("sr-RS", { maximumFractionDigits: 1 })} €`;

export const ORDER_PATH = "/edukacija/porudzbina";

export function findPackage(id: string | undefined | null): EduPackage | null {
  return EDU_PACKAGES.find((p) => p.id === id) ?? null;
}

/** Where a package button goes: straight into the order, not into the brief.
 *  Edukacija is a product with a fixed price — it does not need a quote. */
export const packageOrderHref = (pkg: EduPackage) => `${ORDER_PATH}?paket=${pkg.id}`;

/** For someone who has not picked yet — the order page then shows both. */
export const ORDER_HREF = ORDER_PATH;

/** The one route still worth a conversation first: a team, a custom plan. */
export const EDUCATION_INQUIRY_HREF = "/upit/brzo?usluga=edukacija";
