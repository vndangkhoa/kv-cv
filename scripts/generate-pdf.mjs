#!/usr/bin/env node
import { spawn } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const publicDir = resolve(rootDir, 'public');

const TARGETS = [
  { mode: 'design', filename: 'Khoa_Vo_Creative_AI_Lead_CV.pdf' },
  { mode: 'it', filename: 'Khoa_Vo_Security_Architect_CV.pdf' },
  { mode: 'all', filename: 'Khoa_Vo_Full_Portfolio_CV.pdf' },
];

async function generate() {
  console.log('[pdf] Starting vector PDF generator (V2 Swiss Architectural Grid)...');

  // Find Chrome/Chromium
  const browsers = ['google-chrome', 'chromium', 'chromium-browser'];
  let chromeBin = null;
  for (const b of browsers) {
    try {
      const proc = spawn('which', [b]);
      await new Promise((res) =>
        proc.on('close', (code) => {
          if (code === 0) chromeBin = b;
          res();
        })
      );
      if (chromeBin) break;
    } catch {}
  }

  if (!chromeBin) {
    console.warn('[pdf] Chrome/Chromium not found. Skipping vector PDF pre-render.');
    return;
  }

  // Check if server is running or start temporary vite preview
  let devProc = null;
  let baseUrl = 'http://localhost:5173';
  try {
    const res = await fetch(baseUrl);
    if (!res.ok) throw new Error('Not ok');
  } catch {
    console.log('[pdf] Starting temporary Vite preview server...');
    devProc = spawn('npx', ['vite', 'preview', '--port', '4173'], {
      cwd: rootDir,
      detached: true,
      stdio: 'ignore',
    });
    baseUrl = 'http://localhost:4173';
    await new Promise((r) => setTimeout(r, 2000));
  }

  try {
    for (const target of TARGETS) {
      const outPath = resolve(publicDir, target.filename);
      const url = `${baseUrl}/?cv=true&mode=${target.mode}`;
      console.log(`[pdf] Generating ${target.filename} from ${url}...`);

      await new Promise((res, rej) => {
        const cp = spawn(
          chromeBin,
          [
            '--headless',
            '--disable-gpu',
            '--no-pdf-header-footer',
            `--print-to-pdf=${outPath}`,
            url,
          ],
          { stdio: 'ignore' }
        );
        cp.on('close', (code) => {
          if (code === 0) {
            console.log(`[pdf] ✓ Successfully wrote ${target.filename}`);
            res();
          } else {
            rej(new Error(`Chrome exited with code ${code}`));
          }
        });
      });
    }
  } finally {
    if (devProc && devProc.pid) {
      try {
        process.kill(-devProc.pid, 'SIGTERM');
      } catch {
        devProc.kill('SIGTERM');
      }
    }
  }
}

generate().catch((err) => {
  console.error('[pdf] Generation failed:', err);
  process.exit(1);
});
