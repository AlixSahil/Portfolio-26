# Personal Portfolio

Personal portfolio of Sahil Ali, Full-Stack Software Developer. A single-page site that presents real
engineering work (production platforms and enterprise applications) as visual case studies, alongside
experience, stack, credentials and contact.

Previous version: https://sahil-ali27.netlify.app/ (deployed separately from the old repository).

## What It Includes

- **Hero:** oversized editorial headline with masked line reveals, an availability indicator, primary and secondary CTAs, a résumé download, GitHub and LinkedIn links, and a "currently / previously" snapshot.
- **About:** professional statement, development philosophy, journey timeline, technical interests and an education summary.
- **Selected work:** alternating featured case studies with parallax previews, a bento grid of enterprise apps, and an accessible case-study dialog for every project (problem, contribution, features, stack, links).
- **Experience:** scroll-linked timeline with role, organization, dates, location, technologies and responsibilities, plus achievements.
- **Stack:** seven skill categories in a bento layout, with brand icons that take on their colour on hover. There are no fake percentages.
- **Credentials:** compact education cards and a certification list (year and "Verify" link appear once filled in).
- **Contact:** copy-to-clipboard email, CTAs, channels and a mailto-based quick-note form.
- Dark-first design with a light theme toggle (saved per visitor, applied before first paint).
- Smooth scrolling (Lenis), scroll reveals, magnetic CTAs, a cursor spotlight on cards, an animated nav indicator, a scroll progress bar, back-to-top, and a full-screen mobile menu.
- Full `prefers-reduced-motion` support: no smooth scrolling, transforms or looping animations.

## Tech Stack

- React 19 + Vite 7 (JavaScript / JSX)
- Motion: UI, scroll-linked and layout animation
- Lenis: smooth scrolling
- react-icons: Simple Icons brand marks and Lucide UI icons
- Plain CSS design system (tokens for colour, type, space, radius), no CSS framework
- Fonts: Geist, Geist Mono and Instrument Serif (Google Fonts, non-render-blocking)

## Project Structure

```
src/
  data/portfolio.js        ← all content (profile, projects, experience, skills, credentials)
  App.jsx                  ← page composition
  main.jsx                 ← bootstrap (MotionConfig respects reduced motion)
  styles.css               ← design tokens + all component styles
  hooks/                   ← smooth scroll, active section, theme, magnetic, reduced motion
  components/
    sections/              ← Header, Hero, Marquee, About, Work, Experience, Skills, Credentials, Contact, Footer
    ui/                    ← Reveal, SectionHeader, TechBadge, ProjectPreview, MagneticLink, BackToTop
public/
  Sahil-Ali-Resume.pdf, og-image.png, _headers (Netlify)
  logos/                   ← organisation & issuer logos
```

## Editing Content

Everything lives in `src/data/portfolio.js`. Fields left as `null` are hidden in the UI until filled in:

- **Project screenshots:** add `public/projects/<slug>.webp` (ideally 1280×800) and set `image: '/projects/<slug>.webp'`. It replaces the illustrated preview, which comes back if the image fails to load.
- **Project links:** `repo` (GitHub) and `demo` (live site) render buttons when set.
- **Certifications:** `year` and `url` (credential link) render the year and a "Verify" link.

## Getting Started

Prerequisites: Node.js 20.19+ or 22.12+ (required by Vite 7).

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

## Deployment

Static Vite build, deployable to Netlify, Vercel or any static host.

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 22 (pinned in `netlify.toml`, so Netlify picks all of this up automatically)

The site's public address is resolved at build time and written into the canonical URL, Open
Graph tags, JSON-LD, `robots.txt` and `sitemap.xml` (see `vite.config.js`). Netlify provides it
automatically through its `URL` build variable, so each Netlify site uses its own address. To force
a specific address (for example a custom domain), set a `SITE_URL` environment variable.

In-page anchor navigation only (no client-side router), so no SPA rewrite rules are needed.
`public/_headers` adds basic security headers and long-term caching for hashed assets on Netlify.
