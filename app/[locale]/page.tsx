import { getTranslations } from 'next-intl/server';
import { getLunarDay, getLotusStage, getLotusEmoji, getLotusStageDescription, isFullMoon, isNewMoon } from '@/lib/utils/lunar-calendar';
import LotusPreview from '@/components/LotusPreview';
import Link from 'next/link';
import { getLatestPosts } from '@/lib/data/posts';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  const lunarDay = getLunarDay();
  const lotusStage = getLotusStage();
  const isFullMoonDay = isFullMoon();
  const isNewMoonDay = isNewMoon();

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
    <div className="container mx-auto px-6 py-16">
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <LotusPreview data={lotusData} locale={locale} />

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-saffron leading-tight">
          {locale === 'ja' ? '禅定慧' : (
            <>
              禅生定<br />定生慧
            </>
          )}
        </h1>
        <p className="text-2xl md:text-3xl text-zen-stone">
          {locale === 'ja'
            ? '蓮のように、日々成長する'
            : '如莲绽放，日日精进'
          }
        </p>
        {locale !== 'ja' && (
          <p className="text-xl text-zen-stone/70 mt-2">
            Grow like the lotus, day by day
          </p>
        )}
      </section>

      {/* Simple Quote */}
      <section className="max-w-3xl mx-auto mb-20">
        <blockquote className="buddha-quote text-center">
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

      {/* Latest Posts */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-saffron">
            {locale === 'ja' ? '最新の智慧' : '最新智慧'}
          </h2>
          <Link
            href={`/${locale}/blog`}
            className="text-xl text-saffron hover:text-saffron-dark transition-colors font-medium"
          >
            {locale === 'ja' ? 'すべて見る' : '查看全部'} →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {getLatestPosts(3).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-sm border border-lotus-pink/10 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Day indicator */}
              <div className="bg-gradient-to-r from-lotus-cream to-lotus-pink/20 px-6 py-4 flex items-center justify-between">
                <span className="text-lg text-zen-stone font-medium">
                  {locale === 'ja' ? `${post.lunarDay}日目` : `第${post.lunarDay}天`}
                </span>
                <span className="text-3xl">
                  {getLotusEmoji(post.lunarDay)}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-wisdom-text mb-4 hover:text-saffron transition-colors leading-tight">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {locale === 'ja' ? post.title.ja : post.title.zh}
                  </Link>
                </h3>

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

      {/* Simple Info */}
      <section className="max-w-3xl mx-auto text-center">
        <div className="bg-lotus-cream/30 rounded-3xl p-10 border border-lotus-pink/20">
          <div className="text-6xl mb-6">🪷</div>
          <h3 className="text-2xl md:text-3xl font-bold text-saffron mb-6">
            {locale === 'ja' ? '私たちについて' : '关于我们'}
          </h3>
          <p className="text-xl text-wisdom-text mb-4">
            {locale === 'ja'
              ? '太陰暦に従い、15日周期で智慧を共有します'
              : '跟随农历，15天周期，分享佛法智慧'
            }
          </p>
          {locale !== 'ja' && (
            <p className="text-lg text-zen-stone/70 mb-6">
              Following the lunar cycle, sharing wisdom every 15 days
            </p>
          )}
          <Link
            href={`/${locale}/about`}
            className="btn-primary inline-block"
          >
            {locale === 'ja' ? '詳しく見る' : '了解更多'}
          </Link>
        </div>
      </section>
    </div>
  );
}
