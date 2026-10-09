import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Reveal from './ui/Reveal';
import { CREATIVE_DATA } from '../data/creative';
import { IT_DATA } from '../data/dev';

export default function Experience({ tab }) {
  const isCreative = tab === 'creative';
  const experience = isCreative ? CREATIVE_DATA.experience : IT_DATA.experience;

  return (
    <section id="experience" className="relative py-16 sm:py-28 md:py-36 bg-black text-white">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 md:px-8">
        <Reveal>
          <div className="mb-3 sm:mb-4">
            <span className="text-white/40 text-[10px] sm:text-xs md:text-sm tracking-widest uppercase font-mono">
              Career Evolution &amp; Leadership
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight mb-10 sm:mb-16 md:mb-20 text-white">
            {isCreative ? (
              <>
                The Arc of <em className="italic text-white/60">Leadership</em>
              </>
            ) : (
              <>
                From Zero to <em className="italic text-white/60">Architect</em>
              </>
            )}
          </h2>
        </Reveal>

        {/* Luminous Timeline Spine */}
        <div className="relative">
          {/* Vertical Subtle White Line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1.5px] bg-white/15 md:-translate-x-[0.75px]" />

          <div className="space-y-8 sm:space-y-12">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 1 ? 'md:justify-end' : ''
                }`}
              >
                {/* Milestone Node */}
                <span className="absolute left-[15px] md:left-1/2 top-4 w-3.5 h-3.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] z-10">
                  <span className="absolute inset-0 rounded-full animate-ping bg-white/40" />
                </span>

                {/* Milestone Card */}
                <div
                  className={`pl-10 md:pl-0 md:w-[calc(50%-2.5rem)] ${
                    i % 2 === 1 ? '' : ''
                  }`}
                >
                  <GlassCard className="p-5 sm:p-7 border border-white/10 hover:border-white/25 transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="liquid-glass px-3 py-0.5 rounded-full border border-white/15 text-[11px] font-mono text-white/80 tracking-wider uppercase">
                        {exp.period}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-white/50">
                          <MapPin size={11} className="text-white/60" />
                          {exp.location}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-white mb-0.5">
                      {exp.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans font-medium text-white/60 mb-4">
                      {exp.company}
                    </p>

                    <ul className="space-y-2.5">
                      {exp.highlights.slice(0, isCreative ? 3 : 4).map((h, j) => (
                        <li key={j} className="flex gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                          <span className="text-white/60 shrink-0 font-bold mt-0.5">·</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Developer Monthly Milestones Grid (Dev tab only) */}
        {!isCreative && (
          <div className="mt-20">
            <h3 className="text-xs uppercase tracking-[0.25em] text-white/50 font-mono font-bold mb-6">
              // ARCHITECTURAL CHRONOLOGY &amp; BUILDS
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {IT_DATA.journey.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                >
                  <GlassCard className="p-5 h-full border border-white/10 hover:border-white/25">
                    <div className="inline-block px-2.5 py-0.5 rounded-full liquid-glass border border-white/15 text-[10px] font-mono text-white/80 font-bold mb-2">
                      {item.month}
                    </div>
                    <h4 className="font-serif font-bold text-base text-white mb-1.5">{item.title}</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-sans">{item.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
