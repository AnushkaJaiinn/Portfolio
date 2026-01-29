/** @type {import('next').NextConfig} */
// Keep basePath/assetPrefix configurable so static exports work when repo name or deploy target changes.
const repoNameFromEnv = process.env.NEXT_PUBLIC_BASE_PATH || '';
const githubRepo = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '';
const publicPath = repoNameFromEnv || (process.env.NODE_ENV === 'production' ? githubRepo : '');

const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true
  },
  basePath: publicPath,
  assetPrefix: publicPath,
  trailingSlash: true,
  generateEtags: false,
  poweredByHeader: false
};

module.exports = nextConfig;
