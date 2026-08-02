import { MapPin, Mail, ArrowUpRight } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Reveal from './ui/Reveal';
import VNDKLogo from './ui/VNDKLogo';
import { PERSONAL_INFO } from '../data/personal';
import { CREATIVE_DATA } from '../data/creative';
import { IT_DATA } from '../data/dev';

export default function About({ tab }) {
  const isCreative = tab === 'creative';
  const data = isCreative ? CREATIVE_DATA : IT_DATA;
  const summary = isCreative
    ? 'Visionary Creative Leader with 9+ years of expertise bridging brand strategy, digital design, motion graphics, and cutting-edge generative AI. Currently pioneering AI-augmented creative workflows, merging traditional art direction with ComfyUI, Stable Diffusion, and FLUX to redefine visual storytelling.'
    : IT_DATA.summary;

  const highlight = isCreative
    ? 'Currently leading AI-augmented creative production at Phibious, serving global Fortune 500 brands.'
    : '2-year journey from zero to 18+ production apps — streaming platforms, AI tools, and self-hosted infrastructure.';

  return (
    <section id="about" className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
      <Reveal>
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-10 bg-gradient-to-r from-[#00FF87] to-cyan-400" />
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">About</span>
        </div>
        <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight mb-14">
          One mind,<br />
          <em className="serif-accent">two disciplines</em>
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Identity card */}
        <Reveal className="md:col-span-2" delay={0.1}>
          <GlassCard className="h-full p-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] shadow-xl mb-6">
              <VNDKLogo size="lg" />
            </div>
            <h3 className="font-display font-bold text-2xl mb-1">{PERSONAL_INFO.name}</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 font-medium">
              {isCreative ? 'Creative & Design Manager' : 'Full-Stack Developer & DevOps'}
            </p>

            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[#00FF87] transition-colors group"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-subtle)] text-[#00FF87]">
                  <Mail size={14} />
                </span>
                {PERSONAL_INFO.email}
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-subtle)] text-[#00FF87]">
                  <MapPin size={14} />
                </span>
                {PERSONAL_INFO.location}
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-[var(--accent-subtle)] border border-[var(--border)] p-4 text-sm leading-relaxed">
              <span className="font-semibold block mb-1 text-[var(--text-primary)]">{isCreative ? 'Creative' : 'Developer'} spotlight</span>
              {highlight}
            </div>
          </GlassCard>
        </Reveal>

        {/* Bio card */}
        <Reveal className="md:col-span-3" delay={0.2}>
          <GlassCard className="h-full p-8 md:p-10">
            <p className="font-display text-xl md:text-2xl leading-relaxed mb-6">{data.title}</p>
            <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">{summary}</p>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-[var(--border)] pt-8">
              <div>
                <div className="font-display font-extrabold text-3xl gradient-text bg-gradient-to-r from-[#00FF87] to-cyan-400 bg-clip-text text-transparent">9+</div>
                <div className="text-xs text-[var(--text-muted)] mt-1 font-medium">Years of experience</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-3xl gradient-text bg-gradient-to-r from-[#00FF87] to-cyan-400 bg-clip-text text-transparent">
                  {isCreative ? '7' : '18+'}
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1 font-medium">{isCreative ? 'Years leading teams' : 'Production apps'}</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-3xl gradient-text bg-gradient-to-r from-[#00FF87] to-cyan-400 bg-clip-text text-transparent">100%</div>
                <div className="text-xs text-[var(--text-muted)] mt-1 font-medium">Self-taught drive</div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
