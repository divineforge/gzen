'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface LotusData {
  lunarDay: number;
  lotusStage: number;
  lotusEmoji: string;
  lotusDescription: string;
  isFullMoonDay: boolean;
  isNewMoonDay: boolean;
  // Pre-computed next stage data
  allStages: {
    stage: number;
    emoji: string;
    description: string;
  }[];
}

interface LotusPreviewProps {
  data: LotusData;
  locale: string;
}

export default function LotusPreview({ data, locale }: LotusPreviewProps) {
  const t = useTranslations();
  const [previewStage, setPreviewStage] = useState<number | null>(null);

  const isPreviewMode = previewStage !== null;
  const currentStage = previewStage ?? data.lotusStage;
  const currentStageData = data.allStages.find(s => s.stage === currentStage) || data.allStages[0];

  const handlePreviewNext = () => {
    const nextStage = currentStage >= 15 ? 1 : currentStage + 1;
    setPreviewStage(nextStage);
  };

  const handleReset = () => {
    setPreviewStage(null);
  };

  // Calculate the displayed lunar day for preview
  const displayedLunarDay = isPreviewMode
    ? (previewStage! > data.lotusStage
        ? data.lunarDay + (previewStage! - data.lotusStage)
        : data.lunarDay + (15 - data.lotusStage) + previewStage!)
    : data.lunarDay;

  const isPreviewFullMoon = isPreviewMode && previewStage === 15;
  const isPreviewNewMoon = isPreviewMode && previewStage === 1;

  return (
    <div className="lotus-container mb-8">
      <div
        className={`lotus-visual relative transition-all duration-500 ${
          isPreviewMode
            ? 'opacity-50 [filter:drop-shadow(0_0_20px_rgba(147,197,253,0.8))_drop-shadow(0_0_40px_rgba(147,197,253,0.5))]'
            : ''
        }`}
      >
        <span className="animate-lotus-grow text-6xl">{currentStageData.emoji}</span>
        {isPreviewMode && (
          <div className="absolute -top-2 -right-2 bg-blue-400/80 text-white text-xs px-2 py-1 rounded-full">
            {t('lotus.preview')}
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <p className={`text-sm ${isPreviewMode ? 'text-blue-400' : 'text-zen-stone'}`}>
          {t('lotus.lunarDay', { day: displayedLunarDay > 30 ? displayedLunarDay - 30 : displayedLunarDay })}
          {isPreviewMode && <span className="ml-2 text-blue-400">({t('lotus.visionNotCurrent')})</span>}
        </p>
        <p className={`text-sm font-medium ${isPreviewMode ? 'text-blue-400' : 'text-saffron'}`}>
          {t('lotus.cycle', { current: currentStage, total: 15 })}
        </p>
        <p className={`text-base font-serif ${isPreviewMode ? 'text-blue-400/80' : 'text-wisdom-text'}`}>
          {currentStageData.description}
        </p>

        {/* Moon phase indicators */}
        {!isPreviewMode && (data.isFullMoonDay || data.isNewMoonDay) && (
          <p className="text-sm font-semibold text-lotus-gold mt-4">
            {data.isFullMoonDay ? t('lotus.fullMoon') : t('lotus.newMoon')}
          </p>
        )}
        {isPreviewMode && (isPreviewFullMoon || isPreviewNewMoon) && (
          <p className="text-sm font-semibold text-blue-400 mt-4">
            {isPreviewFullMoon ? t('lotus.fullMoon') : t('lotus.newMoon')}
          </p>
        )}
      </div>

      {/* Preview Controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={handlePreviewNext}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            isPreviewMode
              ? 'bg-blue-400/20 text-blue-500 border border-blue-400/50 hover:bg-blue-400/30'
              : 'bg-saffron/10 text-saffron border border-saffron/30 hover:bg-saffron/20'
          }`}
        >
          {t('lotus.previewNext')}
        </button>

        {isPreviewMode && (
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-full text-sm font-medium bg-zen-stone/10 text-zen-stone border border-zen-stone/30 hover:bg-zen-stone/20 transition-all duration-300"
          >
            {t('lotus.backToToday')}
          </button>
        )}
      </div>
    </div>
  );
}
