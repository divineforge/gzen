import { getLotusEmoji } from '@/lib/utils/lunar-calendar';
import Link from 'next/link';
import { samplePosts } from '@/lib/data/posts';

export default async function PostsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-saffron mb-6">
          Wisdom Posts
        </h1>
        <p className="text-2xl text-zen-stone">
          Buddhist wisdom for daily life
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
                  Day {post.lunarDay}
                </span>
                <span className="text-3xl">
                  {getLotusEmoji(post.lunarDay)}
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-wisdom-text mb-2 hover:text-saffron transition-colors leading-tight">
                  <Link href={`/${locale}/posts/${post.slug}`}>
                    {post.title.en}
                  </Link>
                </h2>

                {/* Show Chinese & Japanese titles as subtitle */}
                <p className="text-sm text-zen-stone/60 mb-3">
                  {post.title.zh} · {post.title.ja}
                </p>

                <p className="text-lg text-zen-stone/70 mb-4 line-clamp-2">
                  {post.excerpt.en}
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
    </div>
  );
}
