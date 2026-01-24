# 🪷 Buddhist Blog Implementation Checklist

This document tracks the implementation of the Buddhist wisdom blog transformation. Check off items as they are completed.

---

## 📋 Phase 1: Foundation (Week 1)

### Project Setup
- [ ] **Finalize project name**
  - [ ] Vote on: Bodhi Bloom, Lotus Dharma, Padma Path, Lunar Lotus
  - [ ] Check domain availability
  - [ ] Purchase domain (if needed)
  - [ ] Update branding across all files

### Dependencies
- [ ] Install Astro MDX integration
  ```bash
  npm install @astrojs/mdx
  ```
- [ ] Install lunar calendar library
  ```bash
  npm install lunar-javascript
  ```
- [ ] Install date utilities
  ```bash
  npm install date-fns
  ```
- [ ] Install Anthropic SDK (dev dependency)
  ```bash
  npm install --save-dev @anthropic-ai/sdk
  ```
- [ ] Update `astro.config.mjs` to include MDX

### Content Collections
- [ ] Create `src/content/` directory
- [ ] Create `src/content/config.ts` with blog schema
- [ ] Create `src/content/blog/` directory for posts
- [ ] Test content collection with sample post

### Lotus Assets
- [ ] Source or create 15 lotus growth stage SVGs/images
  - [ ] Stage 01: Seed (🌑)
  - [ ] Stage 02: Sprout (🌱)
  - [ ] Stage 03: Young stem (🌿)
  - [ ] Stage 04: Leaves form (🪴)
  - [ ] Stage 05: Growth continues (🍃)
  - [ ] Stage 06: Stem strengthens (🌿)
  - [ ] Stage 07: Bud forms (🪷)
  - [ ] Stage 08: Bud develops (🌸)
  - [ ] Stage 09: Petals visible (🌺)
  - [ ] Stage 10: Opening begins (🪷)
  - [ ] Stage 11: Petals unfold (🌸)
  - [ ] Stage 12: Nearly open (🌺)
  - [ ] Stage 13: Almost full (🪷)
  - [ ] Stage 14: Final opening (🌸)
  - [ ] Stage 15: Full bloom (🪷✨)
- [ ] Save images to `public/lotus/` directory
- [ ] Optimize images (compress, resize)

### Utilities
- [ ] Create `src/utils/lotusCalendar.ts`
  - [ ] `getLunarDay()` function
  - [ ] `getLunarMonth()` function
  - [ ] `getLunarYear()` function
  - [ ] `isEvenDay()` function
  - [ ] `isPeakDay()` function (day 1 or 15)
- [ ] Create `src/utils/lotusPhases.ts`
  - [ ] `getLotusStage(lunarDay)` function
  - [ ] `getStageImage(stage)` function
  - [ ] `getStageDescription(stage)` function
- [ ] Create `src/utils/quotes.ts`
  - [ ] Quote data structure
  - [ ] `getRandomQuote()` function
  - [ ] `getQuoteByTopic(topic)` function

### Design System
- [ ] Update `tailwind.config.mjs` with Buddhist color palette
  - [ ] Lotus colors (pink, cream, gold)
  - [ ] Saffron colors (light, default, dark)
  - [ ] Zen colors (stone, bamboo, water)
  - [ ] Wisdom colors (bg, text, accent)
- [ ] Create `src/styles/buddhist-theme.css`
- [ ] Import Google Fonts (Noto Serif, Noto Sans)
- [ ] Test color scheme on sample pages

---

## 📋 Phase 2: Core Features (Week 2-3)

### Homepage (`src/pages/index.astro`)
- [ ] **Hero Section**
  - [ ] Create `src/components/LotusVisualizer.astro`
  - [ ] Implement lotus stage display based on lunar day
  - [ ] Add smooth transition animations
  - [ ] Display current lunar day information
  - [ ] Add progress bar (day X of 15)
- [ ] **Buddha Quote Section**
  - [ ] Create `src/components/BuddhaQuote.astro`
  - [ ] Display current quote (changes on day 1 & 15)
  - [ ] Add elegant typography styling
  - [ ] Create quote database (`public/buddha-quotes.json`)
- [ ] **Latest Posts Preview**
  - [ ] Create `src/components/BlogCard.astro`
  - [ ] Display 3 most recent posts
  - [ ] Add "View All Posts" CTA
- [ ] **About Section** (brief)
  - [ ] Explain lotus growth cycle concept
  - [ ] Link to full About page

### Blog System
- [ ] **Blog Layout** (`src/layouts/BlogPost.astro`)
  - [ ] Post header (title, date, lunar day)
  - [ ] Reading time estimate
  - [ ] Tag display
  - [ ] Buddha quote callout (if included)
  - [ ] Reflection questions section
  - [ ] Share buttons
  - [ ] Previous/Next post navigation
- [ ] **Blog Archive** (`src/pages/blog/index.astro`)
  - [ ] List all posts in reverse chronological order
  - [ ] Group by lunar cycle (month)
  - [ ] Filter by tag (dropdown or pills)
  - [ ] Search functionality (optional)
  - [ ] Pagination (20 posts per page)
- [ ] **Individual Post** (`src/pages/blog/[slug].astro`)
  - [ ] Use BlogPost layout
  - [ ] Render MDX content
  - [ ] Display metadata
  - [ ] Related posts section (by tags)
- [ ] **Tag Pages** (`src/pages/blog/tag/[tag].astro`)
  - [ ] List posts by specific tag
  - [ ] Tag description
  - [ ] Count of posts

### Lunar Calendar Page (`src/pages/calendar.astro`)
- [ ] **Visual Calendar Component**
  - [ ] Create `src/components/LunarCalendar.astro`
  - [ ] Display current month's lunar days
  - [ ] Highlight current day
  - [ ] Mark blog post days (even days)
  - [ ] Mark peak days (1 & 15)
- [ ] **Cycle Progress**
  - [ ] Create `src/components/LotusProgress.astro`
  - [ ] Visual timeline of 15-day growth
  - [ ] Current position indicator
  - [ ] Days until next peak
- [ ] **Buddhist Holidays**
  - [ ] Create `src/components/BuddhistHolidays.astro`
  - [ ] List upcoming observance days
  - [ ] Brief descriptions
  - [ ] Link to relevant teachings
- [ ] **Explanation Section**
  - [ ] What is the lunar calendar?
  - [ ] Why the lotus symbolism?
  - [ ] How the blog works

### About Page (`src/pages/about.astro`)
- [ ] Project mission and vision
- [ ] Lotus growth cycle explanation
- [ ] Buddhist teachings approach
- [ ] Automation transparency (how content is generated)
- [ ] Contact information
- [ ] Credits and resources

### Base Layout Updates
- [ ] Update `src/layouts/BaseLayout.astro`
  - [ ] New navigation (Home, Blog, Calendar, About)
  - [ ] Update header with new branding
  - [ ] Add subtle Buddhist iconography
  - [ ] Footer with copyright & links
  - [ ] Lotus favicon

---

## 📋 Phase 3: Automation (Week 4)

### Scripts Setup
- [ ] **Create `scripts/` directory**
- [ ] **Lunar Day Checker** (`scripts/checkLunarDay.js`)
  - [ ] Import lunar-javascript
  - [ ] Calculate current lunar day
  - [ ] Export environment variables for GitHub Actions
  - [ ] Determine if blog post should be generated
  - [ ] Determine if quote should be updated
- [ ] **Content Generator** (`scripts/generateWisdomPost.js`)
  - [ ] Import Anthropic SDK
  - [ ] Load topic database
  - [ ] Create prompt template
  - [ ] Call Claude API
  - [ ] Parse response
  - [ ] Generate frontmatter
  - [ ] Save as MDX file in `src/content/blog/`
  - [ ] Add error handling and logging
- [ ] **Quote Updater** (`scripts/updateLotusQuote.js`)
  - [ ] Load quotes database
  - [ ] Select appropriate quote for cycle
  - [ ] Update homepage component/data
  - [ ] Log update

### Content Databases
- [ ] **Topics Database** (`scripts/data/topics.json`)
  - [ ] Mindfulness in daily life
  - [ ] Compassion and loving-kindness (Metta)
  - [ ] Understanding impermanence (Anicca)
  - [ ] Right speech and communication
  - [ ] Meditation practices (Vipassana, Samatha)
  - [ ] Ethical living (Five Precepts)
  - [ ] Overcoming suffering (Dukkha)
  - [ ] The Middle Way
  - [ ] Non-attachment
  - [ ] Present moment awareness
  - [ ] The Four Noble Truths
  - [ ] The Eightfold Path
  - [ ] Karma and rebirth
  - [ ] Buddhist psychology
  - [ ] Cultivating gratitude
  - [ ] Working with difficult emotions
  - [ ] Mindful eating
  - [ ] Walking meditation
  - [ ] Buddhist environmentalism
  - [ ] Engaged Buddhism (social action)
  - [ ] (Add 10+ more topics)
- [ ] **Buddha Quotes Database** (`public/buddha-quotes.json`)
  - [ ] Collect 100+ authentic Buddha quotes
  - [ ] Categorize by topic
  - [ ] Include source (Dhammapada, Suttas, etc.)
  - [ ] Verify authenticity (avoid misattributed quotes)

### GitHub Actions Workflow
- [ ] **Create `.github/workflows/daily-wisdom.yml`**
  - [ ] Set up cron schedule (daily at 00:00 UTC)
  - [ ] Add manual workflow dispatch trigger
  - [ ] Checkout repository step
  - [ ] Setup Node.js step
  - [ ] Install dependencies step
  - [ ] Run lunar day checker script
  - [ ] Conditional: Generate blog post (if even day)
  - [ ] Conditional: Update quote (if day 1 or 15)
  - [ ] Git configuration step
  - [ ] Commit changes step
  - [ ] Push to repository step
  - [ ] Error notification (on failure)
- [ ] **Test workflow manually**
  - [ ] Trigger via workflow_dispatch
  - [ ] Verify post generation
  - [ ] Check commit and push
  - [ ] Confirm Cloudflare deployment

### Secrets Configuration
- [ ] **GitHub Repository Secrets**
  - [ ] Add `ANTHROPIC_API_KEY`
  - [ ] Verify existing `CLOUDFLARE_API_TOKEN`
  - [ ] Verify existing `CLOUDFLARE_ACCOUNT_ID`
  - [ ] Verify existing `CLOUDFLARE_PROJECT_NAME`
- [ ] **Test secrets in workflow**
  - [ ] Confirm API calls work
  - [ ] Check deployment succeeds

### Quality Assurance
- [ ] **Content Review Process**
  - [ ] Create validation script for generated content
  - [ ] Check for markdown formatting errors
  - [ ] Verify frontmatter completeness
  - [ ] Ensure quote attribution present
  - [ ] Flag posts for manual review (optional)
- [ ] **Fallback Mechanisms**
  - [ ] Pre-written backup posts (if API fails)
  - [ ] Retry logic for API calls
  - [ ] Notification system for errors

---

## 📋 Phase 4: Polish & Launch (Week 5)

### Design Refinement
- [ ] **Visual Polish**
  - [ ] Refine lotus animations (smooth, subtle)
  - [ ] Optimize typography (line height, spacing)
  - [ ] Add micro-interactions (hover states, focus)
  - [ ] Ensure consistent spacing/padding
- [ ] **Dark Mode** (optional)
  - [ ] Create dark theme variant
  - [ ] Add theme toggle
  - [ ] Test readability
- [ ] **Accessibility**
  - [ ] Add ARIA labels
  - [ ] Test keyboard navigation
  - [ ] Verify color contrast ratios (WCAG AA)
  - [ ] Add alt text to all images
  - [ ] Test with screen reader

### Mobile Optimization
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Verify touch targets (min 44x44px)
- [ ] Check responsive breakpoints
- [ ] Optimize images for mobile
- [ ] Test performance (Lighthouse score)

### SEO & Performance
- [ ] **SEO**
  - [ ] Add meta descriptions to all pages
  - [ ] Create Open Graph images
  - [ ] Generate `sitemap.xml`
  - [ ] Create `robots.txt`
  - [ ] Implement structured data (Schema.org)
  - [ ] Verify canonical URLs
- [ ] **RSS Feed** (`src/pages/rss.xml.js`)
  - [ ] Generate RSS feed for blog posts
  - [ ] Include full content
  - [ ] Test in feed readers
- [ ] **Performance**
  - [ ] Optimize image sizes (WebP format)
  - [ ] Minify CSS/JS
  - [ ] Test Core Web Vitals
  - [ ] Achieve Lighthouse score >90

### Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS)
- [ ] Safari (iOS)
- [ ] Samsung Internet

### Testing & QA
- [ ] **Functional Testing**
  - [ ] Test all navigation links
  - [ ] Verify blog post rendering
  - [ ] Check lunar calendar accuracy
  - [ ] Test tag filtering
  - [ ] Verify RSS feed
- [ ] **Cycle Simulation**
  - [ ] Manually advance lunar day (test script)
  - [ ] Verify lotus changes correctly
  - [ ] Check quote updates on day 1 & 15
  - [ ] Confirm blog posts on even days
  - [ ] Test full 15-day cycle
- [ ] **Automation Testing**
  - [ ] Run workflow manually 5+ times
  - [ ] Verify consistent post quality
  - [ ] Check for errors in logs
  - [ ] Confirm deployment succeeds

### Documentation
- [ ] Update README.md
- [ ] Document automation process
- [ ] Create CONTRIBUTING.md (if accepting submissions)
- [ ] Add LICENSE file
- [ ] Document local development setup

### Launch Preparation
- [ ] **Domain & Branding**
  - [ ] Update site URL in `astro.config.mjs`
  - [ ] Configure custom domain on Cloudflare
  - [ ] Update all references to domain
  - [ ] Update favicon and social cards
- [ ] **Content Seeding**
  - [ ] Write 3-5 initial blog posts manually
  - [ ] Populate quotes database
  - [ ] Set initial lotus stage
- [ ] **Announcement**
  - [ ] Write launch blog post
  - [ ] Prepare social media posts
  - [ ] Create launch graphics
  - [ ] Notify interested parties

### Launch Checklist
- [ ] Final production build test
- [ ] Verify all environment variables
- [ ] Backup current deployment
- [ ] Deploy to production
- [ ] Monitor for errors (first 24 hours)
- [ ] Verify automation runs next day
- [ ] Celebrate launch! 🎉

---

## 🔮 Phase 5+: Future Enhancements (Optional)

### Community Features
- [ ] Newsletter integration (Mailchimp, ConvertKit)
  - [ ] Signup form on homepage
  - [ ] Send digest on full moon days (15th)
  - [ ] Include weekly summary
- [ ] Comments system (Giscus, Utterances)
  - [ ] Enable on blog posts
  - [ ] Moderate discussions
- [ ] Submission system
  - [ ] Allow user-submitted reflections
  - [ ] Review and publish process

### Interactive Features
- [ ] Meditation timer
  - [ ] Customizable durations
  - [ ] Bell sounds
  - [ ] Progress tracking
- [ ] Daily mindfulness reminders
  - [ ] Push notifications (PWA)
  - [ ] Email reminders
- [ ] Reading progress tracker
  - [ ] Save user's reading history
  - [ ] Bookmark posts

### Content Expansion
- [ ] Multi-language support
  - [ ] Chinese translations
  - [ ] Sanskrit terms glossary
  - [ ] Language switcher
- [ ] Audio versions of posts
  - [ ] Text-to-speech integration
  - [ ] Podcast feed
  - [ ] Guided meditations

### Technical Enhancements
- [ ] PWA (Progressive Web App)
  - [ ] Service worker
  - [ ] Offline reading
  - [ ] Install prompt
- [ ] Analytics
  - [ ] Privacy-friendly analytics (Plausible, Fathom)
  - [ ] Track popular posts
  - [ ] Monitor engagement
- [ ] CMS Integration
  - [ ] Decap CMS (formerly Netlify CMS)
  - [ ] Visual editing interface
  - [ ] Manual post creation option

### Social Impact
- [ ] Donation integration
  - [ ] Support Buddhist charities
  - [ ] Dana (generosity) page
  - [ ] Transparent reporting
- [ ] Resource library
  - [ ] Recommended books
  - [ ] Buddhist centers directory
  - [ ] Teacher listings
  - [ ] Retreat calendar

---

## 📊 Progress Tracking

**Overall Progress**: 0% (0/200+ tasks completed)

### Phase Completion
- [ ] Phase 1: Foundation (0/25 tasks)
- [ ] Phase 2: Core Features (0/50 tasks)
- [ ] Phase 3: Automation (0/35 tasks)
- [ ] Phase 4: Polish & Launch (0/60 tasks)
- [ ] Phase 5+: Future (0/30+ tasks)

---

## 🙏 Notes

- **Daily Standup**: Review progress, update checkboxes
- **Blocked Items**: Mark with ⚠️ and note blocker
- **In Progress**: Mark with 🔄 when actively working
- **Completed**: Mark with ✅ when done
- **Skipped**: Mark with ⏭️ if not needed

**Last Updated**: 2026-01-24
**Next Review**: Daily during active development
