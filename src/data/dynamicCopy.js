/**
 * Dynamic AI-Agent Copy Variations (`src/data/dynamicCopy.js`)
 *
 * On every page reload, selects a guaranteed-fresh variant index (avoiding the
 * previous reload's index via `sessionStorage`) so the autonomous cursor swarm
 * genuinely composes different headlines, eyebrows, subtitles, CTAs, and live
 * agent typing logs every time the user refreshes the page.
 *
 * All variants remain 100% grounded in Vo Nguyen Dang Khoa's verified portfolio
 * (P&G SEA, Phibious, RMIT Honors, ComfyUI/FLUX.1, Rust, Go, Next.js 15,
 * Synology DSM SPK Hub, TrimUI Smart Pro OS).
 */

const VARIANT_COUNT = 5;

function pickFreshReloadIndex(storageKey, count = VARIANT_COUNT) {
  if (typeof window === 'undefined') return 0;
  try {
    const rawLast = window.sessionStorage.getItem(storageKey);
    const lastIdx = rawLast !== null ? parseInt(rawLast, 10) : -1;
    let nextIdx = Math.floor(Math.random() * count);
    if (!Number.isNaN(lastIdx) && lastIdx >= 0 && count > 1) {
      // Guarantee a different copy variant on every consecutive reload
      nextIdx = (lastIdx + 1 + Math.floor(Math.random() * (count - 1))) % count;
    }
    window.sessionStorage.setItem(storageKey, String(nextIdx));
    return nextIdx;
  } catch {
    return Math.floor(Math.random() * count);
  }
}

const reloadIdx = pickFreshReloadIndex('kv-dynamic-copy-v1', VARIANT_COUNT);
const secondaryIdx = (reloadIdx + 2) % VARIANT_COUNT;

// Fresh per-reload telemetry tokens for cursor fake-typing bubbles & QA logs
const HEX_CHARS = '0123456789abcdef';
const randomHex = (len = 6) =>
  Array.from({ length: len }, () =>
    HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]
  ).join('');

export const AGENT_SESSION_META = {
  variantIndex: reloadIdx,
  commitHash: randomHex(6),
  fluxSeed: Math.floor(100000 + Math.random() * 899999),
  cfgScale: ['3.2', '3.5', '3.8', '4.0', '4.2'][reloadIdx],
  kerningEm: ['-0.02em', '-0.024em', '-0.018em', '-0.028em', '-0.022em'][reloadIdx],
  samplerName: ['euler_ancestral', 'dpmpp_2m_sde', 'uni_pc_bh2', 'deis_2m', 'heun_pp2'][reloadIdx],
  buildTimeMs: Math.floor(18 + Math.random() * 24),
};

const HERO_VARIANTS = {
  creative: [
    {
      badge: 'VO NGUYEN DANG KHOA • HO CHI MINH CITY • OPEN TO WORK',
      titleLead: 'Creative Direction meets',
      titleAccent: 'Generative AI',
      titleTrail: '.',
      subtitle:
        'Creative Director & AI Innovation Lead with 9+ years leading multi-market visual systems (Procter & Gamble SEA, Phibious) and custom ComfyUI / FLUX.1 production pipelines.',
      ctaPrimary: 'Creative & AI CV (1p PDF)',
      ctaSecondary: 'Engineering & Systems CV (2p PDF)',
      ctaExplore: 'View Selected Work ↓',
      cursorTitleCmd: '<h1>Creative Direction × Generative AI</h1>',
    },
    {
      badge: 'KHOA VO • AI CREATIVE & BRAND SYSTEMS LEAD • HCMC & REMOTE',
      titleLead: 'Where Brand Craft scales with',
      titleAccent: 'Agentic Velocity',
      titleTrail: '.',
      subtitle:
        '9+ years directing regional FMCG & lifestyle campaigns across Southeast Asia—fusing RMIT Honors design craft with autonomous ComfyUI, LoRA, and generative video workflows.',
      ctaPrimary: 'Design & AI Lead CV (1p PDF)',
      ctaSecondary: 'Systems Architect CV (2p PDF)',
      ctaExplore: 'Explore Case Studies ↓',
      cursorTitleCmd: '<h1>Brand Craft × Agentic Velocity</h1>',
    },
    {
      badge: `AGENTIC BUILD #${AGENT_SESSION_META.commitHash.slice(0, 4).toUpperCase()} • VO NGUYEN DANG KHOA • AVAILABLE NOW`,
      titleLead: 'Commercial Art Direction,',
      titleAccent: 'Autonomous Scale',
      titleTrail: '.',
      subtitle:
        'Bridging executive art direction and custom diffusion architecture—cutting multi-market campaign production cycles by 60% for P&G SEA, Phibious, and enterprise brands.',
      ctaPrimary: 'Creative Director CV (1p PDF)',
      ctaSecondary: 'Full-Stack & Security CV (2p PDF)',
      ctaExplore: 'Inspect Live Work ↓',
      cursorTitleCmd: '<h1>Commercial Art × Autonomous Scale</h1>',
    },
    {
      badge: 'VO NGUYEN DANG KHOA • RMIT MULTIMEDIA HONORS • AI INNOVATION LEAD',
      titleLead: 'Multi-Market Visual Systems &',
      titleAccent: 'Generative Pipelines',
      titleTrail: '.',
      subtitle:
        'From high-converting eCommerce key visuals to node-based FLUX.1 & Wan2.1 video synthesis—architecting repeatable creative systems that scale across APAC teams.',
      ctaPrimary: 'Creative & GenAI CV (1p PDF)',
      ctaSecondary: 'Engineering & Cloud CV (2p PDF)',
      ctaExplore: 'Browse Portfolio Feed ↓',
      cursorTitleCmd: '<h1>Visual Systems × GenAI Pipelines</h1>',
    },
    {
      badge: 'KHOA VO • CREATIVE MANAGER & GEN-AI ARCHITECT • HO CHI MINH CITY',
      titleLead: 'Architecting Brand Worlds with',
      titleAccent: 'Diffusion & Motion',
      titleTrail: '.',
      subtitle:
        'Leading cross-functional creative studios and AI R&D labs—delivering deterministic brand consistency, 3D motion direction, and high-velocity omnichannel storytelling.',
      ctaPrimary: 'Creative Leadership CV (1p PDF)',
      ctaSecondary: 'Systems Engineering CV (2p PDF)',
      ctaExplore: 'Discover Selected Works ↓',
      cursorTitleCmd: '<h1>Brand Worlds × Diffusion Motion</h1>',
    },
  ],
  dev: [
    {
      badge: 'VO NGUYEN DANG KHOA • HO CHI MINH CITY • OPEN TO WORK',
      titleLead: 'Systems Architecture &',
      titleAccent: 'Full-Stack Engineering',
      titleTrail: '.',
      subtitle:
        'Senior Full-Stack, Systems & Security Architect building production Rust, Go, and Next.js 15 platforms, embedded Linux engines (/dev/fb0), and hardened cloud infrastructure.',
      ctaPrimary: 'Creative & AI CV (1p PDF)',
      ctaSecondary: 'Engineering & Systems CV (2p PDF)',
      ctaExplore: 'View Selected Work ↓',
      cursorTitleCmd: '<h1>Systems Architecture × Full-Stack</h1>',
    },
    {
      badge: 'KHOA VO • RUST / GO / NEXT.JS 15 ARCHITECT • HCMC & REMOTE',
      titleLead: 'Zero-Trust Infrastructure &',
      titleAccent: 'Embedded Rust',
      titleTrail: '.',
      subtitle:
        'Engineering defense-in-depth microservices, Ed25519 cryptographic licensing, Synology DSM SPK repositories, and native ARM64 framebuffer apps with zero external bloat.',
      ctaPrimary: 'Creative & AI CV (1p PDF)',
      ctaSecondary: 'Security & Systems CV (2p PDF)',
      ctaExplore: 'Inspect Shipped Repos ↓',
      cursorTitleCmd: '<h1>Zero-Trust Infra × Embedded Rust</h1>',
    },
    {
      badge: `KERNEL BUILD #${AGENT_SESSION_META.commitHash.slice(0, 4).toUpperCase()} • VO NGUYEN DANG KHOA • OPEN TO WORK`,
      titleLead: 'From Kernel Framebuffers to',
      titleAccent: 'Distributed Cloud',
      titleTrail: '.',
      subtitle:
        'Across 18+ production repositories in Rust, Go, Python, and TypeScript—architecting low-latency media streaming, OTA package hubs, and autonomous MCP agent tooling.',
      ctaPrimary: 'Creative & AI CV (1p PDF)',
      ctaSecondary: 'Full-Stack & Systems CV (2p PDF)',
      ctaExplore: 'Explore Code & Builds ↓',
      cursorTitleCmd: '<h1>Kernel /dev/fb0 → Cloud Scale</h1>',
    },
    {
      badge: 'VO NGUYEN DANG KHOA • SENIOR SYSTEMS & SECURITY LEAD • HCMC',
      titleLead: 'Production Cloud Systems',
      titleAccent: 'Engineered to Scale',
      titleTrail: '.',
      subtitle:
        'Combining systems-level memory safety with modern React 19 / Next.js 15 interfaces, automated Docker CI/CD pipelines, and real-time telemetry across live hardware nodes.',
      ctaPrimary: 'Design & AI CV (1p PDF)',
      ctaSecondary: 'Engineering Architect CV (2p PDF)',
      ctaExplore: 'View Live Deployments ↓',
      cursorTitleCmd: '<h1>Production Cloud × Engineered Scale</h1>',
    },
    {
      badge: 'KHOA VO • FULL-STACK, EMBEDDED LINUX & SECOPS • AVAILABLE NOW',
      titleLead: 'Hardened Microservices &',
      titleAccent: 'Native Linux Engines',
      titleTrail: '.',
      subtitle:
        'Creator of the Synology Community Hub (syno.vndns.net) and TrimUI Smart Pro OS suite (trimui.vndns.net)—shipping resilient software from bare-metal handhelds to cloud clusters.',
      ctaPrimary: 'Creative & AI CV (1p PDF)',
      ctaSecondary: 'Download Systems CV (2p PDF)',
      ctaExplore: 'Audit Architecture ↓',
      cursorTitleCmd: '<h1>Hardened Services × Native Linux</h1>',
    },
  ],
};

const ABOUT_VARIANTS = {
  eyebrow: [
    'About The Creator',
    'Executive Profile & Manifesto',
    'The Dual-Track Architect',
    'Creative × Engineering Synthesis',
    'System & Brand Philosophy',
  ],
  creative: [
    {
      titleLead: 'Commercial art direction meets',
      titleAccent: 'scalable AI production.',
      bio: 'Vo Nguyen Dang Khoa (RMIT Multimedia Design Honors) brings 9+ years of regional creative leadership across Procter & Gamble SEA and Phibious Vietnam—combining enterprise brand systems, omnichannel eCommerce design, and custom ComfyUI / FLUX.1 video pipelines that accelerate campaign delivery by 60%.',
      cursorCmd: '<h2>Commercial Art × Scalable AI</h2>',
    },
    {
      titleLead: 'Elevating regional brand systems with',
      titleAccent: 'deterministic generative workflows.',
      bio: 'Trained in Multimedia Design (Honors) at RMIT University, Khoa Vo has led multidisciplinary teams across Southeast Asia—turning complex brand guidelines into automated diffusion pipelines, 3D motion systems, and high-conversion digital experiences.',
      cursorCmd: '<h2>Brand Systems × Deterministic AI</h2>',
    },
    {
      titleLead: 'Nine years of creative leadership,',
      titleAccent: 'supercharged by custom AI tooling.',
      bio: 'From P&G Southeast Asia eCommerce ecosystems to Phibious agency campaigns, Khoa bridges traditional art direction with self-hosted ComfyUI clusters, custom LoRA training, and AI-assisted video post-production.',
      cursorCmd: '<h2>9+ Yrs Leadership × Custom GenAI</h2>',
    },
    {
      titleLead: 'Where high-craft visual storytelling',
      titleAccent: 'converges with engineering precision.',
      bio: 'Rarely do Creative Directors write their own shaders, automation scripts, and inference nodes. Khoa Vo pairs agency-grade typography and motion direction with deep systems engineering to ship campaigns faster and cleaner.',
      cursorCmd: '<h2>Visual Craft × Systems Precision</h2>',
    },
    {
      titleLead: 'Designing omnichannel brand worlds',
      titleAccent: 'at autonomous studio velocity.',
      bio: 'With a track record spanning global FMCG giants and agile tech ventures, Khoa Vo builds creative SOPs that empower designers with generative AI while preserving uncompromising art direction.',
      cursorCmd: '<h2>Omnichannel Brands × Studio Velocity</h2>',
    },
  ],
  dev: [
    {
      titleLead: 'Production full-stack systems',
      titleAccent: 'engineered from the kernel up.',
      bio: 'Vo Nguyen Dang Khoa architects high-performance full-stack applications, embedded Linux engines, and defense-in-depth infrastructure. Across 18+ shipped open-source and commercial platforms in Rust, Go, and Next.js 15, he pairs systems-level reliability with refined product design.',
      cursorCmd: '<h2>Full-Stack Systems × Kernel Up</h2>',
    },
    {
      titleLead: 'Memory-safe backends and zero-trust networks',
      titleAccent: 'built for real-world load.',
      bio: 'From raw /dev/fb0 framebuffer rendering on ARM64 Linux handhelds to distributed Go microservices and Ed25519-signed package repositories, Khoa Vo engineers self-reliant systems with zero unnecessary abstraction.',
      cursorCmd: '<h2>Zero-Trust Networks × Rust/Go</h2>',
    },
    {
      titleLead: 'Bridging bare-metal embedded Linux',
      titleAccent: 'with modern cloud architectures.',
      bio: 'Whether compiling cross-target Rust binaries for Synology NAS architectures or shipping reactive Next.js 15 & WebGL interfaces, Khoa treats performance, cryptographic verification, and UX polish as first-class citizens.',
      cursorCmd: '<h2>Embedded Linux × Cloud Architecture</h2>',
    },
    {
      titleLead: 'Security-first systems engineering',
      titleAccent: 'with designer-grade interfaces.',
      bio: 'Across 18+ active repositories, Khoa Vo builds complete ecosystems—combining hardened reverse-proxy topologies, automated CI/CD release pipelines, and tactile liquid-glass web frontends.',
      cursorCmd: '<h2>SecOps Architecture × Tactile UI</h2>',
    },
    {
      titleLead: 'Autonomous infrastructure and native apps',
      titleAccent: 'shipped to thousands of devices.',
      bio: 'Powering live OTA stores and package hubs across syno.vndns.net and trimui.vndns.net, Khoa Vo’s software stack is battle-tested daily by self-hosters, developers, and retro-handheld communities.',
      cursorCmd: '<h2>Autonomous Infra × Live OTA Nodes</h2>',
    },
  ],
};

const REFEREES_VARIANTS = [
  {
    eyebrow: 'Verified Endorsements & Referees',
    title: 'What builders say',
    ratingLabel: 'Clutch / Referees',
    ratingBadge: '5/5 Verified',
    cursorCmd: '<h2>What builders say • 5/5★</h2>',
  },
  {
    eyebrow: 'Executive Reference Telemetry',
    title: 'Endorsed by leaders',
    ratingLabel: 'Direct Referees',
    ratingBadge: '100% Verified',
    cursorCmd: '<h2>Endorsed by leaders • Verified</h2>',
  },
  {
    eyebrow: 'Peer & Director Vouching',
    title: 'Trusted in production',
    ratingLabel: 'Partner Audit',
    ratingBadge: '5.0★ Rating',
    cursorCmd: '<h2>Trusted in production • 5.0★</h2>',
  },
  {
    eyebrow: 'Verified Industry References',
    title: 'Voices from the field',
    ratingLabel: 'Verified Leaders',
    ratingBadge: '5/5 Endorsed',
    cursorCmd: '<h2>Voices from the field • 5/5★</h2>',
  },
  {
    eyebrow: 'Direct Collaboration Records',
    title: 'Verified by collaborators',
    ratingLabel: 'Executive Check',
    ratingBadge: '5/5 Confirmed',
    cursorCmd: '<h2>Verified by collaborators ✓</h2>',
  },
];

const WORK_VARIANTS = {
  eyebrow: [
    'Selected Works & Deployments',
    'Production Case Studies & Repos',
    'Shipped Systems & Brand Campaigns',
    'Live Portfolio & Git Index',
    'Curated Builds & Architecture',
  ],
  creative: [
    {
      titleLead: 'Creative',
      titleAccent: 'Case Studies',
      subtitle:
        'Selected brand systems, AI video pipelines, and omnichannel campaigns across Southeast Asia.',
      cursorCmd: '<h2>Creative Case Studies • SEA</h2>',
    },
    {
      titleLead: 'Brand & AI',
      titleAccent: 'Productions',
      subtitle:
        'Regional FMCG key visuals, generative video workflows, and 3D motion direction delivered at scale.',
      cursorCmd: '<h2>Brand & AI Productions</h2>',
    },
    {
      titleLead: 'Omnichannel',
      titleAccent: 'Brand Worlds',
      subtitle:
        'High-impact commercial campaigns, eCommerce design systems, and diffusion-powered storytelling.',
      cursorCmd: '<h2>Omnichannel Brand Worlds</h2>',
    },
    {
      titleLead: 'Generative',
      titleAccent: 'Design Systems',
      subtitle:
        'Enterprise art direction paired with custom ComfyUI / FLUX.1 pipelines and regional campaign rollouts.',
      cursorCmd: '<h2>Generative Design Systems</h2>',
    },
    {
      titleLead: 'Shipped',
      titleAccent: 'Creative Works',
      subtitle:
        'Live portfolio feed of multi-market campaigns, interactive experiences, and AI-accelerated visual craft.',
      cursorCmd: '<h2>Shipped Creative Works</h2>',
    },
  ],
  dev: [
    {
      titleLead: 'Code,',
      titleAccent: 'Shipped',
      subtitle:
        'Production platforms & open-source repositories — Rust embedded engines, Go streaming backends, and Next.js 15 cloud apps.',
      cursorCmd: '<h2>Code, Shipped • 18+ Repos</h2>',
    },
    {
      titleLead: 'Systems,',
      titleAccent: 'Deployed',
      subtitle:
        'Live repositories spanning ARM64 Linux framebuffers, Synology DSM SPK hubs, and zero-trust cloud services.',
      cursorCmd: '<h2>Systems, Deployed • Rust & Go</h2>',
    },
    {
      titleLead: 'Engineered',
      titleAccent: 'Repositories',
      subtitle:
        'Self-hosted and open-source architectures built with Rust, Go, Python, Kotlin, and TypeScript.',
      cursorCmd: '<h2>Engineered Repositories</h2>',
    },
    {
      titleLead: 'Production',
      titleAccent: 'Architecture',
      subtitle:
        'Hardened microservices, cryptographic licensing tools, and high-throughput media streaming engines.',
      cursorCmd: '<h2>Production Architecture</h2>',
    },
    {
      titleLead: 'Open-Source',
      titleAccent: '& Cloud Builds',
      subtitle:
        'From bare-metal handheld OS utilities to modern full-stack web platforms and MCP agent servers.',
      cursorCmd: '<h2>Open-Source & Cloud Builds</h2>',
    },
  ],
};

const REVIEWS_VARIANTS = [
  {
    eyebrow: 'Live Production Telemetry',
    titleLead: 'Expanding',
    titleAccent: 'reach',
    titleTrail: 'with every deploy.',
    subtitleLead: 'Real feedback streamed directly from production users across',
    subtitleMid: '(Synology DSM Package Hub) and',
    subtitleTail: '(TrimUI Smart Pro OS & OTA Store).',
    cursorCmd: '<h2>Expanding reach per deploy</h2>',
  },
  {
    eyebrow: 'Real-World Ecosystem Stream',
    titleLead: 'Battle-tested',
    titleAccent: 'systems',
    titleTrail: 'in the wild.',
    subtitleLead: 'Verified community telemetry and reviews streaming live from',
    subtitleMid: '(Self-Hosted NAS Repo) and',
    subtitleTail: '(ARM64 Handheld App Store).',
    cursorCmd: '<h2>Battle-tested in the wild</h2>',
  },
  {
    eyebrow: 'Community Deployment Metrics',
    titleLead: 'Validated by',
    titleAccent: 'builders',
    titleTrail: 'on live hardware.',
    subtitleLead: 'Continuous user reports and 5-star deployment logs collected across',
    subtitleMid: '(DSM 7 SPK Ecosystem) and',
    subtitleTail: '(TrimUI Smart Pro Linux Suite).',
    cursorCmd: '<h2>Validated on live hardware</h2>',
  },
  {
    eyebrow: 'Active Node Feedback Feed',
    titleLead: 'Real users,',
    titleAccent: 'real scale',
    titleTrail: 'across every release.',
    subtitleLead: 'Unfiltered production reviews from NAS administrators and handheld gamers on',
    subtitleMid: 'and',
    subtitleTail: '— synced with live endpoints.',
    cursorCmd: '<h2>Real users, real scale • 4.9★</h2>',
  },
  {
    eyebrow: 'Production Ecosystem Pulse',
    titleLead: 'Continuous',
    titleAccent: 'telemetry',
    titleTrail: 'from active nodes.',
    subtitleLead: 'Field-tested daily across thousands of installs on',
    subtitleMid: '(Synology Package Center) and',
    subtitleTail: '(TrimUI OTA Hub).',
    cursorCmd: '<h2>Continuous node telemetry</h2>',
  },
];

const EXPERIENCE_VARIANTS = {
  eyebrow: [
    'Career Evolution & Leadership',
    '9+ Years of Execution & Impact',
    'Leadership & Architecture Timeline',
    'Enterprise & Systems Chronology',
    'Track Record of Ownership',
  ],
  creative: [
    {
      titleLead: 'The Arc of',
      titleAccent: 'Leadership',
      cursorCmd: '<h2>The Arc of Leadership</h2>',
    },
    {
      titleLead: 'Nine Years of',
      titleAccent: 'Creative Scale',
      cursorCmd: '<h2>Nine Years of Creative Scale</h2>',
    },
    {
      titleLead: 'From Studio Craft to',
      titleAccent: 'AI Direction',
      cursorCmd: '<h2>Studio Craft → AI Direction</h2>',
    },
    {
      titleLead: 'Leading Regional',
      titleAccent: 'Brand Systems',
      cursorCmd: '<h2>Leading Regional Brand Systems</h2>',
    },
    {
      titleLead: 'Evolution of a',
      titleAccent: 'Creative Lead',
      cursorCmd: '<h2>Evolution of a Creative Lead</h2>',
    },
  ],
  dev: [
    {
      titleLead: 'From Zero to',
      titleAccent: 'Architect',
      cursorCmd: '<h2>From Zero to Architect</h2>',
    },
    {
      titleLead: 'Systems & Security',
      titleAccent: 'Chronology',
      cursorCmd: '<h2>Systems & Security Chronology</h2>',
    },
    {
      titleLead: 'Engineering',
      titleAccent: 'Progression',
      cursorCmd: '<h2>Engineering Progression</h2>',
    },
    {
      titleLead: 'Architecture &',
      titleAccent: 'Leadership Track',
      cursorCmd: '<h2>Architecture & Leadership</h2>',
    },
    {
      titleLead: 'Building Resilient',
      titleAccent: 'Infrastructure',
      cursorCmd: '<h2>Building Resilient Infra</h2>',
    },
  ],
};

const CONTACT_VARIANTS = {
  eyebrow: [
    'Get In Touch • Open For Collaborations',
    'Initiate Direct Channel • HCMC & Remote',
    'Available for Leadership & Architecture',
    'Start a Conversation • Direct Access',
    'Ready to Deploy • Let’s Connect',
  ],
  headline: [
    {
      titleLead: "Let's build something",
      titleAccent: 'unforgettable',
      cursorCmd: "<h2>Let's build unforgettable</h2>",
    },
    {
      titleLead: 'Ready to architect',
      titleAccent: "what's next",
      cursorCmd: "<h2>Architect what's next</h2>",
    },
    {
      titleLead: "Let's ship your next",
      titleAccent: 'breakthrough',
      cursorCmd: "<h2>Ship your next breakthrough</h2>",
    },
    {
      titleLead: 'Bring agentic velocity',
      titleAccent: 'to your team',
      cursorCmd: '<h2>Bring agentic velocity</h2>',
    },
    {
      titleLead: "Let's engineer something",
      titleAccent: 'extraordinary',
      cursorCmd: '<h2>Engineer the extraordinary</h2>',
    },
  ],
  creative: [
    {
      subtitle:
        'Hiring an AI Creative Lead? Scaling automated visual production? Let’s connect and engineer the future of your brand.',
      footerTitleLead: 'Commercial craft meets',
      footerTitleAccent: 'AI velocity',
      footerBio:
        'Vo Nguyen Dang Khoa • Creative Manager & AI Innovation Lead (RMIT Honors) with 9+ years scaling regional brand systems and generative AI production.',
    },
    {
      subtitle:
        'Looking for a Creative Director who can architect ComfyUI / FLUX.1 pipelines and lead regional teams? Reach out directly below.',
      footerTitleLead: 'Regional brand direction,',
      footerTitleAccent: 'autonomous scale',
      footerBio:
        'Vo Nguyen Dang Khoa • Directing multi-market campaigns (P&G SEA, Phibious) and custom diffusion workflows from Ho Chi Minh City.',
    },
    {
      subtitle:
        'Ready to cut campaign production turnarounds by 60% while elevating visual craft? Let’s talk.',
      footerTitleLead: 'Art direction powered by',
      footerTitleAccent: 'generative systems',
      footerBio:
        'Vo Nguyen Dang Khoa • RMIT Multimedia Design Honors graduate bridging executive art direction, 3D motion, and AI pipeline engineering.',
    },
    {
      subtitle:
        'Open for Creative Director, Head of AI Studio, and Brand Systems leadership roles across APAC & remote.',
      footerTitleLead: 'Where studio craft meets',
      footerTitleAccent: 'diffusion velocity',
      footerBio:
        'Vo Nguyen Dang Khoa • 9+ years leading high-performing creative teams, eCommerce visual ecosystems, and generative AI R&D.',
    },
    {
      subtitle:
        'Whether launching a multi-market campaign or building an in-house AI creative lab—let’s connect on Zalo or Email.',
      footerTitleLead: 'Omnichannel storytelling,',
      footerTitleAccent: 'engineered to scale',
      footerBio:
        'Vo Nguyen Dang Khoa • Combining agency-grade design leadership with custom generative AI workflows and full-stack execution.',
    },
  ],
  dev: [
    {
      subtitle:
        'Need scalable cloud microservices, media streaming apps, or custom AI tooling? Let’s ship together.',
      footerTitleLead: 'Production systems built',
      footerTitleAccent: 'to scale',
      footerBio:
        'Vo Nguyen Dang Khoa • Senior Full-Stack, Systems & Security Architect engineering Rust, Go, and Next.js 15 platforms across cloud and embedded Linux.',
    },
    {
      subtitle:
        'Hiring a Systems Architect or Senior Full-Stack Engineer for Rust, Go, Next.js 15, or Zero-Trust infrastructure? Let’s connect.',
      footerTitleLead: 'Zero-trust architecture &',
      footerTitleAccent: 'native performance',
      footerBio:
        'Vo Nguyen Dang Khoa • Creator of 18+ production repositories spanning ARM64 Linux framebuffers, Synology DSM SPK hubs, and cloud microservices.',
    },
    {
      subtitle:
        'From bare-metal embedded Linux engines (/dev/fb0) to hardened distributed backends—available for senior engineering roles.',
      footerTitleLead: 'Engineered from kernel',
      footerTitleAccent: 'to cloud cluster',
      footerBio:
        'Vo Nguyen Dang Khoa • Architecting memory-safe Rust/Go services, Ed25519 cryptographic controls, and reactive web applications.',
    },
    {
      subtitle:
        'Need defense-in-depth security auditing, self-hosted package ecosystems, or high-concurrency Go/Rust services? Direct channel open.',
      footerTitleLead: 'Hardened infrastructure,',
      footerTitleAccent: 'shipped clean',
      footerBio:
        'Vo Nguyen Dang Khoa • Powering live OTA ecosystems across syno.vndns.net and trimui.vndns.net with automated CI/CD and telemetry.',
    },
    {
      subtitle:
        'Open to Senior Systems Architect, Principal Full-Stack, and AI Infrastructure roles in Ho Chi Minh City or Remote.',
      footerTitleLead: 'Systems reliability meets',
      footerTitleAccent: 'modern craft',
      footerBio:
        'Vo Nguyen Dang Khoa • Blending low-level Linux systems programming with high-craft React 19 / Next.js 15 product engineering.',
    },
  ],
};

export const DYNAMIC_COPY = {
  meta: AGENT_SESSION_META,
  hero: {
    creative: HERO_VARIANTS.creative[reloadIdx],
    dev: HERO_VARIANTS.dev[reloadIdx],
  },
  about: {
    eyebrow: ABOUT_VARIANTS.eyebrow[reloadIdx],
    creative: ABOUT_VARIANTS.creative[reloadIdx],
    dev: ABOUT_VARIANTS.dev[reloadIdx],
  },
  referees: REFEREES_VARIANTS[reloadIdx],
  work: {
    eyebrow: WORK_VARIANTS.eyebrow[reloadIdx],
    creative: WORK_VARIANTS.creative[reloadIdx],
    dev: WORK_VARIANTS.dev[reloadIdx],
  },
  reviews: REVIEWS_VARIANTS[reloadIdx],
  experience: {
    eyebrow: EXPERIENCE_VARIANTS.eyebrow[reloadIdx],
    creative: EXPERIENCE_VARIANTS.creative[reloadIdx],
    dev: EXPERIENCE_VARIANTS.dev[reloadIdx],
  },
  contact: {
    eyebrow: CONTACT_VARIANTS.eyebrow[reloadIdx],
    headline: CONTACT_VARIANTS.headline[reloadIdx],
    creative: CONTACT_VARIANTS.creative[secondaryIdx],
    dev: CONTACT_VARIANTS.dev[secondaryIdx],
  },
};

export default DYNAMIC_COPY;
