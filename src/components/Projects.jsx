import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, ArrowUpRight, Loader2, AlertTriangle,
  LayoutGrid, LayoutList, ChevronDown, ChevronUp, Filter, Copy, Check, Sparkles,
  RefreshCw, GitBranch
} from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Reveal from './ui/Reveal';
import { usePortfolioPosts, transformToProject } from '../hooks/usePortfolioPosts';
import { useForgejoRepos } from '../hooks/useForgejoRepos';

const HIGHLIGHT_REPOS = ['kv-synology', 'vietc', 'kv-file'];

const LANGUAGE_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Go: '#00add8',
  Rust: '#dea584',
  Python: '#3572A5',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#2496ed',
  Vue: '#41b883',
  Unknown: '#00FF87',
};

const INITIAL_SHOW_COUNT = 6;

/* MotionSites-style Creative Project Card */
function CreativeMotionCard({ project, index }) {
  const [copied, setCopied] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const copyLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(project.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
      className="prompt-card-hover group flex flex-col cursor-pointer"
    >
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="block h-full flex flex-col"
      >
        {/* Full-Bleed Media Container */}
        <div className="relative w-full shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden mb-3 aspect-[16/10] bg-[#121815] border border-[var(--border)] shadow-lg">
          {/* Shimmer Placeholder */}
          {!imgLoaded && (
            <div className="absolute inset-0 shimmer-box bg-white/5" />
          )}

          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover object-top prompt-media-zoom transition-all duration-700 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                setImgLoaded(true);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00FF87]/15 to-[#00E5FF]/10">
              <span className="font-display font-black text-4xl text-white/20">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Floating Top Category Chip */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-[#00FF87] uppercase tracking-wider shadow-sm">
              {project.category}
            </span>
          </div>

          {/* Floating Year Chip */}
          {project.year && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/80">
                {project.year}
              </span>
            </div>
          )}

          {/* Hover Overlay Action Bar */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0B] via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00FF87] text-[#0A0D0B] px-3.5 py-1.5 text-xs font-mono font-extrabold shadow-md shadow-[#00FF87]/40">
              View Case Study <ArrowUpRight size={13} />
            </span>

            <button
              onClick={copyLink}
              title="Copy Case Study URL"
              className="h-8 w-8 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            >
              {copied ? <Check size={13} className="text-[#00FF87]" /> : <Copy size={13} />}
            </button>
          </div>
        </div>

        {/* Text Details */}
        <div className="flex flex-col flex-1 px-1 pt-1 pb-2">
          <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] group-hover:text-emerald-600 dark:group-hover:text-[#00FF87] transition-colors leading-snug line-clamp-1 mb-1">
            {project.title}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed font-sans font-normal">
            {project.description}
          </p>
        </div>
      </a>
    </motion.div>
  );
}

/* MotionSites-style Dev Repo Card */
function DevMotionCard({ repo, index }) {
  const [copied, setCopied] = useState(false);
  const color = LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.Unknown;
  const isHighlighted = HIGHLIGHT_REPOS.includes(repo.name);

  const copyUrl = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(repo.htmlUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
      className="prompt-card-hover group flex flex-col h-full cursor-pointer"
    >
      <a
        href={repo.htmlUrl}
        target="_blank"
        rel="noreferrer"
        className="block h-full"
      >
        <div className={`relative overflow-hidden h-full p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[var(--glass-bg)] border transition-all duration-300 flex flex-col justify-between shadow-lg ${
          isHighlighted
            ? 'border-emerald-500/60 dark:border-[#00FF87]/60 ring-1 ring-emerald-500/30 dark:ring-[#00FF87]/30 shadow-emerald-500/10 dark:shadow-[#00FF87]/15 bg-gradient-to-b from-[#00FF87]/[0.06] via-[var(--glass-bg)] to-[var(--glass-bg)]'
            : 'border-[var(--glass-border)] group-hover:border-[#00FF87]/40'
        }`}>
          {/* Subtle Ambient Corner Glow for Highlighted Works */}
          {isHighlighted && (
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#00FF87]/15 dark:bg-[#00FF87]/20 rounded-full blur-2xl pointer-events-none" />
          )}

          <div>
            {/* Top Language Badge & Highlight Tag */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}80` }}
                />
                <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                  {repo.language || 'Code'}
                </span>

                {isHighlighted && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#00FF87]/20 to-[#00E5FF]/20 border border-emerald-500/40 dark:border-[#00FF87]/50 text-[10px] font-mono font-extrabold text-emerald-700 dark:text-[#00FF87] uppercase tracking-wider shadow-sm">
                    <Sparkles size={10} className="animate-pulse" /> HIGHLIGHT
                  </span>
                )}
              </div>
            </div>

            {/* Repo Name */}
            <h3 className="font-mono font-bold text-base sm:text-lg text-[var(--text-primary)] group-hover:text-emerald-600 dark:group-hover:text-[#00FF87] transition-colors mb-2 line-clamp-1 flex items-center gap-2">
              <span>{repo.name}</span>
            </h3>

            {/* Repo Description */}
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-4 font-sans font-normal">
              {repo.description}
            </p>
          </div>

          {/* Footer Action Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] mt-auto">
            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 dark:text-[#00FF87] group-hover:translate-x-0.5 transition-transform">
              Explore Source <ExternalLink size={12} />
            </span>

            <button
              onClick={copyUrl}
              title="Copy Repo URL"
              className="p-1.5 rounded-lg bg-[var(--accent-subtle)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            >
              {copied ? <Check size={13} className="text-[#00FF87]" /> : <Copy size={13} />}
            </button>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

/* Compact List Row View */
function CompactListRow({ item, isCreative, index }) {
  const color = !isCreative ? (LANGUAGE_COLORS[item.language] || LANGUAGE_COLORS.Unknown) : '#00FF87';
  const url = isCreative ? item.link : item.htmlUrl;
  const isHighlighted = !isCreative && HIGHLIGHT_REPOS.includes(item.name);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, delay: (index % 6) * 0.03 }}
    >
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`p-4 rounded-2xl bg-[var(--glass-bg)] border hover:border-[#00FF87]/40 hover:bg-[var(--accent-subtle)] flex items-center justify-between gap-4 transition-all group block shadow-sm ${
          isHighlighted ? 'border-emerald-500/50 dark:border-[#00FF87]/50' : 'border-[var(--glass-border)]'
        }`}
      >
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--border)] shrink-0"
            style={{ backgroundColor: `${color}15` }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className={`font-bold text-sm truncate ${isCreative ? 'font-display' : 'font-mono'} text-[var(--text-primary)] group-hover:text-emerald-600 dark:group-hover:text-[#00FF87] transition-colors`}>
                {isCreative ? item.title : item.name}
              </h4>
              {isHighlighted && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00FF87]/15 border border-[#00FF87]/40 text-emerald-700 dark:text-[#00FF87] uppercase font-mono font-bold tracking-wider shrink-0">
                  HIGHLIGHT
                </span>
              )}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-subtle)] text-[var(--text-muted)] border border-[var(--border)] uppercase font-mono tracking-wider shrink-0">
                {isCreative ? item.category : item.language}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] truncate max-w-xl font-sans">
              {item.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 text-xs font-mono text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-[#00FF87] font-semibold group-hover:translate-x-1 transition-transform">
            View <ExternalLink size={13} />
          </span>
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects({ tab, onTabChange }) {
  const isCreative = tab === 'creative';

  const {
    posts,
    loading: wpLoading,
    error: wpError,
    hasMore,
    loadMore,
    refresh: refreshPortfolio,
  } = usePortfolioPosts({ perPage: 12 });

  const {
    repos,
    languages,
    loading: repoLoading,
    refresh: refreshGithub,
  } = useForgejoRepos();

  const creativeProjects = posts.map(transformToProject);
  const rawList = isCreative ? creativeProjects : repos;

  // Layout & Filter States
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [expanded, setExpanded] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Available Filters
  const filters = useMemo(() => {
    if (isCreative) {
      const cats = Array.from(new Set(creativeProjects.map(p => p.category).filter(Boolean)));
      return ['All', ...cats];
    } else {
      const langs = Object.keys(languages);
      return ['All', ...langs];
    }
  }, [isCreative, creativeProjects, languages]);

  // Filtered Items
  const filteredList = useMemo(() => {
    if (selectedFilter === 'All') return rawList;
    return rawList.filter(item => {
      if (isCreative) return item.category === selectedFilter;
      return item.language === selectedFilter;
    });
  }, [rawList, selectedFilter, isCreative]);

  // Sliced items
  const visibleList = expanded ? filteredList : filteredList.slice(0, INITIAL_SHOW_COUNT);

  return (
    <section id="work" className="relative py-20 sm:py-28 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="h-px w-8 bg-gradient-to-r from-[#00FF87] via-[#00E5FF] to-transparent" />
            <span className="badge-iridescent-text text-xs font-mono tracking-[0.25em]">
              03 // SELECTED PRODUCTION WORK
            </span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6 mb-8 sm:mb-12">
            <div>
              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[var(--text-primary)]">
                {isCreative ? (
                  <>
                    CREATIVE <span className="iridescent-text">CASE STUDIES</span>
                  </>
                ) : (
                  <>
                    CODE, <span className="iridescent-text">SHIPPED</span>
                  </>
                )}
              </h2>
            </div>

            <p className="max-w-md text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed font-normal">
              {isCreative
                ? 'Live feed synchronized from WordPress portfolio — AI fashion workflows, cinematic video creation, and brand identities.'
                : 'Production services synchronized from GitHub & Forgejo — Kotlin Multiplatform, Go streaming engines, Rust backends, and AI image tooling.'}
            </p>
          </div>
        </Reveal>

        {/* MotionSites-style Filter Capsule Bar, Fetch Buttons & Grid/List Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-8 pb-4 border-b border-[var(--border)]">
          {/* Scrollable Filter Capsules */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-1">
            {filters.map((filter) => {
              const active = selectedFilter === filter;
              const color = !isCreative && filter !== 'All' ? LANGUAGE_COLORS[filter] : null;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 shrink-0 cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-[#00FF87] to-[#00E5FF] text-[#0A0D0B] font-extrabold shadow-md shadow-[#00FF87]/30'
                      : 'bg-[var(--accent-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] border border-[var(--border)]'
                  }`}
                >
                  {color && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />}
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Action Toolbar: Fetch Buttons + View Mode Toggle Switch */}
          <div className="flex flex-wrap items-center self-end lg:self-auto gap-2 shrink-0">
            {/* Fetch Portfolio Button */}
            <button
              onClick={() => {
                if (!isCreative && onTabChange) onTabChange('creative');
                refreshPortfolio();
              }}
              disabled={wpLoading}
              title="Fetch latest case studies from Portfolio (WordPress API)"
              className={`btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-200 cursor-pointer border ${
                isCreative
                  ? 'bg-[#00FF87]/15 border-emerald-500/50 dark:border-[#00FF87]/50 text-emerald-700 dark:text-[#00FF87] shadow-sm shadow-[#00FF87]/20'
                  : 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#00FF87]/40'
              } disabled:opacity-50`}
            >
              <RefreshCw size={12} className={wpLoading ? 'animate-spin text-[#00FF87]' : isCreative ? 'text-[#00FF87]' : ''} />
              <span>{wpLoading ? 'Fetching Portfolio…' : 'Fetch Portfolio'}</span>
            </button>

            {/* Fetch GitHub Button */}
            <button
              onClick={() => {
                if (isCreative && onTabChange) onTabChange('dev');
                refreshGithub();
              }}
              disabled={repoLoading}
              title="Fetch latest repositories from GitHub API"
              className={`btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-200 cursor-pointer border ${
                !isCreative
                  ? 'bg-[#00FF87]/15 border-emerald-500/50 dark:border-[#00FF87]/50 text-emerald-700 dark:text-[#00FF87] shadow-sm shadow-[#00FF87]/20'
                  : 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#00FF87]/40'
              } disabled:opacity-50`}
            >
              <RefreshCw size={12} className={repoLoading ? 'animate-spin text-[#00FF87]' : !isCreative ? 'text-[#00FF87]' : ''} />
              <span>{repoLoading ? 'Fetching GitHub…' : 'Fetch GitHub'}</span>
            </button>

            {/* View Mode Toggle Switch */}
            <div className="flex items-center gap-1 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full p-1 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#00FF87] text-[#0A0D0B]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Grid View (MotionCards)"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-[#00FF87] text-[#0A0D0B]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="List View"
              >
                <LayoutList size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Showcase Grid / List Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${selectedFilter}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {isCreative ? (
              wpLoading && creativeProjects.length === 0 ? (
                <div className="flex items-center justify-center py-20 text-[var(--text-muted)] font-mono text-sm">
                  <Loader2 className="animate-spin mr-3 text-emerald-600 dark:text-[#00FF87]" /> Loading live portfolio feed…
                </div>
              ) : wpError && creativeProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <AlertTriangle className="mb-3 text-amber-500" />
                  <p className="text-[var(--text-secondary)] text-sm">Could not load the portfolio feed right now.</p>
                </div>
              ) : visibleList.length === 0 ? (
                <p className="text-center py-20 text-[var(--text-muted)] font-mono text-sm">
                  No projects matching "{selectedFilter}".
                </p>
              ) : viewMode === 'grid' ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {visibleList.map((project, i) => (
                    <CreativeMotionCard
                      key={project.id}
                      project={project}
                      index={i}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {visibleList.map((project, i) => (
                    <CompactListRow
                      key={project.id}
                      item={project}
                      isCreative={true}
                      index={i}
                    />
                  ))}
                </div>
              )
            ) : repoLoading && repos.length === 0 ? (
              <div className="flex items-center justify-center py-20 text-[var(--text-muted)] font-mono text-sm">
                <Loader2 className="animate-spin mr-3 text-emerald-600 dark:text-[#00FF87]" /> Fetching repos from Forgejo…
              </div>
            ) : visibleList.length === 0 ? (
              <p className="text-center py-20 text-[var(--text-muted)] font-mono text-sm">
                No repositories matching "{selectedFilter}".
              </p>
            ) : viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {visibleList.map((repo, i) => (
                  <DevMotionCard
                    key={repo.id}
                    repo={repo}
                    index={i}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {visibleList.map((repo, i) => (
                  <CompactListRow
                    key={repo.id}
                    item={repo}
                    isCreative={false}
                    index={i}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Actions: Expand/Collapse & Dedicated Fetching Controls */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4">
          {filteredList.length > INITIAL_SHOW_COUNT && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="btn-glass text-xs sm:text-sm font-bold group py-2.5 px-6 shadow-sm cursor-pointer"
            >
              {expanded ? (
                <span className="flex items-center gap-2">
                  <span>Show less</span>
                  <ChevronUp size={16} className="transition-transform group-hover:-translate-y-0.5 text-emerald-600 dark:text-[#00FF87]" />
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Expand to view all ({filteredList.length} items)</span>
                  <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5 text-emerald-600 dark:text-[#00FF87]" />
                </span>
              )}
            </button>
          )}

          {/* Dedicated Fetching Buttons for GitHub and Portfolio */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {isCreative ? (
              <>
                {hasMore && (
                  <button
                    onClick={loadMore}
                    disabled={wpLoading}
                    className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-subtle)] hover:bg-[var(--border)] border border-emerald-500/40 dark:border-[#00FF87]/40 text-xs font-mono font-bold text-emerald-700 dark:text-[#00FF87] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {wpLoading ? <Loader2 size={13} className="animate-spin text-[#00FF87]" /> : <Sparkles size={13} />}
                    <span>{wpLoading ? 'Fetching more…' : 'Fetch more from WordPress API'}</span>
                  </button>
                )}

                <button
                  onClick={refreshPortfolio}
                  disabled={wpLoading}
                  className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-bg)] hover:bg-[var(--accent-subtle)] border border-[var(--border)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer disabled:opacity-50"
                  title="Re-fetch all Portfolio projects from WordPress API"
                >
                  <RefreshCw size={13} className={wpLoading ? 'animate-spin text-[#00FF87]' : ''} />
                  <span>{wpLoading ? 'Syncing Portfolio…' : 'Re-fetch Portfolio'}</span>
                </button>

                <button
                  onClick={() => {
                    if (onTabChange) onTabChange('dev');
                    refreshGithub();
                  }}
                  disabled={repoLoading}
                  className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-bg)] hover:bg-[var(--accent-subtle)] border border-[var(--border)] text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer disabled:opacity-50"
                  title="Switch to IT persona & Fetch GitHub Repos"
                >
                  <GitBranch size={13} className={repoLoading ? 'animate-spin text-cyan-400' : ''} />
                  <span>{repoLoading ? 'Fetching GitHub…' : 'Fetch GitHub Repos'}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={refreshGithub}
                  disabled={repoLoading}
                  className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-subtle)] hover:bg-[var(--border)] border border-emerald-500/40 dark:border-[#00FF87]/40 text-xs font-mono font-bold text-emerald-700 dark:text-[#00FF87] transition-all cursor-pointer disabled:opacity-50 shadow-sm"
                  title="Fetch latest repositories from GitHub API"
                >
                  <RefreshCw size={13} className={repoLoading ? 'animate-spin text-[#00FF87]' : 'text-[#00FF87]'} />
                  <span>{repoLoading ? 'Fetching repositories from GitHub…' : 'Fetch latest from GitHub API'}</span>
                </button>

                <button
                  onClick={() => {
                    if (onTabChange) onTabChange('creative');
                    refreshPortfolio();
                  }}
                  disabled={wpLoading}
                  className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-bg)] hover:bg-[var(--accent-subtle)] border border-[var(--border)] text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer disabled:opacity-50"
                  title="Switch to Creative persona & Fetch Portfolio Posts"
                >
                  <Sparkles size={13} className={wpLoading ? 'animate-spin text-emerald-400' : ''} />
                  <span>{wpLoading ? 'Fetching Portfolio…' : 'Fetch Portfolio'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
