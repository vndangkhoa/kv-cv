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
        scrolled ? 'nav-blur py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between gap-4">
        {/* Standalone VNDK Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center justify-center p-1 rounded-xl group transition-transform hover:scale-105"
          title="VNDK — Vo Nguyen Dang Khoa"
        >
          <VNDKLogo size="md" />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full px-3 py-1 backdrop-blur-md shadow-sm">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3.5 py-1.5 text-xs md:text-sm rounded-full transition-all duration-300 font-medium ${
                  isActive
                    ? 'bg-[#00FF87]/20 text-[#00FF87] font-bold shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-subtle)]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Persona Switcher visible on md+ */}
          <div className="hidden md:block">
            <TabSwitch active={tab} onChange={onTabChange} size="sm" />
          </div>

          <button
            onClick={onOpenPdf}
            title="Export / Print PDF CV"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#00FF87]/40 bg-[#00FF87]/10 text-[#00FF87] hover:bg-[#00FF87]/25 text-xs font-mono font-bold transition-all shadow-sm"
          >
            <FileText size={14} /> Print CV
          </button>

          <button
            onClick={onEasterEgg}
            title="Nostalgic Terminal mode"
            className="h-9 w-9 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-[#00FF87] hover:border-[#00FF87]/50 transition-all bg-[var(--glass-bg)] backdrop-blur-md"
          >
            <Terminal size={15} />
          </button>
          <button
            onClick={toggleTheme}
            title={darkMode ? 'Light mode' : 'Dark mode'}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:scale-110 transition-all bg-[var(--glass-bg)] backdrop-blur-md"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden h-9 w-9 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-md"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-4 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-4 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-4 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden nav-blur mt-2 mx-4 rounded-2xl p-4 space-y-1 shadow-xl">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? 'bg-[#00FF87]/20 text-[#00FF87] font-bold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--accent-subtle)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="px-2 pt-3 border-t border-[var(--border)] mt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMenuOpen(false); onOpenPdf(); }}
              className="w-full py-2 rounded-xl bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/30 text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <FileText size={14} /> Print / Save PDF CV
            </button>
            <TabSwitch active={tab} onChange={(newTab) => { onTabChange(newTab); setMenuOpen(false); }} size="sm" />
          </div>
        </div>
      )}

      <span className="sr-only">{PERSONAL_INFO.name}</span>
    </motion.header>
  );
}
