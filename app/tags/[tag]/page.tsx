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
        <Link href="/" className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
          gzen
        </Link>
        <span className="text-stone-300 text-xs">/</span>
        <span className="text-xs text-stone-400">tags</span>
        <span className="text-stone-300 text-xs">/</span>
        <span className="text-xs text-stone-400">{tag}</span>
      </div>

      <h1 className="text-xl font-medium text-stone-800 mb-2">#{tag}</h1>
      <p className="text-sm text-stone-500 mb-10">
        {posts.length} {posts.length === 1 ? 'piece' : 'pieces'} of writing
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
