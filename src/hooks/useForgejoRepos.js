import { useState, useEffect, useCallback } from 'react';
import buildData from '../data/forgejo-repos.json';

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'vndangkhoa';
const POLL_INTERVAL = 5 * 60 * 1000;

const formatRepo = (repo) => ({
  id: repo.id,
  name: repo.name,
  fullName: repo.fullName,
  description: repo.description || `${repo.language || 'Unknown'} project`,
  htmlUrl: repo.htmlUrl,
  cloneUrl: repo.cloneUrl,
  language: repo.language || 'Unknown',
  updatedAt: repo.updatedAt,
  createdAt: repo.createdAt,
  mirror: repo.mirror,
  mirrorUpdated: repo.mirrorUpdated,
  topics: repo.topics || [],
  stars: repo.stars || 0,
  forks: repo.forks || 0,
  watchers: repo.watchers || 0,
  releases: repo.releases || 0,
});

export const HIGHLIGHT_REPOS = ['kv-synology', 'vietc', 'kv-file'];

const sortRepos = (reposList) => {
  return [...reposList].sort((a, b) => {
    const aIndex = HIGHLIGHT_REPOS.indexOf(a.name);
    const bIndex = HIGHLIGHT_REPOS.indexOf(b.name);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return new Date(b.updatedAt) - new Date(a.updatedAt) || new Date(b.createdAt) - new Date(a.createdAt);
  });
};

const initRepos = sortRepos((buildData.repos || []).map(formatRepo));
const initLanguages = buildData.languages || {};
const initStats = {
  totalRepos: buildData.totalRepos || initRepos.length,
  totalLanguages: buildData.totalLanguages || Object.keys(initLanguages).length,
  lastUpdated: buildData.fetchedAt || null,
};

const FALLBACK_DESCRIPTIONS = {
  'kv-cv': "Portfolio v2 — React + Vite scrolly video (scrub human_head_turn.mp4), dual Creative/IT personas, glass-morphism, CRT terminal, and one-tap PDF CV export.",
  'kv-netflix': "StreamFlow — Kotlin Multiplatform Android TV + Web app with trailers, custom playlists, PWA, and offline download queue.",
  'kv-tiktok': "TikTok/Douyin browser & downloader — watermark-free HD, batch queue, preview, Go + yt-dlp backend.",
  'Sys-Arc-Visl': "Infra topology visualizer — drag-drop system maps, auto-layout, docs export, and live dependency graph.",
  'kv-clearnup': "Media hygiene — batch cleanup, duplicate detection, and smart organization for large video libraries (TypeScript/Go).",
  'kv-download': "Universal mobile-first downloader — Go + yt-dlp, HLS/batch/queue, PWA share-sheet, Synology-ready.",
  'kv-file': "High-performance self-hosted file manager with macOS Miller Columns, Windows Explorer view, and real-time synchronization.",
};

const formatRemoteRepo = (repo) => {
  let desc = repo.description || `${repo.language || 'Unknown'} project`;
  if (FALLBACK_DESCRIPTIONS[repo.name] && (!repo.description || repo.description.length < 50)) {
    desc = FALLBACK_DESCRIPTIONS[repo.name];
  }
  if (repo.name === 'kv-synology') {
    desc = "Synology DSM Web Manager & AI MCP Hub — Next.js 15, React 19, QuickConnect resolver, services controller (SMB, NFS, SSH, WebDAV), and 42 AI MCP tools";
  }
  if (repo.name === 'kv-file') {
    desc = "High-performance self-hosted file manager with macOS Miller Columns, Windows Explorer view, and real-time synchronization.";
  }
  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: desc,
    htmlUrl: repo.html_url,
    language: repo.language || 'Unknown',
    updatedAt: repo.updated_at,
    createdAt: repo.created_at,
    mirror: repo.fork || false,
    mirrorUpdated: repo.updated_at,
    topics: repo.topics || [],
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    watchers: repo.watchers_count || 0,
    releases: 0,
  };
};

export function useForgejoRepos() {
  const [repos, setRepos] = useState(initRepos);
  const [languages, setLanguages] = useState(initLanguages);
  const [stats, setStats] = useState(initStats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = typeof process !== 'undefined' ? process.env.GITHUB_TOKEN : undefined;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      const formatted = sortRepos(
        data
          .filter(r => r.name !== 'vndangkhoa')
          .map(formatRemoteRepo)
      );

      const langCount = {};
      formatted.forEach(repo => {
        if (repo.language && repo.language !== 'Unknown') {
          langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        }
      });

      setRepos(formatted);
      setLanguages(langCount);
      setStats({
        totalRepos: formatted.length,
        totalLanguages: Object.keys(langCount).length,
        lastUpdated: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('GitHub live fetch failed, using build-time data:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepos();

    const interval = setInterval(fetchRepos, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchRepos]);

  const refresh = () => {
    setLoading(true);
    fetchRepos();
  };

  return {
    repos,
    languages,
    stats,
    loading,
    error,
    refresh,
  };
}

export default useForgejoRepos;
