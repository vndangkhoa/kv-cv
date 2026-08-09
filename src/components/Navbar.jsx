import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Terminal, FileText } from 'lucide-react';
import TabSwitch from './ui/TabSwitch';
import VNDKLogo from './ui/VNDKLogo';
import PERSONAL_INFO from '../data/personal';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ darkMode, toggleTheme, tab, onTabChange, onEasterEgg, onOpenPdf }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Active section spy
      const sections = NAV_LINKS.map(link => document.getElementById(link.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${
        scrolled ? 'py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center justify-center p-1 rounded-xl group transition-transform hover:scale-105"
          title="VNDK — Vo Nguyen Dang Khoa"
        >
          <VNDKLogo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-200/60 dark:bg-slate-900/60 border border-slate-300/80 dark:border-slate-800/80 rounded-full px-3 py-1 backdrop-blur-md shadow-inner">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3.5 py-1.5 text-xs md:text-sm rounded-full transition-all duration-300 font-semibold cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-[#00FF87]/20 dark:text-[#00FF87] font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Sleek Control Toolbar Cluster */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
          {/* Persona Switcher (Creative vs Developer Mode) */}
          <div className="hidden sm:block">
            <TabSwitch active={tab} onChange={onTabChange} size="sm" />
          </div>

          {/* Download CV Button */}
          <button
            onClick={onOpenPdf}
            title="Download PDF CV"
            className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full border border-emerald-600/30 dark:border-[#00FF87]/40 bg-emerald-500/10 dark:bg-[#00FF87]/15 text-emerald-700 dark:text-[#00FF87] hover:bg-emerald-500/20 dark:hover:bg-[#00FF87]/25 text-xs font-mono font-bold transition-all duration-300 shadow-sm cursor-pointer hover:scale-105 active:scale-95"
          >
            <FileText size={13} />
            <span>Download CV</span>
          </button>

          {/* Terminal / Easter Egg Button */}
          <button
            onClick={onEasterEgg}
            title="Nostalgic Terminal mode"
            className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-[#00FF87] hover:border-emerald-500/50 transition-all duration-300 shadow-sm cursor-pointer hover:scale-105 active:scale-95"
          >
            <Terminal size={14} />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={darkMode ? 'Light mode' : 'Dark mode'}
            className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all duration-300 shadow-sm cursor-pointer hover:scale-105 active:scale-95"
          >
            {darkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden h-8 w-8 inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            aria-label="Menu"
          >
            <div className="space-y-1">
              <span className={`block h-0.5 w-3.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 w-3.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-3.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl mt-2 mx-4 rounded-2xl p-4 space-y-2 border border-slate-200 dark:border-slate-800 shadow-2xl">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors font-semibold ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-[#00FF87]/20 dark:text-[#00FF87] font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="px-2 pt-3 border-t border-slate-200 dark:border-slate-800 mt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMenuOpen(false); onOpenPdf(); }}
              className="w-full py-2.5 rounded-xl bg-emerald-500/15 dark:bg-[#00FF87]/15 text-emerald-700 dark:text-[#00FF87] border border-emerald-500/30 dark:border-[#00FF87]/30 text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <FileText size={14} /> Download PDF CV
            </button>
            <TabSwitch active={tab} onChange={(newTab) => { onTabChange(newTab); setMenuOpen(false); }} size="sm" />
          </div>
        </div>
      )}

      <span className="sr-only">{PERSONAL_INFO.name}</span>
    </motion.header>
  );
}
