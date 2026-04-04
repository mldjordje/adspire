import Link from "next/link";
import { getSiteContent } from "@/content/site";
import { defaultLocale } from "@/lib/site-config";
import {
  CtaSection,
  FaqList,
  MetricsStrip,
  ProjectsGrid,
  SectionHeading,
  ServicesGrid,
  TestimonialCards,
} from "@/components/site/SiteSections";

const content = getSiteContent(defaultLocale);

export function AzurioHomePage() {
  const heroGallery = content.home.heroStack.intro.gallery.slice(0, 3);

  return (
    <>
      <section className="home-hero">
        <div className="shell home-hero__grid">
          <div className="home-hero__copy">
            <p className="eyebrow">{content.home.heroStack.intro.eyebrow}</p>
            <h1>{content.home.heroStack.intro.title}</h1>
            <p className="home-hero__lede">{content.home.heroStack.intro.description}</p>

            <div className="button-row">
              <Link href={content.home.heroStack.intro.primary.href} className="button button--primary">
                {content.home.heroStack.intro.primary.label}
              </Link>
              <Link href={content.home.heroStack.intro.secondary.href} className="button button--ghost">
                {content.home.heroStack.intro.secondary.label}
              </Link>
            </div>

            <ul className="tag-list tag-list--hero">
              {content.home.heroStack.intro.badges.map((badge) => (
                <li key={badge}>{badge}</li>
              ))}
            </ul>
          </div>

          <div className="home-hero__visual">
            <div className="home-hero__visual-card home-hero__visual-card--large">
              <img src={heroGallery[0].image} alt={heroGallery[0].alt} />
            </div>
            <div className="home-hero__visual-row">
              {heroGallery.slice(1).map((item) => (
                <div key={item.image} className="home-hero__visual-card">
                  <img src={item.image} alt={item.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={content.home.heroStack.capability.eyebrow}
            title={content.home.heroStack.capability.title}
            description={content.home.heroStack.capability.description}
            action={content.home.heroStack.capability.primary}
          />
          <MetricsStrip items={content.home.heroStack.capability.stats} />
          <ul className="tag-list tag-list--wide">
            {content.home.heroStack.capability.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--muted">
        <div className="shell">
          <SectionHeading
            eyebrow={content.home.servicesSection.eyebrow}
            title={content.home.servicesSection.title}
            description={content.home.servicesSection.description}
            action={{ label: "Sve usluge", href: "/our-services" }}
          />
          <ServicesGrid items={content.home.servicesSection.items} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={content.home.projectsSection.eyebrow}
            title={content.home.projectsSection.title}
            description={content.home.projectsSection.description}
            action={{ label: "Svi projekti", href: "/our-projects" }}
          />
          <ProjectsGrid items={content.home.projectsSection.items} />
        </div>
      </section>

      <section className="section section--muted">
        <div className="shell">
          <SectionHeading
            eyebrow={content.home.testimonialsSection.eyebrow}
            title={content.home.testimonialsSection.title}
            description={content.home.testimonialsSection.description}
          />
          <TestimonialCards items={content.home.testimonialsSection.items} />
        </div>
      </section>

      <section className="section">
        <div className="shell section-split">
          <div>
            <SectionHeading
              eyebrow={content.home.faqSection.eyebrow}
              title={content.home.faqSection.title}
              description={content.home.faqSection.description}
              action={{ label: "Idi na FAQ", href: "/faq" }}
            />
          </div>
          <FaqList items={content.home.faqSection.items} />
        </div>
      </section>

      <CtaSection cta={content.home.ctaSection} />
    </>
  );
}
