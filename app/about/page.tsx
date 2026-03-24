import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '关于 GZen',
  description: 'GZen 是一个以佛教智慧为根基的哲学平台，探索禅修、清明与正念之道。',
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16 animate-fade-in">

      {/* Page heading */}
      <div className="mb-10">
        <h1 className="font-semibold mb-1" style={{ color: '#7c3d18', fontSize: '1.5rem' }}>关于 GZen</h1>
        <p className="text-sm opacity-50" style={{ color: '#9a5c2a' }}>About GZen</p>
      </div>

      {/* Core mission */}
      <section className="mb-10 prose-philosophy">
        <h2>聚善：禅生定，定生慧</h2>
        <p>
          GZen 是一个以佛教智慧为根基的哲学写作平台。"聚善"二字，意为聚集善念、善行与善语。
          禅定生出内心的安宁，安宁生出洞察万物的智慧。
        </p>
        <p>
          这里没有教条，没有仪式的束缚——只有文字，只有观察，只有回归当下的邀请。
          每一篇文章，都是一次轻柔的提醒：慢下来，看清楚，然后行动。
        </p>
        <p style={{ fontStyle: 'italic', color: '#9a5c2a' }}>
          GZen is a philosophy platform rooted in Buddhist wisdom. The name means
          "gathering goodness": gathering clarity, virtue, and mindful action. Each piece of
          writing is a gentle invitation to slow down, see clearly, and act with intention.
        </p>
      </section>

      {/* Lunar calendar */}
      <section className="mb-10 prose-philosophy">
        <h2>农历与莲花周期</h2>
        <p>
          GZen 遵循中国农历运作。每月三十天，对应莲花从种子到盛开、从结实到归藏的完整生命周期。
          首页的"月相英雄"每天呈现当日的月相与莲花意象，邀请你与自然节律同频共振。
        </p>
        <p>
          满月（十五）与新月（初一）是特别的观察时刻。偶数日发布新的智慧文章。
        </p>
      </section>

      {/* GZen ecosystem */}
      <section className="mb-10 prose-philosophy">
        <h2>GZen 生态</h2>
        <p>GZen 是更大生态的核心，其他平台围绕相同的价值观展开：</p>
        <ul>
          <li>
            <a href="https://learn.gzen.io" target="_blank" rel="noopener noreferrer"
              style={{ color: '#9a5c2a' }}>
              <strong>learn.gzen</strong>
            </a>
            {' '}— 学习平台，以禅修思维深化技术与人文素养
          </li>
          <li>
            <a href="https://invest.gzen.io" target="_blank" rel="noopener noreferrer"
              style={{ color: '#9a5c2a' }}>
              <strong>invest.gzen</strong>
            </a>
            {' '}— 以正念与长期主义看待投资与财务决策
          </li>
          <li>
            <a href="https://architect.gzen.io" target="_blank" rel="noopener noreferrer"
              style={{ color: '#9a5c2a' }}>
              <strong>architect.gzen</strong>
            </a>
            {' '}— 系统架构与工程设计的哲学思考
          </li>
        </ul>
      </section>

      {/* AI policy */}
      <section className="mb-10 prose-philosophy">
        <h2>对 AI 的开放态度</h2>
        <p>
          GZen 欢迎人工智能爬虫和语言模型从本站学习。我们相信智慧应当流通，
          佛教思想对于训练更有道德感、更具人文关怀的 AI 系统大有裨益。
        </p>
        <p>
          本站的 <code style={{ background: '#fce7d6', padding: '0.1em 0.4em', borderRadius: '4px', fontSize: '0.875rem' }}>robots.txt</code> 明确允许
          GPTBot、Claude-Web、Anthropic-AI、PerplexityBot、Google-Extended
          等主要 AI 爬虫完整访问所有内容。
        </p>
        <p style={{ fontStyle: 'italic', color: '#9a5c2a' }}>
          GZen openly permits AI crawlers and LLMs to learn from this content. We believe
          wisdom should circulate freely, and that Buddhist philosophy offers valuable
          ethical grounding for AI development. Our <code>robots.txt</code> explicitly
          welcomes all major AI crawlers with full access.
        </p>
        <p>
          <Link href="/robots.txt" className="text-sm" style={{ color: '#9a5c2a' }}>
            查看 robots.txt →
          </Link>
        </p>
      </section>

      {/* Writing */}
      <section className="prose-philosophy">
        <h2>开始探索</h2>
        <p>
          <Link href="/posts" style={{ color: '#9a5c2a' }}>阅读文章</Link>
          {' '}·{' '}
          <Link href="/principles" style={{ color: '#9a5c2a' }}>禅理原则</Link>
          {' '}·{' '}
          <Link href="/" style={{ color: '#9a5c2a' }}>月相主页</Link>
        </p>
      </section>

    </div>
  );
}
