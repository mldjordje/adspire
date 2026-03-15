import type { LocaleCode } from "@/lib/site-config";

type InfoArticleSectionProps = {
  locale: LocaleCode;
  title: string;
  subtitle: string;
  bodyTitle: string;
  body: string;
  bullets: string[];
  actionLabel?: string;
  actionHref?: string;
};

export function InfoArticleSection({
  locale,
  title,
  subtitle,
  bodyTitle,
  body,
  bullets,
  actionLabel,
  actionHref,
}: InfoArticleSectionProps) {
  return (
    <section className="mxd-section">
      <div className="mxd-section-head">
        <p className="mxd-kicker">{locale === "en" ? "Overview" : "Pregled"}</p>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <article className="mxd-card mxd-prose-card">
        <h3>{bodyTitle}</h3>
        <p>{body}</p>
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        {actionLabel && actionHref ? (
          <a href={actionHref} target="_blank" rel="noreferrer" className="mxd-pill-btn">
            {actionLabel}
          </a>
        ) : null}
      </article>
    </section>
  );
}
