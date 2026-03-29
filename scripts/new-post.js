#!/usr/bin/env node
/**
 * GrowZen — new post helper
 * Usage: node scripts/new-post.js <type> <slug>
 * e.g.:  node scripts/new-post.js koan my-koan-slug
 *
 * Creates a new post in content/zh/<section>/<slug>.md using Hugo archetypes.
 */

const { execSync } = require('child_process');
const path = require('path');

const TYPE_MAP = {
  koan:        'koans',
  principle:   'principles',
  practice:    'practice',
  engineering: 'engineering',
  library:     'library',
};

const [,, type, slug] = process.argv;

if (!type || !slug) {
  console.error('Usage: node scripts/new-post.js <type> <slug>');
  console.error('Types:', Object.keys(TYPE_MAP).join(', '));
  process.exit(1);
}

const section = TYPE_MAP[type];
if (!section) {
  console.error(`Unknown type: ${type}. Valid types: ${Object.keys(TYPE_MAP).join(', ')}`);
  process.exit(1);
}

const contentPath = `${section}/${slug}.md`;
console.log(`Creating: content/zh/${contentPath}`);

try {
  execSync(`hugo new --contentDir content/zh ${contentPath}`, { stdio: 'inherit' });
  console.log(`\n✅ Created content/zh/${contentPath}`);
  console.log('Remember to also create English (content/en/) and Japanese (content/ja/) versions!');
} catch (e) {
  process.exit(1);
}
