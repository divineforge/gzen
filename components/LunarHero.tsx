'use client';

import { useState } from 'react';

export interface LunarStage {
  stage: number;
  emoji: string;
  description: string;
  chineseDescription: string;
}

export interface LunarHeroProps {
  currentLunarDay: number;
  lunarMonthName: string;
  lunarYearName: string;
  daysInMonth: number;
  allStages: LunarStage[];
}

/**
 * Per-day gradient backgrounds following the 30-day Chinese lunar cycle.
 * Days 1–14: waxing (dark → warm)
 * Day 15: full moon peak (golden)
 * Days 16–30: waning (warm → dark)
 */
const LUNAR_THEMES: Record<number, { bg: string; textClass: string }> = {
  1:  { bg: 'linear-gradient(135deg, #080816 0%, #0e0d22 60%, #0b0b18 100%)', textClass: 'text-indigo-200' },
  2:  { bg: 'linear-gradient(135deg, #0a0c1c 0%, #12143a 60%, #0d1026 100%)', textClass: 'text-indigo-200' },
  3:  { bg: 'linear-gradient(135deg, #0c1024 0%, #171a50 60%, #101428 100%)', textClass: 'text-blue-200' },
  4:  { bg: 'linear-gradient(135deg, #0e1430 0%, #1a2464 60%, #101835 100%)', textClass: 'text-blue-200' },
  5:  { bg: 'linear-gradient(135deg, #0d1830 0%, #1a2e58 60%, #0f1d35 100%)', textClass: 'text-sky-200' },
  6:  { bg: 'linear-gradient(135deg, #0c1e30 0%, #143848 60%, #0e2030 100%)', textClass: 'text-sky-200' },
  7:  { bg: 'linear-gradient(135deg, #0c2030 0%, #14443c 60%, #0d2430 100%)', textClass: 'text-teal-200' },
  8:  { bg: 'linear-gradient(135deg, #0d2430 0%, #185040 60%, #0f2a28 100%)', textClass: 'text-teal-200' },
  9:  { bg: 'linear-gradient(135deg, #0e2a28 0%, #1a5030 60%, #102e20 100%)', textClass: 'text-emerald-200' },
  10: { bg: 'linear-gradient(135deg, #102c20 0%, #205e28 60%, #123015 100%)', textClass: 'text-emerald-200' },
  11: { bg: 'linear-gradient(135deg, #123015 0%, #356820 60%, #1e3810 100%)', textClass: 'text-lime-200' },
  12: { bg: 'linear-gradient(135deg, #283818 0%, #556820 60%, #3c4410 100%)', textClass: 'text-yellow-200' },
  13: { bg: 'linear-gradient(135deg, #3c4010 0%, #786020 60%, #4a4010 100%)', textClass: 'text-yellow-200' },
  14: { bg: 'linear-gradient(135deg, #504010 0%, #9c7020 60%, #604010 100%)', textClass: 'text-amber-200' },
  15: { bg: 'linear-gradient(135deg, #8c6210 0%, #d4a020 60%, #9a6c10 100%)', textClass: 'text-amber-900' }, // Full Moon — bright
  16: { bg: 'linear-gradient(135deg, #7a5010 0%, #b87020 60%, #623808 100%)', textClass: 'text-amber-200' },
  17: { bg: 'linear-gradient(135deg, #623808 0%, #9e6020 60%, #502e10 100%)', textClass: 'text-orange-200' },
  18: { bg: 'linear-gradient(135deg, #502e10 0%, #844e28 60%, #422018 100%)', textClass: 'text-orange-200' },
  19: { bg: 'linear-gradient(135deg, #422018 0%, #6c3c30 60%, #361c1c 100%)', textClass: 'text-rose-200' },
  20: { bg: 'linear-gradient(135deg, #361c1c 0%, #583830 60%, #2c1c1c 100%)', textClass: 'text-rose-200' },
  21: { bg: 'linear-gradient(135deg, #2c1c1c 0%, #483e30 60%, #241c18 100%)', textClass: 'text-stone-300' },
  22: { bg: 'linear-gradient(135deg, #241c18 0%, #3a3830 60%, #1e1c18 100%)', textClass: 'text-stone-300' },
  23: { bg: 'linear-gradient(135deg, #1e1c18 0%, #2e2e2a 60%, #181818 100%)', textClass: 'text-stone-400' },
  24: { bg: 'linear-gradient(135deg, #181818 0%, #24242c 60%, #141420 100%)', textClass: 'text-slate-300' },
  25: { bg: 'linear-gradient(135deg, #141420 0%, #1e1e2a 60%, #101018 100%)', textClass: 'text-slate-300' },
  26: { bg: 'linear-gradient(135deg, #101018 0%, #18181e 60%, #0c0c14 100%)', textClass: 'text-slate-400' },
  27: { bg: 'linear-gradient(135deg, #0c0c14 0%, #141418 60%, #080810 100%)', textClass: 'text-slate-400' },
  28: { bg: 'linear-gradient(135deg, #080810 0%, #10101c 60%, #080808 100%)', textClass: 'text-indigo-300' },
  29: { bg: 'linear-gradient(135deg, #080808 0%, #0c0c16 60%, #080812 100%)', textClass: 'text-indigo-300' },
  30: { bg: 'linear-gradient(135deg, #080812 0%, #0a0a1c 60%, #0c0c18 100%)', textClass: 'text-indigo-200' },
};

function getTheme(day: number) {
  return LUNAR_THEMES[day] ?? LUNAR_THEMES[1];
}

export default function LunarHero({
  currentLunarDay,
  lunarMonthName,
  lunarYearName,
  daysInMonth,
  allStages,
}: LunarHeroProps) {
  const [previewOffset, setPreviewOffset] = useState(0);

  const totalDays = daysInMonth || 30;
  const isPreviewMode = previewOffset !== 0;

  // Compute the currently viewed stage (wraps around the cycle)
  const getViewedStage = (offset: number): number => {
    let stage = currentLunarDay + offset;
    while (stage > totalDays) stage -= totalDays;
    while (stage < 1) stage += totalDays;
    return stage;
  };

  const viewedDay = getViewedStage(previewOffset);
  const stageData = allStages.find((s) => s.stage === viewedDay) ?? allStages[0];
  const theme = getTheme(viewedDay);

  const isViewedFullMoon = viewedDay === 15;
  const isViewedNewMoon = viewedDay === 1;

  const handlePrev = () =>
    setPreviewOffset((p) => {
      const n = p - 1;
      return n < -(totalDays - 1) ? 0 : n;
    });

  const handleNext = () =>
    setPreviewOffset((p) => {
      const n = p + 1;
      return n >= totalDays ? 0 : n;
    });

  const handleReset = () => setPreviewOffset(0);

  const handleDotClick = (stage: number) =>
    setPreviewOffset(stage - currentLunarDay);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '48vh' }}
      aria-label="Lunar phase backdrop"
    >
      {/* Dynamic gradient background — changes per lunar day */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ background: theme.bg }}
      />

      {/* Soft radial glow at centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isViewedFullMoon
            ? 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,160,32,0.30) 0%, transparent 70%)'
            : isViewedNewMoon
            ? 'radial-gradient(ellipse 40% 35% at 50% 40%, rgba(99,102,241,0.18) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 50% 45% at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* ── Hero content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-14 pb-20">

        {/* Preview badge */}
        {isPreviewMode && (
          <span className="mb-3 inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/20">
            Preview — day {viewedDay}
          </span>
        )}

        {/* Main emoji */}
        <div
          className={`text-7xl sm:text-8xl mb-3 select-none transition-all duration-500 ${isPreviewMode ? 'opacity-70 scale-90' : ''}`}
          role="img"
          aria-label={`Lunar day ${viewedDay}`}
        >
          {stageData.emoji}
        </div>

        {/* Day label */}
        <p className={`text-sm font-medium mb-1 transition-colors duration-500 ${theme.textClass} opacity-60`}>
          Lunar day {viewedDay}
          {(isViewedFullMoon || isViewedNewMoon) && (
            <span className="ml-2">{isViewedFullMoon ? '· Full Moon 🌕' : '· New Moon 🌑'}</span>
          )}
        </p>

        {/* Stage description */}
        <p className={`text-lg sm:text-xl font-medium mb-0.5 text-center max-w-xs transition-colors duration-500 ${theme.textClass}`}>
          {stageData.description}
        </p>
        <p className={`text-sm mb-4 text-center transition-colors duration-500 ${theme.textClass} opacity-50`}>
          {stageData.chineseDescription}
        </p>

        {/* Lunar month info (only shown on today) */}
        {!isPreviewMode && (
          <p className={`text-xs mb-6 ${theme.textClass} opacity-40`}>
            {lunarMonthName}月 · {lunarYearName}年
          </p>
        )}

        {/* ← → Navigation */}
        <div className="flex items-center gap-5 mb-5">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all border border-white/15"
            aria-label="Previous lunar day"
          >
            ←
          </button>

          {isPreviewMode ? (
            <button
              onClick={handleReset}
              className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all border border-white/15"
              aria-label="Return to today"
            >
              today
            </button>
          ) : (
            <span className={`text-xs ${theme.textClass} opacity-30`}>today</span>
          )}

          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all border border-white/15"
            aria-label="Next lunar day"
          >
            →
          </button>
        </div>

        {/* Dot indicators — two rows of 15 */}
        <div className="flex flex-col gap-1.5" aria-label="Lunar cycle progress">
          {/* Days 1–15: waxing */}
          <div className="flex items-center gap-1">
            {allStages.slice(0, 15).map((s) => (
              <button
                key={s.stage}
                onClick={() => handleDotClick(s.stage)}
                aria-label={`Go to lunar day ${s.stage}`}
                className={`rounded-full transition-all duration-300 ${
                  viewedDay === s.stage
                    ? 'bg-white w-2.5 h-2.5'
                    : s.stage === 15
                    ? 'bg-white/50 w-2 h-2 hover:bg-white/70'
                    : 'bg-white/20 w-1.5 h-1.5 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          {/* Days 16–30: waning */}
          <div className="flex items-center gap-1">
            {allStages.slice(15, 30).map((s) => (
              <button
                key={s.stage}
                onClick={() => handleDotClick(s.stage)}
                aria-label={`Go to lunar day ${s.stage}`}
                className={`rounded-full transition-all duration-300 ${
                  viewedDay === s.stage
                    ? 'bg-white w-2.5 h-2.5'
                    : 'bg-white/20 w-1.5 h-1.5 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-white/25 text-xs mt-0.5 px-0.5">
            <span>🌑 grow</span>
            <span>fade 🌑</span>
          </div>
        </div>
      </div>

      {/* Scroll-fade: gradient overlay that blends into page background (stone-50) */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '40%',
          background: 'linear-gradient(to bottom, transparent 0%, #fafaf9 100%)',
        }}
      />
    </section>
  );
}
