# 04 — Design System

All values live as CSS variables in `src/app/globals.css` and are exposed to Tailwind 4 via `@theme inline`. Components use tokens only. No raw hex or `neutral-*` classes in components.

## 1. Color

### Brand copper scale (shared by both themes)

| Token | Hex | Use |
|-------|-----|-----|
| `--copper-50` | `#FBF3EC` | Tinted fills (light) |
| `--copper-100` | `#F3DFCC` | Badges (light) |
| `--copper-200` | `#E8C2A0` | |
| `--copper-300` | `#E2A574` | Accent text on dark |
| `--copper-400` | `#D18D58` | |
| `--copper-500` | `#C8814A` | Primary accent (dark theme buttons, highlights) |
| `--copper-600` | `#A8622F` | Primary accent (light theme buttons) |
| `--copper-700` | `#94532A` | Accent text on light |
| `--copper-800` | `#6E3D20` | |
| `--copper-900` | `#3A2112` | Tinted fills (dark) |

### Semantic tokens

| Token | Light | Dark | Notes |
|-------|-------|------|-------|
| `--background` | `#F6F1E8` warm cream | `#0B0A09` warm black | Page canvas |
| `--surface` | `#FFFFFF` | `#141210` | Cards |
| `--surface-2` | `#EFE8DC` | `#1C1916` | Raised / hover |
| `--foreground` | `#16120E` | `#F4EEE6` | Body and headings |
| `--muted-foreground` | `#6B6258` | `#A39A8F` | Secondary text |
| `--border` | `rgb(22 18 14 / 0.10)` | `rgb(244 238 230 / 0.08)` | Hairlines |
| `--border-strong` | `rgb(22 18 14 / 0.18)` | `rgb(244 238 230 / 0.16)` | Inputs, focused cards |
| `--primary` | `--copper-600` | `--copper-500` | Buttons, links |
| `--primary-foreground` | `#FFFFFF` | `#0B0A09` | Text on primary |
| `--accent-text` | `--copper-700` | `--copper-300` | Copper words in body text |
| `--ring` | `--copper-600` | `--copper-300` | Focus ring, 2 px, 2 px offset |
| `--grain-opacity` | `0.035` | `0.05` | Noise overlay strength |

Contrast (checked): `--accent-text` on `--background` is about 5.3:1 light and 9:1 dark, so it passes AA for body text. `--primary` copper-600 on cream is about 4.2:1, so use it for large text, buttons and icons only, never small body text.

### Product accents

Used **only** inside each product's own showcase panel, product page section and product card hover. Confirm against each product's real brand.

| Product | Accent | Panel background light / dark | Source |
|---------|--------|-------------------------------|--------|
| Jyotishly | Saffron `#E8A33D` + deep indigo `#2B2A6B` | `#F4EFFA` / `#13122B` | TODO(confirm) — site blocked, guessed from category |
| PlacementQuest | Mint `#3FA37A` | `#ECF1EC` / `#1A2029` | Panel colors from the site's `theme-color` meta. Accent TODO(confirm) |
| ArrowTheGame | Ember `#E2572B` | `#F6F1E8` / `#1E1B18` | Panel colors from the site's `theme-color` meta. Accent TODO(confirm) |

## 2. Typography

Loaded through `next/font/google`, self-hosted, `display: swap`.

| Role | Font | Weights | Notes |
|------|------|---------|-------|
| Display | **Bricolage Grotesque** | 500, 700, 800 | Headlines. Tight tracking (-0.03em). |
| Emphasis | **Instrument Serif** | 400 italic | One or two words per headline, copper `--accent-text`. |
| Body | **Geist** | 400, 500, 600 | UI and paragraphs. |
| Mono | **Geist Mono** | 400 | Eyebrows, tags, numbers in stats. Uppercase, +0.08em tracking. |

### Type scale (fluid with `clamp`)

| Token | Size | Line height | Use |
|-------|------|-------------|-----|
| `display-xl` | `clamp(3.5rem, 9vw, 8.5rem)` | 0.92 | Hero headline, footer wordmark |
| `display-lg` | `clamp(2.75rem, 6vw, 5.5rem)` | 0.98 | Section titles |
| `display-md` | `clamp(2rem, 4vw, 3.5rem)` | 1.05 | Product names, page titles |
| `h3` | `1.5rem` | 1.2 | Card titles |
| `body-lg` | `1.25rem` | 1.55 | Intros, statements |
| `body` | `1rem` | 1.6 | Default |
| `small` | `0.875rem` | 1.5 | Meta |
| `eyebrow` | `0.75rem` mono | 1.2 | Section labels like `01 — PRODUCTS` |

Max line length for paragraphs: 62ch.

## 3. Layout and spacing

- Container: `max-w-[1280px]`, side padding 16 px (mobile), 24 px (tablet), 40 px (desktop).
- 12-column grid on desktop, 4 on mobile. Gap 24 px.
- Spacing scale: Tailwind default (4 px base). Section vertical padding: `py-24` mobile, `py-36` desktop.
- Breakpoints: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`). Design mobile first. No horizontal scroll at 360 px.

## 4. Radius, borders, shadow

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 8 px | Inputs, tags |
| `--radius-md` | 14 px | Buttons (pill buttons use `rounded-full`) |
| `--radius-lg` | 24 px | Cards |
| `--radius-xl` | 36 px | Product showcase panels |

- Borders are 1 px hairlines in `--border`. Prefer borders over shadows.
- Shadows: one soft shadow only for floating elements (navbar, dropdowns): `0 8px 30px rgb(0 0 0 / 0.08)` light, `0 8px 30px rgb(0 0 0 / 0.5)` dark.
- Global grain overlay: fixed SVG noise at `--grain-opacity`, `pointer-events-none`. Adds warmth to flat fills.

## 5. Motion

Library: `motion/react` (Motion 12). React Bits pieces that use GSAP are allowed only if no Motion version exists; prefer Motion versions.

### Tokens

| Token | Value | Use |
|-------|-------|-----|
| `ease-out-expo` | `[0.16, 1, 0.3, 1]` | Reveals, entrances |
| `ease-in-out` | `[0.65, 0, 0.35, 1]` | Layout, page transitions |
| `spring-soft` | `{ type: "spring", stiffness: 220, damping: 30 }` | Hover, magnet, toggles |
| `dur-fast` | 0.2 s | Hover color, focus |
| `dur-base` | 0.5 s | Element reveals |
| `dur-slow` | 0.9 s | Headline reveals, hero |
| `stagger` | 0.06 s | Words / list items |

### Rules

1. Reveal on scroll once (`whileInView`, `viewport={{ once: true, margin: "-10%" }}`). Fade + 24 px rise + slight blur (8 px to 0).
2. Animate only `transform`, `opacity` and `filter`. Never width, height, top or left.
3. Respect `prefers-reduced-motion`: use `useReducedMotion()`; replace movement with a plain fade; stop marquees and WebGL backgrounds (show a static gradient).
4. No animation blocks reading or scrolling. The hero intro is under 1.2 s and runs in parallel with content becoming interactive.
5. One heavy effect (WebGL background) per page, paused when off screen (`IntersectionObserver`) and on `document.hidden`.
6. Hover effects only on `(hover: hover)` devices. Touch devices get press states (`whileTap` scale 0.98).

## 6. Iconography

`lucide-react`, 1.5 px stroke, sized 16 / 20 / 24. Arrow-up-right (`ArrowUpRight`) for external product links. Custom two-plate chevron SVG for bullets and section markers.

## 7. Theme switching

- `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`.
- Remove the hardcoded `dark` class from `<html>`; add `suppressHydrationWarning`.
- Toggle in navbar and footer: sun/moon icon morph with Motion, `aria-label="Switch to light theme"` / `"Switch to dark theme"`.
- Every section and screenshot frame must be checked in both themes before merge.
