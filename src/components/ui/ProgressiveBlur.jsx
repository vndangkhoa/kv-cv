import React from 'react';

/**
 * ProgressiveBlur
 * 
 * Details.so & Apple-inspired multi-layered gradient backdrop blur.
 * Stacks multiple layers with exponentially increasing blur radii and tailored
 * gradient masks to eliminate the hard, abrupt edge of standard backdrop-filter blur.
 *
 * @param {'top' | 'bottom' | 'left' | 'right'} direction - Direction of progressive blur
 * @param {string} className - Additional CSS classes
 * @param {number} layers - Number of progressive steps (default 8)
 * @param {number} maxBlur - Maximum blur in pixels (default 32)
 * @param {boolean} tint - Whether to include a subtle ambient color fade to blend with background
 * @param {React.CSSProperties} style - Inline style overrides
 */
export default function ProgressiveBlur({
  direction = 'top',
  className = '',
  layers = 8,
  maxBlur = 32,
  tint = true,
  style = {},
}) {
  // Pre-calculated stepped gradient stops and blur values
  // Uses cubic ease curve for optical smoothness
  const layerElements = Array.from({ length: layers }).map((_, index) => {
    const progress = (index + 1) / layers;
    // Exponential blur curve from 1px to maxBlur
    const blurRadius = Math.round(Math.pow(progress, 1.8) * maxBlur * 10) / 10;

    // Linear gradient mask angle according to direction
    let gradientDirection = 'to bottom';
    if (direction === 'top') gradientDirection = 'to bottom';
    else if (direction === 'bottom') gradientDirection = 'to top';
    else if (direction === 'left') gradientDirection = 'to right';
    else if (direction === 'right') gradientDirection = 'to left';

    // Overlapping mask step ranges
    const stepStart = Math.max(0, Math.round(((index - 0.75) / layers) * 100));
    const stepPeak = Math.round((index / layers) * 100);
    const stepEnd = Math.min(100, Math.round(((index + 1.25) / layers) * 100));

    // WebKit and standard mask-image gradients
    const mask = index === 0
      ? `linear-gradient(${gradientDirection}, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${stepPeak}%, rgba(0,0,0,0) ${stepEnd}%)`
      : index === layers - 1
      ? `linear-gradient(${gradientDirection}, rgba(0,0,0,0) ${stepStart}%, rgba(0,0,0,1) ${stepPeak}%, rgba(0,0,0,1) 100%)`
      : `linear-gradient(${gradientDirection}, rgba(0,0,0,0) ${stepStart}%, rgba(0,0,0,1) ${stepPeak}%, rgba(0,0,0,0) ${stepEnd}%)`;

    return (
      <div
        key={`blur-layer-${index}`}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: index + 1,
          backdropFilter: `blur(${blurRadius}px)`,
          WebkitBackdropFilter: `blur(${blurRadius}px)`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
        aria-hidden="true"
      />
    );
  });

  // Gradient direction for the optional ambient background tint
  let tintDirection = 'to bottom';
  if (direction === 'top') tintDirection = 'to bottom';
  else if (direction === 'bottom') tintDirection = 'to top';
  else if (direction === 'left') tintDirection = 'to right';
  else if (direction === 'right') tintDirection = 'to left';

  return (
    <div
      className={`relative overflow-hidden pointer-events-none select-none ${className}`}
      style={{ isolation: 'isolate', ...style }}
      aria-hidden="true"
    >
      {/* Stepped Progressive Blur Layers */}
      {layerElements}

      {/* Optional ambient color ramp to smoothly integrate with theme background */}
      {tint && (
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-500"
          style={{
            zIndex: layers + 2,
            background: `linear-gradient(${tintDirection}, var(--bg-primary) 0%, rgba(var(--bg-primary-rgb, 10, 13, 12), 0.7) 40%, transparent 100%)`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
