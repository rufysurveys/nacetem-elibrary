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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Books / Publications Table
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      is_user_uploaded INTEGER DEFAULT 0,
      uploaded_by TEXT,
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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
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
