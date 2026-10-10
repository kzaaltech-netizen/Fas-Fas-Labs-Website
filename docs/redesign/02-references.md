# 02 — Reference Sites

Both references are app-studio holding companies. We are smaller, so we borrow structure and confidence, not scale claims.

## hubx.co

- **Hero:** one short claim ("The science behind the apps.") plus one CTA ("Discover the Hub").
- **Model story:** "Design. Build. Launch. Scale." Autonomous studios share one central hub (data, tools, people).
- **Proof:** 350M+ users, 190 countries.
- **Tech section:** names its in-house revenue engine (RevenueX) to show depth.
- **News cards** and an **open positions** list straight on the home page.
- **Footer:** grouped links, beta-tester email signup, socials.

**Take:** the "shared core powers many products" story; a named in-house tech piece; careers visible on the home page.

## codeway.co

- **Hero:** tagline + headline + one-line proof ("600M+ Downloads. 60+ Apps. Bootstrapped.").
- **Big stats row** right after the hero.
- **Principles** in three short lines (ownership, double down, work backwards).
- **Verticals showcase:** each vertical has a logo, one-line description, category tag, app screenshots and a "+N more" counter.
- **HQ structure:** what the central team does.
- **Careers close:** repeats the tagline as the final CTA.
- **Style:** large bold display type, deliberate line breaks, italic emphasis on key words, screenshot-led cards.

**Take:** the tagline-headline-proof hero pattern; display type with italic emphasis; screenshot-led product cards with a category tag; the tagline repeated as the closing CTA.

## What we do differently

- **Three products, shown properly.** They cannot hide behind unlabeled icons. Each product gets a full showcase panel with its own accent color, screenshots and a direct link.
- **Honest scale.** No inflated numbers. If numbers are small, we lead with product quality and speed of shipping instead.
- **Brand motif.** The two copper plates appear in the hero, as section dividers, in hover states and in the footer wordmark. Neither reference has a mark this distinct; use it.
- **Light and dark** themes, both fully designed.

## UI library references

| Source | Use it for |
|--------|-----------|
| **Motion** (motion.dev, `motion/react`) | All custom animation: scroll-linked transforms, layout animations, page transitions, hover springs. |
| **React Bits** (reactbits.dev) | Text effects (SplitText, BlurText, ScrollReveal, CountUp, ShinyText), backgrounds (Silk, Threads, Grain/Noise), interactive bits (Magnet, SpotlightCard, ScrollVelocity, LogoLoop). Copy the TS + Tailwind variant. |
| **21st.dev** | Layout blocks installed through the shadcn registry: floating navbar, bento grid, feature sections, footers, glowing card borders, marquees. Install with the `npx shadcn@latest add <registry-url>` command shown on each component page. |

Rule: pick a component only if it serves a section in 05-sitemap-and-pages.md. No effect for its own sake. At most one heavy (WebGL) effect per page.
