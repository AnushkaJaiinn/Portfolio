/** @type {import('next').NextConfig} */
// Keep basePath/assetPrefix configurable so static exports work when repo name or deploy target changes.
const repoNameFromEnv = process.env.NEXT_PUBLIC_BASE_PATH || '';
const githubRepo = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '';
const publicPath = repoNameFromEnv || (process.env.NODE_ENV === 'production' ? githubRepo : '');

// Set NEXT_PUBLIC_STATIC_EXPORT=true when building for GitHub Pages / static hosting.
// Leave unset (or false) for Vercel deployments — this enables serverless API routes
// (api/topmate-webhook and api/check-booking) which require a Node.js runtime.
// GITHUB_PAGES is automatically set to 'true' by actions/configure-pages in CI.
const isStaticExport =
  process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true' ||
  process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  ...(isStaticExport && { output: 'export', distDir: 'out' }),
  images: {
    // Disable optimization only for static exports (GitHub Pages).
    // On Vercel, let the platform optimize images for best performance.
    unoptimized: isStaticExport,
  },
  basePath: publicPath,
  assetPrefix: publicPath,
  trailingSlash: true,
  generateEtags: false,
  poweredByHeader: false
};

module.exports = nextConfig;
