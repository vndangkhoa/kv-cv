# ⚡ KHOA.VO — Dual Persona Portfolio Container

[![Docker Pulls](https://img.shields.io/docker/pulls/vndangkhoa/kv-cv?style=flat-square&logo=docker)](https://hub.docker.com/r/vndangkhoa/kv-cv)
[![Image Size](https://img.shields.io/docker/image-size/vndangkhoa/kv-cv/latest?style=flat-square)](https://hub.docker.com/r/vndangkhoa/kv-cv)
[![Live Site](https://img.shields.io/badge/Live_Site-khoavo.myds.me-00FF94?style=flat-square&logo=googlechrome&logoColor=black)](https://khoavo.myds.me)
[![GitHub](https://img.shields.io/badge/GitHub-vndangkhoa%2Fkv--cv-181717?style=flat-square&logo=github)](https://github.com/vndangkhoa/kv-cv)
[![Forgejo](https://img.shields.io/badge/Forgejo-git.khoavo.vndns.net-ff5722?style=flat-square&logo=git)](https://git.khoavo.vndns.net/vndangkhoa/kv-cv)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://github.com/vndangkhoa/kv-cv/blob/main/LICENSE)

Official, production-hardened Docker image for **`kv-cv`**, the dual-persona interactive portfolio of **Vo Nguyen Dang Khoa (Khoa Vo)**. Engineered with React 18, Vite 6, Three.js WebGL shaders, Framer Motion, and served via an optimized Nginx Alpine static server.

---

## 🚀 Quick Start

### Option 1: Run with Docker CLI

```bash
# Pull the latest image
docker pull vndangkhoa/kv-cv:latest

# Run container on port 8080
docker run -d \
  --name kv-cv \
  --restart unless-stopped \
  -p 8080:80 \
  vndangkhoa/kv-cv:latest
```

Access the site in your browser at: `http://localhost:8080`

### Option 2: Run with Docker Compose

Create a `docker-compose.yml`:

```yaml
services:
  kv-cv:
    image: vndangkhoa/kv-cv:latest
    container_name: kv-cv
    restart: unless-stopped
    ports:
      - "8080:80"
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://127.0.0.1/"]
      interval: 30s
      timeout: 5s
      retries: 3
```

Start the container:
```bash
docker compose up -d
```

---

## 📦 Container Specifications

| Property | Details |
| :--- | :--- |
| **Base Image** | `nginx:alpine` (Multi-stage from `node:20-alpine`) |
| **Compressed Size** | ~33 MB |
| **Uncompressed Size** | ~111 MB |
| **Exposed Port** | `80` (HTTP) |
| **Default User** | `nginx` (non-root worker processes) |
| **Healthcheck** | `wget -qO- http://127.0.0.1/ || exit 1` (every 30s) |
| **Caching Strategy** | Gzip enabled, immutable static hashing (1 year cache for js/css/images) |
| **Video Scrubbing** | Byte-range requests (`Accept-Ranges: bytes`) enabled for MP4 scrub engine |

---

## 🏷️ Available Tags

| Tag | Target Release | Status |
| :--- | :--- | :--- |
| `latest` | Points to the latest stable release (`2.0.1`) | Active |
| `2.0.1` | v2.0.1 (WordPress REST API migration & domain updates) | Current |
| `2.0.0` | v2.0.0 (Initial Docker containerization & WebGL pipeline) | Stable |

---

## 🛠️ Image Architecture & Features

1. **Multi-Stage Build Pipeline**:
   - Compiles Vite 6 React 18 production bundle inside Node 20 Alpine.
   - Discards Node.js tooling and copies only static assets into a clean Alpine Nginx runtime.
2. **Nginx Hardening**:
   - Security headers pre-configured (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`).
   - SPA fallback rule (`try_files $uri $uri/ /index.html`) ensuring clean HTML5 routing.
3. **Optimized Streaming**:
   - HTTP byte-range support for smooth velocity scrubbing of video assets (`human_head_turn.mp4`).
4. **Synology DSM / Homelab Ready**:
   - Tested and verified on Synology DSM Container Manager and Docker Engine.

---

## 🔗 Links & Reference

- **Live Production Site:** [https://khoavo.myds.me](https://khoavo.myds.me)
- **GitHub Repository:** [https://github.com/vndangkhoa/kv-cv](https://github.com/vndangkhoa/kv-cv)
- **Forgejo Repository:** [https://git.khoavo.vndns.net/vndangkhoa/kv-cv](https://git.khoavo.vndns.net/vndangkhoa/kv-cv)
- **Developer Profile:** Vo Nguyen Dang Khoa ([vonguyendangkhoa@gmail.com](mailto:vonguyendangkhoa@gmail.com))
