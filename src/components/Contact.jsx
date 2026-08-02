import { Mail, MapPin, Phone, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import MeshBackground from './ui/MeshBackground';
import Reveal from './ui/Reveal';
import { PERSONAL_INFO, downloadCV } from '../data/personal';
import { IT_DATA } from '../data/dev';

export default function Contact({ tab }) {
  const isCreative = tab === 'creative';

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      <MeshBackground className="opacity-60" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Contact</span>
          <h2 className="font-display font-extrabold tracking-tight leading-[1.05] text-[clamp(2.5rem,7vw,6rem)] mt-6">
            Let's build something
            <br />
            <em className="serif-accent">that stands out</em>
          </h2>
          <p className="max-w-xl mx-auto mt-6 text-lg text-[var(--text-secondary)]">
            {isCreative
              ? 'Hiring a creative lead? Need AI-powered brand work? Let’s talk.'
              : 'Need an app shipped? Looking for a full-stack builder? Let’s talk.'}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="btn-primary group">
              <Mail size={16} />
              {PERSONAL_INFO.email}
              <ArrowUpRight size={15} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <button onClick={downloadCV} className="btn-glass">
              Download CV
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              { icon: MapPin, label: 'Based in', value: 'Ho Chi Minh City, VN' },
              { icon: Phone, label: 'Phone', value: PERSONAL_INFO.phone },
              { icon: Mail, label: 'Email', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href ? '_blank' : undefined}
                rel="noreferrer"
                className={`glass-card p-6 text-left transition-transform duration-300 hover:-translate-y-1 ${item.href ? '' : 'pointer-events-none'}`}
              >
                <item.icon size={18} className="text-[#00FF87] mb-3" />
                <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1 font-semibold">{item.label}</div>
                <div className="text-sm font-medium break-all">{item.value}</div>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 flex items-center justify-center gap-4">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full glass-card hover:-translate-y-1 hover:text-[#00FF87] transition-all"
              title="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={IT_DATA.forgejo}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full glass-card hover:-translate-y-1 hover:text-[#00FF87] transition-all"
              title="Forgejo Repos"
            >
              <Github size={17} />
            </a>
          </div>
        </Reveal>

        <div className="mt-16 text-xs text-[var(--text-muted)] font-medium">
          © 2026 {PERSONAL_INFO.name} — Crafted with React, Framer Motion & VNDK design system
        </div>
      </div>
    </section>
  );
}
