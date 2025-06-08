const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");

const db = new Database("mindset.sqlite");

// Create the users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

// Create the posts table
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    mood INTEGER NOT NULL CHECK(mood BETWEEN 1 AND 5),
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

console.log("Database initialized successfully!");
db.close();