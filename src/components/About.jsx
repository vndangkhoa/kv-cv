import { MapPin, Mail, ArrowUpRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Reveal from './ui/Reveal';
import VNDKLogo from './ui/VNDKLogo';
import { PERSONAL_INFO } from '../data/personal';
import { CREATIVE_DATA } from '../data/creative';
import { IT_DATA } from '../data/dev';

export default function About({ tab }) {
  const isCreative = tab === 'creative';
  const data = isCreative ? CREATIVE_DATA : IT_DATA;
  const summary = isCreative
    ? 'Visionary Creative Leader with 9+ years of expertise bridging brand strategy, digital design, motion graphics, and cutting-edge generative AI. Currently pioneering AI-augmented creative workflows, merging traditional art direction with ComfyUI, Stable Diffusion, and FLUX to redefine visual storytelling.'
    : IT_DATA.summary;

  const highlight = isCreative
    ? 'Currently leading AI-augmented creative production at Phibious, serving global Fortune 500 brands.'
    : '2-year journey from zero to 18+ production apps — streaming platforms, AI tools, and self-hosted infrastructure.';

  return (
    <section id="about" className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-20 sm:py-28 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Reveal>
        <div className="flex items-center gap-2.5 mb-3">
          <span className="h-px w-8 bg-gradient-to-r from-[#00FF87] via-[#00E5FF] to-transparent" />
          <span className="badge-iridescent-text text-xs font-mono tracking-[0.25em]">
            01 // ABOUT THE CREATOR
          </span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight mb-8 sm:mb-14 text-[var(--text-primary)]">
          ONE MIND, <br />
          <span className="iridescent-text">TWO DISCIPLINES</span>
        </h2>
      </Reveal>

      {/* Bento Grid Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Bento Card 1: Identity & Credentials (5 cols) */}
        <Reveal className="lg:col-span-5 h-full" delay={0.1}>
          <GlassCard className="h-full p-6 sm:p-8 flex flex-col justify-between border-[var(--glass-border)] bg-[var(--glass-bg)]">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] shadow-glow-sm">
                  <VNDKLogo size="md" />
                </div>
                <div className="badge-iridescent px-3 py-1 bg-[var(--glass-bg)] border border-[var(--border)] text-[10px] font-mono">
                  <span className="badge-iridescent-text">VERIFIED CREATIVE</span>
                </div>
              </div>

              <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-1">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-600 dark:text-[#00FF87] font-mono font-medium mb-6">
                {isCreative ? 'Creative Manager & AI Lead' : 'Full-Stack Developer & DevOps'}
              </p>

              {/* Direct Info Links */}
              <div className="space-y-2.5 text-xs font-mono">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-[var(--accent-subtle)] hover:bg-[var(--border)] border border-[var(--border)] text-[var(--text-primary)] transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail size={14} className="text-emerald-600 dark:text-[#00FF87] shrink-0" />
                    <span className="truncate">{PERSONAL_INFO.email}</span>
                  </div>
                  <ArrowUpRight size={13} className="text-[var(--text-muted)] group-hover:text-[#00FF87] transition-colors" />
                </a>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--accent-subtle)] border border-[var(--border)] text-[var(--text-secondary)]">
                  <MapPin size={14} className="text-cyan-600 dark:text-[#00E5FF] shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Spotlight Banner */}
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#00FF87]/15 via-[#00E5FF]/10 to-transparent border border-[#00FF87]/30 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-[#00FF87] mb-1">
                <Sparkles size={13} />
                <span>{isCreative ? 'CREATIVE SPOTLIGHT' : 'ENGINEERING SPOTLIGHT'}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">{highlight}</p>
            </div>
          </GlassCard>
        </Reveal>

        {/* Bento Card 2: Narrative & Metrics (7 cols) */}
        <Reveal className="lg:col-span-7 h-full" delay={0.2}>
          <GlassCard className="h-full p-6 sm:p-8 md:p-10 flex flex-col justify-between border-[var(--glass-border)] bg-[var(--glass-bg)]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-3">
                <ShieldCheck size={14} className="text-emerald-600 dark:text-[#00FF87]" />
                <span>Leadership Philosophy &amp; Core Strengths</span>
              </div>

              <h4 className="font-display text-xl sm:text-2xl text-[var(--text-primary)] font-bold mb-4 leading-snug">
                {data.title}
              </h4>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed whitespace-pre-line font-normal">
                {summary}
              </p>
            </div>

            {/* Metric Counters Grid */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] grid grid-cols-3 gap-4">
              <div className="p-3 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)]">
                <div className="font-display font-black text-2xl sm:text-4xl text-emerald-600 dark:text-[#00FF87]">9+</div>
                <div className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-1 font-mono">Years Exp</div>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)]">
                <div className="font-display font-black text-2xl sm:text-4xl text-cyan-600 dark:text-[#00E5FF]">
                  {isCreative ? '7 Yrs' : '18+'}
                </div>
                <div className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-1 font-mono">
                  {isCreative ? 'Team Lead' : 'Live Apps'}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)]">
                <div className="font-display font-black text-2xl sm:text-4xl text-purple-600 dark:text-[#D0B2FF]">100%</div>
                <div className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-1 font-mono">Hands-on</div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
