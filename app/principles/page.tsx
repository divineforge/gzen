import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPrinciples, getAllPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: '禅理',
  description: '聚善之道：以禅理引路，以文章印证，于重复中积累智慧。',
};

export default function PrinciplesPage() {
  const principles = getAllPrinciples();
  const allPosts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <h1 className="text-xl font-medium mb-1" style={{ color: '#78350f' }}>禅理</h1>
      <p className="text-xs mb-1" style={{ color: '#92400e', opacity: 0.5 }}>Principles</p>
      <p className="text-sm mb-12 leading-relaxed" style={{ color: '#57534e' }}>
        以少许核心思想贯通诸文，于重复诵读中积累智慧。
        <span className="block text-xs mt-1" style={{ opacity: 0.6 }}>
          A small set of core ideas, refined across many writings.
        </span>
      </p>

      <div className="space-y-8">
        {principles.map((principle) => {
          const refPosts = allPosts.filter(
            (p) =>
              p.frontmatter.principle_reference === principle.slug &&
              !(p.slug === principle.slug && p.category === 'principles')
          );

          return (
            <div key={principle.slug} className="rounded p-6 bg-white" style={{ border: '1px solid #e7e5e4' }}>
              <Link href={`/principles/${principle.slug}`} className="group block mb-2">
                <h2 className="text-base font-medium transition-colors group-hover:opacity-70" style={{ color: '#78350f' }}>
                  {principle.frontmatter.title}
                </h2>
              </Link>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#57534e' }}>
                {principle.frontmatter.summary}
              </p>
              {refPosts.length > 0 && (
                <div>
                  <span className="text-xs uppercase tracking-widest" style={{ color: '#d97706', opacity: 0.7 }}>引用于</span>
                  <span className="text-[10px] ml-2" style={{ color: '#92400e', opacity: 0.4 }}>Referenced in</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {refPosts.map((p) => (
                      <Link
                        key={`${p.category}-${p.slug}`}
                        href={`/posts/${p.category}/${p.slug}`}
                        className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 decoration-stone-300 transition-colors"
                      >
                        {p.frontmatter.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
