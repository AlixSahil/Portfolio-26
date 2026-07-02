# Personal Portfolio

This is my personal portfolio website, built to showcase my experience, skills, certifications, and selected work in a polished single-page experience.

The site focuses on a strong visual identity, smooth scrolling, section-based storytelling, and interactive motion effects. It is designed to feel more like a personal brand site than a plain resume page.

## What It Includes

- Hero section with an animated typing intro and an interactive WebGL backdrop
- About, Experience, Skills, Projects, Certifications, and Contact sections
- Smooth momentum scrolling, scroll-driven reveals, and active navigation state
- A scroll-reactive 3D particle sphere and subtle animated section backdrops
- Colorful brand icons for skills and real issuer logos on certifications
- Distinct project cards with custom schematic artwork
- An engaging contact form with iconography plus quick contact links
- Reduced-motion support and a fully responsive layout (desktop, tablet, mobile)

## Tech Stack

- React 19 + Vite 7
- JavaScript (JSX)
- CSS (custom design system)
- Motion (Framer Motion) — UI and scroll animation
- Lenis — smooth momentum scrolling
- three.js + React Three Fiber + drei — scroll-reactive 3D particle scene
- OGL / WebGL — hero and section shader backdrops
- GSAP — scroll-reveal text
- react-icons — brand and tech logos
- Google Fonts — Inter (UI) + Fraunces (editorial serif accents)

## Project Structure

- `src/App.jsx` — main layout plus the section data (projects, skills, certifications, contact)
- `src/main.jsx` — app bootstrap
- `src/styles.css` — global styling and visual system
- `src/components/react-bits/` — reusable animated UI pieces (DarkVeil, SideRays, ScrollReveal, etc.)
- `src/components/ScrollScene.jsx` — scroll-reactive 3D particle scene
- `src/hooks/` — motion and interaction hooks (reduced motion, tilt, smooth scroll)
- `public/logos/` — certification issuer logos (see below)

## Getting Started

Prerequisites: Node.js 18+ (required by Vite 7).

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Certification & Skill Logos

Issuer logos live in `public/logos/` (for example `oracle.svg`, `google.svg`, `deloitte.jpeg`, `mckinsey.png`).

Each certification card loads its local logo first, trying `.svg`, `.png`, `.jpg`, then `.jpeg`, and falls back to a colored monogram tile if no file is found. To update a logo, drop a file with the matching name into `public/logos/` — no code change needed. Square-ish logos with a transparent background look best on the light badge tiles.

## Deployment

This is a static Vite build, deployable to Vercel, Netlify, or any static host.

- Build command: `npm run build`
- Output / publish directory: `dist`

The site uses in-page anchor navigation (no client-side router), so no SPA rewrite or redirect rules are required.

## Notes

- Portfolio content and section data are edited directly in `src/App.jsx`.
- The visual style is intentionally bold and motion-driven, with reduced-motion support for accessibility.
- Heavy 3D code (three.js) is lazy-loaded, so it stays off the initial page load until the particle scene is near the viewport.
