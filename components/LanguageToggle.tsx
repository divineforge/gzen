'use client';

import { useState, useEffect } from 'react';

export type SecondaryLang = 'en' | 'ja';

const STORAGE_KEY = 'gzen-secondary-lang';

export function useSecondaryLang(): [SecondaryLang, (l: SecondaryLang) => void] {
  const [lang, setLangState] = useState<SecondaryLang>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as SecondaryLang | null;
    if (stored === 'en' || stored === 'ja') setLangState(stored);
  }, []);

  const setLang = (l: SecondaryLang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  return [lang, setLang, mounted] as unknown as [SecondaryLang, (l: SecondaryLang) => void];
}

export default function LanguageToggle() {
  const [lang, setLang] = useState<SecondaryLang>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as SecondaryLang | null;
    if (stored === 'en' || stored === 'ja') setLang(stored);
  }, []);

  const handleToggle = (l: SecondaryLang) => {
    setLang(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  // Render placeholder on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className="flex items-center gap-0.5 rounded-full overflow-hidden text-[11px] font-medium"
        style={{ border: '1px solid #f0d9c8' }}
        aria-hidden="true"
      >
        <span className="px-2 py-1" style={{ color: '#c4a882' }}>EN</span>
        <span className="px-2 py-1" style={{ color: '#c4a882' }}>日</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-full overflow-hidden text-[11px] font-medium"
      style={{ border: '1px solid #f0d9c8' }}
    >
      <button
        className="px-2 py-1 transition-colors"
        style={{
          background: lang === 'en' ? '#f8e8d4' : 'transparent',
          color: lang === 'en' ? '#9a5c2a' : '#c4a882',
        }}
        onClick={() => handleToggle('en')}
        aria-pressed={lang === 'en'}
        title="Show English secondary"
      >
        EN
      </button>
      <button
        className="px-2 py-1 transition-colors"
        style={{
          background: lang === 'ja' ? '#f8e8d4' : 'transparent',
          color: lang === 'ja' ? '#9a5c2a' : '#c4a882',
        }}
        onClick={() => handleToggle('ja')}
        aria-pressed={lang === 'ja'}
        title="日本語を表示"
      >
        日
      </button>
    </div>
  );
}
