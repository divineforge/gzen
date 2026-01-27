import { getTranslations } from 'next-intl/server';
import { getLotusEmoji } from '@/lib/utils/lunar-calendar';
import Link from 'next/link';
import { samplePosts } from '@/lib/data/posts';

export default async function PostsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-saffron mb-6">
          {locale === 'ja' ? '智慧の記事' : locale === 'en' ? 'Wisdom Posts' : '智慧文章'}
        </h1>
        <p className="text-2xl text-zen-stone">
          {locale === 'ja'
            ? '仏教の智慧を日常に'
            : locale === 'en'
            ? 'Buddhist wisdom for daily life'
            : '佛法智慧，日常修行'
          }
        </p>
      </section>

      {/* Posts */}
      <section className="max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {samplePosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-sm border border-lotus-pink/10 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-gradient-to-r from-lotus-cream to-lotus-pink/20 px-6 py-4 flex items-center justify-between">
                <span className="text-lg text-zen-stone font-medium">
                  {locale === 'ja' ? `${post.lunarDay}日目` : locale === 'en' ? `Day ${post.lunarDay}` : `第${post.lunarDay}天`}
                </span>
                <span className="text-3xl">
                  {getLotusEmoji(post.lunarDay)}
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-wisdom-text mb-4 hover:text-saffron transition-colors leading-tight">
                  <Link href={`/${locale}/posts/${post.slug}`}>
                    {post.title[locale as keyof typeof post.title] || post.title.en}
                  </Link>
                </h2>

                <p className="text-lg text-zen-stone/70 mb-4 line-clamp-2">
                  {post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en}
                </p>

                <Link
                  href={`/${locale}/posts/${post.slug}`}
                  className="inline-flex items-center text-xl text-saffron hover:text-saffron-dark transition-colors font-medium"
                >
                  {locale === 'ja' ? '読む' : locale === 'en' ? 'Read' : '阅读'} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
