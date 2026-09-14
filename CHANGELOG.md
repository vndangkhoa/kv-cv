# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-09-14

### Added
- **Docker Containerization**:
  - Multi-stage `Dockerfile` with Node 20 Alpine builder and lightweight Nginx Alpine production server.
  - Production `nginx.conf` with gzip compression, security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`), byte-range support for video scrubbing, and immutable asset caching.
  - Ready-to-use `docker-compose.yml` with automated container healthcheck and port mapping.
  - Docker Hub automated image publishing for `vndangkhoa/kv-cv:latest` and `vndangkhoa/kv-cv:2.0.0`.
- **Scrolly Video Experience**:
  - High-performance `ScrollyVideo.jsx` scrubbing `human_head_turn.mp4` accurately with scroll depth and lerp smoothing.
- **3D WebGL Canvas & Shaders**:
  - Custom Three.js / WebGL shader pipeline (`ScrollHero.jsx`, `UnderwaterScene.jsx`) with realistic water caustics, floating particles, and interactive depth displacement.
- **Direct Client-Side PDF Generator**:
  - Integrated `html2canvas` + `jspdf` pipeline inside `PrintPortfolio.jsx` generating 1-page A4 printable resumes with zero layout shifting or blank-page issues on mobile.
- **Modular Component Architecture**:
  - Modularized entire codebase into dedicated components (`About`, `Contact`, `EasterEgg`, `Experience`, `Hero`, `Navbar`, `NavigationDrawer`, `PrintPortfolio`, `Projects`, `ScrollyVideo`, `Skills`).
  - Reusable UI primitives (`GlassCard`, `Marquee`, `MeshBackground`, `ProgressiveBlur`, `Reveal`, `TabSwitch`, `VNDKLogo`).
- **Dynamic Repository Integration**:
  - Node.js build scraper (`scripts/fetch-forgejo-data.mjs`) pulling repository metadata from GitHub and Forgejo APIs with descriptions and topic highlights.
  - Polling hook (`useForgejoRepos.js`) supporting background synchronization.

### Changed
- Complete visual redesign inspired by the modern **MotionSites.ai** design language — dark luxury glassmorphic surfaces, neon phosphor accents (`#00FF94`), subtle border glows, and typography.
- Enhanced navigation with responsive `NavigationDrawer.jsx` and quick persona switching.
- Prominently spotlighted flagship ecosystem projects: `kv-synology`, `vietc`, `Sys-Arc-Visl`, `kv-netflix`, and `kv-music`.

### Fixed
- Fixed mobile PDF export producing blank documents by implementing a direct canvas rasterization pipeline.
- Resolved race conditions in initial mount and print style stylesheet injection.
- Handled network CORS failures gracefully by utilizing pre-generated static snapshots in `forgejo-repos.json`.

---

## [1.2.0] - 2026-08-01

### Added
- **CRT Terminal Easter Egg**:
  - Retro hacker terminal overlay with simulated boot sequence and shell commands (`help`, `about`, `skills`, `projects`, `clear`, `exit`).
- **Dynamic VNDK Logo**:
  - Letter deconstruction and reconstruction animation tied directly to window scroll coordinates.
- **Optimized 1-Page A4 Resume Layout**:
  - Dedicated print stylesheet and preview modal structured for agency executive and ATS scanning.

### Changed
- Replaced cumbersome browser print dialog triggers with unified preview and download actions.
- Polished responsive grid layouts for tablet and mobile viewports.

---

## [1.1.0] - 2026-04-15

### Added
- Dynamic build-time Forgejo API integration for automated repo catalog generation.
- **AI SEO Optimization**:
  - Machine-readable context in `llms.txt`.
  - JSON-LD structured schema metadata in `index.html`.
  - Optimized crawler permissions in `robots.txt`.
- WordPress REST API hook (`usePortfolioPosts.js`) connecting live creative projects from `portfolio.khoavo.myds.me`.

### Fixed
- Fixed viewport jitter during window resize in retro desktop layout.

---

## [1.0.0] - 2026-04-10

### Added
- Initial public release of **Khoa.Vo Dual Persona Portfolio**.
- Dual persona switcher: **Creative Manager & Design Leader** vs **Full-Stack Developer & DevOps**.
- Dark & Light mode support with automatic system preference detection and local storage persistence.
- React 18, Vite 6, Tailwind CSS 3, and Framer Motion 12 baseline stack.
- Interactive project showcase with bento grid and filterable categorization.
