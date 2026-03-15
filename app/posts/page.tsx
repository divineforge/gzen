import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import type { ContentCategory } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'All writings — koans, practice notes, engineering reflections, and library entries.',
};

const CATEGORY_LABELS: Record<ContentCategory, string> = {
  koans: 'koan',
  principles: 'principle',
  practice: 'practice',
  engineering: 'engineering',
  library: 'library',
};

const CATEGORY_ORDER: ContentCategory[] = ['koans', 'principles', 'practice', 'engineering', 'library'];

export default function PostsPage() {
  const posts = getAllPosts();

  const grouped = CATEGORY_ORDER.reduce<Record<ContentCategory, typeof posts>>((acc, cat) => {
    acc[cat] = posts.filter((p) => p.category === cat);
    return acc;
  }, {} as Record<ContentCategory, typeof posts>);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <h1 className="text-xl font-medium text-stone-800 mb-2">Writing</h1>
      <p className="text-sm text-stone-500 mb-12">
        Short reflections on clarity, virtue, and disciplined thinking.
      </p>

      {CATEGORY_ORDER.map((category) => {
        const items = grouped[category];
        if (!items.length) return null;
        return (
          <section key={category} className="mb-12">
            <h2 className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-4">
              {category}
            </h2>
            <div className="space-y-3">
              {items.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${category}/${post.slug}`}
                  className="post-card block"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="principle-chip">{CATEGORY_LABELS[category]}</span>
                    <span className="text-xs text-stone-400">{post.frontmatter.date}</span>
                    {post.frontmatter.tags?.slice(0, 2).map((tag) => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-sm font-medium text-stone-800 mb-1">{post.frontmatter.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{post.frontmatter.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
