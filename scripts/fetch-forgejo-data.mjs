import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FORGEJO_API = 'https://git.khoavo.myds.me/api/v1';
const USERNAME = 'vndangkhoa';

async function fetchRepos() {
  const url = `${FORGEJO_API}/users/${USERNAME}/repos?limit=100`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();

  return data
    .map(r => ({
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      description: r.description || '',
      htmlUrl: r.html_url,
      language: r.language || '',
      updatedAt: r.updated_at,
      createdAt: r.created_at,
      mirror: r.mirror,
      mirrorUpdated: r.mirror_updated,
      topics: r.topics || [],
      stars: r.stars_count || 0,
      forks: r.forks_count || 0,
      watchers: r.watchers_count || 0,
      releases: r.release_counter || 0,
    }))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt) || new Date(b.createdAt) - new Date(a.createdAt));
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
    console.log(`[forgejo] Written ${repos.length} repos to src/data/forgejo-repos.json`);
  } catch (err) {
    console.error('[forgejo] Failed to fetch repos:', err.message);
    console.log('[forgejo] Continuing with existing data...');
  }
}

main();
