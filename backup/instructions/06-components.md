# 06 — Components Specification

> Module 6 of 7 — All JSX must be copied verbatim; this doc gives props/structure for AI to validate.

## Atomic UI (`src/components/ui/`)

### VNDKLogo.jsx (63 lines)

```jsx
import { motion } from 'framer-motion';
export default function VNDKLogo({ size='md', className='', animated=true }) {
  const dimensions = { sm:'w-8 h-8', md:'w-10 h-10', lg:'w-16 h-16', xl:'w-24 h-24', hero:'w-32 h-32 md:w-40 md:h-40' }[size] || size;
  return (
    <div className={`relative inline-flex items-center justify-center ${dimensions} ${className}`}>
      <motion.svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm"
        whileHover={animated ? {scale:1.05} : undefined} transition={{duration:0.2}}>
        <path d="M 14 20 L 29 41 L 44 20" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--text-primary)]"/>
        <path d="M 56 41 L 56 20 L 86 41 L 86 20" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--text-primary)]"/>
        <path d="M 14 59 L 28 59 C 41 59 41 80 28 80 L 14 80 Z" stroke="#00FF87" strokeWidth="8" strokeLinecap="round"/>
        <path d="M 56 59 L 56 80 M 86 59 L 56 69.5 L 86 80" stroke="#00FF87" strokeWidth="8" strokeLinecap="round"/>
      </motion.svg>
    </div>
  )
}
```

### TabSwitch.jsx (46)

- Props: `active`, `onChange`, `size='md'` (`sm`→px3 py1 text11px else px4/5 py1.5 text xs), `className`
- State: tabs `[{id:'creative',label:'Creative & AI'},{id:'dev',label:'Full-Stack & DevOps'}]`
- Container: `inline-flex p1 rounded-full bg-[#121815]/90 border white/10 backdrop-blur-xl shadow-inner`
- Button: `relative z-10 font-mono font-semibold rounded-full transition` + active → `text-[#0A0D0B] font-bold` + `motion.span layoutId="tab-pill-segmented"` gradient shadow
- Use in Navbar (sm) + Hero (md) + mobile drawer.

### GlassCard.jsx (24)

```jsx
import { motion } from 'framer-motion';
export default function GlassCard({children, className='', hover=true, glow=false, style, ...props}) {
  return <motion.div whileHover={hover?{y:-4}:undefined} transition={{type:'spring',stiffness:350,damping:25}}
    className={`glass-card ${hover?'glass-card-hover':''} ${glow?'border-[#00FF87]/30 shadow-glow-sm':''} ${className}`} style={style} {...props}>{children}</motion.div>
}
```

### Reveal.jsx (16)

```jsx
import { motion } from 'framer-motion';
export default function Reveal({children, delay=0, y=40, className='', as='div'}) {
  const Tag = motion[as];
  return <Tag initial={{opacity:0,y}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{duration:0.7,delay,ease:[0.16,1,0.3,1]}} className={className}>{children}</Tag>
}
```

### Marquee.jsx (23)

- Props `items=[]`, `separator='·'`, `speed=30`
- If empty return null
- `row(key)` → div.marquee-row ×4 duplicated `items` each span.marquee-item + marquee-sep dot
- Container div.marquee style `--marquee-speed: ${speed}s`, renders row a + b (b aria-hidden)
- CSS drives scroll -50% in 35s linear infinite.

### MeshBackground.jsx (24)

```jsx
export default function MeshBackground({className=''}) {
  return <div className={`mesh-bg ${className}`} aria-hidden><motion.div className="mesh-blob mesh-blob-1" animate={{x:[0,60,-30,0],y:[0,-50,40,0],scale:[1,1.15,0.95,1]}} transition={{duration:22,repeat:Infinity,ease:'easeInOut'}}/> ...blob2 26s ...blob3 30s <div className="mesh-grain"/></div>
}
```

---

## Section Components

### Navbar.jsx (212)

**Imports:** useEffect useState motion AnimatePresence Sun/Moon/Terminal/FileText/Menu/X/ArrowUpRight TabSwitch VNDKLogo PERSONAL_INFO

**Constants:**

```js
const NAV_LINKS = [{id:'about',label:'About'},{id:'skills',label:'Skills'},{id:'work',label:'Work'},{id:'experience',label:'Journey'},{id:'contact',label:'Contact'}];
```

**State:** scrolled bool, menuOpen bool, activeSection string

**Effects:** onScroll → setScrolled scrollY>20 + activeSection spy (getElementById per NAV_LINKS, scrollPosition scrollY+220, reverse loop). Listener add/remove.

**Helpers:** scrollTo(id) → setMenuOpen false + element.scrollIntoView smooth

**Render:**

- motion.header initial y-60 opacity0 animate y0 opacity1 0.6s ease 0.16,1,0.3,1 class fixed top0 left0 right0 z100 px3/6 py3/4 pointer-events-none → inner max-w-6xl flex justify-between pointer-events-auto
- capsule nav-island w-full flex justify-between gap2/4 px3/5 py2 rounded-full
  - Brand button scrollTo top: p1 rounded-xl bg secondary border + VNDKLogo sm + hidden lg KHOA.VO + AI & Tech Lead mono
  - Desktop nav hidden md:flex gap1 bg accent-subtle border pill p1 shadow-inner → map NAV_LINKS → button px3.5 py1.5 text xs rounded-full relative + active → motion.span layoutId active-nav-pill gradient shadow + span relative z10
  - Controls flex gap1.5/2: TabSwitch sm hidden sm:block, PDF CV button bg #00FF87/15 hover/25 border #00FF87/35 FileText text xs mono bold shadow, Terminal button h8 w8 circle accent-subtle border hover, theme Sun/Moon same, hamburger md:hidden Menu/X
- AnimatePresence menuOpen → motion.div initial opacity0 y-10 scale0.98 animate 0.25 easeOut class md:hidden mt2 max-w-lg p5 rounded-3xl glass-bg blur2xl shadow2xl space-y4 → TabSwitch md centered + grid2 links px4 py3 rounded2xl active bg #00FF87/20 else accent-subtle + w-full gradient Download CV + location + Available ping

Must copy verbatim.

### Hero.jsx (200)

**Imports:** motion Download/ArrowRight/Sparkles/ExternalLink/FileText TabSwitch downloadCV PERSONAL_INFO

**Props:** tab, onTabChange

**Logic:** isCreative = tab==='creative', scrollToWork → getElementById work smooth

**Render:** section #hero relative min-h[100svh] flex-col justify-between overflow hidden px4..16 pt28/32 pb10 bg var text var selection emerald

- Video absolute inset z0 overflow hidden pointer-none: src /human_head_turn.mp4 autoplay muted loop playsInline preload auto class absolute inset h-full w-full object-cover lg:scale1.1 opacity35 blend luminosity/screen + vignette from var/90 via/60 to var + radial ellipse transparent 30% var 90%
- Top flex col sm row justify between gap4 mb8 max-w6xl mx-auto: motion div badge-iridescent px4 py1.5 glass border blur shadow + ping dot 2w + badge-iridescent-text AVAILABLE // CREATIVE... vs FORGEJO SYNCED... ; TabSwitch md if onTabChange
- Center motion headline max-w6xl my-auto py6: Sparkles pulse + Vo Nguyen Dang Khoa • Portfolio 2026 mono, h1 36→80px black uppercase leading0.95: BRINGING THE + iridescent UNEXPECTED glow data-text + TO AI & DIGITAL + serif EXPERIENCES (Newsreader), p key tab animate y15 duration0.5 delay0.25 text sm→lg secondary max-w2xl leading relaxed sentence per tab, buttons mt8 flex wrap gap3/4: btn-iridescent Download PDF CV Download icon + btn-glass Explore Selected Work ArrowRight emerald + a inline-flex rounded-full accent-subtle border xs mono LinkedIn vs Forgejo ExternalLink
- Bottom motion metrics border-t grid2 md4 gap4/6 pt8: 4 cards p3/4 rounded2xl accent-subtle border blur: 01 EXPERIENCE 9+ Years..., 02 AI INNOVATION ComfyUI... vs Agentic..., 03 PRODUCTION Fortune500 vs 18+ Apps..., 04 REGIONAL REACH SEA Markets...

### About.jsx (129)

**Props:** tab

**Data:** isCreative → CREATIVE_DATA else IT_DATA, summary creative 9+ visionary ... vs IT_DATA.summary, highlight spotlight sentence per persona.

**Render:** section #about max-w6xl mx-auto px4..8 py20..36 bg var

- Reveal header badge + ONE MIND TWO DISCIPLINES iridescent
- Grid 12cols gap5/6 → left 5col Reveal delay0.1 GlassCard h-full p6/8 flex-col justify-between: top flex justify between mb6: VNDKLogo md 16×16 bg secondary border glow + badge VERIFIED CREATIVE, h3 PERSONAL_INFO.name 2xl, p role mono emerald, space-y2.5 text xs mono: mailto email Mail ArrowUpRight accent-subtle border hover + MapPin location pill, bottom gradient banner 00FF87/15 → transparent border 00FF87/30 p4 Sparkles CREATIVE SPOTLIGHT vs ENGINEERING + p highlight
- Right 7col Reveal delay0.2 GlassCard p6/8/10 flex-col justify between: ShieldCheck Leadership Philosophy..., h4 data.title xl→2xl, p summary xl leading relaxed whitespace-pre-line, metrics mt8 pt6 border-t grid3 gap4: 9+ Years, 7Yrs/18+, 100% Hands-on with display 2xl→4xl emerald/cyan/purple

### Skills.jsx (98)

**Props:** tab

**Constants:** CREATIVE_ICONS [Wand2,PenTool,Film,Layers], DEV_ICONS [Code2,LayoutDashboard,Server,BrainCircuit,Boxes,Wrench], CATEGORY_COLORS 6 accent/border/bg/text

**Derived:** isCreative ? CREATIVE_DATA.skills map add icon else Object.entries IT_DATA.skills map cat/items → icon, then render Reveal header badge + TOOLS OF THE CRAFT + p hybrid toolkit, grid gap4/6 sm2 / lg3, map skill → motion div y25 delay i%3*0.08 → GlassCard p5/7 border hover accent/40 group: top flex justify between mb5: left gap3 icon 10×10 rounded-xl border bg accent text + h3 category bold + right 10px mono muted px2.5 py0.5 rounded-full accent-subtle border `${items.length} skills`, flex wrap gap1.5/2 span.skill-chip per item (cursor-default)

### Projects.jsx (502) — Most Complex

**Imports:** useState useMemo motion AnimatePresence ExternalLink/ArrowUpRight/Star/GitFork/Loader2/AlertTriangle/LayoutGrid/LayoutList/ChevronDown/Up/Filter/Copy/Check/Sparkles GlassCard Reveal usePortfolioPosts useForgejoRepos

**Consts:** LANGUAGE_COLORS 12 entries (JS #f7df1e TS #3178c6 Go #00add8 Rust #dea584 Python #3572A5 Kotlin #A97BFF etc Unknown #00FF87), INITIAL_SHOW_COUNT 6

**Subcomponents:**

- CreativeMotionCard({project,index}) → useState copied + imgLoaded, copyLink clipboard writeText + 2000ms, motion.div layout initial scale0.95 delay i%4*0.05 prompt-card-hover flex-col cursor-pointer → a block h-full href link target _blank: div relative w-full shrink0 rounded2xl/3xl overflow hidden mb3 aspect16/10 bg #121815 border shadow-lg: shimmer-box placeholder if !imgLoaded, img absolute inset object-cover object-top prompt-media-zoom duration700 opacity0→100, fallback div gradient #00FF87/15→#00E5FF/10 index padded, floating top left category chip black/70 blur border white/15 text10px mono bold #00FF87 uppercase, year chip top right, hover overlay absolute inset gradient from #0A0D0B via black/40 to transparent opacity0→100 p4 flex end justify between: View Case Study #00FF87 pill ArrowUpRight + Copy/Check button 8w circle black80 border. Text px1 pt1 pb2: h3 font bold 16→18 group-hover emerald line-clamp1 mb1, p xs secondary line-clamp2.

- DevMotionCard({repo,index}) → copied, color LANGUAGE_COLORS[language], copyUrl same, motion same → a h-full → div h-full p5/6 rounded2xl/3xl glass-bg border group-hover #00FF87/40 shadow-lg flex-col justify between: top gap between mb4: left gap2 dot w3 h3 shadow color80 + language mono xs bold + right stars/forks mono muted amber Star; h3 repo.name mono bold base→lg group-hover emerald line-clamp1 mb2; p xs secondary line-clamp3 mb4; footer flex justify between pt3 border-t mt-auto: Explore Source emerald bold + Copy/Check bg accent-subtle border.

- CompactListRow({item,isCreative,index}) → motion layout y10, a p4 rounded2xl glass-bg border hover #00FF87/40 accent-subtle flex justify between gap4 group shadow-sm block href: left flex gap3.5 min-w0 flex1: dot 9×9 rounded-xl border bg color15 + dot2.5 + info min-w0 flex1: top flex gap2 mb0.5: h4 bold sm truncate font-display vs mono vs emerald hover + span text10px px2 py0.5 rounded-full accent-subtle muted border uppercase mono category/language + p xs secondary truncate max-w-xl. Right flex gap4 shrink0 mono muted: dev sm flex stars/forks hidden vs View ExternalLink emerald.

**Main Projects({tab}):**

- isCreative, hooks: usePortfolioPosts {posts perPage12 → creativeProjects map transformToProject, loading wpLoading error wpError hasMore loadMore}, useForgejoRepos {repos languages loading repoLoading}
- rawList = isCreative ? creativeProjects : repos
- State: selectedFilter All, expanded bool, viewMode grid/list
- filters useMemo: creative cats Set else Object.keys languages
- filteredList useMemo selectedFilter All ? rawList : filter by category/language
- visibleList = expanded?filteredList:slice0,6

Render: section #work py20..36 bg var max-w6xl mx-auto px4..8 → Reveal header badge 03 // + h2 CREATIVE CASE STUDIES vs CODE SHIPPED iridescent + p max-w-md xs→sm secondary feed description

- Filter bar flex col sm row justify between gap3 mb8 pb4 border-b: scrollable capsules flex gap1.5 overflow-x auto custom-scrollbar py1 → map filters → button px4 py1.5 rounded-full xs mono shrink0 cursor-pointer active gradient shadow vs accent-subtle border + dot if language; viewMode toggle flex gap1 glass-bg border rounded-full p1 shrink0: buttons p1.5 rounded-full bg #00FF87 active vs muted hover Grid/List 15px

- AnimatePresence mode wait motion.div key `${tab}-${selectedFilter}-${viewMode}` y20 → isCreative? (wpLoading empty → Loader2 Loading live portfolio…, wpError empty → AlertTriangle Could not load, visible0 → No projects matching, viewMode grid → grid sm2 lg3 gap5/6 map CreativeMotionCard else space-y3 CompactListRow) : (repoLoading empty → Loader2 Fetching repos…, visible0 → No repositories, grid→ DevMotionCard else CompactListRow)

- Expand if filteredList>6: mt12 flex col center gap3: button btn-glass py2.5 px6 shadow-sm on click toggle expanded → Show less ChevronUp vs Expand to view all (N items) ChevronDown emerald, if isCreative hasMore expanded !wpLoading → button text xs emerald hover underline Sparkles Fetch more from WordPress API on click loadMore

### Experience.jsx (128)

**Props:** tab

**Data:** isCreative ? CREATIVE_DATA.experience 5 : IT_DATA.experience 2

**Render:** section #experience py20..36 max-w5xl mx-auto px4..8 → Reveal badge 04 // + THE ARC OF LEADERSHIP vs FROM ZERO TO SHIPPING iridescent mb12/16

- Relative timeline: absolute left15px md50% top0 bottom0 w2px gradient emerald→cyan→purple shadow + space-y8/12 map experience → motion div y35 whileInView once margin-50 0.6 cubic: relative flex col md row conditional md:justify-end if i%2==1; pulsating node absolute left15 md50% top4 w4 h4 -translate-x1/2 rounded-full #00FF87 border2 bg var shadow + ping absolute inset opacity50 animate-ping; card pl10 md0 md w calc50%-2.5rem: GlassCard p5/7 border glass hover 00FF87/40: top flex wrap justify between gap2 mb2: period pill #00FF87/15 border30 xs mono bold uppercase + location MapPin xs mono muted if exists; h3 role display bold 18→20, p company xs→sm mono cyan semi-bold mb4, ul space-y2.5 slice 3 vs 4 highlights: li flex gap2.5 xs→sm secondary leading relaxed: ▸ emerald bold mt0.5 + text

- Dev extra if !isCreative mt20: h3 12px tracking 0.25em emerald bold ARCHITECTURAL CHRONOLOGY & BUILDS, grid sm2 lg3 gap4 map IT_DATA.journey 8 → motion y20 delay i%3*0.08 → GlassCard p5 h-full border hover30: month badge inline-block px2.5 py0.5 rounded-full #00FF87/15 border30 10px mono bold mb2, h4 display bold sm mb1.5, p xs secondary leading relaxed

### Contact.jsx (160)

**Props:** tab

**State:** copied bool, copyEmail clipboard +2200ms

**Render:** section #contact relative overflow hidden py24..40 bg var MeshBackground opacity40 pointer-none → relative z10 max-w4xl mx-auto px4..8 text-center flex-col center

- Reveal badge Sparkles 05 // INITIATE TRANSMISSION iridescent px4 py1 glass border mb4 inline-flex gap2, h2 display black 3xl→6xl tracking tight LET'S BUILD SOMETHING UNFORGETTABLE iridescent max-w3xl leading1.05, p mt4 sm→base secondary max-w-xl mx-auto sentence per tab
- Reveal delay0.15 mt8 flex col sm row gap3 center: inline-flex p1.5 rounded-full glass border blur shadow pill: a mailto gap2.5 px5 py2 xs→sm mono primary hover emerald Mail → PERSONAL_INFO.email + button gap1.5 px4 py2 rounded-full accent-subtle border hover xs mono semi-bold copyEmail Copy/Check
- Reveal delay0.25 mt8 grid1→3 gap3 w-full max-w2xl: 3 cards p4 rounded2xl glass border text-left flex gap3: icon 9×9 rounded-xl bg 00FF87/15 emerald MapPin / 00E5FF/15 cyan Phone / D0B2FF/15 purple Sparkles, label 10px mono muted uppercase Location/Phone/Open, value xs→sm bold primary truncate or emerald Open to Work ping
- Reveal delay0.35 mt10 flex wrap gap4 center: button btn-iridescent Download Printable PDF CV Download group hover -translate + LinkedIn a px5 py3 rounded-full accent-subtle border hover mono xs semi-bold Linkedin emerald + Forgejo GitHub/cyan same
- Footer mt16..24 pt8 border-t w-full flex col sm row justify between gap4 xs mono muted: © 2026 PERSONAL_INFO.name All Rights Reserved + Powered by React, Framer Motion & MotionSites DNA

### EasterEgg.jsx (418)

**Imports:** useEffect useRef useState useCallback motion AnimatePresence TerminalIcon/Sparkles IT_DATA CREATIVE_DATA PERSONAL_INFO

**Consts:**

```js
const BOOT_SEQUENCE = ['INIT SYSTEM KHOA.VO...','MOUNTING VIRTUAL DOM [OK]','LOADING REACT ROOT [OK]','ESTABLISHING AI SUBSYSTEMS...','AI SUBSYSTEMS [ONLINE]','BYPASSING SECURITY PROTOCOLS...','ACCESS GRANTED.'];
const BANNER = `  ╔════════════════...5 lines ASCII KHOA.VO...`;
const QUICK_COMMANDS = ['help','about','skills','projects','creative','experience','contact','clear','exit'];
function resolveCommand(cmd){ // returns string or __CLEAR__/__EXIT__
  help: 7 lines Available commands...
  about: 5 lines Vo Nguyen... + IT_DATA.summary
  whoami→about
  skills: CREATIVE skills + DEV skills uppercase
  projects: SHIPPED DEV APPS + IT_DATA.projects map name tech
  creative: FEATURED CREATIVE WORKS + CREATIVE_DATA.projects slice6 + ... and N more
  experience: CAREER ARC + IT_DATA.experience map role@company period
  contact: Email/Phone/Git/Web
  journey: DEV LEARNING TIMELINE + IT_DATA.journey map month title desc
  date: new Date().toString()
  uptime: performance.now() → hr min sec
  clear/exit
}
function TerminalBootLoader({onComplete}){ // logs 160ms interval, exit blur10 scale1.05 0.6s, div fixed inset z200 bg #0a0a text #00FF94 mono p6/12 flex center text-center pb24
}
```

**State:** booted bool, lines[] , input string, history[] , histIdx number, welcomePrinted ref, inputRef, scrollRef, print cb split \n

**Effects:** if open reset booted/lines/history/histIdx/input/welcome + body overflow hidden else overflow '' . welcome print once after booted: print KHOA.VO OS v2.0 nostalgic CRT + Type help... focus. auto-scroll scrollRef. ESC handler.

**Handlers:** handleCommand raw→trim cmd lower: push history setHistIdx -1, setLines + `$ raw`, if !cmd return, resolveCommand → if clear setLines [] return, exit onClose return, if result → print output else print command not found. handleKeyDown Enter→handleCommand+clear, ArrowUp→history prev, ArrowDown→next or clear, Tab→autocomplete QUICK_COMMANDS.

**Render:** AnimatePresence open → motion.div fixed inset z150 bg black/90 backdrop-blur-lg flex center p3/6/8 select-none → AnimatePresence !booted → TerminalBootLoader onComplete setBooted true. booted → motion.div scale0.95→1 max-w4xl h84vh flex-col rounded2xl border2 #00FF94/50 bg #060d09 shadow0 0 60px rgba0,255,148,0.2 overflow hidden relative crt-screen crt-scanline

- Header flex justify between px4 py2.5 bg #030704 border-b #00FF94/30 shrink0 mono: left gap2 red/yellow/green 3w circles shadow + khoa.vo@os:~ [CRT MONITOR] TerminalIcon 14 + right hidden sm 80x24 + ESC [X] px2.5 py1 xs #00FF94 border40 hover red
- Chips bar flex center gap2 px4 py2 bg #08120c border-b #00FF94/20 overflow-x auto custom-scrollbar shrink0: Quick: Sparkles 11 + map QUICK_COMMANDS → button px2.5 py0.5 xs mono rounded bg #00FF94/10 text #00FF94 border30 hover30 active scale95 shadow
- Display flex1 overflow-auto custom-scrollbar p4/6 mono sm leading relaxed text-left onClick focus: banner centered 8→12px whitespace-pre + subtitle xs #00FF94/70 centered + lines space-y1 text-left map line→ div $→ text #00D9FF semi-bold mt3 else empty h3 else slate200 whitespace-pre-wrap + input flex gap2 mt4: $ bold #00FF94 + input flex1 bg transparent caret #00FF94 min-h1.5 placeholder
- Footer px4 py2 border-t #00FF94/20 bg #030704 10px #00FF94/60 mono flex justify between shrink0: SYSTEM READY // KHOA.VO OS + ↑↓ history ping ▋

### PrintPortfolio (components, 446)

See data-models. Render: div style container print-portfolio-content class width210mm height297mm bg white Inter color grey margin0 auto flex relative overflow hidden → aside sidebar 72mm #F1F5F9 border1.5 #CBD5E1 p7mm6mm flex-col justify-between: profileLogo VNDKLogo md mb2 h1 name 14.5pt 800 primary center + title 6.8pt 800 accent center uppercase + subtitle 5.8pt tertiary center, contactSection borderTop + label 7pt 800 uppercase primary borderBottom 1.5px + items 6.8pt grey 📧📱📍🔗🌐💻, skillMatrix label + map categories → title 6.5pt accent uppercase + flex wrap tags 5.8pt white border mono, education mt auto pt3 borderTop label + school 8.5pt primary + degree 7.5 secondary + period 6.2 mono tertiary. Main section flex1 height297 padding7mm flex-col justify between: h1 mainTitle 13.5pt 800 + summary 7.8pt secondary justify, sectionHeading 9pt 800 uppercase primary border1.5 margin, map experiences 3.2mm mb pageBreak avoid → header flex justify between → role 8.8pt bold + company 7.8 secondary + period 6.8 accent mono, ul pl3.5 list •, project grid 1fr1fr gap2mm card padding2/2.5 borderLeft2.5 accent bg lightBg rounded0 1mm, title 7.8 bold, desc6.8, tech5.8 mono accent bold, footer mt auto pt2.5 borderTop flex justify between: email•phone•portfolio 5.5 muted + VO NGUYEN... 5.5 700 primary.

---

## Shared Patterns

- All section wrappers `max-w-6xl` or `max-w-5xl` or `max-w-4xl` centered px4/6/8 py20..36, bg var, Reveal header.
- Motion: initial opacity0 y20/25/35 whileInView once, duration 0.45-0.7 ease 0.16,1,0.3,1.
- GlassCard everywhere for bento.
- `custom-scrollbar` for all scroll containers hidden visually.
- `group` hover for chip/overlay effects.
- Lucide sizes 11-16 for meta, 14 default.

## File Copy Requirement

AI must not rewrite components — copy original `.jsx` verbatim to preserve exact class strings, motion props, and conditional logic. This spec is for validation only.
