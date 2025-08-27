import sqlite3 from 'sqlite3';

const database = sqlite3.verbose();
const db = new database.Database(':memory:');

// init database
db.run(`CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );`);
db.run(`CREATE TABLE tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            title TEXT NOT NULL,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );`);
            
export const createUser = (name, email) => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
        stmt.run(name, email, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
        stmt.finalize();
    });
}

export const createTask = (userId, title, description) => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)");
        stmt.run(userId, title, description, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
        stmt.finalize();
    });
}

// db.close();