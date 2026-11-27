// Helpers shared by the Insights pages and the studio (no React).
import type { JSONContent } from '@tiptap/react';
import type { BlogItem } from '@/types/blog';

const DEFAULT_TOPIC = 'Quality Engineering';

/** "Oct 27, 2026" (short) or "October 27, 2026" (long). MySQL "YYYY-MM-DD hh:mm:ss" is read as UTC. */
export function formatDate(iso: string, month: 'short' | 'long' = 'short'): string {
  if (!iso) return '';
  const normalized = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(iso) ? `${iso.replace(' ', 'T')}Z` : iso;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', { month, day: 'numeric', year: 'numeric' });
}

function collectText(node: JSONContent | undefined, parts: string[]): void {
  if (!node) return;
  if (node.text) parts.push(node.text);
  node.content?.forEach((child) => collectText(child, parts));
}

/** Plain text of an article body (TipTap JSON or legacy plain text). */
export function articleText(content: BlogItem['content']): string {
  if (!content) return '';
  if (typeof content === 'string') return content.replace(/<[^>]+>/g, ' ');
  const parts: string[] = [];
  collectText(content, parts);
  return parts.join(' ');
}

/** "4 min read" at 200 words per minute. */
export function readingTime(content: BlogItem['content']): string {
  const words = articleText(content).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export function articleTopic(blog: BlogItem): string {
  return blog.topic || blog.tags[0] || DEFAULT_TOPIC;
}

/** The article type ("Case Study", …) or '' when none was set. */
export function articleType(blog: BlogItem): string {
  return blog.type && blog.type.toLowerCase() !== 'doc' ? blog.type : '';
}

export function articlePath(blog: Pick<BlogItem, 'slug' | 'blog_id'>): string {
  return `/blogs/${blog.slug || blog.blog_id}`;
}

/** Author shown on articles: the part before "@", capitalised ("nag@ascendqe.com" → "Nag"). */
export function authorName(name: string): string {
  const raw = (name || 'AscendQE').split('@')[0];
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

/** TipTap JSON for the editor/reader; legacy plain-text bodies become paragraphs. */
export function toEditorContent(content: BlogItem['content']): JSONContent | string {
  if (!content) return '';
  if (typeof content !== 'string') return content;
  try {
    const parsed: unknown = JSON.parse(content);
    if (typeof parsed === 'object' && parsed !== null) return parsed as JSONContent;
  } catch {
    // Plain text.
  }
  return {
    type: 'doc',
    content: content
      .split(/\n{2,}/)
      .filter(Boolean)
      .map((text) => ({ type: 'paragraph', content: [{ type: 'text', text }] })),
  };
}
