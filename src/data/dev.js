export const IT_DATA = {
  title: "Full-Stack Developer & DevOps",
  summary: "Full-stack developer and self-hosted infrastructure architect with 2+ years of intensive production engineering. Creator of the KV Synology Community Package Center (pkg.khoavo.myds.me), serving custom SPK packages with GPG signing directly into DSM Package Center. Built 18+ deployed applications including Next.js 15 DSM Web Manager with 42 AI MCP tools, Kotlin Multiplatform Android TV apps, Rust systems utilities, and high-throughput Go streaming backends.",
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
      role: "Synology & Infrastructure Engineer",
      company: "KV Self-Hosted Lab",
      period: "2024 - Present",
      highlights: [
        "Architected and deployed Synology Community Package Center (pkg.khoavo.myds.me) serving custom SPK packages with GPG cryptographic signing",
        "Built kv-synology web manager with Next.js 15, QuickConnect protocol resolver, real-time DSM service controller, and 42 AI MCP tools",
        "Configured multi-arch container pipelines on Forgejo Git and Docker Hub (linux/amd64, linux/arm64) with automated CI/CD deployment",
        "Maintained self-hosted microservices ecosystem (media streaming, video downloaders, AI image generators, Forgejo git server)"
      ]
    },
    {
      role: "Creative Technology Lead",
      company: "Phibious Vietnam",
      period: "2025 - Present",
      highlights: [
        "Bridged creative art direction with automated AI engineering and generative pipelines (ComfyUI, FLUX.1)",
        "Developed internal workflow automation tools, custom API integrations, and prompt engineering frameworks",
        "Standardized technical SOPs for AI-augmented digital production for global Fortune 500 accounts"
      ]
    },
    {
      role: "Creator & Maintainer",
      company: "VietC — Vietnamese IME for Linux",
      period: "2025 - Present",
      highlights: [
        "Built zero-underline Rust IME with direct Wayland virtual keyboard (wtype/zwp_virtual_keyboard_v1) and X11 /dev/uinput, bypassing clipboard race and pre-edit underline",
        "Implemented Bamboo engine (tone marks, vowel muddles), English auto-restore, hardware filtering for 2.4G dongles, and 151 tests at 100% pass",
        "Shipped one-line install across 8+ distros (Arch, CachyOS, Fedora, Ubuntu, Pop!_OS), systemd user service rootless, Ctrl+Shift cycle ENG→VNI→TELEX"
      ]
    }
  ],
  github: "https://git.khoavo.myds.me/vndangkhoa",
  forgejo: "https://git.khoavo.myds.me/vndangkhoa"
};

export default IT_DATA;
