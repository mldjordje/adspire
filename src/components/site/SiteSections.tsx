import Link from "next/link";
import type {
  ActionLink,
  BlogPost,
  ContactFormLabels,
  CtaBlock,
  FaqItem,
  MetricItem,
  PageHero,
  ProjectItem,
  ServiceItem,
  TestimonialItem,
} from "@/content/site/types";
import { AzurioContactForm } from "@/components/site/AzurioContactForm";

type HeroMedia =
  | {
      image?: string;
      video?: string;
    }
  | undefined;

type PageHeroProps = {
  current: string;
  hero: PageHero;
  media?: HeroMedia;
};

function ActionButton({ action, secondary = false }: { action: ActionLink; secondary?: boolean }) {
  return (
    <Link href={action.href} className={`button ${secondary ? "button--ghost" : "button--primary"}`}>
      {action.label}
    </Link>
  );
}

export function PageHeroSection({ current, hero, media }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="shell page-hero__grid">
        <div className="page-hero__copy">
          <p className="eyebrow">
            {current} / {hero.eyebrow}
          </p>
          <h1>{hero.title}</h1>
          <p className="page-hero__lede">{hero.description}</p>
          {(hero.primary || hero.secondary) && (
            <div className="button-row">
              {hero.primary ? <ActionButton action={hero.primary} /> : null}
              {hero.secondary ? <ActionButton action={hero.secondary} secondary /> : null}
            </div>
          )}
        </div>

        <div className="page-hero__media">
          {media?.video ? (
            <video autoPlay muted loop playsInline preload="auto" poster={media.image}>
              <source src={media.video} type="video/mp4" />
            </video>
          ) : media?.image ? (
            <img src={media.image} alt={hero.title} />
          ) : (
            <div className="page-hero__placeholder">
              <span>{hero.eyebrow}</span>
              <strong>{hero.title}</strong>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ActionLink;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>

      <div className="section-heading__side">
        {description ? <p>{description}</p> : null}
        {action ? <ActionButton action={action} secondary /> : null}
      </div>
    </div>
  );
}

export function MetricsStrip({ items }: { items: MetricItem[] }) {
  return (
    <div className="metric-grid">
      {items.map((item) => (
        <article key={item.label} className="metric-card">
          <strong>{item.value}</strong>
          <p>{item.label}</p>
        </article>
      ))}
    </div>
  );
}

export function ServicesGrid({ items }: { items: ServiceItem[] }) {
  return (
    <div className="card-grid card-grid--services">
      {items.map((service, index) => (
        <article key={service.slug} className="service-card">
          <div className="service-card__head">
            <span className="service-card__index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{service.title}</h3>
          </div>
          <p className="service-card__summary">{service.summary}</p>
          <ul className="tag-list">
            {service.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <Link href={service.href} className="inline-link">
            {service.cta}
          </Link>
        </article>
      ))}
    </div>
  );
}

export function ProjectsGrid({ items }: { items: ProjectItem[] }) {
  return (
    <div className="project-grid">
      {items.map((project) => (
        <article key={project.name} className="project-card">
          <div className="project-card__image">
            <img src={project.image} alt={project.name} />
          </div>
          <div className="project-card__body">
            <div className="project-card__meta">
              <span>{project.category}</span>
              <a href={project.url} target="_blank" rel="noreferrer">
                Live site
              </a>
            </div>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <p className="project-card__outcome">{project.outcome}</p>
            <Link href="/project-single" className="inline-link">
              Pogledaj detalj
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function TestimonialCards({ items }: { items: TestimonialItem[] }) {
  return (
    <div className="testimonial-grid">
      {items.map((item) => (
        <article key={`${item.name}-${item.company ?? item.role}`} className="testimonial-card">
          <p className="testimonial-card__quote">"{item.quote}"</p>
          <strong>{item.name}</strong>
          <span>
            {item.role}
            {item.company ? `, ${item.company}` : ""}
          </span>
        </article>
      ))}
    </div>
  );
}

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details key={item.q} className="faq-item" open={index === 0}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function BlogGrid({ posts, featured }: { posts: BlogPost[]; featured?: BlogPost }) {
  return (
    <div className="article-grid">
      {featured ? (
        <article className="article-card article-card--featured">
          <div className="article-card__image">
            <img src={featured.image} alt={featured.title} />
          </div>
          <div className="article-card__body">
            <p className="eyebrow">
              {featured.category} / {featured.date}
            </p>
            <h3>{featured.title}</h3>
            <p>{featured.excerpt}</p>
            <Link href={featured.href} className="inline-link">
              Procitaj tekst
            </Link>
          </div>
        </article>
      ) : null}

      <div className="article-stack">
        {posts.map((post) => (
          <article key={post.slug} className="article-card">
            <div className="article-card__body">
              <p className="eyebrow">
                {post.category} / {post.date}
              </p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link href={post.href} className="inline-link">
                Procitaj tekst
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function CtaSection({ cta }: { cta: CtaBlock }) {
  return (
    <section className="cta-section">
      <div className="shell cta-section__card">
        <div>
          <p className="eyebrow">{cta.kicker}</p>
          <h2>{cta.title}</h2>
          <p>{cta.body}</p>
        </div>
        <div className="button-row">
          <ActionButton action={cta.primary} />
          {cta.secondary ? <ActionButton action={cta.secondary} secondary /> : null}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({
  labels,
  intro,
  address,
  phone,
  email,
  officeHours,
}: {
  labels: ContactFormLabels;
  intro: string;
  address: string;
  phone: string;
  email: string;
  officeHours: string[];
}) {
  return (
    <section className="section">
      <div className="shell contact-layout">
        <div className="contact-panel">
          <p className="eyebrow">Kontakt</p>
          <h2>Posalji poruku sa kontekstom projekta</h2>
          <p>{intro}</p>

          <div className="contact-panel__stack">
            <a href={`mailto:${email}`} className="contact-chip">
              {email}
            </a>
            <a href="https://maps.google.com/?q=Dimitrija+Leka+66+Nis" target="_blank" rel="noreferrer" className="contact-chip">
              {address}
            </a>
            <a href="tel:+381601491491" className="contact-chip">
              {phone}
            </a>
          </div>

          <div className="info-card">
            <strong>Radno vreme</strong>
            {officeHours.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <AzurioContactForm labels={labels} />
      </div>
    </section>
  );
}
