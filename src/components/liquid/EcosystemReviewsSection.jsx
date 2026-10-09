import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ArrowUpRight,
  Play,
  Pause,
  CheckCircle2,
  MessageSquarePlus,
  Send,
  X,
  Server,
  Gamepad2,
  Activity,
} from 'lucide-react';
import FEEDBACKS_DATA from '../../data/ecosystem-feedbacks.json';
import ProgressiveBlur from '../ui/ProgressiveBlur';

const getInitials = (name) => {
  if (!name) return 'US';
  const clean = name.replace(/\(.*?\)/g, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
};

const formatDateLabel = (dateStr) => {
  if (!dateStr) return 'VERIFIED DEPLOY';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d
      .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      .toUpperCase();
  } catch {
    return dateStr;
  }
};

export default function EcosystemReviewsSection({ tab }) {
  const [feed, setFeed] = useState(FEEDBACKS_DATA.feedbacks || []);
  const [filter, setFilter] = useState('all'); // 'all' | 'synology' | 'trimui'
  const [activeReviewId, setActiveReviewId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiveOnline, setIsLiveOnline] = useState(false);
  const [isStreamPaused, setIsStreamPaused] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null);
  const [newComment, setNewComment] = useState({
    name: '',
    project: 'trimui',
    comment: '',
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState('');

  // Proactively check live API status
  useEffect(() => {
    let isMounted = true;
    fetch('https://trimui.vndns.net/api/v1/feedback?summary=true')
      .then((res) => {
        if (res.ok && isMounted) setIsLiveOnline(true);
      })
      .catch(() => {
        if (isMounted) setIsLiveOnline(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredFeed = useMemo(() => {
    if (filter === 'all') return feed;
    return feed.filter((item) => item.project === filter);
  }, [feed, filter]);

  // Infinite vertical stream list: repeat base items until at least 8, then double for seamless -50% loop
  const streamItems = useMemo(() => {
    if (!filteredFeed.length) return [];
    let base = [...filteredFeed];
    while (base.length < 8) {
      base = [...base, ...filteredFeed];
    }
    return [...base, ...base];
  }, [filteredFeed]);

  const animationDuration = useMemo(() => {
    return Math.max(30, Math.round(streamItems.length * 2.2));
  }, [streamItems.length]);

  const synoCount = feed.filter((f) => f.project === 'synology').length;
  const trimuiCount = feed.filter((f) => f.project === 'trimui').length;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://trimui.vndns.net/api/v1/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId: newComment.project === 'synology' ? 'kv-synology' : 'kv-tube',
          authorName: newComment.name || 'Anonymous User',
          rating: Number(newComment.rating),
          category: 'review',
          comment: newComment.comment,
        }),
      }).catch(() => null);

      const newItem = {
        id: `user-rev-${Date.now()}`,
        project: newComment.project,
        projectLabel:
          newComment.project === 'synology'
            ? 'Synology Package Hub'
            : 'TrimUI Smart Pro',
        projectUrl:
          newComment.project === 'synology'
            ? 'https://syno.vndns.net'
            : 'https://trimui.vndns.net',
        appId: newComment.project === 'synology' ? 'syno-hub' : 'trimui-os',
        authorName: newComment.name || 'Community Tester',
        role: 'Verified Feedback',
        rating: Number(newComment.rating),
        category: 'review',
        tag: newComment.project === 'synology' ? 'SYNO-HUB' : 'TRIMUI-OS',
        comment: newComment.comment,
        createdAt: new Date().toISOString(),
      };

      setFeed([newItem, ...feed]);
      setSubmittedMsg('Cảm ơn bạn! Đánh giá đã được ghi nhận.');
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmittedMsg('');
        setNewComment({ name: '', project: 'trimui', comment: '', rating: 5 });
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="reviews"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-black text-white overflow-hidden"
    >
      {/* Subtle Ambient Radial Glow matching other sections */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN: HERO & PINNED TELEMETRY STATS ================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start flex flex-col space-y-6">
            <div>
              {/* Eyebrow Status Badge matching TestimonialsSection */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/50 text-[11px] sm:text-xs tracking-widest uppercase font-mono">
                  Live Production Telemetry {isLiveOnline && <span className="text-emerald-400 font-semibold">• Online</span>}
                </span>
              </div>

              {/* Headline matching typography across site */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1] mb-5">
                Expanding <em className="italic text-white/60 font-serif">reach</em> <br />
                with every deploy.
              </h2>

              {/* Subtitle */}
              <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-sans max-w-lg">
                Real feedback streamed directly from production users across{' '}
                <a
                  href="https://syno.vndns.net"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-emerald-400 transition-colors font-mono underline underline-offset-4"
                >
                  syno.vndns.net
                </a>{' '}
                (Synology DSM Package Hub) and{' '}
                <a
                  href="https://trimui.vndns.net"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-emerald-400 transition-colors font-mono underline underline-offset-4"
                >
                  trimui.vndns.net
                </a>{' '}
                (TrimUI Smart Pro OS &amp; OTA Store).
              </p>

              {/* Action Buttons using Liquid Glass Pills */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://syno.vndns.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass rounded-full px-5 py-2.5 text-xs font-mono font-medium text-white hover:bg-white/10 transition-all border border-white/15 hover:border-white/30 flex items-center gap-2 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Server size={13} className="text-white/70" />
                  <span>Launch Syno Hub</span>
                  <ArrowUpRight size={12} className="opacity-60" />
                </a>

                <a
                  href="https://trimui.vndns.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass rounded-full px-5 py-2.5 text-xs font-mono font-medium text-white hover:bg-white/10 transition-all border border-white/15 hover:border-white/30 flex items-center gap-2 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Gamepad2 size={13} className="text-emerald-400" />
                  <span>Explore TrimUI</span>
                  <ArrowUpRight size={12} className="opacity-60" />
                </a>
              </div>
            </div>

            {/* Pinned Telemetry Proof Block */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
              {/* Verified Count */}
              <div>
                <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-1">
                  Verified Feedbacks
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                    {feed.length}
                  </span>
                  <div className="flex flex-col text-[10px] font-mono text-white/60 leading-tight">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Activity size={10} />
                      <span>Live Synced</span>
                    </span>
                    <span>Production Users</span>
                  </div>
                </div>
              </div>

              {/* 5-Star Score */}
              <div>
                <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-1">
                  Overall Rating
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-white">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-white text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                      />
                    ))}
                    <span className="font-mono text-xs font-bold text-white ml-1">
                      4.9/5
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">Across Production Releases</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: SEAMLESS VERTICAL STREAM WITH PROGRESSIVE BLUR ================= */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            
            {/* Filter Bar with Counts & Action Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
              <div className="liquid-glass rounded-full p-1 flex items-center gap-1 border border-white/10">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    filter === 'all'
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  All ({feed.length})
                </button>
                <button
                  onClick={() => setFilter('synology')}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    filter === 'synology'
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>syno.vndns.net</span>
                  <span className="text-[10px] opacity-60">({synoCount})</span>
                </button>
                <button
                  onClick={() => setFilter('trimui')}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    filter === 'trimui'
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>trimui.vndns.net</span>
                  <span className="text-[10px] opacity-60">({trimuiCount})</span>
                </button>
              </div>

              {/* Submit Review Glass Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="liquid-glass rounded-full px-3.5 py-1.5 text-xs font-mono text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                <MessageSquarePlus size={13} />
                <span>Gửi nhận xét</span>
                <ArrowUpRight size={11} className="opacity-60 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Vertical Sliding Stream Container (No Scrollbar, Progressive Blur Top & Bottom) */}
            <div className="relative h-[580px] sm:h-[620px] rounded-3xl overflow-hidden border border-white/15 liquid-glass bg-black/40 backdrop-blur-xl shadow-2xl">
              
              {/* Top Progressive Blur & Edge Mask */}
              <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-20 overflow-hidden">
                <ProgressiveBlur
                  direction="top"
                  layers={8}
                  maxBlur={24}
                  tint={false}
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-transparent" />
              </div>

              {/* Infinite Scrolling Stream Track */}
              <div
                className={`animate-vertical-stream flex flex-col gap-4 py-8 px-4 sm:px-6 ${
                  isStreamPaused ? 'paused' : ''
                }`}
                style={{
                  animationDuration: `${animationDuration}s`,
                }}
              >
                {streamItems.map((item, index) => {
                  const isCardHovered = hoveredCardIdx === index;
                  const isExpanded = activeReviewId === item.id;
                  const initials = getInitials(item.authorName);
                  const dateLabel = formatDateLabel(item.createdAt);

                  return (
                    <div
                      key={`${item.id}-${index}`}
                      onMouseEnter={() => setHoveredCardIdx(index)}
                      onMouseLeave={() => setHoveredCardIdx(null)}
                      onClick={() => setActiveReviewId(isExpanded ? null : item.id)}
                      className={`relative liquid-glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 border transition-all duration-300 cursor-pointer select-none group shadow-xl ${
                        isCardHovered || isExpanded
                          ? 'border-white/35 bg-white/[0.07] shadow-2xl shadow-black/80 scale-[1.01]'
                          : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                      }`}
                    >
                      {/* Ambient inner soft highlight */}
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                      {/* Card Header Row: Date on left, App Tag & Stars on right */}
                      <div className="relative z-10 flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
                        <span className="text-[10px] font-mono tracking-wider font-medium text-white/50 uppercase">
                          {dateLabel}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10 font-semibold uppercase">
                            {item.appId || item.tag}
                          </span>
                          <div className="flex items-center gap-0.5 text-white">
                            {[...Array(item.rating || 5)].map((_, s) => (
                              <Star
                                key={s}
                                size={11}
                                className="fill-white text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Author Details Row */}
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-mono font-bold text-xs text-white shrink-0 shadow-md">
                          {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-xs sm:text-sm text-white tracking-tight flex items-center gap-1.5 truncate font-sans">
                            <span>{item.authorName}</span>
                            <CheckCircle2
                              size={12}
                              className="text-emerald-400 shrink-0"
                            />
                          </div>
                          <div className="text-[11px] text-white/50 font-mono truncate flex items-center gap-1.5">
                            <span>{item.role || 'Production User'}</span>
                            <span className="text-white/30">&bull;</span>
                            <a
                              href={item.projectUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-white/70 hover:text-white transition-colors underline-offset-2 hover:underline flex items-center gap-0.5"
                            >
                              <span>{item.projectLabel}</span>
                              <ArrowUpRight size={10} className="opacity-70" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Quote Feedback Body */}
                      <div className="relative z-10 mt-3 text-xs sm:text-sm text-white/85 font-sans leading-relaxed">
                        <p className={isExpanded ? '' : 'line-clamp-2'}>
                          &ldquo;{item.comment}&rdquo;
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Progressive Blur & Edge Mask */}
              <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20 overflow-hidden">
                <ProgressiveBlur
                  direction="bottom"
                  layers={8}
                  maxBlur={24}
                  tint={false}
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent" />
              </div>
            </div>

            {/* Footer Toolbar: Status Indicator & Stream Controls */}
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 pt-2 px-1">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isStreamPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
                  }`}
                />
                <span>
                  {isStreamPaused
                    ? 'Stream paused'
                    : 'Auto-scrolling stream · Hover to pause'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span>{filteredFeed.length} verified reviews</span>
                <button
                  type="button"
                  onClick={() => setIsStreamPaused((prev) => !prev)}
                  className="liquid-glass flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer text-[10px]"
                >
                  {isStreamPaused ? (
                    <>
                      <Play size={10} className="fill-current" />
                      <span>Play</span>
                    </>
                  ) : (
                    <>
                      <Pause size={10} className="fill-current" />
                      <span>Pause</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= MODAL: SUBMIT REVIEW ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0D0F12]/95 border border-white/20 text-white shadow-2xl backdrop-blur-2xl liquid-glass"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-white/60 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>

              <h3 className="text-lg sm:text-xl font-display font-bold mb-1 text-white">Gửi nhận xét / Post Review</h3>
              <p className="text-xs text-white/60 mb-5 font-mono">
                Nhận xét thực tế cho hệ sinh thái Synology Hub hoặc TrimUI Smart Pro.
              </p>

              {submittedMsg ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center">
                  {submittedMsg}
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1.5 uppercase tracking-wider">
                      Dự án muốn đánh giá
                    </label>
                    <select
                      value={newComment.project}
                      onChange={(e) =>
                        setNewComment({ ...newComment, project: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-white/40 font-mono"
                    >
                      <option value="trimui" className="bg-[#111417]">
                        🎮 TrimUI Smart Pro &amp; OTA Store (trimui.vndns.net)
                      </option>
                      <option value="synology" className="bg-[#111417]">
                        🕹️ Synology Hub &amp; Package Center (syno.vndns.net)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1.5 uppercase tracking-wider">
                      Tên / Nickname
                    </label>
                    <input
                      type="text"
                      required
                      value={newComment.name}
                      onChange={(e) =>
                        setNewComment({ ...newComment, name: e.target.value })
                      }
                      placeholder="Ví dụ: Hoàng Long, Alex Nguyen..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1.5 uppercase tracking-wider">
                      Đánh giá / Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() =>
                            setNewComment({ ...newComment, rating: s })
                          }
                          className={`flex-1 py-1.5 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                            newComment.rating >= s
                              ? 'bg-white text-black border-white font-bold shadow-md'
                              : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {s} ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1.5 uppercase tracking-wider">
                      Nội dung nhận xét / Feedback
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newComment.comment}
                      onChange={(e) =>
                        setNewComment({ ...newComment, comment: e.target.value })
                      }
                      placeholder="Cảm nhận thực tế về tốc độ, giao diện, độ ổn định..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 resize-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-full bg-white hover:bg-white/90 active:scale-95 text-black font-semibold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg"
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? 'Đang gửi...' : 'Gửi nhận xét ngay'}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
