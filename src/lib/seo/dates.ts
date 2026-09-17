/**
 * Blog dates are authored as `dd.mm.yyyy` because that is how they read on the
 * page. Schema.org wants ISO 8601, and a crawler given `03.04.2026` either
 * drops the field or reads it as March 4th — so the conversion happens here
 * rather than by hand-maintaining a second date on every post.
 */
export function isoDate(input: string): string | undefined {
  const match = input.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})\.?$/);
  if (match) {
    const [, day, month, year] = match;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  // Already ISO, or something we do not recognise — publishing a guess would
  // be worse than publishing nothing.
  return /^\d{4}-\d{2}-\d{2}/.test(input) ? input : undefined;
}
