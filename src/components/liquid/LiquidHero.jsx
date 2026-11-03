import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, Linkedin, Github, GitFork, Mail } from 'lucide-react';
import KineticCharacterCanvas from '../ui/KineticCharacterCanvas';
import {
  CursorTimelineController,
  useCursorAssemblyMode,
} from '../effects/CursorBuilder';
import PERSONAL_INFO from '../../data/personal';
import { DYNAMIC_COPY } from '../../data/dynamicCopy';

export default function LiquidHero({
  tab,
  onOpenPdf,
  onEasterEgg,
  onAssemblyComplete,
}) {
  const [copied, setCopied] = useState(false);
  const isCreative = tab === 'creative';
  const heroCopy = isCreative ? DYNAMIC_COPY.hero.creative : DYNAMIC_COPY.hero.dev;

  const heroSectionRef = useRef(null);
  const assemblyMode = useCursorAssemblyMode();
  const [snappedMap, setSnappedMap] = useState({});
  const [polishedMap, setPolishedMap] = useState({});
  const [assemblyDone, setAssemblyDone] = useState(false);

  const handleElementSnap = useCallback(
    (targetKey) => {
      setSnappedMap((prev) =>
        prev[targetKey] ? prev : { ...prev, [targetKey]: true }
      );
      if (targetKey === 'hero-social') {
        onAssemblyComplete?.();
      }
    },
    [onAssemblyComplete]
  );

  const handleElementPolish = useCallback((targetKey) => {
    if (!targetKey) return;
    setPolishedMap((prev) =>
      prev[targetKey] ? prev : { ...prev, [targetKey]: true }
    );
  }, []);

  const handleAssemblyComplete = useCallback(() => {
    setAssemblyDone(true);
    onAssemblyComplete?.();
  }, [onAssemblyComplete]);

  const getPolishState = (targetKey) => {
    if (assemblyMode !== 'swarm' || assemblyDone || polishedMap[targetKey]) {
      return 'polished';
    }
    return 'raw';
  };

  // In desktop `swarm` mode, `CursorTimelineController` progressively spawns each element
  // character-by-character / pixel-by-pixel via `applyProgressiveDomSpawn` (`clip-path` + `opacity`)
  // at exact 1:1 unshifted geometry (`x: 0, y: 0, scale: 1`).
  const getAssemblyMotion = (targetKey, mobileDelay = 0) => {
    if (assemblyMode === 'reduced') {
      return {};
    }

    if (assemblyMode === 'mobile') {
      return {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.6,
          delay: mobileDelay,
          ease: [0.16, 1, 0.3, 1],
        },
      };
    }

    return {};
  };

  // Listen for keyboard '/' shortcut to launch terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        onEasterEgg?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEasterEgg]);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const bgCanvasRevealed =
    assemblyMode !== 'swarm' ||
    Boolean(snappedMap['hero-social'] || assemblyDone);

  const macroFrameLocked =
    assemblyMode === 'swarm' &&
    Boolean(snappedMap['hero-frame']) &&
    !assemblyDone;

  const badgeMotion = getAssemblyMotion('hero-badge', 0);
  const titleMotion = getAssemblyMotion('hero-title', 0.1);
  const contactMotion = getAssemblyMotion('hero-contact', 0.2);
  const subtitleMotion = getAssemblyMotion('hero-subtitle', 0.3);
  const ctaMotion = getAssemblyMotion('hero-cta', 0.4);
  const socialMotion = getAssemblyMotion('hero-social', 0.5);

  return (
    <section
      ref={heroSectionRef}
      className={`relative min-h-screen w-full flex flex-col justify-between overflow-hidden text-white pt-24 sm:pt-28 transition-colors duration-700 ${
        bgCanvasRevealed ? 'bg-black' : 'bg-[#050706]'
      }`}
    >
      {/* Multi-Cursor Dynamic Canvas Assembly Overlay (Desktop & non-reduced-motion) */}
      <CursorTimelineController
        containerRef={heroSectionRef}
        mode={assemblyMode}
        onElementSnap={handleElementSnap}
        onElementPolish={handleElementPolish}
        onComplete={handleAssemblyComplete}
      />

      {/* Background Kinetic Characters from human_head_turn.mp4 (Reveals smoothly once cursors finish building the canvas) */}
      <motion.div
        initial={
          assemblyMode === 'swarm' ? { opacity: 0 } : { opacity: 0.85 }
        }
        animate={{ opacity: bgCanvasRevealed ? 0.85 : 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <KineticCharacterCanvas
          src="/human_head_turn.mp4"
          poster="/human_head_turn_poster.webp"
          className="w-full h-full"
        />
        {/* Ambient Dark Falloffs to guarantee crisp text legibility over animated ASCII */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.72)_0%,_rgba(0,0,0,0.45)_50%,_black_95%)] pointer-events-none" />
      </motion.div>

      {/* Main Center Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 text-center -translate-y-[4%] sm:-translate-y-[8%]">
        {/* Outer Macro Layout Frame (Constructed by Tier 2 `Arch-Frame` #3B82F6 via `FRAME_OUTLINE` bottom-left -> top-right) */}
        <div
          data-cursor-target="hero-frame"
          className={`relative flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-2 sm:px-6 py-4 sm:py-6 rounded-2xl transition-all duration-500 ${
            macroFrameLocked
              ? 'ring-1 ring-blue-500/30 bg-blue-500/[0.02]'
              : ''
          }`}
        >
          {/* Soft radial backdrop behind text block */}
          <div className="absolute -inset-10 -z-10 bg-radial from-black/75 via-black/40 to-transparent blur-3xl pointer-events-none rounded-full" />

          {/* 1. Badge / Pill (Assigned to Tier 3 `Status-Node` #A855F7 — CENTER_SPLIT_PILL) */}
          <motion.div
            data-cursor-target="hero-badge"
            data-aesthetic-polish={getPolishState('hero-badge')}
            initial={badgeMotion.initial}
            animate={badgeMotion.animate}
            transition={badgeMotion.transition}
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[#0c0c0e]/90 backdrop-blur-xl border border-emerald-500/35 text-xs font-mono text-white/95 shadow-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{heroCopy.badge}</span>
          </motion.div>

          {/* 2. Heading in Instrument Serif (Assigned to Tier 3 `Type-Bot` #00E599 — TEXT_BASELINE_SWEEP) */}
          <motion.h1
            data-cursor-target="hero-title"
            data-aesthetic-polish={getPolishState('hero-title')}
            initial={titleMotion.initial}
            animate={titleMotion.animate}
            transition={titleMotion.transition}
            className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight mb-4 sm:mb-6 leading-[1.08] sm:leading-[1.02] break-words max-w-5xl px-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
          >
            {heroCopy.titleLead}{' '}
            <em className="italic font-serif text-white/85">
              {heroCopy.titleAccent}
            </em>
            {heroCopy.titleTrail}
          </motion.h1>

          {/* 3. Direct Recruiter Contact Capsule (Assigned to Tier 3 `UI-Craft` #FF4444 — RIGHT_TO_LEFT_DOCK) */}
          <motion.div
            data-cursor-target="hero-contact"
            data-aesthetic-polish={getPolishState('hero-contact')}
            initial={contactMotion.initial}
            animate={contactMotion.animate}
            transition={contactMotion.transition}
            className="max-w-2xl w-full mx-auto mb-4 sm:mb-6 px-2 sm:px-0"
          >
            <div className="bg-[#0c0c0e]/90 backdrop-blur-xl rounded-2xl sm:rounded-full px-3 sm:px-5 py-2 sm:py-2 flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.7)] border border-white/20 hover:border-white/35 transition-all">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 text-xs sm:text-sm font-mono text-white hover:text-emerald-300 transition-colors truncate"
                title="Send email"
              >
                <Mail size={14} className="text-emerald-400 shrink-0" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </a>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-full px-3 py-1.5 text-[11px] font-mono font-semibold transition-all cursor-pointer border border-white/15 flex items-center gap-1"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check size={12} className="text-emerald-400" />
                  ) : null}
                  <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                </button>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-full px-3 py-1.5 text-[11px] font-mono font-semibold transition-all border border-white/15"
                  title="Call directly"
                >
                  0398 300 340
                </a>

                <a
                  href="https://zalo.me/0398300340"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-white/90 text-black rounded-full px-3.5 py-1.5 text-[11px] font-mono font-bold transition-transform hover:scale-105 active:scale-95 shadow-md"
                  title="Chat on Zalo (0398300340)"
                >
                  Zalo Chat &rarr;
                </a>
              </div>
            </div>
          </motion.div>

          {/* 4. Subtitle with frosted dark backdrop (Assigned to Tier 3 `Comfy-Node` #FFB800 — BOTTOM_UP_SHADER) */}
          <motion.div
            data-cursor-target="hero-subtitle"
            data-aesthetic-polish={getPolishState('hero-subtitle')}
            initial={subtitleMotion.initial}
            animate={subtitleMotion.animate}
            transition={subtitleMotion.transition}
            className="max-w-2xl mx-auto px-2"
          >
            <p className="inline-block text-white/95 text-xs sm:text-sm md:text-base leading-relaxed px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-black/65 backdrop-blur-md border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.85)] font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {heroCopy.subtitle}
            </p>
          </motion.div>

          {/* 5. Action Buttons (Assigned to Tier 3 `Sys-Arch` #06B6D4 — MULTI_POINT_STAMP Waypoints 1-3) */}
          <motion.div
            data-cursor-target="hero-cta"
            data-aesthetic-polish={getPolishState('hero-cta')}
            initial={ctaMotion.initial}
            animate={ctaMotion.animate}
            transition={ctaMotion.transition}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-6 sm:mt-8 px-2"
          >
            <button
              onClick={() => onOpenPdf('design')}
              className={`rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.6)] ${
                isCreative
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-[#0e0e12]/85 backdrop-blur-md text-white border border-white/20 hover:bg-white/15'
              }`}
            >
              {heroCopy.ctaPrimary}
            </button>
            <button
              onClick={() => onOpenPdf('it')}
              className={`rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.6)] ${
                !isCreative
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-[#0e0e12]/85 backdrop-blur-md text-white border border-white/20 hover:bg-white/15'
              }`}
            >
              {heroCopy.ctaSecondary}
            </button>
            <button
              onClick={scrollToAbout}
              className="bg-[#0e0e12]/65 backdrop-blur-md rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-white/80 hover:text-white text-xs sm:text-sm font-mono transition-all border border-white/15 hover:border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              {heroCopy.ctaExplore}
            </button>
          </motion.div>
        </div>
      </div>

      {/* 6. Social Icons Footer (Assigned to Tier 3 `Sys-Arch` #06B6D4 — MULTI_POINT_STAMP Waypoint 4) */}
      <motion.div
        data-cursor-target="hero-social"
        data-aesthetic-polish={getPolishState('hero-social')}
        initial={socialMotion.initial}
        animate={socialMotion.animate}
        transition={socialMotion.transition}
        className="relative z-10 flex justify-center items-center gap-3 sm:gap-4 mb-10 sm:mb-12 w-fit mx-auto px-3 py-1"
      >
        <a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/10 transition-all border border-white/15 hover:scale-105"
          title="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/10 transition-all border border-white/15 hover:scale-105"
          title="GitHub"
        >
          <Github size={18} />
        </a>
        <a
          href={PERSONAL_INFO.forgejo}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/10 transition-all border border-white/15 hover:scale-105"
          title="Self-Hosted Forgejo Git"
        >
          <GitFork size={18} />
        </a>
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/10 transition-all border border-white/15 hover:scale-105"
          title="Direct Mail"
        >
          <Mail size={18} />
        </a>
      </motion.div>
    </section>
  );
}
