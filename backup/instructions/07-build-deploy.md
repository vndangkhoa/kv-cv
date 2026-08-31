# 07 — Build, Deploy & Operations

> Module 7 of 7

## Scripts Reference

| Script | Command | Effect |
|---|---|---|
| `dev` | `vite` | HMR dev server (default localhost:5173) |
| `build` | `node scripts/fetch-forgejo-data.mjs && vite build` | Fetch Forgejo → write JSON → Vite build to `dist/` |
| `preview` | `vite preview` | Serve `dist` on 4173 |

Via `start.sh`: `npm run dev -- --host 0.0.0.0 --port 5173` bind all interfaces.

## fetch-forgejo-data.mjs (101 lines)

**Inputs:** env `FORGEJO_TOKEN` or `GIT_TOKEN` optional

**Logic:**

```js
FORGEJO_API='https://git.khoavo.myds.me/api/v1'
USERNAME='vndangkhoa'
FEATURED_REPOS=[spkrepo id99 Python ...]
fetchRepos():
  token ? headers Authorization token : {}
  url = token ? /user/repos?limit=100 : /users/vndangkhoa/repos?limit=100
  fetch → throw if !ok → map r → {id,name,fullName,description (override if kv-synology), htmlUrl,language,updatedAt,createdAt,mirror,mirrorUpdated,topics,stars,forks,watchers,releases}
  merge FEATURED_REPOS if missing
  sort updatedAt desc || createdAt desc
main():
  try repos=await fetchRepos()
      langCount count per language
      output={fetchedAt ISO, totalRepos, totalLanguages keys length, languages, repos}
      write src/data/forgejo-repos.json JSON 2 spaces → log Written N repos
  catch → log Failed + Continuing with existing data...
```

**Invocation:** Must be before `vite build` because `useForgejoRepos` imports JSON statically. If no network, keeps committed 19-repo JSON (fetchedAt 2026-08-29). CI uses same.

**Token handling:** With token hits authenticated endpoint returning private+public; without hits public user endpoint.

## Vite Build

- Entry `index.html` → `src/main.jsx` → `src/App.jsx`
- Output `dist/` (gitignored): `index.html` (hashed assets), `assets/index-*.js` + `index-*.css`, `vndk-icon.svg`, `human_head_turn.mp4`? Vite copies public assets; verify `dist/human_head_turn.mp4` exists after build (2.7M).
- No code split manual; Vite handles CSS bundling including `index.css` + `print.css`.
- Check `vite.config.js` minimal — no base URL, so deploy at root `/`.

## Local Dev

```bash
npm install
./start.sh
# or npm run dev -- --host 0.0.0.0 --port 5173
# open http://localhost:5173 or http://<LAN_IP>:5173
```

Hot reload on any `src/` edit. Forgejo poll runs 5min in browser; WordPress fetch on mount.

## Production Build & Preview

```bash
npm run build
ls -lh dist/
npm run preview -- --host 0.0.0.0 --port 4173
# open http://localhost:4173
```

Expected logs:

```
[forgejo] Written 19 repos to src/data/forgejo-repos.json
vite v6.4.3 building for production...
✓ 120 modules transformed.
dist/index.html                  1.8 kB
dist/assets/index-xxxx.js        ~400 kB
dist/assets/index-xxxx.css       ~80 kB
✓ built in 2.5s
```

If fetch fails, still `✓ built` + `[forgejo] Failed ... Continuing`.

## Deployment (Forgejo CI/CD)

**Live host:** `khoavo.myds.me` (Synology NAS Nginx)

**Pipeline (per README § Deployment):**

1. Push to `main` triggers Forgejo Actions
2. Runner executes `npm run build` (which fetches Forgejo data)
3. Deploys `dist/` to web server (e.g., `rsync -av dist/ /volume1/web/kv-cv/` or scp + nginx reload)

**Manual deploy alternative:**

```bash
npm run build
rsync -av --delete dist/ user@khoavo.myds.me:/var/www/khoavo.myds.me/
# or via Synology File Station / Docker volume
```

**Env:** Optional `FORGEJO_TOKEN` secret in CI for private repos; otherwise public fetch suffices.

## Reverse Proxy / Nginx (typical for NAS)

```nginx
server {
  listen 80;
  server_name khoavo.myds.me;
  root /volume1/web/kv-cv/dist;
  index index.html;
  location / {
    try_files $uri $uri/ /index.html; # SPA fallback
  }
  location ~* \.(mp4|svg|jpg|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
  # QuickConnect / Forgejo proxy separate
}
```

Not part of repo but context for DevOps.

## Verification (Post-Build)

### Automated Checks

```bash
# 1. File existence
test -f dist/index.html && echo "dist OK" || echo "MISSING"
test -f dist/assets/*.js && echo "js OK"
test -f public/human_head_turn.mp4 && echo "video source OK"
test -f src/data/forgejo-repos.json && cat src/data/forgejo-repos.json | python3 -c "import json; d=json.load(open('src/data/forgejo-repos.json')); assert d['totalRepos']==19; print('repos OK')"

# 2. Build artifact integrity
npm run build 2>&1 | grep -q "built in" && echo "build passed"

# 3. Serve & curl (in background)
npm run preview -- --port 4173 & pid=$!; sleep 3; curl -sf http://localhost:4173/ | grep -q "Khoa Vo" && echo "preview OK"; kill $pid

# 4. Lint counts
wc -l src/App.jsx src/index.css src/print.css
# expect 138, 914, 112

# 5. No import errors
node --check src/data/personal.js src/data/creative.js src/data/dev.js
```

### Manual UI Checklist (see master §18)

- Navbar capsule + TabSwitch toggles creative/dev
- Hero video + headline iridescent
- Marquee scroll
- About bento, Skills chips hover
- Projects filter/grid/list/expand/copy
- Experience timeline + journey grid dev
- Contact mesh + email copy + PDF download
- Theme dark/light flips vars
- Easter Egg boot + help + ESC
- PDF overlay z200 + jspdf download / print fallback
- Print Ctrl+P A4 only

## Public Assets Hosting

- `public/*` copied to `dist/*` by Vite `publicDir`
- Verify after build: `ls dist/vndk-icon.svg dist/robots.txt dist/llms.txt dist/human_head_turn.mp4`
- Favicon `dist/vndk-icon.svg` referenced via `index.html href="/vndk-icon.svg"` → 200.
- `robots.txt` allows GPTBot etc at `/robots.txt`
- `llms.txt` at `/llms.txt` for crawlers + `<link alternate>`.

## Backup Strategy

This `backup/` folder itself should be:

- Committed or copied to external drive/NAS
- Contains `KV-CV-REBUILD-MASTER.md` + `instructions/` 7 modules
- Future AI can `cat backup/KV-CV-REBUILD-MASTER.md` and follow §19 command chain
- For full binary fidelity, also archive `public/human_head_turn.mp4` + `package-lock.json` + `src/data/forgejo-repos.json`

**Archive command:**

```bash
tar -czf kv-cv-backup-2026-08-31.tar.gz \
  backup/ package.json package-lock.json public/ src/ scripts/ index.html vite.config.js tailwind.config.js postcss.config.js .gitignore start.sh llms.txt
# verify
tar -tzf kv-cv-backup-*.tar.gz | head -40
```

## Recovery Steps for AI (TL;DR)

1. `tar -xzf kv-cv-backup-*.tar.gz && cd kv-cv`
2. `npm install`
3. `node scripts/fetch-forgejo-data.mjs || true`
4. `npm run build && npm run preview`
5. Diff against this spec: `wc -l src/*` + `cat src/data/forgejo-repos.json | jq .totalRepos` → 19

## Known Gaps / Notes for Re-creator

- Duplicate PrintPortfolio: keep both but ensure App imports `components/PrintPortfolio.jsx`.
- Image URL hotlinking: WordPress images are external; no local copy needed but offline will show broken. Consider caching if offline.
- Video size 2.7M adds to build transfer; optional to lazy load or replace with poster if bandwidth limited.
- `llms.txt` appears twice (root + public) — ensure both exist for dev vs build serving.
- `human_head_turn.mp4` not optimized; re-encode with `ffmpeg -i in.mp4 -c:v libx264 -crf 28 -preset slow -an out.mp4` if needed.
- Forgejo polling 5min may hit CORS if deployed on different domain; silent fallback keeps build data — not an error.
