# 01 — Audit of the Current Site

Snapshot of `src/app/page.tsx` and related files, October 2026.

## What the current site is

One client-rendered page with:

1. A full-screen logo intro (two copper plates join) that locks scrolling until it finishes.
2. A floating navbar with "Product" and "Company" mega-menus.
3. A hero card: "FAS FAS Labs — A Product Based Company" with a Spline 3D robot on the right.
4. A "Capabilities" radial orbital timeline (Innovation, Design, Performance, Intelligence).
5. A company history timeline (2014 to 2027+).
6. A footer with four link columns.
7. A three.js dotted-surface background behind everything.

## Problems

### Content (most serious)

- **Copy is adapted from 1X Technologies (1x.tech).** "Redwood AI", "Robot Fleet", "Logs", "65 open roles", "Grows With You", "Abilities Keeps Growing", and the 2014 to 2027 timeline all come from 1X (see `websiteinfo.txt`). This is a credibility and legal risk. All of it goes.
- **The timeline is invented.** It claims a 2014 founding and enterprise deployments that did not happen.
- **None of our three products appear anywhere.** A product company site with no products.
- **Generic claims** ("Transforming Ideas into Reality", "ultimate digital partner") say nothing specific.
- **Metadata is the Next.js default:** title "Create Next App".

### Design

- The Spline robot has nothing to do with astrology, careers or puzzle games. It suggests a robotics company.
- Everything sits inside large bordered cards with heavy shadows. Every section looks the same, so nothing stands out.
- The copper logo color is not used anywhere else. The palette is neutral grey shadcn defaults.
- Hardcoded colors (`text-neutral-500`, `text-neutral-600`) bypass the theme.
- One typeface (Geist) for everything. No display face, so headlines lack character.
- The radial orbital timeline is hard to read and hides content behind clicks.

### Technical

- `page.tsx` is `'use client'` from the top. Nothing renders on the server, which hurts SEO and first paint.
- Two WebGL contexts run at once (three.js dotted surface plus Spline). Spline downloads several MB from a third-party host. Bad for mobile and Core Web Vitals.
- The intro animation blocks scroll on every visit.
- `<html>` hardcodes `dark`. `next-themes` is installed but not used, and light tokens are never shown.
- Both `framer-motion` and `motion` are installed. They are the same library; keep `motion` only.
- Both `@base-ui/react` and Radix are used for primitives. Pick one (Radix, via shadcn).
- Nav and footer links point to routes that do not exist (`/saas`, `/robot-fleet`, `/logs` ...). All 404.
- Social links are `#`.
- No `prefers-reduced-motion` handling.
- Leftover starter files: `public/next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`.
- `website-components/*.txt` and `websiteinfo.txt` are pasted reference snippets, not source. Move them out of the repo or into `docs/archive/`.
- `node_modules` is not installed in this checkout.

## Keep

| Item | Why |
|------|-----|
| `public/logo-plates/*.png` | The brand mark. Becomes the core visual motif. Re-export as SVG if a vector source exists. |
| Logo-assembly idea | Good brand moment. Rebuild it as a short (under 1.2 s), non-blocking hero animation, not a scroll lock. |
| shadcn primitives (`button`, `sheet`, `accordion`, `navigation-menu`) | Restyle with new tokens. |
| `lib/utils.ts` (`cn`) | Standard. |
| Next.js 16, Tailwind 4, TypeScript, React Compiler | Fine stack. Keep. |

## Remove

Spline scene, dotted-surface background, radial orbital timeline, fake history timeline, `framer-motion` dependency, `@splinetool/*`, `three` (unless a React Bits background needs it, see 06), `@base-ui/react`, starter SVGs, every piece of 1X-derived copy.
