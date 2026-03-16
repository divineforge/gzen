import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostsByPrincipleReference, renderMarkdown, getAllPrinciples } from '@/lib/content';

interface PageParams {
  slug: string;
}

export async function generateStaticParams() {
  return getAllPrinciples().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const principle = getPostBySlug('principles', slug);
  if (!principle) return {};
  return {
    title: principle.frontmatter.title,
    description: principle.frontmatter.summary,
  };
}

export default async function PrinciplePage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const principle = getPostBySlug('principles', slug);
  if (!principle) notFound();

  const html = await renderMarkdown(principle.content);
  const referenced = getPostsByPrincipleReference(slug).filter(
    (p) => !(p.slug === slug && p.category === 'principles')
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <Link href="/principles" className="text-xs transition-colors" style={{ color: '#a8a29e' }}>
          禅理
        </Link>
        <span className="text-xs" style={{ color: '#d5c9c0' }}>/</span>
        <span className="text-xs" style={{ color: '#a8a29e' }}>{principle.frontmatter.title}</span>
      </div>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-2xl font-medium text-stone-800 mb-3 tracking-tight">
          {principle.frontmatter.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400">
          <span>{principle.frontmatter.date}</span>
        </div>
        {principle.frontmatter.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {principle.frontmatter.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`} className="tag-pill">
                {tag}
              </Link>
            ))}
          </div>
        )}
        {principle.frontmatter.summary && (
          <p className="mt-4 text-sm text-stone-500 italic leading-relaxed border-l-2 border-stone-200 pl-3">
            {principle.frontmatter.summary}
          </p>
        )}
      </header>

      {/* Principle Content */}
      <div className="prose-philosophy mb-16" dangerouslySetInnerHTML={{ __html: html }} />

      {/* Posts referencing this principle */}
      {referenced.length > 0 && (
        <aside className="pt-8 border-t border-amber-200">
          <h2 className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: '#d97706' }}>
            引用此禅理的文章
          </h2>
          <p className="text-[10px] mb-5" style={{ color: '#92400e', opacity: 0.45 }}>Writing That References This Principle</p>
          <div className="space-y-3">
            {referenced.map((post) => (
              <Link
                key={`${post.category}-${post.slug}`}
                href={`/posts/${post.category}/${post.slug}`}
                className="post-card block"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-stone-400">{post.category}</span>
                  <span className="text-stone-300 text-xs">·</span>
                  <span className="text-xs text-stone-400">{post.frontmatter.date}</span>
                </div>
                <h3 className="text-sm font-medium text-stone-800">{post.frontmatter.title}</h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{post.frontmatter.summary}</p>
              </Link>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
