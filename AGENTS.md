# AGENTS.md — gzen · 聚善 Agent Reference

> 聚善：禅生定，定生慧

This is the primary reference document for all agents (GitHub Copilot, Claude, Codex, and others) working on this repository. Read this before making any changes.

---

## What Is gzen

gzen.io is a Buddhist-inspired philosophy platform combining:

- A **dynamic lunar calendar hero** on the homepage — the background theme changes every day of the Chinese lunar month; users can browse the 30-day cycle with ← → arrows
- A **markdown content platform** organized around a small set of core principles, reinforcing the site's core mission: **聚善：禅生定，定生慧**

**Language priority: Chinese first, Japanese second, English third.**  
All UI labels and descriptions display Chinese (中文) as the primary language.

**This is a standalone philosophy project.** Do not add references to other domains or external projects.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 — warm Buddhist amber/saffron palette |
| Fonts | Geist Sans + Geist Mono + CJK fallbacks (PingFang SC, Microsoft YaHei) |
| Markdown | gray-matter (frontmatter) + remark + remark-html |
| Lunar calendar | lunar-javascript (Malaysia UTC+8 timezone) |
| Deployment | Vercel (auto-deploy on push to `main`) |

**Important:** The site uses the App Router. All page components live in `app/`. Only `LunarHero` uses `'use client'`. All other components are server components.

---

## Repository Layout (Quick Reference)

```
app/
  layout.tsx                   # Root layout, header, footer
  page.tsx                     # Homepage — server component, mounts LunarHero
  globals.css                  # Tailwind layers + component utilities
  posts/page.tsx               # /posts — all writing
  posts/[category]/[slug]/page.tsx   # /posts/:cat/:slug — post detail
  principles/page.tsx          # /principles — principle index
  principles/[slug]/page.tsx   # /principles/:slug — principle detail
  tags/[tag]/page.tsx          # /tags/:tag — tag listing

components/
  LunarHero.tsx                # Dynamic lunar backdrop (use client)

lib/
  content.ts                   # Markdown pipeline
  utils/lunar-calendar.ts      # getLunarDate, getLotusEmoji, etc.

content/                       # All markdown posts (add writing here)
  koans/
  principles/
  practice/
  engineering/
  library/

scripts/
  new-post.js                  # npm run new-koan <slug>

types/
  lunar-javascript.d.ts        # Type declarations

HANDOFF.md                     # Full status and architecture document
AGENTS.md                      # This file
```

---

## Adding Content

The fastest way to add a new piece of writing:

```bash
npm run new-koan       my-slug     # Short philosophical reflection
npm run new-principle  my-slug     # Core principle
npm run new-practice   my-slug     # Practice or technique
npm run new-engineering my-slug    # Engineering/systems reflection
npm run new-library    my-slug     # Reference or quote collection
```

This generates `content/<category>/my-slug.md` with the correct frontmatter template.

Then fill in:

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
tags: ["clarity", "discipline"]   # use existing tags where possible
principle_reference: "clarity-before-tools"   # slug of a principle post
summary: "One clear sentence."
---

## Observation
...

## Principle
...

## Application
...
```

### Current principle slugs
- `clarity-before-tools`
- `virtue-before-power`
- `simplicity-before-scale`
- `discipline-before-motivation`

### Existing tags
`clarity` · `discipline` · `virtue` · `simplicity` · `technology` · `mindfulness`

---

## Modifying the Lunar Hero

The hero component is at `components/LunarHero.tsx`.

It receives `allStages` (all 30 stages pre-computed on the server) and `currentLunarDay` as props from `app/page.tsx`.

**To change a day's gradient theme:**

```typescript
// LUNAR_THEMES in LunarHero.tsx
const LUNAR_THEMES: Record<number, { bg: string; textClass: string }> = {
  15: { bg: 'linear-gradient(135deg, #8c6210 0%, #d4a020 60%, #9a6c10 100%)', textClass: 'text-amber-900' },
  // ...
};
```

The `bg` is an inline-style CSS gradient (not a Tailwind class) to avoid build-time purging.
The `textClass` is a Tailwind text color class for labels/descriptions.

**The scroll-fade overlay** is a fixed CSS gradient at the bottom of the section:
```css
background: linear-gradient(to bottom, transparent 0%, #fffbeb 100%)
```
`#fffbeb` = `amber-50` / `zen-wisdom` (the Buddhist warm cream page background). If you change the page background color, update this value too.

---

## Modifying the Content Pipeline

`lib/content.ts` handles all markdown operations. Key functions:

| Function | What it does |
|---|---|
| `getAllPosts()` | All posts, sorted by date desc |
| `getPostBySlug(category, slug)` | Single post |
| `getAllPrinciples()` | All posts in `principles/` |
| `getPostsByPrincipleReference(ref)` | All posts citing a principle slug |
| `getPostsByTag(tag)` | All posts with a given tag |
| `getRelatedPosts(post, limit)` | Scores relatedness by shared principle (+3) and tags (+1 each) |
| `renderMarkdown(content)` | remark → sanitized HTML |

---

## Adding a New Page

1. Create a file in `app/` following the Next.js App Router convention
2. Use `export default async function MyPage()` for server components
3. Add `export const metadata: Metadata = { title: '...' }` for SEO
4. For dynamic routes, implement `generateStaticParams()`
5. In Next.js 15+, route params must be `Promise<T>` and awaited

---

## Running Locally

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # Production build
npm run type-check  # TypeScript check
```

---

## Design Constraints

1. **Buddhist warm palette** — amber-50 background (`#fffbeb`), saffron (`#d97706`) accents, warm brown headings (`#78350f`); not cold stone/gray
2. **Chinese first** — all UI text shows Chinese as the primary label; English is secondary (smaller, lower opacity)
3. **CJK readability** — maintain `line-height: 1.75+` in body; CJK font fallbacks (PingFang SC, Microsoft YaHei) in the font stack
4. **Geist font** — do not add Google Fonts or other web fonts
5. **No heavy UI frameworks** — no shadcn/ui, no MUI, no framer-motion
6. **No cross-domain references** — standalone project only
7. **No placeholder text** — all content must be real

---

## Common Tasks

### Change the page background color
1. Update `background-color: #fffbeb` in `app/globals.css` body rule
2. Update `#fffbeb` in the scroll-fade overlay in `components/LunarHero.tsx`

### Add a new category
1. Create `content/<category>/` directory
2. Add the category to `CATEGORIES` array in `lib/content.ts`
3. Add Chinese label to `CATEGORY_LABELS` in `app/posts/page.tsx` and `app/page.tsx`
4. Add a template to `scripts/new-post.js`
5. Add a new npm script in `package.json`

### Add a new principle
1. Run `npm run new-principle principle-name`
2. Fill in the markdown file
3. The principle will auto-appear in `/principles` and be linkable via `principle_reference`

---

## Files Not to Modify Without Reading HANDOFF.md

- `lib/utils/lunar-calendar.ts` — lunar calculations; Malaysia UTC+8 is intentional
- `components/LunarHero.tsx` — the 30-theme gradient system is delicate
- `lib/content.ts` — the getRelatedPosts scoring algorithm drives the repetition engine

---

## Security Notes

- `remark-html` is used with default sanitization (no `{ sanitize: false }`)
- All content is static markdown; no user input is processed
- No API routes or server actions currently

---

*Last updated: 2026-03-15. See HANDOFF.md for full status.*
