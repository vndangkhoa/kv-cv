import { motion } from 'framer-motion';

const tabs = [
  { id: 'creative', label: 'Creative' },
  { id: 'dev', label: 'Developer' },
];

export default function TabSwitch({ active, onChange, size = 'lg', className = '' }) {
  const sizeCls = size === 'lg' ? 'text-sm px-6 py-3 gap-3' : 'text-xs px-4 py-2 gap-2';
  return (
    <div className={`tab-switch ${sizeCls} ${className}`}>
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative z-10 flex items-center justify-center rounded-full font-bold transition-colors duration-300 ${
              isActive ? 'text-[#0A0D0B]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00FF87] via-[#00E5FF] to-emerald-400 shadow-md shadow-[#00FF87]/30"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
