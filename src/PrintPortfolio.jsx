import React from 'react';

const PRINT_PERSONAL_INFO = {
  name: "Khoa.vo",
  title: "CREATIVE MANAGER & DESIGN MANAGER",
  location: "Ho Chi Minh City, Vietnam",
  phone: "0398300340",
  email: "vonguyendangkhoa@gmail.com",
  linkedin: "linkedin.com/in/khoavo93",
  portfolio: "khoavo.myds.me",
  summaryHeadline: "Creative Manager | Design Leader | Visual Strategy",
  summaryBody: "Creative and design leader with 9+ years of experience building high-impact visual strategies across Southeast Asia. Proven track record in leading cross-functional creative teams, managing end-to-end production workflows, and driving digital brand transformation across eCommerce, editorial, and omnichannel retail.\n\nPassionate about integrating AI-powered tools into creative pipelines to enhance efficiency and scale output while maintaining brand consistency."
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
  "Creative Direction", "Brand Strategy", "Team Leadership",
  "Design Systems", "Art Direction", "Visual Identity",
  "Adobe Creative Suite", "Motion Graphics", "Production Management",
  "Stakeholder Management", "Cross-functional Collaboration", "Budget Planning"
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
    company: "Procter & Gamble (P&G)", 
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
    company: "INN SaiGon", 
    period: "Dec 2019 - Nov 2020",
    highlights: [
      "Directed photography production for food, product, and event projects with 30+ client accounts across hospitality, F&B, and luxury retail sectors.",
      "Managed production budgets and resource allocation for 30+ simultaneous client accounts.",
      "Implemented quality control frameworks that reduced post-production errors by 40%."
    ]
  },
  {
    role: "Regional Head of Design", 
    company: "ASIAMARINE", 
    period: "2018 - 2019",
    highlights: [
      "Led design team creating digital marketing assets, web graphics, and editorial content for Vietnam's premier luxury yacht brand.",
      "Delegated projects to junior designers while maintaining quality control and brand consistency across all touchpoints.",
      "Developed the visual identity system that defined ASIAMARINE's premium positioning in the regional marine lifestyle sector."
    ]
  },
  {
    role: "Senior Graphic Designer", 
    company: "EMG - Element Management Group", 
    period: "2017 - 2018",
    highlights: [
      "Created impactful designs for print and digital campaigns for global luxury and lifestyle brands.",
      "Expert in photo sourcing, advanced image retouching, and brand identity development.",
      "Developed production-ready artwork for offset and digital print, ensuring color accuracy across media."
    ]
  },
  {
    role: "Graphic Artist", 
    company: "Le Meridien Saigon", 
    period: "2016 - 2017",
    highlights: [
      "Created visual materials for hotel marketing campaigns and guest communications.",
      "Designed menus, promotional materials, and digital signage for the hotel.",
      "Collaborated with marketing team to maintain brand standards across all touchpoints."
    ]
  },
  {
    role: "Animation Designer", 
    company: "Adidas Sourcing", 
    period: "2015 - 2016",
    highlights: [
      "Designed animations for product showcases and marketing presentations.",
      "Created motion graphics for internal and external communications.",
      "Worked with design team to develop visual content for Adidas products."
    ]
  }
];

const PRINT_STRATEGIC_TECH = [
  { name: "P&G Hair Care eCommerce Design", tech: "Brand Strategy, Visual Identity", desc: "Led visual strategy for P&G's Hair Care portfolio across SEA, managing end-to-end design lifecycles and ensuring brand compliance across regional markets." },
  { name: "ASIAMARINE Brand Identity", tech: "Art Direction, Design Systems", desc: "Developed the visual identity system that defined ASIAMARINE's premium positioning in the regional marine lifestyle sector." },
  { name: "AI Video Production Pipeline", tech: "Creative Direction, Workflow Design", desc: "Spearheaded the transformation of video production workflows via AI and automation, achieving a 60% measurable gain in output volume." },
  { name: "INN SaiGon Production Management", tech: "Production Leadership, Budget Planning", desc: "Directed photography production for food, product, and event projects with 30+ client accounts across hospitality and luxury retail." }
];

const PRINT_COLORS = {
  primary: '#000000',
  secondary: '#333333',
  tertiary: '#666666',
  accent: '#000000',
  black: '#000000',
  white: '#FFFFFF',
  grey: '#444444',
  muted: '#666666',
  lightBg: '#f5f5f5',
  border: '#cccccc',
  sidebarBg: '#ffffff',
  sidebarBorder: '#000000',
  gradient: 'none'
};

const VndkLogo = ({ size = 60, vnColor = "#000000", dkColor = PRINT_COLORS.black }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size} fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path stroke={vnColor} d="M 15 25 L 30 45 L 45 25" />
    <path stroke={vnColor} d="M 55 45 L 55 25 L 85 45 L 85 25" />
    <path stroke={dkColor} d="M 15 55 L 30 55 A 10 10 0 0 1 30 75 L 15 75 Z" />
    <path stroke={dkColor} d="M 55 55 L 55 75 M 85 55 L 55 65 L 85 75" />
  </svg>
);

const PRINT_STYLES = {
  container: {
    width: '100%',
    maxWidth: '210mm',
    minHeight: '297mm',
    background: PRINT_COLORS.white,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: PRINT_COLORS.grey,
    margin: '0 auto',
    boxSizing: 'border-box',
    display: 'flex',
    position: 'relative',
  },
sidebar: {
    width: '75mm',
    minHeight: '297mm',
    background: PRINT_COLORS.white,
    borderRight: `2px solid ${PRINT_COLORS.black}`,
    padding: '10mm 8mm',
    display: 'flex',
    flexDirection: 'column',
    gap: '10mm',
    position: 'relative',
  },
  profileImage: {
    width: '30mm',
    height: '30mm',
    margin: '0 auto 5mm',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: '15pt',
    fontWeight: 800,
    color: PRINT_COLORS.black,
    textAlign: 'center',
    marginBottom: '1.5mm',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  title: {
    fontSize: '7pt',
    fontWeight: 600,
    color: PRINT_COLORS.grey,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    lineHeight: 1.4,
  },
  contactSection: {
    borderTop: `1px solid ${PRINT_COLORS.border}`,
    paddingTop: '5mm',
  },
  sectionLabel: {
    fontSize: '6.5pt',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: PRINT_COLORS.black,
    marginBottom: '3.5mm',
    borderBottom: `1px solid ${PRINT_COLORS.black}`,
    paddingBottom: '1.5mm',
  },
  contactItem: {
    fontSize: '6.5pt',
    color: PRINT_COLORS.grey,
    marginBottom: '1.8mm',
    wordBreak: 'break-word',
    lineHeight: 1.4,
  },
  skillTag: {
    display: 'inline-block',
    background: PRINT_COLORS.lightBg,
    border: `1px solid ${PRINT_COLORS.border}`,
    color: PRINT_COLORS.secondary,
    padding: '1.5mm 2.5mm',
    fontSize: '5.5pt',
    fontWeight: 500,
    marginBottom: '1.8mm',
    marginRight: '1.8mm',
    borderRadius: '0.5mm',
    fontFamily: "'JetBrains Mono', monospace",
  },
  profileInitial: {
    fontSize: '18pt',
    fontWeight: 700,
    color: PRINT_COLORS.primary,
  },
  sidebarAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '3mm',
    height: '100%',
    background: PRINT_COLORS.black,
  },
  mainContent: {
    flex: 1,
    padding: '10mm 10mm',
    display: 'flex',
    flexDirection: 'column',
    gap: '5mm',
  },
  mainTitle: {
    fontSize: '16pt',
    fontWeight: 800,
    color: PRINT_COLORS.primary,
    marginBottom: '2mm',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: '9pt',
    fontWeight: 600,
    color: PRINT_COLORS.grey,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '5mm',
  },
  summaryParagraph: {
    fontSize: '9pt',
    lineHeight: 1.6,
    textAlign: 'justify',
    color: PRINT_COLORS.grey,
    marginBottom: '4mm',
  },
  sectionHeading: {
    fontSize: '9pt',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: PRINT_COLORS.primary,
    paddingBottom: '2mm',
    borderBottom: `1.5px solid ${PRINT_COLORS.black}`,
    marginBottom: '5mm',
    marginTop: '1mm',
  },
  experienceItem: {
    marginBottom: '5mm',
  },
  expHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5mm',
  },
  expRole: {
    fontSize: '9pt',
    fontWeight: 700,
    color: PRINT_COLORS.primary,
    lineHeight: 1.3,
  },
  expPeriod: {
    fontSize: '6.5pt',
    fontWeight: 600,
    color: PRINT_COLORS.muted,
    fontFamily: "'JetBrains Mono', monospace",
    whiteSpace: 'nowrap',
  },
  expCompany: {
    fontSize: '7.5pt',
    fontWeight: 600,
    color: PRINT_COLORS.muted,
    marginBottom: '1.5mm',
  },
  highlightList: {
    margin: 0,
    paddingLeft: '4mm',
  },
  highlightItem: {
    fontSize: '7.5pt',
    lineHeight: 1.45,
    color: PRINT_COLORS.grey,
    marginBottom: '0.8mm',
    position: 'relative',
  },
  highlightBullet: {
    position: 'absolute',
    left: '-2.5mm',
    top: '2mm',
    width: '1.5mm',
    height: '1.5mm',
    borderRadius: '50%',
    background: PRINT_COLORS.black,
  },
  techBadge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '6.5pt',
    color: PRINT_COLORS.primary,
    background: PRINT_COLORS.lightBg,
    padding: '1mm 2mm',
    borderLeft: `2px solid ${PRINT_COLORS.black}`,
    marginTop: '2mm',
    display: 'inline-block',
  },
  projectCard: {
    padding: '2.5mm',
    marginBottom: '2.5mm',
    borderLeft: `1.5px solid ${PRINT_COLORS.black}`,
  },
  projectTitle: {
    fontSize: '7.5pt',
    fontWeight: 700,
    color: PRINT_COLORS.primary,
    marginBottom: '0.5mm',
  },
  projectDesc: {
    fontSize: '6pt',
    color: PRINT_COLORS.grey,
    lineHeight: 1.45,
    marginBottom: '1mm',
  },
  projectTech: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '5pt',
    color: PRINT_COLORS.secondary,
    padding: '0.3mm 1mm',
    display: 'inline-block',
    fontWeight: 600,
  },
  educationSection: {
    display: 'flex',
    gap: '4mm',
    alignItems: 'flex-start',
  },
  educationSchool: {
    fontSize: '8pt',
    fontWeight: 700,
    color: PRINT_COLORS.primary,
  },
  educationDegree: {
    fontSize: '7pt',
    color: PRINT_COLORS.grey,
  },
  educationPeriod: {
    fontSize: '6pt',
    color: PRINT_COLORS.muted,
    fontFamily: "'JetBrains Mono', monospace",
  },
  awardItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '3mm',
    fontSize: '7pt',
    marginTop: '3mm',
  },
  awardDot: {
    width: '2mm',
    height: '2mm',
    background: PRINT_COLORS.black,
    borderRadius: '50%',
  },
};

export default function PrintPortfolio() {
  if (!PRINT_PERSONAL_INFO) return null;

  return (
    <div style={PRINT_STYLES.container} className="print-portfolio-content">
      {/* LEFT SIDEBAR */}
      <aside style={PRINT_STYLES.sidebar}>
        <div style={PRINT_STYLES.sidebarAccent}></div>
        
        <div style={PRINT_STYLES.profileImage}>
          <div style={PRINT_STYLES.profileImage}>
            <VndkLogo size={48} />
          </div>
        </div>
        
        <div>
          <h1 style={PRINT_STYLES.name}>{PRINT_PERSONAL_INFO.name}</h1>
          <div style={PRINT_STYLES.title}>{PRINT_PERSONAL_INFO.title}</div>
        </div>

        <div style={PRINT_STYLES.contactSection}>
          <div style={PRINT_STYLES.sectionLabel}>Contact</div>
          <div style={PRINT_STYLES.contactItem}>{PRINT_PERSONAL_INFO.email}</div>
          <div style={PRINT_STYLES.contactItem}>{PRINT_PERSONAL_INFO.phone}</div>
          <div style={PRINT_STYLES.contactItem}>{PRINT_PERSONAL_INFO.location}</div>
          <div style={PRINT_STYLES.contactItem}>{PRINT_PERSONAL_INFO.linkedin}</div>
          <div style={PRINT_STYLES.contactItem}>{PRINT_PERSONAL_INFO.portfolio}</div>
        </div>

        <div>
          <div style={PRINT_STYLES.sectionLabel}>Expertise</div>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {PRINT_SKILLS.map((skill, i) => (
              <span key={i} style={PRINT_STYLES.skillTag}>{skill}</span>
            ))}
          </div>
        </div>

        <div>
          <div style={PRINT_STYLES.sectionLabel}>Education</div>
          <div style={PRINT_STYLES.educationSchool}>{PRINT_EDUCATION[0].school}</div>
          <div style={PRINT_STYLES.educationDegree}>{PRINT_EDUCATION[0].degree}</div>
          <div style={PRINT_STYLES.educationPeriod}>{PRINT_EDUCATION[0].period}</div>
        </div>

        <div style={{marginTop: 'auto'}}>
          <div style={{textAlign: 'center', opacity: 0.5}}>
            <VndkLogo size={40} />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={PRINT_STYLES.mainContent}>
        <div>
          <h1 style={PRINT_STYLES.mainTitle}>{PRINT_PERSONAL_INFO.summaryHeadline}</h1>
          <p style={PRINT_STYLES.summaryParagraph}>{PRINT_PERSONAL_INFO.summaryBody}</p>
        </div>

        <div>
          <h2 style={PRINT_STYLES.sectionHeading}>Experience Journey</h2>
          
          {PRINT_EXPERIENCES.map((exp, i) => (
            <div key={i} style={PRINT_STYLES.experienceItem}>
              <div style={PRINT_STYLES.expHeader}>
                <div>
                  <div style={PRINT_STYLES.expRole}>{exp.role}</div>
                  <div style={PRINT_STYLES.expCompany}>{exp.company}</div>
                </div>
                <div style={PRINT_STYLES.expPeriod}>{exp.period}</div>
              </div>
              <ul style={PRINT_STYLES.highlightList}>
                {exp.highlights && exp.highlights.map((h, j) => (
                  <li key={j} style={PRINT_STYLES.highlightItem}>
                    <div style={PRINT_STYLES.highlightBullet}></div>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h2 style={PRINT_STYLES.sectionHeading}>Key Projects</h2>
          {PRINT_STRATEGIC_TECH.map((proj, i) => (
            <div key={i} style={PRINT_STYLES.projectCard}>
              <div style={PRINT_STYLES.projectTitle}>{proj.name}</div>
              <div style={PRINT_STYLES.projectDesc}>{proj.desc}</div>
              <span style={PRINT_STYLES.projectTech}>{proj.tech}</span>
            </div>
          ))}
        </div>

        <div>
          <div style={PRINT_STYLES.educationSection}>
            <div style={{flex: 1}}>
              <div style={PRINT_STYLES.educationSchool}>Recognition & Awards</div>
              <div style={PRINT_STYLES.awardItem}>
                <div style={PRINT_STYLES.awardDot}></div>
                <span>P&G SEA Digital Awards - Best Digital Campaign, 2024</span>
              </div>
              <div style={PRINT_STYLES.awardItem}>
                <div style={PRINT_STYLES.awardDot}></div>
                <span>RMIT Student Showcase - Best Artistic Work: Hyper-realistic Hand-drawing</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 'auto',
          paddingTop: '3mm',
          borderTop: `1px solid ${PRINT_COLORS.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{fontSize: '5.5pt', color: PRINT_COLORS.muted}}>
            {PRINT_PERSONAL_INFO.email} • {PRINT_PERSONAL_INFO.phone}
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '1.5mm'}}>
            <VndkLogo size={14} />
            <span style={{fontSize: '5.5pt', fontWeight: 700, color: PRINT_COLORS.black}}>KHOA.VO</span>
          </div>
        </div>
      </main>
    </div>
  );
}