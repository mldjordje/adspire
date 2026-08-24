import type {
  BlogPost,
  LocalizedPageContent,
  ProjectItem,
  ServiceItem,
} from "@/content/site/types";
import { srContent } from "@/content/site/sr";

// English content. Structural data (slugs, hrefs, images, dates, phone, email,
// brand project names) is reused from srContent; only copy is translated.

const cta = "Service details";

const serviceText: Array<Pick<ServiceItem, "title" | "summary" | "bullets">> = [
  {
    title: "Websites",
    summary:
      "Modern, fast, SEO-optimised websites — from corporate sites to landing pages and multilingual platforms, with measurable conversions.",
    bullets: [
      "Next.js, React, TypeScript, Tailwind CSS",
      "SEO, blog, CMS, analytics, conversion tracking",
      "PWA, Core Web Vitals, cloud (Vercel / custom server)",
    ],
  },
  {
    title: "E-commerce & web shop",
    summary:
      "Classic and headless commerce platforms: admin, payments, stock, subscriptions and automation — from MVP store to a serious shop.",
    bullets: [
      "Custom shop, headless, subscription, digital products",
      "Card payments, loyalty, coupons, CRM integration",
      "AI recommendations, email marketing, mobile optimisation",
    ],
  },
  {
    title: "Mobile apps (PWA + native)",
    summary:
      "PWAs reach users with no store wait; native (Flutter / React Native) for iOS and Android when you need payments, GPS and full device access.",
    bullets: [
      "PWA: booking, loyalty, menus, push, offline",
      "Native: payments, GPS, QR, chat, App Store / Play",
      "Booking, loyalty, e-commerce, CRM, SaaS",
    ],
  },
  {
    title: "CMS systems",
    summary:
      "CMS and admin panels tailored to your team — no generic solutions forced on a process that needs its own flow.",
    bullets: [
      "Admin panel, blog, gallery, users",
      "Role-based access (admin, editor, user)",
      "Dashboard and clear content structure",
    ],
  },
  {
    title: "Internal business apps",
    summary:
      "Digitising operations: CRM, scheduling, task manager and mini-ERP connected to your real process, not an off-the-shelf template.",
    bullets: [
      "CRM, staff, scheduling, sales, QR memberships",
      "Invoicing, reports, API integrations",
      "Internal dashboard for owners",
    ],
  },
  {
    title: "AI integration & automation",
    summary:
      "AI and automation (including n8n flows) where they cut manual work — sales, support, content and internal alerts.",
    bullets: [
      "AI chatbot, support, scheduling, quotes, SEO",
      "Voice agent, CRM assistant, lead scoring",
      "Marketing funnel, email, n8n workflow automation",
    ],
  },
  {
    title: "AI recommendation for your business",
    summary:
      "When someone asks AI which tradesperson, salon, clinic or agency to choose, we prepare your digital footprint so AI understands why you're a relevant recommendation.",
    bullets: [
      "Clearly states who you are, what you do and who you're best for",
      "Pages, FAQ and structured data AI can interpret easily",
      "Examples: carpentry, clinic, salon, restaurant, local service",
    ],
  },
  {
    title: "Business intelligence & analytics",
    summary:
      "Dashboards and reports that connect to your sources of truth — so owners and teams see KPIs, not just screenshots from tools.",
    bullets: [
      "Custom dashboard, KPIs, sales charts",
      "CRM analytics, heatmaps, user behaviour",
      "Automated monthly reports",
    ],
  },
  {
    title: "SEO & digital marketing",
    summary:
      "Technical SEO (including Next.js performance) combined with campaigns and CRO — measurable and iterative.",
    bullets: [
      "Technical and on-page SEO, competitor analysis",
      "Google Ads, Meta Ads, conversion tracking, remarketing",
      "Core Web Vitals, CRO, A/B testing",
    ],
  },
  {
    title: "Cyber security & GDPR",
    summary:
      "We help your site, forms and data storage meet a sensible level of security and privacy expectations (GDPR, consent, backup).",
    bullets: [
      "Security audit, GDPR setup, cookie consent",
      "Backup, disaster recovery, monitoring",
      "Data encryption",
    ],
  },
  {
    title: "Hosting & infrastructure",
    summary:
      "We set up and document production: cloud or custom server, SSL, mail, domain and backups — so you know what lives where.",
    bullets: [
      "Cloud and custom server deployment",
      "Mail server, domain, SSL",
      "Backup and cloud storage",
    ],
  },
  {
    title: "SaaS development",
    summary:
      "From MVP to subscription product: authentication, billing, admin and customer area built as one whole.",
    bullets: [
      "Booking, CRM, subscription and white-label SaaS",
      "Industry SaaS systems",
      "Monetising the digital product",
    ],
  },
  {
    title: "Industry solutions",
    summary:
      "Vertical software for clinics, gyms, restaurants, construction, lawyers and other niches — scheduling, catalogs and operations in one system.",
    bullets: [
      "Clinics, gyms, restaurants, construction, factories",
      "Lawyers, car dealers, agencies, real estate",
      "Tailored booking, catalog and operations flows",
    ],
  },
  {
    title: "Interactive web technologies",
    summary:
      "3D, virtual showroom and 360° when a brand needs an experience, not a static page — with care for performance and mobile.",
    bullets: [
      "3D web presentations, virtual showroom",
      "360° product view",
      "Interactive presentations and animations",
    ],
  },
  {
    title: "Appointment booking systems",
    summary:
      "24/7 online appointment booking for clinics, dental practices, salons, barbershops and service businesses — public booking page, staff calendars and automatic reminders that cut no-shows. Proven in production (Dr Igić, Doctor Barber), deployed in ~2 weeks.",
    bullets: [
      "24/7 booking from your website or Instagram profile",
      "SMS/email reminders — fewer missed appointments",
      "Per-staff calendars, client records and treatment history",
    ],
  },
];

const services: ServiceItem[] = srContent.servicesPage.items.map((s, i) => ({
  ...s,
  title: serviceText[i].title,
  summary: serviceText[i].summary,
  bullets: serviceText[i].bullets,
  cta,
}));

const projectText: Array<Pick<ProjectItem, "category" | "summary" | "outcome">> = [
  {
    category: "Booking + clinic",
    summary:
      "Web app for an aesthetic clinic with a public site, online booking, a Beauty Pass area and an admin calendar.",
    outcome: "Marketing, appointments, clients, treatments and analytics in one system.",
  },
  {
    category: "SEO + operations",
    summary:
      "SEO site, catalog, online enquiries and an internal admin panel for leads, quotes, staff, vehicles and deliveries.",
    outcome: "Enquiries flow into sales, operations get a central place to work.",
  },
  {
    category: "E-commerce",
    summary:
      "Web shop and admin platform for a premium fashion brand: catalog, cart, checkout, content and integrations.",
    outcome: "Sales, stock, orders and promotions run from one platform.",
  },
  {
    category: "Recruiting platform",
    summary:
      "Onboarding app for remote teachers with Google login, audio application, admin review and a referral system.",
    outcome: "Applications land in a measurable funnel with clear status, not an inbox.",
  },
  {
    category: "Billing + appointments",
    summary:
      "Platform for an AI video studio: packages and payment, purchased hours in the client account, appointments, invoices and site content from the admin.",
    outcome: "Sales, billing and scheduling run in one system instead of a spreadsheet.",
  },
  {
    category: "WebGL + booking",
    summary:
      "Site with a WebGL opening and the studio system behind it: enquiries with reference images, a calendar per artist, deposits and a monthly payment overview.",
    outcome: "Enquiries stop getting lost in DMs and the calendar becomes the only source of truth.",
  },
  {
    category: "Booking system",
    summary:
      "Booking app for a barber studio with a public site, online appointments, a client account and an admin calendar.",
    outcome: "The studio gets a schedule that runs 24/7 with less manual back-and-forth.",
  },
];

const projects: ProjectItem[] = srContent.home.projectsSection.items.map((p, i) => ({
  ...p,
  category: projectText[i].category,
  summary: projectText[i].summary,
  outcome: projectText[i].outcome,
}));

const blogText: Array<Pick<BlogPost, "title" | "excerpt" | "category">> = [
  {
    title: "How we build web systems that handle campaigns and scaling",
    excerpt:
      "Next.js, TypeScript and clear architecture from day one — why a good system means you don't rewrite code when the client grows.",
    category: "Web development",
  },
  {
    title: "Booking systems that replace calls, messages and spreadsheets",
    excerpt:
      "A central calendar, online appointments and an admin panel that runs 24/7 — what a service business gains when admin work stops being manual.",
    category: "Booking systems",
  },
  {
    title: "SEO and performance don't belong at the end of a project",
    excerpt:
      "LCP under 1.2s, structured data and Core Web Vitals 100 aren't a bonus — they're built into the first sprint, where it's cheapest.",
    category: "SEO & performance",
  },
  {
    title: "Three.js and WebGL in production — what agencies don't tell clients",
    excerpt:
      "3D animations are impressive, but bundle size, mobile FPS and fallbacks are where projects fall apart.",
    category: "Frontend & 3D",
  },
  {
    title: "AI automation isn't just for enterprises — concrete examples",
    excerpt:
      "n8n workflows, LLM agents and integrations that cut manual work in sales, support and operations — without an enterprise budget.",
    category: "AI & automation",
  },
  {
    title: "E-commerce that actually sells — catalog page vs. system",
    excerpt:
      "Checkout flow, upsell, stock integrations and analytics — what separates a shop that converts from one that doesn't.",
    category: "E-commerce",
  },
];

const blogPosts: BlogPost[] = srContent.blogPage.posts.map((p, i) => ({
  ...p,
  title: blogText[i].title,
  excerpt: blogText[i].excerpt,
  category: blogText[i].category,
}));

export const enContent: LocalizedPageContent = {
  localeLabel: "EN",
  siteTitle: "Adspire Digital",
  siteDescription:
    "Adspire Digital — web platforms, e-commerce, PWA and native apps, business systems, AI automation, SaaS and hosting. Contact: djordje@adspire.rs, +381 60 149 149 1.",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about-us" },
    { label: "Services", href: "/our-services" },
    { label: "Projects", href: "/our-projects" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact-us" },
  ],
  headerCta: { label: "Start a project", href: "/contact-us" },
  home: {
    heroStack: {
      intro: {
        eyebrow: "Agency mix / Hero 01",
        title: "Web systems that grow with the business",
        description:
          "Adspire Digital designs, builds and optimises websites, apps and sales flows that turn traffic into enquiries, bookings and revenue.",
        badges: ["Next.js", "SEO", "Booking systems", "Automation"],
        primary: { label: "Start a project", href: "/contact-us" },
        secondary: { label: "View projects", href: "/our-projects" },
        gallery: srContent.home.heroStack.intro.gallery,
      },
      capability: {
        eyebrow: "Agency mix / Hero 02",
        title: "One production flow for design, development and growth",
        description:
          "Strategy, UI/UX, development, SEO and automation work as one system — no hand-off losses and no bottlenecks as the project grows.",
        tags: ["Strategy", "UI/UX", "Development", "SEO", "Analytics", "CRO"],
        stats: [
          { value: "3 layers", label: "Strategy, product and growth in one flow" },
          { value: "MVP +", label: "Start fast and expand the system" },
          { value: "One team", label: "Clear scope, roadmap and post-launch support" },
        ],
        primary: { label: "Our process", href: "/about-us" },
        secondary: { label: "All services", href: "/our-services" },
        video: srContent.home.heroStack.capability.video,
        poster: srContent.home.heroStack.capability.poster,
      },
      showcase: {
        eyebrow: "Agency mix / Hero 03",
        title: "A partner for serious web delivery",
        description:
          "From discovery to production, with a clear scope, a realistic roadmap and focus on the result after launch. Concrete work below.",
        primary: { label: "Selected projects", href: "/our-projects" },
        secondary: { label: "Contact us", href: "/contact-us" },
        slides: srContent.home.heroStack.showcase.slides,
      },
    },
    servicesSection: {
      eyebrow: "Services",
      title: "The full spectrum of digital and technical solutions",
      description:
        "From web and e-commerce to PWA and native apps, internal systems, AI automation, SaaS and infrastructure — all in one place.",
      items: services.slice(0, 6),
    },
    projectsSection: {
      eyebrow: "Selected work",
      title: "Projects where design, performance and goal work together",
      description:
        "We pick work that shows how the product and growth side function as one whole.",
      items: projects,
    },
    testimonialsSection: {
      eyebrow: "Testimonials",
      title: "What teams say after launch",
      description:
        "What matters most is that after go-live there's less chaos, more clarity and better control over enquiries and sales.",
      items: [
        { name: "Milan R.", role: "Founder", company: "B2B company", quote: "The new site and campaigns increased enquiries and brought a clearer sales process." },
        { name: "Jelena P.", role: "Marketing manager", company: "Local brand", quote: "Fast team, clear communication and a focus on results." },
        { name: "Nikola S.", role: "Business owner", company: "Service business", quote: "Booking automation reduced the chaos and sped up scheduling." },
      ],
    },
    faqSection: {
      eyebrow: "FAQ",
      title: "Quick answers on process, timelines and support",
      description:
        "The home page keeps the key questions; the full FAQ lives on its own page.",
      items: [
        { q: "How long does delivery take?", a: "Smaller sites are quick; larger systems go through clearly defined phases with priorities and sprints." },
        { q: "Do you maintain after launch?", a: "Yes. Support, updates and iterative optimisation are part of regular delivery when the project needs it." },
        { q: "Can we start with a smaller budget?", a: "Yes. We define an MVP and expand the system by priority so the investment follows growth." },
      ],
    },
    ctaSection: {
      kicker: "Let's start",
      title: "Ready to turn the idea into a system that grows?",
      body: "We can start with a discovery call and a clear implementation plan.",
      primary: { label: "Start a project", href: "/contact-us" },
      secondary: { label: "View projects", href: "/our-projects" },
    },
  },
  aboutPage: {
    hero: {
      eyebrow: "About",
      title: "Adspire Digital — a development and technology partner",
      description:
        "We specialise in modern web platforms, mobile apps, business systems and AI automation. We build scalable, fast and durable solutions for the local and international market.",
      primary: { label: "Book a call", href: "/contact-us" },
      secondary: { label: "View services", href: "/our-services" },
    },
    manifesto:
      "We work as a white-label development partner, technical partner for agencies, subcontractor on complex projects, long-term maintenance partner and SaaS development team.",
    storyTitle: "How we work together",
    storyParagraphs: [
      "Every project starts with a clear business goal and context. We map the user flow, budget and timeline limits, then build a roadmap that delivers value early.",
      "We don't just ship a website — we build part of a sales, operations or product system. SEO, analytics, security and scalability are part of the core architecture, not an afterthought.",
      "Long term we stay with the client through maintenance, upgrades and automation — so the product stays stable while the business grows.",
    ],
    metrics: [
      { value: "Partnership", label: "White-label, agency partner, subcontractor or SaaS team — as needed" },
      { value: "Delivery", label: "Web, mobile, internal systems, AI and infrastructure in one flow" },
      { value: "Growth", label: "SEO, marketing, BI and automation for measurable progress after launch" },
    ],
    team: {
      title: "Leading focus",
      subtitle: "Strategy, sales and growth",
      leadName: "Đorđe",
      leadRole: "Strategy, sales and growth",
      leadBio:
        "Leads client communication, scope and priority definition, and aligns development and growth around a measurable outcome.",
      bullets: [
        "Discovery workshops and KPI alignment",
        "Scope, funnel and conversion planning",
        "Roadmap, launch and post-go-live optimisation",
      ],
    },
    cta: {
      kicker: "Next step",
      title: "If you already have an idea, we can turn it into a real plan right away.",
      body: "We start from goal, context and priorities — and only then from design.",
      primary: { label: "Get in touch", href: "/contact-us" },
      secondary: { label: "View projects", href: "/our-projects" },
    },
  },
  servicesPage: {
    hero: {
      eyebrow: "Services",
      title: "Adspire Digital — what we do and how we deliver",
      description:
        "We cover the full spectrum: web and e-commerce, PWA and native apps, CMS and internal systems, AI and automation, BI, SEO, security, hosting, SaaS and industry solutions. Each service has its own detail page.",
      primary: { label: "Contact", href: "/contact-us" },
      secondary: { label: "Projects", href: "/our-projects" },
    },
    introTitle: "One partner for the whole digital product",
    introBody:
      "Adspire can take the full lifecycle — from idea and architecture through design and development to deployment, maintenance and automation. We scope to your priorities and budget; contact: djordje@adspire.rs.",
    process: [
      "We define the business goal, scope and success metric.",
      "We map the user flow, CTA logic and priorities.",
      "We deliver a build ready for SEO, analytics and growth.",
    ],
    items: services,
    cta: {
      kicker: "Services + goal",
      title: "Need a combination of services rather than an isolated task?",
      body: "We can arrange phases and scope so budget and timeline follow real priorities.",
      primary: { label: "Start a conversation", href: "/contact-us" },
    },
  },
  projectsPage: {
    hero: {
      eyebrow: "Projects",
      title: "Selected projects and production flows that ended up in real use",
      description:
        "These aren't just pretty screens. The focus is on how the site or system helped sales, bookings or a clearer presence.",
      primary: { label: "Contact", href: "/contact-us" },
      secondary: { label: "Project detail", href: "/project-single" },
    },
    introTitle: "What we look at in a project",
    introBody:
      "A good project for us has a good page rhythm, clear CTAs, healthy performance and a system the client can use without extra chaos.",
    items: projects,
    cta: {
      kicker: "Similar challenge?",
      title: "We can look at what makes the most sense for your business.",
      body: "We don't copy templates; we keep what works and translate it to your context.",
      primary: { label: "Contact us", href: "/contact-us" },
    },
  },
  projectPage: {
    hero: {
      eyebrow: "Project detail",
      title: "An overview of process, delivery and business impact",
      description:
        "A production example focused on conversion UX, fast implementation and long-term durability in a real business environment.",
      primary: { label: "Live project", href: "https://prevozkop.rs" },
      secondary: { label: "All projects", href: "/our-projects" },
    },
    client: "PrevozKop",
    website: "https://prevozkop.rs",
    overview:
      "A case overview of a booking system and service site that connected digital enquiries, a service overview and team operations.",
    challenge:
      "The main challenge was to shorten the path from informing to sending a request, without burdening the internal team with manual steps.",
    solution:
      "We built a clear information layer, a focused booking flow and a structure that supports future expansion without breaking the system.",
    outcomes: [
      "A clearer funnel from first visit to a concrete enquiry",
      "Less manual coordination around bookings",
      "A more stable base for SEO and future growth",
    ],
    services: [
      "Discovery and scope definition",
      "UX and page structure",
      "Next.js development and integrations",
      "SEO base and analytics",
    ],
    metrics: [
      { value: "1 system", label: "Site and booking flow work together" },
      { value: "Faster edits", label: "Content and sections easier to maintain" },
      { value: "Growth-ready", label: "Base ready for campaigns and optimisation" },
    ],
    testimonial: {
      name: "Nikola S.",
      role: "Business owner",
      company: "PrevozKop",
      quote: "Booking automation reduced the chaos and sped up scheduling.",
    },
    gallery: srContent.projectPage.gallery,
    liveLabel: "View live project",
  },
  contactPage: {
    hero: {
      eyebrow: "Contact",
      title: "Send your goal and timeline — get a concrete next step back",
      description:
        "We move fastest when we know what you're trying to achieve, the project context and the biggest bottleneck right now.",
    },
    introTitle: "How to reach us",
    introBody:
      "You don't need a perfect brief. Just write the goal, the timeline and what currently feels like the problem. We turn that into a real next step.",
    phone: "+381 60 149 149 1",
    email: "djordje@adspire.rs",
    address: "Dimitrija Leka 66, Niš",
    officeHours: ["Monday - Friday", "09:00 - 17:00", "We also reply outside hours when a project is urgent"],
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
  faqPage: {
    hero: {
      eyebrow: "FAQ",
      title: "Common questions about process, timelines and collaboration",
      description:
        "Most uncertainty disappears when scope, priorities and next steps are clear from the start.",
      primary: { label: "Contact", href: "/contact-us" },
    },
    introTitle: "What clients most often ask",
    introBody:
      "If your case isn't covered here, just send a message and you'll get a concrete answer, not a generic pitch.",
    items: [
      { q: "How long does a site or system take?", a: "It depends on scope. A small site can go quickly, while larger systems run through discovery, design, development and optimisation. You get a clear phase plan at the start." },
      { q: "Do you do only development or strategy too?", a: "Both. Sometimes we come in just as a development partner, sometimes from positioning and UX all the way to the growth setup." },
      { q: "Can we start without a full budget for all phases?", a: "Yes. We often define an MVP, launch what matters most first and then expand by priority." },
      { q: "What happens after launch?", a: "If needed we stay on maintenance, analytics, SEO and iterative optimisation. The idea is that the system stays usable and stable." },
      { q: "Can you take over an existing site and improve it?", a: "Yes. If there's a good base, we don't tear everything down for no reason. First we establish what to keep and what to restructure." },
    ],
    cta: {
      kicker: "Question not here?",
      title: "Send the project context and get a concrete answer back.",
      body: "It's the fastest way to assess the next step and the real scope of work.",
      primary: { label: "Get in touch", href: "/contact-us" },
    },
  },
  blogPage: {
    hero: {
      eyebrow: "Blog",
      title: "Notes on systems, growth logic and web delivery",
      description:
        "The blog isn't a mandatory home block; it stays a separate page for topics that explain how we work and why we make some decisions early.",
    },
    featured: blogPosts[0],
    posts: blogPosts,
    cta: {
      kicker: "Want this in practice?",
      title: "If a concrete project is closer to you than theory, we can move to your case right away.",
      body: "We write when an approach needs explaining, but most value comes through implementation.",
      primary: { label: "Start a conversation", href: "/contact-us" },
    },
  },
  articlePage: {
    hero: {
      eyebrow: "Blog single",
      title: "How we build web systems ready for campaigns and growth",
      description:
        "A process that connects strategy, design, development and measurement. We don't build a site to sit there, but to withstand real use and further growth.",
      secondary: { label: "Back to blog", href: "/blog" },
    },
    post: blogPosts[0],
    intro:
      "Every project starts with a measurable business goal. Then we map the user flow, define constraints and build sprints around what moves enquiries, bookings or sales fastest.",
    sections: [
      {
        title: "From brief to first priority",
        paragraphs: [
          "The first step isn't screen design but understanding where energy and money are currently lost. Sometimes it's a slow site, sometimes a weak CTA, sometimes a missing operational flow after the form.",
          "Once we know that, it's easier to decide what goes into the MVP, what goes into the next phase and what shouldn't be done too early.",
        ],
      },
      {
        title: "Design and development as one sprint",
        paragraphs: [
          "The biggest mistake is splitting UX, copy, development and SEO so far apart that the project always waits for the next team. We bring it into one flow.",
          "That means structure, CTA logic, performance and technical foundations are agreed while the page takes shape — not when everything has gone too far.",
        ],
      },
      {
        title: "What remains after go-live",
        paragraphs: [
          "Launch is only the middle of the work. After it come data, iterations and decisions that make the difference between a pretty site and a useful system.",
          "That's why we set up analytics, conversion tracking and a framework for further improvements early.",
        ],
      },
    ],
    principles: [
      "Mobile-first interface and a clear funnel",
      "Performance, schema and SEO base in the first sprint",
      "Structured analytics and conversion tracking from day one",
    ],
    cta: {
      kicker: "Further reading is optional",
      title: "If you like, we can look at your concrete project right away.",
      body: "The most useful next step is usually a short call and a look at priorities.",
      primary: { label: "Contact us", href: "/contact-us" },
      secondary: { label: "See projects", href: "/our-projects" },
    },
  },
  footer: {
    tagline:
      "Adspire Digital delivers complete digital solutions — from web and mobile apps to AI automation and SaaS development.",
    cta: { label: "Contact us", href: "/contact-us" },
    copyright: "All rights reserved.",
    contactItems: [
      { label: "Email", value: "djordje@adspire.rs", href: "mailto:djordje@adspire.rs" },
      { label: "Phone", value: "+381 60 149 149 1", href: "tel:+381601491491" },
      { label: "Location", value: "Dimitrija Leka 66, Niš" },
    ],
  },
};
