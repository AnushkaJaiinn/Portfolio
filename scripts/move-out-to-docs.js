// Moves default Next export (out/) to docs/ for GitHub Pages branch-based hosting
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');

async function exists(p) {
  try { await fsp.access(p, fs.constants.F_OK); return true; } catch { return false; }
}

async function rimraf(p) {
  if (!(await exists(p))) return;
  await fsp.rm(p, { recursive: true, force: true });
}

async function moveOrCopy(src, dest) {
  try {
    await fsp.rename(src, dest);
    return 'renamed';
  } catch (err) {
    // On Windows EPERM/EXDEV can block rename; fall back to copy + delete
    if (err && (err.code === 'EPERM' || err.code === 'EXDEV' || err.code === 'EACCES')) {
      await fsp.cp(src, dest, { recursive: true });
      await rimraf(src);
      return 'copied';
    }
    throw err;
  }
}

(async () => {
  const outDir = path.resolve(process.cwd(), 'out');
  const docsDir = path.resolve(process.cwd(), 'docs');
  if (!(await exists(outDir))) {
    console.warn('No out/ directory found; skipping move.');
    return;
  }
  await rimraf(docsDir);
  const mode = await moveOrCopy(outDir, docsDir);
  console.log(`${mode === 'renamed' ? 'Moved' : 'Copied'} out/ to docs/`);
})();
