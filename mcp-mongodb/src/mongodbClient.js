const fs = require('fs');
const path = require('path');

// Basic helper to load .env
function loadEnv() {
  try {
    const envPath = path.resolve(__dirname, '../../.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || '';
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1);
          }
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      });
    }
  } catch (e) {}
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'enterprise_modernization';

let client = null;
let db = null;
let isMock = true;

// Persistent Mock Database File
const mockDbPath = path.resolve(__dirname, '../mock-db.json');

function initMockDb() {
  if (!fs.existsSync(mockDbPath)) {
    const initialData = {
      customers: [
        { id: 1, name: "Alexander Wright", phone: "+1 (555) 019-2834", email: "alexander.wright@enterprise.com" },
        { id: 2, name: "Seraphina Vance", phone: "+1 (555) 014-9982", email: "s.vance@vanguard.org" }
      ],
      inventory: [
        { id: 1, itemName: "Quantum Processing Unit (QPU)", quantity: 14, price: 12500.00 },
        { id: 2, itemName: "Optic Fiber Transceiver 10G", quantity: 8, price: 145.50 },
        { id: 3, itemName: "Server Rack Fan Module", quantity: 45, price: 89.99 }
      ]
    };
    fs.writeFileSync(mockDbPath, JSON.stringify(initialData, null, 2), 'utf8');
  }
}

// Try connecting to standard mongodb driver if installed
async function connectDb() {
  if (MONGODB_URI.startsWith('mock')) {
    initMockDb();
    isMock = true;
    return;
  }

  try {
    const { MongoClient } = require('mongodb');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(MONGODB_DB_NAME);
    isMock = false;
    // console.error("Connected to real MongoDB database.");
  } catch (err) {
    // console.error("Failed to load/connect real MongoDB, falling back to persistent JSON simulation:", err.message);
    initMockDb();
    isMock = true;
  }
}

// Simulated JSON DB operations
function readMockDb() {
  initMockDb();
  return JSON.parse(fs.readFileSync(mockDbPath, 'utf8'));
}

function writeMockDb(data) {
  fs.writeFileSync(mockDbPath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  connectDb,
  isMockMode: () => isMock,
  getDb: () => db,
  getMockDb: () => readMockDb(),
  saveMockDb: (data) => writeMockDb(data),
  dbName: MONGODB_DB_NAME
};
