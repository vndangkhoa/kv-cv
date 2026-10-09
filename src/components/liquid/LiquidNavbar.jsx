import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileText, Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'referees', label: 'Referees' },
  { id: 'work', label: 'Work' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'experience', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export default function LiquidNavbar({ tab, onTabChange, onOpenPdf, onEasterEgg }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll spy for active section
      const scrollPos = window.scrollY + 220;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isCreative = tab === 'creative';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-6 py-2.5 sm:py-5 transition-all duration-300 pointer-events-none">
      <nav
        className={`liquid-glass rounded-full max-w-5xl mx-auto px-3 sm:px-6 py-1.5 sm:py-3 flex items-center justify-between pointer-events-auto transition-all duration-300 ${
          scrolled ? 'shadow-2xl shadow-black/90 bg-black/85 backdrop-blur-md' : 'bg-black/50'
        }`}
      >
        {/* Left: Clean Typographic Name */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white hover:opacity-80 transition-opacity cursor-pointer font-semibold text-xs sm:text-base tracking-tight font-sans whitespace-nowrap"
          >
            Khoa Vo
          </button>

          {/* Desktop Navigation Links matching actual page sections */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-[11px] lg:text-xs uppercase tracking-wider font-mono transition-all cursor-pointer px-2.5 py-1 rounded-full ${
                    isActive
                      ? 'text-white font-bold bg-white/15 shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Persona Toggle, Terminal OS, CV & Mobile Menu */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          {/* Dual-Persona Switcher: Creative / Dev */}
          <div className="liquid-glass rounded-full p-0.5 sm:p-1 flex items-center gap-0.5 sm:gap-1 border border-white/10">
            <button
              onClick={() => onTabChange('creative')}
              className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                isCreative
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Creative & AI Innovation persona (Default)"
            >
              <span>Creative</span>
            </button>
            <button
              onClick={() => onTabChange('dev')}
              className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                !isCreative
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Security & Systems persona"
            >
              <span>Dev</span>
            </button>
          </div>

          {/* Terminal Site Trigger Button */}
          <button
            onClick={onEasterEgg}
            title="Launch Terminal OS (Press / or click)"
            className="liquid-glass rounded-full px-2 sm:px-3 py-1 sm:py-1.5 text-white/80 hover:text-white text-[11px] sm:text-xs font-mono font-medium hover:bg-white/10 transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer border border-white/15"
          >
            <Terminal size={12} />
            <span className="hidden sm:inline">Terminal</span>
          </button>

          {/* Khoa Vo CV Button */}
          <button
            onClick={() => onOpenPdf(isCreative ? 'design' : 'it')}
            className="liquid-glass rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-white text-[11px] sm:text-xs font-mono font-medium hover:bg-white/10 transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer border border-white/15"
          >
            <FileText size={12} />
            <span>CV</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden liquid-glass rounded-full p-1.5 text-white/80 hover:text-white border border-white/15 hover:bg-white/10 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto mt-2 max-w-sm mx-auto liquid-glass bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`text-left text-xs font-mono uppercase tracking-wider py-2 px-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-white/20 text-white font-bold'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
