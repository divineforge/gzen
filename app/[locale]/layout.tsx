import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Link from 'next/link';
import '../globals.css';
import MobileNav from '@/components/MobileNav';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  // English-only navigation
  const navLinks = [
    { href: `/${locale}`, label: 'Home' },
    { href: `/${locale}/posts`, label: 'Posts' },
    { href: `/${locale}/about`, label: 'About' },
  ];

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-wisdom-bg text-wisdom-text min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <header className="border-b border-lotus-pink/20 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
              <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <Link href={`/${locale}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <span className="text-3xl">🪷</span>
                    <div>
                      <h1 className="text-lg font-bold text-saffron">GrowZen</h1>
                      <p className="text-xs text-zen-stone font-serif">Calm grows wisdom</p>
                    </div>
                  </Link>

                  <div className="flex items-center space-x-6">
                    {/* Main Navigation */}
                    <ul className="hidden md:flex items-center space-x-6">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-wisdom-text hover:text-saffron transition-colors font-medium"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* Mobile Menu */}
                    <MobileNav navLinks={navLinks} />
                  </div>
                </div>
              </nav>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-lotus-pink/20 bg-white/50 mt-8">
              <div className="container mx-auto px-4 py-6 text-center text-zen-stone">
                <div className="text-3xl mb-2">🪷</div>
                <p className="text-sm max-w-md mx-auto leading-relaxed">
                  Simple Buddhist wisdom for calm living. <br className="sm:hidden" />
                  Grow with the lotus, one breath at a time.
                </p>
                <p className="mt-3 text-xs">
                  © {new Date().getFullYear()} GrowZen (gzen.io)
                </p>
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
