# FAS FAS Labs — Website Redesign

Planning docs for a full rebuild of the FAS FAS Labs website. Read in order.

| # | File | What it covers |
|---|------|----------------|
| 01 | [01-audit.md](01-audit.md) | What is wrong with the current site and what we keep |
| 02 | [02-references.md](02-references.md) | What we take from hubx.co and codeway.co |
| 03 | [03-brand-and-voice.md](03-brand-and-voice.md) | Positioning, tagline, tone, naming |
| 04 | [04-design-system.md](04-design-system.md) | Color tokens (light + dark), type, spacing, radius, motion rules |
| 05 | [05-sitemap-and-pages.md](05-sitemap-and-pages.md) | Routes and section-by-section layout of every page |
| 06 | [06-components.md](06-components.md) | Component inventory mapped to React Bits, 21st.dev and Motion |
| 07 | [07-content.md](07-content.md) | All page copy, including the three products |
| 08 | [08-tech-plan.md](08-tech-plan.md) | Stack, folder structure, build phases, performance, SEO, a11y |

## Decisions already made

- **Theme:** dark only (owner decision, 11 Oct 2026). Light mode and the theme toggle were removed.
- **Accent:** copper/bronze, taken from the two logo plates in `public/logo-plates/`.
- **Scope of first build:** Home, Products, About, Careers, Contact. Privacy and Terms as simple stubs.
- **Products to feature:** Jyotishly (Vedic astrology app), PlacementQuest (placement test prep), ArrowTheGame (arrow puzzle game).
- **UI sources:** Motion (motion.dev, `motion/react`) for all animation, React Bits (reactbits.dev) for text/background effects, 21st.dev for layout blocks (navbar, bento, footer). Everything is restyled to our tokens; nothing ships with its demo colors.
- **Start from scratch:** new page code. Only the logo plate PNGs and a few shadcn primitives carry over (see 01-audit.md).

## Build status (11 Oct 2026)

Built: Home, Products, About, Careers, Contact, Privacy, Terms, 404, sitemap, robots, OG image, favicon. `npm run build` passes; all routes are static.

Differences from the plan:

- React Bits and 21st.dev pieces (SplitText, ScrollReveal, ScrollVelocity, Magnet, SpotlightCard, CountUp, RotatingText, Silk, Animated Beam, bento) are re-implemented in `src/components/effects/` with Motion and plain WebGL, not copied from the registries. No new dependencies; the Silk hero shader has no three.js/ogl.
- Theme switching uses a small inline script plus `ThemeToggle` instead of `next-themes`.
- No page-transition template (it would delay first paint).
- The contact form validates, then opens the visitor's mail app (mailto). Swap for a server action when an email provider is chosen.
- No "In the lab" section, since no unreleased product is public yet.
- Jyotishly has no screenshot (site blocked on our network). Its phone screen is drawn in code (`jyotishly-screen.tsx`) and its icon is a placeholder SVG. Replace both with real assets.
- The old site is backed up in `../_legacy-site-backup/` (outside the project).

## Open questions (need answers before build)

1. **Company facts:** filled from the GST certificate (REG-06): trade name FAS FAS Labs, proprietorship of Saurabh Rajput, Ahmedabad, Gujarat, registered 24 June 2026, GSTIN 24DRGPR3134E1ZZ. From the owner (10 Oct 2026): team of 7, India only, domain www.fasfaslabs.com, no open roles, contact kzaaltech@gmail.com (given as "gmal.com", assumed typo). User counts unknown, so the stats row shows builders, products, founding year and "Made in India". Screenshots captured by headless Chrome into `public/products/<slug>/`. The street address and the proprietor photo stay off the site (the address looks residential); the site shows the city only.
2. **Jyotishly details:** the site is blocked on our network (Fortinet filter), so copy is drafted from "Vedic astrology app". Need: main features, platforms (web / Android / iOS), store links, brand color, one screenshot.
3. **Product screenshots:** one hero screenshot per product (desktop or phone, PNG/WebP, at least 1600px wide). Without them we use styled mock frames.
4. **Name meaning:** does "FAS FAS" have a meaning we should tell (for example, "fast, fast")? The tagline leans on speed; confirm that is OK.
5. **Careers:** are there open roles now? If none, the Careers page becomes "Write to us" with an email.
6. **Contact:** public email, social handles (LinkedIn, X, Instagram, YouTube), and company legal name for the footer.
7. **Domain:** final domain for metadata, sitemap and Open Graph images.
