import { localePath, type LocaleCode } from "@/lib/site-config";
import { getCallCopy } from "./callCopy";

/**
 * "Zakaži razgovor" for a header bar. A link to /razgovor that the drawer
 * intercepts; the label hides on phones and the phone icon stays.
 */
export function CallNavButtonV4({
  locale = "sr",
  className,
  cta = "nav-razgovor",
}: {
  locale?: LocaleCode;
  className?: string;
  cta?: string;
}) {
  const t = getCallCopy(locale);
  return (
    <a
      className={className}
      href={localePath("/razgovor", locale)}
      data-call=""
      data-cta={cta}
      data-cursor="on"
      aria-label={t.ctaShort}
    >
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
      </svg>
      <span data-label="">{t.ctaShort}</span>
    </a>
  );
}
