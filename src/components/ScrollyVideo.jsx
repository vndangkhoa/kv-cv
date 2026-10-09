import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Download, ExternalLink, Sparkles } from "lucide-react";
import { downloadCV, PERSONAL_INFO } from "../data/personal";
import { SHORT_HERO, SHORT_ABOUT, SHORT_SKILLS, SHORT_WORK, SHORT_EXPERIENCE } from "../data/short";
import TabSwitch from "./ui/TabSwitch";
import VNDKLogo from "./ui/VNDKLogo";

function Chapter({ children, className = "" }) {
  return <div className={`scrolly-chapter ${className}`}>{children}</div>;
}

export default function ScrollyVideo({ tab, onTabChange }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const isCreative = tab === "creative";
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.6 });
  useEffect(() => {
    const video = videoRef.current; if (!video) return;
    let raf = 0; let latest = 0;
    const update = () => { if (video.duration && !video.seeking) { const t = latest * (video.duration || 10); if (Math.abs(video.currentTime - t) > 0.04) video.currentTime = t; } };
    const unsub = smoothProgress.on("change", (v) => { latest = v; cancelAnimationFrame(raf); raf = requestAnimationFrame(update); });
    const onMeta = () => update(); video.addEventListener("loadedmetadata", onMeta); video.preload = "auto";
    return () => { unsub(); cancelAnimationFrame(raf); video.removeEventListener("loadedmetadata", onMeta); };
  }, [smoothProgress]);
  const progress = smoothProgress;
  return (
    <section ref={containerRef} className="scrolly-stage relative h-[420vh] bg-[#050808]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#050808] flex items-stretch">
        <video ref={videoRef} src="/human_head_turn.mp4" muted playsInline preload="auto" poster="/1757983784523_edit_18156554308333.jpg" className="absolute inset-0 h-full w-full object-cover object-[62%_50%] scale-[1.04] select-none" />
        <div className="absolute inset-0 pointer-events-none scrolly-scrim" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/25 h-full" />
        <motion.div style={{ opacity: useTransform(progress, [0, 0.08], [1, 0]) }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-white/60 pointer-events-none">
          <span className="text-[10px] tracking-[0.2em] font-mono uppercase">Scroll to explore</span><ArrowDown size={14} className="animate-bounce" />
        </motion.div>

        <div className="relative z-10 w-full max-w-6xl mx-auto h-full px-3 sm:px-6 pointer-events-none">
          {/* Chapter 1 — HERO: bottom-left (below chin/hands, never over face) */}
          <motion.div style={{ opacity: useTransform(progress, [0, 0.14, 0.22], [1, 1, 0]), y: useTransform(progress, [0, 0.22], [0, -20]) }} className="scrolly-panel absolute inset-0 flex items-end justify-start pb-[6vh] md:pb-[8vh] pointer-events-auto">
            <Chapter className="w-full max-w-[640px] bg-black/40 backdrop-blur-xl rounded-[28px] p-6 md:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-visible">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF87] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF87]" /></span>
                <span className="text-[11px] font-mono tracking-[0.2em] text-white/90 uppercase">{SHORT_HERO.pill}</span>
              </div>
              <h1 className="font-black tracking-[-0.05em] leading-[0.84] text-white break-words drop-shadow-[0_8px_32px_rgba(0,0,0,0.65)] text-left">
                <span className="block text-[42px] sm:text-[56px] md:text-[72px] lg:text-[84px]">{SHORT_HERO.headline[0]}</span>
                <span className="block text-[42px] sm:text-[56px] md:text-[72px] lg:text-[84px] iridescent-text">{SHORT_HERO.headline[1]}</span>
                <span className="block text-[42px] sm:text-[56px] md:text-[72px] lg:text-[84px]">{SHORT_HERO.headline[2]}</span>
              </h1>
              <p className="mt-5 text-[18px] md:text-[20px] leading-relaxed text-white/90 max-w-[32ch] font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] text-left">{SHORT_HERO.sub}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button onClick={downloadCV} className="btn-iridescent text-sm py-3 px-7"><Download size={16} /> Download CV</button>
                <a href="#work" className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white text-[#0A0D0B] text-sm font-mono font-bold hover:bg-white/90 transition">View work <ExternalLink size={14} /></a>
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs font-mono text-white/60"><Sparkles size={13} className="text-[#00FF87]" /><span>Vo Nguyen Dang Khoa — Portfolio 2026</span></div>
            </Chapter>
          </motion.div>

          {/* Chapter 2 — ABOUT: bottom-center (wide, below chest — never over face) */}
          <motion.div style={{ opacity: useTransform(progress, [0.16, 0.24, 0.38, 0.44], [0, 1, 1, 0]), y: useTransform(progress, [0.16, 0.24], [24, 0]) }} className="scrolly-panel absolute inset-0 flex items-end justify-center pb-[6vh] md:pb-[8vh] px-2 pointer-events-auto">
            <Chapter className="w-full max-w-[760px] bg-black/40 backdrop-blur-xl rounded-[28px] p-6 md:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.5)] text-left">
              <div className="flex items-center justify-center gap-2.5 mb-3">
                <span className="h-px w-8 bg-[#00FF87]" /><span className="text-[11px] tracking-[0.24em] font-mono text-white/75 uppercase">{SHORT_ABOUT.kicker}</span>
              </div>
              <h2 className="text-[36px] md:text-[48px] font-black leading-[0.88] tracking-[-0.04em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)] text-center">{isCreative ? SHORT_ABOUT.titleCreative : SHORT_ABOUT.titleDev}</h2>
              <p className="mt-3.5 text-[16px] md:text-[18px] leading-relaxed text-white/88 max-w-[52ch] mx-auto text-center">{SHORT_ABOUT.body}</p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                {SHORT_ABOUT.stats.map((s) => (
                  <div key={s.val} className="px-4 py-3 rounded-2xl bg-white text-[#0A0D0B] min-w-[128px] text-center">
                    <div className="text-[24px] md:text-[28px] font-black leading-none tracking-tight">{s.val}</div><div className="text-[11px] font-mono tracking-wide text-black/60 uppercase mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-center gap-3 text-xs font-mono text-white/70">
                <span className="inline-flex items-center gap-2">Khoa.vo</span><span className="text-white/30">·</span><span>{PERSONAL_INFO.location}</span>
              </div>
            </Chapter>
          </motion.div>

          {/* Chapter 3 — SKILLS: middle low bottom-center */}
          <motion.div style={{ opacity: useTransform(progress, [0.36, 0.44, 0.56, 0.62], [0, 1, 1, 0]), y: useTransform(progress, [0.36, 0.44], [24, 0]) }} className="scrolly-panel absolute inset-0 flex items-end justify-center pb-[5vh] md:pb-[7vh] pointer-events-auto">
            <Chapter className="w-full max-w-[680px] bg-black/40 backdrop-blur-xl rounded-[28px] p-6 md:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.5)] text-center">
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" /><span className="text-[11px] tracking-[0.22em] font-mono text-white/80 uppercase">02 — TOOLS I TRUST</span>
              </div>
              <h2 className="text-[36px] md:text-[52px] font-black tracking-[-0.04em] leading-[0.9] text-white">{isCreative ? "Craft × Intelligence" : "Stack that ships"}</h2>
              <p className="mt-3 text-[16px] md:text-[18px] leading-relaxed text-white/85 max-w-[48ch] mx-auto">{isCreative ? "Generative pipelines fused with brand craft — repeatable, on-brand, 70% faster." : "Production stack from PWA to Rust, containerized and observed on Synology."}</p>
              <div className="mt-6 flex justify-center"><TabSwitch active={tab} onChange={onTabChange} size="sm" className="!bg-black/30 backdrop-blur-md" layoutId="scrolly-tab-pill" /></div>
              <div className="mt-5 flex flex-wrap gap-2 justify-center">
                {(isCreative ? SHORT_SKILLS.creative : SHORT_SKILLS.dev).map((s) => (
                  <span key={s} className="px-4 py-2 rounded-full bg-white text-[#0A0D0B] text-[13px] md:text-sm font-mono font-bold">{s}</span>
                ))}
              </div>
              <div className="mt-4 text-xs font-mono text-white/55">Tap to switch persona — same video, different lens.</div>
            </Chapter>
          </motion.div>

          {/* Chapter 4 — SELECTED WORK: bottom-left (irregular, avoids face right) */}
          <motion.div style={{ opacity: useTransform(progress, [0.54, 0.62, 0.74, 0.80], [0, 1, 1, 0]), y: useTransform(progress, [0.54, 0.62], [24, 0]) }} className="scrolly-panel absolute inset-0 flex items-end justify-start pb-[6vh] md:pb-[8vh] pointer-events-auto">
            <Chapter className="w-full max-w-[860px] bg-black/40 backdrop-blur-xl rounded-[28px] p-6 md:p-7 shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
              <div className="flex flex-wrap items-end justify-between gap-3 mb-4 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-2"><span className="h-px w-7 bg-[#00FF87]" /><span className="text-[11px] tracking-[0.22em] font-mono text-white/70 uppercase">03 — SELECTED 04 / 18</span></div>
                  <h2 className="text-[32px] md:text-[44px] font-black tracking-[-0.03em] leading-[0.9] text-white">Work that shipped</h2>
                </div>
                <a href="#work" className="hidden md:inline-flex items-center gap-1.5 text-sm font-mono text-white/90 hover:text-white underline decoration-white/25 underline-offset-4">View all <ExternalLink size={14} /></a>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {SHORT_WORK.map((p) => (
                  <a key={p.id} href={p.link} target="_blank" rel="noreferrer" className="group rounded-2xl overflow-hidden bg-white text-[#0A0D0B] p-4 flex flex-col gap-2 hover:translate-y-[-3px] hover:shadow-xl transition text-left">
                    <span className="text-[10px] font-mono tracking-wide px-2.5 py-1 rounded-full bg-[#0A0D0B] text-white w-fit">{p.category} · {p.year || p.tech}</span>
                    <span className="font-black text-[16px] md:text-[17px] leading-tight tracking-tight group-hover:text-emerald-600">{p.title}</span>
                    <span className="text-[13px] text-black/60 leading-snug line-clamp-2">{p.desc}</span>
                  </a>
                ))}
              </div>
              <a href="#work" className="md:hidden mt-4 inline-flex items-center gap-1.5 text-sm font-mono text-white hover:text-white underline decoration-white/25">View all work — grid below <ExternalLink size={14} /></a>
            </Chapter>
          </motion.div>

          {/* Chapter 5 — EXPERIENCE: top-left (random high, away from face mid) */}
          <motion.div style={{ opacity: useTransform(progress, [0.72, 0.80, 0.88, 0.92], [0, 1, 1, 0]), y: useTransform(progress, [0.72, 0.80], [24, 0]) }} className="scrolly-panel absolute inset-0 flex items-end justify-start pb-[8vh] md:pb-[10vh] pointer-events-auto">
            <Chapter className="w-full max-w-[580px] bg-black/40 backdrop-blur-xl rounded-[28px] p-6 md:p-7 shadow-[0_16px_48px_rgba(0,0,0,0.5)] text-left">
              <div className="flex items-center gap-2 mb-3"><span className="h-px w-7 bg-[#D0B2FF]" /><span className="text-[11px] tracking-[0.22em] font-mono text-white/75 uppercase">04 — PATH 2017 → NOW</span></div>
              <h2 className="text-[32px] md:text-[42px] font-black tracking-[-0.03em] leading-[0.9] text-white">Arc of leadership</h2>
              <div className="mt-5 space-y-3">
                {SHORT_EXPERIENCE.map((e) => (
                  <div key={e.period} className="flex gap-3.5 p-4 rounded-2xl bg-white text-[#0A0D0B]">
                    <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-[#00FF87] shadow-[0_0_10px_#00FF87]" />
                    <div className="min-w-0"><div className="text-xs font-mono tracking-wide text-black/55">{e.period}</div><div className="text-[15px] font-black leading-tight tracking-tight">{e.role} <span className="font-bold text-black/50">· {e.company}</span></div><div className="text-[13px] text-black/65 leading-snug mt-0.5">{e.note}</div></div>
                  </div>
                ))}
              </div>
            </Chapter>
          </motion.div>

          {/* Chapter 6 — CONTACT: bottom-right? No — make bottom-center wide but safe below face */}
          <motion.div style={{ opacity: useTransform(progress, [0.86, 0.92, 1, 1], [0, 1, 1, 1]), y: useTransform(progress, [0.86, 0.92], [24, 0]) }} className="scrolly-panel absolute inset-0 flex items-end justify-center pb-[8vh] md:pb-[10vh] pointer-events-auto">
            <Chapter className="w-full max-w-[640px] bg-black/40 backdrop-blur-xl rounded-[28px] p-7 md:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.5)] text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-mono tracking-wide text-white/85 backdrop-blur">
                <Sparkles size={14} className="text-[#00FF87]" /> Ready to ship?
              </div>
              <h2 className="mt-4 text-[38px] md:text-[48px] font-black tracking-[-0.04em] leading-[0.86] text-white">LET’S BUILD <br /> <span className="iridescent-text">SOMETHING</span> UNFORGETTABLE</h2>
              <div className="mt-7 flex flex-col gap-3 max-w-[520px] mx-auto">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="inline-flex items-center justify-between gap-3 px-2 py-2 pr-2 rounded-full bg-white text-[#0A0D0B] font-mono text-[15px] md:text-[16px] shadow-lg">
                  <span className="pl-3 flex items-center gap-2.5"><span className="w-8 h-8 rounded-full bg-[#0A0D0B] text-white grid place-items-center text-sm">✉</span>{PERSONAL_INFO.email}</span><span className="px-5 py-2.5 rounded-full bg-[#0A0D0B] text-white text-xs font-bold">Copy</span>
                </a>
                <div className="flex gap-3">
                  <button onClick={downloadCV} className="btn-iridescent text-sm py-3 px-6 flex-1 justify-center"><Download size={16} /> PDF CV</button>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-mono backdrop-blur-md">LinkedIn <ExternalLink size={14} /></a>
                </div>
                <div className="text-xs font-mono text-white/60">Ho Chi Minh City · {PERSONAL_INFO.availability} · Response &lt; 24h</div>
              </div>
            </Chapter>
          </motion.div>
        </div>
        <div className="hidden md:block absolute right-0 top-0 h-full w-[48%] pointer-events-none" aria-hidden />
      </div>
    </section>
  );
}
