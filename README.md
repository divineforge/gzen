# 🪷 Bodhi Bloom - Buddhist Wisdom Blog

> *Ever-growing wisdom following the cycles of the lotus*

**Live Site:** [gzen.io](https://gzen.io) *(rebrand in progress)*

---

## 🌸 Overview

Bodhi Bloom is a Buddhist wisdom blog that follows the natural growth cycles of the lotus flower, aligned with the Chinese lunar calendar. The site automatically generates and publishes Buddhist teachings on even lunar days, with special celebrations on the 1st and 15th of each month.

### The Lotus Growth Cycle

The lotus symbolizes spiritual awakening in Buddhism—purity rising from muddy waters. Our blog visualizes this through:

- **Days 1-15**: Lotus grows from seed 🌱 to full bloom 🪷
- **Day 1** (New Moon): New cycle begins with Buddha quote
- **Day 15** (Full Moon): Full bloom with special Buddha quote
- **Even Days** (2, 4, 6, 8, 10, 12, 14): New wisdom posts published
- **Endless Renewal**: Cycles repeat, representing the continuous path to enlightenment

---

## ✨ Features

### Current
- 🪷 **Lotus Visualization** - Watch the lotus grow with each lunar day
- 📅 **Lunar Calendar** - Follows traditional Chinese lunar calendar
- 💬 **Buddha Quotes** - Rotating wisdom on peak days (1st & 15th)
- 📝 **Wisdom Blog** - Automated posts every even lunar day

### Coming Soon *(see [TODO.md](TODO.md))*
- 🤖 **AI-Generated Content** - Claude API for daily wisdom posts
- 🌙 **Buddhist Holidays** - Automatic highlighting of Vesak, Magha Puja, etc.
- 📱 **Responsive Design** - Beautiful on all devices
- 🎨 **Buddhist Theme** - Lotus pink, saffron gold, zen aesthetics

---

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** - Fast, content-focused static site generator
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first styling
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[MDX](https://mdxjs.com/)** - Enhanced markdown for blog posts
- **[lunar-javascript](https://github.com/6tail/lunar-javascript)** - Chinese lunar calendar
- **[Cloudflare Pages](https://pages.cloudflare.com)** - Global CDN hosting

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

# Preview production build
npm run preview
```

The site will be available at `http://localhost:4321`

---

## 📦 Project Structure

```
bodhi-bloom/
├── .github/workflows/      # GitHub Actions
│   ├── daily-wisdom.yml   # Automated content generation
│   └── deploy.yml         # Cloudflare deployment
├── public/
│   ├── lotus/             # 15 lotus growth stage images
│   └── buddha-quotes.json # Quote database
├── scripts/
│   ├── checkLunarDay.js   # Daily lunar calendar check
│   └── generateWisdomPost.js  # Claude API content generator
├── src/
│   ├── components/
│   │   ├── LotusVisualizer.astro  # Animated lotus display
│   │   ├── BuddhaQuote.astro      # Quote component
│   │   └── BlogCard.astro         # Blog post cards
│   ├── content/
│   │   ├── config.ts      # Content collection schema
│   │   └── blog/          # MDX blog posts
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Main layout
│   │   └── BlogPost.astro      # Blog post template
│   ├── pages/
│   │   ├── index.astro         # Homepage with lotus
│   │   ├── blog/               # Blog pages
│   │   ├── calendar.astro      # Lunar calendar page
│   │   └── about.astro         # About page
│   ├── styles/
│   │   └── buddhist-theme.css  # Custom Buddhist theme
│   └── utils/
│       ├── lotusCalendar.ts    # Lunar day calculations
│       ├── lotusPhases.ts      # Growth stage logic
│       └── quotes.ts           # Quote management
├── PLAN.md               # Comprehensive project plan
├── TODO.md               # Implementation checklist
└── README.md             # This file
```

---

## 🤖 Automation

### How It Works

1. **Daily Check**: GitHub Actions runs at 00:00 UTC
2. **Lunar Calculation**: Determines current lunar day
3. **Content Generation**:
   - On even days (2, 4, 6, etc.) → Generate wisdom blog post via Claude API
   - On peak days (1 & 15) → Update homepage Buddha quote
4. **Auto-Commit**: New content committed to repository
5. **Auto-Deploy**: Cloudflare Pages deploys updated site

### GitHub Actions Workflow

See [`.github/workflows/daily-wisdom.yml`](.github/workflows/daily-wisdom.yml) for full automation logic.

**Required Secrets:**
- `ANTHROPIC_API_KEY` - For Claude API content generation
- `CLOUDFLARE_API_TOKEN` - For deployment
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account
- `CLOUDFLARE_PROJECT_NAME` - Pages project name

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

*See [scripts/data/topics.json](scripts/data/topics.json) for full list.*

---

## 🌙 Lunar Calendar Integration

```javascript
import Lunar from 'lunar-javascript';

// Get current lunar date
const lunar = Lunar.fromDate(new Date());
const lunarDay = lunar.getDay();        // 1-30
const lunarMonth = lunar.getMonth();    // 1-12

// Check for special days
const isNewMoon = lunarDay === 1;
const isFullMoon = lunarDay === 15;
const isEvenDay = lunarDay % 2 === 0;   // Blog post day
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

Push to `main` branch triggers automatic deployment to Cloudflare Pages.

```bash
git add .
git commit -m "Update content"
git push origin main
```

### Manual Deployment

```bash
# Build the site
npm run build

# Deploy using Wrangler
npx wrangler pages deploy dist
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
```

---

## 🗺️ Implementation Roadmap

### Status: 🔄 Planning Phase

See [TODO.md](TODO.md) for detailed checklist.

1. ✅ **Phase 1**: Foundation (Week 1) - *In Progress*
2. ⏳ **Phase 2**: Core Features (Week 2-3)
3. ⏳ **Phase 3**: Automation (Week 4)
4. ⏳ **Phase 4**: Polish & Launch (Week 5)
5. 🔮 **Phase 5+**: Future Enhancements

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
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
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

- **Website:** [gzen.io](https://gzen.io) *(rebrand coming soon)*
- **Repository:** [github.com/divineforge/gzen](https://github.com/divineforge/gzen)
- **Issues:** [Report bugs or request features](https://github.com/divineforge/gzen/issues)
- **Planning Docs:**
  - [PLAN.md](PLAN.md) - Comprehensive vision & architecture
  - [TODO.md](TODO.md) - Implementation checklist

---

**Last Updated**: 2026-01-24
**Status**: Transforming from gaming playground to Buddhist wisdom blog
**Next Milestone**: Complete Phase 1 foundation

Built with 🪷 using Astro and the wisdom of the Buddha
