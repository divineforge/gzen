'use client';

import { useState } from 'react';

interface LotusData {
  lunarDay: number;
  lotusStage: number;
  lotusEmoji: string;
  lotusDescription: string;
  isFullMoonDay: boolean;
  isNewMoonDay: boolean;
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
  const [previewOffset, setPreviewOffset] = useState(0);

  const isPreviewMode = previewOffset !== 0;

  // Calculate preview stage (wraps around 1-15)
  const getPreviewStage = (offset: number) => {
    let stage = data.lotusStage + offset;
    while (stage > 15) stage -= 15;
    while (stage < 1) stage += 15;
    return stage;
  };

  const currentPreviewStage = getPreviewStage(previewOffset);
  const currentStageData = data.allStages.find(s => s.stage === currentPreviewStage) || data.allStages[0];

  // Calculate preview lunar day
  const previewLunarDay = data.lunarDay + previewOffset;

  const handleNext = () => {
    setPreviewOffset(prev => (prev + 1) % 15);
  };

  const handlePrev = () => {
    setPreviewOffset(prev => (prev - 1 + 15) % 15);
  };

  const handleReset = () => {
    setPreviewOffset(0);
  };

  return (
    <div className="flex flex-col items-center mb-8">
      {/* Carousel Container */}
      <div className="relative w-full max-w-xs">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md text-saffron hover:bg-saffron hover:text-white transition-colors"
          aria-label="Previous"
        >
          ←
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md text-saffron hover:bg-saffron hover:text-white transition-colors"
          aria-label="Next"
        >
          →
        </button>

        {/* Main Emoji Display */}
        <div
          className={`text-center py-4 transition-all duration-300 ${
            isPreviewMode ? 'opacity-70' : ''
          }`}
        >
          <div className={`text-8xl sm:text-9xl mb-2 transition-transform duration-300 ${
            isPreviewMode ? 'scale-90' : ''
          }`}>
            {currentStageData.emoji}
          </div>

          {isPreviewMode && (
            <span className="inline-block bg-blue-400/80 text-white text-xs px-3 py-1 rounded-full mb-2">
              {locale === 'ja' ? 'プレビュー' : '预览 Preview'}
            </span>
          )}
        </div>
      </div>

      {/* Stage Info */}
      <div className="text-center mt-2">
        <p className={`text-3xl sm:text-4xl font-bold mb-2 ${
          isPreviewMode ? 'text-blue-400' : 'text-saffron'
        }`}>
          {locale === 'ja'
            ? `${isPreviewMode ? previewLunarDay : data.lunarDay}日目`
            : `第${isPreviewMode ? previewLunarDay : data.lunarDay}天`
          }
        </p>

        <p className={`text-xl sm:text-2xl font-serif mb-3 ${
          isPreviewMode ? 'text-blue-400/80' : 'text-wisdom-text'
        }`}>
          {currentStageData.description}
        </p>

        {/* Moon phase indicator - only show for actual day */}
        {!isPreviewMode && (data.isFullMoonDay || data.isNewMoonDay) && (
          <span className={`inline-block px-4 py-2 rounded-full text-lg font-medium ${
            data.isNewMoonDay
              ? 'bg-wisdom-text text-white'
              : 'bg-lotus-gold text-wisdom-text'
          }`}>
            {data.isNewMoonDay
              ? (locale === 'ja' ? '🌑 新月' : '🌑 朔月')
              : (locale === 'ja' ? '🪷✨ 満月' : '🪷✨ 望月')
            }
          </span>
        )}

        {/* Preview moon phases */}
        {isPreviewMode && (currentPreviewStage === 1 || currentPreviewStage === 15) && (
          <span className="inline-block px-4 py-2 rounded-full text-lg font-medium bg-blue-400/20 text-blue-500">
            {currentPreviewStage === 1
              ? (locale === 'ja' ? '🌑 新月' : '🌑 朔月')
              : (locale === 'ja' ? '🪷✨ 満月' : '🪷✨ 望月')
            }
          </span>
        )}
      </div>

      {/* Reset Button */}
      {isPreviewMode && (
        <button
          onClick={handleReset}
          className="mt-4 px-6 py-2 rounded-full text-sm font-medium bg-zen-stone/10 text-zen-stone border border-zen-stone/30 hover:bg-zen-stone/20 transition-colors"
        >
          {locale === 'ja' ? '今日に戻る' : '返回今天'}
        </button>
      )}

      {/* Mini Stage Indicators */}
      <div className="flex items-center gap-1 mt-4">
        {data.allStages.slice(0, 15).map((stage) => (
          <button
            key={stage.stage}
            onClick={() => setPreviewOffset(stage.stage - data.lotusStage)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentPreviewStage === stage.stage
                ? isPreviewMode
                  ? 'bg-blue-400 w-3 h-3'
                  : 'bg-saffron w-3 h-3'
                : 'bg-lotus-pink/30 hover:bg-lotus-pink/50'
            }`}
            aria-label={`Stage ${stage.stage}`}
          />
        ))}
      </div>
    </div>
  );
}
