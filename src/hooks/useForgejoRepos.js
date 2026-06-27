import { useState, useEffect, useCallback } from 'react';
import buildData from '../data/forgejo-repos.json';

const FORGEJO_API = 'https://git.khoavo.myds.me/api/v1';
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

const initRepos = (buildData.repos || []).map(formatRepo);
const initLanguages = buildData.languages || {};
const initStats = {
  totalRepos: buildData.totalRepos || initRepos.length,
  totalLanguages: buildData.totalLanguages || Object.keys(initLanguages).length,
  lastUpdated: buildData.fetchedAt || null,
};

const formatRemoteRepo = (repo) => ({
  id: repo.id,
  name: repo.name,
  fullName: repo.full_name,
  description: repo.description || `${repo.language || 'Unknown'} project`,
  htmlUrl: repo.html_url,
  language: repo.language || 'Unknown',
  updatedAt: repo.updated_at,
  createdAt: repo.created_at,
  mirror: repo.mirror,
  mirrorUpdated: repo.mirror_updated,
  topics: repo.topics || [],
  stars: repo.stars_count || 0,
  forks: repo.forks_count || 0,
  watchers: repo.watchers_count || 0,
  releases: repo.release_counter || 0,
});

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

      const response = await fetch(`${FORGEJO_API}/users/${USERNAME}/repos?limit=100`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      const formatted = data
        .map(formatRemoteRepo)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt) || new Date(b.createdAt) - new Date(a.createdAt));

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
      console.warn('Forgejo live fetch failed, using build-time data:', err.message);
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
