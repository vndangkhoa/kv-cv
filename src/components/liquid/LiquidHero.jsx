import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Linkedin, Github, GitFork, Mail, Terminal } from 'lucide-react';
import KineticCharacterCanvas from '../ui/KineticCharacterCanvas';
import PERSONAL_INFO from '../../data/personal';

export default function LiquidHero({ tab, onOpenPdf, onEasterEgg }) {
  const [copied, setCopied] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const isCreative = tab === 'creative';

  // Listen for keyboard '/' shortcut to launch terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
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

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black text-white pt-24 sm:pt-28">
      {/* Background Kinetic Characters from human_head_turn.mp4 (NO RAW VIDEO) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-85">
        <KineticCharacterCanvas
          src="/human_head_turn.mp4"
          poster="/human_head_turn_poster.webp"
          className="w-full h-full"
        />
        {/* Ambient Dark Falloffs to guarantee crisp text legibility over animated ASCII */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.72)_0%,_rgba(0,0,0,0.45)_50%,_black_95%)] pointer-events-none" />
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 text-center -translate-y-[4%] sm:-translate-y-[8%]">
        {/* Soft radial backdrop behind text block */}
        <div className="absolute -inset-10 -z-10 bg-radial from-black/75 via-black/40 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* Badge / Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-[#0c0c0e]/85 backdrop-blur-xl border border-white/15 text-xs font-mono text-white/90 shadow-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>PORTFOLIO &apos;26 &bull; HO CHI MINH CITY</span>
        </motion.div>

        {/* Heading in Instrument Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-white tracking-tight mb-4 sm:mb-6 leading-[1.08] sm:leading-none break-words max-w-full px-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
        >
          {isCreative ? (
            <>
              Innovate then <em className="italic font-serif">artistry</em>.
            </>
          ) : (
            <>
              Engineering then <em className="italic font-serif">artistry</em>.
            </>
          )}
        </motion.h1>

        {/* Liquid-Glass Command / Contact Capsule */}
        <motion.form
          onSubmit={handleCopyEmail}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-md sm:max-w-xl w-full mx-auto mb-4 sm:mb-6 px-2 sm:px-0"
        >
          <div className="bg-[#0c0c0e]/90 backdrop-blur-xl rounded-full pl-4 sm:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2 flex items-center justify-between gap-2 sm:gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.7)] border border-white/20 hover:border-white/35 transition-all">
            <input
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="vonguyendangkhoa@gmail.com"
              className="bg-transparent text-white placeholder:text-white/70 text-xs sm:text-sm font-mono focus:outline-none flex-1 truncate min-w-0"
            />
            <button
              type="submit"
              className="bg-white hover:bg-white/90 text-black rounded-full p-2 sm:p-2.5 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center shrink-0 cursor-pointer shadow-md"
              title="Copy email to clipboard"
            >
              {copied ? <Check size={16} className="text-black" /> : <ArrowRight size={16} />}
            </button>
          </div>
          {copied && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-mono text-white/95 mt-2 text-center drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
            >
              ✓ Copied {PERSONAL_INFO.email} to clipboard
            </motion.p>
          )}
        </motion.form>

        {/* Subtitle with frosted dark backdrop for 100% legibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-xl mx-auto px-2"
        >
          <p className="inline-block text-white/95 text-xs sm:text-sm md:text-base leading-relaxed px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.85)] font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {isCreative
              ? 'Creative Lead & AI Specialist merging 9+ years of motion direction with production diffusion pipelines (ComfyUI, FLUX) for global campaigns.'
              : 'Security Consultant & Systems Architect with 18+ deployed production services, hardened container environments, and zero-trust design.'}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-6 sm:mt-8 px-2"
        >
          <button
            onClick={() => onOpenPdf(isCreative ? 'design' : 'it')}
            className="bg-[#0e0e12]/85 backdrop-blur-md rounded-full px-5 sm:px-8 py-2.5 sm:py-3 text-white text-xs sm:text-sm font-mono font-medium hover:bg-white/15 transition-all border border-white/20 hover:border-white/35 shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer"
          >
            Open Khoa Vo CV
          </button>
          <button
            onClick={onEasterEgg}
            className="bg-[#0e0e12]/85 backdrop-blur-md rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-white text-xs sm:text-sm font-mono font-medium hover:bg-white/15 transition-all border border-white/20 hover:border-white/35 shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer flex items-center gap-1.5 sm:gap-2"
            title="Launch Retro Terminal OS"
          >
            <Terminal size={14} />
            <span>Terminal OS</span>
          </button>
          <button
            onClick={scrollToAbout}
            className="bg-[#0e0e12]/65 backdrop-blur-md rounded-full px-5 sm:px-8 py-2.5 sm:py-3 text-white/80 hover:text-white text-xs sm:text-sm font-mono transition-all border border-white/15 hover:border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            Explore Story &darr;
          </button>
        </motion.div>
      </div>

      {/* Social Icons Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 flex justify-center items-center gap-3 sm:gap-4 pb-10 sm:pb-12"
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
