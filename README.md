# Stratum — Marketing Website

A B2B marketing website for **Stratum**, a fictional DataOps platform for data engineering teams. Built as a portfolio piece to demonstrate full-stack design engineering — from system design to production-ready code.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom design tokens
- **Animation:** Framer Motion
- **Fonts:** Instrument Serif · Syne · DM Sans · DM Mono (all via `next/font/google`)

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, font setup, metadata
│   ├── page.tsx            # Home page — assembles all sections
│   ├── globals.css         # Design tokens, base styles, keyframes
│   ├── about/
│   │   └── page.tsx        # About page — story, values, team
│   └── work/
│       └── page.tsx        # Work page — case studies
└── components/
    ├── Nav.tsx             # Fixed nav with scroll-aware blur
    ├── Hero.tsx            # Hero + canvas data-flow animation
    ├── LogosBar.tsx        # Marquee logo bar, real brand colors
    ├── DataSourcesSection  # SVG animated integration diagram
    ├── PipelineSection     # Pipeline layer monitoring card
    ├── Problem.tsx         # Problem framing + terminal visual
    ├── HowItWorks.tsx      # 3-step process
    ├── Features.tsx        # 6-feature grid
    ├── Metrics.tsx         # Animated counter stats
    ├── Testimonial.tsx     # Pull-quote testimonial
    ├── Pricing.tsx         # 3-tier pricing
    ├── CTASection.tsx      # Bottom email capture with validation
    ├── CTAModal.tsx        # Validated multi-field popup form
    └── Footer.tsx          # 4-col footer with socials
```

## Design decisions

**Warm dark theme** — terracotta/clay accent (#C4622D) on near-black (#0D0E0C). Nothing else in the data tooling space uses this palette. Immediately distinctive.

**Typography** — Instrument Serif italic for emotional emphasis inside Syne's geometric weight. The pairing does things Inter could never do in this context.

**Two data visualizations:**
1. *Hero canvas* — vanilla Canvas API, animated bezier curves with colored particles flowing from 6 data sources (Postgres, Snowflake, BigQuery, S3, Kafka, MongoDB) into a central Stratum hub. GPU-efficient (no heavy libs).
2. *DataSourcesSection SVG* — SVG `<animateMotion>` with `<mpath>` for silky dot animation along curved paths. No JavaScript required for this one.

**Form validation** — CTAModal validates on blur (not just submit), blocks personal email domains, shows inline animated error messages, and gives a proper success screen. CTASection email capture validates the same way.

**Syne descender fix** — `overflow: visible` + `padding-bottom: 2px` on all heading elements prevents 'g', 'y', 'p' from being clipped at tight line-heights.

## What this demonstrates

- Component architecture in Next.js App Router
- TypeScript throughout
- Tailwind with a real design system (not arbitrary values everywhere)
- Framer Motion for scroll-triggered reveals, modal animations, and success transitions
- Canvas API for custom animation without a charting library
- SVG animation with `<animateMotion>` and `<mpath>`
- Form validation with real UX (blur-based, domain blocking, loading states)
- Accessible markup (role, aria-modal, aria-label, aria-alert on errors)
- Responsive layout: single column on mobile, multi-column on desktop
