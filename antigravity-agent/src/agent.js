const { spawn } = require('child_process');
const path = require('path');
const readline = require('readline');
const fs = require('fs');

// Environment loader
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
  } catch (e) {
    // Ignore env load error
  }
}

loadEnv();

class MCPServerClient {
  constructor(name, relativePath) {
    this.name = name;
    this.serverPath = path.resolve(__dirname, '../../', relativePath);
    this.process = null;
    this.requestId = 1;
    this.pendingRequests = new Map();
    this.initialized = false;
  }

  async start() {
    return new Promise((resolve, reject) => {
      // Spawn Node process for MCP server
      this.process = spawn('node', [this.serverPath], {
        stdio: ['pipe', 'pipe', 'inherit']
      });

      this.process.on('error', (err) => {
        reject(new Error(`Failed to start MCP server ${this.name}: ${err.message}`));
      });

      const rl = readline.createInterface({
        input: this.process.stdout,
        terminal: false
      });

      rl.on('line', (line) => {
        try {
          const msg = JSON.parse(line);
          if (msg.id !== undefined && msg.id !== null) {
            const pending = this.pendingRequests.get(msg.id);
            if (pending) {
              this.pendingRequests.delete(msg.id);
              if (msg.error) {
                pending.reject(new Error(msg.error.message || `MCP Error ${msg.error.code}`));
              } else {
                pending.resolve(msg.result);
              }
            }
          }
        } catch (err) {
          // Ignore parse errors from stdio logs
        }
      });

      // Handshake initialize
      this.sendRequest("initialize", {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: { name: "antigravity-agent", version: "1.0.0" }
      }).then(() => {
        this.initialized = true;
        resolve();
      }).catch(err => {
        reject(new Error(`Initialize handshake failed: ${err.message}`));
      });
    });
  }

  async sendRequest(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.requestId++;
      this.pendingRequests.set(id, { resolve, reject });
      const requestMsg = JSON.stringify({ jsonrpc: "2.0", method, params, id }) + '\n';
      this.process.stdin.write(requestMsg);
    });
  }

  async callTool(name, args = {}) {
    if (!this.initialized) {
      throw new Error(`MCP Server ${this.name} is not initialized.`);
    }
    const response = await this.sendRequest("tools/call", { name, arguments: args });
    return response;
  }

  stop() {
    if (this.process) {
      this.process.kill();
      this.process = null;
    }
  }
}

// Gemini API Caller
async function callLLM(systemInstruction, userPrompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  const isMock = !apiKey || apiKey.startsWith('mock');

  if (isMock) {
    return simulateLLMResponse(systemInstruction, userPrompt);
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [{ text: userPrompt }]
      }
    ],
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.2
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error(`LLM Call failed: ${err.message}. Falling back to simulation.`);
    return simulateLLMResponse(systemInstruction, userPrompt);
  }
}

function simulateLLMResponse(systemInstruction, userPrompt) {
  // Simulates high-quality code and doc generation tailored to our prompt types
  const promptLower = userPrompt.toLowerCase();
  
  if (promptLower.includes('requirements.md')) {
    return `# Requirements Specification: Modernized Enterprise Management System

## 1. System Overview
The modernized system replaces the legacy Visual Basic 6 desktop application with a web-based client-server application. It includes a frontend dashboard and backend services to manage Customer portfolios and Inventory levels.

## 2. Core Functional Requirements
- **Customer Management**
  - Record Customer Name, Phone, and Email address.
  - Form validation on client-side (required names, formatted email, and digits-only phone numbers).
  - Persistence to database with error catching.
- **Inventory Tracking**
  - Record Item Name, Quantity, and Unit Price.
  - Automatic check for items with low stock levels (< 10 units).
  - Highlight low stock items in a dedicated notification dashboard component.

## 3. Tech Stack Mapping
- UI: React / Vite SPA, modern dark mode layout.
- API: Node.js / Express, RESTful endpoints.
- Database: SQLite for simple, lightweight local storage.
`;
  }

  if (promptLower.includes('architecture.md')) {
    return `# System Architecture: Modernized Enterprise App

## 1. High-Level Architecture
The application follows a client-server web architecture with decoupled layers:
- **Presentation Layer**: Single Page React Application built with Vite.
- **API Services Layer**: Express.js server exposing RESTful API endpoints.
- **Data Access Layer**: SQLite database using standard SQL transactions.

## 2. Component Design
\`\`\`mermaid
graph TD
  Client[React Frontend] -->|REST / JSON| Server[Express Backend]
  Server -->|SQL queries| DB[(SQLite Database)]
\`\`\`

## 3. Database Schema
- **Customers Table**:
  - \`id\` INTEGER PRIMARY KEY AUTOINCREMENT
  - \`name\` TEXT NOT NULL
  - \`phone\` TEXT
  - \`email\` TEXT
- **Inventory Table**:
  - \`id\` INTEGER PRIMARY KEY AUTOINCREMENT
  - \`itemName\` TEXT NOT NULL
  - \`quantity\` INTEGER DEFAULT 0
  - \`price\` REAL DEFAULT 0.0
`;
  }

  if (promptLower.includes('api-spec.md')) {
    return `# API Specifications

## Base URL
\`http://localhost:5000/api\`

## Endpoints

### 1. Customers

#### GET /customers
- **Description**: Returns all customers.
- **Response (200 OK)**:
  \`\`\`json
  [
    { "id": 1, "name": "Alice Smith", "phone": "123-456-7890", "email": "alice@gmail.com" }
  ]
  \`\`\`

#### POST /customers
- **Description**: Adds a new customer.
- **Body**:
  \`\`\`json
  { "name": "Bob Jones", "phone": "987-654-3210", "email": "bob@gmail.com" }
  \`\`\`

### 2. Inventory

#### GET /inventory
- **Description**: Returns all items.

#### GET /inventory/low-stock
- **Description**: Returns items with quantity < 10.
`;
  }

  if (promptLower.includes('migration-plan.md')) {
    return `# Migration Plan: VB6 to React/Node.js

## 1. Migration Overview
This plan dictates how legacy VB6 components in \`legacy-app/\` are systematically migrated to \`modern-app/\`.

## 2. Component Mapping Table

| VB6 Legacy File | Target Component | Migration Strategy | Status |
| :--- | :--- | :--- | :--- |
| \`frmCustomer.frm\` | \`modern-app/frontend/src/components/CustomerForm.jsx\` | Convert controls to React inputs, add Axios integration. | Completed |
| \`frmInventory.frm\` | \`modern-app/frontend/src/components/InventoryList.jsx\` | Render table of stock entries with visual alerts. | Completed |
| \`modDatabase.bas\` | \`modern-app/backend/src/db.js\` | Replace ADODB Access connection with SQLite. | Completed |
`;
  }

  if (promptLower.includes('express') || promptLower.includes('backend')) {
    return `// MODERN EXPRESS BACKEND
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
  db.run(\`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT
  )\`);
  db.run(\`CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    itemName TEXT NOT NULL,
    quantity INTEGER DEFAULT 0,
    price REAL DEFAULT 0.0
  )\`);
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
app.listen(PORT, () => console.log(\`Modern API Server listening on port \${PORT}\`));
`;
  }

  if (promptLower.includes('react') || promptLower.includes('frontend')) {
    return `// MODERN REACT FRONTEND
// File: frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  
  const [custForm, setCustForm] = useState({ name: '', phone: '', email: '' });
  const [invForm, setInvForm] = useState({ itemName: '', quantity: '', price: '' });
  
  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resCust = await fetch(\`\${API_URL}/customers\`);
      const dataCust = await resCust.json();
      setCustomers(dataCust);

      const resInv = await fetch(\`\${API_URL}/inventory\`);
      const dataInv = await resInv.json();
      setInventory(dataInv);

      const resLow = await fetch(\`\${API_URL}/inventory/low-stock\`);
      const dataLow = await resLow.json();
      setLowStock(dataLow);
    } catch (e) {
      console.error("Error fetching data", e);
    }
  };

  const handleCustSubmit = async (e) => {
    e.preventDefault();
    if (!custForm.name) return;
    await fetch(\`\${API_URL}/customers\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(custForm)
    });
    setCustForm({ name: '', phone: '', email: '' });
    fetchData();
  };

  const handleInvSubmit = async (e) => {
    e.preventDefault();
    if (!invForm.itemName) return;
    await fetch(\`\${API_URL}/inventory\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemName: invForm.itemName,
        quantity: parseInt(invForm.quantity) || 0,
        price: parseFloat(invForm.price) || 0.0
      })
    });
    setInvForm({ itemName: '', quantity: '', price: '' });
    fetchData();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Enterprise Modernization Dashboard</h1>
        <p className="subtitle">Migrated from Legacy VB6 to Web Native React</p>
      </header>

      <div className="grid-container">
        {/* Customers Section */}
        <div className="card">
          <h2>Customer Management</h2>
          <form onSubmit={handleCustSubmit} className="modern-form">
            <input 
              name="name" 
              placeholder="Customer Name" 
              value={custForm.name} 
              onChange={e => setCustForm({...custForm, name: e.target.value})} 
              required
            />
            <input 
              name="phone" 
              placeholder="Phone Number" 
              value={custForm.phone} 
              onChange={e => setCustForm({...custForm, phone: e.target.value})} 
            />
            <input 
              name="email" 
              placeholder="Email Address" 
              value={custForm.email} 
              onChange={e => setCustForm({...custForm, email: e.target.value})} 
            />
            <button type="submit" className="btn-primary">Add Customer</button>
          </form>

          <div className="list-section">
            <h3>Registered Customers ({customers.length})</h3>
            <ul>
              {customers.map((c, i) => (
                <li key={i}>
                  <strong>{c.name}</strong> - {c.phone} | <span className="email-text">{c.email}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Inventory Section */}
        <div className="card">
          <h2>Inventory Operations</h2>
          <form onSubmit={handleInvSubmit} className="modern-form">
            <input 
              placeholder="Item Name" 
              value={invForm.itemName} 
              onChange={e => setInvForm({...invForm, itemName: e.target.value})} 
              required
            />
            <input 
              placeholder="Quantity" 
              type="number"
              value={invForm.quantity} 
              onChange={e => setInvForm({...invForm, quantity: e.target.value})} 
            />
            <input 
              placeholder="Price" 
              type="number" 
              step="0.01"
              value={invForm.price} 
              onChange={e => setInvForm({...invForm, price: e.target.value})} 
            />
            <button type="submit" className="btn-success">Add Stock Item</button>
          </form>

          {lowStock.length > 0 && (
            <div className="alert-box">
              <h4>⚠️ Low Stock Alerts</h4>
              <ul>
                {lowStock.map((item, i) => (
                  <li key={i} className="alert-item">{item.itemName} ({item.quantity} left!)</li>
                ))}
              </ul>
            </div>
          )}

          <div className="list-section">
            <h3>Stock Listings ({inventory.length})</h3>
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, i) => (
                  <tr key={i} className={item.quantity < 10 ? 'table-row-low' : ''}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>\${item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
`;
  }

  return `// Default generated component\nmodule.exports = { title: "Generated File" };`;
}

module.exports = {
  MCPServerClient,
  callLLM
};
