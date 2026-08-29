import { useState } from 'react';
import { Mail, MapPin, Phone, Linkedin, Github, Download, ArrowUpRight, Copy, Check, Sparkles } from 'lucide-react';
import MeshBackground from './ui/MeshBackground';
import Reveal from './ui/Reveal';
import { PERSONAL_INFO, downloadCV } from '../data/personal';
import { IT_DATA } from '../data/dev';

export default function Contact({ tab }) {
  const isCreative = tab === 'creative';
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32 md:py-40 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <MeshBackground className="opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center justify-center">
        {/* Glowing Badge */}
        <Reveal>
          <div className="badge-iridescent px-4 py-1 bg-[var(--glass-bg)] border border-[var(--glass-border)] mb-4 inline-flex items-center gap-2">
            <Sparkles size={12} className="text-emerald-600 dark:text-[#00FF87]" />
            <span className="badge-iridescent-text text-[11px] font-mono tracking-widest">
              05 // INITIATE TRANSMISSION
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[var(--text-primary)] max-w-3xl leading-[1.05]">
            LET'S BUILD SOMETHING <br />
            <span className="iridescent-text">UNFORGETTABLE</span>
          </h2>

          <p className="max-w-xl mx-auto mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-sans font-normal">
            {isCreative
              ? 'Hiring an AI Creative Lead? Scaling automated visual production? Let’s connect and engineer the future of your brand.'
              : 'Need scalable cloud microservices, media streaming apps, or custom AI tooling? Let’s ship together.'}
          </p>
        </Reveal>

        {/* Big Interactive Email Pill with Copy Trigger */}
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <div className="inline-flex items-center p-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-xl shadow-glow-sm">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2.5 px-5 py-2 text-xs sm:text-sm font-mono text-[var(--text-primary)] hover:text-emerald-600 dark:hover:text-[#00FF87] transition-colors"
              >
                <Mail size={14} className="text-emerald-600 dark:text-[#00FF87]" />
                <span>{PERSONAL_INFO.email}</span>
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-primary)] font-mono text-xs font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95 border border-[var(--border)]"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-600 dark:text-[#00FF87]" />
                    <span className="text-emerald-600 dark:text-[#00FF87]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Contact Info Cards */}
        <Reveal delay={0.25}>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
            <div className="p-4 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-left flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00FF87]/15 flex items-center justify-center text-emerald-600 dark:text-[#00FF87] shrink-0">
                <MapPin size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Location</div>
                <div className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">Ho Chi Minh City, VN</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-left flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00E5FF]/15 flex items-center justify-center text-cyan-600 dark:text-[#00E5FF] shrink-0">
                <Phone size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Phone / Telegram</div>
                <div className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">{PERSONAL_INFO.phone}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-left flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D0B2FF]/15 flex items-center justify-center text-purple-600 dark:text-[#D0B2FF] shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Status</div>
                <div className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-[#00FF87] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#00FF87] animate-ping" />
                  Open to Work
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Highlighted Glowing Download Button & Social Dock */}
        <Reveal delay={0.35}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={downloadCV}
              className="btn-iridescent text-xs sm:text-sm font-extrabold shadow-glow-md group"
            >
              <Download size={16} className="transition-transform group-hover:-translate-y-0.5" />
              <span>Download Printable PDF CV</span>
            </button>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] text-xs font-mono font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Linkedin size={14} className="text-emerald-600 dark:text-[#00FF87]" />
              <span>LinkedIn</span>
            </a>

            <a
              href={IT_DATA.forgejo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] text-xs font-mono font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Github size={14} className="text-cyan-600 dark:text-[#00E5FF]" />
              <span>Forgejo Git</span>
            </a>
          </div>
        </Reveal>

        {/* Footer info */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-[var(--border)] w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div>
            © 2026 {PERSONAL_INFO.name} &bull; All Rights Reserved
          </div>
          <div className="flex items-center gap-2">
            <span>Powered by React, Framer Motion &amp; MotionSites DNA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
