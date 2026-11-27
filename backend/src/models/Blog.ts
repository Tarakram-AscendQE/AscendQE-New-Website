// Insights article types: the MySQL `blogs` row and the JSON shape the API returns.
import type { RowDataPacket } from 'mysql2/promise';

/** TipTap document (JSON). `topic` / `blogType` are stored inside it, as in the previous backend. */
export type BlogContent = Record<string, unknown>;

export interface BlogRow extends RowDataPacket {
  blog_id: number;
  author_id: number | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  published_at: Date | string;
  author_name?: string;
}

export interface Blog {
  blog_id: number;
  author_id: number | null;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogContent | string | null;
  cover_image_url: string | null;
  tags: string[];
  topic: string;
  type: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  author_name: string;
}

/** Fields accepted when creating or updating an article. */
export interface BlogInput {
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: BlogContent | string;
  cover_image_url?: string | null;
  topic?: string;
  type?: string;
  tags?: string[] | string;
}
