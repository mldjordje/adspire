/**
 * Where to land after a magic-link login.
 *
 * Only a page inside the account is accepted. The value rides in a URL that
 * passes through a mail, so anything else — another origin, `//evil`, a
 * protocol — falls back to /nalog instead of becoming an open redirect.
 */
export function safeNextPath(value: unknown): string {
  if (typeof value !== "string") return "/nalog";
  return /^\/nalog(\/[a-z0-9-]+)*$/.test(value) ? value : "/nalog";
}
