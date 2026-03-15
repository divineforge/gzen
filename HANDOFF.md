# gzen — Project Handoff

This document records what has been built, how it works, and what remains.
Every agent working on this project should read it before making changes.

---

## Current State

**gzen.io** is a philosophy platform combining two things:

1. **A lunar-calendar dynamic backdrop** — the homepage hero changes theme for every day of the Chinese lunar month, with a to/fro carousel so readers can browse the 30-day cycle.
2. **A markdown philosophy content platform** — short writings in five categories, linked through a principle-reference system that reinforces the core narrative: *meaning is made with repetitive narration*.

The site is deployed on Vercel and auto-deploys from `main`.

---

## Architecture

### Framework
- **Next.js 16** — App Router (not Pages Router)
- **TypeScript** throughout
- **Tailwind CSS 3** — minimal stone/neutral palette
- **Geist fonts** — sans + mono
- Server components by default; only `LunarHero` uses `'use client'`

### Content
- Markdown files in `content/` with frontmatter
- Processed at build time via `lib/content.ts` (gray-matter + remark)
- No database; content lives in the repository

### Lunar system
- `lunar-javascript` package for Chinese lunar calendar calculations
- `lib/utils/lunar-calendar.ts` — all lunar utilities (getLunarDate, getLotusEmoji, getLotusStageDescription, etc.)
- Timezone: Malaysia UTC+8 (consistent for Asian audience)

---

## Directory Layout

```
gzen/
├── app/
│   ├── layout.tsx              # Root layout — header, footer, Geist fonts
│   ├── page.tsx                # Homepage — passes lunar data to LunarHero
│   ├── globals.css             # Tailwind base + component utilities
│   ├── posts/
│   │   ├── page.tsx            # All writing, grouped by category
│   │   └── [category]/[slug]/
│   │       └── page.tsx        # Post detail with related-post engine
│   ├── principles/
│   │   ├── page.tsx            # Principle index with cross-references
│   │   └── [slug]/
│   │       └── page.tsx        # Principle detail + referencing posts
│   └── tags/[tag]/
│       └── page.tsx            # Tag-filtered post listing
│
├── components/
│   └── LunarHero.tsx           # 'use client' — dynamic lunar backdrop
│
├── lib/
│   ├── content.ts              # Markdown pipeline: getAllPosts, getRelatedPosts, etc.
│   └── utils/
│       └── lunar-calendar.ts   # getLunarDate, getLotusEmoji, getLotusStageDescription
│
├── content/                    # All markdown posts (source of truth)
│   ├── koans/
│   ├── principles/
│   ├── practice/
│   ├── engineering/
│   └── library/
│
├── scripts/
│   └── new-post.js             # CLI: node scripts/new-post.js <category> <slug>
│
├── types/
│   └── lunar-javascript.d.ts   # Type declarations for lunar-javascript
│
├── public/
│   └── favicon.svg
│
├── AGENTS.md                   # Agent reference (read this first)
├── HANDOFF.md                  # This file
└── PLAN.md                     # Original project vision
```

---

## Key Components

### `LunarHero` (`components/LunarHero.tsx`)

The homepage hero section. Client component with:
- **30 unique gradient backgrounds** — one per lunar day, progressing dark→warm→dark across the cycle
- **Scroll-fade** — CSS gradient overlay at the bottom fades the backdrop into `stone-50`
- **To/fro carousel** — ← → arrows and dot indicators navigate any of the 30 days (preview mode)
- **Preview mode** — when not on "today", shows "Preview — day N" badge and "today" return button
- **Data** — passed as props from server-side `app/page.tsx`; no client-side fetching

### `lib/content.ts`

All content utilities:
- `getAllPosts()` — all posts sorted by date descending
- `getPostsByCategory(cat)` — posts in one category
- `getPostBySlug(cat, slug)` — single post
- `getAllPrinciples()` — principles category only
- `getPostsByPrincipleReference(ref)` — all posts citing a principle
- `getPostsByTag(tag)` — tag-filtered posts
- `getAllTags()` — deduplicated sorted tag list
- `getRelatedPosts(post, limit)` — scores by shared principle_reference (+3) and tags (+1 each)
- `renderMarkdown(content)` — remark → HTML (sanitized)

### `lib/utils/lunar-calendar.ts`

Lunar calendar utilities. All calculations use Malaysia timezone (UTC+8):
- `getLunarDate()` — `{ day, month, year, monthName, yearName, daysInMonth }`
- `getLotusEmoji(stage)` — 30 unique emojis for the full lunar cycle
- `getLotusStageDescription(stage, locale)` — en/zh/ja descriptions

---

## Content Architecture

### Frontmatter schema

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
principle_reference: "principle-slug"
summary: "One-sentence summary."
---
```

### Post structure
Every post follows this three-section pattern:
1. **Observation** — a real situation, problem, or reflection
2. **Principle** — the distilled insight
3. **Application** — how to use the idea

### Categories

| Category | Purpose |
|---|---|
| `koans` | Short philosophical reflections from real-life observations |
| `principles` | Core ideas that recur across the whole site |
| `practice` | Meditation, reflection, personal discipline |
| `engineering` | Philosophy applied to systems and technology |
| `library` | Curated references, quotes, inspirations |

### Principle references

The `principle_reference` field links any post to a principle slug.
This powers:
- The **Principle Index** page (each principle shows all posts that cite it)
- The **Repetition Engine** (related posts surfaced on every post detail page)
- The **Principle detail** page (full list of referencing writing)

Current principles (slugs):
- `clarity-before-tools`
- `virtue-before-power`
- `simplicity-before-scale`
- `discipline-before-motivation`

---

## CLI — Writing Friction Reduction

```bash
npm run new-koan       <slug>   # creates content/koans/<slug>.md
npm run new-principle  <slug>   # creates content/principles/<slug>.md
npm run new-practice   <slug>   # creates content/practice/<slug>.md
npm run new-engineering <slug>  # creates content/engineering/<slug>.md
npm run new-library    <slug>   # creates content/library/<slug>.md
```

Each generates a dated markdown template with the correct frontmatter structure.

---

## What Has Been Done

- [x] Removed next-intl i18n, lunar calendar page, lotus preview carousel (old Buddhist site)
- [x] Created flat English-only routing (`/`, `/posts`, `/posts/[category]/[slug]`, `/principles`, `/principles/[slug]`, `/tags/[tag]`)
- [x] Created `content/` directory with 9 sample posts across all 5 categories
- [x] Built `lib/content.ts` markdown pipeline
- [x] Built repetition engine (related posts by principle_reference + tags)
- [x] Created CLI scaffold scripts
- [x] **Restored** `lib/utils/lunar-calendar.ts` with full 30-day Chinese lunar utilities
- [x] **Built** `LunarHero` — dynamic per-day gradient backdrop with to/fro preview carousel and scroll-fade
- [x] Created `HANDOFF.md` (this file)
- [x] Created `AGENTS.md`

## What Remains (Possible Next Steps)

- [ ] Lunar calendar `/calendar` page (restored full lunar cycle view)
- [ ] RSS feed for the writing
- [ ] Open Graph images per post
- [ ] Search across all writing
- [ ] Knowledge graph visualization (optional — see original PLAN.md)
- [ ] More content — target ~20-30 posts to demonstrate the repetition engine fully

---

## Deployment

- **Platform**: Vercel
- **Trigger**: push to `main` branch
- **Build command**: `npm run build`
- **No environment variables required** (all content is file-based)

---

## Important Constraints

1. **No cross-domain references** — the site must appear as a standalone philosophy project
2. **No placeholder content** — every piece of writing should be real and complete
3. **Minimal design** — stone/neutral palette, Geist font, no heavy UI frameworks
4. **Self-contained** — the repository is the publishing backend; no external CMS
