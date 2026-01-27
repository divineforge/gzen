'use client';

import { useRouter, usePathname } from '@/i18n/navigation';

interface LanguageSwitcherProps {
  currentLocale: string;
}

// Three separate locales: Chinese, English, Japanese
const localeOptions = [
  { code: 'zh' as const, label: '中文' },
  { code: 'en' as const, label: 'EN' },
  { code: 'ja' as const, label: '日本語' },
];

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: 'zh' | 'en' | 'ja') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center space-x-1 text-sm border-l border-lotus-pink/20 pl-4">
      {localeOptions.map((loc, index) => {
        const isActive = currentLocale === loc.code;

        return (
          <span key={loc.code} className="flex items-center">
            <button
              onClick={() => handleLocaleChange(loc.code)}
              className={`px-2 py-1.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-saffron text-white font-medium'
                  : 'text-zen-stone hover:text-saffron hover:bg-saffron/10'
              }`}
            >
              {loc.label}
            </button>
            {index < localeOptions.length - 1 && (
              <span className="mx-0.5 text-lotus-pink/40">|</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
