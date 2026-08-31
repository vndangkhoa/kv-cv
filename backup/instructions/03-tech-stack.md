# 03 — Tech Stack & Config Reconstruction

> Module 3 of 7

## Stack Table

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | React | ^18.3.1 | SPA UI |
| DOM | react-dom | ^18.3.1 | mount |
| Build | Vite | ^6.4.3 | dev server + build |
| Plugin | @vitejs/plugin-react | ^4.3.4 | JSX/HMR |
| Styling | Tailwind CSS | ^3.4.17 | utility classes |
| PostCSS | postcss + autoprefixer | ^8.4.49 / ^10.4.20 | Tailwind pipeline |
| Animation | Framer Motion | ^12.38.0 | motion.div, AnimatePresence, layoutId |
| Icons | lucide-react | ^0.469.0 | Sun/Moon/Terminal/etc |
| PDF | html2canvas | ^1.4.1 | DOM→canvas |
| PDF | jspdf | ^4.2.1 | canvas→A4 PDF |
| Types | @types/react / @types/react-dom | ^18.3.12 / ^18.3.1 | dev typing |
| Runtime | Browser fetch | native | WordPress + Forgejo APIs |
| Fonts | Google Fonts + onlinewebfonts | CDN | Inter, Newsreader, JetBrains, basis33 |

No state lib (useState only), no router (SPA scroll), no backend.

## package.json (verbatim)

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

**Notes:**
- `type:module` → ESM, so `vite.config.js` uses `import`, `postcss.config.js` uses `export default`, `scripts/fetch-forgejo-data.mjs` uses `import`.
- `build` pre-fetches Forgejo before Vite so `forgejo-repos.json` is fresh.

## vite.config.js (verbatim)

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

No `base` path, no proxy, no alias. Default `dist/` outDir, `index.html` entry.

## postcss.config.js (verbatim)

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## tailwind.config.js (verbatim)

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

**Key:** `content` must cover `index.html` + `src` glob. `darkMode: 'class'` enables `dark:` variants toggling via `document.documentElement.classList.add('dark')`.

## .gitignore (verbatim)

```
node_modules/
dist/
.DS_Store
.env
*.local
```

## start.sh (verbatim)

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

Run `chmod +x start.sh`. Exec replaces shell with Vite dev server on 0.0.0.0:5173 (bind all interfaces for container/NAS).

## index.html (verbatim)

See master §7. Must include:
- Preconnect googleapis/gstatic
- Inter 300-900 + basis33 pixel fonts
- og:* meta (profile)
- llms.txt alternate link
- JSON-LD Person schema (jobTitle array, sameAs linkedin + forgejo, seeks Demand, knowsAbout)
- `<div id="root">` + `<script type="module" src="/src/main.jsx">`

## Installation Order (to avoid peer errors)

```bash
npm install react@^18.3.1 react-dom@^18.3.1
npm install framer-motion@^12.38.0 lucide-react@^0.469.0 html2canvas@^1.4.1 jspdf@^4.2.1
npm install -D vite@^6.4.3 @vitejs/plugin-react@^4.3.4 tailwindcss@^3.4.17 postcss@^8.4.49 autoprefixer@^10.4.20 @types/react@^18.3.12 @types/react-dom@^18.3.1
# or single npm install after package.json is correct
npx tailwindcss init -p  # if overwriting, ensure manual files win
```

## Vite Behavior

- `vite` dev: HMR, port 5173, host 0.0.0.0 via start.sh, otherwise localhost.
- `vite build`: outputs `dist/index.html` + `dist/assets` (hashed js/css). No SSR.
- `vite preview`: serves `dist` on 4173.

## Troubleshooting

- If `tailwindcss init -p` overwrites configs, re-apply verbatim.
- If `html2canvas` fails (CORS), PDF falls back to `window.print()`.
- If Forgejo fetch fails (CORS/no token), buildData stays, polling silently warns.
- Ensure Node >=18 for native fetch in script.
