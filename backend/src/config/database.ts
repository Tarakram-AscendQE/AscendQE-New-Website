// Database Connection Manager
// Supports MySQL (GoDaddy / remote / local) with connection pooling and graceful fallback

import https from 'node:https'
import mysql, { Pool } from 'mysql2/promise'
import { config } from './index.js'
import { seedBlogs, seedUsers } from './seedData.js'

export let pool: Pool | null = null

// Initialize pool if credentials are provided
if (config.dbHost && config.dbUser) {
  pool = mysql.createPool({
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000, // 10s timeout
    timezone: '+00:00', // Enforce UTC timestamps across all connections
  })

  // Ensure remote MySQL session timezone is strictly UTC (+00:00) so TIMESTAMP columns are never shifted by server's SYSTEM timezone
  pool.on('connection', (connection) => {
    connection.query("SET time_zone = '+00:00'")
  })
}

// Fetch the container's public outbound IP so it can be whitelisted in cPanel Remote MySQL
export function logContainerOutboundIp(): Promise<string> {
  return new Promise((resolve) => {
    try {
      https.get('https://api.ipify.org', (res) => {
        let ip = ''
        res.on('data', (chunk) => { ip += chunk })
        res.on('end', () => {
          const cleanIp = ip.trim()
          console.log(`🌐 [Container Outbound IP]: ${cleanIp}`)
          console.log(`👉 Add "${cleanIp}" into cPanel > Remote MySQL > "Add Access Host" to allow connection!`)
          resolve(cleanIp)
        })
      }).on('error', () => {
        resolve('')
      })
    } catch {
      resolve('')
    }
  })
}

export async function connectDatabase(): Promise<boolean> {
  if (!pool) {
    console.log('[Database] No DB configuration provided. Running in in-memory mode.')
    return false
  }

  // Always log the container's outbound IP to assist with firewall whitelisting
  logContainerOutboundIp().catch(() => {})

  try {
    console.log(`[Database] Attempting connection to GoDaddy MySQL at ${config.dbHost}:${config.dbPort} (Database: ${config.dbName})...`)
    const conn = await pool.getConnection()
    console.log(`✅ [Database] Connected successfully to GoDaddy MySQL database (${config.dbName})!`)
    conn.release()

    // Ensure database table schemas exist
    await initializeDatabaseTables()

    return true
  } catch (err: any) {
    console.error('❌ [Database] Connection failed:', err.message)
    if (err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED') {
      console.error('👉 Action required: In your cPanel "Remote MySQL" settings, add the [Container Outbound IP] shown above to the Access Hosts list.')
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('👉 Action required: Check your DB_USER, DB_PASSWORD, and ensure the user is assigned to the database in cPanel.')
    }
    return false
  }
}

export async function initializeDatabaseTables(): Promise<void> {
  if (!pool) return

  try {
    // 1. Ensure admin_users table structure exists (uses existing users directly from ascendqe_blogs)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 2. Ensure blogs table structure exists (uses existing blogs directly from ascendqe_blogs)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS blogs (
        blog_id INT AUTO_INCREMENT PRIMARY KEY,
        author_id INT NULL,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) NOT NULL UNIQUE,
        excerpt TEXT NULL,
        content LONGTEXT NOT NULL,
        cover_image_url VARCHAR(1000) NULL,
        tags LONGTEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_author_id (author_id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 2b. Ensure all required columns exist in `blogs` table if table was created previously
    const [cols]: any = await pool.execute('DESCRIBE blogs')
    const existingCols = new Set(cols.map((c: any) => c.Field))
    if (!existingCols.has('excerpt')) {
      await pool.execute('ALTER TABLE blogs ADD COLUMN excerpt TEXT NULL AFTER slug')
    }
    if (!existingCols.has('cover_image_url')) {
      await pool.execute('ALTER TABLE blogs ADD COLUMN cover_image_url VARCHAR(1000) NULL AFTER content')
    }
    if (!existingCols.has('tags')) {
      await pool.execute('ALTER TABLE blogs ADD COLUMN tags LONGTEXT NULL AFTER cover_image_url')
    }
    if (!existingCols.has('published_at')) {
      await pool.execute('ALTER TABLE blogs ADD COLUMN published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER updated_at')
    }

    // 3. Ensure ONLY the 2 exact admin users from cPanel database exist
    for (const u of seedUsers) {
      await pool.execute(`
        INSERT INTO admin_users (user_id, username, password_hash, is_active)
        VALUES (?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE 
          user_id = VALUES(user_id),
          username = VALUES(username),
          password_hash = VALUES(password_hash),
          is_active = 1;
      `, [u.user_id, u.username, u.password_hash])
    }

    // Clean up any extra users so that ONLY the 2 cPanel users exist in admin_users
    await pool.execute(`
      DELETE FROM admin_users 
      WHERE LOWER(username) NOT IN ('nag@ascendqe.com', 'aqadmin')
    `)
    console.log('✅ [Database] admin_users verified: exactly 2 users active (Nag@ascendqe.com, AQadmin).')

    // 4. Ensure initial published blogs exist if blogs table is empty
    const [blogRows]: any = await pool.execute('SELECT COUNT(*) as count FROM blogs')
    const blogCount = blogRows?.[0]?.count || 0
    if (blogCount === 0 && Array.isArray(seedBlogs) && seedBlogs.length > 0) {
      console.log('📝 [Database] Blogs table is empty. Seeding initial published blogs from cPanel...')
      for (const b of seedBlogs) {
        const contentStr = typeof b.content === 'object' ? JSON.stringify(b.content) : b.content
        const tagsStr = Array.isArray(b.tags) ? JSON.stringify(b.tags) : (b.tags || '[]')
        await pool.execute(
          `INSERT INTO blogs (blog_id, author_id, title, slug, excerpt, content, cover_image_url, tags, created_at, published_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE 
             title = VALUES(title),
             slug = VALUES(slug),
             excerpt = VALUES(excerpt),
             content = VALUES(content),
             cover_image_url = VALUES(cover_image_url),
             tags = VALUES(tags),
             author_id = VALUES(author_id)`,
          [
            b.blog_id,
            b.author_id || 13,
            b.title,
            b.slug,
            b.excerpt || null,
            contentStr,
            b.cover_image_url || null,
            tagsStr,
            b.created_at ? new Date(b.created_at) : new Date(),
            b.published_at ? new Date(b.published_at) : new Date(),
          ]
        )
      }
      console.log(`✅ [Database] Successfully seeded ${seedBlogs.length} published blogs.`)
    }

    console.log('✅ [Database] Schema and data verified successfully.')
  } catch (err: any) {
    console.error('⚠️ [Database] Schema verification notice:', err.message)
  }
}
