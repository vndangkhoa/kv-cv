import React from 'react';
import { PAGE1_CREATIVE, PAGE2_IT, PAGE3_TRIMUI } from './printData';

// ─────────────────────────────────────────────────────────────────────────────
// VERSION 2: ZURICH / VIGNELLI MODULAR SWISS GRID
// Gallery Alabaster (#F8FAFC) + International Klein Cobalt (#0F256E / #1B4DFF)
// Topology: Full-Bleed Cobalt Masthead + Horizontal Band Ledger (34mm Index Rail + 160mm Spec Grid)
// Zero vertical sidebar, zero rounded corners, exposed mathematical grid coordinates
// ─────────────────────────────────────────────────────────────────────────────

const V2 = {
  paper: '#F8FAFC',
  cell: '#FFFFFF',
  cellTint: '#F1F5F9',
  cobaltDeep: '#0D2167',
  cobalt: '#1B4DFF',
  cobaltSoft: '#E0E7FF',
  ink: '#0B132B',
  body: '#2B354F',
  muted: '#5B6785',
  gridLine: '#CBD5E1',
  gridStrong: '#0B132B',
  sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'IBM Plex Mono', 'JetBrains Mono', monospace",
};

const SwissMark = ({ size = 26 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke="#FFFFFF" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M 14 20 L 29 41 L 44 20" />
    <path d="M 56 41 L 56 20 L 86 41 L 86 20" />
    <path d="M 14 59 L 28 59 C 41 59 41 80 28 80 L 14 80 Z" />
    <path d="M 56 59 L 56 80 M 86 59 L 56 69.5 L 86 80" />
  </svg>
);

const pageBase = {
  '--cv-page-bg': V2.paper,
  width: '210mm',
  height: '297mm',
  minHeight: '297mm',
  maxHeight: '297mm',
  background: V2.paper,
  color: V2.ink,
  fontFamily: V2.sans,
  boxSizing: 'border-box',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
};

const bandsContainer = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
};

function SwissMasthead({ docCode, name, title, subtitle, metaLeft, metaRight }) {
  return (
    <header style={{ background: V2.cobaltDeep, color: '#FFFFFF', padding: '5.5mm 8mm 4.5mm', borderBottom: `0.5mm solid ${V2.ink}`, flexShrink: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '6mm', alignItems: 'start' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '3.8mm' }}>
          <div style={{ width: '11.5mm', height: '11.5mm', border: '0.35mm solid rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.4mm' }}>
            <SwissMark size={26} />
          </div>
          <div>
            <div style={{ fontFamily: V2.mono, fontSize: '5.2pt', letterSpacing: '0.16em', color: '#93C5FD', fontWeight: 600, textTransform: 'uppercase' }}>
              {docCode}
            </div>
            <h1 style={{ fontSize: '19pt', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: '0.6mm 0 0', color: '#FFFFFF', textTransform: 'uppercase' }}>
              {name}
            </h1>
            <div style={{ fontSize: '7.4pt', fontWeight: 700, letterSpacing: '0.1em', color: '#DBEAFE', marginTop: '1mm', textTransform: 'uppercase' }}>
              {title}
            </div>
          </div>
        </div>

        {/* Mathematical Coordinate Contact Table */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '0.7mm 4.5mm', fontFamily: V2.mono, fontSize: '5.3pt', lineHeight: 1.35, borderLeft: '0.25mm solid rgba(255,255,255,0.28)', paddingLeft: '4mm', fontVariantNumeric: 'tabular-nums' }}>
          {metaLeft.map((item, idx) => (
            <React.Fragment key={idx}>
              <div style={{ color: '#93C5FD', fontWeight: 500 }}>{item}</div>
              <div style={{ color: '#FFFFFF', fontWeight: 600, textAlign: 'right' }}>{metaRight[idx] || ''}</div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom Subtitle Strip inside Masthead */}
      <div style={{ marginTop: '3mm', paddingTop: '1.8mm', borderTop: '0.2mm solid rgba(255,255,255,0.22)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: V2.mono, fontSize: '5.2pt', color: '#BFDBFE', letterSpacing: '0.04em' }}>
        <span>{subtitle}</span>
        <span style={{ color: '#FFFFFF', fontWeight: 600 }}>GRID SYSTEM // ISO-216 A4</span>
      </div>
    </header>
  );
}

function SwissBand({ index, label, sublabel, children, noBorderBottom = false, bg = 'transparent', grow = true }) {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '33mm 1fr',
        borderBottom: noBorderBottom ? 'none' : `0.25mm solid ${V2.gridStrong}`,
        background: bg,
        flex: grow ? '1 1 auto' : '0 0 auto',
      }}
    >
      {/* Left 33mm Index Rail */}
      <div style={{ padding: '3.2mm 3mm 3.2mm 8mm', borderRight: `0.25mm solid ${V2.gridLine}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: V2.mono, fontSize: '7.5pt', fontWeight: 700, color: V2.cobalt, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            /{index}
          </div>
          <h2 style={{ fontSize: '6.8pt', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', color: V2.ink, margin: '1mm 0 0', lineHeight: 1.15 }}>
            {label}
          </h2>
          {sublabel && (
            <div style={{ fontFamily: V2.mono, fontSize: '4.9pt', color: V2.muted, marginTop: '0.8mm', lineHeight: 1.25 }}>
              {sublabel}
            </div>
          )}
        </div>
        <div style={{ width: '4mm', height: '0.45mm', background: V2.cobalt, marginTop: '1.5mm' }} />
      </div>

      {/* Right 177mm Specification Content Area */}
      <div style={{ padding: '3.2mm 8mm 3.2mm 4.5mm', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {children}
      </div>
    </section>
  );
}

function SwissFooter({ leftCode, rightCode }) {
  return (
    <footer style={{ height: '6.2mm', minHeight: '6.2mm', background: V2.ink, color: '#FFFFFF', padding: '0 8mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: V2.mono, fontSize: '5.2pt', letterSpacing: '0.05em', fontVariantNumeric: 'tabular-nums' }}>
      <span>{leftCode}</span>
      <span style={{ color: '#93C5FD', fontWeight: 600 }}>{rightCode}</span>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 1: CREATIVE & AI INNOVATION LEAD (V2 SWISS GRID)
// ─────────────────────────────────────────────────────────────────────────────
export function V2Page1Creative({ pageNum = 1, totalPages = 1 }) {
  const { info, education, metrics, skillGroups, openSourceInfra, experiences, featuredProjects, honorsCerts } = PAGE1_CREATIVE;

  return (
    <div style={pageBase} className="cv-page print-portfolio-content">
      <SwissMasthead
        docCode={`SPEC-01 // CREATIVE & AI DIRECTION // P.0${pageNum}-0${totalPages}`}
        name={info.name}
        title={info.title}
        subtitle={info.subtitle}
        metaLeft={[info.email, info.portfolio, info.github, info.linkedin]}
        metaRight={[info.phone, info.location, 'RMIT HONORS', 'OPEN TO WORK']}
      />

      <div style={bandsContainer}>
        {/* BAND 01: EXECUTIVE THESIS & METRICS MATRIX */}
        <SwissBand index="01" label="Executive Thesis" sublabel=" Benchmark & Scope" bg={V2.cell}>
          <p style={{ fontSize: '6.6pt', lineHeight: 1.4, color: V2.body, margin: '0 0 2.4mm', fontWeight: 500 }}>
            {info.summary}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: `0.22mm solid ${V2.gridStrong}`, background: V2.paper }}>
            {metrics.map((m, i) => (
              <div key={m.label} style={{ padding: '1.6mm 2.2mm', borderRight: i < 3 ? `0.2mm solid ${V2.gridLine}` : 'none' }}>
                <div style={{ fontFamily: V2.sans, fontSize: '12.5pt', fontWeight: 900, color: V2.cobalt, lineHeight: 1, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '5.5pt', fontWeight: 800, textTransform: 'uppercase', color: V2.ink, marginTop: '0.6mm', letterSpacing: '0.04em' }}>
                  {m.label}
                </div>
                <div style={{ fontFamily: V2.mono, fontSize: '4.8pt', color: V2.muted, marginTop: '0.2mm' }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </SwissBand>

        {/* BAND 02: CHRONOLOGICAL LEADERSHIP RECORD */}
        <SwissBand index="02" label="Career Ledger" sublabel="9+ Yrs SEA Leadership">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2mm' }}>
            {experiences.map((exp, idx) => (
              <div
                key={exp.role}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '34mm 1fr',
                  gap: '3.5mm',
                  paddingBottom: idx < experiences.length - 1 ? '2mm' : 0,
                  borderBottom: idx < experiences.length - 1 ? `0.18mm solid ${V2.gridLine}` : 'none',
                }}
              >
                <div>
                  <div style={{ fontFamily: V2.mono, fontSize: '5.3pt', fontWeight: 700, color: V2.cobalt, fontVariantNumeric: 'tabular-nums' }}>
                    {exp.period}
                  </div>
                  <div style={{ fontSize: '7.4pt', fontWeight: 900, color: V2.ink, lineHeight: 1.12, marginTop: '0.3mm' }}>
                    {exp.role}
                  </div>
                  <div style={{ fontSize: '6pt', fontWeight: 700, color: V2.muted, marginTop: '0.2mm' }}>
                    {exp.company}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55mm' }}>
                  {exp.highlights.map((h) => (
                    <div key={h} style={{ fontSize: '6.1pt', lineHeight: 1.36, color: V2.body, paddingLeft: '2.4mm', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: V2.cobalt, fontFamily: V2.mono, fontWeight: 700 }}>+</span>
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SwissBand>

        {/* BAND 03: SELECTED CAMPAIGN & PRODUCTION ARCHITECTURE */}
        <SwissBand index="03" label="Production Systems" sublabel="Case Index 01—04" bg={V2.cell}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: `0.2mm solid ${V2.gridLine}` }}>
            {featuredProjects.map((p, i) => (
              <div
                key={p.n}
                style={{
                  padding: '1.8mm 2.4mm',
                  borderRight: i % 2 === 0 ? `0.2mm solid ${V2.gridLine}` : 'none',
                  borderBottom: i < 2 ? `0.2mm solid ${V2.gridLine}` : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '6.8pt', fontWeight: 900, color: V2.ink }}>{p.title}</span>
                  <span style={{ fontFamily: V2.mono, fontSize: '5.4pt', fontWeight: 700, color: V2.cobalt }}>[{p.n}]</span>
                </div>
                <div style={{ fontSize: '5.6pt', lineHeight: 1.3, color: V2.body, marginTop: '0.4mm' }}>{p.desc}</div>
                <div style={{ fontFamily: V2.mono, fontSize: '4.8pt', fontWeight: 600, color: V2.muted, marginTop: '0.5mm' }}>
                  {p.tech}
                </div>
              </div>
            ))}
          </div>
        </SwissBand>

        {/* BAND 04: 4-COLUMN TECHNICAL & CREATIVE CAPABILITIES TABLE */}
        <SwissBand index="04" label="Capability Matrix" sublabel="4 Domain Clusters">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3mm' }}>
            {skillGroups.map((g, i) => (
              <div key={g.label} style={{ borderLeft: i > 0 ? `0.18mm solid ${V2.gridLine}` : 'none', paddingLeft: i > 0 ? '2.4mm' : 0 }}>
                <div style={{ fontFamily: V2.mono, fontSize: '5.3pt', fontWeight: 700, color: V2.cobalt, textTransform: 'uppercase', marginBottom: '0.8mm' }}>
                  0{i + 1} // {g.label}
                </div>
                <div style={{ fontSize: '5.4pt', lineHeight: 1.38, color: V2.body, fontWeight: 500 }}>
                  {g.items.join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </SwissBand>

        {/* BAND 05: OPEN SOURCE INFRA, EDUCATION & HONORS */}
        <SwissBand index="05" label="Infra & Credentials" sublabel="OSS · RMIT · Awards" noBorderBottom bg={V2.cell}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '4mm' }}>
            {/* Open Source 3 items */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2mm' }}>
              {openSourceInfra.map((p) => (
                <div key={p.name} style={{ background: V2.paper, padding: '1.4mm 1.8mm', borderTop: `0.35mm solid ${V2.cobalt}` }}>
                  <div style={{ fontSize: '6pt', fontWeight: 900, color: V2.ink }}>{p.name}</div>
                  <div style={{ fontSize: '5pt', lineHeight: 1.25, color: V2.body, marginTop: '0.3mm' }}>{p.desc}</div>
                  <div style={{ fontFamily: V2.mono, fontSize: '4.5pt', color: V2.cobalt, fontWeight: 600, marginTop: '0.4mm' }}>{p.tech}</div>
                </div>
              ))}
            </div>

            {/* Education + Honors compact ledger */}
            <div style={{ borderLeft: `0.2mm solid ${V2.gridLine}`, paddingLeft: '3mm', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '6.6pt', fontWeight: 900, color: V2.ink }}>{education.school}</span>
                  <span style={{ fontFamily: V2.mono, fontSize: '5pt', color: V2.cobalt, fontWeight: 700 }}>{education.period}</span>
                </div>
                <div style={{ fontSize: '5.5pt', fontWeight: 700, color: V2.body }}>{education.degree} — {education.honors}</div>
              </div>
              <div style={{ borderTop: `0.18mm solid ${V2.gridLine}`, paddingTop: '1mm', marginTop: '1mm' }}>
                {honorsCerts.map((h) => (
                  <div key={h.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '5.2pt', lineHeight: 1.32, color: V2.body }}>
                    <span style={{ fontWeight: 700, color: V2.ink }}>{h.label}</span>
                    <span style={{ fontFamily: V2.mono, color: V2.cobalt, fontWeight: 600 }}>{h.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SwissBand>
      </div>

      <SwissFooter
        leftCode={`${info.email}  //  ${info.phone}  //  ${info.portfolio}`}
        rightCode={`KHOA.VO — CREATIVE & AI INNOVATION LEAD — PAGE 0${pageNum}/0${totalPages}`}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 2: SECURITY CONSULTANT & SYSTEMS ARCHITECT (V2 SWISS GRID)
// ─────────────────────────────────────────────────────────────────────────────
export function V2Page2IT({ pageNum = 1, totalPages = 2 }) {
  const { info, metrics, valuePillars, skillGroups, infraTopology, endpoints, secondaryStoreApps, vietcPillars, milestones } = PAGE2_IT;

  return (
    <div style={pageBase} className="cv-page print-portfolio-content">
      <SwissMasthead
        docCode={`SPEC-02 // SECURITY & SYSTEMS ARCHITECTURE // P.0${pageNum}-0${totalPages}`}
        name={info.name}
        title={info.title}
        subtitle={info.subtitle}
        metaLeft={[info.synoSource, info.vietcRepo, info.synoRepo, info.email]}
        metaRight={[info.phone, info.location, 'STRIDE / GRC', 'RUST / GO']}
      />

      <div style={bandsContainer}>
        {/* BAND 01: SECURITY THESIS, METRICS & VALUE PILLARS */}
        <SwissBand index="01" label="Threat Posture" sublabel="Risk & Controls" bg={V2.cell}>
          <p style={{ fontSize: '6.3pt', lineHeight: 1.36, color: V2.body, margin: '0 0 2mm', fontWeight: 500 }}>
            {info.summary}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: `0.22mm solid ${V2.gridStrong}`, background: V2.paper, marginBottom: '2mm' }}>
            {metrics.map((m, i) => (
              <div key={m.label} style={{ padding: '1.3mm 2mm', borderRight: i < 3 ? `0.2mm solid ${V2.gridLine}` : 'none' }}>
                <div style={{ fontSize: '11.5pt', fontWeight: 900, color: V2.cobalt, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
                <div style={{ fontSize: '5.3pt', fontWeight: 800, textTransform: 'uppercase', color: V2.ink, marginTop: '0.4mm' }}>{m.label}</div>
                <div style={{ fontFamily: V2.mono, fontSize: '4.7pt', color: V2.muted }}>{m.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5mm' }}>
            {valuePillars.map((p, idx) => (
              <div key={p.tag} style={{ borderLeft: `0.4mm solid ${V2.cobalt}`, paddingLeft: '2mm' }}>
                <div style={{ fontSize: '5.8pt', fontWeight: 900, color: V2.ink }}>0{idx + 1}. {p.tag}</div>
                <div style={{ fontSize: '5.1pt', lineHeight: 1.28, color: V2.body, marginTop: '0.25mm' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </SwissBand>

        {/* BAND 02: SYNOLOGY COMMUNITY STORE */}
        <SwissBand index="02" label="Cloud Platform" sublabel="syno.vndns.vn // SPK">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.4mm' }}>
            <div>
              <span style={{ fontSize: '7.4pt', fontWeight: 900, color: V2.ink }}>kv-synology — Flagship DSM Web Control Plane</span>
              <span style={{ fontFamily: V2.mono, fontSize: '5.1pt', color: V2.cobalt, marginLeft: '2mm', fontWeight: 700 }}>
                [Next.js 15 · React 19 · QuickConnect · GnuPG CI/CD]
              </span>
            </div>
            <span style={{ fontFamily: V2.mono, fontSize: '5pt', color: V2.muted }}>https://syno.vndns.vn</span>
          </div>
          <div style={{ fontSize: '5.4pt', lineHeight: 1.32, color: V2.body, marginBottom: '1.8mm' }}>
            Automated SPK repository with GnuPG cryptographic signature verification, dynamic port allocation (20000–59999), QuickConnect relay resolver, and live daemon control (SMB, NFS, SSH, WebDAV, AFP).
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: `0.2mm solid ${V2.gridLine}`, background: V2.cell }}>
            {secondaryStoreApps.map((app, i) => (
              <div
                key={app.name}
                style={{
                  padding: '1.3mm 1.8mm',
                  borderRight: (i + 1) % 3 !== 0 ? `0.2mm solid ${V2.gridLine}` : 'none',
                  borderBottom: i < 3 ? `0.2mm solid ${V2.gridLine}` : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '6pt', fontWeight: 900, color: V2.ink }}>{app.name}</span>
                  <span style={{ fontFamily: V2.mono, fontSize: '4.5pt', color: V2.cobalt, fontWeight: 700 }}>{app.tag}</span>
                </div>
                <div style={{ fontSize: '5pt', lineHeight: 1.24, color: V2.body, marginTop: '0.25mm' }}>{app.desc}</div>
                <div style={{ fontFamily: V2.mono, fontSize: '4.4pt', color: V2.muted, marginTop: '0.35mm' }}>{app.tech}</div>
              </div>
            ))}
          </div>
        </SwissBand>

        {/* BAND 03: VIETC RUST LINUX IME */}
        <SwissBand index="03" label="Kernel Subsystem" sublabel="VietC // Rust 1.85+" bg={V2.cell}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.2mm' }}>
            <span style={{ fontSize: '7.2pt', fontWeight: 900, color: V2.ink }}>
              VietC (Viet+) — Native High-Performance Linux Input Method Engine
            </span>
            <span style={{ fontFamily: V2.mono, fontSize: '5pt', color: V2.cobalt, fontWeight: 700 }}>
              github.com/vndangkhoa/vietc (60★)
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5mm' }}>
            {vietcPillars.map((p) => (
              <div key={p.title} style={{ background: V2.paper, padding: '1.4mm 1.8mm', borderTop: `0.35mm solid ${V2.ink}` }}>
                <div style={{ fontSize: '5.9pt', fontWeight: 900, color: V2.ink }}>{p.title}</div>
                <div style={{ fontSize: '5pt', lineHeight: 1.26, color: V2.body, marginTop: '0.3mm' }}>{p.desc}</div>
                <div style={{ fontFamily: V2.mono, fontSize: '4.5pt', color: V2.cobalt, fontWeight: 600, marginTop: '0.4mm' }}>{p.tech}</div>
              </div>
            ))}
          </div>
        </SwissBand>

        {/* BAND 04: SYSTEMS MILESTONES */}
        <SwissBand index="04" label="Milestone Log" sublabel="2020 — Present">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5mm' }}>
            {milestones.map((m) => (
              <div key={m.title} style={{ display: 'grid', gridTemplateColumns: '24mm 1fr', gap: '2.5mm', alignItems: 'baseline' }}>
                <span style={{ fontFamily: V2.mono, fontSize: '5.1pt', fontWeight: 700, color: V2.cobalt, fontVariantNumeric: 'tabular-nums' }}>
                  {m.period}
                </span>
                <div>
                  <div style={{ fontSize: '6.4pt', fontWeight: 900, color: V2.ink }}>{m.title}</div>
                  {m.bullets.map((b, i) => (
                    <div key={i} style={{ fontSize: '5.3pt', lineHeight: 1.3, color: V2.body, marginTop: '0.2mm' }}>
                      + {b}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SwissBand>

        {/* BAND 05: TECHNICAL MATRIX & TOPOLOGY */}
        <SwissBand index="05" label="Technical Spec" sublabel="Matrix & Endpoints" noBorderBottom bg={V2.cell}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5mm', marginBottom: '1.8mm' }}>
            {skillGroups.map((g, i) => (
              <div key={g.label} style={{ borderLeft: i > 0 ? `0.18mm solid ${V2.gridLine}` : 'none', paddingLeft: i > 0 ? '2mm' : 0 }}>
                <div style={{ fontFamily: V2.mono, fontSize: '5.1pt', fontWeight: 700, color: V2.cobalt, textTransform: 'uppercase' }}>{g.label}</div>
                <div style={{ fontSize: '5.1pt', lineHeight: 1.32, color: V2.body, marginTop: '0.3mm' }}>{g.items.join(' · ')}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2.5mm', borderTop: `0.18mm solid ${V2.gridLine}`, paddingTop: '1.4mm' }}>
            {infraTopology.map((t) => (
              <div key={t.title}>
                <div style={{ fontSize: '5.5pt', fontWeight: 800, color: V2.ink }}>{t.title}</div>
                <div style={{ fontSize: '4.9pt', lineHeight: 1.24, color: V2.muted }}>{t.desc}</div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: '5.5pt', fontWeight: 800, color: V2.ink }}>Verified Endpoints</div>
              <div style={{ fontFamily: V2.mono, fontSize: '4.8pt', lineHeight: 1.3, color: V2.cobalt }}>
                {endpoints.map((e) => e.url).join(' · ')}
              </div>
            </div>
          </div>
        </SwissBand>
      </div>

      <SwissFooter
        leftCode={`git.khoavo.myds.me/vndangkhoa  //  github.com/vndangkhoa  //  ${info.email}`}
        rightCode={`KHOA.VO — SECURITY & SYSTEMS ARCHITECT — PAGE 0${pageNum}/0${totalPages}`}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 3: EMBEDDED SYSTEMS & HANDHELD OS ARCHITECT (V2 SWISS GRID)
// ─────────────────────────────────────────────────────────────────────────────
export function V2Page3TrimUI({ pageNum = 2, totalPages = 2 }) {
  const { info, metrics, skillGroups, archPillars, endpoints, handheldApps, milestones } = PAGE3_TRIMUI;

  return (
    <div style={pageBase} className="cv-page print-portfolio-content">
      <SwissMasthead
        docCode={`SPEC-03 // EMBEDDED LINUX & HANDHELD OS // P.0${pageNum}-0${totalPages}`}
        name={info.name}
        title={info.title}
        subtitle={info.subtitle}
        metaLeft={[info.store, info.repo, info.email, info.phone]}
        metaRight={['DUAL-ARCH MUSL', '/DEV/FB0 60FPS', '6 OS DISTROS', info.location]}
      />

      <div style={bandsContainer}>
        {/* BAND 01: EMBEDDED THESIS & METRICS */}
        <SwissBand index="01" label="System Thesis" sublabel="A523 & A133P OS" bg={V2.cell}>
          <p style={{ fontSize: '6.4pt', lineHeight: 1.38, color: V2.body, margin: '0 0 2.2mm', fontWeight: 500 }}>
            {info.summary}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: `0.22mm solid ${V2.gridStrong}`, background: V2.paper }}>
            {metrics.map((m, i) => (
              <div key={m.label} style={{ padding: '1.5mm 2mm', borderRight: i < 3 ? `0.2mm solid ${V2.gridLine}` : 'none' }}>
                <div style={{ fontSize: '12pt', fontWeight: 900, color: V2.cobalt, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
                <div style={{ fontSize: '5.4pt', fontWeight: 800, textTransform: 'uppercase', color: V2.ink, marginTop: '0.5mm' }}>{m.label}</div>
                <div style={{ fontFamily: V2.mono, fontSize: '4.8pt', color: V2.muted }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </SwissBand>

        {/* BAND 02: SUBSYSTEM ARCHITECTURE PILLARS */}
        <SwissBand index="02" label="Kernel Pillars" sublabel="Dual-Engine · 6-OS">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3mm' }}>
            {archPillars.map((p, idx) => (
              <div key={p.title} style={{ background: V2.cell, padding: '1.8mm 2.2mm', border: `0.2mm solid ${V2.gridLine}`, borderTop: `0.4mm solid ${V2.cobalt}` }}>
                <div style={{ fontFamily: V2.mono, fontSize: '5pt', color: V2.cobalt, fontWeight: 700 }}>SUBSYSTEM 0{idx + 1}</div>
                <div style={{ fontSize: '6.2pt', fontWeight: 900, color: V2.ink, marginTop: '0.3mm' }}>{p.title}</div>
                <div style={{ fontSize: '5.2pt', lineHeight: 1.3, color: V2.body, marginTop: '0.4mm' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </SwissBand>

        {/* BAND 03: KV-TRIMUI SUITE & KV-RADIO */}
        <SwissBand index="03" label="Handheld Suite" sublabel="18 Production Apps" bg={V2.cell}>
          <div style={{ background: V2.paper, border: `0.22mm solid ${V2.gridStrong}`, padding: '1.8mm 2.4mm', marginBottom: '2mm' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <span style={{ fontSize: '7.6pt', fontWeight: 900, color: V2.ink }}>kv-radio</span>
                <span style={{ fontFamily: V2.mono, fontSize: '5.1pt', color: V2.cobalt, fontWeight: 700, marginLeft: '2mm' }}>
                  [PURE RUST 60 FPS FRAMEBUFFER · &lt;900KB RAM]
                </span>
              </div>
              <span style={{ fontFamily: V2.mono, fontSize: '4.9pt', color: V2.muted }}>Rust 1.85 · /dev/fb0 mmap · Direct ALSA</span>
            </div>
            <div style={{ fontSize: '5.5pt', lineHeight: 1.32, color: V2.body, marginTop: '0.5mm' }}>
              Standalone embedded internet radio station player directly rendering to the Linux framebuffer with double-buffered page flipping, custom TrueType glyph rasterization, dirty-rectangle blitting, and direct ALSA PCM streaming.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: `0.2mm solid ${V2.gridLine}` }}>
            {handheldApps.map((app, i) => (
              <div
                key={app.name}
                style={{
                  padding: '1.5mm 2mm',
                  borderRight: (i + 1) % 3 !== 0 ? `0.2mm solid ${V2.gridLine}` : 'none',
                  borderBottom: i < 3 ? `0.2mm solid ${V2.gridLine}` : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '6.2pt', fontWeight: 900, color: V2.ink }}>{app.name}</span>
                  <span style={{ fontFamily: V2.mono, fontSize: '4.5pt', color: V2.cobalt, fontWeight: 700 }}>{app.tag}</span>
                </div>
                <div style={{ fontSize: '5.1pt', lineHeight: 1.26, color: V2.body, marginTop: '0.3mm' }}>{app.desc}</div>
                <div style={{ fontFamily: V2.mono, fontSize: '4.5pt', color: V2.muted, marginTop: '0.4mm' }}>{app.tech}</div>
              </div>
            ))}
          </div>
        </SwissBand>

        {/* BAND 04: FIRMWARE MILESTONES */}
        <SwissBand index="04" label="Firmware Log" sublabel="2026 Roadmap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2mm' }}>
            {milestones.map((m) => (
              <div key={m.entity} style={{ display: 'grid', gridTemplateColumns: '28mm 1fr', gap: '3mm', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontFamily: V2.mono, fontSize: '5.2pt', fontWeight: 700, color: V2.cobalt }}>{m.period}</div>
                  <div style={{ fontSize: '5.6pt', fontWeight: 800, color: V2.muted, marginTop: '0.2mm' }}>{m.entity}</div>
                </div>
                <div>
                  <div style={{ fontSize: '6.8pt', fontWeight: 900, color: V2.ink }}>{m.role}</div>
                  {m.bullets.map((b, i) => (
                    <div key={i} style={{ fontSize: '5.4pt', lineHeight: 1.34, color: V2.body, marginTop: '0.25mm' }}>
                      + {b}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SwissBand>

        {/* BAND 05: EMBEDDED MATRIX & ENDPOINTS */}
        <SwissBand index="05" label="Embedded Spec" sublabel="Matrix & OTA Links" noBorderBottom bg={V2.cell}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5mm', marginBottom: '1.8mm' }}>
            {skillGroups.map((g, i) => (
              <div key={g.label} style={{ borderLeft: i > 0 ? `0.18mm solid ${V2.gridLine}` : 'none', paddingLeft: i > 0 ? '2mm' : 0 }}>
                <div style={{ fontFamily: V2.mono, fontSize: '5.1pt', fontWeight: 700, color: V2.cobalt, textTransform: 'uppercase' }}>{g.label}</div>
                <div style={{ fontSize: '5.2pt', lineHeight: 1.34, color: V2.body, marginTop: '0.3mm' }}>{g.items.join(' · ')}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5mm', borderTop: `0.18mm solid ${V2.gridLine}`, paddingTop: '1.4mm' }}>
            {endpoints.map((ep) => (
              <div key={ep.url}>
                <div style={{ fontFamily: V2.mono, fontSize: '5.3pt', fontWeight: 700, color: V2.cobalt }}>{ep.url}</div>
                <div style={{ fontSize: '4.9pt', color: V2.muted }}>{ep.desc}</div>
              </div>
            ))}
          </div>
        </SwissBand>
      </div>

      <SwissFooter
        leftCode={`git.khoavo.myds.me/vndangkhoa/kv-trimui  //  ${info.store}  //  ${info.email}`}
        rightCode={`KHOA.VO — EMBEDDED SYSTEMS ARCHITECT — PAGE 0${pageNum}/0${totalPages}`}
      />
    </div>
  );
}
