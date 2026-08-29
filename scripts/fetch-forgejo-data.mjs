import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FORGEJO_API = 'https://git.khoavo.myds.me/api/v1';
const USERNAME = 'vndangkhoa';

const FEATURED_REPOS = [
  {
    id: 99,
    name: "spkrepo",
    fullName: "vndangkhoa/spkrepo",
    description: "Synology Community Package Center & Repository Server (pkg.khoavo.myds.me) — serves custom SPK packages with GPG signing for 1-click install in DSM Package Center",
    htmlUrl: "https://git.khoavo.myds.me/vndangkhoa/spkrepo",
    language: "Python",
    updatedAt: "2026-08-29T14:30:00+07:00",
    createdAt: "2026-08-20T10:00:00+07:00",
    mirror: false,
    mirrorUpdated: "0001-01-01T00:00:00Z",
    topics: ["synology", "package-center", "spk", "gpg", "repository", "dsm"],
    stars: 1,
    forks: 0,
    watchers: 1,
    releases: 1
  }
];

async function fetchRepos() {
  const token = process.env.FORGEJO_TOKEN || process.env.GIT_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};
  const url = token
    ? `${FORGEJO_API}/user/repos?limit=100`
    : `${FORGEJO_API}/users/${USERNAME}/repos?limit=100`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();

  const fetched = data.map(r => ({
    id: r.id,
    name: r.name,
    fullName: r.full_name,
    description: r.name === 'kv-synology'
      ? "Synology DSM Web Manager & AI MCP Hub — Next.js 15, React 19, QuickConnect resolver, services controller (SMB, NFS, SSH, WebDAV), and 42 AI MCP tools"
      : (r.description || ''),
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
  }));

  // Merge featured repos if not already in list
  for (const featured of FEATURED_REPOS) {
    if (!fetched.some(r => r.name === featured.name)) {
      fetched.push(featured);
    }
  }

  return fetched.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt) || new Date(b.createdAt) - new Date(a.createdAt));
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
