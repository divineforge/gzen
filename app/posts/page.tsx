import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import type { ContentCategory } from '@/lib/content';

export const metadata: Metadata = {
  title: '文章',
  description: '公案、修行笔记、工程随感与典藏。',
};

const CATEGORY_LABELS: Record<ContentCategory, string> = {
  koans: '公案',
  principles: '禅理',
  practice: '修行',
  engineering: '工程',
  library: '典藏',
};

const CATEGORY_LABELS_EN: Record<ContentCategory, string> = {
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
      <h1 className="text-xl font-medium mb-1" style={{ color: '#78350f' }}>文章</h1>
      <p className="text-xs mb-1" style={{ color: '#92400e', opacity: 0.5 }}>Writing</p>
      <p className="text-sm mb-12" style={{ color: '#57534e' }}>
        公案·修行·工程·典藏 — 以文载道，以道修身。
      </p>

      {CATEGORY_ORDER.map((category) => {
        const items = grouped[category];
        if (!items.length) return null;
        return (
          <section key={category} className="mb-12">
            <div className="mb-4">
              <h2 className="text-xs font-medium uppercase tracking-widest" style={{ color: '#d97706' }}>
                {CATEGORY_LABELS[category]}
              </h2>
              <span className="text-[10px]" style={{ color: '#92400e', opacity: 0.45 }}>{CATEGORY_LABELS_EN[category]}</span>
            </div>
            <div className="space-y-3">
              {items.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${category}/${post.slug}`}
                  className="post-card block"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="principle-chip">{CATEGORY_LABELS[category]}</span>
                    <span className="text-xs" style={{ color: '#a8a29e' }}>{post.frontmatter.date}</span>
                    {post.frontmatter.tags?.slice(0, 2).map((tag) => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-sm font-medium mb-1" style={{ color: '#2c2416' }}>{post.frontmatter.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#57534e' }}>{post.frontmatter.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
