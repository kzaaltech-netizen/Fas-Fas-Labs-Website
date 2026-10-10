# 05 — Sitemap and Page Layouts

## Routes

| Route | Page | Priority |
|-------|------|----------|
| `/` | Home | P0 |
| `/products` | All products, one deep section each (`#jyotishly`, `#placementquest`, `#arrowthegame`) | P0 |
| `/about` | Story, how we work, team | P1 |
| `/careers` | Culture, perks, open roles or "write to us" | P1 |
| `/contact` | Contact form + direct email | P1 |
| `/privacy`, `/terms` | Plain text stubs | P2 |
| `not-found` | Custom 404 with the plates "falling apart" | P2 |

## Global elements

### Navbar (all pages)

- Floating pill, centered, `top-4`, max width 1100 px, blurred `--surface` at 70% opacity, hairline border.
- Left: two-plate mark (32 px) + "FAS FAS Labs" wordmark.
- Center: **Products** (hover/click opens a panel with three product cards: icon, name, one-liner, accent stripe), **About**, **Careers**, **Contact**.
- Right: theme toggle, primary button "See our products".
- Scroll behavior: hides on scroll down, shows on scroll up (Motion `useScroll` + `useMotionValueEvent`). Active link gets a sliding copper underline (`layoutId`).
- Mobile (< lg): mark + menu button. Full-screen sheet with large stacked links, product list, theme toggle, socials.

### Footer (all pages)

- Top row: closing CTA "Fast to ship. *Built to stay.*" + buttons "See products" and "Join us".
- Middle: four link columns: Products (3), Company (About, Careers, Contact), Legal (Privacy, Terms), Social.
- Bottom: giant **FAS FAS** wordmark spanning full width, clipped at the bottom edge, copper gradient on hover follow (mouse-tracked mask). Copyright line, theme toggle.

### Page transitions

Short fade + 12 px rise on route change (Motion `AnimatePresence` in a template). Under 0.4 s.

---

## Home `/`

### 1. Hero (100svh)

- **Background:** React Bits **Silk** (or **Threads**) in copper on warm black / cream, low contrast, plus grain. Static gradient fallback for reduced motion and low-power devices.
- **Eyebrow (mono):** `INDEPENDENT PRODUCT STUDIO · AHMEDABAD, INDIA`
- **Headline (display-xl), two lines, word-by-word SplitText reveal:**
  `Fast to ship.` / `Built to *stay.*` (italic serif on "stay", copper).
- **Sub (body-lg, 2 lines max):** "We build consumer products people come back to. Three live today, across astrology, careers and games."
- **CTAs:** primary "Explore products" (Magnet effect) + ghost "Join the team".
- **Brand moment:** the two copper plate PNGs fly in from opposite corners and lock together beside the headline (desktop) or above it (mobile), then react to the mouse with subtle parallax (max 12 px, tilt 6°). Runs once, about 1 s, does not block scroll.
- **Bottom of hero:** "Live now" strip: three small pills (product icon + name + `↗`) linking to each product. Scroll cue on the right.

### 2. Category marquee

React Bits **ScrollVelocity**: `Astrology ✦ Careers ✦ Games ✦ Built in India ✦ Shipping weekly ✦` in display-lg outline text, speed reacts to scroll velocity. Pauses for reduced motion.

### 3. Statement

Large paragraph (display-md), words go from 20% to 100% opacity as you scroll (React Bits **ScrollReveal** or Motion `useScroll` per word):

> "We're a small team that builds products end to end: idea, design, code and growth. One shared core, many products. Each one has to earn a place on your home screen."

### 4. Products showcase (the core of the page)

- Eyebrow `01 — PRODUCTS`, title "Three products. *Live.*"
- **Sticky stacking cards**: each product is a full-width panel (`--radius-xl`) that pins and gets covered by the next one as you scroll; the covered card scales to 0.94 and dims. Built with Motion `useScroll` + `useTransform` (or React Bits **ScrollStack** restyled).
- Each panel uses the product's own accent and panel background (04-design-system.md):
  - Left: category tag (mono), product logo + name (display-md), one-liner, three feature bullets with the plate chevron, button "Visit {product}" `↗` (opens in new tab, `rel="noopener"`), secondary link "More details" to `/products#slug`.
  - Right: screenshot in a device frame (phone for Jyotishly and ArrowTheGame, browser for PlacementQuest), slight float animation, glare on hover (React Bits **GlareHover**).
- Mobile: no pinning; panels stack normally with reveal animations.

### 5. How we build

- Eyebrow `02 — HOW WE BUILD`, title "Small team. *Big surface area.*"
- **Bento grid** (21st.dev bento block, restyled), 4 cells:
  1. **Full ownership** (large): one person owns a product from idea to growth.
  2. **Ship weekly:** small releases, fast feedback. Mini animated changelog list.
  3. **Problem first:** start with what users struggle with, then pick the tech. "The problem decides."
  4. **One shared core** (wide): auth, payments, analytics and design system built once, used by every product. Small animated diagram: core in the middle, three product nodes connected by animated beams (21st.dev **Animated Beam**).
- Cards use **SpotlightCard** (copper radial glow follows the cursor).

### 6. Numbers

- Four stats in a row, mono labels, CountUp on view: `7 builders`, `3 live products`, `Since 2026`, `Made in India`.
- If real numbers are not ready, hide this section. Do not ship placeholders.

### 7. In the lab

- Title "More in the *lab*." Two or three blurred "coming soon" cards with a category tag only (for example, "Wellness", "Utility"). Optional; include only if new products are actually in progress.
- Email capture: "Get early access to what we ship next." Input + button. Needs a backend (see 08-tech-plan.md).

### 8. Careers band

- Dark copper-tinted band. "We hire builders, not titles." Short line + "See open roles" button.
- Right: rotating list of roles or values (React Bits **RotatingText**).

### 9. Footer (global)

---

## Products `/products`

1. **Header:** eyebrow `OUR PRODUCTS`, title "Built for *real* daily use." Tabs/pills for the three products that jump to anchors (sticky sub-nav, active state follows scroll).
2. **One long section per product**, each in its accent panel:
   - Hero row: logo, name, one-liner, platforms (Web / Android / iOS badges), "Visit" button, store buttons if any.
   - Screenshot gallery: horizontal drag carousel (3 to 5 screens).
   - Feature grid: 4 to 6 features, icon + title + one line.
   - "Why we built it": 2 to 3 sentences from the team.
   - Stat chips if real (users, rating, daily puzzles played).
3. **Closing:** "Have an idea we should build? Talk to us." link to `/contact`.

## About `/about`

1. **Hero:** "We are FAS FAS *Labs*." + 2 sentence story. Plates animation, smaller.
2. **Story:** short honest timeline of real milestones only (founding, each product launch). TODO(fact) dates. Vertical line that fills with copper as you scroll (Motion `useScroll`).
3. **Principles:** the four "How we build" points in more depth.
4. **Team:** photo grid (optional, needs photos). Hover reveals role. Skip if no photos.
5. **Careers CTA** band.

## Careers `/careers`

1. **Hero:** "We hire *builders*, not titles."
2. **What it is like:** 3 to 4 cards (ownership, ship weekly, learn across products, remote/office TODO).
3. **Open roles:** list rows (role, team, location, type, arrow). Each row opens a detail sheet or mailto. Empty state: "No open roles right now. Great people can still write to kzaaltech@gmail.com."
4. **Hiring process:** 3 steps, horizontal on desktop.

## Contact `/contact`

- Two columns: left headline "Let's *talk*." + direct email + socials; right form (name, email, topic select: Partnership / Careers / Press / Product feedback / Other, message).
- Validation inline, accessible errors, success state with plates "click" animation.
- Submission: server action to email provider (see 08).
