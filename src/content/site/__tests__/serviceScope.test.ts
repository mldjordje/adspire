import { describe, expect, it } from "vitest";

import { serviceSlugs } from "@/data/serviceCatalog";
import { locales } from "@/lib/site-config";
import { SERVICE_SCOPE_BY_LOCALE, getServiceScope } from "../serviceScope";

/**
 * These two blocks are the only part of a service page written to be quoted
 * back by an answer engine, so they earn their place only while each line is
 * specific to its own service. A sentence repeated across pages is duplicate
 * text on seventeen URLs, which costs more than the block gains.
 *
 * /en and /de render them too, and those subtrees are indexed whole, so a
 * missing translation would publish Serbian text under lang="en".
 */

describe("service scope blocks", () => {
  it.each(locales)("covers every catalogue service in %s", (locale) => {
    const missing = serviceSlugs.filter((slug) => !getServiceScope(slug, locale));
    expect(missing).toEqual([]);
  });

  it.each(locales)("has no block for a slug the catalogue dropped (%s)", (locale) => {
    const orphans = Object.keys(SERVICE_SCOPE_BY_LOCALE[locale]).filter(
      (slug) => !serviceSlugs.includes(slug),
    );
    expect(orphans).toEqual([]);
  });

  it.each(locales)("says at least two things in each block (%s)", (locale) => {
    for (const slug of serviceSlugs) {
      const scope = getServiceScope(slug, locale)!;
      expect(scope.notFor.length, slug).toBeGreaterThanOrEqual(2);
      expect(scope.beforeQuote.length, slug).toBeGreaterThanOrEqual(3);
    }
  });

  it.each(locales)("keeps every locale answering the same points (%s)", (locale) => {
    for (const slug of serviceSlugs) {
      const sr = getServiceScope(slug, "sr")!;
      const other = getServiceScope(slug, locale)!;
      expect(other.notFor.length, `${slug} notFor`).toBe(sr.notFor.length);
      expect(other.beforeQuote.length, `${slug} beforeQuote`).toBe(sr.beforeQuote.length);
    }
  });

  it.each(locales)("writes whole sentences, not labels (%s)", (locale) => {
    for (const slug of serviceSlugs) {
      const scope = getServiceScope(slug, locale)!;
      for (const line of [...scope.notFor, ...scope.beforeQuote]) {
        expect(line.length, `${slug}: ${line}`).toBeGreaterThan(30);
        expect(line.trim().endsWith("."), `${slug}: ${line}`).toBe(true);
      }
    }
  });

  it.each(locales)("never repeats a line across services (%s)", (locale) => {
    const seen = new Map<string, string>();
    for (const slug of serviceSlugs) {
      const scope = getServiceScope(slug, locale)!;
      for (const line of [...scope.notFor, ...scope.beforeQuote]) {
        const previous = seen.get(line);
        expect(previous, `"${line}" appears on both ${previous} and ${slug}`).toBeUndefined();
        seen.set(line, slug);
      }
    }
  });

  it.each(locales.filter((l) => l !== "sr"))(
    "is actually translated, not the Serbian text copied over (%s)",
    (locale) => {
      for (const slug of serviceSlugs) {
        const sr = getServiceScope(slug, "sr")!;
        const other = getServiceScope(slug, locale)!;
        other.notFor.forEach((line, i) => expect(line, slug).not.toBe(sr.notFor[i]));
        other.beforeQuote.forEach((line, i) => expect(line, slug).not.toBe(sr.beforeQuote[i]));
      }
    },
  );

  // The humanizer skill bans the em dash used as a dramatic pause. It is the
  // loudest machine-written tell in this kind of copy, in every language.
  it.each(locales)("uses no em-dash pause (%s)", (locale) => {
    for (const slug of serviceSlugs) {
      const scope = getServiceScope(slug, locale)!;
      for (const line of [...scope.notFor, ...scope.beforeQuote]) {
        expect(line.includes(" — "), `${slug}: ${line}`).toBe(false);
      }
    }
  });
});
