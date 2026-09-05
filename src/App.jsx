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
import { exportPdfDirectly } from './data/personal';
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
    return true;
  });

  const [tab, setTab] = useState('creative');
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('kv-portfolio-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const handleOpenPdf = () => setShowPrintPreview(true);
    window.addEventListener('open-pdf-preview', handleOpenPdf);
    return () => window.removeEventListener('open-pdf-preview', handleOpenPdf);
  }, []);

  const toggleTheme = () => setDarkMode((prev) => !prev);
  const handleDownloadPdf = () => exportPdfDirectly((loading) => setIsGeneratingPdf(loading));

  return (
    <div className={`app-main relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-clip transition-colors duration-500 ${tab === 'dev' ? 'persona-dev-active' : 'persona-creative-active'}`}>
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

      {showPrintPreview && (
        <div className="pdf-preview-backdrop fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl overflow-y-auto">
          <div className="no-print p-3 sm:p-4 bg-[#0A0D0C]/95 text-white border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sticky top-0 z-[210] shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 font-mono text-xs text-[#00FF87] font-bold">
              <span>📄 KHOA.VO — Printable Portfolio &amp; PDF CV</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
              <button onClick={handleDownloadPdf} disabled={isGeneratingPdf} className="btn-iridescent flex-1 sm:flex-none text-xs font-mono font-extrabold shadow-glow-sm py-2 px-5">
                {isGeneratingPdf ? '⏳ Generating PDF...' : '📥 Download PDF'}
              </button>
              <button onClick={() => setShowPrintPreview(false)} className="flex-1 sm:flex-none px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-full text-xs font-mono font-semibold transition-all border border-white/10 cursor-pointer">
                Close Preview
              </button>
            </div>
          </div>
          <div className="pdf-preview-wrapper py-6 sm:py-10 bg-[#060807] min-h-[calc(100vh-65px)] flex justify-start md:justify-center p-3 sm:p-6 overflow-x-auto custom-scrollbar">
            <div className="printable-cv-area shadow-2xl rounded-2xl overflow-hidden bg-white shrink-0 my-0 print:shadow-none print:rounded-none">
              <PrintPortfolio />
            </div>
          </div>
        </div>
      )}

      {!showPrintPreview && (
        <div className="printable-cv-area standalone-print-mount">
          <PrintPortfolio />
        </div>
      )}
    </div>
  );
}
