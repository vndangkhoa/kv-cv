import { useRef } from 'react';
import { DYNAMIC_COPY } from '../../data/dynamicCopy';

export default function AboutSection({ tab }) {
  const ref = useRef(null);
  const isCreative = tab === 'creative';
  const copy = isCreative ? DYNAMIC_COPY.about.creative : DYNAMIC_COPY.about.dev;

  return (
    <section
      id="about"
      ref={ref}
      className="relative scroll-mt-24 sm:scroll-mt-32 bg-black pt-20 sm:pt-32 md:pt-44 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 overflow-hidden text-center"
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* 1. Eyebrow Badge (`Status-Node` #A855F7 — CENTER_SPLIT_PILL) */}
        <div className="mb-4 sm:mb-6">
          <span
            data-scroll-target="about-badge"
            className="text-white/50 text-[10px] sm:text-xs md:text-sm tracking-widest uppercase font-mono inline-block px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]"
          >
            {DYNAMIC_COPY.about.eyebrow}
          </span>
        </div>

        {/* 2. Heading (`Type-Bot` #00E599 — TEXT_BASELINE_SWEEP) */}
        <h2
          data-scroll-target="about-header"
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.18] tracking-tight font-serif max-w-4xl px-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] inline-block"
        >
          {copy.titleLead}{' '}
          <br className="hidden md:inline" />
          <em className="italic text-white/70">{copy.titleAccent}</em>
        </h2>

        {/* 3. Bio summary description (`Arch-Frame` #3B82F6 + `Aesthetic-UI` #EC4899) */}
        <p
          data-scroll-target="about-content"
          className="text-white/85 text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl mt-5 sm:mt-8 font-sans px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.015]"
        >
          {copy.bio}
        </p>
      </div>
    </section>
  );
}
