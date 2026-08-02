import { motion } from 'framer-motion';

export default function MeshBackground({ className = '' }) {
  return (
    <div className={`mesh-bg ${className}`} aria-hidden="true">
      <motion.div
        className="mesh-blob mesh-blob-1"
        animate={{ x: [0, 60, -30, 0], y: [0, -50, 40, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="mesh-blob mesh-blob-2"
        animate={{ x: [0, -70, 30, 0], y: [0, 40, -60, 0], scale: [1, 0.9, 1.2, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="mesh-blob mesh-blob-3"
        animate={{ x: [0, 40, -50, 0], y: [0, -30, 50, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="mesh-grain" />
    </div>
  );
}
