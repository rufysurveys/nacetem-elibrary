import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'nacetem_library.db');

// Enable verbosity for debugging
const verboseSqlite = sqlite3.verbose();
const db = new verboseSqlite.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to SQLite Database:', err.message);
  } else {
    console.log('✅ Connected to local SQLite database at:', dbPath);
  }
});

// Initialize database schema tables
db.serialize(() => {
  // Users Table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL,
      role_label TEXT NOT NULL,
      is_verified INTEGER DEFAULT 0,
      verification_code TEXT,
      verification_token TEXT,
      verification_expires_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Books / Publications Table
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      is_user_uploaded INTEGER DEFAULT 0,
      uploaded_by TEXT,
      uploaded_by_user_id TEXT,
      title TEXT NOT NULL,
      subtitle TEXT,
      authors TEXT NOT NULL,
      institution TEXT,
      publisher TEXT,
      category TEXT NOT NULL,
      lecture_series_sub TEXT,
      type TEXT NOT NULL,
      year INTEGER NOT NULL,
      doi TEXT,
      isbn TEXT,
      access_level TEXT DEFAULT 'Open Access',
      rating REAL DEFAULT 5.0,
      citations_count INTEGER DEFAULT 0,
      downloads_count INTEGER DEFAULT 0,
      abstract TEXT,
      key_takeaways TEXT,
      policy_recommendations TEXT,
      full_text TEXT,
      pdf_data_url TEXT,
      file_name TEXT,
      file_path TEXT,
      mime_type TEXT,
      file_size INTEGER,
      file_checksum TEXT,
      volume TEXT,
      issue TEXT,
      pages TEXT,
      chapters TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const migrations = [
    ['file_name', 'TEXT'], ['file_path', 'TEXT'], ['mime_type', 'TEXT'],
    ['file_size', 'INTEGER'], ['file_checksum', 'TEXT'], ['volume', 'TEXT'],
    ['issue', 'TEXT'], ['pages', 'TEXT'], ['chapters', 'TEXT'],
    ['uploaded_by_user_id', 'TEXT']
  ];
  migrations.forEach(([column, type]) => {
    db.run(`ALTER TABLE books ADD COLUMN ${column} ${type}`, (error) => {
      if (error && !error.message.includes('duplicate column name')) {
        console.error(`Migration failed for books.${column}:`, error.message);
      }
    });
  });
  db.run('ALTER TABLE users ADD COLUMN verification_expires_at DATETIME', (error) => {
    if (error && !error.message.includes('duplicate column name')) {
      console.error('Migration failed for users.verification_expires_at:', error.message);
    }
  });
});

// Helper database wrapper functions
export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getOne = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

export default db;
