# AscendQE 2.0 — Enterprise Quality Engineering Web Application

Modern, enterprise-ready, production-grade web application for **AscendQE 2.0**, built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Radix UI Primitives**, **Lucide Icons**, **Framer Motion**, and **React Router**.

> **Tagline:** *Code fast. Test faster.*  
> **Mission:** Your coding agents don't slow down. Your quality engineering shouldn't either.

---

## 🚀 Tech Stack Overview

| Category | Technology | Why It Was Chosen |
| :--- | :--- | :--- |
| **Framework & Build** | **React 18 + Vite + TypeScript** | Lightning fast Hot Module Replacement (HMR), optimized Rollup bundle, and strict compile-time type safety. |
| **Styling** | **Tailwind CSS** | Utility-first styling with custom design tokens matching AscendQE Navy (`#071327`) and Electric Blue (`#1763ff`). Zero CSS runtime overhead. |
| **Headless UI Primitives**| **Radix UI** | Unstyled, fully accessible (WAI-ARIA compliant) headless primitives for Accordions, Tabs, Sliders, and Dialogs. |
| **Iconography** | **Lucide React** | Consistent, modern icon set with tree-shaking support. |
| **Animations** | **Framer Motion + Embla Carousel** | Fluid micro-interactions, layout transitions, and touch-friendly carousel performance. |
| **Routing** | **React Router DOM v6** | Declarative client-side routing, deep linking, query parameter preservation, and smooth route transitions. |

---

## 📂 Enterprise Project Architecture

This codebase follows a **Feature-Driven / Layered Enterprise React Architecture**, providing high modularity, testability, and clear separation of concerns:

```
src/
├── assets/                  # Static media, SVGs, and images
├── components/              # Shared reusable components
│   ├── layout/              # Global layout shell (Header, Footer, MobileNav, ScrollToTop)
│   ├── shared/              # Reusable cross-page composite sections (SectionHeading, CtaSection, JourneyGrid)
│   └── ui/                  # Atomic design system & Radix UI primitives
│       ├── accordion.tsx    # Radix Accordion with smooth height transitions
│       ├── badge.tsx        # Eyebrow and pill labels
│       ├── button.tsx       # Accessible button with primary/secondary/dark/outline variants
│       ├── card.tsx         # Card container with surface styling
│       ├── container.tsx    # Responsive max-width wrapper
│       ├── input.tsx        # Styled form inputs & textareas
│       ├── slider.tsx       # Radix UI Range Slider
│       └── tabs.tsx         # Radix UI Tabs for workbench navigation
├── data/                    # Static datasets & content models
│   ├── docsData.ts          # Technical specifications, product brief markdown & llms.txt
│   ├── navigation.ts        # Header & footer navigation link definitions
│   ├── pricingPlans.ts      # Commercial tiers, feature lists, and FAQs
│   ├── referenceData.ts     # Complete 22-topic product & company catalog
│   ├── testimonials.ts      # Executive & client testimonials
│   └── workflowSteps.ts     # The 5-step quality workflow definition
├── features/                # Domain-specific business logic & modules
│   ├── calculator/          # Interactive Authoring Economics & ROI Calculator
│   │   ├── calculator-form.tsx    # Range slider and editable cost parameters
│   │   ├── calculator-result.tsx  # Dynamic savings metric & progress bar
│   │   └── use-calculator.ts      # Custom hook managing state & financial formulas
│   ├── docs/                # Technical Library & Specification downloads
│   │   └── docs-view.tsx          # Architecture, security scope & file downloads
│   ├── home/                # Homepage feature blocks
│   │   ├── hero-section.tsx       # Primary brand hook & dual CTAs
│   │   ├── managed-card.tsx       # Startup & lean QA team managed service
│   │   ├── ownership-card.tsx     # Private VPC platform card
│   │   ├── roi-teaser.tsx         # Economic preview card
│   │   └── testimonials.tsx       # Testimonials & experience banner
│   ├── onboarding/          # Evaluation Brief & Lead Intake
│   │   └── brief-form.tsx         # Form handling, mailto draft & local .txt download
│   ├── pricing/             # Commercial options & FAQ accordion
│   │   ├── pricing-cards.tsx      # Platform vs Managed service tier cards
│   │   └── pricing-faq.tsx        # Accordion FAQ
│   ├── reference/           # Searchable Knowledge Catalog
│   │   └── reference-catalog.tsx  # Keystroke search, categories, and expand/collapse
│   └── workflow/            # Connected Quality Workflow
│       ├── trace-diagram.tsx      # Requirement -> Module -> Test -> Evidence pipeline
│       └── workflow-workbench.tsx # Interactive 5-step tabbed workflow workbench
├── layouts/                 # RootLayout wrapper with outlet and navigation
├── pages/                   # Route view controllers
│   ├── docs-page.tsx        # /docs (Technical Library)
│   ├── home-page.tsx        # / (Platform Overview)
│   ├── not-found-page.tsx   # 404 handler
│   ├── payoff-page.tsx      # /payoff (Your Value / ROI Calculator)
│   ├── pricing-page.tsx     # /pricing (Your Options / Commercial Plans)
│   ├── proof-page.tsx       # /proof (How It Works / Workflow Workbench)
│   ├── reference-page.tsx   # /reference (Original Catalog Reference)
│   └── start-page.tsx       # /start (First 100 Free Tests Brief Generator)
├── routes/                  # React Router browser router with legacy .html redirects
├── types/                   # TypeScript interfaces, types, and domain models
├── utils/                   # Shared pure utilities (cn, formatters, download)
├── App.tsx                  # Application entry component
├── index.css                # Tailwind directives & CSS variables
└── main.tsx                 # DOM render root
```

---

## 🛠️ Key Capabilities & Interactive Features

1. **Deterministic 5-Step Workflow Workbench (`/proof` & `/`)**:
   - Interactive tabbed switcher spanning: *01 Automate*, *02 Execute*, *03 Find the gaps*, *04 Connect the impact*, and *05 Know what's next*.
   - Real-world workload context examples and contextual pipeline traceability diagram.

2. **Interactive Authoring Economics & ROI Calculator (`/payoff`)**:
   - Dynamic parameters: annual test volume ($100$ to $50,000$), current hours/case, engineer hourly rate, platform operating cost/case, and other incremental costs.
   - 1-Year vs 3-Year comparison toggle with real-time net authoring savings, baseline vs delivered cost visual comparison bar, and percentage gain.

3. **Client-Side Evaluation Brief Generator (`/start`)**:
   - Query param support (`?offer=platform` or `?offer=managed`).
   - Action 1: Prepares formatted email draft targeting `Info@ascendqe.com`.
   - Action 2: Generates and downloads a local `AscendQE-evaluation-brief.txt` file via client-side Blob.

4. **Searchable Knowledge Catalog (`/reference`)**:
   - Live keystroke search filtering across all 22 AscendQE product and company reference topics.
   - Category filtering pills (*Company*, *Products*, *Services*, *Evidence*, *Commercial*, *Policies*).
   - Global *Expand all*, *Collapse all*, and *Download brief* controls.

5. **Technical Library & AI Agent Sitemap (`/docs`)**:
   - Client-side download for `product-brief.md`.
   - Client-side download for `llms.txt` (machine-readable index for autonomous agents).

---

## 📦 Available Scripts

In the project root, you can run:

```bash
# Start local development server with instant HMR on port 3000
npm run dev

# Run TypeScript type check and compile production bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🚢 Production Deployment

The project builds to a high-performance, statically analyzable bundle inside `dist/`:

- **Vercel / Netlify**: Connect the Git repository; build command is `npm run build`, publish directory is `dist`.
- **Cloudflare Pages / AWS S3 + CloudFront**: Upload the `dist/` directory; configure SPA fallback routing to `index.html`.
- **Docker / Nginx**: Serve `dist/` using standard Nginx `try_files $uri $uri/ /index.html;`.

---

© 2026 AscendQE. Code fast. Test faster.

