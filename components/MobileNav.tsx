'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
  locale: string;
}

const locales = [
  { code: 'zh', label: 'CN' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JP' },
];

export default function MobileNav({ navLinks, locale }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Get the path without the locale prefix for language switching
  const getPathWithoutLocale = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (locales.some(loc => loc.code === segments[0])) {
      segments.shift();
    }
    return '/' + segments.join('/');
  };

  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 text-wisdom-text hover:text-saffron p-2"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-wisdom-bg shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                      pathname === link.href
                        ? 'bg-saffron/10 text-saffron'
                        : 'text-wisdom-text hover:bg-lotus-cream/50 hover:text-saffron'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language Switcher */}
          <div className="border-t border-lotus-pink/20 py-6">
            <p className="text-sm text-zen-stone mb-3 px-4">Language</p>
            <div className="flex space-x-2 px-4">
              {locales.map((loc) => {
                const newPath = pathWithoutLocale === '/'
                  ? `/${loc.code}`
                  : `/${loc.code}${pathWithoutLocale}`;

                return (
                  <Link
                    key={loc.code}
                    href={newPath}
                    className={`flex-1 py-2 px-3 text-center rounded-lg font-medium transition-colors ${
                      locale === loc.code
                        ? 'bg-saffron text-white'
                        : 'bg-lotus-cream/50 text-zen-stone hover:bg-saffron/10 hover:text-saffron'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {loc.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="py-4 text-center text-sm text-zen-stone">
            <span className="text-xl">🪷</span>
            <p className="mt-1 font-serif">禅生定，定生慧</p>
          </div>
        </div>
      </div>
    </div>
  );
}
