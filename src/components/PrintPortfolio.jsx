import React from 'react';
import VNDKLogo from './ui/VNDKLogo';

const PRINT_PERSONAL_INFO = {
  name: "Vo Nguyen Dang Khoa",
  title: "CREATIVE MANAGER & AI CREATIVE LEAD",
  subtitle: "Visual Strategy • Generative AI Workflows • Art Direction",
  location: "Ho Chi Minh City, Vietnam",
  phone: "0398300340",
  email: "vonguyendangkhoa@gmail.com",
  linkedin: "linkedin.com/in/khoa-vo-76291236",
  portfolio: "khoavo.myds.me",
  gitServer: "git.khoavo.myds.me/vndangkhoa",
  summaryHeadline: "Creative Manager | AI Innovation & Visual Strategy Lead",
  summaryBody: "Visionary Creative Manager with 9+ years of experience steering high-impact visual strategy, brand identity, motion graphics, and AI-augmented creative production across Southeast Asia. Proven track record of leading multidisciplinary creative teams at Phibious and Procter & Gamble (P&G), spearheading a 60% production volume gain via GenAI workflows (ComfyUI, FLUX.1, Midjourney), and driving regional eCommerce visual strategies that reached millions of consumers. Expertly bridges traditional art direction with cutting-edge AI systems and automated creative pipelines."
};

const PRINT_EDUCATION = [
  {
    period: "2012 - 2016",
    school: "RMIT University Vietnam",
    degree: "Bachelor of Multimedia Design",
    details: "Graduated with Excellence."
  }
];

const PRINT_SKILLS_CATEGORIES = [
  {
    name: "AI & Generative Creative",
    items: ["ComfyUI", "Stable Diffusion", "FLUX.1", "Midjourney v6", "Runway Gen-3", "LoRA Training", "ControlNet", "IP-Adapter"]
  },
  {
    name: "Creative & Motion Suite",
    items: ["Art Direction", "Photoshop", "After Effects", "Premiere Pro", "Figma", "Cinema 4D", "Blender", "Visual Storytelling"]
  },
  {
    name: "Creative Leadership & Strategy",
    items: ["Team Leadership (20+)", "Omnichannel Strategy", "eCommerce Design", "Editorial Design", "Production SOPs"]
  },
  {
    name: "Technical Infrastructure",
    items: ["Full-Stack Dev", "React & Next.js", "TypeScript", "Go (Gin)", "Docker", "DevOps"]
  }
];

const PRINT_EXPERIENCES = [
  {
    role: "AI Creative Lead", 
    company: "Phibious Vietnam", 
    period: "2025 - Present",
    highlights: [
      "Spearheaded transformation of video production workflows via AI and automation, achieving a 60% gain in output volume across regional campaigns.",
      "Designed and deployed Agentic AI frameworks for rapid concept-to-video prototyping, serving global Fortune 500 accounts.",
      "Standardized AI video SOPs (scripting, storyboarding, localization) ensuring brand compliance across SEA markets.",
      "Mentored 20+ producers and creative leads on prompt engineering, ComfyUI node graphs, AI ethics, and workflow optimization."
    ]
  },
  {
    role: "eCommerce Design Lead", 
    company: "Procter & Gamble (P&G)", 
    period: "2020 - 2025",
    highlights: [
      "Directed visual strategy for P&G's SEA Hair Care eCommerce portfolio (Head & Shoulders, Pantene), impacting millions of regional consumers.",
      "Managed end-to-end design strategy across 6 SEA markets, adapting global brand guidelines for local market nuances.",
      "Developed modular design systems enabling 3x faster content adaptation for new product launches across SEA."
    ]
  },
  {
    role: "Production Creative Lead", 
    company: "INN SaiGon", 
    period: "2019 - 2020",
    highlights: [
      "Directed photography and motion production for commercial campaigns with 30+ client accounts across luxury & F&B sectors.",
      "Managed multidisciplinary team of retouchers and stylists; reduced post-production turnaround time by 40%."
    ]
  },
  {
    role: "Regional Head of Design", 
    company: "ASIAMARINE", 
    period: "2018 - 2019",
    highlights: [
      "Led cross-border design team producing digital marketing assets, web graphics, and editorial content for luxury marine brand.",
      "Developed visual identity system defining ASIAMARINE's premium positioning in the regional luxury market."
    ]
  },
  {
    role: "Senior Graphic Designer", 
    company: "EMG (Element Management Group)", 
    period: "2017 - 2018",
    highlights: [
      "Created high-impact print, digital, and corporate identity campaigns for global luxury and lifestyle brands entering Vietnam."
    ]
  }
];

const PRINT_STRATEGIC_TECH = [
  { name: "AI Fashion Video Pipeline", tech: "ComfyUI, FLUX.1, OpenPose", desc: "Automated AI fashion workflow converting concept instructions into scalable commercial video assets." },
  { name: "P&G SEA Hair Care eCommerce Strategy", tech: "eCommerce Art Direction, Strategy", desc: "Regional visual strategy across Southeast Asia impacting millions of digital retail consumers." },
  { name: "Delux Perfume Fineline Campaign", tech: "AI Branding, Runway Gen-3", desc: "End-to-end creative direction, AI product mood boards, and commercial video creation." },
  { name: "NAVIGATOR Luxury Publication", tech: "Editorial Design, Art Direction", desc: "Complete layout design, typography, and visual storytelling for Vietnam's premier yacht publication." }
];

const PRINT_COLORS = {
  primary: '#0F172A',
  secondary: '#334155',
  tertiary: '#64748B',
  accent: '#00C853', // Brand Electric Emerald Green
  black: '#000000',
  white: '#FFFFFF',
  grey: '#334155',
  muted: '#64748B',
  lightBg: '#F8FAFC',
  border: '#CBD5E1',
  sidebarBg: '#F1F5F9',
  sidebarBorder: '#CBD5E1',
};

const PRINT_STYLES = {
  container: {
    width: '210mm',
    height: '297mm',
    maxHeight: '297mm',
    background: PRINT_COLORS.white,
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: PRINT_COLORS.grey,
    margin: '0 auto',
    boxSizing: 'border-box',
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
  },
  sidebar: {
    width: '72mm',
    height: '297mm',
    background: PRINT_COLORS.sidebarBg,
    borderRight: `1.5px solid ${PRINT_COLORS.sidebarBorder}`,
    padding: '7mm 6mm',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  profileLogoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '2mm',
  },
  name: {
    fontSize: '14.5pt',
    fontWeight: 800,
    color: PRINT_COLORS.primary,
    textAlign: 'center',
    marginBottom: '1.5mm',
    letterSpacing: '-0.02em',
    lineHeight: 1.18,
  },
  title: {
    fontSize: '6.8pt',
    fontWeight: 800,
    color: PRINT_COLORS.accent,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: '5.8pt',
    fontWeight: 600,
    color: PRINT_COLORS.tertiary,
    textAlign: 'center',
    marginTop: '1mm',
    lineHeight: 1.25,
  },
  contactSection: {
    borderTop: `1px solid ${PRINT_COLORS.border}`,
    paddingTop: '3.5mm',
  },
  sectionLabel: {
    fontSize: '7pt',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: PRINT_COLORS.primary,
    marginBottom: '2.5mm',
    borderBottom: `1.5px solid ${PRINT_COLORS.primary}`,
    paddingBottom: '1mm',
  },
  contactItem: {
    fontSize: '6.8pt',
    color: PRINT_COLORS.grey,
    marginBottom: '1.8mm',
    wordBreak: 'break-word',
    lineHeight: 1.4,
  },
  skillCategoryTitle: {
    fontSize: '6.5pt',
    fontWeight: 700,
    color: PRINT_COLORS.accent,
    textTransform: 'uppercase',
    marginTop: '2.5mm',
    marginBottom: '1.5mm',
  },
  skillTag: {
    display: 'inline-block',
    background: PRINT_COLORS.white,
    border: `1px solid ${PRINT_COLORS.border}`,
    color: PRINT_COLORS.primary,
    padding: '1mm 2mm',
    fontSize: '5.8pt',
    fontWeight: 600,
    marginBottom: '1.5mm',
    marginRight: '1.5mm',
    borderRadius: '1mm',
    fontFamily: "'JetBrains Mono', monospace",
  },
  mainContent: {
    flex: 1,
    height: '297mm',
    padding: '7mm 7.5mm',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  mainTitle: {
    fontSize: '13.5pt',
    fontWeight: 800,
    color: PRINT_COLORS.primary,
    marginBottom: '1.5mm',
    letterSpacing: '-0.01em',
    lineHeight: 1.18,
  },
  summaryParagraph: {
    fontSize: '7.8pt',
    lineHeight: 1.5,
    textAlign: 'justify',
    color: PRINT_COLORS.secondary,
    marginBottom: '3mm',
  },
  sectionHeading: {
    fontSize: '9pt',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: PRINT_COLORS.primary,
    paddingBottom: '1mm',
    borderBottom: `1.5px solid ${PRINT_COLORS.primary}`,
    marginBottom: '3mm',
    marginTop: '1mm',
  },
  experienceItem: {
    marginBottom: '3.2mm',
    pageBreakInside: 'avoid',
  },
  expHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5mm',
  },
  expRole: {
    fontSize: '8.8pt',
    fontWeight: 700,
    color: PRINT_COLORS.primary,
    lineHeight: 1.18,
  },
  expPeriod: {
    fontSize: '6.8pt',
    fontWeight: 700,
    color: PRINT_COLORS.accent,
    fontFamily: "'JetBrains Mono', monospace",
    whiteSpace: 'nowrap',
  },
  expCompany: {
    fontSize: '7.8pt',
    fontWeight: 600,
    color: PRINT_COLORS.tertiary,
    marginBottom: '0.8mm',
  },
  highlightList: {
    margin: 0,
    paddingLeft: '3.5mm',
  },
  highlightItem: {
    fontSize: '7.2pt',
    lineHeight: 1.42,
    color: PRINT_COLORS.secondary,
    marginBottom: '0.6mm',
  },
  projectCard: {
    padding: '2mm 2.5mm',
    marginBottom: '2mm',
    borderLeft: `2.5px solid ${PRINT_COLORS.accent}`,
    background: PRINT_COLORS.lightBg,
    borderRadius: '0 1mm 1mm 0',
  },
  projectTitle: {
    fontSize: '7.8pt',
    fontWeight: 700,
    color: PRINT_COLORS.primary,
    marginBottom: '0.5mm',
  },
  projectDesc: {
    fontSize: '6.8pt',
    color: PRINT_COLORS.secondary,
    lineHeight: 1.35,
    marginBottom: '0.8mm',
  },
  projectTech: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '5.8pt',
    color: PRINT_COLORS.accent,
    fontWeight: 700,
  },
  educationSchool: {
    fontSize: '8.5pt',
    fontWeight: 700,
    color: PRINT_COLORS.primary,
  },
  educationDegree: {
    fontSize: '7.5pt',
    color: PRINT_COLORS.secondary,
  },
  educationPeriod: {
    fontSize: '6.2pt',
    color: PRINT_COLORS.tertiary,
    fontFamily: "'JetBrains Mono', monospace",
  },
};

export default function PrintPortfolio() {
  return (
    <div style={PRINT_STYLES.container} className="print-portfolio-content">
      {/* LEFT SIDEBAR */}
      <aside style={PRINT_STYLES.sidebar}>
        <div>
          <div style={PRINT_STYLES.profileLogoContainer}>
            <VNDKLogo size="md" className="mb-2" />
            <h1 style={PRINT_STYLES.name}>{PRINT_PERSONAL_INFO.name}</h1>
            <div style={PRINT_STYLES.title}>{PRINT_PERSONAL_INFO.title}</div>
            <div style={PRINT_STYLES.subtitle}>{PRINT_PERSONAL_INFO.subtitle}</div>
          </div>

          {/* Contact Info */}
          <div style={PRINT_STYLES.contactSection}>
            <div style={PRINT_STYLES.sectionLabel}>Contact & Links</div>
            <div style={PRINT_STYLES.contactItem}>📧 {PRINT_PERSONAL_INFO.email}</div>
            <div style={PRINT_STYLES.contactItem}>📱 {PRINT_PERSONAL_INFO.phone}</div>
            <div style={PRINT_STYLES.contactItem}>📍 {PRINT_PERSONAL_INFO.location}</div>
            <div style={PRINT_STYLES.contactItem}>🔗 {PRINT_PERSONAL_INFO.linkedin}</div>
            <div style={PRINT_STYLES.contactItem}>🌐 {PRINT_PERSONAL_INFO.portfolio}</div>
            <div style={PRINT_STYLES.contactItem}>💻 {PRINT_PERSONAL_INFO.gitServer}</div>
          </div>

          {/* Categorized Technical & Creative Skills */}
          <div>
            <div style={PRINT_STYLES.sectionLabel}>Skill Matrix</div>
            {PRINT_SKILLS_CATEGORIES.map((cat, idx) => (
              <div key={idx}>
                <div style={PRINT_STYLES.skillCategoryTitle}>{cat.name}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {cat.items.map((skill, i) => (
                    <span key={i} style={PRINT_STYLES.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ marginTop: 'auto', paddingTop: '3mm', borderTop: `1px solid ${PRINT_COLORS.border}` }}>
          <div style={PRINT_STYLES.sectionLabel}>Education</div>
          <div style={PRINT_STYLES.educationSchool}>{PRINT_EDUCATION[0].school}</div>
          <div style={PRINT_STYLES.educationDegree}>{PRINT_EDUCATION[0].degree}</div>
          <div style={PRINT_STYLES.educationPeriod}>{PRINT_EDUCATION[0].period}</div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section style={PRINT_STYLES.mainContent}>
        <div>
          <h1 style={PRINT_STYLES.mainTitle}>{PRINT_PERSONAL_INFO.summaryHeadline}</h1>
          <p style={PRINT_STYLES.summaryParagraph}>{PRINT_PERSONAL_INFO.summaryBody}</p>

          {/* Work Experience */}
          <div>
            <h2 style={PRINT_STYLES.sectionHeading}>Creative Leadership & Experience</h2>
            
            {PRINT_EXPERIENCES.map((exp, i) => (
              <div key={i} style={PRINT_STYLES.experienceItem}>
                <div style={PRINT_STYLES.expHeader}>
                  <div>
                    <span style={PRINT_STYLES.expRole}>{exp.role}</span>
                    <span style={PRINT_STYLES.expCompany}> — {exp.company}</span>
                  </div>
                  <div style={PRINT_STYLES.expPeriod}>{exp.period}</div>
                </div>
                <ul style={PRINT_STYLES.highlightList}>
                  {exp.highlights && exp.highlights.map((h, j) => (
                    <li key={j} style={PRINT_STYLES.highlightItem}>
                      • {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Key Creative Systems & Projects */}
          <div>
            <h2 style={PRINT_STYLES.sectionHeading}>Featured Creative Workflows & Campaigns</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2mm' }}>
              {PRINT_STRATEGIC_TECH.map((proj, i) => (
                <div key={i} style={PRINT_STYLES.projectCard}>
                  <div style={PRINT_STYLES.projectTitle}>{proj.name}</div>
                  <div style={PRINT_STYLES.projectDesc}>{proj.desc}</div>
                  <div style={PRINT_STYLES.projectTech}>{proj.tech}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '2.5mm',
          borderTop: `1px solid ${PRINT_COLORS.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ fontSize: '5.5pt', color: PRINT_COLORS.muted }}>
            {PRINT_PERSONAL_INFO.email} • {PRINT_PERSONAL_INFO.phone} • {PRINT_PERSONAL_INFO.portfolio}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5mm' }}>
            <span style={{ fontSize: '5.5pt', fontWeight: 700, color: PRINT_COLORS.primary }}>VO NGUYEN DANG KHOA — CREATIVE CV</span>
          </div>
        </div>
      </section>
    </div>
  );
}
