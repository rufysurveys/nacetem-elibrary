import { getOne, run } from './db.js';

const email = process.argv[2]?.trim().toLowerCase();
if (!email) {
  console.error('Usage: npm run make-admin -- librarian@example.com');
  process.exit(1);
}

const user = await getOne('SELECT id, email, is_verified FROM users WHERE email = ?', [email]);
if (!user) {
  console.error('No account exists for that email. The librarian must sign up first.');
  process.exit(1);
}
if (user.is_verified !== 1) {
  console.error('The account must verify its email before it can become an administrator.');
  process.exit(1);
}

await run("UPDATE users SET role = 'admin', role_label = 'Head Librarian (Admin)' WHERE id = ?", [user.id]);
console.log(`Administrator access granted to ${user.email}.`);
process.exit(0);
