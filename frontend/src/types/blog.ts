// Insights (blog) types shared by the services, the public pages and the studio.
import type { JSONContent } from '@tiptap/react';

/** An article as returned by the backend (/api/blogs). */
export interface BlogItem {
  blog_id: number;
  author_id: number | null;
  title: string;
  slug: string;
  excerpt: string;
  /** TipTap document; older articles may hold plain text. */
  content: JSONContent | string | null;
  cover_image_url: string | null;
  tags: string[];
  topic: string;
  type: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  published_at: string;
}

/** Fields the studio sends when publishing or updating an article. */
export interface BlogPayload {
  title: string;
  excerpt?: string;
  content: JSONContent;
  cover_image_url: string | null;
  topic: string;
  type: string;
  tags: string[];
}

/** Signed-in studio user (kept in sessionStorage). */
export interface StudioSession {
  id: number;
  username: string;
  displayName: string;
  role: string;
  token: string;
  loginTime: number;
}
