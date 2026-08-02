export const IT_DATA = {
  title: "Full-Stack Developer & DevOps",
  summary: "2-year intensive coding journey from zero to production. Built 18+ deployed applications including video streaming platforms, AI tools, media players, and privacy-first apps. Proficient in modern web frameworks, containerization, and self-hosted cloud deployment. Self-taught developer with a creative background bringing unique problem-solving perspective.",
  journey: [
    { month: "PRESENT", title: "Ship & Scale", description: "Refining CI/CD pipelines, containerizing all services, and building a self-hosted ecosystem on Forgejo." },
    { month: "JUN '26", title: "Privacy-first Apps", description: "Built kv-music (Spotify-like), kv-listen (Go audio streaming), and TypeType (privacy-respecting video frontend)." },
    { month: "APR '26", title: "Video Downloader", description: "Universal video downloader API supporting multiple platforms with yt-dlp and Go backend." },
    { month: "FEB '26", title: "TikTok Tooling", description: "Built Douyin/TikTok video download API with Python FastAPI, watermark removal, and batch processing." },
    { month: "MAR '25", title: "Kotlin & Android TV", description: "Built kv-netflix Android TV + Web app with Kotlin Multiplatform. Cross-platform PWA support." },
    { month: "DEC '24", title: "Rust & Systems", description: "Built Spotify clone with Rust Axum backend. Explored low-level system architecture." },
    { month: "SEP '24", title: "Full-Stack Mastery", description: "Created KV-Tube YouTube platform with Go backend + Next.js. Dockerized for Synology NAS." },
    { month: "JUL '24", title: "First Production App", description: "Built apix AI image generator with multi-provider support (Google Whisk, Meta AI, Grok)." },
    { month: "MAY '24", title: "The Spark", description: "First deep dive into Next.js. Abandoned manual CSS for Tailwind efficiency." }
  ],
  skills: {
    languages: ["TypeScript", "JavaScript", "Go", "Rust", "Python", "Kotlin", "HTML/CSS", "SQL", "Bash"],
    frontend: ["React", "Next.js", "Vite", "Tailwind CSS", "Shadcn", "Framer Motion", "Zustand", "PWA", "Jetpack Compose"],
    backend: ["Node.js", "Go (Gin)", "Rust (Axum)", "Python (FastAPI)", "REST APIs", "WebSocket", "HLS Streaming", "Ktor"],
    ai: ["LLM Integration", "Cursor AI", "v0", "Ollama", "Prompt Engineering", "Multi-Provider AI APIs"],
    devops: ["Docker", "Docker Compose", "Forgejo CI/CD", "Synology NAS", "Nginx", "SQLite", "Git"],
    tools: ["Git", "VS Code", "Figma", "Postman", "Prisma", "ffmpeg", "yt-dlp", "Android Studio"]
  },
  projects: [
    {
      name: "kv-netflix",
      description: "StreamFlow Netflix - Android TV + Web App built with Kotlin Multiplatform. Movie streaming with trailer preview, custom playlists, and offline download support.",
      tech: ["Kotlin", "Compose Multiplatform", "Android TV", "Web", "PWA"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-netflix"
    },
    {
      name: "kv-tube",
      description: "YouTube-like video streaming platform with HLS support, subscriptions, watch history, comments, and PWA. Deployed on Synology NAS via Docker.",
      tech: ["Go (Gin)", "Next.js", "TypeScript", "SQLite", "Docker", "HLS.js", "PWA"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-tube"
    },
    {
      name: "spotify-clone",
      description: "Full-featured Spotify-like music player with YouTube Music integration, real-time lyrics, custom playlists, and PWA support.",
      tech: ["React (Vite)", "Rust (Axum)", "TailwindCSS", "YouTube API", "PWA"],
      github: "https://git.khoavo.myds.me/vndangkhoa/spotify-clone"
    },
    {
      name: "neko",
      description: "Go-based media server with streaming capabilities and user management. Deployed on NAS.",
      tech: ["Go", "SQLite", "Docker", "HLS"],
      github: "https://git.khoavo.myds.me/vndangkhoa/neko"
    },
    {
      name: "kv-download",
      description: "Universal video downloader API supporting multiple platforms with batch processing.",
      tech: ["Go", "yt-dlp", "Docker"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-download"
    },
    {
      name: "kv-tiktok-download",
      description: "Douyin/TikTok video download API with batch processing, watermarks removal, and metadata extraction.",
      tech: ["Python", "FastAPI", "yt-dlp"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-tiktok-download"
    },
    {
      name: "apix",
      description: "AI Image Generator powered by Google Whisk, Meta AI, and Grok. Multi-provider support with prompt library and history.",
      tech: ["Next.js 14", "TypeScript", "Tailwind", "Zustand", "Docker"],
      github: "https://git.khoavo.myds.me/vndangkhoa/apix"
    },
    {
      name: "kv-cv",
      description: "This terminal-style interactive resume with retro desktop UI and draggable windows.",
      tech: ["React", "Vite", "Tailwind", "Framer Motion", "TypeScript"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-cv"
    }
  ],
  experience: [
    { role: "Creative Technology", company: "Phibious Vietnam", period: "2025 - Present", highlights: ["Bridge between creative and technical teams", "Develop interactive prototypes and AI-powered tools", "Automate creative workflows with custom scripts", "Build internal tools for design team productivity", "Deploy AI apps on enterprise infrastructure"] },
    { role: "Freelance Developer", company: "Self-Employed", period: "2024 - Present", highlights: ["Built 10+ production web applications deployed on cloud and NAS", "Integrated AI capabilities (image generation, video processing) into client solutions", "Implemented CI/CD pipelines with GitHub/Forgejo Actions", "Dockerized applications for easy deployment on various platforms"] }
  ],
  github: "https://git.khoavo.myds.me/vndangkhoa",
  forgejo: "https://git.khoavo.myds.me/vndangkhoa"
};

export default IT_DATA;
