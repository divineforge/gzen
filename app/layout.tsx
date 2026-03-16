import type { Metadata } from 'next';
import Link from 'next/link';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'gzen · 聚善',
    template: '%s · gzen',
  },
  description: '聚善：禅生定，定生慧。以文字修行，以智慧聚善。',
  openGraph: {
    siteName: 'gzen',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-amber-200 bg-white sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-mono text-sm font-medium tracking-tight hover:text-saffron-600 transition-colors" style={{ color: '#78350f' }}>
              gzen <span className="text-xs font-normal opacity-60 ml-1">聚善</span>
            </Link>
            <nav className="flex items-center gap-1 sm:gap-6">
              <Link href="/posts" className="nav-link flex flex-col items-center leading-none px-3 py-2 sm:px-0 sm:py-0 rounded hover:bg-amber-50 sm:hover:bg-transparent transition-colors">
                <span className="text-xs font-medium" style={{ color: '#78350f' }}>文章</span>
                <span className="text-[10px] opacity-40 hidden sm:block">writing</span>
              </Link>
              <Link href="/principles" className="nav-link flex flex-col items-center leading-none px-3 py-2 sm:px-0 sm:py-0 rounded hover:bg-amber-50 sm:hover:bg-transparent transition-colors">
                <span className="text-xs font-medium" style={{ color: '#78350f' }}>禅理</span>
                <span className="text-[10px] opacity-40 hidden sm:block">principles</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-amber-200 bg-white mt-16">
          <div className="max-w-3xl mx-auto px-4 py-6 flex items-center justify-between">
            <span className="font-mono text-xs" style={{ color: '#92400e' }}>gzen</span>
            <span className="text-xs text-center" style={{ color: '#92400e', opacity: 0.7 }}>
              聚善：禅生定，定生慧
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
