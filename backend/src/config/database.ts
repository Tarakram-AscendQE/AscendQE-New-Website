// Database Connection Manager
// Supports MySQL (GoDaddy / remote / local) with connection pooling and graceful fallback

import mysql, { Pool } from 'mysql2/promise'
import { config } from './index.js'

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

export async function connectDatabase(): Promise<boolean> {
  if (!pool) {
    console.log('[Database] No DB configuration provided. Running in in-memory mode.')
    return false
  }

  try {
    console.log(`[Database] Attempting connection to GoDaddy MySQL at ${config.dbHost}:${config.dbPort} (Database: ${config.dbName})...`)
    const conn = await pool.getConnection()
    console.log('✅ [Database] Connected successfully to GoDaddy MySQL database!')
    conn.release()

    // Ensure essential tables and initial admin exist
    await initializeDatabaseTables()

    return true
  } catch (err: any) {
    console.error('❌ [Database] Connection failed:', err.message)
    if (err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED') {
      console.error('👉 Tip: Check your GoDaddy cPanel "Remote MySQL" settings to make sure your IP is allowed.')
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('👉 Tip: Check your DB_USER, DB_PASSWORD, and ensure the user is assigned to the database in cPanel.')
    }
    return false
  }
}

export async function initializeDatabaseTables(): Promise<void> {
  if (!pool) return

  try {
    // 1. Create admin_users table
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

    // 2. Create blogs table
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

    // 3. Ensure default admin users exist with verified bcrypt hash (AscendQE@2026)
    const defaultHash = '$2a$10$8uVwnWorFserMOxDmP5wwuVguny8e7of4YS6ooZCkRF9grbhDfacK'
    await pool.execute(`
      INSERT INTO admin_users (username, password_hash, is_active)
      VALUES 
        ('admin@ascendqe.com', ?, 1),
        ('admin', ?, 1)
      ON DUPLICATE KEY UPDATE 
        password_hash = VALUES(password_hash),
        is_active = 1;
    `, [defaultHash, defaultHash])

    console.log('✅ [Database] Auto-migration complete: tables & admin user verified.')
  } catch (err: any) {
    console.error('⚠️ [Database] Auto-migration notice:', err.message)
  }
}
