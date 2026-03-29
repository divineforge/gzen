#!/usr/bin/env bash
# prune-branches.sh — delete remote branches that are obsolete (merged or abandoned, > 5 days old)
#
# Visual branding & colour improvement changes:
#   PR #24 — copilot/add-favicon-and-improve-branding
#   Merged into main on 2026-03-24
#   Changes: favicon 善, GZen branding, Noto Sans SC, pastel theme, robots.txt, about page, ecosystem links
#
# Usage:
#   bash scripts/prune-branches.sh
#   bash scripts/prune-branches.sh --dry-run

set -euo pipefail

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "🔍 DRY RUN — no branches will be deleted"
fi

REPO="divineforge-com/gzen"

# Branches obsolete as of 2026-03-24 (last commit > 5 days ago or already merged long ago)
OBSOLETE_BRANCHES=(
  # Merged PRs (already in main)
  "claude/add-blog-localization-eLZ0U"        # Merged PR #13 — 2026-01-29
  "claude/add-post-publish-6mInv"             # Stale — last commit 2026-01-26
  "claude/continue-todo-update-readme-e6L9n"  # Merged PR #9  — 2026-01-25
  "claude/fix-mobile-menu-translations-xDsn3" # Merged PR #12 — 2026-01-27
  "claude/plan-buddhist-blog-kvnuO"           # Merged PR #8  — 2026-01-24
  "claude/sidebar-language-menu-6mInv"        # Abandoned — no PR, last commit ~2026-01-26
  "codex/update-repo-for-english-focus-and-font-awesome" # Merged PR #15 — 2026-03-15
  "copilot/add-buddha-teachings-directory"    # Merged PR #1  — 2025-10-28
  "copilot/configure-copilot-instructions"    # Closed PR #3 (unmerged) — 2025-10-30
  "copilot/improve-visual-for-mobile"         # Merged PR #22 — 2026-03-16 (8 days ago)
  "copilot/transform-gzen-into-philosophy-platform" # Merged PR #17 — 2026-03-16 (8 days ago)
)

# Branches to keep (active or recent)
# main                                        — protected default branch
# copilot/prune-obsolete-branches             — this working branch (PR #26)
# copilot/add-favicon-and-improve-branding    — visual branding PR, merged today 2026-03-24
# dependabot/npm_and_yarn/npm_and_yarn-35bee7da44 — open PR #25, created 2026-03-24

echo ""
echo "======================================================"
echo "  🌿 gzen branch pruning — obsolete branches report"
echo "======================================================"
echo ""
echo "📌 Visual branding & colour changes:"
echo "   Branch : copilot/add-favicon-and-improve-branding"
echo "   PR     : #24 — GZen branding refresh (favicon 善, Noto Sans SC, pastel theme)"
echo "   Status : ✅ MERGED into main on 2026-03-24"
echo ""
echo "🗑  Branches to delete (${#OBSOLETE_BRANCHES[@]} total):"
echo ""

DELETE_CMD="git push origin --delete"
if command -v gh &>/dev/null && gh auth status &>/dev/null 2>&1; then
  DELETE_CMD="gh api --method DELETE repos/${REPO}/git/refs/heads"
fi

FAILED=0
DELETED=0

for branch in "${OBSOLETE_BRANCHES[@]}"; do
  comment="${branch#*#}"
  branch_name="${branch%% #*}"
  # strip inline comment (bash arrays above use spaces, so just use the raw value)
  branch_name="$(echo "$branch" | awk '{print $1}')"

  if $DRY_RUN; then
    echo "  [dry-run] would delete: $branch_name"
  else
    echo -n "  Deleting $branch_name ... "
    if git push origin --delete "$branch_name" 2>/dev/null; then
      echo "✅ done"
      ((DELETED++)) || true
    else
      echo "❌ failed (already deleted or permission denied)"
      ((FAILED++)) || true
    fi
  fi
done

echo ""
if $DRY_RUN; then
  echo "Dry run complete. Run without --dry-run to actually delete."
else
  echo "Done. Deleted: $DELETED  Failed: $FAILED"
fi
echo ""
echo "💡 To also prune your local remote-tracking refs, run:"
echo "   git remote prune origin"
