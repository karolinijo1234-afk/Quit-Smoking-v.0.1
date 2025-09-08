const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const db = new sqlite3.Database('./smoking.db');
db.run(`CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL
)`);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Record smoking
app.post('/record', (req, res) => {
    const timestamp = new Date().toISOString();
    db.run(`INSERT INTO records (timestamp) VALUES (?)`, [timestamp], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID, timestamp });
    });
});

// Get all records
app.get('/records', (req, res) => {
    db.all(`SELECT * FROM records ORDER BY id DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
