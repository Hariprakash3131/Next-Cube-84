# 🔴 Stranger Things — Fan Tribute Site

A fully animated, immersive fan tribute to Netflix's *Stranger Things*, built with **React + Vite**, **GSAP**, and **Lenis**. Every section is crafted to feel like you're stepping into Hawkins — or beyond it.

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | Component architecture |
| Vite 5 | Blazing fast dev/build |
| GSAP 3 + ScrollTrigger | All scroll-driven and timeline animations |
| Lenis | Smooth inertia scrolling |
| CSS Mask API | Cursor reveal effect in Upside Down page |
| IntersectionObserver | Horror letter reveal trigger |
| requestAnimationFrame | Lerp-based cursor tracking |

---

## 📄 Pages & Sections

### 1. Hero — *The Gate*
Full-viewport atmospheric scene with:
- SVG dimensional rift with animated glow and pulsing lightning bolts
- Red drifting cloud layer
- Upside-down ground vines (SVG)
- Floating spore particles
- Fire glow rising from below
- `v1.png` image placed directly behind the **STRANGER THINGS** title, cropped to show only the face
- Flickering title with red neon text-shadow

### 2. The Heroes of Hawkins — *Characters*
- 8 character cards in a responsive grid
- Each card has a colour-coded accent glow on hover
- Characters fly in from their Hero formation and land into their cards on scroll (see CharOverlay below)

### 3. The Upside Down — *Mask Reveal*
- `v1.png` as the base (Upside Down world)
- `will1.webp` as the cover layer on top
- CSS `mask-image` with a radial ellipse gradient cuts a spotlight hole at the cursor position
- JS `requestAnimationFrame` lerps `--x`/`--y` CSS custom properties at `0.1` factor for a smooth trailing feel
- **"THE UPSIDE DOWN"** title reveals letter-by-letter with a horror glitch animation on scroll

### 4. Creatures of the Upside Down
- 3 flip cards — Demogorgon, Vecna (centre), Mind Flayer
- Front: creature image + name + threat level badge
- Back: creature description
- Cards animate in with GSAP scale + opacity on scroll

### 5. Footer — *FRIENDS DON'T LIE*
- Each letter of "FRIENDS DON'T LIE" is individually rendered as a Christmas light bulb
- Staggered glow animation per letter simulating the iconic Byers house lights

---

## ✨ Animations In Depth

### CharOverlay — Character Formation → Card Flight
The most complex animation in the project. Characters start as large fixed-position images in the Hero viewport, then smoothly fly into their respective character cards as the user scrolls.

**How it works:**
1. On mount, each character is positioned in a "Hero formation" using `gsap.set()` with viewport-relative coordinates
2. The Hero section is pinned via `ScrollTrigger.create({ pin: true })`
3. After `ScrollTrigger.refresh()` (which inserts the pin spacer into the DOM), card slot positions are measured with `getBoundingClientRect()`
4. A `gsap.ticker` callback runs every frame, reading `window.scrollY` and linearly interpolating each character from their Hero position to their card destination
5. At 95% scroll progress, the overlay character fades out while the card's static image fades in — creating a seamless handoff

### CSS Mask Reveal Cursor Effect
- Two absolutely positioned layers stacked on top of each other
- The cover layer (`will1.webp`) has a `mask-image` using `radial-gradient` pointing at `--x` and `--y`
- JS tracks `mousemove`, lerps the position with factor `0.1` every `rAF`, and updates the CSS variables
- `mouseenter` / `mouseleave` toggle the `.active` class which transitions `opacity` from `0 → 1` in `0.55s`

### Horror Letter Reveal
- Title split into individual `<span>` elements
- `IntersectionObserver` fires when the section reaches `40%` visibility
- Each letter staggers `45ms` apart
- Phase 1 (`.glitch`): a `steps(1)` keyframe animation violently flickers the letter with skew, blur, brightness flashes and colour shifts over `0.3s`
- Phase 2 (`.revealed`): letter settles into place with smooth `cubic-bezier` transition, then enters a continuous subtle flicker loop

### Lenis + GSAP Ticker Integration
Lenis smooth scroll is wired directly into GSAP's ticker so `ScrollTrigger` always reads the Lenis-interpolated scroll value, not the raw browser scroll — keeping all scroll-driven animations perfectly in sync.

---

## ⚔️ Challenges & Solutions

### Challenge 1 — CharOverlay Pin Spacer Timing
**Problem:** Card slot positions were measured *before* the ScrollTrigger pin spacer was inserted into the DOM. This pushed all slots down by `100vh` in the document, causing characters to fly to completely wrong positions.

**Solution:** `ScrollTrigger.refresh()` is called *after* `.create({ pin: true })`, forcing the spacer to be committed to the DOM. Only then are card slots measured with `getBoundingClientRect()`, guaranteeing accurate document-relative coordinates.

---

### Challenge 2 — CSS Mask Crosscuts
**Problem:** Using three separate `radial-gradient` circles with `mask-composite: intersect` to form an organic blob shape created visible crosscut lines where the gradients overlapped, breaking the smooth reveal illusion.

**Solution:** Replaced the three-circle intersect approach with a single `ellipse` radial gradient. One smooth ellipse with a gradual `transparent → semi-transparent → black` stop sequence produces a clean, soft-edged reveal with no artefacts.

---

### Challenge 3 — Lenis vs ScrollTrigger Scroll Desync
**Problem:** GSAP's `ScrollTrigger` reads `window.scrollY` directly, but Lenis intercepts native scroll and applies its own lerp. This caused scroll-triggered animations to fire at incorrect scroll positions — characters would fly too early or too late.

**Solution:** Lenis's `raf` function is added to GSAP's ticker (`gsap.ticker.add(raf)`) and `ScrollTrigger.update` is bound to Lenis's `scroll` event. This ensures both systems share the exact same scroll value on every frame.

---

### Challenge 4 — Character Image Handoff (Overlay → Card)
**Problem:** The flying overlay character and the card's static image are two separate DOM elements. Without coordination, both would be visible simultaneously during the transition, causing a jarring double-image flash.

**Solution:** Card images start with `opacity: 0` (set via `gsap.set`). In the `gsap.ticker` callback, once scroll progress exceeds `FADE_START (0.95)`, the overlay character fades *out* while the card image fades *in* proportionally — a perfectly synchronised crossfade handoff.

---

### Challenge 5 — v1 Image Face Cropping in Hero
**Problem:** Placing `v1.png` behind the title with `background-size: cover` kept showing the chest/body of the creature rather than the face, as the image anchored to `center center` by default.

**Solution:** Set `background-position: center 8%` with `background-size: cover` and expanded the container to `height: 300%` so the viewport into the image focuses tightly on the top (face) of the creature.

---

### Challenge 6 — Horror Glitch Without CSS-in-JS
**Problem:** Each letter needed a unique animation delay for the stagger, but pure CSS `animation-delay` with a CSS custom property (`--i`) isn't natively supported across all browsers for `@keyframes`.

**Solution:** Used JavaScript `setTimeout` per letter (staggered by `45ms × index`) to add/remove class names at the right moment — keeping all animation logic in CSS keyframes while JS only controls the timing trigger.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx / Hero.css           # Opening scene
│   ├── Characters.jsx / .css         # Character grid
│   ├── CharOverlay.jsx               # Flying character animation
│   ├── Finale.jsx / Finale.css       # Upside Down mask reveal
│   ├── Creatures.jsx / .css          # Flip cards
│   ├── Navbar.jsx / .css             # Navigation
│   ├── Spores.jsx / .css             # Floating particle overlay
│   └── Footer.jsx / .css            # Christmas lights footer
├── data/
│   └── content.js                   # Characters & creatures data
├── hooks/
│   └── useSmoothScroll.js           # Lenis + GSAP integration
├── App.jsx
├── main.jsx
└── index.css                        # Global styles, vecna bg, CRT overlay
public/
├── nobg/                            # Character images (background removed)
├── v1.png                           # Upside Down creature (base layer)
├── will1.webp                       # Cover layer for mask reveal
├── vecna.jpg / vecna1.webp          # Vecna imagery
├── demogorgon.png
└── mind flayer.jpg
```

---

## ⚠️ Disclaimer

This is a non-commercial fan project made for educational and creative purposes.
*Stranger Things* is a trademark of Netflix. All rights reserved.
