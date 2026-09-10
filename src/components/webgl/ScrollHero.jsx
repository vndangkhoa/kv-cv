import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Sparkles, Code2, Palette, ChevronDown, Layers, Terminal } from 'lucide-react';
import UnderwaterScene from './UnderwaterScene';
import { downloadCV, exportPdfDirectly } from '../../data/personal';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollHero({ tab, onTabChange, isGeneratingPdf, setIsGeneratingPdf }) {
  const isCreative = tab === 'creative';
  const pinSectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [webGlSupported, setWebGlSupported] = useState(true);

  // Detect WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
      }
    } catch (e) {
      setWebGlSupported(false);
    }
  }, []);

  // GSAP ScrollTrigger Pinned Timeline
  useEffect(() => {
    const pinEl = pinSectionRef.current;
    if (!pinEl) return;

    let lastScroll = window.scrollY;
    let lastTime = Date.now();

    const trigger = ScrollTrigger.create({
      trigger: pinEl,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        // Calculate velocity
        const now = Date.now();
        const dt = Math.max(1, now - lastTime);
        const dy = window.scrollY - lastScroll;
        const vel = dy / dt;
        lastScroll = window.scrollY;
        lastTime = now;
        setScrollVelocity(vel);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Stage visibility based on scrollProgress
  // Stage 1: 0.0 - 0.28
  // Stage 2: 0.28 - 0.58
  // Stage 3: 0.58 - 0.85
  // Stage 4: 0.85 - 1.0
  const getStageOpacity = (start, peak, end) => {
    const p = scrollProgress;
    if (p < start || p > end) return 0;
    if (p <= peak) return (p - start) / Math.max(0.01, peak - start);
    return 1 - (p - peak) / Math.max(0.01, end - peak);
  };

  const op1 = getStageOpacity(-0.05, 0.12, 0.32);
  const op2 = getStageOpacity(0.26, 0.45, 0.62);
  const op3 = getStageOpacity(0.56, 0.72, 0.88);
  const op4 = getStageOpacity(0.82, 0.95, 1.05);

  return (
    <section
      ref={pinSectionRef}
      id="hero"
      className="relative w-full h-[100svh] overflow-hidden bg-[#08090C] text-[var(--text-primary)] select-none"
    >
      {/* 1. Fullscreen Interactive 3D WebGL Underwater Scene */}
      {webGlSupported ? (
        <UnderwaterScene
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
        />
      ) : (
        /* Fallback 2D Parallax Video for non-WebGL devices */
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/character-underwater.png"
            alt="Underwater Parallax"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090C]/80 via-transparent to-[#08090C]" />
        </div>
      )}

      {/* Underwater Atmospheric Gradient Overlays (Vignette & Readability) */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-[#08090C]/70 via-transparent to-[#08090C]/80" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,#08090C_95%)]" />

      {/* 2. Storytelling HUD Overlays synchronized with 3D Camera & Parallax */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4 sm:px-8 md:px-12">
        <div className="w-full max-w-5xl mx-auto relative flex flex-col items-center justify-center text-center">

          {/* --- STAGE 1: The Intro & 3D Title (0% - 28%) --- */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 pointer-events-none"
            style={{
              opacity: op1,
              transform: `translateY(${(1 - op1) * 30}px) scale(${0.95 + op1 * 0.05})`,
            }}
          >
            {/* Availability & Sync Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-black/60 text-[#00FF87] border border-[#00FF87]/30 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(0,255,135,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF87] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF87]" />
              </span>
              <span className="badge-iridescent-text">
                {isCreative
                  ? 'AVAILABLE // CREATIVE & AI INNOVATION LEAD'
                  : 'FORGEJO SYNCED // FULL-STACK & DEVOPS'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight mb-4 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              KHOA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF87] via-[#60EFFF] to-[#00DF81]">VO</span>
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-white max-w-2xl font-normal tracking-wide mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] bg-black/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/15">
              {isCreative ? (
                <>
                  Creative Technologist &amp; Design Leader crafting{' '}
                  <span className="text-[#00FF87] font-semibold">AI-native media</span>, 3D worlds, and high-impact brands.
                </>
              ) : (
                <>
                  Full-Stack Cloud Architect bridging{' '}
                  <span className="text-[#60EFFF] font-semibold">Docker microservices</span>, Go APIs, and private cloud infrastructure.
                </>
              )}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white bg-black/70 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-xl">
              <ChevronDown className="w-4 h-4 text-[#00FF87] animate-bounce stroke-[2.5]" />
              <span>SCROLL TO DIVE DEEPER</span>
            </div>
          </div>

          {/* --- STAGE 2: Creative & Generative Vision (28% - 58%) --- */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300"
            style={{
              opacity: op2,
              transform: `translateY(${(1 - op2) * 30}px) scale(${0.95 + op2 * 0.05})`,
              pointerEvents: op2 > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-black/85 border border-white/20 backdrop-blur-2xl max-w-xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-left">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="p-3 rounded-2xl bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/40 shadow-[0_0_15px_rgba(0,255,135,0.25)]">
                  <Palette className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow">Generative &amp; 3D Art Direction</h2>
                  <p className="text-xs font-mono font-bold text-[#00FF87]">ComfyUI · FLUX · Three.js · Cinema 4D</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-100 font-normal leading-relaxed mb-5 drop-shadow">
                Pioneering autonomous creative pipelines where AI diffusion models synthesize seamless textures and 2.5D depth environments in real time.
              </p>
              <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-white/15 text-center font-mono">
                <div className="bg-white/10 border border-white/10 p-2.5 rounded-xl">
                  <div className="text-base sm:text-lg font-black text-white">12+</div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Years Creative</div>
                </div>
                <div className="bg-white/10 border border-white/10 p-2.5 rounded-xl">
                  <div className="text-base sm:text-lg font-black text-[#00FF87]">100+</div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Productions</div>
                </div>
                <div className="bg-white/10 border border-white/10 p-2.5 rounded-xl">
                  <div className="text-base sm:text-lg font-black text-[#60EFFF]">AI-Native</div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Workflows</div>
                </div>
              </div>
            </div>
          </div>

          {/* --- STAGE 3: Full-Stack & Synology Infrastructure (58% - 85%) --- */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300"
            style={{
              opacity: op3,
              transform: `translateY(${(1 - op3) * 30}px) scale(${0.95 + op3 * 0.05})`,
              pointerEvents: op3 > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-black/85 border border-white/20 backdrop-blur-2xl max-w-xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-left">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="p-3 rounded-2xl bg-[#60EFFF]/20 text-[#60EFFF] border border-[#60EFFF]/40 shadow-[0_0_15px_rgba(96,239,255,0.25)]">
                  <Terminal className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow">Cloud Homelab &amp; Microservices</h2>
                  <p className="text-xs font-mono font-bold text-[#60EFFF]">Synology DSM · Docker · Golang · Forgejo Git</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-100 font-normal leading-relaxed mb-5 drop-shadow">
                Self-hosted private cloud ecosystem orchestrating automated CI/CD pipelines, package repositories, and distributed microservices with enterprise-grade reliability.
              </p>
              <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-white/15 text-center font-mono">
                <div className="bg-white/10 border border-white/10 p-2.5 rounded-xl">
                  <div className="text-base sm:text-lg font-black text-white">19+</div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Active Repos</div>
                </div>
                <div className="bg-white/10 border border-white/10 p-2.5 rounded-xl">
                  <div className="text-base sm:text-lg font-black text-[#00FF87]">99.9%</div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Uptime</div>
                </div>
                <div className="bg-white/10 border border-white/10 p-2.5 rounded-xl">
                  <div className="text-base sm:text-lg font-black text-[#60EFFF]">Zero-Trust</div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">WireGuard</div>
                </div>
              </div>
            </div>
          </div>

          {/* --- STAGE 4: Interactive Launchpad & Actions (85% - 100%) --- */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 pointer-events-none"
            style={{
              opacity: op4,
              transform: `translateY(${(1 - op4) * 30}px) scale(${0.95 + op4 * 0.05})`,
            }}
          >
            <div className={`p-8 sm:p-10 rounded-3xl bg-black/85 border border-white/25 backdrop-blur-2xl max-w-lg shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col items-center text-center ${op4 > 0.3 ? 'pointer-events-auto' : 'pointer-events-none'}`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00FF87] to-[#60EFFF] flex items-center justify-center text-[#0A0D0B] font-black mb-5 shadow-[0_0_35px_rgba(0,255,135,0.45)]">
                <Layers className="w-7 h-7 stroke-[2.5]" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3 drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
                Ready to Explore?
              </h2>

              <p className="text-sm sm:text-base text-slate-100 font-normal leading-relaxed mb-8 drop-shadow">
                Discover selected commercial projects, technical architectures, and career milestones below.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full">
                {/* Explore Work Primary Button with High Contrast & Neon Glow */}
                <button
                  onClick={scrollToWork}
                  className="btn-press w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl font-mono text-xs uppercase tracking-wider font-black flex items-center justify-center gap-2 group bg-gradient-to-r from-[#00FF87] to-[#00E5FF] text-[#0A0D0B] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,255,135,0.45)] cursor-pointer"
                >
                  <span>Explore Work</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
                </button>

                {/* Get Resume Secondary Button with Bright White Typography & Border */}
                <button
                  onClick={() => exportPdfDirectly(setIsGeneratingPdf)}
                  disabled={isGeneratingPdf}
                  className="btn-press w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl font-mono text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md transition-all active:scale-95 shadow-lg cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#00FF87] stroke-[2.5]" />
                  <span>{isGeneratingPdf ? 'Exporting...' : 'Get Resume'}</span>
                </button>
              </div>

              {/* Direct Contact Link with High Contrast & Hover Effect */}
              <button
                onClick={scrollToContact}
                className="btn-press mt-5 text-xs sm:text-sm font-mono font-semibold text-slate-200 hover:text-[#00FF87] transition-all flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer drop-shadow"
              >
                <span>Direct Contact &amp; Availability</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Progress Bar Indicator */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 z-30 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#00FF87] via-[#60EFFF] to-[#00DF81] transition-all duration-75"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      {/* Floating Micro-Indicator for Parallax Stage */}
      <div className="absolute bottom-4 right-6 z-30 hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
        <span>3D PARALLAX // {Math.round(scrollProgress * 100)}%</span>
      </div>
    </section>
  );
}
