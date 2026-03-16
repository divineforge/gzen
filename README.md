# 🪷 gzen · 聚善

> **禅生定，定生慧** — *Zen gives rise to stillness; stillness gives rise to wisdom.*

**Live Site:** [gzen.io](https://gzen.io)

---

## 聚善 — 核心使命

**聚善（Jù Shàn）**意为积累善念与善行。  
本站以中文为主，辅以日文与英文，围绕少数核心禅理展开，  
通过反复叙述与引用强化每一个思想的重量：  
*意义在重复中诞生。*

> 禅生定，定生慧 — 修禅培定力，定力开慧根。  
> 以公案启悟，以禅理立道，以修行践行，以文章传承。

---

## ✨ Features

- 🌕 **Dynamic Lunar Hero** — Homepage backdrop changes theme for every Chinese lunar day; browse all 30 phases with ← → arrows (to/fro preview)
- 🪷 **30-Day Lotus Cycle** — Each lunar day shows unique emoji and Chinese/English description
- 📖 **Content Platform** — Five categories of philosophical writing, all interconnected via principle references
- 🔁 **Repetition Engine** — Related posts surfaced by shared `principle_reference` (+3 pts) and tags (+1 pt each)
- 🖊️ **Writing CLI** — Scaffold new posts in any category with one command

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS 3 — warm Buddhist amber/saffron palette |
| Fonts | Geist Sans (CJK fallback: PingFang SC, Microsoft YaHei) |
| Markdown | gray-matter + remark + remark-html |
| Lunar Calendar | lunar-javascript (Malaysia UTC+8) |
| Deployment | Vercel (auto-deploy on push to `main`) |

---

## 📁 Project Structure

```
gzen/
├── app/
│   ├── layout.tsx              # Root layout — header (文章/禅理), footer (聚善：禅生定，定生慧)
│   ├── page.tsx                # Homepage — LunarHero + 禅理 + 近期文章 + 主题
│   ├── globals.css             # Buddhist warm theme (amber/saffron palette)
│   ├── posts/
│   │   ├── page.tsx            # 文章 — all writing grouped by category
│   │   └── [category]/[slug]/
│   │       └── page.tsx        # Post detail + 相关文章 (related posts engine)
│   ├── principles/
│   │   ├── page.tsx            # 禅理 — principle index with cross-references
│   │   └── [slug]/
│   │       └── page.tsx        # Principle detail + 引用此禅理的文章
│   └── tags/[tag]/
│       └── page.tsx            # 主题 — tag-filtered post listing
│
├── components/
│   └── LunarHero.tsx           # 'use client' — dynamic lunar backdrop, 30 gradients
│
├── lib/
│   ├── content.ts              # Markdown pipeline (getAllPosts, getRelatedPosts, etc.)
│   └── utils/
│       └── lunar-calendar.ts   # getLunarDate, getLotusEmoji, getLotusStageDescription
│
├── content/                    # All markdown posts
│   ├── koans/                  # 公案 — Zen koans
│   ├── principles/             # 禅理 — Core principles
│   ├── practice/               # 修行 — Practice notes
│   ├── engineering/            # 工程 — Engineering reflections
│   └── library/                # 典藏 — Curated references
│
├── scripts/
│   └── new-post.js             # CLI scaffold for new posts
│
├── AGENTS.md                   # Agent reference (read first)
├── HANDOFF.md                  # Full architecture & status
└── README.md                   # This file
```

---

## 🌙 Lunar Calendar

The homepage hero section dynamically changes its gradient background based on the current Chinese lunar day (Malaysia UTC+8 timezone):

- **Days 1–14**: Waxing moon — dark indigo → teal → warm amber (seed to near-full)
- **Day 15**: Full Moon 🌕 — golden saffron peak (满月·莲开见佛)
- **Days 16–30**: Waning moon — warm amber → dark indigo (completion to renewal)

Users can browse all 30 phases with ← → navigation (preview mode).

```typescript
import { getLunarDate, getLotusEmoji, getLotusStageDescription } from '@/lib/utils/lunar-calendar';

const lunarDate = getLunarDate();  // { day, month, year, monthName, yearName, daysInMonth }
const emoji = getLotusEmoji(lunarDate.day);          // e.g. '🪷✨' on day 15
const zhDesc = getLotusStageDescription(15, 'zh');   // '满月·莲开见佛'
const enDesc = getLotusStageDescription(15, 'en');   // 'Full Moon · Lotus Enlightenment'
```

---

## 📝 Content Architecture

### Frontmatter schema

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
tags: ["clarity", "discipline"]
principle_reference: "clarity-before-tools"
summary: "One clear sentence."
---
```

### Post structure (Observation → Principle → Application)

```markdown
## Observation
A real situation or reflection.

## Principle
The distilled insight.

## Application
How to use the idea in practice.
```

### Categories

| 中文 | Category | Purpose |
|---|---|---|
| 公案 | koans | Short philosophical reflections |
| 禅理 | principles | Core principles referenced sitewide |
| 修行 | practice | Meditation and discipline techniques |
| 工程 | engineering | Philosophy applied to systems |
| 典藏 | library | Curated quotes and references |

### Principle slugs
- `clarity-before-tools`
- `virtue-before-power`
- `simplicity-before-scale`
- `discipline-before-motivation`

---

## 🖊️ Writing CLI

```bash
npm run new-koan       <slug>   # content/koans/<slug>.md
npm run new-principle  <slug>   # content/principles/<slug>.md
npm run new-practice   <slug>   # content/practice/<slug>.md
npm run new-engineering <slug>  # content/engineering/<slug>.md
npm run new-library    <slug>   # content/library/<slug>.md
```

---

## 🎨 Design

### Buddhist colour palette

| Token | Hex | Use |
|---|---|---|
| `saffron` | `#d97706` | Accent colour (section labels, hover) |
| Warm cream | `#fffbeb` | Page background (amber-50) |
| Warm brown | `#78350f` | Headings |
| Warm text | `#2c2416` | Body text |
| Amber border | `#e7e5e4` | Card borders |

### Language priority
1. **中文** — primary UI and descriptions (largest, most prominent)
2. **日本語** — secondary (future expansion)
3. **English** — tertiary (small subtitle/labels)

---

## 🚀 Getting Started

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # Production build
npm run type-check  # TypeScript check
```

---

## 🚢 Deployment

Push to `main` triggers automatic deployment on Vercel. No environment variables required.

---

## 📚 Agent Reference

See **[AGENTS.md](AGENTS.md)** for the quick-reference guide for all agents.  
See **[HANDOFF.md](HANDOFF.md)** for full architecture and project status.

---

> 🪷 *聚善：禅生定，定生慧*  
> *Accumulate goodness. Zen gives rise to stillness; stillness gives rise to wisdom.*

