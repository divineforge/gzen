import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPrinciples, getAllPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Principles',
  description: 'Core philosophical principles that guide the writing on gzen.',
};

export default function PrinciplesPage() {
  const principles = getAllPrinciples();
  const allPosts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <h1 className="text-xl font-medium text-stone-800 mb-2">Principles</h1>
      <p className="text-sm text-stone-500 mb-12 leading-relaxed">
        A small set of core ideas, repeated and refined across many writings.
        Meaning accumulates through repetition.
      </p>

      <div className="space-y-8">
        {principles.map((principle) => {
          const refPosts = allPosts.filter(
            (p) =>
              p.frontmatter.principle_reference === principle.slug &&
              !(p.slug === principle.slug && p.category === 'principles')
          );

          return (
            <div key={principle.slug} className="border border-stone-200 rounded p-6 bg-white">
              <Link href={`/principles/${principle.slug}`} className="group block mb-2">
                <h2 className="text-base font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
                  {principle.frontmatter.title}
                </h2>
              </Link>
              <p className="text-sm text-stone-500 mb-4 leading-relaxed">
                {principle.frontmatter.summary}
              </p>
              {refPosts.length > 0 && (
                <div>
                  <span className="text-xs text-stone-400 uppercase tracking-widest">Referenced in</span>
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
