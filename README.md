# GrowZen · 善聚慧生

> 禅生定，定生慧 — Where Goodness Gathers, Wisdom Grows

GrowZen is a Buddhist-inspired philosophy platform built with **Hugo** as a pure static site generator. The site follows the Chinese lunar calendar and visualizes the lotus growth cycle across a full 30-day lunar month. Collecting goodness from around the globe and multiplying it with Buddha's teachings.

**Live site:** [gzen.io](https://gzen.io)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Hugo (pure static site generator) |
| Styling | Tailwind CSS 3 with Buddhist warm palette |
| i18n | Hugo built-in multilingual (zh primary, en, ja) |
| Lunar calendar | Vanilla JS (embedded algorithm) |
| Hosting | Vercel (static hosting) |

---

## Development

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (latest)
- Node.js 20+ (for Tailwind CSS)

### Setup

```bash
# Install Tailwind CSS dependencies
npm install

# Build CSS (one-time or after changes)
npm run build:css

# Start Hugo dev server (watches for content/template changes)
hugo server

# Or watch CSS changes simultaneously in another terminal:
npm run watch:css
```

Visit [http://localhost:1313](http://localhost:1313)

### Production Build

```bash
npm run build:css
hugo --minify
```

Output goes to `public/`.

---

## Content Structure

```
content/
  zh/           # Chinese (PRIMARY — default at root URL /)
    koans/      # 公案 — short philosophical reflections
    principles/ # 禅理 — core principles
    practice/   # 修行 — practices and techniques
    engineering/# 工程 — engineering philosophy
    library/    # 典藏 — reference and quote collections
    about.md    # About page
  en/           # English (at /en/)
  ja/           # Japanese (at /ja/)
```

### Adding Content

Use Hugo archetypes:

```bash
# New koan (Chinese)
hugo new koans/my-koan.md

# New principle (Chinese)
hugo new principles/my-principle.md
```

Or use the npm scripts:

```bash
npm run new-koan my-koan
npm run new-principle my-principle
npm run new-practice my-practice
npm run new-engineering my-engineering
npm run new-library my-library
```

### Frontmatter

```yaml
---
title: "文章标题"
date: 2026-03-01
summary: "一句话概述。"
tags: ["清明", "简朴"]
categories: ["公案"]
---
```

---

## Languages

| Language | URL | Default |
|----------|-----|---------|
| 中文 | `gzen.io/` | ✅ Yes |
| English | `gzen.io/en/` | No |
| 日本語 | `gzen.io/ja/` | No |

---

## Design

- **Background**: `#fff8f5` (warm peach cream)
- **Accent**: `#e8956d` (saffron)
- **Text**: `#4a2c1a` (warm dark brown)
- **Font**: Noto Sans SC (CJK), system-ui fallback

---

## Brand

- **Chinese**: 善聚慧生 — "Goodness gathers, wisdom arises"
- **English**: Where Goodness Gathers, Wisdom Grows
- **Japanese**: 善集慧生

---

## Planning Documents

- [`PLAN.md`](./PLAN.md) — Full architecture vision and roadmap
- [`TODO.md`](./TODO.md) — Implementation checklist
- [`HANDOFF.md`](./HANDOFF.md) — Architecture status
- [`NAMING_I18N.md`](./NAMING_I18N.md) — Branding and i18n guide
