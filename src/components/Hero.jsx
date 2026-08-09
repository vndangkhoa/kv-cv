import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import TabSwitch from './ui/TabSwitch';
import { downloadCV, PERSONAL_INFO } from '../data/personal';

export default function Hero({ tab, onTabChange }) {
  const isCreative = tab === 'creative';

  return (
    <section id="hero" className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden px-5 sm:px-6 md:px-10 lg:px-14 pt-24 pb-10 bg-[#FAFAFA] text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Head Rotation Continuous Autoplay Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="/human_head_turn.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover lg:scale-[1.15] opacity-45 mix-blend-multiply transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/50 to-[#FAFAFA]/80" />
      </div>

      {/* Top Section: Status Badge & 4-Column Meta Grid */}
      <div className="relative z-10 w-full">
        {/* Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-slate-800 border border-slate-300 bg-white/90 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              {isCreative ? 'Open to Work — Creative & AI Lead' : 'FORGEJO SYNCED // FORWARD DEPLOYED'}
            </span>
          </motion.div>
        </div>

        {/* 4-COLUMN META GRID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 border-t border-slate-300/80 pt-6"
        >
          {/* COL 1 */}
          <div className="text-left">
            <h2 className="text-lg md:text-xl tracking-wide leading-tight">
              <span className="font-normal block text-slate-900">KHOA</span>
              <span className="font-pixel text-2xl md:text-3xl block text-slate-950 font-bold">VO</span>
            </h2>
            <div className="text-[10px] text-slate-400 mt-2">*</div>
            <p className="font-pixel mt-1 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
              {`Khoa Vo -\nCreative & AI Lead`}
            </p>
          </div>

          {/* COL 2 */}
          <div className="text-right lg:text-left">
            <h2 className="text-lg md:text-xl tracking-wide leading-tight">
              <span className="font-normal block text-slate-900">CREATIVE &</span>
              <span className="font-pixel text-2xl md:text-3xl block text-slate-950 font-bold">ENGINEERING</span>
            </h2>
          </div>

          {/* COL 3 */}
          <div className="text-left">
            <div className="text-base tracking-widest text-slate-400 uppercase mb-2 font-pixel">
              What I Do
            </div>
            <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed max-w-[240px]">
              Top 1% experiences for digital products &amp; AI
            </p>
          </div>

          {/* COL 4 */}
          <div className="text-right lg:text-left">
            <div className="text-base tracking-widest text-slate-400 uppercase mb-2 font-pixel">
              Services
            </div>
            <ul className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed space-y-0.5">
              <li>Branding &amp; Strategy</li>
              <li>Generative AI &amp; ComfyUI</li>
              <li>UX/UI &amp; React/Next.js</li>
              <li>DevOps &amp; AI Systems</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Middle Hero Main Content: Highlighted Headline matching screenshot */}
      <div className="relative z-10 my-8 flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem] tracking-wide uppercase font-normal text-slate-950 leading-[0.85] sm:leading-[0.82]"
        >
          <div className="mb-2">
            <span className="bg-[#111625] text-white px-3 sm:px-4 py-1.5 inline-block shadow-md">
              I BRING THE
            </span>
          </div>
          <div className="mb-2 flex flex-wrap items-baseline gap-3">
            <span className="bg-[#111625] text-[#00FF87] px-3 sm:px-4 py-1.5 font-pixel font-bold inline-block text-[1.15em] shadow-md tracking-wider">
              UNEXPECTED
            </span>
            <span className="bg-[#111625] text-white px-3 sm:px-4 py-1.5 inline-block shadow-md">
              TO
            </span>
          </div>
          <div className="text-slate-950 my-1">
            CREATIVE &amp; AI
          </div>
          <div>
            <span className="font-pixel font-bold text-[1.25em] inline-block leading-none text-slate-950">
              EXPERIENCES
            </span>
          </div>
        </motion.h1>

        {/* Subtitle & CTAs */}
        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-sm md:text-base text-slate-700 font-medium max-w-lg leading-relaxed"
          >
            {isCreative
              ? '9+ years leading creative direction & generative AI workflows.'
              : 'Full-stack developer & DevOps engineer shipping production systems.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center gap-3 shrink-0"
          >
            {/* Persona Switcher Pill */}
            {onTabChange && (
              <TabSwitch active={tab} onChange={onTabChange} />
            )}

            {/* Neon Green Download CV Button */}
            <button
              onClick={downloadCV}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00FF87] hover:bg-[#00E676] text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-[#00FF87]/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download size={15} />
              <span>Download CV</span>
            </button>

            <a
              href={isCreative ? PERSONAL_INFO.linkedin : PERSONAL_INFO.forgejo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-900 border border-slate-300 font-bold text-xs sm:text-sm shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span>{isCreative ? 'LinkedIn' : 'Forgejo Repos'}</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer Section: Streamlined Footer Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="relative z-10 pt-4 border-t border-slate-300/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700 font-mono font-medium"
      >
        <div>
          Open to freelance or full-time.{' '}
          <a href="#contact" className="text-red-600 hover:text-red-500 font-semibold transition-colors">
            Schedule a call
          </a>
        </div>
        <div className="text-slate-500">
          Khoa Vo &bull; Creative &amp; AI Portfolio
        </div>
      </motion.div>
    </section>
  );
}
