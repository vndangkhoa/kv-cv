import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Code, Database, Cloud, Cpu, Mail, Phone, 
  ExternalLink, Github, Linkedin, Download, Eye,
  ChevronRight, ArrowLeft, Layers, Sparkles, Briefcase,
  Zap, Globe, Palette, Monitor, Server, Terminal as TerminalIcon
} from 'lucide-react';
import PrintPortfolio from './PrintPortfolio';
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
  title: "AI Creative Lead & Motion Designer",
  summary: "Visionary Creative Leader with 9+ years of expertise bridging brand strategy, digital design, motion graphics, and cutting-edge generative AI. Currently pioneering AI-augmented creative workflows at Phibious, merging traditional art direction with ComfyUI, Stable Diffusion, and FLUX to redefine what's possible in visual storytelling. Previously led eCommerce design at P&G, shaping digital experiences for millions of consumers across Southeast Asia.",
  tagline: "Where Design Meets Intelligence",
  skills: [
    { category: "AI & Generative Design", items: ["ComfyUI", "Stable Diffusion", "FLUX", "Midjourney", "RunwayML", "Ollama", "LM Studio", "LoRA Training", "ControlNet", "IP-Adapter"] },
    { category: "Design & Creative Tools", items: ["Adobe Creative Suite", "Figma", "After Effects", "Premiere Pro", "Cinema 4D", "Blender", "Photoshop", "Illustrator", "InDesign"] },
    { category: "Motion & Animation", items: ["Motion Graphics", "3D Animation", "Kinetic Typography", "Visual Effects", "Character Animation", "Storyboarding"] },
    { category: "Brand & Strategy", items: ["Brand Identity", "Art Direction", "Visual Storytelling", "Editorial Design", "Packaging Design", "Strategic Design"] }
  ],
  projects: [
    {
      id: 1, 
      title: "The Language of Poetry & Literature", 
      category: "AI Generated Art",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2025/08/i2i_1756355661_62547902.png",
      description: "Exploring the ethereal boundary between reality and imagination through AI-generated visuals. Created with Stable Diffusion, ComfyUI, and custom LoRA training to capture the intangible essence of poetic imagery.",
      link: "https://portfolio.khoavo.myds.me/2025/08/28/the-language-of-poetry-and-literature/",
      year: "2025"
    },
    {
      id: 2, 
      title: "Delux Perfume – Fineline 2025 Launch", 
      category: "AI Branding & Video",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2025/08/Delux-Perfume_red.png",
      description: "End-to-end creative strategy and art direction for premium perfume launch. From AI-generated mood boards and product visuals to cinematic video production, creating a cohesive brand narrative for Southeast Asia market.",
      link: "https://portfolio.khoavo.myds.me/2025/08/11/giving-art-direction-to-a-brand-a-case-study/",
      year: "2025"
    },
    {
      id: 3, 
      title: "AI Studio Photography", 
      category: "AI-Generated Branding",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2025/07/img_0317.jpg",
      description: "Revolutionary approach to professional studio photography using AI. ComfyUI workflows with custom LoRA to generate studio-quality product and portrait images, reducing production costs by 70%.",
      link: "https://portfolio.khoavo.myds.me/2025/07/27/%F0%9F%A7%A0%F0%9F%93%B8-ai-studio-i-can-do-that-too/",
      year: "2025"
    },
    {
      id: 4, 
      title: "NAVIGATOR – ASIAMARINE Magazine", 
      category: "Editorial Design",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2020/10/navigator-vol1_page_001.webp",
      description: "Complete editorial design for Vietnam's premier yacht market publication. Art direction, layout design, and visual storytelling for a luxury marine sector brand reaching high-net-worth readers across Asia.",
      link: "https://portfolio.khoavo.myds.me/2020/10/20/navigator/",
      year: "2020"
    },
    {
      id: 5, 
      title: "PetroVietnam – PCT Corporate Identity", 
      category: "Brand Identity & 3D",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2017/04/cip_mockup2.png",
      description: "Comprehensive corporate identity for PetroVietnam Transportation. 3D vehicle visualization, logo design, stationery system, and POSM materials creating a cohesive national brand presence.",
      link: "https://portfolio.khoavo.myds.me/2017/04/10/petrovietnam-pct/",
      year: "2017"
    },
    {
      id: 6, 
      title: "Skyxx – Animated Poster Series", 
      category: "Motion Graphics",
      image: "https://portfolio.khoavo.myds.me/wp-content/uploads/2019/04/aash-3-scaled.jpg",
      description: "Award-winning weekly animated poster series for entertainment events. Dynamic motion graphics with 3D elements, pushing creative boundaries under tight deadlines while maintaining exceptional quality.",
      link: "https://portfolio.khoavo.myds.me/2019/02/17/skyxx-poster-animation/",
      year: "2019"
    }
  ],
  experience: [
    { 
      role: "AI Creative Lead", 
      company: "Phibious Vietnam", 
      period: "2025 - Present",
      location: "Ho Chi Minh City",
      highlights: [
        "Spearhead the integration of generative AI (ComfyUI, Stable Diffusion, FLUX) into creative workflows, reducing production time by 50%",
        "Lead cross-functional teams of designers, copywriters, and data analysts to deliver technology-driven creative campaigns",
        "Developed proprietary AI tools for mood boarding, concept visualization, and rapid prototyping",
        "Created AI-augmented design concepts for digital and physical platforms serving Fortune 500 clients"
      ]
    },
    { 
      role: "eCommerce Design Lead", 
      company: "Procter & Gamble (P&G)", 
      period: "2020 - 2025",
      location: "Ho Chi Minh City",
      highlights: [
        "Led visual strategy for eCommerce platforms across Hair Care category, directly impacting millions of consumers in SEA",
        "Managed end-to-end design projects from concept to execution, aligning with global marketing strategies",
        "Spearheaded the digital transformation of brand assets for omnichannel retail experiences",
        "Mentored junior designers and established design standards adopted across the regional team"
      ]
    },
    { 
      role: "Production Creative Lead", 
      company: "INN SaiGon", 
      period: "Dec 2019 - Nov 2020",
      location: "Ho Chi Minh City",
      highlights: [
        "Directed photography production for food, product, and event projects with 30+ client accounts",
        "Established comprehensive brand guidelines and visual standards ensuring consistency across deliverables",
        "Optimized post-production workflows, reducing turnaround time by 40%"
      ]
    },
    { 
      role: "Regional Head of Design", 
      company: "ASIAMARINE", 
      period: "2018 - 2019",
      location: "Ho Chi Minh City",
      highlights: [
        "Led design team creating digital marketing assets, web graphics, and editorial content for luxury yacht brand",
        "Delegated projects to junior designers while maintaining quality control and brand consistency",
        "Collaborated with international teams to localize content for Asian markets"
      ]
    },
    { 
      role: "Senior Graphic Designer", 
      company: "EMG - Element Management Group", 
      period: "2017 - 2018",
      location: "Ho Chi Minh City",
      highlights: [
        "Created impactful designs for print and digital campaigns for global luxury and lifestyle brands",
        "Expert in photo sourcing, advanced image retouching, and brand identity development",
        "Delivered corporate identity packages for multinational clients"
      ]
    }
  ],
  awards: [
    { title: "Best Digital Campaign", year: "2024", organization: "P&G SEA Digital Awards" },
    { title: "Outstanding Art Direction", year: "2019", organization: "Vietnam Design Awards" }
  ]
};

// --- IT PERSONA DATA ---
const IT_DATA = {
  title: "Full-Stack Developer & DevOps",
  summary: "9-month intensive coding journey from zero to production. Built 5+ deployed applications including video streaming platforms, AI image generators, and music players. Proficient in modern web frameworks, containerization, and cloud deployment. Self-taught developer with a creative background bringing unique problem-solving perspective.",
  journey: [
    { month: "MAY '24", title: "The Spark", description: "First deep dive into Next.js. Abandoned manual CSS for Tailwind efficiency." },
    { month: "JUL '24", title: "First Production App", description: "Built kv-pix AI image generator with multi-provider support (Google Whisk, Meta AI, Grok)." },
    { month: "SEP '24", title: "Full-Stack Mastery", description: "Created KV-Tube YouTube platform with Go backend + Next.js. Dockerized for Synology NAS." },
    { month: "NOV '24", title: "The AI Pivot", description: "Fully embraced AI coding. Cursor and v0 became primary development engine." },
    { month: "DEC '24", title: "Rust Exploration", description: "Built Spotify clone with Rust Axum backend. Advanced system architecture." },
    { month: "PRESENT", title: "Vibe Ascended", description: "Building complex apps through high-level prompting and intuition." }
  ],
  skills: {
    languages: ["TypeScript", "JavaScript", "Go", "Rust", "Python", "HTML/CSS", "SQL"],
    frontend: ["React", "Next.js", "Vite", "Tailwind CSS", "Shadcn", "Framer Motion", "Zustand", "PWA"],
    backend: ["Node.js", "Go (Gin)", "Rust (Axum)", "Express", "REST APIs", "WebSocket"],
    ai: ["LLM Integration", "Cursor AI", "v0", "Replit AI", "Ollama", "Prompt Engineering", "Multi-Provider AI APIs"],
    devops: ["Docker", "Docker Compose", "GitHub Actions", "Forgejo CI/CD", "Synology NAS", "Nginx", "SQLite"],
    tools: ["Git", "VS Code", "Figma", "Postman", "MongoDB", "Prisma", "ffmpeg"]
  },
  projects: [
    {
      name: "KV-Tube",
      description: "YouTube-like video streaming platform with HLS support, subscriptions, watch history, and PWA. Deployed on Synology NAS via Docker.",
      tech: ["Go (Gin)", "Next.js", "TypeScript", "SQLite", "Docker", "HLS.js", "PWA"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-tube"
    },
    {
      name: "Spotify Clone",
      description: "Full-featured Spotify-like music player with YouTube Music integration, real-time lyrics, custom playlists, and PWA support.",
      tech: ["React (Vite)", "Rust (Axum)", "TailwindCSS", "YouTube API", "PWA"],
      github: "https://git.khoavo.myds.me/vndangkhoa/spotify-clone"
    },
    {
      name: "kv-pix (APIx)",
      description: "AI Image Generator powered by Google Whisk, Meta AI, and Grok. Multi-provider support with prompt library and history.",
      tech: ["Next.js 14", "TypeScript", "Tailwind", "Zustand", "Docker"],
      github: "https://git.khoavo.myds.me/vndangkhoa/apix"
    },
    {
      name: "IT CV Portfolio",
      description: "This terminal-style interactive resume with typing animations and system aesthetics.",
      tech: ["React", "Vite", "Tailwind", "Framer Motion", "TypeScript"],
      github: "https://git.khoavo.myds.me/vndangkhoa/it-cv"
    },
    {
      name: "kv-tiktok-download",
      description: "Douyin/TikTok video download API with batch processing support.",
      tech: ["Python", "FastAPI", "yt-dlp"],
      github: "https://git.khoavo.myds.me/vndangkhoa/kv-tiktok-download"
    }
  ],
  experience: [
    { role: "Creative Technology", company: "Phibious Vietnam", period: "2025 - Present", highlights: ["Bridge between creative and technical teams", "Develop interactive prototypes and AI-powered tools", "Automate creative workflows with custom scripts", "Build internal tools for design team productivity"] },
    { role: "Freelance Developer", company: "Self-Employed", period: "2024 - Present", highlights: ["Built 5+ production web applications deployed on cloud and NAS", "Integrated AI capabilities (image generation, video processing) into client solutions", "Implemented CI/CD pipelines with GitHub/Forgejo Actions", "Dockerized applications for easy deployment on various platforms"] }
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

// 1. LANDING PAGE - Overlay Hover Effect
const LandingPage = ({ onSelect }) => {
  const [isHoveringIT, setIsHoveringIT] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed inset-0 overflow-hidden bg-[#FAFAFA]"
    >
      {/* Creative Side Content - Always visible */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
        {/* Background Mesh Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-slate-100 blur-[120px] opacity-60 animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-slate-200 blur-[120px] opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Main Content */}
        <div className="relative z-10 max-w-5xl w-full text-center">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Name - Masked Reveal Animation */}
            <div className="overflow-hidden mb-4 py-2 px-4">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="text-[clamp(2rem,6.5vw,7.5rem)] font-serif font-bold text-[#1A1A1A] tracking-tighter leading-tight whitespace-nowrap"
                style={{ 
                  textShadow: '0 2px 4px rgba(0,0,0,0.02)',
                }}
              >
                Vo Nguyen Dang Khoa
              </motion.h1>
            </div>
            
            {/* Tagline */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-2xl font-serif text-[#1A1A1A]/70 mb-2 italic"
            >
              Where Design Meets Intelligence
            </motion.p>
            
            {/* Title */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-[10px] font-bold tracking-[0.4em] text-[#1A1A1A]/30 uppercase mb-10 md:mb-12"
            >
              AI Creative Lead & Motion Designer
            </motion.p>
            
            {/* Enter Button (Desktop only) */}
            <button
              onClick={() => onSelect('creative')}
              className="hidden md:inline-flex items-center gap-3 px-10 py-5 bg-[#1A1A1A] text-white text-lg font-medium rounded-full hover:bg-black hover:scale-105 transition-all shadow-2xl border-4 border-transparent hover:border-black/5"
            >
              Explore Portfolio 
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ChevronRight size={22} />
              </motion.div>
            </button>

            {/* Mobile Choices (Consolidated in center) */}
            <div className="md:hidden flex flex-col gap-4 mt-8">
              <button 
                onClick={() => onSelect('creative')}
                className="flex items-center justify-between px-6 py-5 bg-[#1A1A1A] text-white font-medium rounded-2xl shadow-xl active:scale-[0.98] transition-transform"
              >
                <span className="flex items-center gap-3">
                  <Sparkles size={18} /> Creative Portfolio
                </span>
                <ChevronRight size={18} />
              </button>
              <button 
                onClick={() => onSelect('it')}
                className="flex items-center justify-between px-6 py-5 border border-[#1A1A1A]/10 text-[#1A1A1A] font-medium rounded-2xl bg-white/50 backdrop-blur-md shadow-sm active:scale-[0.98] transition-transform"
              >
                <span className="flex items-center gap-3">
                  <TerminalIcon size={18} /> Developer Side
                </span>
                <ChevronRight size={18} />
              </button>
              <p className="text-[10px] tracking-widest text-[#999] uppercase mt-2 opacity-60">
                Select a persona to enter
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hint - fades on hover */}
        <motion.div 
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isHoveringIT ? 0 : 0.5 }}
          className="absolute bottom-12 text-sm text-[#BBB] hidden md:block"
        >
          <span className="flex items-center gap-4">
            <span className="w-12 h-px bg-[#BBB]" />
            Hover right to preview Developer side
            <span className="w-12 h-px bg-[#BBB]" />
          </span>
        </motion.div>
      </div>

      {/* IT Side - Slides in on hover (desktop only) */}
      <motion.div 
        className="absolute inset-y-0 right-0 w-full md:w-[75%] bg-[#0a0a0a] cursor-pointer hidden md:block z-40 border-l border-[#00FF94]/30"
        initial={{ x: "calc(100% - 60px)" }}
        animate={{ x: isHoveringIT ? "0%" : "calc(100% - 60px)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsHoveringIT(true)}
        onMouseLeave={() => setIsHoveringIT(false)}
        onClick={() => onSelect('it')}
      >
        {/* Vertical Strip Label (for peek state) */}
        {!isHoveringIT && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-0 inset-y-0 w-[60px] flex items-center justify-center pointer-events-none"
          >
            <span className="rotate-90 text-[10px] tracking-[0.5em] text-[#00FF94]/40 font-mono whitespace-nowrap">
              DEVELOPER SIDE // PREVIEW
            </span>
          </motion.div>
        )}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(0,255,136,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.1)_1px,transparent_1px)] bg-[size:25px_25px]" />
        
        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8">
          <div className="max-w-md text-center">
            <TerminalIcon size={56} className="text-[#00FF94] mx-auto mb-6" />
            
            <h2 className="text-4xl md:text-5xl font-bold text-white font-mono mb-2">
              DEVELOPER
            </h2>
            <p className="text-[#00FF94]/70 font-mono text-sm tracking-[0.3em] mb-8">
              FULL-STACK & DEVOPS
            </p>
            
            <p className="text-slate-400 font-mono text-base mb-8 leading-relaxed">
              9-month coding journey.<br/>
              Built 5+ production applications.<br/>
              Self-taught with AI-powered development.
            </p>

            <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#00FF94]/40 bg-[#00FF94]/10 text-[#00FF94] font-mono text-base rounded-full hover:bg-[#00FF94]/20 transition-colors">
              Enter Terminal <ChevronRight size={18} />
            </button>

            {/* Code Preview */}
            <div className="mt-10 font-mono text-sm text-[#00FF94]/40 text-left space-y-2">
              <div><span className="text-[#00D9FF]">const</span> stack = ["Go", "Rust", "TS"];</div>
              <div><span className="text-[#00D9FF]">const</span> deployed = 5;</div>
              <div><span className="text-[#00D9FF]">const</span> vibe = "S-Tier";</div>
            </div>
          </div>
        </div>
      </motion.div>



      {/* Minimal Signature Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHoveringIT ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute top-8 left-6 md:left-8 z-50 text-[10px] md:text-lg"
      >
        <div className="text-[#1A1A1A] font-serif font-bold tracking-widest flex items-center gap-2">
          KHOA.VO <span className="w-4 md:w-8 h-px bg-[#1A1A1A]/30"></span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- ANIMATION LOADERS ---

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
      className="fixed inset-0 z-[200] bg-[#FAFAFA] flex items-center justify-center overflow-hidden"
    >
      <pre 
        ref={preRef}
        className="text-[#1A1A1A] font-mono font-bold italic text-[10px] md:text-xs leading-[10px] md:leading-[12px] opacity-30 select-none whitespace-pre transform scale-110"
        style={{ letterSpacing: '0.15em' }}
      >
      </pre>

      {/* Skip Button */}
      <button 
        onClick={onComplete}
        className="absolute bottom-8 right-8 z-[210] flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors bg-white/80 px-4 py-2 backdrop-blur-sm rounded"
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
const CreativeSide = ({ onBack, onSwitch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(() => {
      setVisibleProjects(CREATIVE_DATA.projects.map(p => p.id));
    }, 500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <CreativeLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A]"
      >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-sm border-b border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="p-2 flex items-center gap-1.5 text-sm md:text-base text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors">
            <ArrowLeft size={18} /> <span className="hidden md:inline">Back</span>
          </button>
          
          {/* Minimalist Identical Logo */}
          <div className="flex items-center justify-center">
            <VndkLogo size={36} vnColor="#1A1A1A" dkColor="#00FF94" />
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#1A1A1A] border border-[#1A1A1A] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors flex items-center gap-2">
              <span className="hidden md:inline">Download CV</span>
              <span className="md:hidden">CV</span>
            </button>
            <button onClick={onSwitch} className="px-4 py-2 text-[10px] md:text-xs text-white bg-[#1A1A1A] border border-[#1A1A1A] rounded-full hover:bg-transparent hover:text-[#1A1A1A] transition-colors flex items-center gap-2">
              <Terminal size={14} /> <span className="hidden md:inline">IT View</span><span className="md:hidden">IT</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-6 z-50 p-4 bg-[#1A1A1A] text-white rounded-full shadow-2xl md:hidden"
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
            <p className="text-xs tracking-[0.3em] text-[#666] uppercase mb-4">{CREATIVE_DATA.title}</p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-4">
              {CREATIVE_DATA.tagline}
            </h1>
            <p className="text-2xl md:text-3xl font-serif text-[#666] mb-8">
              {PERSONAL_INFO.name}
            </p>
            <p className="text-lg text-[#666] max-w-2xl leading-relaxed">
              {CREATIVE_DATA.summary}
            </p>
            <div className="flex flex-wrap gap-4 mt-8 text-sm text-[#999]">
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

        {/* Awards Banner */}
        {CREATIVE_DATA.awards && CREATIVE_DATA.awards.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 pb-16">
            <div className="flex flex-wrap gap-6">
              {CREATIVE_DATA.awards.map((award, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 bg-[#F5F5F5] px-4 py-2 rounded-full"
                >
                  <Sparkles size={14} className="text-amber-500" />
                  <span className="text-sm font-medium">{award.title}</span>
                  <span className="text-xs text-[#999]">{award.year}</span>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Portfolio Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <Layers size={20} />
            <h2 className="text-2xl font-serif font-bold">Selected Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CREATIVE_DATA.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: visibleProjects.includes(project.id) ? 1 : 0, y: visibleProjects.includes(project.id) ? 0 : 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setActiveProject(project)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 mb-4">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs font-medium">{project.year}</span>
                </div>
                <p className="text-xs tracking-widest text-[#666] uppercase mb-1">{project.category}</p>
                <h3 className="text-lg font-serif font-semibold group-hover:text-[#666] transition-colors">{project.title}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="max-w-7xl mx-auto px-6 py-16 bg-[#F5F5F5]">
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
                <h3 className="text-sm font-bold text-[#1A1A1A] mb-4 pb-2 border-b border-[#1A1A1A]/10">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map(item => (
                    <span key={item} className="text-xs text-[#666] bg-white px-3 py-1 border border-[#1A1A1A]/10">{item}</span>
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
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[#1A1A1A]/10" />

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
                  <div className="absolute left-[-3px] top-2 w-2 h-2 bg-[#1A1A1A] rounded-full" />
                  
                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6 mb-2">
                    <div className="text-sm font-medium text-[#1A1A1A] shrink-0">{exp.period}</div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1A1A1A]">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-[#666] mt-1">
                        <span className="font-medium">{exp.company}</span>
                        {exp.location && (
                          <>
                            <span className="text-[#999]">•</span>
                            <span className="text-sm">{exp.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <ul className="text-[#666] space-y-2 mt-3">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1A1A1A]/30 rounded-full mt-2 shrink-0" />
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
        <footer className="max-w-7xl mx-auto px-6 py-16 border-t border-[#1A1A1A]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-2">Let's Create Together</h3>
              <p className="text-[#666]">Open for creative collaborations and opportunities</p>
            </div>
            <div className="flex gap-4">
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="p-3 border border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={PERSONAL_INFO.email} className="p-3 border border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a href={PERSONAL_INFO.portfolio} target="_blank" rel="noreferrer" className="p-3 border border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-white transition-colors">
                <Globe size={20} />
              </a>
            </div>
          </div>
          <p className="text-center text-xs text-[#999] mt-12">© {new Date().getFullYear()} Vo Nguyen Dang Khoa. All rights reserved.</p>
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
              className="bg-[#FAFAFA] max-w-4xl w-full rounded-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <img src={activeProject.image} alt={activeProject.title} className="w-full h-64 md:h-96 object-cover" />
              <div className="p-8">
                <p className="text-xs tracking-widest text-[#666] uppercase mb-2">{activeProject.category}</p>
                <h3 className="text-2xl font-serif font-bold mb-4">{activeProject.title}</h3>
                <p className="text-[#666] mb-6">{activeProject.description}</p>
                <a href={activeProject.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 hover:opacity-60">
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

// 3. IT SIDE - Terminal Dashboard
const ITSide = ({ onBack, onSwitch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [typingText, setTypingText] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const fullText = "> whoami\n\nVo Nguyen Dang Khoa\nAI-Powered Developer\n9-month coding journey from zero to production";

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className="min-h-screen bg-[#0a0a0a] text-[#00FF94] font-mono"
      >
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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#00FF94]/20">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={onBack} className="p-2 -ml-2 flex items-center gap-1.5 text-xs text-[#00FF94]/60 hover:text-[#00FF94] transition-colors uppercase">
            <ArrowLeft size={16} /> <span className="hidden md:inline">Exit</span>
          </button>
          
          {/* Minimalist Identical Logo */}
          <div className="flex items-center justify-center opacity-90 drop-shadow-[0_0_5px_rgba(0,255,148,0.3)]">
            <VndkLogo size={32} vnColor="#FFFFFF" dkColor="#00FF94" />
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="px-3 py-1.5 text-[10px] md:text-xs text-[#00FF94] border border-[#00FF94] rounded hover:bg-[#00FF94] hover:text-[#0a0a0a] transition-colors flex items-center gap-1.5 font-bold uppercase">
              <span className="hidden md:inline">Download CV</span>
              <span className="md:hidden">CV</span>
            </button>
            <button onClick={onSwitch} className="px-3 py-1.5 text-[10px] md:text-xs text-[#0a0a0a] bg-[#00FF94] border border-[#00FF94] rounded hover:bg-transparent hover:text-[#00FF94] transition-colors flex items-center gap-1.5 uppercase font-bold">
              <Sparkles size={12} /> <span className="hidden md:inline">Design View</span><span className="md:hidden">Design</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Terminal Window */}
        <div className="max-w-5xl mx-4 md:mx-auto">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#00FF94]/20 border-b-0 rounded-t-lg">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="ml-4 text-xs text-[#00FF94]/50">khoa@portfolio ~</span>
          </div>

          {/* Terminal Content */}
          <div className="border border-[#00FF94]/20 bg-[#0a0a0a] p-6 md:p-8 min-h-[80vh]">
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 md:mb-8 no-scrollbar touch-pan-x">
              {['about', 'skills', 'projects', 'experience'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 md:px-4 md:py-2 text-[10px] md:text-xs border transition-colors whitespace-nowrap shrink-0 ${
                    activeTab === tab 
                      ? 'border-[#00FF94] bg-[#00FF94]/10 text-[#00FF94]' 
                      : 'border-[#00FF94]/30 text-[#00FF94]/50 hover:text-[#00FF94] hover:border-[#00FF94]/50'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'about' && (
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
            )}

            {activeTab === 'skills' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {Object.entries(IT_DATA.skills).map(([category, items]) => (
                  <div key={category} className="mb-6">
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
            )}

            {activeTab === 'projects' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="space-y-6">
                  {IT_DATA.projects.map((project, i) => (
                    <div key={i} className="border border-[#00FF94]/20 p-4 hover:border-[#00FF94]/40 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-bold">{project.name}</span>
                        <div className="flex gap-2">
                          {project.demo && (
                            <a href={project.demo} target="_blank" rel="noreferrer" className="text-[#00D9FF] hover:text-[#00FF94]" title="Live Demo">
                              <ExternalLink size={16} />
                            </a>
                          )}
                          <a href={project.github} target="_blank" rel="noreferrer" className="text-[#00FF94] hover:text-[#00D9FF]">
                            <Github size={16} />
                          </a>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, j) => (
                          <span key={j} className="text-xs bg-[#00FF94]/10 px-2 py-0.5 text-[#00FF94]">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'experience' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="space-y-6">
                  {IT_DATA.experience.map((exp, i) => (
                    <div key={i} className="border-l-2 border-[#00FF94] pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-white font-bold">{exp.role}</span>
                        <span className="text-xs text-[#00FF94]/50">{exp.period}</span>
                      </div>
                      <div className="text-sm text-[#00D9FF] mb-2">{exp.company}</div>
                      <ul className="text-sm text-slate-400 space-y-1">
                        {exp.highlights.map((h, j) => (
                          <li key={j}>• {h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contact Section */}
            <div className="mt-12 pt-8 border-t border-[#00FF94]/20">
              <div className="text-xs text-[#00FF94]/50 mb-4">&gt; exit --contact</div>
              <div className="flex flex-wrap gap-4">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-2 text-sm text-slate-300 hover:text-[#00FF94]">
                  <Mail size={14} /> {PERSONAL_INFO.email}
                </a>
                <a href={IT_DATA.forgejo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-[#00FF94]">
                  <Github size={14} /> git.khoavo.myds.me/vndangkhoa
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-[#00FF94]">
                  <Linkedin size={14} /> linkedin.com/in/khoa-vo-76291236
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-[#00FF94]/30">
        khoa@portfolio:~$ echo {new Date().getFullYear()} © Vo Nguyen Dang Khoa
      </footer>
    </motion.div>
    </>
  );
};

// --- MAIN APP ---
export default function Portfolio() {
  const [view, setView] = useState('landing'); // 'landing', 'creative', 'it'
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const handleSelect = (persona) => {
    setView(persona);
  };

  const handleBack = () => {
    setView('landing');
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <LandingPage key="landing" onSelect={handleSelect} />
        )}
        {view === 'creative' && (
          <CreativeSide key="creative" onBack={handleBack} onSwitch={() => setView('it')} />
        )}
        {view === 'it' && (
          <ITSide key="it" onBack={handleBack} onSwitch={() => setView('creative')} />
        )}
      </AnimatePresence>

      {/* Permanently mount the print portfolio so the browser can natively invoke it */}
      <div className="print-portfolio">
        <PrintPortfolio />
      </div>
    </>
  );
}