import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLotusEmoji, getLotusStageDescription } from '@/lib/utils/lunar-calendar';

// Sample blog posts data (will be replaced with real content from database/MDX later)
const blogPosts: Record<string, {
  slug: string;
  title: Record<string, string>;
  content: Record<string, string>;
  excerpt: Record<string, string>;
  lunarDay: number;
  date: string;
  tags: string[];
  buddhaQuote: Record<string, { text: string; source: string }>;
  reflectionQuestions: Record<string, string[]>;
}> = {
  'mindfulness-in-daily-life': {
    slug: 'mindfulness-in-daily-life',
    title: {
      zh: '日常生活中的正念',
      en: 'Mindfulness in Daily Life',
      ja: '日常生活におけるマインドフルネス',
    },
    excerpt: {
      zh: '正念是觉醒的基础。当我们专注于当下，我们便能看清事物的本质。',
      en: 'Mindfulness is the foundation of awakening. When we focus on the present moment, we can see the true nature of things.',
      ja: 'マインドフルネスは目覚めの基礎です。今この瞬間に集中するとき、物事の真の姿を見ることができます。',
    },
    content: {
      zh: `正念，或称"念"（Sati），是佛教修行的核心之一。它意味着对当下的觉知——不带评判地观察我们的思想、情感和感受。

在日常生活中培养正念，并不需要我们坐在禅堂里打坐。相反，每一个日常活动都可以成为修行的机会。

**吃饭时的正念**

当你吃饭时，试着放下手机，关掉电视。专注于食物的颜色、气味、味道和质地。感受每一口食物在嘴里的感觉。这不仅能帮助你更好地消化，还能让你真正品尝到食物的美味。

**行走时的正念**

行走是另一个绝佳的正念练习机会。感受你的脚与地面的接触，注意你身体的重心如何移动。不需要走得很慢，只需要保持觉知。

**工作时的正念**

即使在繁忙的工作中，我们也可以培养正念。当你发现自己在担忧未来或后悔过去时，温柔地把注意力带回当下的任务。

正念不是要我们逃避生活，而是要我们更充分地活在生活中。正如一行禅师所说："生活只有在当下才是真实的。"

当我们培养正念时，我们开始看到：

- 思想只是思想，不是事实
- 情感来了又去，如同天空中的云朵
- 每一刻都是崭新的，充满可能性

这就是正念的力量——它让我们从自动反应模式中解脱出来，获得选择如何回应的自由。`,
      en: `Mindfulness, or "Sati" in Pali, is at the core of Buddhist practice. It means awareness of the present moment—observing our thoughts, emotions, and sensations without judgment.

Cultivating mindfulness in daily life doesn't require sitting in a meditation hall. Instead, every daily activity can become an opportunity for practice.

**Mindful Eating**

When eating, try putting down your phone and turning off the TV. Focus on the colors, smells, tastes, and textures of your food. Feel the sensation of each bite in your mouth. This not only aids digestion but allows you to truly taste your food.

**Mindful Walking**

Walking is another excellent opportunity for mindfulness practice. Feel your feet touching the ground, notice how your center of gravity shifts. You don't need to walk slowly—just maintain awareness.

**Mindful Working**

Even in busy work, we can cultivate mindfulness. When you find yourself worrying about the future or regretting the past, gently bring your attention back to the present task.

Mindfulness isn't about escaping life, but about living more fully. As Thich Nhat Hanh said: "Life is only available in the present moment."

When we cultivate mindfulness, we begin to see:

- Thoughts are just thoughts, not facts
- Emotions come and go like clouds in the sky
- Each moment is fresh, full of possibility

This is the power of mindfulness—it frees us from automatic reaction patterns and gives us the freedom to choose how to respond.`,
      ja: `マインドフルネス、パーリ語で「サティ」は、仏教の修行の核心です。それは今この瞬間への気づき—判断なしに私たちの思考、感情、感覚を観察することを意味します。

日常生活でマインドフルネスを育むために、瞑想ホールに座る必要はありません。代わりに、毎日の活動が練習の機会になります。

**食べる時のマインドフルネス**

食事の時は、スマートフォンを置き、テレビを消してみてください。食べ物の色、香り、味、食感に集中してください。口の中の一口一口の感覚を感じてください。これは消化を助けるだけでなく、食べ物を本当に味わうことができます。

**歩く時のマインドフルネス**

歩くことはマインドフルネスの練習のもう一つの素晴らしい機会です。足が地面に触れる感覚を感じ、重心がどのように移動するかに注目してください。ゆっくり歩く必要はありません—ただ気づきを保つだけです。

**働く時のマインドフルネス**

忙しい仕事の中でも、マインドフルネスを育むことができます。未来を心配したり、過去を後悔していることに気づいたら、優しく注意を今の仕事に戻してください。

マインドフルネスは人生から逃げることではなく、より充実して生きることです。ティク・ナット・ハンが言ったように：「人生は今この瞬間にしか存在しない。」

マインドフルネスを育むと、私たちは見え始めます：

- 思考はただの思考であり、事実ではない
- 感情は空の雲のように来ては去る
- 各瞬間は新鮮で、可能性に満ちている

これがマインドフルネスの力です—それは自動的な反応パターンから私たちを解放し、どのように応答するかを選ぶ自由を与えます。`,
    },
    lunarDay: 2,
    date: '2026-01-20',
    tags: ['mindfulness', 'daily-life', 'meditation', 'sati'],
    buddhaQuote: {
      zh: {
        text: '过去心不可得，未来心不可得，现在心亦不可得。',
        source: '《金刚经》',
      },
      en: {
        text: 'The past mind cannot be grasped, the future mind cannot be grasped, the present mind cannot be grasped.',
        source: 'Diamond Sutra',
      },
      ja: {
        text: '過去の心は得られず、未来の心は得られず、現在の心もまた得られず。',
        source: '金剛経',
      },
    },
    reflectionQuestions: {
      zh: [
        '今天，有哪些时刻你是真正专注于当下的？',
        '当你的心开始游离时，你通常会想到什么？',
        '你可以选择一个日常活动来练习正念吗？',
      ],
      en: [
        'Today, in which moments were you truly present?',
        'When your mind wanders, what do you usually think about?',
        'Can you choose one daily activity to practice mindfulness?',
      ],
      ja: [
        '今日、本当に今に集中していた瞬間はいつでしたか？',
        '心がさまようとき、通常何を考えますか？',
        'マインドフルネスを練習するために、一つの日常活動を選べますか？',
      ],
    },
  },
  'compassion-loving-kindness': {
    slug: 'compassion-loving-kindness',
    title: {
      zh: '慈悲与慈爱（Metta）',
      en: 'Compassion and Loving-Kindness (Metta)',
      ja: '慈悲と慈愛（メッタ）',
    },
    excerpt: {
      zh: '慈悲心是菩萨道的核心。当我们对众生生起慈悲，便能超越自我的局限。',
      en: 'Compassion is at the heart of the bodhisattva path. When we cultivate compassion for all beings, we transcend the limitations of the self.',
      ja: '慈悲の心は菩薩道の核心です。すべての存在に慈悲を育むとき、自己の限界を超えることができます。',
    },
    content: {
      zh: `慈悲，在佛教中是两个紧密相连的概念：慈（Metta）是希望众生获得快乐，悲（Karuna）是希望众生脱离痛苦。

培养慈悲心不仅有益于他人，更是自我解脱的道路。当我们心中充满慈悲时，嗔恨、嫉妒和恐惧自然消退。

**慈悲禅修（Metta Meditation）**

慈悲禅修是培养慈爱心的经典方法。它从自己开始，逐渐扩展到所有众生：

1. **对自己**：愿我平安，愿我快乐，愿我健康，愿我生活安详。
2. **对亲人**：愿你平安，愿你快乐...
3. **对中性的人**：愿你平安...
4. **对困难的人**：愿你平安...
5. **对所有众生**：愿一切众生平安，快乐，健康，生活安详。

**日常中的慈悲**

慈悲不仅仅是禅修时的练习。它可以融入我们生活的每一刻：

- 对服务员微笑
- 耐心倾听他人
- 在交通拥堵时保持平和
- 对自己的错误宽容

当我们培养慈悲时，我们开始认识到：每个人都在自己的方式中受苦，每个人都值得被爱和理解。这种认识能够化解隔阂，建立真正的联结。`,
      en: `Compassion in Buddhism consists of two closely related concepts: Metta (loving-kindness) is wishing happiness for all beings, and Karuna (compassion) is wishing freedom from suffering.

Cultivating compassion benefits not only others but is also a path to our own liberation. When our hearts are filled with compassion, anger, jealousy, and fear naturally subside.

**Metta Meditation**

Metta meditation is a classic method for cultivating loving-kindness. It begins with oneself and gradually extends to all beings:

1. **To yourself**: May I be safe, may I be happy, may I be healthy, may I live with ease.
2. **To loved ones**: May you be safe, may you be happy...
3. **To neutral people**: May you be safe...
4. **To difficult people**: May you be safe...
5. **To all beings**: May all beings be safe, happy, healthy, and live with ease.

**Compassion in Daily Life**

Compassion isn't just for meditation sessions. It can be woven into every moment of our lives:

- Smile at the server
- Listen patiently to others
- Stay peaceful in traffic
- Be forgiving of your own mistakes

When we cultivate compassion, we begin to recognize: everyone suffers in their own way, everyone deserves to be loved and understood. This recognition can dissolve barriers and build genuine connection.`,
      ja: `仏教における慈悲は、密接に関連する二つの概念から成ります：メッタ（慈愛）はすべての存在の幸福を願うこと、カルナ（悲）は苦しみからの解放を願うことです。

慈悲を育むことは他者のためだけでなく、自己解放への道でもあります。心が慈悲で満たされると、怒り、嫉妬、恐れは自然に消えていきます。

**メッタ瞑想**

メッタ瞑想は慈愛を育む古典的な方法です。自分から始まり、徐々にすべての存在へと広がります：

1. **自分へ**：私が安全でありますように、私が幸せでありますように、私が健康でありますように、私が安らかに生きられますように。
2. **愛する人へ**：あなたが安全でありますように...
3. **中立の人へ**：あなたが安全でありますように...
4. **困難な人へ**：あなたが安全でありますように...
5. **すべての存在へ**：すべての存在が安全で、幸せで、健康で、安らかに生きられますように。

**日常の慈悲**

慈悲は瞑想の時だけのものではありません。生活のすべての瞬間に織り込むことができます：

- ウェイターに微笑む
- 他者の話を辛抱強く聞く
- 交通渋滞でも平和を保つ
- 自分の過ちを許す

慈悲を育むと、私たちは認識し始めます：誰もが自分なりの方法で苦しんでおり、誰もが愛され理解される価値があると。この認識は障壁を溶かし、真のつながりを築くことができます。`,
    },
    lunarDay: 4,
    date: '2026-01-22',
    tags: ['compassion', 'metta', 'loving-kindness', 'meditation'],
    buddhaQuote: {
      zh: {
        text: '仇恨永远不能止息仇恨，唯有慈悲才能止息仇恨，这是永恒的真理。',
        source: '《法句经》第5偈',
      },
      en: {
        text: 'Hatred is never appeased by hatred in this world. By non-hatred alone is hatred appeased. This is an eternal law.',
        source: 'Dhammapada, verse 5',
      },
      ja: {
        text: '恨みは恨みによっては決して鎮まらない。恨みを捨ててこそ鎮まる。これは永遠の真理である。',
        source: '法句経 第5偈',
      },
    },
    reflectionQuestions: {
      zh: [
        '今天，你对自己有多少慈悲？',
        '有没有一个人，你觉得很难对他/她生起慈悲心？',
        '你能在明天尝试一次慈悲禅修吗？',
      ],
      en: [
        'Today, how much compassion did you have for yourself?',
        'Is there someone you find it difficult to feel compassion for?',
        'Can you try a loving-kindness meditation tomorrow?',
      ],
      ja: [
        '今日、自分自身にどれくらい慈悲を持ちましたか？',
        '慈悲を感じるのが難しい人はいますか？',
        '明日、慈愛の瞑想を試してみませんか？',
      ],
    },
  },
  'understanding-impermanence': {
    slug: 'understanding-impermanence',
    title: {
      zh: '理解无常（Anicca）',
      en: 'Understanding Impermanence (Anicca)',
      ja: '無常を理解する（アニッチャ）',
    },
    excerpt: {
      zh: '无常是佛陀最根本的教导之一。一切有为法如梦幻泡影，如露亦如电。',
      en: 'Impermanence is one of the Buddha\'s most fundamental teachings. All conditioned phenomena are like dreams, illusions, bubbles, shadows.',
      ja: '無常は仏陀の最も根本的な教えの一つです。すべての条件付けられた現象は夢、幻、泡、影のようなものです。',
    },
    content: {
      zh: `无常（Anicca）是佛教三法印之一，意味着一切有为法都在不断变化，没有任何事物是永恒不变的。

理解无常不是悲观主义，而是解脱的钥匙。当我们真正看到无常的本质，我们就不再执着于事物必须保持某种状态，从而获得内心的自由。

**无常的层面**

无常体现在生活的方方面面：

- **物质层面**：我们的身体每时每刻都在变化，细胞在新陈代谢
- **情感层面**：快乐和悲伤来了又去，没有任何情绪是永恒的
- **关系层面**：人际关系在不断演变，聚散离合是生命的常态
- **环境层面**：四季更替，日月轮转

**与无常共处**

理解无常后，我们可以：

1. **珍惜当下**：知道此刻转瞬即逝，我们更加珍惜每一个瞬间
2. **放下执着**：不再紧握必将失去的东西
3. **接受变化**：不再抗拒生命的自然流动
4. **培养感恩**：感激现在拥有的一切

无常教导我们：不要等到失去才珍惜，不要等到变化才接受。在每一个当下，我们都可以选择活得更有意义。`,
      en: `Impermanence (Anicca) is one of the Three Marks of Existence in Buddhism, meaning all conditioned phenomena are constantly changing, and nothing remains permanent.

Understanding impermanence isn't pessimism—it's the key to liberation. When we truly see the nature of impermanence, we no longer cling to things needing to stay a certain way, thus gaining inner freedom.

**Layers of Impermanence**

Impermanence manifests in all aspects of life:

- **Physical level**: Our bodies change every moment, cells metabolizing
- **Emotional level**: Joy and sorrow come and go, no emotion is eternal
- **Relationship level**: Relationships constantly evolve, meetings and partings are life's norm
- **Environmental level**: Seasons change, sun and moon rotate

**Living with Impermanence**

Understanding impermanence, we can:

1. **Cherish the present**: Knowing this moment is fleeting, we treasure each instant more
2. **Let go of attachment**: No longer grip what will inevitably be lost
3. **Accept change**: No longer resist life's natural flow
4. **Cultivate gratitude**: Appreciate everything we have now

Impermanence teaches us: don't wait until you lose something to cherish it, don't wait for change to accept it. In each present moment, we can choose to live more meaningfully.`,
      ja: `無常（アニッチャ）は仏教の三法印の一つであり、すべての条件付けられた現象が常に変化し、永続するものは何もないことを意味します。

無常を理解することは悲観主義ではありません—それは解放の鍵です。無常の本質を本当に見るとき、私たちはもう物事が特定の状態でなければならないと執着せず、内なる自由を得ます。

**無常の層**

無常は生活のすべての側面に現れます：

- **物質的レベル**：私たちの体は毎瞬変化し、細胞が代謝しています
- **感情的レベル**：喜びと悲しみは来ては去り、永遠の感情はありません
- **関係的レベル**：関係は常に進化し、出会いと別れは人生の常です
- **環境的レベル**：季節が変わり、太陽と月が回転します

**無常と共に生きる**

無常を理解すると、私たちは：

1. **今を大切にする**：この瞬間が儚いことを知り、各瞬間をより大切にします
2. **執着を手放す**：必ず失われるものをもう握りしめません
3. **変化を受け入れる**：人生の自然な流れにもう抵抗しません
4. **感謝を育む**：今持っているすべてに感謝します

無常は私たちに教えます：失ってから大切にするのを待たないでください、変化を受け入れるのを待たないでください。各瞬間に、私たちはより意味のある生き方を選ぶことができます。`,
    },
    lunarDay: 6,
    date: '2026-01-24',
    tags: ['impermanence', 'anicca', 'wisdom', 'three-marks'],
    buddhaQuote: {
      zh: {
        text: '一切有为法，如梦幻泡影，如露亦如电，应作如是观。',
        source: '《金刚经》',
      },
      en: {
        text: 'All conditioned phenomena are like dreams, illusions, bubbles, shadows, like dew and lightning. Thus should you view them.',
        source: 'Diamond Sutra',
      },
      ja: {
        text: 'すべての条件付けられた現象は、夢、幻、泡、影のようであり、露のようであり、稲妻のようである。このように観察すべきである。',
        source: '金剛経',
      },
    },
    reflectionQuestions: {
      zh: [
        '今天，有什么事情提醒了你无常的存在？',
        '你最执着于什么？它是永恒的吗？',
        '如果接受了无常，你的生活会有什么不同？',
      ],
      en: [
        'Today, what reminded you of impermanence?',
        'What are you most attached to? Is it permanent?',
        'If you accepted impermanence, how would your life be different?',
      ],
      ja: [
        '今日、何が無常を思い出させましたか？',
        '何に最も執着していますか？それは永続的ですか？',
        '無常を受け入れたら、あなたの人生はどう変わりますか？',
      ],
    },
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations();

  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  const lotusEmoji = getLotusEmoji(post.lunarDay);
  const lotusDescription = getLotusStageDescription(post.lunarDay, locale);

  return (
    <article className="container mx-auto px-4 py-12">
      {/* Back Link */}
      <div className="max-w-3xl mx-auto mb-8">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center text-zen-stone hover:text-saffron transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {locale === 'zh' ? '返回博客' : locale === 'ja' ? 'ブログに戻る' : 'Back to Blog'}
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-3xl mx-auto text-center mb-12">
        {/* Lunar Day Badge */}
        <div className="inline-flex items-center gap-3 bg-lotus-cream/50 rounded-full px-6 py-3 mb-6">
          <span className="text-2xl">{lotusEmoji}</span>
          <div className="text-left">
            <p className="text-sm text-zen-stone">
              {t('lotus.lunarDay', { day: post.lunarDay })}
            </p>
            <p className="text-sm font-medium text-saffron">
              {lotusDescription}
            </p>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wisdom-text mb-4">
          {post.title[locale] || post.title.en}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zen-stone">
          <span>{post.date}</span>
          <span className="hidden md:inline">|</span>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-lotus-cream/50 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Buddha Quote */}
      <section className="max-w-3xl mx-auto mb-12">
        <blockquote className="buddha-quote">
          <p className="text-wisdom-text mb-4">
            "{post.buddhaQuote[locale]?.text || post.buddhaQuote.en.text}"
          </p>
          <footer className="text-sm text-zen-stone">
            — {locale === 'zh' ? '佛陀' : locale === 'ja' ? '仏陀' : 'The Buddha'}, {post.buddhaQuote[locale]?.source || post.buddhaQuote.en.source}
          </footer>
        </blockquote>
      </section>

      {/* Article Content */}
      <section className="max-w-3xl mx-auto mb-12">
        <div className="prose prose-lg prose-wisdom font-serif">
          {(post.content[locale] || post.content.en).split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return (
                <h3 key={index} className="text-xl font-bold text-saffron mt-8 mb-4">
                  {paragraph.replace(/\*\*/g, '')}
                </h3>
              );
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={index} className="list-disc list-inside space-y-2 my-4">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i} className="text-wisdom-text">
                      {item.replace(/^- /, '')}
                    </li>
                  ))}
                </ul>
              );
            }
            if (paragraph.match(/^\d\. /)) {
              return (
                <ol key={index} className="list-decimal list-inside space-y-2 my-4">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i} className="text-wisdom-text">
                      {item.replace(/^\d\. /, '')}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={index} className="text-wisdom-text mb-4 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      </section>

      {/* Reflection Questions */}
      <section className="max-w-3xl mx-auto mb-12">
        <div className="bg-lotus-cream/30 rounded-lg border border-lotus-pink/20 p-8">
          <h2 className="text-2xl font-bold text-saffron mb-6 flex items-center gap-3">
            <span>🪷</span>
            {locale === 'zh' ? '反思问题' : locale === 'ja' ? '振り返りの質問' : 'Reflection Questions'}
          </h2>
          <ol className="space-y-4">
            {(post.reflectionQuestions[locale] || post.reflectionQuestions.en).map((question, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-saffron/20 rounded-full flex items-center justify-center text-saffron font-bold">
                  {index + 1}
                </span>
                <p className="text-wisdom-text font-serif pt-1">
                  {question}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Navigation */}
      <nav className="max-w-3xl mx-auto pt-8 border-t border-lotus-pink/20">
        <div className="flex justify-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 bg-saffron text-white px-6 py-3 rounded-lg hover:bg-saffron-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            {locale === 'zh' ? '查看所有文章' : locale === 'ja' ? 'すべての記事を見る' : 'View All Posts'}
          </Link>
        </div>
      </nav>
    </article>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).flatMap((slug) => [
    { locale: 'zh', slug },
    { locale: 'en', slug },
    { locale: 'ja', slug },
  ]);
}
