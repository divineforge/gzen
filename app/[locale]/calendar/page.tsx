import { getTranslations } from 'next-intl/server';
import {
  getLunarDate,
  getLunarDay,
  getLotusStage,
  getLotusEmoji,
  getLotusStageDescription,
  isEvenLunarDay,
  isFullMoon,
  isNewMoon,
  getBuddhistFestivals,
  getNextPeakDate,
  getNextBlogPostDate,
} from '@/lib/utils/lunar-calendar';
import { format, differenceInDays } from 'date-fns';

export default async function CalendarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  // Get current lunar information
  const lunarDate = getLunarDate();
  const lunarDay = getLunarDay();
  const lotusStage = getLotusStage();
  const lotusEmoji = getLotusEmoji(lotusStage);
  const lotusDescription = getLotusStageDescription(lotusStage, locale);
  const isFullMoonDay = isFullMoon();
  const isNewMoonDay = isNewMoon();
  const isPostDay = isEvenLunarDay();
  const festivals = getBuddhistFestivals();

  const nextPeakDate = getNextPeakDate();
  const nextPostDate = getNextBlogPostDate();
  const daysUntilPeak = differenceInDays(nextPeakDate, new Date());
  const daysUntilPost = differenceInDays(nextPostDate, new Date());

  // Generate 15-day lotus growth cycle display
  const lotusGrowthCycle = Array.from({ length: 15 }, (_, i) => ({
    day: i + 1,
    emoji: getLotusEmoji(i + 1),
    description: getLotusStageDescription(i + 1, locale),
    isPostDay: (i + 1) % 2 === 0 && (i + 1) !== 0,
    isPeakDay: (i + 1) === 1 || (i + 1) === 15,
    isCurrent: lotusStage === i + 1,
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-saffron mb-4">
          {t('calendar.title')}
        </h1>
        <p className="text-lg text-zen-stone font-serif">
          {locale === 'zh'
            ? '跟随农历月相，体验莲花的生长周期'
            : locale === 'ja'
            ? '太陰暦の月相に従い、蓮の成長サイクルを体験する'
            : 'Follow the lunar phases and experience the lotus growth cycle'
          }
        </p>
      </section>

      {/* Current Lunar Day Card */}
      <section className="max-w-2xl mx-auto mb-12">
        <div className="bg-gradient-to-br from-lotus-cream to-white rounded-2xl shadow-lg border border-lotus-pink/20 p-8 text-center">
          <div className="text-6xl mb-4 animate-pulse">{lotusEmoji}</div>
          <h2 className="text-3xl font-bold text-saffron mb-2">
            {t('lotus.lunarDay', { day: lunarDay })}
          </h2>
          <p className="text-xl font-serif text-wisdom-text mb-4">
            {lotusDescription}
          </p>

          {/* Lunar Date Details */}
          <div className="flex justify-center gap-6 text-sm text-zen-stone mb-6">
            <span>
              {locale === 'zh'
                ? `农历${lunarDate.monthName}月${lunarDate.day}日`
                : locale === 'ja'
                ? `太陰暦 ${lunarDate.month}月${lunarDate.day}日`
                : `Lunar Month ${lunarDate.month}, Day ${lunarDate.day}`
              }
            </span>
            <span>|</span>
            <span>
              {locale === 'zh'
                ? `${lunarDate.yearName}年`
                : locale === 'ja'
                ? `${lunarDate.yearName}年`
                : `Year: ${lunarDate.yearName}`
              }
            </span>
          </div>

          {/* Special Day Indicators */}
          <div className="flex justify-center gap-4">
            {isNewMoonDay && (
              <span className="bg-wisdom-text text-white px-4 py-2 rounded-full text-sm font-medium">
                🌑 {t('lotus.newMoon')}
              </span>
            )}
            {isFullMoonDay && (
              <span className="bg-lotus-gold text-wisdom-text px-4 py-2 rounded-full text-sm font-medium">
                🪷✨ {t('lotus.fullMoon')}
              </span>
            )}
            {isPostDay && !isNewMoonDay && !isFullMoonDay && (
              <span className="bg-saffron text-white px-4 py-2 rounded-full text-sm font-medium">
                📝 {locale === 'zh' ? '今日发布新文章' : locale === 'ja' ? '今日新記事投稿' : 'New Post Today'}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Progress Bars */}
      <section className="max-w-3xl mx-auto mb-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Days Until Next Peak */}
          <div className="bg-white rounded-lg shadow-sm border border-lotus-pink/10 p-6">
            <h3 className="text-lg font-bold text-wisdom-text mb-4">
              {lunarDay < 15
                ? (locale === 'zh' ? '距望月（满月）' : locale === 'ja' ? '満月まで' : 'Until Full Moon')
                : (locale === 'zh' ? '距朔月（新月）' : locale === 'ja' ? '新月まで' : 'Until New Moon')
              }
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl">{lunarDay < 15 ? '🪷✨' : '🌑'}</div>
              <div className="flex-1">
                <div className="flex justify-between text-sm text-zen-stone mb-1">
                  <span>{locale === 'zh' ? '进度' : locale === 'ja' ? '進捗' : 'Progress'}</span>
                  <span>{daysUntilPeak} {locale === 'zh' ? '天' : locale === 'ja' ? '日' : 'days'}</span>
                </div>
                <div className="h-3 bg-lotus-cream rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-saffron to-lotus-gold transition-all duration-500"
                    style={{ width: `${((15 - (daysUntilPeak % 15)) / 15) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Days Until Next Post */}
          <div className="bg-white rounded-lg shadow-sm border border-lotus-pink/10 p-6">
            <h3 className="text-lg font-bold text-wisdom-text mb-4">
              {locale === 'zh' ? '距下次文章发布' : locale === 'ja' ? '次回投稿まで' : 'Until Next Post'}
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl">📝</div>
              <div className="flex-1">
                <div className="flex justify-between text-sm text-zen-stone mb-1">
                  <span>{format(nextPostDate, 'MM/dd')}</span>
                  <span>
                    {daysUntilPost === 0
                      ? (locale === 'zh' ? '今天！' : locale === 'ja' ? '今日！' : 'Today!')
                      : `${daysUntilPost} ${locale === 'zh' ? '天' : locale === 'ja' ? '日' : 'days'}`
                    }
                  </span>
                </div>
                <div className="h-3 bg-lotus-cream rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${daysUntilPost === 0 ? 'bg-green-500' : 'bg-saffron'}`}
                    style={{ width: daysUntilPost === 0 ? '100%' : `${((2 - daysUntilPost) / 2) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15-Day Lotus Growth Cycle */}
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-saffron mb-6 text-center">
          {locale === 'zh' ? '莲花生长周期 (15天)' : locale === 'ja' ? '蓮の成長サイクル（15日間）' : 'Lotus Growth Cycle (15 Days)'}
        </h2>
        <div className="grid grid-cols-5 md:grid-cols-15 gap-2">
          {lotusGrowthCycle.map((day) => (
            <div
              key={day.day}
              className={`relative p-3 rounded-lg text-center transition-all ${
                day.isCurrent
                  ? 'bg-saffron text-white scale-110 shadow-lg z-10'
                  : day.isPeakDay
                  ? 'bg-lotus-gold/20 border-2 border-lotus-gold'
                  : day.isPostDay
                  ? 'bg-saffron/10 border border-saffron/30'
                  : 'bg-white border border-lotus-pink/10'
              }`}
            >
              <div className="text-xs text-opacity-70 mb-1">
                {locale === 'zh' ? '第' : ''}{day.day}{locale === 'zh' ? '天' : locale === 'ja' ? '日' : ''}
              </div>
              <div className="text-2xl">{day.emoji}</div>
              {day.isPostDay && !day.isPeakDay && (
                <div className="absolute -top-1 -right-1 text-xs">📝</div>
              )}
              {day.isCurrent && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs bg-wisdom-text text-white px-2 py-0.5 rounded-full">
                  {locale === 'zh' ? '今日' : locale === 'ja' ? '今日' : 'Today'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-zen-stone">
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 bg-lotus-gold/20 border-2 border-lotus-gold rounded" />
            {locale === 'zh' ? '朔月/望月' : locale === 'ja' ? '新月/満月' : 'New/Full Moon'}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 bg-saffron/10 border border-saffron/30 rounded" />
            📝 {locale === 'zh' ? '发布日' : locale === 'ja' ? '投稿日' : 'Post Day'}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 bg-saffron rounded" />
            {locale === 'zh' ? '当前' : locale === 'ja' ? '現在' : 'Current'}
          </span>
        </div>
      </section>

      {/* Buddhist Festivals */}
      {festivals.length > 0 && (
        <section className="max-w-3xl mx-auto mb-12">
          <div className="bg-lotus-cream/30 rounded-lg p-8 border border-lotus-pink/20">
            <h2 className="text-2xl font-bold text-saffron mb-4 text-center">
              {locale === 'zh' ? '今日佛教节日' : locale === 'ja' ? '今日の仏教の祝日' : 'Buddhist Observances Today'}
            </h2>
            <ul className="space-y-2">
              {festivals.map((festival, index) => (
                <li key={index} className="flex items-center gap-3 text-wisdom-text">
                  <span className="text-xl">🙏</span>
                  <span className="font-serif">{festival}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Explanation Section */}
      <section className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-lotus-pink/10 p-8">
          <h2 className="text-2xl font-bold text-saffron mb-6 text-center">
            {locale === 'zh' ? '农历与莲花的智慧' : locale === 'ja' ? '太陰暦と蓮の智慧' : 'The Wisdom of the Lunar Calendar'}
          </h2>
          <div className="space-y-4 text-wisdom-text font-serif">
            {locale === 'zh' ? (
              <>
                <p>
                  <strong>农历</strong>是中国传统的历法系统，以月亮的盈亏周期为基础。
                  每个月从朔月（新月）开始，到望月（满月）达到顶峰，然后逐渐消退。
                </p>
                <p>
                  <strong>莲花</strong>在佛教中象征着觉醒与纯净——如莲花出淤泥而不染，
                  我们也能在世俗生活中保持内心的清净。
                </p>
                <p>
                  GrowZen 将农历与莲花的生长周期相结合：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>第1天（朔月）</strong>：新周期开始，如种子种下</li>
                  <li><strong>偶数日</strong>：发布智慧文章，如莲花茁壮成长</li>
                  <li><strong>第15天（望月）</strong>：圆满绽放，如智慧圆满</li>
                </ul>
              </>
            ) : locale === 'ja' ? (
              <>
                <p>
                  <strong>太陰暦</strong>は月の満ち欠けに基づく伝統的な暦法です。
                  毎月、新月から始まり、満月で頂点に達し、その後徐々に欠けていきます。
                </p>
                <p>
                  <strong>蓮</strong>は仏教において目覚めと純粋さの象徴です。
                  蓮が泥の中から美しく咲くように、私たちも日常生活の中で内なる清らかさを保つことができます。
                </p>
                <p>
                  GrowZen は太陰暦と蓮の成長サイクルを組み合わせています：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>1日目（新月）</strong>：新しいサイクルの始まり、種が植えられる</li>
                  <li><strong>偶数日</strong>：智慧の記事を公開、蓮の成長</li>
                  <li><strong>15日目（満月）</strong>：完全な開花、智慧の円満</li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  The <strong>Lunar Calendar</strong> is a traditional calendar system based on the moon&apos;s cycles.
                  Each month begins with the new moon, reaches its peak at the full moon, and then gradually wanes.
                </p>
                <p>
                  The <strong>Lotus</strong> symbolizes awakening and purity in Buddhism.
                  Just as the lotus rises from muddy waters to bloom beautifully,
                  we too can maintain inner purity amidst worldly life.
                </p>
                <p>
                  GrowZen combines the lunar calendar with the lotus growth cycle:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Day 1 (New Moon)</strong>: New cycle begins, like a seed planted</li>
                  <li><strong>Even Days</strong>: Wisdom posts published, like the lotus growing</li>
                  <li><strong>Day 15 (Full Moon)</strong>: Full bloom, representing complete wisdom</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
