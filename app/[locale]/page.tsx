import { getTranslations } from 'next-intl/server';
import { getLunarDay, getLotusStage, getLotusEmoji, getLotusStageDescription, isFullMoon, isNewMoon } from '@/lib/utils/lunar-calendar';
import LotusPreview from '@/components/LotusPreview';
import Link from 'next/link';
import { getLatestPosts } from '@/lib/data/posts';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  // Get current lunar information
  const lunarDay = getLunarDay();
  const lotusStage = getLotusStage();
  const isFullMoonDay = isFullMoon();
  const isNewMoonDay = isNewMoon();

  // Pre-compute all stages for the client component
  const allStages = Array.from({ length: 15 }, (_, i) => {
    const stage = i + 1;
    return {
      stage,
      emoji: getLotusEmoji(stage),
      description: getLotusStageDescription(stage, locale),
    };
  });

  const lotusData = {
    lunarDay,
    lotusStage,
    lotusEmoji: getLotusEmoji(lotusStage),
    lotusDescription: getLotusStageDescription(lotusStage, locale),
    isFullMoonDay,
    isNewMoonDay,
    allStages,
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section with Lotus */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <LotusPreview data={lotusData} locale={locale} />

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-saffron">
          {t('home.hero.title')}
        </h1>
        <p className="text-xl md:text-2xl text-zen-stone font-serif">
          {t('home.hero.subtitle')}
        </p>
      </section>

      {/* Buddha Quote Section - Will be populated later */}
      <section className="max-w-3xl mx-auto mb-16">
        <blockquote className="buddha-quote">
          <p className="text-wisdom-text mb-4">
            "Just as a lotus flower is born in water, grows in water and rises out of water to stand above it unsoiled, so I, born in the world, raised in the world having overcome the world, live unsoiled by the world."
          </p>
          <footer className="text-sm text-zen-stone">
            — The Buddha, Anguttara Nikaya
          </footer>
        </blockquote>
      </section>

      {/* Latest Posts Section */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-saffron">
            {t('home.latestPosts')}
          </h2>
          <Link
            href={`/${locale}/blog`}
            className="text-saffron hover:text-saffron-dark transition-colors font-medium"
          >
            {t('home.viewAll')} →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getLatestPosts(3).map((post) => (
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
                  {post.lunarDay <= 7 ? '🌱' : '🪷'}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-wisdom-text mb-3 hover:text-saffron transition-colors">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {locale === 'ja'
                      ? post.title.ja
                      : `${post.title.zh} / ${post.title.en}`
                    }
                  </Link>
                </h3>

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
      </section>

      {/* Info Section */}
      <section className="max-w-3xl mx-auto mt-16 text-center">
        <div className="bg-lotus-cream/30 rounded-lg p-8 border border-lotus-pink/20">
          <h3 className="text-2xl font-bold text-saffron mb-4">
            {locale === 'zh' ? '关于这个博客' : locale === 'ja' ? 'このブログについて' : 'About This Blog'}
          </h3>
          <div className="space-y-4 text-wisdom-text font-serif">
            {locale === 'zh' ? (
              <>
                <p>
                  GrowZen（禅生定，定生慧）是一个跟随农历月相的佛法智慧博客。
                </p>
                <p>
                  每逢农历偶数日（2、4、6、8、10、12、14），我们发布一篇新的佛法智慧文章。
                </p>
                <p>
                  每逢朔月（初一）与望月（十五），莲花完成一个生长周期，带来特别的佛语。
                </p>
                <p className="text-saffron font-semibold">
                  如莲花于污泥中绽放，我们在日常生活中觉醒。
                </p>
              </>
            ) : locale === 'ja' ? (
              <>
                <p>
                  GrowZen（禅定慧の道）は、太陰暦の満ち欠けに従う仏教智慧のブログです。
                </p>
                <p>
                  偶数の太陰暦日（2、4、6、8、10、12、14日）ごとに、新しい仏教の智慧の記事を公開します。
                </p>
                <p>
                  新月（1日）と満月（15日）には、蓮が成長サイクルを完了し、特別な仏陀の言葉をお届けします。
                </p>
                <p className="text-saffron font-semibold">
                  蓮の花が泥の中から咲くように、私たちは日常生活の中で目覚めます。
                </p>
              </>
            ) : (
              <>
                <p>
                  GrowZen (禅生定，定生慧) is a Buddhist wisdom blog that follows the lunar calendar cycles.
                </p>
                <p>
                  On even lunar days (2, 4, 6, 8, 10, 12, 14), we publish new Buddhist wisdom teachings.
                </p>
                <p>
                  On new moon (day 1) and full moon (day 15), the lotus completes its growth cycle with special Buddha quotes.
                </p>
                <p className="text-saffron font-semibold">
                  Like the lotus blooming from mud, we awaken in the midst of daily life.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
