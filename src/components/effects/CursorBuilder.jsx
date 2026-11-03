import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimulatedCursor, SelectionMarquee } from './SimulatedCursor';
import {
  CREATION_MODES,
  HERO_MASTER_DIRECTOR,
  HERO_CURSOR_SWARM,
  HERO_TIMELINE_MS,
  SECTION_SCROLL_CURSORS,
} from './cursorConfig';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Computes progressive typewriter substring from `fullText` given a `0..1` progress ratio.
 */
function sliceTypedText(fullText, progress) {
  if (!fullText || progress <= 0) return '';
  if (progress >= 1) return fullText;
  const count = Math.max(1, Math.round(fullText.length * clamp01(progress)));
  return fullText.slice(0, count);
}

/**
 * Progressively spawns a target DOM element and its text in real time (`60fps`)
 * directly behind the moving cursor and inside its live `<SelectionMarquee>` box:
 * - `'pending'`: completely invisible (`opacity: 0; clip-path: inset(0 100% 0 0)`).
 * - `'spawning'`: visible (`opacity: 1`) ONLY within the directional `clip-path` swept so far by the cursor.
 * - `'snapped'`: fully unlocked (`opacity: 1; clip-path: none`).
 */
function applyProgressiveDomSpawn(el, phase, mode, marqueeRect, tRect) {
  if (!el) return;

  if (phase === 'pending') {
    if (el.getAttribute('data-scroll-assembly') !== 'pending') {
      el.setAttribute('data-scroll-assembly', 'pending');
    }
    el.style.opacity = '0';
    el.style.clipPath = 'none';
    el.style.webkitClipPath = 'none';
    el.style.pointerEvents = 'none';
    return;
  }

  if (phase === 'snapped') {
    if (el.getAttribute('data-scroll-assembly') !== 'snapped') {
      el.setAttribute('data-scroll-assembly', 'snapped');
    }
    el.style.opacity = '1';
    el.style.clipPath = 'none';
    el.style.webkitClipPath = 'none';
    el.style.filter = 'none';
    el.style.pointerEvents = '';
    return;
  }

  // phase === 'spawning'
  if (el.getAttribute('data-scroll-assembly') !== 'spawning') {
    el.setAttribute('data-scroll-assembly', 'spawning');
  }

  const progW = clamp01(
    (marqueeRect?.width || 0) / Math.max(1, tRect?.width || 1)
  );
  const progH = clamp01(
    (marqueeRect?.height || 0) / Math.max(1, tRect?.height || 1)
  );

  let clip = 'none';
  if (mode === CREATION_MODES.TEXT_BASELINE_SWEEP) {
    // Left -> Right horizontal caret sweep: characters spawn right behind the I-beam laser bar
    const rightPct = ((1 - progW) * 100).toFixed(1);
    clip = `inset(-18% ${rightPct}% -18% -4%)`;
  } else if (mode === CREATION_MODES.CENTER_SPLIT_PILL) {
    // Symmetric Center <-> Outward expand
    const sidePct = ((1 - progW) * 50).toFixed(1);
    clip = `inset(-18% ${sidePct}% -18% ${sidePct}%)`;
  } else if (mode === CREATION_MODES.RIGHT_TO_LEFT_DOCK) {
    // Top-Right -> Bottom-Left reverse capsule drag
    const leftPct = ((1 - progW) * 100).toFixed(1);
    const bottomPct = ((1 - progH) * 100).toFixed(1);
    clip = `inset(-10% -4% ${bottomPct}% ${leftPct}%)`;
  } else if (mode === CREATION_MODES.BOTTOM_UP_SHADER) {
    // Bottom-Right -> Top-Left upward latent shader fill
    const topPct = ((1 - progH) * 100).toFixed(1);
    const leftPct = ((1 - progW) * 100).toFixed(1);
    clip = `inset(${topPct}% -4% -10% ${leftPct}%)`;
  } else if (mode === CREATION_MODES.MULTI_POINT_STAMP) {
    // Left -> Right sequential button waypoint stamping
    const rightPct = ((1 - progW) * 100).toFixed(1);
    clip = `inset(-15% ${rightPct}% -15% -4%)`;
  } else {
    // FRAME_OUTLINE: Bottom-Left -> Top-Right CAD perimeter expansion
    const topPct = ((1 - progH) * 100).toFixed(1);
    const rightPct = ((1 - progW) * 100).toFixed(1);
    clip = `inset(${topPct}% ${rightPct}% -6% -4%)`;
  }

  el.style.opacity = '1';
  el.style.clipPath = clip;
  el.style.webkitClipPath = clip;
  el.style.filter = 'none';
  el.style.pointerEvents = 'none';
}

/**
 * Helper to detect mobile or reduced motion preferences.
 */
export function useCursorAssemblyMode() {
  const [mode, setMode] = useState(() => {
    if (typeof window === 'undefined') return 'reduced';
    const prefersReduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches;
    if (prefersReduced) return 'reduced';
    if (window.innerWidth < 768) return 'mobile';
    return 'swarm';
  });

  useEffect(() => {
    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const handleUpdate = () => {
      if (mql?.matches) {
        setMode('reduced');
      } else if (window.innerWidth < 768) {
        setMode('mobile');
      } else {
        setMode('swarm');
      }
    };
    handleUpdate();
    window.addEventListener('resize', handleUpdate, { passive: true });
    mql?.addEventListener?.('change', handleUpdate);
    return () => {
      window.removeEventListener('resize', handleUpdate);
      mql?.removeEventListener?.('change', handleUpdate);
    };
  }, []);

  return mode;
}

/**
 * Computes the frame-accurate position, marquee geometry, cooperative `AWAIT` state,
 * live fake typing text, and tool state for any Tier 2, Tier 3A, or Tier 3B (`Aesthetic-UI`)
 * cursor agent according to its `creationMode`.
 */
function computeAgentGeometry({
  agent,
  tRect,
  secondaryRect,
  spawnPoint,
  exitPoint,
  elapsed,
  scatterTime,
  endTime,
  onSnapTarget,
  onPolishTarget,
}) {
  const mode = agent.creationMode || CREATION_MODES.FRAME_OUTLINE;

  // Determine start anchor (where cursor lands at `dragStart`) and end point (where cursor finishes at `snapTime`)
  let anchorX = tRect.x;
  let anchorY = tRect.y;
  let finalX = tRect.x + tRect.width;
  let finalY = tRect.y + tRect.height;

  if (mode === CREATION_MODES.FRAME_OUTLINE) {
    // Bottom-Left -> Top-Right perimeter drag
    anchorX = tRect.x;
    anchorY = tRect.y + tRect.height;
    finalX = tRect.x + tRect.width;
    finalY = tRect.y;
  } else if (mode === CREATION_MODES.CENTER_SPLIT_PILL) {
    // Center -> Right-edge outward pull while marquee expands symmetrically left & right
    anchorX = tRect.x + tRect.width * 0.5;
    anchorY = tRect.y + tRect.height * 0.2;
    finalX = tRect.x + tRect.width;
    finalY = tRect.y + tRect.height * 0.5;
  } else if (mode === CREATION_MODES.TEXT_BASELINE_SWEEP) {
    // Left-edge vertical center -> Right-edge vertical center horizontal caret sweep
    anchorX = tRect.x;
    anchorY = tRect.y + tRect.height * 0.5;
    finalX = tRect.x + tRect.width;
    finalY = tRect.y + tRect.height * 0.5;
  } else if (mode === CREATION_MODES.RIGHT_TO_LEFT_DOCK) {
    // Top-Right -> Bottom-Left reverse capsule drag
    anchorX = tRect.x + tRect.width;
    anchorY = tRect.y;
    finalX = tRect.x;
    finalY = tRect.y + tRect.height;
  } else if (mode === CREATION_MODES.BOTTOM_UP_SHADER) {
    // Bottom-Right -> Top-Left upward latent fill
    anchorX = tRect.x + tRect.width;
    anchorY = tRect.y + tRect.height;
    finalX = tRect.x;
    finalY = tRect.y;
  } else if (mode === CREATION_MODES.MULTI_POINT_STAMP) {
    // Waypoint 1 (Left button) -> Waypoint 2 (Center) -> Waypoint 3 (Right) -> Waypoint 4 (Secondary dock if present)
    anchorX = tRect.x + tRect.width * 0.12;
    anchorY = tRect.y + tRect.height * 0.5;
    const sRect = secondaryRect || tRect;
    finalX = secondaryRect
      ? sRect.x + sRect.width * 0.5
      : tRect.x + tRect.width;
    finalY = sRect.y + sRect.height * 0.5;
  } else if (mode === CREATION_MODES.AESTHETIC_POLISH) {
    // Starts at Top-Left corner handle of target, sweeps across to curve corners & check center alignment
    anchorX = tRect.x + 8;
    anchorY = tRect.y + 8;
    const endBox = secondaryRect || tRect;
    finalX = endBox.x + endBox.width - 8;
    finalY = endBox.y + endBox.height * 0.5;
  }

  let x = spawnPoint.x;
  let y = spawnPoint.y;
  let opacity = 0;
  let clicking = false;
  let rippling = false;
  let dragging = false;
  let marqueeActive = false;
  let snapped = false;
  let marqueeOpacity = 1;
  let stampStep = 0;
  let polishProgress = 0;
  let awaitingLabel = '';
  let typedText = '';
  let isTyping = false;
  let primarySpawnPhase = 'pending';
  let secondarySpawnPhase = 'pending';
  let marqueeRect = {
    x: anchorX,
    y: anchorY,
    width: 0,
    height: 0,
  };

  const flyEnd =
    typeof agent.awaitStart === 'number' && agent.awaitStart < agent.dragStart
      ? agent.awaitStart
      : agent.dragStart;

  if (elapsed < agent.flyStart) {
    opacity = 0;
    primarySpawnPhase = 'pending';
    secondarySpawnPhase = 'pending';
  } else if (elapsed < flyEnd) {
    // Phase 1A: Fly smoothly from spawn point to staging anchor near target
    const flyT = clamp01(
      (elapsed - agent.flyStart) / Math.max(1, flyEnd - agent.flyStart)
    );
    const easedFly = easeOutCubic(flyT);
    x = spawnPoint.x + (anchorX - spawnPoint.x) * easedFly;
    y = spawnPoint.y + (anchorY - spawnPoint.y) * easedFly;
    opacity = clamp01(flyT * 2.8);
    clicking = !agent.awaitStart && flyT > 0.86;
    primarySpawnPhase = 'pending';
    secondarySpawnPhase = 'pending';

    if (agent.awaitStart && agent.awaitText && flyT > 0.6) {
      awaitingLabel = agent.awaitLabel || 'AWAIT';
      typedText = sliceTypedText(agent.awaitText, (flyT - 0.6) / 0.4);
      isTyping = true;
    } else if (!agent.awaitStart && flyT > 0.55 && agent.typingText) {
      typedText = sliceTypedText(
        agent.typingText,
        ((flyT - 0.55) / 0.45) * 0.18
      );
      isTyping = true;
    }
  } else if (elapsed < agent.dragStart) {
    // Phase 1B: Cooperative `AWAIT` Dependency Hold — parked at staging coordinate waiting for upstream cursor!
    const waitElapsed = elapsed - flyEnd;
    const waitDuration = Math.max(1, agent.dragStart - flyEnd);
    const waitT = clamp01(waitElapsed / waitDuration);
    opacity = 0.94;
    primarySpawnPhase = 'pending';
    secondarySpawnPhase = 'pending';
    // Gentle holding hover motion while waiting for upstream cursor
    x = anchorX + Math.sin(waitElapsed * 0.011) * 5;
    y = anchorY + Math.cos(waitElapsed * 0.008) * 3;
    awaitingLabel = agent.awaitLabel || 'AWAIT: UPSTREAM';
    if (agent.awaitText) {
      typedText = sliceTypedText(agent.awaitText, clamp01(0.35 + waitT * 0.9));
      isTyping = waitT < 0.75;
    }
    // Fire pre-click flash right as dependency unlocks (`waitT > 0.9`)
    clicking = waitT > 0.9;
    rippling = waitT > 0.92;
  } else if (elapsed < agent.snapTime) {
    // Phase 2: Dependency unlocked -> Execute active creation or cooperative aesthetic polish pass!
    opacity = 1;
    awaitingLabel = '';
    primarySpawnPhase = 'spawning';
    const rawProgress = clamp01(
      (elapsed - agent.dragStart) / Math.max(1, agent.snapTime - agent.dragStart)
    );
    if (agent.typingText) {
      typedText = sliceTypedText(agent.typingText, 0.18 + rawProgress * 0.82);
      isTyping = true;
    }

    if (mode === CREATION_MODES.AESTHETIC_POLISH && agent.firstPassSnapTime && secondaryRect) {
      // Two-Pass Cooperative Aesthetic Polish (Hero `Aesthetic-UI`: Pass 1 on top capsule/pill -> Await Sys-Arch -> Pass 2 on CTA/subtitle)
      const p1End = agent.firstPassSnapTime;
      const p2Start = agent.secondPassAwaitEnd || p1End;

      if (elapsed < p1End) {
        // Pass 1: Curve & align `tRect` (`hero-contact` + `hero-badge`)
        const p1T = clamp01((elapsed - agent.dragStart) / Math.max(1, p1End - agent.dragStart));
        const easedP1 = easeInOutCubic(p1T);
        marqueeActive = true;
        dragging = true;
        clicking = p1T < 0.18 || p1T > 0.85;
        rippling = p1T < 0.22 || p1T > 0.88;
        polishProgress = easedP1;

        if (p1T < 0.5) {
          const seg = easeInOutCubic(p1T / 0.5);
          x = tRect.x + 10 + (tRect.width * 0.5 - 10) * seg;
          y = tRect.y + 8 + (tRect.height * 0.5 - 8) * seg;
        } else {
          const seg = easeInOutCubic((p1T - 0.5) / 0.5);
          x = tRect.x + tRect.width * 0.5 + (tRect.width * 0.5 - 10) * seg;
          y = tRect.y + tRect.height * 0.5 - (tRect.height * 0.5 - 10) * seg;
        }

        marqueeRect = {
          x: tRect.x,
          y: tRect.y,
          width: tRect.width,
          height: tRect.height,
        };
        typedText = sliceTypedText(agent.typingText, 0.2 + p1T * 0.8);
        isTyping = p1T < 0.95;
      } else if (elapsed < p2Start) {
        // Pass 1 complete -> Polish top elements & glide down to await `Sys-Arch` on `hero-cta`
        onPolishTarget?.('hero-badge');
        onPolishTarget?.('hero-title');
        onPolishTarget?.(agent.targetSelector);

        const wait2T = clamp01((elapsed - p1End) / Math.max(1, p2Start - p1End));
        const easedGlide = easeOutCubic(wait2T);
        const startX = tRect.x + tRect.width - 10;
        const startY = tRect.y + 10;
        const destX = secondaryRect.x + 12;
        const destY = secondaryRect.y + 10;

        x = startX + (destX - startX) * easedGlide;
        y = startY + (destY - startY) * easedGlide;
        awaitingLabel = agent.secondAwaitLabel || 'AWAIT: SYS-ARCH';
        typedText = agent.secondAwaitText || 'waiting for CTA button stamp...';
        isTyping = true;
        marqueeActive = false;
      } else {
        // Pass 2: Curve & align `secondaryRect` (`hero-cta` + `hero-subtitle` + `hero-social`)
        onPolishTarget?.('hero-badge');
        onPolishTarget?.('hero-title');
        onPolishTarget?.(agent.targetSelector);
        onPolishTarget?.('hero-subtitle');

        const p2T = clamp01((elapsed - p2Start) / Math.max(1, agent.snapTime - p2Start));
        const easedP2 = easeInOutCubic(p2T);
        marqueeActive = true;
        dragging = true;
        clicking = p2T < 0.16 || p2T > 0.84;
        rippling = p2T < 0.22 || p2T > 0.88;
        polishProgress = easedP2;

        x = secondaryRect.x + 12 + (secondaryRect.width - 24) * easedP2;
        y =
          secondaryRect.y +
          secondaryRect.height * 0.5 +
          Math.sin(p2T * Math.PI * 2) * 8;

        marqueeRect = {
          x: secondaryRect.x,
          y: secondaryRect.y,
          width: secondaryRect.width,
          height: secondaryRect.height,
        };
        const pass2String = agent.secondTypingText || agent.typingText;
        typedText = sliceTypedText(pass2String, 0.2 + p2T * 0.8);
        isTyping = p2T < 0.95;
      }
    } else if (mode === CREATION_MODES.AESTHETIC_POLISH) {
      // Single-Pass Cooperative Aesthetic Polish (Scroll Sections: exact target box + Corner Radius Curving)
      const easedPolish = easeInOutCubic(rawProgress);
      marqueeActive = true;
      dragging = true;
      clicking = rawProgress < 0.18 || rawProgress > 0.84;
      rippling = rawProgress < 0.22 || rawProgress > 0.88;
      polishProgress = easedPolish;

      const activeBox =
        secondaryRect && rawProgress > 0.58 ? secondaryRect : tRect;
      if (secondaryRect && rawProgress > 0.58) {
        onPolishTarget?.(agent.targetSelector || agent.targetKey);
      }

      if (rawProgress < 0.5) {
        const seg = easeInOutCubic(rawProgress / 0.5);
        x = activeBox.x + 10 + (activeBox.width * 0.5 - 10) * seg;
        y = activeBox.y + 10 + (activeBox.height * 0.5 - 10) * seg;
      } else {
        const seg = easeInOutCubic((rawProgress - 0.5) / 0.5);
        x = activeBox.x + activeBox.width * 0.5 + (activeBox.width * 0.5 - 12) * seg;
        y = activeBox.y + activeBox.height * 0.5 + (activeBox.height * 0.5 - 12) * seg;
      }

      marqueeRect = {
        x: activeBox.x,
        y: activeBox.y,
        width: activeBox.width,
        height: activeBox.height,
      };
    } else if (mode === CREATION_MODES.MULTI_POINT_STAMP) {
      if (secondaryRect) {
        // Two-target stamp (Hero `Sys-Arch`: `hero-cta` then `hero-social`)
        const ctaSnap =
          agent.ctaSnapTime || (agent.dragStart + agent.snapTime) * 0.5;
        const sRect = secondaryRect;

        const wp1 = { x: tRect.x + tRect.width * 0.16, y: tRect.y + tRect.height * 0.5 };
        const wp2 = { x: tRect.x + tRect.width * 0.5, y: tRect.y + tRect.height * 0.5 };
        const wp3 = { x: tRect.x + tRect.width * 0.84, y: tRect.y + tRect.height * 0.5 };
        const wp4 = { x: sRect.x + sRect.width * 0.5, y: sRect.y + sRect.height * 0.5 };

        if (elapsed < ctaSnap) {
          const ctaT = clamp01(
            (elapsed - agent.dragStart) / Math.max(1, ctaSnap - agent.dragStart)
          );
          marqueeActive = true;
          dragging = true;
          primarySpawnPhase = 'spawning';
          secondarySpawnPhase = 'pending';

          if (ctaT < 0.44) {
            const segT = easeInOutCubic(clamp01(ctaT / 0.44));
            x = wp1.x + (wp2.x - wp1.x) * segT;
            y = wp1.y + (wp2.y - wp1.y) * segT;
            stampStep = 1;
            clicking = ctaT < 0.16;
            rippling = ctaT < 0.24;
          } else if (ctaT < 0.88) {
            const segT = easeInOutCubic(clamp01((ctaT - 0.44) / 0.44));
            x = wp2.x + (wp3.x - wp2.x) * segT;
            y = wp2.y + (wp3.y - wp2.y) * segT;
            stampStep = 2;
            clicking = ctaT >= 0.44 && ctaT < 0.6;
            rippling = ctaT >= 0.44 && ctaT < 0.68;
          } else {
            x = wp3.x;
            y = wp3.y;
            stampStep = 3;
            clicking = true;
            rippling = true;
          }

          const progressiveW = tRect.width * easeInOutCubic(ctaT);
          marqueeRect = {
            x: tRect.x,
            y: tRect.y,
            width: progressiveW,
            height: tRect.height,
          };
        } else {
          // CTA 3-point stamp complete -> reveal `hero-cta` and hop down to stamp `hero-social`
          primarySpawnPhase = 'snapped';
          secondarySpawnPhase = 'spawning';
          onSnapTarget?.(agent.targetSelector);
          const hopT = clamp01(
            (elapsed - ctaSnap) / Math.max(1, agent.snapTime - ctaSnap)
          );
          const easedHop = easeInOutCubic(hopT);
          x = wp3.x + (wp4.x - wp3.x) * easedHop;
          y = wp3.y + (wp4.y - wp3.y) * easedHop;
          stampStep = 3;
          clicking = hopT > 0.82;
          rippling = hopT > 0.85;
          dragging = true;
          marqueeActive = true;

          const socialScale = clamp01((hopT - 0.15) / 0.85);
          const curSocialW = sRect.width * socialScale;
          marqueeRect = {
            x: sRect.x + (sRect.width - curSocialW) * 0.5,
            y: sRect.y,
            width: curSocialW,
            height: sRect.height,
          };
        }
      } else {
        // Single-target stamp (Scroll Sections `Sys-Arch`: `referees-controls`, `work-footer`)
        const easedStamp = easeInOutCubic(rawProgress);
        marqueeActive = true;
        dragging = true;
        primarySpawnPhase = 'spawning';
        stampStep = rawProgress < 0.36 ? 1 : rawProgress < 0.72 ? 2 : 3;
        clicking =
          rawProgress < 0.15 ||
          (rawProgress > 0.36 && rawProgress < 0.48) ||
          rawProgress > 0.82;
        rippling = clicking;

        const currentW = tRect.width * easedStamp;
        x = tRect.x + currentW;
        y = tRect.y + tRect.height * 0.5;
        marqueeRect = {
          x: tRect.x,
          y: tRect.y,
          width: currentW,
          height: tRect.height,
        };
      }
    } else {
      const easedDrag = easeInOutCubic(rawProgress);
      clicking = true;
      dragging = true;
      marqueeActive = true;
      primarySpawnPhase = 'spawning';

      if (mode === CREATION_MODES.FRAME_OUTLINE) {
        // Bottom-Left -> Top-Right perimeter expansion
        const currentW = tRect.width * easedDrag;
        const currentH = tRect.height * easedDrag;
        x = tRect.x + currentW;
        y = tRect.y + tRect.height - currentH;
        marqueeRect = {
          x: tRect.x,
          y: tRect.y + tRect.height - currentH,
          width: currentW,
          height: currentH,
        };
      } else if (mode === CREATION_MODES.CENTER_SPLIT_PILL) {
        // Symmetric Center <-> Outward expansion
        const centerX = tRect.x + tRect.width * 0.5;
        const currentHalfW = tRect.width * 0.5 * easedDrag;
        x = centerX + currentHalfW;
        y = anchorY + (finalY - anchorY) * easedDrag;
        marqueeRect = {
          x: centerX - currentHalfW,
          y: tRect.y,
          width: currentHalfW * 2,
          height: tRect.height,
        };
      } else if (mode === CREATION_MODES.TEXT_BASELINE_SWEEP) {
        // Left -> Right horizontal I-Beam Caret Sweep across full heading height
        const currentW = tRect.width * easedDrag;
        x = tRect.x + currentW;
        y = tRect.y + tRect.height * 0.5;
        marqueeRect = {
          x: tRect.x,
          y: tRect.y,
          width: currentW,
          height: tRect.height,
        };
      } else if (mode === CREATION_MODES.RIGHT_TO_LEFT_DOCK) {
        // Top-Right -> Bottom-Left reverse capsule drag
        const currentW = tRect.width * easedDrag;
        const currentH = tRect.height * easedDrag;
        x = tRect.x + tRect.width - currentW;
        y = tRect.y + currentH;
        marqueeRect = {
          x: tRect.x + tRect.width - currentW,
          y: tRect.y,
          width: currentW,
          height: currentH,
        };
      } else if (mode === CREATION_MODES.BOTTOM_UP_SHADER) {
        // Bottom-Right -> Top-Left upward latent shader fill
        const currentW = tRect.width * easedDrag;
        const currentH = tRect.height * easedDrag;
        x = tRect.x + tRect.width - currentW;
        y = tRect.y + tRect.height - currentH;
        marqueeRect = {
          x: tRect.x + tRect.width - currentW,
          y: tRect.y + tRect.height - currentH,
          width: currentW,
          height: currentH,
        };
      }
    }
  } else if (elapsed < scatterTime) {
    // Phase 3: Creation / Polish complete -> fire release ripple, flash marquee, show full typed text + ✓
    primarySpawnPhase = 'snapped';
    secondarySpawnPhase = 'snapped';
    if (agent.isPolishPass) {
      if (Array.isArray(agent.polishTargets)) {
        agent.polishTargets.forEach((k) => onPolishTarget?.(k));
      } else {
        onPolishTarget?.(agent.targetSelector || agent.targetKey);
      }
      onSnapTarget?.(agent.targetSelector);
    } else {
      onSnapTarget?.(agent.targetSelector);
      if (agent.secondaryTargetSelector) {
        onSnapTarget?.(agent.secondaryTargetSelector);
      }
    }

    const snapElapsed = elapsed - agent.snapTime;
    x = finalX;
    y = finalY;
    opacity = 1;
    clicking = snapElapsed < 160;
    rippling = snapElapsed < 560;
    dragging = false;
    snapped = true;
    stampStep = 3;
    polishProgress = 1;
    awaitingLabel = '';
    const finalString = agent.secondTypingText || agent.typingText;
    typedText = finalString ? `${finalString} ✓` : '';
    isTyping = false;

    if (agent.persistUntilScatter) {
      // Macro frame (`Arch-Frame`) remains visible as a subtle CAD boundary while inner cursors work
      marqueeActive = true;
      marqueeOpacity = snapElapsed < 320 ? 0.92 : 0.34;
      marqueeRect = {
        x: tRect.x,
        y: tRect.y,
        width: tRect.width,
        height: tRect.height,
      };
    } else {
      marqueeActive = snapElapsed < 440;
      marqueeOpacity = clamp01(1 - snapElapsed / 440);
      const boxSource =
        (mode === CREATION_MODES.MULTI_POINT_STAMP ||
          mode === CREATION_MODES.AESTHETIC_POLISH) &&
        secondaryRect
          ? secondaryRect
          : tRect;
      marqueeRect = {
        x: boxSource.x,
        y: boxSource.y,
        width: boxSource.width,
        height: boxSource.height,
      };
    }
  } else {
    // Phase 4: Worker cursors scatter off-screen while Master Orchestrator stays behind to audit
    primarySpawnPhase = 'snapped';
    secondarySpawnPhase = 'snapped';
    if (agent.isPolishPass) {
      if (Array.isArray(agent.polishTargets)) {
        agent.polishTargets.forEach((k) => onPolishTarget?.(k));
      } else {
        onPolishTarget?.(agent.targetSelector || agent.targetKey);
      }
      onSnapTarget?.(agent.targetSelector);
    } else {
      onSnapTarget?.(agent.targetSelector);
      if (agent.secondaryTargetSelector) {
        onSnapTarget?.(agent.secondaryTargetSelector);
      }
    }

    const scatterT = clamp01(
      (elapsed - scatterTime) / Math.max(1, endTime - scatterTime)
    );
    const easedScatter = easeInOutCubic(scatterT);
    x = finalX + (exitPoint.x - finalX) * easedScatter;
    y = finalY + (exitPoint.y - finalY) * easedScatter;
    opacity = clamp01(1 - scatterT * 1.35);
    clicking = false;
    rippling = false;
    dragging = false;
    marqueeActive = false;
    snapped = true;
    marqueeOpacity = 0;
    polishProgress = 1;
    awaitingLabel = '';
    typedText = '';
    isTyping = false;
  }

  return {
    ...agent,
    x,
    y,
    opacity,
    clicking,
    rippling,
    dragging,
    marqueeActive,
    snapped,
    marqueeOpacity,
    marqueeRect,
    stampStep,
    polishProgress,
    awaitingLabel,
    typedText,
    isTyping,
    primarySpawnPhase,
    secondarySpawnPhase,
  };
}

/**
 * `<CursorTimelineController>`
 * Frame-accurate `requestAnimationFrame` orchestrator for Cooperative Hero Assembly
 * with real-time progressive `clip-path` text & element spawning.
 */
export function CursorTimelineController({
  containerRef,
  mode = 'swarm',
  onElementSnap,
  onElementPolish,
  onComplete,
  replayTrigger = 0,
}) {
  const [stagePhase, setStagePhase] = useState('idle');
  const [masterState, setMasterState] = useState(null);
  const [frameAgents, setFrameAgents] = useState([]);
  const [snappedCount, setSnappedCount] = useState(0);
  const [polishedCount, setPolishedCount] = useState(0);

  const rafRef = useRef(null);
  const snappedTargetsRef = useRef(new Set());
  const polishedTargetsRef = useRef(new Set());
  const onElementSnapRef = useRef(onElementSnap);
  const onElementPolishRef = useRef(onElementPolish);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onElementSnapRef.current = onElementSnap;
    onElementPolishRef.current = onElementPolish;
    onCompleteRef.current = onComplete;
  }, [onElementSnap, onElementPolish, onComplete]);

  // Measure DOM target bounding boxes + cache live DOM element refs relative to the Hero container
  const measureTargets = useCallback(() => {
    const container = containerRef?.current;
    if (!container) return null;
    const cRect = container.getBoundingClientRect();
    const map = {
      __viewport: {
        width: cRect.width || window.innerWidth,
        height: cRect.height || window.innerHeight,
      },
      __els: {},
    };

    const targets = container.querySelectorAll('[data-cursor-target]');
    targets.forEach((el) => {
      const key = el.getAttribute('data-cursor-target');
      if (!key) return;
      const r = el.getBoundingClientRect();
      map[key] = {
        x: r.left - cRect.left,
        y: r.top - cRect.top,
        width: Math.max(16, r.width),
        height: Math.max(16, r.height),
      };
      map.__els[key] = el;
    });

    return map;
  }, [containerRef]);

  useEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    snappedTargetsRef.current.clear();
    polishedTargetsRef.current.clear();
    setSnappedCount(0);
    setPolishedCount(0);

    const container = containerRef?.current;

    // Accessibility or Mobile Fallback: immediately reveal and polish all elements
    if (mode !== 'swarm') {
      setStagePhase('done');
      if (container) {
        container.querySelectorAll('[data-cursor-target]').forEach((el) => {
          const key = el.getAttribute('data-cursor-target');
          if (key && key !== 'hero-frame') {
            applyProgressiveDomSpawn(el, 'snapped', CREATION_MODES.FRAME_OUTLINE, null, null);
          }
        });
      }
      HERO_CURSOR_SWARM.forEach((ag) => {
        onElementSnapRef.current?.(ag.targetSelector);
        if (ag.secondaryTargetSelector) {
          onElementSnapRef.current?.(ag.secondaryTargetSelector);
        }
        if (Array.isArray(ag.polishTargets)) {
          ag.polishTargets.forEach((k) => onElementPolishRef.current?.(k));
        }
      });
      onCompleteRef.current?.();
      return undefined;
    }

    // Initialize all non-macro Hero targets to `pending` (hidden) before frame 1
    if (container) {
      container.querySelectorAll('[data-cursor-target]').forEach((el) => {
        const key = el.getAttribute('data-cursor-target');
        if (key && key !== 'hero-frame') {
          applyProgressiveDomSpawn(el, 'pending', CREATION_MODES.FRAME_OUTLINE, null, null);
        }
      });
    }

    setStagePhase('active');
    let startTime = null;
    let cachedRects = null;

    const handleResize = () => {
      cachedRects = measureTargets();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const snapTargetOnce = (targetKey) => {
      if (!targetKey) return;
      if (!snappedTargetsRef.current.has(targetKey)) {
        snappedTargetsRef.current.add(targetKey);
        setSnappedCount(snappedTargetsRef.current.size);
        onElementSnapRef.current?.(targetKey);
      }
    };

    const polishTargetOnce = (targetKey) => {
      if (!targetKey) return;
      if (!polishedTargetsRef.current.has(targetKey)) {
        polishedTargetsRef.current.add(targetKey);
        setPolishedCount(polishedTargetsRef.current.size);
        onElementPolishRef.current?.(targetKey);
      }
    };

    const tick = (now) => {
      if (startTime === null) {
        startTime = now;
        cachedRects = measureTargets();
      }

      const elapsed = now - startTime;

      // Re-measure periodically so layout & web fonts stay 100% accurate
      if (!cachedRects || elapsed < 2800) {
        const fresh = measureTargets();
        if (fresh) cachedRects = fresh;
      }

      const vw = cachedRects?.__viewport?.width || window.innerWidth;
      const vh = cachedRects?.__viewport?.height || window.innerHeight;

      if (elapsed >= HERO_TIMELINE_MS.MASTER_SCATTER_EXIT) {
        setStagePhase((prev) => (prev !== 'scattering' ? 'scattering' : prev));
      } else if (elapsed >= HERO_TIMELINE_MS.MASTER_AUDIT_START) {
        setStagePhase((prev) => (prev !== 'auditing' ? 'auditing' : prev));
      } else if (elapsed >= 1960) {
        setStagePhase((prev) => (prev !== 'polishing' ? 'polishing' : prev));
      }

      // 1. Compute Tier 1 Master Orchestrator (`KV-Director`) State
      const heroFrameRect = cachedRects?.['hero-frame'] || {
        x: vw * 0.12,
        y: vh * 0.16,
        width: vw * 0.76,
        height: vh * 0.64,
      };
      const titleRect = cachedRects?.['hero-title'] || heroFrameRect;
      const contactRect = cachedRects?.['hero-contact'] || heroFrameRect;

      const mSpawnX = (HERO_MASTER_DIRECTOR.spawnNorm[0] / 100) * vw;
      const mSpawnY = (HERO_MASTER_DIRECTOR.spawnNorm[1] / 100) * vh;
      const mExitX = (HERO_MASTER_DIRECTOR.exitNorm[0] / 100) * vw;
      const mExitY = (HERO_MASTER_DIRECTOR.exitNorm[1] / 100) * vh;

      const vantageX = Math.max(
        48,
        Math.min(vw - 320, heroFrameRect.x + heroFrameRect.width * 0.72)
      );
      const vantageY = Math.max(78, heroFrameRect.y - 18);

      const auditPoint1 = {
        x: titleRect.x + titleRect.width * 0.68,
        y: titleRect.y + titleRect.height * 0.35,
      };
      const auditPoint2 = {
        x: contactRect.x + contactRect.width * 0.52,
        y: contactRect.y + contactRect.height * 0.5,
      };

      const maxMasterOpacity = HERO_MASTER_DIRECTOR.maxOpacity || 0.48;
      let mx = mSpawnX;
      let my = mSpawnY;
      let mOpacity = 0;
      let mClicking = false;
      let mRippling = false;

      if (elapsed >= HERO_MASTER_DIRECTOR.flyStart) {
        if (elapsed < HERO_MASTER_DIRECTOR.arriveTime) {
          const flyT = clamp01(
            (elapsed - HERO_MASTER_DIRECTOR.flyStart) /
              (HERO_MASTER_DIRECTOR.arriveTime - HERO_MASTER_DIRECTOR.flyStart)
          );
          const eased = easeOutCubic(flyT);
          mx = mSpawnX + (vantageX - mSpawnX) * eased;
          my = mSpawnY + (vantageY - mSpawnY) * eased;
          mOpacity = clamp01(flyT * 2.2) * (maxMasterOpacity * 0.78);
        } else if (elapsed < HERO_TIMELINE_MS.MASTER_AUDIT_START) {
          const hoverElapsed = elapsed - HERO_MASTER_DIRECTOR.arriveTime;
          mx = vantageX + Math.sin(hoverElapsed * 0.0028) * 10;
          my = vantageY + Math.cos(hoverElapsed * 0.0022) * 4;
          mOpacity = maxMasterOpacity * 0.78;
        } else if (elapsed < 4080) {
          const t1 = clamp01(
            (elapsed - HERO_TIMELINE_MS.MASTER_AUDIT_START) /
              (4080 - HERO_TIMELINE_MS.MASTER_AUDIT_START)
          );
          const moveT = easeInOutCubic(clamp01(t1 / 0.58));
          mx = vantageX + (auditPoint1.x - vantageX) * moveT;
          my = vantageY + (auditPoint1.y - vantageY) * moveT;
          mOpacity = maxMasterOpacity;
          mClicking = t1 > 0.68 && t1 < 0.88;
          mRippling = t1 > 0.7 && t1 < 0.96;
        } else if (elapsed < HERO_TIMELINE_MS.MASTER_SCATTER_EXIT) {
          const t2 = clamp01(
            (elapsed - 4080) / (HERO_TIMELINE_MS.MASTER_SCATTER_EXIT - 4080)
          );
          const moveT = easeInOutCubic(clamp01(t2 / 0.55));
          mx = auditPoint1.x + (auditPoint2.x - auditPoint1.x) * moveT;
          my = auditPoint1.y + (auditPoint2.y - auditPoint1.y) * moveT;
          mOpacity = maxMasterOpacity;
          mClicking = t2 > 0.58 && t2 < 0.76;
          mRippling = t2 > 0.6 && t2 < 0.88;
        } else {
          const scatterT = clamp01(
            (elapsed - HERO_TIMELINE_MS.MASTER_SCATTER_EXIT) /
              (HERO_TIMELINE_MS.UNMOUNT_STAGE -
                HERO_TIMELINE_MS.MASTER_SCATTER_EXIT)
          );
          const eased = easeInOutCubic(scatterT);
          mx = auditPoint2.x + (mExitX - auditPoint2.x) * eased;
          my = auditPoint2.y + (mExitY - auditPoint2.y) * eased;
          mOpacity = maxMasterOpacity * clamp01(1 - scatterT * 1.25);
        }
      }

      const activePhase =
        HERO_MASTER_DIRECTOR.phases.find(
          (p) => elapsed >= p.start && elapsed < p.end
        ) || HERO_MASTER_DIRECTOR.phases[HERO_MASTER_DIRECTOR.phases.length - 1];

      let masterTypedCmd = '';
      let masterIsTyping = false;
      if (activePhase) {
        const phaseDuration = Math.max(200, activePhase.end - activePhase.start);
        const typeProgress = clamp01(
          (elapsed - activePhase.start) / (phaseDuration * 0.65)
        );
        masterTypedCmd = sliceTypedText(activePhase.cmd, typeProgress);
        masterIsTyping = typeProgress < 1;
      }

      setMasterState({
        ...HERO_MASTER_DIRECTOR,
        x: mx,
        y: my,
        opacity: mOpacity,
        clicking: mClicking,
        rippling: mRippling,
        commandText: masterTypedCmd,
        commandStatus: activePhase?.status || '',
        isTyping: masterIsTyping,
      });

      // 2. Compute Tier 2 (`Arch-Frame`) + Tier 3A (5 Structural Cursors) + Tier 3B (`Aesthetic-UI`) States
      //    and progressively spawn each Hero target element in real time!
      const nextAgents = HERO_CURSOR_SWARM.map((agent) => {
        const tRect = cachedRects?.[agent.targetSelector] || {
          x: vw * 0.35,
          y: vh * 0.35,
          width: 240,
          height: 48,
        };
        const secondaryRect = agent.secondaryTargetSelector
          ? cachedRects?.[agent.secondaryTargetSelector]
          : null;

        const spawnPoint = {
          x: (agent.spawnNorm[0] / 100) * vw,
          y: (agent.spawnNorm[1] / 100) * vh,
        };
        const exitPoint = {
          x: (agent.exitNorm[0] / 100) * vw,
          y: (agent.exitNorm[1] / 100) * vh,
        };

        const geom = computeAgentGeometry({
          agent,
          tRect,
          secondaryRect,
          spawnPoint,
          exitPoint,
          elapsed,
          scatterTime: HERO_TIMELINE_MS.WORKER_SCATTER,
          endTime: HERO_TIMELINE_MS.WORKER_DONE,
          onSnapTarget: snapTargetOnce,
          onPolishTarget: polishTargetOnce,
        });

        // Progressively reveal the actual DOM element & text behind the cursor
        if (!agent.isPolishPass && !agent.isMacroContainer) {
          const primaryEl = cachedRects?.__els?.[agent.targetSelector];
          if (primaryEl) {
            applyProgressiveDomSpawn(
              primaryEl,
              geom.primarySpawnPhase,
              agent.creationMode,
              geom.marqueeRect,
              tRect
            );
          }
          if (agent.secondaryTargetSelector && secondaryRect) {
            const secEl = cachedRects?.__els?.[agent.secondaryTargetSelector];
            if (secEl) {
              applyProgressiveDomSpawn(
                secEl,
                geom.secondarySpawnPhase,
                CREATION_MODES.CENTER_SPLIT_PILL,
                geom.marqueeRect,
                secondaryRect
              );
            }
          }
        }

        return geom;
      });

      setFrameAgents(nextAgents);

      if (elapsed < HERO_TIMELINE_MS.UNMOUNT_STAGE) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setStagePhase('done');
        onCompleteRef.current?.();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [mode, replayTrigger, measureTargets, containerRef]);

  if (mode !== 'swarm' || stagePhase === 'done' || stagePhase === 'idle') {
    return null;
  }

  return (
    <div className="cursor-stage" aria-hidden="true">
      {/* Blueprint Wireframe Grid Overlay (fades out smoothly once elements lock in) */}
      <motion.div
        initial={{ opacity: 0.85 }}
        animate={{
          opacity:
            stagePhase === 'scattering'
              ? 0
              : stagePhase === 'auditing'
                ? 0.22
                : stagePhase === 'polishing'
                  ? 0.48
                  : 0.78,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="cursor-blueprint-grid"
      />

      {/* Bottom-Left Collaborative Canvas HUD Telemetry Pill */}
      <AnimatePresence>
        {stagePhase !== 'scattering' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.86, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07090B]/90 border border-white/15 text-[10px] font-mono text-white/75 shadow-lg"
            style={{
              position: 'absolute',
              bottom: 22,
              left: 24,
              zIndex: 55,
            }}
          >
            <span
              className={`w-2 h-2 rounded-full animate-ping ${
                stagePhase === 'polishing'
                  ? 'bg-pink-500'
                  : stagePhase === 'auditing'
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
              }`}
            />
            <span className="text-white/90 font-bold">
              {stagePhase === 'auditing'
                ? 'QA VERIFICATION'
                : stagePhase === 'polishing'
                  ? 'AESTHETIC POLISH & CURVING'
                  : 'COOPERATIVE ASSEMBLY'}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-emerald-400 tabular-nums">
              {snappedCount}/7 NODES
            </span>
            <span className="text-white/40">·</span>
            <span className="text-pink-400 tabular-nums">
              {polishedCount}/6 CURVED
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-Time Multi-Directional Selection / Construction / Smart-Alignment Marquee Boxes */}
      {frameAgents.map((agent) => (
        <SelectionMarquee
          key={`marquee-${agent.id}`}
          rect={agent.marqueeRect}
          color={agent.color}
          styleType={agent.marqueeStyle}
          creationMode={agent.creationMode}
          dimensionTag={agent.dimensionTag}
          active={agent.marqueeActive}
          snapped={agent.snapped}
          opacity={agent.marqueeOpacity}
          stampStep={agent.stampStep}
          polishProgress={agent.polishProgress}
        />
      ))}

      {/* Tier 2, Tier 3A & Tier 3B (`Aesthetic-UI`) Autonomous Cursors with Cooperative Await & Fake Typing */}
      {frameAgents.map(
        (agent) =>
          agent.opacity > 0.01 && (
            <SimulatedCursor
              key={agent.id}
              x={agent.x}
              y={agent.y}
              label={agent.label}
              role={agent.role}
              tier={agent.tier}
              cursorVariant={agent.cursorVariant}
              awaitingLabel={agent.awaitingLabel}
              typedText={agent.typedText}
              isTyping={agent.isTyping}
              color={agent.color}
              textColor={agent.textColor}
              opacity={agent.opacity}
              clicking={agent.clicking}
              rippling={agent.rippling}
              dragging={agent.dragging}
            />
          )
      )}

      {/* Tier 1 Subtle Low-Opacity Master Orchestrator (`KV-Director` — No Tether Lines, Stays Longer to Audit & Fix) */}
      {masterState && masterState.opacity > 0.01 && (
        <SimulatedCursor
          key={masterState.id}
          x={masterState.x}
          y={masterState.y}
          label={masterState.label}
          role={masterState.role}
          tier={1}
          cursorVariant="director"
          commandText={masterState.commandText}
          commandStatus={masterState.commandStatus}
          isTyping={masterState.isTyping}
          color={masterState.color}
          textColor={masterState.textColor}
          opacity={masterState.opacity}
          clicking={masterState.clicking}
          rippling={masterState.rippling}
          dragging={false}
        />
      )}
    </div>
  );
}

/**
 * Helper to resolve primary & secondary target DOM elements inside a scroll section.
 */
function resolveSectionTargets(sectionEl, sectionCfg) {
  if (!sectionEl) return [];
  return sectionCfg.agents.map((ag) => {
    const primary = sectionEl.querySelector(
      `[data-scroll-target="${ag.targetKey}"]`
    );
    const secondary = ag.secondaryTargetKey
      ? sectionEl.querySelector(
          `[data-scroll-target="${ag.secondaryTargetKey}"]`
        )
      : null;

    if (primary) {
      return { primary, secondary };
    }
    if (secondary) {
      return { primary: secondary, secondary: null };
    }
    const fallback =
      ag.creationMode === CREATION_MODES.TEXT_BASELINE_SWEEP
        ? sectionEl.querySelector('h2') || sectionEl
        : sectionEl.querySelector('[data-scroll-target]') ||
          sectionEl.querySelector('p') ||
          sectionEl.querySelector('h2') ||
          sectionEl;
    return { primary: fallback, secondary: null };
  });
}

/**
 * `<ScrollSectionCursorStage>`
 * Cooperative Multi-Cursor Pipeline across every scroll section
 * (`#about`, `#referees`, `#work`, `#reviews`, `#experience`, `#contact`):
 * - Uses the EXACT `getBoundingClientRect()` width and height of every target (never clamped to 420px!).
 * - Progressively spawns every target's text and DOM content inside the growing marquee box via `clip-path`.
 * - Prevents `KV-Director` instances from stacking at `y = 76px` when scrolling rapidly across sections.
 */
export function ScrollSectionCursorStage() {
  const mode = useCursorAssemblyMode();
  const [renderedSquads, setRenderedSquads] = useState([]);
  const activeSquadsRef = useRef([]);
  const triggeredSectionsRef = useRef(new Set());
  const rafRef = useRef(null);

  useEffect(() => {
    if (mode !== 'swarm') {
      document
        .querySelectorAll('[data-scroll-assembly]')
        .forEach((el) => {
          el.removeAttribute('data-scroll-assembly');
          el.style.opacity = '';
          el.style.clipPath = '';
          el.style.webkitClipPath = '';
          el.style.filter = '';
          el.style.pointerEvents = '';
        });
      activeSquadsRef.current = [];
      setRenderedSquads([]);
      return undefined;
    }

    const observers = [];
    const trackedElements = [];

    const startSquadLoop = () => {
      if (rafRef.current) return;

      const WORKER_SCATTER = 2160;
      const WORKER_END = 2660;
      const MASTER_AUDIT_END = 3000;
      const SQUAD_END = 3360;

      const tick = (now) => {
        const currentSquads = activeSquadsRef.current;
        if (currentSquads.length === 0) {
          rafRef.current = null;
          setRenderedSquads([]);
          return;
        }

        const nextSquadsRendered = [];
        const remainingSquads = [];

        currentSquads.forEach((squad, squadIdx) => {
          const squadElapsed = now - squad.startTime;
          const isLatestSquad = squadIdx === currentSquads.length - 1;
          const vh = window.innerHeight || 800;

          // Check if every burst in this section squad has entered the viewport and finished its animation
          const allBurstsFinished = squad.agentBursts.every(
            (b) =>
              b.startedAt !== null &&
              now - b.startedAt + b.timeOffset >= SQUAD_END
          );

          if (allBurstsFinished) {
            squad.agentBursts.forEach((b) => {
              if (b.targetEl && !b.isPolishPass) {
                b.revealed = true;
                applyProgressiveDomSpawn(
                  b.targetEl,
                  'snapped',
                  b.creationMode,
                  null,
                  null
                );
              }
              if (b.isPolishPass) {
                b.targetEl?.setAttribute('data-aesthetic-polish', 'polished');
                b.secondaryTargetEl?.setAttribute(
                  'data-aesthetic-polish',
                  'polished'
                );
              }
            });
            return;
          }

          remainingSquads.push(squad);

          // Compute live exact bounding rects for each subordinate agent in the section squad
          const computedAgents = [];
          squad.agentBursts.forEach((burst) => {
            if (
              burst.targetEl &&
              !burst.targetEl.isConnected &&
              squad.sectionEl &&
              burst.targetKey
            ) {
              const freshEl = squad.sectionEl.querySelector(
                `[data-scroll-target="${burst.targetKey}"]`
              );
              if (freshEl) burst.targetEl = freshEl;
            }
            if (
              burst.secondaryTargetEl &&
              !burst.secondaryTargetEl.isConnected &&
              squad.sectionEl &&
              burst.secondaryTargetKey
            ) {
              const freshSec = squad.sectionEl.querySelector(
                `[data-scroll-target="${burst.secondaryTargetKey}"]`
              );
              if (freshSec) burst.secondaryTargetEl = freshSec;
            }

            const liveRect = burst.targetEl
              ? burst.targetEl.getBoundingClientRect()
              : burst.initialRect;

            // Per-Burst Viewport Gate:
            // If this target element is still below the visible viewport (`liveRect.top > vh * 0.85`),
            // hold its cursor burst until the user scrolls it into view so animations never play off-screen!
            if (burst.startedAt === null) {
              if (liveRect.bottom < 0) {
                // Scrolled completely past above viewport -> snap immediately
                burst.startedAt = now - SQUAD_END;
                burst.timeOffset = 0;
                if (!burst.isPolishPass && burst.targetEl) {
                  burst.revealed = true;
                  applyProgressiveDomSpawn(
                    burst.targetEl,
                    'snapped',
                    burst.creationMode,
                    null,
                    null
                  );
                }
                if (burst.isPolishPass) {
                  burst.targetEl?.setAttribute('data-aesthetic-polish', 'polished');
                  burst.secondaryTargetEl?.setAttribute(
                    'data-aesthetic-polish',
                    'polished'
                  );
                }
                return;
              }

              if (liveRect.top <= vh * 0.85) {
                burst.startedAt = now;
                burst.timeOffset = 0;
                squad.lastActiveTime = now;
              } else {
                // Still below the viewport fold — keep element hidden (`pending`) and wait for user scroll
                if (!burst.isPolishPass && burst.targetEl) {
                  applyProgressiveDomSpawn(
                    burst.targetEl,
                    'pending',
                    burst.creationMode,
                    null,
                    null
                  );
                }
                return;
              }
            }

            const burstElapsed = now - burst.startedAt + burst.timeOffset;

            // EXACT target dimensions — never artificially clamp height to 420px!
            const width = Math.max(16, liveRect.width);
            const height = Math.max(16, liveRect.height);

            const tRect = {
              x: liveRect.left,
              y: liveRect.top,
              width,
              height,
            };

            let secondaryRect = null;
            if (burst.secondaryTargetEl) {
              const sLive = burst.secondaryTargetEl.getBoundingClientRect();
              secondaryRect = {
                x: sLive.left,
                y: sLive.top,
                width: Math.max(16, sLive.width),
                height: Math.max(16, sLive.height),
              };
            }

            const spawnPoint = {
              x: tRect.x + burst.spawnOffset[0],
              y: tRect.y + burst.spawnOffset[1],
            };
            const exitPoint = {
              x: tRect.x + tRect.width + burst.exitOffset[0],
              y: tRect.y + burst.exitOffset[1],
            };

            const geom = computeAgentGeometry({
              agent: burst,
              tRect,
              secondaryRect,
              spawnPoint,
              exitPoint,
              elapsed: burstElapsed,
              scatterTime: WORKER_SCATTER,
              endTime: WORKER_END,
              onSnapTarget: () => {
                if (!burst.isPolishPass && burst.targetEl) {
                  burst.revealed = true;
                  applyProgressiveDomSpawn(
                    burst.targetEl,
                    'snapped',
                    burst.creationMode,
                    null,
                    null
                  );
                }
              },
              onPolishTarget: () => {
                burst.targetEl?.setAttribute(
                  'data-aesthetic-polish',
                  'polished'
                );
                burst.secondaryTargetEl?.setAttribute(
                  'data-aesthetic-polish',
                  'polished'
                );
              },
            });

            // Progressively spawn the target DOM element & text right inside the cursor's marquee box
            if (!burst.isPolishPass && burst.targetEl) {
              applyProgressiveDomSpawn(
                burst.targetEl,
                geom.primarySpawnPhase,
                burst.creationMode,
                geom.marqueeRect,
                tRect
              );
            }

            computedAgents.push(geom);
          });

          // Compute Tier 1 Master Orchestrator (`KV-Director`) low-opacity inspection & fix patrol
          // Only display `KV-Director` on the newest active squad and anchor it to its true section position
          // (no `Math.max(76, ...)` clamping that caused directors to pile up at the top of the screen!)
          let masterState = null;
          const hasStartedBurst = squad.agentBursts.some(
            (b) => b.startedAt !== null
          );
          if (isLatestSquad && hasStartedBurst) {
            const headerBurst =
              squad.agentBursts.find(
                (b) => b.creationMode === CREATION_MODES.TEXT_BASELINE_SWEEP
              ) || squad.agentBursts[0];
            const liveHeaderDom = headerBurst?.targetEl
              ? headerBurst.targetEl.getBoundingClientRect()
              : {
                  left: window.innerWidth * 0.2,
                  top: window.innerHeight * 0.25,
                  width: 400,
                  height: 60,
                };

            const vantageX = Math.max(
              60,
              Math.min(
                window.innerWidth - 340,
                liveHeaderDom.left + Math.max(220, liveHeaderDom.width * 0.75)
              )
            );
            const vantageY = liveHeaderDom.top - 28;

            const auditX = Math.max(
              60,
              Math.min(
                window.innerWidth - 320,
                liveHeaderDom.left + Math.max(120, liveHeaderDom.width * 0.42)
              )
            );
            const auditY = liveHeaderDom.top + 18;

            const mSpawnX = vantageX + squad.director.spawnOffset[0];
            const mSpawnY = vantageY + squad.director.spawnOffset[1];
            const mExitX = auditX + squad.director.exitOffset[0];
            const mExitY = auditY + squad.director.exitOffset[1];
            const maxOp = squad.director.maxOpacity || 0.45;

            let mx = mSpawnX;
            let my = mSpawnY;
            let mOpacity = 0;
            let mClicking = false;
            let mRippling = false;
            let rawMasterText = squad.commandLabel;
            let masterStatus = 'COOP';
            let typeRatio = 1;
            const elapsed = now - (squad.lastActiveTime || squad.startTime);

            if (elapsed < 420) {
              const flyT = clamp01(elapsed / 420);
              const eased = easeOutCubic(flyT);
              mx = mSpawnX + (vantageX - mSpawnX) * eased;
              my = mSpawnY + (vantageY - mSpawnY) * eased;
              mOpacity = clamp01(flyT * 2.2) * (maxOp * 0.8);
              typeRatio = flyT;
            } else if (elapsed < 1980) {
              const hoverT = elapsed - 420;
              mx = vantageX + Math.sin(hoverT * 0.004) * 6;
              my = vantageY + Math.cos(hoverT * 0.003) * 3;
              mOpacity = maxOp * 0.82;
              rawMasterText = squad.commandLabel;
              masterStatus = elapsed < 1160 ? 'SYNC' : 'POLISH';
              typeRatio = clamp01((elapsed - 200) / 700);
            } else if (elapsed < 2660) {
              const auditT = clamp01((elapsed - 1980) / (2660 - 1980));
              const easedMove = easeInOutCubic(clamp01(auditT / 0.65));
              mx = vantageX + (auditX - vantageX) * easedMove;
              my = vantageY + (auditY - vantageY) * easedMove;
              mOpacity = maxOp;
              mClicking = auditT > 0.68 && auditT < 0.88;
              mRippling = auditT > 0.7 && auditT < 0.96;
              rawMasterText = squad.auditLabel || squad.commitLabel;
              masterStatus = 'FIXING';
              typeRatio = clamp01(auditT / 0.75);
            } else if (elapsed < MASTER_AUDIT_END) {
              mx = auditX;
              my = auditY;
              mOpacity = maxOp;
              rawMasterText = squad.commitLabel;
              masterStatus = 'PASSED';
              typeRatio = clamp01((elapsed - 2660) / 220);
            } else {
              const scatterT = clamp01(
                (elapsed - MASTER_AUDIT_END) / (SQUAD_END - MASTER_AUDIT_END)
              );
              const eased = easeInOutCubic(scatterT);
              mx = auditX + (mExitX - auditX) * eased;
              my = auditY + (mExitY - auditY) * eased;
              mOpacity = maxOp * clamp01(1 - scatterT * 1.3);
              rawMasterText = squad.commitLabel;
              masterStatus = 'PASSED';
              typeRatio = 1;
            }

            // Fade out cleanly if the section scrolls above the navbar or below the viewport
            if (my < 48 || my > window.innerHeight - 32) {
              mOpacity = 0;
            }

            masterState = {
              ...squad.director,
              x: mx,
              y: my,
              opacity: mOpacity,
              clicking: mClicking,
              rippling: mRippling,
              commandText: sliceTypedText(rawMasterText, typeRatio),
              commandStatus: masterStatus,
              isTyping: typeRatio < 1,
            };
          }

          nextSquadsRendered.push({
            id: squad.id,
            master: masterState,
            agents: computedAgents,
          });
        });

        activeSquadsRef.current = remainingSquads;
        setRenderedSquads(nextSquadsRendered);

        if (remainingSquads.length > 0) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const skipSectionImmediately = (sectionCfg, sectionEl) => {
      if (triggeredSectionsRef.current.has(sectionCfg.sectionId)) return;
      triggeredSectionsRef.current.add(sectionCfg.sectionId);
      const pairs = resolveSectionTargets(sectionEl, sectionCfg);
      pairs.forEach(({ primary: tEl, secondary: sEl }) => {
        if (tEl && tEl.getAttribute('data-scroll-assembly') !== 'snapped') {
          applyProgressiveDomSpawn(
            tEl,
            'snapped',
            CREATION_MODES.FRAME_OUTLINE,
            null,
            null
          );
        }
        tEl?.setAttribute('data-aesthetic-polish', 'polished');
        sEl?.setAttribute('data-aesthetic-polish', 'polished');
      });
    };

    const triggerSectionSquad = (sectionCfg, sectionEl) => {
      if (triggeredSectionsRef.current.has(sectionCfg.sectionId)) return;
      triggeredSectionsRef.current.add(sectionCfg.sectionId);
      const now = performance.now();
      const pairs = resolveSectionTargets(sectionEl, sectionCfg);

      const agentBursts = sectionCfg.agents.map((ag, idx) => {
        const targetEl = pairs[idx]?.primary || sectionEl;
        const secondaryTargetEl = pairs[idx]?.secondary || null;
        const r = targetEl.getBoundingClientRect();
        return {
          ...ag,
          id: `${ag.id}-${Date.now()}-${idx}`,
          targetEl,
          secondaryTargetEl,
          startedAt: null,
          timeOffset: 0,
          initialRect: {
            left: r.left,
            top: r.top,
            width: Math.max(16, r.width),
            height: Math.max(16, r.height),
          },
          revealed: Boolean(ag.isPolishPass),
        };
      });

      activeSquadsRef.current = [
        ...activeSquadsRef.current,
        {
          id: `squad-${sectionCfg.sectionId}-${Date.now()}`,
          sectionEl,
          startTime: now,
          lastActiveTime: now,
          commandLabel: sectionCfg.commandLabel,
          auditLabel: sectionCfg.auditLabel,
          commitLabel: sectionCfg.commitLabel,
          director: sectionCfg.director,
          agentBursts,
        },
      ];
      startSquadLoop();
    };

    SECTION_SCROLL_CURSORS.forEach((sectionCfg) => {
      const sectionEl = document.getElementById(sectionCfg.sectionId);
      if (!sectionEl) return;

      const resolvedPairs = resolveSectionTargets(sectionEl, sectionCfg);

      if (!triggeredSectionsRef.current.has(sectionCfg.sectionId)) {
        resolvedPairs.forEach(({ primary: tEl, secondary: sEl }, idx) => {
          const ag = sectionCfg.agents[idx];
          if (tEl && !ag?.isPolishPass) {
            applyProgressiveDomSpawn(
              tEl,
              'pending',
              ag?.creationMode || CREATION_MODES.FRAME_OUTLINE,
              null,
              null
            );
            tEl.setAttribute('data-scroll-mode', ag?.creationMode || '');
            trackedElements.push(tEl);
          } else if (ag?.isPolishPass) {
            if (tEl) {
              tEl.setAttribute('data-aesthetic-polish', 'raw');
              trackedElements.push(tEl);
            }
            if (sEl) {
              sEl.setAttribute('data-aesthetic-polish', 'raw');
              trackedElements.push(sEl);
            }
          }
        });
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (triggeredSectionsRef.current.has(sectionCfg.sectionId)) return;

            // If user jumped past this section (already scrolled above viewport), reveal immediately
            if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0) {
              skipSectionImmediately(sectionCfg, sectionEl);
              return;
            }

            if (entry.isIntersecting) {
              triggerSectionSquad(sectionCfg, sectionEl);
            }
          });
        },
        { threshold: 0.01, rootMargin: '0px 0px -8% 0px' }
      );

      // IMPORTANT for Chrome/Blink: Always observe the unclipped `<section>` element (`sectionEl`),
      // NEVER an inner target that has `opacity: 0` or `clip-path`, otherwise Chrome computes a 0x0 intersection rect!
      io.observe(sectionEl);
      observers.push(io);
    });

    // Passive scroll & resize check for Chrome/Blink to guarantee every section triggers
    // the instant its top crosses into the viewport (`rect.top < vh * 0.88`).
    const checkVisibleSections = () => {
      const vh = window.innerHeight || 800;
      SECTION_SCROLL_CURSORS.forEach((sectionCfg) => {
        if (triggeredSectionsRef.current.has(sectionCfg.sectionId)) return;
        const sectionEl = document.getElementById(sectionCfg.sectionId);
        if (!sectionEl) return;
        const rect = sectionEl.getBoundingClientRect();
        if (rect.bottom < 0) {
          skipSectionImmediately(sectionCfg, sectionEl);
        } else if (rect.top < vh * 0.88 && rect.bottom > 60) {
          triggerSectionSquad(sectionCfg, sectionEl);
        }
      });
    };

    window.addEventListener('scroll', checkVisibleSections, { passive: true });
    window.addEventListener('resize', checkVisibleSections, { passive: true });
    // Run an initial check on mount in case page was reloaded while scrolled partway down
    checkVisibleSections();

    return () => {
      observers.forEach((io) => io.disconnect());
      window.removeEventListener('scroll', checkVisibleSections);
      window.removeEventListener('resize', checkVisibleSections);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      trackedElements.forEach((el) => {
        if (
          el.getAttribute('data-scroll-assembly') === 'pending' ||
          el.getAttribute('data-scroll-assembly') === 'spawning'
        ) {
          el.removeAttribute('data-scroll-assembly');
          el.style.opacity = '';
          el.style.clipPath = '';
          el.style.webkitClipPath = '';
          el.style.filter = '';
          el.style.pointerEvents = '';
        }
        if (el.getAttribute('data-aesthetic-polish') === 'raw') {
          el.removeAttribute('data-aesthetic-polish');
        }
      });
    };
  }, [mode]);

  if (mode !== 'swarm' || renderedSquads.length === 0) return null;

  return (
    <div
      className="cursor-stage"
      style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {renderedSquads.map((squad) => (
        <div key={squad.id}>
          {/* Selection & Smart-Alignment Marquee Boxes */}
          {squad.agents.map((item) => (
            <SelectionMarquee
              key={`scroll-marquee-${item.id}`}
              rect={item.marqueeRect}
              color={item.color}
              styleType={item.marqueeStyle}
              creationMode={item.creationMode}
              dimensionTag={item.dimensionTag}
              active={item.marqueeActive}
              snapped={item.snapped}
              opacity={item.marqueeOpacity}
              stampStep={item.stampStep}
              polishProgress={item.polishProgress}
            />
          ))}

          {/* Subordinate Framing, Typography, Shader, Dock, Stamp & Decorator Cursors */}
          {squad.agents.map(
            (item) =>
              item.opacity > 0.01 && (
                <SimulatedCursor
                  key={`scroll-cursor-${item.id}`}
                  x={item.x}
                  y={item.y}
                  label={item.label}
                  role={item.role}
                  tier={item.tier}
                  cursorVariant={item.cursorVariant}
                  awaitingLabel={item.awaitingLabel}
                  typedText={item.typedText}
                  isTyping={item.isTyping}
                  color={item.color}
                  textColor={item.textColor}
                  opacity={item.opacity}
                  clicking={item.clicking}
                  rippling={item.rippling}
                  dragging={item.dragging}
                />
              )
          )}

          {/* Subtle Low-Opacity Section Master Orchestrator (`KV-Director` — Single Active Instance) */}
          {squad.master && squad.master.opacity > 0.01 && (
            <SimulatedCursor
              key={`scroll-director-${squad.master.id}`}
              x={squad.master.x}
              y={squad.master.y}
              label={squad.master.label}
              role={squad.master.role}
              tier={1}
              cursorVariant="director"
              commandText={squad.master.commandText}
              commandStatus={squad.master.commandStatus}
              isTyping={squad.master.isTyping}
              color={squad.master.color}
              textColor={squad.master.textColor}
              opacity={squad.master.opacity}
              clicking={squad.master.clicking}
              rippling={squad.master.rippling}
              dragging={false}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default CursorTimelineController;
