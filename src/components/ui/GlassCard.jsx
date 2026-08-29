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
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${
        glow ? 'border-[#00FF87]/30 shadow-glow-sm' : ''
      } ${className}`}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
