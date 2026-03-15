import { CtaSection } from "@/components/site/sections/CtaSection";
import { HeroDigitalAgencySection } from "@/components/site/sections/HeroDigitalAgencySection";
import { HeroDesignerSection } from "@/components/site/sections/HeroDesignerSection";
import { HeroFreelancerSection } from "@/components/site/sections/HeroFreelancerSection";
import { HeroMainSection } from "@/components/site/sections/HeroMainSection";
import { PortfolioSection } from "@/components/site/sections/PortfolioSection";
import { ServicesSection } from "@/components/site/sections/ServicesSection";
import type { LocalizedPageContent } from "@/content/site/types";
import type { LocaleCode } from "@/lib/site-config";

type LandingPageProps = {
  locale: LocaleCode;
  content: LocalizedPageContent;
};

export function LandingPage({ locale, content }: LandingPageProps) {
  const featuredServices = content.services.items.slice(0, 4);
  const featuredProjects = content.portfolio.items.slice(0, 5);

  return (
    <div className="rayo-landing-dark">
      <HeroMainSection
        locale={locale}
        line1={content.hero.line1}
        line2={content.hero.line2}
        body={content.hero.body}
      />

      <HeroDigitalAgencySection
        locale={locale}
        title={content.digitalHero.title}
        body={content.digitalHero.body}
        bullets={content.digitalHero.bullets}
      />

      <HeroFreelancerSection
        locale={locale}
        title={content.freelancerHero.title}
        body={content.freelancerHero.body}
        tags={content.freelancerHero.tags}
      />

      <HeroDesignerSection
        locale={locale}
        title={content.designerHero.title}
        status={content.designerHero.status}
        body={content.designerHero.body}
      />

      <CtaSection locale={locale} cta={content.cta} />

      <ServicesSection
        locale={locale}
        title={content.services.pageTitle}
        subtitle={content.services.pageSubtitle}
        items={featuredServices}
      />

      <PortfolioSection
        locale={locale}
        title={content.portfolio.pageTitle}
        subtitle={content.portfolio.pageSubtitle}
        items={featuredProjects}
      />

      <CtaSection locale={locale} cta={content.cta} />
    </div>
  );
}
