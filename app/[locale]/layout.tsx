import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=Noto+Sans:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@400;600;700&family=Noto+Serif:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-wisdom-bg text-wisdom-text min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <header className="border-b border-lotus-pink/20 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
              <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">🪷</span>
                    <div>
                      <h1 className="text-xl font-bold text-saffron">GrowZen</h1>
                      <p className="text-sm text-zen-stone font-serif">禅生定，定生慧</p>
                    </div>
                  </div>
                  {/* Navigation will be added in next step */}
                </div>
              </nav>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-lotus-pink/20 bg-white/50 mt-12">
              <div className="container mx-auto px-4 py-8 text-center text-sm text-zen-stone">
                <p className="font-serif">🪷 禅生定，定生慧</p>
                <p className="mt-2">
                  © {new Date().getFullYear()} GrowZen. Built with wisdom and compassion.
                </p>
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
