type UnknownRecord = Record<string, unknown>;

const clean = (value: unknown, lower = false) => {
  if (typeof value !== "string" || value.trim() === "") return null;
  const result = value.trim().slice(0, 500);
  return lower ? result.toLowerCase() : result;
};

/**
 * Keeps only the attribution fields we store, so a hostile client cannot push
 * arbitrary keys into the lead payload.
 */
export function normalizeAttribution(input: UnknownRecord) {
  return {
    landingPage: clean(input.landingPage) ?? "/",
    referrer: clean(input.referrer),
    utmSource: clean(input.utmSource, true),
    utmMedium: clean(input.utmMedium, true),
    utmCampaign: clean(input.utmCampaign, true),
    utmContent: clean(input.utmContent, true),
    utmTerm: clean(input.utmTerm, true),
  };
}

export type NormalizedAttribution = ReturnType<typeof normalizeAttribution>;
