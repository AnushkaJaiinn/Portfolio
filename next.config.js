/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: { 
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/anushka-jain-portfolio-Copy' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/anushka-jain-portfolio-Copy' : '',
  trailingSlash: true,
  generateEtags: false,
  poweredByHeader: false
};

module.exports = nextConfig;
