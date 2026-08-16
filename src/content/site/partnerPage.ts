/**
 * White-label / overflow-work landing page for foreign dev & marketing
 * agencies looking for a subcontractor, not a lead. English only — the
 * audience never sees Serbian copy, so this page lives outside the sr/en/de
 * locale system entirely.
 */

export type PartnerSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type PartnerPage = {
  path: string;
  eyebrow: string;
  title: string;
  metaDescription: string;
  h1: string;
  lead: string;
  keywords: string[];
  sections: PartnerSection[];
  faqHeading: string;
  faq: { q: string; a: string }[];
  cta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const whiteLabelPartnerPage: PartnerPage = {
  path: "/white-label",
  eyebrow: "For agencies",
  title: "White-Label Development Partner — Adspire Digital",
  metaDescription:
    "Overflow web and software development for agencies, under your brand. Next.js, React, TypeScript, Postgres. Based in Niš, Serbia — EU timezone, direct communication, no account managers.",
  h1: "White-Label Development Partner",
  lead:
    "I build the sites, booking systems, and internal tools your agency doesn't have bandwidth for — under your name, on your terms. 13 systems are live in production for real clients right now, not portfolio mockups. If you need a developer you can hand a scope to and forget about, this is that.",
  keywords: [
    "white label web development",
    "white label development partner",
    "outsource web development Serbia",
    "web development subcontractor",
    "nearshore development EU",
    "agency overflow development",
  ],
  sections: [
    {
      heading: "What I take off your plate",
      bullets: [
        "Full website builds — Next.js / React, from a Figma file or a scope doc.",
        "Custom systems: booking, CRM, internal tools that off-the-shelf software doesn't fit.",
        "Overflow capacity for client work you've sold but don't have hands for.",
        "Ongoing maintenance and bug fixes on existing codebases, yours or a client's.",
        "Fully white-label — no branding, no signature in the code, you own the client relationship.",
      ],
    },
    {
      heading: "How it works",
      body: [
        "You send the scope. I quote and give a timeline within 48 hours. If it's a fit, we work under NDA if you want one, and I invoice you — either per project or as a standing retainer.",
      ],
      bullets: [
        "One point of contact: me, directly. No account manager, no handoff between teams.",
        "You stay the client's only contact — I don't reach out to them, don't get credited, don't exist to them.",
        "Async-friendly. CET timezone, fluent English, fast replies.",
      ],
    },
    {
      heading: "Why a solo developer, not an agency",
      bullets: [
        "13 systems in daily production use for paying clients — proof, not a portfolio of demos.",
        "Stack: Next.js, React, TypeScript, Postgres (Supabase/Neon), n8n for automation and integrations.",
        "Based in Niš, Serbia — EU-adjacent rates, EU timezone, no offshore lag.",
        "You're not routed through tiers of project managers. The person quoting the work is the person writing the code.",
      ],
    },
  ],
  faqHeading: "Questions agencies ask",
  faq: [
    {
      q: "Is this strictly white-label / NDA work?",
      a: "Yes. No public credit or portfolio mention unless you say otherwise. Happy to sign your NDA or use mine.",
    },
    {
      q: "What's the stack?",
      a: "Next.js, React, TypeScript, Postgres (Supabase or Neon), Zod, n8n for workflow automation. I can also work inside an existing codebase in a stack you already have, if it's reasonably close to this one.",
    },
    {
      q: "How fast can you start?",
      a: "Quote and timeline within 48 hours of getting a scope. Start date depends on size — usually within a week.",
    },
    {
      q: "One-off builds only, or ongoing work too?",
      a: "Both. Single projects, or a standing retainer if you have recurring overflow.",
    },
    {
      q: "Timezone and communication?",
      a: "CET (Serbia). Fluent English, async-friendly, direct replies — no support ticket layer.",
    },
  ],
  cta: { label: "Send project details", href: "/contact-us" },
  secondaryCta: { label: "See live systems", href: "/our-projects" },
};
