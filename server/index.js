import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import db, { query, getOne, run } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = 'nacetem_elibrary_secure_jwt_secret_2026';

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Transporter setup for sending actual emails
let mailTransporter = null;

const setupMailer = async () => {
  try {
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      mailTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      console.log('📧 Configured custom SMTP transporter for real email dispatch.');
    } else {
      // Create ethereal test account for real SMTP email preview links
      const testAccount = await nodemailer.createTestAccount();
      mailTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log('📧 Initialized Nodemailer test mailer for instant email confirmation.');
    }
  } catch (err) {
    console.error('⚠️ Mailer setup error:', err);
  }
};

setupMailer();

// Seed database if empty
const seedDatabaseIfEmpty = async () => {
  try {
    const countRow = await getOne('SELECT COUNT(*) as count FROM books');
    if (countRow && countRow.count === 0) {
      console.log('🌱 Seeding initial publications into SQLite database...');
      
      await run(`
        INSERT INTO books (
          id, is_user_uploaded, uploaded_by, title, subtitle, authors, institution, publisher, category, type, year, doi, isbn, access_level, rating, citations_count, downloads_count, abstract, key_takeaways, policy_recommendations
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        'user-paper-priority-rufai',
        1,
        'Abubakar Rufai',
        'Appraising Institutional Capacity For Implementation Of The Nigerian Cybercrime Act 2015',
        'Priority Deposited Research & Technology Governance Assessment',
        JSON.stringify(['Abubakar Rufai', 'Dr. Kazeem Abubakar']),
        'National Centre for Technology Management (NACETEM)',
        'National Centre for Technology Management (NACETEM)',
        'AI & Emerging Tech',
        'Journal Paper',
        2015,
        '10.5281/nacetem.2015.001',
        '978-978-54203-3-1',
        'Open Access',
        5.0,
        215,
        5420,
        `Authored by Abubakar Rufai, this landmark study conducts a comprehensive appraisal of Nigeria's institutional capacity for enforcing the Cybercrime (Prohibition, Prevention, Etc.) Act of 2015.`,
        JSON.stringify(['Identifies a 42% technical capacity gap in digital forensic laboratory machinery across law enforcement agencies.']),
        JSON.stringify(['Establish a dedicated Cyber Security Capacity Building Fund under the Ministry of Innovation, Science & Technology.'])
      ]);

      console.log('✅ SQLite Database seeded successfully.');
    }
  } catch (err) {
    console.error('⚠️ Seeding error:', err);
  }
};

seedDatabaseIfEmpty();

// -------------------------------------------------------------
// 1. AUTHENTICATION & REAL EMAIL VERIFICATION APIs
// -------------------------------------------------------------

// Sign Up & Send Verification Email
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await getOne('SELECT * FROM users WHERE email = ?', [cleanEmail]);

    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists. Please Sign In.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `usr-${Date.now()}`;
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const verificationToken = `token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const roleLabelMap = {
      staff: 'NACETEM Staff',
      admin: 'Head Librarian (Admin)',
      other: 'Registered Reader'
    };

    const roleLabel = roleLabelMap[role] || 'Registered Reader';

    await run(`
      INSERT INTO users (id, name, email, password_hash, role, role_label, is_verified, verification_code, verification_token)
      VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)
    `, [userId, name.trim(), cleanEmail, passwordHash, role || 'other', roleLabel, verificationCode, verificationToken]);

    const confirmUrl = `http://localhost:5188/#confirm-email?token=${verificationToken}&email=${encodeURIComponent(cleanEmail)}`;

    // Dispatch Confirmation Email via Nodemailer
    let previewEmailUrl = null;
    if (mailTransporter) {
      try {
        const info = await mailTransporter.sendMail({
          from: '"NACETEM E-Library" <no-reply@nacetem.gov.ng>',
          to: cleanEmail,
          subject: '🔒 NACETEM E-Library Account Confirmation Code',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 16px;">
              <div style="background-color: #047857; padding: 20px; text-align: center; border-radius: 12px; color: white;">
                <h1 style="margin: 0; font-size: 22px;">NACETEM E-Library</h1>
                <p style="margin: 5px 0 0 0; font-size: 13px;">National Centre for Technology Management</p>
              </div>
              <div style="padding: 24px; background-color: white; border-radius: 12px; margin-top: 15px; border: 1px solid #e2e8f0;">
                <h2 style="color: #0f172a; font-size: 18px;">Hello, ${name.trim()}!</h2>
                <p style="color: #475569; font-size: 14px; line-height: 1.5;">
                  Thank you for creating an account on the NACETEM E-Library Knowledge Hub. Please use the 6-digit confirmation code below to verify your email address:
                </p>
                <div style="text-align: center; margin: 25px 0;">
                  <span style="font-family: monospace; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #047857; background-color: #ecfdf5; padding: 12px 24px; border-radius: 10px; border: 1px border #a7f3d0; display: inline-block;">
                    ${verificationCode}
                  </span>
                </div>
                <p style="text-align: center; margin: 20px 0;">
                  <a href="${confirmUrl}" style="background-color: #047857; color: white; text-decoration: none; padding: 12px 24px; font-weight: bold; border-radius: 8px; display: inline-block; font-size: 14px;">
                    Confirm & Activate Account Now
                  </a>
                </p>
                <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px;">
                  Federal Ministry of Innovation, Science and Technology • Nigeria
                </p>
              </div>
            </div>
          `
        });

        previewEmailUrl = nodemailer.getTestMessageUrl(info);
        if (previewEmailUrl) {
          console.log(`\n📬 Real Email Preview URL for ${cleanEmail}: ${previewEmailUrl}`);
        }
      } catch (mailErr) {
        console.error('Mail dispatch error:', mailErr);
      }
    }

    console.log(`\n📧 [CONFIRMATION EMAIL SENT TO: ${cleanEmail}]`);
    console.log(`Confirmation Code: ${verificationCode}`);
    console.log(`Confirmation Link: ${confirmUrl}\n`);

    res.status(201).json({
      message: `Verification email sent to ${cleanEmail}! Enter your 6-digit code below.`,
      email: cleanEmail,
      verificationCode,
      confirmUrl,
      previewEmailUrl,
      requiresVerification: true
    });

  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Server error during signup.' });
  }
});

// Email Code Verification
app.post('/api/auth/verify', async (req, res) => {
  try {
    const { email, code, token } = req.body;
    const cleanEmail = email ? email.trim().toLowerCase() : '';

    let user;
    if (token) {
      user = await getOne('SELECT * FROM users WHERE verification_token = ?', [token]);
    } else {
      user = await getOne('SELECT * FROM users WHERE email = ? AND verification_code = ?', [cleanEmail, code]);
    }

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired verification code/link. Please check your email inbox.' });
    }

    await run('UPDATE users SET is_verified = 1, verification_code = NULL WHERE id = ?', [user.id]);

    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: '🎉 Email successfully verified! Your account is activated.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roleLabel: user.role_label,
        isVerified: true
      },
      token: jwtToken
    });

  } catch (err) {
    console.error('Verification Error:', err);
    res.status(500).json({ error: 'Server error during verification.' });
  }
});

// Sign In (Enforces Email Verification)
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await getOne('SELECT * FROM users WHERE email = ?', [cleanEmail]);

    if (!user) {
      return res.status(400).json({ error: 'No account found with this email address. Please Sign Up.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password. Please try again.' });
    }

    if (user.is_verified !== 1) {
      return res.status(403).json({
        error: 'Email address not yet confirmed. Please verify your email before signing in.',
        requiresVerification: true,
        email: cleanEmail,
        verificationCode: user.verification_code
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: `Welcome back, ${user.name}!`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roleLabel: user.role_label,
        isVerified: true
      },
      token
    });

  } catch (err) {
    console.error('Signin Error:', err);
    res.status(500).json({ error: 'Server error during signin.' });
  }
});

// -------------------------------------------------------------
// 2. BOOKS & REPOSITORY PUBLICATION APIs
// -------------------------------------------------------------

app.get('/api/books', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM books ORDER BY created_at DESC');
    const parsedBooks = rows.map(b => ({
      ...b,
      id: b.id,
      isUserUploaded: b.is_user_uploaded === 1,
      uploadedBy: b.uploaded_by,
      title: b.title,
      subtitle: b.subtitle,
      authors: typeof b.authors === 'string' ? JSON.parse(b.authors) : b.authors,
      institution: b.institution,
      publisher: b.publisher,
      category: b.category,
      lectureSeriesSub: b.lecture_series_sub,
      type: b.type,
      year: b.year,
      doi: b.doi,
      isbn: b.isbn,
      accessLevel: b.access_level,
      rating: b.rating,
      citationsCount: b.citations_count,
      downloadsCount: b.downloads_count,
      abstract: b.abstract,
      keyTakeaways: typeof b.key_takeaways === 'string' ? JSON.parse(b.key_takeaways) : [],
      policyRecommendations: typeof b.policy_recommendations === 'string' ? JSON.parse(b.policy_recommendations) : [],
      fullText: typeof b.full_text === 'string' ? JSON.parse(b.full_text) : [],
      pdfDataUrl: b.pdf_data_url
    }));

    res.json(parsedBooks);
  } catch (err) {
    console.error('Fetch Books Error:', err);
    res.status(500).json({ error: 'Failed to fetch books from database.' });
  }
});

app.post('/api/books/upload', async (req, res) => {
  try {
    const book = req.body;
    const id = book.id || `user-paper-${Date.now()}`;
    const authorsJson = JSON.stringify(Array.isArray(book.authors) ? book.authors : [book.authors]);
    const takeawaysJson = JSON.stringify(book.keyTakeaways || []);
    const policyJson = JSON.stringify(book.policyRecommendations || []);
    const fullTextJson = JSON.stringify(book.fullText || []);

    await run(`
      INSERT INTO books (
        id, is_user_uploaded, uploaded_by, title, subtitle, authors, institution, publisher, category, lecture_series_sub, type, year, doi, isbn, access_level, rating, citations_count, downloads_count, abstract, key_takeaways, policy_recommendations, full_text, pdf_data_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      1,
      book.uploadedBy || 'Abubakar Rufai',
      book.title,
      book.subtitle || '',
      authorsJson,
      book.institution || 'National Centre for Technology Management (NACETEM)',
      book.publisher || 'National Centre for Technology Management (NACETEM)',
      book.category,
      book.lectureSeriesSub || null,
      book.type,
      book.year || 2026,
      book.doi || '',
      book.isbn || '',
      book.accessLevel || 'Open Access',
      5.0,
      1,
      1,
      book.abstract,
      takeawaysJson,
      policyJson,
      fullTextJson,
      book.pdfDataUrl || null
    ]);

    res.status(201).json({ message: 'Paper saved to SQLite database!', id });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: 'Failed to save paper to database.' });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await run('DELETE FROM books WHERE id = ?', [id]);
    res.json({ message: 'Paper removed from SQLite database.', id });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ error: 'Failed to delete paper.' });
  }
});

// Database Export API
app.get('/api/admin/export-db', async (req, res) => {
  try {
    const users = await query('SELECT id, name, email, role, role_label, is_verified, created_at FROM users');
    const books = await query('SELECT * FROM books');

    const exportData = {
      exportTimestamp: new Date().toISOString(),
      databaseType: 'SQLite3 / PostgreSQL Compatible',
      tables: {
        users,
        books
      }
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="nacetem_library_database_export.json"');
    res.send(JSON.stringify(exportData, null, 2));

  } catch (err) {
    console.error('Export Error:', err);
    res.status(500).json({ error: 'Failed to export database.' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 NACETEM Local SQLite Backend Server running on http://localhost:${PORT}`);
  console.log(`📁 Local SQLite Database File: ${path.join(__dirname, 'nacetem_library.db')}\n`);
});
