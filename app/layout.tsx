import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'gzen',
    template: '%s · gzen',
  },
  description: 'A philosophy platform centered on clarity, virtue, and disciplined thinking.',
  openGraph: {
    siteName: 'gzen',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-stone-200 bg-white sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-mono text-sm font-medium text-stone-800 tracking-tight hover:text-stone-600 transition-colors">
              gzen
            </a>
            <nav className="flex items-center gap-6">
              <a href="/posts" className="nav-link">writing</a>
              <a href="/principles" className="nav-link">principles</a>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-stone-200 bg-white mt-16">
          <div className="max-w-3xl mx-auto px-4 py-6 flex items-center justify-between">
            <span className="font-mono text-xs text-stone-400">gzen</span>
            <span className="text-xs text-stone-400">Meaning is made with repetitive narration.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
