import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export type ContentCategory = 'koans' | 'principles' | 'practice' | 'engineering' | 'library';

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  principle_reference: string;
  summary: string;
}

export interface Post {
  slug: string;
  category: ContentCategory;
  frontmatter: PostFrontmatter;
  content: string;
}

export interface PostWithHtml extends Post {
  html: string;
}

const CATEGORIES: ContentCategory[] = ['koans', 'principles', 'practice', 'engineering', 'library'];

function getPostsFromCategory(category: ContentCategory): Post[] {
  const categoryDir = path.join(contentDirectory, category);
  if (!fs.existsSync(categoryDir)) return [];

  const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.md'));

  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(categoryDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      category,
      frontmatter: data as PostFrontmatter,
      content,
    };
  });
}

export function getAllPosts(): Post[] {
  return CATEGORIES.flatMap(getPostsFromCategory).sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getPostsByCategory(category: ContentCategory): Post[] {
  return getPostsFromCategory(category).sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getPostBySlug(category: ContentCategory, slug: string): Post | undefined {
  const posts = getPostsFromCategory(category);
  return posts.find((p) => p.slug === slug);
}

export function getAllPrinciples(): Post[] {
  return getPostsByCategory('principles');
}

export function getPostsByPrincipleReference(principleRef: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.principle_reference === principleRef);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.tags?.includes(tag));
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  getAllPosts().forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(content);
  return result.toString();
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const all = getAllPosts().filter(
    (p) => !(p.slug === post.slug && p.category === post.category)
  );

  return all
    .map((p) => {
      let score = 0;
      if (p.frontmatter.principle_reference === post.frontmatter.principle_reference) score += 3;
      const sharedTags = p.frontmatter.tags?.filter((t) =>
        post.frontmatter.tags?.includes(t)
      ).length ?? 0;
      score += sharedTags;
      return { post: p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

export function getAllSlugs(): { category: ContentCategory; slug: string }[] {
  return CATEGORIES.flatMap((category) => {
    const dir = path.join(contentDirectory, category);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => ({ category, slug: f.replace(/\.md$/, '') }));
  });
}
