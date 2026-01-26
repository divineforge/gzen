'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface LanguageSwitcherProps {
  currentLocale: string;
}

// Two modes: bilingual (zh) and Japanese only (ja)
const localeOptions = [
  { code: 'zh', label: 'EN/CN' },
  { code: 'ja', label: 'JP' },
];

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Get the path without the locale prefix
  const getPathWithoutLocale = () => {
    const segments = pathname.split('/').filter(Boolean);
    const localeCodes = ['zh', 'en', 'ja'];
    if (localeCodes.some(code => code === segments[0])) {
      segments.shift();
    }
    return '/' + segments.join('/');
  };

  const pathWithoutLocale = getPathWithoutLocale();

  // Treat 'en' as 'zh' for display purposes (both are bilingual)
  const displayLocale = currentLocale === 'en' ? 'zh' : currentLocale;

  return (
    <div className="flex items-center space-x-1 text-sm border-l border-lotus-pink/20 pl-4">
      {localeOptions.map((loc, index) => {
        const newPath = pathWithoutLocale === '/'
          ? `/${loc.code}`
          : `/${loc.code}${pathWithoutLocale}`;

        const isActive = displayLocale === loc.code;

        return (
          <span key={loc.code} className="flex items-center">
            <Link
              href={newPath}
              className={`px-2 py-1 rounded transition-colors ${
                isActive
                  ? 'bg-saffron text-white font-medium'
                  : 'text-zen-stone hover:text-saffron hover:bg-saffron/10'
              }`}
            >
              {loc.label}
            </Link>
            {index < localeOptions.length - 1 && (
              <span className="mx-1 text-lotus-pink/40">|</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
