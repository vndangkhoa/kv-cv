import { useEffect, useRef, useState, Fragment } from 'react';
import { ExternalLink, ArrowUpRight, Copy, Check } from 'lucide-react';

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

const HIGHLIGHT_REPOS = ['kv-synology', 'vietc', 'kv-file'];

const KNOWN_SHORT_TITLES = {
  'gemini flash': 'Gemini Flash AI',
  'thạch sanh': 'Gemini Flash AI',
  'synology': 'Synology AI Apps',
  'viet+': 'Viet+ Native IME',
  'pink sword': 'Pink Sword',
  'music video': 'AI Music Video',
  'social commerce': 'Social Commerce AI',
};

function getShortTitle(item, isCreative) {
  if (!isCreative) {
    return item.name || 'Repository';
  }

  const raw = (item.title || '').trim();
  const lower = raw.toLowerCase();

  for (const [key, label] of Object.entries(KNOWN_SHORT_TITLES)) {
    if (lower.includes(key)) {
      return label;
    }
  }

  // Remove bracket tags: [Deep Dive], (2024), etc.
  let clean = raw.replace(/\[.*?\]|\(.*?\)/g, '').replace(/["'“”]/g, '').trim();

  // If there's a colon, select the punchy short phrase
  if (clean.includes(':')) {
    const parts = clean.split(':');
    const first = parts[0].trim();
    const second = parts[1]?.trim() || '';
    if (first.length >= 4 && first.length <= 18) {
      clean = first;
    } else if (second.length >= 4 && second.length <= 18) {
      clean = second;
    } else {
      clean = first;
    }
  }

  // Keep it short (max 18 characters)
  if (clean.length > 18) {
    const words = clean.split(' ');
    let result = '';
    for (const w of words) {
      if ((result + ' ' + w).trim().length <= 16) {
        result = (result + ' ' + w).trim();
      } else {
        break;
      }
    }
    clean = result || clean.slice(0, 16).trim() + '…';
  }

  return clean;
}

const clamp01 = (value) => Math.min(1, Math.max(0, value));

/* Creative Persona Vertical Showcase Slide */
function StickyCreativeVisual({ project, index, total }) {
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
    <div
      className="sticky-gallery__visual flex flex-col justify-between select-none"
      data-gallery-visual
    >
      {/* Upper Media Frame */}
      <div className="relative w-full h-[52%] sm:h-[60%] overflow-hidden bg-black group">
        {!imgLoaded && (
          <div className="absolute inset-0 shimmer-box bg-white/5" />
        )}

        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading={index <= 1 ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ imageRendering: '-webkit-optimize-contrast' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              setImgLoaded(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <span className="font-serif italic text-6xl text-white/20">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Floating Top Category & Year Badges */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-10 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-mono text-white tracking-wider uppercase font-semibold shadow-md pointer-events-auto">
            {project.category || 'Creative'}
          </span>
          {project.year && (
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] font-mono text-white/80 pointer-events-auto">
              {project.year}
            </span>
          )}
        </div>

        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

        {/* Bottom Slide Number Indicator */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 z-10 flex items-center gap-1.5 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-mono text-white/70 uppercase tracking-widest">
            Slide // {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Lower Editorial Details Sheet */}
      <div className="p-3.5 sm:p-5 md:p-6 flex flex-col justify-between flex-1 bg-gradient-to-b from-black/80 via-black/95 to-black border-t border-white/10">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-1 sm:mb-1.5 uppercase tracking-wider">
            <span>Portfolio Case Study</span>
            <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          </div>

          <h3 className="font-serif font-bold text-base sm:text-xl md:text-2xl text-white leading-tight tracking-tight line-clamp-1 sm:line-clamp-2 mb-1 sm:mb-2">
            {project.title}
          </h3>

          <p className="font-sans text-[11px] sm:text-xs text-white/65 line-clamp-2 leading-normal sm:leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Action Controls Bar */}
        <div className="flex items-center justify-between gap-3 pt-2 sm:pt-3 border-t border-white/10 mt-1 sm:mt-2">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-black font-mono font-bold text-[11px] sm:text-xs uppercase tracking-wider hover:bg-white/90 transition-all cursor-pointer shadow-md hover:scale-105"
          >
            <span>View Case Study</span>
            <ArrowUpRight size={13} />
          </a>

          <button
            onClick={copyLink}
            title="Copy URL"
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer"
          >
            {copied ? <Check size={12} className="text-white" /> : <Copy size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Dev Persona Vertical Showcase Slide */
function StickyDevVisual({ repo, index, total }) {
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
    <div
      className="sticky-gallery__visual flex flex-col justify-between select-none bg-[#070908]"
      data-gallery-visual
    >
      {/* Upper Terminal Architecture Frame */}
      <div className="relative w-full h-[50%] sm:h-[58%] overflow-hidden bg-[#040605] p-3.5 sm:p-5 flex flex-col justify-between border-b border-white/10 font-mono">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between text-white/50 text-[10px] sm:text-[11px] pb-1.5 sm:pb-2 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20" />
            <span className="ml-1 sm:ml-2 text-white/80 font-mono text-[10px] sm:text-[11px] truncate max-w-[110px] sm:max-w-[130px]">
              {repo.name}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <span
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-white text-[9px] sm:text-[10px] font-bold">
              {repo.language || 'Code'}
            </span>
          </div>
        </div>

        {/* Code / Architecture Snippet */}
        <div className="py-2 sm:py-4 space-y-1 sm:space-y-2 text-white/80 font-mono text-[11px] sm:text-xs">
          <div className="text-white/40">// Zero-Trust Architecture Service</div>
          <div className="text-white font-semibold flex items-center gap-1 sm:gap-1.5 truncate">
            <span className="text-white/40">$</span> git clone {repo.htmlUrl}.git
          </div>
          <div className="text-white/60 text-[10px] sm:text-[11px] truncate">
            Status: Containerized · Hardened · Automated CI/CD
          </div>
        </div>

        {/* Terminal Bottom Info */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-white/40 pt-1.5 sm:pt-2 border-t border-white/5">
          <span>Branch: master</span>
          {isHighlighted && (
            <span className="text-white px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 border border-white/20 font-bold uppercase tracking-wider text-[8px] sm:text-[9px]">
              HIGHLIGHT
            </span>
          )}
        </div>
      </div>

      {/* Lower Editorial Details Sheet */}
      <div className="p-3.5 sm:p-5 md:p-6 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#070908] via-black to-black">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-1 sm:mb-1.5 uppercase tracking-wider">
            <span>Service Architecture</span>
            <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          </div>

          <h3 className="font-mono font-bold text-base sm:text-xl md:text-2xl text-white leading-tight tracking-tight truncate mb-1 sm:mb-2">
            {repo.name}
          </h3>

          <p className="font-sans text-[11px] sm:text-xs text-white/65 line-clamp-2 leading-normal sm:leading-relaxed">
            {repo.description}
          </p>
        </div>

        {/* Action Controls Bar */}
        <div className="flex items-center justify-between gap-3 pt-2 sm:pt-3 border-t border-white/10 mt-1 sm:mt-2">
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-black font-mono font-bold text-[11px] sm:text-xs uppercase tracking-wider hover:bg-white/90 transition-all cursor-pointer shadow-md hover:scale-105"
          >
            <span>Explore Source</span>
            <ExternalLink size={13} />
          </a>

          <button
            onClick={copyUrl}
            title="Copy URL"
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer"
          >
            {copied ? <Check size={12} className="text-white" /> : <Copy size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Orange Horse Sticky Gallery Component with Slide-Up Motion & Far-Left Rail */
export default function StickyProjectsGallery({ items, isCreative }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paginationVisible, setPaginationVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll('[data-gallery-card]'));
    const anchors = Array.from(section.querySelectorAll('[data-gallery-anchor]'));
    const visuals = Array.from(section.querySelectorAll('[data-gallery-visual]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;

    const update = () => {
      frameId = 0;
      const isMobile = window.innerWidth <= 640;
      const navbarHeight = isMobile ? 64 : 72;
      const bottomClearance = isMobile ? 54 : 36;
      const cardHeight = isMobile
        ? Math.min(window.innerHeight * 0.74, 540, Math.max(280, window.innerHeight - 150))
        : Math.min(window.innerHeight * 0.82, 800, Math.max(300, window.innerHeight - 148));
      const stickyTop = Math.round(navbarHeight + (window.innerHeight - navbarHeight - bottomClearance - cardHeight) / 2);

      const firstAnchor = anchors[0];
      const lastCard = cards[cards.length - 1];

      // Rail is visible ONLY when user has scrolled to the first sticky card
      // and has not yet passed the bottom of the last card!
      if (firstAnchor && lastCard) {
        const firstCardStart = firstAnchor.getBoundingClientRect().top + window.scrollY - stickyTop;
        const lastCardBottom = lastCard.getBoundingClientRect().bottom + window.scrollY;
        const isEngaged = window.scrollY >= firstCardStart - 20;
        const isFinished = window.scrollY >= lastCardBottom - window.innerHeight * 0.35;
        setPaginationVisible(isEngaged && !isFinished);
      }

      let nextActiveIndex = 0;
      anchors.forEach((anchor, index) => {
        const anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
        const cardStart = anchorTop - stickyTop;
        if (window.scrollY >= cardStart - (window.innerHeight * 0.20)) {
          nextActiveIndex = index;
        }
      });

      if (reducedMotion.matches) {
        visuals.forEach((visual, index) => {
          visual.style.removeProperty('--gallery-scale');
          visual.style.removeProperty('--gallery-rotate');
          visual.style.filter = '';
          visual.dataset.active = index === nextActiveIndex ? 'true' : 'false';
        });
        setActiveIndex(nextActiveIndex);
        return;
      }

      // Calculate sliding, tilting, depth-of-field blur, and highlighting for each card
      cards.forEach((card, index) => {
        const anchor = anchors[index];
        const visual = visuals[index];
        if (!anchor || !visual) return;

        const anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
        const cardStart = anchorTop - stickyTop;

        let scale = 1;
        let rotation = 0;
        let brightness = 1;
        let blur = 0;
        let isCurrent = false;

        if (window.scrollY < cardStart) {
          // UPCOMING CARD: Approaching from bottom, starts blurred and softens into crisp focus
          const arrivalWindow = window.innerHeight * 0.6;
          const incomingProgress = clamp01((cardStart - window.scrollY) / arrivalWindow);
          blur = incomingProgress * 6;
          brightness = 1 - incomingProgress * 0.35;
          scale = 1 - incomingProgress * 0.04;
          rotation = 0;
          isCurrent = false;
        } else {
          // AT OR PAST STICKY LOCK
          const nextAnchor = anchors[index + 1];
          let distance = window.innerHeight * 0.65;
          if (nextAnchor) {
            const nextAnchorTop = nextAnchor.getBoundingClientRect().top + window.scrollY;
            distance = Math.max(250, nextAnchorTop - anchorTop);
          }

          const outgoingProgress = clamp01((window.scrollY - cardStart) / distance);
          const tiltDirection = index % 2 === 0 ? 5.5 : -5.5;

          rotation = outgoingProgress * tiltDirection;
          scale = 1 - outgoingProgress * 0.06;
          brightness = 1 - outgoingProgress * 0.45;
          blur = outgoingProgress * 7;

          // Highlighted as the current card while in primary focus
          isCurrent = outgoingProgress < 0.35;
        }

        visual.style.setProperty('--gallery-scale', String(scale));
        visual.style.setProperty('--gallery-rotate', `${rotation}deg`);
        visual.style.filter = blur > 0.1
          ? `blur(${blur.toFixed(1)}px) brightness(${brightness.toFixed(2)})`
          : `brightness(${brightness.toFixed(2)})`;
        visual.dataset.active = isCurrent ? 'true' : 'false';
      });

      setActiveIndex(nextActiveIndex);
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    reducedMotion.addEventListener('change', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      reducedMotion.removeEventListener('change', scheduleUpdate);
    };
  }, [items]);

  const scrollToProject = (index) => {
    const section = sectionRef.current;
    const anchor = section?.querySelectorAll('[data-gallery-anchor]')[index];
    if (!anchor) return;

    const isMobile = window.innerWidth <= 640;
    const navbarHeight = isMobile ? 64 : 72;
    const bottomClearance = isMobile ? 54 : 36;
    const cardHeight = isMobile
      ? Math.min(window.innerHeight * 0.74, 540, Math.max(280, window.innerHeight - 150))
      : Math.min(window.innerHeight * 0.82, 800, Math.max(300, window.innerHeight - 148));
    const stickyTop = Math.round(navbarHeight + (window.innerHeight - navbarHeight - bottomClearance - cardHeight) / 2);
    const targetY = anchor.getBoundingClientRect().top + window.scrollY - stickyTop;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: targetY,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div
      ref={sectionRef}
      className="sticky-gallery relative mt-4"
      aria-label="Selected Works Slide Deck"
    >
      {/* Side Pagination Rail (Fixed Far Left on screens >= 1280px, well clear of cards) */}
      <div
        className={`fixed left-8 2xl:left-16 top-1/2 -translate-y-1/2 z-40 hidden xl:block transition-all duration-300 max-w-[200px] ${
          paginationVisible
            ? 'opacity-100 pointer-events-auto translate-x-0'
            : 'opacity-0 pointer-events-none -translate-x-4'
        }`}
      >
        <nav className="sticky-gallery__pagination max-w-[200px]" aria-label="Gallery projects">
          <ol>
            {items.map((item, index) => {
              const shortTitle = getShortTitle(item, isCreative);
              return (
                <li key={item.id || index}>
                  <button
                    type="button"
                    className="sticky-gallery__page"
                    aria-current={activeIndex === index ? 'step' : undefined}
                    onClick={() => scrollToProject(index)}
                    title={isCreative ? item.title : item.name}
                  >
                    <span className="sticky-gallery__page-line" aria-hidden="true" />
                    <span className="sticky-gallery__page-label">
                      <span className="sticky-gallery__page-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>{' '}
                      <span className="truncate max-w-[130px] inline-block align-middle">{shortTitle}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Stacking Card Deck Container */}
      <div className="sticky-gallery__stack">
        {items.map((item, index) => (
          <Fragment key={item.id || index}>
            {/* Vertical scroll travel spacer before each subsequent card */}
            {index > 0 && (
              <div
                className="w-full pointer-events-none select-none"
                style={{ height: 'clamp(80px, 18vh, 180px)' }}
                aria-hidden="true"
              />
            )}

            {/* Scroll Anchor */}
            <div
              className="sticky-gallery__anchor"
              data-gallery-anchor
              aria-hidden="true"
            />

            {/* Sticky Card */}
            <article
              className="sticky-gallery__card"
              data-gallery-card
              style={{
                zIndex: index + 1,
              }}
            >
              {isCreative ? (
                <StickyCreativeVisual project={item} index={index} total={items.length} />
              ) : (
                <StickyDevVisual repo={item} index={index} total={items.length} />
              )}
            </article>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
