// db/init-db.js
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'test.db');
console.log('Creating DB at:', dbPath);

const db = new Database(dbPath);

// Create table
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL
);
`);

// Seed data
db.exec(`
INSERT INTO users (name, email) VALUES
('standard_user', 'standard_user@example.com'),
('locked_out_user', 'locked_out@example.com')
;
`);

db.close();
console.log('DB created and seeded successfully');
