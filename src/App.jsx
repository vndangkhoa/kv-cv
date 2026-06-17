import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  Terminal, Code, Database, Cloud, Cpu, Mail, Phone, 
  ExternalLink, Github, Linkedin, Download, Eye,
  ChevronRight, ArrowLeft, Layers, Sparkles, Briefcase,
  Zap, Globe, Palette, Monitor, Server, Terminal as TerminalIcon,
  Folder, FileText, Code2, User, X, Square, Maximize2,
  Sun, Moon
} from 'lucide-react';
import PrintPortfolio from './PrintPortfolio';
import { usePortfolioPosts, transformToProject } from './hooks/usePortfolioPosts';
import './print.css';

// --- SHARED DATA ---
const PERSONAL_INFO = {
  name: "Vo Nguyen Dang Khoa",
  phone: "0398300340",
  email: "vonguyendangkhoa@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  linkedin: "https://www.linkedin.com/in/khoa-vo-76291236/",
  portfolio: "https://khoavo.myds.me/",
  github: "https://git.khoavo.myds.me/vndangkhoa"
};

// --- CREATIVE PERSONA DATA ---
const CREATIVE_DATA = {
  title: "Creative & Design Manager",
  summary: "Creative and design leader with 9+ years of experience building high-impact visual strategies across Southeast Asia. Proven track record in leading cross-functional creative teams, managing end-to-end production workflows, and driving digital brand transformation across eCommerce, editorial, and omnichannel retail.\n\nPassionate about integrating AI-powered tools into creative pipelines to enhance efficiency and scale output while maintaining brand consistency.",
  tagline: "Design Leadership & Visual Strategy",
  skills: [
    { category: "AI & Generative Design", items: ["ComfyUI", "Stable Diffusion", "FLUX", "Midjourney", "RunwayML", "Ollama", "LM Studio", "LoRA Training", "ControlNet", "IP-Adapter"] },
    { category: "Design & Creative Tools", items: ["Adobe Creative Suite", "Figma", "After Effects", "Premiere Pro", "Cinema 4D", "Blender", "Photoshop", "Illustrator", "InDesign"] },
    { category: "Motion & Animation", items: ["Motion Graphics", "3D Animation", "Kinetic Typography", "Visual Effects", "Character Animation", "Storyboarding"] },
    { category: "Brand & Strategy", items: ["Brand Identity", "Art Direction", "Visual Storytelling", "Editorial Design", "Packaging Design", "Strategic Design"] }
  ],
  projects: [
    {
      id: 1, 
      title: "FASHION Pipeline: Ideas 2 Execution", 
      category: "AI Video Creation",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2026/04/Gemini_Generated_Image_vmk4e2vmk4e2vmk4-1-scaled.png",
      description: "End-to-end AI fashion workflow from concept to video. Ideas -> System prompt instructions -> Scale up structures for repeatable production. Building a complete creative pipeline.",
      link: "https://portfolio.khoavo.myds.me/2026/04/25/fashion-pipeline-ideas-2-execution/",
      year: "2026"
    },
    {
      id: 2, 
      title: "The Language of Poetry & Literature", 
      category: "AI Generated Art",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2025/08/i2i_1756355661_62547902.png",
      description: "Exploring the ethereal boundary between reality and imagination through AI-generated visuals. Capturing the feeling of looking through glass — that quiet distance between the outside world and the person inside.",
      link: "https://portfolio.khoavo.myds.me/2025/08/28/the-language-of-poetry-and-literature/",
      year: "2025"
    },
    {
      id: 3, 
      title: "Evolving My AI Art Workflow: Better Control", 
      category: "AI Generated Art",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2025/08/537657171_24322581567428756_3673426611845520713_n.jpg",
      description: "Iterating on AI image generation process with new combinations for precise control over final output, particularly when training LoRA models for consistent character generation.",
      link: "https://portfolio.khoavo.myds.me/2025/08/27/evolving-my-ai-art-workflow-tweaking-for-better-control/",
      year: "2025"
    },
    {
      id: 4, 
      title: "Delux Perfume – Fineline 2025 Launch", 
      category: "AI Branding & Video",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2025/08/Delux-Perfume_red.png",
      description: "End-to-end creative strategy and art direction for premium perfume launch. From AI-generated mood boards and product visuals to cinematic video production for Southeast Asia market.",
      link: "https://portfolio.khoavo.myds.me/2025/08/11/giving-art-direction-to-a-brand-a-case-study/",
      year: "2025"
    },
    {
      id: 5, 
      title: "Behind the Prompt – AI Video Creation", 
      category: "AI Video Creation",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2025/07/94afe9e65b1ceeee.jpg",
      description: "Creating Apple-style AI advert entirely from text prompt. Journey into AI video creation - ever wondered how a skincare commercial can be made entirely from a single structured prompt?",
      link: "https://portfolio.khoavo.myds.me/2025/07/31/%f0%9f%8c%b8%e2%9c%a8-behind-the-prompt-my-journey-into-ai-video-creation-%e2%9c%a8%f0%9f%8c%b8/",
      year: "2025"
    },
    {
      id: 6, 
      title: "AI Studio Photography", 
      category: "AI-Generated Branding",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2025/07/img_0317.jpg",
      description: "Revolutionary approach to professional studio photography using AI. ComfyUI workflows with custom LoRA to generate studio-quality product and portrait images, reducing production costs by 70%.",
      link: "https://portfolio.khoavo.myds.me/2025/07/27/%F0%9F%A7%A0%F0%9F%93%B8-ai-studio-i-can-do-that-too/",
      year: "2025"
    },
    {
      id: 7, 
      title: "A Photo with Feeling is Hard", 
      category: "AI Generated Art",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2025/07/img_0327-1.png",
      description: "When people see your work, they don't ask what prompt you used. They ask: Why does this FEEL different? Exploring the emotional depth in AI-generated imagery.",
      link: "https://portfolio.khoavo.myds.me/2025/07/27/%e2%9c%a8-a-beautiful-photo-is-easy-a-photo-with-feeling-is-hard/",
      year: "2025"
    },
    {
      id: 8, 
      title: "NAVIGATOR – ASIAMARINE Magazine", 
      category: "Editorial Design",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2020/10/navigator-vol1_page_001.webp",
      description: "Complete editorial design for Vietnam's premier yacht market publication. Art direction, layout design, and visual storytelling for a luxury marine sector brand.",
      link: "https://portfolio.khoavo.myds.me/2020/10/20/navigator/",
      year: "2020"
    },
    {
      id: 9, 
      title: "Skyxx – Animated Poster Series", 
      category: "Motion Graphics",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2019/04/aash-3-scaled.jpg",
      description: "Award-winning weekly animated poster series for entertainment events. Dynamic motion graphics with 3D elements under tight deadlines.",
      link: "https://portfolio.khoavo.myds.me/2019/02/17/skyxx-poster-animation/",
      year: "2019"
    },
    {
      id: 10, 
      title: "PetroVietnam – PCT Corporate Identity", 
      category: "Brand Identity & 3D",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2017/04/cip_mockup2.png",
      description: "Comprehensive corporate identity for PetroVietnam Transportation. 3D vehicle visualization, logo design, stationery system, and POSM materials.",
      link: "https://portfolio.khoavo.myds.me/2017/04/10/petrovietnam-pct/",
      year: "2017"
    }
  ],
  experience: [
    { 
      role: "AI CREATIVE LEAD", 
      company: "Phibious Vietnam", 
      period: "2025 - Present",
      location: "Ho Chi Minh City, Vietnam",
      highlights: [
        "Spearheaded the transformation of video production workflows via AI and automation, achieving a 60% measurable gain in output volume across all regional campaigns.",
        "Acted as a creative multiplier, leading regional stakeholders and cross-functional teams (marketing, digital, and creative) to automate end-to-end content lifecycles from concept to delivery.",
        "Designed and deployed Agentic AI systems and custom frameworks for rapid concept-to-video prototyping, serving global Fortune 500 brands including premium beauty, fashion, and consumer goods sectors.",
        "Standardized end-to-end AI video production SOPs—ranging from AI-led scripting and storyboarding to automated localization—ensuring brand compliance across Southeast Asian markets.",
        "Drove Regional Enablement by establishing SOPs and mentoring 20+ producers on prompt engineering, AI ethics, and workflow standardization.",
        "Pioneered the integration of ComfyUI, FLUX, and Stable Diffusion into traditional creative workflows, reducing concept-to-execution time by 70%.",
        "Collaborated with international creative directors to translate brand visions into AI-augmented visual narratives that maintain emotional authenticity while achieving production scale."
      ]
    },
    { 
      role: "ECOMMERCE DESIGN LEAD", 
      company: "Procter & Gamble (P&G)", 
      period: "2020 - 2025",
      location: "Ho Chi Minh City, Vietnam",
      highlights: [
        "Led visual strategy for eCommerce platforms across Hair Care category (Head & Shoulders, Pantene, Clear), directly impacting millions of consumers in Southeast Asia through digital shelf optimization.",
        "Managed end-to-end design projects from concept to execution, aligning with global marketing strategies while adapting for local market nuances across 6 SEA markets.",
        "Spearheaded the digital transformation of brand assets for omnichannel retail experiences, bridging the gap between physical retail and D2C eCommerce touchpoints.",
        "Collaborated with global brand teams to localize and scale omnichannel retail experiences for P&G's premium beauty portfolio.",
        "Mentored junior designers and established design standards adopted across the regional team, creating a unified visual language for SEA markets.",
        "Led the development of modular design systems enabling 3x faster content adaptation for new product launches across markets.",
        "Pioneered data-informed creative approaches, using consumer insights to drive visual decisions that increased conversion rates by measurable percentages."
      ]
    },
    { 
      role: "PRODUCTION CREATIVE LEAD", 
      company: "INN SaiGon", 
      period: "Dec 2019 - Nov 2020",
      location: "Ho Chi Minh City, Vietnam",
      highlights: [
        "Directed photography production for food, product, and event projects with 30+ client accounts across hospitality, F&B, and luxury retail sectors.",
        "Established comprehensive brand guidelines and visual standards ensuring consistency across all client deliverables.",
        "Optimized post-production workflows using advanced retouching techniques and batch processing, reducing turnaround time by 40%.",
        "Built and managed a multi-disciplinary team of photographers, stylists, and retouchers for high-profile shoots.",
        "Implemented quality control frameworks that reduced post-production errors by 40%, improving client satisfaction scores.",
        "Developed innovative lighting and styling approaches that became signature INN aesthetics for premium hospitality campaigns."
      ]
    },
    { 
      role: "REGIONAL HEAD OF DESIGN", 
      company: "ASIAMARINE", 
      period: "2018 - 2019",
      location: "Ho Chi Minh City, Vietnam",
      highlights: [
        "Led design team creating digital marketing assets, web graphics, and editorial content for Vietnam's premier luxury yacht brand.",
        "Delegated projects to junior designers while maintaining quality control and brand consistency across all touchpoints.",
        "Collaborated with international teams to localize content for Asian markets, adapting luxury messaging for cultural resonance.",
        "Created multi-channel visual campaigns spanning print, digital, and event activations that elevated ASIAMARINE's regional presence.",
        "Developed the visual identity system that defined ASIAMARINE's premium positioning in the for regional marine lifestyle sector."
      ]
    },
    { 
      role: "SENIOR GRAPHIC DESIGNER", 
      company: "EMG - Element Management Group", 
      period: "2017 - 2018",
      location: "Ho Chi Minh City, Vietnam",
      highlights: [
        "Created impactful designs for print and digital campaigns for global luxury and lifestyle brands including hospitality, automotive, and premium retail.",
        "Expert in photo sourcing, advanced image retouching, and brand identity development for both regional and international clients.",
        "Delivered corporate identity packages for multinational clients seekingVietnam market entry.",
        "Collaborated with international creative directors to adapt global campaigns for local market sensibilities.",
        "Developed production-ready artwork for offset and digital print, ensuring color accuracy across media."
      ]
    }
  ]
};

// --- IT PERSONA DATA ---
const IT_DATA = {
  title: "Full-Stack Developer & DevOps",
  summary: "14-month intensive coding journey from zero to production. Built 10+ deployed applications including video streaming platforms, AI tools, and media players. Proficient in modern web frameworks, containerization, and cloud deployment. Self-taught developer with a creative background bringing unique problem-solving perspective.",
  journey: [
    { month: "MAY '24", title: "The Spark", description: "First deep dive into Next.js. Abandoned manual CSS for Tailwind efficiency." },
    { month: "JUL '24", title: "First Production App", description: "Built apix AI image generator with multi-provider support (Google Whisk, Meta AI, Grok)." },
    { month: "SEP '24", title: "Full-Stack Mastery", description: "Created KV-Tube YouTube platform with Go backend + Next.js. Dockerized for Synology NAS." },
    { month: "NOV '24", title: "The AI Pivot", description: "Fully embraced AI coding. Cursor and v0 became primary development engine." },
    { month: "DEC '24", title: "Rust Exploration", description: "Built Spotify clone with Rust Axum backend. Advanced system architecture." },
    { month: "MAR '25", title: "Netflix Clone", description: "Built kv-netflix Android TV + Web app with Kotlin Multiplatform." },
    { month: "PRESENT", title: "Vibe Ascended", description: "Building complex apps through high-level prompting and intuition." }
  ],
  skills: {
    languages: ["TypeScript", "JavaScript", "Go", "Rust", "Python", "Kotlin", "HTML/CSS", "SQL"],
    frontend: ["React", "Next.js", "Vite", "Tailwind CSS", "Shadcn", "Framer Motion", "Zustand", "PWA", "Jetpack Compose"],
    backend: ["Node.js", "Go (Gin)", "Rust (Axum)", "Express", "REST APIs", "WebSocket", "Ktor"],
    ai: ["LLM Integration", "Cursor AI", "v0", "Replit AI", "Ollama", "Prompt Engineering", "Multi-Provider AI APIs", "ComfyUI"],
    devops: ["Docker", "Docker Compose", "GitHub Actions", "Forgejo CI/CD", "Synology NAS", "Nginx", "SQLite", "Git"],
    tools: ["Git", "VS Code", "Figma", "Postman", "MongoDB", "Prisma", "ffmpeg", "Android Studio"]
  },
  projects: [
    {
      name: "kv-netflix",
      description: "StreamFlow Netflix - Android TV + Web App built with Kotlin Multiplatform. Movie streaming with trailer preview, custom playlists, and offline download support.",
      tech: ["Kotlin", "Compose Multiplatform", "Android TV", "Web", "PWA"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-netflix"
    },
    {
      name: "kv-tube",
      description: "YouTube-like video streaming platform with HLS support, subscriptions, watch history, comments, and PWA. Deployed on Synology NAS via Docker.",
      tech: ["Go (Gin)", "Next.js", "TypeScript", "SQLite", "Docker", "HLS.js", "PWA"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-tube"
    },
    {
      name: "spotify-clone",
      description: "Full-featured Spotify-like music player with YouTube Music integration, real-time lyrics, custom playlists, and PWA support.",
      tech: ["React (Vite)", "Rust (Axum)", "TailwindCSS", "YouTube API", "PWA"],
      github: "https://git.khoavo.myds.me/vndangkhoa/spotify-clone"
    },
    {
      name: "neko",
      description: "Go-based media server with streaming capabilities and user management. Deployed on NAS.",
      tech: ["Go", "SQLite", "Docker", "HLS"],
      github: "https://git.khoavo.myds.me/vndangkhoa/neko"
    },
    {
      name: "kv-download",
      description: "Universal video downloader API supporting multiple platforms with batch processing.",
      tech: ["Go", "yt-dlp", "Docker"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-download"
    },
    {
      name: "kv-tiktok-download",
      description: "Douyin/TikTok video download API with batch processing, watermarks removal, and metadata extraction.",
      tech: ["Python", "FastAPI", "yt-dlp"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-tiktok-download"
    },
    {
      name: "apix",
      description: "AI Image Generator powered by Google Whisk, Meta AI, and Grok. Multi-provider support with prompt library and history.",
      tech: ["Next.js 14", "TypeScript", "Tailwind", "Zustand", "Docker"],
      github: "https://git.khoavo.myds.me/vndangkhoa/apix"
    },
    {
      name: "kv-cv",
      description: "This terminal-style interactive resume with retro desktop UI and draggable windows.",
      tech: ["React", "Vite", "Tailwind", "Framer Motion", "TypeScript"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-cv"
    }
  ],
  experience: [
    { role: "Creative Technology", company: "Phibious Vietnam", period: "2025 - Present", highlights: ["Bridge between creative and technical teams", "Develop interactive prototypes and AI-powered tools", "Automate creative workflows with custom scripts", "Build internal tools for design team productivity", "Deploy AI apps on enterprise infrastructure"] },
    { role: "Freelance Developer", company: "Self-Employed", period: "2024 - Present", highlights: ["Built 10+ production web applications deployed on cloud and NAS", "Integrated AI capabilities (image generation, video processing) into client solutions", "Implemented CI/CD pipelines with GitHub/Forgejo Actions", "Dockerized applications for easy deployment on various platforms"] }
  ],
  github: "https://git.khoavo.myds.me/vndangkhoa",
  forgejo: "https://git.khoavo.myds.me/vndangkhoa"
};

// --- COMPONENTS ---

const VndkLogo = ({ size = 36, vnColor = "#1A1A1A", dkColor = "#00FF94", className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size} fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path stroke={vnColor} d="M 15 25 L 30 45 L 45 25" />
    <path stroke={vnColor} d="M 55 45 L 55 25 L 85 45 L 85 25" />
    <path stroke={dkColor} d="M 15 55 L 30 55 A 10 10 0 0 1 30 75 L 15 75 Z" />
    <path stroke={dkColor} d="M 55 55 L 55 75 M 85 55 L 55 65 L 85 75" />
  </svg>
);

// 1. LANDING PAGE - Simmonds Ltd Style
const LandingPage = ({ onSelect, darkMode, toggleTheme }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]"
    >
      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-[100] p-2.5 md:p-3 rounded-full border border-[var(--border)] opacity-40 hover:opacity-100 transition-all hover:scale-110"
        title={darkMode ? "Light mode" : "Dark mode"}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Simmonds Ltd Inspired Grid Structure */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal Lines */}
        <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-[var(--grid-color)]" />
        <div className="absolute top-[80%] left-0 right-0 h-[1px] bg-[var(--grid-color)]" />
        
        {/* Vertical Lines - 4 Column Structure (Simplified on mobile) */}
        <div className="absolute left-[25%] md:left-[25%] top-0 bottom-0 w-[1px] bg-[var(--grid-color)]" />
        {!isMobile && <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-[var(--grid-color)]" />}
        <div className="absolute left-[75%] md:left-[75%] top-0 bottom-0 w-[1px] bg-[var(--grid-color)]" />
        
        {/* Subtle Dots at Intersections */}
        {[20, 80].map(y => (isMobile ? [25, 75] : [25, 50, 75]).map(x => (
          <div 
            key={`${x}-${y}`}
            className="absolute w-1 h-1 bg-[var(--text-muted)] opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        )))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl w-full text-center"
        >
          {/* Logo Section */}
          <motion.div 
            className="mb-8 md:mb-12 flex justify-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <VndkLogo size={isMobile ? 100 : 140} vnColor={darkMode ? "#FFFFFF" : "#1A1A1A"} dkColor="#00FF94" className="drop-shadow-sm" />
          </motion.div>
          
          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[10px] md:text-sm font-creative-sans tracking-[0.3em] md:tracking-[0.4em] uppercase mb-12 md:mb-16 px-4"
          >
            where design meets intelligence
          </motion.p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24">
            <motion.button
              onClick={() => onSelect('creative')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="group relative"
            >
              <span className="text-xs md:text-sm font-display font-bold tracking-[0.2em] uppercase transition-colors group-hover:text-[var(--text-muted)]">
                Creative Portfolio
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[var(--text-primary)] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>

            <motion.button
              onClick={() => onSelect('it')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="group relative"
            >
              <span className="text-xs md:text-sm font-display font-bold tracking-[0.2em] uppercase transition-colors group-hover:text-[var(--accent-it)]">
                IT Portfolio
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[var(--accent-it)] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Floating Meta Information */}
      <div className="absolute bottom-6 md:bottom-8 left-6 right-6 md:left-8 md:right-8 flex justify-between items-end">
        <div className="text-[8px] md:text-[10px] font-creative-sans tracking-widest opacity-30 uppercase text-left leading-relaxed">
          Art Direction<br />AI Engineering<br />Full Stack Dev
        </div>
        <div className="text-[8px] md:text-[10px] font-creative-sans tracking-widest opacity-30 uppercase text-right leading-relaxed">
          Based in HCMC<br />Vietnam<br />© 2026
        </div>
      </div>
    </motion.div>
  );
};

const CreativeLoader = ({ onComplete }) => {
  const preRef = useRef(null);

  useEffect(() => {
    // Dynamic grid size based on viewport
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cols = Math.floor(w / 8) + 5; 
    const rows = Math.floor(h / 10) + 5;
    
    let time = 0;
    
    const generateGrid = () => {
      time += 0.08;
      let str = '';
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // 2D wave interference (pseudo-Perlin noise)
          const noise = 
            Math.sin(x * 0.05 + time) + 
            Math.cos(y * 0.05 + time * 0.8) + 
            Math.sin((x + y) * 0.05 + time * 1.2);
            
          if (noise > 1.5) str += 'V';
          else if (noise > 0.8) str += 'N';
          else if (noise > 0.2) str += 'D';
          else if (noise > -0.2) str += 'K';
          else if (noise > -0.8) str += '→';
          else if (noise > -1.2) str += '←';
          else if (noise > -1.8) str += '↑';
          else str += '↓';
        }
        str += '\n';
      }
      return str;
    };

    const interval = setInterval(() => {
      if (preRef.current) {
        preRef.current.textContent = generateGrid();
      }
    }, 50);

    const timer = setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, 5000); // 5.0s loader

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[200] bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden"
    >
      <pre 
        ref={preRef}
        className="text-[var(--text-primary)] font-creative-sans font-bold italic text-[10px] md:text-xs leading-[10px] md:leading-[12px] opacity-30 select-none whitespace-pre transform scale-110"
        style={{ letterSpacing: '0.15em' }}
      >
      </pre>

      {/* Skip Button */}
      <button 
        onClick={onComplete}
        className="absolute bottom-8 right-8 z-[210] flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-primary)] opacity-50 hover:opacity-100 transition-opacity bg-[var(--bg-secondary)] px-4 py-2 backdrop-blur-sm rounded"
      >
        Click to Skip <span className="opacity-50">→</span>
      </button>
    </motion.div>
  );
};

const TerminalBootLoader = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const bootSequence = [
    "INIT SYSTEM KHOA.VO...",
    "MOUNTING VIRTUAL DOM [OK]",
    "LOADING REACT ROOT [OK]",
    "ESTABLISHING AI SUBSYSTEMS...",
    "AI SUBSYSTEMS [ONLINE]",
    "BYPASSING SECURITY PROTOCOLS...",
    "ACCESS GRANTED."
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 180);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.6, ease: "easeIn" } }}
      className="fixed inset-0 z-[200] bg-[#0a0a0a] text-[#00FF94] font-mono p-6 md:p-12 flex flex-col justify-end pb-24"
    >
      <div className="space-y-2 opacity-80 text-sm md:text-base">
        {logs.map((log, i) => (
          <div key={i}>&gt; {log}</div>
        ))}
        {logs.length < bootSequence.length && <div className="animate-pulse">&gt; ▋</div>}
      </div>
    </motion.div>
  );
};

// 2. CREATIVE SIDE - Editorial Gallery
const CreativeSide = ({ onBack, onSwitch, darkMode, toggleTheme }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef(null);
  const { posts: portfolioPosts, loading: portfolioLoading } = usePortfolioPosts({ perPage: 12 });
  
  const projects = portfolioPosts.map(transformToProject);

  const bgClass = "bg-[var(--bg-primary)]";
  const textClass = "text-[var(--text-primary)]";
  const subTextClass = "text-[var(--text-secondary)]";
  const borderClass = "border-[var(--border)]";

  // Scroll progress (0 to 1)
  const getScrollProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    return maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 400);
      setIsScrolling(true);
      
      // Clear existing timer
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      
      // Hide letters after 150ms of no scroll
      scrollTimerRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!activeProject || projects.length === 0) return;
    const currentIndex = projects.findIndex(p => p.id === activeProject.id);
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveProject(null);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const nextIndex = (currentIndex + 1) % projects.length;
        setActiveProject(projects[nextIndex]);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
        setActiveProject(projects[prevIndex]);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, projects]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isLoading || portfolioLoading) return;
    const timer = setTimeout(() => {
      setVisibleProjects(projects.map(p => p.id));
    }, 500);
    return () => clearTimeout(timer);
  }, [isLoading, portfolioLoading, projects]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <CreativeLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`min-h-screen ${bgClass} ${textClass}`}
      >
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${bgClass}/90 backdrop-blur-sm border-b ${borderClass}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className={`p-2 flex items-center gap-1.5 text-sm md:text-base ${subTextClass} hover:${textClass} transition-colors`}>
            <ArrowLeft size={18} /> <span className="hidden md:inline">Back</span>
          </button>
          
          {/* Logo */}
          <div className="flex items-center justify-center">
            <VndkLogo size={36} vnColor={darkMode ? "#FFFFFF" : "#1A1A1A"} dkColor="#00FF94" />
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => window.print()} className="px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest bg-[#00FF94] text-black border border-[#00FF94] rounded-full hover:opacity-80 transition-opacity flex items-center gap-2 font-medium">
              <Download size={14} />
              <span className="hidden md:inline">Download CV</span>
              <span className="md:hidden">CV</span>
            </button>
            <button onClick={onSwitch} className={`px-4 py-2 text-[10px] md:text-xs rounded-full transition-colors flex items-center gap-2 ${darkMode ? 'bg-white text-black hover:bg-white/80' : 'bg-[#1A1A1A] text-white hover:bg-black'}`}>
              <Terminal size={14} /> <span className="hidden md:inline">IT View</span><span className="md:hidden">IT</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Scroll-based Flying Letters - only show while scrolling */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {['V', 'N', 'D', 'K'].map((letter, idx) => {
          const letterColor = ['V', 'N'].includes(letter) 
            ? (darkMode ? '#FFFFFF' : '#1A1A1A') 
            : '#00FF94';
          const progress = getScrollProgress();
          
          // Spread amount: 0 at start, max at 50%, back to 0 at end
          const spreadProgress = Math.sin(progress * Math.PI);
          const spreadAmount = spreadProgress * 180;
          
          // Move down from nav toward footer
          const moveDown = progress * 280;
          
          // Y wave for floating
          const yWave = Math.sin(progress * Math.PI * 4 + idx * 1.5) * 25;
          
          // Only visible while scrolling and during scroll movement
          const opacity = isScrolling && progress > 0.02 && progress < 0.96 ? 1 : 0;
          
          // Original logo positions spread: V leftmost, N rightmost, D leftmost, K rightmost
          // Move them outward from their origin positions
          const offsetX = [0, 0, 0, 0]; // No additional X offset, use spread
          const basePositions = [
            { x: -spreadAmount - 35, y: -45 + moveDown + yWave },      // V - top left
            { x: spreadAmount + 35, y: -45 + moveDown - yWave },     // N - top right  
            { x: -spreadAmount - 35, y: 55 + moveDown + yWave },    // D - bottom left
            { x: spreadAmount + 35, y: 55 + moveDown - yWave },    // K - bottom right
          ];

          // Exact paths from VndkLogo
          const letterPaths = {
            V: [{ d: "M 15 25 L 30 45 L 45 25", color: letterColor }],
            N: [{ d: "M 55 45 L 55 25 L 85 45 L 85 25", color: letterColor }],
            D: [{ d: "M 15 55 L 30 55 A 10 10 0 0 1 30 75 L 15 75 Z", color: letterColor }],
            K: [
              { d: "M 55 55 L 55 75", color: letterColor },
              { d: "M 85 55 L 55 65 L 85 75", color: letterColor },
            ],
          };

          return (
            <motion.div
              key={letter}
              className="absolute cursor-pointer pointer-events-auto"
              style={{
                left: '50%',
                x: basePositions[idx].x,
                y: basePositions[idx].y,
                opacity: opacity,
              }}
              whileHover={{ scale: 1.15 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <svg 
                viewBox="0 0 100 100" 
                className="w-16 h-16 md:w-20 md:h-20"
                style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
              >
                {letterPaths[letter].map((pathData, pathIdx) => (
                  <path 
                    key={pathIdx}
                    d={pathData.d}
                    stroke={pathData.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                ))}
              </svg>
            </motion.div>
          );
        })}
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-6 z-50 p-4 rounded-full shadow-2xl md:hidden ${darkMode ? 'bg-[#00FF94] text-black' : 'bg-[#1A1A1A] text-white'}`}
          >
            <ChevronRight size={20} className="-rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>

      <main className="pt-20">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className={`text-xs tracking-[0.3em] uppercase mb-4 ${subTextClass}`}>{CREATIVE_DATA.title}</p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-4">
              {CREATIVE_DATA.tagline}
            </h1>
            <p className={`text-2xl md:text-3xl font-serif mb-8 ${subTextClass}`}>
              {PERSONAL_INFO.name}
            </p>
            <p className={`text-lg max-w-2xl leading-relaxed ${subTextClass}`}>
              {CREATIVE_DATA.summary}
            </p>
            <div className={`flex flex-wrap gap-4 mt-8 text-sm ${subTextClass}`}>
              <span className="flex items-center gap-1">
                <Globe size={14} /> {PERSONAL_INFO.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail size={14} /> {PERSONAL_INFO.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={14} /> {PERSONAL_INFO.phone}
              </span>
            </div>
          </motion.div>
        </section>

        {/* Portfolio Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-4">
              <Layers size={20} className={darkMode ? "text-[#00FF94]" : ""} />
              <h2 className="text-2xl font-display font-bold">Selected Works</h2>
            </div>
            {/* View Mode Toggle - Desktop & Mobile */}
            <div className={`flex items-center gap-1 rounded-full p-1 ${darkMode ? 'bg-white/10' : 'bg-[#1A1A1A]/10'}`}>
              {['grid', 'list', 'minimal'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider rounded-full transition-colors ${
                    viewMode === mode 
                      ? darkMode ? 'bg-[#00FF94] text-black' : 'bg-[#1A1A1A] text-white'
                      : subTextClass
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </motion.div>

          {portfolioLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className={`aspect-[4/3] mb-4 ${darkMode ? 'bg-white/10' : 'bg-[#1A1A1A]/10'}`} />
                  <div className={`h-3 w-20 mb-2 ${darkMode ? 'bg-white/10' : 'bg-[#1A1A1A]/10'}`} />
                  <div className={`h-5 w-3/4 ${darkMode ? 'bg-white/10' : 'bg-[#1A1A1A]/10'}`} />
                </div>
              ))}
            </div>
          ) : (
          <>
          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: visibleProjects.includes(project.id) ? 1 : 0, y: visibleProjects.includes(project.id) ? 0 : 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setActiveProject(project)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 mb-4 grayscale-blur">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs font-medium text-black">{project.year}</span>
                  </div>
                  <p className={`text-xs tracking-widest uppercase mb-1 ${subTextClass}`}>{project.category}</p>
                  <h3 className={`text-lg font-serif font-semibold transition-colors ${darkMode ? 'group-hover:text-[#00FF94]' : 'group-hover:text-[#666]'}`}>{project.title}</h3>
                </motion.div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: visibleProjects.includes(project.id) ? 1 : 0, x: visibleProjects.includes(project.id) ? 0 : -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`flex gap-6 p-4 border cursor-pointer group transition-colors ${darkMode ? 'bg-white/5 border-white/10 hover:border-white/30' : 'bg-white border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'}`}
                  onClick={() => setActiveProject(project)}
                >
                  <div className="w-32 h-24 shrink-0 overflow-hidden bg-slate-200 grayscale-blur">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs tracking-widest uppercase mb-1 ${subTextClass}`}>{project.category}</p>
                    <h3 className={`text-lg font-serif font-semibold transition-colors ${darkMode ? 'group-hover:text-[#00FF94]' : 'group-hover:text-[#666]'}`}>{project.title}</h3>
                    <p className={`text-sm mt-1 line-clamp-2 ${subTextClass}`}>{project.description}</p>
                  </div>
                  <span className={`text-xs self-start ${subTextClass}`}>{project.year}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Minimal View */}
          {viewMode === 'minimal' && (
            <div className="space-y-0">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: visibleProjects.includes(project.id) ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={`flex items-center justify-between py-3 border-b cursor-pointer group transition-colors ${borderClass} ${darkMode ? 'hover:bg-white/5' : 'hover:bg-[#F5F5F5]'}`}
                  onClick={() => setActiveProject(project)}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs w-8 ${subTextClass}`}>{String(index + 1).padStart(2, '0')}</span>
                    <h3 className={`text-base font-medium transition-colors ${darkMode ? 'group-hover:text-[#00FF94]' : 'group-hover:text-[#666]'}`}>{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs ${subTextClass}`}>{project.category}</span>
                    <span className={`text-xs ${subTextClass}`}>{project.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          </>
          )}
        </section>

        {/* Skills */}
        <section className={`max-w-7xl mx-auto px-6 py-16 ${darkMode ? 'bg-white/5' : 'bg-[#F5F5F5]'}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <Sparkles size={20} />
            <h2 className="text-2xl font-serif font-bold">Expertise</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CREATIVE_DATA.skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className={`text-sm font-bold mb-4 pb-2 border-b ${textClass} ${borderClass}`}>{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map(item => (
                    <span key={item} className={`text-xs px-3 py-1 border transition-colors ${darkMode ? 'bg-white/5 border-white/10 text-white/70' : 'bg-white border-[#1A1A1A]/10 text-[#666]'}`}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <Briefcase size={20} />
            <h2 className="text-2xl font-serif font-bold">Professional Journey</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className={`absolute left-0 top-0 bottom-0 w-px ${darkMode ? 'bg-white/10' : 'bg-[#1A1A1A]/10'}`} />

            <div className="space-y-10">
              {CREATIVE_DATA.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-[-3px] top-2 w-2 h-2 rounded-full ${darkMode ? 'bg-[#00FF94]' : 'bg-[#1A1A1A]'}`} />
                  
                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6 mb-2">
                    <div className={`text-sm font-medium shrink-0 ${subTextClass}`}>{exp.period}</div>
                    <div>
                      <h3 className={`text-xl font-bold ${textClass}`}>{exp.role}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`font-medium ${subTextClass}`}>{exp.company}</span>
                        {exp.location && (
                          <>
                            <span className="text-[#999]">•</span>
                            <span className={`text-sm ${subTextClass}`}>{exp.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 mt-3">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className={`leading-relaxed flex items-start gap-2 ${subTextClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${darkMode ? 'bg-white/20' : 'bg-[#1A1A1A]/30'}`} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <footer className={`max-w-7xl mx-auto px-6 py-16 border-t ${borderClass}`}>
          {/* Reconstructed Logo - original size and position */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ 
                opacity: getScrollProgress() > 0.90 ? 1 : 0,
                scale: getScrollProgress() > 0.90 ? 1 : 0.7,
              }}
              transition={{ duration: 0.6 }}
            >
              {/* Single full logo: V N top, D K bottom */}
              <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-28 md:h-28">
                {/* V - top left */}
                <path d="M 15 25 L 30 45 L 45 25" stroke={darkMode ? '#FFFFFF' : '#1A1A1A'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                {/* N - top right */}
                <path d="M 55 45 L 55 25 L 85 45 L 85 25" stroke={darkMode ? '#FFFFFF' : '#1A1A1A'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                {/* D - bottom left */}
                <path d="M 15 55 L 30 55 A 10 10 0 0 1 30 75 L 15 75 Z" stroke="#00FF94" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                {/* K - bottom right */}
                <path d="M 55 55 L 55 75 M 85 55 L 55 65 L 85 75" stroke="#00FF94" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </motion.div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-2">Let's Create Together</h3>
              <p className={subTextClass}>Open for creative collaborations and opportunities</p>
            </div>
            <div className="flex gap-4">
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className={`p-3 border transition-colors ${darkMode ? 'border-white/20 hover:bg-white hover:text-black' : 'border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-white'}`}>
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className={`p-3 border transition-colors ${darkMode ? 'border-white/20 hover:bg-white hover:text-black' : 'border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-white'}`}>
                <Mail size={20} />
              </a>
              <a href={PERSONAL_INFO.portfolio} target="_blank" rel="noreferrer" className={`p-3 border transition-colors ${darkMode ? 'border-white/20 hover:bg-white hover:text-black' : 'border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-white'}`}>
                <Globe size={20} />
              </a>
            </div>
          </div>
          <p className={`text-center text-xs mt-12 ${subTextClass}`}>© {new Date().getFullYear()} Vo Nguyen Dang Khoa. All rights reserved.</p>
        </footer>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-8"
            onClick={() => setActiveProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`max-w-4xl w-full rounded-lg overflow-hidden ${darkMode ? 'bg-[#111] border border-white/10 text-white' : 'bg-[#FAFAFA] text-[#1A1A1A]'}`}
              onClick={e => e.stopPropagation()}
            >
              <img src={activeProject.image} alt={activeProject.title} className="w-full h-64 md:h-96 object-cover" />
              <div className="p-8">
                <p className={`text-xs tracking-widest uppercase mb-2 ${subTextClass}`}>{activeProject.category}</p>
                <h3 className="text-2xl font-serif font-bold mb-4">{activeProject.title}</h3>
                <p className={`mb-6 ${subTextClass}`}>{activeProject.description}</p>
                <a href={activeProject.link} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 text-sm font-medium border-b pb-1 hover:opacity-60 ${darkMode ? 'border-white text-white' : 'border-[#1A1A1A] text-[#1A1A1A]'}`}>
                  View Project <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </>
  );
};

// 3. IT SIDE - Terminal Desktop with Draggable Windows
const DesktopWindow = ({ children, title, onClose, initialPosition = { x: 20, y: 20 } }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      drag={!isMobile}
      dragMomentum={false}
      dragElastic={0.1}
      initial={{ x: isMobile ? 0 : initialPosition.x, y: isMobile ? 0 : initialPosition.y, opacity: 0, scale: 0.9 }}
      animate={{ x: isMobile ? 0 : initialPosition.x, y: isMobile ? 0 : initialPosition.y, opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`absolute ${isMobile ? 'fixed inset-4 z-50' : 'rounded-lg'} bg-[#0a0a0a] border border-[#00FF94]/30 overflow-hidden shadow-2xl shadow-[#00FF94]/10 flex flex-col`}
      style={{ 
        width: isMobile ? 'calc(100% - 2rem)' : 'auto',
        minWidth: isMobile ? 'none' : 320, 
        maxWidth: isMobile ? 'none' : 500, 
        height: isMobile ? 'calc(100% - 8rem)' : 'auto', 
        zIndex: 100 
      }}
    >
      {/* Window Title Bar */}
      <div className={`flex items-center justify-between px-3 py-2 bg-[#111] border-b border-[#00FF94]/20 ${!isMobile ? 'cursor-grab active:cursor-grabbing' : ''}`}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          <span className="ml-2 text-[10px] md:text-xs text-[#00FF94] font-mono uppercase tracking-widest">{title}</span>
        </div>
        <button onClick={onClose} className="p-1 text-[#00FF94]/50 hover:text-red-400 transition-colors">
          <X size={16} />
        </button>
      </div>
      {/* Window Content */}
      <div className="p-4 md:p-6 overflow-y-auto flex-1 custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
};

const ITSide = ({ onBack, onSwitch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openWindows, setOpenWindows] = useState(['about']);
  const [typingText, setTypingText] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [isScreensaver, setIsScreensaver] = useState(false);
  
  const fullText = "> whoami\n\nVo Nguyen Dang Khoa\nAI-Powered Developer\n14-month coding journey from zero to production";

  const openWindow = (name) => {
    if (openWindows.includes(name)) {
      setOpenWindows(openWindows.filter(w => w !== name));
    } else {
      setOpenWindows([...openWindows, name]);
    }
  };

  const closeWindow = (name) => {
    setOpenWindows(openWindows.filter(w => w !== name));
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Idle screensaver effect
  useEffect(() => {
    if (isLoading) return;
    
    let idleTimer;
    const resetIdle = () => {
      setIsScreensaver(false);
      clearTimeout(idleTimer);
      // Adjusted idle time to 10 seconds
      idleTimer = setTimeout(() => setIsScreensaver(true), 10000);
    };
    
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('click', resetIdle);
    window.addEventListener('touchstart', resetIdle);
    window.addEventListener('scroll', resetIdle);
    resetIdle();
    
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('click', resetIdle);
      window.removeEventListener('touchstart', resetIdle);
      window.removeEventListener('scroll', resetIdle);
    };
  }, [isLoading]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isLoading) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypingText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <TerminalBootLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#0a0a0a] text-[#00FF94] font-mono crt-screen crt-scanline"
      >
{/* Idle Screensaver */}
      <AnimatePresence>
        {isScreensaver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-[#0a0a0a] flex items-center justify-center cursor-none backdrop-blur-sm"
            onClick={() => setIsScreensaver(false)}
          >
            <div className="text-2xl md:text-4xl text-[#00FF94]/30 font-mono text-center p-6">
              <div className="mb-6 animate-float"><span className="animate-blink text-[#00FF94]">KHOA.VO</span></div>
              <div className="text-lg md:text-xl mb-4 font-bold text-[#00FF94]/50">KHOA.VO PORTFOLIO</div>
              <div className="text-sm md:text-base mb-2">[ IT SIDE ] - AI-powered developer</div>
              <div className="text-sm md:text-base mb-6">[ CREATIVE ] - studio lead</div>
              <div className="text-[10px] md:text-xs mb-8 text-[#00D9FF] opacity-40 uppercase tracking-widest leading-loose">
                vndangkhoa | khoavo.myds.me | phibious <br className="md:hidden" /> Ho Chi Minh City, Vietnam
              </div>
              <div className="text-sm md:text-base"><span className="animate-pulse">IDLE... INTERACT TO RESUME</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-6 z-50 p-4 bg-[#00FF94] text-[#0a0a0a] rounded-full shadow-[0_0_20px_rgba(0,255,148,0.3)] md:hidden"
          >
            <ChevronRight size={20} className="-rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-[110] bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#00FF94]/20">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={onBack} className="p-2 -ml-2 flex items-center gap-2 text-xs text-[#00FF94] hover:opacity-70 transition-opacity uppercase font-mono font-bold">
            <ArrowLeft size={16} /> Exit
          </button>
          
          {/* Logo & Prompt Group */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 font-mono text-[#00FF94]/60 text-[10px] tracking-wider">
              <span className="opacity-40">SYSTEM://</span>
              <span>khoa@portfolio:~$</span>
              <span className="w-2 h-4 bg-[#00FF94] animate-blink" />
            </div>
            <div className="flex items-center justify-center opacity-90 drop-shadow-[0_0_8px_rgba(0,255,148,0.3)]">
              <VndkLogo size={32} vnColor="#FFFFFF" dkColor="#00FF94" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => window.print()} className="px-3 py-1.5 text-[10px] md:text-xs text-[#00FF94] border border-[#00FF94]/30 rounded-sm hover:bg-[#00FF94] hover:text-[#0a0a0a] transition-all font-bold uppercase font-mono">
              CV
            </button>
            <button onClick={onSwitch} className="px-3 py-1.5 text-[10px] md:text-xs text-[#0a0a0a] bg-[#00FF94] border border-[#00FF94] rounded-sm hover:bg-transparent hover:text-[#00FF94] transition-all uppercase font-bold font-mono">
              Design
            </button>
          </div>
        </div>
      </nav>

      <main className="relative min-h-screen overflow-hidden pt-14">
        {/* Sidebar (Desktop) / Bottom Dock (Mobile) - Focused on Window Management */}
        <div className="fixed bottom-0 left-0 right-0 h-16 md:h-auto md:left-0 md:top-14 md:bottom-0 md:w-20 bg-[#0a0a0a]/90 md:bg-[#0a0a0a]/80 backdrop-blur-md border-t md:border-t-0 md:border-r border-[#00FF94]/20 flex md:flex-col items-center justify-around md:justify-start py-2 md:py-8 gap-2 md:gap-8 z-[100]">
          {[
            { id: 'about', icon: User, label: 'About' },
            { id: 'skills', icon: Code, label: 'Skills' },
            { id: 'projects', icon: Folder, label: 'Projects' },
            { id: 'experience', icon: Briefcase, label: 'Experience' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => openWindow(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded transition-all group ${openWindows.includes(item.id) ? 'bg-[#00FF94]/20' : 'hover:bg-[#00FF94]/10'}`}
            >
              <item.icon size={22} className={`${openWindows.includes(item.id) ? 'text-[#00FF94]' : 'text-[#00FF94]/60'} group-hover:text-[#00FF94] transition-colors`} />
              <span className="text-[8px] text-[#00FF94]/40 group-hover:text-[#00FF94] uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Desktop Area - Windows */}
        <div className="md:ml-20 p-4 md:p-8 pb-20 md:pb-8 relative min-h-[calc(100vh-3.5rem)]">
          {openWindows.includes('about') && (
            <DesktopWindow title="about.txt" onClose={() => closeWindow('about')} initialPosition={{ x: 120, y: 40 }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-xs text-[#00FF94]/50 mb-4">SYSTEM STARTED...</div>
                <pre className="text-sm leading-relaxed whitespace-pre-wrap">{typingText}<span className="animate-pulse">▋</span></pre>
                
                <div className="mt-8 pt-8 border-t border-[#00FF94]/20">
                  <div className="text-xs text-[#00FF94]/50 mb-2">&gt; echo $JOURNEY</div>
                  <div className="space-y-4">
                    {IT_DATA.journey.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-[#00D9FF] text-xs shrink-0">{item.month}</span>
                        <div>
                          <span className="text-white">{item.title}</span>
                          <span className="text-[#00FF94]/50"> — {item.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[#00FF94]/20">
                  <div className="text-xs text-[#00FF94]/50 mb-4">&gt; cat summary.txt</div>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                    {IT_DATA.summary}
                  </p>
                </div>
              </motion.div>
            </DesktopWindow>
          )}

          {openWindows.includes('skills') && (
            <DesktopWindow title="skills.json" onClose={() => closeWindow('skills')} initialPosition={{ x: 160, y: 100 }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {Object.entries(IT_DATA.skills).map(([category, items]) => (
                  <div key={category} className="mb-4">
                    <div className="text-xs text-[#00D9FF] mb-2 uppercase tracking-wider">{category}</div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item, i) => (
                        <span key={i} className="text-sm border border-[#00FF94]/30 px-3 py-1 bg-[#00FF94]/5">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </DesktopWindow>
          )}

          {openWindows.includes('projects') && (
            <DesktopWindow title="projects/" onClose={() => closeWindow('projects')} initialPosition={{ x: 200, y: 160 }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-1 gap-3">
                  {IT_DATA.projects.map((project, i) => (
                    <div 
                      key={i} 
                      onClick={() => setActiveProject(project)}
                      className="border border-[#00FF94]/20 p-3 hover:border-[#00FF94]/40 hover:bg-[#00FF94]/5 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-bold group-hover:text-[#00FF94] transition-colors">{project.name}</span>
                        <Folder size={14} className="text-[#00FF94]/40" />
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 6).map((t, j) => (
                          <span key={j} className="text-[10px] bg-[#00FF94]/10 px-2 py-0.5 text-[#00FF94]">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </DesktopWindow>
          )}

          {openWindows.includes('experience') && (
            <DesktopWindow title="experience.log" onClose={() => closeWindow('experience')} initialPosition={{ x: 240, y: 220 }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="space-y-4">
                  {IT_DATA.experience.map((exp, i) => (
                    <div key={i} className="border-l-2 border-[#00FF94] pl-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-white font-bold">{exp.role}</span>
                        <span className="text-xs text-[#00FF94]/50">{exp.period}</span>
                      </div>
                      <div className="text-xs text-[#00D9FF] mb-1">{exp.company}</div>
                      <ul className="text-xs text-slate-400 space-y-0.5">
                        {exp.highlights.map((h, j) => (
                          <li key={j}>• {h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            </DesktopWindow>
          )}

          {/* Empty State */}
          {openWindows.length === 0 && (
            <div className="flex items-center justify-center h-full opacity-30">
              <div className="text-center">
                <TerminalIcon size={48} className="mx-auto mb-4 text-[#00FF94]/30" />
                <p className="text-sm text-[#00FF94]/50">Click icons to open windows</p>
              </div>
            </div>
          )}
        </div>

        {/* Task Bar - Bottom */}
        <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#0a0a0a]/90 backdrop-blur-sm border-t border-[#00FF94]/20 flex items-center px-4 z-40">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="px-3 py-1 text-xs text-[#00FF94] hover:bg-[#00FF94]/10 rounded transition-colors flex items-center gap-2">
              <ArrowLeft size={12} /> Exit
            </button>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#00FF94]/50">khoa@portfolio:~${' '}</span>
            <span className="animate-pulse text-[#00FF94]">▋</span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button onClick={() => window.print()} className="px-2 py-1 text-[10px] text-[#00FF94] border border-[#00FF94]/30 rounded hover:bg-[#00FF94]/10 transition-colors">
              CV
            </button>
            <button onClick={onSwitch} className="px-2 py-1 text-[10px] text-[#0a0a0a] bg-[#00FF94] rounded hover:opacity-80 transition-colors">
              Design
            </button>
          </div>
        </div>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setActiveProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0a0a0a] border border-[#00FF94]/30 max-w-2xl w-full rounded-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-[#00FF94]/20">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="ml-4 text-xs text-[#00FF94]">{activeProject.name}</span>
              </div>
              <div className="p-6">
                <div className="text-xs text-[#00D9FF] mb-2 uppercase tracking-wider">Project Details</div>
                <h3 className="text-xl text-white font-bold mb-3">{activeProject.name}</h3>
                <p className="text-sm text-slate-300 mb-4">{activeProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeProject.tech.map((t, j) => (
                    <span key={j} className="text-xs bg-[#00FF94]/10 px-3 py-1.5 text-[#00FF94] border border-[#00FF94]/20">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4 pt-4 border-t border-[#00FF94]/20">
                  {activeProject.demo && (
                    <a href={activeProject.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#00D9FF] hover:text-[#00FF94]">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  <a href={activeProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#00FF94] hover:text-[#00D9FF]">
                    <Github size={14} /> Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </>
  );
};

// --- MAIN APP ---
export default function Portfolio() {
  const [view, setView] = useState('landing'); // 'landing', 'creative', 'it'
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Set initial theme to light
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const handleSelect = (persona) => {
    setView(persona);
  };

  const handleBack = () => {
    setView('landing');
  };

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
  };

  return (
    <>
      <div className="noise-overlay" />
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <LandingPage key="landing" onSelect={handleSelect} darkMode={darkMode} toggleTheme={toggleTheme} />
        )}
        {view === 'creative' && (
          <CreativeSide key="creative" onBack={handleBack} onSwitch={() => setView('it')} darkMode={darkMode} toggleTheme={toggleTheme} />
        )}
        {view === 'it' && (
          <ITSide key="it" onBack={handleBack} onSwitch={() => setView('creative')} />
        )}
      </AnimatePresence>

      {/* Print-only portfolio - hidden on screen */}
      <div className="print-portfolio">
        <PrintPortfolio />
      </div>
    </>
  );
}