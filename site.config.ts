/**
 * ────────────────────────────────────────────────────────────────────────────
 *  site.config.ts — Single source of truth for all website content
 * ────────────────────────────────────────────────────────────────────────────
 *
 *  Every string, list, and link you see on the CognitionSync site is defined
 *  in this file. To edit copy, phone numbers, links, FAQ items, services,
 *  case studies, footer columns, SEO tags, etc. — change them HERE.
 *  Nothing else needs to be touched. Styling and layout live in the
 *  components under `client/src/components/`.
 *
 *  Sections below are ordered top-to-bottom to match how the page is rendered.
 * ────────────────────────────────────────────────────────────────────────────
 */

// The set of Lucide icons available for use in `services.items[].icon`.
// If you want to use a new icon, add its name here AND register it in
// `client/src/components/services-section.tsx` (search for `iconMap`).
export type ServiceIconName =
  | "Compass"
  | "Sparkles"
  | "LineChart"
  | "ScanEye"
  | "Bot"
  | "Database";

type LinkRef = { label: string; targetId: string };
type ExternalLink = { label: string; href: string };

export const siteConfig = {
  // ──────────────────────────────────────────────────────────────────────────
  //  BRAND — name shown in the logo/wordmark and short blurb used in footer.
  // ──────────────────────────────────────────────────────────────────────────
  brand: {
    name: "CognitionSync",
    blurb:
      "An applied-AI studio. We design, build, and deploy AI systems that work in production.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  SEO — injected into <head> of index.html at build time via a Vite plugin.
  // ──────────────────────────────────────────────────────────────────────────
  seo: {
    title: "CognitionSync — Applied AI, built for production",
    description:
      "CognitionSync is an applied-AI studio. We design, build, and deploy AI systems that work in production — from strategy and LLMs to computer vision, agents, and MLOps.",
    keywords:
      "applied AI, AI consulting, generative AI, LLM development, machine learning engineering, computer vision, AI agents, MLOps, AI strategy",
    ogTitle: "CognitionSync — Applied AI, built for production",
    ogDescription:
      "We design, build, and deploy AI systems that work in production. Strategy, LLMs, computer vision, agents, and the infrastructure to run them.",
    themeColor: "#F9F7F3",
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  CONTACT INFO — used by the contact section and the footer socials.
  //  Replace the `#` placeholders with real URLs when ready.
  // ──────────────────────────────────────────────────────────────────────────
  contactInfo: {
    email: "cognitionsync@gmail.com",
    // Point this at a Calendly / Cal.com link when live. Falls back to scrolling
    // to the contact form when set to "#contact".
    calendarUrl: "https://calendly.com/akifejaz/30min",
    socials: {
      linkedin: "#",
      github: "https://github.com/cognitionsync",
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  NAVIGATION — top bar links + primary CTA button.
  //  `targetId` refers to the id="" attribute on a <section> in the page.
  // ──────────────────────────────────────────────────────────────────────────
  nav: {
    links: [
      { label: "Services", targetId: "services" },
      { label: "Approach", targetId: "approach" },
      { label: "Work", targetId: "work" },
      { label: "About", targetId: "about" },
    ] as LinkRef[],
    cta: { label: "Let's talk", targetId: "contact" } as LinkRef,
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  HERO — the first thing visitors read. Keep the headline short (≤8 words).
  // ──────────────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "Applied AI Studio",
    headline: "Applied AI, built for production.",
    sub: "We design, build, and deploy AI systems that create durable value — from strategy and LLMs to computer vision, agents, and the infrastructure that runs them.",
    ctaPrimary: { label: "Start a conversation", targetId: "contact" } as LinkRef,
    ctaSecondary: { label: "See our work", targetId: "work" } as LinkRef,
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  TRUST STRIP — thin band under the hero listing industries served.
  // ──────────────────────────────────────────────────────────────────────────
  trustStrip: {
    label: "Partnering with teams across",
    items: [
      "Financial Services",
      "Healthcare",
      "Retail & E-commerce",
      "Logistics",
      "SaaS",
      "Public Sector",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  SERVICES — the six capability cards. `icon` must match a ServiceIconName.
  // ──────────────────────────────────────────────────────────────────────────
  services: {
    eyebrow: "Services",
    title: "What we build",
    subtitle:
      "Six focused capabilities across the AI lifecycle. We work on the whole path — or the part you need most.",
    items: [
      {
        icon: "Compass",
        name: "AI Strategy & Advisory",
        desc: "Define where AI fits, where it doesn't, and what to build first.",
      },
      {
        icon: "Sparkles",
        name: "Generative AI & LLMs",
        desc: "Custom LLM applications, RAG pipelines, and fine-tuned models for your domain.",
      },
      {
        icon: "LineChart",
        name: "ML Engineering",
        desc: "End-to-end machine learning — features, training, evaluation, and deployment.",
      },
      {
        icon: "ScanEye",
        name: "Computer Vision",
        desc: "Detection, tracking, and inspection — on-device or in the cloud.",
      },
      {
        icon: "Bot",
        name: "AI Agents & Automation",
        desc: "Autonomous workflows and multi-agent systems that take action, not just advise.",
      },
      {
        icon: "Database",
        name: "Data & MLOps Platforms",
        desc: "The infrastructure AI runs on: pipelines, monitoring, orchestration, and governance.",
      },
    ] satisfies Array<{ icon: ServiceIconName; name: string; desc: string }>,
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  APPROACH — the four-step process.
  // ──────────────────────────────────────────────────────────────────────────
  approach: {
    eyebrow: "How we work",
    title: "A clear path from problem to production",
    subtitle:
      "Senior-led, transparent, and built so you're never locked in. A working system is the only real deliverable.",
    steps: [
      { n: "01", title: "Scope",  desc: "One call to diagnose the real problem — not just the stated one." },
      { n: "02", title: "Design", desc: "A concrete plan: models, architecture, integration points, and success criteria." },
      { n: "03", title: "Build",  desc: "We ship a working system in tight iterations — not a slide deck." },
      { n: "04", title: "Enable", desc: "Handoff with documentation and a runbook, so your team fully owns it." },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  WORK — selected case studies (NDA-safe placeholders) + the pull quote.
  // ──────────────────────────────────────────────────────────────────────────
  work: {
    eyebrow: "Selected work",
    title: "Outcomes, not deliverables",
    subtitle:
      "A snapshot of the kind of work we take on. Every engagement is measured by what shipped and what it moved.",
    // Small line rendered under every case card.
    caseNote: "Client shared under NDA",
    cases: [
      {
        industry: "Financial Services",
        metric: "40% fewer manual review hours",
        desc: "An LLM copilot that triages and drafts responses inside existing review workflows.",
      },
      {
        industry: "Healthcare",
        metric: "In production in 6 weeks",
        desc: "A HIPAA-conscious document-understanding pipeline, taken from prototype to deployment.",
      },
      {
        industry: "Retail",
        metric: "Forecasts: 3 weeks → 4 days",
        desc: "A demand-forecasting system integrated cleanly with existing data infrastructure.",
      },
    ],
    quote: {
      text: "They operated like our own senior team — clear about what AI could and couldn't do, and relentless about getting it into production.",
      author: "VP of Data",
      company: "Fortune 500 retailer",
      note: "engagement under NDA",
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  ABOUT — mission blurb + numbered principles list.
  // ──────────────────────────────────────────────────────────────────────────
  about: {
    eyebrow: "About",
    title: "Substance over spectacle.",
    body: "CognitionSync exists for the gap between AI potential and AI delivery. We pair strategic judgment with senior engineering to build systems that work in production — reliably, at scale, and owned entirely by you.",
    principles: [
      "We ship production systems, not proofs-of-concept.",
      "Senior engineers on every engagement — the people you meet are the people who build.",
      "Model-, cloud-, and vendor-agnostic. We build what's right for you.",
      "You own everything: code, models, and IP.",
      "Honest about what AI can — and can't — do.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  ENGAGEMENT — three ways clients work with us.
  // ──────────────────────────────────────────────────────────────────────────
  engagement: {
    eyebrow: "Engagement",
    title: "Ways to work with us",
    subtitle: "Three simple models. No rigid price grids — we scope to the problem.",
    tiers: [
      {
        name: "Advisory",
        what: "Ongoing access to senior AI thinking — strategy, architecture reviews, and roadmap input.",
        who: "Best when you have engineers but lack AI depth.",
      },
      {
        name: "Sprint",
        what: "Defined scope, defined timeline, a working system at the end. Typically 4–10 weeks.",
        who: "Best for proving value fast.",
      },
      {
        name: "Embedded",
        what: "Our team inside yours — we ship alongside you and transfer knowledge as we go.",
        who: "Best for sustained, hands-on build.",
      },
    ],
    tierCta: { label: "Talk to us", targetId: "contact" } as LinkRef,
    note: "Not sure which fits? We'll tell you in 15 minutes.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  FAQ — accordion list.
  // ──────────────────────────────────────────────────────────────────────────
  faq: {
    eyebrow: "FAQ",
    title: "Questions we hear often",
    items: [
      { q: "Who owns the IP and outputs?",              a: "You do — fully. We retain no rights to what we build for you." },
      { q: "Do you use our data to train your own models?", a: "No. Your data stays yours and is never used outside your engagement." },
      { q: "Which AI models do you use?",               a: "We're model-agnostic. We recommend based on your use case, cost profile, and compliance needs — not vendor preference." },
      { q: "How long does a typical engagement take?",  a: "Sprints run 4–10 weeks. Embedded engagements usually show results within the first 30 days." },
      { q: "Can you integrate with our existing stack?", a: "Yes. We assess your environment during the Scope phase and design integration into the plan from day one." },
      { q: "What happens when the engagement ends?",    a: "We hand off with documentation and a runbook your team can operate independently. No lock-in." },
      { q: "How do you handle data security?",          a: "We work within your security perimeter, sign NDAs and DPAs before any data is shared, and follow SOC 2-aligned practices." },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  CONTACT SECTION — heading, subtitle, and every string used by the form.
  // ──────────────────────────────────────────────────────────────────────────
  contact: {
    eyebrow: "Contact",
    title: "Let's build something that works.",
    subtitle:
      "Tell us what you're working on. No obligation, no sales runaround — just a straight conversation about whether we can help.",
    form: {
      // ── Delivery ──────────────────────────────────────────────────────────
      //  Submissions are POSTed as JSON to Formtorch, which stores them and
      //  emails the form owner. Manage them at https://formtorch.com.
      //
      //  The form id in this URL is the credential. It is PUBLIC by design —
      //  it ships inside the client bundle and only permits writing to this
      //  one form — so it is safe to commit.
      //
      //  Verified response contract:
      //    200 → { success: true,  submissionId, message }
      //    4xx → { success: false, errorCode, message }
      endpoint: "https://formtorch.com/f/an5vy1irpx",
      // Sent as Formtorch's reserved `_subject` field: `New enquiry from {name}`
      subjectPrefix: "New enquiry from",

      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Work email",
      emailPlaceholder: "you@company.com",
      companyLabel: "Company",
      companyOptionalSuffix: "(optional)",
      companyPlaceholder: "Company",
      messageLabel: "What are you working on?",
      messagePlaceholder: "A sentence or two about your goal is plenty.",
      submitLabel: "Send message",
      submittingLabel: "Sending…",
      successTitle: "Message sent.",
      successDescription: "We'll reply within one business day.",
      errorTitle: "Something went wrong",
      // Rendered as: `Email us directly at {contactInfo.email}`
      errorDescriptionPrefix: "Email us directly at",
      validation: {
        nameMin: "Please enter your name",
        emailInvalid: "Enter a valid work email",
        messageMin: "Tell us a little more (10+ characters)",
      },
    },
    // Small link shown below the form.
    calendarLabel: "Book a 30-min call",
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  FOOTER — link columns + legal strip.
  // ──────────────────────────────────────────────────────────────────────────
  footer: {
    columns: [
      {
        title: "Services",
        links: [
          { label: "AI Strategy & Advisory", targetId: "services" },
          { label: "Generative AI & LLMs",   targetId: "services" },
          { label: "ML Engineering",         targetId: "services" },
          { label: "Data & MLOps",           targetId: "services" },
        ] as LinkRef[],
      },
      {
        title: "Company",
        links: [
          { label: "About",    targetId: "about" },
          { label: "Approach", targetId: "approach" },
          { label: "Work",     targetId: "work" },
          { label: "Contact",  targetId: "contact" },
        ] as LinkRef[],
      },
    ],
    legal: {
      // Rendered as: `© {YEAR} {brand.name}. {copyrightSuffix}`
      copyrightSuffix: "All rights reserved.",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms",   href: "#" },
      ] as ExternalLink[],
      note: "NDA on request",
    },
  },
};
