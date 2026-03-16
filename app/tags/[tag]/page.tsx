import type { Metadata } from 'next';
import Link from 'next/link';
import { getPostsByTag, getAllTags } from '@/lib/content';

interface PageParams {
  tag: string;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `Writing tagged with "${tag}" on gzen.`,
  };
}

export default async function TagPage({ params }: { params: Promise<PageParams> }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/" className="text-xs transition-colors" style={{ color: '#a8a29e' }}>
          gzen
        </Link>
        <span className="text-xs" style={{ color: '#d5c9c0' }}>/</span>
        <span className="text-xs" style={{ color: '#a8a29e' }}>主题</span>
        <span className="text-xs" style={{ color: '#d5c9c0' }}>/</span>
        <span className="text-xs" style={{ color: '#a8a29e' }}>{tag}</span>
      </div>

      <h1 className="text-xl font-medium mb-1" style={{ color: '#78350f' }}>#{tag}</h1>
      <p className="text-sm mb-10" style={{ color: '#57534e' }}>
        {posts.length} 篇文章
        <span className="ml-2 text-xs" style={{ opacity: 0.5 }}>· {posts.length} {posts.length === 1 ? 'piece' : 'pieces'}</span>
      </p>

      {posts.length === 0 ? (
        <p className="text-sm text-stone-400">No writing found for this tag.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Link
              key={`${post.category}-${post.slug}`}
              href={`/posts/${post.category}/${post.slug}`}
              className="post-card block"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs text-stone-400">{post.category}</span>
                <span className="text-stone-300 text-xs">·</span>
                <span className="text-xs text-stone-400">{post.frontmatter.date}</span>
              </div>
              <h3 className="text-sm font-medium text-stone-800 mb-1">{post.frontmatter.title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">{post.frontmatter.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
