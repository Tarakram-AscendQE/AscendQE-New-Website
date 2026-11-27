// MySQL connection pool for the Insights module, plus schema checks and first-run seeding.
import mysql, { type Pool, type RowDataPacket } from 'mysql2/promise';
import { config, isDatabaseConfigured } from './index.js';
import { seedBlogs, seedUsers } from './seedData.js';

/** null when DB_HOST / DB_USER are not set (the Insights API then answers 503). */
export const pool: Pool | null = isDatabaseConfigured()
  ? mysql.createPool({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name,
      waitForConnections: true,
      connectionLimit: 10,
      connectTimeout: 10000,
      timezone: '+00:00', // store and read TIMESTAMPs as UTC
    })
  : null;

// Keep the MySQL session in UTC so TIMESTAMP columns are never shifted by the server's time zone.
pool?.on('connection', (connection) => {
  connection.query("SET time_zone = '+00:00'");
});

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

async function ensureSchema(db: Pool): Promise<void> {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS blogs (
      blog_id INT AUTO_INCREMENT PRIMARY KEY,
      author_id INT NULL,
      title VARCHAR(500) NOT NULL,
      slug VARCHAR(500) NOT NULL UNIQUE,
      excerpt TEXT NULL,
      content LONGTEXT NOT NULL,
      cover_image_url LONGTEXT NULL,
      tags LONGTEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_author_id (author_id),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

  // Tables created by older versions may miss columns; add them (never drop or rewrite data).
  const [columns] = await db.execute<RowDataPacket[]>('SHOW COLUMNS FROM blogs');
  const existing = new Map(columns.map((column) => [String(column.Field), String(column.Type).toLowerCase()]));
  if (!existing.has('excerpt')) await db.execute('ALTER TABLE blogs ADD COLUMN excerpt TEXT NULL AFTER slug');
  if (!existing.has('cover_image_url')) {
    await db.execute('ALTER TABLE blogs ADD COLUMN cover_image_url LONGTEXT NULL AFTER content');
  } else if (existing.get('cover_image_url') !== 'longtext') {
    // Covers can be compressed data URLs (fallback when image upload fails), which need LONGTEXT.
    await db.execute('ALTER TABLE blogs MODIFY COLUMN cover_image_url LONGTEXT NULL');
  }
  if (!existing.has('tags')) await db.execute('ALTER TABLE blogs ADD COLUMN tags LONGTEXT NULL AFTER cover_image_url');
  if (!existing.has('published_at')) {
    await db.execute('ALTER TABLE blogs ADD COLUMN published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER updated_at');
  }
}

/** First run only: an empty database gets the two studio accounts and the published articles. */
async function seedEmptyTables(db: Pool): Promise<void> {
  const [[users]] = await db.execute<RowDataPacket[]>('SELECT COUNT(*) AS count FROM admin_users');
  if (Number(users.count) === 0) {
    for (const user of seedUsers) {
      await db.execute('INSERT INTO admin_users (user_id, username, password_hash, is_active) VALUES (?, ?, ?, 1)', [
        user.user_id,
        user.username,
        user.password_hash,
      ]);
    }
    console.warn(`[Database] Empty admin_users table: added ${seedUsers.length} studio accounts.`);
  }

  const [[blogs]] = await db.execute<RowDataPacket[]>('SELECT COUNT(*) AS count FROM blogs');
  if (Number(blogs.count) === 0) {
    for (const blog of seedBlogs) {
      await db.execute(
        `INSERT INTO blogs (blog_id, author_id, title, slug, excerpt, content, cover_image_url, tags, created_at, published_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          blog.blog_id,
          blog.author_id,
          blog.title,
          blog.slug,
          blog.excerpt || null,
          typeof blog.content === 'string' ? blog.content : JSON.stringify(blog.content),
          blog.cover_image_url || null,
          typeof blog.tags === 'string' ? blog.tags : JSON.stringify(blog.tags ?? []),
          new Date(blog.created_at),
          new Date(blog.published_at),
        ]
      );
    }
    console.warn(`[Database] Empty blogs table: added ${seedBlogs.length} published articles.`);
  }
}

/** Connects, checks the schema and seeds empty tables. Runs in the background; never throws. */
export async function connectDatabase(): Promise<boolean> {
  if (!pool) {
    console.warn('[Database] DB_HOST / DB_USER not set: Insights API is unavailable.');
    return false;
  }
  try {
    const connection = await pool.getConnection();
    connection.release();
    await ensureSchema(pool);
    await seedEmptyTables(pool);
    console.warn(`[Database] Connected to ${config.database.name}; schema verified.`);
    return true;
  } catch (err) {
    console.error('[Database] Connection or schema check failed:', errorMessage(err));
    return false;
  }
}
