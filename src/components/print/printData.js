// Canonical content for all 3 pages of Khoa Vo's Printable Portfolio / CV (V2 Swiss Architectural Grid)

export const PAGE1_CREATIVE = {
  info: {
    name: "Vo Nguyen Dang Khoa",
    short: "KHOA.VO",
    title: "CREATIVE MANAGER & AI INNOVATION LEAD",
    rolePrimary: "Creative Manager & AI Innovation Lead",
    roleSecondary: "Visual Strategy & Creative Systems",
    subtitle: "Visual Strategy  •  Generative AI Workflows  •  Art Direction  •  Full-Stack & Embedded Systems",
    location: "Ho Chi Minh City, VN",
    phone: "0398300340",
    email: "vonguyendangkhoa@gmail.com",
    linkedin: "linkedin.com/in/khoa-vo-76291236",
    portfolio: "khoavo.vndns.net",
    github: "github.com/vndangkhoa",
    summary:
      "Creative Director and Systems Architect with 9+ years uniting commercial art direction, enterprise design governance, and production software engineering. Directed multi-market visual systems for Procter & Gamble across 6 Southeast Asian markets and built custom generative AI pipelines (ComfyUI, FLUX.1 LoRA, Runway Gen-3) that cut campaign turnaround by 60%. Beyond commercial creative leadership, independently architects full-scale open-source ecosystems—including KV-TrimUI (18 native Rust & hybrid handheld apps across 6 Linux/Android OS distributions), VietC Linux IME, and the Synology DSM App Hub.",
  },
  education: {
    period: "2012 — 2016",
    school: "RMIT University Vietnam",
    degree: "Bachelor of Multimedia Design",
    honors: "Best Artistic Graduate Showcase (2016)",
    lang: "English (Full Professional) • Vietnamese (Native)",
  },
  metrics: [
    { value: "9+ Yrs", label: "Creative Direction", sub: "Commercial & Brand Systems" },
    { value: "+60%", label: "Output Acceleration", sub: "Generative AI Video Pipelines" },
    { value: "6 Markets", label: "Regional Governance", sub: "P&G SEA Hair Care Portfolio" },
    { value: "18 Apps", label: "KV-TrimUI Ecosystem", sub: "Native Rust & Hybrid OS Suite" },
  ],
  skillGroups: [
    {
      label: "AI & Generative Production",
      items: ["ComfyUI", "FLUX.1", "Stable Diffusion", "Midjourney v6", "Runway Gen-3", "LoRA Fine-Tuning", "ControlNet", "IP-Adapter", "Prompt Engineering"],
    },
    {
      label: "Design, Motion & 3D",
      items: ["Art Direction", "Figma", "Photoshop", "After Effects", "Premiere Pro", "Cinema 4D", "Blender", "Design Systems", "Visual Storytelling", "Packaging"],
    },
    {
      label: "Leadership & Strategy",
      items: ["Team Leadership (20+)", "Omnichannel Visuals", "eCommerce Growth", "SOP Development", "Brand Governance", "Cross-functional Mgmt"],
    },
    {
      label: "Creative Tech & Web",
      items: ["Custom AI Workflows", "Next.js 15 / React 19", "Interactive WebGL", "Figma Design Tokens", "Python Automation", "FFmpeg / MPV Video", "Self-Hosted Cloud", "Docker"],
    },
  ],
  openSourceInfra: [
    {
      name: "VietC IME",
      desc: "Native Vietnamese input method engine for Linux in pure Rust with direct Wayland/uinput Unicode injection and zero pre-edit lag.",
      tech: "Rust • Wayland • X11 • /dev/uinput",
    },
    {
      name: "Synology App Hub",
      desc: "Self-hosted private cloud ecosystem orchestrating micro-apps: kv-synology (DSM control plane), kv-file-pro, ola DRM & kv-tube.",
      tech: "Next.js 15 • Go • Rust • Docker • SPK",
    },
    {
      name: "KV-TrimUI Eco Apps",
      desc: "18-app native handheld suite (YouTube, Tidal Hi-Fi, Netflix, Live TV, Radio, AI Chat) with 60 FPS /dev/fb0 rendering & OTA store.",
      tech: "Rust 1.85 • Dual-Arch Musl • MPV/ALSA",
    },
  ],
  experiences: [
    {
      role: "AI Creative Manager",
      company: "Phibious Vietnam",
      period: "2025 — Present",
      highlights: [
        "Direct commercial visual strategy and generative AI production for regional and multi-market brand campaigns, scaling asset throughput by 60% while maintaining strict brand fidelity.",
        "Own the creative-tech roadmap and SOPs, architecting customized ComfyUI and FLUX.1 LoRA node pipelines that compressed campaign concept-to-pitch cycles from days to hours.",
        "Lead departmental P&L, production budgeting, and GPU infrastructure ROI; direct and mentor 20+ producers, art directors, and motion designers to maximize creative margins.",
      ],
    },
    {
      role: "eCommerce Design Lead",
      company: "Procter & Gamble (P&G)",
      period: "2020 — 2025",
      highlights: [
        "Directed end-to-end visual strategy and digital execution for P&G Hair Care portfolio (Head & Shoulders, Pantene, Rejoice) across 6 Southeast Asian regional markets.",
        "Engineered an enterprise modular design system with reusable UI/visual master components, slashing quarterly asset adaptation time by 3× across 200+ campaign deliverables.",
        "Established automated QA review frameworks and partnered with growth marketing to optimize creative variants, achieving sustained double-digit CTR and conversion gains.",
      ],
    },
    {
      role: "Production Creative Lead",
      company: "INN SaiGon",
      period: "2019 — 2020",
      highlights: [
        "Led multimedia photography and video production for 30+ premier hospitality, lifestyle, and luxury F&B clients, reducing post-production turnaround by 40%.",
        "Oversaw quarterly production budgets up to $200K, establishing rigorous studio lighting, camera capture protocols, and high-end color grading standards.",
      ],
    },
    {
      role: "Regional Head of Design",
      company: "ASIAMARINE",
      period: "2018 — 2019",
      highlights: [
        "Orchestrated brand identity and luxury marketing collateral for Vietnam's premier yacht brokerage, elevating brand equity across regional clientele.",
        "Art directed the flagship 120+ page quarterly NAVIGATOR luxury publication, managing bilingual typography, bespoke editorial grid layouts, and press production.",
      ],
    },
  ],
  featuredProjects: [
    {
      n: "01",
      title: "AI Commercial Video Pipeline",
      desc: "Automated generative production suite combining custom ComfyUI nodes, FLUX.1 LoRA adapters, and Runway Gen-3 for high-fidelity TVC & social video campaigns.",
      tech: "ComfyUI • FLUX.1 • LoRA • AnimateDiff • CUDA",
    },
    {
      n: "02",
      title: "P&G SEA Hair Care Design System",
      desc: "Scalable multi-market design system of modular master components deployed across Shopee, Lazada, and TikTok Shop for Head & Shoulders, Pantene, and Rejoice.",
      tech: "Art Direction • Design Systems • Figma • QA",
    },
    {
      n: "03",
      title: "KV-TrimUI Handheld OS & App Ecosystem",
      desc: "Open-source suite of 18 native Rust (/dev/fb0 60 FPS) & Next.js 15 hybrid apps for TrimUI Smart Pro S, Pro & Brick across 6 OS distros with 1-Click Web Installer (trimui.vndns.net).",
      tech: "Rust 1.85 • Dual-Arch Musl • MPV GPU • ALSA Hi-Fi",
    },
    {
      n: "04",
      title: "NAVIGATOR Luxury Yacht Publication",
      desc: "Editorial layout, bespoke typography system, and interactive digital yacht catalog for ASIAMARINE's luxury clientele across Southeast Asia.",
      tech: "Editorial Direction • Typography • InDesign • Web",
    },
  ],
  honorsCerts: [
    { label: "P&G SEA Digital Awards — Best Campaign", year: "2024", type: "Award" },
    { label: "Google Cloud — Professional Cloud Architect", year: "2023", type: "Cert" },
    { label: "RMIT Best Artistic Graduate Showcase", year: "2016", type: "Award" },
  ],
};

export const PAGE2_IT = {
  info: {
    name: "Vo Nguyen Dang Khoa",
    short: "KHOA.VO",
    title: "SENIOR FULL-STACK, SYSTEMS & SECURITY ARCHITECT",
    rolePrimary: "Full-Stack & Systems Architect",
    roleSecondary: "Information Security & Rust/Go Lead",
    subtitle: "Full-Stack (Next.js 15 / React 19 / Go)  •  Rust & Linux Systems  •  Cryptographic Security & DRM  •  Self-Hosted Cloud",
    synoSource: "syno.vndns.net",
    vietcRepo: "github.com/vndangkhoa/vietc",
    synoRepo: "github.com/vndangkhoa/kv-synology",
    github: "github.com/vndangkhoa",
    linkedin: "linkedin.com/in/khoa-vo-76291236",
    portfolio: "khoavo.vndns.net",
    email: "vonguyendangkhoa@gmail.com",
    phone: "0398300340",
    location: "Ho Chi Minh City, VN",
    summary:
      "Senior Full-Stack, Systems, and Security Architect with 9+ years in technology and 18+ production applications deployed across Next.js 15 / React 19, Go (Gin), Rust (Axum / Linux kernel), and Docker. Engineered defense-in-depth production systems including Ed25519 offline cryptographic licensing, Argon2id + RFC 6238 TOTP authentication, forensic anti-leak DRM, 42 AI MCP server tools, and dual-architecture static Musl toolchains—backed by enterprise governance across 6 Southeast Asian markets at Procter & Gamble.",
  },
  metrics: [
    { value: "18+ Apps", label: "Production Ecosystem", sub: "Rust, Go, Next.js 15 & DSM 7.2+" },
    { value: "Ed25519", label: "Cryptographic Controls", sub: "Argon2id + TOTP 2FA Sandboxing" },
    { value: "Zero-Leak", label: "Forensic Anti-Leak DRM", sub: "Dynamic Watermarking & Blanking" },
    { value: "<10MB", label: "Memory-Safe Rust Daemons", sub: "Rootless /dev/uinput & /dev/fb0" },
  ],
  valuePillars: [
    {
      tag: "Full-Stack & Agentic Cloud Systems",
      desc: "Architected kv-synology (Next.js 15, React 19, 42 AI MCP tools) and kv-tube (Go/Gin HLS streaming engine) with multi-container Docker orchestration.",
    },
    {
      tag: "Defense-in-Depth & Cryptography",
      desc: "Engineered Argon2id password hashing, RFC 6238 TOTP 2FA, Ed25519-signed offline licensing, forensic DRM (ola), and canonicalized path sandboxing.",
    },
    {
      tag: "Rust Kernel & Static Musl Toolchains",
      desc: "Built pure Rust Linux IME (vietc, 60+★) and dual-arch static Musl binaries (kv-trimui) with automated GnuPG package signing and CI/CD release assurance.",
    },
  ],
  skillGroups: [
    {
      label: "Full-Stack & APIs",
      items: ["TypeScript", "React 19", "Next.js 15", "Go (Gin)", "Rust (Axum)", "Node.js", "REST / WebSocket", "HLS Video", "MCP Tools"],
    },
    {
      label: "Systems & Low-Level",
      items: ["Rust 1.85+", "Linux (Arch/Debian)", "/dev/uinput & fb0", "Static Musl", "POSIX C", "Bash", "systemd rootless", "SQLite WAL"],
    },
    {
      label: "Security & Cryptography",
      items: ["Argon2id", "RFC 6238 TOTP", "Ed25519", "GnuPG Signing", "Forensic DRM", "Sandboxing", "Rate Limiting", "Zero-Trust"],
    },
    {
      label: "Cloud & DevOps",
      items: ["Docker Multi-Arch", "Synology DSM 7.2+", "Nginx / SSL", "Cloudflare Tunnels", "GitHub Actions", "Forgejo CI/CD", "Btrfs RAID"],
    },
  ],
  infraTopology: [
    {
      title: "Education & Cloud Credentials",
      desc: "RMIT University Vietnam (B.Des. Multimedia Design, 2016) • Google Cloud Certified — Professional Cloud Architect (2023).",
    },
    {
      title: "Gateway, Storage & CI/CD",
      desc: "Btrfs RAID immutable snapshots, Nginx wildcard SSL reverse proxy, Cloudflare Zero-Trust Tunnels, and GnuPG-signed SPK distribution.",
    },
  ],
  endpoints: [
    { url: "https://syno.vndns.net", desc: "Synology Package Center Source" },
    { url: "github.com/vndangkhoa/vietc", desc: "Rust Linux IME (60+ Stars, Wayland/X11)" },
    { url: "github.com/vndangkhoa/kv-synology", desc: "Next.js 15 + React 19 DSM Control Plane" },
  ],
  secondaryStoreApps: [
    {
      name: "ola",
      tag: "Forensic Anti-Leak DRM",
      desc: "Dynamic moving watermark overlay (IP, timestamp, ID) and auto-blank traps upon screen-recording or DevTools inspection.",
      tech: "Go • React • Synology SPK",
    },
    {
      name: "kv-file-pro",
      tag: "Cryptographic Sandboxing",
      desc: "Argon2id hashing, RFC 6238 TOTP 2FA, Ed25519 asymmetric offline licensing, and dunce::canonicalize path isolation.",
      tech: "Rust (Axum) • SQLite WAL",
    },
    {
      name: "SysVis.AI",
      tag: "Threat Model Visualizer",
      desc: "Architecture topology and threat boundary mapping for Architecture Review Forums with local-first WebGPU AI inference.",
      tech: "React 19 • WebLLM Qwen3",
    },
    {
      name: "kv-server",
      tag: "Zero-Trust Tunnel Gateway",
      desc: "Handheld reverse-proxy enforcing Cloudflare Zero-Trust Tunnels, token-based auth (?auth=token), and loopback port isolation.",
      tech: "Rust • Musl • Cloudflared",
    },
    {
      name: "kv-tube",
      tag: "Hardened Media Engine",
      desc: "Per-IP rate limiting (300 req/min), strict CORS origin allow-lists, and multi-service container network segmentation.",
      tech: "Go (Gin) • Next.js • HLS",
    },
    {
      name: "spkrepo",
      tag: "Supply Chain Packaging",
      desc: "Automated SPK package distribution platform with GnuPG cryptographic signature verification and container validation.",
      tech: "GnuPG • Docker • Python",
    },
  ],
  vietcPillars: [
    {
      title: "Direct Wayland Virtual Keyboard",
      desc: "Direct Unicode keystroke injection via wtype (zwp_virtual_keyboard_v1) and /dev/uinput. Eliminates pre-edit underline flashing and preserves IDE autocompletion in VS Code and GPU terminals.",
      tech: "wtype • /dev/uinput • <1ms Latency",
    },
    {
      title: "Intelligent Auto-Restore",
      desc: "Dual-layer Vietnamese phonological analysis paired with a technical English lexicon automatically preserves programming keywords (search, test, filter) without manual mode toggling.",
      tech: "Phonology Engine • Context Awareness",
    },
    {
      title: "Hardware Event Filtering",
      desc: "Strict device path binding to /dev/input/by-path/*-event-kbd eliminates duplicate keystrokes caused by multi-interface 2.4GHz wireless USB dongles. Consumes <10MB RAM as a rootless daemon.",
      tech: "Hardware Binding • <10MB Footprint",
    },
  ],
  milestones: [
    {
      period: "2024 — PRES",
      role: "Lead Systems & Full-Stack Architect",
      company: "KV Open-Source & Self-Hosted Cloud Ecosystem",
      title: "Lead Systems & Full-Stack Architect — KV Open-Source & Cloud Ecosystem",
      bullets: [
        "Architected 18+ production apps across Next.js 15/React 19 (kv-synology + 42 MCP tools), Go/Gin (kv-tube, ola DRM), and Rust (kv-file-pro with Argon2id/TOTP/Ed25519, vietc Linux IME, kv-trimui).",
      ],
    },
    {
      period: "2025 — PRES",
      role: "AI & Creative Technology Manager",
      company: "Phibious Vietnam",
      title: "AI & Creative Technology Manager — Phibious Vietnam",
      bullets: [
        "Engineered automated generative AI production pipelines (ComfyUI, FLUX.1 LoRA, Python/CUDA node orchestration) and managed GPU infrastructure ROI, accelerating throughput by 60%.",
      ],
    },
    {
      period: "2020 — 2025",
      role: "eCommerce Design & Systems Lead",
      company: "Procter & Gamble (P&G) SEA",
      title: "eCommerce Design & Systems Lead — Procter & Gamble (P&G) SEA",
      bullets: [
        "Governed regional digital systems, automated QA validation, and modular component architecture across 6 Southeast Asian markets, accelerating delivery 3× across 200+ releases.",
      ],
    },
  ],
};

export const PAGE3_TRIMUI = {
  info: {
    name: "Vo Nguyen Dang Khoa",
    short: "KHOA.VO",
    title: "EMBEDDED SYSTEMS & HANDHELD OS ARCHITECT",
    rolePrimary: "Embedded Systems Architect",
    roleSecondary: "Handheld Linux & Rust Engine Lead",
    subtitle: "Linux Framebuffer (/dev/fb0)  •  Dual-Arch Static Musl  •  6 Handheld OS Distros  •  MPV & ALSA Hi-Fi",
    repo: "github.com/vndangkhoa/kv-trimui",
    store: "trimui.vndns.net",
    github: "github.com/vndangkhoa",
    email: "vonguyendangkhoa@gmail.com",
    phone: "0398300340",
    location: "Ho Chi Minh City, VN",
    summary:
      "Creator and lead systems architect of KV-TrimUI (trimui.vndns.net)—the complete open-source native software ecosystem and 18-application suite for TrimUI handheld consoles (Smart Pro S TG5050 Allwinner A523 Octa-Core, Smart Pro TG5040 A133P, Brick Pro/Brick). Engineered a Dual-Engine Architecture combining a 100% pure Rust 60 FPS direct framebuffer engine (/dev/fb0 mmap, <900KB–5MB RAM) with lightweight Next.js 15 + dual-arch static Musl daemons (aarch64 & armv7l, <15MB RAM), turnkey packagers across all 6 major OS distributions (Stock OS, SpruceOS, Knulli, NextUI, NXRedux, GammaOS), and a 1-Click Web Installer & dual-mirror OTA distribution network.",
  },
  metrics: [
    { value: "18 Apps", label: "Production Handheld Suite", sub: "Tube, Tidal, Netflix, TV, Radio, Play, Chat" },
    { value: "6 OS Distros", label: "Multi-OS Turnkey Support", sub: "Stock, Spruce, Knulli, NextUI, NXRedux, Gamma" },
    { value: "< 900 KB", label: "Pure Rust 60 FPS Engine", sub: "Direct /dev/fb0 mmap • Zero X11/Wayland" },
    { value: "Dual-Arch", label: "Static Musl Toolchains", sub: "aarch64 & armv7l • A523 & A133P SoCs" },
  ],
  skillGroups: [
    {
      label: "Hardware & SoC Targets",
      items: ["Allwinner A523 Octa-Core", "Allwinner A133P", "Smart Pro S (TG5050)", "Brick Pro / Brick", "DRM Plane 93 Fix", "PWM Fan & Hall Sticks"],
    },
    {
      label: "Dual-Engine & Compilers",
      items: ["Rust 1.85+ (/dev/fb0 mmap)", "aarch64 & armv7l Musl", "Next.js 15 Static", "@kv-trimui/shared-gamepad", "kv-i18n (EN/VI)", "TrueType Rasterizer"],
    },
    {
      label: "Media & Kernel Subsystems",
      items: ["MPV GPU (--hwdec=auto)", "ALSA Direct PCM (hw:0,0)", "A523 DACL Unity Gain 160", "Linux Evdev Polling", "Shairport AirPlay", "Safari WebGPU LLM"],
    },
    {
      label: "6-OS Packaging & OTA",
      items: ["Stock OS", "SpruceOS", "Knulli (Batocera)", "NextUI / MinUI (.pakz)", "NXRedux OS", "GammaOS (Android 13)", "cook.sh Dual-Mirror OTA"],
    },
  ],
  archPillars: [
    {
      title: "Dual-Engine Architecture (Pure Rust FB + Web Hybrid)",
      desc: "Engine B renders 100% native Rust directly to /dev/fb0 via mmap at 60 FPS (<900KB–5MB RAM) with DRM Plane 93 fail-safe; Engine A pairs Next.js 15 static UIs with static Musl daemons (<15MB RAM) and @kv-trimui/shared-gamepad OSK.",
    },
    {
      title: "Dual-Arch Static Musl & 6-OS Turnkey Packagers",
      desc: "Cross-compiles zero-dependency static binaries for both aarch64-unknown-linux-musl and armv7-unknown-linux-musleabihf to bypass GLIBC 2.28 limits across Stock OS, SpruceOS, Knulli, NextUI, NXRedux, and GammaOS.",
    },
    {
      title: "Hardware MPV 720p60 & Bit-Perfect ALSA Hi-Fi",
      desc: "Streams YouTube, cinema, and IPTV via GPU-accelerated MPV (--vo=gpu, Cedar/Mali) and routes Tidal Hi-Fi, Apple Music & AirPlay directly to ALSA hw:0,0 with A523 DACL unity gain (160) tuning.",
    },
  ],
  endpoints: [
    { url: "https://trimui.vndns.net", desc: "Official App Store & 1-Click Web Installer (/installer)" },
    { url: "github.com/vndangkhoa/kv-trimui", desc: "Primary Release & Dual-Mirror MyDS Forgejo Repo" },
    { url: "trimui.vndns.net/llms-full.txt", desc: "Developer & AI Agent Framebuffer Knowledge Hub" },
  ],
  handheldApps: [
    {
      name: "kv-tube & kv-tv",
      tag: "YOUTUBE & LIVE IPTV",
      desc: "Ad-free InnerTube YouTube client + 24/7 Live IPTV (VTV, HTV, NHK, Bloomberg) with 720p60 MPV GPU playback.",
      tech: "Next.js 15 • Rust FB • MPV HWDEC",
    },
    {
      name: "kv-tidal & kv-airplay",
      tag: "HI-FI & AIRPLAY AUDIO",
      desc: "Bit-perfect lossless streamer (Tidal, Apple Music, NAS Vault) + Shairport Sync wireless AirPlay receiver via ALSA hw:0,0.",
      tech: "Rust Musl • Direct ALSA • DACL 160",
    },
    {
      name: "kv-netflix & kv-stremio",
      tag: "HANDHELD CINEMA",
      desc: "On-demand movie & anime streaming clients with 6-digit phone pairing, episode selectors, and bilingual EN/VI subtitles.",
      tech: "Native Rust /dev/fb0 • HLS • MPV",
    },
    {
      name: "kv-play & kv-theme",
      tag: "CLOUD ROMS & STYLER",
      desc: "Ozone-styled cloud ROM store with auto .7z/.cue extraction & self-healing cores + real-time handheld theme/icon switcher.",
      tech: "100% Native Rust /dev/fb0 • Multi-OS",
    },
    {
      name: "kv-news & kv-anime",
      tag: "READER & MANGA 60FPS",
      desc: "Kindle-style ad-free news reader (VnExpress, Tuổi Trẻ) and NetTruyen manga reader with aspect scaling & D-Pad paging.",
      tech: "100% Native Rust Framebuffer",
    },
    {
      name: "kv-chat, server & torch",
      tag: "AI, TUNNEL & UTILITY",
      desc: "Voice AI companion (Safari WebGPU/LLMs), Cloudflare Tunnel web server daemon, and QR phone-paired LED marquee strobe.",
      tech: "Rust • Cloudflared • WebGPU • WS",
    },
  ],
  milestones: [
    {
      role: "System Architect & Creator",
      entity: "KV-TrimUI 18-App Ecosystem & Multi-OS Packaging Pipeline",
      period: "2025 — PRESENT",
      bullets: [
        "Architected 18 production apps (kv-tube, kv-tidal, kv-netflix, kv-radio, kv-tv, kv-news, kv-anime, kv-stremio, kv-play, kv-theme, kv-server, kv-airplay, kv-chat, kv-torch) for Smart Pro S (A523), Smart Pro (A133P), and Brick.",
        "Built automated multi-OS packaging (pnpm package:stock/spruce/knulli/nextui/nxredux & cook_gamma.sh) plus cook.sh single-source dual-mirror OTA release workflow (GitHub + MyDS Forgejo).",
      ],
    },
    {
      role: "Core Engine & Localization Lead",
      entity: "Native Rust Framebuffer Engine, Shared Gamepad & AI Knowledge Hub",
      period: "2025 — PRESENT",
      bullets: [
        "Engineered <900KB pure Rust /dev/fb0 engine (kv-radio), compile-time bilingual EN/VI localization (kv-i18n & shared-i18n), and @kv-trimui/shared-gamepad with instant X-button On-Screen Keyboard.",
        "Published machine-readable AI Agent Knowledge Hub (llms-full.txt, /api/v1/agent/knowledge, and trimui-rust-starter template) documenting DRM Plane 93 fail-safes and Evdev polling.",
      ],
    },
  ],
};
