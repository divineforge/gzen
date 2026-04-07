Run a full quality review of recently modified GrowZen content.

1. Find all content files modified in the last git commit or currently staged:
   `git diff --name-only HEAD` and `git status --short`

2. For each modified content file in content/(zh|en|ja)/:
   - Launch wisdom-check agent to validate Buddhist grounding
   - Launch writing-check agent for clarity and universal accessibility

3. If any layout or CSS files were modified:
   - Launch visual-check agent for Buddhist aesthetic alignment
   - Launch accessibility-check agent for readability

4. After all individual checks, launch content-synergy agent for the final holistic review

5. Summarize all findings in a table:
   | File | Wisdom | Writing | Visual | Accessibility | Publish Ready? |

Only report issues that need action. Skip files that pass all checks cleanly.
