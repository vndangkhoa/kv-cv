import { useEffect, useState, useRef, useMemo } from 'react';
import EasterEgg from './components/EasterEgg';
import PrintPortfolio from './components/PrintPortfolio';
import LiquidLanding from './components/liquid/LiquidLanding';
import { exportPdfDirectly } from './data/personal';
import { ZoomIn, ZoomOut, Download, X } from 'lucide-react';
import './print.css';

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
      if (urlTab === 'creative' || urlTab === 'design') return 'creative';
      const saved = localStorage.getItem('kv-portfolio-tab');
      if (saved === 'dev') return 'dev';
      if (saved === 'creative') return 'creative';
    }
    return 'creative';
  });

  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kv-portfolio-tab', newTab);
    }
  };
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [pdfMode, setPdfMode] = useState(() => (tab === 'creative' ? 'design' : 'it'));
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [zoomMode, setZoomMode] = useState('fit'); // 'fit' | '100' | 'custom'
  const [customScale, setCustomScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const previewScrollRef = useRef(null);

  const PAGE_WIDTH = 794;
  const PAGE_HEIGHT = 1123;
  const PAGE_GAP = 28;
  const pageCount = pdfMode === 'design' ? 1 : pdfMode === 'it' ? 2 : 3;
  const unscaledTotalHeight = pageCount * PAGE_HEIGHT + (pageCount - 1) * PAGE_GAP;

  useEffect(() => {
    if (!showPrintPreview) return;

    const updateDimensions = () => {
      if (previewScrollRef.current) {
        setContainerWidth(previewScrollRef.current.clientWidth);
      } else {
        setContainerWidth(window.innerWidth);
      }
    };

    updateDimensions();
    const timer = setTimeout(updateDimensions, 60);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [showPrintPreview, pdfMode]);

  const fitScale = useMemo(() => {
    const isMobile = containerWidth < 640;
    const padding = isMobile ? 24 : 48;
    const available = Math.max(260, containerWidth - padding);
    return Math.min(1, Number((available / PAGE_WIDTH).toFixed(3)));
  }, [containerWidth]);

  const effectiveScale = useMemo(() => {
    if (zoomMode === 'fit') return fitScale;
    if (zoomMode === '100') return 1;
    return customScale;
  }, [zoomMode, fitScale, customScale]);

  const handleZoomIn = () => {
    const next = Math.min(1.5, Number((effectiveScale + 0.15).toFixed(2)));
    setCustomScale(next);
    setZoomMode('custom');
  };

  const handleZoomOut = () => {
    const next = Math.max(0.35, Number((effectiveScale - 0.15).toFixed(2)));
    setCustomScale(next);
    setZoomMode('custom');
  };

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
    <>
      <LiquidLanding
        tab={tab}
        setTab={handleTabChange}
        onOpenPdf={handleOpenPdfModal}
        onEasterEgg={() => setEasterEggOpen(true)}
      />

      <EasterEgg open={easterEggOpen} onClose={() => setEasterEggOpen(false)} />

      {/* Live PDF & Printable Portfolio Preview Overlay (Mobile Scroll & Zoom Support) */}
      {showPrintPreview && (
        <div className="pdf-preview-backdrop fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl overflow-y-auto">
          {/* Top Bar (Hidden on paper) */}
          <div className="no-print bg-[#0A0D0C]/95 text-white border-b border-white/10 sticky top-0 z-[210] shadow-2xl backdrop-blur-md">
            <div className="max-w-7xl mx-auto p-2 sm:p-3.5 flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-3">
              
              {/* Row 1 on mobile / Left on desktop: Document Title + Live Badge + Mobile Close */}
              <div className="flex items-center justify-between w-full md:w-auto gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="font-mono font-bold text-xs sm:text-sm text-white truncate tracking-wide">
                    {pdfMode === 'it' && '🛡️ SECURITY CONSULTANT CV'}
                    {pdfMode === 'design' && '🎨 CREATIVE MANAGER CV'}
                    {pdfMode === 'all' && '📑 COMPLETE KHOA VO CV'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-mono shrink-0">
                    {pdfMode === 'it' && '2p • ATS Ready'}
                    {pdfMode === 'design' && '1p • Creative'}
                    {pdfMode === 'all' && '3p • Master'}
                  </span>
                </div>

                {/* Mobile Close Button (Top-Right) */}
                <button
                  onClick={() => setShowPrintPreview(false)}
                  className="md:hidden w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer shrink-0"
                  title="Close preview"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Row 2: Mode Switcher & Zoom Controls & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 w-full md:w-auto flex-wrap sm:flex-nowrap">
                
                {/* Interactive Mode Switcher */}
                <div className="flex items-center bg-black/80 p-0.5 sm:p-1 rounded-full border border-white/15 shadow-inner">
                  <button
                    onClick={() => setPdfMode('design')}
                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      pdfMode === 'design'
                        ? 'bg-white text-black shadow-md'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span>🎨 Design</span>
                    <span className="text-[9px] opacity-70 hidden sm:inline">(1p)</span>
                  </button>
                  <button
                    onClick={() => setPdfMode('it')}
                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      pdfMode === 'it'
                        ? 'bg-white text-black shadow-md'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span>🛡️ IT</span>
                    <span className="text-[9px] opacity-70 hidden sm:inline">(2p)</span>
                  </button>
                  <button
                    onClick={() => setPdfMode('all')}
                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      pdfMode === 'all'
                        ? 'bg-white text-black shadow-md'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span>📑 All</span>
                    <span className="text-[9px] opacity-70 hidden sm:inline">(3p)</span>
                  </button>
                </div>

                {/* Zoom Controls Pill */}
                <div className="flex items-center bg-black/80 p-0.5 sm:p-1 rounded-full border border-white/15 text-[11px] font-mono text-white/80">
                  <button
                    onClick={() => setZoomMode('fit')}
                    title="Fit page to screen width"
                    className={`px-2 sm:px-2.5 py-1 rounded-full transition-all cursor-pointer font-bold ${
                      zoomMode === 'fit'
                        ? 'bg-emerald-500 text-black shadow-sm'
                        : 'hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Fit
                  </button>
                  <button
                    onClick={() => setZoomMode('100')}
                    title="Actual size (100%)"
                    className={`px-2 sm:px-2.5 py-1 rounded-full transition-all cursor-pointer font-bold ${
                      zoomMode === '100'
                        ? 'bg-white text-black shadow-sm'
                        : 'hover:text-white hover:bg-white/10'
                    }`}
                  >
                    100%
                  </button>
                  <div className="h-3 w-px bg-white/20 mx-0.5 hidden xs:block" />
                  <button
                    onClick={handleZoomOut}
                    title="Zoom out"
                    disabled={effectiveScale <= 0.35}
                    className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 cursor-pointer hidden xs:flex items-center justify-center"
                  >
                    <ZoomOut size={13} />
                  </button>
                  <span className="px-1 text-[10px] text-white/60 font-mono hidden sm:inline">
                    {Math.round(effectiveScale * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    title="Zoom in"
                    disabled={effectiveScale >= 1.5}
                    className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 cursor-pointer hidden xs:flex items-center justify-center"
                  >
                    <ZoomIn size={13} />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={handleDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="bg-white hover:bg-white/90 active:scale-95 text-black text-[11px] sm:text-xs font-mono font-extrabold shadow-md py-1.5 sm:py-2 px-3 sm:px-4 rounded-full transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                  >
                    <Download size={13} className="shrink-0" />
                    <span>{isGeneratingPdf ? 'Opening...' : 'Print / PDF'}</span>
                  </button>
                  <button
                    onClick={() => setShowPrintPreview(false)}
                    className="hidden md:inline-flex liquid-glass px-3.5 py-2 text-white/80 hover:text-white rounded-full text-xs font-mono font-semibold transition-all border border-white/15 cursor-pointer"
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Printable Document Mobile Preview Wrapper */}
          <div
            ref={previewScrollRef}
            className="pdf-preview-wrapper py-6 sm:py-10 bg-[#060807] min-h-[calc(100vh-65px)] flex justify-center p-2.5 sm:p-6 overflow-x-auto overflow-y-auto custom-scrollbar"
          >
            <div
              className="pdf-scale-wrapper relative mx-auto transition-all duration-200 ease-out select-none"
              style={{
                width: `${PAGE_WIDTH * effectiveScale}px`,
                height: `${unscaledTotalHeight * effectiveScale}px`,
              }}
            >
              <div
                style={{
                  width: `${PAGE_WIDTH}px`,
                  transform: `scale(${effectiveScale})`,
                  transformOrigin: 'top left',
                }}
                className="pdf-scale-stage printable-cv-area shrink-0 my-0"
              >
                <PrintPortfolio mode={pdfMode} />
              </div>
            </div>
          </div>

          {/* Mobile Bottom Helper Status Pill */}
          {zoomMode === 'fit' && effectiveScale < 0.8 && (
            <div className="no-print fixed bottom-4 left-1/2 -translate-x-1/2 z-[220] pointer-events-none">
              <div className="px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/75 shadow-xl flex items-center gap-1.5">
                <span>Auto-fitted ({Math.round(effectiveScale * 100)}%)</span>
                <span>•</span>
                <span className="text-emerald-400">Tap 100% to inspect full size</span>
              </div>
            </div>
          )}
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
    </>
  );
}
