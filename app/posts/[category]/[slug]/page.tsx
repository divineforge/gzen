import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, renderMarkdown, getAllSlugs } from '@/lib/content';
import type { ContentCategory } from '@/lib/content';

interface PageParams {
  category: string;
  slug: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  koans: '公案',
  principles: '禅理',
  practice: '修行',
  engineering: '工程',
  library: '典藏',
};

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
    <article className="max-w-3xl mx-auto px-4 py-10 sm:py-16 animate-fade-in">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Link href={`/posts`} className="text-xs transition-colors" style={{ color: '#a8a29e' }}>
            文章
          </Link>
          <span className="text-xs" style={{ color: '#d5c9c0' }}>/</span>
          <span className="text-xs" style={{ color: '#a8a29e' }}>{CATEGORY_LABELS[category] ?? category}</span>
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
        <aside className="mt-16 pt-8 border-t border-amber-200">
          <h2 className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: '#d97706' }}>
            相关文章
          </h2>
          <p className="text-[10px] mb-5" style={{ color: '#92400e', opacity: 0.45 }}>Related Writing</p>
          <div className="space-y-3">
            {related.map((r) => (
              <Link
                key={`${r.category}-${r.slug}`}
                href={`/posts/${r.category}/${r.slug}`}
                className="post-card block"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="principle-chip">{CATEGORY_LABELS[r.category] ?? r.category}</span>
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
