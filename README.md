# KHOA.VO — Dual Persona Portfolio

A single-page React application showcasing two professional identities — **Creative Manager & Design Leader** and **Full-Stack Developer & DevOps** — each with its own dedicated UI, animations, and personality.

<p align="center">
  <a href="https://khoavo.myds.me"><strong>Live Site</strong></a> &nbsp;·&nbsp;
  <a href="https://git.khoavo.myds.me/vndangkhoa/kv-cv"><strong>Forgejo Repo</strong></a> &nbsp;·&nbsp;
  <a href="https://portfolio.khoavo.myds.me"><strong>Creative Works</strong></a>
</p>

---

## Personas

### Creative Side
A polished, editorial design portfolio targeting agencies and brand clients.

- **Dynamic VNDK Logo** — deconstructing/reconstructing letter animation tied to scroll position
- **3 View Modes** — Grid, List, and Minimal gallery layouts
- **Progressive Image Reveal** — grayscale + pixelated blur that resolves to full color on hover
- **Live Portfolio Feed** — fetches projects from a WordPress REST API (`/wp-json/wp/v2/posts`)
- **Keyboard Navigation** — ESC to close, arrow keys to navigate project modals
- **Dark/Light Theme** — toggleable color schemes with system-aware defaults
- **Printable CV** — A4-optimized resume rendered via `PrintPortfolio` component with `@media print`

### IT Side
A retro terminal desktop environment built for developer and recruiter audiences.

- **CRT Screen Effects** — scanlines, vignette, flicker via CSS `@keyframes`
- **Draggable Windows** — "About", "Skills", "Projects", "Experience" as desktop windows
- **Boot Loader** — simulated terminal boot sequence with typing animation
- **Idle Screensaver** — triggers after 10 seconds of inactivity
- **Live Forgejo Sync** — projects pulled from `git.khoavo.myds.me` API at build time, with 5-minute runtime polling
- **Hidden Scrollbars** — `custom-scrollbar` utility scrolls all windows without visible bars
- **Terminal Styling** — monospace fonts, phosphor-green (`#00FF94`) accent, taskbar with prompt

---

## Project Structure

```
kv-cv/
├── public/
│   ├── resume.pdf            # Downloadable CV
│   ├── robots.txt
│   └── vndk-icon.svg
├── scripts/
│   └── fetch-forgejo-data.mjs # Build-time Forgejo API scraper
├── src/
│   ├── data/
│   │   └── forgejo-repos.json # Generated repo data (build-time)
│   ├── hooks/
│   │   ├── useForgejoRepos.js # Forgejo repo fetch + polling
│   │   └── usePortfolioPosts.js # WordPress post fetch
│   ├── App.jsx               # Main app (1583 lines) — all components + data
│   ├── PrintPortfolio.jsx    # A4 print-optimized CV layout
│   ├── index.css             # Global styles, CRT effects, custom-scrollbar
│   ├── print.css             # Print-only media rules
│   └── main.jsx              # React entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

**~3,110 lines** across all source files.

---

## Tech Stack

| Layer        | Technology                                             |
| ------------ | ------------------------------------------------------ |
| Framework    | React 18                                               |
| Build        | Vite 6                                                 |
| Styling      | Tailwind CSS 3 + PostCSS + Autoprefixer                |
| Animation    | Framer Motion 12                                       |
| Icons        | Lucide React                                           |
| Data Sources | WordPress REST API · Forgejo REST API · JSON build data |
| Runtime      | Browser SPA (no SSR, no backend)                       |

---

## Data Flow

### Creative Portfolio (WordPress)
```
usePortfolioPosts → fetch("https://portfolio.khoavo.myds.me/wp-json/wp/v2/posts")
                    → transformToProject → Grid/List/Minimal gallery
```

### IT Projects (Forgejo)
```
npm run build → scripts/fetch-forgejo-data.mjs
                → fetch("git.khoavo.myds.me/api/v1/users/vndangkhoa/repos")
                → write src/data/forgejo-repos.json

useForgejoRepos → import build data (instant, no loading state)
                   → 5-min polling fallback for live updates
```

The build script runs automatically via Forgejo CI/CD on every push, ensuring the deployed site always has fresh repo data. Runtime polling attempts live updates; on CORS failure it silently keeps the build-time data.

---

## Getting Started

```bash
# Install dependencies
npm install

# Development server (hot reload)
npm run dev

# Production build (includes Forgejo data fetch)
npm run build

# Preview production build
npm run preview
```

---

## Deployment

The site is deployed at **[khoavo.myds.me](https://khoavo.myds.me)** via **Forgejo CI/CD** on every push to `main`. The pipeline:

1. Runs `npm run build` (triggers Forgejo data fetch)
2. Deploys the `dist/` directory to the web server

---

## Configuration

| File                | Purpose                                     |
| ------------------- | ------------------------------------------- |
| `tailwind.config.js` | Custom colors (`#00FF94`, dark mode), fonts |
| `vite.config.js`    | React plugin, base path                     |
| `postcss.config.js` | Tailwind + Autoprefixer pipeline            |

---

## License

MIT — [Vo Nguyen Dang Khoa](https://www.linkedin.com/in/khoa-vo-76291236/)
