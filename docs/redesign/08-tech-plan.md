# 08 — Technical Plan

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router), React 19, React Compiler. **Read `node_modules/next/dist/docs/` before writing code** (AGENTS.md: this version has breaking changes). |
| Styling | Tailwind CSS 4, tokens in `globals.css` (`@theme inline`) |
| Primitives | shadcn on Radix |
| Animation | `motion` 12 (`motion/react`) only |
| Theme | `next-themes` |
| WebGL (hero only) | `ogl` if the chosen React Bits background needs it; otherwise none |
| Forms | Server actions + `zod` validation |
| Email | Resend (or the team's provider) from the server action. TODO(confirm) |
| Analytics | Vercel Analytics or Plausible. TODO(confirm) |
| Hosting | Vercel. TODO(confirm) |

### Dependency changes

- Remove: `framer-motion`, `@splinetool/react-spline`, `@splinetool/runtime`, `three`, `@types/three`, `@base-ui/react`.
- Add: `zod`, `ogl` (only if needed), `resend` (if chosen).

## Folder structure

```
src/
  app/
    layout.tsx            # fonts, ThemeProvider, Grain, SiteNav, SiteFooter
    template.tsx          # PageTransition
    page.tsx              # Home (server component; client islands inside)
    products/page.tsx
    about/page.tsx
    careers/page.tsx
    contact/page.tsx
    contact/actions.ts    # server action
    privacy/page.tsx
    terms/page.tsx
    not-found.tsx
    opengraph-image.tsx
    sitemap.ts
    robots.ts
    globals.css
  components/
    ui/                   # shadcn primitives
    blocks/               # 21st.dev blocks (restyled)
    effects/              # React Bits pieces (restyled)
    brand/                # PlateMark, PlateAssembly, PlateChevron
    layout/               # SiteNav, SiteFooter, ThemeToggle, Section, Eyebrow, Grain
    sections/home/        # Hero, Marquee, Statement, ProductShowcase, HowWeBuild, Numbers, Lab, CareersBand
    sections/products/    # ProductDetail, DragCarousel
  content/
    products.ts           # single source of product data
    site.ts               # nav, footer, socials, company facts
  lib/
    utils.ts
    motion.ts             # easing, durations, shared variants
public/
  brand/                  # plate images (moved from logo-plates), favicon set
  products/<slug>/        # logo, screenshots (WebP/AVIF)
docs/redesign/            # these docs
```

## Rendering rules

- Pages are **server components**. Only interactive pieces are `"use client"` islands (nav, effects, forms, showcase).
- Lazy-load the WebGL background with `next/dynamic` and `ssr: false`; render the static gradient first.
- Images with `next/image`, explicit sizes, `priority` only on the hero.
- Fonts through `next/font/google`, variables on `<html>`.

## Build phases

| Phase | Output | Done when |
|-------|--------|-----------|
| 0. Setup | `npm install`; read Next 16 docs; remove dead deps and files; tokens + fonts + theme provider | Light and dark render a token test page |
| 1. Shell | Nav, mobile menu, footer, theme toggle, grain, page transition, content files | All routes exist and link correctly |
| 2. Home | All 9 sections | Matches 05 in both themes, 360 px to 1920 px |
| 3. Products | Product page with three sections, carousels | Anchors and sticky sub-nav work |
| 4. About, Careers, Contact | Pages + working contact form | Form sends a real email |
| 5. Polish | Reduced motion, a11y pass, Lighthouse, OG images, sitemap, robots, 404 | Targets below met |

Each phase ends with a preview link for review before the next starts.

## Targets

- Lighthouse mobile: Performance ≥ 90, Accessibility 100, Best Practices 100, SEO 100.
- LCP < 2.5 s on 4G, CLS < 0.05, INP < 200 ms.
- First-load JS for Home ≤ 180 KB gzip (excluding the lazy WebGL chunk).

## Accessibility

- WCAG 2.1 AA. Contrast checked in both themes (04).
- Visible focus ring on every interactive element.
- Full keyboard navigation for the nav dropdown, mobile sheet, carousels and form.
- `prefers-reduced-motion` honored everywhere (04, Motion rules).
- Semantic landmarks: one `h1` per page, logical heading order, `nav`, `main`, `footer`.
- External product links announce "opens in new tab".

## SEO

- Per-page `metadata` with title, description, canonical, Open Graph, Twitter card.
- JSON-LD: `Organization` on Home; `SoftwareApplication` for Jyotishly and PlacementQuest, `VideoGame` for ArrowTheGame on the Products page.
- `sitemap.ts` and `robots.ts`.
- Real text in HTML (server-rendered), not only inside canvases.

## Risks

| Risk | Mitigation |
|------|-----------|
| React Bits / 21st.dev code quality varies | Review each file before use; keep it in our repo; strip unused code. |
| WebGL hero slow on low-end phones | Device check (`navigator.hardwareConcurrency`, reduced motion, save-data) → static gradient. |
| Missing screenshots and facts | Styled mock frames now; launch blocked on real facts for stats section only. |
| Next 16 API changes | Read bundled docs first; follow deprecation notices. |
