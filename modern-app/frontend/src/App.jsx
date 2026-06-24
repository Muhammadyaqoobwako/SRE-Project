// MODERN EXPRESS BACKEND
// File: backend/src/index.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database connection error:', err.message);
  else console.log('Database connected successfully.');
});

// Initialize Tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    itemName TEXT NOT NULL,
    quantity INTEGER DEFAULT 0,
    price REAL DEFAULT 0.0
  )`);
});

// API Routes
app.get('/api/customers', (req, res) => {
  db.all('SELECT * FROM customers', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/customers', (req, res) => {
  const { name, phone, email } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  db.run('INSERT INTO customers (name, phone, email) VALUES (?, ?, ?)', [name, phone, email], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, phone, email });
  });
});

app.get('/api/inventory', (req, res) => {
  db.all('SELECT * FROM inventory', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/inventory', (req, res) => {
  const { itemName, quantity, price } = req.body;
  db.run('INSERT INTO inventory (itemName, quantity, price) VALUES (?, ?, ?)', [itemName, quantity, price], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, itemName, quantity, price });
  });
});

app.get('/api/inventory/low-stock', (req, res) => {
  db.all('SELECT * FROM inventory WHERE quantity < 10', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Modern API Server listening on port ${PORT}`));
