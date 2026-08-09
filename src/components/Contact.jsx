import { Mail, MapPin, Phone, Linkedin, Github, Download, ArrowUpRight } from 'lucide-react';
import MeshBackground from './ui/MeshBackground';
import Reveal from './ui/Reveal';
import { PERSONAL_INFO, downloadCV } from '../data/personal';
import { IT_DATA } from '../data/dev';

export default function Contact({ tab }) {
  const isCreative = tab === 'creative';

  return (
    <section id="contact" className="relative min-h-[90svh] sm:min-h-0 flex flex-col justify-center overflow-hidden py-10 sm:py-20 md:py-28">
      <MeshBackground className="opacity-60" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col justify-center">
        {/* Header & Title */}
        <Reveal>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] font-mono font-semibold">Contact</span>
          <h2 className="font-display font-extrabold tracking-tight leading-[1.1] text-2xl sm:text-4xl md:text-5xl mt-2 sm:mt-4 text-[var(--text-primary)]">
            Let's build something{' '}
            <span className="serif-accent italic text-[#00FF87]">that stands out</span>
          </h2>
          <p className="max-w-md mx-auto mt-2 sm:mt-4 text-xs sm:text-base text-[var(--text-secondary)] px-2">
            {isCreative
              ? 'Hiring a creative lead? Need AI-powered brand work? Let’s talk.'
              : 'Need an app shipped? Looking for a full-stack builder? Let’s talk.'}
          </p>
        </Reveal>

        {/* Email Button (Normal Clean Color) */}
        <Reveal delay={0.12}>
          <div className="mt-4 sm:mt-6 flex justify-center">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold shadow-sm transition-all duration-300 group"
            >
              <Mail size={14} className="text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
              <span className="truncate max-w-[220px] sm:max-w-none">{PERSONAL_INFO.email}</span>
              <ArrowUpRight size={13} className="text-slate-400 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </Reveal>

        {/* Contact Info Cards */}
        <Reveal delay={0.22}>
          <div className="mt-5 sm:mt-8 grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-3 max-w-sm sm:max-w-none mx-auto">
            {[
              { icon: MapPin, label: 'Based in', value: 'Ho Chi Minh City, VN' },
              { icon: Phone, label: 'Phone', value: PERSONAL_INFO.phone },
              { icon: Mail, label: 'Email', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href ? '_blank' : undefined}
                rel="noreferrer"
                className={`glass-card p-3 sm:p-4 text-left flex sm:flex-col items-center sm:items-start gap-2.5 sm:gap-1 transition-transform duration-300 hover:-translate-y-0.5 ${item.href ? 'hover:border-[#00FF87]/50' : 'pointer-events-none'}`}
              >
                <item.icon size={15} className="text-[#00FF87] shrink-0 sm:mb-1.5" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">{item.label}</div>
                  <div className="text-xs sm:text-sm font-semibold truncate sm:break-all">{item.value}</div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Highlighted Download CV Button (Moved Down Below Info Cards) */}
        <Reveal delay={0.32}>
          <div className="mt-5 sm:mt-8 flex justify-center">
            <button
              onClick={downloadCV}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#00FF87] hover:bg-[#00E676] text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-[#00FF87]/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download size={15} />
              <span>Download CV</span>
            </button>
          </div>
        </Reveal>

        {/* Social Icons Row */}
        <Reveal delay={0.4}>
          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full glass-card hover:-translate-y-1 hover:text-[#00FF87] transition-all shadow-sm"
              title="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href={IT_DATA.forgejo}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full glass-card hover:-translate-y-1 hover:text-[#00FF87] transition-all shadow-sm"
              title="Forgejo Repos"
            >
              <Github size={15} />
            </a>
          </div>
        </Reveal>

        <div className="mt-6 sm:mt-10 text-[10px] sm:text-xs text-[var(--text-muted)] font-medium">
          © 2026 {PERSONAL_INFO.name} &bull; Crafted with React, Framer Motion &amp; VNDK design system
        </div>
      </div>
    </section>
  );
}
