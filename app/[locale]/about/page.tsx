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
  getNextPeakDate,
  getNextBlogPostDate,
} from '@/lib/utils/lunar-calendar';
import { format, differenceInDays } from 'date-fns';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
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
        <span className="text-6xl mb-4 block">🪷</span>
        <h1 className="text-4xl md:text-5xl font-bold text-saffron mb-4">
          {t('about.title')}
        </h1>
        <p className="text-2xl font-serif text-wisdom-text">
          禅生定，定生慧
        </p>
        <p className="text-lg text-zen-stone mt-2">
          {locale === 'ja'
            ? '禅から定へ、定から慧へ'
            : 'Zen gives rise to concentration, concentration gives rise to wisdom'
          }
        </p>
      </section>

      {/* Current Lunar Day Card */}
      <section className="max-w-2xl mx-auto mb-12">
        <div className="bg-gradient-to-br from-lotus-cream to-white rounded-2xl shadow-lg border border-lotus-pink/20 p-8 text-center">
          <div className="text-6xl mb-4">{lotusEmoji}</div>
          <h2 className="text-3xl font-bold text-saffron mb-2">
            {locale === 'ja'
              ? `太陰暦 ${lunarDay} 日目`
              : `农历第 ${lunarDay} 天 / Lunar Day ${lunarDay}`
            }
          </h2>
          <p className="text-xl font-serif text-wisdom-text mb-4">
            {lotusDescription}
          </p>

          {/* Lunar Date Details */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-zen-stone mb-6">
            <span>
              {locale === 'ja'
                ? `太陰暦 ${lunarDate.month}月${lunarDate.day}日`
                : `农历${lunarDate.monthName}月${lunarDate.day}日 / Lunar Month ${lunarDate.month}`
              }
            </span>
            <span>|</span>
            <span>
              {locale === 'ja'
                ? `${lunarDate.yearName}年`
                : `${lunarDate.yearName}年 / Year of ${lunarDate.yearName}`
              }
            </span>
          </div>

          {/* Timezone Info */}
          <div className="text-xs text-zen-stone/70 mb-4">
            {locale === 'ja'
              ? '⏰ 基準時間帯: マレーシア・クアラルンプール (UTC+8)'
              : '⏰ 时区 Timezone: 马来西亚吉隆坡 Malaysia KL (UTC+8)'
            }
          </div>

          {/* Special Day Indicators */}
          <div className="flex flex-wrap justify-center gap-4">
            {isNewMoonDay && (
              <span className="bg-wisdom-text text-white px-4 py-2 rounded-full text-sm font-medium">
                🌑 {locale === 'ja' ? '新月 - 新周期開始' : '朔月 New Moon - 新周期开始'}
              </span>
            )}
            {isFullMoonDay && (
              <span className="bg-lotus-gold text-wisdom-text px-4 py-2 rounded-full text-sm font-medium">
                🪷✨ {locale === 'ja' ? '満月 - 完全開花' : '望月 Full Moon - 圆满绽放'}
              </span>
            )}
            {isPostDay && !isNewMoonDay && !isFullMoonDay && (
              <span className="bg-saffron text-white px-4 py-2 rounded-full text-sm font-medium">
                📝 {locale === 'ja' ? '今日新記事投稿' : '今日发布新文章 New Post Today'}
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
                ? (locale === 'ja' ? '満月まで' : '距望月 Until Full Moon')
                : (locale === 'ja' ? '新月まで' : '距朔月 Until New Moon')
              }
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl">{lunarDay < 15 ? '🪷✨' : '🌑'}</div>
              <div className="flex-1">
                <div className="flex justify-between text-sm text-zen-stone mb-1">
                  <span>{locale === 'ja' ? '進捗' : '进度 Progress'}</span>
                  <span>{daysUntilPeak} {locale === 'ja' ? '日' : '天 days'}</span>
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
              {locale === 'ja' ? '次回投稿まで' : '距下次文章 Until Next Post'}
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl">📝</div>
              <div className="flex-1">
                <div className="flex justify-between text-sm text-zen-stone mb-1">
                  <span>{format(nextPostDate, 'MM/dd')}</span>
                  <span>
                    {daysUntilPost === 0
                      ? (locale === 'ja' ? '今日！' : '今天！Today!')
                      : `${daysUntilPost} ${locale === 'ja' ? '日' : '天 days'}`
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
          {locale === 'ja' ? '蓮の成長サイクル（15日間）' : '莲花生长周期 Lotus Growth Cycle (15天/Days)'}
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {lotusGrowthCycle.map((day) => (
            <div
              key={day.day}
              className={`relative p-3 rounded-lg text-center transition-all ${
                day.isCurrent
                  ? 'bg-saffron text-white scale-105 shadow-lg z-10'
                  : day.isPeakDay
                  ? 'bg-lotus-gold/20 border-2 border-lotus-gold'
                  : day.isPostDay
                  ? 'bg-saffron/10 border border-saffron/30'
                  : 'bg-white border border-lotus-pink/10'
              }`}
            >
              <div className="text-xs text-opacity-70 mb-1">
                {day.day}
              </div>
              <div className="text-2xl">{day.emoji}</div>
              {day.isPostDay && !day.isPeakDay && (
                <div className="absolute -top-1 -right-1 text-xs">📝</div>
              )}
              {day.isCurrent && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs bg-wisdom-text text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                  {locale === 'ja' ? '今日' : '今日 Today'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-zen-stone">
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 bg-lotus-gold/20 border-2 border-lotus-gold rounded" />
            {locale === 'ja' ? '新月/満月' : '朔月/望月 New/Full Moon'}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 bg-saffron/10 border border-saffron/30 rounded" />
            📝 {locale === 'ja' ? '投稿日' : '发布日 Post Day'}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 bg-saffron rounded" />
            {locale === 'ja' ? '現在' : '当前 Current'}
          </span>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Mission Section */}
        <section className="bg-white rounded-lg shadow-sm border border-lotus-pink/10 p-8">
          <h2 className="text-2xl font-bold text-saffron mb-6 flex items-center gap-3">
            <span>🎯</span>
            {t('about.mission')}
          </h2>
          <div className="space-y-4 text-wisdom-text font-serif">
            {locale === 'ja' ? (
              <>
                <p>
                  GrowZen の使命は、仏教の智慧を現代人の日常生活に届けることです。
                </p>
                <p>
                  古代の智慧は現代の言葉で表現でき、
                  忙しい生活の中で内なる平和と目覚めを見つける手助けになると信じています。
                </p>
                <p>
                  太陰暦のサイクルと同期することで、ユニークな学習のリズムを作り出しています。
                  毎日の情報の洪水ではなく、智慧が育つ空間を与えます。
                </p>
              </>
            ) : (
              <>
                <p>
                  GrowZen 的使命是让佛法智慧走进现代人的日常生活。
                </p>
                <p className="text-zen-stone/80 text-sm">
                  GrowZen&apos;s mission is to bring Buddhist wisdom into the daily lives of modern people.
                </p>
                <p>
                  我们相信，古老的智慧可以用现代的语言表达，帮助人们在繁忙的生活中找到内心的平静与觉醒。
                </p>
                <p className="text-zen-stone/80 text-sm">
                  We believe ancient wisdom can be expressed in modern language, helping people find inner peace and awakening amidst busy lives.
                </p>
                <p>
                  通过与农历周期同步，我们创造了一种独特的学习节奏——不是每天信息轰炸，而是给予智慧生长的空间。
                </p>
                <p className="text-zen-stone/80 text-sm">
                  By synchronizing with the lunar cycle, we&apos;ve created a unique learning rhythm—not daily information bombardment, but space for wisdom to grow.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-lotus-cream/30 rounded-lg border border-lotus-pink/20 p-8">
          <h2 className="text-2xl font-bold text-saffron mb-6 flex items-center gap-3">
            <span>🧘</span>
            {t('about.philosophy')}
          </h2>
          <div className="space-y-6">
            {/* The Path */}
            <div className="bg-white/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-wisdom-text mb-4">
                {locale === 'ja' ? '禅定慧の道' : '禅定慧之道 The Path of Zen-Samadhi-Prajna'}
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-6">
                <div className="text-center p-4 bg-saffron/10 rounded-lg">
                  <div className="text-3xl font-bold text-saffron">禅</div>
                  <div className="text-sm text-zen-stone mt-1">Chán / Zen</div>
                  <div className="text-xs text-wisdom-text mt-2">
                    {locale === 'ja' ? '瞑想' : '禅修 Meditation'}
                  </div>
                </div>
                <div className="text-2xl text-saffron">→</div>
                <div className="text-center p-4 bg-saffron/10 rounded-lg">
                  <div className="text-3xl font-bold text-saffron">定</div>
                  <div className="text-sm text-zen-stone mt-1">Dìng / Samadhi</div>
                  <div className="text-xs text-wisdom-text mt-2">
                    {locale === 'ja' ? '集中' : '专注 Concentration'}
                  </div>
                </div>
                <div className="text-2xl text-saffron">→</div>
                <div className="text-center p-4 bg-saffron/10 rounded-lg">
                  <div className="text-3xl font-bold text-saffron">慧</div>
                  <div className="text-sm text-zen-stone mt-1">Huì / Prajna</div>
                  <div className="text-xs text-wisdom-text mt-2">
                    {locale === 'ja' ? '智慧' : '智慧 Wisdom'}
                  </div>
                </div>
              </div>
              <p className="text-wisdom-text font-serif text-center">
                {locale === 'ja'
                  ? 'これは修行から悟りへの道であり、蓮が種から満開になるようなものです。'
                  : '这是从修行到觉悟的道路，如同莲花从种子到盛开。This is the path from practice to enlightenment, like the lotus from seed to full bloom.'
                }
              </p>
            </div>

            {/* The Lotus */}
            <div className="bg-white/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-wisdom-text mb-4">
                {locale === 'ja' ? '蓮の象徴' : '莲花的象征 The Lotus Symbol'}
              </h3>
              <div className="text-wisdom-text font-serif space-y-3">
                {locale === 'ja' ? (
                  <>
                    <p>
                      蓮は仏教で最も重要な象徴の一つです。泥の中から生まれながら、純粋で美しい花を咲かせます。
                    </p>
                    <p>
                      これは悟りの可能性を表しています。最も困難な環境の中でさえ、私たちは智慧と慈悲を育むことができます。
                    </p>
                    <p className="text-saffron font-semibold">
                      「蓮の花が泥の中から咲くように、私たちは日常生活の中で目覚めます。」
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      莲花是佛教最重要的象征之一。它生于淤泥之中，却能绽放出纯洁美丽的花朵。
                    </p>
                    <p className="text-zen-stone/80 text-sm">
                      The lotus is one of the most important symbols in Buddhism. Born from mud, it blooms into a pure and beautiful flower.
                    </p>
                    <p>
                      这代表着觉悟的可能性——即使在最困难的环境中，我们也能培养出智慧与慈悲。
                    </p>
                    <p className="text-zen-stone/80 text-sm">
                      This represents the possibility of awakening—even in the most difficult circumstances, we can cultivate wisdom and compassion.
                    </p>
                    <p className="text-saffron font-semibold">
                      &quot;如莲花于污泥中绽放，我们在日常生活中觉醒。&quot;
                    </p>
                    <p className="text-saffron/70 text-sm">
                      &quot;Like the lotus blooming from mud, we awaken in the midst of daily life.&quot;
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-lg shadow-sm border border-lotus-pink/10 p-8">
          <h2 className="text-2xl font-bold text-saffron mb-6 flex items-center gap-3">
            <span>⚙️</span>
            {locale === 'ja' ? '仕組み' : '运作方式 How It Works'}
          </h2>
          <div className="space-y-4 text-wisdom-text font-serif">
            {locale === 'ja' ? (
              <>
                <p>
                  GrowZen は太陰暦のサイクルに従って運営されています。毎月、15日間の蓮の成長サイクルに従います：
                </p>
                <ul className="list-none space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🌑</span>
                    <div>
                      <strong>1日目（新月）</strong>
                      <br />
                      <span className="text-zen-stone">新しいサイクルの始まり、仏陀の言葉を共有</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">📝</span>
                    <div>
                      <strong>偶数日（2、4、6、8、10、12、14）</strong>
                      <br />
                      <span className="text-zen-stone">新しい智慧の記事を公開</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🪷✨</span>
                    <div>
                      <strong>15日目（満月）</strong>
                      <br />
                      <span className="text-zen-stone">蓮が完全に開花、特別な仏陀の言葉を共有</span>
                    </div>
                  </li>
                </ul>
                <p>
                  このリズムにより、智慧が沈殿する時間が生まれ、読者が反省し実践する空間ができます。
                </p>
              </>
            ) : (
              <>
                <p>
                  GrowZen 跟随农历周期运作。每个农历月，我们遵循15天的莲花生长周期：
                </p>
                <p className="text-zen-stone/80 text-sm">
                  GrowZen operates according to the lunar calendar cycle. Each lunar month, we follow a 15-day lotus growth cycle:
                </p>
                <ul className="list-none space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🌑</span>
                    <div>
                      <strong>第1天（朔月）/ Day 1 (New Moon)</strong>
                      <br />
                      <span className="text-zen-stone">新周期开始，分享佛陀名言 / New cycle begins with a Buddha quote</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">📝</span>
                    <div>
                      <strong>偶数日 / Even Days (2、4、6、8、10、12、14)</strong>
                      <br />
                      <span className="text-zen-stone">发布新的智慧文章 / New wisdom articles published</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🪷✨</span>
                    <div>
                      <strong>第15天（望月）/ Day 15 (Full Moon)</strong>
                      <br />
                      <span className="text-zen-stone">莲花圆满绽放，分享特别的佛陀名言 / Lotus in full bloom with special Buddha quote</span>
                    </div>
                  </li>
                </ul>
                <p>
                  这种节奏让智慧有时间沉淀，让读者有空间反思和实践。
                </p>
                <p className="text-zen-stone/80 text-sm">
                  This rhythm allows wisdom to settle, giving readers space to reflect and practice.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Technology & Transparency */}
        <section className="bg-white rounded-lg shadow-sm border border-lotus-pink/10 p-8">
          <h2 className="text-2xl font-bold text-saffron mb-6 flex items-center gap-3">
            <span>🤖</span>
            {locale === 'ja' ? '技術と透明性' : '技术与透明度 Technology & Transparency'}
          </h2>
          <div className="space-y-4 text-wisdom-text font-serif">
            {locale === 'ja' ? (
              <>
                <p>
                  GrowZen は AI（Claude API）を使用してコンテンツの生成を支援していますが、
                  すべてのコンテンツは本物の仏教の経典と教えに基づいています。
                </p>
                <p>
                  透明性が重要だと信じています：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>すべての仏陀の言葉は検証され、出典が記載されています</li>
                  <li>AI が生成したコンテンツはレビューされます</li>
                  <li>コードはオープンソースで、コミュニティの貢献を歓迎します</li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  GrowZen 使用人工智能（Claude API）辅助生成内容，但所有内容都基于真实的佛教经典和教导。
                </p>
                <p className="text-zen-stone/80 text-sm">
                  GrowZen uses AI (Claude API) to assist with content generation, but all content is based on authentic Buddhist scriptures and teachings.
                </p>
                <p>
                  我们相信透明度很重要：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>所有佛陀名言都经过验证，标注来源 / All Buddha quotes are verified with sources cited</li>
                  <li>AI 生成的内容会经过审核 / AI-generated content is reviewed</li>
                  <li>我们的代码是开源的，欢迎社区贡献 / Our code is open source and community contributions are welcome</li>
                </ul>
              </>
            )}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-lotus-cream/30 rounded-lg border border-lotus-pink/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-saffron mb-4">
            {locale === 'ja' ? 'お問い合わせ' : '联系我们 Contact Us'}
          </h2>
          <p className="text-wisdom-text font-serif mb-6">
            {locale === 'ja'
              ? 'ご質問、ご提案、またはコンテンツの貢献をご希望の場合は、以下の方法でお問い合わせください：'
              : '如有问题、建议或想要贡献内容，请通过以下方式联系我们。For questions, suggestions, or content contributions, please reach out:'
            }
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/divineforge/gzen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-wisdom-text text-white px-6 py-3 rounded-lg hover:bg-wisdom-text/80 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </section>

        {/* Final Quote */}
        <section className="text-center py-8">
          <blockquote className="buddha-quote max-w-2xl mx-auto">
            <p className="text-wisdom-text mb-4 text-lg">
              {locale === 'ja'
                ? '「蓮の花が水の中に生まれ、水の中で育ち、水の上に立ち、水に汚されないように、私は世の中に生まれ、世の中で育ち、世の中を超え、世の中に汚されずに生きる。」'
                : '"犹如莲花生于水中，长于水中，超出水面而立，不受水沾污，我生于世间，长于世间，超越世间，不为世间所染。"'
              }
            </p>
            {locale !== 'ja' && (
              <p className="text-zen-stone/80 text-sm mb-4">
                &quot;Just as a lotus flower is born in water, grows in water and rises out of water to stand above it unsoiled, so I, born in the world, raised in the world having overcome the world, live unsoiled by the world.&quot;
              </p>
            )}
            <footer className="text-sm text-zen-stone">
              — {locale === 'ja' ? '仏陀、増支部経典' : '佛陀，《增支部》/ The Buddha, Anguttara Nikaya'}
            </footer>
          </blockquote>
        </section>
      </div>
    </div>
  );
}
