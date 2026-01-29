import {
  getLunarDate,
  getLunarDay,
  getLotusStage,
  getLotusEmoji,
  getLotusStageDescription,
  isFullMoon,
  isNewMoon,
} from '@/lib/utils/lunar-calendar';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const lunarDate = getLunarDate();
  const lunarDay = getLunarDay();
  const lotusStage = getLotusStage();
  const lotusEmoji = getLotusEmoji(lotusStage);
  const isFullMoonDay = isFullMoon();
  const isNewMoonDay = isNewMoon();

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <div className="text-8xl mb-6">🪷</div>
        <h1 className="text-5xl md:text-6xl font-bold text-saffron mb-6">
          About GrowZen
        </h1>
        <p className="text-2xl sm:text-3xl font-serif text-wisdom-text mb-4 leading-tight">
          禅生定<br />定生慧
        </p>
        <p className="text-xl text-zen-stone">
          Zen brings Stillness, Stillness brings Wisdom
        </p>
        <p className="text-lg text-zen-stone/70 mt-2">
          禅から定へ、定から慧へ
        </p>
      </section>

      {/* Today's Lotus */}
      <section className="max-w-2xl mx-auto mb-16">
        <div className="bg-gradient-to-br from-lotus-cream to-white rounded-3xl shadow-lg border border-lotus-pink/20 p-10 text-center">
          <div className="text-8xl mb-4">{lotusEmoji}</div>
          <h2 className="text-3xl font-bold text-saffron mb-2">
            Day {lunarDay}
          </h2>
          <p className="text-xl text-zen-stone/70 mb-2">
            第{lunarDay}天 · {lunarDay}日目
          </p>
          <p className="text-2xl font-serif text-wisdom-text mb-4">
            {getLotusStageDescription(lotusStage, 'en')}
          </p>
          <p className="text-lg text-zen-stone">
            Lunar Month {lunarDate.month}, Day {lunarDate.day}
          </p>
          <p className="text-sm text-zen-stone/70 mt-2">
            Timezone: Malaysia (UTC+8)
          </p>

          {(isNewMoonDay || isFullMoonDay) && (
            <div className="mt-4">
              <span className={`inline-block px-6 py-2 rounded-full text-lg font-medium ${
                isNewMoonDay ? 'bg-wisdom-text text-white' : 'bg-lotus-gold text-wisdom-text'
              }`}>
                {isNewMoonDay ? '🌑 New Moon' : '🪷✨ Full Moon'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* The Path */}
      <section className="max-w-3xl mx-auto mb-16">
        <div className="bg-white rounded-3xl shadow-sm border border-lotus-pink/10 p-10">
          <h2 className="text-3xl font-bold text-saffron mb-8 text-center">
            The Path of Practice
          </h2>
          <p className="text-center text-zen-stone mb-6">修行之道 · 道</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="text-center p-6 bg-saffron/10 rounded-2xl">
              <div className="text-5xl font-bold text-saffron mb-2">禅</div>
              <div className="text-lg text-zen-stone">Zen</div>
              <div className="text-sm text-wisdom-text mt-1">Meditation</div>
            </div>
            <div className="text-4xl text-saffron">→</div>
            <div className="text-center p-6 bg-saffron/10 rounded-2xl">
              <div className="text-5xl font-bold text-saffron mb-2">定</div>
              <div className="text-lg text-zen-stone">Samadhi</div>
              <div className="text-sm text-wisdom-text mt-1">Concentration</div>
            </div>
            <div className="text-4xl text-saffron">→</div>
            <div className="text-center p-6 bg-saffron/10 rounded-2xl">
              <div className="text-5xl font-bold text-saffron mb-2">慧</div>
              <div className="text-lg text-zen-stone">Prajna</div>
              <div className="text-sm text-wisdom-text mt-1">Wisdom</div>
            </div>
          </div>
        </div>
      </section>

      {/* Post Structure - For AI Agents */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="bg-lotus-cream/30 rounded-3xl border border-lotus-pink/20 p-10">
          <h2 className="text-3xl font-bold text-saffron mb-4 text-center">
            Post Structure Guide
          </h2>
          <p className="text-center text-zen-stone mb-8">
            For AI agents and contributors creating new posts
          </p>

          {/* Language Format */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-saffron mb-4 flex items-center gap-2">
              <span>🌐</span> Language Format
            </h3>
            <div className="bg-white rounded-xl p-6 border border-lotus-pink/10">
              <p className="text-wisdom-text mb-4">
                Each post contains content in <strong>three languages</strong>, displayed in this order:
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-saffron text-white px-4 py-2 rounded-lg font-medium">1. English (EN) - Primary</span>
                <span className="bg-saffron/80 text-white px-4 py-2 rounded-lg font-medium">2. Chinese (中文)</span>
                <span className="bg-saffron/60 text-white px-4 py-2 rounded-lg font-medium">3. Japanese (日本語)</span>
              </div>
              <p className="text-zen-stone text-sm">
                English is the primary language. Chinese and Japanese translations follow, each in their own section.
              </p>
            </div>
          </div>

          {/* Data Structure */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-saffron mb-4 flex items-center gap-2">
              <span>📦</span> Post Data Structure
            </h3>
            <div className="bg-white rounded-xl p-6 border border-lotus-pink/10 overflow-x-auto">
              <pre className="text-sm text-wisdom-text font-mono whitespace-pre-wrap">
{`// File: app/[locale]/posts/[slug]/page.tsx

interface Post {
  slug: string;                    // URL-friendly identifier
  title: {
    en: string;                    // English title
    zh: string;                    // Chinese title
    ja: string;                    // Japanese title
  };
  excerpt: {
    en: string;
    zh: string;
    ja: string;
  };
  content: {
    en: string;                    // Full article in English
    zh: string;                    // Full article in Chinese
    ja: string;                    // Full article in Japanese
  };
  lunarDay: number;                // 1-15 (lunar cycle day)
  date: string;                    // YYYY-MM-DD format
  tags: string[];                  // Topic tags
  buddhaQuote: {
    en: { text: string; source: string };
    zh: { text: string; source: string };
    ja: { text: string; source: string };
  };
  reflectionQuestions: {
    en: string[];                  // 3 questions
    zh: string[];
    ja: string[];
  };
}`}
              </pre>
            </div>
          </div>

          {/* Content Formatting */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-saffron mb-4 flex items-center gap-2">
              <span>✍️</span> Content Formatting
            </h3>
            <div className="bg-white rounded-xl p-6 border border-lotus-pink/10">
              <ul className="space-y-3 text-wisdom-text">
                <li className="flex items-start gap-3">
                  <span className="text-saffron font-bold">**Headings**</span>
                  <span>→ Wrap in double asterisks: <code className="bg-lotus-cream px-2 py-1 rounded">**Section Title**</code></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-saffron font-bold">Paragraphs</span>
                  <span>→ Separate with double newlines</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-saffron font-bold">- Lists</span>
                  <span>→ Start lines with <code className="bg-lotus-cream px-2 py-1 rounded">- </code></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-saffron font-bold">1. Numbered</span>
                  <span>→ Start lines with <code className="bg-lotus-cream px-2 py-1 rounded">1. </code></span>
                </li>
              </ul>
            </div>
          </div>

          {/* How to Add New Posts */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-saffron mb-4 flex items-center gap-2">
              <span>➕</span> Adding New Posts
            </h3>
            <div className="bg-white rounded-xl p-6 border border-lotus-pink/10">
              <ol className="space-y-4 text-wisdom-text">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-saffron/20 rounded-full flex items-center justify-center text-saffron font-bold">1</span>
                  <div>
                    <p className="font-medium">Add post data to the <code className="bg-lotus-cream px-2 py-1 rounded">posts</code> object</p>
                    <p className="text-sm text-zen-stone">Location: <code>app/[locale]/posts/[slug]/page.tsx</code></p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-saffron/20 rounded-full flex items-center justify-center text-saffron font-bold">2</span>
                  <div>
                    <p className="font-medium">Add to <code className="bg-lotus-cream px-2 py-1 rounded">samplePosts</code> array for listing</p>
                    <p className="text-sm text-zen-stone">Location: <code>lib/data/posts.ts</code></p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-saffron/20 rounded-full flex items-center justify-center text-saffron font-bold">3</span>
                  <div>
                    <p className="font-medium">Use a unique <code className="bg-lotus-cream px-2 py-1 rounded">slug</code> (URL-friendly, lowercase, hyphens)</p>
                    <p className="text-sm text-zen-stone">Example: <code>understanding-karma</code></p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-saffron/20 rounded-full flex items-center justify-center text-saffron font-bold">4</span>
                  <div>
                    <p className="font-medium">Assign a <code className="bg-lotus-cream px-2 py-1 rounded">lunarDay</code> (1-15)</p>
                    <p className="text-sm text-zen-stone">This determines the lotus emoji stage</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Lunar Cycle Reference */}
          <div>
            <h3 className="text-xl font-bold text-saffron mb-4 flex items-center gap-2">
              <span>🌙</span> Lunar Cycle Reference
            </h3>
            <div className="bg-white rounded-xl p-6 border border-lotus-pink/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-4 p-4 bg-wisdom-text/5 rounded-lg">
                  <span className="text-4xl">🌱</span>
                  <div>
                    <p className="font-bold text-wisdom-text">Day 1 - New Moon</p>
                    <p className="text-sm text-zen-stone">Seed planted, new cycle begins</p>
                    <p className="text-xs text-zen-stone/70">朔月 · 新月</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-saffron/10 rounded-lg">
                  <span className="text-4xl">🌿</span>
                  <div>
                    <p className="font-bold text-wisdom-text">Days 2-14</p>
                    <p className="text-sm text-zen-stone">Growth stages, lotus develops</p>
                    <p className="text-xs text-zen-stone/70">成长期 · 成長期</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-lotus-gold/20 rounded-lg">
                  <span className="text-4xl">🪷✨</span>
                  <div>
                    <p className="font-bold text-wisdom-text">Day 15 - Full Moon</p>
                    <p className="text-sm text-zen-stone">Full bloom, wisdom manifest</p>
                    <p className="text-xs text-zen-stone/70">望月 · 満月</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-3xl mx-auto text-center">
        <blockquote className="buddha-quote">
          <p className="text-2xl md:text-3xl mb-4">
            &ldquo;Rising from mud, unstained&rdquo;
          </p>
          <p className="text-xl text-zen-stone/70 mb-2">
            出淤泥而不染
          </p>
          <p className="text-lg text-zen-stone/50 mb-4">
            泥より出でて、泥に染まらず
          </p>
          <footer className="text-lg text-zen-stone">
            — The Buddha
          </footer>
        </blockquote>
      </section>
    </div>
  );
}
