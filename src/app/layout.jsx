import './globals.css';

export const metadata = {
  title: 'Rebirth | Personal Brand Accelerator for Women',
  description: 'Your Next Chapter Starts Here.',
  icons: {
    icon: './favicon.png',
    shortcut: './favicon.png',
    apple: './favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans leading-normal tracking-tight overflow-x-hidden">
        <main className="flex flex-col">
          {children}
        </main>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="py-10 pb-8 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream">
          <div className="container mx-auto px-6 text-center space-y-2">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Rebirth by Anushka Jain. All rights reserved.
            </p>
            {/* Engineering credit */}
            <p className="text-gray-400 text-[12px] tracking-wide">
              Engineered by{' '}
              <a
                href="https://jaibhagwanjindal.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-anushka-500 transition-colors duration-300 hover:underline underline-offset-2"
              >
                Jaibhagwan Jindal
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}