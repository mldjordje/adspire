export type ActionLink = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type MetricItem = {
  value: string;
  label: string;
};

export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  href: string;
  cta: string;
};

export type ProjectItem = {
  name: string;
  category: string;
  image: string;
  url: string;
  summary: string;
  outcome: string;
};

export type TestimonialItem = {
  name: string;
  role: string;
  company?: string;
  quote: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type CtaBlock = {
  kicker: string;
  title: string;
  body: string;
  primary: ActionLink;
  secondary?: ActionLink;
};

export type PageHero = {
  eyebrow: string;
  title: string;
  description: string;
  primary?: ActionLink;
  secondary?: ActionLink;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  href: string;
};

export type ArticleSection = {
  title: string;
  paragraphs: string[];
};

export type ContactFormLabels = {
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

export type LocalizedPageContent = {
  localeLabel: string;
  siteTitle: string;
  siteDescription: string;
  nav: NavItem[];
  headerCta: ActionLink;
  home: {
    heroStack: {
      intro: {
        eyebrow: string;
        title: string;
        description: string;
        badges: string[];
        primary: ActionLink;
        secondary: ActionLink;
        gallery: Array<{
          image: string;
          alt: string;
          href: string;
        }>;
      };
      capability: {
        eyebrow: string;
        title: string;
        description: string;
        tags: string[];
        stats: MetricItem[];
        primary: ActionLink;
        secondary: ActionLink;
        video: string;
        poster: string;
      };
      showcase: {
        eyebrow: string;
        title: string;
        description: string;
        primary: ActionLink;
        secondary: ActionLink;
        slides: Array<{
          title: string;
          description: string;
          image: string;
          href: string;
        }>;
      };
    };
    servicesSection: {
      eyebrow: string;
      title: string;
      description: string;
      items: ServiceItem[];
    };
    projectsSection: {
      eyebrow: string;
      title: string;
      description: string;
      items: ProjectItem[];
    };
    testimonialsSection: {
      eyebrow: string;
      title: string;
      description: string;
      items: TestimonialItem[];
    };
    faqSection: {
      eyebrow: string;
      title: string;
      description: string;
      items: FaqItem[];
    };
    ctaSection: CtaBlock;
  };
  aboutPage: {
    hero: PageHero;
    manifesto: string;
    storyTitle: string;
    storyParagraphs: string[];
    metrics: MetricItem[];
    team: {
      title: string;
      subtitle: string;
      leadName: string;
      leadRole: string;
      leadBio: string;
      bullets: string[];
    };
    cta: CtaBlock;
  };
  servicesPage: {
    hero: PageHero;
    introTitle: string;
    introBody: string;
    process: string[];
    items: ServiceItem[];
    cta: CtaBlock;
  };
  projectsPage: {
    hero: PageHero;
    introTitle: string;
    introBody: string;
    items: ProjectItem[];
    cta: CtaBlock;
  };
  projectPage: {
    hero: PageHero;
    client: string;
    website: string;
    overview: string;
    challenge: string;
    solution: string;
    outcomes: string[];
    services: string[];
    metrics: MetricItem[];
    testimonial: TestimonialItem;
    gallery: string[];
    liveLabel: string;
  };
  contactPage: {
    hero: PageHero;
    introTitle: string;
    introBody: string;
    phone: string;
    email: string;
    address: string;
    officeHours: string[];
    form: ContactFormLabels;
  };
  faqPage: {
    hero: PageHero;
    introTitle: string;
    introBody: string;
    items: FaqItem[];
    cta: CtaBlock;
  };
  blogPage: {
    hero: PageHero;
    featured: BlogPost;
    posts: BlogPost[];
    cta: CtaBlock;
  };
  articlePage: {
    hero: PageHero;
    post: BlogPost;
    intro: string;
    sections: ArticleSection[];
    principles: string[];
    cta: CtaBlock;
  };
  footer: {
    tagline: string;
    cta: ActionLink;
    copyright: string;
    contactItems: Array<{
      label: string;
      value: string;
      href?: string;
    }>;
  };
};
