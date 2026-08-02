import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  hover = true,
  style,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
