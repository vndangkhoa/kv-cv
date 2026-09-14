<p align="center">
  <img src="public/favicon.ico" alt="KHOA.VO Logo" width="100" height="100" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,255,148,0.25);">
</p>

<h1 align="center">⚡ KHOA.VO — Dual Persona Portfolio (kv-cv)</h1>

<p align="center">
  <strong>An immersive, dual-persona interactive portfolio fusing luxury design with cyberpunk terminal aesthetics.</strong><br>
  Featuring frame-accurate video scrollytelling, custom 3D Three.js WebGL caustic shaders, and an interactive CRT shell.<br>
  <i>Built with React 18, Vite 6, Tailwind CSS, Framer Motion, Three.js, and containerized with Nginx.</i>
</p>

<p align="center">
  <a href="https://khoavo.myds.me"><img src="https://img.shields.io/badge/Live_Site-khoavo.myds.me-00FF94?style=for-the-badge&logo=googlechrome&logoColor=black" alt="Live Site"></a>
  <a href="https://github.com/vndangkhoa/kv-cv/stargazers"><img src="https://img.shields.io/github/stars/vndangkhoa/kv-cv?style=for-the-badge&logo=apachespark&color=f59e0b" alt="GitHub Stars"></a>
  <a href="https://hub.docker.com/r/vndangkhoa/kv-cv"><img src="https://img.shields.io/docker/pulls/vndangkhoa/kv-cv?style=for-the-badge&logo=docker&logoColor=white&label=Pulls&color=2563eb" alt="Docker Hub Pulls"></a>
  <a href="https://git.khoavo.myds.me/vndangkhoa/kv-cv"><img src="https://img.shields.io/badge/Forgejo-git.khoavo.myds.me-FF5722?style=for-the-badge&logo=git" alt="Forgejo"></a>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-gray?style=for-the-badge" alt="License MIT"></a>
</p>

<p align="center">
  <a href="https://khoavo.myds.me"><b>🌐 Live Demo</b></a> •
  <a href="#-why-kv-cv"><b>Why kv-cv?</b></a> •
  <a href="#-dual-persona-architecture"><b>Dual Personas</b></a> •
  <a href="#-creative--3d-engineering"><b>WebGL & Shaders</b></a> •
  <a href="#-quick-start-with-docker"><b>Docker Run</b></a> •
  <a href="#-star-history"><b>Star History</b></a>
</p>

---

## ⚡ Why kv-cv?

Most developer portfolios fall into one of two traps: sterile white resume templates that bore creative directors, or flashy 3D experiments that alienate engineering leads looking for system architecture depth.

**kv-cv** bridges both worlds with a single click:

| Dimension | 🎨 **Creative & AI Innovation** | ⚡ **Full-Stack & DevOps Architect** |
| :--- | :--- | :--- |
| **Primary Audience** | Brand Directors, Creative Agencies, Product Leaders | CTOs, VP of Engineering, DevOps Teams |
| **Visual Aesthetic** | Luxury editorial bento, glassmorphic blur, fluid motion | Cyberpunk retro CRT terminal, phosphor-green (`#00FF94`) |
| **Interactive Tech** | Frame-accurate video scrollytelling (`human_head_turn.mp4`) | Draggable desktop windows, live CLI emulator (`help`, `projects`) |
| **Data Feed** | WordPress REST API live case study integration | Real-time GitHub & Forgejo repo metrics and Docker Hub pulls |
| **Resume Export** | ATS-friendly 1-Click A4 vector PDF generator | Instant command-line resume printout |

---

## 📸 Dual-Persona Experience

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [⚡ KHOA.VO]                   [🎨 Creative Mode]  [⚡ Dev/IT Mode]                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│   🎨 CREATIVE PERSONA                              ⚡ DEVOPS / CYBERPUNK PERSONA       │
│  ┌────────────────────────────────┐               ┌────────────────────────────────┐   │
│  │ 🎥 Scrolly Video Frame Scrub   │               │ > vietcctl status --all        │   │
│  │ 🌊 3D WebGL Caustic Shaders    │               │ [OK] Hyprland Wayland active   │   │
│  │ 📰 WordPress Case Studies      │      VS       │ [OK] 12 Microservices online   │   │
│  │ 📄 Instant 1-Page A4 PDF CV    │               │ [OK] 8.2k Docker pulls tracked │   │
│  └────────────────────────────────┘               └────────────────────────────────┘   │
│                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Creative & 3D Engineering

### 1. 🌊 Real-Time Three.js Underwater Caustics
Custom GLSL vertex and fragment shaders project dynamic light refractions, water surface displacements, and floating particulate life in an interactive 3D scene.

### 2. 🎥 Velocity-Driven Scrollytelling
Interpolates video playback frames proportionally to the user's scroll speed and direction using high-performance lerp algorithms—giving the tactile sensation of scrubbing physical film.

### 3. 💻 Retro CRT Terminal Emulator
Click the secret terminal icon or press <kbd>`</kbd> to launch an interactive vintage CRT overlay with scanlines, CRT curve shaders, and a fully functional UNIX command interpreter (`help`, `about`, `skills`, `projects`, `clear`).

### 4. 📄 Client-Side A4 PDF Resume Generation
Uses `html2canvas` and `jspdf` to compile an ATS-compliant, print-perfect 1-page A4 resume directly in the browser—with zero blank pages or mobile formatting bugs.

---

## 🚀 Quick Start with Docker

### Run Prebuilt Container (Nginx)

```bash
docker run -d \
  --name kv-cv \
  -p 3001:80 \
  --restart unless-stopped \
  vndangkhoa/kv-cv:latest
```

Open **`http://localhost:3001`** in your browser.

---

## 💻 Local Development

```bash
# 1. Clone repository
git clone https://github.com/vndangkhoa/kv-cv.git && cd kv-cv

# 2. Install dependencies
npm install

# 3. Start Vite development server
npm run dev
```

Visit `http://localhost:5173` to test live animations with Hot Module Replacement.

---

## 🌟 Support & Community

If kv-cv inspires your own portfolio design:

- Give the repository a **Star ⭐** on GitHub!
- Share your thoughts on [X / Twitter](https://twitter.com) or [LinkedIn](https://linkedin.com)
- Connect with Khoa Vo at [khoavo.myds.me](https://khoavo.myds.me)

<p align="center">
  <a href="https://star-history.com/#vndangkhoa/kv-cv&Date">
    <img src="https://api.star-history.com/svg?repos=vndangkhoa/kv-cv&type=Date" alt="kv-cv Star History" width="75%">
  </a>
</p>

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

Developed with ❤️ by **Khoa Vo ([@vndangkhoa](https://github.com/vndangkhoa))**.
