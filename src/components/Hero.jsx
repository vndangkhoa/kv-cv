import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Sparkles, ExternalLink, FileText } from 'lucide-react';
import TabSwitch from './ui/TabSwitch';
import { downloadCV, exportPdfDirectly, PERSONAL_INFO } from '../data/personal';

export default function Hero({ tab, onTabChange, isGeneratingPdf, setIsGeneratingPdf }) {
  const isCreative = tab === 'creative';

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownload = () => {
    downloadCV();
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85svh] lg:min-h-[90svh] w-full flex flex-col justify-end overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 pt-20 pb-3 sm:pb-4 bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#00FF87] selection:text-[#0A0D0B]"
    >
      {/* Background Video with Ambient Theme Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="/human_head_turn.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-[center_32%] opacity-60 dark:opacity-45 mix-blend-luminosity dark:mix-blend-screen transition-opacity duration-700"
        />
        {/* Subtle Ambient Vignette & Smooth Bottom Blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/15 to-[var(--bg-primary)]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--bg-primary)_95%)]" />
      </div>

      {/* Bottom Hero Content: Concise Headline, Subtitle, & Actions moved close to Bento Cards */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-auto pb-3 sm:pb-4 flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 mb-2 text-[11px] uppercase tracking-[0.25em] text-emerald-600 dark:text-[#00FF87] font-mono font-semibold">
            <Sparkles size={12} className="animate-pulse" />
            <span>PORTFOLIO '26</span>
          </div>

          <h1 className="text-[30px] sm:text-[44px] md:text-[54px] lg:text-[62px] font-black uppercase tracking-tight text-[var(--text-primary)] leading-[0.94] max-w-4xl">
            <span>BRINGING THE </span>
            <span
              className="iridescent-text iridescent-glow-text font-black"
              data-text="UNEXPECTED"
            >
              UNEXPECTED
            </span>
            <br />
            <span>TO </span>
            <span className="text-[var(--text-primary)]">DIGITAL </span>
            <em className="serif-accent not-italic font-serif">EXPERIENCES</em>
          </h1>
        </motion.div>

        {/* Short, punchy subtitle with minimal words */}
        <div className="mt-2 sm:mt-2.5 flex items-center">
          <motion.p
            key={tab}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] font-normal max-w-xl leading-relaxed"
          >
            {isCreative
              ? 'Creative & AI Lead — Generative AI & Digital Experiences.'
              : 'Full-Stack & DevOps Engineer — AI Systems & Infrastructure.'}
          </motion.p>
        </div>

        {/* Primary Action Buttons Bar with concise labels & Persona Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 sm:mt-3.5 flex flex-wrap items-center gap-2.5 sm:gap-3"
        >
          {/* Main Glowing Action Button */}
          <button
            onClick={handleDownload}
            disabled={isGeneratingPdf}
            className="btn-details-primary btn-press text-xs font-extrabold shadow-glow-md group cursor-pointer py-2 px-4"
          >
            <Download size={14} className="transition-transform group-hover:-translate-y-0.5" />
            <span>{isGeneratingPdf ? 'Generating...' : 'Resume'}</span>
          </button>

          {/* Explore Projects Button */}
          <button
            onClick={scrollToWork}
            className="btn-details-ghost btn-press text-xs font-bold group cursor-pointer py-2 px-4"
          >
            <span>Work</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1 text-emerald-600 dark:text-[#00FF87]" />
          </button>

          {/* Secondary Quick External Link */}
          <a
            href={isCreative ? PERSONAL_INFO.linkedin : PERSONAL_INFO.forgejo}
            target="_blank"
            rel="noreferrer"
            className="details-pill-trigger btn-press px-3.5 py-2 text-xs font-mono"
          >
            <span>{isCreative ? 'LinkedIn' : 'Forgejo'}</span>
            <ExternalLink size={11} className="opacity-70" />
          </a>

          {/* Persona Switcher Buttons (Creative & IT) right next to the action buttons */}
          {onTabChange && (
            <div className="flex items-center">
              <TabSwitch
                active={tab}
                onChange={onTabChange}
                size="sm"
                layoutId="hero-action-tab"
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Bento Metric Strip */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-6xl mx-auto pt-3.5 sm:pt-4 border-t border-[var(--border)] grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 text-left mb-2 sm:mb-2.5"
      >
        {/* Metric 1 */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)] backdrop-blur-sm">
          <span className="font-mono text-[10px] text-emerald-600 dark:text-[#00FF87] uppercase tracking-wider block mb-1">
            01 // EXPERIENCE
          </span>
          <div className="font-display font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">9+ Years</div>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5">Creative &amp; Tech Lead</p>
        </div>

        {/* Metric 2 */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)] backdrop-blur-sm">
          <span className="font-mono text-[10px] text-cyan-600 dark:text-[#00E5FF] uppercase tracking-wider block mb-1">
            02 // AI INNOVATION
          </span>
          <div className="font-display font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">
            {isCreative ? 'ComfyUI & FLUX' : 'Agentic & LLMs'}
          </div>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5">GenAI Workflows</p>
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
            {isCreative ? 'Global Brands' : 'CI/CD & Cloud'}
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--border)] backdrop-blur-sm">
          <span className="font-mono text-[10px] text-amber-600 dark:text-[#FFEEB8] uppercase tracking-wider block mb-1">
            04 // REGIONAL REACH
          </span>
          <div className="font-display font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">SEA Markets</div>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5">Regional Scale</p>
        </div>
      </motion.div>
    </section>
  );
}
