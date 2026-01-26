import { getTranslations } from 'next-intl/server';
import {
  getLunarDate,
  getLunarDay,
  getLotusStage,
  getLotusEmoji,
  getLotusStageDescription,
  isFullMoon,
  isNewMoon,
} from '@/lib/utils/lunar-calendar';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  const lunarDate = getLunarDate();
  const lunarDay = getLunarDay();
  const lotusStage = getLotusStage();
  const lotusEmoji = getLotusEmoji(lotusStage);
  const isFullMoonDay = isFullMoon();
  const isNewMoonDay = isNewMoon();

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <div className="text-8xl mb-6">🪷</div>
        <h1 className="text-5xl md:text-6xl font-bold text-saffron mb-6">
          {locale === 'ja' ? 'GrowZenについて' : '关于 GrowZen'}
        </h1>
        <p className="text-2xl sm:text-3xl font-serif text-wisdom-text mb-4 leading-tight">
          禅生定<br />定生慧
        </p>
        <p className="text-xl text-zen-stone">
          {locale === 'ja'
            ? '禅から定へ、定から慧へ'
            : 'Zen → Concentration → Wisdom'
          }
        </p>
      </section>

      {/* Today's Lotus */}
      <section className="max-w-2xl mx-auto mb-16">
        <div className="bg-gradient-to-br from-lotus-cream to-white rounded-3xl shadow-lg border border-lotus-pink/20 p-10 text-center">
          <div className="text-8xl mb-4">{lotusEmoji}</div>
          <h2 className="text-3xl font-bold text-saffron mb-2">
            {locale === 'ja' ? `${lunarDay}日目` : `第${lunarDay}天`}
          </h2>
          <p className="text-2xl font-serif text-wisdom-text mb-4">
            {getLotusStageDescription(lotusStage, locale)}
          </p>
          <p className="text-lg text-zen-stone">
            {locale === 'ja'
              ? `太陰暦 ${lunarDate.month}月${lunarDate.day}日`
              : `农历${lunarDate.monthName}月${lunarDate.day}日`
            }
          </p>
          <p className="text-sm text-zen-stone/70 mt-2">
            ⏰ {locale === 'ja' ? 'マレーシア時間' : '马来西亚时间'} UTC+8
          </p>

          {(isNewMoonDay || isFullMoonDay) && (
            <div className="mt-4">
              <span className={`inline-block px-6 py-2 rounded-full text-lg font-medium ${
                isNewMoonDay ? 'bg-wisdom-text text-white' : 'bg-lotus-gold text-wisdom-text'
              }`}>
                {isNewMoonDay
                  ? (locale === 'ja' ? '🌑 新月' : '🌑 朔月')
                  : (locale === 'ja' ? '🪷✨ 満月' : '🪷✨ 望月')
                }
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 15-Day Cycle */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-saffron mb-8 text-center">
          {locale === 'ja' ? '15日の成長周期' : '15天成长周期'}
        </h2>
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: 15 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`p-4 rounded-xl text-center transition-all ${
                lotusStage === day
                  ? 'bg-saffron text-white scale-105 shadow-lg'
                  : day === 1 || day === 15
                  ? 'bg-lotus-gold/20 border-2 border-lotus-gold'
                  : day % 2 === 0
                  ? 'bg-saffron/10 border border-saffron/30'
                  : 'bg-white border border-lotus-pink/10'
              }`}
            >
              <div className="text-3xl mb-1">{getLotusEmoji(day)}</div>
              <div className="text-sm font-medium">{day}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The Path */}
      <section className="max-w-3xl mx-auto mb-16">
        <div className="bg-white rounded-3xl shadow-sm border border-lotus-pink/10 p-10">
          <h2 className="text-3xl font-bold text-saffron mb-8 text-center">
            {locale === 'ja' ? '道' : '修行之道'}
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="text-center p-6 bg-saffron/10 rounded-2xl">
              <div className="text-5xl font-bold text-saffron mb-2">禅</div>
              <div className="text-lg text-zen-stone">Zen</div>
              <div className="text-sm text-wisdom-text mt-1">
                {locale === 'ja' ? '瞑想' : '禅修'}
              </div>
            </div>
            <div className="text-4xl text-saffron">→</div>
            <div className="text-center p-6 bg-saffron/10 rounded-2xl">
              <div className="text-5xl font-bold text-saffron mb-2">定</div>
              <div className="text-lg text-zen-stone">Samadhi</div>
              <div className="text-sm text-wisdom-text mt-1">
                {locale === 'ja' ? '集中' : '专注'}
              </div>
            </div>
            <div className="text-4xl text-saffron">→</div>
            <div className="text-center p-6 bg-saffron/10 rounded-2xl">
              <div className="text-5xl font-bold text-saffron mb-2">慧</div>
              <div className="text-lg text-zen-stone">Prajna</div>
              <div className="text-sm text-wisdom-text mt-1">
                {locale === 'ja' ? '智慧' : '智慧'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-3xl mx-auto mb-16">
        <div className="bg-lotus-cream/30 rounded-3xl border border-lotus-pink/20 p-10">
          <h2 className="text-3xl font-bold text-saffron mb-8 text-center">
            {locale === 'ja' ? '仕組み' : '运作方式'}
          </h2>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <span className="text-5xl">🌑</span>
              <div>
                <p className="text-xl font-bold text-wisdom-text">
                  {locale === 'ja' ? '1日目 - 新月' : '第1天 - 朔月'}
                </p>
                <p className="text-lg text-zen-stone">
                  {locale === 'ja' ? '新しい周期の始まり' : '新周期开始'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-5xl">📝</span>
              <div>
                <p className="text-xl font-bold text-wisdom-text">
                  {locale === 'ja' ? '偶数日 (2,4,6...)' : '偶数日 (2,4,6...)'}
                </p>
                <p className="text-lg text-zen-stone">
                  {locale === 'ja' ? '新しい智慧を公開' : '发布新智慧'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-5xl">🪷✨</span>
              <div>
                <p className="text-xl font-bold text-wisdom-text">
                  {locale === 'ja' ? '15日目 - 満月' : '第15天 - 望月'}
                </p>
                <p className="text-lg text-zen-stone">
                  {locale === 'ja' ? '蓮が満開' : '莲花圆满绽放'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-3xl mx-auto text-center">
        <blockquote className="buddha-quote">
          <p className="text-2xl md:text-3xl mb-6">
            {locale === 'ja'
              ? '「泥より出でて、泥に染まらず」'
              : '"出淤泥而不染"'
            }
          </p>
          {locale !== 'ja' && (
            <p className="text-xl text-zen-stone/70 mb-4">
              &quot;Rising from mud, unstained&quot;
            </p>
          )}
          <footer className="text-lg text-zen-stone">
            — {locale === 'ja' ? '仏陀' : '佛陀 Buddha'}
          </footer>
        </blockquote>
      </section>
    </div>
  );
}
