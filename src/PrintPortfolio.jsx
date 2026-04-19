import React from 'react';

const PERSONAL_INFO = {
  name: "VO NGUYEN DANG KHOA",
  title: "AI CREATIVE LEAD & SOFTWARE DEVELOPER",
  dob: "19/01/1993",
  nationality: "Vietnam",
  marital: "Married",
  gender: "Male",
  phone: "0398300340",
  email: "vonguyendangkhoa@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  linkedin: "linkedin.com/in/khoavo",
  portfolio: "cv.khoavo.myds.me",
  github: "git.khoavo.myds.me/vndangkhoa",
  summary: "Highly accomplished Creative Leader bridging the gap between artistic direction and high-performance software engineering. With over 9+ years managing brand strategies and digital design, I evaluate and execute technology-driven projects from concept to production. Specialized in merging traditional creative direction with cutting-edge generative AI workflows (ComfyUI, FLUX) and full-stack development (Go, React)."
};

const EDUCATION = [
  {
    period: "12/2012 - 06/2016",
    school: "RMIT Vietnam",
    degree: "Bachelor of Multimedia System Design (Graduated with Excellence)"
  }
];

const SKILLS = [
  { category: "Creative & AI Tools", items: "Adobe Creative Suite (Ps, Ai, Id, Pr), ComfyUI, Stable Diffusion, FLUX, Ollama, 3D Animation, Motion Graphics" },
  { category: "Development Stack", items: "React, Next.js, Go (Gin), Rust (Axum), Python (FastAPI), TypeScript, Tailwind CSS" },
  { category: "Infrastructure", items: "Docker, SQLite, Synology NAS Deployment, HLS Video Streaming" },
  { category: "Leadership", items: "Cross-Functional Management, Creative Strategy, Technical Mentorship, Process Optimization" }
];

const EXPERIENCES = [
  {
    role: "AI Creative Lead", company: "Phibious Viet Nam", period: "06/2024 - Present",
    highlights: [
      "Manage highly complex, technology-driven creative projects, merging traditional design with advanced generative AI models and data analytics.",
      "Deploy and utilize ComfyUI, Stable Diffusion, FLUX, and local LLMs (Ollama, LM Studio) to augment design workflows and drive overarching agency strategies.",
      "Lead cross-functional collaboration between traditional designers, copywriters, and data analysts to ensure measurable campaign performance.",
      "Optimize internal design processes by integrating advanced image generation pipelines into daily operations.",
      "Train and mentor the broader agency (including interns) on core AI design competencies and prompt engineering."
    ]
  },
  {
    role: "eCOM Design Lead", company: "Procter & Gamble (P&G) Vietnam", period: "09/2023 - 06/2025",
    highlights: [
      "Spearheaded strategic design concepts and visual strategies for e-commerce, directly impacting consumer engagement and online sales for Hair Care brands.",
      "Managed end-to-end medium-to-large design projects, actively improving internal design processes and ensuring strict corporate standard compliance.",
      "Collaborated globally across functional geographic boundaries and cross-functional teams to deliver cohesive brand stories."
    ]
  },
  {
    role: "ECOM Graphic Designer (ABM)", company: "P&G Viet Nam", period: "11/2020 - 09/2023",
    highlights: [
      "Built concepts and executed visual strategy across vast consumer touchpoints including packaging, eCommerce, and social media under the Hair Care Packaging Design Studio.",
      "Leveraged hands-on design mastery to craft illustrations and brand expressions that consistently met high commercial demands.",
      "Ensured brand guidelines and directives were embraced consistently and creatively across all regional platforms."
    ]
  },
  {
    role: "Production Creative Lead", company: "Inn Saigon", period: "12/2019 - 11/2020",
    highlights: [
      "Led the photography and production team, setting the standard for internal branding deliverables (Food, Product, Events).",
      "Managed project budgets, retouching workflows, and cross-team communications to deliver high-volume outcomes.",
      "Conducted frequent feedback sessions to boost performance and facilitate the development of team members."
    ]
  },
  {
    role: "Regional Head of Design", company: "ASIAMARINE", period: "12/2018 - 12/2019",
    highlights: [
      "Supervised all creation of concepts and layouts across digital/offline marketing for luxury marine sectors.",
      "Managed independent contractors and junior designers, leveraging creative marketing to develop targeted campaigns."
    ]
  },
  {
    role: "Senior Graphic Designer", company: "EMG", period: "12/2017 - 12/2018",
    highlights: [
      "Created outstanding digital and print designs, managing corporate identity, merchandise, and digital displays.",
      "Assisted with concept proposals to clients including mockup preparations and asset sourcing."
    ]
  },
  {
    role: "Graphic Artist", company: "Le Meridien Saigon", period: "12/2016 - 12/2017",
    highlights: [
      "Designed and executed all promotional collateral according to strict Le Meridien brand identity guidelines.",
      "Liaised with external suppliers to ensure creative print quality and deadlines were consistently met."
    ]
  },
  {
    role: "Animation Designer", company: "Adidas Group", period: "06/2016 - 12/2016",
    highlights: [
      "Developed graphics and animations for production environment simulations (Line Balancing, One Pair Flow).",
      "Compiled and edited video infographics for visual training purposes."
    ]
  }
];

const IT_PROJECTS = [
  { name: "KV-Tube", tech: "Go (Gin), Next.js, SQLite, Docker, HLS.js", desc: "YouTube-like video streaming platform with HLS support, subscriptions, and Synology NAS deployment." },
  { name: "Spotify Clone", tech: "React, Rust (Axum), YouTube API", desc: "Full-featured music player with real-time lyrics and custom playlists." },
  { name: "APIx (kv-pix)", tech: "Next.js 14, TypeScript, Prisma", desc: "AI Image Generator powered by multiple providers (Grok, Meta, Whisk)." }
];

const REFERENCES = [
  { name: "Dung Bui", title: "Senior Manager", company: "Adidas Group", contact: "dung.bui@adidas-group.com" },
  { name: "Wouter Pasman", title: "Graphic Designer", company: "FreshStudio.vn", contact: "0908074383" },
  { name: "Tran Nhuan Vu", title: "Marketing Mgr", company: "Element Mgmt", contact: "Vu.tran@element.vn" }
];

const s = {
  pageContainer: {
    width: '210mm',
    padding: '14mm 16mm',
    background: '#ffffff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: '#000000',
    fontSize: '9pt',
    lineHeight: '1.5',
    margin: '0 auto',
  },
  header: {
    borderBottom: '2px solid #000',
    paddingBottom: '4mm',
    marginBottom: '4mm',
  },
  name: {
    fontSize: '25pt',
    fontWeight: 900,
    letterSpacing: '-0.02em',
    margin: '0 0 4px 0',
    lineHeight: '1',
  },
  title: {
    fontSize: '11pt',
    fontWeight: 600,
    color: '#333',
    margin: '0 0 4mm 0',
    letterSpacing: '0.05em',
  },
  infoGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '3mm 8mm',
    fontSize: '8pt',
    color: '#444',
  },
  sectionTitle: {
    fontSize: '11pt',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid #ccc',
    paddingBottom: '1.5mm',
    margin: '5mm 0 3mm 0',
    color: '#000',
  },
  summary: {
    fontSize: '9pt',
    lineHeight: '1.5',
    margin: '0 0 4mm 0',
    textAlign: 'justify',
  },
  skillGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2mm 5mm',
    marginBottom: '3mm',
  },
  experienceItem: {
    marginBottom: '4mm',
  },
  expHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '1.5mm',
  },
  expRole: {
    fontSize: '10pt',
    fontWeight: 700,
    margin: 0,
  },
  expCompany: {
    fontWeight: 600,
    color: '#333',
  },
  expPeriod: {
    fontSize: '8pt',
    color: '#555',
    fontWeight: 600,
  },
  expList: {
    margin: '0',
    paddingLeft: '5mm',
  },
  expBullet: {
    marginBottom: '1mm',
    textAlign: 'justify',
  },
  projectItem: {
    marginBottom: '2.5mm',
  },
  projectHeader: {
    fontWeight: 700,
    fontSize: '9.5pt',
  },
  projectTech: {
    fontSize: '7.5pt',
    color: '#555',
    fontFamily: 'monospace',
    marginLeft: '2mm',
  },
  refGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '8pt',
    marginTop: '2mm',
  }
};

export default function PrintPortfolio() {
  return (
    <div style={s.pageContainer}>
      
      {/* HEADER SECTION */}
      <div style={s.header}>
        <h1 style={s.name}>{PERSONAL_INFO.name}</h1>
        <div style={s.title}>{PERSONAL_INFO.title}</div>
        <div style={s.infoGrid}>
          <span><strong>Email:</strong> {PERSONAL_INFO.email}</span>
          <span><strong>Phone:</strong> {PERSONAL_INFO.phone}</span>
          <span><strong>Location:</strong> {PERSONAL_INFO.location}</span>
          <span><strong>Portfolio:</strong> {PERSONAL_INFO.portfolio}</span>
          <span><strong>GitHub:</strong> {PERSONAL_INFO.github}</span>
          <span><strong>DOB:</strong> {PERSONAL_INFO.dob}</span>
        </div>
      </div>

      {/* SUMMARY */}
      <p style={s.summary}>{PERSONAL_INFO.summary}</p>

      {/* SKILLS */}
      <h2 style={s.sectionTitle}>Core Competencies</h2>
      <div style={s.skillGrid}>
        {SKILLS.map((skill, idx) => (
          <div key={idx}>
            <strong style={{display: 'block', fontSize: '9pt', marginBottom: '1mm'}}>{skill.category}</strong>
            <span style={{fontSize: '8.5pt', color: '#333'}}>{skill.items}</span>
          </div>
        ))}
      </div>

      {/* EXPERIENCE */}
      <h2 style={s.sectionTitle}>Work Experience</h2>
      <div>
        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} style={s.experienceItem}>
            <div style={s.expHeader}>
              <h3 style={s.expRole}>{exp.role} <span style={{fontWeight: 400}}>at</span> <span style={s.expCompany}>{exp.company}</span></h3>
              <span style={s.expPeriod}>{exp.period}</span>
            </div>
            <ul style={s.expList}>
              {exp.highlights.map((bullet, bIdx) => (
                <li key={bIdx} style={s.expBullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* SOFTWARE PROJECTS */}
      <h2 style={s.sectionTitle}>Software Engineering Projects</h2>
      <div>
        {IT_PROJECTS.map((proj, idx) => (
          <div key={idx} style={s.projectItem}>
            <span style={s.projectHeader}>{proj.name}</span>
            <span style={s.projectTech}>[{proj.tech}]</span>
            <span style={{display: 'block', fontSize: '8.5pt', color: '#333', marginTop: '1mm'}}>{proj.desc}</span>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <h2 style={s.sectionTitle}>Education</h2>
      <div style={{marginBottom: '6mm'}}>
        {EDUCATION.map((edu, idx) => (
          <div key={idx} style={{display: 'flex', justifyContent: 'space-between'}}>
            <strong>{edu.school}</strong>
            <span>{edu.degree}</span>
            <span style={s.expPeriod}>{edu.period}</span>
          </div>
        ))}
      </div>

      {/* REFERENCES */}
      <h2 style={s.sectionTitle}>References</h2>
      <div style={s.refGrid}>
        {REFERENCES.map((ref, idx) => (
          <div key={idx}>
            <strong>{ref.name}</strong><br/>
            <span style={{color: '#555'}}>{ref.title}, {ref.company}</span><br/>
            <span>{ref.contact}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
