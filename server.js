const express = require("express");
const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const app = express();

// Ensure the database file exists before opening it
const dbFile = "/app/data/mindset.sqlite";

if (!fs.existsSync(dbFile)) {
    console.log("Database file not found. Creating new database...");
    fs.writeFileSync(dbFile, "");
}

// Initialize the database
const db = new Database(dbFile);

// Create tables if they don’t exist
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            mood INTEGER NOT NULL CHECK(mood BETWEEN 1 AND 5),
            user_id INTEGER NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
            );
            `);

console.log("Database initialized successfully!");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({
    secret: "mindset-secret",
    resave: false,
    saveUninitialized: true,
}));

// Routes

app.get("/", (req, res) => res.redirect("/login"));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "public/login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "public/register.html")));

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const userExists = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if (userExists) return res.status(400).send("Username already exists.");

    const hashedPassword = await bcrypt.hash(password, 10);
    db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hashedPassword);

    res.redirect("/login");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send("Invalid credentials.");
    }

    req.session.username = username;
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    if (!req.session.username) return res.redirect("/login");
    res.sendFile(path.join(__dirname, "public/home.html"));
});

app.get("/user-info", (req, res) => {
    if (!req.session.username) return res.json({ username: null });
    res.json({ username: req.session.username });
});

app.post("/logout", (req, res) => {
    req.session.destroy(() => res.redirect("/login"));
});

app.post("/add-post", (req, res) => {
    const { description, mood } = req.body;
    const username = req.session.username;
    if (!username) return res.status(401).send("Unauthorized");

    const user = db.prepare("SELECT id FROM users WHERE username = ?").get(username);
    db.prepare("INSERT INTO posts (description, mood, user_id) VALUES (?, ?, ?)").run(description, mood, user.id);

    res.send("Post saved!");
});

app.get("/metrics", (req, res) => {
    if (!req.session.username) return res.redirect("/login");
    res.sendFile(path.join(__dirname, "public/metrics.html"));
});

app.get("/get-posts", (req, res) => {
    const username = req.session.username;
    if (!username) return res.status(401).send("Unauthorized");

    const user = db.prepare("SELECT id FROM users WHERE username = ?").get(username);
    const posts = db.prepare("SELECT id, description, mood FROM posts WHERE user_id = ?").all(user.id);

    res.json(posts);
});


app.listen(3000, () => console.log("Server running at http://localhost:3000"));
