# AGENTS.md — GrowZen · 善聚慧生 Agent Reference

> 聚善：禅生定，定生慧  
> Goodness gathers; from stillness comes wisdom.

This is the primary reference for all AI agents (Claude, Copilot, Codex, and others) working on this repository. **Read this before making any changes.**

---

## What Is GrowZen

GrowZen (gzen.io) is a Buddhist-inspired philosophy platform for all walks of life. Its mission: **collect goodness from the world and multiply it through Buddha's teachings**.

Core design principles:
- **Language priority**: Chinese (中文) primary → Japanese (日本語) secondary → English tertiary
- **Audience**: Anyone seeking wisdom — not just technologists; content must be universally accessible
- **Buddhist grounding**: All writing traces back to the Dharma (Four Noble Truths, Eightfold Path, compassion, mindfulness)
- **Standalone project**: No cross-domain references in content

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Hugo** (static site generator) |
| Styling | **Tailwind CSS 3** — warm Buddhist saffron/amber palette |
| Fonts | Noto Sans SC / Noto Serif SC (CJK-first) + system-ui |
| Markup | Goldmark markdown (Hugo built-in) |
| Lunar calendar | Vanilla JS — `static/js/lunar.js` (custom implementation) |
| Deployment | **Cloudflare Pages** — auto-deploy on push to `main` |
| Build | `npm run build` → CSS + Hugo → `public/` |

> **Note**: This project was previously Next.js. It is now fully Hugo. Do NOT reference TypeScript, App Router, `use client`, or Next.js patterns anywhere.

---

## Repository Layout

```
content/              # Markdown source (zh/ primary, en/ + ja/ secondary)
  zh/                 # Chinese content (canonical)
  en/                 # English translations
  ja/                 # Japanese translations

layouts/              # Hugo HTML templates
  index.html          # Homepage
  _default/
    baseof.html       # Root HTML shell
    single.html       # Single post
    list.html         # Section list
  partials/
    head.html         # Meta, fonts, CSS link
    header.html       # Navigation
    footer.html       # Footer + ecosystem links
    lunar-hero.html   # Dynamic 30-day lunar backdrop
    language-toggle.html

assets/css/main.css   # Tailwind CSS entry point (compiled → static/css/)
static/
  css/main.css        # Generated (do not edit manually)
  js/lunar.js         # Lunar calendar + lotus lifecycle (vanilla JS)
  js/language-toggle.js
  _headers            # Cloudflare Pages HTTP headers
  _redirects          # Cloudflare Pages URL redirects

i18n/                 # UI translation strings
  zh.toml en.toml ja.toml

hugo.toml             # Hugo configuration (languages, params, base URL)
wrangler.toml         # Cloudflare Pages deployment config
package.json          # Tailwind CLI + build scripts
tailwind.config.js    # Custom color palette (saffron, lotus, zen)

CLAUDE.md             # Claude-specific AI instructions
AGENTS.md             # This file — all-agent reference
.claude/
  settings.json       # Claude Code hooks
  agents/             # Custom subagent definitions
    visual-check.md
    writing-check.md
    wisdom-check.md
    accessibility-check.md
    content-synergy.md
```

---

## Content Structure

All content lives in `content/<lang>/<section>/<slug>.md`.

**Sections:**
- `koans/` — Short philosophical reflections (公案)
- `principles/` — Core guiding principles (原则)
- `practice/` — Practical daily guidance (修行)
- `engineering/` — Systems thinking through a philosophical lens
- `library/` — Reference texts and quotations

**Frontmatter:**
```yaml
---
title: "Title here"
date: 2026-03-01
summary: "One clear sentence accessible to anyone."
tags: ["clarity", "compassion", "mindfulness"]
categories: ["principles"]  # or koans, practice, engineering, library
draft: false
---
```

**Content rules:**
1. Every zh/ file must have a matching en/ and ja/ translation
2. Language priority: write Chinese first, translate
3. No content should be tech-only — use universal life examples
4. Ground every piece in a Buddhist teaching (cite implicitly or explicitly)
5. Summary must be readable by anyone, regardless of background

---

## Creating New Content

```bash
npm run new-koan       my-slug   # Short philosophical reflection
npm run new-principle  my-slug   # Core principle
npm run new-practice   my-slug   # Practice or technique
npm run new-engineering my-slug  # Systems/life reflection
npm run new-library    my-slug   # Reference or quote collection
```

Then create matching `content/en/<section>/my-slug.md` and `content/ja/<section>/my-slug.md`.

### Current principle slugs
- `clarity-before-tools`
- `virtue-before-power`
- `simplicity-before-scale`
- `discipline-before-motivation`

### Existing tags
`clarity` · `discipline` · `virtue` · `simplicity` · `compassion` · `mindfulness` · `impermanence` · `technology`

---

## Build & Deployment

```bash
# Local development
npm install
npm run dev            # Starts Tailwind watcher + Hugo server at localhost:1313

# Production build (Cloudflare Pages runs this automatically)
npm run build          # = npm run build:css && hugo --minify → public/

# Cloudflare Pages settings (set in wrangler.toml)
# Build command: npm ci && npm run build:css && hugo --minify
# Output dir: public/
# HUGO_VERSION: 0.128.0
```

---

## Modifying the Lunar Hero

The hero is rendered by `layouts/partials/lunar-hero.html` + `static/js/lunar.js`.

- **Themes**: 30 gradient backgrounds (one per lunar day) defined in `static/js/lunar.js` as `DAY_GRADIENTS`
- **Lotus stages**: 30-stage lifecycle emoji + 3-language descriptions in `LOTUS_STAGES`
- **Particle system**: Canvas-based, 28 floating particles, defined in `static/js/lunar.js`
- Day 1 = new moon / seed; Day 15 = full moon / full bloom; Day 30 = completion

Do not change the lunar calculation functions (`solar2Lunar`, data tables) — they are precise.

---

## Design Constraints

1. **Buddhist warm palette** — background `#fff8f5` (cream), saffron `#e8956d`, warm brown `#4a2c1a`; never cold gray/blue
2. **Chinese first** — UI labels show Chinese as primary; English secondary at lower opacity
3. **CJK readability** — `line-height: 1.75+` for body; Noto Sans SC as primary font
4. **No heavy frameworks** — no React, no shadcn/ui, no framer-motion; vanilla JS only
5. **No placeholder text** — every word must be real, reviewed, grounded in Dharma
6. **Universal accessibility** — content must be readable by a 16-year-old and a 70-year-old alike
7. **No cross-domain content references** — standalone project only

---

## Files Not to Modify Without Reading CLAUDE.md

- `static/js/lunar.js` — lunar calculations are precise; the 30-theme system is carefully tuned
- `layouts/partials/lunar-hero.html` — tightly coupled to lunar.js
- `hugo.toml` — language routing, base URL; changes affect multilingual structure

---

## Security Notes

- Hugo generates fully static HTML — no server-side code, no API routes
- All content is markdown; no user input is processed
- `_headers` sets security headers via Cloudflare Pages
- No secrets or API keys in this repo

---

*Last updated: 2026-04-05. See CLAUDE.md for Claude-specific guidance.*
