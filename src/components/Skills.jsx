import { motion } from 'framer-motion';
import {
  Wand2, PenTool, Film, Layers, Code2, LayoutDashboard,
  Server, BrainCircuit, Boxes, Wrench, Sparkles
} from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Reveal from './ui/Reveal';
import { CREATIVE_DATA } from '../data/creative';
import { IT_DATA } from '../data/dev';

const CREATIVE_ICONS = [Wand2, PenTool, Film, Layers];
const DEV_ICONS = [Code2, LayoutDashboard, Server, BrainCircuit, Boxes, Wrench];

const CATEGORY_COLORS = [
  { accent: '#00FF87', border: 'hover:border-[#00FF87]/40', bg: 'bg-[#00FF87]/15', text: 'text-[#00FF87]' },
  { accent: '#00E5FF', border: 'hover:border-[#00E5FF]/40', bg: 'bg-[#00E5FF]/15', text: 'text-[#00E5FF]' },
  { accent: '#D0B2FF', border: 'hover:border-[#D0B2FF]/40', bg: 'bg-[#D0B2FF]/15', text: 'text-[#D0B2FF]' },
  { accent: '#FFEEB8', border: 'hover:border-[#FFEEB8]/40', bg: 'bg-[#FFEEB8]/15', text: 'text-[#FFEEB8]' },
  { accent: '#38BDF8', border: 'hover:border-[#38BDF8]/40', bg: 'bg-[#38BDF8]/15', text: 'text-[#38BDF8]' },
  { accent: '#A78BFA', border: 'hover:border-[#A78BFA]/40', bg: 'bg-[#A78BFA]/15', text: 'text-[#A78BFA]' },
];

export default function Skills({ tab }) {
  const isCreative = tab === 'creative';
  const skills = isCreative
    ? CREATIVE_DATA.skills.map((s, i) => ({ ...s, icon: CREATIVE_ICONS[i % CREATIVE_ICONS.length] }))
    : Object.entries(IT_DATA.skills).map(([category, items], i) => ({
        category,
        items,
        icon: DEV_ICONS[i % DEV_ICONS.length],
      }));

  return (
    <section id="skills" className="relative py-20 sm:py-28 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="h-px w-8 bg-gradient-to-r from-[#00FF87] via-[#00E5FF] to-transparent" />
            <span className="badge-iridescent-text text-xs font-mono tracking-[0.25em]">
              02 // TECH ARSENAL &amp; TOOLKIT
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight mb-4 text-[var(--text-primary)]">
            TOOLS OF THE <span className="iridescent-text">CRAFT</span>
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-[var(--text-secondary)] mb-10 sm:mb-14 leading-relaxed font-normal">
            {isCreative
              ? 'A hybrid creative toolkit — generative AI systems, ComfyUI workflows, motion graphics, and brand strategy fused into scalable execution.'
              : 'A production-tested stack spanning reactive frontends, concurrent backend services, containerized pipelines, and self-hosted cloud infrastructure.'}
          </p>
        </Reveal>

        {/* Dynamic Bento Cards Grid */}
        <div className={`grid gap-4 sm:gap-6 ${isCreative ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {skills.map((skill, i) => {
            const theme = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <GlassCard className={`h-full p-5 sm:p-7 border-[var(--glass-border)] bg-[var(--glass-bg)] transition-all duration-300 ${theme.border} group`}>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] ${theme.bg} ${theme.text} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                        <skill.icon size={18} />
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors">
                        {skill.category}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] px-2.5 py-0.5 rounded-full bg-[var(--accent-subtle)] border border-[var(--border)]">
                      {skill.items.length} skills
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="skill-chip cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
