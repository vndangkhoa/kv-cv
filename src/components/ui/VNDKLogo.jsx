import { motion } from 'framer-motion';

export default function VNDKLogo({ size = 'md', className = '', animated = true }) {
  // Dimension mapping
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    hero: 'w-32 h-32 md:w-40 md:h-40',
  }[size] || size;

  return (
    <div className={`relative inline-flex items-center justify-center ${dimensions} ${className}`}>
      <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
        whileHover={animated ? { scale: 1.05 } : undefined}
        transition={{ duration: 0.2 }}
      >
        {/* V (Top-Left) */}
        <path
          d="M 14 20 L 29 41 L 44 20"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-current transition-colors"
        />

        {/* N (Top-Right) */}
        <path
          d="M 56 41 L 56 20 L 86 41 L 86 20"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-current transition-colors"
        />

        {/* D (Bottom-Left) - Brand Neon Green */}
        <path
          d="M 14 59 L 28 59 C 41 59 41 80 28 80 L 14 80 Z"
          stroke="#00FF87"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* K (Bottom-Right) - Brand Neon Green */}
        <path
          d="M 56 59 L 56 80 M 86 59 L 56 69.5 L 86 80"
          stroke="#00FF87"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
}
