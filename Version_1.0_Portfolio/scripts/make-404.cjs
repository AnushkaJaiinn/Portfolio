const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '..', 'docs');
const indexPath = path.join(outDir, 'index.html');
const notFoundPath = path.join(outDir, '404.html');
const noJekyllPath = path.join(outDir, '.nojekyll');

if (!fs.existsSync(outDir)) {
  console.warn('docs/ folder not found. Skipping 404 and .nojekyll creation.');
  process.exit(0);
}

try {
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log('Created docs/404.html for SPA routing');
  } else {
    console.warn('index.html not found in docs; skipping 404.html creation');
  }

  // Ensure GitHub Pages does not run Jekyll so asset paths and folders work as-is
  fs.writeFileSync(noJekyllPath, '');
  console.log('Created docs/.nojekyll to disable Jekyll');
} catch (err) {
  console.error('Postbuild step failed:', err);
  process.exit(1);
}
