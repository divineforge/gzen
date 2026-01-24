# 🪷 Buddhist Wisdom Blog - Lotus Growth Cycles

> **⚠️ UPDATED (2026-01-24)**: Platform decision changed to **Vercel + Next.js** (from Astro + Cloudflare) to support database, Telegram bot, and backend API requirements. Name updated to keep "Zen" and "G" from original branding.

## Project Vision

Transform GZen from a gaming playground into a beautiful Buddhist wisdom blog that follows the natural cycles of the lotus flower, aligned with the Chinese lunar calendar. The site will automatically generate and publish Buddhist wisdom content on even lunar days, with special celebrations on the 1st and 15th of each lunar month.

### Key Requirements (Updated)
- ✅ Database support (Vercel KV + MongoDB)
- ✅ Telegram bot integration
- ✅ Backend API capabilities
- ✅ Monorepo architecture
- ✅ Keep "Zen" and "G" in naming
- ✅ All-in-one platform (Vercel)

---

## 🎯 Core Concept

### The Lotus Growth Cycle

The lotus flower is a central symbol in Buddhism, representing spiritual awakening and purity rising from muddy waters. Our blog will visualize this growth through:

- **Lunar Days 1-15**: Lotus grows from seed to full bloom
- **Day 1 (New Moon)**: New cycle begins with Buddha quote
- **Day 15 (Full Moon)**: Full bloom with special Buddha quote
- **Even Days (2, 4, 6, 8, 10, 12, 14)**: New wisdom blog posts published
- **Cycle Repeats**: Eternal renewal representing the continuous path to enlightenment

### Growth Stages

```
Day 1  → 🌑 Seed planted (New Moon) + Buddha Quote
Day 2  → 🌱 Sprout emerges + Blog Post
Day 3  → 🌿 Young stem
Day 4  → 🪴 Leaves form + Blog Post
Day 5  → 🍃 Growth continues
Day 6  → 🌿 Stem strengthens + Blog Post
Day 7  → 🪷 Bud forms
Day 8  → 🌸 Bud develops + Blog Post
Day 9  → 🌺 Petals visible
Day 10 → 🪷 Opening begins + Blog Post
Day 11 → 🌸 Petals unfold
Day 12 → 🌺 Nearly open + Blog Post
Day 13 → 🪷 Almost full
Day 14 → 🌸 Final opening + Blog Post
Day 15 → 🪷✨ FULL BLOOM (Full Moon) + Special Buddha Quote
[Cycle restarts on Day 1]
```

---

## 📛 Brand Name & Identity

### **Final Decision: GrowZen**

**Brand Name:** GrowZen
**Domain:** gzen.io *(keeping existing domain)*
**Chinese Name:** 禅生定，定生慧
**Pronunciation:** Chán shēng dìng, dìng shēng huì
**Meaning:** "Zen gives rise to concentration, concentration gives rise to wisdom"

### Buddhist Philosophy

Adapted from the traditional teaching 戒生定，定生慧 (Precepts → Samadhi → Prajna):

```
禅 (Zen/Meditation)
    ↓ 生 (gives rise to)
定 (Samadhi/Concentration)
    ↓ 生 (gives rise to)
慧 (Prajna/Wisdom)
```

This represents the Buddhist path from practice to enlightenment, mirrored in the lotus growth cycles.

### Multilingual Branding

**Chinese (Primary):**
```
GrowZen
禅生定，定生慧
伴随月圆月缺，智慧如莲绽放
```
*"With the moon's cycles, wisdom blooms like the lotus"*

**English:**
```
GrowZen
禅生定，定生慧
Where Meditation Blooms into Wisdom
```

**Japanese (Phase 2):**
```
GrowZen（グロウゼン）
禅定慧の道
月の満ち欠けとともに、智慧は蓮のように開く
```
*"With the waxing and waning moon, wisdom opens like the lotus"*

### Target Audience

**Primary:** Mandarin Chinese speakers (Mainland China, Taiwan, Singapore)
**Secondary:** English speakers interested in Buddhism
**Tertiary:** Japanese speakers (Phase 2 expansion)

---

## 🏗️ Technical Architecture

### Technology Stack

**✅ UPDATED DECISION: Switch to Vercel + Next.js**

**Core Stack:**
- ✅ **Next.js 15** (App Router) - Full-stack framework with backend support
- ✅ **Vercel** - Hosting + serverless functions + cron + databases
- ✅ **Tailwind CSS** - Flexible styling
- ✅ **TypeScript** - Type safety
- ✅ **Vercel KV** (Redis) - Fast key-value storage
- ✅ **MongoDB Atlas** - Document database (Phase 2+)

**Dependencies:**
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "@vercel/kv": "^3.0.0",
    "mongodb": "^6.0.0",
    "lunar-javascript": "^1.6.12",
    "date-fns": "^3.0.0",
    "next-mdx-remote": "^5.0.0",
    "grammy": "^1.0.0",
    "@anthropic-ai/sdk": "^0.30.0"
  }
}
```

### Platform Comparison: Vercel vs Cloudflare

| Feature | **Vercel** ✅ | **Cloudflare Pages** |
|---------|---------------|---------------------|
| **Backend APIs** | ✅ Full Node.js serverless | ⚠️ Workers (limited) |
| **Database** | ✅ Vercel KV (Redis)<br>✅ Postgres<br>✅ MongoDB support | ⚠️ D1 (SQLite only)<br>⚠️ Basic KV<br>❌ No MongoDB |
| **Cron Jobs** | ✅ Built-in Vercel Cron | ⚠️ Via external triggers |
| **Telegram Bot** | ✅ Easy API routes | ⚠️ Complex via Workers |
| **Monorepo** | ✅ Excellent (Turborepo) | ⚠️ Limited |
| **Future Scalability** | ✅ Database, auth, etc. | ❌ Static-first only |

### Why Vercel + Next.js (Not Astro + Cloudflare)?

| Need | Vercel + Next.js | Astro + Cloudflare |
|------|------------------|-------------------|
| **Blog Content** | ✅ MDX + ISR | ✅ Content Collections |
| **Database (KV)** | ✅ Vercel KV (Redis) | ⚠️ Basic KV only |
| **Database (MongoDB)** | ✅ Easy integration | ❌ Not supported |
| **Telegram Bot** | ✅ API routes + webhooks | ⚠️ Difficult |
| **Backend APIs** | ✅ Full Node.js | ❌ Very limited |
| **Cron Jobs** | ✅ Native support | ⚠️ Need GitHub Actions |
| **Monorepo** | ✅ Built for it | ⚠️ Limited support |

**Conclusion**: Vercel + Next.js is essential for database, Telegram bot, and future backend features. The monorepo approach supports all requirements in one platform.

---

## 🗂️ New Project Structure (Vercel + Next.js Monorepo)

```
gzen-monorepo/
├── apps/
│   └── web/                         # Next.js 15 App
│       ├── app/
│       │   ├── (blog)/              # Blog route group
│       │   │   ├── page.tsx         # Homepage with lotus
│       │   │   ├── blog/
│       │   │   │   ├── page.tsx     # Blog archive
│       │   │   │   ├── [slug]/
│       │   │   │   │   └── page.tsx # Individual post
│       │   │   │   └── tag/
│       │   │   │       └── [tag]/page.tsx
│       │   │   ├── calendar/
│       │   │   │   └── page.tsx     # Lunar calendar
│       │   │   └── about/
│       │   │       └── page.tsx     # About page
│       │   ├── api/                 # API Routes
│       │   │   ├── cron/
│       │   │   │   ├── daily-wisdom/route.ts  # Vercel Cron
│       │   │   │   └── telegram-broadcast/route.ts
│       │   │   ├── telegram/
│       │   │   │   └── webhook/route.ts
│       │   │   ├── lotus/
│       │   │   │   └── current-stage/route.ts
│       │   │   └── generate/
│       │   │       └── post/route.ts
│       │   ├── layout.tsx           # Root layout
│       │   └── globals.css          # Global styles
│       ├── components/
│       │   ├── LotusVisualizer.tsx  # Lotus display
│       │   ├── BuddhaQuote.tsx      # Quote component
│       │   ├── BlogCard.tsx         # Post preview
│       │   ├── LunarCalendar.tsx    # Calendar widget
│       │   └── BuddhistHolidays.tsx # Special dates
│       ├── lib/
│       │   ├── db/
│       │   │   ├── mongodb.ts       # MongoDB client
│       │   │   └── vercel-kv.ts    # Vercel KV client
│       │   ├── lunar-calendar.ts    # Lunar utilities
│       │   ├── lotus-phases.ts      # Growth stages
│       │   ├── telegram.ts          # Telegram bot
│       │   └── content.ts           # Blog post management
│       ├── content/
│       │   └── posts/               # MDX blog posts
│       │       └── *.mdx
│       ├── public/
│       │   ├── lotus/               # Lotus images
│       │   │   ├── stage-01.svg
│       │   │   └── ...stage-15.svg
│       │   └── favicon.svg
│       └── package.json
├── packages/
│   ├── shared-types/                # Shared TypeScript types
│   │   ├── src/
│   │   │   ├── blog.ts
│   │   │   ├── lotus.ts
│   │   │   └── index.ts
│   │   └── package.json
│   └── buddhist-content/            # Content utilities
│       ├── src/
│       │   ├── quotes.ts
│       │   ├── topics.ts
│       │   └── index.ts
│       └── package.json
├── scripts/
│   └── seed-database.ts             # Initial DB seeding
├── vercel.json                      # Vercel config + cron
├── turbo.json                       # Turborepo config (optional)
├── PLAN.md                          # This file
├── TODO.md                          # Implementation checklist
├── README.md                        # Project readme
└── package.json                     # Monorepo root
```

---

## 💾 Database Strategy

### Phase 1-2: Vercel KV (Redis)

Perfect for fast, ephemeral data:

```typescript
// lib/db/vercel-kv.ts
import { kv } from '@vercel/kv';

// Current lotus state
export async function getCurrentLotusStage() {
  return await kv.get<number>('lotus:current-stage') || 1;
}

export async function setLotusStage(stage: number) {
  await kv.set('lotus:current-stage', stage);
}

// Current Buddha quote
export async function getCurrentQuote() {
  return await kv.get<string>('quote:current');
}

export async function setCurrentQuote(quote: string) {
  // TTL of 15 days (full lunar cycle)
  await kv.set('quote:current', quote, { ex: 86400 * 15 });
}

// Lunar day cache
export async function getLunarDayCache() {
  return await kv.get<number>('lunar:current-day');
}

export async function setLunarDayCache(day: number) {
  // TTL of 1 day
  await kv.set('lunar:current-day', day, { ex: 86400 });
}
```

**Use Cases:**
- ✅ Current lotus growth stage
- ✅ Active Buddha quote
- ✅ Lunar day cache
- ✅ Rate limiting
- ✅ Session storage
- ✅ User subscriptions (temporary)

### Phase 3+: MongoDB Atlas

For persistent, queryable data:

```typescript
// lib/db/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
let db: Db;

export async function getDatabase() {
  if (!db) {
    await client.connect();
    db = client.db('gzen');
  }
  return db;
}

// Blog posts
export async function saveBlogPost(post: BlogPost) {
  const db = await getDatabase();
  return await db.collection('posts').insertOne({
    ...post,
    createdAt: new Date(),
    lunarDay: getLunarDay(),
  });
}

export async function getPostsByTag(tag: string) {
  const db = await getDatabase();
  return await db.collection('posts')
    .find({ tags: tag })
    .sort({ createdAt: -1 })
    .toArray();
}

// Telegram subscribers
export async function saveSubscriber(chatId: number, username: string) {
  const db = await getDatabase();
  return await db.collection('subscribers').updateOne(
    { chatId },
    { $set: { chatId, username, subscribedAt: new Date() } },
    { upsert: true }
  );
}

export async function getActiveSubscribers() {
  const db = await getDatabase();
  return await db.collection('subscribers')
    .find({ active: true })
    .toArray();
}
```

**Use Cases:**
- ✅ Blog posts (with full-text search)
- ✅ User subscriptions
- ✅ Comment system (future)
- ✅ Analytics and metrics
- ✅ Telegram bot state

---

## 🤖 Telegram Bot Integration

### Setup with Grammy

```typescript
// lib/telegram.ts
import { Bot } from 'grammy';

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

// Send daily wisdom to user
export async function sendDailyWisdom(chatId: number) {
  const post = await getLatestWisdomPost();
  const lotus = await getCurrentLotusStage();
  const lunarDay = getLunarDay();

  const message = `🪷 *Lunar Day ${lunarDay}* - Cycle Day ${lotus}/15

${getLotusEmoji(lotus)} ${getLotusDescription(lotus)}

📖 *${post.title}*

${post.excerpt}

[Read Full Post](${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug})

🙏 _Buddhist wisdom with every moon_`;

  await bot.api.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
  });
}

// Handle bot commands
export async function setupBot() {
  bot.command('start', async (ctx) => {
    await ctx.reply(
      '🪷 Welcome to GZen Bloom!\n\n' +
      'Get Buddhist wisdom following the lotus growth cycles.\n\n' +
      'Commands:\n' +
      '/subscribe - Get daily wisdom on even lunar days\n' +
      '/unsubscribe - Stop notifications\n' +
      '/today - Current lotus stage & quote\n' +
      '/calendar - View lunar calendar'
    );
  });

  bot.command('subscribe', async (ctx) => {
    await saveSubscriber(ctx.chat.id, ctx.from?.username || '');
    await ctx.reply('✅ Subscribed! You\'ll receive wisdom posts on even lunar days (2, 4, 6, 8, 10, 12, 14).');
  });

  bot.command('today', async (ctx) => {
    await sendDailyWisdom(ctx.chat.id);
  });
}
```

### Webhook Endpoint

```typescript
// app/api/telegram/webhook/route.ts
import { webhookCallback } from 'grammy';
import { bot } from '@/lib/telegram';

export const POST = webhookCallback(bot, 'std/http');
```

### Vercel Cron for Broadcasting

```typescript
// app/api/cron/telegram-broadcast/route.ts
export async function GET(req: Request) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const lunarDay = getLunarDay();

  // Only send on even lunar days (when new posts are published)
  if (lunarDay % 2 !== 0) {
    return Response.json({ skipped: true, lunarDay });
  }

  const subscribers = await getActiveSubscribers();
  let sent = 0;

  for (const subscriber of subscribers) {
    try {
      await sendDailyWisdom(subscriber.chatId);
      sent++;
    } catch (error) {
      console.error(`Failed to send to ${subscriber.chatId}:`, error);
    }
  }

  return Response.json({ sent, total: subscribers.length, lunarDay });
}
```

### Vercel Cron Configuration

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/daily-wisdom",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/telegram-broadcast",
      "schedule": "0 1 * * *"
    }
  ]
}
```

---

## 🎨 Design System

### Color Palette (Buddhist Inspired)

```css
/* Tailwind Config */
colors: {
  lotus: {
    pink: '#FFC0CB',      /* Lotus petals */
    cream: '#FFF8E7',     /* Light backgrounds */
    gold: '#FFD700',      /* Accents, enlightenment */
  },
  saffron: {
    light: '#FFCC99',
    DEFAULT: '#FF9933',   /* Monk robes */
    dark: '#CC6600',
  },
  zen: {
    stone: '#8B8680',     /* Meditation stone */
    bamboo: '#3D5A41',    /* Nature */
    water: '#4A90A4',     /* Tranquility */
  },
  wisdom: {
    bg: '#FFF9F0',        /* Warm background */
    text: '#2C2416',      /* Dark brown text */
    accent: '#C19A6B',    /* Gold accent */
  }
}
```

### Typography

```css
/* Primary: Noto Serif for wisdom content */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;600;700&display=swap');

/* Secondary: Noto Sans for UI */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap');

body {
  font-family: 'Noto Sans', sans-serif;
}

.wisdom-text {
  font-family: 'Noto Serif', serif;
  line-height: 1.8;
}
```

---

## 🌏 Internationalization (i18n)

### Language Strategy

**Primary Language:** 中文 (Mandarin Chinese)
**Secondary Language:** English
**Phase 2 Language:** 日本語 (Japanese)

### Next.js i18n Configuration

```typescript
// next.config.js
module.exports = {
  i18n: {
    locales: ['zh', 'en', 'ja'],
    defaultLocale: 'zh', // Chinese as primary
    localeDetection: true,
  },
}
```

### Translation File Structure

```
apps/web/
├── messages/
│   ├── zh.json          # Chinese (Simplified) - PRIMARY
│   ├── en.json          # English
│   └── ja.json          # Japanese (Phase 2)
```

### Key Translations

**Chinese (zh.json):**
```json
{
  "site": {
    "title": "GrowZen",
    "name": "禅生定，定生慧",
    "tagline": "伴随月圆月缺，智慧如莲绽放",
    "description": "跟随农历月相，每逢偶数日更新佛法智慧。如莲花绽放，觉悟于日常。"
  },
  "nav": {
    "home": "首页",
    "blog": "博客",
    "calendar": "历法",
    "about": "关于"
  },
  "lotus": {
    "lunarDay": "农历第 {day} 天",
    "cycle": "生长周期 {current}/{total}",
    "newMoon": "朔月 - 新周期开始",
    "fullMoon": "望月 - 圆满绽放"
  },
  "telegram": {
    "subscribe": "订阅 Telegram 推送",
    "subscribed": "✅ 已订阅！每逢偶数农历日将收到智慧推送。"
  }
}
```

**English (en.json):**
```json
{
  "site": {
    "title": "GrowZen",
    "name": "禅生定，定生慧",
    "tagline": "Where Meditation Blooms into Wisdom",
    "description": "Buddhist wisdom following lunar cycles. New posts on even lunar days."
  },
  "nav": {
    "home": "Home",
    "blog": "Blog",
    "calendar": "Calendar",
    "about": "About"
  },
  "lotus": {
    "lunarDay": "Lunar Day {day}",
    "cycle": "Growth Cycle {current}/{total}",
    "newMoon": "New Moon - Cycle Begins",
    "fullMoon": "Full Moon - Full Bloom"
  },
  "telegram": {
    "subscribe": "Subscribe via Telegram",
    "subscribed": "✅ Subscribed! You'll receive wisdom on even lunar days."
  }
}
```

**Japanese (ja.json - Phase 2):**
```json
{
  "site": {
    "title": "GrowZen",
    "name": "禅定慧の道",
    "tagline": "月の満ち欠けとともに、智慧は蓮のように開く",
    "description": "太陰暦に従い、偶数日に仏教の智慧を更新。蓮の花のように目覚める。"
  },
  "nav": {
    "home": "ホーム",
    "blog": "ブログ",
    "calendar": "カレンダー",
    "about": "について"
  },
  "lotus": {
    "lunarDay": "太陰暦 {day} 日目",
    "cycle": "成長サイクル {current}/{total}",
    "newMoon": "新月 - サイクル開始",
    "fullMoon": "満月 - 完全開花"
  },
  "telegram": {
    "subscribe": "Telegram で購読",
    "subscribed": "✅ 購読しました！偶数の太陰暦日に智慧をお届けします。"
  }
}
```

### URL Structure

```
gzen.io/                     → Chinese (default)
gzen.io/en/                  → English
gzen.io/ja/                  → Japanese (Phase 2)

gzen.io/blog/post-slug       → Chinese post
gzen.io/en/blog/post-slug    → English post
gzen.io/ja/blog/post-slug    → Japanese post (Phase 2)
```

### Content Translation Strategy

**Phase 1: Chinese + English**
1. Generate blog post in Chinese (primary) via Claude API
2. Auto-translate to English via Claude API
3. Store both versions in content folder

**Phase 2: Japanese**
1. Add Japanese translation of existing posts
2. Translate new posts to Japanese automatically

### Multilingual Blog Post Structure

```
apps/web/content/posts/
├── zh/
│   ├── lunar-day-2-mindfulness.mdx
│   ├── lunar-day-4-compassion.mdx
│   └── ...
├── en/
│   ├── lunar-day-2-mindfulness.mdx
│   ├── lunar-day-4-compassion.mdx
│   └── ...
└── ja/                      # Phase 2
    ├── lunar-day-2-mindfulness.mdx
    └── ...
```

### Telegram Bot Multilingual Support

**User can select language:**
```
/start - Welcome message (auto-detect or ask)
/language - Change language (中文/English/日本語)
```

**Messages adapt to user's language:**
- Chinese: 🪷 农历第 8 天 - 生长周期 8/15
- English: 🪷 Lunar Day 8 - Cycle 8/15
- Japanese: 🪷 太陰暦 8 日目 - 成長サイクル 8/15

---

## 🤖 Automation System

### GitHub Actions Workflow

**Trigger**: Daily at 00:00 UTC (checks lunar calendar)

**Process**:
1. Calculate current lunar day
2. Check if it's an even day (2, 4, 6, 8, 10, 12, 14)
3. If even day → Generate blog post via Claude API
4. If day 1 or 15 → Update homepage Buddha quote
5. Commit new content to repository
6. Auto-deploy via Cloudflare Pages

### Content Generation with Claude API

**Step 1: Generate Chinese Post (Primary)**

```typescript
const chinesePrompt = `生成一篇佛法智慧博客文章

农历第 {lunarDay} 天，莲花阶段：{lotusStage}
主题：{topic}

主题选项：
- 正念生活（Mindfulness in daily life）
- 慈悲与慈爱（Metta and compassion）
- 理解无常（Understanding impermanence）
- 正语与沟通（Right speech）
- 禅修实践（Meditation practices）
- 五戒与道德生活（Five Precepts）
- 克服苦难（Overcoming dukkha）
- 中道（The Middle Way）
- 不执着（Non-attachment）
- 活在当下（Present moment awareness）

格式要求：
- 标题简洁有力（20-30 字）
- 正文：800-1200 字
- 包含 1-2 句佛陀名言（标注出处）
- 提供现代生活中的实践应用
- 结尾包含 3 个反思问题
- 使用 Markdown 格式

语气：温和、易懂、不说教、实用
受众：现代人，对佛法智慧感兴趣
`;
```

**Step 2: Translate to English**

```typescript
const englishPrompt = `Translate the following Chinese Buddhist wisdom blog post to English.

Requirements:
- Maintain the warmth, accessibility, and practical wisdom
- Keep Buddha quotes in original language with English translation
- Preserve the structure and reflection questions
- Use 600-900 words
- Target audience: Modern English speakers interested in Buddhism

Chinese post:
{chineseContent}
`;
```

**Step 3: Translate to Japanese (Phase 2)**

```typescript
const japanesePrompt = `以下の仏教智慧のブログ記事を日本語に翻訳してください。

要件：
- 適切な仏教用語を使用（禅、定、慧、etc.）
- 温かみとアクセシビリティを保つ
- 構造と反省の質問を保持
- 700-1000文字
- ターゲット読者：仏教に興味のある現代の日本人

English post:
{englishContent}
`;
```

**Quality Controls**:
- Review generated content for accuracy
- Ensure quotes are authentic (verified database)
- Check for cultural sensitivity
- Validate markdown formatting

---

## 📅 Lunar Calendar Integration

### Library: lunar-javascript

```javascript
import Lunar from 'lunar-javascript';

// Get current lunar date
const lunar = Lunar.fromDate(new Date());
const lunarDay = lunar.getDay();        // 1-30
const lunarMonth = lunar.getMonth();    // 1-12
const lunarYear = lunar.getYear();

// Calculate lotus stage
function getLotusStage(day) {
  if (day >= 1 && day <= 15) {
    return day; // Growing phase
  } else {
    return 30 - day + 1; // Descending phase (or restart)
  }
}

// Check for Buddhist holidays
const festivals = lunar.getFestivals();
```

### Important Buddhist Dates

Auto-highlight special observance days:

| Festival | Lunar Date | Significance |
|----------|-----------|--------------|
| **Vesak** | 4th month, 15th day | Buddha's birth, enlightenment, death |
| **Magha Puja** | 3rd month, 15th day | First sermon gathering |
| **Asalha Puja** | 6th month, 15th day | First teaching |
| **Uposatha Days** | 1st, 8th, 15th, 23rd | Observance days |

---

## 🌸 Lotus Visualization

### Implementation Options

**Option 1: SVG Animation** (Recommended)
- 15 hand-drawn or sourced SVG illustrations
- CSS transitions between stages (fade/grow)
- Lightweight, scalable
- Example: [Undraw.co](https://undraw.co), [Freepik](https://freepik.com)

**Option 2: Lottie Animation**
- Professional animated lotus
- Single JSON file
- Smooth transitions
- Source: [LottieFiles](https://lottiefiles.com)

**Option 3: CSS-Only**
- Pure CSS lotus using shapes
- Most lightweight
- Less visually impressive
- DIY approach

**Recommendation**: Start with SVG, upgrade to Lottie if desired.

### Lotus Component Structure

```astro
---
// src/components/LotusVisualizer.astro
import { getLunarDay, getLotusStage } from '../utils/lotusCalendar';

const lunarDay = getLunarDay();
const stage = getLotusStage(lunarDay);
const lotusImage = `/lotus/stage-${String(stage).padStart(2, '0')}.svg`;
---

<div class="lotus-container">
  <div class="lotus-visual">
    <img
      src={lotusImage}
      alt={`Lotus growth stage ${stage}`}
      class="lotus-image transition-all duration-1000 ease-in-out"
    />
  </div>
  <div class="lunar-info">
    <p class="text-sm text-zen-stone">
      Lunar Day {lunarDay} • Cycle Day {stage}
    </p>
    <div class="progress-bar">
      <div
        class="progress-fill bg-lotus-pink"
        style={`width: ${(stage / 15) * 100}%`}
      />
    </div>
  </div>
</div>
```

---

## 📝 Content Collections Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lunarDay: z.number().min(1).max(30),
    lunarMonth: z.number().min(1).max(12),
    lunarYear: z.number(),
    author: z.string().default('Buddhist Bot'),
    tags: z.array(z.string()),
    buddhaQuote: z.string().optional(),
    excerpt: z.string().optional(),
    draft: z.boolean().default(false),
  })
});

export const collections = {
  'blog': blogCollection,
};
```

---

## 🚀 Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Finalize project name (vote: Bodhi Bloom)
- [ ] Install dependencies (lunar-javascript, MDX, etc.)
- [ ] Set up Astro Content Collections
- [ ] Create lotus growth calculator utility
- [ ] Source/create 15 lotus SVG images
- [ ] Set up Buddhist color scheme in Tailwind

### Phase 2: Core Features (Week 2-3)
- [ ] **Homepage**:
  - [ ] Lotus visualizer component
  - [ ] Current Buddha quote display
  - [ ] Lotus growth progress indicator
  - [ ] Latest blog posts preview (3 posts)
- [ ] **Blog System**:
  - [ ] Blog post template layout
  - [ ] Archive page with lunar grouping
  - [ ] Tag system and tag pages
  - [ ] Individual post pages
- [ ] **Calendar Page**:
  - [ ] Visual lunar calendar
  - [ ] Current cycle progress
  - [ ] Buddhist holidays highlighter
  - [ ] Cycle explanation

### Phase 3: Automation (Week 4)
- [ ] **GitHub Actions Setup**:
  - [ ] Daily cron job workflow
  - [ ] Lunar day calculator script
  - [ ] Claude API integration
  - [ ] Auto-commit and push logic
  - [ ] Error handling and notifications
- [ ] **Content Generation**:
  - [ ] Topic database (20+ themes)
  - [ ] Buddha quotes database (100+ quotes)
  - [ ] Prompt templates with variety
  - [ ] Quality validation
- [ ] **Secrets Configuration**:
  - [ ] ANTHROPIC_API_KEY
  - [ ] GitHub token for commits

### Phase 4: Polish & Launch (Week 5)
- [ ] **Design Polish**:
  - [ ] Refine Buddhist theme
  - [ ] Add subtle animations (zen-like)
  - [ ] Optimize typography
  - [ ] Mobile responsive testing
- [ ] **Enhancements**:
  - [ ] RSS feed generation
  - [ ] Social sharing cards (Open Graph)
  - [ ] SEO optimization (meta tags, sitemap)
  - [ ] Accessibility audit (WCAG AA)
- [ ] **Testing**:
  - [ ] Test full 15-day cycle simulation
  - [ ] Verify automation workflow
  - [ ] Cross-browser testing
  - [ ] Performance optimization
- [ ] **Launch**:
  - [ ] Update domain/rebrand
  - [ ] Write announcement post
  - [ ] Share on social media

---

## 🎯 Success Metrics

### Qualitative Goals
- Create a peaceful, meditative browsing experience
- Provide authentic, helpful Buddhist wisdom
- Build an ever-growing archive of teachings
- Maintain consistency with automated publishing

### Quantitative Goals (Optional)
- Publish 15 posts per lunar month (every even day)
- Build archive of 180+ posts in first year
- 100+ unique Buddha quotes database
- 30+ core Buddhist topics covered

---

## 🔮 Future Enhancements

### Phase 5+ (Optional)
- [ ] Newsletter integration (email on full moon days)
- [ ] User meditation timer
- [ ] Daily mindfulness notifications
- [ ] Multi-language support (Chinese, Sanskrit)
- [ ] Audio versions of blog posts (text-to-speech)
- [ ] Community discussion features
- [ ] Donation/dana support for Buddhist charities
- [ ] Mobile app (PWA)
- [ ] Guided meditation audio tracks

---

## 📚 Resources

### Buddhist Content Sources
- Access to Insight (accesstoinsight.org)
- Buddhanet (buddhanet.net)
- Tricycle Magazine (tricycle.org)
- Plum Village (plumvillage.org)

### Design Inspiration
- Headspace (app design)
- Calm (peaceful aesthetics)
- Insight Timer (meditation focus)

### Technical References
- Astro Content Collections: https://docs.astro.build/en/guides/content-collections/
- lunar-javascript: https://github.com/6tail/lunar-javascript
- Anthropic API: https://docs.anthropic.com/

---

## 🙏 Philosophy

This project aims to:
- Make Buddhist wisdom accessible to modern seekers
- Demonstrate impermanence through ever-changing content
- Provide practical teachings for daily life
- Create beauty through simplicity (Zen aesthetics)
- Honor the Buddha's teachings authentically

The lotus grows from mud to bloom — may this site help others on their path to awakening.

---

**Last Updated**: 2026-01-24
**Status**: Planning Phase
**Next Review**: After Phase 1 completion
