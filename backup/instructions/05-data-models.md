# 05 — Data Models & Content Spec

> Module 5 of 7

## PERSONAL_INFO (`src/data/personal.js` 67 lines)

### Export

```js
export const PERSONAL_INFO = {
  name: "Vo Nguyen Dang Khoa",
  shortName: "Khoa Vo",
  phone: "0398300340",
  email: "vonguyendangkhoa@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  linkedin: "https://www.linkedin.com/in/khoa-vo-76291236/",
  portfolio: "https://khoavo.myds.me/",
  github: "https://git.khoavo.myds.me/vndangkhoa",
  forgejo: "https://git.khoavo.myds.me/vndangkhoa",
  availability: "Open to work",
};
```

### Helpers

```js
export const triggerPdfPrint = () => window.print();

export const exportPdfDirectly = async (onProgress) => {
  const elem = document.querySelector('.print-portfolio-content');
  if (!elem) return window.print();
  try {
    onProgress(true);
    const canvas = await html2canvas(elem, { scale:2, useCORS:true, allowTaint:true, logging:false, backgroundColor:'#ffffff' });
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Vo_Nguyen_Dang_Khoa_Creative_CV.pdf');
  } catch(err) { console.error(err); window.print(); }
  finally { onProgress(false); }
};

export const downloadCV = () => window.dispatchEvent(new CustomEvent('open-pdf-preview'));
```

Used in Navbar, Hero, Contact. `downloadCV` is event bridge to App showPrintPreview.

---

## CREATIVE_DATA (`src/data/creative.js` 178 lines)

```js
export const CREATIVE_DATA = {
  title: "Creative & Design Manager",
  summary: "Creative and design leader with 9+ years ...\n\nPassionate about integrating AI-powered tools...",
  tagline: "Design Leadership & Visual Strategy",
  skills: [
    { category: "AI & Generative Design", items: ["ComfyUI","Stable Diffusion","FLUX","Midjourney","RunwayML","Ollama","LM Studio","LoRA Training","ControlNet","IP-Adapter"] },
    { category: "Design & Creative Tools", items: ["Adobe Creative Suite","Figma","After Effects","Premiere Pro","Cinema 4D","Blender","Photoshop","Illustrator","InDesign"] },
    { category: "Motion & Animation", items: ["Motion Graphics","3D Animation","Kinetic Typography","Visual Effects","Character Animation","Storyboarding"] },
    { category: "Brand & Strategy", items: ["Brand Identity","Art Direction","Visual Storytelling","Editorial Design","Packaging Design","Strategic Design"] }
  ],
  projects: [10 items],
  experience: [5 items]
}
```

### Projects (10)

| id | title | category | year | link suffix |
|---|---|---|---|---|
|1|FASHION Pipeline: Ideas 2 Execution|AI Video Creation|2026|/2026/04/25/fashion-pipeline...|
|2|The Language of Poetry & Literature|AI Generated Art|2025|/2025/08/28/the-language...|
|3|Evolving My AI Art Workflow: Better Control|AI Generated Art|2025|/2025/08/27/evolving...|
|4|Delux Perfume – Fineline 2025 Launch|AI Branding & Video|2025|/2025/08/11/giving-art-direction...|
|5|Behind the Prompt – AI Video Creation|AI Video Creation|2025|/2025/07/31/...behind-the-prompt...|
|6|AI Studio Photography|AI-Generated Branding|2025|/2025/07/27/...ai-studio...|
|7|A Photo with Feeling is Hard|AI Generated Art|2025|/2025/07/27/...a-beautiful-photo...|
|8|NAVIGATOR – ASIAMARINE Magazine|Editorial Design|2020|/2020/10/20/navigator/|
|9|Skyxx – Animated Poster Series|Motion Graphics|2019|/2019/02/17/skyxx-poster-animation/|
|10|PetroVietnam – PCT Corporate Identity|Brand Identity & 3D|2017|/2017/04/10/petrovietnam-pct/|

Each has `image: portfolio.khoavo.myds.me/wp-content/...` + `description`.

### Experience (5)

- AI CREATIVE LEAD @ Phibious Vietnam 2025-Present (7 highlights)
- ECOMMERCE DESIGN LEAD @ P&G 2020-2025 (7 highlights)
- PRODUCTION CREATIVE LEAD @ INN SaiGon Dec 2019-Nov 2020 (6 highlights)
- REGIONAL HEAD OF DESIGN @ ASIAMARINE 2018-2019 (5 highlights)
- SENIOR GRAPHIC DESIGNER @ EMG 2017-2018 (5 highlights)

Full highlights copied verbatim from file — do not summarize.

---

## IT_DATA (`src/data/dev.js` 132 lines)

```js
export const IT_DATA = {
  title: "Full-Stack Developer & DevOps",
  summary: "Full-stack developer and self-hosted infrastructure architect with 2+ years ... 18+ deployed applications including Next.js 15 DSM Web Manager with 42 AI MCP tools ...",
  journey: [8],
  skills: { languages:[9], frontend:[9], backend:[8], synology:[6], ai:[6], devops:[8], tools:[8] },
  projects: [8],
  experience: [2],
  github: "https://git.khoavo.myds.me/vndangkhoa",
  forgejo: "https://git.khoavo.myds.me/vndangkhoa"
}
```

### Journey (8 chronological)

| month | title |
|---|---|
|PRESENT|Synology Package Hub & Ecosystem|
|AUG '26|Synology DSM Web Manager & AI MCP|
|AUG '26|Rust Systems & Desktop Tooling|
|JUL '26|Self-Hosted Media Engine|
|MAR '25|Kotlin & Android TV|
|DEC '24|Rust & Systems Architecture|
|SEP '24|Full-Stack Media Streaming|
|JUL '24|First Production App|

Each has `description` sentence.

### Skills Cats

- languages: TypeScript, JavaScript, Go, Rust, Python, Kotlin, HTML/CSS, SQL, Bash
- frontend: React 19, Next.js 15, Vite, Tailwind CSS v4, Shadcn UI, Framer Motion, Zustand, PWA, Compose Multiplatform
- backend: Node.js, Go (Gin), Rust (Axum), Python (FastAPI / Flask), REST APIs, WebSocket, HLS Streaming, Ktor
- synology: Synology DSM 7.2+, SPK Package Creation, GPG Key Signing, QuickConnect Protocol, File Station API, SYNO Core APIs
- ai: Model Context Protocol (MCP), LLM Agent Tooling (42 Tools), Cursor AI, Ollama, ComfyUI Node API, Multi-Provider AI
- devops: Docker Multi-arch, Docker Compose, Forgejo CI/CD, Nginx Reverse Proxy, PostgreSQL, SQLite, Hairpin-NAT, Linux / Bash
- tools: Git, VS Code, Postman, ffmpeg, yt-dlp, Android Studio, GnuPG, Figma

### Projects (8)

| name | tech (array) |
|---|---|
|kv-synology|Next.js15, React19, TypeScript, Tailwind v4, MCP, Synology API, Docker|
|spkrepo (KV Package Center)|Python Flask, PostgreSQL, SPK, GnuPG, Docker Compose, Synology DSM 7.2|
|mouse-me|Rust, Slint GUI, Linux Desktop, Hyprland, CLI|
|kv-dl|Rust Axum, Next.js, yt-dlp, ffmpeg, Docker|
|kv-netflix|Kotlin, Compose Multiplatform, Android TV, Web, PWA|
|kv-tube|Go Gin, Next.js, TypeScript, SQLite, Docker, HLS.js, PWA|
|spotify-clone|React Vite, Rust Axum, TailwindCSS, YouTube API, PWA|
|apix|Next.js14, TypeScript, Tailwind, Zustand, Docker|

### Experience (2)

- Synology & Infrastructure Engineer @ KV Self-Hosted Lab 2024-Present (4 highlights)
- Creative Technology Lead @ Phibious Vietnam 2025-Present (3 highlights)

---

## FORGEJO_REPOS (`src/data/forgejo-repos.json` 353 lines)

### Top-level

```json
{
  "fetchedAt": "2026-08-29T07:39:00.377Z",
  "totalRepos": 19,
  "totalLanguages": 9,
  "languages": {
    "Python": 2, "HTML": 1, "TypeScript": 5, "Rust": 3, "Dart": 1, "Kotlin": 2, "Shell": 1, "JavaScript": 2, "Batchfile": 1
  },
  "repos": [ ... ]
}
```

### Repo Shape

```js
{
  id, name, fullName, description, htmlUrl, language, updatedAt, createdAt,
  mirror: bool, mirrorUpdated, topics:[], stars, forks, watchers, releases
}
```

### All 19 repos (sorted updatedAt desc)

1. spkrepo Python 2026-08-29
2. kv-download HTML 2026-08-29
3. kv-synology TypeScript 2026-08-29
4. mouse-me Rust mirror true 2026-08-28
5. dsm_helper-master Dart 2026-08-26
6. kv-dl Rust 2026-08-26
7. kv-tube Kotlin 2026-08-25 (releases 11)
8. kv-netflix Kotlin 2026-08-24
9. kv-music TypeScript 2026-08-20
10. typetype-clone Shell 2026-08-11
11. kv-tiktok Python 2026-08-11
12. .profile (no lang) 2026-08-10
13. kv-cv JavaScript 2026-08-09
14. POSv TypeScript 2026-07-17
15. vietc Rust 2026-07-15
16. kv-ZTE-tool Batchfile 2026-06-27
17. kv-port JavaScript 2026-06-27
18. kv-clearnup TypeScript 2026-06-27 (releases 2)
19. Sys-Arc-Visl TypeScript 2026-06-27

Sorted by `new Date(b.updatedAt) - new Date(a.updatedAt) || new Date(b.createdAt)`.

### FEATURED_REPOS injection

`scripts/fetch-forgejo-data.mjs` injects spkrepo if missing; current JSON already has it as #1.

---

## Print Models

### components/PrintPortfolio.jsx

```js
PRINT_PERSONAL_INFO = { name:"Vo Nguyen Dang Khoa", title:"CREATIVE MANAGER & AI CREATIVE LEAD", subtitle:"Visual Strategy • Generative AI Workflows • Art Direction", location, phone, email, linkedin:"linkedin.com/in/khoa-vo-76291236", portfolio:"khoavo.myds.me", gitServer:"git.khoavo.myds.me/vndangkhoa", summaryHeadline, summaryBody }

PRINT_EDUCATION = [{ period:"2012 - 2016", school:"RMIT University Vietnam", degree:"Bachelor of Multimedia Design", details:"Graduated with Excellence." }]

PRINT_SKILLS_CATEGORIES = [
  { name:"AI & Generative Creative", items:8 },
  { name:"Creative & Motion Suite", items:8 },
  { name:"Creative Leadership & Strategy", items:5 },
  { name:"Technical Infrastructure", items:6 }
]

PRINT_EXPERIENCES = 5 (AI Lead, eCommerce Lead, Production Lead, Regional Head, Senior) — highlights 4/3/2/2/1
PRINT_STRATEGIC_TECH = 4 (AI Fashion, P&G SEA, Delux, Navigator) grid 2
PRINT_COLORS = { primary:#0F172A, secondary:#334155, tertiary:#64748B, accent:#00C853, white:#FFFFFF, lightBg:#F8FAFC, border:#CBD5E1, sidebarBg:#F1F5F9, sidebarBorder:#CBD5E1 }
PRINT_STYLES = inline container 210mm×297mm flex row, sidebar 72mm #F1F5F9 border1.5px, main flex1 padding7mm, fonts pt 5.5-14.5
```

### Root PrintPortfolio.jsx (legacy, 530) differs:

BW palette #000000/#FFFFFF/#f5f5f5, accent none, 75mm sidebar white border2px black, PRINT_SKILLS flat 12 tags, 8 exps + awards, 4 projects vertical list, VndkLogo size60.

---

## Hooks State Shapes

### useForgejoRepos

```js
repos: Repo[] (19), languages: {Python:2,...}, stats: {totalRepos, totalLanguages, lastUpdated}, loading bool, error null|msg, refresh fn
Repo = { id, name, fullName, description, htmlUrl, cloneUrl, language, updatedAt, createdAt, mirror, mirrorUpdated, topics, stars, forks, watchers, releases }
```

Init from buildData; poll 5min to live API; on fail keep buildData.

### usePortfolioPosts

```js
posts: Post[] , loading bool, error, hasMore bool, loadMore fn, refresh fn, page number
Post = { id, title, excerpt (stripHtml), date, dateFormatted, link, slug, featuredImage:{full,large,medium,thumbnail}, categories:[{id,name,slug,link}], tags:[{id,name,slug}] }
transformToProject(post) → { id, title, category:firstCat, image:medium||large, description:excerpt, link, year }
```

PerPage default 6 but Projects uses 12.

---

## Data Flow Recap

See master §16. Keep these exact API shapes for re-creation.

## Content Integrity Rules for AI

- Do not hallucinate projects: use exactly 10 creative + 8 dev + 19 forgejo.
- Do not shorten summaries: copy whitespace-pre-line with \n\n intact.
- Preserve tech arrays order (they drive chips).
- Preserve dates/periods verbatim (Dec 2019 - Nov 2020 vs 2019-2020).
- Preserve image URLs (portfolio.khoavo.myds.me) — they are live.
- Preserve language counts (must match counted langs from repos).
