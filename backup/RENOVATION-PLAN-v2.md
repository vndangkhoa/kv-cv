# RENOVATION PLAN v2 — Scroll-Synced Video + Minimal Copy

> **Goal:** Complete fresh design, not patch. Video `human_head_turn.mp4` (1280×720, 10s, 24fps, h264) is the layout grid. Text appears in its **white space** on scroll scrub, never over the face.

**Created:** 2026-08-31  
**Trigger:** User request: "completely renovate, new fresh design, scrollable mouse effect basing on video, text will appear in white space, less text, enough info"

---

## 1. Video White-Space Analysis

Frames at `frame_01.jpg` (hands praying), `frame_05.jpg` (blowing bubble), `frame_10.jpg` (profile) — `src: /tmp/kv-extract`:

- Subject anchored `x~58-68%`, `y~45-55%` (right-center), head height ~60% viewport, constant across 10s.
- **Usable white space:** Left column `x 0-46%`, full height, water + sofa blur with 2-4 small goldfish — low frequency, high luminance (~#A8D8D0 avg). Safe for white text on subtle dark scrim without covering fish/face.
- Top bar `y 0-14%` has water surface lines — avoid dense headlines there, keep nav minimal 48px.
- Right margin `x 92-100%` is caustic light pattern — keep empty, no text.
- Movement: head rotates `left 30° → center → right 15°` + breath bubble at 45-55% scroll. Text must stay locked left, opacity/fade tied to head direction to avoid visual fight.

**Rule:** All overlay copy lives in `left: 5% width: 42% (max 560px)`. Never center/right. Right 50% is video subject + breathing room.

---

## 2. Content Finetuning — Shortened (Current → New)

Principle: 60% reduction, one idea per chapter, 12-24 words max, viewer watches video not reads.

### PERSONAL_INFO (unchanged truth)
- Vo Nguyen Dang Khoa — Khoa Vo, HCMC, 0398300340, vonguyendangkhoa@gmail.com

### Hero / Intro (was: "Visionary Creative & AI Lead with 9+ years..." 48 words)
**New — 18 words, split 1+2 lines:**
> **BRINGING THE UNEXPECTED TO LIFE.**  
> *9 years at the edge of creativity & code — now building AI that ships.*

Micro-pill (was: "AVAILABLE // CREATIVE & AI INNOVATION LEAD") →
> `● Open to work · HCMC · SEA scale`

### About (was: `CREATIVE_DATA.summary` 58 words + `IT_DATA.summary` 52 words stacked in bento)
**New — 32 words, left-aligned, two personas condensed to one sentence each:**
> **Creative Lead:** Brand systems for P&G & Fortune 500.  
> **Engineer:** 18+ live apps on self-hosted infra.  
> Same mind — design-led, production-proven.

Metric strip (was: 4 heavy cards 9+, ComfyUI, Fortune 500, SEA) →
**New — 3 inline stats, no cards:**
> `9+ YRS · 60% faster with AI · 18 SHIPPED`

### Skills (was: 4 creative cats 31 items + 7 dev cats 58 items, bento chips overload)
**New — Two compact lines + 8 chips max at a time (toggle persona):**
- Creative: `ComfyUI · FLUX · Stable Diffusion · Figma · After Effects · Cinema 4D`
- Dev: `React · Next.js · Go · Rust · Docker · Forgejo CI/CD`

Show persona via `TabSwitch` but content swaps in place, no grid. One row, 6 chips.

### Projects (was: 10 creative + 8 dev + 19 forgejo, expandable grid)
**New — Curated 4 only (2+2), horizontal glance, not archive:**
- Left side teaser card while video scrubs, full grid revealed *below* scrolly on click "View all 18"
- Kept: `FASHION Pipeline` (2026), `Delux Perfume` (2025), `kv-synology` (MCP Hub), `kv-tube` (HLS) — covers AI, brand, infra, streaming. Each title + 8-word desc.

### Experience (was: 5 creative + 2 dev verbose highlights 28 bullets)
**New — 3 lines, timeline stripped:**
> `2025 — Present · AI Creative Lead @ Phibious — AI video pipelines for global brands`  
> `2020 — 2025 · eCom Design Lead @ P&G — SEA Hair Care, millions of shoppers`  
> `2024 — Present · Infra Lab — Package Center (pkg.khoavo.myds.me) + MCP tools`

No bullets, line per role with hover expand.

### Contact (was: mesh + 3 info cards + email pill + 2 CTAs + linkedin/forgejo)
**New — Single CTA, 14 words:**
> `Let's build something unforgettable.`  
> `vonguyendangkhoa@gmail.com — Copy` + minimal `PDF CV` pill. Location/status as footnote `HCMC · Open to Work`.

**Net reduction:** ~420 words on page → ~140 words in scrolly viewport (~67% less), *enough* for recruiter scan in 15s while video loops.

---

## 3. New Layout — Scrolly + Release

### A. Scrolly Stage (first 400vh)
```
<section class="scrolly" style="height:400vh">
  <div class="sticky h-[100svh] top-0 overflow-hidden bg-[#061010]">
    <video #scrollyVideo src="/human_head_turn.mp4" class="absolute inset-0 w-full h-full object-cover object-[62%_50%] scale-[1.04]" muted playsInline preload="auto" />
    <!-- soft left scrim so text pops but fish still visible -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#061010]/72 via-[#061010]/28 to-transparent pointer-events-none" />
    <!-- top vignette -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-[18%]" />
    <!-- chapters container left 5% width 42% -->
    <div class="relative z-10 h-full flex items-center px-[5vw]">
      <div class="w-[42%] max-w-[560px] space-y-[28vh]"> <!-- scroll chapters stacked vertically, opacity controlled -->
        <chapter #1 ...>
        <chapter #2 ...>
      </div>
    </div>
  </div>
  <!-- progress track is 400vh tall, sticky does the scrub -->
</section>
```

**Chapters (6, each 70vh scroll window, opacity 0.15–1):**
1. **09:00-01:** `00-15%` scroll → video 0.0-1.6s (hands) → headline `BRINGING THE UNEXPECTED...` + open pill
2. **01-02:** `15-32%` → 1.6-3.2s (fish drift) → About distilled
3. **02-03:** `32-50%` → 3.2-5.0s (bubble) → Skills chips (creative vs dev toggle)
4. **03-04:** `50-68%` → 5.0-7.0s (head turn) → Featured 4 projects as mini stacked cards
5. **04-05:** `68-84%` → 7.0-8.6s (fish swarm) → Experience 3-liner timeline
6. **05-06:** `84-100%` → 8.6-10s (settle) → Contact CTA centered slightly (wider 48% for final)

Each chapter `opacity` + `translate-y 12px` driven by IntersectionObserver on its sentinel OR by `progress` math: `chapterOpacity = clamp(1 - abs(progress - chapterCenter)*4, 0.15, 1)`.

### B. Release Section (below scrolly, normal flow)
Video unpins, fades to mesh blurred still `scale 1.1 - filter blur(40px) opacity 0.08` behind content. Sections become editorial clean (no glass):
- `#work` full grid (12 items) with `usePortfolioPosts` / `useForgejoRepos` re-used, but cards now minimal: `image 4:3 + title sm + category mono xs + hover underline`, no copy button clutter, 2-3 columns.
- `#experience` left timeline thin line `1px #0FF87/30`, not glowing spine.
- `#contact` centered `max-w-xl`, email pill only.

**Nav** during scrolly: transparent `h-14`, hides to `backdrop-blur` pill only after `scrollY > 100` and after scrolly release solid white/black per theme. Keeps white space clean during chapters.

---

## 4. Interaction Spec — Scroll-Scrub

**Tech:** No GSAP/ScrollTrigger needed; Framer Motion `useScroll` + `useTransform` already installed, or native `scroll` + `requestAnimationFrame` to avoid dependency bump.

```js
// ScrollyVideo.jsx
const videoRef = useRef(null);
const containerRef = useRef(null);
const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start","end end"] });
// Lerp for smoothness
const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
useEffect(() => {
  const v = videoRef.current; if(!v) return;
  const unsub = smoothProgress.on("change", (p) => {
    if (v.duration) v.currentTime = p * v.duration; // 0-10s
  });
  // preload
  v.preload = "auto";
  v.muted = true; v.playsInline = true;
  return unsub;
}, []);
```

**Fallback if video seek jank:** Pre-extract `frame_%02d.jpg` sequence (10 fps = 100 frames for 10s) and draw to `<canvas>` via `drawImage` on progress — smoother on Synology.

**Performance:** `will-change: transform`, `object-cover` not `background`, `requestVideoFrameCallback` optional. Pause updates when `document.hidden`.

**Accessibility:** Prefers `reduced-motion` → disable scrub, video `autoPlay loop` + static text stack. Keyboard `Space` advances chapter.

---

## 5. Copy Deck — Final Short Text (to paste)

**Headline** (keep iconic but tighter):
`BRINGING THE`  
`UNEXPECTED` *(iridescent)*  
`TO LIFE`

**Sub:** `Creative Lead × Full-Stack Builder. 9 years turning ideas into systems that scale across SEA.`

**About (2 lines):** `P&G → Phibious: AI pipelines +60% output. Self-hosted: Package Center + 18 live apps.`

**Skills label:** `TOOLS I TRUST` — then chips as above.

**Projects header:** `04 SELECTED — 04 of 18` + `View all →` link.

**Experience header:** `PATH — 2017 → Now`

**Contact:** `READY TO SHIP?` + `Let’s talk → vonguyendangkhoa@gmail.com`

All text `mix-blend-normal`, color `text-white` with `drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]` so fish don't kill contrast, aligned `text-left` in white space.

---

## 6. File Impact (if green-lit)

**Create / Modify:**
- `src/components/ScrollyVideo.jsx` (NEW) — 140 lines, sticky + video + chapters
- `src/components/ScrollyChapter.jsx` (NEW) — 40 lines, opacity wrapper
- `src/hooks/useScrub.js` (NEW) — 30 lines, scroll→time lerper
- `src/App.jsx` — replace Hero + About + Skills + Projects intro with ScrollyStage, keep Projects grid below, trim 60% props
- `src/components/Navbar.jsx` — strip bento, make minimal: logo + 3 links + PDF pill only during scrolly
- `src/components/Projects.jsx` — remove filter-bar clutter for scrolly teaser, keep full grid as `<ProjectsGrid>` below
- `src/index.css` — drop `.mesh-blob` heavy, add `.scrolly-scrim`, reduce `.glass-card` use in first fold
- `src/data/short.js` (NEW) — curated 4 projects + 3 experience lines (derives from creative.js/dev.js but trimmed)

**Delete / Deprecate:**
- Heavy `MeshBackground` in first fold, keep only for contact
- `Marquee` moved below scrolly (secondary)

**No new deps.** Reuse `framer-motion useScroll/useSpring`.

---

## 7. Non-Goals & Guardrails

- No cover of face — automated test: `getBoundingClientRect` of text must not intersect video central 50% (right half) at any scroll.
- No autoplay with sound, no parallax on fish (keeps focus on head).
- Copy stays truthful: same companies, dates, tech — just condensed. Link to full CV PDF for detail.

---

## 8. Verification

- [ ] Scroll 0→100% scrubs video 0→10s smoothly ±0.2s, no jump on resize
- [ ] Each chapter readable in left 42% white space, not overlapping face at 320px width too (mobile: text full width with `bg-black/48 backdrop-blur` card — white space flips to card because video crops)
- [ ] Reduced-motion fallback shows stacked static sections
- [ ] Lighthouse 90+ perf (video ~2.8M, add `poster=frame_05.jpg` + `preload metadata`)
- [ ] Word count in viewport <150

---

## 9. Next Step

Approve short copy + chapter order above? On `yes`, implement `ScrollyVideo.jsx` + wire `App.jsx` and ship preview on `npm run dev -- --host 0.0.0.0 --port 5173`.

*Alternative considered:* Full-screen canvas sequence scrub (100 jpgs) — smoother but +8 MB transfer, deferred.

