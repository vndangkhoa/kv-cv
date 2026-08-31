# 02 — Project Structure & File Map

> Module 2 of 7

## Tree (with bytes/line counts)

```
kv-cv/  (project root)
├── .gitignore                  5 lines, 42 bytes
├── index.html                  66 lines, 2974 bytes  → entry, SEO, JSON-LD, fonts, #root
├── package.json                28 lines, 664 bytes
├── package-lock.json           104211 bytes (npm lock, regenerate via npm install)
├── postcss.config.js           6 lines, 80 bytes
├── tailwind.config.js          77 lines, 2483 bytes
├── vite.config.js              6 lines, 96 bytes
├── start.sh                    12 lines, 243 bytes, chmod +x
├── README.md                   145 lines, 5479 bytes (human overview)
├── llms.txt                    71 lines, 4084 bytes (LLM CV)
├── results.txt                 (build log, ignore)
├── public/                     (static assets, copied verbatim to dist)
│   ├── human_head_turn.mp4     2819783 bytes (2.7 MB hero video)
│   ├── vndk-icon.svg           656 bytes (favicon + logo)
│   ├── robots.txt              30 lines, 356 bytes
│   ├── llms.txt                4084 bytes (duplicate of root)
│   └── 1757983784523_edit_...jpg  356K image (present in latest scan, optional)
├── scripts/
│   └── fetch-forgejo-data.mjs  101 lines
├── src/
│   ├── main.jsx                10 lines (entry)
│   ├── App.jsx                 138 lines (orchestrator)
│   ├── index.css               914 lines (design system)
│   ├── print.css               113 lines (@media print)
│   ├── PrintPortfolio.jsx      530 lines (LEGACY root, NOT imported)
│   ├── data/
│   │   ├── personal.js         67 lines
│   │   ├── creative.js         178 lines
│   │   ├── dev.js              132 lines
│   │   └── forgejo-repos.json  353 lines, JSON 19 repos 9 langs
│   ├── hooks/
│   │   ├── useForgejoRepos.js  120 lines
│   │   └── usePortfolioPosts.js 136 lines
│   └── components/
│       ├── Navbar.jsx          212 lines
│       ├── Hero.jsx            200 lines
│       ├── About.jsx           129 lines
│       ├── Skills.jsx          98 lines
│       ├── Projects.jsx        502 lines
│       ├── Experience.jsx      128 lines
│       ├── Contact.jsx         160 lines
│       ├── EasterEgg.jsx       418 lines
│       ├── PrintPortfolio.jsx  446 lines (CANONICAL)
│       └── ui/
│           ├── VNDKLogo.jsx    63 lines
│           ├── TabSwitch.jsx   46 lines
│           ├── GlassCard.jsx   24 lines
│           ├── Reveal.jsx      16 lines
│           ├── Marquee.jsx     23 lines
│           └── MeshBackground.jsx 24 lines
├── dist/                       (generated, gitignored)
├── node_modules/               (generated, gitignored)
└── backup/
    ├── KV-CV-REBUILD-MASTER.md (master)
    └── instructions/
        ├── 01-overview.md
        ├── 02-structure.md       (this file)
        ├── 03-tech-stack.md
        ├── 04-design-system.md
        ├── 05-data-models.md
        ├── 06-components.md
        └── 07-build-deploy.md
```

## Import Graph

```
index.html → src/main.jsx → src/App.jsx → src/index.css + src/print.css
App.jsx imports:
  Navbar, Hero, About, Skills, Projects, Experience, Contact, EasterEgg (all components)
  Marquee (ui), PrintPortfolio (components/PrintPortfolio.jsx), exportPdfDirectly (data/personal)

Navbar → TabSwitch, VNDKLogo, PERSONAL_INFO
Hero → TabSwitch, PERSONAL_INFO, downloadCV
About → GlassCard, Reveal, VNDKLogo, PERSONAL_INFO, CREATIVE_DATA, IT_DATA
Skills → GlassCard, Reveal, CREATIVE_DATA, IT_DATA, lucide icons
Projects → GlassCard, Reveal, usePortfolioPosts, useForgejoRepos, lucide
Experience → GlassCard, Reveal, CREATIVE_DATA, IT_DATA
Contact → MeshBackground, Reveal, PERSONAL_INFO, IT_DATA
EasterEgg → IT_DATA, CREATIVE_DATA, PERSONAL_INFO, framer-motion
PrintPortfolio (components) → VNDKLogo
data/personal → html2canvas, jspdf
hooks/useForgejoRepos → data/forgejo-repos.json
hooks/usePortfolioPosts → fetch API
```

## Critical Duplication Note

- `src/PrintPortfolio.jsx` vs `src/components/PrintPortfolio.jsx`
  - Root: 530 lines, BW (#000000), 75mm sidebar border 2px black, 8 experiences (adds Graphic Artist Le Meridien 2016-2017, Animation Designer Adidas 2015-2016), awards, projectCards vertical left border 1.5px.
  - Components: 446 lines, emerald #00C853, 72mm sidebar #F1F5F9, 5 experiences, 4 projects grid 1fr1fr, categories, footer.
  - **App.jsx uses components version.** Keep both or delete root; build not affected.

## Public vs Src Data

- `public/llms.txt` is duplicate of root `llms.txt` for serving at `/llms.txt` URL (index.html links `<link rel="alternate" href="/llms.txt">`). Vite copies `public/*` to `dist/*`.
- `public/vndk-icon.svg` is favicon (`/vndk-icon.svg` in index.html). Also rendered via `VNDKLogo.jsx` (SVG paths duplicated as JSX).

## Scripts

- `scripts/fetch-forgejo-data.mjs` writes to `src/data/forgejo-repos.json`. Must exist before `vite build` for import to resolve. If fetch fails, file remains with previous data (try/catch continues).

## How to Re-create Skeleton

```bash
mkdir -p kv-cv/public kv-cv/src/components/ui kv-cv/src/data kv-cv/src/hooks kv-cv/scripts kv-cv/backup/instructions
touch kv-cv/.gitignore kv-cv/index.html kv-cv/package.json kv-cv/vite.config.js kv-cv/tailwind.config.js kv-cv/postcss.config.js kv-cv/start.sh kv-cv/README.md kv-cv/llms.txt
touch kv-cv/src/main.jsx kv-cv/src/App.jsx kv-cv/src/index.css kv-cv/src/print.css kv-cv/src/PrintPortfolio.jsx
touch kv-cv/src/data/personal.js kv-cv/src/data/creative.js kv-cv/src/data/dev.js kv-cv/src/data/forgejo-repos.json
touch kv-cv/src/hooks/useForgejoRepos.js kv-cv/src/hooks/usePortfolioPosts.js
touch kv-cv/src/components/Navbar.jsx kv-cv/src/components/Hero.jsx kv-cv/src/components/About.jsx kv-cv/src/components/Skills.jsx kv-cv/src/components/Projects.jsx kv-cv/src/components/Experience.jsx kv-cv/src/components/Contact.jsx kv-cv/src/components/EasterEgg.jsx kv-cv/src/components/PrintPortfolio.jsx
touch kv-cv/src/components/ui/VNDKLogo.jsx kv-cv/src/components/ui/TabSwitch.jsx kv-cv/src/components/ui/GlassCard.jsx kv-cv/src/components/ui/Reveal.jsx kv-cv/src/components/ui/Marquee.jsx kv-cv/src/components/ui/MeshBackground.jsx
touch kv-cv/public/vndk-icon.svg kv-cv/public/robots.txt kv-cv/public/llms.txt
# human_head_turn.mp4 binary must be copied, not touched
```

## File Permissions

- `start.sh` must be executable: `chmod +x start.sh`
- All other files `644`.

## Verification of Structure

```bash
find . -type f | sort
# should match tree above (minus dist/node_modules)
wc -l src/App.jsx src/PrintPortfolio.jsx src/index.css src/print.css src/main.jsx src/components/**/*.jsx src/hooks/*.js src/data/*.js
# expect: App 138, PrintPortfolio root 530, index.css 914, print.css 112, main 10, components total ~2489, hooks 256
ls -lh public/human_head_turn.mp4  # 2.7M
cat src/data/forgejo-repos.json | python3 -m json.tool | head -20
```
