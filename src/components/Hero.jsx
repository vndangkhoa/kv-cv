import { motion } from 'framer-motion';
import { Download, ArrowRight, Sparkles } from 'lucide-react';
import MeshBackground from './ui/MeshBackground';
import TabSwitch from './ui/TabSwitch';
import VNDKLogo from './ui/VNDKLogo';
import { downloadCV, PERSONAL_INFO } from '../data/personal';

const CREATIVE_STATS = [
  { value: '9+', label: 'Years creative leadership' },
  { value: '7+', label: 'Years leading teams' },
  { value: 'AI', label: 'GenAI workflows' },
];

const DEV_STATS = [
  { value: '18+', label: 'Production apps' },
  { value: '2 Yrs', label: 'Self-taught sprint' },
  { value: '100%', label: 'Self-hosted DevOps' },
];

export default function Hero({ tab, onTabChange }) {
  const isCreative = tab === 'creative';
  const stats = isCreative ? CREATIVE_STATS : DEV_STATS;

  return (
    <section id="hero" className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-16">
      <MeshBackground />

      {/* Brand Logo Presentation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 relative group cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="absolute inset-0 rounded-full bg-[#00FF87]/20 blur-xl group-hover:bg-[#00FF87]/35 transition-all duration-500" />
        <VNDKLogo size="hero" className="relative z-10" />
      </motion.div>

      {/* availability / status badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 glass-pill text-xs font-mono font-medium text-[var(--text-secondary)] border border-[var(--border)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF87] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF87]" />
          </span>
          {isCreative ? 'Open to Work — Creative Lead' : 'FORGEJO SYNCED // FORWARD DEPLOYED'}
        </span>
      </motion.div>

      {/* headline */}
      <h1 className="relative z-10 text-center font-display font-extrabold tracking-tight leading-[0.95] text-[clamp(2.8rem,8.5vw,7.5rem)]">
        <motion.span
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          {isCreative ? 'Unlock' : 'Ship'}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-[#00FF87] via-[#00E5FF] to-blue-500">
            {isCreative ? 'Khoa' : 'your'}
          </span>{' '}
          <em className="serif-accent">{isCreative ? 'Vo' : 'ideas'}</em>
        </motion.span>
      </h1>

      {/* subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-10 mt-6 max-w-xl text-center text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed"
      >
        {isCreative
          ? '9+ years of creative leadership, where brand vision meets generative AI intelligence.'
          : 'Full-stack developer & DevOps engineer shipping production applications.'}
      </motion.p>

      {/* tab switch */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85 }}
        className="relative z-10 mt-10"
      >
        <TabSwitch active={tab} onChange={onTabChange} />
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <button onClick={downloadCV} className="btn-primary group">
          <Download size={16} />
          Download CV
        </button>
        <a
          href={isCreative ? PERSONAL_INFO.linkedin : PERSONAL_INFO.github}
          target="_blank"
          rel="noreferrer"
          className="btn-glass group"
        >
          {isCreative ? 'LinkedIn' : 'Forgejo Repos'}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </motion.div>

      {/* stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 mt-16 grid w-full max-w-2xl grid-cols-3 gap-3 md:gap-6"
      >
        {stats.map((stat, i) => (
          <div key={i} className="text-center p-3 rounded-2xl glass-card border border-[var(--border)]">
            <div className="font-display font-extrabold text-2xl md:text-3xl gradient-text bg-clip-text text-transparent bg-gradient-to-r from-[#00FF87] to-[#00E5FF]">
              {stat.value}
            </div>
            <div className="mt-1 text-[11px] md:text-xs text-[var(--text-muted)] font-medium">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-10 mt-14 text-[var(--text-muted)]"
      >
        <a href="#about" className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em] hover:text-[#00FF87] transition-colors">
          <Sparkles size={14} />
          scroll
        </a>
      </motion.div>
    </section>
  );
}
