import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUpRight,
  FileText,
  Terminal,
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Sparkles,
  Layers,
  Code2,
  GitBranch,
} from 'lucide-react';
import VNDKLogo from './ui/VNDKLogo';
import TabSwitch from './ui/TabSwitch';
import ProgressiveBlur from './ui/ProgressiveBlur';
import PERSONAL_INFO from '../data/personal';

const DRAWER_LINKS = [
  { id: 'hero', index: '00', label: 'Overview', desc: 'Hero & Value Overview' },
  { id: 'about', index: '01', label: 'About', desc: 'Story & Philosophy' },
  { id: 'skills', index: '02', label: 'Skills', desc: 'Technical & Creative Matrix' },
  { id: 'work', index: '03', label: 'Work', desc: 'Commercial Projects & Repos' },
  { id: 'experience', index: '04', label: 'Journey', desc: 'Career Milestones & Roles' },
  { id: 'contact', index: '05', label: 'Contact', desc: 'Get in Touch & Inquiries' },
];

export default function NavigationDrawer({
  isOpen,
  onClose,
  activeSection,
  tab,
  onTabChange,
  darkMode,
  toggleTheme,
  onEasterEgg,
  onOpenPdf,
}) {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mounted, setMounted] = useState(false);
  const isCreative = tab === 'creative';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut: ESC to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (id) => {
    document.body.style.overflow = '';
    onClose();
    setTimeout(() => {
      if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -70;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }, 60);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end pointer-events-auto">
          {/* Frosted Glass Backdrop inspired by details.so */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xl cursor-pointer pointer-events-auto"
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel with Silky Sliding Transition */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 w-full max-w-lg h-full bg-[var(--bg-elevated)] border-l border-[var(--border)] shadow-2xl backdrop-blur-3xl flex flex-col justify-between overflow-y-auto custom-scrollbar text-[var(--text-primary)] pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            {/* Top Bar inside Drawer */}
            <div className="p-5 sm:p-6 pb-3 flex items-center justify-between border-b border-[var(--border)] sticky top-0 bg-[var(--bg-elevated)]/90 backdrop-blur-md z-20">
              <button
                onClick={() => handleNavClick('hero')}
                className="btn-press flex items-center gap-3 group cursor-pointer focus:outline-none text-left"
                title="Khoa Vo — Return to Top"
              >
                <div className="p-1.5 rounded-xl bg-[var(--accent-subtle)] border border-[var(--border)] group-hover:border-[#00FF87]/50 group-hover:shadow-[0_0_15px_rgba(0,255,135,0.3)] transition-all duration-200">
                  <VNDKLogo size="sm" />
                </div>
                <div>
                  <h2 className="font-mono text-sm font-bold tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    KHOA.VO
                  </h2>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--accent)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                    <span>{isCreative ? 'CREATIVE LEAD' : 'FULL-STACK & DEVOPS'}</span>
                  </div>
                </div>
              </button>

              {/* Close Button with ESC Keyboard Badge */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] transition-all duration-200 cursor-pointer"
                  aria-label="Close menu"
                  title="Close Menu (ESC)"
                >
                  <kbd className="text-[10px] font-mono font-semibold text-[var(--text-muted)]">ESC</kbd>
                  <X size={15} className="transition-transform duration-200 hover:rotate-90" />
                </button>
              </div>
            </div>

            {/* Persona Switcher Section in Drawer */}
            <div className="px-5 sm:px-6 pt-3 pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[var(--text-muted)] uppercase whitespace-nowrap">
                    ACTIVE PERSONA
                  </span>
                  <span className="sm:hidden text-[10px] font-mono text-[var(--accent)] uppercase font-semibold">
                    {isCreative ? 'Creative Mode' : 'Dev Mode'}
                  </span>
                </div>
                <div className="flex w-full sm:w-auto justify-stretch sm:justify-end">
                  <TabSwitch
                    active={tab}
                    onChange={onTabChange}
                    size="sm"
                    className="w-full sm:w-auto justify-center"
                    layoutId="drawer-persona-tab"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Links with Gliding Hover Pill & Smooth Styling */}
            <div className="relative px-5 sm:px-6 py-2 flex-1 flex flex-col justify-start">
              {/* Subtle top progressive blur dissolve */}
              <ProgressiveBlur
                direction="top"
                className="absolute top-0 left-0 right-0 h-6 pointer-events-none z-10"
                layers={4}
                maxBlur={12}
                tint={false}
              />

              <nav className="space-y-1 relative py-2" onMouseLeave={() => setHoveredLink(null)}>
                {DRAWER_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  const isHovered = hoveredLink === link.id;

                  return (
                    <div key={link.id} className="relative">
                      <button
                        onClick={() => handleNavClick(link.id)}
                        onMouseEnter={() => setHoveredLink(link.id)}
                        className={`btn-press w-full py-3 sm:py-3.5 px-3.5 sm:px-4 rounded-2xl flex items-center justify-between text-left transition-all duration-200 group cursor-pointer relative z-10 ${
                          isActive
                            ? 'text-[var(--text-primary)] font-bold'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <div className="flex items-baseline gap-3 sm:gap-4 min-w-0">
                          <span className="font-mono text-xs text-[var(--accent)] opacity-80 group-hover:opacity-100 font-bold shrink-0">
                            {link.index}
                          </span>
                          <div className="min-w-0">
                            <span className="text-xl sm:text-3xl font-extrabold tracking-tight block truncate">
                              {link.label}
                            </span>
                            <span className="text-[11px] font-mono text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] block truncate">
                              {link.desc}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {isActive && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/40 font-bold shrink-0">
                              ACTIVE
                            </span>
                          )}
                          <ArrowUpRight
                            size={18}
                            className={`shrink-0 transition-all duration-200 ${
                              isHovered || isActive
                                ? 'text-[var(--accent)] translate-x-0.5 -translate-y-0.5 opacity-100'
                                : 'text-[var(--text-muted)] opacity-30 group-hover:opacity-100'
                            }`}
                          />
                        </div>
                      </button>

                      {/* Gliding Pill Highlight on Hover */}
                      {isHovered && (
                        <motion.div
                          layoutId="drawer-hover-pill"
                          className="absolute inset-0 bg-[var(--accent-subtle)] border border-[var(--border)] rounded-2xl pointer-events-none"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Subtle bottom progressive blur dissolve */}
              <ProgressiveBlur
                direction="bottom"
                className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none z-10"
                layers={4}
                maxBlur={12}
                tint={false}
              />
            </div>

            {/* Drawer Bottom Actions & Quick Tools (details.so inspiration) */}
            <div className="p-6 sm:p-8 pt-4 border-t border-[var(--border)] bg-[var(--bg-secondary)]/90 backdrop-blur-md space-y-4">
              {/* Action Buttons Row */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    document.body.style.overflow = '';
                    onClose();
                    setTimeout(() => {
                      if (onOpenPdf) onOpenPdf();
                    }, 50);
                  }}
                  className="btn-press py-3 px-4 rounded-xl font-mono text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 bg-gradient-to-r from-[#00FF87] to-[#00E5FF] text-[#0A0D0B] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)] cursor-pointer"
                  title="Open PDF CV & Printable Portfolio"
                >
                  <FileText size={15} className="stroke-[2.5]" />
                  <span>Get Resume</span>
                </button>

                <button
                  onClick={() => {
                    document.body.style.overflow = '';
                    onClose();
                    setTimeout(() => {
                      if (onEasterEgg) onEasterEgg();
                    }, 50);
                  }}
                  className="btn-press py-3 px-4 rounded-xl font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-primary)] border border-[var(--border)] active:scale-95 transition-all shadow-md cursor-pointer"
                  title="Launch Retro Terminal OS"
                >
                  <Terminal size={15} className="text-[var(--accent)]" />
                  <span>Terminal OS</span>
                </button>
              </div>

              {/* Social Channels, Theme Switcher & Contact Links */}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <a
                    href="https://git.khoavo.myds.me/vndangkhoa"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-press p-2 rounded-lg bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] border border-[var(--border)] transition-all cursor-pointer"
                    title="Forgejo Git Self-Hosted Repos"
                  >
                    <GitBranch size={16} />
                  </a>
                  <a
                    href="https://github.com/vndangkhoa"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-press p-2 rounded-lg bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] transition-all cursor-pointer"
                    title="GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/khoa-vo-76291236/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-press p-2 rounded-lg bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[#00E5FF] border border-[var(--border)] transition-all cursor-pointer"
                    title="LinkedIn"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="btn-press p-2 rounded-lg bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] border border-[var(--border)] transition-all cursor-pointer"
                    title={`Email: ${PERSONAL_INFO.email}`}
                  >
                    <Mail size={16} />
                  </a>
                  {toggleTheme && (
                    <button
                      onClick={toggleTheme}
                      className="btn-press p-2 rounded-lg bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-amber-400 border border-[var(--border)] transition-all cursor-pointer"
                      title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                      {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                  )}
                </div>

                <a
                  href="https://maps.google.com/?q=Ho+Chi+Minh+City,+Vietnam"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-press inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] transition-all cursor-pointer"
                  title="Open Ho Chi Minh City on Google Maps"
                >
                  <MapPin size={13} className="text-[var(--accent)]" />
                  <span>HCMC, VN</span>
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
