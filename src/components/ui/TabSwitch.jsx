import { motion } from 'framer-motion';

const DEFAULT_TABS = [
  { id: 'creative', label: 'Creative' },
  { id: 'dev', label: 'IT' },
];

export default function TabSwitch({ active, onChange, tabs = DEFAULT_TABS, size = 'md', className = '', layoutId = 'tab-pill-segmented' }) {
  const isSm = size === 'sm';
  
  return (
    <div
      className={`relative inline-flex items-center p-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] backdrop-blur-xl shadow-inner ${className}`}
      role="tablist"
      aria-label="Persona switch"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative z-10 ${
              isSm ? 'px-3 py-1 text-[11px]' : 'px-4 sm:px-5 py-1.5 text-xs'
            } font-mono font-semibold rounded-full transition-colors duration-200 flex items-center justify-center cursor-pointer select-none whitespace-nowrap ${
              isActive
                ? 'text-[#0A0D0B] font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)]'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00FF87] via-[#00E5FF] to-[#00FF87] shadow-md shadow-[#00FF87]/30"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
