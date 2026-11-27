// Insights articles in MySQL (`blogs` table). Parameterised queries only.
import type { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import type { Blog, BlogContent, BlogInput, BlogRow } from '../models/Blog.js';

const SELECT_BLOG = `
  SELECT b.blog_id, b.author_id, b.title, b.slug, b.excerpt, b.content, b.cover_image_url, b.tags,
         b.created_at, b.updated_at, b.published_at, COALESCE(u.username, 'Admin') AS author_name
  FROM blogs b
  LEFT JOIN admin_users u ON b.author_id = u.user_id`;

/** URL slug, at most 200 characters (`blogs.slug` is VARCHAR(255) and gets a suffix when taken). */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200)
    .replace(/-+$/, '');
}

function toIso(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : String(value || '');
}

function parseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function isObject(value: unknown): value is BlogContent {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** MySQL row → API object (content and tags parsed from JSON; topic/type read from the content). */
export function toBlog(row: BlogRow): Blog {
  const content = row.content ? parseJson(row.content) : null;
  let topic = '';
  let type = '';
  if (isObject(content)) {
    topic = typeof content.topic === 'string' ? content.topic : '';
    const rawType = typeof content.blogType === 'string' ? content.blogType : '';
    type = rawType.toLowerCase() === 'doc' ? '' : rawType;
  }

  const rawTags = row.tags ? parseJson(row.tags) : [];
  const tags = (Array.isArray(rawTags) ? rawTags : [rawTags]).filter(
    (tag): tag is string => typeof tag === 'string' && tag !== '' && tag.toLowerCase() !== 'doc'
  );

  return {
    blog_id: Number(row.blog_id),
    author_id: row.author_id ? Number(row.author_id) : null,
    title: row.title || '',
    slug: row.slug || '',
    excerpt: row.excerpt || '',
    content: isObject(content) || typeof content === 'string' ? content : null,
    cover_image_url: row.cover_image_url || null,
    tags,
    topic,
    type,
    created_at: toIso(row.created_at),
    updated_at: toIso(row.updated_at),
    published_at: toIso(row.published_at),
    author_name: row.author_name || 'Admin',
  };
}

/** Content as a TipTap document object; plain text becomes one paragraph. */
function normaliseContent(content: BlogInput['content']): BlogContent {
  if (isObject(content)) return { ...content };
  if (typeof content === 'string' && content.trim()) {
    const parsed = parseJson(content);
    if (isObject(parsed)) return parsed;
    return { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: content }] }] };
  }
  return { type: 'doc', content: [] };
}

function tagList(tags: BlogInput['tags'], topic?: string, type?: string): string[] {
  const list = Array.isArray(tags) ? tags.map(String) : tags ? [String(tags)] : [];
  for (const extra of [topic, type]) if (extra && !list.includes(extra)) list.push(extra);
  return list;
}

async function uniqueSlug(db: Pool, baseSlug: string, excludeId?: number): Promise<string> {
  const base = baseSlug || `article-${Date.now()}`;
  let candidate = base;
  for (let attempt = 0; attempt < 10; attempt++) {
    const [rows] = await db.execute<RowDataPacket[]>(
      'SELECT blog_id FROM blogs WHERE slug = ? AND blog_id != ? LIMIT 1',
      [candidate, excludeId ?? 0]
    );
    if (rows.length === 0) return candidate;
    candidate = `${base}-${Math.random().toString(36).substring(2, 6)}`;
  }
  return `${base}-${Date.now()}`;
}

async function findById(db: Pool, blogId: number): Promise<Blog | null> {
  const [rows] = await db.execute<BlogRow[]>(`${SELECT_BLOG} WHERE b.blog_id = ? LIMIT 1`, [blogId]);
  return rows.length ? toBlog(rows[0]) : null;
}

export interface BlogFilters {
  search?: string;
  topic?: string;
  type?: string;
}

/** All articles, newest first. */
export async function listBlogs(db: Pool, filters: BlogFilters = {}): Promise<Blog[]> {
  const params: string[] = [];
  let sql = SELECT_BLOG;
  if (filters.search?.trim()) {
    const term = `%${filters.search.trim().toLowerCase()}%`;
    sql += ' WHERE (LOWER(b.title) LIKE ? OR LOWER(b.slug) LIKE ? OR LOWER(b.excerpt) LIKE ?)';
    params.push(term, term, term);
  }
  sql += ' ORDER BY b.created_at DESC';

  const [rows] = await db.execute<BlogRow[]>(sql, params);
  const topic = filters.topic?.toLowerCase();
  const type = filters.type?.toLowerCase();
  return rows
    .map(toBlog)
    .filter((blog) => (!topic || blog.topic.toLowerCase() === topic) && (!type || blog.type.toLowerCase() === type));
}

/** One article by numeric ID or by slug. */
export async function findBlog(db: Pool, idOrSlug: string): Promise<Blog | null> {
  if (/^\d+$/.test(idOrSlug)) return findById(db, Number(idOrSlug));
  const [rows] = await db.execute<BlogRow[]>(`${SELECT_BLOG} WHERE b.slug = ? LIMIT 1`, [idOrSlug]);
  return rows.length ? toBlog(rows[0]) : null;
}

export async function createBlog(db: Pool, input: BlogInput & { title: string }, authorId: number): Promise<Blog> {
  const title = input.title.trim();
  const slug = await uniqueSlug(db, slugify(input.slug?.trim() || title));
  const content = normaliseContent(input.content);
  if (input.topic) content.topic = input.topic;
  if (input.type) content.blogType = input.type;
  const now = new Date();

  const [result] = await db.execute<ResultSetHeader>(
    `INSERT INTO blogs (author_id, title, slug, excerpt, content, cover_image_url, tags, created_at, updated_at, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      authorId,
      title,
      slug,
      input.excerpt?.trim() || null,
      JSON.stringify(content),
      input.cover_image_url?.trim() || null,
      JSON.stringify(tagList(input.tags, input.topic, input.type)),
      now,
      now,
      now,
    ]
  );
  const created = await findById(db, result.insertId);
  if (!created) throw new Error('The article was saved but could not be read back.');
  return created;
}

/** Updates the given fields of an article. Returns null when it does not exist. */
export async function updateBlog(db: Pool, blogId: number, input: BlogInput): Promise<Blog | null> {
  const [rows] = await db.execute<BlogRow[]>('SELECT * FROM blogs WHERE blog_id = ? LIMIT 1', [blogId]);
  if (!rows.length) return null;
  const existing = rows[0];

  const title = input.title !== undefined ? input.title.trim() : existing.title;
  let slug = existing.slug;
  if (input.slug?.trim() && slugify(input.slug) !== existing.slug) {
    slug = await uniqueSlug(db, slugify(input.slug), blogId);
  }
  const excerpt = input.excerpt !== undefined ? input.excerpt?.trim() || null : existing.excerpt;
  const cover = input.cover_image_url !== undefined ? input.cover_image_url?.trim() || null : existing.cover_image_url;

  const content = input.content !== undefined ? normaliseContent(input.content) : normaliseContent(existing.content);
  if (input.topic !== undefined) content.topic = input.topic;
  if (input.type !== undefined) content.blogType = input.type;

  const existingTags = existing.tags ? parseJson(existing.tags) : [];
  const tags =
    input.tags !== undefined
      ? tagList(input.tags, input.topic, input.type)
      : tagList(Array.isArray(existingTags) ? existingTags.map(String) : [], input.topic, input.type);

  await db.execute(
    'UPDATE blogs SET title = ?, slug = ?, excerpt = ?, content = ?, cover_image_url = ?, tags = ?, updated_at = ? WHERE blog_id = ?',
    [title, slug, excerpt, JSON.stringify(content), cover, JSON.stringify(tags), new Date(), blogId]
  );
  return findById(db, blogId);
}

/** Deletes an article. Returns its title, cover and content (for image clean-up), or null when missing. */
export async function deleteBlog(
  db: Pool,
  blogId: number
): Promise<{ title: string; coverImageUrl: string | null; content: string } | null> {
  const [rows] = await db.execute<BlogRow[]>(
    'SELECT blog_id, title, cover_image_url, content FROM blogs WHERE blog_id = ? LIMIT 1',
    [blogId]
  );
  if (!rows.length) return null;
  await db.execute('DELETE FROM blogs WHERE blog_id = ?', [blogId]);
  return { title: rows[0].title, coverImageUrl: rows[0].cover_image_url, content: rows[0].content || '' };
}
