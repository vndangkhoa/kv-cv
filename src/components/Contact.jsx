import { useState } from 'react';
import { Mail, MapPin, Download, ArrowUpRight, Copy, Check, Terminal, Sparkles } from 'lucide-react';
import KineticCharacterCanvas from './ui/KineticCharacterCanvas';
import { PERSONAL_INFO, downloadCV } from '../data/personal';
import { IT_DATA } from '../data/dev';

export default function Contact({ tab, onEasterEgg, onOpenPdf }) {
  const isCreative = tab === 'creative';
  const [copied, setCopied] = useState(false);

  const copyEmail = (e) => {
    e?.preventDefault?.();
    navigator.clipboard?.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-black text-white pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
      {/* Background Kinetic Characters from Khoa's static photo */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 mix-blend-screen">
        <KineticCharacterCanvas
          src="/character-underwater.jpg"
          className="w-full h-full"
          density="medium"
          focalPoint={{ x: 0.5, y: 0.45 }}
          fit="cover"
        />
        {/* Ambient Gradients to ensure perfect contrast with text and card */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/85 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_75%)] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* 1. UPPER HERO / CALL-TO-ACTION (similar to reference top area) */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          {/* Eyebrow Badge */}
          <div className="mb-2.5 sm:mb-3">
            <span className="text-white/40 text-[10px] sm:text-xs tracking-widest uppercase font-mono">
              Get In Touch &bull; Open For Collaborations
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1] px-2">
            Let&apos;s build something <br />
            <em className="italic text-white/60">unforgettable</em>.
          </h2>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/60 leading-relaxed font-sans px-2">
            {isCreative
              ? 'Hiring an AI Creative Lead? Scaling automated visual production? Let’s connect and engineer the future of your brand.'
              : 'Need scalable cloud microservices, media streaming apps, or custom AI tooling? Let’s ship together.'}
          </p>

          {/* Centered Interactive Email Pill Button */}
          <div className="mt-5 sm:mt-7 flex items-center justify-center max-w-full px-2">
            <div className="liquid-glass rounded-full pl-4 sm:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2 flex items-center justify-between gap-2 sm:gap-3 border border-white/20 shadow-2xl hover:border-white/40 transition-all max-w-full">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 text-xs sm:text-sm font-mono text-white/80 hover:text-white transition-colors truncate"
              >
                <Mail size={14} className="text-white/60 shrink-0" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white hover:bg-white/90 text-black font-mono text-xs font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md shrink-0"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-black" />
                    <span>Copied!</span>
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
        </div>

        {/* 2. DOCKED ROUNDED FOOTER CARD (similar to bottom sheet card of reference) */}
        <div className="mt-12 sm:mt-16 md:mt-20 max-w-6xl mx-auto px-3 sm:px-6 w-full">
          <div className="relative rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-9 md:p-12 liquid-glass border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden group">
            {/* Ambient inner soft highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
              {/* Left Column: Brand Logo + Title side-by-side, then Action Buttons underneath */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  {/* Brand Monogram Icon + Title on the same line (matching reference dumbbell + title) */}
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl liquid-glass border border-white/25 flex items-center justify-center shadow-lg shrink-0 group-hover:border-white/40 transition-colors">
                      <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 stroke-white" fill="none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M 14 20 L 29 41 L 44 20" />
                        <path d="M 56 41 L 56 20 L 86 41 L 86 20" />
                        <path d="M 14 59 L 28 59 C 41 59 41 80 28 80 L 14 80 Z" />
                        <path d="M 56 59 L 56 80 M 86 59 L 56 69.5 L 86 80" />
                      </svg>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white tracking-tight leading-tight">
                      Engineering then <em className="italic text-white/70">artistry</em>.
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-white/50 mt-3 sm:mt-3.5 max-w-md leading-relaxed">
                    Vo Nguyen Dang Khoa &bull; Security Consultant &amp; Systems Architect bridging zero-trust infrastructure with generative AI direction.
                  </p>
                </div>

                {/* Two Action Buttons (matching reference [Join Today] [View Clubs]) */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                  {/* Primary Button */}
                  <button
                    onClick={() => {
                      if (onOpenPdf) onOpenPdf(isCreative ? 'design' : 'it');
                      else downloadCV(isCreative ? 'design' : 'it');
                    }}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-white/90 text-black font-mono text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download CV (PDF)</span>
                  </button>

                  {/* Secondary Button */}
                  <button
                    onClick={() => {
                      if (onEasterEgg) {
                        onEasterEgg();
                      } else {
                        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full liquid-glass border border-white/20 hover:bg-white/10 text-white font-mono text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                  >
                    <Terminal size={14} className="text-white/70" />
                    <span>Terminal OS</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Multi-column Navigation & Info Links (matching reference INSIGHTS & CONNECT) */}
              <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
                {/* Column 1: INSIGHTS */}
                <div>
                  <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/40 mb-3 sm:mb-4">
                    Insights
                  </h4>
                  <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm font-sans">
                    <li>
                      <a href="#work" className="text-white/70 hover:text-white transition-colors inline-block">
                        Selected Works
                      </a>
                    </li>
                    <li>
                      <a href="#experience" className="text-white/70 hover:text-white transition-colors inline-block">
                        Career Timeline
                      </a>
                    </li>
                    <li>
                      <a href="#about" className="text-white/70 hover:text-white transition-colors inline-block">
                        Philosophy &amp; Story
                      </a>
                    </li>
                    <li>
                      <a href="#reel" className="text-white/70 hover:text-white transition-colors inline-block">
                        Showreel &amp; Cinema
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 2: CONNECT */}
                <div>
                  <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/40 mb-3 sm:mb-4">
                    Connect
                  </h4>
                  <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm font-sans">
                    <li>
                      <a
                        href={PERSONAL_INFO.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1 group/link"
                      >
                        <span>LinkedIn</span>
                        <ArrowUpRight size={12} className="opacity-40 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={IT_DATA.forgejo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1 group/link"
                      >
                        <span>Forgejo Git</span>
                        <ArrowUpRight size={12} className="opacity-40 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={PERSONAL_INFO.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1 group/link"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight size={12} className="opacity-40 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${PERSONAL_INFO.phone}`}
                        className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1 group/link"
                      >
                        <span>Telegram &bull; Call</span>
                        <ArrowUpRight size={12} className="opacity-40 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 3: INTEL / STATUS */}
                <div className="col-span-2 sm:col-span-1">
                  <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/40 mb-3 sm:mb-4">
                    Intel
                  </h4>
                  <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm font-sans">
                    <li className="flex items-center gap-1.5 text-white/70">
                      <MapPin size={13} className="text-white/50 shrink-0" />
                      <span>Ho Chi Minh City, VN</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span>Open to Work</span>
                    </li>
                    <li className="text-white/40 text-[11px] font-mono pt-1">
                      Zero-Trust Synology Hub
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Row inside the Card (matching reference copyright footer) */}
            <div className="mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/40">
              <div>
                &copy; 2026 {PERSONAL_INFO.name} &bull; All Rights Reserved
              </div>
              <div className="flex items-center gap-2">
                <span>Vo Nguyen Dang Khoa &bull; Systems Architecture &times; Generative AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
