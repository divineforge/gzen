import { getTranslations } from 'next-intl/server';
import { getLunarDay, getLotusStage, getLotusEmoji, isEvenLunarDay, getNextBlogPostDate } from '@/lib/utils/lunar-calendar';
import { format } from 'date-fns';
import Link from 'next/link';
import { samplePosts } from '@/lib/data/posts';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  // Get current lunar information
  const lunarDay = getLunarDay();
  const lotusStage = getLotusStage();
  const isPostDay = isEvenLunarDay();
  const nextPostDate = getNextBlogPostDate();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-saffron mb-4">
          {t('blog.title')}
        </h1>
        <p className="text-lg text-zen-stone font-serif">
          {locale === 'ja'
            ? '偶数の太陰暦日（2、4、6、8、10、12、14日）ごとに、新しい仏教の智慧の記事を公開します。'
            : '每逢农历偶数日（2、4、6、8、10、12、14），我们发布一篇新的佛法智慧文章。'
          }
        </p>
        {locale !== 'ja' && (
          <p className="text-base text-zen-stone/80 mt-2">
            On even lunar days (2, 4, 6, 8, 10, 12, 14), we publish new Buddhist wisdom teachings.
          </p>
        )}

        {/* Current Lunar Day Info */}
        <div className="mt-6 inline-flex items-center space-x-4 bg-lotus-cream/50 rounded-full px-6 py-3">
          <span className="text-2xl">{isPostDay ? '📝' : '🪷'}</span>
          <div className="text-left">
            <p className="text-sm text-zen-stone">
              {t('lotus.lunarDay', { day: lunarDay })}
            </p>
            <p className="text-sm font-medium text-saffron">
              {isPostDay
                ? (locale === 'zh' ? '今天是发布日！' : locale === 'ja' ? '今日は投稿日！' : 'Today is a post day!')
                : (locale === 'zh'
                    ? `下次发布：${format(nextPostDate, 'MM/dd')}`
                    : locale === 'ja'
                    ? `次回投稿：${format(nextPostDate, 'MM/dd')}`
                    : `Next post: ${format(nextPostDate, 'MM/dd')}`
                  )
              }
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-6xl mx-auto">
        {samplePosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {samplePosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm border border-lotus-pink/10 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Lotus Stage Indicator */}
                <div className="bg-gradient-to-r from-lotus-cream to-lotus-pink/20 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-zen-stone">
                    {locale === 'ja'
                      ? `太陰暦 ${post.lunarDay} 日目`
                      : `农历第 ${post.lunarDay} 天 / Lunar Day ${post.lunarDay}`
                    }
                  </span>
                  <span className="text-lg">
                    {getLotusEmoji(post.lunarDay)}
                  </span>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-wisdom-text mb-3 hover:text-saffron transition-colors">
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {locale === 'ja'
                        ? post.title.ja
                        : `${post.title.zh} / ${post.title.en}`
                      }
                    </Link>
                  </h2>

                  <p className="text-zen-stone font-serif mb-4 line-clamp-3">
                    {locale === 'ja'
                      ? post.excerpt.ja
                      : post.excerpt.zh
                    }
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-lotus-cream/50 text-zen-stone px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center text-saffron hover:text-saffron-dark transition-colors font-medium"
                  >
                    {t('blog.readMore')}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-zen-stone">
            <span className="text-6xl mb-4 block">🪷</span>
            <p className="text-xl">{t('blog.noPosts')}</p>
            <p className="text-sm mt-2">
              {locale === 'zh'
                ? '文章将在农历偶数日发布（2、4、6、8、10、12、14）'
                : locale === 'ja'
                ? '記事は偶数の太陰暦日に公開されます（2、4、6、8、10、12、14）'
                : 'Posts will appear on even lunar days (2, 4, 6, 8, 10, 12, 14)'
              }
            </p>
          </div>
        )}
      </section>

      {/* Publishing Schedule Info */}
      <section className="max-w-3xl mx-auto mt-16">
        <div className="bg-lotus-cream/30 rounded-lg p-8 border border-lotus-pink/20">
          <h3 className="text-2xl font-bold text-saffron mb-4 text-center">
            {locale === 'zh' ? '发布时间表' : locale === 'ja' ? '投稿スケジュール' : 'Publishing Schedule'}
          </h3>
          <div className="grid grid-cols-7 gap-2 text-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((day) => (
              <div
                key={day}
                className={`p-2 rounded ${
                  day % 2 === 0
                    ? 'bg-saffron/20 border border-saffron/30'
                    : day === 1 || day === 15
                    ? 'bg-lotus-gold/20 border border-lotus-gold/30'
                    : 'bg-white border border-lotus-pink/10'
                }`}
              >
                <div className="text-xs text-zen-stone">
                  {locale === 'zh' ? '第' : locale === 'ja' ? '' : 'Day'}
                </div>
                <div className="font-bold text-wisdom-text">{day}</div>
                <div className="text-sm">
                  {getLotusEmoji(day)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-zen-stone">
            <span>🌑 {locale === 'ja' ? '新月' : '朔月 New Moon'}</span>
            <span>💧→🌷 {locale === 'ja' ? '成長期' : '成长期 Growth'}</span>
            <span>🌕 {locale === 'ja' ? '満月' : '望月 Full Moon'}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
