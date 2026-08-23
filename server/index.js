import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import db, { query, getOne, run } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('JWT_SECRET is not configured. Using a development-only secret.');
}
const jwtSecret = JWT_SECRET || 'development-only-change-me';
const uploadsDirectory = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadsDirectory, { recursive: true });

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Sign in is required.' });
  try {
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(401).json({ error: 'Your session is invalid or expired.' });
  }
};

const requireAdmin = (req, res, next) => {
  requireAuth(req, res, () => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Administrator access is required.' });
    next();
  });
};

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
      console.warn('SMTP is not configured. Development codes will be returned locally; production signup will be disabled.');
    }
  } catch (err) {
    console.error('⚠️ Mailer setup error:', err);
  }
};

await setupMailer();

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
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    if (password.length < 10) {
      return res.status(400).json({ error: 'Use a password of at least 10 characters.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await getOne('SELECT * FROM users WHERE email = ?', [cleanEmail]);

    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists. Please Sign In.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `usr-${Date.now()}`;
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    await run(`
      INSERT INTO users (id, name, email, password_hash, role, role_label, is_verified, verification_code, verification_token, verification_expires_at)
      VALUES (?, ?, ?, ?, 'other', 'Registered Reader', 0, ?, ?, ?)
    `, [userId, name.trim(), cleanEmail, passwordHash, verificationCode, verificationToken, verificationExpiresAt]);

    const appUrl = process.env.APP_URL || 'http://localhost:5188';
    const confirmUrl = `${appUrl}/#confirm-email?token=${verificationToken}&email=${encodeURIComponent(cleanEmail)}`;

    // Dispatch Confirmation Email via Nodemailer
    let previewEmailUrl = null;
    let emailSent = false;
    if (mailTransporter) {
      try {
        const info = await mailTransporter.sendMail({
          from: process.env.SMTP_FROM || '"NACETEM E-Library" <no-reply@nacetem.gov.ng>',
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
        emailSent = true;
        if (previewEmailUrl) {
          console.log(`\n📬 Real Email Preview URL for ${cleanEmail}: ${previewEmailUrl}`);
        }
      } catch (mailErr) {
        console.error('Mail dispatch error:', mailErr);
      }
    }

    if (!emailSent && process.env.NODE_ENV === 'production') {
      await run('DELETE FROM users WHERE id = ?', [userId]);
      return res.status(503).json({ error: 'Verification email service is not configured. Please contact the librarian.' });
    }
    if (!emailSent) {
      console.warn(`Development verification code for ${cleanEmail}: ${verificationCode}`);
    }

    res.status(201).json({
      message: emailSent
        ? `Verification email sent to ${cleanEmail}. Enter the 6-digit code to continue.`
        : 'Development mode: SMTP is not configured. Use the code shown in the API console.',
      email: cleanEmail,
      previewEmailUrl,
      emailSent,
      developmentCode: !emailSent && process.env.NODE_ENV !== 'production' ? verificationCode : undefined,
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
      user = await getOne('SELECT * FROM users WHERE email = ?', [cleanEmail]);
      if (user?.is_verified === 1) return res.status(409).json({ error: 'This email is already verified. Please sign in.' });
      if (!user || !code || user.verification_code !== String(code).trim()) {
        return res.status(400).json({ error: 'That verification code is incorrect. Request a new code and try again.' });
      }
    }

    if (!user || !user.verification_expires_at || new Date(user.verification_expires_at) < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired verification code/link. Please check your email inbox.' });
    }

    await run('UPDATE users SET is_verified = 1, verification_code = NULL, verification_token = NULL, verification_expires_at = NULL WHERE id = ?', [user.id]);

    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, name: user.name },
      jwtSecret,
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

app.post('/api/auth/resend-verification', async (req, res) => {
  try {
    const cleanEmail = req.body.email?.trim().toLowerCase();
    const user = cleanEmail ? await getOne('SELECT * FROM users WHERE email = ?', [cleanEmail]) : null;
    if (!user) return res.status(404).json({ error: 'No pending account was found for this email.' });
    if (user.is_verified === 1) return res.status(409).json({ error: 'This account is already verified. Please sign in.' });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    await run('UPDATE users SET verification_code = ?, verification_token = ?, verification_expires_at = ? WHERE id = ?', [code, token, expiresAt, user.id]);

    let emailSent = false;
    if (mailTransporter) {
      const appUrl = process.env.APP_URL || 'http://localhost:5188';
      const confirmUrl = `${appUrl}/#confirm-email?token=${token}&email=${encodeURIComponent(cleanEmail)}`;
      await mailTransporter.sendMail({
        from: process.env.SMTP_FROM || '"NACETEM E-Library" <no-reply@nacetem.gov.ng>',
        to: cleanEmail,
        subject: 'Your new NACETEM E-Library verification code',
        html: `<p>Hello ${user.name},</p><p>Your new verification code is <strong style="font-size:24px;letter-spacing:4px">${code}</strong>.</p><p>This code expires in 30 minutes.</p><p><a href="${confirmUrl}">Confirm your email</a></p>`
      });
      emailSent = true;
    }
    if (!emailSent && process.env.NODE_ENV === 'production') {
      return res.status(503).json({ error: 'Verification email service is unavailable. Please contact the librarian.' });
    }
    res.json({
      email: cleanEmail,
      emailSent,
      developmentCode: !emailSent && process.env.NODE_ENV !== 'production' ? code : undefined,
      message: emailSent ? 'A new verification code was sent. It expires in 30 minutes.' : 'Development mode: use the code displayed below.'
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ error: 'A new verification code could not be issued.' });
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
        email: cleanEmail
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, name: user.name },
      jwtSecret,
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

app.get('/api/auth/me', requireAuth, async (req, res) => {
  const user = await getOne('SELECT id, name, email, role, role_label, is_verified FROM users WHERE id = ?', [req.user.userId]);
  if (!user || user.is_verified !== 1) return res.status(401).json({ error: 'Account is unavailable.' });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role, roleLabel: user.role_label, isVerified: true });
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
      uploadedByUserId: b.uploaded_by_user_id,
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
      ,fileName: b.file_name
      ,fileUrl: b.file_path ? `/api/books/${encodeURIComponent(b.id)}/file` : null
      ,mimeType: b.mime_type
      ,fileSize: b.file_size
      ,fileChecksum: b.file_checksum
      ,volume: b.volume
      ,issue: b.issue
      ,pages: b.pages
      ,chapters: b.chapters ? JSON.parse(b.chapters) : []
    }));

    res.json(parsedBooks);
  } catch (err) {
    console.error('Fetch Books Error:', err);
    res.status(500).json({ error: 'Failed to fetch books from database.' });
  }
});

app.post('/api/books/upload-file', requireAuth, express.raw({ type: 'application/pdf', limit: '40mb' }), async (req, res) => {
  let storedPath;
  try {
    if (!Buffer.isBuffer(req.body) || req.body.length < 5 || req.body.subarray(0, 5).toString() !== '%PDF-') {
      return res.status(400).json({ error: 'Only valid PDF files are accepted.' });
    }
    const metadataHeader = req.headers['x-document-metadata'];
    if (!metadataHeader) return res.status(400).json({ error: 'Document metadata is required.' });
    const metadata = JSON.parse(Buffer.from(metadataHeader, 'base64').toString('utf8'));
    if (!metadata.title?.trim() || !metadata.authors?.length || !metadata.year) {
      return res.status(400).json({ error: 'Title, author, and publication year are required.' });
    }

    const id = `paper-${crypto.randomUUID()}`;
    const safeOriginalName = path.basename(metadata.fileName || 'document.pdf').replace(/[^a-zA-Z0-9._ -]/g, '_');
    const storedName = `${id}.pdf`;
    storedPath = path.join(uploadsDirectory, storedName);
    fs.writeFileSync(storedPath, req.body, { flag: 'wx' });
    const checksum = crypto.createHash('sha256').update(req.body).digest('hex');

    await run(`INSERT INTO books (
      id, is_user_uploaded, uploaded_by, uploaded_by_user_id, title, subtitle, authors, institution, publisher,
      category, lecture_series_sub, type, year, doi, isbn, access_level, abstract,
      key_takeaways, policy_recommendations, full_text, file_name, file_path, mime_type,
      file_size, file_checksum, volume, issue, pages, chapters
    ) VALUES (?,1,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
      id, req.user.name, req.user.userId, metadata.title.trim(), metadata.subtitle?.trim() || '',
      JSON.stringify(metadata.authors), metadata.institution?.trim() || '', metadata.publisher?.trim() || '',
      metadata.category || 'Research Papers', metadata.lectureSeriesSub || null,
      metadata.type || 'Research Paper', Number(metadata.year), metadata.doi?.trim() || '',
      metadata.isbn?.trim() || '', 'Open Access', metadata.abstract?.trim() || '', '[]', '[]', '[]',
      safeOriginalName, storedName, 'application/pdf', req.body.length, checksum,
      metadata.volume?.trim() || '', metadata.issue?.trim() || '', metadata.pages?.trim() || '',
      JSON.stringify(metadata.chapters || [])
    ]);

    const created = await getOne('SELECT * FROM books WHERE id = ?', [id]);
    res.status(201).json({ id, checksum, fileUrl: `/api/books/${encodeURIComponent(id)}/file`, created });
  } catch (error) {
    if (storedPath && fs.existsSync(storedPath)) fs.unlinkSync(storedPath);
    console.error('Binary upload error:', error);
    res.status(500).json({ error: 'The original PDF could not be archived.' });
  }
});

app.get('/api/books/:id/file', async (req, res) => {
  const book = await getOne('SELECT file_path, file_name, mime_type, access_level FROM books WHERE id = ?', [req.params.id]);
  if (!book?.file_path) return res.status(404).json({ error: 'Original file not found.' });
  const absolutePath = path.join(uploadsDirectory, path.basename(book.file_path));
  if (!fs.existsSync(absolutePath)) return res.status(404).json({ error: 'Original file is missing from storage.' });
  res.setHeader('Content-Type', book.mime_type || 'application/pdf');
  const disposition = req.query.download === '1' ? 'attachment' : 'inline';
  res.setHeader('Content-Disposition', `${disposition}; filename="${book.file_name.replace(/["\r\n]/g, '')}"`);
  res.setHeader('Cache-Control', 'private, max-age=3600');
  res.sendFile(absolutePath);
});

app.post('/api/books/upload', requireAuth, async (req, res) => {
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

app.delete('/api/books/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getOne('SELECT uploaded_by_user_id, file_path FROM books WHERE id = ?', [id]);
    if (!book) return res.status(404).json({ error: 'Publication not found.' });
    if (req.user.role !== 'admin' && book.uploaded_by_user_id !== req.user.userId) {
      return res.status(403).json({ error: 'You can only remove your own deposits.' });
    }
    await run('DELETE FROM books WHERE id = ?', [id]);
    if (book.file_path) {
      const absolutePath = path.join(uploadsDirectory, path.basename(book.file_path));
      if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);
    }
    res.json({ message: 'Paper removed from SQLite database.', id });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ error: 'Failed to delete paper.' });
  }
});

// Database Export API
app.get('/api/admin/users', requireAdmin, async (req, res) => {
  const users = await query('SELECT id, name, email, role, role_label, is_verified, created_at FROM users ORDER BY created_at DESC');
  res.json(users.map(user => ({ ...user, isVerified: user.is_verified === 1, roleLabel: user.role_label })));
});

app.delete('/api/admin/users/:id', requireAdmin, async (req, res) => {
  if (req.params.id === req.user.userId) return res.status(400).json({ error: 'You cannot delete your own active admin account.' });
  const deposits = await query('SELECT file_path FROM books WHERE uploaded_by_user_id = ?', [req.params.id]);
  deposits.forEach((deposit) => {
    if (!deposit.file_path) return;
    const absolutePath = path.join(uploadsDirectory, path.basename(deposit.file_path));
    if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);
  });
  await run('DELETE FROM books WHERE uploaded_by_user_id = ?', [req.params.id]);
  const result = await run('DELETE FROM users WHERE id = ?', [req.params.id]);
  if (!result.changes) return res.status(404).json({ error: 'Account not found.' });
  res.json({ message: 'Account and its deposited documents were removed.' });
});

app.get('/api/admin/export-db', requireAdmin, async (req, res) => {
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
