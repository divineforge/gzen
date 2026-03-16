import Link from 'next/link';
import { getAllPosts, getAllPrinciples, getAllTags } from '@/lib/content';
import LunarHero from '@/components/LunarHero';
import { getLunarDate, getLotusEmoji, getLotusStageDescription } from '@/lib/utils/lunar-calendar';
import type { LunarStage } from '@/components/LunarHero';

const CATEGORY_LABELS: Record<string, string> = {
  koans: '公案',
  principles: '禅理',
  practice: '修行',
  engineering: '工程',
  library: '典藏',
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
      japaneseDescription: getLotusStageDescription(stage, 'ja'),
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
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">

      {/* Core Principles */}
      <section className="mb-14">
        <h2 className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: '#d97706' }}>禅理</h2>
        <p className="text-[11px] mb-5" style={{ color: '#92400e', opacity: 0.5 }}>Core Principles</p>
        <div className="space-y-2">
          {principles.map((p) => (
            <Link
              key={p.slug}
              href={`/principles/${p.slug}`}
              className="flex items-start gap-3 group"
            >
              <span className="mt-1 transition-colors" style={{ color: '#d97706', opacity: 0.5 }}>→</span>
              <div>
                <span className="text-sm font-medium transition-colors" style={{ color: '#78350f' }}>
                  {p.frontmatter.title}
                </span>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#92400e', opacity: 0.6 }}>
                  {p.frontmatter.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Writing */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xs font-medium uppercase tracking-widest" style={{ color: '#d97706' }}>近期文章</h2>
          <Link href="/posts" className="text-xs transition-colors" style={{ color: '#92400e', opacity: 0.6 }}>
            全部文章 →
          </Link>
        </div>
        <p className="text-[11px] mb-5" style={{ color: '#92400e', opacity: 0.5 }}>Recent Writing</p>
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
          <h2 className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: '#d97706' }}>主题</h2>
          <p className="text-[11px] mb-3" style={{ color: '#92400e', opacity: 0.5 }}>Topics</p>
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
