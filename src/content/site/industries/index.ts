/**
 * The industry page registry.
 *
 * One file per industry, listed here. Everything downstream — routes, the hub,
 * the sitemap, llms.txt and the organization's solution catalog — reads this
 * array, so adding a trade means adding a file and one line here and running
 * `npm run gen:industries`.
 */

import type { IndustryPage } from "./types";
import { stomatoloskeOrdinacije } from "./stomatoloske-ordinacije";
import { frizerskiSaloni } from "./frizerski-saloni";
import { autoServisi } from "./auto-servisi";
import { transportIPrevoz } from "./transport-i-prevoz";
import { proizvodnjaGradjevinskogMaterijala } from "./proizvodnja-gradjevinskog-materijala";
import { kurseviIObuke } from "./kursevi-i-obuke";
import { kreativniStudiji } from "./kreativni-studiji";
import { veterinarskeOrdinacije } from "./veterinarske-ordinacije";
import { advokatskeKancelarije } from "./advokatske-kancelarije";
import { knjigovodstveneAgencije } from "./knjigovodstvene-agencije";
import { agencijeZaNekretnine } from "./agencije-za-nekretnine";
import { rentACar } from "./rent-a-car";
import { restoraniIKafici } from "./restorani-i-kafici";

export * from "./types";

export const industryPages: IndustryPage[] = [
  stomatoloskeOrdinacije,
  frizerskiSaloni,
  autoServisi,
  transportIPrevoz,
  proizvodnjaGradjevinskogMaterijala,
  kurseviIObuke,
  kreativniStudiji,
  veterinarskeOrdinacije,
  advokatskeKancelarije,
  knjigovodstveneAgencije,
  agencijeZaNekretnine,
  rentACar,
  restoraniIKafici,
];

export function getIndustryPage(slug: string) {
  return industryPages.find((page) => page.slug === slug);
}

/** Pages grouped for the hub, in the fixed sector order, empty sectors dropped. */
export function industryPagesBySector() {
  const bySector = new Map<string, IndustryPage[]>();
  for (const page of industryPages) {
    const list = bySector.get(page.sector) ?? [];
    list.push(page);
    bySector.set(page.sector, list);
  }
  return bySector;
}
