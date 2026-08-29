import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Sparkles, ExternalLink, FileText } from 'lucide-react';
import TabSwitch from './ui/TabSwitch';
import { downloadCV, PERSONAL_INFO } from '../data/personal';

export default function Hero({ tab, onTabChange }) {
  const isCreative = tab === 'creative';

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 pt-28 sm:pt-32 pb-10 bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#00FF87] selection:text-[#0A0D0B]"
    >
      {/* Background Video with Dark Vignette & Ambient Mesh Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="/human_head_turn.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover lg:scale-[1.1] opacity-35 dark:opacity-35 mix-blend-luminosity dark:mix-blend-screen transition-opacity duration-700"
        />
        {/* Radial Vignette & Noise Blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/90 via-[var(--bg-primary)]/60 to-[var(--bg-primary)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--bg-primary)_90%)]" />
      </div>

      {/* Top Section: Glowing Availability Pill & Persona Switcher */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="badge-iridescent px-4 py-1.5 bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-md shadow-lg">
            <span className="flex items-center gap-2 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF87] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF87]" />
              </span>
              <span className="badge-iridescent-text">
                {isCreative
                  ? 'AVAILABLE // CREATIVE & AI INNOVATION LEAD'
                  : 'FORGEJO SYNCED // FULL-STACK & DEVOPS'}
              </span>
            </span>
          </div>
        </motion.div>

        {/* Floating Persona Switcher Pill */}
        {onTabChange && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center"
          >
            <TabSwitch active={tab} onChange={onTabChange} size="md" />
          </motion.div>
        )}
      </div>

      {/* Center Hero: High-Impact Motion Headline & Subtitle */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto py-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 mb-3 text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-[#00FF87] font-mono font-semibold">
            <Sparkles size={14} className="animate-pulse" />
            <span>Vo Nguyen Dang Khoa &bull; Portfolio 2026</span>
          </div>

          <h1 className="text-[36px] sm:text-[54px] md:text-[68px] lg:text-[80px] font-black uppercase tracking-tight text-[var(--text-primary)] leading-[0.95] sm:leading-[0.92] max-w-5xl">
            <span>BRINGING THE </span>
            <span
              className="iridescent-text iridescent-glow-text font-black"
              data-text="UNEXPECTED"
            >
              UNEXPECTED
            </span>
            <br />
            <span>TO </span>
            <span className="text-[var(--text-primary)]">AI &amp; DIGITAL </span>
            <em className="serif-accent not-italic font-serif">EXPERIENCES</em>
          </h1>
        </motion.div>

        {/* Dynamic Subtitle & Value Proposition */}
        <motion.p
          key={tab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-[var(--text-secondary)] font-normal max-w-2xl leading-relaxed"
        >
          {isCreative
            ? 'Visionary Creative & AI Lead with 9+ years architecting visual strategies, motion graphics, and autonomous generative AI pipelines for Fortune 500 global brands.'
            : 'Full-stack builder and DevOps engineer deploying production streaming platforms, AI tools, and self-hosted microservices with high reliability.'}
        </motion.p>

        {/* Primary Action Buttons Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          {/* Main Glowing Action Button */}
          <button
            onClick={downloadCV}
            className="btn-iridescent text-xs sm:text-sm font-extrabold shadow-glow-md group"
          >
            <Download size={16} className="transition-transform group-hover:-translate-y-0.5" />
            <span>Download PDF CV</span>
          </button>

          {/* Explore Projects Button */}
          <button
            onClick={scrollToWork}
            className="btn-glass text-xs sm:text-sm font-bold group"
          >
            <span>Explore Selected Work</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 text-emerald-600 dark:text-[#00FF87]" />
          </button>

          {/* Secondary Quick External Link */}
          <a
            href={isCreative ? PERSONAL_INFO.linkedin : PERSONAL_INFO.forgejo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] text-xs font-mono transition-all duration-200"
          >
            <span>{isCreative ? 'LinkedIn Profile' : 'Forgejo Git'}</span>
            <ExternalLink size={12} className="opacity-70" />
          </a>
        </motion.div>
      </div>

      {/* Bottom Bento Metric Strip (Desktop: 4 columns, Mobile: 2x2 grid) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="relative z-10 w-full max-w-6xl mx-auto pt-8 border-t border-[var(--border)] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left"
      >
        {/* Metric 1 */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)] backdrop-blur-sm">
          <span className="font-mono text-[10px] text-emerald-600 dark:text-[#00FF87] uppercase tracking-wider block mb-1">
            01 // EXPERIENCE
          </span>
          <div className="font-display font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">9+ Years</div>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5">Creative &amp; Technical Leadership</p>
        </div>

        {/* Metric 2 */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)] backdrop-blur-sm">
          <span className="font-mono text-[10px] text-cyan-600 dark:text-[#00E5FF] uppercase tracking-wider block mb-1">
            02 // AI INNOVATION
          </span>
          <div className="font-display font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">
            {isCreative ? 'ComfyUI & FLUX' : 'Agentic & LLMs'}
          </div>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5">Autonomous Prompt Pipelines</p>
        </div>

        {/* Metric 3 */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)] backdrop-blur-sm">
          <span className="font-mono text-[10px] text-purple-600 dark:text-[#D0B2FF] uppercase tracking-wider block mb-1">
            03 // PRODUCTION
          </span>
          <div className="font-display font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">
            {isCreative ? 'Fortune 500' : '18+ Apps'}
          </div>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5">
            {isCreative ? 'P&G, Phibious, Luxury' : 'Self-Hosted CI/CD & Cloud'}
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)] backdrop-blur-sm">
          <span className="font-mono text-[10px] text-amber-600 dark:text-[#FFEEB8] uppercase tracking-wider block mb-1">
            04 // REGIONAL REACH
          </span>
          <div className="font-display font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">SEA Markets</div>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5">Omnichannel &amp; Digital Scale</p>
        </div>
      </motion.div>
    </section>
  );
}
