import React from 'react';

const PRINT_PERSONAL_INFO = {
  name: "Khoa.vo",
  title: "CREATIVE MANAGER & AI INNOVATION LEAD",
  location: "Ho Chi Minh City, Vietnam",
  phone: "0398300340",
  email: "vonguyendangkhoa@gmail.com",
  linkedin: "linkedin.com/in/khoavo",
  portfolio: "khoavo.myds.me",
  summaryHeadline: "Visionary Creative Leader merging Brand Strategy with Generative AI.",
  summaryBody: "With 9+ years of expertise at global firms like P&G and Phibious, I bridge the gap between artistic direction and high-performance automation. I specialize in designing scalable AI video production workflows and agentic systems that serve Fortune 500 brands while driving measurable growth and operational excellence.\n\nBeyond traditional creative direction, my recent evolution into an AI-Powered Developer enables me to architect custom web applications and full-stack deployment pipelines (React, Go, Docker). By unifying deep brand-building experience with hands-on coding and machine learning integration, I transform creative conceptualization into quantifiable, automated, and highly scalable digital realities."
};

const PRINT_EDUCATION = [
  {
    period: "2012 - 2016",
    school: "RMIT University",
    degree: "Bachelor of Multimedia Design",
    details: "Graduated with Excellence."
  }
];

const PRINT_SKILLS = [
  "Creative Direction", "Brand Strategy", "Team Mentorship",
  "GenAI Workflows", "ComfyUI & FLUX", "AI Video Systems",
  "Adobe Creative Suite", "Motion Graphics", "3D Visualization",
  "Full-Stack Dev", "Agentic AI", "Automation SOPs"
];

const PRINT_EXPERIENCES = [
  {
    role: "AI Creative Lead", 
    company: "Phibious Vietnam", 
    period: "Jun 2025 - Present",
    highlights: [
      "Spearheaded the transformation of video production workflows via AI and automation, achieving a 60% measurable gain in output volume.",
      "Acted as a creative multiplier, leading regional stakeholders and cross-functional teams to automate end-to-end content lifecycles.",
      "Standardized end-to-end AI video production SOPs—ranging from AI-led scripting to automated localization—ensuring brand compliance across Southeast Asian markets.",
      "Drove Regional Enablement by mentoring 20+ producers on prompt engineering, AI ethics, and workflow standardization."
    ]
  },
  {
    role: "eCOM Design Lead", 
    company: "Procter & Gamble", 
    period: "Sep 2023 - Jun 2025",
    highlights: [
      "Directed visual strategies for P&G's Hair Care portfolio across SEA, impacting millions of consumers effectively.",
      "Managed end-to-end design lifecycles, ensuring strict brand compliance and high-volume output across regional markets.",
      "Collaborated with global brand teams to localize and scale omnichannel retail experiences."
    ]
  },
  {
    role: "Associate Brand Manager (Design)", 
    company: "P&G Vietnam", 
    period: "Nov 2020 - Sep 2023",
    highlights: [
      "Developed core visual concepts for major product launches, including packaging and digital touchpoints for regional SEA markets.",
      "Optimized internal design processes, reducing asset turnaround time for regional marketing teams by 30%.",
      "Mastered corporate identity systems, ensuring consistent brand expression across all platforms and physical retail environments."
    ]
  },
  {
    role: "Production Creative Lead", 
    company: "Inn Saigon", 
    period: "Dec 2019 - Nov 2020",
    highlights: [
      "Directed a multi-disciplinary team of photographers and retouchers for high-profile hospitality clients.",
      "Managed production budgets and resource allocation for 30+ simultaneous client accounts.",
      "Implemented quality control frameworks that reduced post-production errors by 40%."
    ]
  }
];

const PRINT_STRATEGIC_TECH = [
  { name: "KV-Tube", tech: "Go, Next.js, Docker", desc: "Enterprise-grade HLS video streaming platform with custom NAS deployment architecture." },
  { name: "APIx GenAI", tech: "TypeScript, LLM APIs", desc: "A custom AI image generation portal integrating multiple LLM and Diffusion providers." }
];

// --- BRANDING COMPONENT (B&W Friendly) ---
const PRINT_VNDKLogo = ({ size = 100, vnColor = "#000000", dkColor = "#333333" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size} fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <path stroke={vnColor} d="M 15 25 L 30 45 L 45 25" />
    <path stroke={vnColor} d="M 55 45 L 55 25 L 85 45 L 85 25" />
    <path stroke={dkColor} d="M 15 55 L 30 55 A 10 10 0 0 1 30 75 L 15 75 Z" />
    <path stroke={dkColor} d="M 55 55 L 55 75 M 85 55 L 55 65 L 85 75" />
  </svg>
);

const PRINT_COLORS = {
  accent: '#222222', // Replaced mint with dark grey for B&W printing
  black: '#000000',
  white: '#FFFFFF',
  grey: '#444444',
  muted: '#666666',
  border: '#DDDDDD'
};

const PRINT_STYLES = {
  container: {
    width: '100%',
    maxWidth: '210mm',
    background: PRINT_COLORS.white,
    fontFamily: "'Inter', sans-serif",
    color: PRINT_COLORS.black,
    margin: '0 auto',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1,
  },
  documentContainer: {
    padding: '0',
    backgroundColor: PRINT_COLORS.white,
    display: 'flex',
    flexDirection: 'column',
  },
  headerWrapper: {
    backgroundColor: PRINT_COLORS.white, 
    padding: '16mm 18mm 12mm 18mm',
    width: '100%',
    boxSizing: 'border-box',
    borderTop: `6mm solid ${PRINT_COLORS.black}`,
    borderBottom: `1px solid ${PRINT_COLORS.border}`,
    marginBottom: '10mm'
  },
  topHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10mm',
  },
  logoSlot: {
    border: `2px solid ${PRINT_COLORS.black}`,
    padding: '2mm',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRINT_COLORS.white,
  },
  nameTitle: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: '12mm',
  },
  name: {
    fontSize: '28pt',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    color: PRINT_COLORS.black,
    marginBottom: '1mm',
  },
  title: {
    fontSize: '12pt',
    fontWeight: 700,
    color: PRINT_COLORS.muted,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  contactInfo: {
    textAlign: 'right',
    fontSize: '9pt',
    fontWeight: 600,
    color: PRINT_COLORS.black,
    lineHeight: '1.8',
  },
  headerLine: {
    width: '100%',
    height: '1.5px',
    backgroundColor: PRINT_COLORS.black,
    margin: '8mm 0 4mm 0',
    position: 'relative',
  },
  headerLineAccent: {
    position: 'absolute',
    right: '0',
    top: '0',
    width: '30%',
    height: '1.5px',
    backgroundColor: PRINT_COLORS.accent,
  },
  summaryHeadline: {
    fontSize: '22pt',
    fontWeight: 800,
    lineHeight: '1.2',
    marginBottom: '8mm',
    color: PRINT_COLORS.black,
    maxWidth: '90%',
  },
  summaryParagraph: {
    fontSize: '11pt',
    color: PRINT_COLORS.grey,
    marginBottom: '12mm',
    textAlign: 'justify',
    lineHeight: '1.7',
    whiteSpace: 'pre-wrap',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '3mm 10mm',
  },
  skillItem: {
    fontSize: '10pt',
    display: 'flex',
    alignItems: 'center',
    gap: '4mm',
    fontWeight: 600,
  },
  skillIcon: {
    width: '6mm',
    height: '1.5px',
    backgroundColor: PRINT_COLORS.accent,
  },
  mainBody: {
    padding: '0 18mm',
    flex: 1,
  },
  sectionHeading: {
    fontSize: '11pt',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginBottom: '10mm',
    color: PRINT_COLORS.black,
    borderLeft: `5mm solid ${PRINT_COLORS.accent}`,
    paddingLeft: '5mm',
    pageBreakAfter: 'avoid',
    breakAfter: 'avoid'
  },
  experienceRow: {
    display: 'grid',
    gridTemplateColumns: '1.3fr 2fr',
    gap: '12mm',
    marginBottom: '12mm',
  },
  experienceMeta: {
    display: 'flex',
    flexDirection: 'column',
  },
  expRole: {
    fontSize: '13pt',
    fontWeight: 800,
    marginBottom: '2mm',
  },
  expCompany: {
    fontSize: '10.5pt',
    fontWeight: 600,
    color: PRINT_COLORS.muted,
  },
  expPeriod: {
    fontSize: '9.5pt',
    color: PRINT_COLORS.muted,
    marginTop: '3mm',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  expHighlights: {
    margin: 0,
    paddingLeft: '6mm',
    listStyleType: 'none',
  },
  highlightItem: {
    marginBottom: '4mm',
    textAlign: 'justify',
    fontSize: '10.5pt',
    position: 'relative',
    lineHeight: '1.6',
    pageBreakInside: 'avoid',
    breakInside: 'avoid'
  },
  highlightBullet: {
    position: 'absolute',
    left: '-6mm',
    top: '2.5mm',
    width: '3.5mm',
    height: '1px',
    backgroundColor: PRINT_COLORS.accent,
  },
  techMeta: {
    fontFamily: 'monospace',
    fontSize: '10pt',
    color: PRINT_COLORS.black,
    backgroundColor: PRINT_COLORS.white,
    padding: '1.5mm 3mm',
    borderLeft: `2px solid ${PRINT_COLORS.accent}`,
    border: `1px solid ${PRINT_COLORS.border}`,
    marginTop: '3mm',
  },
  footer: {
    marginTop: '10mm',
    padding: '10mm 18mm',
    textAlign: 'center',
    fontSize: '9pt',
    color: PRINT_COLORS.muted,
    borderTop: `1px solid ${PRINT_COLORS.border}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    pageBreakInside: 'avoid',
    breakInside: 'avoid'
  }
};

export default function PrintPortfolio() {
  if (!PRINT_PERSONAL_INFO) return null;

  return (
    <div style={PRINT_STYLES.container} className="print-portfolio-content">
      <div style={PRINT_STYLES.documentContainer}>
        {/* --- HEADER --- */}
        <div style={PRINT_STYLES.headerWrapper}>
          <div style={PRINT_STYLES.topHeader}>
            <div style={PRINT_STYLES.logoSlot}>
              <PRINT_VNDKLogo size={64} />
            </div>
            <div style={PRINT_STYLES.nameTitle}>
              <h1 style={PRINT_STYLES.name}>{PRINT_PERSONAL_INFO.name}</h1>
              <div style={PRINT_STYLES.title}>{PRINT_PERSONAL_INFO.title}</div>
            </div>
            <div style={PRINT_STYLES.contactInfo}>
              <div>{PRINT_PERSONAL_INFO.email}</div>
              <div>{PRINT_PERSONAL_INFO.phone}</div>
              <div style={{color: PRINT_COLORS.muted, textDecoration: 'underline'}}>{PRINT_PERSONAL_INFO.portfolio}</div>
            </div>
          </div>
          
          <div style={PRINT_STYLES.headerLine}>
            <div style={PRINT_STYLES.headerLineAccent}></div>
          </div>
          <div style={{...PRINT_STYLES.expPeriod, marginBottom: '10mm', textAlign: 'right'}}>{PRINT_PERSONAL_INFO.location}</div>

          <h2 style={PRINT_STYLES.summaryHeadline}>{PRINT_PERSONAL_INFO.summaryHeadline}</h2>
          <p style={PRINT_STYLES.summaryParagraph}>{PRINT_PERSONAL_INFO.summaryBody}</p>

          <div style={{marginBottom: '8mm', fontSize: '10.5pt', fontWeight: 900, textTransform: 'uppercase', color: PRINT_COLORS.black, letterSpacing: '0.15em'}}>Branded Expertise</div>
          <div style={PRINT_STYLES.skillsGrid}>
            {PRINT_SKILLS.map((skill, i) => (
              <div key={i} style={PRINT_STYLES.skillItem}>
                <div style={PRINT_STYLES.skillIcon}></div>
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* --- MAIN CONTENT CONTINUOUS --- */}
        <div style={PRINT_STYLES.mainBody}>
          <div style={PRINT_STYLES.sectionHeading}>Experience Journey</div>
          
          {PRINT_EXPERIENCES.map((exp, i) => (
            <div key={i} style={PRINT_STYLES.experienceRow}>
              <div style={PRINT_STYLES.experienceMeta}>
                <div style={PRINT_STYLES.expRole}>{exp.role}</div>
                <div style={PRINT_STYLES.expCompany}>{exp.company}</div>
                <div style={PRINT_STYLES.expPeriod}>{exp.period}</div>
              </div>
              <ul style={PRINT_STYLES.expHighlights}>
                {exp.highlights && exp.highlights.map((h, j) => (
                  <li key={j} style={PRINT_STYLES.highlightItem}>
                    <div style={PRINT_STYLES.highlightBullet}></div>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div style={{...PRINT_STYLES.sectionHeading, marginTop: '8mm'}}>Branded Systems & Tech</div>
          {PRINT_STRATEGIC_TECH.map((proj, i) => (
            <div key={i} style={PRINT_STYLES.experienceRow}>
              <div style={PRINT_STYLES.experienceMeta}>
                <div style={{...PRINT_STYLES.expRole, fontSize: '12pt'}}>{proj.name}</div>
                <div style={PRINT_STYLES.techMeta}>{proj.tech}</div>
              </div>
              <div style={{fontSize: '11pt', color: PRINT_COLORS.grey, lineHeight: '1.7'}}>
                {proj.desc}
              </div>
            </div>
          ))}

          <div style={{...PRINT_STYLES.sectionHeading, marginTop: '8mm'}}>Foundation & Recognition</div>
          <div style={PRINT_STYLES.experienceRow}>
            <div style={PRINT_STYLES.experienceMeta}>
              <div style={PRINT_STYLES.expRole}>{PRINT_EDUCATION[0].school}</div>
              <div style={PRINT_STYLES.expPeriod}>{PRINT_EDUCATION[0].period}</div>
            </div>
            <div style={{fontSize: '11pt', color: PRINT_COLORS.grey}}>
              <strong style={{color: PRINT_COLORS.black}}>{PRINT_EDUCATION[0].degree}</strong> ({PRINT_EDUCATION[0].details})<br/>
              <div style={{marginTop: '6mm', borderTop: `1px solid ${PRINT_COLORS.border}`, paddingTop: '4mm'}}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '3mm'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '3mm'}}>
                    <div style={{...PRINT_STYLES.skillIcon, width: '4mm'}}></div>
                    <span>P&G SEA Digital Awards (Best Digital Campaign, 2024)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div style={PRINT_STYLES.footer}>
          <div style={{display: 'flex', gap: '6mm'}}>
             <span>{PRINT_PERSONAL_INFO.linkedin}</span>
             <span>{PRINT_PERSONAL_INFO.portfolio}</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '4mm'}}>
             <PRINT_VNDKLogo size={24} />
             <span style={{fontWeight: 900, color: PRINT_COLORS.black}}>VNDK // CV</span>
          </div>
        </div>
      </div>
    </div>
  );
}
