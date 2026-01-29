import './globals.css';
import Navigation from '../components/Navigation';
import ScrollProgressBar from '../components/ScrollProgressBar';
import HashScrollHandler from '../components/HashScrollHandler';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Rebirth | Personal Brand Accelerator for Women',
  description: 'I help ambitious women build personal brands that command attention. No hype. Just clarity, strategy, and execution.',
  icons: {
    icon: './favicon.png',
    shortcut: './favicon.png',
    apple: './favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans leading-normal tracking-tight overflow-x-hidden">
        <HashScrollHandler />
        <ScrollProgressBar />
        <Navigation />
        <main className="flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}