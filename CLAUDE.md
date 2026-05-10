# CLAUDE.md — GrowZen · 善聚慧生

> 禅生定，定生慧 — From stillness comes clarity; from clarity comes wisdom.

This file governs Claude's behavior on this repository. Read it fully before any action.

---

## Project Identity

**GrowZen** is a multilingual Buddhist wisdom platform. The mission: *collect goodness from around the world and multiply it through Buddha's teachings* — accessible to every person, regardless of background, age, or culture.

- **Chinese (zh)** is the canonical language. All new content originates here.
- **English (en)** and **Japanese (ja)** are translations.
- **Audience**: All walks of life — a farmer, a student, a retiree, a parent, a child.

---

## Tech Stack (Current — Hugo + Blowfish)

| Layer | Detail |
|---|---|
| Generator | **Hugo** static site (NOT Next.js — the old stack was migrated) |
| Theme | **Blowfish v2** (git submodule at `themes/blowfish`) |
| Styling | Blowfish's built-in Tailwind CSS — customized via `assets/css/schemes/gzen.css` and `assets/css/custom.css` |
| JS | Vanilla only — no React, no framework |
| Deployment | **Cloudflare Pages** (enable "Initialize submodules" in Pages settings) |
| Build cmd | `hugo --minify` |
| Output | `public/` |

**CSS customization layers:**
1. `assets/css/schemes/gzen.css` — color palette (saffron/cream/earth) in Blowfish RGB format
2. `assets/css/custom.css` — typography, lunar hero, component overrides
3. Blowfish's own Tailwind handles everything else

**Do NOT run `npm run build:css`** — Blowfish handles CSS internally via Hugo Pipes.

---

## Content Philosophy

Every piece of writing must:

1. **Trace to the Dharma** — rooted in Buddhism: the Four Noble Truths, Eightfold Path, impermanence (無常), compassion (慈悲), non-self (無我), or mindfulness (正念).
2. **Be universally accessible** — no jargon. Avoid tech/corporate examples exclusively. Use universal life situations: family, grief, loss, work, seasons, breath, hunger, kindness.
3. **Serve all walks of life** — a piece should ring true for a grandmother in a village and a city professional alike.
4. **Speak simply** — short sentences. Concrete images. No academic language.
5. **Be complete in three parts**: Observation (what happens in life), Principle (the teaching), Application (how to live it today).

### Buddhist Teaching Map

Use these teachings as anchors when writing or reviewing content:

| Teaching | Pali/Chinese | Core idea |
|---|---|---|
| Four Noble Truths | 四圣谛 | Suffering exists; it has a cause; it can end; there is a path |
| Eightfold Path | 八正道 | Right view, intention, speech, action, livelihood, effort, mindfulness, concentration |
| Impermanence | 無常 (anicca) | All things arise and pass; clinging causes suffering |
| Non-self | 無我 (anatta) | The fixed "I" is a construction; flexibility brings peace |
| Compassion | 慈悲 (karuṇā) | Wishing freedom from suffering for all beings |
| Loving-kindness | 慈 (mettā) | Wishing happiness for all beings |
| Mindfulness | 正念 | Clear, non-reactive awareness of the present moment |
| The Second Arrow | 第二箭 | The wound is the first arrow; our story about it is the second |
| Beginner's Mind | 初心 (shoshin) | Approach each moment without assumptions |
| Middle Way | 中道 | Neither extreme indulgence nor extreme deprivation |

---

## Available Custom Subagents

Use the Agent tool to invoke these specialized review agents for content quality:

| Agent file | When to use |
|---|---|
| `.claude/agents/visual-check.md` | After changes to templates, CSS, or Tailwind classes |
| `.claude/agents/writing-check.md` | After adding or editing markdown content |
| `.claude/agents/wisdom-check.md` | After any content addition to validate Buddhist grounding |
| `.claude/agents/accessibility-check.md` | After layout changes or new content sections |
| `.claude/agents/content-synergy.md` | Before publishing — holistic review of visual + content + wisdom alignment |

**Recommended flow for new content:**
1. Write content (zh first, then en + ja)
2. Run `wisdom-check` → ensure Buddhist grounding
3. Run `writing-check` → clarity and universal accessibility
4. Run `accessibility-check` → readability for all audiences
5. Run `content-synergy` → final holistic check
6. Build and deploy

---

## Hugo-Specific Rules

- Content goes in `content/<lang>/<section>/<slug>.md`
- Templates go in `layouts/` — never add JavaScript frameworks
- i18n strings in `i18n/<lang>.toml` — add new strings for all 3 languages simultaneously
- CSS is handled by Blowfish's Hugo pipeline. Edit `assets/css/schemes/gzen.css` and `assets/css/custom.css`.
- Do not add a separate CSS build step unless the theme architecture changes.

### Hugo template notes
- Use `{{ i18n "key" }}` for all UI strings
- Language URLs: `{{ "section/slug" | relLangURL }}`
- `{{ .RelPermalink }}` for page links
- Default language (zh) has no subdir prefix; en → `/en/`, ja → `/ja/`

---

## Cloudflare Pages Deployment

The site deploys from the `main` branch automatically via Cloudflare Pages.

- Build command: `hugo --minify`
- Output directory: `public/`
- Hugo version: set `HUGO_VERSION=0.161.1` in Cloudflare Pages build environment variables
- `static/_headers` → sets HTTP security headers
- `static/_redirects` → handles URL redirects

**Do not:**
- Commit `public/` (gitignored)
- Commit `static/css/main.css` (gitignored — built during CI)
- Use Vercel-specific config (old deployment provider — now Cloudflare)

---

## Design System

### Colors (Buddhist warm palette)
```
Background:  #fff8f5  (warm cream)
Text:        #4a2c1a  (warm dark brown)
Accent:      #e8956d  (saffron)
Muted:       #8c6040  (earth)
Border:      #f0d9c8  (soft peach)
Secondary:   #9a5c2a  (warm sienna)
```

### Typography
- Primary: Noto Sans SC (CJK), Noto Serif SC for long-form articles
- Line height: 1.75 minimum for body text
- Never use cold/system sans for CJK content

### Layout
- Max content width: `max-w-3xl` (48rem)
- Spacing: generous — `py-8`, `mb-14`, `gap-4` — never cramped

---

## What NOT to Do

- Do not add React, Vue, Next.js, or any JS framework
- Do not use TypeScript (this is Hugo + vanilla JS)
- Do not reference the old Next.js file structure (`app/`, `components/`, `lib/`)
- Do not add content with only tech/corporate examples — make it universal
- Do not write content that isn't grounded in the Dharma
- Do not add new npm dependencies without strong justification
- Do not push to `main` directly — use feature branches
- Do not commit generated files (`public/`, `static/css/`)

---

## Git Workflow

```bash
# Branch: claude/fix-cloudflare-deployment-EfnkV (current session)
git checkout -b claude/your-feature-name  # new branches
git push -u origin <branch>
# Never force-push to main
```

---

*Last updated: 2026-04-05*
