import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Terminal, FileText, Menu, X, ArrowUpRight } from 'lucide-react';
import TabSwitch from './ui/TabSwitch';
import VNDKLogo from './ui/VNDKLogo';
import NavigationDrawer from './NavigationDrawer';
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
  const [drawerOpen, setDrawerOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('drawer') === 'open';
    }
    return false;
  });
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
    setDrawerOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-6 py-3 sm:py-4 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Capsule Island Navbar */}
        <div className="w-full flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-5 py-2 rounded-full nav-island">
          {/* Brand Logo & Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none shrink-0"
            title="Khoa Vo — Creative & AI Portfolio"
          >
            <div className="p-1 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] group-hover:border-[#00FF87]/50 group-hover:shadow-glow-sm transition-all duration-300">
              <VNDKLogo size="sm" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-mono text-xs font-bold tracking-wider text-[var(--text-primary)]">KHOA.VO</span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono tracking-tight hidden md:inline">AI &amp; Tech Lead</span>
            </div>
          </button>

          {/* Desktop Navigation Links (shown on desktop >= 1024px where space permits) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[var(--accent-subtle)] border border-[var(--border)] rounded-full p-1 shadow-inner mx-auto">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
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
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Persona Switcher (visible on tablet where nav links are hidden) */}
            <div className="hidden sm:flex lg:hidden items-center shrink-0">
              <TabSwitch active={tab} onChange={onTabChange} size="sm" />
            </div>

            {/* Direct Download CV Button */}
            <button
              onClick={() => onOpenPdf(tab === 'creative' ? 'design' : 'it')}
              title={`View & Print ${tab === 'creative' ? 'Creative Design' : 'Security Consultant'} CV`}
              className="btn-press inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#00FF87]/15 hover:bg-[#00FF87]/25 text-emerald-700 dark:text-[#00FF87] border border-[#00FF87]/35 text-xs font-mono font-bold transition-all duration-300 shadow-glow-sm cursor-pointer shrink-0 whitespace-nowrap"
            >
              <FileText size={13} className="shrink-0" />
              <span className="hidden sm:inline">{tab === 'creative' ? 'Design CV' : 'Security CV'}</span>
              <span className="sm:hidden">CV</span>
            </button>

            {/* Terminal Mode Icon Trigger */}
            <button
              onClick={onEasterEgg}
              title="Nostalgic Terminal OS"
              className="btn-press h-8 w-8 hidden md:inline-flex items-center justify-center rounded-full bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-emerald-600 dark:hover:text-[#00FF87] border border-[var(--border)] transition-all duration-200 cursor-pointer shrink-0"
            >
              <Terminal size={14} />
            </button>

            {/* Theme Toggle Icon Trigger */}
            <button
              onClick={toggleTheme}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="btn-press h-8 w-8 inline-flex items-center justify-center rounded-full bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] transition-all duration-200 cursor-pointer shrink-0"
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Open Navigation Drawer Trigger (Details.so inspired) */}
            <button
              onClick={() => setDrawerOpen(true)}
              title="Open Navigation Drawer (Index & Quick Actions)"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] hover:border-[#00FF87]/40 text-xs font-mono transition-all duration-200 cursor-pointer btn-press ml-0.5 sm:ml-1 shrink-0 whitespace-nowrap"
              aria-label="Open Navigation Drawer"
            >
              <Menu size={14} className="text-[#00FF87] shrink-0" />
              <span className="hidden sm:inline font-semibold tracking-wide">Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Details.so Open Navigation Drawer Component */}
      <NavigationDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeSection={activeSection}
        tab={tab}
        onTabChange={onTabChange}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        onEasterEgg={onEasterEgg}
        onOpenPdf={onOpenPdf}
      />
    </motion.header>
  );
}
