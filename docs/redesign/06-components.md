# 06 — Component Inventory

Source key: **M** = custom build with Motion (`motion/react`), **RB** = React Bits (copy TS + Tailwind variant into `src/components/effects/`), **21** = 21st.dev (install via the shadcn registry command on its page into `src/components/blocks/`), **SH** = existing shadcn primitive.

Every imported component is restyled to our tokens before use: replace demo colors with CSS variables, remove unused props, add reduced-motion handling.

## Layout

| Component | Source | Used in | Notes |
|-----------|--------|---------|-------|
| `SiteNav` | 21 (floating / tubelight navbar) + M | All | Hide on scroll down. Active underline via `layoutId`. Products dropdown with `SH navigation-menu`. |
| `MobileMenu` | SH `sheet` + M | All | Staggered link entrance. |
| `SiteFooter` | 21 (footer block) + M | All | Giant wordmark with mouse-follow copper mask. |
| `ThemeToggle` | M | Nav, footer | Sun/moon morph. Uses `next-themes`. |
| `Section` | Custom | All | Wrapper: container, padding, eyebrow + title slot. |
| `Eyebrow` | Custom | All | Mono label with plate chevron, `01 — PRODUCTS` format. |
| `Grain` | Custom SVG | Root layout | Fixed noise overlay. |
| `PageTransition` | M | `template.tsx` | Fade + rise. |

## Brand

| Component | Source | Notes |
|-----------|--------|-------|
| `PlateMark` | Custom | Two plate images (or SVG) as one mark. Sizes 24 / 32 / 48. |
| `PlateAssembly` | M (rebuilt from current `logo-animation.tsx`) | Hero brand moment. Plates fly in, lock, then mouse parallax with `useSpring`. Once per session (`sessionStorage`), static on reduced motion. |
| `PlateChevron` | Custom SVG | Bullet and marker icon. |

## Text effects

| Component | Source | Used in |
|-----------|--------|---------|
| `SplitText` | RB | Hero headline, page titles |
| `BlurText` | RB | Section titles |
| `ScrollReveal` (word opacity) | RB or M | Home statement |
| `RotatingText` | RB | Careers band |
| `CountUp` | RB | Numbers section |
| `ShinyText` | RB | "Live now" label, small badges only |

## Backgrounds

| Component | Source | Used in | Notes |
|-----------|--------|---------|-------|
| `Silk` or `Threads` | RB | Home hero only | WebGL. Copper tint from tokens. Pause off screen. Fallback: radial copper gradient. Choose one after a test on a mid-range Android phone. |
| `RadialGlow` | Custom CSS | Other page heroes | Cheap CSS gradient, no WebGL. |

## Cards and interactive

| Component | Source | Used in |
|-----------|--------|---------|
| `ProductPanel` | M | Home showcase, Products page |
| `StickyStack` | M (or RB ScrollStack) | Home showcase |
| `DeviceFrame` | Custom | Phone and browser frames for screenshots |
| `GlareHover` | RB | Device frames |
| `SpotlightCard` | RB | Bento cells, career cards |
| `BentoGrid` | 21 | How we build |
| `AnimatedBeam` | 21 | "One shared core" diagram |
| `Magnet` | RB | Hero primary CTA |
| `ScrollVelocity` | RB | Category marquee |
| `ProductPill` | Custom | Hero "Live now" strip, nav dropdown |
| `DragCarousel` | M (`drag="x"` + constraints) | Products page galleries |
| `RoleRow` | Custom + SH `sheet` | Careers |
| `StatItem` | Custom + CountUp | Numbers |

## Forms

| Component | Source | Notes |
|-----------|--------|-------|
| `Input`, `Label`, `Textarea`, `Select` | SH | Restyled. |
| `ContactForm` | Custom | Server action, `useActionState`, inline errors with `aria-describedby`. |
| `EmailCapture` | Custom | Lab section. |

## Buttons

| Variant | Look |
|---------|------|
| `primary` | Copper fill, `--primary-foreground` text, pill, arrow slides right on hover. |
| `ghost` | Transparent, hairline border, fill `--surface-2` on hover. |
| `link` | Copper text, underline grows from left. |
| `product` | Uses product accent via CSS variable `--product-accent` set on the panel. |

## Delete

`dotted-surface.tsx`, `splite.tsx`, `spotlight.tsx` (replaced by RB SpotlightCard), `radial-orbital-timeline.tsx`, `timeline.tsx`, `grid-card.tsx`, `grid-pattern.tsx`, `footer-section.tsx`, current `logo-animation.tsx` after `PlateAssembly` replaces it.
