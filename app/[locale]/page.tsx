import { getLunarDate, getLotusStage, getLotusEmoji, getLotusStageDescription, isFullMoon, isNewMoon } from '@/lib/utils/lunar-calendar';
import LotusPreview from '@/components/LotusPreview';
import Link from 'next/link';
import { getLatestPosts } from '@/lib/data/posts';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const lunarDate = getLunarDate();
  const lunarDay = lunarDate.day;
  const daysInMonth = lunarDate.daysInMonth;
  const lotusStage = getLotusStage();
  const isFullMoonDay = isFullMoon();
  const isNewMoonDay = isNewMoon();

  // Generate all 30 stages for full lunar month cycle
  const allStages = Array.from({ length: 30 }, (_, i) => {
    const stage = i + 1;
    return {
      stage,
      emoji: getLotusEmoji(stage),
      description: getLotusStageDescription(stage, 'en'),
    };
  });

  const lotusData = {
    lunarDay,
    lotusStage,
    lotusEmoji: getLotusEmoji(lotusStage),
    lotusDescription: getLotusStageDescription(lotusStage, 'en'),
    isFullMoonDay,
    isNewMoonDay,
    daysInMonth,
    allStages,
  };

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <LotusPreview data={lotusData} />

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-saffron leading-tight">
          Calm grows
          <br />
          Wisdom grows
        </h1>
        <p className="text-2xl md:text-3xl text-zen-stone">
          Meditation grows wisdom
        </p>
        <p className="text-xl text-zen-stone/70 mt-2">
          Grow like a lotus, day by day
        </p>
      </section>

      {/* Simple Quote */}
      <section className="max-w-3xl mx-auto mb-20">
        <blockquote className="buddha-quote text-center">
          <p className="text-2xl md:text-3xl mb-4">
            &ldquo;Rise from mud, stay clean&rdquo;
          </p>
          <footer className="text-lg text-zen-stone">
            — The Buddha
          </footer>
        </blockquote>
      </section>

      {/* Latest Posts */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-saffron">
            Latest posts
          </h2>
          <Link
            href={`/${locale}/posts`}
            className="text-xl text-saffron hover:text-saffron-dark transition-colors font-medium"
          >
            View all →
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
                  Day {post.lunarDay}
                </span>
                <span className="text-3xl">
                  {getLotusEmoji(post.lunarDay)}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-wisdom-text mb-2 hover:text-saffron transition-colors leading-tight">
                  <Link href={`/${locale}/posts/${post.slug}`}>
                    {post.title.en}
                  </Link>
                </h3>

                <p className="text-sm text-zen-stone/60 mb-4">
                  {post.title.en}
                </p>

                <Link
                  href={`/${locale}/posts/${post.slug}`}
                  className="inline-flex items-center text-xl text-saffron hover:text-saffron-dark transition-colors font-medium"
                >
                  Read →
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
            About GrowZen
          </h3>
          <p className="text-xl text-wisdom-text mb-6">
            Follow the moon. Share simple Buddhist wisdom.
          </p>
          <Link
            href={`/${locale}/about`}
            className="btn-primary inline-block"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
