'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

interface SidebarProps {
  currentLocale: string;
  navLinks: NavLink[];
}

const locales = [
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

export default function Sidebar({ currentLocale, navLinks }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getPathWithoutLocale = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (locales.some(loc => loc.code === segments[0])) {
      segments.shift();
    }
    return '/' + segments.join('/');
  };

  const pathWithoutLocale = getPathWithoutLocale();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="text-wisdom-text hover:text-saffron transition-colors p-2"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-lotus-pink/20">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🪷</span>
              <span className="font-bold text-saffron">GrowZen</span>
            </div>
            <button
              onClick={closeSidebar}
              className="text-zen-stone hover:text-saffron transition-colors p-1"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeSidebar}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      pathname === link.href
                        ? 'bg-saffron/10 text-saffron font-medium'
                        : 'text-wisdom-text hover:bg-lotus-cream/50 hover:text-saffron'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language Switcher Section */}
          <div className="border-t border-lotus-pink/20 p-4">
            <p className="text-xs text-zen-stone uppercase tracking-wider mb-3 px-2">
              {currentLocale === 'zh' ? '选择语言' : currentLocale === 'ja' ? '言語を選択' : 'Language'}
            </p>
            <ul className="space-y-1">
              {locales.map((loc) => {
                const newPath = pathWithoutLocale === '/'
                  ? `/${loc.code}`
                  : `/${loc.code}${pathWithoutLocale}`;

                return (
                  <li key={loc.code}>
                    <Link
                      href={newPath}
                      onClick={closeSidebar}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        currentLocale === loc.code
                          ? 'bg-saffron/10 text-saffron font-medium'
                          : 'text-wisdom-text hover:bg-lotus-cream/50 hover:text-saffron'
                      }`}
                    >
                      <span className="text-lg">{loc.flag}</span>
                      <span>{loc.label}</span>
                      {currentLocale === loc.code && (
                        <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Footer */}
          <div className="p-4 text-center text-xs text-zen-stone border-t border-lotus-pink/20">
            <p className="font-serif">禅生定，定生慧</p>
          </div>
        </div>
      </aside>
    </>
  );
}
