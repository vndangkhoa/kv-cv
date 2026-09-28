import React from 'react';
import { C, S, MonoVNDK } from './printShared';

// ─────────────────────────────────────────────────────────────
// DATA FOR PAGE 1: CREATIVE & AI INNOVATION LEAD
// ─────────────────────────────────────────────────────────────
const INFO = {
  name: "Vo Nguyen Dang Khoa",
  short: "KHOA.VO",
  title: "CREATIVE MANAGER & AI INNOVATION LEAD",
  subtitle: "Visual Strategy  •  Generative AI Workflows  •  Art Direction  •  Full-Stack Engineering",
  location: "Ho Chi Minh City, VN",
  phone: "0398300340",
  email: "vonguyendangkhoa@gmail.com",
  linkedin: "linkedin.com/in/khoavo93",
  portfolio: "khoavo.vndns.net",
  github: "github.com/vndangkhoa",
  summary:
    "Multidisciplinary Creative Lead with 9+ years transforming commercial video and brand production through strategic art direction and cutting-edge generative AI pipelines. Spearheaded enterprise design systems for Procter & Gamble across Southeast Asia and architected custom AI production workflows (ComfyUI, FLUX.1 LoRA, Runway Gen-3), slashing campaign turnaround by 60% without compromising commercial craft. Uniquely bridges senior creative direction, brand stewardship, and software engineering to deploy proprietary creative tools and automated production pipelines.",
};

const EDUCATION = {
  period: "2012 — 2016",
  school: "RMIT University Vietnam",
  degree: "Bachelor of Multimedia Design",
  honors: "Best Artistic Graduate Showcase (2016)",
  lang: "English (Full Professional) • Vietnamese (Native)",
};

const METRICS = [
  { value: "9+ Yrs", label: "Creative Direction", sub: "Campaign & Brand Strategy" },
  { value: "+60%", label: "Output Acceleration", sub: "Generative Video Workflows" },
  { value: "6 Markets", label: "Regional Reach", sub: "P&G SEA Hair Care Portfolio" },
  { value: "3× Faster", label: "Turnaround Time", sub: "Rapid Concept to Launch" },
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
    items: ["React / Next.js", "TypeScript", "Go (Gin)", "Rust", "Docker", "DevOps & CI/CD", "Synology DSM", "REST APIs", "Linux"],
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
    desc: "Self-hosted private cloud ecosystem orchestrating micro-apps: kv-synology (DSM manager), kv-download, kv-netflix & kv-tube.",
    tech: "Next.js 15 • Go • Docker • HLS • SPK",
  },
  {
    name: "ComfyUI Node Suite",
    desc: "Custom ComfyUI nodes and automated workflows for e-commerce garment swap and multi-angle product rendering.",
    tech: "Python • PyTorch • CUDA • LoRA",
  },
];

const EXPERIENCES = [
  {
    role: "AI Creative Manager",
    company: "Phibious Vietnam",
    period: "2025 — Present",
    highlights: [
      "Direct commercial visual strategy and generative AI production for Fortune 500 brand campaigns, scaling asset throughput by 60% while maintaining uncompromising brand fidelity.",
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

export default function PrintPage1Creative() {
  return (
    <div style={S.page} className="cv-page print-portfolio-content">
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
            PORTFOLIO CV • PAGE 1 OF 3
          </div>
          <div style={{ width: '24mm', height: '0.5mm', background: C.black, marginTop: '1mm' }} />
        </div>
      </div>

      {/* CONTACT BAR (6mm) - Single Line Guaranteed */}
      <div style={{ ...S.contactBar, height: '6mm', minHeight: '6mm', maxHeight: '6mm', padding: '0 4mm', gap: '1.4mm' }} className="contactBar">
        <span style={S.contactPill} className="contactPill">{INFO.email}</span>
        <span style={S.contactPill} className="contactPill">{INFO.phone}</span>
        <span style={S.contactPill} className="contactPill">{INFO.portfolio}</span>
        <span style={S.contactPill} className="contactPill">{INFO.linkedin}</span>
        <span style={S.contactPill} className="contactPill">{INFO.github}</span>
        <span style={S.contactPillRight} className="contactPillRight">{INFO.location}</span>
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

          {/* Open Source & Cloud Infra Preview */}
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

          {/* Education & Language */}
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
              <span style={S.summaryHeadAccent}>Creative Manager &amp; AI Innovation Lead</span> | Visual Strategy &amp; Creative Ops
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

          {/* Honors & Certifications Strip */}
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
        <span>{INFO.email} &nbsp;•&nbsp; {INFO.phone} &nbsp;•&nbsp; {INFO.portfolio} &nbsp;•&nbsp; {INFO.website} &nbsp;•&nbsp; {INFO.github}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '1.5mm', color: C.black, fontWeight: 900 }}>
          <span style={{ width: '2mm', height: '2mm', background: C.black, display: 'inline-block' }} /> {INFO.short} — 3-PAGE PORTFOLIO CV • PAGE 1 OF 3 (CREATIVE &amp; AI)
        </span>
      </div>
    </div>
  );
}
