# GrowZen · 善聚慧生 — Handoff & Long-Term Evolution Guide

> 禅生定，定生慧  
> From stillness comes clarity. From clarity comes wisdom.

This document is written for a human being, not a machine.

It records where GrowZen has come from, where it stands today, and where it is meant to go. If you are the next person to tend this project — whether you are a developer, a writer, a translator, or a caretaker — read this fully before you change anything.

---

## What GrowZen Is

GrowZen is a multilingual Buddhist wisdom platform. Its mission is simple:

> **Collect goodness from around the world, and multiply it through the Buddha's teachings.**

It is not a blog. It is not a news site. It is not a business. It is a quiet place on the internet where a person — any person, of any background, education, or culture — can encounter a teaching that helps them suffer a little less, act a little more kindly, and see their life a little more clearly.

The audience is everyone. A retired farmer. A grieving parent. A teenager struggling with purpose. A city professional who feels empty. A grandmother who has never used the internet before.

Content must speak to all of them equally.

---

## The Three Languages

| Language | Code | Role | URL |
|---|---|---|---|
| Chinese (中文) | `zh` | **Canonical** — all content originates here | `gzen.io/` |
| English | `en` | Full translation | `gzen.io/en/` |
| Japanese (日本語) | `ja` | Full translation | `gzen.io/ja/` |

Chinese is the root. Every new piece of writing begins in Chinese. English and Japanese follow.

Translations must carry the *spirit* of the original — not just the words. An idiom that sings in Chinese must be adapted into something that moves an English reader who has never heard of it. Japanese translations should preserve Buddhist terminology where possible (慈悲, 無常, 正念 are understood in Japan as they are in China).

---

## The Content Structure

Every piece of writing — regardless of section — follows the same three-part shape:

1. **Observation** — Something that happens in everyday life. Real. Concrete. Anyone's life.
2. **Principle** — The teaching. One clear insight. Rooted in the Dharma.
3. **Application** — What to do today. Small. Specific. No special training required.

This shape is not style. It is function. It ensures that every piece:
- Begins where the reader already is (Observation)
- Offers something they can trust (Principle — grounded in 2,600 years of teaching)
- Leaves them with something they can actually do (Application)

### The Five Sections

| Chinese | English | Purpose |
|---|---|---|
| 公案 (gōng'àn) | Koans | Short reflections on everyday moments. Light. Unexpected. |
| 原则 (yuánzé) | Principles | Core ideas. Short and direct. These repeat across the site. |
| 修行 (xiūxíng) | Practice | Guided practices for daily life. Meditation, reflection, habit. |
| 工程 (gōngchéng) | Engineering | Wisdom applied to how things are built and fixed. Universal craft, not just software. |
| 典藏 (diǎncáng) | Library | Curated quotes, references, and inspirations from across traditions. |

---

## The Technology Stack

The platform is built to be simple, fast, and durable. There is a reason for every choice.

| Layer | Tool | Why |
|---|---|---|
| Site generator | **Hugo** | Extremely fast. No JavaScript runtime. Pages are just files. Works for 100 years. |
| Theme base | **Blowfish** (Hugo theme) | Rich, multilingual-ready foundation. Shortcodes, taxonomy, search. We override it with our Buddhist aesthetic. |
| Styling | **Tailwind CSS 3** | Write styles close to the markup. No unused CSS in production. |
| Deployment | **Cloudflare Pages** | Fast globally. Free at GrowZen's scale. Zero infrastructure to manage. |
| Content | **Markdown files** | Human-readable. No database. Version-controlled. Editable by anyone. |
| Languages | **Hugo i18n** | Three languages, one codebase. Chinese is the default. |

### The Build Pipeline

When changes are pushed to `main`, Cloudflare Pages automatically runs:

```
npm ci
→ installs Tailwind and other Node tools

hugo mod download
→ fetches the Blowfish theme (stored as a Hugo module, not a file)

npm run build:css
→ compiles assets/css/main.css → static/css/main.css (Tailwind)

hugo --minify
→ builds all HTML, copies static files, writes public/
```

The result is a folder of plain HTML files in `public/` that Cloudflare serves globally.

---

## The Design System

GrowZen has a specific visual personality. It should feel like a warm, quiet place.

**Colors:**
- Background: `#fff8f5` — warm cream, like old paper
- Text: `#4a2c1a` — warm dark brown, like earth
- Accent: `#e8956d` — saffron, the color of the monk's robe
- Muted: `#8c6040` — earth brown, for secondary information
- Border: `#f0d9c8` — soft peach, barely there

**Rules:**
- Never use cold blue, gray, or white. Every color is warm.
- Never use a font that makes Chinese text look mechanical. Use Noto Sans SC / Noto Serif SC.
- Line height must be 1.75 or more for body text. Chinese at tight line height is hard to read.
- No animation that demands attention. If anything moves, it should be slow and gentle.

---

## How Claude Code Helps

This repository is set up to work with Claude Code, an AI assistant that understands the project's values. When you work in this codebase, Claude Code has access to:

**Five review agents** (in `.claude/agents/`):

| Agent | When to use it |
|---|---|
| `wisdom-check` | After writing content — validates Buddhist grounding |
| `writing-check` | After writing content — checks clarity and universal accessibility |
| `accessibility-check` | After layout changes — checks readability for all people |
| `visual-check` | After CSS or template changes — checks the Buddhist aesthetic |
| `content-synergy` | Before publishing — the final holistic review |

**Six slash commands** (type `/command` to run):

| Command | What it does |
|---|---|
| `/build` | Builds the site and reports errors |
| `/new-content` | Guides you through creating a new piece of writing (all 3 languages) |
| `/review` | Runs all quality checks on recently changed files |
| `/translate` | Translates Chinese content to English and Japanese |
| `/lint` | Checks all content for formatting issues |
| `/dev` | Starts the local development server |

---

## Long-Term Evolution: The Roadmap

This is not a list of tasks. It is a vision. The stages are ordered by what matters most.

---

### Stage 1 — Foundation (where we are now)

**The site exists. It works. Content is in all three languages.**

What defines this stage:
- Five content sections with real Buddhist writing
- Blowfish theme layered with GrowZen's custom Buddhist aesthetic
- Cloudflare Pages deployment from `main` branch
- Full Chinese / English / Japanese multilingual support
- Claude Code review agents watching over content quality

**What to tend during this stage:**
- Write one new piece of content every two weeks (lunar calendar rhythm is natural)
- Fix any accessibility issues that prevent someone from reading on mobile
- Keep the design warm and unchanged — resist the urge to add complexity

---

### Stage 2 — The Lunar Rhythm

**The site should breathe with the lunar calendar.**

GrowZen was born from the idea that wisdom flows with the moon. The lunar cycle has 30 days. There are 30 unique stages of the lotus flower. This is not decorative — it is the calendar of the tradition.

What to build:
- Restore the **lunar hero** — a homepage section that reflects today's lunar day with a unique visual and a short reflection
- Create a **30-day practice calendar** — one short practice per lunar day, matching the lotus stage
- Add a **lunar date indicator** in the site header — subtle, just the current day of the lunar month

The lunar utilities are already partially written in `static/js/`. This stage is about surfacing them visibly.

---

### Stage 3 — Search and Discovery

**A reader should be able to find the teaching they need.**

GrowZen will eventually have 100+ pieces of writing. Without search, a person who arrives grieving cannot find the teaching on the Second Arrow. A person struggling with anger cannot find Right Intention.

What to build:
- Enable Blowfish's built-in search (set `enableSearch = true` in `config/_default/params.toml`)
- Hugo's JSON output for search already exists — just needs enabling
- Add a simple **tag cloud** on the homepage or a "browse by teaching" page
- Create a **teaching index** page: each major Buddhist teaching with all content that references it

This stage does not require a database. Hugo's taxonomy system handles all of this.

---

### Stage 4 — Deeper Translations

**Every word should ring true in every language.**

Right now, translations are functional. They are accurate. But the best translations feel like the content was written in that language.

What to do:
- Have native Japanese speakers review all `content/ja/` files
- Have Chinese speakers confirm that translations from Chinese to English haven't lost the heart of the teaching
- Add cultural context notes where a Chinese story needs adaptation for Japanese or English readers
- Consider a `/about` page in all three languages that explains the mission in each language's natural voice

---

### Stage 5 — Community and Contribution

**The platform should invite others to participate in the collection of goodness.**

GrowZen's mission is to *collect goodness from around the world*. Eventually, that collection should come from more than one person.

What to consider:
- A **contribution guide** — how to submit a new piece of writing (GitHub PR or simple form)
- A **translation volunteer program** — invite bilingual practitioners to help translate
- A **review process** — all contributed content goes through the five quality agents before publishing
- Possibly: a simple **reader submission form** for short koans ("I noticed this today...")

This stage requires thinking carefully about governance. Who decides what belongs on GrowZen? The answer should be: the Dharma decides. Does this piece reduce suffering? Is it grounded in a real teaching? Is it accessible to everyone?

---

### Stage 6 — Offline and Slow-Connection Access

**The teachings must be available to those with poor internet.**

A grandmother in a rural village, a practitioner in a remote monastery, a person whose phone is old and data is expensive. These are the people who often need wisdom most.

What to build:
- **Progressive Web App (PWA)** support — allow the site to work offline after one visit
- **Printable versions** — a clean print stylesheet so any piece can be printed and shared
- **Minimal-bandwidth mode** — text-only version for slow connections (Hugo can generate this alongside the full site)
- Consider **SMS or WhatsApp delivery** of a daily koan or practice reminder (future, requires backend)

---

### Stage 7 — The Ecosystem

**GrowZen is the root. Other sites grow from the same wisdom.**

The `hugo.toml` references three ecosystem properties:
- `learn.gzen.io` — a learning platform
- `invest.gzen.io` — wisdom for stewardship
- `architect.gzen.io` — wisdom for building

These are not built yet. When they are built, they should:
- Share the same design language (warm palette, Noto fonts, Buddhist aesthetic)
- Cross-reference GrowZen content using Blowfish's built-in external links
- Each carry a distinct emphasis while drawing from the same Dharma

---

## What to Never Change

Some things must be permanent:

1. **Chinese is canonical.** All content originates in Chinese. Translations follow.
2. **Content must be grounded in the Dharma.** No content without a real Buddhist teaching.
3. **Universal accessibility.** Every piece must work for a 60-year-old farmer.
4. **Warm palette.** No cold gray, no stark white, no corporate blue.
5. **No JavaScript frameworks.** Hugo renders HTML. Vanilla JS only for behavior.
6. **No database.** Content lives in markdown files in this repository.
7. **Never push to `main` directly.** Use feature branches. The site deploys automatically from `main`.

---

## If Things Break

### The site won't build

1. Run `hugo config` — check for config errors
2. Run `hugo mod download` — check for missing theme modules
3. Run `npm run build:css` separately — check for Tailwind errors
4. Check the Cloudflare Pages build log for specific error messages

### Content looks wrong

1. Check the markdown frontmatter — `title`, `date`, `summary`, `tags`, `categories` are required
2. Check i18n keys in `i18n/` — missing keys cause template errors in Hugo
3. Run `/lint` in Claude Code to audit all content files

### The Blowfish theme looks different than expected

GrowZen's `layouts/` directory overrides Blowfish at every level. If a layout doesn't look right:
1. The file in `layouts/` is the one being used (not Blowfish's version)
2. If you need to see what Blowfish's default layout looks like: `hugo mod vendor` then browse `_vendor/github.com/nunocoracao/blowfish/`

---

## For the Next Caretaker

If you have inherited this project, welcome.

GrowZen is built to last. The technology choices are deliberately boring. Hugo builds files. Files go on a server. The server serves them. Nothing can go wrong that cannot be fixed by someone patient and curious.

The content matters more than the technology. Write slowly. Write honestly. Write for the grandmother and the grieving parent and the lost teenager. Run the quality checks before publishing. Let the Dharma guide the editing.

The mission is simple: collect goodness, multiply it, share it freely.

That is enough.

---

*Last updated: 2026-04-06*  
*Branch: `claude/fix-cloudflare-deployment-EfnkV`*
