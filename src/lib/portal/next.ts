/**
 * Where to land after a magic-link or Google login.
 *
 * Only a page inside the account, plus the one page outside it that needs a
 * signed-in buyer: the edukacija order. The value rides in a URL that passes
 * through a mail, so anything else — another origin, `//evil`, a protocol —
 * falls back to /nalog instead of becoming an open redirect.
 *
 * The order page is allowed to carry `?paket=<id>`, so a buyer who signs in
 * from a package button comes back to that package and not to a blank choice.
 */
const ACCOUNT = /^\/nalog(\/[a-z0-9-]+)*$/;
const ORDER = /^\/edukacija\/porudzbina(\?paket=[a-z0-9]{1,12})?$/;

export function safeNextPath(value: unknown): string {
  if (typeof value !== "string") return "/nalog";
  return ACCOUNT.test(value) || ORDER.test(value) ? value : "/nalog";
}
