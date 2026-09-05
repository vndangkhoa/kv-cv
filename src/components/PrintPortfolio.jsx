import React from 'react';

// ─────────────────────────────────────────────────────────────
// DATA FOR 1-PAGE A4 EDITORIAL CV (TEXT-FULL & HIGH DENSITY)
// ─────────────────────────────────────────────────────────────
const INFO = {
  name: "Vo Nguyen Dang Khoa",
  short: "KHOA.VO",
  title: "CREATIVE MANAGER & AI INNOVATION LEAD",
  subtitle: "Visual Strategy  •  Generative AI Workflows  •  Art Direction  •  Full-Stack Engineering",
  location: "Ho Chi Minh City, Vietnam",
  phone: "0398300340",
  email: "vonguyendangkhoa@gmail.com",
  linkedin: "linkedin.com/in/khoa-vo-76291236",
  portfolio: "khoavo.myds.me",
  github: "github.com/vndangkhoa",
  summary:
    "Multidisciplinary Creative Manager with 9+ years leading high-performance design teams and architecting autonomous AI production workflows across Southeast Asia. Spearheaded regional eCommerce design systems for Fortune 500 brands (P&G SEA Hair Care) and pioneered generative AI video pipelines (ComfyUI, FLUX.1, Runway, LoRA adapters) accelerating commercial asset velocity by 60%. Bridges traditional art direction, brand governance, and full-stack software engineering (React, Go, Docker, Synology DSM).",
};

const EDUCATION = {
  period: "2012 — 2016",
  school: "RMIT University Vietnam",
  degree: "Bachelor of Multimedia Design",
  honors: "Best Artistic Graduate Showcase (2016)",
  lang: "English (Full Professional) • Vietnamese (Native)",
};

const METRICS = [
  { value: "9+ Yrs", label: "Creative Leadership", sub: "P&G, Phibious, Luxury Brands" },
  { value: "+60%", label: "AI Output Efficiency", sub: "ComfyUI, FLUX & LoRA Pipelines" },
  { value: "500+", label: "Design System Assets", sub: "6 SEA eCommerce Markets" },
  { value: "18+ Apps", label: "Production & Tooling", sub: "Full-Stack, Docker, Microservices" },
];

const SKILL_GROUPS = [
  {
    label: "AI & Generative Production",
    icon: "◉",
    items: ["ComfyUI", "FLUX.1", "Stable Diffusion", "Midjourney v6", "Runway Gen-3", "LoRA Fine-Tuning", "ControlNet", "IP-Adapter", "Prompt Engineering"],
  },
  {
    label: "Design, Motion & 3D",
    icon: "◆",
    items: ["Art Direction", "Figma", "Photoshop", "After Effects", "Premiere Pro", "Cinema 4D", "Blender", "Design Systems", "Visual Storytelling", "Packaging"],
  },
  {
    label: "Leadership & Strategy",
    icon: "▲",
    items: ["Team Leadership (20+)", "Omnichannel Visuals", "eCommerce Growth", "SOP Development", "Brand Governance", "Cross-functional Mgmt"],
  },
  {
    label: "Engineering & Cloud Infra",
    icon: "⬢",
    items: ["React / Next.js", "TypeScript", "Go (Gin)", "Rust", "Docker", "DevOps & CI/CD", "Synology DSM", "REST & MCP APIs", "Linux"],
  },
];

const OPEN_SOURCE_INFRA = [
  {
    name: "VietC IME",
    desc: "Modern Vietnamese input method engine for Linux with direct Unicode output and zero pre-edit lag.",
    tech: "Rust • Wayland • X11 • Linux",
  },
  {
    name: "Synology App Hub",
    desc: "Self-hosted private cloud ecosystem orchestrating micro-apps: kv-synology (DSM manager), kv-download (batch media engine), kv-netflix (streaming), kv-music & MCP AI tools.",
    tech: "Next.js 15 • Go • Docker • HLS • MCP",
  },
  {
    name: "ComfyUI Node Suite",
    desc: "Custom ComfyUI nodes and automated workflows for e-commerce garment swap and multi-angle product rendering.",
    tech: "Python • PyTorch • CUDA • LoRA",
  },
];

const EXPERIENCES = [
  {
    role: "AI Creative Lead",
    company: "Phibious Vietnam",
    period: "2025 — Present",
    highlights: [
      "Pioneer the agency-wide generative AI transformation of commercial video and digital asset production, increasing output by 60% while maintaining strict Fortune 500 brand fidelity.",
      "Architect and deploy customized ComfyUI and FLUX.1 LoRA node pipelines, standardizing SOPs for prompt engineering, style consistency, and multi-resolution batch rendering.",
      "Direct and mentor 20+ producers, art directors, and motion designers in AI-augmented storytelling, accelerating campaign concept delivery from days to hours.",
    ],
  },
  {
    role: "eCommerce Design Lead",
    company: "Procter & Gamble (P&G)",
    period: "2020 — 2025",
    highlights: [
      "Directed end-to-end visual strategy and digital execution for P&G Hair Care portfolio (Head & Shoulders, Pantene, Rejoice) across 6 Southeast Asian regional markets.",
      "Engineered an enterprise modular design system with reusable UI/visual components, slashing quarterly asset adaptation time by 3× across 200+ campaign deliverables.",
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
];

const FEATURED_PROJECTS = [
  {
    n: "01",
    title: "AI Commercial Video Pipeline",
    desc: "Automated generative production suite combining custom ComfyUI nodes, FLUX.1 LoRA adapters, and Runway Gen-3 for high-fidelity TVC & social video campaigns.",
    tech: "ComfyUI • FLUX.1 • LoRA • AnimateDiff • CUDA",
  },
  {
    n: "02",
    title: "P&G SEA Hair Care Design System",
    desc: "Scalable multi-market design system with 500+ master components deployed across Shopee, Lazada, and TikTok Shop for Head & Shoulders, Pantene, and Rejoice.",
    tech: "Art Direction • Design Systems • Figma • QA",
  },
  {
    n: "03",
    title: "Delux Luxury Perfume Campaign",
    desc: "End-to-end commercial campaign from AI moodboard generation to 3D bottle styling and final 4K video delivery, blending generative visuals with high-end motion.",
    tech: "Runway Gen-3 • Midjourney • LoRA • After Effects",
  },
  {
    n: "04",
    title: "NAVIGATOR Luxury Yacht Publication",
    desc: "Editorial layout, bespoke typography system, and interactive digital yacht catalog for ASIAMARINE's luxury clientele across Southeast Asia.",
    tech: "Editorial Direction • Typography • InDesign • Web",
  },
];

const HONORS_CERTS = [
  { label: "P&G SEA Digital Awards — Best Campaign", year: "2024", type: "Award" },
  { label: "Google Cloud — Professional Cloud Architect", year: "2023", type: "Cert" },
  { label: "RMIT Best Artistic Graduate Showcase", year: "2016", type: "Award" },
];

// ── B&W PALETTE — Zero color, print-optimal ──
const C = {
  black: "#000000",
  ink: "#111111",
  slate: "#222222",
  muted: "#444444",
  faint: "#777777",
  bg: "#FFFFFF",
  sidebarBg: "#F7F8F7",
  border: "#CCCCCC",
  light: "#EEEEEE",
};

// Monochrome VNDK Logo
const MonoVNDK = ({ size = 32 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke="#000" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M 14 20 L 29 41 L 44 20" />
    <path d="M 56 41 L 56 20 L 86 41 L 86 20" />
    <path d="M 14 59 L 28 59 C 41 59 41 80 28 80 L 14 80 Z" />
    <path d="M 56 59 L 56 80 M 86 59 L 56 69.5 L 86 80" />
  </svg>
);

const S = {
  page: {
    width: '210mm',
    height: '297mm',
    minHeight: '297mm',
    maxHeight: '297mm',
    background: C.bg,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: C.slate,
    boxSizing: 'border-box',
    margin: '0 auto',
    position: 'relative',
    padding: 0,
  },

  // HEADER (19mm)
  header: {
    height: '19mm',
    minHeight: '19mm',
    background: C.bg,
    display: 'flex',
    alignItems: 'center',
    padding: '3.5mm 5.5mm',
    boxSizing: 'border-box',
    borderBottom: `0.45mm solid ${C.black}`,
    justifyContent: 'space-between',
  },
  headerLeft: { display: 'flex', gap: '3.8mm', alignItems: 'center' },
  logoBox: {
    width: '12mm',
    height: '12mm',
    borderRadius: '2.2mm',
    background: C.bg,
    border: `0.7mm solid ${C.black}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  name: { fontSize: '16pt', fontWeight: 900, color: C.black, letterSpacing: '-0.03em', lineHeight: 1, margin: 0 },
  role: { fontSize: '7.4pt', fontWeight: 800, color: C.black, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.6mm', display: 'block' },
  sub: { fontSize: '5.8pt', fontWeight: 600, color: C.muted, marginTop: '0.35mm', letterSpacing: '0.01em' },
  headerRight: { textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' },

  // CONTACT BAR (6.5mm)
  contactBar: {
    height: '6.5mm',
    minHeight: '6.5mm',
    background: C.black,
    display: 'flex',
    alignItems: 'center',
    gap: '1.8mm',
    padding: '0 5.5mm',
    flexWrap: 'nowrap',
    boxSizing: 'border-box',
  },
  contactPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.8mm',
    background: C.bg,
    border: `0.25mm solid ${C.black}`,
    color: C.black,
    fontSize: '5.8pt',
    fontWeight: 700,
    padding: '0.5mm 2mm',
    borderRadius: '999px',
    fontFamily: "'JetBrains Mono', monospace",
    whiteSpace: 'nowrap',
    lineHeight: 1,
  },
  contactPillRight: {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#FFFFFF',
    fontSize: '5.5pt',
    fontWeight: 700,
    fontFamily: "'JetBrains Mono', monospace",
    marginLeft: 'auto',
    letterSpacing: '0.05em',
  },

  // BODY
  body: {
    flex: 1,
    display: 'flex',
    minHeight: 0,
    boxSizing: 'border-box',
  },

  // SIDEBAR (67mm)
  sidebar: {
    width: '67mm',
    minWidth: '67mm',
    maxWidth: '67mm',
    background: C.sidebarBg,
    borderRight: `0.35mm solid ${C.black}`,
    padding: '5mm 4.5mm 4.5mm',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    gap: '6.5mm',
  },
  sideSectionLabel: {
    fontSize: '7.2pt',
    fontWeight: 900,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: C.black,
    borderBottom: `0.45mm solid ${C.black}`,
    paddingBottom: '0.8mm',
    marginBottom: '2.5mm',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8mm',
  },
  catHead: {
    fontSize: '6.4pt',
    fontWeight: 800,
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    color: C.black,
    marginBottom: '1.2mm',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6mm',
  },
  pill: {
    display: 'inline-block',
    background: C.bg,
    border: `0.22mm solid ${C.border}`,
    color: C.ink,
    padding: '0.65mm 1.6mm',
    fontSize: '5.6pt',
    fontWeight: 650,
    marginRight: '0.8mm',
    marginBottom: '0.8mm',
    borderRadius: '0.45mm',
    fontFamily: "'JetBrains Mono', monospace",
    lineHeight: 1.15,
  },

  // MAIN COLUMN (143mm)
  main: {
    flex: 1,
    padding: '5mm 6mm 4.5mm',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    background: C.bg,
    gap: '6mm',
  },
  summaryHead: { fontSize: '10.8pt', fontWeight: 900, color: C.black, lineHeight: 1.12, letterSpacing: '-0.02em', margin: 0 },
  summaryHeadAccent: { fontStyle: 'italic', fontWeight: 800, color: C.black, textDecoration: 'underline', textDecorationThickness: '0.35mm', textUnderlineOffset: '0.6mm' },
  summaryBody: { fontSize: '6.8pt', lineHeight: 1.4, color: C.slate, textAlign: 'justify', marginTop: '1mm', margin: 0 },
  
  metricRow: { display: 'flex', gap: '2.4mm', marginTop: '2.2mm' },
  metricCard: {
    flex: 1,
    background: C.bg,
    border: `0.25mm solid ${C.black}`,
    borderRadius: '1.2mm',
    padding: '1.8mm 2mm',
    display: 'flex',
    flexDirection: 'column',
  },
  metricValue: { fontSize: '12pt', fontWeight: 900, color: C.black, lineHeight: 1, letterSpacing: '-0.02em' },
  metricLabel: { fontSize: '5.6pt', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: C.black, borderTop: `0.22mm solid ${C.black}`, paddingTop: '0.55mm', marginTop: '0.5mm' },
  metricSub: { fontSize: '5pt', color: C.muted, fontWeight: 500, marginTop: '0.25mm' },

  sectionTitle: {
    fontSize: '7.8pt',
    fontWeight: 900,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: C.black,
    borderBottom: `0.45mm solid ${C.black}`,
    paddingBottom: '0.8mm',
    marginBottom: '2.2mm',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  timelineLine: { position: 'absolute', left: '2.2mm', top: '1.2mm', bottom: '0', width: '0.25mm', background: C.black, opacity: 0.8 },
  expItem: { position: 'relative', paddingLeft: '6.5mm', marginBottom: '2.8mm' },
  dotOuter: { position: 'absolute', left: 0, top: '0.4mm', width: '4.4mm', height: '4.4mm', borderRadius: '50%', background: C.bg, border: `0.35mm solid ${C.black}`, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  dotInner: { width: '1.5mm', height: '1.5mm', borderRadius: '50%', background: C.black },
  expRole: { fontSize: '8.8pt', fontWeight: 900, color: C.black, lineHeight: 1.1 },
  expCompany: { fontSize: '7.4pt', fontWeight: 700, color: C.muted },
  expPeriod: {
    fontSize: '5.6pt',
    fontWeight: 800,
    color: C.black,
    background: C.bg,
    border: `0.25mm solid ${C.black}`,
    padding: '0.4mm 1.4mm',
    borderRadius: '999px',
    fontFamily: "'JetBrains Mono', monospace",
    whiteSpace: 'nowrap',
  },
  bullet: { fontSize: '6.6pt', lineHeight: 1.38, color: C.slate, marginBottom: '0.7mm', paddingLeft: '0.2mm' },

  projectGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.4mm' },
  projectCard: {
    background: C.bg,
    border: `0.25mm solid ${C.black}`,
    borderRadius: '1.2mm',
    padding: '1.8mm 2.2mm',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5mm',
    position: 'relative',
  },
  projectNum: { position: 'absolute', top: '0.8mm', right: '1.6mm', fontSize: '9pt', fontWeight: 900, color: 'rgba(0,0,0,0.1)', lineHeight: 1 },

  // FOOTER (6.5mm)
  footer: {
    height: '6.5mm',
    minHeight: '6.5mm',
    background: C.bg,
    borderTop: `0.45mm solid ${C.black}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 5.5mm',
    color: C.black,
    fontSize: '5.6pt',
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 700,
    flexShrink: 0,
    boxSizing: 'border-box',
  },
};

export default function PrintPortfolio() {
  return (
    <div style={S.page} className="print-portfolio-content">
      {/* HEADER (19mm) */}
      <div style={S.header}>
        <div style={S.headerLeft}>
          <div style={S.logoBox}>
            <MonoVNDK size={34} />
          </div>
          <div>
            <h1 style={S.name}>{INFO.name}</h1>
            <span style={S.role}>{INFO.title}</span>
            <span style={S.sub}>{INFO.subtitle}</span>
          </div>
        </div>
        <div style={S.headerRight}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '6.2pt', fontWeight: 800, letterSpacing: '0.12em', color: C.black }}>
            PORTFOLIO CV • 2026
          </div>
          <div style={{ width: '24mm', height: '0.5mm', background: C.black, marginTop: '1mm' }} />
        </div>
      </div>

      {/* CONTACT BAR (6.5mm) */}
      <div style={S.contactBar} className="contactBar">
        <span style={S.contactPill} className="contactPill">✉ {INFO.email}</span>
        <span style={S.contactPill} className="contactPill">◌ {INFO.phone}</span>
        <span style={S.contactPill} className="contactPill">◎ {INFO.location}</span>
        <span style={S.contactPill} className="contactPill">↗ {INFO.linkedin}</span>
        <span style={S.contactPill} className="contactPill">⬢ {INFO.portfolio}</span>
        <span style={S.contactPill} className="contactPill">💻 {INFO.github}</span>
        <span style={S.contactPillRight} className="contactPillRight">1-PAGE A4 EDITORIAL</span>
      </div>

      {/* BODY */}
      <div style={S.body}>
        {/* LEFT SIDEBAR (67mm) */}
        <aside style={S.sidebar}>
          {/* Skill Matrix */}
          <div>
            <div style={S.sideSectionLabel}><span>▣</span> Skill Matrix</div>
            {SKILL_GROUPS.map((g) => (
              <div key={g.label} style={{ marginBottom: '2.8mm' }}>
                <div style={S.catHead}>
                  <span style={{ fontSize: '6.4pt', lineHeight: 1 }}>{g.icon}</span> {g.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {g.items.map((it) => (
                    <span key={it} style={S.pill}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Open Source & Cloud Infra */}
          <div>
            <div style={S.sideSectionLabel}><span>⌘</span> Open Source &amp; Infra</div>
            {OPEN_SOURCE_INFRA.map((p) => (
              <div key={p.name} style={{ marginBottom: '2.4mm', padding: '1.5mm 1.8mm', background: C.bg, border: `0.25mm solid ${C.black}`, borderRadius: '1mm' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9mm' }}>
                  <span style={{ width: '3.6mm', height: '3.6mm', borderRadius: '0.45mm', background: C.black, color: C.bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '5.2pt', fontWeight: 900, flexShrink: 0 }}>
                    {p.name.charAt(0)}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '6.4pt', fontWeight: 900, color: C.black, lineHeight: 1.1 }}>{p.name}</div>
                    <div style={{ fontSize: '5.5pt', color: C.muted, lineHeight: 1.25, marginTop: '0.3mm' }}>{p.desc}</div>
                    <div style={{ fontSize: '4.9pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.black, marginTop: '0.4mm', borderTop: `0.2mm solid ${C.black}`, paddingTop: '0.4mm', display: 'inline-block' }}>
                      {p.tech}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Education & Language (Moved down to bottom of sidebar) */}
          <div style={{ marginTop: 'auto' }}>
            <div style={S.sideSectionLabel}><span>⬢</span> Education &amp; Profile</div>
            <div style={{ padding: '1.6mm 1.8mm', background: C.bg, border: `0.25mm solid ${C.black}`, borderRadius: '1mm' }}>
              <div style={{ fontSize: '7.6pt', fontWeight: 900, color: C.black }}>{EDUCATION.school}</div>
              <div style={{ fontSize: '6.6pt', fontWeight: 700, color: C.slate, marginTop: '0.25mm' }}>{EDUCATION.degree}</div>
              <div style={{ fontSize: '5.8pt', color: C.muted, marginTop: '0.25mm' }}>{EDUCATION.honors}</div>
              <div style={{ fontSize: '5.3pt', color: C.black, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, marginTop: '0.6mm', borderTop: `0.22mm solid ${C.black}`, paddingTop: '0.45mm' }}>
                {EDUCATION.period} • {EDUCATION.lang}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN COLUMN (143mm) */}
        <main style={S.main}>
          {/* Executive Summary & Metrics */}
          <div>
            <h2 style={S.summaryHead}>
              <span style={S.summaryHeadAccent}>Creative Manager</span> | AI Innovation &amp; Visual Strategy Lead
            </h2>
            <p style={S.summaryBody}>{INFO.summary}</p>
            <div style={S.metricRow}>
              {METRICS.map((m) => (
                <div key={m.label} style={S.metricCard}>
                  <div style={S.metricValue}>{m.value}</div>
                  <div style={S.metricLabel}>{m.label}</div>
                  <div style={S.metricSub}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Leadership & Experience */}
          <div>
            <div style={S.sectionTitle}>
              <span>Creative Leadership &amp; Work Experience</span>
              <span style={{ fontSize: '5.5pt', fontWeight: 800, letterSpacing: '0.06em', color: C.black, background: C.bg, padding: '0.3mm 1.2mm', borderRadius: '999px', border: `0.25mm solid ${C.black}` }}>
                9 YEARS • SEA REGION
              </span>
            </div>
            <div style={{ position: 'relative', paddingLeft: '0.5mm' }}>
              <div style={S.timelineLine} />
              {EXPERIENCES.map((exp) => (
                <div key={exp.role} style={S.expItem}>
                  <div style={S.dotOuter}><div style={S.dotInner} /></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.4mm', marginBottom: '0.4mm' }}>
                    <div>
                      <span style={S.expRole}>{exp.role}</span>
                      <span style={{ fontWeight: 700, color: C.muted, fontSize: '7.4pt' }}> — {exp.company}</span>
                    </div>
                    <span style={S.expPeriod}>{exp.period}</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '2.2mm', listStyle: 'none' }}>
                    {exp.highlights.map((h) => (
                      <li key={h} style={S.bullet}>
                        <span style={{ color: C.black, marginRight: '0.8mm', fontSize: '5.2pt' }}>—</span>{h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Creative Workflows & Campaigns */}
          <div>
            <div style={S.sectionTitle}>
              <span>Featured Creative Systems &amp; Campaigns</span>
              <span style={{ width: '7mm', height: '0.5mm', background: C.black }} />
            </div>
            <div style={S.projectGrid}>
              {FEATURED_PROJECTS.map((p) => (
                <div key={p.n} style={S.projectCard}>
                  <div style={S.projectNum}>{p.n}</div>
                  <div style={{ fontSize: '7pt', fontWeight: 900, color: C.black, lineHeight: 1.15, paddingRight: '4.5mm' }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: '5.9pt', color: C.muted, lineHeight: 1.28 }}>{p.desc}</div>
                  <div style={{ fontSize: '5.1pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.black, marginTop: '0.25mm', borderTop: `0.2mm solid ${C.black}`, paddingTop: '0.35mm', display: 'inline-block' }}>
                    {p.tech}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Certifications Strip (Moved down to bottom of main) */}
          <div style={{ marginTop: 'auto' }}>
            <div style={S.sectionTitle}>
              <span>Honors, Recognition &amp; Certifications</span>
              <span style={{ width: '7mm', height: '0.5mm', background: C.black }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.8mm' }}>
              {HONORS_CERTS.map((item) => (
                <span key={item.label} style={{ background: C.bg, border: `0.25mm solid ${C.black}`, borderRadius: '1mm', padding: '1mm 2mm', fontSize: '6pt', fontWeight: 700, color: C.ink, display: 'inline-flex', alignItems: 'center', gap: '0.9mm' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '5.2pt', color: C.muted }}>{item.year}</span>
                  <strong>{item.label}</strong>
                </span>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER (6.5mm) */}
      <div style={S.footer}>
        <span>{INFO.email} &nbsp;•&nbsp; {INFO.phone} &nbsp;•&nbsp; {INFO.portfolio} &nbsp;•&nbsp; {INFO.github}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '1.5mm', color: C.black, fontWeight: 900 }}>
          <span style={{ width: '2mm', height: '2mm', background: C.black, display: 'inline-block' }} /> {INFO.short} — 1-PAGE CREATIVE CV • 2026
        </span>
      </div>
    </div>
  );
}


