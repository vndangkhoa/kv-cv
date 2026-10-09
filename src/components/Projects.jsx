import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, ArrowUpRight, Loader2, AlertTriangle,
  LayoutGrid, LayoutList, Layers, ChevronDown, ChevronUp, Filter, Copy, Check, Sparkles,
  RefreshCw, GitBranch
} from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Reveal from './ui/Reveal';
import StickyProjectsGallery from './StickyProjectsGallery';
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
  Unknown: '#FFFFFF',
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
        <div className="relative w-full shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden mb-3 aspect-[16/10] bg-black border border-white/10 shadow-lg">
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
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
              <span className="font-display font-black text-4xl text-white/20">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Floating Top Category Chip */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-medium text-white uppercase tracking-wider shadow-sm">
              {project.category}
            </span>
          </div>

          {/* Floating Year Chip */}
          {project.year && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/80">
                {project.year}
              </span>
            </div>
          )}

          {/* Hover Overlay Action Bar */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-3.5 py-1.5 text-xs font-mono font-bold shadow-md shadow-white/20">
              View Case Study <ArrowUpRight size={13} />
            </span>

            <button
              onClick={copyLink}
              title="Copy Case Study URL"
              className="h-8 w-8 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            >
              {copied ? <Check size={13} className="text-white" /> : <Copy size={13} />}
            </button>
          </div>
        </div>

        {/* Text Details */}
        <div className="flex flex-col flex-1 px-1 pt-1 pb-2">
          <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-white/80 transition-colors leading-snug line-clamp-1 mb-1">
            {project.title}
          </h3>
          <p className="text-xs text-white/60 line-clamp-2 leading-relaxed font-sans font-normal">
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
        <div className={`relative overflow-hidden h-full p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-black border transition-all duration-300 flex flex-col justify-between shadow-lg ${
          isHighlighted
            ? 'border-white/30 ring-1 ring-white/20 shadow-white/5 bg-gradient-to-b from-white/[0.06] via-black to-black'
            : 'border-white/10 group-hover:border-white/30'
        }`}>
          {/* Subtle Ambient Corner Glow for Highlighted Works */}
          {isHighlighted && (
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          )}

          <div>
            {/* Top Language Badge & Highlight Tag */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}80` }}
                />
                <span className="font-mono text-xs font-bold text-white">
                  {repo.language || 'Code'}
                </span>

                {isHighlighted && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono font-medium text-white uppercase tracking-wider shadow-sm">
                    <Sparkles size={10} className="animate-pulse" /> HIGHLIGHT
                  </span>
                )}
              </div>
            </div>

            {/* Repo Name */}
            <h3 className="font-mono font-bold text-base sm:text-lg text-white group-hover:text-white/80 transition-colors mb-2 line-clamp-1 flex items-center gap-2">
              <span>{repo.name}</span>
            </h3>

            {/* Repo Description */}
            <p className="text-xs text-white/60 leading-relaxed line-clamp-3 mb-4 font-sans font-normal">
              {repo.description}
            </p>
          </div>

          {/* Footer Action Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
            <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-white/80 group-hover:text-white group-hover:translate-x-0.5 transition-transform">
              Explore Source <ExternalLink size={12} />
            </span>

            <button
              onClick={copyUrl}
              title="Copy Repo URL"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-all cursor-pointer"
            >
              {copied ? <Check size={13} className="text-white" /> : <Copy size={13} />}
            </button>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

/* Compact List Row View */
function CompactListRow({ item, isCreative, index }) {
  const color = !isCreative ? (LANGUAGE_COLORS[item.language] || LANGUAGE_COLORS.Unknown) : '#FFFFFF';
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
        className={`p-4 rounded-2xl liquid-glass border hover:border-white/30 hover:bg-white/[0.03] flex items-center justify-between gap-4 transition-all group block shadow-sm ${
          isHighlighted ? 'border-white/30' : 'border-white/10'
        }`}
      >
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 shrink-0"
            style={{ backgroundColor: `${color}15` }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className={`font-bold text-sm truncate ${isCreative ? 'font-display' : 'font-mono'} text-white group-hover:text-white/80 transition-colors`}>
                {isCreative ? item.title : item.name}
              </h4>
              {isHighlighted && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white uppercase font-mono font-medium tracking-wider shrink-0">
                  HIGHLIGHT
                </span>
              )}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10 uppercase font-mono tracking-wider shrink-0">
                {isCreative ? item.category : item.language}
              </span>
            </div>
            <p className="text-xs text-white/60 truncate max-w-xl font-sans">
              {item.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 text-xs font-mono text-white/50">
          <span className="inline-flex items-center gap-1 text-xs text-white/80 group-hover:text-white font-medium group-hover:translate-x-1 transition-transform">
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
  const [viewMode, setViewMode] = useState('stack'); // 'stack' (Orange Horse) | 'grid' | 'list'

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
    <section id="work" className="relative py-16 sm:py-28 md:py-36 bg-black text-white">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 md:px-8">
        <Reveal>
          <div className="mb-3 sm:mb-4">
            <span className="text-white/40 text-[10px] sm:text-xs md:text-sm tracking-widest uppercase font-mono">
              Selected Works & Deployments
            </span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white font-serif">
                {isCreative ? (
                  <>
                    Creative <em className="italic text-white/60">Case Studies</em>
                  </>
                ) : (
                  <>
                    Code, <em className="italic text-white/60">Shipped</em>
                  </>
                )}
              </h2>
            </div>

            <p className="max-w-md text-white/60 text-xs sm:text-sm leading-relaxed font-normal">
              {isCreative
                ? 'Live feed synchronized from portfolio — AI fashion workflows, cinematic video creation, and brand identities.'
                : 'Production services synchronized from GitHub & Forgejo — Kotlin Multiplatform, Go streaming engines, Rust backends, and AI image tooling.'}
            </p>
          </div>
        </Reveal>

        {/* Liquid-Glass Filter Capsule Bar & Prominent View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-white/10">
          {/* Scrollable Filter Capsules */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto custom-scrollbar py-1">
            {filters.map((filter) => {
              const active = selectedFilter === filter;
              const color = !isCreative && filter !== 'All' ? LANGUAGE_COLORS[filter] : null;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono transition-all duration-200 shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'liquid-glass text-white/70 hover:text-white border border-white/10 hover:border-white/25'
                  }`}
                >
                  {color && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />}
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Action Toolbar: Prominent View Mode Switcher + Sync Button */}
          <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 shrink-0">
            {/* View Mode Toggle Switch (Slide Deck | Grid | List) */}
            <div className="flex items-center gap-1 liquid-glass border border-white/20 rounded-full p-1 bg-black/60 shadow-xl backdrop-blur-xl">
              <button
                onClick={() => setViewMode('stack')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs md:text-sm font-mono font-semibold transition-all duration-200 cursor-pointer ${
                  viewMode === 'stack'
                    ? 'bg-white text-black shadow-md scale-105'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                title="Orange Horse Slide Deck View"
              >
                <Layers size={14} />
                <span>Deck</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs md:text-sm font-mono font-semibold transition-all duration-200 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-black shadow-md scale-105'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                title="Grid View (MotionCards)"
              >
                <LayoutGrid size={14} />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs md:text-sm font-mono font-semibold transition-all duration-200 cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-black shadow-md scale-105'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                title="List View"
              >
                <LayoutList size={14} />
                <span>List</span>
              </button>
            </div>

            {/* Quick Sync Button */}
            <button
              onClick={() => {
                if (isCreative) refreshPortfolio();
                else refreshGithub();
              }}
              disabled={wpLoading || repoLoading}
              title={isCreative ? "Sync portfolio feed" : "Sync GitHub feed"}
              className="liquid-glass inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono text-white/70 hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={13} className={wpLoading || repoLoading ? 'animate-spin text-white' : ''} />
              <span className="hidden sm:inline">{isCreative ? 'Sync' : 'Sync'}</span>
            </button>
          </div>
        </div>

        {/* Showcase Grid / List / Stack Content */}
        <div
          key={`${tab}-${selectedFilter}-${viewMode}`}
          className="w-full transition-opacity duration-300"
        >
            {isCreative ? (
              wpLoading && creativeProjects.length === 0 ? (
                <div className="flex items-center justify-center py-20 text-white/50 font-mono text-sm">
                  <Loader2 className="animate-spin mr-3 text-white" /> Loading live portfolio feed…
                </div>
              ) : wpError && creativeProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <AlertTriangle className="mb-3 text-white/60" />
                  <p className="text-white/70 text-sm">Could not load the portfolio feed right now.</p>
                </div>
              ) : visibleList.length === 0 ? (
                <p className="text-center py-20 text-white/50 font-mono text-sm">
                  No projects matching "{selectedFilter}".
                </p>
              ) : viewMode === 'stack' ? (
                <StickyProjectsGallery items={visibleList} isCreative={true} />
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
              <div className="flex items-center justify-center py-20 text-white/50 font-mono text-sm">
                <Loader2 className="animate-spin mr-3 text-white" /> Fetching repos from Forgejo…
              </div>
            ) : visibleList.length === 0 ? (
              <p className="text-center py-20 text-white/50 font-mono text-sm">
                No repositories matching "{selectedFilter}".
              </p>
            ) : viewMode === 'stack' ? (
              <StickyProjectsGallery items={visibleList} isCreative={false} />
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
          </div>

        {/* Bottom Actions: Expand/Collapse & Dedicated Fetching Controls */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4">
          {filteredList.length > INITIAL_SHOW_COUNT && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="liquid-glass text-xs sm:text-sm font-mono font-medium text-white/80 hover:text-white group py-2.5 px-6 rounded-full border border-white/15 shadow-sm cursor-pointer hover:bg-white/10 transition-all"
            >
              {expanded ? (
                <span className="flex items-center gap-2">
                  <span>Show less</span>
                  <ChevronUp size={16} className="transition-transform group-hover:-translate-y-0.5 text-white" />
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Expand to view all ({filteredList.length} items)</span>
                  <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5 text-white" />
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
                    className="liquid-glass inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 text-xs font-mono font-medium text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {wpLoading ? <Loader2 size={13} className="animate-spin text-white" /> : <Sparkles size={13} />}
                    <span>{wpLoading ? 'Fetching more…' : 'Fetch more from WordPress API'}</span>
                  </button>
                )}

                <button
                  onClick={refreshPortfolio}
                  disabled={wpLoading}
                  className="liquid-glass inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-xs font-mono text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-50"
                  title="Re-fetch all Portfolio projects from WordPress API"
                >
                  <RefreshCw size={13} className={wpLoading ? 'animate-spin text-white' : ''} />
                  <span>{wpLoading ? 'Syncing Portfolio…' : 'Re-fetch Portfolio'}</span>
                </button>

                <button
                  onClick={() => {
                    if (onTabChange) onTabChange('dev');
                    refreshGithub();
                  }}
                  disabled={repoLoading}
                  className="liquid-glass inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-xs font-mono text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-50"
                  title="Switch to IT persona & Fetch GitHub Repos"
                >
                  <GitBranch size={13} className={repoLoading ? 'animate-spin text-white' : ''} />
                  <span>{repoLoading ? 'Fetching GitHub…' : 'Fetch GitHub Repos'}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={refreshGithub}
                  disabled={repoLoading}
                  className="liquid-glass inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 text-xs font-mono font-medium text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
                  title="Fetch latest repositories from GitHub API"
                >
                  <RefreshCw size={13} className={repoLoading ? 'animate-spin text-white' : ''} />
                  <span>{repoLoading ? 'Fetching repositories from GitHub…' : 'Fetch latest from GitHub API'}</span>
                </button>

                <button
                  onClick={() => {
                    if (onTabChange) onTabChange('creative');
                    refreshPortfolio();
                  }}
                  disabled={wpLoading}
                  className="liquid-glass inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-xs font-mono text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-50"
                  title="Switch to Creative persona & Fetch Portfolio Posts"
                >
                  <Sparkles size={13} className={wpLoading ? 'animate-spin text-white' : ''} />
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
