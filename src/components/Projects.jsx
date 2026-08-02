import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, ArrowUpRight, Star, GitFork, Loader2, AlertTriangle,
  LayoutGrid, LayoutList, ChevronDown, ChevronUp, Filter
} from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Reveal from './ui/Reveal';
import { usePortfolioPosts, transformToProject } from '../hooks/usePortfolioPosts';
import { useForgejoRepos } from '../hooks/useForgejoRepos';

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

/* Grid Card for Creative Project */
function CreativeProjectCard({ project, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: (index % 4) * 0.05 }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="block h-full"
      >
        <GlassCard className="group overflow-hidden h-full hover:-translate-y-1 transition-all duration-300">
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-emerald-950/20 to-slate-900">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00FF87]/10 to-cyan-400/10">
                <span className="font-display font-black text-5xl text-[var(--text-muted)]/30">{String(index + 1).padStart(2, '0')}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00FF87] text-[#0A0D0B] px-3.5 py-1.5 text-xs font-bold shadow-md shadow-[#00FF87]/30">
                View case study <ArrowUpRight size={13} />
              </span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-[11px] uppercase tracking-wider text-[#00FF87] font-semibold">{project.category}</span>
              <span className="text-xs text-[var(--text-muted)]">{project.year}</span>
            </div>
            <h3 className="font-display font-bold text-base leading-snug mb-1.5 line-clamp-2 group-hover:text-[#00FF87] transition-colors">{project.title}</h3>
            <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">{project.description}</p>
          </div>
        </GlassCard>
      </a>
    </motion.div>
  );
}

/* Grid Card for Dev Repo */
function DevProjectCard({ repo, index }) {
  const color = LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.Unknown;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: (index % 4) * 0.05 }}
    >
      <a
        href={repo.htmlUrl}
        target="_blank"
        rel="noreferrer"
        className="block h-full"
      >
        <GlassCard className="group h-full p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 border border-[var(--border)]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border)] transition-transform group-hover:scale-110 shrink-0"
                style={{ backgroundColor: `${color}1a` }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              </span>
              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1"><Star size={12} className="text-amber-400" /> {repo.stars || 0}</span>
                <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks || 0}</span>
              </div>
            </div>

            <h3 className="font-mono font-bold text-sm mb-1.5 group-hover:text-[#00FF87] transition-colors line-clamp-1">
              {repo.name}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
              {repo.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] mt-auto">
            <span className="text-[11px] font-mono font-semibold" style={{ color }}>{repo.language || 'Unknown'}</span>
            <span className="inline-flex items-center gap-1 text-xs text-[#00FF87] font-medium group-hover:translate-x-0.5 transition-transform">
              Source <ExternalLink size={12} />
            </span>
          </div>
        </GlassCard>
      </a>
    </motion.div>
  );
}

/* Compact List Row for Dev / Creative */
function CompactListRow({ item, isCreative, index }) {
  const color = !isCreative ? (LANGUAGE_COLORS[item.language] || LANGUAGE_COLORS.Unknown) : '#00FF87';
  const url = isCreative ? item.link : item.htmlUrl;

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
        className="glass-card p-3.5 md:p-4 flex items-center justify-between gap-4 hover:border-[#00FF87]/40 hover:bg-[var(--accent-subtle)] transition-all group rounded-xl block"
      >
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border)] shrink-0"
            style={{ backgroundColor: `${color}1a` }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className={`font-bold text-sm truncate ${isCreative ? 'font-display' : 'font-mono'} group-hover:text-[#00FF87] transition-colors`}>
                {isCreative ? item.title : item.name}
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-subtle)] text-[var(--text-muted)] border border-[var(--border)] uppercase font-mono tracking-wider shrink-0">
                {isCreative ? item.category : item.language}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] truncate max-w-xl">
              {item.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 text-xs text-[var(--text-muted)]">
          {!isCreative && (
            <div className="hidden sm:flex items-center gap-3 font-mono">
              <span className="flex items-center gap-1"><Star size={12} className="text-amber-400" /> {item.stars || 0}</span>
              <span className="flex items-center gap-1"><GitFork size={12} /> {item.forks || 0}</span>
            </div>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-[#00FF87] font-semibold group-hover:translate-x-1 transition-transform">
            View <ExternalLink size={13} />
          </span>
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects({ tab }) {
  const isCreative = tab === 'creative';

  const { posts, loading: wpLoading, error: wpError, hasMore, loadMore } = usePortfolioPosts({ perPage: 12 });
  const { repos, languages, loading: repoLoading } = useForgejoRepos();

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

  // Slice based on expanded status
  const visibleList = expanded ? filteredList : filteredList.slice(0, INITIAL_SHOW_COUNT);

  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-gradient-to-r from-[#00FF87] to-cyan-400" />
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Selected Work</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
                {isCreative ? (
                  <>
                    Creative <em className="serif-accent">case studies</em>
                  </>
                ) : (
                  <>
                    Code, <em className="serif-accent">shipped</em>
                  </>
                )}
              </h2>
            </div>

            <p className="max-w-sm text-[var(--text-secondary)] text-xs md:text-sm">
              {isCreative
                ? 'Live from WordPress portfolio — AI art, motion, and brand work.'
                : 'Live from Forgejo — production apps, microservices, and infrastructure.'}
            </p>
          </div>
        </Reveal>

        {/* Filter Bar & View Toggle Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--border)]">
          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto custom-scrollbar py-1">
            <span className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1 mr-1 shrink-0">
              <Filter size={13} /> Filter:
            </span>
            {filters.map((filter) => {
              const active = selectedFilter === filter;
              const color = !isCreative && filter !== 'All' ? LANGUAGE_COLORS[filter] : null;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 shrink-0 ${
                    active
                      ? 'bg-[#00FF87] text-[#0A0D0B] font-extrabold shadow-md shadow-[#00FF87]/30'
                      : 'bg-[var(--accent-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
                  }`}
                >
                  {color && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />}
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Grid vs List View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[var(--glass-bg)] border border-[var(--border)] rounded-xl p-1 backdrop-blur-md shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#00FF87]/20 text-[#00FF87]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#00FF87]/20 text-[#00FF87]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title="Compact List View"
            >
              <LayoutList size={16} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${selectedFilter}-${viewMode}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {isCreative ? (
              wpLoading && creativeProjects.length === 0 ? (
                <div className="flex items-center justify-center py-16 text-[var(--text-muted)]">
                  <Loader2 className="animate-spin mr-3 text-[#00FF87]" /> Loading portfolio feed…
                </div>
              ) : wpError && creativeProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <AlertTriangle className="mb-3 text-amber-500" />
                  <p className="text-[var(--text-secondary)] text-sm">Could not load the portfolio feed right now.</p>
                </div>
              ) : visibleList.length === 0 ? (
                <p className="text-center py-16 text-[var(--text-muted)] text-sm">No projects matching "{selectedFilter}".</p>
              ) : viewMode === 'grid' ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {visibleList.map((project, i) => (
                    <CreativeProjectCard
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
              <div className="flex items-center justify-center py-16 text-[var(--text-muted)]">
                <Loader2 className="animate-spin mr-3 text-[#00FF87]" /> Fetching repos from Forgejo…
              </div>
            ) : visibleList.length === 0 ? (
              <p className="text-center py-16 text-[var(--text-muted)] text-sm">No repositories matching "{selectedFilter}".</p>
            ) : viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleList.map((repo, i) => (
                  <DevProjectCard
                    key={repo.id}
                    repo={repo}
                    index={i}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2.5">
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

        {/* Expand to View / Collapse Toggle Controls */}
        {filteredList.length > INITIAL_SHOW_COUNT && (
          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="btn-glass text-xs md:text-sm font-semibold group py-2.5 px-6 shadow-sm"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
                </>
              ) : (
                <>
                  Expand to view all ({filteredList.length} items){' '}
                  <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5" />
                </>
              )}
            </button>

            {isCreative && hasMore && expanded && !wpLoading && (
              <button onClick={loadMore} className="text-xs text-[#00FF87] hover:underline mt-2">
                Fetch more from WordPress API
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
