import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShieldCheck,
  Mail,
  Phone,
  Copy,
  Check,
  X,
  Linkedin,
  Sparkles,
  UserCheck,
  ArrowUpRight,
  Send,
  Building2,
  FileCheck2,
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data/testimonials';

export default function TestimonialsSection({ tab }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Current slide index (shows 2 cards on desktop, 1 on mobile)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedReferee, setSelectedReferee] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [lang, setLang] = useState('en'); // 'en' | 'vi'

  // Sort so domain-relevant referee appears first based on active persona tab
  const testimonials = [...TESTIMONIALS_DATA].sort((a, b) => {
    if (tab === 'dev') {
      if (a.category === 'dev' && b.category !== 'dev') return -1;
      if (b.category === 'dev' && a.category !== 'dev') return 1;
    } else if (tab === 'creative') {
      if (a.category === 'creative' && b.category !== 'creative') return -1;
      if (b.category === 'creative' && a.category !== 'creative') return 1;
    }
    return 0;
  });

  const maxIndex = testimonials.length; // 2 items

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % maxIndex);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + maxIndex) % maxIndex);
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Visible items (first & second)
  const firstItem = testimonials[currentIndex];
  const secondIndex = (currentIndex + 1) % maxIndex;
  const secondItem = testimonials[secondIndex];

  return (
    <section
      id="referees"
      ref={ref}
      className="relative scroll-mt-24 sm:scroll-mt-32 bg-black pt-12 sm:pt-20 md:pt-28 pb-20 sm:pb-32 px-4 sm:px-6 md:px-8 overflow-hidden text-white"
    >
      {/* Anchor aliases for compatibility */}
      <div id="testimonials" className="absolute -top-20" />
      <div id="reel" className="absolute -top-20" />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top Header Row matching Reference Image 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14"
        >
          {/* Left: Section Title */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/50 text-[11px] sm:text-xs tracking-widest uppercase font-mono">
                Verified Endorsements &amp; Referees
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-[1.1]">
              What builders say
            </h2>
          </div>

          {/* Right: Clutch / Verified Rating Indicator */}
          <div className="flex items-center sm:flex-col sm:items-end gap-3 sm:gap-1.5 self-start sm:self-auto">
            {/* 5 Stars */}
            <div className="flex items-center gap-1 text-white">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-white text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                />
              ))}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-white/70">
              <span className="font-bold text-white tracking-wide">Clutch / Referees</span>
              <span className="text-white/40">|</span>
              <span className="text-emerald-400 font-semibold">5/5 Verified</span>
            </div>
          </div>
        </motion.div>

        {/* Carousel Grid (2 cards on desktop, 1 on mobile) */}
        <div className="relative min-h-[380px] sm:min-h-[340px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch"
            >
              {/* Card 1 */}
              <TestimonialCard
                item={firstItem}
                lang={lang}
                onSelect={() => setSelectedReferee(firstItem)}
              />

              {/* Card 2 (Desktop side-by-side) */}
              <div className="hidden md:flex h-full">
                <TestimonialCard
                  item={secondItem}
                  lang={lang}
                  onSelect={() => setSelectedReferee(secondItem)}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation & Controls Row matching Image 2 */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 pt-4 border-t border-white/10">
          {/* Left: Circular Arrow Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full liquid-glass border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full liquid-glass border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronRight size={20} />
            </button>

            {/* Slide Index Counter (01 / 02) */}
            <div className="ml-3 font-mono text-xs text-white/50 tracking-wider">
              <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1 text-white/30">/</span>
              <span>{String(maxIndex).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Center / Right: Bilingual EN/VI Switcher & Quick Referee Action */}
          <div className="flex items-center gap-3">
            <div className="liquid-glass rounded-full p-1 border border-white/15 flex items-center gap-1 text-[11px] font-mono">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('vi')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'vi'
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                VI (Tiếng Việt)
              </button>
            </div>

            <button
              onClick={() => setSelectedReferee(firstItem)}
              className="liquid-glass text-xs font-mono text-white/80 hover:text-white px-4 py-2 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all cursor-pointer flex items-center gap-2 shadow-md"
            >
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Verify Referees</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Modal: Referee Profile & "Gửi yêu cầu viết nhận xét" */}
      <AnimatePresence>
        {selectedReferee && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-lg liquid-glass rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl bg-[#0D0F12]/95 text-white max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedReferee(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Verified Header Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                  <UserCheck size={13} />
                  <span>NGƯỜI THAM KHẢO XÁC THỰC // VERIFIED REFEREE</span>
                </span>
              </div>

              {/* Referee Name, Avatar and Title */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedReferee.avatar}
                  alt={selectedReferee.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-white/20 shadow-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-2xl font-display font-bold text-white truncate">
                        {selectedReferee.name}
                      </h3>
                      {selectedReferee.englishName && (
                        <span className="text-[11px] sm:text-xs font-mono text-white/50 block">({selectedReferee.englishName})</span>
                      )}
                    </div>

                    {/* Direct LinkedIn Link */}
                    {selectedReferee.linkedin && (
                      <a
                        href={selectedReferee.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2] text-white border border-[#0A66C2]/40 transition-all flex items-center gap-1 text-xs font-mono shrink-0"
                        title="View verified LinkedIn profile"
                      >
                        <Linkedin size={14} />
                        <span className="hidden sm:inline">LinkedIn</span>
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-mono text-white/70 mt-1 flex items-center gap-1.5 truncate">
                    <Building2 size={13} className="text-emerald-400 shrink-0" />
                    <span className="truncate">
                      {selectedReferee.role} — <strong className="text-white">{selectedReferee.company}</strong>
                    </span>
                  </p>
                </div>
              </div>

              {/* Bio & Background */}
              {selectedReferee.bio && (
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans mb-4">
                  {selectedReferee.bio}
                </p>
              )}

              {/* Relationship & Collaboration Context */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1.5 flex items-center gap-1.5">
                  <FileCheck2 size={12} className="text-emerald-400" />
                  <span>Collaboration Scope with Khoa Vo</span>
                </div>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-sans">
                  {selectedReferee.connection}
                </p>
              </div>

              {/* Direct Contact Details from Image 3 */}
              <div className="space-y-2.5 mb-6">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  Verified Contact Details
                </div>

                {/* Email Item */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-all">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail size={15} className="text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-mono text-white truncate">
                      {selectedReferee.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopy(selectedReferee.email, 'email')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-mono text-white transition-all cursor-pointer flex items-center gap-1"
                    >
                      {copiedField === 'email' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
                    </button>
                    <a
                      href={`mailto:${selectedReferee.email}?subject=Reference%20Check%20-%20Khoa%20Vo%20(Vo%20Nguyen%20Dang%20Khoa)`}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                      title="Send email directly"
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-all">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Phone size={15} className="text-cyan-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-mono text-white truncate">
                      {selectedReferee.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopy(selectedReferee.phone, 'phone')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-mono text-white transition-all cursor-pointer flex items-center gap-1"
                    >
                      {copiedField === 'phone' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
                    </button>
                    <a
                      href={`tel:${selectedReferee.phone}`}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                      title="Call referee"
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Action: "Gửi yêu cầu viết nhận xét" / Send Reference Request button */}
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${selectedReferee.email}?subject=Yêu%20cầu%20xác%20nhận%20thông%20tin%20tham%20khảo%20-%20Võ%20Nguyễn%20Đăng%20Khoa&body=Kính%20gửi%20${encodeURIComponent(selectedReferee.name)},%0D%0A%0D%0AChúng%20tôi%20đang%20tiến%20hành%20xác%20nhận%20thông%20tin%20tham%20khảo%20(reference%20check)%20cho%20Võ%20Nguyễn%20Đăng%20Khoa%20(Khoa%20Vo).%20Rất%20mong%20nhận%20được%20đánh%20giá%20quý%20báu%20từ%20anh.`}
                  className="flex-1 py-3 px-5 rounded-2xl bg-white hover:bg-white/90 text-black font-mono font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer text-center"
                >
                  <Send size={14} />
                  <span>Gửi yêu cầu viết nhận xét</span>
                </a>
                <button
                  onClick={() => setSelectedReferee(null)}
                  className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Sub-component: Individual Testimonial Card matching Image 2 Layout
function TestimonialCard({ item, lang, onSelect }) {
  const [imgError, setImgError] = useState(false);
  if (!item) return null;

  const quoteText = lang === 'vi' && item.quoteVi ? item.quoteVi : item.quote;

  return (
    <div className="relative bg-[#0d0d11]/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-9 border border-white/15 hover:border-white/30 transition-all duration-300 flex flex-col justify-between shadow-2xl group w-full h-full min-h-[350px]">
      <div className="flex-1 flex flex-col justify-start">
        {/* Single classic quotation mark matching Image 2 */}
        <div className="text-4xl sm:text-5xl font-serif text-white/50 group-hover:text-white/80 transition-colors leading-none mb-3 select-none">
          &ldquo;
        </div>

        {/* Testimonial Quote Body - Equal length text across both cards */}
        <p className="text-white/90 text-sm sm:text-base leading-relaxed font-sans mb-6">
          {quoteText}
        </p>
      </div>

      {/* Author and Referee Verification Bar - Locked to identical baseline */}
      <div className="pt-5 border-t border-white/10 mt-auto flex items-center justify-between gap-3">
        {/* Author Avatar & Information */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {item.avatar && !imgError ? (
            <img
              src={item.avatar}
              alt={item.name}
              onError={() => setImgError(true)}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-white/20 shadow-md shrink-0"
              loading="lazy"
            />
          ) : (
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-mono font-bold text-sm text-white shrink-0">
              {item.initials}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-sm sm:text-base font-sans tracking-tight truncate">
                {item.name}
              </span>
              {item.linkedin && (
                <a
                  href={item.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-white/40 hover:text-[#0A66C2] transition-colors shrink-0"
                  title="View verified LinkedIn profile"
                >
                  <Linkedin size={13} />
                </a>
              )}
            </div>
            <div className="text-xs text-white/60 font-mono truncate">
              <span className="text-white/40">&sub;</span> {item.role}, <span className="text-white/80">{item.company}</span>
            </div>
          </div>
        </div>

        {/* Action Button: "Gửi yêu cầu viết nhận xét" (from Image 3) */}
        <button
          onClick={onSelect}
          className="px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/5 hover:bg-white/15 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group/btn shrink-0"
          title="Xem thông tin người tham khảo & gửi yêu cầu"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover/btn:scale-125 transition-transform" />
          <span className="hidden sm:inline">Gửi yêu cầu viết nhận xét</span>
          <span className="inline sm:hidden">Gửi yêu cầu</span>
          <ArrowUpRight size={12} className="opacity-60 group-hover/btn:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
}
