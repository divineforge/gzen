'use client';

import { useRouter, usePathname } from '@/i18n/navigation';

interface LanguageSwitcherProps {
  currentLocale: string;
}

// Two modes: bilingual (zh - default) and Japanese only (ja)
const localeOptions = [
  { code: 'zh' as const, label: 'EN/CN' },
  { code: 'ja' as const, label: 'JP' },
];

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Treat 'en' as 'zh' for display purposes (both are bilingual)
  const displayLocale = currentLocale === 'en' ? 'zh' : currentLocale;

  const handleLocaleChange = (newLocale: 'zh' | 'ja') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center space-x-1 text-sm border-l border-lotus-pink/20 pl-4">
      {localeOptions.map((loc, index) => {
        const isActive = displayLocale === loc.code;

        return (
          <span key={loc.code} className="flex items-center">
            <button
              onClick={() => handleLocaleChange(loc.code)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-saffron text-white font-medium'
                  : 'text-zen-stone hover:text-saffron hover:bg-saffron/10'
              }`}
            >
              {loc.label}
            </button>
            {index < localeOptions.length - 1 && (
              <span className="mx-1 text-lotus-pink/40">|</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
