import type { ServiceDetailTranslation } from "./serviceDetail.i18n";

/**
 * English copy for /en/our-services/<slug>.
 *
 * Keys are the Serbian slugs, which stay the live URLs in every language.
 * Prices are intentionally left out — see the note in serviceDetail.i18n.ts.
 */
export const serviceDetailEn: Record<string, ServiceDetailTranslation> = {
  "web-prezentacije": {
    h1: "Websites and marketing sites",
    intro:
      "Fast, hand-coded websites that a visitor understands in seconds and that search engines can read without help.",
    overview:
      "We build modern marketing websites out of Niš, Serbia: corporate sites, landing pages, blogs, headless CMS, PWA and Core Web Vitals. White-label or direct with the client — one team from strategy to production.",
    tags: ["Website build", "Next.js", "Technical SEO", "CMS", "PWA", "Core Web Vitals"],
    bestFor: [
      "Companies whose current site does not produce enough relevant enquiries.",
      "Businesses that need a fast site, a CMS and a clear SEO structure.",
      "Teams that want one partner for strategy, design, development and measurement.",
    ],
    deliverables: [
      "A page structure built around buyer intent and the services you actually sell.",
      "A mobile-first Next.js site, technical SEO, schema and analytics wiring.",
      "A contact flow that records the source of every enquiry, ready for ad optimisation.",
    ],
    proofResults: {
      "Prevoz Kop": "An SEO site wired into the sales and operations system behind it.",
    },
    faq: [
      {
        q: "What does a website cost?",
        a: "It depends on scope — the number of pages, the integrations and whether content is written by you or by us. We quote after a short call, once the scope is clear, and the price stands for the agreed scope.",
      },
      {
        q: "How long does a website take?",
        a: "A typical project runs 3–6 weeks from kick-off to launch, depending on the number of pages and integrations.",
      },
      {
        q: "Can the site be edited without a developer?",
        a: "Yes — every site ships with a CMS so you can change text, images and posts yourself.",
      },
      {
        q: "Is the site optimised for mobile?",
        a: "Every site we build is mobile-first and passes Google Core Web Vitals without compromise.",
      },
      {
        q: "Is SEO included in the build?",
        a: "Basic on-page SEO is always included — meta tags, structured data and a sitemap.",
      },
    ],
  },

  "e-commerce-web-shop": {
    h1: "E-commerce and web shop development",
    intro:
      "Custom and headless stores where payments, stock, subscriptions and CRM live in one system instead of four.",
    overview:
      "We design and build custom and headless e-commerce: payments, inventory, subscriptions, loyalty, CRM and AI recommendations. Adspire joins the backend, the admin and a storefront that converts.",
    tags: ["Web shop", "Headless commerce", "Payments", "Inventory", "Subscriptions", "CRM"],
    bestFor: [
      "Brands that want their own sales channel and control over the buying experience.",
      "Stores where an off-the-shelf platform limits the catalogue, the checkout or operations.",
      "Teams that need sales, stock, orders and administration connected to each other.",
    ],
    deliverables: [
      "Catalogue, cart, checkout and admin shaped around how you actually sell.",
      "Payment, shipping, inventory and CRM integrations as the project requires.",
      "Funnel measurement and a technical SEO base for categories and products.",
    ],
    proofResults: {
      "Santos Santorini": "A web shop and admin platform for sales, stock and orders.",
    },
    faq: [
      {
        q: "What does a web shop cost?",
        a: "It depends on the catalogue, the integrations and whether you need subscriptions or loyalty. We quote after a short call — an MVP store and a full commerce system are very different projects.",
      },
      {
        q: "Which payment providers do you support?",
        a: "We integrate Stripe, PayPal, Monri and local processors — whatever fits the market you sell into.",
      },
      {
        q: "Can the shop manage stock?",
        a: "Yes — we build an inventory module that syncs with the admin panel and, optionally, with an external ERP.",
      },
      {
        q: "How long does a web shop take?",
        a: "An MVP store is ready in 4–8 weeks; a full system with CRM and automation takes 10–16 weeks.",
      },
      {
        q: "Can you build a subscription model?",
        a: "Yes — subscriptions and recurring billing are standard, including trial periods and flexible plans.",
      },
    ],
  },

  "mobilne-aplikacije": {
    h1: "Mobile and PWA application development",
    intro:
      "PWA when you need to launch fast, native when the phone hardware matters. We help you pick before you pay.",
    overview:
      "PWAs for a fast launch without App Store friction, and native apps (Flutter / React Native) with payments, push and GPS. Adspire covers the whole lifecycle from design to production.",
    tags: ["PWA", "Flutter", "React Native", "iOS", "Android", "Push notifications"],
    bestFor: [
      "Businesses that need mobile access to bookings, sales or internal work.",
      "Teams that want to validate a product as a PWA before paying for two native apps.",
      "Products where push, camera, location or offline use actually matter.",
    ],
    deliverables: [
      "A PWA-or-native decision based on features, budget and distribution plan.",
      "UX for small screens, API integration work and secure user management.",
      "Device testing, production release and a maintenance plan for the app.",
    ],
    faq: [
      {
        q: "What does a mobile app cost?",
        a: "A PWA and a native iOS + Android build sit at very different points. We quote once we know which one your feature list actually requires.",
      },
      {
        q: "What is the difference between a PWA and a native app?",
        a: "A PWA runs in the browser and needs no store install — faster to launch. Native goes deeper into the phone's hardware.",
      },
      {
        q: "Does the app have to be published to the App Store and Google Play?",
        a: "Not for a PWA. For native apps we run the whole submission process in both stores on your behalf.",
      },
      {
        q: "How long does a mobile app take?",
        a: "A PWA ships in 3–5 weeks; a native project takes 8–14 weeks depending on features.",
      },
      {
        q: "Does the app work without internet?",
        a: "PWAs and native apps can both run key functions offline through caching and a local database.",
      },
    ],
  },

  "cms-sistemi": {
    h1: "Custom CMS systems and admin panels",
    intro:
      "A content system shaped around your editorial process, not around a plugin marketplace.",
    overview:
      "We build a CMS that matches the client's process: role-based access, blog, media, SEO fields and dashboards that make sense. Adspire does not force a generic panel where it does not fit.",
    tags: ["Custom CMS", "Headless CMS", "Admin panel", "Roles", "Content model", "API"],
    bestFor: [
      "Teams where a generic CMS makes publishing harder or needs too many add-ons.",
      "Companies with roles, content approval and specific SEO fields.",
      "Platforms that need the same content on a site, an app or several channels.",
    ],
    deliverables: [
      "A content model and editorial flow designed for the people who will use it.",
      "Roles, media, versions, SEO fields and a preview before publishing.",
      "A documented API and an admin with no filler features or plugin dependencies.",
    ],
    faq: [
      {
        q: "Why a custom CMS instead of WordPress?",
        a: "WordPress suits blogs. Companies with a specific process get a CMS that follows their workflow exactly, without a pile of plugins holding it together.",
      },
      {
        q: "Who can use the admin panel?",
        a: "We build role-based access — administrator, editor and viewer each get what their responsibility requires.",
      },
      {
        q: "Can the CMS handle multiple languages?",
        a: "Yes, multilingual content is a standard option — entered per language through the same interface.",
      },
      {
        q: "How long does a custom CMS take?",
        a: "A basic CMS with blog and media ships in 4–6 weeks; systems with approval workflows take 8–12 weeks.",
      },
      {
        q: "Can the CMS be integrated with an existing site?",
        a: "Yes — a headless approach means the CMS serves content over an API that plugs into your current frontend.",
      },
    ],
  },

  "interne-poslovne-aplikacije": {
    h1: "Business software and internal applications",
    intro:
      "The work you do by hand in spreadsheets, messages and phone calls, turned into one system that remembers it for you.",
    overview:
      "Internal CRM, calendars, task management, records, invoicing and integrations with the APIs you already run. Adspire connects teams and removes manual work.",
    tags: ["Custom CRM", "Internal tools", "Dashboards", "Invoicing", "Automation", "API integration"],
    bestFor: [
      "Companies retyping the same data across Excel, messages and several tools.",
      "Teams where a generic CRM or ERP does not follow the real process.",
      "Owners with no single view of sales, tasks, appointments or operations.",
    ],
    deliverables: [
      "A process map and a prioritised MVP that fixes the most expensive bottleneck first.",
      "Roles, change history, dashboards and integrations with your existing sources.",
      "A modular base that extends without replacing the whole system.",
    ],
    proofResults: {
      "Prevoz Kop": "Sales and operations joined into a single system.",
      TeachFromHome: "Measurable onboarding and candidate processing in one application.",
      "Dr Igić": "Appointments, clients and clinic administration in a web application.",
    },
    faq: [
      {
        q: "Why build a CRM instead of buying one?",
        a: "Off-the-shelf tools carry features you will never use. A custom CRM follows your sales process exactly, with nothing in the way.",
      },
      {
        q: "Can an internal application integrate with Excel or Google Sheets?",
        a: "Yes — we handle import and export, and can read directly from Google Sheets if that is your current workflow.",
      },
      {
        q: "Does the application support several users at once?",
        a: "Every internal application is built multi-user, with role-based access and a change history.",
      },
      {
        q: "What does an internal business application cost?",
        a: "A records or task tool and a CRM with invoicing and API integrations are different projects. We scope first, then quote.",
      },
      {
        q: "What happens when we need new features later?",
        a: "Every system is modular — new modules are added without breaking the existing architecture, under an agreed SLA for changes.",
      },
    ],
  },

  "ai-integracije-automatizacija": {
    h1: "AI chatbots and business automation",
    intro:
      "AI wired into the systems you already run, measured by hours saved and enquiries handled — not by how impressive the demo looked.",
    overview:
      "AI across sales, support, content and SEO; lead scoring, voice agents and n8n workflows. Adspire connects the models to your CRM and your sites without the demo effect.",
    tags: ["AI chatbot", "n8n", "LLM integration", "Lead scoring", "Voice agents", "Workflow automation"],
    bestFor: [
      "Teams repeating the same answers, entries and checks every day.",
      "Companies that want AI connected to their existing site, CRM or knowledge base.",
      "Processes where the result can be measured in time, volume handled or errors avoided.",
    ],
    deliverables: [
      "A process review and an honest check of where AI actually adds measurable value.",
      "Workflows, integrations, escalation rules and control over data access.",
      "Test scenarios, monitoring and documentation for life after go-live.",
    ],
    faq: [
      {
        q: "What can an AI chatbot do for my business?",
        a: "It takes the first line of support — answering common questions, qualifying leads and booking appointments 24/7 without occupying staff.",
      },
      {
        q: "What does AI automation cost?",
        a: "A starter set of n8n workflows and a chatbot is a different project from voice agents wired into a CRM. We scope the process first, then quote.",
      },
      {
        q: "Can AI write content for my site?",
        a: "Yes — we integrate AI into your content flow, from draft generation to SEO work and publishing through your CMS.",
      },
      {
        q: "Which CRM systems can AI integrate with?",
        a: "HubSpot, Notion, Airtable and custom CRMs over their APIs — the flows run without manual entry.",
      },
      {
        q: "Do AI solutions need ongoing maintenance?",
        a: "Models and prompts get tuned as the business changes. A monthly monitoring package keeps it running.",
      },
    ],
  },

  "ai-preporuka": {
    h1: "AI SEO and getting recommended by AI",
    intro:
      "Preparing your pages, proof and structured data so an assistant has a defensible reason to name you when the question is relevant.",
    overview:
      "AI recommendation readiness is for businesses that want to be a clearer choice when someone asks an assistant for one — which joinery builds fitted kitchens, which salon takes online bookings, which clinic offers a treatment, which agency can build a web application. We put the public pages, FAQ, structured data, evidence, local signals and an AI-readable profile in order so AI systems have more reliable context.",
    tags: ["AI SEO", "Generative engine optimisation", "Entity schema", "FAQ", "Local signals", "llms.txt"],
    bestFor: [
      "Companies that Google and AI systems do not clearly connect to a service and a place.",
      "Businesses with real results but no public pages that explain the evidence.",
      "Local services that buyers increasingly find by asking a question rather than searching.",
    ],
    deliverables: [
      "A map of the questions, services, locations and public evidence you can be relevant for.",
      "Service pages, FAQ, entity schema, local signals and a factual AI profile.",
      "Measurement of AI referral visits and enquiries, with no promise of a specific recommendation or position.",
    ],
    faq: [
      {
        q: "Can you guarantee AI will recommend my business?",
        a: "No. Nobody can honestly guarantee a specific AI answer. What we can do is put the data, pages, evidence and structure in order so an assistant has a clearer reason to consider you when the query is relevant.",
      },
      {
        q: "What does the work include?",
        a: "First we define which questions you should be a recommendation for. Then we work on the service pages, the questions and answers, the evidence, local signals, structured data, the AI profile, and measurement of visits from AI and search.",
      },
      {
        q: "What would this look like for a clinic or a salon?",
        a: "For a salon or a clinic we would cover treatments, appointments, results, location, experience and the concrete reasons to recommend it. For a joinery, fitted kitchens, wardrobes, location, materials, past work and common questions.",
      },
      {
        q: "Which businesses is this worth doing for?",
        a: "Those people look for by asking: which salon to book, which clinic does a treatment, who builds web shops, who builds booking systems, which agency can develop an application.",
      },
      {
        q: "How is the result measured?",
        a: "Indexed pages, AI and search referral visits, enquiries from new landing pages, positions for question-shaped queries, and conversion quality. The focus is enquiries, not impressions.",
      },
    ],
  },

  "business-intelligence-analitika": {
    h1: "BI dashboards and business analytics",
    intro:
      "One place that shows where the money is made and where it leaks, instead of five tabs and a spreadsheet.",
    overview:
      "Dashboards for owners, KPI tracking, sales and CRM analytics, and monthly reports. Adspire builds views wired to the real data sources rather than to a manual export.",
    tags: ["Business intelligence", "KPI dashboard", "Sales analytics", "Reporting", "Data model"],
    bestFor: [
      "Owners reading sales, marketing and operations data across several systems.",
      "Teams assembling reports by hand in spreadsheets every day or every month.",
      "Companies that need clearly defined KPIs and ownership of the result.",
    ],
    deliverables: [
      "KPI definitions and a single data model, agreed before any dashboard is designed.",
      "Connections to CRM, analytics, databases, spreadsheets and other available sources.",
      "Dashboards per role, automated reports and data quality checks.",
    ],
    faq: [
      {
        q: "What can a BI dashboard track?",
        a: "Sales metrics, web traffic, conversions, CRM activity and financial KPIs — from one interface.",
      },
      {
        q: "Does the dashboard work in real time?",
        a: "Data refreshes on the interval you define, from every few minutes to once a day, depending on the source.",
      },
      {
        q: "Which data sources can it connect to?",
        a: "Google Analytics, Meta Ads, CRMs, SQL databases, Google Sheets and custom APIs, consolidated into one view.",
      },
      {
        q: "What does a BI dashboard cost?",
        a: "A starter dashboard with a handful of KPI widgets and a full analytics system with several sources are different projects. We quote once the sources and KPIs are known.",
      },
      {
        q: "Can monthly reports be generated automatically?",
        a: "Yes — the system can email PDF reports to your team or your shareholders on a schedule.",
      },
    ],
  },

  "seo-digitalni-marketing": {
    h1: "SEO and digital marketing",
    intro:
      "Technical SEO, paid search and CRO planned together, measured in enquiries rather than in clicks.",
    overview:
      "Technical and on-page SEO, AI support for content, Google and Meta campaigns, CRO and A/B testing. Adspire puts the site, the analytics and the ads into one plan.",
    tags: ["Technical SEO", "On-page SEO", "Google Ads", "Meta Ads", "CRO", "A/B testing"],
    bestFor: [
      "Companies with a site that buyers do not find for the services that matter.",
      "Businesses that want search campaigns measured on enquiries and sales, not clicks.",
      "Teams needing one plan across technical SEO, content and landing pages.",
    ],
    deliverables: [
      "A technical audit, a map of key intents and priorities ranked by business value.",
      "On-page changes, internal links, schema, local signals and a content plan.",
      "Ads-ready conversions, campaigns per service, negative keywords and iteration against real leads.",
    ],
    faq: [
      {
        q: "How long before SEO shows results?",
        a: "First position changes usually appear within 2–3 months; stable organic growth builds over 6–12 months.",
      },
      {
        q: "What is the difference between technical and on-page SEO?",
        a: "Technical SEO covers speed, structure and indexing. On-page SEO covers the content, the headings and the internal links for the target queries.",
      },
      {
        q: "Do you manage Google Ads campaigns?",
        a: "Yes — we set up, optimise and track Google Search and Display campaigns with monthly reports on spend and conversions.",
      },
      {
        q: "What does SEO cost?",
        a: "A one-off technical audit and implementation is a different commitment from a monthly retainer. We quote once we have seen the site and the market.",
      },
      {
        q: "Do you run A/B tests on landing pages?",
        a: "Yes — CRO and A/B testing are part of the advanced package. We test headlines, CTAs and layout to a statistically significant winner.",
      },
    ],
  },

  "cyber-security-gdpr": {
    h1: "Security audits and GDPR readiness",
    intro:
      "A written picture of where a site or application is exposed, and the work to close it.",
    overview:
      "Security audits, GDPR and cookie consent, backups, monitoring and encryption where it earns its place. Adspire helps get the site and its forms in line with practice.",
    tags: ["Security audit", "GDPR", "Cookie consent", "Backups", "Monitoring", "Data protection"],
    bestFor: [
      "Sites and applications handling contact, user or business data.",
      "Teams with no clear view of access, backups or system dependencies.",
      "Companies adding analytics or advertising who must sort out privacy and user choice.",
    ],
    deliverables: [
      "A technical review of the application, its dependencies, authentication and infrastructure configuration.",
      "A prioritised report with evidence, risk and concrete remediation steps.",
      "Technical implementation of privacy, consent, backups and monitoring within the agreed scope.",
    ],
    faq: [
      {
        q: "Does my site have to be GDPR compliant?",
        a: "If you collect any personal data from visitors — email, name, cookies — compliance is not optional for anyone serving EU users.",
      },
      {
        q: "What does a security audit include?",
        a: "We check vulnerabilities in the code, the dependencies, the SSL configuration, authentication and server settings, and deliver a written report with recommendations.",
      },
      {
        q: "What does GDPR implementation cost?",
        a: "Basic consent and policy work on an existing site is a small, well-defined job; a full review of an application is not. We quote after looking at the site.",
      },
      {
        q: "How does the backup system work?",
        a: "Automated daily backups with an off-site copy — after an incident the site is restored within an hour.",
      },
      {
        q: "Do you offer 24/7 monitoring?",
        a: "Yes, uptime and security monitoring is available as a monthly service, with email or SMS alerts at the first sign of trouble.",
      },
    ],
  },

  "hosting-infrastruktura": {
    h1: "Cloud hosting and production infrastructure",
    intro:
      "Deployment, domains, mail and backups set up so that the handover document is not a phone call to us.",
    overview:
      "Cloud and custom server deployment, mail server, domain, SSL, backups and object storage. Adspire keeps clear documentation and a clean handover.",
    tags: ["Cloud hosting", "Deployment", "SSL", "DNS", "Backups", "Monitoring"],
    bestFor: [
      "Projects that need reliable deployment, SSL, a domain and controlled access.",
      "Teams inheriting an existing system with no documentation and unclear ownership.",
      "Applications that need backups, monitoring and a recovery plan.",
    ],
    deliverables: [
      "Production and staging environments, safe secret management and automated deployment.",
      "DNS, SSL, backups, monitoring and alerts matched to how critical the system is.",
      "Documentation of the infrastructure, the access and the recovery or handover procedure.",
    ],
    faq: [
      {
        q: "Where do you host the sites you build?",
        a: "Vercel for Next.js projects, AWS or DigitalOcean for custom servers, and Hetzner for clients who need EU data residency.",
      },
      {
        q: "Do you handle the SSL certificate?",
        a: "Yes, SSL is always included and renews automatically — the site is never served without HTTPS.",
      },
      {
        q: "What does mail server setup include?",
        a: "Business email on your domain, the DNS records (SPF, DKIM, DMARC) and anti-spam configuration.",
      },
      {
        q: "Can we migrate existing hosting to you?",
        a: "Yes — site, mail accounts and database are migrated without downtime, with full handover documentation.",
      },
      {
        q: "What does hosting cost per month?",
        a: "It depends on the provider and the availability you need. A small site and a high-availability production server are far apart; we recommend a setup once we know the load.",
      },
    ],
  },

  "saas-razvoj": {
    h1: "SaaS platform and MVP development",
    intro:
      "The shortest honest path from an idea to a product someone pays a subscription for.",
    overview:
      "Booking, CRM and subscription SaaS, white-label and industry products. Adspire builds authentication, billing and the admin layer as one piece.",
    tags: ["SaaS", "MVP", "Multi-tenant", "Billing", "White-label", "Subscriptions"],
    bestFor: [
      "Founders who want to validate a B2B product through a focused MVP.",
      "Companies turning an existing service into a subscription platform.",
      "Products that need multi-tenant accounts, billing and white-label options.",
    ],
    deliverables: [
      "Scope validation, user roles and the shortest path to first real use.",
      "Authentication, organisations, billing, administration and basic product analytics.",
      "An architecture ready for iteration, monitoring and safely serving several clients.",
    ],
    faq: [
      {
        q: "What is SaaS and do I need it?",
        a: "SaaS means your clients reach your software through a browser on a subscription — the model for scalable revenue without distribution.",
      },
      {
        q: "What does a SaaS MVP cost?",
        a: "A minimal product with authentication and billing and a full B2B platform are far apart. We scope the first release, then quote it.",
      },
      {
        q: "Do you support white-label SaaS?",
        a: "Yes — we build multi-tenant architecture where each client gets their own branding, domain and configured environment.",
      },
      {
        q: "How is billing handled?",
        a: "Stripe Billing for subscription plans, trials, and monthly or annual cycles — automated, with no manual invoicing.",
      },
      {
        q: "How long does a SaaS platform take?",
        a: "An MVP launches in 8–12 weeks; a full product with admin, analytics and an API takes 20–30 weeks depending on scope.",
      },
    ],
  },

  "industrijska-resenja": {
    h1: "Industry-specific software",
    intro:
      "Software cut for one trade's actual workflow, instead of a generic tool with workarounds bolted on.",
    overview:
      "Specialised solutions for clinics, gyms, restaurants, construction, factories, legal practices and real estate — booking, catalogues and operations in one system.",
    tags: ["Vertical software", "Clinics", "Gyms", "Restaurants", "Construction", "Real estate"],
    bestFor: [
      "Clinics, salons, construction and service companies with a specific workflow.",
      "Organisations where universal software creates detours and duplicate entry.",
      "Teams that want to standardise the process before opening more locations.",
    ],
    deliverables: [
      "A process workshop and a data model based on the real roles and business rules.",
      "A focused operations system for appointments, records, sales or reporting.",
      "Mobile access, roles, integrations and controlled expansion module by module.",
    ],
    proofResults: {
      "Dr Igić": "A web application shaped around how an aesthetic clinic actually runs.",
      "Prevoz Kop": "The sales and operations process of a transport company, digitised.",
    },
    faq: [
      {
        q: "Do you build appointment software for clinics?",
        a: "Yes — a booking system for a clinic or practice includes online booking, SMS reminders and a schedule view per doctor.",
      },
      {
        q: "Can a restaurant order a digital menu and an ordering system?",
        a: "We build QR-code menus, table ordering and integration with the kitchen printer.",
      },
      {
        q: "What does a construction company get?",
        a: "Records of workers, materials and project phases, with mobile access from the site and automatic reports for management.",
      },
      {
        q: "Do you build for gyms and fitness centres?",
        a: "Yes — memberships, group class booking, attendance tracking and automatic renewal notices.",
      },
      {
        q: "What does industry software cost?",
        a: "It depends on the trade and the feature set. A starter solution and a full industry system are different projects; we quote after a process call.",
      },
    ],
  },

  "interaktivne-web-tehnologije": {
    h1: "3D web experiences and virtual showrooms",
    intro:
      "Interaction with a sales job to do — a product understood from every angle before the first conversation.",
    overview:
      "3D web experiences, virtual showrooms, 360° views and advanced motion that stay fast on a phone. Adspire pairs WebGL and Three.js with UX that still converts.",
    tags: ["WebGL", "Three.js", "3D web", "Virtual showroom", "360° product", "Motion"],
    bestFor: [
      "Products a buyer must understand from several angles before talking or buying.",
      "Brands where a standard gallery cannot show the space, the material or the configuration.",
      "Campaigns where the interaction has a clear sales goal rather than being decoration.",
    ],
    deliverables: [
      "An interaction plan and a fallback experience for weaker devices.",
      "Optimised 3D models, a WebGL implementation and wiring into your content or products.",
      "A performance budget, mobile testing and measurement of the interactions that lead to an enquiry.",
    ],
    faq: [
      {
        q: "What is a 3D web experience and why does it help?",
        a: "It shows your product or space interactively in the browser — no app, no plugins, straight on the site.",
      },
      {
        q: "Does 3D work on a phone?",
        a: "Yes — every scene we build is optimised for mobile and holds 60fps on a modern phone.",
      },
      {
        q: "What is a virtual showroom?",
        a: "An online space where clients explore products in 3D — the right fit for furniture, cars and architecture.",
      },
      {
        q: "What does a 3D web experience cost?",
        a: "A single interactive model and a multi-room virtual showroom are very different builds. We quote once the models and the scope are defined.",
      },
      {
        q: "Does 3D slow the site down?",
        a: "Not when implemented properly — lazy loading and optimised models keep Core Web Vitals green.",
      },
    ],
  },

  "sistemi-za-zakazivanje": {
    h1: "Online appointment booking systems",
    intro:
      "Bookings taken off the phone and into a calendar that fills itself, with reminders that cut no-shows.",
    overview:
      "24/7 online appointment booking for clinics, dental practices, salons, barbershops and service businesses: a public booking flow for clients, a staff calendar per employee or doctor, SMS / Viber / email reminders that cut no-shows, client records and treatment history. Proven in production with Dr Igić (aesthetic clinic) and Doctor Barber (24/7 booking) — an existing base means roughly two weeks to deploy, not development from zero.",
    tags: [
      "Appointment booking",
      "Online scheduling",
      "Clinic booking software",
      "Salon booking app",
      "Reminders",
      "Staff calendar",
    ],
    bestFor: [
      "Clinics, salons, practices and workshops still booking by phone or in a notebook.",
      "Teams losing time to missed calls, double bookings and manual reminders.",
      "Businesses that need booking shaped around their services, staff and locations.",
    ],
    deliverables: [
      "A public booking flow that works on a phone without forcing users to register.",
      "Staff calendar, opening hours, services, employees and availability rules.",
      "Confirmations, reminders, cancellations and appointment analytics within the agreed scope.",
    ],
    proofResults: {
      "Doctor Barber": "Online appointments and a staff calendar instead of arranging every slot by hand.",
      "Dr Igić": "Booking and client management for an aesthetic clinic.",
    },
    faq: [
      {
        q: "Who is a booking system for?",
        a: "Anyone working in appointments: clinics and practices, dentists, physiotherapists, hair and beauty salons, barbers, tattoo studios, gyms and trainers, garages, lawyers and consultants.",
      },
      {
        q: "What does a booking system cost?",
        a: "We start from a base already running in production, so a standard system is far cheaper than building from zero. Custom work with treatment records and payments costs more. You get a figure after a short call.",
      },
      {
        q: "How long does implementation take?",
        a: "Around two weeks for a standard system — the base is already live with our clients (Dr Igić, Doctor Barber) and we adapt it to your services, hours and brand.",
      },
      {
        q: "Does the system send reminders to clients?",
        a: "Yes — an automatic SMS, Viber or email reminder before the appointment. That typically halves no-shows.",
      },
      {
        q: "Can clients book outside opening hours?",
        a: "Yes, that is the point — booking runs 24/7 from the site or an Instagram profile, and you find a full calendar in the morning instead of missed calls.",
      },
      {
        q: "Can several employees use the same system?",
        a: "Yes — each employee or doctor has their own calendar and schedule, while the owner sees the whole shift, the occupancy and the reports in one place.",
      },
    ],
  },
};
