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
    <section id="experience" className="relative py-20 sm:py-28 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="h-px w-8 bg-gradient-to-r from-[#00FF87] via-[#00E5FF] to-transparent" />
            <span className="badge-iridescent-text text-xs font-mono tracking-[0.25em]">
              04 // EVOLUTION &amp; LEADERSHIP
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight mb-12 sm:mb-16 text-[var(--text-primary)]">
            {isCreative ? (
              <>
                THE ARC OF <span className="iridescent-text">LEADERSHIP</span>
              </>
            ) : (
              <>
                FROM ZERO TO <span className="iridescent-text">SHIPPING</span>
              </>
            )}
          </h2>
        </Reveal>

        {/* Luminous Timeline Spine */}
        <div className="relative">
          {/* Vertical Glowing Line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00FF87] via-[#00E5FF] to-[#D0B2FF] md:-translate-x-[1px] shadow-glow-sm" />

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
                {/* Pulsating Milestone Node */}
                <span className="absolute left-[15px] md:left-1/2 top-4 w-4 h-4 -translate-x-1/2 rounded-full bg-[#00FF87] border-2 border-[var(--bg-primary)] shadow-glow-md z-10">
                  <span className="absolute inset-0 rounded-full animate-ping bg-[#00FF87]/50" />
                </span>

                {/* Milestone Card */}
                <div
                  className={`pl-10 md:pl-0 md:w-[calc(50%-2.5rem)] ${
                    i % 2 === 1 ? '' : ''
                  }`}
                >
                  <GlassCard className="p-5 sm:p-7 border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[#00FF87]/40 transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="px-3 py-0.5 rounded-full bg-[#00FF87]/15 border border-[#00FF87]/30 text-[11px] font-mono font-bold text-emerald-700 dark:text-[#00FF87] tracking-wider uppercase">
                        {exp.period}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--text-muted)]">
                          <MapPin size={11} className="text-emerald-600 dark:text-[#00E5FF]" />
                          {exp.location}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)] mb-0.5">
                      {exp.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-emerald-600 dark:text-[#00E5FF] mb-4 font-semibold">
                      {exp.company}
                    </p>

                    <ul className="space-y-2.5">
                      {exp.highlights.slice(0, isCreative ? 3 : 4).map((h, j) => (
                        <li key={j} className="flex gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                          <span className="text-emerald-600 dark:text-[#00FF87] shrink-0 font-bold mt-0.5">▸</span>
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
            <h3 className="text-xs uppercase tracking-[0.25em] text-emerald-600 dark:text-[#00FF87] font-mono font-bold mb-6">
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
                  <GlassCard className="p-5 h-full border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[#00FF87]/30">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#00FF87]/15 border border-[#00FF87]/30 text-[10px] font-mono text-emerald-700 dark:text-[#00FF87] font-bold mb-2">
                      {item.month}
                    </div>
                    <h4 className="font-display font-bold text-sm text-[var(--text-primary)] mb-1.5">{item.title}</h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">{item.description}</p>
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
