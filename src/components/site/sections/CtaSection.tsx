import Link from "next/link";
import type { CtaBlock } from "@/content/site/types";
import type { LocaleCode } from "@/lib/site-config";
import { withLocalePrefix } from "@/lib/locale";

type CtaSectionProps = {
  locale: LocaleCode;
  cta: CtaBlock;
};

export function CtaSection({ locale, cta }: CtaSectionProps) {
  return (
    <section className="mxd-section mxd-cta-section">
      <div className="mxd-cta-card">
        <p className="mxd-kicker">{cta.kicker}</p>
        <h2>{cta.title}</h2>
        <p>{cta.body}</p>
        <div className="mxd-btn-row">
          <Link href={withLocalePrefix(locale, cta.primaryHref)} locale={false} className="mxd-pill-btn">
            {cta.primaryLabel}
          </Link>
          <Link href={withLocalePrefix(locale, cta.secondaryHref)} locale={false} className="mxd-ghost-btn">
            {cta.secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
