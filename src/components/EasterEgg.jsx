import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { IT_DATA } from '../data/dev';
import { CREATIVE_DATA } from '../data/creative';
import { PERSONAL_INFO } from '../data/personal';

const BOOT_SEQUENCE = [
  'INIT SYSTEM KHOA.VO...',
  'MOUNTING VIRTUAL DOM [OK]',
  'LOADING REACT ROOT [OK]',
  'ESTABLISHING AI SUBSYSTEMS...',
  'AI SUBSYSTEMS [ONLINE]',
  'BYPASSING SECURITY PROTOCOLS...',
  'ACCESS GRANTED.',
];

const BANNER = `  ╔═══════════════════════════════════════════════════════════════════════╗
  ║  ██╗  ██╗ ██╗  ██╗  ██████╗   █████╗     ██╗   ██╗  ██████╗   ║
  ║  ██║ ██╔╝ ██║  ██║ ██╔═══██╗ ██╔══██╗    ██║   ██║ ██╔═══██╗  ║
  ║  █████╔╝  ███████║ ██║   ██║ ███████║    ██║   ██║ ██║   ██║  ║
  ║  ██╔═██╗  ██╔══██║ ██║   ██║ ██╔══██║    ╚██╗ ██╔╝ ██║   ██║  ║
  ║  ██║  ██╗ ██║  ██║ ╚██████╔╝ ██║  ██║ ██╗ ╚████╔╝  ╚██████╔╝  ║
  ║  ╚═╝  ╚═╝ ╚═╝  ╚═╝  ╚═════╝  ╚═╝  ╚═╝ ╚═╝  ╚═══╝    ╚═════╝   ║
  ╚═══════════════════════════════════════════════════════════════════════╝`;

const QUICK_COMMANDS = ['help', 'about', 'skills', 'projects', 'creative', 'experience', 'contact', 'clear', 'exit'];

function resolveCommand(cmd) {
  const commands = {
    help: () =>
      [
        'Available commands:',
        '  help      — show this message',
        '  about     — who is Khoa Vo',
        '  whoami    — same as about',
        '  skills    — technical & creative skillset',
        '  projects  — shipped dev apps',
        '  creative  — featured creative works',
        '  experience— work history',
        '  contact   — email, phone, links',
        '  journey   — dev learning timeline',
        '  date      — current date & time',
        '  uptime    — fun uptime counter',
        '  clear     — clear the screen',
        '  exit      — close nostalgic mode',
      ].join('\n'),

    about: () =>
      [
        'Vo Nguyen Dang Khoa (Khoa.vo)',
        `${CREATIVE_DATA.title} / ${IT_DATA.title}`,
        'Based in Ho Chi Minh City, Vietnam',
        '',
        IT_DATA.summary,
      ].join('\n'),

    whoami: () => resolveCommand('about')(),

    skills: () =>
      [
        '=== CREATIVE SKILLS ===',
        ...CREATIVE_DATA.skills.map(
          (s) => `  ${s.category}: ${s.items.join(', ')}`
        ),
        '',
        '=== DEV SKILLS ===',
        ...Object.entries(IT_DATA.skills).map(
          ([cat, items]) => `  ${cat.toUpperCase()}: ${items.join(', ')}`
        ),
      ].join('\n'),

    projects: () =>
      [
        '=== SHIPPED DEV APPS ===',
        ...IT_DATA.projects.map(
          (p) => `  • ${p.name} — ${p.tech.join(', ')}`
        ),
      ].join('\n'),

    creative: () =>
      [
        '=== FEATURED CREATIVE WORKS ===',
        ...CREATIVE_DATA.projects.slice(0, 6).map(
          (p) => `  • [${p.year}] ${p.title} — ${p.category}`
        ),
        `  ... and ${CREATIVE_DATA.projects.length - 6} more`,
      ].join('\n'),

    experience: () =>
      [
        '=== CAREER ARC ===',
        ...IT_DATA.experience.map(
          (e) => `  • ${e.role} @ ${e.company} (${e.period})`
        ),
      ].join('\n'),

    contact: () =>
      [
        `Email:  ${PERSONAL_INFO.email}`,
        `Phone:  ${PERSONAL_INFO.phone}`,
        `Git:    ${PERSONAL_INFO.github}`,
        `Web:    ${PERSONAL_INFO.portfolio}`,
      ].join('\n'),

    journey: () =>
      [
        '=== DEV LEARNING TIMELINE ===',
        ...IT_DATA.journey.map(
          (j) => `  [${j.month}] ${j.title} — ${j.description}`
        ),
      ].join('\n'),

    date: () => new Date().toString(),

    uptime: () => {
      const start = performance.now();
      const sec = Math.floor(start / 1000);
      const min = Math.floor(sec / 60);
      const hr = Math.floor(min / 60);
      return `System uptime: ${hr}h ${min % 60}m ${sec % 60}s`;
    },

    clear: '__CLEAR__',
    exit: '__EXIT__',
  };

  return commands[cmd] || null;
}

function TerminalBootLoader({ onComplete }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < BOOT_SEQUENCE.length) {
        setLogs((prev) => [...prev, BOOT_SEQUENCE[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 160);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', transition: { duration: 0.6, ease: 'easeIn' } }}
      className="fixed inset-0 z-[200] bg-[#0a0a0a] text-[#00FF94] font-mono p-6 md:p-12 flex flex-col justify-center items-center text-center pb-24"
    >
      <div className="space-y-2 opacity-85 text-sm md:text-base max-w-md w-full">
        {logs.map((log, i) => (
          <div key={i} className="tracking-wide">&gt; {log}</div>
        ))}
        {logs.length < BOOT_SEQUENCE.length && <div className="animate-pulse text-cyan-400">&gt; ▋</div>}
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
  const welcomePrinted = useRef(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const print = useCallback((text) => {
    setLines((prev) => [...prev, ...text.split('\n')]);
  }, []);

  // Reset & Lock scroll when opening
  useEffect(() => {
    if (open) {
      setBooted(false);
      setLines([]);
      setHistory([]);
      setHistIdx(-1);
      setInput('');
      welcomePrinted.current = false;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // print welcome only once after boot completes
  useEffect(() => {
    if (open && booted && !welcomePrinted.current) {
      welcomePrinted.current = true;
      print('KHOA.VO OS v2.0 — nostalgic CRT terminal');
      print('Type "help" or tap a command chip above to begin.\n');
      inputRef.current?.focus();
    }
  }, [open, booted, print]);

  // auto-scroll
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

    // add command to history
    if (trimmed) {
      setHistory((prev) => [...prev, trimmed]);
      setHistIdx(-1);
    }

    setLines((prev) => [...prev, `$ ${raw}`]);

    if (!cmd) return;

    const result = resolveCommand(cmd);

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
      print(`command not found: ${cmd} — type "help"`);
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
          className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 md:p-8 select-none"
        >
          <AnimatePresence>
            {!booted && <TerminalBootLoader key="boot" onComplete={() => setBooted(true)} />}
          </AnimatePresence>

          {booted && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl h-[84vh] flex flex-col rounded-2xl border-2 border-[#00FF94]/50 bg-[#060d09] shadow-[0_0_60px_rgba(0,255,148,0.2)] overflow-hidden relative crt-screen crt-scanline"
            >
              {/* Top CRT Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#030704] border-b border-[#00FF94]/30 shrink-0 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-sm"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block shadow-sm"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block shadow-sm"></span>
                  <span className="ml-2 text-xs text-[#00FF94] font-bold tracking-wide flex items-center gap-1.5">
                    <TerminalIcon size={14} /> khoa.vo@os:~ [CRT MONITOR]
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#00FF94]/60 hidden sm:inline-block">80x24 CHARS</span>
                  <button
                    onClick={onClose}
                    className="px-2.5 py-1 text-xs text-[#00FF94] hover:text-red-400 border border-[#00FF94]/40 hover:border-red-400/50 rounded transition-all font-mono"
                    title="Close (ESC)"
                  >
                    ESC [X]
                  </button>
                </div>
              </div>

              {/* Quick Action Command Chips Bar */}
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-[#08120c] border-b border-[#00FF94]/20 overflow-x-auto shrink-0 custom-scrollbar">
                <span className="text-[10px] text-[#00FF94]/70 font-mono flex items-center gap-1 shrink-0 mr-1">
                  <Sparkles size={11} /> Quick:
                </span>
                {QUICK_COMMANDS.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-2.5 py-0.5 text-xs font-mono rounded bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/30 hover:bg-[#00FF94]/30 hover:border-[#00FF94]/60 transition-all shrink-0 active:scale-95 shadow-sm"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Terminal Display Output Area (Text Left-Aligned Inside Monitor Screen) */}
              <div
                ref={scrollRef}
                onClick={() => inputRef.current?.focus()}
                className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 font-mono text-sm leading-relaxed text-left"
              >
                {/* ASCII Art Banner (Centered at Top) */}
                <div className="text-[#00FF94] mb-5 text-[8px] sm:text-[10px] md:text-xs whitespace-pre leading-tight text-center flex justify-center font-mono select-none tracking-tighter">
                  {BANNER}
                </div>

                <div className="text-xs text-[#00FF94]/70 mb-4 text-center font-mono">
                  KHOA.VO OS v2.0 — nostalgic CRT terminal display<br/>
                  Type "help" or tap a command chip above to begin.
                </div>

                {/* Left-Aligned Output Lines */}
                <div className="space-y-1 text-left font-mono">
                  {lines.map((line, i) => (
                    <div
                      key={i}
                      className={
                        line.startsWith('$')
                          ? 'text-[#00D9FF] font-semibold mt-3 text-left'
                          : line === ''
                          ? 'h-3'
                          : 'text-slate-200 text-left whitespace-pre-wrap'
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>

                {/* Left-Aligned Command Typing Line inside the monitor screen */}
                <div className="flex items-center gap-2 mt-4 text-left font-mono">
                  <span className="text-[#00FF94] font-bold shrink-0">$</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-[#00FF94] outline-none font-mono caret-[#00FF94] min-h-[1.5em] text-left"
                    placeholder="type command..."
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                  />
                </div>
              </div>

              {/* Footer status inside monitor */}
              <div className="px-4 py-2 border-t border-[#00FF94]/20 bg-[#030704] text-[10px] text-[#00FF94]/60 font-mono flex items-center justify-between shrink-0">
                <span>SYSTEM READY // KHOA.VO OS</span>
                <span className="flex items-center gap-2">
                  <span>↑↓ history</span>
                  <span className="animate-pulse text-[#00FF94]">▋</span>
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
