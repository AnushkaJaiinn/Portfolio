// Ensures GitHub Pages serves Next.js static export correctly
// - Adds .nojekyll so the _next directory isn't ignored by Jekyll
// - Optionally logs a friendly summary

const { writeFile, access } = require('node:fs/promises');
const { constants } = require('node:fs');
const { resolve } = require('node:path');

const docsDir = resolve(process.cwd(), 'docs');

async function ensureNoJekyll() {
  try {
    const path = resolve(docsDir, '.nojekyll');
    // If the file exists, do nothing; otherwise create it
    await access(path, constants.F_OK).catch(async () => {
      await writeFile(path, '', 'utf8');
      console.log('Created docs/.nojekyll');
    });
  } catch (err) {
    console.warn('Warning: unable to ensure .nojekyll:', (err && err.message) || err);
  }
}

(async () => {
  await ensureNoJekyll();
  console.log('Post-export checks completed.');
})();
