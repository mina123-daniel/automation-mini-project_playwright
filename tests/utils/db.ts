import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../../db/test.db');

export function getDbConnection() {
  return new Database(dbPath);
}

export function getAnyUser() {
  const db = getDbConnection();
  const row = db.prepare('SELECT * FROM users LIMIT 1').get();
  db.close();
  return row;
}

export function insertUser(name: string, email: string) {
  const db = getDbConnection();
  db.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run(name, email);
  db.close();
}
