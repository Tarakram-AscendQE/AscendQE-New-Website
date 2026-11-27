// Insights articles API (backend /api/blogs and /api/upload). Writes need a studio session.
import { blogAuthService } from '@/services/blogAuthService';
import { jsonBody, requestJson, type ApiResponse } from '@/services/http';
import type { BlogItem, BlogPayload } from '@/types/blog';

function authHeader(): Record<string, string> {
  const token = blogAuthService.getSession()?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const blogService = {
  /** All published articles, newest first. */
  getBlogs(): Promise<ApiResponse<BlogItem[]>> {
    return requestJson<BlogItem[]>('/api/blogs');
  },

  /** One article by slug or numeric ID (status 404 when it does not exist). */
  getBlog(idOrSlug: string | number): Promise<ApiResponse<BlogItem>> {
    return requestJson<BlogItem>(`/api/blogs/${encodeURIComponent(String(idOrSlug))}`);
  },

  createBlog(payload: BlogPayload): Promise<ApiResponse<BlogItem>> {
    return requestJson<BlogItem>('/api/blogs', jsonBody('POST', payload, authHeader()));
  },

  updateBlog(id: number, payload: Partial<BlogPayload>): Promise<ApiResponse<BlogItem>> {
    return requestJson<BlogItem>(`/api/blogs/${id}`, jsonBody('PUT', payload, authHeader()));
  },

  deleteBlog(id: number): Promise<ApiResponse<{ blog_id: number }>> {
    return requestJson(`/api/blogs/${id}`, { method: 'DELETE', headers: authHeader() });
  },

  /** Uploads an article image; returns its public URL. */
  uploadImage(file: File): Promise<ApiResponse<{ url: string; filename: string }>> {
    const form = new FormData();
    form.append('image', file);
    return requestJson('/api/upload', { method: 'POST', headers: authHeader(), body: form });
  },
};
