import { motion } from 'framer-motion';
import Reveal from './ui/Reveal';
import { CREATIVE_DATA } from '../data/creative';
import { IT_DATA } from '../data/dev';

export default function Experience({ tab }) {
  const isCreative = tab === 'creative';
  const experience = isCreative ? CREATIVE_DATA.experience : IT_DATA.experience;

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-gradient-to-r from-[#00FF87] to-cyan-400" />
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Journey</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight mb-16">
            {isCreative ? (
              <>
                The <em className="serif-accent">arc</em> of leadership
              </>
            ) : (
              <>
                From zero to <em className="serif-accent">shipping</em>
              </>
            )}
          </h2>
        </Reveal>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00FF87]/80 via-cyan-400/50 to-emerald-500/80 md:-translate-x-px" />

          <div className="space-y-12">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex ${i % 2 === 1 ? 'md:justify-end' : ''}`}
              >
                {/* node dot */}
                <span className="absolute left-0 md:left-1/2 top-2 w-[15px] h-[15px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#00FF87] to-cyan-400 shadow-lg shadow-[#00FF87]/30">
                  <span className="absolute inset-0 rounded-full animate-ping bg-[#00FF87]/40" />
                </span>

                <div className={`ml-8 md:ml-0 md:w-[calc(50%-2.5rem)] ${i % 2 === 1 ? '' : ''}`}>
                  <div className="glass-card p-6 md:p-7 hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] uppercase tracking-wider text-[#00FF87] font-extrabold">
                        {exp.period}
                      </span>
                      {exp.location && (
                        <span className="text-xs text-[var(--text-muted)] font-medium">{exp.location}</span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg md:text-xl">{exp.role}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.highlights.slice(0, isCreative ? 3 : 4).map((h, j) => (
                        <li key={j} className="flex gap-2 text-sm text-[var(--text-secondary)]">
                          <span className="text-[#00FF87] shrink-0 mt-0.5 font-bold">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dev journey timeline (extra for dev tab) */}
        {!isCreative && (
          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IT_DATA.journey.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="glass-card p-5"
              >
                <div className="text-xs font-mono text-[#00FF87] font-semibold mb-2">{item.month}</div>
                <div className="font-display font-bold mb-1">{item.title}</div>
                <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
