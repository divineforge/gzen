Run all code quality and formatting checks on the GrowZen repository.

1. **Markdown lint** — check all content files:
   `npx markdownlint-cli2 "content/**/*.md" --config .markdownlint.json`
   Report files with issues. Fix auto-fixable issues (heading levels, list style, trailing spaces).

2. **Hugo template check** — validate templates render:
   `hugo --minify 2>&1 | grep -i "error\|warn"` 
   Report any template errors.

3. **TOML syntax** — check config files:
   Check hugo.toml and all config/_default/*.toml for syntax errors.
   Run `hugo config` to validate the full config loads cleanly.

4. **Front matter audit** — find content missing required fields:
   Every content file should have: title, date, summary, tags, categories
   Report files missing any of these.

5. **Broken i18n keys** — find keys used in templates but missing from i18n files:
   Check i18n/en.toml, i18n/zh.toml, i18n/ja.toml for missing keys.

6. **Summary**: Report total files checked, issues found, and whether the repo is hygiene-clean.
