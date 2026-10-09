import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PERSONAL_INFO from '../../data/personal';

export default function AboutSection({ tab }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isCreative = tab === 'creative';

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-black pt-20 sm:pt-32 md:pt-44 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 overflow-hidden text-center"
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Label: text-white/40 text-sm tracking-widest uppercase */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-[10px] sm:text-xs md:text-sm tracking-widest uppercase font-mono mb-4 sm:mb-6 inline-block"
        >
          About The Creator
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.2] tracking-tight font-serif max-w-4xl px-2"
        >
          {isCreative ? (
            <>
              Pioneering then <em className="italic text-white/70">ideas</em> for{' '}
              <br className="hidden md:inline" />
              <em className="italic text-white/60">minds that then create, build, and inspire.</em>
            </>
          ) : (
            <>
              Pioneering then <em className="italic text-white/70">systems</em> for{' '}
              <br className="hidden md:inline" />
              <em className="italic text-white/60">minds that then secure, architect, and inspire.</em>
            </>
          )}
        </motion.h2>

        {/* Bio summary description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-white/70 text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl mt-5 sm:mt-8 font-sans px-2"
        >
          Vo Nguyen Dang Khoa operates at the intersection of zero-trust technical engineering and
          generative visual intelligence. With 9+ years of design leadership and 18+ deployed production
          apps, he bridges low-level system resilience with cinematic digital experiences.
        </motion.p>
      </div>
    </section>
  );
}
