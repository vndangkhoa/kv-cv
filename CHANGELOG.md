# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.7] - 2026-10-09

### Added & Optimized
- **Liquid Glass Layout & Orange Horse Sticky Gallery**:
  - Implemented editorial scrollytelling landing experience with dynamic dual-persona modes.
  - Interactive sticky card deck with vertical stacking, scroll scrub navigation, and full mobile responsiveness.
- **Docked Rounded Footer & Call-to-Action**:
  - Implemented immersive editorial contact hero with ambient cosmic particle atmosphere and interactive email copy capsule.
  - Docked rounded liquid glass sheet featuring brand monogram emblem, primary action pills (`Download CV`, `Terminal OS`), and multi-column navigation (`Insights`, `Connect`, `Intel`).
- **Kinetic Character Engine Performance Architecture**:
  - Implemented pre-baked offscreen Sprite/Glyph Atlas blitting (`ctx.drawImage`), replacing expensive `ctx.fillText` font rasterization.
  - Precomputed typed array LUTs (`CHAR_INDEX_LUT`, `CONTRAST_LUT`) for instant $O(1)$ contrast and character mapping.
  - Integer Manhattan edge detection and spatial mouse bounding box.
  - Native video rate throttling (24–30 FPS) with `requestVideoFrameCallback` integration.
  - Clamped DPR (1.0 on low-end, 1.25 max) and adaptive self-tuning cell degradation for low-spec devices.
- **Verified Referees & Ecosystem Telemetry**:
  - Added verified client and engineering peer testimonials (Vu Tran - CEO Tam Son Yachting, Dung Bui - Principal Systems Engineer at Nike).
  - Direct integration of verified feedback and reviews from live Synology Package Hub and TrimUI ecosystems.
- **Design & Nomenclature Modernization**:
  - Unified monochrome dark liquid aesthetic with high-contrast editorial typography.
  - Cleaned navigation and removed legacy naming across documentation and metadata.

---

## [2.0.6] - 2026-10-05

### Added
- **Security Consultant & Systems Architect Printable CV (IT Focus)**:
  - Added dedicated 2-page Information Security & Systems Architect CV tailored for Group Security consulting, threat modeling, and secure systems design.
  - Aligned with National Australia Bank (NAB) Security Consultant Grade 3 JD: non-normative flow analysis, STRIDE threat modeling, defensive controls, and compensating controls.
  - Spotlighted cryptographic and forensic controls in `ola` (dynamic watermarking DRM, tamper blanking), `kv-file-pro` (Argon2id, RFC 6238 TOTP, Ed25519 asymmetric licensing, dunce sandboxing), and `kv-trimui` (Musl static toolchain compensating control).
- **Interactive Multi-Mode PDF Preview & Print Engine**:
  - Live 3-way toggle switcher inside the PDF preview modal: `[ 🛡️ IT / Security (2p) ]`, `[ 🎨 Design (1p) ]`, and `[ 📑 Full Portfolio (3p) ]`.
  - Dynamic document naming for browser PDF downloads (`Khoa Vo - Security Consultant & Systems Architect.pdf` / `Khoa Vo - Creative Manager & AI Innovation Lead.pdf`).
  - Contextual `Security CV` vs `Design CV` trigger buttons across Navbar, Hero, Navigation Drawer, and Contact components.

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
- WordPress REST API hook (`usePortfolioPosts.js`) connecting live creative projects from `portfolio.khoavo.vndns.net`.

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
