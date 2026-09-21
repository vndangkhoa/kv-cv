import React from 'react';
import { C, S, MonoVNDK } from './printShared';

// ─────────────────────────────────────────────────────────────
// DATA FOR PAGE 2: RECRUITER & HR FOCUSED IT / SYSTEMS CV
// ─────────────────────────────────────────────────────────────
const IT_INFO = {
  name: "Vo Nguyen Dang Khoa",
  short: "KHOA.VO",
  title: "SENIOR FULL-STACK & SYSTEMS ENGINEER",
  subtitle: "Rust Systems Programming  •  Self-Hosted Cloud Infrastructure  •  DevOps  •  Web Engineering",
  synoSource: "syno.vndns.vn",
  vietcRepo: "github.com/vndangkhoa/vietc",
  github: "github.com/vndangkhoa",
  email: "vonguyendangkhoa@gmail.com",
  phone: "0398300340",
  location: "Ho Chi Minh City, VN",
  summary:
    "Systems and software engineer with extensive experience architecting low-level Linux systems software, distributed containerized cloud platforms, and modern full-stack web applications. Architect of the Synology Community Store (syno.vndns.vn)—an automated package distribution platform delivering 7 production applications headlined by flagship manager kv-synology (Next.js 15, React 19) with 1-click DSM 7.2+ installs, automated GnuPG supply chain verification, and zero-loss stateful upgrade lifecycles. Creator of VietC (60+ stars)—a memory-safe, zero-latency Linux input method engine built in pure Rust that eliminated decade-old cursor flickering and autocompletion disruption across Wayland and X11.",
};

const IT_METRICS = [
  { value: "7 Apps", label: "Production Store Packages", sub: "Synology DSM 7.2+ Ecosystem" },
  { value: "99.9%", label: "Private Cloud Availability", sub: "Self-Hosted Container Cluster" },
  { value: "60+ ★", label: "Open Source Adoption", sub: "GitHub Community (vietc)" },
  { value: "<1ms", label: "Input Dispatch Latency", sub: "Zero Pre-Edit Buffer Overhead" },
];

const HR_VALUE_PILLARS = [
  {
    tag: "Full-Cycle Systems Ownership",
    desc: "Direct experience architecting software from Linux kernel input event loops (/dev/uinput, wtype) up to distributed cloud microservices and reactive web frontends.",
  },
  {
    tag: "Production Release Integrity",
    desc: "Implements rigorous supply chain security with automated GnuPG cryptographic verification, Container Manager runtime checks, and zero-loss upgrade lifecycles.",
  },
  {
    tag: "Modern Full-Stack Architecture",
    desc: "Engineered kv-synology as an enterprise control plane with Next.js 15, React 19, and Tailwind v4, implementing a resilient QuickConnect relay resolver and live DSM push alerts.",
  },
];

const IT_SKILL_GROUPS = [
  {
    label: "Systems & Low-Level",
    items: ["Rust 1.85+", "Linux (Arch/Debian)", "Wayland", "X11", "POSIX C", "Bash", "/dev/uinput", "systemd"],
  },
  {
    label: "Backend & Cloud Services",
    items: ["Go (Gin)", "Rust (Axum)", "Python (Flask)", "Docker Multi-Arch", "Nginx", "HLS Streaming", "REST / WS"],
  },
  {
    label: "Full-Stack & Web",
    items: ["React 19", "Next.js 15", "TypeScript", "Tailwind v4", "Kotlin Multiplatform", "Compose", "PWA"],
  },
  {
    label: "Storage & Security",
    items: ["Synology DSM 7.2+", "Btrfs RAID", "GnuPG", "JWT Auth", "Cloudflare DDNS", "PostgreSQL", "SQLite"],
  },
];

const INFRA_TOPOLOGY = [
  {
    title: "Storage & Snapshot Architecture",
    desc: "Btrfs RAID storage pools with immutable snapshot replication, encrypted volume allocation, and automated retention lifecycle policies.",
  },
  {
    title: "Gateway & Routing Infrastructure",
    desc: "Nginx reverse proxy with automated wildcard Let's Encrypt SSL certificate rotation, Hairpin-NAT, and Cloudflare DDNS routing.",
  },
];

const SECONDARY_STORE_APPS = [
  {
    name: "kvdownload",
    tag: "Batch Media Engine",
    desc: "High-throughput video processing API in Rust (Axum) and Go with automated storage allocation and data retention lifecycle policies.",
    tech: "Rust (Axum) • Go • yt-dlp",
  },
  {
    name: "kvnetflix",
    tag: "Streaming Platform",
    desc: "Enterprise video streaming service featuring persistent JWT session authentication across upgrades and Kotlin Android TV client.",
    tech: "Kotlin Multiplatform • Compose",
  },
  {
    name: "kvtube",
    tag: "Video Platform",
    desc: "Self-hosted video streaming architecture with Go (Gin) backend, Next.js frontend, and HLS adaptive bitrate streaming.",
    tech: "Go (Gin) • Next.js • HLS",
  },
  {
    name: "kvmusic",
    tag: "Audio Service",
    desc: "Self-hosted audio streaming service with real-time background playback, queue synchronization, and responsive player UI.",
    tech: "TypeScript • Next.js • Audio APIs",
  },
  {
    name: "kvfile",
    tag: "Storage Management",
    desc: "High-performance file explorer featuring macOS Miller Columns, Windows tree navigation, and native File Station API sync.",
    tech: "TypeScript • React • Synology API",
  },
  {
    name: "kvhome",
    tag: "Operations Launchpad",
    desc: "Unified management dashboard providing live service health monitoring, port resolution, and single-click access across all workloads.",
    tech: "JavaScript • Responsive Web",
  },
];

const SYSTEMS_MILESTONES = [
  {
    period: "2025 — PRES",
    title: "Synology Community Store Distribution Platform",
    bullets: [
      "Engineered an automated SPK packaging pipeline with GnuPG signing, Docker runtime validation, dynamic port allocation (20000–59999), and state persistence across upgrades.",
      "Delivered 7 production containerized applications headlined by flagship DSM management platform kv-synology (Next.js 15, React 19).",
    ],
  },
  {
    period: "2025 — PRES",
    title: "VietC — Native Linux Input Method Engine",
    bullets: [
      "Architected pure Rust 1.85+ Wayland virtual keyboard daemon, eliminating 10+ years of cursor flickering, pre-edit lag, and autocompletion breaks.",
      "Engineered sub-millisecond Unicode dispatch via zwp_virtual_keyboard_v1 and /dev/uinput with hardware-level input event filtering (<10MB RAM).",
    ],
  },
  {
    period: "2024 — 2025",
    title: "High-Throughput Cloud & Streaming Systems",
    bullets: [
      "Architected resilient Go (Gin) & Rust (Axum) media microservices with adaptive HLS video streaming, automated storage tiering, and Btrfs snapshot replication.",
      "Configured automated reverse proxy routing with wildcard SSL certificate rotation, Hairpin-NAT, and Cloudflare DDNS for 99.9% uptime.",
    ],
  },
];

export default function PrintPage2IT() {
  return (
    <div style={S.page} className="cv-page print-portfolio-content">
      {/* HEADER (19mm) */}
      <div style={S.header}>
        <div style={S.headerLeft}>
          <div style={S.logoBox}>
            <MonoVNDK size={34} />
          </div>
          <div>
            <h1 style={S.name}>{IT_INFO.name}</h1>
            <span style={S.role}>{IT_INFO.title}</span>
            <span style={S.sub}>{IT_INFO.subtitle}</span>
          </div>
        </div>
        <div style={S.headerRight}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '6.2pt', fontWeight: 800, letterSpacing: '0.12em', color: C.black }}>
            PORTFOLIO CV • PAGE 2 OF 2
          </div>
          <div style={{ width: '24mm', height: '0.5mm', background: C.black, marginTop: '1mm' }} />
        </div>
      </div>

      {/* CONTACT BAR (6.5mm) - Single Line Guaranteed */}
      <div style={{ ...S.contactBar, height: '6mm', minHeight: '6mm', maxHeight: '6mm', padding: '0 3.5mm', gap: '1mm' }} className="contactBar">
        <span style={S.contactPill} className="contactPill">syno.vndns.vn</span>
        <span style={S.contactPill} className="contactPill">github.com/vndangkhoa/vietc</span>
        <span style={S.contactPill} className="contactPill">github.com/vndangkhoa/kv-synology</span>
        <span style={S.contactPill} className="contactPill">vonguyendangkhoa@gmail.com</span>
        <span style={S.contactPill} className="contactPill">0398300340</span>
        <span style={S.contactPillRight} className="contactPillRight">Ho Chi Minh City, VN</span>
      </div>

      {/* BODY (265mm Available Height) */}
      <div style={{ ...S.body, height: '265.5mm', minHeight: '265.5mm', maxHeight: '265.5mm', overflow: 'hidden' }}>
        {/* LEFT SIDEBAR (67mm) */}
        <aside style={{ ...S.sidebar, padding: '3.5mm 4.2mm', gap: '2.5mm', justifyContent: 'space-between' }}>
          {/* Executive Value Proposition */}
          <div>
            <div style={{ ...S.sideSectionLabel, marginBottom: '1.5mm', paddingBottom: '0.6mm', fontSize: '7.2pt' }}>
              <span>▣</span> Executive Value
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2mm' }}>
              {HR_VALUE_PILLARS.map((p) => (
                <div key={p.tag} style={{ padding: '1.2mm 1.5mm', background: C.bg, border: `0.25mm solid ${C.black}`, borderRadius: '0.8mm' }}>
                  <div style={{ fontSize: '6.3pt', fontWeight: 900, color: C.black, lineHeight: 1.2 }}>
                    {p.tag}
                  </div>
                  <div style={{ fontSize: '5.3pt', color: C.slate, lineHeight: 1.28, marginTop: '0.3mm' }}>
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Capabilities Matrix */}
          <div>
            <div style={{ ...S.sideSectionLabel, marginBottom: '1.5mm', paddingBottom: '0.6mm', fontSize: '7.2pt' }}>
              <span>▣</span> Technical Matrix
            </div>
            {IT_SKILL_GROUPS.map((g) => (
              <div key={g.label} style={{ marginBottom: '1.3mm' }}>
                <div style={{ fontSize: '5.7pt', fontWeight: 800, textTransform: 'uppercase', color: C.black, marginBottom: '0.45mm' }}>
                  {g.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {g.items.map((it) => (
                    <span key={it} style={{ ...S.pill, fontSize: '5.3pt', padding: '0.45mm 1.2mm', marginRight: '0.6mm', marginBottom: '0.6mm' }}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cloud & Storage Topology */}
          <div>
            <div style={{ ...S.sideSectionLabel, marginBottom: '1.5mm', paddingBottom: '0.6mm', fontSize: '7.2pt' }}>
              <span>▣</span> Infrastructure Architecture
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2mm' }}>
              {INFRA_TOPOLOGY.map((t) => (
                <div key={t.title} style={{ padding: '1.2mm 1.5mm', background: C.bg, border: `0.25mm solid ${C.black}`, borderRadius: '0.8mm' }}>
                  <div style={{ fontSize: '6.2pt', fontWeight: 800, color: C.black }}>{t.title}</div>
                  <div style={{ fontSize: '5.3pt', color: C.slate, lineHeight: 1.26, marginTop: '0.25mm' }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Production Endpoints */}
          <div>
            <div style={{ ...S.sideSectionLabel, marginBottom: '1.5mm', paddingBottom: '0.6mm', fontSize: '7.2pt' }}>
              <span>▣</span> Production Endpoints
            </div>
            <div style={{ padding: '1.3mm 1.6mm', background: C.bg, border: `0.28mm solid ${C.black}`, borderRadius: '0.8mm' }}>
              <div style={{ marginBottom: '1mm' }}>
                <div style={{ fontSize: '5.7pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: C.black }}>
                  https://syno.vndns.vn
                </div>
                <div style={{ fontSize: '4.9pt', color: C.muted, marginTop: '0.15mm' }}>Synology Package Center Source</div>
              </div>
              <div style={{ marginBottom: '1mm' }}>
                <div style={{ fontSize: '5.7pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: C.black }}>
                  github.com/vndangkhoa/vietc
                </div>
                <div style={{ fontSize: '4.9pt', color: C.muted, marginTop: '0.15mm' }}>Rust Linux IME (60+ Stars, Wayland/X11)</div>
              </div>
              <div>
                <div style={{ fontSize: '5.7pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: C.black }}>
                  github.com/vndangkhoa/kv-synology
                </div>
                <div style={{ fontSize: '4.9pt', color: C.muted, marginTop: '0.15mm' }}>Next.js 15 + React 19 DSM Control Plane</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN COLUMN (143mm) */}
        <main style={{ ...S.main, padding: '3.5mm 5mm', gap: '2.5mm', justifyContent: 'space-between', overflow: 'hidden' }}>
          {/* Executive Summary & Metrics */}
          <div>
            <h2 style={{ ...S.summaryHead, fontSize: '10.2pt', lineHeight: 1.15 }}>
              <span style={S.summaryHeadAccent}>Senior Systems Engineer</span> | Full-Stack &amp; Cloud Infrastructure Architect
            </h2>
            <p style={{ ...S.summaryBody, fontSize: '6.6pt', lineHeight: 1.36, marginTop: '0.7mm' }}>{IT_INFO.summary}</p>
            <div style={{ ...S.metricRow, marginTop: '1.5mm', gap: '2mm' }}>
              {IT_METRICS.map((m) => (
                <div key={m.label} style={{ ...S.metricCard, padding: '1.3mm 1.7mm' }}>
                  <div style={{ ...S.metricValue, fontSize: '11.6pt' }}>{m.value}</div>
                  <div style={{ ...S.metricLabel, fontSize: '5.4pt', paddingTop: '0.4mm', marginTop: '0.4mm' }}>{m.label}</div>
                  <div style={{ ...S.metricSub, fontSize: '4.9pt' }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SPOTLIGHT 1: Synology Community Store & Monorepo */}
          <div>
            <div style={{ ...S.sectionTitle, marginBottom: '1.4mm', paddingBottom: '0.6mm', fontSize: '7.6pt' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2mm' }}>
                <span>COMMUNITY STORE &amp; CLOUD PLATFORM</span>
                <span style={{ fontSize: '5.2pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, background: C.black, color: '#FFFFFF', padding: '0.2mm 0.9mm', borderRadius: '0.35mm' }}>
                  syno.vndns.vn
                </span>
              </div>
              <span style={{ fontSize: '5.1pt', fontWeight: 800, letterSpacing: '0.04em', color: C.black, background: C.bg, padding: '0.2mm 0.9mm', borderRadius: '999px', border: `0.2mm solid ${C.black}`, whiteSpace: 'nowrap' }}>
                1-CLICK DSM APPS • SPK MONOREPO
              </span>
            </div>

            <div style={{ background: C.bg, border: `0.28mm solid ${C.black}`, borderRadius: '0.9mm', padding: '1.3mm 1.7mm', display: 'flex', flexDirection: 'column', gap: '1.1mm' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '8.0pt', fontWeight: 900, color: C.black, lineHeight: 1.1 }}>
                    Synology Community Store Distribution Platform
                  </div>
                  <div style={{ fontSize: '5.4pt', color: C.muted, marginTop: '0.2mm', fontWeight: 600 }}>
                    Production package repository (/mnt/data/Package Center/spk) serving 64-bit Synology DSM 7.2+ systems with automated cryptographic verification.
                  </div>
                </div>
                <span style={{ fontSize: '5.2pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: C.black, background: C.sidebarBg, border: `0.2mm solid ${C.black}`, padding: '0.3mm 1mm', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                  https://syno.vndns.vn
                </span>
              </div>

              {/* Infrastructure & Release Automation Strip */}
              <div style={{ fontSize: '5.4pt', lineHeight: 1.34, color: C.slate, background: C.sidebarBg, border: `0.18mm solid ${C.border}`, borderRadius: '0.6mm', padding: '0.9mm 1.3mm' }}>
                <strong style={{ color: C.black }}>Infrastructure &amp; Release Automation:</strong> Engineered an automated CI/CD release pipeline with GnuPG cryptographic verification to guarantee supply chain integrity. Features a zero-configuration deployment engine that automates container runtime validation, collision-free dynamic port allocation (20000–59999), and state/secret persistence across version upgrades—guaranteeing seamless updates with zero data loss.
              </div>

              {/* Flagship Hero Card: kv-synology */}
              <div style={{ background: C.bg, border: `0.28mm solid ${C.black}`, borderRadius: '0.8mm', padding: '1.2mm 1.5mm', display: 'flex', flexDirection: 'column', gap: '0.4mm' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
                    <span style={{ fontSize: '7.6pt', fontWeight: 900, color: C.black }}>kv-synology</span>
                    <span style={{ fontSize: '4.7pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, background: C.black, color: '#FFFFFF', padding: '0.2mm 0.9mm', borderRadius: '0.35mm' }}>
                      FLAGSHIP DSM WEB MANAGER
                    </span>
                  </div>
                  <span style={{ fontSize: '4.9pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.muted }}>
                    Next.js 15 • React 19 • TypeScript • Tailwind CSS v4
                  </span>
                </div>
                <div style={{ fontSize: '5.4pt', color: C.slate, lineHeight: 1.28 }}>
                  Architected a modern Synology DSM control plane featuring an intelligent <strong>QuickConnect relay resolver</strong> with automated fallback, real-time daemon controller for core protocols (SMB, NFS, SSH, WebDAV, AFP), live system notification streaming, volume health telemetry, and native 1-click DSM desktop launcher integration.
                </div>
                <div style={{ fontSize: '4.7pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.black, borderTop: `0.15mm solid ${C.border}`, paddingTop: '0.25mm', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Stack: Next.js 15 • React 19 • Tailwind CSS v4 • QuickConnect Protocol • Docker</span>
                  <span style={{ color: C.muted }}>github.com/vndangkhoa/kv-synology</span>
                </div>
              </div>

              {/* Secondary 6 Store Apps Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.1mm' }}>
                {SECONDARY_STORE_APPS.map((app) => (
                  <div key={app.name} style={{ background: C.bg, border: `0.2mm solid ${C.black}`, borderRadius: '0.6mm', padding: '0.9mm 1.2mm', display: 'flex', flexDirection: 'column', gap: '0.25mm' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '6.0pt', fontWeight: 900, color: C.black }}>{app.name}</span>
                      <span style={{ fontSize: '4.5pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.muted }}>{app.tag}</span>
                    </div>
                    <div style={{ fontSize: '5.0pt', color: C.slate, lineHeight: 1.24 }}>{app.desc}</div>
                    <div style={{ fontSize: '4.4pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.black, marginTop: 'auto', borderTop: `0.15mm solid ${C.border}`, paddingTop: '0.2mm' }}>
                      {app.tech}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SPOTLIGHT 2: VietC (Viet+) Linux Input Method Engine */}
          <div>
            <div style={{ ...S.sectionTitle, marginBottom: '1.4mm', paddingBottom: '0.6mm', fontSize: '7.6pt' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2mm' }}>
                <span>SYSTEMS SOFTWARE • VIETC (VIET+)</span>
                <span style={{ fontSize: '5.2pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, background: C.black, color: '#FFFFFF', padding: '0.2mm 0.9mm', borderRadius: '0.35mm' }}>
                  Rust IME
                </span>
              </div>
              <span style={{ fontSize: '5.1pt', fontWeight: 800, letterSpacing: '0.04em', color: C.black, background: C.bg, padding: '0.2mm 0.9mm', borderRadius: '999px', border: `0.2mm solid ${C.black}`, whiteSpace: 'nowrap' }}>
                PURE RUST 1.85+ • WAYLAND &amp; X11
              </span>
            </div>

            <div style={{ background: C.bg, border: `0.28mm solid ${C.black}`, borderRadius: '0.9mm', padding: '1.3mm 1.7mm', display: 'flex', flexDirection: 'column', gap: '1.1mm' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '8.0pt', fontWeight: 900, color: C.black, lineHeight: 1.15 }}>
                    Native High-Performance Linux Input Method Engine
                  </div>
                  <div style={{ fontSize: '5.4pt', color: C.muted, marginTop: '0.2mm', fontWeight: 600 }}>
                    Engineered from scratch in pure Rust to solve fundamental text composition and cursor flickering bugs across Wayland and X11.
                  </div>
                </div>
                <span style={{ fontSize: '5.2pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: C.black, background: C.sidebarBg, border: `0.2mm solid ${C.black}`, padding: '0.3mm 1mm', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                  github.com/vndangkhoa/vietc (60★)
                </span>
              </div>

              {/* Engineering Motivation & Protocol Breakthrough */}
              <div style={{ fontSize: '5.4pt', lineHeight: 1.34, color: C.slate, background: C.sidebarBg, border: `0.18mm solid ${C.border}`, borderRadius: '0.6mm', padding: '0.9mm 1.3mm' }}>
                <strong style={{ color: C.black }}>Engineering Motivation:</strong> Traditional Linux IMEs relied on invasive pre-edit buffers that caused continuous cursor jumping, broke IDE autocompletion (VS Code, Cursor, Neovim), and suffered clipboard race conditions. Engineered a pure Rust solution leveraging Wayland's zwp_virtual_keyboard_v1 protocol and Linux /dev/uinput to inject native UTF-8 Unicode directly with sub-millisecond dispatch and zero clipboard interference.
              </div>

              {/* 3 Engineering Pillars for VietC */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.1mm' }}>
                {/* Pillar 1: Direct Virtual Keyboard */}
                <div style={{ background: C.sidebarBg, border: `0.18mm solid ${C.border}`, borderRadius: '0.6mm', padding: '1mm 1.2mm' }}>
                  <div style={{ fontSize: '6.2pt', fontWeight: 900, color: C.black, lineHeight: 1.15 }}>
                    Direct Wayland Virtual Keyboard
                  </div>
                  <div style={{ fontSize: '5.1pt', color: C.slate, lineHeight: 1.24, marginTop: '0.3mm' }}>
                    Direct Unicode keystroke injection via wtype (zwp_virtual_keyboard_v1) and /dev/uinput. Eliminates pre-edit underline flashing and preserves IDE autocompletion in VS Code and GPU terminals.
                  </div>
                  <div style={{ fontSize: '4.5pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.black, marginTop: '0.3mm', borderTop: `0.15mm solid ${C.black}`, paddingTop: '0.2mm' }}>
                    wtype • /dev/uinput • &lt;1ms Latency
                  </div>
                </div>

                {/* Pillar 2: Intelligent Auto-Restore */}
                <div style={{ background: C.sidebarBg, border: `0.18mm solid ${C.border}`, borderRadius: '0.6mm', padding: '1mm 1.2mm' }}>
                  <div style={{ fontSize: '6.2pt', fontWeight: 900, color: C.black, lineHeight: 1.15 }}>
                    Intelligent Auto-Restore
                  </div>
                  <div style={{ fontSize: '5.1pt', color: C.slate, lineHeight: 1.24, marginTop: '0.3mm' }}>
                    Dual-layer Vietnamese phonological analysis paired with a technical English lexicon automatically preserves programming keywords (search, test, filter) without manual mode toggling.
                  </div>
                  <div style={{ fontSize: '4.5pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.black, marginTop: '0.3mm', borderTop: `0.15mm solid ${C.black}`, paddingTop: '0.2mm' }}>
                    Phonology Engine • Context Awareness
                  </div>
                </div>

                {/* Pillar 3: Hardware Event Filtering */}
                <div style={{ background: C.sidebarBg, border: `0.18mm solid ${C.border}`, borderRadius: '0.6mm', padding: '1mm 1.2mm' }}>
                  <div style={{ fontSize: '6.2pt', fontWeight: 900, color: C.black, lineHeight: 1.15 }}>
                    Hardware Event Filtering
                  </div>
                  <div style={{ fontSize: '5.1pt', color: C.slate, lineHeight: 1.24, marginTop: '0.3mm' }}>
                    Strict device path binding to /dev/input/by-path/*-event-kbd eliminates duplicate keystrokes caused by multi-interface 2.4GHz wireless USB dongles. Consumes &lt;10MB RAM as a rootless daemon.
                  </div>
                  <div style={{ fontSize: '4.5pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.black, marginTop: '0.3mm', borderTop: `0.15mm solid ${C.black}`, paddingTop: '0.2mm' }}>
                    Hardware Binding • &lt;10MB Footprint
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SYSTEMS ENGINEERING & PRODUCTION MILESTONES (VERTICAL TIMELINE) */}
          <div>
            <div style={{ ...S.sectionTitle, marginBottom: '1.5mm', paddingBottom: '0.55mm', fontSize: '7.6pt' }}>
              <span>Systems Engineering &amp; Infrastructure Milestones</span>
              <span style={{ fontSize: '5.2pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: C.black, background: C.bg, padding: '0.2mm 0.9mm', borderRadius: '999px', border: `0.2mm solid ${C.black}` }}>
                2024 — PRESENT
              </span>
            </div>
            
            <div style={{ position: 'relative', paddingLeft: '5.5mm' }}>
              {/* Continuous Vertical Timeline Line */}
              <div style={{ position: 'absolute', left: '1.7mm', top: '1.2mm', bottom: '1.2mm', width: '0.28mm', background: C.black, opacity: 0.8 }} />

              {SYSTEMS_MILESTONES.map((m, idx) => (
                <div key={m.title} style={{ position: 'relative', marginBottom: idx === SYSTEMS_MILESTONES.length - 1 ? 0 : '2mm' }}>
                  {/* Outer & Inner Node Dot */}
                  <div style={{ position: 'absolute', left: '-5.5mm', top: '0.4mm', width: '3.8mm', height: '3.8mm', borderRadius: '50%', background: C.bg, border: `0.3mm solid ${C.black}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '1.4mm', height: '1.4mm', borderRadius: '50%', background: C.black }} />
                  </div>

                  {/* Header: Title + Period */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1.3mm', lineHeight: 1.18 }}>
                    <span style={{ fontSize: '7.0pt', fontWeight: 900, color: C.black }}>
                      {m.title}
                    </span>
                    <span style={{ fontSize: '5.1pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: C.black, background: C.bg, border: `0.2mm solid ${C.black}`, padding: '0.2mm 0.9mm', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                      {m.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  <div style={{ marginTop: '0.5mm' }}>
                    {m.bullets.map((b, i) => (
                      <div key={i} style={{ fontSize: '5.5pt', color: C.slate, lineHeight: 1.32, marginBottom: '0.3mm' }}>
                        — {b}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER (6mm) - Single Line Guaranteed */}
      <div style={{ ...S.footer, height: '6mm', minHeight: '6mm', maxHeight: '6mm', padding: '0 4mm' }}>
        <span style={{ whiteSpace: 'nowrap', fontSize: '5.4pt' }}>
          syno.vndns.vn &nbsp;•&nbsp; github.com/vndangkhoa/vietc &nbsp;•&nbsp; vonguyendangkhoa@gmail.com
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '1.2mm', color: C.black, fontWeight: 900, whiteSpace: 'nowrap', fontSize: '5.4pt' }}>
          <span style={{ width: '1.8mm', height: '1.8mm', background: C.black, display: 'inline-block' }} /> {IT_INFO.short} — PORTFOLIO CV • PAGE 2 OF 2 (SYSTEMS &amp; CLOUD)
        </span>
      </div>
    </div>
  );
}
