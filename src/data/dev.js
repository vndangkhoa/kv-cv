export const IT_DATA = {
  title: "Security Consultant & Systems Architect",
  summary: "Security-minded systems and solutions engineer with 9+ years in technology and 4+ years designing security controls into production systems from the ground up: cryptographic licensing (Ed25519), forensic anti-leak DRM (ola), 2FA/TOTP authentication, directory-traversal sandboxing (dunce), and supply-chain verification (GnuPG). Combines hands-on low-level systems engineering (Rust, Go) with enterprise digital asset governance across Southeast Asia (Procter & Gamble).",
  journey: [
    {
      month: "PRESENT",
      title: "Synology Package Hub & Ecosystem",
      description: "Architected and deployed custom Synology Community Package Center server (pkg.khoavo.myds.me) using Flask & PostgreSQL. Built end-to-end SPK packaging toolchain with GPG cryptographic signing for 1-click DSM installations."
    },
    {
      month: "AUG '26",
      title: "Synology DSM Web Manager & AI MCP",
      description: "Built kv-synology (Next.js 15, React 19, Tailwind v4) — modern DSM web manager with QuickConnect resolver, services controller (SMB, NFS, SSH, WebDAV), DSM notifications, and 42 MCP tools for AI agent automation."
    },
    {
      month: "AUG '26",
      title: "Rust Systems & Desktop Tooling",
      description: "Developed mouse-me — native Linux cursor manager written in Rust with Slint GUI & CLI supporting Hyprland, Omarchy, GTK, Qt, and X11."
    },
    {
      month: "JUL '26",
      title: "Self-Hosted Media Engine",
      description: "Built kv-dl & kv-download — high-throughput video processing API in Rust (Axum) and Go with yt-dlp & ffmpeg, deployed on Synology Container Manager."
    },
    {
      month: "MAR '25",
      title: "Kotlin & Android TV",
      description: "Built kv-netflix Android TV + Web app with Kotlin Multiplatform and Compose Multiplatform. Cross-platform PWA support."
    },
    {
      month: "DEC '24",
      title: "Rust & Systems Architecture",
      description: "Built Spotify clone with Rust Axum backend. Explored low-level system concurrency and streaming protocols."
    },
    {
      month: "SEP '24",
      title: "Full-Stack Media Streaming",
      description: "Created KV-Tube YouTube platform with Go (Gin) backend + Next.js frontend with HLS adaptive streaming, containerized for Synology NAS."
    },
    {
      month: "JUL '24",
      title: "First Production App",
      description: "Built apix AI image generator with multi-provider support (Google Whisk, Meta AI, Grok) and prompt management."
    }
  ],
  skills: {
    security: ["Threat Modeling (STRIDE)", "Forensic DRM & Dynamic Watermarking", "Argon2id & RFC 6238 TOTP 2FA", "Ed25519 Cryptographic Licensing", "Filesystem Sandboxing (dunce)", "GnuPG Supply Chain Signing", "Zero-Trust Tunnels (Cloudflared)"],
    languages: ["TypeScript", "JavaScript", "Go", "Rust", "Python", "Kotlin", "HTML/CSS", "SQL", "Bash"],
    frontend: ["React 19", "Next.js 15", "Vite", "Tailwind CSS v4", "Shadcn UI", "Framer Motion", "Zustand", "PWA", "Compose Multiplatform"],
    backend: ["Node.js", "Go (Gin)", "Rust (Axum)", "Python (FastAPI / Flask)", "REST APIs", "WebSocket", "HLS Streaming", "Ktor"],
    synology: ["Synology DSM 7.2+", "SPK Package Creation", "GPG Key Signing", "QuickConnect Protocol", "File Station API", "SYNO Core APIs"],
    ai: ["Model Context Protocol (MCP)", "LLM Agent Tooling (42 Tools)", "Cursor AI", "Ollama", "ComfyUI Node API", "Multi-Provider AI"],
    devops: ["Docker Multi-arch", "Docker Compose", "Forgejo CI/CD", "Nginx Reverse Proxy", "PostgreSQL", "SQLite", "Hairpin-NAT", "Linux / Bash"],
    tools: ["Git", "VS Code", "Postman", "ffmpeg", "yt-dlp", "Android Studio", "GnuPG", "Figma"]
  },
  projects: [
    {
      name: "ola",
      description: "Forensic Anti-Leak DRM Video Review Platform — Dynamic moving watermark overlay (IP, user ID, timestamp), automated screen-recording/DevTools inspection blanking traps, and zero-port P2P WebSockets.",
      tech: ["Go", "React 18", "Synology SPK", "DRM / Watermarking", "P2P WebSockets", "SQLite WAL"],
      github: "https://git.khoavo.myds.me/vndangkhoa/ola"
    },
    {
      name: "kv-file-pro",
      description: "Military-Grade Secure File Manager — Defense-in-depth authentication (Argon2id + RFC 6238 TOTP 2FA), offline Ed25519 asymmetric cryptographic licensing, and dunce::canonicalize filesystem sandboxing.",
      tech: ["Rust (Axum)", "SQLite WAL", "Argon2id", "TOTP 2FA", "Ed25519", "Filesystem Sandboxing"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-file-pro"
    },
    {
      name: "SysVis.AI (Sys-Arc-Visl)",
      description: "System Design & Threat Modeling Visualizer — Interactive architecture diagramming tool for Architecture Review Forums, featuring local-first WebGPU AI (WebLLM Qwen3) to guarantee zero schema data leakage.",
      tech: ["React 19", "TypeScript", "React Flow", "WebGPU", "WebLLM", "Threat Modeling"],
      github: "https://git.khoavo.myds.me/vndangkhoa/Sys-Arc-Visl"
    },
    {
      name: "kv-trimui",
      description: "Embedded Linux Hardening & 13-App Suite — Memory-safe Rust daemons, static Musl linking overcoming legacy GLIBC vulnerabilities, and kv-server with Cloudflare Zero-Trust Tunnels and token auth.",
      tech: ["Rust 1.85+", "Static Musl", "Linux Evdev", "Cloudflare Zero-Trust", "Framebuffer /dev/fb0"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-trimui"
    },
    {
      name: "kv-synology",
      description: "Synology DSM Web Manager & AI MCP Hub — Next.js 15, React 19, QuickConnect resolver with relay fallback, service toggles (SMB, NFS, SSH, WebDAV), DSM notifications, and 42 AI MCP tools.",
      tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind v4", "MCP Protocol", "Synology API", "Docker"],
      github: "https://github.com/vndangkhoa/kv-synology"
    },
    {
      name: "vietc",
      description: "Modern Vietnamese Input Method Engine (IME) for Linux with direct Unicode input — no pre-edit buffer, zero flickering, and instant native typing.",
      tech: ["Rust", "Linux", "IBus / Fcitx5", "Unicode Engine", "Systems Programming"],
      github: "https://git.khoavo.myds.me/vndangkhoa/vietc"
    },
    {
      name: "kv-file",
      description: "High-performance self-hosted file manager with macOS Miller Columns, Windows Explorer view, and real-time synchronization.",
      tech: ["TypeScript", "React", "TailwindCSS", "File Station API", "Docker"],
      github: "https://github.com/vndangkhoa/kv-file"
    },
    {
      name: "spkrepo (KV Package Center)",
      description: "Synology Community Package Repository Server (pkg.khoavo.myds.me) — serves custom SPK packages for 1-click install in DSM Package Center with GPG signing and automated release pipeline.",
      tech: ["Python (Flask)", "PostgreSQL", "SPK Toolchain", "GnuPG", "Docker Compose", "Synology DSM 7.2"],
      github: "https://github.com/vndangkhoa/spkrepo"
    },
    {
      name: "mouse-me",
      description: "Universal cursor manager for Linux desktops (Hyprland, Omarchy, GTK, Qt, X11) with Slint GUI and CLI in a single Rust binary.",
      tech: ["Rust", "Slint GUI", "Linux Desktop", "Hyprland", "CLI"],
      github: "https://github.com/vndangkhoa/mouse-me"
    },
    {
      name: "kv-dl",
      description: "Self-hosted YouTube and universal video downloader API — Rust (Axum) API + Next.js static UI with yt-dlp and ffmpeg batch processing.",
      tech: ["Rust (Axum)", "Next.js", "yt-dlp", "ffmpeg", "Docker"],
      github: "https://github.com/vndangkhoa/kv-dl"
    },
    {
      name: "kv-netflix",
      description: "StreamFlow Netflix - Android TV + Web App built with Kotlin Multiplatform. Movie streaming with trailer previews, custom playlists, and offline download support.",
      tech: ["Kotlin", "Compose Multiplatform", "Android TV", "Web", "PWA"],
      github: "https://github.com/vndangkhoa/kv-netflix"
    },
    {
      name: "kv-tube",
      description: "YouTube-like video streaming platform with HLS support, subscriptions, watch history, comments, and PWA. Deployed on Synology NAS via Docker.",
      tech: ["Go (Gin)", "Next.js", "TypeScript", "SQLite", "Docker", "HLS.js", "PWA"],
      github: "https://github.com/vndangkhoa/kv-tube"
    },
    {
      name: "spotify-clone",
      description: "Full-featured Spotify-like music player with YouTube Music integration, real-time lyrics, custom playlists, and PWA support.",
      tech: ["React (Vite)", "Rust (Axum)", "TailwindCSS", "YouTube API", "PWA"],
      github: "https://github.com/vndangkhoa/spotify-clone"
    },
    {
      name: "apix",
      description: "AI Image Generator powered by Google Whisk, Meta AI, and Grok. Multi-provider support with prompt library and history.",
      tech: ["Next.js 14", "TypeScript", "Tailwind", "Zustand", "Docker"],
      github: "https://github.com/vndangkhoa/apix"
    }
  ],
  experience: [
    {
      role: "Lead Security Architecture & Infrastructure Consultant",
      company: "KV Self-Hosted Labs & Security Ecosystem",
      period: "2023 - Present",
      highlights: [
        "Architected and deployed secure self-hosted platforms serving 7+ production packages, integrating GnuPG supply chain signing, Argon2id/TOTP identity verification, and Ed25519 asymmetric cryptographic licensing",
        "Engineered forensic anti-leak DRM (ola) with dynamic moving watermarks and automated playback blanking traps upon screen capture or DevTools inspection",
        "Formulated conceptual and logical security architectures for distributed microservices, evaluating non-normative flows and implementing compensating controls for resource-constrained edge environments",
        "Maintained 99.9% availability across self-hosted infrastructure with automated wildcard SSL rotation, Cloudflare Zero-Trust tunnels, and Btrfs snapshot replication"
      ]
    },
    {
      role: "Creative Technology & AI Governance Lead",
      company: "Phibious Vietnam",
      period: "2025 - Present",
      highlights: [
        "Formulated enterprise technical SOPs, AI governance standards, and data privacy guardrails for generative AI pipelines (ComfyUI, FLUX.1 LoRA) across Fortune 500 accounts",
        "Established strict input isolation and prompt security protocols to protect proprietary client brand assets and confidential creative IP from unauthorized leakage",
        "Acted as trusted advisor to regional managing directors, translating technical and compliance trade-offs into commercial business value and achieving a 60% acceleration in production turnaround"
      ]
    },
    {
      role: "eCommerce Digital Asset Governance & Regional Lead",
      company: "Procter & Gamble (P&G) Southeast Asia",
      period: "2020 - 2025",
      highlights: [
        "Governed regional digital asset integrity, security compliance, and brand protection across 6 Southeast Asian markets for P&G Hair Care portfolio (Head & Shoulders, Pantene, Rejoice)",
        "Enforced corporate brand risk policies across 200+ campaign deliverables quarterly, ensuring compliance with regional data, consumer advertising, and digital platform standards",
        "Designed an enterprise modular design system with 500+ standardized components, enabling 3× faster asset adaptation while eliminating unauthorized design deviations",
        "Established automated quality assurance (QA) frameworks that reduced post-launch compliance deviations by 40%, aligning cross-functional marketing, engineering, and product stakeholders"
      ]
    },
    {
      role: "Creator & Maintainer",
      company: "VietC & KV-TrimUI Open Source",
      period: "2024 - Present",
      highlights: [
        "Built memory-safe Rust Linux IME (vietc) with direct kernel /dev/uinput and /dev/input/by-path isolation, eliminating keystroke sniffing and duplicate injection (<10MB RAM rootless daemon)",
        "Engineered KV-TrimUI 13-app suite with static Musl cross-compilation, overcoming legacy GLIBC vulnerabilities as a robust platform compensating control",
        "Integrated Cloudflare Zero-Trust Tunnels (cloudflared) and token-based HTTP authentication in kv-server, eliminating firewall port forwarding"
      ]
    }
  ],
  github: "https://git.khoavo.myds.me/vndangkhoa",
  forgejo: "https://git.khoavo.myds.me/vndangkhoa"
};

export default IT_DATA;
