import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostsByPrincipleReference, renderMarkdown, getAllPrinciples } from '@/lib/content';

interface PageParams {
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
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <Link href="/principles" className="text-xs transition-colors" style={{ color: '#c4a882' }}>
          禅理
        </Link>
        <span className="text-xs" style={{ color: '#e8cbb8' }}>/</span>
        <span className="text-xs" style={{ color: '#c4a882' }}>{principle.frontmatter.title}</span>
      </div>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-2xl font-medium mb-3 tracking-tight" style={{ color: '#4a2c1a' }}>
          {principle.frontmatter.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: '#c4a882' }}>
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
          <p className="mt-4 text-sm italic leading-relaxed border-l-2 pl-3" style={{ color: '#8c5c3a', borderColor: '#f0d9c8' }}>
            {principle.frontmatter.summary}
          </p>
        )}
      </header>

      {/* Principle Content */}
      <div className="prose-philosophy mb-16" dangerouslySetInnerHTML={{ __html: html }} />

      {/* Posts referencing this principle */}
      {referenced.length > 0 && (
        <aside className="pt-8 border-t" style={{ borderColor: '#f0d9c8' }}>
          <h2 className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: '#e8956d' }}>
            引用此禅理的文章
          </h2>
          <p className="text-[10px] mb-5" style={{ color: '#9a5c2a', opacity: 0.45 }}>Writing That References This Principle</p>
          <div className="space-y-3">
            {referenced.map((post) => (
              <Link
                key={`${post.category}-${post.slug}`}
                href={`/posts/${post.category}/${post.slug}`}
                className="post-card block"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="principle-chip">{CATEGORY_LABELS[post.category] ?? post.category}</span>
                  <span className="text-xs" style={{ color: '#c4a882' }}>{post.frontmatter.date}</span>
                </div>
                <h3 className="text-sm font-medium" style={{ color: '#4a2c1a' }}>{post.frontmatter.title}</h3>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: '#8c5c3a' }}>{post.frontmatter.summary}</p>
              </Link>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
