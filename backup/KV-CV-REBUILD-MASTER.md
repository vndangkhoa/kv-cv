# KV-CV — Complete Rebuild Master Guide

> **Project:** `khoavo-portfolio` — Dual Persona Portfolio (Creative & Dev)  
> **Original Location:** `/home/x1/Documents/Projects/kv-cv`  
> **Version:** `1.0.0` • **Type:** `module` (ESM)  
> **Author:** Vo Nguyen Dang Khoa (Khoa Vo)  
> **Live:** https://khoavo.myds.me • **Forgejo:** https://git.khoavo.myds.me/vndangkhoa/kv-cv  
> **Created:** 2026-08-31 • **Backup Purpose:** Full AI-recreatable blueprint

This single document contains **EVERYTHING** an AI agent needs to re-create the project from scratch, byte-for-byte.  
Segmented detail files are in `backup/instructions/` for modular execution.

---

## Table of Contents

1. [Project Overview & Concepts](#1-project-overview--concepts)
2. [Prerequisites & Environment](#2-prerequisites--environment)
3. [Scaffold Steps (Ordered)](#3-scaffold-steps-ordered)
4. [File Tree (Complete)](#4-file-tree-complete)
5. [Package & Dependency Spec](#5-package--dependency-spec)
6. [Config Files (Verbatim)](#6-config-files-verbatim)
7. [HTML Entry (Verbatim)](#7-html-entry-verbatim)
8. [Source Architecture](#8-source-architecture)
9. [Data Layer (Verbatim)](#9-data-layer-verbatim)
10. [Hooks Layer (Verbatim)](#10-hooks-layer-verbatim)
11. [Component Layer (Full Spec)](#11-component-layer-full-spec)
12. [Styling System (Design Tokens)](#12-styling-system-design-tokens)
13. [Public Assets](#13-public-assets)
14. [Scripts & Build Pipeline](#14-scripts--build-pipeline)
15. [State, Theming & Persona Logic](#15-state-theming--persona-logic)
16. [Data Flow Diagrams](#16-data-flow-diagrams)
17. [Deployment](#17-deployment)
18. [Verification Checklist](#18-verification-checklist)
19. [ recreation command chain](#19-recreation-command-chain)

---

## 1. Project Overview & Concepts

### 1.1 What It Is
Single-page React SPA showcasing **two professional personas** via a tab switch:

- **Creative & AI** (`creative` tab): Editorial, bento-grid, MotionSites DNA, live WordPress feed, motion cards, marquee.
- **Full-Stack & DevOps** (`dev` tab): Glass/terminal aesthetic, Forgejo-synced repos, journey chronology, language-colored chips.

Shared chrome: Floating capsule island navbar, hero with background video, marquee, about (bento), skills (bento), projects (filterable grid/list with MotionCards), experience (luminous timeline), contact (mesh background), Easter Egg CRT terminal, printable PDF CV overlay.

### 1.2 Key UX Features

| Feature | Detail |
|---|---|
| **Persona Switch** | `TabSwitch` segmented control, `active` = `creative` \| `dev`, animates with Framer Motion `layoutId="tab-pill-segmented"` |
| **Theme** | Dark/Light via `data-theme` attr + `dark`/`light` class on `<html>`, localStorage key `kv-portfolio-theme`, system `prefers-color-scheme` fallback, CSS vars switch |
| **PDF CV** | `PrintPortfolio.jsx` A4 (210mm×297mm) 2-column layout, `html2canvas` (scale 2, jpeg 0.95) + `jspdf` A4 portrait; fallback `window.print()`; overlay at `z-[200]` with `backdrop-blur-xl`, top bar with Download + Close, `custom-scrollbar`, hidden print mount `.standalone-print-mount` |
| **EasterEgg** | CRT terminal overlay `z-[150]`, boot sequence 7 lines (160ms interval), ASCII banner `KHOA.VO OS v2.0`, `help`/`about`/`skills`/`projects`/`creative`/`experience`/`contact`/`journey`/`date`/`uptime`/`clear`/`exit`, history ↑↓, tab autocomplete, chips bar, scanline/flicker CSS |
| **Projects** | Creative: `usePortfolioPosts` → WordPress `posts?per_page=12&_embed` → `transformToProject`; Dev: `useForgejoRepos` → Forgejo API + build JSON; filter capsules (category/language), grid (MotionCards) vs list (CompactListRow), 6 initial, expand/collapse, copy URL |
| **Navbar** | Capsule island `nav-island` blurred, scroll spy (offset 220), desktop `active-nav-pill` with spring, mobile drawer `backdrop-blur-2xl`, controls: TabSwitch sm, PDF CV button, Terminal, Sun/Moon, hamburger |
| **Hero** | `min-h-[100svh]`, background `human_head_turn.mp4` (autoplay muted loop, opacity 35, blend luminosity/screen) + vignette gradients, headline `BRINGING THE UNEXPECTED TO AI & DIGITAL EXPERIENCES` with iridescent + serif accent, subtitle per tab, bento metrics 4-col → 2×2 mobile |
| **SEO** | `index.html` has og:title/desc/type/profile, `llms.txt` alternate link, JSON-LD `Person` schema with seeks/Demand |

### 1.3 Lines of Code

```
src/App.jsx               138
src/PrintPortfolio.jsx    530 (root) + 446 (components/PrintPortfolio.jsx) = 2 versions; APP USES components/PrintPortfolio.jsx
src/index.css             914
src/print.css             112
src/main.jsx              10
components                ~2,489 total
hooks                     ~256
data                      ~510 + JSON
Total ~3,800+ lines (excluding node_modules)
```

---

## 2. Prerequisites & Environment

- **Node:** >=18 (fetch API native)
- **Package Manager:** npm (lockfile `package-lock.json` present)
- **OS:** Linux (tested); `start.sh` is bash
- **No backend/SSR:** Pure browser SPA
- **External APIs:** `https://portfolio.khoavo.myds.me/wp-json/wp/v2/posts` (WordPress), `https://git.khoavo.myds.me/api/v1/users/vndangkhoa/repos` (Forgejo)
- **Fonts:** Google Fonts `Inter` (300-900), `Newsreader` (200-800 italic), `JetBrains Mono`, `IBM Plex Mono`, `basis33` via onlinewebfonts (`db.onlinewebfonts.com`)

---

## 3. Scaffold Steps (Ordered)

AI should execute **in this exact order**:

```bash
# 1. Create project root
mkdir kv-cv && cd kv-cv

# 2. Init npm & set type module
npm init -y
# then edit package.json to match §5

# 3. Install deps (exact versions)
npm install react@^18.3.1 react-dom@^18.3.1 framer-motion@^12.38.0 lucide-react@^0.469.0 html2canvas@^1.4.1 jspdf@^4.2.1
npm install -D vite@^6.4.3 @vitejs/plugin-react@^4.3.4 tailwindcss@^3.4.17 postcss@^8.4.49 autoprefixer@^10.4.20 @types/react@^18.3.12 @types/react-dom@^18.3.1

# 4. Init Tailwind (or manually create configs as per §6)
npx tailwindcss init -p
# then OVERWRITE tailwind.config.js + postcss.config.js verbatim

# 5. Create file tree per §4
mkdir -p public src/components/ui src/data src/hooks scripts backup/instructions

# 6. Drop files verbatim per §§6-14
# - index.html (root)
# - vite.config.js (root)
# - tailwind.config.js (root)
# - postcss.config.js (root)
# - .gitignore (root)
# - start.sh (root, chmod +x)
# - public/* (copy verbatim)
# - src/* (all JSX/CSS/JS)

# 7. First Forgejo fetch (generates src/data/forgejo-repos.json)
node scripts/fetch-forgejo-data.mjs
# fallback: if fetch fails, the committed JSON is still valid; script continues with existing data via try/catch

# 8. Dev
npm run dev -- --host 0.0.0.0 --port 5173
# or ./start.sh

# 9. Build
npm run build  # runs fetch-forgejo-data.mjs && vite build
npm run preview
```

---

## 4. File Tree (Complete)

```
kv-cv/
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── start.sh
├── README.md
├── llms.txt
├── results.txt
├── public/
│   ├── human_head_turn.mp4      # 2.7MB hero background video (MUST COPY)
│   ├── vndk-icon.svg            # VNDK 2x2 grid logo (V N / D K)
│   ├── robots.txt               # AI-crawler allows
│   ├── llms.txt                 # mirror of root llms.txt for /llms.txt route
│   └── 1757983784523_edit_18156554308333.jpg # (present in latest dist scan, keep if exists)
├── scripts/
│   └── fetch-forgejo-data.mjs   # build-time Forgejo scraper
├── src/
│   ├── main.jsx                 # React entry
│   ├── App.jsx                  # Root orchestrator (138 lines)
│   ├── index.css                # 914 lines: tokens, utilities, print, CRT, marquee, glass
│   ├── print.css                # 113 lines: @media print overrides
│   ├── PrintPortfolio.jsx       # 530 lines (LEGACY root version; app IMPORTS components/PrintPortfolio.jsx)
│   ├── data/
│   │   ├── personal.js          # PERSONAL_INFO + pdf export funcs
│   │   ├── creative.js          # CREATIVE_DATA (title, skills, 10 projects, 5 experiences)
│   │   ├── dev.js               # IT_DATA (journey 8, skills 7 cats, 8 projects, 2 experiences)
│   │   └── forgejo-repos.json   # Generated: 19 repos, 9 languages (checked in)
│   ├── hooks/
│   │   ├── useForgejoRepos.js   # buildData + 5-min poll, fallback
│   │   └── usePortfolioPosts.js # WordPress fetch + transformToProject
│   └── components/
│       ├── Navbar.jsx           # 212 lines
│       ├── Hero.jsx             # 200 lines
│       ├── About.jsx            # 129 lines
│       ├── Skills.jsx           # 98 lines
│       ├── Projects.jsx         # 502 lines (CreativeMotionCard, DevMotionCard, CompactListRow)
│       ├── Experience.jsx       # 128 lines (timeline + journey grid)
│       ├── Contact.jsx          # 160 lines (mesh bg, email pill, 3 info cards)
│       ├── EasterEgg.jsx        # 418 lines (boot + terminal)
│       ├── PrintPortfolio.jsx   # 446 lines (CANONICAL — App.jsx imports this)
│       └── ui/
│           ├── VNDKLogo.jsx     # 63 lines (4 paths, currentColor + #00FF87)
│           ├── TabSwitch.jsx    # 46 lines (2 tabs, layoutId pill)
│           ├── GlassCard.jsx    # 24 lines (motion.div, hover y:-4)
│           ├── Reveal.jsx       # 16 lines (whileInView y40→0)
│           ├── Marquee.jsx      # 23 lines (duplicated row, --marquee-speed)
│           └── MeshBackground.jsx # 24 lines (3 blobs, framer motion x/y/scale)
├── dist/                        # generated (gitignored)
├── node_modules/                # generated (gitignored)
└── backup/
    ├── KV-CV-REBUILD-MASTER.md  # THIS FILE
    └── instructions/
        ├── 01-overview.md
        ├── 02-structure.md
        ├── 03-tech-stack.md
        ├── 04-design-system.md
        ├── 05-data-models.md
        ├── 06-components.md
        └── 07-build-deploy.md
```

**Critical nuance:** `src/PrintPortfolio.jsx` (530 lines, BW monochrome, simplified, 8 experiences + 4 projects) is **NOT** used by App. `src/components/PrintPortfolio.jsx` (446 lines, emerald accent #00C853, categories, 5 experiences + grid projects) **IS** used: `import PrintPortfolio from './components/PrintPortfolio'` in `src/App.jsx:11`.

---

## 5. Package & Dependency Spec

### package.json (verbatim)

```json
{
  "name": "khoavo-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "node scripts/fetch-forgejo-data.mjs && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^12.38.0",
    "html2canvas": "^1.4.1",
    "jspdf": "^4.2.1",
    "lucide-react": "^0.469.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.4.3"
  }
}
```

### .gitignore (verbatim)

```
node_modules/
dist/
.DS_Store
.env
*.local
```

### start.sh (verbatim, chmod +x)

```bash
#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Starting Khoa.Vo portfolio dev server..."
exec npm run dev -- --host 0.0.0.0 --port 5173
```

---

## 6. Config Files (Verbatim)

### vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          elevated: 'var(--bg-elevated)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          DEFAULT: '#00FF87',
          mint: '#00FF87',
          cyan: '#00E5FF',
          purple: '#D0B2FF',
          peach: '#FFEEB8',
          subtle: 'var(--accent-subtle)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          glass: 'var(--glass-border)',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
        pixel: ['basis33', 'monospace'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'shimmer': 'shimmer 2.2s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(0, 255, 135, 0.3)',
        'glow-md': '0 0 35px -5px rgba(0, 255, 135, 0.4)',
        'glow-lg': '0 0 60px -10px rgba(0, 255, 135, 0.35)',
        'glow-cyan': '0 0 35px -5px rgba(0, 229, 255, 0.4)',
        'glow-purple': '0 0 35px -5px rgba(208, 178, 255, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}
```

---

## 7. HTML Entry (Verbatim)

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vndk-icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Khoa Vo - Creative Manager & AI Innovation Lead</title>
    <meta name="description" content="Portfolio of Khoa Vo (Vo Nguyen Dang Khoa) - Creative Manager, AI Innovation Lead, and Full-Stack Developer based in Vietnam. Currently open to work." />
    <meta name="keywords" content="Khoa Vo, Vo Nguyen Dang Khoa, Creative Manager, AI Lead, Full-Stack Developer, Stable Diffusion, React, Node.js, Open to work" />
    <meta name="author" content="Khoa Vo" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://db.onlinewebfonts.com/c/d08bafd725a4cfc309efb5a88e0b63a5?family=basis33" rel="stylesheet">
    <meta property="og:title" content="Khoa Vo - Creative Manager & AI Innovation Lead" />
    <meta property="og:description" content="Portfolio of Khoa Vo - Exploring the intersection of design and intelligence." />
    <meta property="og:type" content="profile" />
    <meta property="og:url" content="https://khoavo.myds.me/" />
    <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly CV" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org/",
        "@type": "Person",
        "name": "Vo Nguyen Dang Khoa",
        "alternateName": "Khoa Vo",
        "jobTitle": ["Creative Manager", "AI Innovation Lead", "Full-Stack Developer", "DevOps Engineer"],
        "url": "https://khoavo.myds.me/",
        "email": "mailto:vonguyendangkhoa@gmail.com",
        "telephone": "+84398300340",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ho Chi Minh City",
          "addressCountry": "VN"
        },
        "sameAs": [
          "https://www.linkedin.com/in/khoa-vo-76291236/",
          "https://git.khoavo.myds.me/vndangkhoa"
        ],
        "seeks": {
          "@type": "Demand",
          "itemOffered": {
            "@type": "Service",
            "name": "Full-Time Job, Creative Direction, and Technical Development"
          }
        },
        "knowsAbout": [
          "Brand Strategy", "Generative AI", "ComfyUI", "Stable Diffusion", 
          "Full-Stack Development", "Go", "React", "Next.js", "Docker", "DevOps"
        ]
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 8. Source Architecture

### src/main.jsx (verbatim)

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### src/App.jsx — Root Orchestrator (summary + critical lines)

Full 138 lines; key structure:

```jsx
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import EasterEgg from './components/EasterEgg';
import Marquee from './components/ui/Marquee';
import PrintPortfolio from './components/PrintPortfolio';
import { exportPdfDirectly } from './data/personal';
import './print.css';

const MARQUEE_ITEMS = [
  'ComfyUI','FLUX','Stable Diffusion','Midjourney','RunwayML',
  'React','Next.js','TypeScript','Go','Rust','Python','Kotlin',
  'Docker','Tailwind CSS','Framer Motion','Cinema 4D','Blender',
  'Art Direction','Motion Graphics','Brand Strategy',
];

export default function App() {
  const [darkMode, setDarkMode] = useState(() => { /* localStorage kv-portfolio-theme else matchMedia */ });
  const [tab, setTab] = useState('creative');
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  // useEffect: data-theme attr, class dark/light, localStorage
  // useEffect: window.addEventListener('open-pdf-preview', () => setShowPrintPreview(true))
  // handleDownloadPdf: exportPdfDirectly(setIsGeneratingPdf)
  // render: div.app-main.bg-[var(--bg-primary)] + noise-overlay + Navbar + main(Hero+Marquee+About+Skills+Projects+Experience+Contact) + EasterEgg + pdf-preview-backdrop z-[200] + standalone-print-mount
}
```

**Full file must be copied verbatim from original — see `src/App.jsx:1-138`.**

---

## 9. Data Layer (Verbatim)

### src/data/personal.js — PERSONAL_INFO + PDF helpers (67 lines)

```js
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const PERSONAL_INFO = {
  name: "Vo Nguyen Dang Khoa",
  shortName: "Khoa Vo",
  phone: "0398300340",
  email: "vonguyendangkhoa@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  linkedin: "https://www.linkedin.com/in/khoa-vo-76291236/",
  portfolio: "https://khoavo.myds.me/",
  github: "https://git.khoavo.myds.me/vndangkhoa",
  forgejo: "https://git.khoavo.myds.me/vndangkhoa",
  availability: "Open to work",
};

export const triggerPdfPrint = () => { if (typeof window !== 'undefined') window.print(); };

export const exportPdfDirectly = async (onProgress) => {
  // querySelector('.print-portfolio-content') → html2canvas scale2 useCORS allowTaint background #ffffff → toDataURL jpeg 0.95 → jsPDF A4 portrait mm → addImage 0,0 pdfWidth pdfHeight → save Vo_Nguyen_Dang_Khoa_Creative_CV.pdf ; fallback window.print()
};

export const downloadCV = () => { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('open-pdf-preview')); };
export default PERSONAL_INFO;
```

**Full verbatim required — copy `src/data/personal.js`.**

### src/data/creative.js — CREATIVE_DATA (178 lines)

- `title`: "Creative & Design Manager"
- `summary`: 9+ years ... (2 paragraphs)
- `tagline`: "Design Leadership & Visual Strategy"
- `skills`: 4 categories (AI & Generative Design 10, Design & Creative Tools 9, Motion & Animation 6, Brand & Strategy 6)
- `projects`: 10 items (id 1-10, 2026-2017, each title/category/image/link/year/description) — images hosted at `portfolio.khoavo.myds.me/wp-content/...`
- `experience`: 5 items (AI CREATIVE LEAD Phibious 2025-Present, ECOMMERCE DESIGN LEAD P&G 2020-2025, PRODUCTION CREATIVE LEAD INN SaiGon Dec 2019-Nov 2020, REGIONAL HEAD OF DESIGN ASIAMARINE 2018-2019, SENIOR GRAPHIC DESIGNER EMG 2017-2018)

**Copy verbatim.**

### src/data/dev.js — IT_DATA (132 lines)

- `title`: "Full-Stack Developer & DevOps"
- `summary`: "Full-stack developer and self-hosted infrastructure architect ... 18+ deployed ..."
- `journey`: 8 entries (PRESENT Synology Package Hub, AUG '26 DSM Web Manager, AUG '26 Rust Systems, JUL '26 Media Engine, MAR '25 Kotlin & Android TV, DEC '24 Rust & Systems, SEP '24 Full-Stack Media Streaming, JUL '24 First Production App)
- `skills`: 7 cats (languages 9, frontend 9, backend 8, synology 6, ai 6, devops 8, tools 8) — NOTE TECH LISTS DIFFER FROM README SUMMARY
- `projects`: 8 (kv-synology, spkrepo, mouse-me, kv-dl, kv-netflix, kv-tube, spotify-clone, apix) each name/desc/tech/github
- `experience`: 2 (Synology & Infra Engineer KV Lab 2024-Present 4 highlights, Creative Technology Lead Phibious 2025-Present 3 highlights)

**Copy verbatim.**

### src/data/forgejo-repos.json — Generated (354 lines)

Structure:

```json
{
  "fetchedAt": "2026-08-29T07:39:00.377Z",
  "totalRepos": 19,
  "totalLanguages": 9,
  "languages": { "Python":2, "HTML":1, "TypeScript":5, "Rust":3, "Dart":1, "Kotlin":2, "Shell":1, "JavaScript":2, "Batchfile":1 },
  "repos": [ { "id":99, "name":"spkrepo", "fullName":"vndangkhoa/spkrepo", "description":"Synology Community Package Center...", "htmlUrl":"...", "language":"Python", "updatedAt":"...", "createdAt":"...", "mirror":false, ... } , ...18 more sorted updatedAt desc ]
}
```

**Copy verbatim; this is checked-in build artifact. `scripts/fetch-forgejo-data.mjs` overwrites it on build.**

---

## 10. Hooks Layer (Verbatim)

### src/hooks/useForgejoRepos.js (120 lines)

- Imports `buildData from '../data/forgejo-repos.json'`
- Constants: `FORGEJO_API='https://git.khoavo.myds.me/api/v1'`, `USERNAME='vndangkhoa'`, `POLL_INTERVAL=5*60*1000`
- `formatRepo`, `formatRemoteRepo`, `initRepos/initLanguages/initStats` from buildData
- `useForgejoRepos`: state repos/languages/stats/loading/error, `fetchRepos useCallback` → fetch `${FORGEJO_API}/users/${USERNAME}/repos?limit=100` → map/sort → langCount → setRepos/languages/stats; on catch warn + keep build data; `useEffect` fetch + setInterval(POLL_INTERVAL); `refresh` method

**Copy verbatim.**

### src/hooks/usePortfolioPosts.js (136 lines)

- `API_BASE='https://portfolio.khoavo.myds.me/wp-json/wp/v2'`
- `usePortfolioPosts({perPage=6, category=null})`: posts/loading/error/hasMore/page, `fetchPosts(pageNum)` → `${API_BASE}/posts?per_page=${perPage}&page=${pageNum}&_embed` → response.headers `X-WP-TotalPages` → map to {id, title: rendered, excerpt stripHtml, date, dateFormatted, link, slug, featuredImage {full,large,medium,thumbnail}, categories[], tags[] } → setPosts vs append, hasMore; `useEffect` fetch 1 on perPage/category change; `loadMore`, `refresh`
- `transformToProject(post)` → {id, title, category:firstCat||'Creative Work', image:medium||large||'', description:excerpt, link, year}
- Helpers: `stripHtml` (div innerHTML), `formatDate`, `getFeaturedImage`

**Copy verbatim.**

---

## 11. Component Layer (Full Spec)

All components are **functional React + Framer Motion + Lucide + Tailwind**.  
Each file path + line count + key props + copy instruction:

| Component | File | Lines | Props | Key Behavior |
|---|---|---|---|---|
| **Navbar** | `src/components/Navbar.jsx` | 212 | `darkMode, toggleTheme, tab, onTabChange, onEasterEgg, onOpenPdf` | motion.header y-60→0 0.6s, `NAV_LINKS`=about/skills/work/experience/contact, `scrolled` + `activeSection` spy scrollY+220, capsule `nav-island`, brand VNDKLogo sm, desktop nav pill `layoutId="active-nav-pill"` spring 450/32, controls TabSwitch sm (hidden sm:block) + PDF CV FileText + Terminal + Sun/Moon + hamburger, mobile drawer AnimatePresence y-10 scale0.98, grid2 links + Download CV gradient |
| **Hero** | `src/components/Hero.jsx` | 200 | `tab, onTabChange` | section `#hero` min-h-[100svh] pt28/32 pb10, video `/human_head_turn.mp4` absolute opacity35 blend luminosity/screen + vignette gradients (to bg-primary, radial), top pill `badge-iridescent` green ping dot + text `AVAILABLE // CREATIVE & AI INNOVATION LEAD` vs `FORGEJO SYNCED // FULL-STACK & DEVOPS`, TabSwitch md, headline 36→80px black uppercase `IRIDESCENT `UNEXPECTED` + serif `EXPERIENCES`, subtitle per tab, buttons btn-iridescent Download PDF + btn-glass Explore Work (scrollTo #work) + external link LinkedIn vs Forgejo, bento 4 metrics 2→4 cols |
| **About** | `src/components/About.jsx` | 129 | `tab` | bento 12-col grid, left 5-col GlassCard: VNDKLogo md 16×16 + VERIFIED badge, name + role Creative Manager vs Full-Stack, email mailto + MapPin location, spotlight gradient banner; right 7-col GlassCard: ShieldCheck philosophy, title + summary + 3 metrics (9+ Years, 7Yrs/18+, 100%) |
| **Skills** | `src/components/Skills.jsx` | 98 | `tab` | isCreative ? 4 cats else 7 cats, icons Wand2/PenTool/Film/Layers vs Code2/LayoutDashboard/Server/BrainCircuit/Boxes/Wrench, CATEGORY_COLORS 6 accent/border/bg/text, motion y25 delay i%3*0.08, GlassCard hover border accent/40, chip `.skill-chip` |
| **Projects** | `src/components/Projects.jsx` | 502 | `tab` | Subcomponents: CreativeMotionCard (image 16/10 shimmer, top category chip black/70, year chip, hover overlay gradient + View Case Study #00FF87 + Copy), DevMotionCard (language dot shadow, stars/forks, glass + border #00FF87/40 hover), CompactListRow (9×9 dot + category pill). State: `selectedFilter` All vs cats/langs, `expanded` 6 vs all, `viewMode` grid/list. Filters via `useMemo` from creativeProjects vs languages keys. AnimatePresence motion div key `${tab}-${selectedFilter}-${viewMode}` y20. Loading/empty/error states with Loader2/AlertTriangle. Expand button btn-glass ChevronDown/Up + WordPress loadMore Sparkles |
| **Experience** | `src/components/Experience.jsx` | 128 | `tab` | Luminous timeline: vertical gradient line left 15px / md center, pulsating nodes 4×4 ping #00FF87, alternating md justify-end, GlassCard per exp with period pill emerald + MapPin, role + company cyan, highlights slice 3 vs 4 with ▸. Dev extra: journey grid 2→3 cols with 8 cards month badge |
| **Contact** | `src/components/Contact.jsx` | 160 | `tab` | MeshBackground opacity40, badge 05 // INITIATE TRANSMISSION Sparkles, headline UNFORGETTABLE iridescent, subtitle per tab, email pill copy Check/Copy 2200ms, 3 info cards MapPin/Phone/Sparkles (Ho Chi Minh, phone, Open to Work ping), btn-iridescent Download + LinkedIn + Forgejo, footer 2026 © |
| **EasterEgg** | `src/components/EasterEgg.jsx` | 418 | `open, onClose` | Boots 7 lines `BOOT_SEQUENCE` 160ms, banner ASCII 5 lines `KHOA.VO`, `QUICK_COMMANDS` 9 chips, `resolveCommand` map help/about/whoami/skills/projects/creative/experience/contact/journey/date/uptime/clear/exit, state booted/lines/input/history/histIdx/welcomePrinted, effects: reset on open + body overflow hidden, print welcome once, auto-scroll, ESC handler, handleCommand history+ lines + `$ raw`, result print, Tab autocomplete, motion overlay black/90 backdrop-blur, window max-w-4xl h84vh rounded-2xl border #00FF94/50 bg #060d09 crt-screen crt-scanline, header red/yellow/green + khoa.vo@os + ESC[X], chips bar, banner centered 8→12px, lines left, input $ + placeholder, footer SYSTEM READY ↑↓ history |

### ui Subcomponents

- **VNDKLogo.jsx** (63): props `size sm/md/lg/xl/hero or custom`, `className`, `animated true`; dims w8/w10/w16/w24/w32→w40; motion.svg viewBox 0 0 100 scale hover 1.05, 4 paths: V 14 20→29 41→44 20 currentColor, N 56 41→56 20→86 41→86 20 currentColor, D 14 59→28 59 C41 59→28 80→14 80 #00FF87, K 56 59→56 80 M86 59→56 69.5→86 80 #00FF87, stroke 8 round
- **TabSwitch.jsx** (46): props `active, onChange, size md/sm, className`; tabs creative→"Creative & AI" dev→"Full-Stack & DevOps"; inline-flex p1 rounded-full bg #121815/90 border white/10 blur, buttons px3→5 py1→1.5 text11px→xs font-mono, active text #0A0D0B + `layoutId="tab-pill-segmented"` gradient #00FF87→#00E5FF spring 500/35
- **GlassCard.jsx** (24): props `children, className, hover true, glow false, style`; motion.div y-4 spring 350/25, `glass-card` + hover `glass-card-hover` + glow border #00FF87/30 shadow
- **Reveal.jsx** (16): props `children, delay 0, y 40, className, as div`; motion[as] whileInView opacity0 y→0 once margin -80 duration0.7 cubic 0.16,1,0.3,1
- **Marquee.jsx** (23): props `items [], separator ·, speed 30`; if empty null; row = div.marquee-row ×4 duplicated items + separator w sep dot, style `--marquee-speed` speed s, container div.marquee ×2 rows (a/b aria-hidden)
- **MeshBackground.jsx** (24): prop `className`; div.mesh-bg ×3 motion.div blobs class mesh-blob-1/2/3 animate x/y/scale duration 22/26/30 infinite easeInOut + grain

### PrintPortfolio (CANONICAL)

- **Path:** `src/components/PrintPortfolio.jsx` (446) — **THIS IS USED**
- **Legacy:** `src/PrintPortfolio.jsx` (530) — DO NOT IMPORT; keep for reference or delete; App imports components version

Canvas: `PRINT_PERSONAL_INFO` (name Vo Nguyen Dang Khoa, title CREATIVE MANAGER & AI CREATIVE LEAD, subtitle Visual Strategy..., location/phone/email/linkedin/portfolio/gitServer, summaryHeadline/Body), `PRINT_EDUCATION` RMIT 2012-2016, `PRINT_SKILLS_CATEGORIES` 4 cats with items, `PRINT_EXPERIENCES` 5 (AI Lead, eCommerce Lead, Production Lead 2019-2020, Regional Head 2018-2019, Senior 2017-2018), `PRINT_STRATEGIC_TECH` 4 projects grid 2col, `PRINT_COLORS` primary #0F172A etc accent #00C853, `PRINT_STYLES` inline container 210mm×297mm flex, sidebar 72mm #F1F5F9 border #CBD5E1, main flex1 7mm padding, text pt sizes 5.5-14.5pt JetBrains Mono/Inter, export default flex row sidebar+main.

Legacy root version differs: BW #000000, 530 lines, 3mm sidebar accent, 8 exps + awards, projects 4 vertical list, no subtitle.

---

## 12. Styling System (Design Tokens)

### CSS Files

- **src/index.css** (914) — MUST COPY VERBATIM; highlights:
  - `@import` Inter+Newsreader+JetBrains+IBM Plex Mono
  - `@tailwind base/components/utilities` + `.custom-scrollbar { scrollbar-width:none; -ms-overflow-style:none; ::-webkit-scrollbar display:none }`
  - `:root` dark vars: bg-primary #0A0D0C, bg-secondary #111614, bg-elevated #161C19, text primary #F2F5F3 etc, accent #00FF87, glass-bg rgba(14,19,17,0.68), grid rgba(0,255,135,0.03), iridescent radial at 44.373% 35.1526%
  - `[data-theme="light"]` swap: bg #F8FAFA primary, text #0D1210 etc, accent subtle rgba(0,200,83,0.08), iridescent purple/orange/green
  - `html scroll-behavior smooth; color-scheme dark`, `body` bg var transition 0.4s cubic 0.16,1,0.3,1, `font-pixel basis33`, `::selection` rgba(0,255,135,0.35)
  - `.noise-overlay` fixed inset svg fractalNoise baseFrequency 0.75 opacity 0.03 z9999
  - `.badge-iridescent` + `::before` gradient mask + `.badge-iridescent-text` gradient clip
  - `.serif-accent` Newsreader italic 500 gradient 120deg #00FF87→#00E5FF→#D0B2FF clip, `.iridescent-text` radial clip, `.iridescent-glow-text::after` blur12 mix-blend screen 0.75
  - `.glass-card` bg var blur24 border1, `.glass-card-hover:hover` border rgba0,255,135,0.35 glow, `.prompt-card-hover` y-4 + media zoom 1.04
  - `.shimmer-box::after` translateX -100→100 2.2s infinite linear
  - `.nav-island` rgba10,13,12,0.75 border 0.1 blur24 + light variant
  - `.btn-iridescent` radial gradient pill #0A0D0B text shadow 0 8px 30px, hover y-2 brightness1.05, `.btn-glass` glass blur16 hover border 0.4
  - `.mesh-bg/.mesh-blob` absolute circle blur100 opacity0.3 ×3 radial gradients
  - `.marquee` border top/bottom mask linear 10→90%, `.marquee-row` flex gap3rem white-nowrap width max-content animate marquee-scroll 35s linear infinite pause hover, `.marquee-item` JetBrains 0.825rem 600 0.14em, `.marquee-sep` 4px #00FF87 glow
  - `.skill-chip` pill mono 0.8rem #A1ACA6 bg3% border hover white + translateY-2 glow
  - `.line-clamp-2/3`, print `.print-only-version` etc, `@media print` A4 exact 210mm 297mm with cover/contact pages, `::-webkit-scrollbar` 8px #0A0A track thumb #00FF94 hover #00D9FF, `.grayscale-blur` hover, `.crt-screen` text-shadow 0 0 4px rgba0,255,148,0.6 + scanline repeating-linear + vignette radial + flicker 0.15s infinite + sweep 5s linear height12px

- **src/print.css** (113) — MUST COPY VERBATIM; `@import Inter+JetBrains`, `.standalone-print-mount display none` → print block, `@media print` @page A4 portrait margin0, * backdrop-filter none, html/body bg white print-color-adjust exact overflow visible, hide .no-print .noise-overlay .app-main>header/main/footer/nav .crt-screen, backdrop static white, wrapper static, printable-cv-area 210mm 297mm block, print-portfolio-content flex row 210mm, aside/section flex column flex1, * exact

### Tailwind Tokens (already in §6)

Colors reference CSS vars: bg primary/secondary/elevated, text primary/secondary/muted, accent DEFAULT/mint/cyan/purple/peach/subtle, border subtle/glass. Fonts sans Inter, display Inter, serif Newsreader, mono JetBrains/IBM Plex, pixel basis33. Animations gradient-shift 8s, shimmer 2.2s, pulse-glow 3s, float 6s, spin-slow 12s. Shadows glow-sm/md/lg/cyan/purple/glass.

---

## 13. Public Assets

### vndk-icon.svg (verbatim)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
  <style>
    .vn { stroke: #17171C; }
    .dk { stroke: #00FF87; }
    @media (prefers-color-scheme: dark) { .vn { stroke: #FFFFFF; } }
  </style>
  <path class="vn" d="M 14 20 L 29 41 L 44 20" />
  <path class="vn" d="M 56 41 L 56 20 L 86 41 L 86 20" />
  <path class="dk" d="M 14 59 L 28 59 C 41 59 41 80 28 80 L 14 80 Z" />
  <path class="dk" d="M 56 59 L 56 80 M 86 59 L 56 69.5 L 86 80" />
</svg>
```

### human_head_turn.mp4

- 2.7 MB, path `/human_head_turn.mp4` (public root → URL `/human_head_turn.mp4`)
- In Hero: `<video src="/human_head_turn.mp4" autoPlay muted loop playsInline preload="auto" class="... opacity-35 ... mix-blend-luminosity dark:mix-blend-screen lg:scale-[1.1]">`
- MUST COPY binary verbatim; fallback if missing: hero still renders with vignette gradients only

### robots.txt (verbatim)

```
User-agent: *
Allow: /

# Specifically allow major AI crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Omgili
Allow: /

User-agent: FacebookBot
Allow: /
```

### llms.txt (root + public copy)

Root `llms.txt` (71 lines) + copy to `public/llms.txt` (same). Content: # Khoa Vo - CV, Availability open, About, Contact, Creative Profile 9+ years etc, Technical Profile 5+ apps, Professional Experience 5 jobs. **Copy verbatim** from `llms.txt`.

### 1757983784523_edit_18156554308333.jpg

Present in latest backup scan (356K). If exists in current project public/, copy. If not, ignore.

---

## 14. Scripts & Build Pipeline

### scripts/fetch-forgejo-data.mjs (verbatim, 101 lines)

```js
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FORGEJO_API = 'https://git.khoavo.myds.me/api/v1';
const USERNAME = 'vndangkhoa';

const FEATURED_REPOS = [
  {
    id: 99,
    name: "spkrepo",
    fullName: "vndangkhoa/spkrepo",
    description: "Synology Community Package Center & Repository Server (pkg.khoavo.myds.me) — serves custom SPK packages with GPG signing for 1-click install in DSM Package Center",
    htmlUrl: "https://git.khoavo.myds.me/vndangkhoa/spkrepo",
    language: "Python",
    updatedAt: "2026-08-29T14:30:00+07:00",
    createdAt: "2026-08-20T10:00:00+07:00",
    mirror: false,
    mirrorUpdated: "0001-01-01T00:00:00Z",
    topics: ["synology", "package-center", "spk", "gpg", "repository", "dsm"],
    stars: 1, forks: 0, watchers: 1, releases: 1
  }
];

async function fetchRepos() {
  const token = process.env.FORGEJO_TOKEN || process.env.GIT_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};
  const url = token
    ? `${FORGEJO_API}/user/repos?limit=100`
    : `${FORGEJO_API}/users/${USERNAME}/repos?limit=100`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const data = await res.json();
  const fetched = data.map(r => ({
    id: r.id,
    name: r.name,
    fullName: r.full_name,
    description: r.name === 'kv-synology'
      ? "Synology DSM Web Manager & AI MCP Hub — Next.js 15, React 19, QuickConnect resolver, services controller (SMB, NFS, SSH, WebDAV), and 42 AI MCP tools"
      : (r.description || ''),
    htmlUrl: r.html_url,
    language: r.language || '',
    updatedAt: r.updated_at,
    createdAt: r.created_at,
    mirror: r.mirror,
    mirrorUpdated: r.mirror_updated,
    topics: r.topics || [],
    stars: r.stars_count || 0,
    forks: r.forks_count || 0,
    watchers: r.watchers_count || 0,
    releases: r.release_counter || 0,
  }));
  for (const featured of FEATURED_REPOS) { if (!fetched.some(r => r.name === featured.name)) fetched.push(featured); }
  return fetched.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt) || new Date(b.createdAt) - new Date(a.createdAt));
}

async function main() {
  try {
    const repos = await fetchRepos();
    const langCount = {};
    repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
    const output = { fetchedAt: new Date().toISOString(), totalRepos: repos.length, totalLanguages: Object.keys(langCount).length, languages: langCount, repos };
    const outPath = resolve(__dirname, '..', 'src', 'data', 'forgejo-repos.json');
    writeFileSync(outPath, JSON.stringify(output, null, 2));
    console.log(`[forgejo] Written ${repos.length} repos to src/data/forgejo-repos.json`);
  } catch (err) {
    console.error('[forgejo] Failed to fetch repos:', err.message);
    console.log('[forgejo] Continuing with existing data...');
  }
}
main();
```

**Behavior:** No throw on failure; CI continues with committed JSON. Token optional. `kv-synology` description override.

### Build Script

`package.json build: node scripts/fetch-forgejo-data.mjs && vite build` → outputs `dist/` (gitignored). Forgejo CI deploys `dist/` on push to `main`.

---

## 15. State, Theming & Persona Logic

```js
// App.jsx state
const [darkMode, setDarkMode] = useState(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('kv-portfolio-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return true;
});
useEffect(() => {
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', darkMode);
  document.documentElement.classList.toggle('light', !darkMode);
  localStorage.setItem('kv-portfolio-theme', darkMode ? 'dark' : 'light');
}, [darkMode]);

const [tab, setTab] = useState('creative'); // 'creative' | 'dev'
const [easterEggOpen, setEasterEggOpen] = useState(false);
const [showPrintPreview, setShowPrintPreview] = useState(false);
const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

// Event bridge for downloadCV()
useEffect(() => {
  const handleOpenPdf = () => setShowPrintPreview(true);
  window.addEventListener('open-pdf-preview', handleOpenPdf);
  return () => window.removeEventListener('open-pdf-preview', handleOpenPdf);
}, []);
```

Persona branching occurs in: `About`, `Skills`, `Projects`, `Experience`, `Contact`, `Hero` via `tab === 'creative'` ternary.

---

## 16. Data Flow Diagrams

### Creative

```
usePortfolioPosts({perPage:12}) → fetch portfolio.khoavo.myds.me/wp-json/wp/v2/posts?per_page=12&page=1&_embed
→ X-WP-TotalPages → map stripHtml/getFeaturedImage → posts[] → transformToProject → filteredList → visibleList (6→all)
→ CreativeMotionCard / CompactListRow → external link + copy
```

### IT / Forgejo

```
npm run build → scripts/fetch-forgejo-data.mjs → fetch git.khoavo.myds.me/api/v1/users/vndangkhoa/repos?limit=100 (or /user/repos with token)
→ write src/data/forgejo-repos.json (fetchedAt, totalRepos, totalLanguages, languages{}, repos[]) → import buildData (instant)
→ useForgejoRepos → useState(buildData) → fetch live in useEffect → 5min polling → silent warn on CORS/fail → keep build data
→ filtered by language → visibleList → DevMotionCard / CompactListRow
```

---

## 17. Deployment

- **Host:** `khoavo.myds.me` via Forgejo CI/CD on `main` push
- **Steps:** 1) `npm run build` (fetch + vite) 2) deploy `dist/` to web server (Synology NAS Nginx)
- **Alt manual:** `npm run build && rsync -av dist/ user@nas:/volume1/web/khoavo/` or similar
- **No env required** except optional `FORGEJO_TOKEN`/`GIT_TOKEN` for private repos; without token uses public `/users/.../repos`
- **Preview:** `npm run preview` → Vite preview server

---

## 18. Verification Checklist

After rebuild, AI must verify:

- [ ] `npm install` succeeds, no peer errors
- [ ] `node scripts/fetch-forgejo-data.mjs` writes `src/data/forgejo-repos.json` with 19 repos (or logs fallback)
- [ ] `npm run dev -- --host 0.0.0.0 --port 5173` launches, `http://localhost:5173` renders
  - [ ] Navbar capsule visible, TabSwitch toggles `creative`/`dev` content
  - [ ] Hero video plays (or gradient fallback), headline `BRINGING THE UNEXPECTED` iridescent
  - [ ] Marquee scrolls 20 items with `·`
  - [ ] About bento 2 cards, Skills chips hover
  - [ ] Projects: creative grid 6 → Expand to view all → list mode → filter capsules; dev same with language dots
  - [ ] Experience timeline vertical line + nodes + journey grid on dev
  - [ ] Contact mesh + email copy + Download PDF
  - [ ] Dark/Light toggle flips vars (bg #0A0D0C ↔ #F8FAFA)
  - [ ] Easter Egg (Terminal icon) → boot 7 lines → banner → `help` works → ESC closes
  - [ ] PDF CV (FileText) → overlay z200 + Download PDF → `Vo_Nguyen_Dang_Khoa_Creative_CV.pdf` downloads via jspdf OR print dialog if html2canvas fails
  - [ ] Print (Ctrl+P) shows A4 only (`print.css` hides .app-main, shows printable-cv-area)
- [ ] `npm run build` succeeds → `dist/index.html` + `dist/assets` exist
- [ ] `npm run preview` serves build
- [ ] No console errors on persona switch or polling (warn only on CORS)
- [ ] `vndk-icon.svg` favicon renders, `robots.txt` at `/robots.txt`, `llms.txt` at `/llms.txt`

---

## 19. Recreation Command Chain (Copy-Paste)

```bash
# Full one-shot rebuild (AI can execute sequentially)
mkdir -p kv-cv/public kv-cv/src/components/ui kv-cv/src/data kv-cv/src/hooks kv-cv/scripts kv-cv/backup/instructions
cd kv-cv
cat > package.json <<'JSON'
{
  "name": "khoavo-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": { "dev": "vite", "build": "node scripts/fetch-forgejo-data.mjs && vite build", "preview": "vite preview" },
  "dependencies": {
    "framer-motion": "^12.38.0",
    "html2canvas": "^1.4.1",
    "jspdf": "^4.2.1",
    "lucide-react": "^0.469.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.4.3"
  }
}
JSON
cat > .gitignore <<'IGN'
node_modules/
dist/
.DS_Store
.env
*.local
IGN
# then drop ALL verbatim files per §§6-14 (see original repo or backup/instructions for full dumps)
npm install
node scripts/fetch-forgejo-data.mjs || echo "using committed JSON"
npm run build && echo "BUILD OK" && ls -lh dist/
```

**Next:** For segmented dumps, see `backup/instructions/01-overview.md` → `07-build-deploy.md`.  
For EXACT file copies, `rsync -av /original/kv-cv/src ./src` and `cp -r /original/kv-cv/public ./public` after scaffold.

---

## Appendix: Full File List Checksums (for validation)

Run after rebuild:

```bash
wc -l src/App.jsx src/main.jsx src/index.css src/print.css src/components/**/*.jsx src/hooks/*.js src/data/*.js
cat src/data/forgejo-repos.json | python3 -c "import json,sys; d=json.load(open('src/data/forgejo-repos.json')); print(f\"repos={d['totalRepos']} langs={d['totalLanguages']} fetchedAt={d['fetchedAt']}\")"
ls -lh public/human_head_turn.mp4 public/vndk-icon.svg
npm run build 2>&1 | tail -20
```

Expected: `src/App.jsx 138`, `src/index.css 914`, `forgejo 19 repos 9 langs`, `dist` non-empty, no build errors.

---

*End of Master Guide — AI should now be able to re-create kv-cv 1:1. For granular per-file code blocks, drill into `backup/instructions/`.*

