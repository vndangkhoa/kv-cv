import { useEffect, useRef, useState } from 'react';

/**
 * KineticCharacterCanvas (High Performance / Low-End Optimized)
 * 
 * Takes a video source (e.g. /human_head_turn.mp4) or static image and renders it
 * ENTIRELY as dynamic kinetic typographic characters & halftone crosshatches.
 * 
 * Optimizations for low-end hardware:
 * 1. Offscreen Sprite/Glyph Atlas: Characters are pre-rendered into an offscreen atlas.
 *    Rendering in the animation loop uses hardware-accelerated `ctx.drawImage` instead of
 *    expensive `ctx.fillText` + string parsing + font rasterization.
 * 2. Look-Up Tables (LUTs): Luminance, contrast curve, and character mapping are precomputed
 *    into typed arrays, eliminating float math, powers, and bounds checks in the inner loop.
 * 3. Integer Math & Vectorized Edge Detection: Gradient vectors and Sobel angles use Manhattan
 *    distance and integer ratios, bypassing `Math.atan2`, `Math.sqrt`, and float divisions.
 * 4. Bounded Mouse Ripple: Spatial bounding box avoids calculating distance for off-cursor cells.
 * 5. Throttled Sampling & FPS: Render loop throttled to 24-30 FPS matching native video rate,
 *    eliminating 2x-4x redundant CPU-GPU readbacks on high-refresh displays.
 * 6. Adaptive Degradation: Auto-detects low-end devices / slow frames and scales grid density
 *    seamlessly so framerates remain locked and smooth.
 */

// Kinetic typographic character set ordered by optical density & crosshatch weight
const CHARACTERS = [
  ' ',
  '·',
  '.',
  '°',
  ':',
  '~',
  '+',
  '×',
  '=',
  '*',
  '#',
  '%',
  '8',
  '&',
  '@',
  '█',
];

// Edge contour characters: |, —, /, \
const EDGE_CHARS = ['|', '—', '/', '\\'];
const ALL_CHARS = [...CHARACTERS, ...EDGE_CHARS];

// Discrete opacity levels for the Glyph Atlas
const OPACITY_STEPS = [0.18, 0.28, 0.38, 0.48, 0.58, 0.68, 0.78, 0.90];

// Precompute Luminance LUT (0-255) -> { charIndex, contrast }
const CUTOFF = 34; // Noise cutoff for black background
const CHAR_INDEX_LUT = new Uint8Array(256);
const CONTRAST_LUT = new Float32Array(256);

for (let lum = 0; lum < 256; lum++) {
  if (lum < CUTOFF) {
    CHAR_INDEX_LUT[lum] = 0; // Space
    CONTRAST_LUT[lum] = 0;
  } else {
    const normalized = Math.min(1, Math.max(0, (lum - CUTOFF) / (255 - CUTOFF)));
    const contrast = Math.pow(normalized, 1.35);
    CONTRAST_LUT[lum] = contrast;
    const charIdx = Math.min(
      CHARACTERS.length - 1,
      Math.max(1, Math.floor(contrast * (CHARACTERS.length - 1)) + 1)
    );
    CHAR_INDEX_LUT[lum] = charIdx;
  }
}

// Low-end device heuristic detection
const isLowEndDevice = () => {
  if (typeof navigator === 'undefined') return false;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true;
  if (navigator.deviceMemory && navigator.deviceMemory <= 4) return true;
  if (typeof window !== 'undefined') {
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) && window.innerWidth < 768) {
      return true;
    }
  }
  return false;
};

export default function KineticCharacterCanvas({
  src = '/human_head_turn.mp4',
  className = '',
  density = 'medium', // 'low' | 'medium' | 'high'
  focalPoint = { x: 0.54, y: 0.5 },
  fit = 'cover', // 'cover' | 'contain'
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mousePosRef = useRef({ x: -9999, y: -9999, active: false });
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isImage = /\.(jpe?g|png|webp|avif|svg)(\?.*)?$/i.test(src);
    const lowEnd = isLowEndDevice();

    let video = null;
    let img = null;
    let isMediaReady = false;
    let hasNewVideoFrame = true;

    // Offscreen sampling canvas for reading downscaled pixel buffers
    const sampleCanvas = document.createElement('canvas');
    const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
    if (sampleCtx) {
      sampleCtx.imageSmoothingEnabled = false; // Nearest-neighbor is faster & sharper
    }

    // Offscreen Glyph Atlas canvas
    const atlasCanvas = document.createElement('canvas');
    const atlasCtx = atlasCanvas.getContext('2d');

    let animationFrameId = null;
    let isVisible = true;
    let isTabVisible = true;
    let time = 0;
    let lastRenderTime = 0;
    let lastSampleTime = 0;
    let lastIsLight = null;

    // Adaptive performance tracking
    let adaptivePenalty = 0;
    let slowFrames = 0;

    // Target FPS (24 on low-end, 30 on standard)
    const TARGET_FPS = lowEnd ? 24 : 30;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    // Grid cell size calculation
    const getCellSize = () => {
      const width = window.innerWidth;
      let base;
      if (lowEnd) {
        if (width < 640) base = 11;
        else if (width < 1024) base = 10;
        else base = density === 'high' ? 9 : density === 'low' ? 12 : 10;
      } else {
        if (width < 640) base = 9.5;
        else if (width < 1024) base = 8.5;
        else base = density === 'high' ? 7 : density === 'low' ? 10 : 8.5;
      }
      return base + adaptivePenalty;
    };

    let cellSize = getCellSize();
    let tileW = Math.ceil(cellSize * 1.5);
    let tileH = Math.ceil(cellSize * 1.5);
    let halfTileW = tileW >> 1;
    let halfTileH = tileH >> 1;
    let cols = 0;
    let rows = 0;
    let cachedFrameData = null;
    let diagBreath = null;

    // Pre-bake the Glyph Atlas into offscreen canvas
    const buildAtlas = () => {
      const isLight = document.documentElement.classList.contains('light');
      lastIsLight = isLight;

      tileW = Math.ceil(cellSize * 1.5);
      tileH = Math.ceil(cellSize * 1.5);
      halfTileW = tileW >> 1;
      halfTileH = tileH >> 1;

      atlasCanvas.width = ALL_CHARS.length * tileW;
      atlasCanvas.height = OPACITY_STEPS.length * tileH;

      if (!atlasCtx) return;
      atlasCtx.clearRect(0, 0, atlasCanvas.width, atlasCanvas.height);

      const baseR = isLight ? 15 : 255;
      const baseG = isLight ? 23 : 255;
      const baseB = isLight ? 42 : 255;

      atlasCtx.font = `600 ${Math.round(cellSize * 1.15)}px 'JetBrains Mono', 'IBM Plex Mono', 'Courier New', monospace`;
      atlasCtx.textAlign = 'center';
      atlasCtx.textBaseline = 'middle';

      for (let o = 0; o < OPACITY_STEPS.length; o++) {
        const op = OPACITY_STEPS[o];
        atlasCtx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${op})`;
        const y = o * tileH + halfTileH;

        for (let i = 0; i < ALL_CHARS.length; i++) {
          const ch = ALL_CHARS[i];
          if (ch !== ' ') {
            const x = i * tileW + halfTileW;
            atlasCtx.fillText(ch, x, y);
          }
        }
      }
    };

    const updateSampledFrame = () => {
      if (!isMediaReady || cols <= 0 || rows <= 0) return;
      const mediaSource = isImage ? img : video;
      if (!mediaSource) return;

      const mediaWidth = isImage ? (img.naturalWidth || 1024) : (video.videoWidth || 1280);
      const mediaHeight = isImage ? (img.naturalHeight || 1024) : (video.videoHeight || 720);
      if (mediaWidth <= 0 || mediaHeight <= 0) return;

      const mediaAspect = mediaWidth / mediaHeight;
      const gridAspect = cols / rows;

      let sx = 0;
      let sy = 0;
      let sWidth = mediaWidth;
      let sHeight = mediaHeight;

      if (fit === 'contain') {
        let dw = cols;
        let dh = rows;
        let dx = 0;
        let dy = 0;
        if (gridAspect > mediaAspect) {
          dw = rows * mediaAspect;
          dx = (cols - dw) / 2;
        } else {
          dh = cols / mediaAspect;
          dy = (rows - dh) / 2;
        }
        sampleCtx.clearRect(0, 0, cols, rows);
        sampleCtx.drawImage(mediaSource, 0, 0, mediaWidth, mediaHeight, dx, dy, dw, dh);
      } else {
        // Cover fit
        if (gridAspect > mediaAspect) {
          sHeight = mediaWidth / gridAspect;
          const focalY = focalPoint?.y ?? 0.5;
          sy = Math.max(0, Math.min(mediaHeight - sHeight, (mediaHeight - sHeight) * focalY));
        } else {
          sWidth = mediaHeight * gridAspect;
          const focalX = focalPoint?.x ?? 0.54;
          sx = Math.max(0, Math.min(mediaWidth - sWidth, (mediaWidth - sWidth) * focalX));
        }

        sampleCtx.clearRect(0, 0, cols, rows);
        sampleCtx.drawImage(mediaSource, sx, sy, sWidth, sHeight, 0, 0, cols, rows);
      }

      try {
        cachedFrameData = sampleCtx.getImageData(0, 0, cols, rows).data;
      } catch {
        // Silently catch cross-origin or buffer reading issues
      }
    };

    const resize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      // Clamp DPR: Low-end devices get 1.0 to save 75% GPU fill-rate.
      // Standard screens cap at 1.25 for crispness without Retina slowdown.
      const dpr = lowEnd ? 1 : Math.min(window.devicePixelRatio || 1, 1.25);

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      cellSize = getCellSize();
      cols = Math.max(10, Math.floor(rect.width / cellSize));
      rows = Math.max(10, Math.floor(rect.height / cellSize));

      sampleCanvas.width = cols;
      sampleCanvas.height = rows;

      diagBreath = new Float32Array(cols + rows + 2);

      buildAtlas();
      hasNewVideoFrame = true;
      updateSampledFrame();
    };

    resize();
    window.addEventListener('resize', resize);

    // Track theme changes to re-bake atlas
    const themeObserver = new MutationObserver(() => {
      const isLight = document.documentElement.classList.contains('light');
      if (isLight !== lastIsLight) {
        buildAtlas();
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    if (isImage) {
      img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        isMediaReady = true;
        setIsVideoReady(true);
        updateSampledFrame();
      };
      img.src = src;
      if (img.complete && img.naturalWidth > 0) {
        isMediaReady = true;
        setIsVideoReady(true);
        updateSampledFrame();
      }
    } else {
      // Offscreen sampling video
      video = document.createElement('video');
      video.src = src;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      video.preload = 'auto';
      video.crossOrigin = 'anonymous';

      const handleCanPlay = () => {
        video.play().catch(() => {});
        isMediaReady = true;
        setIsVideoReady(true);
        hasNewVideoFrame = true;
      };

      video.addEventListener('canplay', handleCanPlay);
      if (video.readyState >= 3) {
        handleCanPlay();
      }

      // Hardware-assisted frame callback when available
      if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
        const onVideoFrame = () => {
          hasNewVideoFrame = true;
          if (video && !video.paused) {
            video.requestVideoFrameCallback(onVideoFrame);
          }
        };
        video.requestVideoFrameCallback(onVideoFrame);
      }
    }

    // Pause animation when scrolled offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (video) {
          if (isVisible && isTabVisible && video.paused) {
            video.play().catch(() => {});
          } else if (!isVisible && !video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Pause when browser tab is inactive / minimized
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (video) {
        if (isTabVisible && isVisible && video.paused) {
          video.play().catch(() => {});
        } else if (!isTabVisible && !video.paused) {
          video.pause();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Mouse tracking with boundary clamping
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Render loop
    const render = (now) => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible || !isTabVisible) return;

      const ready = isImage ? isMediaReady : (video && video.readyState >= 2);
      if (!ready || cols <= 0 || rows <= 0) return;

      // FPS throttling
      const elapsed = now - lastRenderTime;
      if (elapsed < FRAME_INTERVAL) return;
      lastRenderTime = now - (elapsed % FRAME_INTERVAL);

      const frameStartTime = performance.now();
      time += 0.035;

      const width = container.clientWidth;
      const height = container.clientHeight;

      // Sample video frames
      if (!isImage) {
        const sampleElapsed = now - lastSampleTime;
        if (hasNewVideoFrame || sampleElapsed >= FRAME_INTERVAL) {
          updateSampledFrame();
          hasNewVideoFrame = false;
          lastSampleTime = now;
        }
      } else if (!cachedFrameData) {
        updateSampledFrame();
      }

      const frameData = cachedFrameData;
      if (!frameData) return;

      // Clear main canvas
      ctx.clearRect(0, 0, width, height);

      // Precompute 1D diagonal breathing wave (only (cols + rows) trig evaluations!)
      const maxDiag = cols + rows;
      if (diagBreath) {
        for (let d = 0; d < maxDiag; d++) {
          diagBreath[d] = Math.sin(time + d * 0.15) * 0.05;
        }
      }

      // Mouse spatial bounding box optimization
      const mouse = mousePosRef.current;
      let hasMouse = false;
      let mMinCol = 0, mMaxCol = -1, mMinRow = 0, mMaxRow = -1;
      const mouseRadius = 180;
      const mouseRadiusSq = mouseRadius * mouseRadius;
      const invMouseRadius = 1 / mouseRadius;

      if (mouse.active && mouse.x >= -mouseRadius && mouse.x <= width + mouseRadius && mouse.y >= -mouseRadius && mouse.y <= height + mouseRadius) {
        hasMouse = true;
        mMinCol = Math.max(0, Math.floor((mouse.x - mouseRadius) / cellSize));
        mMaxCol = Math.min(cols - 1, Math.ceil((mouse.x + mouseRadius) / cellSize));
        mMinRow = Math.max(0, Math.floor((mouse.y - mouseRadius) / cellSize));
        mMaxRow = Math.min(rows - 1, Math.ceil((mouse.y + mouseRadius) / cellSize));
      }

      const cols4 = cols * 4;

      // Blit kinetic characters from Glyph Atlas
      for (let r = 0; r < rows; r++) {
        const rowOffset4 = r * cols4;
        const topRowOffset4 = r > 0 ? (r - 1) * cols4 : rowOffset4;
        const botRowOffset4 = r < rows - 1 ? (r + 1) * cols4 : rowOffset4;
        const y = r * cellSize + (cellSize >> 1);
        const inMouseRow = hasMouse && r >= mMinRow && r <= mMaxRow;

        for (let c = 0; c < cols; c++) {
          const c4 = c << 2;
          const idx = rowOffset4 + c4;

          const red = frameData[idx];
          const green = frameData[idx + 1];
          const blue = frameData[idx + 2];

          // Fast integer luminance
          const lum = (red * 77 + green * 150 + blue * 29) >> 8;

          // Quick skip via LUT
          let char = CHAR_INDEX_LUT[lum];
          if (char === 0) continue;

          const contrast = CONTRAST_LUT[lum];
          const x = c * cellSize + (cellSize >> 1);

          // Fast mouse influence using bounding box & squared distance
          let mouseInfluence = 0;
          let posX = x;
          let posY = y;

          if (inMouseRow && c >= mMinCol && c <= mMaxCol) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < mouseRadiusSq) {
              mouseInfluence = 1 - Math.sqrt(distSq) * invMouseRadius;
              const push = 0.08 * mouseInfluence;
              posX += dx * push;
              posY += dy * push;
            }
          }

          // Optimized integer edge detection
          if (lum > 65 && lum < 215 && c > 0 && c < cols - 1 && r > 0 && r < rows - 1) {
            const leftLum = (frameData[rowOffset4 + c4 - 4] * 77 + frameData[rowOffset4 + c4 - 3] * 150 + frameData[rowOffset4 + c4 - 2] * 29) >> 8;
            const rightLum = (frameData[rowOffset4 + c4 + 4] * 77 + frameData[rowOffset4 + c4 + 5] * 150 + frameData[rowOffset4 + c4 + 6] * 29) >> 8;
            const topLum = (frameData[topRowOffset4 + c4] * 77 + frameData[topRowOffset4 + c4 + 1] * 150 + frameData[topRowOffset4 + c4 + 2] * 29) >> 8;
            const bottomLum = (frameData[botRowOffset4 + c4] * 77 + frameData[botRowOffset4 + c4 + 1] * 150 + frameData[botRowOffset4 + c4 + 2] * 29) >> 8;

            const gx = rightLum - leftLum;
            const gy = bottomLum - topLum;
            const absGx = gx < 0 ? -gx : gx;
            const absGy = gy < 0 ? -gy : gy;

            if (absGx + absGy > 64) {
              // Deterministic pseudo-hash for aesthetic edge stippling
              if (((c * 17 + r * 31) & 7) > 1) {
                if (absGx > (absGy << 1)) {
                  char = 16; // '|'
                } else if (absGy > (absGx << 1)) {
                  char = 17; // '—'
                } else if ((gx > 0 && gy > 0) || (gx < 0 && gy < 0)) {
                  char = 18; // '/'
                } else {
                  char = 19; // '\'
                }
              }
            }
          }

          // Opacity calculation with precomputed diagonal breath
          const breath = diagBreath ? diagBreath[c + r] : 0;
          const opacity = contrast * 0.85 + breath + mouseInfluence * 0.35;

          // Discrete quantization into 0..7
          const opIdx = Math.min(7, Math.max(0, ((opacity - 0.18) * 10) | 0));

          // Blit pre-rendered character tile from Atlas directly via GPU
          const sx = char * tileW;
          const sy = opIdx * tileH;
          ctx.drawImage(
            atlasCanvas,
            sx,
            sy,
            tileW,
            tileH,
            Math.round(posX - halfTileW),
            Math.round(posY - halfTileH),
            tileW,
            tileH
          );
        }
      }

      // Adaptive Performance Guard: If render time exceeds 20ms repeatedly, auto-increase cell size
      const renderDuration = performance.now() - frameStartTime;
      if (renderDuration > 20) {
        slowFrames++;
        if (slowFrames > 30 && adaptivePenalty === 0) {
          adaptivePenalty = 2; // Increase cell size by 2px (reduces cell count by ~40%)
          resize();
        }
      } else if (slowFrames > 0) {
        slowFrames--;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      themeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (video) {
        video.pause();
        video.src = '';
      }
      if (img) {
        img.onload = null;
        img.onerror = null;
      }
    };
  }, [src, density, fit, focalPoint?.x, focalPoint?.y]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />
    </div>
  );
}
