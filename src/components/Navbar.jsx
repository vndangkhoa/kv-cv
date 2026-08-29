import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Terminal, FileText, Menu, X, ArrowUpRight } from 'lucide-react';
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
      setScrolled(window.scrollY > 20);

      // Active section spy
      const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 220;

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
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-6 py-3 sm:py-4 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Capsule Island Navbar */}
        <div className="w-full flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 py-2 rounded-full nav-island">
          {/* Brand Logo & Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            title="Khoa Vo — Creative & AI Portfolio"
          >
            <div className="p-1 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] group-hover:border-[#00FF87]/50 group-hover:shadow-glow-sm transition-all duration-300">
              <VNDKLogo size="sm" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="font-mono text-xs font-bold tracking-wider text-[var(--text-primary)]">KHOA.VO</span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono tracking-tight">AI &amp; Tech Lead</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--accent-subtle)] border border-[var(--border)] rounded-full p-1 shadow-inner">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? 'text-[#0A0D0B] font-bold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00FF87] via-[#00E5FF] to-[#00FF87] shadow-sm shadow-[#00FF87]/40"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls & Actions Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Persona Switcher (Creative vs Developer Mode) */}
            <div className="hidden sm:block">
              <TabSwitch active={tab} onChange={onTabChange} size="sm" />
            </div>

            {/* Direct Download CV Button */}
            <button
              onClick={onOpenPdf}
              title="Download PDF CV"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00FF87]/15 hover:bg-[#00FF87]/25 text-emerald-700 dark:text-[#00FF87] border border-[#00FF87]/35 text-xs font-mono font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-sm cursor-pointer"
            >
              <FileText size={13} />
              <span className="hidden sm:inline">PDF CV</span>
            </button>

            {/* Terminal Mode Icon Trigger */}
            <button
              onClick={onEasterEgg}
              title="Nostalgic Terminal OS"
              className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-emerald-600 dark:hover:text-[#00FF87] border border-[var(--border)] transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Terminal size={14} />
            </button>

            {/* Theme Toggle Icon Trigger */}
            <button
              onClick={toggleTheme}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden h-8 w-8 inline-flex items-center justify-center rounded-full bg-[var(--accent-subtle)] text-[var(--text-primary)] border border-[var(--border)] ml-1 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Modern Mobile Slide-Down Blur Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden mt-2 mx-auto max-w-lg p-5 rounded-3xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-2xl shadow-2xl space-y-4 pointer-events-auto text-[var(--text-primary)]"
          >
            {/* Persona Switcher for Mobile */}
            <div className="flex justify-center pb-2 border-b border-[var(--border)]">
              <TabSwitch
                active={tab}
                onChange={(newTab) => {
                  onTabChange(newTab);
                }}
                size="md"
              />
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`px-4 py-3 rounded-2xl text-left text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#00FF87]/20 text-emerald-700 dark:text-[#00FF87] border border-[#00FF87]/30 font-bold'
                        : 'bg-[var(--accent-subtle)] text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] border border-[var(--border)]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 border-t border-[var(--border)] space-y-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenPdf();
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#00FF87] to-[#00E5FF] text-[#0A0D0B] font-extrabold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-[#00FF87]/20 cursor-pointer"
              >
                <FileText size={15} /> Download PDF Resume / CV
              </button>

              <div className="flex items-center justify-between px-2 pt-2 text-xs text-[var(--text-muted)] font-mono">
                <span>{PERSONAL_INFO.location}</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-[#00FF87]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#00FF87] animate-ping" />
                  Available for Hire
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
