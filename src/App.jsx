import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import EasterEgg from './components/EasterEgg';
import Marquee from './components/ui/Marquee';
import PrintPortfolio from './components/PrintPortfolio';
import { triggerPdfPrint } from './data/personal';
import './print.css';

const MARQUEE_ITEMS = [
  'ComfyUI', 'FLUX', 'Stable Diffusion', 'Midjourney', 'RunwayML',
  'React', 'Next.js', 'TypeScript', 'Go', 'Rust', 'Python', 'Kotlin',
  'Docker', 'Tailwind CSS', 'Framer Motion', 'Cinema 4D', 'Blender',
  'Art Direction', 'Motion Graphics', 'Brand Strategy',
];

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kv-portfolio-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [tab, setTab] = useState('creative');
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('kv-portfolio-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Listen for open-pdf-preview event from downloadCV()
  useEffect(() => {
    const handleOpenPdf = () => {
      setShowPrintPreview(true);
    };

    window.addEventListener('open-pdf-preview', handleOpenPdf);
    return () => window.removeEventListener('open-pdf-preview', handleOpenPdf);
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`app-main relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-clip transition-colors duration-500 ${
      tab === 'dev' ? 'persona-dev-active' : 'persona-creative-active'
    }`}>
      <div className="noise-overlay" />

      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        tab={tab}
        onTabChange={setTab}
        onEasterEgg={() => setEasterEggOpen(true)}
        onOpenPdf={() => setShowPrintPreview(true)}
      />

      <main>
        <Hero tab={tab} onTabChange={setTab} />

        <Marquee items={MARQUEE_ITEMS} />

        <About tab={tab} />
        <Skills tab={tab} />
        <Projects tab={tab} />
        <Experience tab={tab} />
        <Contact tab={tab} />
      </main>

      <EasterEgg open={easterEggOpen} onClose={() => setEasterEggOpen(false)} />

      {/* Live PDF & Printable Portfolio Preview Overlay (Mobile Scroll & Zoom Support) */}
      {showPrintPreview && (
        <div className="pdf-preview-backdrop fixed inset-0 z-[200] bg-black/85 backdrop-blur-md overflow-y-auto">
          {/* Top Bar (Hidden on paper) */}
          <div className="no-print p-3 sm:p-4 bg-[#0A0D0B] text-white border-b border-[#00FF87]/30 flex flex-col sm:flex-row items-center justify-between gap-3 sticky top-0 z-[210] shadow-lg">
            <div className="flex items-center gap-2 font-mono text-xs text-[#00FF87] font-bold">
              <span>📄 KHOA.VO — Printable Portfolio & PDF CV</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={triggerPdfPrint}
                className="flex-1 sm:flex-none px-4 py-1.5 bg-[#00FF87] hover:bg-[#00E676] text-[#0A0D0B] rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md shadow-[#00FF87]/20 transition-all cursor-pointer"
              >
                Print / Save PDF
              </button>
              <button
                onClick={() => setShowPrintPreview(false)}
                className="flex-1 sm:flex-none px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all border border-slate-700 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>

          {/* Printable Document Mobile Preview Wrapper (Horizontal Scroll for Mobile) */}
          <div className="pdf-preview-wrapper py-4 sm:py-8 bg-slate-950/80 min-h-[calc(100vh-60px)] flex justify-start md:justify-center p-3 sm:p-6 overflow-x-auto custom-scrollbar">
            <div className="printable-cv-area shadow-2xl rounded-xl overflow-hidden bg-white shrink-0 my-0 print:shadow-none print:rounded-none">
              <PrintPortfolio />
            </div>
          </div>
        </div>
      )}

      {/* Fallback Standalone Print Container */}
      {!showPrintPreview && (
        <div className="printable-cv-area standalone-print-mount">
          <PrintPortfolio />
        </div>
      )}
    </div>
  );
}
