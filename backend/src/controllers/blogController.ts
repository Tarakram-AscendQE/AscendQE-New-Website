// Insights articles API: public reads, studio-only writes.
import type { Request, Response } from 'express';
import type { Pool } from 'mysql2/promise';
import { pool } from '../config/database.js';
import { currentUser } from '../middleware/authMiddleware.js';
import type { BlogInput } from '../models/Blog.js';
import * as blogs from '../services/blogService.js';
import { deleteLocalArticleImages } from '../services/storageService.js';
import { sendJson, sendServerError } from './respond.js';

/** `blogs.title` is VARCHAR(255) in the production database. */
const TITLE_MAX = 255;

/** The pool, or answers 503 when the database is not configured. */
function database(res: Response): Pool | null {
  if (!pool) sendJson(res, 503, false, 'Insights are unavailable right now. Please try again later.');
  return pool;
}

function blogId(req: Request, res: Response): number | null {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    sendJson(res, 400, false, 'A valid article ID is required.');
    return null;
  }
  return id;
}

function queryString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

/** Only the known fields, with the right types (the request body is untrusted). */
function readInput(body: unknown): BlogInput {
  const data = (typeof body === 'object' && body !== null ? body : {}) as Record<string, unknown>;
  const text = (key: string) => (typeof data[key] === 'string' ? (data[key] as string) : undefined);
  const input: BlogInput = {
    title: text('title'),
    slug: text('slug'),
    excerpt: data.excerpt === null ? null : text('excerpt'),
    cover_image_url: data.cover_image_url === null ? null : text('cover_image_url'),
    topic: text('topic'),
    type: text('type'),
  };
  if (typeof data.content === 'string' || (typeof data.content === 'object' && data.content !== null)) {
    input.content = data.content as BlogInput['content'];
  }
  if (Array.isArray(data.tags)) input.tags = data.tags.filter((tag): tag is string => typeof tag === 'string');
  else if (typeof data.tags === 'string') input.tags = data.tags;
  return input;
}

function titleError(title: string | undefined, required: boolean): string | null {
  if (title === undefined) return required ? 'Please add a title.' : null;
  if (!title.trim()) return 'Please add a title.';
  if (title.trim().length > TITLE_MAX) return `Title must be ${TITLE_MAX} characters or fewer.`;
  return null;
}

/** GET /api/blogs?search=&topic=&type= */
export async function getBlogs(req: Request, res: Response): Promise<void> {
  const db = database(res);
  if (!db) return;
  try {
    const items = await blogs.listBlogs(db, {
      search: queryString(req.query.search),
      topic: queryString(req.query.topic),
      type: queryString(req.query.type),
    });
    sendJson(res, 200, true, `${items.length} articles.`, items);
  } catch (err) {
    sendServerError(res, 'Blogs - list', err, 'Could not load articles.');
  }
}

/** GET /api/blogs/:idOrSlug */
export async function getBlog(req: Request, res: Response): Promise<void> {
  const db = database(res);
  if (!db) return;
  try {
    const blog = await blogs.findBlog(db, String(req.params.idOrSlug));
    if (!blog) {
      sendJson(res, 404, false, 'Article not found.');
      return;
    }
    sendJson(res, 200, true, 'Article found.', blog);
  } catch (err) {
    sendServerError(res, 'Blogs - get', err, 'Could not load the article.');
  }
}

/** POST /api/blogs (requireAuth). The author is the signed-in user. */
export async function createBlog(req: Request, res: Response): Promise<void> {
  const db = database(res);
  if (!db) return;
  const input = readInput(req.body);
  const error = titleError(input.title, true);
  if (error) {
    sendJson(res, 422, false, error);
    return;
  }
  try {
    const blog = await blogs.createBlog(db, { ...input, title: input.title ?? '' }, currentUser(res).sub);
    sendJson(res, 201, true, 'Article published.', blog);
  } catch (err) {
    sendServerError(res, 'Blogs - create', err, 'Could not publish the article.');
  }
}

/** PUT /api/blogs/:id (requireAuth) */
export async function updateBlog(req: Request, res: Response): Promise<void> {
  const db = database(res);
  const id = db && blogId(req, res);
  if (!db || !id) return;
  const input = readInput(req.body);
  const error = titleError(input.title, false);
  if (error) {
    sendJson(res, 422, false, error);
    return;
  }
  try {
    const blog = await blogs.updateBlog(db, id, input);
    if (!blog) {
      sendJson(res, 404, false, 'Article not found.');
      return;
    }
    sendJson(res, 200, true, 'Article updated.', blog);
  } catch (err) {
    sendServerError(res, 'Blogs - update', err, 'Could not update the article.');
  }
}

/** DELETE /api/blogs/:id (requireAuth). Also removes the article's locally stored images. */
export async function deleteBlog(req: Request, res: Response): Promise<void> {
  const db = database(res);
  const id = db && blogId(req, res);
  if (!db || !id) return;
  try {
    const deleted = await blogs.deleteBlog(db, id);
    if (!deleted) {
      sendJson(res, 404, false, 'Article not found.');
      return;
    }
    const deletedImages = await deleteLocalArticleImages(deleted.coverImageUrl, deleted.content);
    sendJson(res, 200, true, `“${deleted.title}” deleted.`, { blog_id: id, deleted_images: deletedImages });
  } catch (err) {
    sendServerError(res, 'Blogs - delete', err, 'Could not delete the article.');
  }
}
