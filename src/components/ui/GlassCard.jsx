import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  style,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`liquid-glass glass-card ${hover ? 'glass-card-hover' : ''} ${
        glow ? 'border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.08)]' : 'border border-white/10'
      } ${className}`}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
