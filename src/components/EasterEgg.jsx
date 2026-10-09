import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Sparkles, ExternalLink, X, Check, Activity, ShieldCheck } from 'lucide-react';
import { IT_DATA } from '../data/dev';
import { CREATIVE_DATA } from '../data/creative';
import { PERSONAL_INFO } from '../data/personal';
import FEEDBACKS_DATA from '../data/ecosystem-feedbacks.json';

const BOOT_SEQUENCE = [
  'INITIALIZING MONOCHROME SHELL [x86_64-linux]...',
  'MOUNTING ROOT FILE SYSTEM (/dev/nvme0n1p2)... [OK]',
  'CHECKING CRYPTOGRAPHIC LICENSES (Ed25519)... [PASS]',
  'VERIFYING GPG SUPPLY CHAIN ATTESTATIONS... [PASS]',
  'CONNECTING TELEMETRY (syno.vndns.net & trimui.vndns.net)... [ESTABLISHED]',
  'SESSION READY. ZERO-TRUST ENVIRONMENT SECURED.',
];

const QUICK_COMMANDS = [
  'status',
  'projects',
  'skills',
  'reviews',
  'about',
  'cv',
  'contact',
  'clear',
];

function resolveCommand(rawCmd, triggerPdf) {
  const parts = rawCmd.trim().split(/\s+/);
  const cmd = parts[0]?.toLowerCase();
  const arg = parts.slice(1).join(' ').toLowerCase();

  const commands = {
    help: () =>
      [
        'KHOA.VO OS v2.4 (x86_64-musl) — COMMAND DIRECTORY',
        '─────────────────────────────────────────────────────────────────────────────',
        '  status            Inspect live latency & health of syno & trimui nodes',
        '  projects          List shipped production applications & architecture',
        '  skills            Systems, security, and low-level development capabilities',
        '  reviews           Read real user feedback from production servers',
        '  cv                Open interactive printable high-resolution PDF CV',
        '  about / whoami    Engineering background & systems manifesto',
        '  experience        Career chronology (Phibious, P&G SEA, KV Labs)',
        '  ping <node>       Simulate ICMP ping to syno or trimui node',
        '  ls                List files in virtual filesystem directory',
        '  cat <file>        Inspect file (e.g. "cat cv.pdf", "cat about.txt")',
        '  contact           Email, telephone, GitHub, and Forgejo endpoints',
        '  uptime            Continuous system execution duration',
        '  clear             Clear screen buffer',
        '  exit              Close terminal session (or press ESC)',
        '─────────────────────────────────────────────────────────────────────────────',
        'Tip: Click any quick command chip above or press TAB for autocomplete.',
      ].join('\n'),

    status: () =>
      [
        '┌───────────────────────────────────────────────────────────────────────────┐',
        '│                   PRODUCTION INFRASTRUCTURE TELEMETRY                     │',
        '├────────────────────┬───────────┬─────────┬────────────────────────────────┤',
        '│ NODE / HOST        │ STATUS    │ LATENCY │ ARCHITECTURE & ROLE            │',
        '├────────────────────┼───────────┼─────────┼────────────────────────────────┤',
        '│ syno.vndns.net     │ ONLINE ●  │ 28 ms   │ Synology DSM 7.2 / SPK Hub     │',
        '│ trimui.vndns.net   │ ONLINE ●  │ 32 ms   │ TrimUI Smart Pro OS & OTA Store│',
        '│ git.khoavo.vndns   │ ONLINE ●  │ 22 ms   │ Forgejo Self-Hosted Git Mirror │',
        '└────────────────────┴───────────┴─────────┴────────────────────────────────┘',
        'Zero-trust Cloudflare tunnels active • 0 WAN ports exposed • SSL A+ Grade',
      ].join('\n'),

    ping: () => {
      const target = arg || 'syno';
      if (target.includes('syno')) {
        return [
          'PING syno.vndns.net (103.179.186.x) 56(84) bytes of telemetry data.',
          '64 bytes from syno.vndns.net: icmp_seq=1 ttl=56 time=28.4 ms',
          '64 bytes from syno.vndns.net: icmp_seq=2 ttl=56 time=27.9 ms',
          '64 bytes from syno.vndns.net: icmp_seq=3 ttl=56 time=28.1 ms',
          '--- syno.vndns.net ping statistics ---',
          '3 packets transmitted, 3 received, 0% packet loss, time 2002ms, rtt avg 28.1 ms',
        ].join('\n');
      } else if (target.includes('trimui')) {
        return [
          'PING trimui.vndns.net (103.179.186.x) 56(84) bytes of telemetry data.',
          '64 bytes from trimui.vndns.net: icmp_seq=1 ttl=56 time=32.1 ms',
          '64 bytes from trimui.vndns.net: icmp_seq=2 ttl=56 time=31.8 ms',
          '64 bytes from trimui.vndns.net: icmp_seq=3 ttl=56 time=32.0 ms',
          '--- trimui.vndns.net ping statistics ---',
          '3 packets transmitted, 3 received, 0% packet loss, time 2003ms, rtt avg 31.9 ms',
        ].join('\n');
      }
      return `ping: unknown host "${target}". Usage: "ping syno" or "ping trimui"`;
    },

    projects: () =>
      [
        'SHIPPED PRODUCTION APPS & SYSTEMS:',
        '─────────────────────────────────────────────────────────────────────────────',
        '  • kv-synology    Next.js 15, React 19, TypeScript, 42 AI MCP Tools',
        '                   Synology DSM Web Manager with QuickConnect resolver & AI agents.',
        '',
        '  • kv-trimui      Rust 1.85+, Static Musl, Linux Evdev, /dev/fb0',
        '                   Embedded OS for TrimUI Smart Pro (60 FPS MPV, <900KB RAM engine).',
        '',
        '  • ola            Go, React 18, Dynamic Watermarking, P2P WebSockets',
        '                   Forensic anti-leak DRM video platform with screen-blanking traps.',
        '',
        '  • spkrepo        Python Flask, PostgreSQL, GnuPG Package Signing',
        '                   Community SPK repository for 1-click Synology DSM installations.',
        '',
        '  • kv-file-pro    Rust Axum, SQLite WAL, Argon2id, TOTP 2FA, Ed25519',
        '                   Hardened storage engine with dunce filesystem sandboxing.',
        '',
        '  • vietc          Rust, Linux Kernel /dev/uinput & /dev/input',
        '                   Direct Unicode Vietnamese IME (<10MB RAM rootless daemon).',
        '─────────────────────────────────────────────────────────────────────────────',
        'Run "status" to verify live nodes, or visit https://git.khoavo.vndns.net',
      ].join('\n'),

    skills: () =>
      [
        'TECHNICAL CAPABILITIES & DOMAIN SPECIALIZATION:',
        '─────────────────────────────────────────────────────────────────────────────',
        '  [SECURITY]       Threat Modeling (STRIDE), Forensic DRM, Argon2id, TOTP 2FA,',
        '                   Ed25519 Asymmetric Licensing, dunce Sandboxing, GnuPG.',
        '',
        '  [LANGUAGES]      Rust, Go, TypeScript, JavaScript, Python, Kotlin, SQL, Bash.',
        '',
        '  [SYSTEMS & INFRA]Synology DSM 7.2, Docker Multi-arch, Static Musl Linking,',
        '                   Cloudflare Zero-Trust Tunnels, Nginx, PostgreSQL, SQLite WAL.',
        '',
        '  [FRONTEND & AI]  React 19, Next.js 15, Model Context Protocol (MCP), Tailwind v4,',
        '                   Framer Motion, Compose Multiplatform, ComfyUI Diffusion.',
        '─────────────────────────────────────────────────────────────────────────────',
      ].join('\n'),

    reviews: () => {
      const reviews = FEEDBACKS_DATA.feedbacks || [];
      const lines = [
        `VERIFIED COMMUNITY FEEDBACK (${reviews.length} PRODUCTION RECORDS):`,
        '─────────────────────────────────────────────────────────────────────────────',
      ];
      reviews.slice(0, 5).forEach((r, idx) => {
        lines.push(`[${idx + 1}] ${r.authorName}  •  ${r.projectLabel} (${r.appId})  [5.0 ★]`);
        lines.push(`    "${r.comment}"`);
        lines.push('');
      });
      lines.push(`All ${reviews.length} records verified from live SQLite telemetry databases.`);
      return lines.join('\n');
    },

    about: () =>
      [
        'ABOUT VO NGUYEN DANG KHOA (KHOA VO):',
        '─────────────────────────────────────────────────────────────────────────────',
        `Title:    ${IT_DATA.title}`,
        'Base:     Ho Chi Minh City, Vietnam',
        '',
        IT_DATA.summary,
      ].join('\n'),

    whoami: () => resolveCommand('about')(),

    experience: () =>
      [
        'CAREER ARCHITECTURE & ROLES:',
        '─────────────────────────────────────────────────────────────────────────────',
        ...IT_DATA.experience.map(
          (e) => `  • ${e.role}\n    ${e.company} (${e.period})\n`
        ),
      ].join('\n'),

    cv: () => {
      triggerPdf?.();
      return '[*] Dispatching event: Interactive PDF CV preview opened.';
    },

    ls: () =>
      [
        'about.txt       skills.json     projects.md     reviews.log',
        'cv.pdf          security.log    synology.spk    trimui_a133.elf',
      ].join('\n'),

    cat: () => {
      if (!arg) return 'Usage: cat <filename> (e.g. "cat cv.pdf", "cat reviews.log", "cat about.txt")';
      if (arg.includes('cv')) {
        triggerPdf?.();
        return '[*] Opening high-resolution printable PDF CV modal...';
      }
      if (arg.includes('review')) return resolveCommand('reviews')();
      if (arg.includes('about')) return resolveCommand('about')();
      if (arg.includes('skill')) return resolveCommand('skills')();
      if (arg.includes('project')) return resolveCommand('projects')();
      return `cat: ${arg}: No such file or directory`;
    },

    contact: () =>
      [
        'COMMUNICATION COORDINATES:',
        '─────────────────────────────────────────────────────────────────────────────',
        `  Email:   ${PERSONAL_INFO.email}`,
        `  Phone:   ${PERSONAL_INFO.phone}`,
        `  GitHub:  ${PERSONAL_INFO.github}`,
        `  Forgejo: ${PERSONAL_INFO.forgejo}`,
        `  Web:     ${PERSONAL_INFO.website}`,
      ].join('\n'),

    date: () => new Date().toUTCString(),

    uptime: () => {
      const start = performance.now();
      const sec = Math.floor(start / 1000);
      const min = Math.floor(sec / 60);
      const hr = Math.floor(min / 60);
      return `System uptime: ${hr}h ${min % 60}m ${sec % 60}s (Kernel: Linux 6.12-musl)`;
    },

    clear: '__CLEAR__',
    exit: '__EXIT__',
  };

  return commands[cmd] || null;
}

function MonochromeBootLoader({ onComplete }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < BOOT_SEQUENCE.length) {
        setLogs((prev) => [...prev, BOOT_SEQUENCE[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 250);
      }
    }, 110);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.01, transition: { duration: 0.25 } }}
      className="fixed inset-0 z-[200] bg-[#07090b] text-white font-mono p-6 sm:p-12 flex flex-col justify-center items-center text-left"
    >
      <div className="space-y-2 text-xs sm:text-sm max-w-lg w-full text-left font-mono">
        <div className="text-white/40 text-[10px] uppercase tracking-widest mb-3">
          // HARDWARE BOOTSTRAP
        </div>
        {logs.map((log, i) => (
          <div key={i} className="text-white/80 font-mono tracking-wide flex items-center gap-2">
            <span className="text-white/40">&gt;</span>
            <span>{log}</span>
          </div>
        ))}
        {logs.length < BOOT_SEQUENCE.length && (
          <div className="animate-pulse text-white font-mono">&gt; ▋</div>
        )}
      </div>
    </motion.div>
  );
}

export default function EasterEgg({ open, onClose }) {
  const [booted, setBooted] = useState(false);
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const print = useCallback((text) => {
    setLines((prev) => [...prev, ...text.split('\n')]);
  }, []);

  const triggerPdf = useCallback(() => {
    window.dispatchEvent(new CustomEvent('open-pdf-preview'));
  }, []);

  // Reset when opening
  useEffect(() => {
    if (open) {
      setBooted(false);
      setLines([]);
      setHistory([]);
      setHistIdx(-1);
      setInput('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Focus input when booted
  useEffect(() => {
    if (open && booted) {
      inputRef.current?.focus();
    }
  }, [open, booted]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleCommand = (raw) => {
    const trimmed = raw.trim();
    const cmd = trimmed.toLowerCase();

    if (trimmed) {
      setHistory((prev) => [...prev, trimmed]);
      setHistIdx(-1);
    }

    setLines((prev) => [...prev, `$ ${raw}`]);

    if (!cmd) return;

    const result = resolveCommand(raw, triggerPdf);

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    if (cmd === 'exit') {
      onClose();
      return;
    }

    if (result) {
      const output = typeof result === 'function' ? result() : result;
      print(output);
    } else {
      print(`command not found: "${cmd}". Type "help" or select a button above.`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(history[next]);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const cmd = input.trim().toLowerCase();
      const match = QUICK_COMMANDS.find((c) => c.startsWith(cmd) && c !== cmd);
      if (match) setInput(match);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8 select-none"
        >
          <AnimatePresence>
            {!booted && (
              <MonochromeBootLoader
                key="boot"
                onComplete={() => setBooted(true)}
              />
            )}
          </AnimatePresence>

          {booted && (
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              className="w-full max-w-4xl h-[75vh] max-h-[700px] min-h-[500px] flex flex-col rounded-2xl border border-white/20 bg-[#090b0e] shadow-[0_0_80px_rgba(255,255,255,0.07)] overflow-hidden relative crt-screen crt-scanline"
            >
              {/* Window Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#050608] border-b border-white/10 shrink-0 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-white/25 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-white/45 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-white/75 inline-block" />
                  <span className="ml-3 text-xs sm:text-sm text-white font-bold tracking-wide flex items-center gap-2 font-mono">
                    <TerminalIcon size={15} className="text-white/80" />
                    <span>khoa.vo@workstation:~ [ZSH]</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-white/40 hidden sm:inline-block font-mono">
                    80x24 CHARS
                  </span>
                  <button
                    onClick={onClose}
                    className="px-2.5 py-1 text-xs text-white/80 hover:text-white bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 rounded-md transition-all font-mono cursor-pointer"
                    title="Close (ESC)"
                  >
                    ESC [X]
                  </button>
                </div>
              </div>

              {/* Quick Action Chips Bar (Prominent & Comfortable) */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1014] border-b border-white/10 shrink-0 overflow-x-auto gap-3 custom-scrollbar">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[11px] font-mono font-bold text-white/40 uppercase tracking-wider mr-1">
                    RUN:
                  </span>
                  {QUICK_COMMANDS.map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => handleCommand(cmd)}
                      className="px-3 py-1 text-xs font-mono font-semibold rounded-md bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      ${cmd}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleCommand('help')}
                  className="text-xs font-mono text-white/50 hover:text-white px-2.5 py-1 rounded border border-white/10 hover:border-white/30 transition-all shrink-0 cursor-pointer hidden md:inline-block"
                >
                  help (?)
                </button>
              </div>

              {/* Terminal Display Output Area */}
              <div
                ref={scrollRef}
                onClick={() => inputRef.current?.focus()}
                className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 font-mono text-sm leading-relaxed text-left text-white"
              >
                {/* Neofetch-style Structured System Overview Banner */}
                <div className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10 mb-5 font-mono shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Left Monogram Brand Mark */}
                    <div className="md:col-span-4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:pr-4">
                      <div className="text-white font-extrabold text-lg sm:text-xl tracking-tight flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                        <span>KHOA.VO // OS</span>
                      </div>
                      <div className="text-white/60 text-xs font-mono mt-1">
                        Systems Architect &amp; Security Lead
                      </div>
                      <div className="mt-2 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                        Ho Chi Minh City &bull; Zero-Trust
                      </div>
                    </div>

                    {/* Right System Specs */}
                    <div className="md:col-span-8 space-y-1 text-xs sm:text-sm font-mono text-white/80">
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 w-24 shrink-0">OS:</span>
                        <span className="text-white font-semibold">KhoaVo OS 2.4 (x86_64-musl)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 w-24 shrink-0">Host:</span>
                        <span className="text-white font-medium">khoavo.vndns.net</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 w-24 shrink-0">Nodes:</span>
                        <span className="text-emerald-400 font-semibold">syno.vndns.net</span>
                        <span className="text-white/30">&bull;</span>
                        <span className="text-cyan-400 font-semibold">trimui.vndns.net</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 w-24 shrink-0">Uptime:</span>
                        <span className="text-white/70">99.98% &bull; Production Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtitle Hint */}
                <div className="text-xs sm:text-sm text-white/60 mb-4 font-mono">
                  Type a command below (e.g. <span className="text-white font-bold">&quot;status&quot;</span>, <span className="text-white font-bold">&quot;projects&quot;</span>, <span className="text-white font-bold">&quot;skills&quot;</span>, <span className="text-white font-bold">&quot;reviews&quot;</span>) or click a chip above:
                </div>

                {/* Terminal Output Lines */}
                <div className="space-y-1.5 text-left font-mono">
                  {lines.map((line, i) => (
                    <div
                      key={i}
                      className={
                        line.startsWith('$')
                          ? 'text-white font-bold text-sm sm:text-base mt-4 pt-1 border-t border-white/5 flex items-center gap-2'
                          : line === ''
                          ? 'h-2'
                          : 'text-white/90 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed'
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>

                {/* Command Input Prompt (Comfortable, Large & Focused) */}
                <div className="flex items-center gap-2.5 mt-4 text-left font-mono">
                  <span className="text-white font-bold text-sm sm:text-base shrink-0">$</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-white font-mono caret-white text-sm sm:text-base outline-none min-h-[1.75em] placeholder:text-white/30"
                    placeholder="type command..."
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                  />
                </div>
              </div>

              {/* Footer Status Bar */}
              <div className="px-4 py-2.5 border-t border-white/10 bg-[#050608] text-[11px] text-white/50 font-mono flex items-center justify-between shrink-0">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white/70">SYSTEM READY // KHOA.VO OS</span>
                </span>
                <span className="flex items-center gap-3 text-white/40">
                  <span className="hidden sm:inline">TAB: autocomplete</span>
                  <span>&bull;</span>
                  <span>↑↓ history</span>
                  <span className="animate-pulse text-white">▋</span>
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
