import type { Guide } from "./guides";

/**
 * English GEO guides targeting international clients and English-speaking founders.
 */

export const webShopNotSellingGuideEn: Guide = {
  path: "/en/why-online-store-not-selling",
  eyebrow: "E-Commerce Conversion",
  title: "Why Is My Online Store Not Selling? — 5 Reasons for Cart Abandonment",
  metaDescription:
    "Why online shoppers abandon carts: hidden shipping costs, forced account creation, sluggish mobile speeds, and lack of trust signals. How to fix checkout drop-off.",
  h1: "Why Is My Online Store Not Selling?",
  lead:
    "When an e-commerce store gets traffic but no orders, the breakdown happens at four friction points: unexpected shipping fees revealed only at checkout, mandatory account registration, mobile load times exceeding 2.5 seconds, or missing trust signals. Fixing these bottlenecks typically reduces cart abandonment by 20 to 35% without increasing ad spend.",
  keywords: [
    "why is my online store not selling",
    "stop cart abandonment",
    "increase ecommerce conversion rate",
    "checkout optimization",
    "why customers leave without buying",
    "ecommerce sales drop fix",
  ],
  background: "aurora",
  updated: "2026-09-27",
  sections: [
    {
      heading: "1. Unexpected Shipping Costs Revealed at the Final Step",
      body: [
        "Most customers do not abandon their carts because of product pricing, but because of unpleasant surprises during payment. When shipping rates or carrier fees appear only at the very last step, shoppers feel misled and immediately look for alternatives.",
      ],
      bullets: [
        "State shipping costs and estimated delivery times directly on each product page before add-to-cart.",
        "Introduce a clear free-shipping threshold (e.g., 'Free shipping on orders over $50 / €50') to lift average order value.",
        "Display recognized courier logos (DHL, FedEx, UPS) prominently early in the checkout flow.",
      ],
    },
    {
      heading: "2. Forced Account Registration Instead of Frictionless Guest Checkout",
      body: [
        "Requiring first-time buyers to create a password, confirm an email, and set up an account before they can pay is the single largest conversion killer on mobile devices. Shoppers want your product, not another login to remember.",
      ],
      bullets: [
        "Make 'Guest Checkout' the default option, requiring only name, delivery address, and phone/email for tracking.",
        "Offer a one-click account creation prompt on the order confirmation screen after payment is complete.",
        "Strip checkout input fields down to the strict minimum required for fulfillment.",
      ],
    },
    {
      heading: "3. Slow Mobile Speeds and Unresponsive Interactions",
      body: [
        "Over 75% of e-commerce traffic originates on mobile phones. If a product page or checkout takes longer than 2.5 seconds to load, more than a third of potential buyers bounce before the buy button even renders.",
      ],
      bullets: [
        "Compress all product imagery into modern WebP or AVIF formats without loss of visual clarity.",
        "Eliminate redundant tracking scripts, bulky chat widgets, and bloated third-party plugins.",
        "Ensure CTA buttons like 'Add to Cart' and 'Pay Now' are sticky and easily reachable with one thumb.",
      ],
    },
    {
      heading: "4. Missing Trust Signals and Unclear Return Policies",
      body: [
        "Online buyers constantly calculate risk: Will this item actually arrive? What if it doesn't fit? Who is behind this store? If a site looks generic or hides company details, customers will not enter card information.",
      ],
      bullets: [
        "Display legal company registration details, physical address, and responsive contact options in the footer.",
        "Feature verified customer testimonials with real buyer photos and rating badges.",
        "Clearly highlight a hassle-free 14-to-30-day return policy and specify who covers return shipping.",
      ],
    },
    {
      heading: "Immediate E-Commerce Audit Checklist",
      bullets: [
        "Can a first-time buyer complete an order from mobile in under 60 seconds?",
        "Has your checkout been tested on standard Android and iOS devices across real 4G networks?",
        "Do you have an automated abandoned-cart recovery email or SMS sequence active?",
        "Are popular express payment options (Apple Pay, Google Pay, PayPal, Credit Card) displayed prominently?",
      ],
    },
  ],
  proofHeading: "Optimized E-Commerce Systems in Practice",
  proof: [
    {
      label: "Custom E-Commerce & Web Applications",
      href: "/en/our-projects",
      note: "High-performance custom web shops built with Next.js delivering sub-second page loads and higher conversions.",
    },
  ],
  faqHeading: "Frequently Asked Questions on E-Commerce Conversions",
  faq: [
    {
      q: "What is considered a normal shopping cart abandonment rate?",
      a: "The global benchmark sits between 65% and 75%. In stores that enforce account registration or hide shipping fees, abandonment frequently exceeds 85%. Systematic checkout streamlining reliably brings it below 55%.",
    },
    {
      q: "Does offering free shipping really increase profit margins?",
      a: "Yes, provided you set the qualifying threshold 15% to 25% higher than your current average order value. Shoppers eagerly add an extra accessory or item to unlock free shipping, which increases overall cart profitability.",
    },
    {
      q: "How does a custom Next.js store compare to standard Shopify?",
      a: "While Shopify offers quick setup, installing dozens of apps for discounts, reviews, and checkout tweaks slows the site down and incurs recurring monthly fees. A custom Next.js storefront provides instant page transitions, bespoke checkout logic, and zero platform revenue share.",
    },
    {
      q: "How does automated abandoned cart recovery work?",
      a: "When a shopper enters their email or phone number in step one and subsequently drops off, an automated trigger sends a personalized reminder 1 to 2 hours later with their saved items and a direct checkout link, routinely recovering 10% to 18% of lost sales.",
    },
  ],
  cta: { label: "Request a Free Website Audit", href: "/en/contact-us" },
  secondaryCta: { label: "Explore Our Web Development Services", href: "/en/our-services" },
  related: ["/en/our-services", "/en/our-projects"],
};

export const appointmentNoShowGuideEn: Guide = {
  path: "/en/how-to-reduce-appointment-no-shows",
  eyebrow: "Appointment Optimization",
  title: "How to Stop Appointment No-Shows — Automated Reminders for Clinics & Salons",
  metaDescription:
    "How salons, clinics, and professional practices reduce appointment no-shows by up to 70%: automated WhatsApp & SMS reminders, digital waitlists, and cancellation policies.",
  h1: "How to Stop Client No-Shows and Cancellations",
  lead:
    "Client no-shows and last-minute cancellations are most effectively reduced by an automated three-pillar protocol: SMS or WhatsApp reminders sent 24 hours and 2 hours prior with one-click confirmation, a digital waitlist that automatically reallocates cancelled slots, and deposit rules for appointments exceeding 60 minutes. Two-way messaging alone reliably cuts no-shows by 50% to 70%.",
  keywords: [
    "how to stop appointment no shows",
    "reduce salon cancellations",
    "automated appointment reminder sms",
    "whatsapp booking reminder clinic",
    "online scheduling software",
    "appointment cancellation policy",
  ],
  background: "silk",
  updated: "2026-09-27",
  sections: [
    {
      heading: "1. Two-Way WhatsApp & SMS Reminders with 1-Click Confirmation",
      body: [
        "In over 80% of situations, clients do not miss appointments out of malice; they simply forget or experience routine schedule shifts. Standard emails are often opened too late, whereas phone messages achieve over 95% open rates within minutes.",
      ],
      bullets: [
        "Dispatch an automated message exactly 24 hours in advance with two quick buttons: 'Confirm Appointment' and 'Reschedule'.",
        "Send a concise second notification 2 hours prior containing the exact address, parking tips, and map link.",
        "When the client taps 'Confirm', their status instantly turns green in your central staff calendar.",
      ],
    },
    {
      heading: "2. Automated Digital Waitlists That Instantly Refill Empty Slots",
      body: [
        "Even when a client cancels courteously, receptionists or practitioners rarely have time mid-treatment to scramble through call lists. The consequence is an idle slot and lost revenue.",
      ],
      bullets: [
        "Allow clients to join an online waitlist for specific dates or preferred team members.",
        "The moment a slot is cancelled, the system automatically alerts waitlisted clients: 'A slot opened tomorrow at 2 PM. Tap to book'.",
        "Vacated appointments are typically re-booked within 15 minutes without making a single manual phone call.",
      ],
    },
    {
      heading: "3. Transparent Cancellation Windows and Strategic Deposits",
      body: [
        "For quick 20-minute checkups, a friendly reminder is ample. However, for complex treatments lasting 90 minutes or longer (aesthetic procedures, dentistry, specialized styling), an empty chair represents a substantial financial loss.",
      ],
      bullets: [
        "Clearly state a 24-hour free cancellation policy across booking confirmations and website footers.",
        "Collect a modest deposit (20% to 30%) through secure card payments when booking high-ticket treatments.",
        "When clients have a small financial stake committed, no-show rates drop to virtually zero.",
      ],
    },
    {
      heading: "4. Unified Central Calendar Over Fragmented DMs and Notebooks",
      body: [
        "Juggling bookings across phone calls, Instagram direct messages, WhatsApp chats, and paper notes leads to inevitable double-bookings and confusion. A unified digital calendar is essential.",
      ],
      bullets: [
        "Clients only see real, confirmed openings synced with staff rosters, vacations, and preparation buffers.",
        "Staff access updated personal schedules directly from their mobile phones in real time.",
        "Maintain client visit histories to easily identify reliable regulars versus repeat late-cancellers.",
      ],
    },
  ],
  proofHeading: "Booking Automation in Action",
  proof: [
    {
      label: "Custom Booking Systems for Clinics & Salons",
      href: "/en/our-services",
      note: "Bespoke online reservation software with automated SMS/WhatsApp reminders and multi-staff calendars.",
    },
  ],
  faqHeading: "Frequently Asked Questions on Reducing No-Shows",
  faq: [
    {
      q: "Is WhatsApp messaging better than traditional SMS for reminders?",
      a: "Yes. WhatsApp supports interactive one-tap confirmation buttons, displays branding/logos, and operates at a fraction of SMS carrier costs. SMS remains an excellent secondary fallback for clients without active data connections.",
    },
    {
      q: "Will requiring a deposit deter new clients from booking?",
      a: "Not if it is communicated transparently (the deposit is credited toward the final bill and fully refunded if cancelled with reasonable notice). It primarily filters out frivolous bookings and protects your team's earning capacity.",
    },
    {
      q: "What is the optimal timing for sending appointment reminders?",
      a: "The industry gold standard is a first reminder with a confirmation prompt sent 24 to 48 hours in advance, followed by a purely informational reminder 2 hours prior with directions and arrival instructions.",
    },
    {
      q: "Can a custom booking system integrate with Google Calendar?",
      a: "Yes, modern booking platforms feature two-way Google Calendar synchronization: personal events added to Google Calendar automatically block availability on the public booking engine, preventing overlaps.",
    },
  ],
  cta: { label: "Discuss Your Custom Booking Solution", href: "/en/contact-us" },
  secondaryCta: { label: "View Our Development Work", href: "/en/our-projects" },
  related: ["/en/our-services", "/en/our-projects"],
};

export const modernWebsiteMustHavesGuideEn: Guide = {
  path: "/en/what-every-business-website-must-have",
  eyebrow: "Website Architecture",
  title: "What Every High-Converting Business Website Must Have in 2026",
  metaDescription:
    "What a modern company website must feature to generate qualified leads instead of acting as a dead digital brochure: clear 3-second value proposition, social proof, and mobile CTAs.",
  h1: "What Every High-Converting Business Website Must Have",
  lead:
    "A modern company website in 2026 is not a digital brochure with vague text, but an active sales channel that answers three questions within 3 seconds: what exact problem do you solve, for whom, and what is the next step? Without a dominant mobile CTA, transparent workflow steps, and verifiable proof, visitors leave without inquiring.",
  keywords: [
    "what every business website must have",
    "high converting company website",
    "b2b website structure checklist",
    "generate leads from website",
    "modern business website blueprint",
    "website conversion optimization",
  ],
  background: "aurora",
  updated: "2026-09-27",
  sections: [
    {
      heading: "1. The Hero Section: Concrete Problem Solving Over Generic Slogans",
      body: [
        "Too many corporate websites open with platitudes like 'Welcome to our website' or 'Your partner for innovative solutions'. Prospective clients need to know within 3 seconds whether you can solve their exact challenge.",
      ],
      bullets: [
        "Precise Value Proposition: e.g., 'Turnkey Industrial Warehouses Designed and Built in Under 90 Days'.",
        "Succinct subheadline explaining your target audience and distinct advantage without technical jargon.",
        "One dominant Call-to-Action (CTA) visible on mobile screens immediately without scrolling.",
      ],
    },
    {
      heading: "2. Verifiable Social Proof and Quantified Outcomes",
      body: [
        "Prospects no longer believe unverified marketing claims. Authentic photography, hard numbers, and attributed client testimonials are the bedrock of conversion.",
      ],
      bullets: [
        "Real photographs of completed projects, workshops, and teams rather than sterile stock photos.",
        "Attributed client testimonials featuring full names, headshots, and company credentials.",
        "Concrete metrics: completed builds, years of operation, average project delivery speed, or client cost savings.",
      ],
    },
    {
      heading: "3. Transparent 3-Step Engagement Process",
      body: [
        "The primary psychological barrier to submitting an inquiry is fear of the unknown: What happens next? Will a pushy salesperson call me? When do I get pricing? Transparency removes friction.",
      ],
      bullets: [
        "Step 1 — Initial Contact: Submit brief requirements or schedule a quick discovery call.",
        "Step 2 — Fixed-Price Proposal: Receive a detailed scope of work, timeline, and exact quote within 24–48 hours.",
        "Step 3 — Execution & Delivery: Transparent milestone-driven implementation through to final handover.",
      ],
    },
    {
      heading: "4. Friction-Free Contact Channels on Mobile Devices",
      body: [
        "Bloated contact forms with 8 or more mandatory fields decimate conversion rates on mobile devices. Today's buyers demand instant, effortless inquiry paths.",
      ],
      bullets: [
        "Sticky buttons for one-tap phone calls or WhatsApp chats anchored at the bottom of mobile viewports.",
        "Streamlined inquiry forms capped at 2 to 3 fields (Name, Phone/Email, brief project description).",
        "Clear response guarantee (e.g., 'Inquiries answered within 24 business hours').",
      ],
    },
    {
      heading: "5. Technical Foundations: Speed, Accessibility, and AI Search Readiness",
      body: [
        "Visually striking designs fail if the page takes 5 seconds to load or cannot be parsed by generative engines such as ChatGPT Search, Perplexity, and Google AI Overviews.",
      ],
      bullets: [
        "Sub-1.5 second mobile load speeds with green Core Web Vitals scores.",
        "Schema.org structured data (Organization, LocalBusiness, Service, FAQPage) for seamless AI citation.",
        "Clean, semantic markup, full SSL encryption, and strict privacy compliance (GDPR).",
      ],
    },
  ],
  proofHeading: "Demonstrated Client Work",
  proof: [
    {
      label: "View Completed Projects & Case Studies",
      href: "/en/our-projects",
      note: "Custom websites and web applications built on Next.js engineered for speed and inquiry conversion.",
    },
  ],
  faqHeading: "Frequently Asked Questions About Business Websites",
  faq: [
    {
      q: "How many pages should an effective small-to-medium business website have?",
      a: "For most B2B and service firms, 5 to 8 focused pages perform best: Homepage, individual Core Service pages, About/Team, Case Studies, and Contact. Five high-converting, authoritative pages consistently outperform twenty thin generic ones.",
    },
    {
      q: "Why is Generative Engine Optimization (GEO) essential today?",
      a: "More decision-makers now ask ChatGPT, Perplexity, or Google AI Overviews for vendor recommendations instead of scrolling traditional links. Structuring your website with clear, answer-first content allows AI crawlers to parse and recommend your company as an authority.",
    },
    {
      q: "Should businesses publish prices or pricing ranges on their website?",
      a: "Yes. Providing realistic starting prices or typical ranges ('Projects typically range from $3,000 to $7,000') filters unqualified tire-kickers and builds instant trust with serious buyers who value price transparency.",
    },
    {
      q: "How long does a professional custom website build take?",
      a: "A comprehensive custom build with bespoke design, conversion-focused copywriting, and technical SEO typically requires 3 to 6 weeks. Faster turnaround claims usually rely on pre-made templates that underperform.",
    },
  ],
  cta: { label: "Request a Free Website Assessment", href: "/en/contact-us" },
  secondaryCta: { label: "Explore Our Core Services", href: "/en/our-services" },
  related: ["/en/our-services", "/en/our-projects"],
};
