export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  href: string;
  cta: string;
};

export type PortfolioItem = {
  name: string;
  category: string;
  image: string;
  url: string;
};

export type CtaBlock = {
  kicker: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type LocalizedPageContent = {
  localeLabel: string;
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    contact: string;
    blog: string;
    faq: string;
    portfolio: string;
  };
  hero: {
    line1: string;
    line2: string;
    body: string;
  };
  digitalHero: {
    title: string;
    body: string;
    bullets: string[];
  };
  freelancerHero: {
    title: string;
    body: string;
    tags: string[];
  };
  designerHero: {
    title: string;
    status: string;
    body: string;
  };
  services: {
    pageTitle: string;
    pageSubtitle: string;
    items: ServiceItem[];
  };
  portfolio: {
    pageTitle: string;
    pageSubtitle: string;
    items: PortfolioItem[];
  };
  cta: CtaBlock;
  testimonials: {
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    address: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
      subjectOptions: {
        project: string;
        service: string;
        budget: string;
        support: string;
      };
      success: string;
      error: string;
      sending: string;
    };
  };
  article: {
    title: string;
    subtitle: string;
    bodyTitle: string;
    body: string;
    principles: string[];
  };
  team: {
    title: string;
    subtitle: string;
    leadName: string;
    leadRole: string;
    leadBio: string;
    bullets: string[];
  };
  project: {
    title: string;
    subtitle: string;
    bodyTitle: string;
    body: string;
    bullets: string[];
    liveLabel: string;
  };
  footer: {
    tagline: string;
    cta: string;
    copyright: string;
  };
};
