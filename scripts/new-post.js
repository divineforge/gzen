#!/usr/bin/env node
/**
 * gzen content generator
 * Usage: node scripts/new-post.js <category> <slug>
 * Example: node scripts/new-post.js koan the-silent-room
 */

const fs = require('fs');
const path = require('path');

const CATEGORIES = ['koan', 'principle', 'practice', 'engineering', 'library'];

// Map singular category name to directory name
const CATEGORY_DIR = {
  koan: 'koans',
  principle: 'principles',
  practice: 'practice',
  engineering: 'engineering',
  library: 'library',
};

const TEMPLATES = {
  koan: (title, date) => `---
title: "${title}"
date: "${date}"
tags: ["clarity"]
principle_reference: "clarity-before-tools"
summary: ""
---

## Observation

_A real-life situation, problem, or reflection._

## Principle

_The distilled insight extracted from the observation._

## Application

_How the idea can guide behavior, thinking, or decision-making._
`,
  principle: (title, date) => `---
title: "${title}"
date: "${date}"
tags: ["clarity"]
principle_reference: ""
summary: ""
---

## Observation

_A real-life situation, problem, or reflection._

## Principle

_The distilled insight extracted from the observation._

## Application

_How the idea can guide behavior, thinking, or decision-making._
`,
  practice: (title, date) => `---
title: "${title}"
date: "${date}"
tags: ["mindfulness", "discipline"]
principle_reference: "discipline-before-motivation"
summary: ""
---

## Observation

_A real-life situation, problem, or reflection._

## Principle

_The distilled insight extracted from the observation._

## Application

_How the idea can guide behavior, thinking, or decision-making._
`,
  engineering: (title, date) => `---
title: "${title}"
date: "${date}"
tags: ["clarity", "technology"]
principle_reference: "clarity-before-tools"
summary: ""
---

## Observation

_A real-life situation, problem, or reflection._

## Principle

_The distilled insight extracted from the observation._

## Application

_How the idea can guide behavior, thinking, or decision-making._
`,
  library: (title, date) => `---
title: "${title}"
date: "${date}"
tags: ["clarity"]
principle_reference: ""
summary: ""
---

## Observation

_A real-life situation, problem, or reflection._

## Principle

_The distilled insight extracted from the observation._

## Application

_How the idea can guide behavior, thinking, or decision-making._

## Selected References

_Quotes and references._
`,
};

function toTitleCase(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function run() {
  const [,, category, slug] = process.argv;

  if (!category || !slug) {
    console.error(`Usage: node scripts/new-post.js <category> <slug>`);
    console.error(`Categories: ${CATEGORIES.join(', ')}`);
    process.exit(1);
  }

  if (!CATEGORIES.includes(category)) {
    console.error(`Unknown category: ${category}`);
    console.error(`Valid categories: ${CATEGORIES.join(', ')}`);
    process.exit(1);
  }

  const dirName = CATEGORY_DIR[category];
  const title = toTitleCase(slug);
  const date = new Date().toISOString().split('T')[0];
  const template = TEMPLATES[category](title, date);

  const dir = path.join(process.cwd(), 'content', dirName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    console.error(`File already exists: ${filePath}`);
    process.exit(1);
  }

  fs.writeFileSync(filePath, template, 'utf8');
  console.log(`Created: ${filePath}`);
}

run();
