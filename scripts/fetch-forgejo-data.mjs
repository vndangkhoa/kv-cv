import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GITHUB_API = 'https://api.github.com';
const USERNAME = 'vndangkhoa';

async function fetchRepos() {
  const token = process.env.GITHUB_TOKEN || process.env.GIT_TOKEN;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  // GitHub API: per_page 100, sort updated
  const url = `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();

  const FALLBACK_DESCRIPTIONS = {
    'kv-cv': "Portfolio v2 — React + Vite scrolly video (scrub human_head_turn.mp4), dual Creative/IT personas, glass-morphism, CRT terminal, and one-tap PDF CV export.",
    'kv-netflix': "StreamFlow — Kotlin Multiplatform Android TV + Web app with trailers, custom playlists, PWA, and offline download queue.",
    'kv-tiktok': "TikTok/Douyin browser & downloader — watermark-free HD, batch queue, preview, Go + yt-dlp backend.",
    'Sys-Arc-Visl': "Infra topology visualizer — drag-drop system maps, auto-layout, docs export, and live dependency graph.",
    'kv-clearnup': "Media hygiene — batch cleanup, duplicate detection, and smart organization for large video libraries (TypeScript/Go).",
    'vndangkhoa': "Profile — Khoa Vo's GitHub landing, links to khoavo.myds.me, Forgejo, and featured projects.",
    'kv-download': "Universal mobile-first downloader — Go + yt-dlp, HLS/batch/queue, PWA share-sheet, Synology-ready.",
    'kv-music': "Self-hosted music — YouTube Music powered streaming, synced lyrics, playlists, and PWA.",
  };

  const fetched = data
    .filter(r => r.name !== 'vndangkhoa' || r.description) // keep profile only if we enrich, but we enrich it anyway; filter out empty profile later
    .map(r => {
      let desc = r.description || '';
      // Enrich empty/short or generic (use fallback if GitHub is empty or too terse)
      if (FALLBACK_DESCRIPTIONS[r.name] && (!desc || desc.trim().length < 50 || desc === FALLBACK_DESCRIPTIONS[r.name])) {
        // keep GitHub if it's already rich (>=50 chars), else prefer crafted
        if (!desc || desc.length < 50) desc = FALLBACK_DESCRIPTIONS[r.name];
      }
      if (!desc || desc.trim().length < 15) {
        // still empty after fallback -> keep as is
      }
      // Special override for kv-synology to keep rich detail
      if (r.name === 'kv-synology') {
        desc = "Synology DSM Web Manager & AI MCP Hub — Next.js 15, React 19, QuickConnect resolver, services controller (SMB, NFS, SSH, WebDAV), and 42 AI MCP tools";
      }
      return {
        id: r.id,
        name: r.name,
        fullName: r.full_name,
        description: desc,
        htmlUrl: r.html_url,
        language: r.language || '',
        updatedAt: r.updated_at,
        createdAt: r.created_at,
        mirror: r.fork || false,
        mirrorUpdated: r.updated_at,
        topics: r.topics || [],
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        watchers: r.watchers_count || 0,
        releases: 0,
      };
    })
    .filter(r => r.name !== 'vndangkhoa'); // hide profile README from projects grid

  const HIGHLIGHT_REPOS = ['kv-synology', 'vietc'];
  return fetched.sort((a, b) => {
    const aIndex = HIGHLIGHT_REPOS.indexOf(a.name);
    const bIndex = HIGHLIGHT_REPOS.indexOf(b.name);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return new Date(b.updatedAt) - new Date(a.updatedAt) || new Date(b.createdAt) - new Date(a.createdAt);
  });
}

async function main() {
  try {
    const repos = await fetchRepos();

    const langCount = {};
    repos.forEach(r => {
      if (r.language) {
        langCount[r.language] = (langCount[r.language] || 0) + 1;
      }
    });

    const output = {
      fetchedAt: new Date().toISOString(),
      totalRepos: repos.length,
      totalLanguages: Object.keys(langCount).length,
      languages: langCount,
      repos,
    };

    const outPath = resolve(__dirname, '..', 'src', 'data', 'forgejo-repos.json');
    writeFileSync(outPath, JSON.stringify(output, null, 2));
    console.log(`[github] Written ${repos.length} repos to src/data/forgejo-repos.json`);
  } catch (err) {
    console.error('[github] Failed to fetch repos:', err.message);
    console.log('[github] Continuing with existing data...');
  }
}

main();
