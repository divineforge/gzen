import { getTranslations } from 'next-intl/server';
import { getLunarDay, getLotusEmoji, isEvenLunarDay } from '@/lib/utils/lunar-calendar';
import Link from 'next/link';
import { samplePosts } from '@/lib/data/posts';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  const lunarDay = getLunarDay();
  const isPostDay = isEvenLunarDay();

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-saffron mb-6">
          {locale === 'ja' ? '智慧の記録' : '智慧博客'}
        </h1>
        <p className="text-2xl text-zen-stone">
          {locale === 'ja'
            ? '偶数日に新しい智慧を公開'
            : '偶数日更新，如莲成长'
          }
        </p>
        {locale !== 'ja' && (
          <p className="text-xl text-zen-stone/70 mt-2">
            New wisdom on even days, growing like the lotus
          </p>
        )}

        {/* Today's Status */}
        <div className="mt-8 inline-flex items-center gap-4 bg-lotus-cream/50 rounded-full px-8 py-4">
          <span className="text-4xl">{getLotusEmoji(lunarDay)}</span>
          <div className="text-left">
            <p className="text-xl font-medium text-wisdom-text">
              {locale === 'ja' ? `${lunarDay}日目` : `第${lunarDay}天`}
            </p>
            <p className="text-lg text-saffron font-medium">
              {isPostDay
                ? (locale === 'ja' ? '今日は更新日！' : '今日更新！')
                : (locale === 'ja' ? '休息日' : '休息日')
              }
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-6xl mx-auto mb-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {samplePosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-sm border border-lotus-pink/10 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-gradient-to-r from-lotus-cream to-lotus-pink/20 px-6 py-4 flex items-center justify-between">
                <span className="text-lg text-zen-stone font-medium">
                  {locale === 'ja' ? `${post.lunarDay}日目` : `第${post.lunarDay}天`}
                </span>
                <span className="text-3xl">
                  {getLotusEmoji(post.lunarDay)}
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-wisdom-text mb-4 hover:text-saffron transition-colors leading-tight">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {locale === 'ja' ? post.title.ja : post.title.zh}
                  </Link>
                </h2>

                {locale !== 'ja' && (
                  <p className="text-lg text-zen-stone/70 mb-4">
                    {post.title.en}
                  </p>
                )}

                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="inline-flex items-center text-xl text-saffron hover:text-saffron-dark transition-colors font-medium"
                >
                  {locale === 'ja' ? '読む' : '阅读'} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Growth Cycle */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-lotus-cream/30 rounded-3xl p-8 border border-lotus-pink/20">
          <h3 className="text-2xl font-bold text-saffron mb-6 text-center">
            {locale === 'ja' ? '15日の成長周期' : '15天成长周期'}
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 15 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={`p-4 rounded-xl text-center transition-all ${
                  lunarDay === day
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
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-lg text-zen-stone">
            <span>🌑 {locale === 'ja' ? '新月' : '朔月'}</span>
            <span>📝 {locale === 'ja' ? '更新日' : '更新日'}</span>
            <span>🪷✨ {locale === 'ja' ? '満月' : '望月'}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
