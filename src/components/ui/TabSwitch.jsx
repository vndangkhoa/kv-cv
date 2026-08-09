import { motion } from 'framer-motion';

const tabs = [
  { id: 'creative', label: 'Creative' },
  { id: 'dev', label: 'Developer' },
];

export default function TabSwitch({ active, onChange, size = 'md', className = '' }) {
  return (
    <div className={`inline-flex items-center p-1 rounded-full bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/80 dark:border-slate-700/80 backdrop-blur-md shadow-inner ${className}`}>
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative z-10 px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-full transition-colors duration-300 flex items-center justify-center cursor-pointer select-none ${
              isActive
                ? 'text-slate-950 dark:text-slate-950'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="tab-pill-segmented"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00FF87] via-[#00E5FF] to-[#00E676] shadow-sm shadow-emerald-500/20"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
