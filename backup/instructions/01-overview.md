# 01 — Overview & Concept

> Module 1 of 7 — Read `../KV-CV-REBUILD-MASTER.md` for the single-file super-guide.

## Project Identity

- **Name:** `khoavo-portfolio` (`package.json:name`)
- **Version:** `1.0.0` • `private:true` • `type:module`
- **Description:** Single-page React portfolio for Vo Nguyen Dang Khoa — dual persona: Creative Manager & AI Innovation Lead + Full-Stack Developer & DevOps. Live at https://khoavo.myds.me, repo at https://git.khoavo.myds.me/vndangkhoa/kv-cv
- **Runtime:** Browser SPA, no SSR, no backend, static `dist/` deploy
- **Lines:** ~3,800+ source (see master §1.3)

## Dual Persona Model

| Persona | Key | Data Source | UI Personality |
|---|---|---|---|
| Creative & AI | `creative` (default) | `CREATIVE_DATA` + WordPress REST `portfolio.khoavo.myds.me/wp-json/wp/v2/posts` via `usePortfolioPosts` | Editorial bento, motion cards with image reveal, philosophy narrative, luxury brand experience |
| Full-Stack & DevOps | `dev` | `IT_DATA` + Forgejo API `git.khoavo.myds.me/api/v1` + `forgejo-repos.json` via `useForgejoRepos` | Glassmorphism terminal, language dots, journey chronology, infra storytelling |

Toggle via `TabSwitch` (`src/components/ui/TabSwitch.jsx`) — state `tab` in `App.jsx:32`. All sections branch on `tab === 'creative'`.

## Page Sections (in render order)

1. **Navbar** (`#about, #skills, #work, #experience, #contact` + brand + controls) — fixed capsule island z100
2. **Hero** (`#hero`) — 100svh, video + headline + marquee-adjacent metrics
3. **Marquee** — 20 items, separator `·`, speed 30s
4. **About** (`#about`) — ONE MIND TWO DISCIPLINES, bento 5+7 cols
5. **Skills** (`#skills`) — TOOLS OF THE CRAFT, 4 or 7 cards
6. **Projects** (`#work`) — SELECTED PRODUCTION WORK, filter + grid/list, CreativeMotionCard/DevMotionCard
7. **Experience** (`#experience`) — Timeline + (dev) journey grid
8. **Contact** (`#contact`) — Mesh bg + email pill + 3 cards + CTA + footer
9. **EasterEgg** — CRT terminal overlay z150, boot → interactive shell
10. **PrintPortfolio** — PDF preview z200 + hidden print mount, A4 cover

## Core Interactions

- **Theme:** `darkMode` bool → `data-theme` attr + `dark`/`light` class on html, persists `localStorage kv-portfolio-theme`, system fallback `prefers-color-scheme`. Toggle via Sun/Moon in Navbar.
- **PDF:** `downloadCV()` dispatches `open-pdf-preview` event → App `showPrintPreview=true`; `exportPdfDirectly(onProgress)` does html2canvas→jspdf; fallback window.print().
- **Terminal:** `onEasterEgg` → `easterEggOpen=true` → boot 7 logs 160ms → welcome + input focus. Commands help/about/etc. ESC closes + body overflow hidden.
- **Projects Filter:** `selectedFilter` caps → filteredList → visibleList slice 6 vs all. `viewMode` grid/list. `hasMore` + `loadMore` for WordPress pagination.

## Personal Info (canonical)

```js
PERSONAL_INFO = {
  name: "Vo Nguyen Dang Khoa", shortName: "Khoa Vo",
  phone: "0398300340", email: "vonguyendangkhoa@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  linkedin: "https://www.linkedin.com/in/khoa-vo-76291236/",
  portfolio: "https://khoavo.myds.me/",
  github: "https://git.khoavo.myds.me/vndangkhoa",
  forgejo: "https://git.khoavo.myds.me/vndangkhoa",
  availability: "Open to work"
}
```

Print variants (sidebar) use short forms: `linkedin.com/in/khoavo93` vs `khoa-vo-76291236` — note discrepancy; canonical per `personal.js` is `khoa-vo-76291236` but print sidebar at `components/PrintPortfolio.jsx:11` uses that exact; root `PrintPortfolio.jsx:9` uses `khoavo93`. Agent should note but preserve as-is.

## External Endpoints

- WordPress: `https://portfolio.khoavo.myds.me/wp-json/wp/v2/posts?per_page=12&page=N&_embed` (headers `X-WP-TotalPages`)
- Forgejo: `https://git.khoavo.myds.me/api/v1/users/vndangkhoa/repos?limit=100` (public) or `/user/repos` with `FORGEJO_TOKEN`/`GIT_TOKEN`
- Fonts: Google `Inter` 300-900, `Newsreader` 200-800, plus `basis33` pixel via `db.onlinewebfonts.com`

## Rebuild Principle

No dynamic server; all data is static JSON or client-fetch with graceful fallback. The AI must ensure:

- `forgejo-repos.json` is committed (19 repos) so runtime works offline.
- `html2canvas`+`jspdf` are installed but not required for basic render.
- Video asset is optional (hero degrades to gradient).
