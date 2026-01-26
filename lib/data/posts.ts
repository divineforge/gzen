// Sample blog posts data
export interface BlogPost {
  id: number;
  slug: string;
  title: {
    zh: string;
    en: string;
    ja: string;
  };
  excerpt: {
    zh: string;
    en: string;
    ja: string;
  };
  lunarDay: number;
  date: string;
  tags: string[];
}

export const samplePosts: BlogPost[] = [
  {
    id: 1,
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
    lunarDay: 2,
    date: '2026-01-20',
    tags: ['mindfulness', 'daily-life', 'meditation'],
  },
  {
    id: 2,
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
    lunarDay: 4,
    date: '2026-01-22',
    tags: ['compassion', 'metta', 'loving-kindness'],
  },
  {
    id: 3,
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
    lunarDay: 6,
    date: '2026-01-24',
    tags: ['impermanence', 'anicca', 'wisdom'],
  },
  {
    id: 4,
    slug: 'four-noble-truths',
    title: {
      zh: '四圣谛：苦集灭道',
      en: 'The Four Noble Truths',
      ja: '四聖諦：苦集滅道',
    },
    excerpt: {
      zh: '四圣谛是佛陀在菩提树下证悟后的首次说法，是整个佛教教义的核心与基础。',
      en: 'The Four Noble Truths were the Buddha\'s first teaching after enlightenment, forming the core foundation of all Buddhist teachings.',
      ja: '四聖諦は、仏陀が菩提樹の下で悟りを開いた後の最初の説法であり、仏教教義全体の核心と基礎です。',
    },
    lunarDay: 8,
    date: '2026-01-26',
    tags: ['four-noble-truths', 'dharma', 'suffering', 'path'],
  },
];

// Get the latest posts (most recent first)
export function getLatestPosts(count: number = 3): BlogPost[] {
  return [...samplePosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
