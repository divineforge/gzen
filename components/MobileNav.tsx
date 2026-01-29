'use client';

import { useState, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/navigation';

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
}

export default function MobileNav({ navLinks }: MobileNavProps) {
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

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Full-width Dropdown Menu */}
      <div
        className={`fixed left-0 right-0 top-[73px] z-40 transform transition-all duration-300 ease-in-out ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-wisdom-bg border-b border-lotus-pink/20 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            {/* Navigation Links */}
            <nav>
              <ul className="space-y-1">
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

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-lotus-pink/20 text-center">
              <span className="text-2xl">🪷</span>
              <p className="text-sm text-zen-stone font-serif mt-1">
                禅生定，定生慧
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
