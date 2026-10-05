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
  'ComfyUI', 'FLUX', 'Generative AI', 'React', 'TypeScript',
  'Docker', 'Blender', 'Cinema 4D', 'Art Direction', 'Motion Design',
];

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('theme') === 'light') return false;
      if (params.get('theme') === 'dark') return true;
      const saved = localStorage.getItem('kv-portfolio-theme');
      if (saved) return saved === 'dark';
      return true;
    }
    return true;
  });

  const [tab, setTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlTab = params.get('tab') || params.get('persona');
      if (urlTab === 'dev' || urlTab === 'code') return 'dev';
      if (urlTab === 'creative') return 'creative';
    }
    return 'dev';
  });
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [pdfMode, setPdfMode] = useState(() => (tab === 'creative' ? 'design' : 'it'));
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

  // Listen for open-pdf-preview event from downloadCV()
  useEffect(() => {
    const handleOpenPdf = (e) => {
      const targetMode = e?.detail?.mode || (tab === 'creative' ? 'design' : 'it');
      setPdfMode(targetMode);
      setShowPrintPreview(true);
    };

    window.addEventListener('open-pdf-preview', handleOpenPdf);
    return () => window.removeEventListener('open-pdf-preview', handleOpenPdf);
  }, [tab]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleOpenPdfModal = (mode) => {
    setPdfMode(mode || (tab === 'creative' ? 'design' : 'it'));
    setShowPrintPreview(true);
  };

  const handleDownloadPdf = () => {
    let title = "Khoa Vo - Security Consultant & Systems Architect";
    if (pdfMode === 'design') {
      title = "Khoa Vo - Creative Manager & AI Innovation Lead";
    } else if (pdfMode === 'all') {
      title = "Khoa Vo - Full Portfolio CV";
    }
    exportPdfDirectly((loading) => setIsGeneratingPdf(loading), title);
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
        onOpenPdf={(mode) => handleOpenPdfModal(mode)}
      />

      <main>
        <Hero
          tab={tab}
          onTabChange={setTab}
          isGeneratingPdf={isGeneratingPdf}
          setIsGeneratingPdf={setIsGeneratingPdf}
        />

        <Marquee items={MARQUEE_ITEMS} />

        <About tab={tab} />
        <Skills tab={tab} />
        <Projects tab={tab} onTabChange={setTab} />
        <Experience tab={tab} />
        <Contact tab={tab} />
      </main>

      <EasterEgg open={easterEggOpen} onClose={() => setEasterEggOpen(false)} />

      {/* Live PDF & Printable Portfolio Preview Overlay (Mobile Scroll & Zoom Support) */}
      {showPrintPreview && (
        <div className="pdf-preview-backdrop fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl overflow-y-auto">
          {/* Top Bar (Hidden on paper) */}
          <div className="no-print p-3 sm:p-4 bg-[#0A0D0C]/95 text-white border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 sticky top-0 z-[210] shadow-2xl backdrop-blur-md">
            
            {/* Left: Document Info */}
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
              <span className="font-bold text-white tracking-wide">
                {pdfMode === 'it' && '🛡️ SECURITY CONSULTANT & SYSTEMS ARCHITECT CV'}
                {pdfMode === 'design' && '🎨 CREATIVE MANAGER & AI INNOVATION LEAD CV'}
                {pdfMode === 'all' && '📑 COMPLETE PORTFOLIO DOSSIER (3 PAGES)'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/70 font-mono hidden sm:inline">
                {pdfMode === 'it' && '2 Pages • ATS Ready'}
                {pdfMode === 'design' && '1 Page • Creative'}
                {pdfMode === 'all' && '3 Pages • Master'}
              </span>
            </div>

            {/* Center: Interactive Mode Switcher */}
            <div className="flex items-center bg-black/60 p-1 rounded-full border border-white/15 shadow-inner">
              <button
                onClick={() => setPdfMode('it')}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  pdfMode === 'it'
                    ? 'bg-[#00FF87] text-[#0A0D0B] shadow-[0_0_12px_rgba(0,255,135,0.4)]'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>🛡️ IT / Security</span>
                <span className="text-[10px] opacity-75 hidden sm:inline">(2p)</span>
              </button>
              <button
                onClick={() => setPdfMode('design')}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  pdfMode === 'design'
                    ? 'bg-[#00E5FF] text-[#0A0D0B] shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>🎨 Design</span>
                <span className="text-[10px] opacity-75 hidden sm:inline">(1p)</span>
              </button>
              <button
                onClick={() => setPdfMode('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  pdfMode === 'all'
                    ? 'bg-amber-400 text-[#0A0D0B] shadow-[0_0_12px_rgba(251,191,36,0.4)]'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>📑 Full (3p)</span>
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="btn-iridescent flex-1 md:flex-none text-xs font-mono font-extrabold shadow-glow-sm py-2 px-5 cursor-pointer"
              >
                {isGeneratingPdf ? '⏳ Opening Print...' : '📥 Download / Print PDF'}
              </button>
              <button
                onClick={() => setShowPrintPreview(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-full text-xs font-mono font-semibold transition-all border border-white/10 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>

          {/* Printable Document Mobile Preview Wrapper */}
          <div className="pdf-preview-wrapper py-6 sm:py-10 bg-[#060807] min-h-[calc(100vh-65px)] flex justify-start md:justify-center p-3 sm:p-6 overflow-x-auto custom-scrollbar">
            <div className="printable-cv-area shrink-0 my-0">
              <PrintPortfolio mode={pdfMode} />
            </div>
          </div>
        </div>
      )}

      {/* Fallback Standalone Print Container: strictly hidden on screen, active only for @media print */}
      {!showPrintPreview && (
        <div className="standalone-print-mount hidden print:block" aria-hidden="true">
          <div className="printable-cv-area">
            <PrintPortfolio mode={tab === 'creative' ? 'design' : 'it'} />
          </div>
        </div>
      )}
    </div>
  );
}
