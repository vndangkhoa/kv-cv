# Backup — kv-cv Reconstruction Kit

**Created:** 2026-08-31  
**Project:** `khoavo-portfolio` v1.0.0 — Dual Persona Portfolio  
**Source:** `/home/x1/Documents/Projects/kv-cv`  
**Author:** Vo Nguyen Dang Khoa

## How to Use (AI Agent)

1. **Read the master guide:** `backup/KV-CV-REBUILD-MASTER.md` — single file containing *all* info to re-create the project 1:1. Execute its §3 Scaffold Steps and §19 command chain in order.

2. **For modular execution:** read `backup/instructions/` sequentially:
   - `01-overview.md` — concept & personas
   - `02-structure.md` — file tree & import graph
   - `03-tech-stack.md` — package.json + vite/tailwind/postcss verbatim
   - `04-design-system.md` — CSS variables, Tailwind tokens, VNDK logo, print
   - `05-data-models.md` — PERSONAL_INFO, CREATIVE_DATA, IT_DATA, forgejo JSON, Print models, hooks shapes
   - `06-components.md` — every JSX component props & structure (copy verbatim for build)
   - `07-build-deploy.md` — fetch script, vite build, nginx, verification

3. **For binary-exact restore:** also archive `public/human_head_turn.mp4` (2.7 MB), `package-lock.json`, `src/data/forgejo-repos.json`.

## Structure

```
backup/
├── KV-CV-REBUILD-MASTER.md      # 982 lines, 46K — THE single rebuild bible
├── README.md                    # this index
└── instructions/
    ├── 01-overview.md            # 71 lines
    ├── 02-structure.md           # 139 lines
    ├── 03-tech-stack.md          # 230 lines
    ├── 04-design-system.md       # 193 lines
    ├── 05-data-models.md         # 276 lines
    ├── 06-components.md          # 252 lines
    └── 07-build-deploy.md        # 205 lines
Total 2,348 lines across 8 MD files (124K)
```

## Quick Rebuild (copy-paste)

```bash
tar -czf kv-cv-backup-2026-08-31.tar.gz backup/ package.json package-lock.json public/ src/ scripts/ index.html vite.config.js tailwind.config.js postcss.config.js .gitignore start.sh llms.txt
# restore
tar -xzf kv-cv-backup-*.tar.gz && cd kv-cv && npm install && node scripts/fetch-forgejo-data.mjs || true && npm run build && npm run preview
```

## Validation

```bash
wc -l backup/KV-CV-REBUILD-MASTER.md backup/instructions/*.md
du -sh backup/
find src -type f | sort   # compare with 02-structure.md tree
cat src/data/forgejo-repos.json | python3 -c "import json; d=json.load(open('src/data/forgejo-repos.json')); print(d['totalRepos'], d['totalLanguages'])"
# expect 19 9
```

## Notes

- Canonical PrintPortfolio is `src/components/PrintPortfolio.jsx` (446 lines, emerald). Legacy `src/PrintPortfolio.jsx` (530, BW) is not imported — do not wire it in App.jsx.
- `html2canvas` + `jspdf` are for PDF export; app renders fine without them but download will fallback to `window.print()`.
- No secrets required; `FORGEJO_TOKEN` optional.
