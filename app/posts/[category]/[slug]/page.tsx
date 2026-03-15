import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, renderMarkdown, getAllSlugs } from '@/lib/content';
import type { ContentCategory } from '@/lib/content';

interface PageParams {
  category: string;
  slug: string;
}

export async function generateStaticParams() {
  return getAllSlugs().map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPostBySlug(category as ContentCategory, slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
  };
}

export default async function PostPage({ params }: { params: Promise<PageParams> }) {
  const { category, slug } = await params;
  const post = getPostBySlug(category as ContentCategory, slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);
  const related = getRelatedPosts(post, 3);

  return (
    <article className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Link href={`/posts`} className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
            writing
          </Link>
          <span className="text-stone-300 text-xs">/</span>
          <span className="text-xs text-stone-400">{category}</span>
        </div>
        <h1 className="text-2xl font-medium text-stone-800 mb-3 tracking-tight">
          {post.frontmatter.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400">
          <span>{post.frontmatter.date}</span>
          {post.frontmatter.principle_reference && (
            <>
              <span>·</span>
              <Link
                href={`/principles/${post.frontmatter.principle_reference}`}
                className="hover:text-stone-600 transition-colors"
              >
                {post.frontmatter.principle_reference.replace(/-/g, ' ')}
              </Link>
            </>
          )}
        </div>
        {post.frontmatter.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.frontmatter.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`} className="tag-pill">
                {tag}
              </Link>
            ))}
          </div>
        )}
        {post.frontmatter.summary && (
          <p className="mt-4 text-sm text-stone-500 italic leading-relaxed border-l-2 border-stone-200 pl-3">
            {post.frontmatter.summary}
          </p>
        )}
      </header>

      {/* Content */}
      <div
        className="prose-philosophy"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Related Posts */}
      {related.length > 0 && (
        <aside className="mt-16 pt-8 border-t border-stone-200">
          <h2 className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-5">
            Related Writing
          </h2>
          <div className="space-y-3">
            {related.map((r) => (
              <Link
                key={`${r.category}-${r.slug}`}
                href={`/posts/${r.category}/${r.slug}`}
                className="post-card block"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-stone-400">{r.category}</span>
                  <span className="text-stone-300 text-xs">·</span>
                  <span className="text-xs text-stone-400">{r.frontmatter.date}</span>
                </div>
                <h3 className="text-sm font-medium text-stone-800">{r.frontmatter.title}</h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{r.frontmatter.summary}</p>
              </Link>
            ))}
          </div>
        </aside>
      )}
    </article>
  );
}
