Create new GrowZen content. Ask the user for:
1. Section: principles / koans / practice / engineering / library
2. Slug (URL-friendly, e.g. "the-still-pond")
3. Title in English

Then:
1. Write the Chinese (zh) version first — this is the canonical language
   - File: content/zh/<section>/<slug>.md
   - Structure: frontmatter (title, date, summary, tags, categories) + ## 观察 + ## 原则 + ## 实践
   - Ground the piece in a specific Buddhist teaching (see CLAUDE.md for the teaching map)

2. Write the English (en) version
   - File: content/en/<section>/<slug>.md
   - Structure: frontmatter + ## Observation + ## Principle + ## Application
   - Universal examples — not tech/corporate only. Works for a farmer, a parent, a student.
   - Short sentences (max 25 words each)

3. Write the Japanese (ja) version
   - File: content/ja/<section>/<slug>.md
   - Structure: frontmatter + ## 観察 + ## 原則 + ## 実践

After creating all three files, run the wisdom-check agent to validate Buddhist grounding.
