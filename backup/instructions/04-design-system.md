# 04 — Design System & Styling

> Module 4 of 7

## Design DNA: MotionSites

- Palette: Deep void (#0A0D0C) + phosphor emerald (#00FF87) + cyan (#00E5FF) + lavender (#D0B2FF) + peach (#FFEEB8)
- Glassmorphism 2.0: `glass-bg` rgba + `backdrop-blur-2xl` + border + glow on hover
- Iridescent radial gradients at `44.373% 35.1526%` (purple → peach → mint)
- Film grain `noise-overlay` + mesh blobs + scanlines
- Typography: Inter 900 for headlines, Newsreader italic for serif accent, JetBrains Mono for meta

## CSS Variables (`src/index.css:18-54`)

### Dark (`:root`)

```css
--bg-primary: #0A0D0C;
--bg-secondary: #111614;
--bg-elevated: #161C19;
--text-primary: #F2F5F3;
--text-secondary: #A1ACA6;
--text-muted: #64706A;
--accent: #00FF87;
--accent-brand: #00FF87;
--accent-subtle: rgba(0, 255, 135, 0.08);
--border: rgba(255, 255, 255, 0.08);
--border-subtle: rgba(255, 255, 255, 0.05);
--glass-bg: rgba(14, 19, 17, 0.68);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-shadow: rgba(0, 0, 0, 0.5);
--grid-color: rgba(0, 255, 135, 0.03);
--iridescent-gradient: radial-gradient(80.17% 109.2% at 44.373% 35.1526%, rgb(208,178,255) 0%, rgb(255,238,216) 42.83%, rgb(0,255,135) 88.38%);
```

### Light (`[data-theme="light"]`)

```css
--bg-primary: #F8FAFA;
--bg-secondary: #EEF2F0;
--bg-elevated: #FFFFFF;
--text-primary: #0D1210;
--text-secondary: #4A5650;
--text-muted: #7E8D86;
--accent: #059669;
--accent-brand: #00C853;
--accent-subtle: rgba(0, 200, 83, 0.08);
--border: rgba(0, 0, 0, 0.08);
--border-subtle: rgba(0, 0, 0, 0.04);
--glass-bg: rgba(255, 255, 255, 0.8);
--glass-border: rgba(0, 0, 0, 0.08);
--glass-shadow: rgba(0, 0, 0, 0.08);
--grid-color: rgba(0, 0, 0, 0.03);
--iridescent-gradient: radial-gradient(..., rgb(147,51,234) 0%, rgb(249,115,22) 42.83%, rgb(16,185,129) 88.38%);
```

Switch via `data-theme` attr on `<html>` (App.jsx useEffect). Tailwind maps `bg.primary` → `var(--bg-primary)` etc.

## Tailwind Extension (from tailwind.config.js)

- `colors.bg` / `text` / `accent` / `border` map to vars
- `fontFamily`: sans Inter, display Inter, serif Newsreader, mono JetBrains, pixel basis33
- `animation`: gradient-shift 8s, shimmer 2.2s, pulse-glow 3s, float 6s, spin-slow 12s
- `boxShadow`: glow-sm/md/lg/cyan/purple/glass

## Key Utility Classes (`index.css`)

### Structural

- `.custom-scrollbar` → hide bars but keep scroll (scrollbar-width:none + ::-webkit display:none) — used on marquee, project filter, terminal
- `html { scroll-behavior: smooth; color-scheme: dark }`
- `body { bg var(--bg-primary), text var(--text-primary), Inter, transition 0.4s cubic 0.16,1,0.3,1, antialiased, overflow-x hidden }`
- `::selection { bg rgba0,255,135,0.35, text white }`
- `.noise-overlay` fixed inset svg fractalNoise 0.75 3 octaves opacity 0.03 z9999

### Badges

- `.badge-iridescent` → relative inline-flex pill isolation isolate + `::before` radial gradient mask border 1px
- `.badge-iridescent-text` → gradient clip text uppercase bold

### Typography

- `.font-display/.font-serif/.font-mono`
- `.serif-accent` → Newsreader italic 500 gradient 120deg #00FF87→#00E5FF→#D0B2FF clip
- `.iridescent-text` → radial gradient clip 200% 200%
- `.iridescent-glow-text::after` → blur12 screen 0.75 glow copy of data-text

### Glass

- `.glass-card` → bg var blur24 border 1.5rem radius shadow inset
- `.glass-card-hover` → transition border/shadow/bg, hover border rgba0,255,135,0.35 glow
- `.prompt-card-hover` → y-4 + media zoom 1.04
- `.shimmer-box::after` → -100% translate shimmer 2.2s

### Nav

- `.nav-island` → rgba10,13,12,0.75 border 0.1 blur24 shadow 20px 40px inset; light variant rgba255/0.85
- Active pill `layoutId` gradient #00FF87→#00E5FF

### Buttons

- `.btn-iridescent` → radial pill #0A0D0B text 0.75rem 1.6rem 700 size150% shadow 0 8px 30px hover y-2 brightness1.05
- `.btn-glass` → glass blur16 border hover 0.4 shadow

### Mesh

- `.mesh-bg` absolute inset overflow hidden pointer-none
- `.mesh-blob` absolute circle blur100 opacity0.3 ×3 radials:
  - blob1 50vw -10%/-10% radial 30% 30% #00FF87→#00E5FF
  - blob2 45vw 20%/-15% radial 60% 40% #D0B2FF→#00E5FF
  - blob3 40vw -15%/25% radial 50% 50% #FFEEB8→#00FF87
- Animated via Framer `MeshBackground.jsx` x/y/scale 22/26/30s infinite

### Marquee

- `.marquee` overflow hidden py 1.25rem border top/bottom var(--border) mask linear 10% 90%
- `.marquee-row` flex gap3rem nowrap max-content animate marquee-scroll 35s linear infinite pause hover
- `.marquee-item` JetBrains 0.825rem 600 0.14em uppercase muted
- `.marquee-sep` 4px dot #00FF87 glow
- `@keyframes marquee-scroll 0→-50%`

### Chips

- `.skill-chip` pill 0.4rem 0.9rem 0.8rem mono 500 muted bg3% border hover white + y-2 glow

### Line Clamp

- `.line-clamp-2/3` webkit box -webkit-line-clamp

### Print (index.css + print.css)

- `@media print` hides `.app-main`, `.fixed.inset-0`, shows `.print-only-version`, forces `.pdf-content .page` 210mm 297mm break-after always, cover dark #111827 etc. Plus `print.css` hard overrides for `.pdf-preview-backdrop` static, `.standalone-print-mount` block, `.printable-cv-area` 210mm.

### Scrollbar

- `::-webkit-scrollbar 8px`, track #0A0A0A, thumb #00FF94 hover #00D9FF

### Effects

- `.grayscale-blur` 80% blur1px pixelated → hover 0%
- `.crt-screen` text-shadow 0 0 4px rgba0,255,148,0.6 flicker 0.15s infinite + ::before scanline repeating 1px/2px + ::after vignette radial 40%→65% + sweep 12px linear 5s
- `@keyframes blink/bounce float`

## Print CSS (`src/print.css` 113 lines) Verbatim Outline

```css
@import Inter+JetBrains;
.standalone-print-mount { display:none }
@media print {
  @page { size: A4 portrait; margin:0 }
  *,*::before,*::after { backdrop-filter:none filter:none box-shadow:none text-shadow:none }
  html,body { margin0 padding0 bg white print-color-adjust exact overflow visible height auto min-height0 }
  .no-print, .noise-overlay, .app-main>header/main/footer/nav, .crt-screen, button.no-print { display:none !important }
  .pdf-preview-backdrop { position static bg white padding0 margin0 overflow visible min-height0 height auto backdrop-filter none }
  .pdf-preview-wrapper { bg white padding0 margin0 min-height0 height auto overflow visible }
  .standalone-print-mount { display:block !important }
  .printable-cv-area { display block position static width210mm min-height297mm margin0 padding0 bg white color black shadow none rounded0 overflow visible }
  .print-portfolio-content { display flex flex-row width210mm min-height297mm bg white box-sizing }
  .print-portfolio-content aside { display flex flex-col }
  .print-portfolio-content section, main { display flex flex-col flex1 }
  .print-portfolio-content * { -webkit-print-color-adjust exact print-color-adjust exact }
}
```

## VNDK Logo Paths (SVG)

- V: `M 14 20 L 29 41 L 44 20`
- N: `M 56 41 L 56 20 L 86 41 L 86 20`
- D: `M 14 59 L 28 59 C 41 59 41 80 28 80 L 14 80 Z`
- K: `M 56 59 L 56 80 M 86 59 L 56 69.5 L 86 80`
Stroke 8 round. Top V/N `currentColor` (adapts dark/light via var), bottom D/K `#00FF87` always. Favicon variant uses `.vn` dark #17171C light white via media, `.dk` always #00FF87.

## Color Usage Guide

- Primary CTA: `#00FF87` (mint) → success, availability dot, active pill, download buttons
- Accent cyan: `#00E5FF` for gradient mid, location pins, fork counts
- Purple: `#D0B2FF` for tertiary metrics, brand
- Peach: `#FFEEB8` for warm contrast
- Text: primary var, secondary var, muted var. Never hardcode except #0A0D0B on mint pills.
- Border: `--border` for dividers, `--glass-border` for glass cards, `accent-subtle` for pill bg.

## Rebuild CSS Order

1. Import fonts (index.css first line)
2. Tailwind directives
3. Custom utilities (.custom-scrollbar)
4. Root vars (dark + light)
5. Global html/body
6. Component utilities (badge, glass, mesh, marquee, chip)
7. Print overrides (index.css + print.css)
8. Scrollbar, image, CRT

Copy `src/index.css` verbatim (914 lines) — no summarizing. Tailwind will purge unused but all classes are scanned via content glob.
