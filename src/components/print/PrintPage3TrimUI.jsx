import React from 'react';
import { C, S, MonoVNDK } from './printShared';

// ─────────────────────────────────────────────────────────────
// DATA FOR PAGE 3: EMBEDDED SYSTEMS & HANDHELD OS ARCHITECT
// ─────────────────────────────────────────────────────────────
const TRIMUI_INFO = {
  name: "Vo Nguyen Dang Khoa",
  short: "KHOA.VO",
  title: "EMBEDDED SYSTEMS & HANDHELD OS ARCHITECT",
  subtitle: "Linux Kernel Subsystems  •  Bare Framebuffer Rendering  •  Rust Musl  •  Hardware Acceleration",
  repo: "github.com/vndangkhoa/kv-trimui",
  store: "trimui.vndns.net",
  github: "github.com/vndangkhoa",
  email: "vonguyendangkhoa@gmail.com",
  phone: "0398300340",
  location: "Ho Chi Minh City, VN",
  summary:
    "Systems architect and low-level software engineer specializing in embedded Linux firmware, zero-overhead display pipelines, and resource-constrained aarch64 architectures. Creator of KV-TrimUI (github.com/vndangkhoa/kv-trimui)—a production-grade native operating ecosystem for Allwinner A133 handheld consoles (TrimUI Smart Pro / Brick). Engineered a dual-engine architecture combining a pure 100% Rust memory-mapped framebuffer engine (/dev/fb0, <900KB RAM) with static Musl micro-daemons (<15MB RAM), delivering 60 FPS hardware-accelerated video decoding (MPV), bit-perfect ALSA lossless audio, and an autonomous OTA software distribution network (trimui.vndns.net).",
};

const TRIMUI_METRICS = [
  { value: "9 Apps", label: "Native Handheld Suite", sub: "YouTube, Tidal, Netflix, AI, Radio" },
  { value: "60 FPS", label: "Direct Framebuffer Blit", sub: "/dev/fb0 mmap • Zero X11/Wayland" },
  { value: "< 1 MB", label: "Pure Rust Footprint", sub: "kv-radio Embedded Memory Profile" },
  { value: "720p 60f", label: "Hardware Accelerated", sub: "Cedar Video Engine + Direct ALSA" },
];

const EMBEDDED_SKILL_GROUPS = [
  {
    label: "Embedded Linux & Kernel",
    items: ["Allwinner A133 (aarch64)", "Linux Framebuffer (/dev/fb0)", "Evdev Subsystem", "ALSA Direct PCM (hw:0,0)", "POSIX Signals", "Cedar HWDEC"],
  },
  {
    label: "Systems & Compilers",
    items: ["Rust 1.85+ (Musl)", "aarch64 Cross-Compile", "Static Binaries", "C / C99", "Bash IPC", "Double-Buffering"],
  },
  {
    label: "Handheld Runtime",
    items: ["Next.js 15 Static", "TinyHTTP", "Axum Daemons", "InnerTube API", "MPV Interop", "On-Screen Keyboard (OSK)"],
  },
  {
    label: "Distribution & Network",
    items: ["Wi-Fi OTA Updates", "MicroSD Packaging", "SQLite Manifests", "trimui.vndns.net", "REST Catalog API"],
  },
];

const ARCH_PILLARS = [
  {
    title: "Bare-Metal Display & Input Loops",
    desc: "Bypassed missing display servers on stock Linux by memory-mapping /dev/fb0 with double-buffered BGRA rasterization, and handling low-level Linux Evdev controller inputs (/dev/input/event*) with repeat acceleration.",
  },
  {
    title: "Musl Toolchains & Static Portability",
    desc: "Overcame legacy host GLIBC 2.28 barriers by engineering an automated cross-compilation pipeline targeting aarch64-unknown-linux-musl, deploying zero-dependency static binaries directly onto raw firmware.",
  },
  {
    title: "Multimedia & Hardware Optimization",
    desc: "Integrated native MPV video pipes with GPU-assisted Cedar hardware decoding and direct ALSA PCM (hw:0,0) audio streaming, guaranteeing zero frame-drops and avoiding Android/stock OS audio resampling.",
  },
];

const HANDHELD_APPS = [
  {
    name: "kv-launcher",
    tag: "PS5-STYLE SHELL",
    desc: "60 FPS home launcher with real-time battery/Wi-Fi telemetry, ROM suggestions, and bilingual toggle.",
    tech: "Next.js 15 • Rust Musl • Port 4540",
  },
  {
    name: "kv-tube",
    tag: "YOUTUBE CLIENT",
    desc: "Ad-free streaming with InnerTube extraction, search auto-suggest, and 720p 60fps MPV acceleration.",
    tech: "Next.js 15 • MPV HWDEC • YouTube.js",
  },
  {
    name: "kv-tidal",
    tag: "HI-FI AUDIOPHILE",
    desc: "Bit-perfect lossless streamer supporting Tidal catalog, Apple Music Top 50, and Synology NAS Vault.",
    tech: "Rust Daemon • Direct ALSA hw:0,0",
  },
  {
    name: "kv-netflix",
    tag: "HANDHELD CINEMA",
    desc: "On-demand movie client with remote catalog scraping, 6-digit TV/phone pairing, and bilingual subtitles.",
    tech: "HLS Streamer • Rust Musl • MPV",
  },
  {
    name: "kv-ai",
    tag: "VOICE AI COMPANION",
    desc: "Gemini 2.5 & ChatGPT assistant with hardware Push-to-Talk voice, smartphone QR login, and D-Pad OSK.",
    tech: "Push-to-Talk • Axum • WebSocket",
  },
  {
    name: "kv-file",
    tag: "PACKAGE INSTALLER",
    desc: "Dual-pane handheld file manager, ZIP installer, and on-device client for the official OTA App Store.",
    tech: "Next.js 15 • MicroSD Manager",
  },
];

const TRIMUI_MILESTONES = [
  {
    role: "System Architect & Lead Engineer",
    entity: "KV-TrimUI Handheld Operating Platform",
    period: "2026 — PRESENT",
    bullets: [
      "Engineered the complete software suite for Allwinner A133 handhelds, replacing clunky emulators with a modern, ad-free connected media and tools suite.",
      "Built kv-radio in 100% pure Rust, implementing custom TrueType font rasterization, dirty-rectangle blitting, and streaming internet radio at <900KB RAM.",
      "Developed Push-to-Talk AI voice companion (kv-ai) with Gemini 2.5 & ChatGPT streaming, on-screen D-Pad virtual keyboard, and QR quick pairing.",
      "Architected the official OTA App Store & Distribution server (trimui.vndns.net) delivering one-tap Wi-Fi updates and package synchronization.",
    ],
  },
  {
    role: "Core Engine Developer",
    entity: "Unified Handheld Input & Multimedia Engine",
    period: "2026",
    bullets: [
      "Created @kv-trimui/shared-gamepad layer mapping evdev joystick and button interrupts to standard gamepad events with sub-millisecond dispatch.",
      "Routed Tidal Hi-Fi and Apple Music streams directly through ALSA PCM without lossy downsampling, achieving true audiophile bit-perfect output.",
    ],
  },
];

export default function PrintPage3TrimUI({ pageNum = 2, totalPages = 2 }) {
  return (
    <div style={S.page} className="cv-page print-portfolio-content">
      {/* HEADER (19mm) */}
      <div style={S.header}>
        <div style={S.headerLeft}>
          <div style={S.logoBox}>
            <MonoVNDK size={34} />
          </div>
          <div>
            <h1 style={S.name}>{TRIMUI_INFO.name}</h1>
            <span style={S.role}>{TRIMUI_INFO.title}</span>
            <span style={S.sub}>{TRIMUI_INFO.subtitle}</span>
          </div>
        </div>
        <div style={S.headerRight}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '6.2pt', fontWeight: 800, letterSpacing: '0.12em', color: C.black }}>
            SYSTEMS CV • PAGE {pageNum} OF {totalPages}
          </div>
          <div style={{ width: '24mm', height: '0.5mm', background: C.black, marginTop: '1mm' }} />
        </div>
      </div>

      {/* CONTACT BAR (6.5mm) - Single Line Guaranteed */}
      <div style={{ ...S.contactBar, height: '6mm', minHeight: '6mm', maxHeight: '6mm', padding: '0 3.5mm', gap: '1mm' }} className="contactBar">
        <span style={S.contactPill} className="contactPill">trimui.vndns.net</span>
        <span style={S.contactPill} className="contactPill">github.com/vndangkhoa/kv-trimui</span>
        <span style={S.contactPill} className="contactPill">vonguyendangkhoa@gmail.com</span>
        <span style={S.contactPill} className="contactPill">0398300340</span>
        <span style={S.contactPillRight} className="contactPillRight">Ho Chi Minh City, VN</span>
      </div>

      {/* BODY (265.5mm Available Height) */}
      <div style={{ ...S.body, height: '265.5mm', minHeight: '265.5mm', maxHeight: '265.5mm', overflow: 'hidden' }}>
        {/* SIDEBAR (67mm) */}
        <aside style={{ ...S.sidebar, padding: '3.5mm 4.2mm', gap: '2.5mm', justifyContent: 'space-between' }}>
          {/* Technical Capabilities Matrix */}
          <div>
            <div style={{ ...S.sideSectionLabel, marginBottom: '1.5mm', paddingBottom: '0.6mm', fontSize: '7.2pt' }}>
              <span>▣</span> Embedded Matrix
            </div>
            {EMBEDDED_SKILL_GROUPS.map((g) => (
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

          {/* Subsystem Architecture Pillars */}
          <div>
            <div style={{ ...S.sideSectionLabel, marginBottom: '1.5mm', paddingBottom: '0.6mm', fontSize: '7.2pt' }}>
              <span>▣</span> Subsystem Architecture
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2mm' }}>
              {ARCH_PILLARS.map((p) => (
                <div key={p.title} style={{ padding: '1.2mm 1.5mm', background: C.bg, border: `0.25mm solid ${C.black}`, borderRadius: '0.8mm' }}>
                  <div style={{ fontSize: '6.2pt', fontWeight: 800, color: C.black }}>{p.title}</div>
                  <div style={{ fontSize: '5.3pt', color: C.slate, lineHeight: 1.26, marginTop: '0.25mm' }}>{p.desc}</div>
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
                  https://trimui.vndns.net
                </div>
                <div style={{ fontSize: '4.9pt', color: C.muted, marginTop: '0.15mm' }}>Official OTA Handheld App Store Portal</div>
              </div>
              <div style={{ marginBottom: '1mm' }}>
                <div style={{ fontSize: '5.7pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: C.black }}>
                  github.com/vndangkhoa/kv-trimui
                </div>
                <div style={{ fontSize: '4.9pt', color: C.muted, marginTop: '0.15mm' }}>Complete Monorepo &amp; Musl Daemons</div>
              </div>
              <div>
                <div style={{ fontSize: '5.7pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: C.black }}>
                  trimui.vndns.net/llms-full.txt
                </div>
                <div style={{ fontSize: '4.9pt', color: C.muted, marginTop: '0.15mm' }}>Machine-Readable Framebuffer Specs</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN COLUMN (143mm) */}
        <main style={{ ...S.main, padding: '3.5mm 5mm', gap: '2.5mm', justifyContent: 'space-between', overflow: 'hidden' }}>
          {/* Executive Summary & Metrics */}
          <div>
            <h2 style={{ ...S.summaryHead, fontSize: '10.2pt', lineHeight: 1.15 }}>
              <span style={S.summaryHeadAccent}>Embedded Systems Architect</span> | Handheld Linux &amp; Rust Engine Lead
            </h2>
            <p style={{ ...S.summaryBody, fontSize: '6.6pt', lineHeight: 1.36, marginTop: '0.7mm' }}>{TRIMUI_INFO.summary}</p>
            <div style={{ ...S.metricRow, marginTop: '1.5mm', gap: '2mm' }}>
              {TRIMUI_METRICS.map((m) => (
                <div key={m.label} style={{ ...S.metricCard, padding: '1.3mm 1.7mm' }}>
                  <div style={{ ...S.metricValue, fontSize: '11.6pt' }}>{m.value}</div>
                  <div style={{ ...S.metricLabel, fontSize: '5.4pt', paddingTop: '0.4mm', marginTop: '0.4mm' }}>{m.label}</div>
                  <div style={{ ...S.metricSub, fontSize: '4.9pt' }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SPOTLIGHT 1: KV-TrimUI Operating Platform & App Suite */}
          <div>
            <div style={{ ...S.sectionTitle, marginBottom: '1.4mm', paddingBottom: '0.6mm', fontSize: '7.6pt' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2mm' }}>
                <span>HANDHELD CONSOLE SUITE &amp; OTA ECOSYSTEM</span>
                <span style={{ fontSize: '5.2pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, background: C.black, color: '#FFFFFF', padding: '0.2mm 0.9mm', borderRadius: '0.35mm' }}>
                  trimui.vndns.net
                </span>
              </div>
              <span style={{ fontSize: '5.1pt', fontWeight: 800, letterSpacing: '0.04em', color: C.black, background: C.bg, padding: '0.2mm 0.9mm', borderRadius: '999px', border: `0.2mm solid ${C.black}`, whiteSpace: 'nowrap' }}>
                9 PRODUCTION APPS • ALLWINNER A133
              </span>
            </div>

            <div style={{ background: C.bg, border: `0.28mm solid ${C.black}`, borderRadius: '0.9mm', padding: '1.3mm 1.7mm', display: 'flex', flexDirection: 'column', gap: '1.1mm' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '8.0pt', fontWeight: 900, color: C.black, lineHeight: 1.1 }}>
                    KV-TrimUI Handheld Native Operating Ecosystem
                  </div>
                  <div style={{ fontSize: '5.4pt', color: C.muted, marginTop: '0.2mm', fontWeight: 600 }}>
                    Embedded aarch64 Linux software suite powering TrimUI Smart Pro and Brick consoles with zero-copy display output.
                  </div>
                </div>
                <span style={{ fontSize: '5.2pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: C.black, background: C.sidebarBg, border: `0.2mm solid ${C.black}`, padding: '0.3mm 1mm', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                  https://trimui.vndns.net
                </span>
              </div>

              {/* Engineering Invariants Strip */}
              <div style={{ fontSize: '5.4pt', lineHeight: 1.34, color: C.slate, background: C.sidebarBg, border: `0.18mm solid ${C.border}`, borderRadius: '0.6mm', padding: '0.9mm 1.3mm' }}>
                <strong style={{ color: C.black }}>Engineering Invariants:</strong> Zero X11/Wayland dependencies. Direct memory-mapped framebuffer rendering (/dev/fb0, 1280×720 @ 60Hz 32bpp) with sub-millisecond input response via Linux Evdev. All native binaries statically compiled with Musl libc to eliminate GLIBC version mismatches across stock OS revisions.
              </div>

              {/* Flagship Hero Card: kv-radio */}
              <div style={{ background: C.bg, border: `0.28mm solid ${C.black}`, borderRadius: '0.8mm', padding: '1.2mm 1.5mm', display: 'flex', flexDirection: 'column', gap: '0.4mm' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
                    <span style={{ fontSize: '7.6pt', fontWeight: 900, color: C.black }}>kv-radio</span>
                    <span style={{ fontSize: '4.7pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, background: C.black, color: '#FFFFFF', padding: '0.2mm 0.9mm', borderRadius: '0.35mm' }}>
                      PURE RUST 60 FPS FRAMEBUFFER
                    </span>
                  </div>
                  <span style={{ fontSize: '4.9pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.muted }}>
                    100% Rust • /dev/fb0 mmap • Direct ALSA • &lt; 900 KB RAM
                  </span>
                </div>
                <div style={{ fontSize: '5.4pt', color: C.slate, lineHeight: 1.28 }}>
                  Engineered a standalone embedded internet radio station player directly rendering to the Linux framebuffer. Implemented double-buffered page flipping, custom TrueType glyph rasterization, dirty-rectangle blitting, and streaming audio decode through direct ALSA PCM—consuming less than 900KB of system memory.
                </div>
                <div style={{ fontSize: '4.7pt', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: C.black, borderTop: `0.15mm solid ${C.border}`, paddingTop: '0.25mm', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Stack: Rust 1.85 • Linux Evdev • ALSA Direct • TrueType Rasterizer</span>
                  <span style={{ color: C.muted }}>github.com/vndangkhoa/kv-trimui</span>
                </div>
              </div>

              {/* Secondary 6 Store Apps Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.1mm' }}>
                {HANDHELD_APPS.map((app) => (
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

          {/* Milestones & Timeline */}
          <div>
            <div style={{ ...S.sectionTitle, marginBottom: '1.4mm', paddingBottom: '0.6mm', fontSize: '7.6pt' }}>
              <span>SYSTEMS &amp; FIRMWARE MILESTONES</span>
              <span style={{ fontSize: '5.2pt', fontWeight: 800 }}>2026 ROADMAP</span>
            </div>

            <div style={{ position: 'relative', paddingLeft: '1mm' }}>
              <div style={S.timelineLine} />
              {TRIMUI_MILESTONES.map((m) => (
                <div key={m.entity} style={{ ...S.expItem, marginBottom: '1.8mm' }}>
                  <div style={S.dotOuter}><div style={S.dotInner} /></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2mm' }}>
                    <span style={{ ...S.expRole, fontSize: '7.8pt' }}>{m.role}</span>
                    <span style={{ ...S.expPeriod, fontSize: '5.2pt', padding: '0.3mm 1.2mm' }}>{m.period}</span>
                  </div>
                  <div style={{ ...S.expCompany, fontSize: '6.6pt', marginBottom: '0.5mm' }}>{m.entity}</div>
                  <div>
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
          git.khoavo.myds.me/vndangkhoa/kv-trimui &nbsp;•&nbsp; github.com/vndangkhoa &nbsp;•&nbsp; vonguyendangkhoa@gmail.com
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '1.2mm', color: C.black, fontWeight: 900, whiteSpace: 'nowrap', fontSize: '5.4pt' }}>
          <span style={{ width: '1.8mm', height: '1.8mm', background: C.black, display: 'inline-block' }} /> {TRIMUI_INFO.short} — SYSTEMS &amp; EMBEDDED OS ARCHITECT • PAGE {pageNum}
        </span>
      </div>
    </div>
  );
}
