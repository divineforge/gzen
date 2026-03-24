import type { Metadata } from 'next';
import Link from 'next/link';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import LanguageToggle from '@/components/LanguageToggle';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'GZen · 聚善',
    template: '%s · GZen',
  },
  description: '聚善：禅生定，定生慧。以文字修行，以智慧聚善。',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    siteName: 'GZen',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Noto Sans SC — industry-standard CJK font loaded via CDN at runtime.
            This approach (rather than next/font/google) is used because next/font/google
            requires network access to Google Fonts at build time, which is not available
            in all CI/build environments. On production (Vercel) the CDN link loads optimally. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="border-b sticky top-0 z-10" style={{ borderColor: '#f0d9c8', background: '#fffaf6' }}>
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
            <Link href="/" className="font-mono text-sm font-semibold tracking-tight hover:opacity-80 transition-opacity" style={{ color: '#7c4a1e' }}>
              GZen <span className="text-xs font-normal opacity-50 ml-1">聚善</span>
            </Link>
            <nav className="flex items-center gap-1 sm:gap-4 flex-1 justify-end">
              <Link href="/posts" className="nav-link flex flex-col items-center leading-none px-2 py-1.5 sm:px-0 sm:py-0 rounded hover:bg-lotus-peach sm:hover:bg-transparent transition-colors">
                <span className="text-xs font-medium" style={{ color: '#7c4a1e' }}>文章</span>
                <span className="text-[10px] opacity-40 hidden sm:block">writing</span>
              </Link>
              <Link href="/principles" className="nav-link flex flex-col items-center leading-none px-2 py-1.5 sm:px-0 sm:py-0 rounded hover:bg-lotus-peach sm:hover:bg-transparent transition-colors">
                <span className="text-xs font-medium" style={{ color: '#7c4a1e' }}>禅理</span>
                <span className="text-[10px] opacity-40 hidden sm:block">principles</span>
              </Link>
              <Link href="/about" className="nav-link flex flex-col items-center leading-none px-2 py-1.5 sm:px-0 sm:py-0 rounded hover:bg-lotus-peach sm:hover:bg-transparent transition-colors">
                <span className="text-xs font-medium" style={{ color: '#7c4a1e' }}>关于</span>
                <span className="text-[10px] opacity-40 hidden sm:block">about</span>
              </Link>
              <LanguageToggle />
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t mt-16" style={{ borderColor: '#f0d9c8', background: '#fffaf6' }}>
          <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Brand + tagline */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-6">
              <div>
                <p className="font-mono text-sm font-semibold mb-0.5" style={{ color: '#7c4a1e' }}>GZen · 聚善</p>
                <p className="text-xs" style={{ color: '#b07040', opacity: 0.7 }}>禅生定，定生慧</p>
              </div>

              {/* GZen Umbrella */}
              <div className="flex flex-col items-center sm:items-end gap-1">
                <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#c4a882' }}>GZen 生态</p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
                  <a href="https://learn.gzen.io" target="_blank" rel="noopener noreferrer"
                    className="text-xs transition-opacity hover:opacity-100 opacity-60" style={{ color: '#9a5c2a' }}>
                    learn.gzen →
                  </a>
                  <a href="https://invest.gzen.io" target="_blank" rel="noopener noreferrer"
                    className="text-xs transition-opacity hover:opacity-100 opacity-60" style={{ color: '#9a5c2a' }}>
                    invest.gzen →
                  </a>
                  <a href="https://architect.gzen.io" target="_blank" rel="noopener noreferrer"
                    className="text-xs transition-opacity hover:opacity-100 opacity-60" style={{ color: '#9a5c2a' }}>
                    architect.gzen →
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 flex items-center justify-between" style={{ borderColor: '#f0d9c8' }}>
              <span className="text-[11px]" style={{ color: '#c4a882' }}>© GZen</span>
              <Link href="/about" className="text-[11px] hover:opacity-100 opacity-50 transition-opacity" style={{ color: '#9a5c2a' }}>
                关于 GZen
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

