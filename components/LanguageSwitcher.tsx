'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface LanguageSwitcherProps {
  currentLocale: string;
}

const locales = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
];

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Get the path without the locale prefix
  const getPathWithoutLocale = () => {
    // Remove the locale prefix from the path
    const segments = pathname.split('/').filter(Boolean);
    if (locales.some(loc => loc.code === segments[0])) {
      segments.shift();
    }
    return '/' + segments.join('/');
  };

  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <div className="flex items-center space-x-2 text-sm border-l border-lotus-pink/20 pl-4">
      {locales.map((loc, index) => {
        // Build the new path with the target locale
        const newPath = pathWithoutLocale === '/'
          ? `/${loc.code}`
          : `/${loc.code}${pathWithoutLocale}`;

        return (
          <span key={loc.code} className="flex items-center">
            <Link
              href={newPath}
              className={`hover:text-saffron transition-colors ${
                currentLocale === loc.code ? 'text-saffron font-semibold' : 'text-zen-stone'
              }`}
            >
              {loc.label}
            </Link>
            {index < locales.length - 1 && (
              <span className="mx-2 text-lotus-pink/40">|</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
