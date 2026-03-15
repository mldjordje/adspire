import type { LocalizedPageContent } from "@/content/site/types";

const services = [
  {
    title: "Web design and development",
    summary:
      "Scalable websites and advanced web apps built with Next.js for serious business workflows.",
    bullets: [
      "Architecture for large data volumes and performance tuning",
      "React frontends and robust backend APIs",
      "ERP, CRM, and payment integrations",
    ],
    slug: "web-dizajn-i-razvoj",
    href: "/usluge/web-dizajn-i-razvoj",
    cta: "Service details",
  },
  {
    title: "E-commerce",
    summary: "Conversion-focused shops with a smooth buyer experience.",
    bullets: [
      "Custom shop or Shopify/Headless",
      "Payments and shipping integrations",
      "Optimized checkout flow",
    ],
    slug: "e-commerce",
    href: "/usluge/e-commerce",
    cta: "Service details",
  },
  {
    title: "Booking systems",
    summary: "Online scheduling tailored for service businesses.",
    bullets: [
      "Client self-booking and confirmations",
      "Admin calendar, services, and staff",
      "Reminders and no-show control",
    ],
    slug: "booking-sistemi",
    href: "/usluge/booking-sistemi",
    cta: "Service details",
  },
  {
    title: "Salon booking setup",
    summary: "Booking rollout for salons without existing software.",
    bullets: [
      "Move from DMs and calls to a central calendar",
      "Single-barber and multi-location setups",
      "Live examples already in production",
    ],
    slug: "booking-za-salone-bez-sistema",
    href: "/usluge/booking-za-salone-bez-sistema",
    cta: "Service details",
  },
  {
    title: "Web invitations",
    summary: "Digital invitation websites with RSVP tracking.",
    bullets: [
      "Lower cost than print",
      "Real-time RSVP overview",
      "Fast updates and instant sharing",
    ],
    slug: "web-pozivnice-za-veselja",
    href: "/usluge/web-pozivnice-za-veselja",
    cta: "Service details",
  },
  {
    title: "SEO and content",
    summary: "Technical SEO and content strategy for consistent growth.",
    bullets: [
      "Technical SEO and page speed",
      "On-page optimization",
      "Content planning and production",
    ],
    slug: "seo-i-sadrzaj",
    href: "/usluge/seo-i-sadrzaj",
    cta: "Service details",
  },
  {
    title: "Performance marketing",
    summary: "Google and Meta campaigns connected to real lead and revenue tracking.",
    bullets: [
      "Conversion tracking and audience setup",
      "Cost-per-lead and sales optimization",
      "Clear reporting before scaling spend",
    ],
    slug: "performance-marketing",
    href: "/usluge/performance-marketing",
    cta: "Service details",
  },
  {
    title: "Branding and identity",
    summary: "Brand systems that increase recognition, trust and consistency across channels.",
    bullets: [
      "Positioning and brand messaging",
      "Logo, color, typography and guidelines",
      "A system that works across website and campaigns",
    ],
    slug: "brending-i-identitet",
    href: "/usluge/brending-i-identitet",
    cta: "Service details",
  },
  {
    title: "Social media and content",
    summary: "Content planning and production built to support leads, sales and paid campaigns.",
    bullets: [
      "Editorial planning and content pillars",
      "UGC, short-form and ad creatives",
      "Alignment with lead generation systems",
    ],
    slug: "drustvene-mreze-i-sadrzaj",
    href: "/usluge/drustvene-mreze-i-sadrzaj",
    cta: "Service details",
  },
  {
    title: "Maintenance and support",
    summary: "Post-launch support that keeps your website fast, secure and dependable.",
    bullets: [
      "Security and system updates",
      "Performance monitoring and fixes",
      "Iterative improvements without release chaos",
    ],
    slug: "odrzavanje-i-podrska",
    href: "/usluge/odrzavanje-i-podrska",
    cta: "Service details",
  },
  {
    title: "Analytics and CRO",
    summary: "GA4, Tag Manager and conversion optimization for decisions grounded in data.",
    bullets: [
      "Accurate source and lead measurement",
      "Funnel analysis and leak detection",
      "Tests and changes that improve conversion",
    ],
    slug: "analitika-i-cro",
    href: "/usluge/analitika-i-cro",
    cta: "Service details",
  },
];

const portfolio = [
  { name: "tamitrade.com", category: "Corporate Website", image: "/images/portfolio/one.png", url: "https://tamitrade.com" },
  { name: "prevozkop.rs", category: "Booking + Service", image: "/images/portfolio/two.png", url: "https://prevozkop.rs" },
  { name: "aircoolplus.rs", category: "Lead Generation", image: "/images/portfolio/three.png", url: "https://aircoolplus.rs" },
  { name: "infinity-gym.rs", category: "Brand Site", image: "/images/portfolio/four.png", url: "https://infinity-gym.rs" },
  { name: "autodelic.com", category: "Product Catalog", image: "/images/portfolio/five.png", url: "https://autodelic.com" },
  { name: "mlgroup.rs", category: "Business Platform", image: "/images/portfolio/six.png", url: "https://mlgroup.rs" },
];

export const enContent: LocalizedPageContent = {
  localeLabel: "EN",
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    contact: "Contact",
    blog: "Blog",
    faq: "FAQ",
    portfolio: "Portfolio",
  },
  hero: {
    line1: "Web systems,",
    line2: "built to grow with the business",
    body:
      "We design, build and optimize websites, applications and growth flows that turn traffic into inquiries, bookings and revenue.",
  },
  digitalHero: {
    title: "One production flow for design, development and growth",
    body:
      "Strategy, UI/UX, development, SEO and automation run as one system. No handoff chaos between teams.",
    bullets: ["Strategy", "UI/UX", "Development", "SEO", "Automation", "Performance"],
  },
  freelancerHero: {
    title: "From idea to launch without bottlenecks",
    body:
      "We ship conversion-focused interfaces, technical SEO baseline, and stable releases that can handle real-world growth and operational pressure.",
    tags: ["Next.js", "SEO", "Automation", "Analytics", "CRO", "Growth ops"],
  },
  designerHero: {
    title: "A delivery partner for serious web work",
    status: "Open for new projects",
    body: "We step in from discovery through production with clear scope, realistic roadmaps and a focus on what happens after launch.",
  },
  services: {
    pageTitle: "Our services",
    pageSubtitle: "Full digital delivery from planning to measurement and growth.",
    items: [...services],
  },
  portfolio: {
    pageTitle: "Selected projects",
    pageSubtitle: "Examples where design, performance and business goals stay aligned.",
    items: [...portfolio],
  },
  cta: {
    kicker: "Start now",
    title: "Ready to turn your idea into a system that scales?",
    body: "We can start with a focused discovery call and a practical rollout plan.",
    primaryLabel: "Start the project",
    primaryHref: "/contact-us",
    secondaryLabel: "See projects",
    secondaryHref: "/our-projects",
  },
  testimonials: {
    title: "Client feedback",
    subtitle: "What teams say after launch.",
    items: [
      {
        name: "Milan R.",
        role: "Founder",
        quote:
          "The new website and campaign setup increased inbound inquiries and gave us a cleaner sales process.",
      },
      {
        name: "Jelena P.",
        role: "Marketing Manager",
        quote: "Fast team, clean communication, and clear business focus.",
      },
      {
        name: "Nikola S.",
        role: "Business Owner",
        quote: "Booking automation reduced scheduling chaos and improved customer response time.",
      },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    subtitle: "Quick answers about timeline, process and support.",
    items: [
      {
        q: "How long does delivery usually take?",
        a: "Smaller websites ship quickly, while larger systems are delivered in defined phases.",
      },
      {
        q: "Do you provide maintenance after launch?",
        a: "Yes, support, updates and iterative improvement are part of regular delivery.",
      },
      {
        q: "Can we start with a smaller budget?",
        a: "Yes. We can define an MVP and expand based on measurable priorities.",
      },
    ],
  },
  contact: {
    title: "Contact",
    subtitle: "Tell us your goals and timeline, we reply with a concrete next step.",
    phone: "+381 60 149 149 1",
    email: "djordje@adspire.rs",
    address: "Dimitrija Leka 66, Nis",
    form: {
      name: "Full name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      submit: "Send message",
      subjectOptions: {
        project: "New project",
        service: "Service",
        budget: "Budget",
        support: "Support",
      },
      success: "Message sent successfully.",
      error: "Message could not be sent.",
      sending: "Sending...",
    },
  },
  article: {
    title: "How we build web systems ready for campaigns and growth",
    subtitle: "A process that connects strategy, design, development and measurement.",
    bodyTitle: "From brief to launch without lost handoffs",
    body:
      "Every project starts with measurable business goals. Then we map user flow, define constraints, and shape sprints around what moves inquiries, bookings or sales first.",
    principles: [
      "Mobile-first interfaces and a clear funnel",
      "Performance, schema and SEO baseline in sprint one",
      "Analytics and conversion tracking from day one",
    ],
  },
  team: {
    title: "Delivery without handoff chaos",
    subtitle: "A model where strategy, design and engineering share one outcome.",
    leadName: "Djordje",
    leadRole: "Strategy, sales and growth",
    leadBio:
      "Leads discovery, scope, prioritization and growth systems so the whole project stays aligned with measurable outcomes instead of just shipping design.",
    bullets: [
      "Discovery workshops and KPI alignment",
      "Scope, funnel and conversion planning",
      "Roadmap, launch and post-go-live optimization",
    ],
  },
  project: {
    title: "Project detail",
    subtitle: "Overview of process, execution and business impact.",
    bodyTitle: "Case snapshot",
    body:
      "A production case focused on conversion-ready UX, fast implementation and long-term maintainability inside a real business environment.",
    bullets: [
      "Discovery and KPI mapping before design",
      "Design system, development and integrations",
      "Performance, SEO baseline and tracking hardening",
    ],
    liveLabel: "View live project",
  },
  footer: {
    tagline: "We build digital systems that turn attention into revenue.",
    cta: "Contact us",
    copyright: "All rights reserved.",
  },
};
