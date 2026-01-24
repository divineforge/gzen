# 🪷 Buddhist Wisdom Blog - Lotus Growth Cycles

## Project Vision

Transform GZen from a gaming playground into a beautiful Buddhist wisdom blog that follows the natural cycles of the lotus flower, aligned with the Chinese lunar calendar. The site will automatically generate and publish Buddhist wisdom content on even lunar days, with special celebrations on the 1st and 15th of each lunar month.

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

## 📛 Name Ideas

### Top Recommendations

1. **Bodhi Bloom** 🎋 *(Favorite)*
   - Bodhi = Enlightenment
   - Bloom = Growth/Flowering
   - Memorable and peaceful

2. **Lotus Dharma** 🪷
   - Direct reference to lotus
   - Dharma = Buddhist teachings

3. **Padma Path** 🌸
   - Padma = Sanskrit for lotus
   - Path = Spiritual journey

4. **Lunar Lotus** 🌙
   - Emphasizes lunar calendar
   - Clear concept

5. **Zen Bloom** 🌺
   - Keeps "Zen" from GZen
   - Simple and clean

**Domain Availability**: Check bodhibloom.com, bodhibloom.io, lotusdharma.io, padmapath.com

---

## 🏗️ Technical Architecture

### Technology Stack

**Keep Current Foundation:**
- ✅ **Astro 4.16+** - Perfect for content-focused blogs
- ✅ **Tailwind CSS** - Flexible styling
- ✅ **TypeScript** - Type safety
- ✅ **Cloudflare Pages** - Fast global deployment

**New Dependencies:**
```json
{
  "dependencies": {
    "@astrojs/mdx": "^3.0.0",
    "lunar-javascript": "^1.6.12",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@anthropic-ai/sdk": "^0.30.0"
  }
}
```

### Why Astro (Not Next.js)?

| Feature | Astro | Next.js | Winner |
|---------|-------|---------|--------|
| Content Collections | Built-in | Requires setup | ✅ Astro |
| Static Blog Performance | Excellent | Good | ✅ Astro |
| MDX Support | Native | Via plugin | ✅ Astro |
| Build Speed | Very Fast | Slower | ✅ Astro |
| Learning Curve | Simple | Steeper | ✅ Astro |
| Server Functions | Limited | Full | Next.js |
| Already Set Up | Yes | No | ✅ Astro |

**Conclusion**: Astro is ideal for this content-focused, statically-generated blog.

---

## 🗂️ New Project Structure

```
bodhi-bloom/
├── .github/
│   └── workflows/
│       ├── daily-wisdom.yml          # Automated content generation
│       └── deploy.yml                # Cloudflare deployment
├── public/
│   ├── lotus/
│   │   ├── stage-01-seed.svg        # 15 lotus growth stages
│   │   ├── stage-02-sprout.svg
│   │   └── ...stage-15-bloom.svg
│   ├── buddha-quotes.json           # Quote database
│   └── favicon.svg
├── scripts/
│   ├── checkLunarDay.js             # Daily lunar calendar check
│   ├── generateWisdomPost.js        # Claude API content generation
│   ├── updateLotusQuote.js          # Update homepage quote
│   └── utils/
│       ├── lunar.js                 # Lunar calendar utilities
│       └── anthropic.js             # API helpers
├── src/
│   ├── components/
│   │   ├── LotusVisualizer.astro    # Animated lotus display
│   │   ├── LunarCalendar.astro      # Calendar widget
│   │   ├── BuddhaQuote.astro        # Quote component
│   │   ├── BlogCard.astro           # Blog post preview card
│   │   ├── LotusProgress.astro      # Cycle progress bar
│   │   └── BuddhistHolidays.astro   # Special dates highlighter
│   ├── content/
│   │   ├── config.ts                # Content collection schema
│   │   └── blog/
│   │       └── *.mdx                # Auto-generated blog posts
│   ├── layouts/
│   │   ├── BaseLayout.astro         # Main site layout
│   │   └── BlogPost.astro           # Blog post template
│   ├── pages/
│   │   ├── index.astro              # Homepage with lotus
│   │   ├── blog/
│   │   │   ├── index.astro          # Blog archive
│   │   │   ├── [slug].astro         # Individual posts
│   │   │   └── [tag].astro          # Posts by tag
│   │   ├── calendar.astro           # Lunar calendar explorer
│   │   ├── about.astro              # About the project
│   │   └── rss.xml.js               # RSS feed
│   ├── styles/
│   │   ├── global.css               # Global styles
│   │   └── buddhist-theme.css       # Buddhist color scheme
│   └── utils/
│       ├── lotusCalendar.ts         # Main calendar logic
│       ├── lotusPhases.ts           # Growth stage calculator
│       └── quotes.ts                # Quote management
├── PLAN.md                          # This file
├── TODO.md                          # Implementation checklist
├── README.md                        # Updated project readme
└── package.json
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

**Prompt Template**:
```
Generate a Buddhist wisdom blog post for Lunar Day {N}.

Topic: {randomly selected from topics database}
- Mindfulness in daily life
- Compassion and loving-kindness
- Understanding impermanence
- Right speech and communication
- Meditation practices
- Ethical living (Five Precepts)
- Overcoming suffering
- The Middle Way
- Non-attachment
- Present moment awareness

Format:
- Engaging title (50-70 characters)
- Word count: 600-900 words
- Include 1-2 relevant Buddha quotes
- Practical modern application
- 3 reflection questions at end
- Markdown formatting

Tone: Warm, accessible, non-dogmatic, practical
Audience: Modern seekers interested in Buddhist wisdom
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
