import { motion } from 'framer-motion';
import {
  Wand2, PenTool, Film, Layers, Code2, LayoutDashboard,
  Server, BrainCircuit, Boxes, Wrench,
} from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Reveal from './ui/Reveal';
import { CREATIVE_DATA } from '../data/creative';
import { IT_DATA } from '../data/dev';

const CREATIVE_ICONS = [Wand2, PenTool, Film, Layers];
const DEV_ICONS = [Code2, LayoutDashboard, Server, BrainCircuit, Boxes, Wrench];

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
    <section id="skills" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-gradient-to-r from-[#00FF87] to-cyan-400" />
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Skills</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight mb-4">
            Tools of the <em className="serif-accent">craft</em>
          </h2>
          <p className="max-w-xl text-[var(--text-secondary)] mb-14">
            {isCreative
              ? 'A hybrid creative toolkit — generative AI, motion graphics, and brand strategy fused into one workflow.'
              : 'A full-stack arsenal spanning languages, frameworks, AI, and self-hosted DevOps.'}
          </p>
        </Reveal>

        <div className={`grid gap-5 ${isCreative ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            >
              <GlassCard className="h-full p-6 md:p-7 glass-card-hover group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] transition-transform group-hover:scale-110 bg-[#00FF87]/15 text-[#00FF87]">
                    <skill.icon size={18} />
                  </span>
                  <h3 className="font-display font-bold text-lg">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="skill-chip cursor-default font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
