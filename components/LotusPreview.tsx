'use client';

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
  return (
    <div className="flex flex-col items-center mb-8">
      {/* Large Emoji */}
      <div className="text-7xl sm:text-8xl mb-4">
        {data.lotusEmoji}
      </div>

      {/* Lunar Day - Big and Clear */}
      <div className="text-center">
        <p className="text-3xl sm:text-4xl font-bold text-saffron mb-2">
          {locale === 'ja'
            ? `${data.lunarDay}日目`
            : `第${data.lunarDay}天`
          }
        </p>

        <p className="text-xl sm:text-2xl font-serif text-wisdom-text mb-3">
          {data.lotusDescription}
        </p>

        {/* Moon phase indicator */}
        {(data.isFullMoonDay || data.isNewMoonDay) && (
          <span className={`inline-block px-4 py-2 rounded-full text-lg font-medium ${
            data.isNewMoonDay
              ? 'bg-wisdom-text text-white'
              : 'bg-lotus-gold text-wisdom-text'
          }`}>
            {data.isNewMoonDay
              ? (locale === 'ja' ? '🌑 新月' : '🌑 朔月 New Moon')
              : (locale === 'ja' ? '🪷✨ 満月' : '🪷✨ 望月 Full Moon')
            }
          </span>
        )}
      </div>
    </div>
  );
}
