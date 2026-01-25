# 🪷 GrowZen - Buddhist Wisdom Blog

> **禅生定，定生慧** — *Zen gives rise to concentration, concentration gives rise to wisdom*

**Live Site:** [gzen.io](https://gzen.io)

---

## 🌸 Overview

GrowZen (禅生定，定生慧) is a Buddhist wisdom blog that follows the natural growth cycles of the lotus flower, aligned with the Chinese lunar calendar. The site automatically generates and publishes Buddhist teachings on even lunar days, with special celebrations on the 1st and 15th of each lunar month.

### The Lotus Growth Cycle

The lotus symbolizes spiritual awakening in Buddhism—purity rising from muddy waters. Our blog visualizes this through:

- **Days 1-15**: Lotus grows from seed 🌱 to full bloom 🪷
- **Day 1** (New Moon): New cycle begins with Buddha quote
- **Day 15** (Full Moon): Full bloom with special Buddha quote
- **Even Days** (2, 4, 6, 8, 10, 12, 14): New wisdom posts published
- **Endless Renewal**: Cycles repeat, representing the continuous path to enlightenment

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

## ✨ Features

### Current
- 🪷 **Lotus Visualization** - Watch the lotus grow with each lunar day
- 📅 **Lunar Calendar** - Follows traditional Chinese lunar calendar
- 💬 **Buddha Quotes** - Rotating wisdom on peak days (1st & 15th)
- 🌏 **Multilingual** - Chinese (primary), English, Japanese (Phase 2)
- 📱 **Responsive Design** - Beautiful on all devices

### Coming Soon *(see [TODO.md](TODO.md))*
- 🤖 **AI-Generated Content** - Claude API for daily wisdom posts
- 📝 **Wisdom Blog** - Automated posts every even lunar day
- 🤖 **Telegram Bot** - Subscribe for daily wisdom notifications
- 🗄️ **Database Integration** - Vercel KV + MongoDB support

---

## 🛠️ Tech Stack

- **[Next.js 15](https://nextjs.org)** - Full-stack React framework with App Router
- **[Vercel](https://vercel.com)** - Hosting, serverless functions, cron jobs
- **[React 19](https://react.dev)** - UI library
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first styling
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[next-intl](https://next-intl-docs.vercel.app/)** - Internationalization (i18n)
- **[lunar-javascript](https://github.com/6tail/lunar-javascript)** - Chinese lunar calendar

### Future Integrations
- **[Vercel KV](https://vercel.com/storage/kv)** - Redis key-value storage
- **[MongoDB Atlas](https://www.mongodb.com/atlas)** - Document database
- **[Grammy](https://grammy.dev/)** - Telegram bot framework
- **[@anthropic-ai/sdk](https://docs.anthropic.com/)** - AI content generation

---

## 🎯 Getting Started

### Prerequisites

- Node.js 20+
- npm, pnpm, or yarn
- Anthropic API key (for automated content generation)

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Type check
npm run type-check
```

The site will be available at `http://localhost:3000`

---

## 📦 Project Structure

```
gzen/
├── app/
│   ├── [locale]/           # Locale-based routing
│   │   ├── layout.tsx      # Locale layout with i18n
│   │   ├── page.tsx        # Homepage with lotus
│   │   ├── blog/           # Blog pages (coming soon)
│   │   ├── calendar/       # Lunar calendar (coming soon)
│   │   └── about/          # About page (coming soon)
│   ├── api/                # API routes (coming soon)
│   │   ├── cron/           # Vercel cron jobs
│   │   └── telegram/       # Telegram bot webhook
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── lib/
│   └── utils/
│       └── lunar-calendar.ts   # Lunar calendar utilities
├── messages/
│   ├── zh.json             # Chinese translations (primary)
│   ├── en.json             # English translations
│   └── ja.json             # Japanese translations (Phase 2)
├── types/                  # TypeScript type definitions
├── i18n.ts                 # i18n configuration
├── middleware.ts           # Next.js middleware for locale
├── PLAN.md                 # Comprehensive project plan
├── TODO.md                 # Implementation checklist
├── NAMING_I18N.md          # Branding & i18n guide
└── README.md               # This file
```

---

## 🌏 Internationalization (i18n)

GrowZen supports multiple languages with Chinese as the primary language:

| Language | URL | Status |
|----------|-----|--------|
| 中文 (Chinese) | `gzen.io/` | ✅ Primary |
| English | `gzen.io/en/` | ✅ Active |
| 日本語 (Japanese) | `gzen.io/ja/` | 🔜 Phase 2 |

### Language-Specific Branding

**Chinese:**
```
GrowZen
禅生定，定生慧
伴随月圆月缺，智慧如莲绽放
```

**English:**
```
GrowZen
禅生定，定生慧
Where Meditation Blooms into Wisdom
```

---

## 🤖 Automation

### How It Works

1. **Daily Check**: Vercel Cron runs at 00:00 UTC
2. **Lunar Calculation**: Determines current lunar day
3. **Content Generation**:
   - On even days (2, 4, 6, etc.) → Generate wisdom blog post via Claude API
   - On peak days (1 & 15) → Update homepage Buddha quote
4. **Telegram Broadcast**: Send wisdom to subscribers
5. **Auto-Deploy**: Vercel deploys updated site

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

**Required Environment Variables:**
- `ANTHROPIC_API_KEY` - For Claude API content generation
- `TELEGRAM_BOT_TOKEN` - For Telegram bot
- `MONGODB_URI` - For MongoDB database (Phase 2+)

---

## 📝 Content Topics

The blog covers practical Buddhist teachings:

- 🧘 Mindfulness in daily life
- 💚 Compassion and loving-kindness (Metta)
- 🍂 Understanding impermanence (Anicca)
- 🗣️ Right speech and communication
- 🪷 Meditation practices (Vipassana, Samatha)
- ⚖️ Ethical living (Five Precepts)
- 🌱 Overcoming suffering (Dukkha)
- ⚖️ The Middle Way
- 🎋 Non-attachment
- ⏰ Present moment awareness
- 📿 The Four Noble Truths & Eightfold Path

---

## 🌙 Lunar Calendar Integration

```typescript
import { getLunarDay, getLotusStage, isEvenLunarDay } from '@/lib/utils/lunar-calendar';

// Get current lunar date
const lunarDay = getLunarDay();        // 1-30
const lotusStage = getLotusStage();    // 1-15

// Check for special days
const isNewMoon = lunarDay === 1;
const isFullMoon = lunarDay === 15;
const isBlogDay = isEvenLunarDay();    // Blog post day
```

### Important Buddhist Dates

The site automatically highlights:
- **Vesak** (4th month, 15th day) - Buddha's birth, enlightenment, death
- **Magha Puja** (3rd month, 15th day) - First sermon gathering
- **Asalha Puja** (6th month, 15th day) - First teaching
- **Uposatha Days** (1st, 8th, 15th, 23rd) - Observance days

---

## 🚢 Deployment

### Automatic Deployment

Push to `main` branch triggers automatic deployment to Vercel.

```bash
git add .
git commit -m "Update content"
git push origin main
```

### Manual Deployment

```bash
# Build the site
npm run build

# Deploy using Vercel CLI
vercel --prod
```

---

## 🎨 Design Philosophy

### Zen Aesthetics
- **Simplicity**: Clean, uncluttered layouts
- **Whitespace**: Breathing room for contemplation
- **Subtle Animations**: Smooth, never distracting
- **Peaceful Colors**: Lotus pink, saffron, zen stone

### Buddhist Color Palette

```css
/* Lotus */
--lotus-pink: #FFC0CB;
--lotus-cream: #FFF8E7;
--lotus-gold: #FFD700;

/* Saffron (Monk robes) */
--saffron: #FF9933;

/* Zen */
--zen-stone: #8B8680;
--zen-bamboo: #3D5A41;
--zen-water: #4A90A4;

/* Wisdom */
--wisdom-bg: #FFF9F0;
--wisdom-text: #2C2416;
```

---

## 🗺️ Implementation Roadmap

### Status: 🔄 Phase 1 - Foundation

See [TODO.md](TODO.md) for detailed checklist.

1. ✅ **Foundation Setup**
   - ✅ Next.js 15 with App Router
   - ✅ Tailwind CSS with Buddhist theme
   - ✅ i18n with next-intl (zh, en, ja)
   - ✅ Lunar calendar utilities
   - ✅ Homepage with lotus visualizer

2. 🔄 **Core Features** (In Progress)
   - 🔜 Blog listing page
   - 🔜 Individual post pages
   - 🔜 Calendar page
   - 🔜 About page
   - 🔜 Navigation links

3. ⏳ **Automation** (Phase 2)
   - Vercel Cron jobs
   - Claude API integration
   - Telegram bot

4. ⏳ **Polish & Launch** (Phase 3)
   - SEO optimization
   - Performance tuning
   - Full testing

**Full Plan:** See [PLAN.md](PLAN.md)

---

## 🤝 Contributing

This is a personal Buddhist practice project, but suggestions are welcome!

### How to Contribute
- 🐛 Report bugs via [GitHub Issues](https://github.com/divineforge/gzen/issues)
- 💡 Suggest features or improvements
- 📚 Submit authentic Buddha quotes
- 🎨 Share design feedback

### Content Guidelines
- Teachings must be authentic to Buddhist tradition
- Quotes must be properly attributed
- Content should be accessible to modern practitioners
- Approach should be non-dogmatic and inclusive

---

## 📚 Resources & Inspiration

### Buddhist Sources
- [Access to Insight](https://accesstoinsight.org) - Theravada texts
- [BuddhaNet](https://buddhanet.net) - Buddhist education
- [Tricycle Magazine](https://tricycle.org) - Buddhist magazine
- [Plum Village](https://plumvillage.org) - Thich Nhat Hanh's teachings

### Technical References
- [Next.js 15 Docs](https://nextjs.org/docs)
- [next-intl Docs](https://next-intl-docs.vercel.app/)
- [lunar-javascript Docs](https://github.com/6tail/lunar-javascript)
- [Anthropic API](https://docs.anthropic.com/)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Philosophy

This project aims to:
- Make Buddhist wisdom accessible to modern seekers
- Demonstrate impermanence through ever-changing content
- Provide practical teachings for daily life
- Create beauty through simplicity (Zen aesthetics)
- Honor the Buddha's teachings authentically

> *"The lotus grows from mud to bloom—may this site help others on their path to awakening."*

---

## 🔗 Links

- **Website:** [gzen.io](https://gzen.io)
- **Repository:** [github.com/divineforge/gzen](https://github.com/divineforge/gzen)
- **Issues:** [Report bugs or request features](https://github.com/divineforge/gzen/issues)
- **Planning Docs:**
  - [PLAN.md](PLAN.md) - Comprehensive vision & architecture
  - [TODO.md](TODO.md) - Implementation checklist
  - [NAMING_I18N.md](NAMING_I18N.md) - Branding & i18n guide

---

**Last Updated**: 2026-01-25
**Status**: Phase 1 - Foundation (Next.js 15 + Vercel)
**Next Milestone**: Complete core pages (Blog, Calendar, About)

Built with 🪷 and the wisdom of the Buddha
