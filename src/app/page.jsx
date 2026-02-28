// Server Component wrapper — forces static generation at build time.
// Vercel will serve this page from the CDN edge (~50ms TTFB) instead of
// a cold-start serverless function (~4s TTFB).
export const dynamic = 'force-static';

import HomePageClient from './HomePageClient';

export default function Page() {
  return <HomePageClient />;
}
