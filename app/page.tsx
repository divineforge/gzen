import Link from 'next/link';
import { getAllPosts, getAllPrinciples, getAllTags } from '@/lib/content';
import LunarHero from '@/components/LunarHero';
import { getLunarDate, getLotusEmoji, getLotusStageDescription } from '@/lib/utils/lunar-calendar';
import type { LunarStage } from '@/components/LunarHero';

const CATEGORY_LABELS: Record<string, string> = {
  koans: 'koan',
  principles: 'principle',
  practice: 'practice',
  engineering: 'engineering',
  library: 'library',
};

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 6);
  const principles = getAllPrinciples();
  const tags = getAllTags();

  // Compute lunar data server-side — all 30 stages passed to client LunarHero
  const lunarDate = getLunarDate();
  const allStages: LunarStage[] = Array.from({ length: lunarDate.daysInMonth }, (_, i) => {
    const stage = i + 1;
    return {
      stage,
      emoji: getLotusEmoji(stage),
      description: getLotusStageDescription(stage, 'en'),
      chineseDescription: getLotusStageDescription(stage, 'zh'),
    };
  });

  return (
    <div className="animate-fade-in">

      {/* Lunar Hero — full-width, dynamic per-day backdrop with scroll-fade */}
      <LunarHero
        currentLunarDay={lunarDate.day}
        lunarMonthName={lunarDate.monthName}
        lunarYearName={lunarDate.yearName}
        daysInMonth={lunarDate.daysInMonth}
        allStages={allStages}
      />

      {/* Page content — sits below the hero */}
      <div className="max-w-3xl mx-auto px-4 py-12">

      {/* Core Principles */}
      <section className="mb-14">
        <h2 className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-5">Core Principles</h2>
        <div className="space-y-2">
          {principles.map((p) => (
            <Link
              key={p.slug}
              href={`/principles/${p.slug}`}
              className="flex items-start gap-3 group"
            >
              <span className="text-stone-300 mt-1 group-hover:text-stone-500 transition-colors">→</span>
              <div>
                <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors">
                  {p.frontmatter.title}
                </span>
                <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                  {p.frontmatter.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Writing */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-medium uppercase tracking-widest text-stone-400">Recent Writing</h2>
          <Link href="/posts" className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
            all writing →
          </Link>
        </div>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={`${post.category}-${post.slug}`}
              href={`/posts/${post.category}/${post.slug}`}
              className="post-card block"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="principle-chip">{CATEGORY_LABELS[post.category] ?? post.category}</span>
                <span className="text-xs text-stone-400">{post.frontmatter.date}</span>
              </div>
              <h3 className="text-sm font-medium text-stone-800 mb-1">{post.frontmatter.title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">{post.frontmatter.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tags */}
      {tags.length > 0 && (
        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-3">Topics</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`} className="tag-pill">
                {tag}
              </Link>
            ))}
          </div>
        </section>
      )}
      </div>
    </div>
  );
}
