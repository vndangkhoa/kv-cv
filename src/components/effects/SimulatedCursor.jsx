import { motion, AnimatePresence } from 'framer-motion';
import { CREATION_MODES } from './cursorConfig';

/**
 * `<SimulatedCursor>`
 * Autonomous Figma/CAD/Node-graph style SVG cursor with attached user badge,
 * specialized tool tip variants (`default`, `ibeam`, `crosshair`, `pen`, `director`),
 * explicit `awaitingLabel` cooperative dependency handoff badge (`⏳ AWAIT: <AGENT>`),
 * click ripple effect, and a live fake-typing bubble (typewriter text + blinking caret)
 * for worker cursors, the `Aesthetic-UI` decorator, and the low-opacity Master Orchestrator (`KV-Director`).
 */
export function SimulatedCursor({
  x = 0,
  y = 0,
  label,
  role,
  tier = 3,
  cursorVariant = 'default',
  awaitingLabel = '',
  commandText = '',
  commandStatus = '',
  typedText = '',
  isTyping = false,
  color = '#00E599',
  textColor = '#04120C',
  opacity = 1,
  scale = 1,
  clicking = false,
  rippling = false,
  dragging = false,
  flipLeft = false,
}) {
  const activeScale = clicking ? 0.9 : scale;
  const isDirector = tier === 1 || cursorVariant === 'director';
  const isPen = cursorVariant === 'pen';
  const isAwaiting = Boolean(awaitingLabel);
  const bubbleText = commandText || typedText;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
        opacity,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
        zIndex: isDirector ? 54 : isPen ? 64 : tier === 2 ? 62 : 60,
      }}
      aria-hidden="true"
    >
      {/* Click / Release / Stamp Ripple Ping Ring at Exact Cursor Tip (0,0) */}
      <AnimatePresence>
        {rippling && (
          <motion.div
            key="click-ripple"
            initial={{ scale: 0.2, opacity: isDirector ? 0.65 : 1 }}
            animate={{ scale: isDirector ? 2.2 : 2.9, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: -15,
              left: -15,
              width: 30,
              height: 30,
              borderRadius: '9999px',
              border: `1.5px solid ${color}`,
              boxShadow: `0 0 18px ${color}`,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Holding / Awaiting Cooperative Ring at Cursor Tip when waiting for another cursor */}
      {isAwaiting && (
        <div
          style={{
            position: 'absolute',
            top: -10,
            left: -10,
            width: 20,
            height: 20,
            borderRadius: '9999px',
            border: '1.5px dashed #FBBF24',
            boxShadow: '0 0 12px rgba(251, 191, 36, 0.45)',
          }}
          className="animate-spin"
        />
      )}

      {/* Secondary Inner Flash Dot on Click-Down & Release */}
      <AnimatePresence>
        {(clicking || rippling) && (
          <motion.div
            key="click-dot"
            initial={{ scale: 0.4, opacity: isDirector ? 0.7 : 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{
              position: 'absolute',
              top: -5,
              left: -5,
              width: 10,
              height: 10,
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              boxShadow: `0 0 10px ${color}`,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Crisp SVG Cursor Vector Pointing at (0,0) */}
      <div
        style={{
          transform: `scale(${activeScale})`,
          transformOrigin: '0px 0px',
          transition: 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {cursorVariant === 'ibeam' ? (
          /* Typography I-Beam + Arrow Hybrid Cursor for Type-Bot */
          <svg
            width="24"
            height="28"
            viewBox="0 0 24 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: `drop-shadow(0 3px 8px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 8px ${color}88)`,
              transform: 'translate(-4px, -14px)',
            }}
          >
            {/* Top & Bottom I-Beam Serif Caps + Vertical Laser Stem */}
            <path
              d="M1 3H7M4 3V25M1 25H7"
              stroke={color}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Mini pointer chevron attached to I-beam center */}
            <path
              d="M7.5 14L17.5 9.5L15.2 14L17.5 18.5L7.5 14Z"
              fill={color}
              stroke="#050706"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        ) : cursorVariant === 'crosshair' ? (
          /* Multi-Point Stamp Reticle + Pointer Cursor for Sys-Arch */
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: `drop-shadow(0 3px 8px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 8px ${color}88)`,
              transform: 'translate(-3px, -3px)',
            }}
          >
            <circle
              cx="4"
              cy="4"
              r="3.2"
              stroke={color}
              strokeWidth="1.5"
              fill="#050706"
            />
            <path
              d="M4.5 4.5L20.2 10.8C21.3 11.24 21.18 12.86 20.02 13.18L13.1 15.05L9.95 21.3C9.42 22.36 7.82 22.2 7.5 21.05L3.3 5.7C3.04 4.78 3.6 4.14 4.5 4.5Z"
              fill={color}
              stroke="#050706"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        ) : cursorVariant === 'pen' ? (
          /* Vector Bézier Pen Nib + Corner-Radius Arc Cursor for Aesthetic-UI (#EC4899) */
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: `drop-shadow(0 3px 8px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 10px ${color}99)`,
              transform: 'translate(-2px, -2px)',
            }}
          >
            {/* Corner-Radius Quarter Arc Handle behind tip */}
            <path
              d="M2.5 11.5C2.5 6.52944 6.52944 2.5 11.5 2.5"
              stroke="#FFFFFF"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="2 2"
            />
            {/* Sleek Vector Bézier Pen Nib Body pointing to (2,2) */}
            <path
              d="M2.2 2.2L18.6 7.2L21.8 14.4L14.4 21.8L7.2 18.6L2.2 2.2Z"
              fill={color}
              stroke="#050706"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Pen Nib Split Slit & Breathing Hole */}
            <path
              d="M2.5 2.5L10.8 10.8"
              stroke="#050706"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="11.6" cy="11.6" r="1.8" fill="#FFFFFF" />
          </svg>
        ) : (
          /* Standard / Director / Framing Precision Pointer Vector */
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: `drop-shadow(0 3px 8px rgba(0, 0, 0, 0.72)) drop-shadow(0 0 6px ${color}55)`,
              transform: 'translate(-1.2px, -1.6px)',
            }}
          >
            <path
              d="M2.2 1.8L19.4 9.3C20.6 9.82 20.48 11.58 19.22 11.92L11.85 13.88L8.42 20.65C7.83 21.81 6.1 21.64 5.75 20.38L1.02 3.16C0.74 2.13 1.24 1.38 2.2 1.8Z"
              fill={color}
              stroke="#050706"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {/* Attached Collaborative Name Pill + Cooperative Await Badge + Fake Typing Bubble */}
        <div
          style={{
            transform: flipLeft
              ? 'translate(-100%, -4px) translate(-10px, 0px)'
              : 'translate(14px, -4px)',
          }}
          className="flex flex-col items-start gap-1"
        >
          {/* Row 1: User / Agent Name Tag + Optional Cooperative AWAIT Pill */}
          <div className="flex items-center gap-1.5">
            <div
              style={{
                backgroundColor: isDirector ? 'rgba(20, 16, 4, 0.85)' : color,
                color: isDirector ? color : textColor,
                borderColor: isDirector ? `${color}66` : 'rgba(0,0,0,0.25)',
                boxShadow: isDirector
                  ? `0 4px 14px rgba(0, 0, 0, 0.55)`
                  : `0 6px 20px -2px rgba(0, 0, 0, 0.78), 0 0 14px ${color}66`,
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full rounded-tl-sm font-mono text-[10px] font-extrabold tracking-tight whitespace-nowrap border select-none"
            >
              {isDirector && (
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: color }}
                />
              )}
              {isPen && (
                <span className="text-[10px] leading-none text-white">✦</span>
              )}
              <span>{label}</span>
              {role && (
                <span
                  className="px-1.5 py-[1px] rounded-full text-[8.5px] font-mono font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: isDirector
                      ? 'rgba(255, 215, 0, 0.14)'
                      : 'rgba(0, 0, 0, 0.26)',
                    color: isDirector ? '#FFE875' : '#FFFFFF',
                  }}
                >
                  {role}
                </span>
              )}
              {dragging && !isAwaiting && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              )}
            </div>

            {/* Cooperative Dependency Handoff Badge (`⏳ AWAIT: <AGENT>`) */}
            {isAwaiting && (
              <div
                style={{
                  backgroundColor: 'rgba(24, 16, 4, 0.94)',
                  borderColor: 'rgba(251, 191, 36, 0.75)',
                  color: '#FDE68A',
                  boxShadow:
                    '0 4px 14px rgba(0, 0, 0, 0.8), 0 0 12px rgba(251, 191, 36, 0.35)',
                }}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-mono text-[8.5px] font-bold uppercase tracking-wider whitespace-nowrap animate-pulse"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>⏳ {awaitingLabel}</span>
              </div>
            )}
          </div>

          {/* Row 2: Live Fake Typing Bubble (for Worker Cursors, Aesthetic-UI, and Master QA Supervisor) */}
          {bubbleText && (
            <div
              style={{
                backgroundColor: isAwaiting
                  ? 'rgba(22, 16, 6, 0.9)'
                  : isDirector
                    ? 'rgba(7, 9, 12, 0.82)'
                    : 'rgba(6, 8, 11, 0.92)',
                borderColor: isAwaiting
                  ? 'rgba(251, 191, 36, 0.55)'
                  : isDirector
                    ? `${color}55`
                    : `${color}88`,
                boxShadow: `0 6px 18px rgba(0, 0, 0, 0.75)`,
              }}
              className="inline-flex items-center gap-1.5 px-2 py-[3px] rounded-md border font-mono text-[9.5px] leading-none whitespace-nowrap backdrop-blur-md"
            >
              {commandStatus && (
                <span className="text-white/50 font-bold uppercase tracking-wider text-[8.5px]">
                  [{commandStatus}]
                </span>
              )}
              {isAwaiting && !commandStatus && (
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[8.5px]">
                  [SYNC]
                </span>
              )}
              <span
                className="font-medium tracking-tight"
                style={{
                  color: isAwaiting
                    ? '#FDE68A'
                    : isDirector
                      ? '#FFE57F'
                      : '#F3F6F4',
                }}
              >
                {bubbleText}
              </span>
              {/* Blinking Typewriter Caret */}
              <span
                className={`inline-block w-[5px] h-[10px] ${
                  isTyping ? 'animate-pulse' : 'animate-blink'
                }`}
                style={{
                  backgroundColor: isAwaiting ? '#FBBF24' : color,
                  boxShadow: `0 0 6px ${isAwaiting ? '#FBBF24' : color}`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * `<SelectionMarquee>`
 * Multi-Modal Selection / Construction / Aesthetic Polish Box supporting 7 distinct visuals:
 * - `FRAME_OUTLINE` (`Arch-Frame` #3B82F6): Bottom-Left -> Top-Right perimeter CAD blueprint frame with ruler ticks.
 * - `CENTER_SPLIT_PILL` (`Status-Node` #A855F7): Center Outward <-> symmetric pill expansion with center axis line.
 * - `TEXT_BASELINE_SWEEP` (`Type-Bot` #00E599): Left -> Right horizontal I-beam sweep with trailing vertical laser caret bar.
 * - `RIGHT_TO_LEFT_DOCK` (`UI-Craft` #FF4444): Top-Right -> Bottom-Left reverse capsule drag.
 * - `BOTTOM_UP_SHADER` (`Comfy-Node` #FFB800): Bottom-Right -> Top-Left upward latent scanline/grid shader fill.
 * - `MULTI_POINT_STAMP` (`Sys-Arch` #06B6D4): Sequential waypoint click-stamping with numbered node reticles.
 * - `AESTHETIC_POLISH` (`Aesthetic-UI` #EC4899): Figma-style Magenta Smart Alignment Guides (`┼ CENTER 0.0px`, `↕ GAP 14px`)
 *    + 4 Corner Radius Curving Handles (`╭ r=24px`) with quarter-circle arc guides that visibly curve sharp corners into pills/cards!
 */
export function SelectionMarquee({
  rect,
  color = '#3B82F6',
  styleType = 'solid',
  creationMode = CREATION_MODES.FRAME_OUTLINE,
  dimensionTag = 'NODE · AUTO',
  active = false,
  snapped = false,
  opacity = 1,
  stampStep = 0,
  polishProgress = 0,
}) {
  if (!rect || (!active && !snapped) || opacity <= 0.01) return null;

  const x = rect.x;
  const y = rect.y;
  const width = Math.max(0, rect.width);
  const height = Math.max(0, rect.height);

  const isPill = creationMode === CREATION_MODES.CENTER_SPLIT_PILL;
  const isTextSweep = creationMode === CREATION_MODES.TEXT_BASELINE_SWEEP;
  const isFrameOutline = creationMode === CREATION_MODES.FRAME_OUTLINE;
  const isRtlDock = creationMode === CREATION_MODES.RIGHT_TO_LEFT_DOCK;
  const isBottomUpShader = creationMode === CREATION_MODES.BOTTOM_UP_SHADER;
  const isMultiStamp = creationMode === CREATION_MODES.MULTI_POINT_STAMP;
  const isAestheticPolish = creationMode === CREATION_MODES.AESTHETIC_POLISH;

  // Dynamic corner-radius curving for AESTHETIC_POLISH (`2px` -> `24px`)
  const curveRatio = snapped ? 1 : Math.max(0.15, polishProgress);
  const liveRadiusPx = Math.round(2 + curveRatio * 22);

  // Determine diagonal vector direction inside SVG based on creationMode
  let diagLine = { x1: '0%', y1: '0%', x2: '100%', y2: '100%' };
  if (isFrameOutline) {
    // Bottom-Left (0%, 100%) -> Top-Right (100%, 0%)
    diagLine = { x1: '0%', y1: '100%', x2: '100%', y2: '0%' };
  } else if (isRtlDock) {
    // Top-Right (100%, 0%) -> Bottom-Left (0%, 100%)
    diagLine = { x1: '100%', y1: '0%', x2: '0%', y2: '100%' };
  } else if (isBottomUpShader) {
    // Bottom-Right (100%, 100%) -> Top-Left (0%, 0%)
    diagLine = { x1: '100%', y1: '100%', x2: '0%', y2: '0%' };
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
        width: `${width}px`,
        height: `${height}px`,
        opacity,
        pointerEvents: 'none',
        willChange: 'transform, width, height, opacity',
        zIndex: isAestheticPolish ? 48 : isFrameOutline ? 42 : 45,
        borderRadius: isPill
          ? '9999px'
          : isAestheticPolish
            ? `${liveRadiusPx}px`
            : isFrameOutline
              ? '10px'
              : '4px',
        borderWidth: snapped ? '2px' : isAestheticPolish ? '1.75px' : '1.5px',
        borderStyle: snapped ? 'solid' : styleType,
        borderColor: snapped ? '#FFFFFF' : color,
        backgroundColor: snapped
          ? `${color}26`
          : isAestheticPolish
            ? `${color}16`
            : isFrameOutline
              ? `${color}08`
              : `${color}14`,
        backgroundImage: isBottomUpShader
          ? `repeating-linear-gradient(0deg, ${color}22 0px, ${color}22 1px, transparent 1px, transparent 6px), repeating-linear-gradient(90deg, ${color}14 0px, ${color}14 1px, transparent 1px, transparent 18px)`
          : isFrameOutline
            ? `linear-gradient(to right, ${color}18 1px, transparent 1px), linear-gradient(to bottom, ${color}18 1px, transparent 1px)`
            : isAestheticPolish
              ? `radial-gradient(circle at 50% 50%, ${color}24 0%, transparent 72%)`
              : undefined,
        backgroundSize: isFrameOutline ? '32px 32px' : undefined,
        boxShadow: snapped
          ? `0 0 34px ${color}99, 0 0 12px #FFFFFF88, inset 0 0 22px ${color}44`
          : isAestheticPolish
            ? `0 0 24px ${color}55, inset 0 0 14px ${color}28`
            : `0 0 16px ${color}26, inset 0 0 8px ${color}14`,
      }}
      aria-hidden="true"
    >
      {/* Mode-Specific Internal Construction & Smart Alignment Guides */}
      {width > 16 && height > 12 && (
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* 1. Diagonal vector for FRAME_OUTLINE, RIGHT_TO_LEFT_DOCK, BOTTOM_UP_SHADER */}
          {!snapped && (isFrameOutline || isRtlDock || isBottomUpShader) && (
            <line
              x1={diagLine.x1}
              y1={diagLine.y1}
              x2={diagLine.x2}
              y2={diagLine.y2}
              stroke={color}
              strokeOpacity="0.38"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
          )}

          {/* 2. Center Symmetry Axis for CENTER_SPLIT_PILL */}
          {!snapped && isPill && (
            <>
              <line
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                stroke={color}
                strokeOpacity="0.7"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              <line
                x1="8%"
                y1="50%"
                x2="92%"
                y2="50%"
                stroke={color}
                strokeOpacity="0.35"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            </>
          )}

          {/* 3. Typographic Baseline Guide for TEXT_BASELINE_SWEEP */}
          {!snapped && isTextSweep && (
            <>
              <line
                x1="0%"
                y1="78%"
                x2="100%"
                y2="78%"
                stroke={color}
                strokeOpacity="0.55"
                strokeWidth="1.2"
                strokeDasharray="6 3"
              />
              <line
                x1="0%"
                y1="22%"
                x2="100%"
                y2="22%"
                stroke={color}
                strokeOpacity="0.22"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            </>
          )}

          {/* 4. Magenta Figma-Style Smart Alignment Crosshairs & Extended Axis Lines for AESTHETIC_POLISH */}
          {isAestheticPolish && (
            <>
              {/* Extended Vertical Center Smart Guide (-18px top to +18px bottom) */}
              <line
                x1="50%"
                y1="-18"
                x2="50%"
                y2={height + 18}
                stroke={color}
                strokeOpacity="0.88"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
              {/* Extended Horizontal Middle Smart Guide (-18px left to +18px right) */}
              <line
                x1="-18"
                y1="50%"
                x2={width + 18}
                y2="50%"
                stroke={color}
                strokeOpacity="0.88"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
            </>
          )}
        </svg>
      )}

      {/* AESTHETIC_POLISH: 4 Corner Radius Curving Handles + Quarter-Circle Arc Overlays + Smart Guide Badges */}
      {isAestheticPolish && width > 44 && height > 24 && (
        <>
          {/* 4 Inset Circular Corner-Radius Drag Handles (`╭ ╮ ╰ ╯`) */}
          {[
            { pos: 'top-[6px] left-[6px]', rot: '0deg' },
            { pos: 'top-[6px] right-[6px]', rot: '90deg' },
            { pos: 'bottom-[6px] right-[6px]', rot: '180deg' },
            { pos: 'bottom-[6px] left-[6px]', rot: '270deg' },
          ].map((corner, idx) => (
            <div
              key={idx}
              className={`absolute ${corner.pos} w-3.5 h-3.5 flex items-center justify-center pointer-events-none`}
              style={{ transform: `rotate(${corner.rot})` }}
            >
              {/* Quarter-circle corner radius arc */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 13C1 6.37258 6.37258 1 13 1"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="9.5"
                  cy="9.5"
                  r="2.6"
                  fill="#180410"
                  stroke={color}
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          ))}

          {/* Bottom-Center Smart Alignment Readout Pill (`┼ CENTER 0.0px • ↕ GAP 14px ✓`) */}
          <div
            style={{
              backgroundColor: 'rgba(20, 4, 14, 0.94)',
              borderColor: `${color}AA`,
              color: '#FBCFE8',
              boxShadow: `0 4px 14px rgba(0, 0, 0, 0.78), 0 0 12px ${color}55`,
            }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-2 py-[1px] rounded-full text-[8.5px] font-mono font-bold uppercase border whitespace-nowrap flex items-center gap-1.5"
          >
            <span className="text-[#EC4899]">┼</span>
            <span>ALIGN 0.0px</span>
            <span className="text-white/40">·</span>
            <span className="text-white">╭ r={liveRadiusPx}px</span>
            <span className="text-emerald-400">✓</span>
          </div>
        </>
      )}

      {/* CAD Ruler Tick Marks along Top & Left Perimeter for FRAME_OUTLINE (`Arch-Frame`) */}
      {isFrameOutline && width > 60 && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-[5px] pointer-events-none opacity-65"
            style={{
              backgroundImage: `repeating-linear-gradient(to right, ${color} 0, ${color} 1px, transparent 1px, transparent 16px)`,
            }}
          />
          <div
            className="absolute top-0 bottom-0 left-0 w-[5px] pointer-events-none opacity-65"
            style={{
              backgroundImage: `repeating-linear-gradient(to bottom, ${color} 0, ${color} 1px, transparent 1px, transparent 16px)`,
            }}
          />
          {/* Bottom-Left Origin Anchor Label */}
          <div
            style={{
              backgroundColor: '#050709',
              borderColor: `${color}88`,
              color,
            }}
            className="absolute -bottom-5 left-0 px-1.5 py-[1px] rounded text-[8px] font-mono font-bold uppercase border whitespace-nowrap"
          >
            ANCHOR [BL 0,0] ↗ TR
          </div>
        </>
      )}

      {/* Glowing Vertical Laser Caret Bar for TEXT_BASELINE_SWEEP (`Type-Bot`) */}
      {isTextSweep && !snapped && (
        <div
          style={{
            position: 'absolute',
            top: -4,
            bottom: -4,
            right: -1.5,
            width: '3px',
            backgroundColor: '#FFFFFF',
            boxShadow: `0 0 16px 3px ${color}, 0 0 6px #FFFFFF`,
          }}
        >
          {/* Top & Bottom I-Beam Caret Caps */}
          <span
            style={{ backgroundColor: color }}
            className="absolute -top-[2px] -left-[4px] w-[11px] h-[2.5px] rounded-full"
          />
          <span
            style={{ backgroundColor: color }}
            className="absolute -bottom-[2px] -left-[4px] w-[11px] h-[2.5px] rounded-full"
          />
        </div>
      )}

      {/* Multi-Point Stamp Waypoint Badges for MULTI_POINT_STAMP (`Sys-Arch`) */}
      {isMultiStamp && width > 40 && (
        <div className="absolute inset-0 flex items-center justify-around pointer-events-none px-2">
          {[1, 2, 3].map((wp) => {
            const reached = stampStep >= wp || snapped;
            return (
              <div
                key={wp}
                style={{
                  borderColor: reached ? '#FFFFFF' : `${color}66`,
                  backgroundColor: reached ? `${color}38` : 'rgba(5,7,9,0.75)',
                  color: reached ? '#FFFFFF' : color,
                  boxShadow: reached ? `0 0 12px ${color}` : 'none',
                }}
                className="px-1.5 py-0.5 rounded text-[8.5px] font-mono font-bold border transition-all duration-150"
              >
                {reached ? `✓ WP·0${wp}` : `○ WP·0${wp}`}
              </div>
            );
          })}
        </div>
      )}

      {/* 4 Figma/CAD Corner Resize Handles */}
      {[
        '-top-[4px] -left-[4px]',
        '-top-[4px] -right-[4px]',
        '-bottom-[4px] -left-[4px]',
        '-bottom-[4px] -right-[4px]',
      ].map((posClass, idx) => (
        <span
          key={idx}
          className={`absolute w-[7px] h-[7px] bg-[#050706] ${posClass}`}
          style={{
            border: `1.5px solid ${snapped ? '#FFFFFF' : color}`,
            borderRadius: isPill || isAestheticPolish ? '9999px' : '1.5px',
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      ))}

      {/* Top-Left (or Top-Right for RTL / Aesthetic Polish) Node Dimension & Live Ticking W × H Pixel Readout Pill */}
      <div
        style={{
          backgroundColor: '#07090B',
          borderColor: snapped ? '#FFFFFF' : `${color}99`,
          color: snapped ? '#FFFFFF' : color,
          boxShadow: `0 4px 12px rgba(0, 0, 0, 0.65)`,
        }}
        className={`absolute -top-5 ${
          isRtlDock || isAestheticPolish ? 'right-0' : 'left-0'
        } px-1.5 py-[1px] rounded text-[9px] font-mono font-bold tracking-wider uppercase border whitespace-nowrap flex items-center gap-1.5`}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: snapped ? '#FFFFFF' : color }}
        />
        <span>{dimensionTag}</span>
        <span className="text-white/90 font-mono tabular-nums font-semibold">
          {Math.round(width)} × {Math.round(height)}
        </span>
      </div>
    </div>
  );
}

export default SimulatedCursor;
