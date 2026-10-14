import { useState, useEffect } from 'react';
import LiquidNavbar from './LiquidNavbar';
import LiquidHero from './LiquidHero';
import AboutSection from './AboutSection';
import TestimonialsSection from './TestimonialsSection';
import EcosystemReviewsSection from './EcosystemReviewsSection';
import Projects from '../Projects';
import Experience from '../Experience';
import Contact from '../Contact';
import Marquee from '../ui/Marquee';

const MARQUEE_ITEMS_CREATIVE = [
  'Art Direction & Brand Systems',
  'ComfyUI & FLUX.1 Pipelines',
  'eCommerce Design Leadership',
  'Generative AI Video',
  '3D & Motion Direction',
  'Multi-Market Campaigns (SEA)',
  'Figma Design Systems',
  'Commercial Production SOPs',
];

const MARQUEE_ITEMS_DEV = [
  'Rust & Go Microservices',
  'Next.js 15 & React 19',
  'Embedded Linux (/dev/fb0)',
  'Cryptographic Controls (Ed25519)',
  'Docker & CI/CD Pipelines',
  'Synology DSM SPK Ecosystem',
  'Zero-Trust Architecture',
  'Model Context Protocol (MCP)',
];

export default function LiquidLanding({
  tab,
  setTab,
  onOpenPdf,
  onEasterEgg,
}) {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
      }
    }
  }, []);
  return (
    <div className="liquid-site-wrapper min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-clip font-sans">
      {/* Top Floating Glass Navigation */}
      <LiquidNavbar
        tab={tab}
        onTabChange={setTab}
        onOpenPdf={onOpenPdf}
        onEasterEgg={onEasterEgg}
      />

      {/* Section 1: Hero */}
      <LiquidHero tab={tab} onOpenPdf={onOpenPdf} onEasterEgg={onEasterEgg} />

      {/* Ambient Marquee Ribbon */}
      <div className="bg-black/80 py-4 border-y border-white/10">
        <Marquee items={tab === 'creative' ? MARQUEE_ITEMS_CREATIVE : MARQUEE_ITEMS_DEV} />
      </div>

      {/* Section 2: About Manifesto */}
      <AboutSection tab={tab} />

      {/* Section 3: Verified Referees & Testimonials */}
      <TestimonialsSection tab={tab} />

      {/* Section 4: Selected Works & Real Repos */}
      <Projects tab={tab} onTabChange={setTab} />

      {/* Section 5: Real-World Ecosystem Reviews & Telemetry (syno.vndns.net & trimui.vndns.net) */}
      <EcosystemReviewsSection tab={tab} />

      {/* Section 7: Career Journey */}
      <Experience tab={tab} />

      {/* Section 8: Contact */}
      <Contact tab={tab} onEasterEgg={onEasterEgg} onOpenPdf={onOpenPdf} />
    </div>
  );
}
