const fs = require('fs');
const path = require('path');

// Basic helper to load .env if process.env values are not set
function loadEnv() {
  try {
    const envPath = path.resolve(__dirname, '../../../.env');
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
    // Ignore error loading .env
  }
}

loadEnv();

const TAVILY_API_KEY = process.env.TAVILY_API_KEY || 'mock-tavily-key';
const isMock = !TAVILY_API_KEY || TAVILY_API_KEY.startsWith('mock');

async function search(args) {
  const { query } = args || {};
  if (!query) {
    throw new Error("Missing 'query' parameter.");
  }

  if (isMock) {
    // Return high quality simulated search results for typical modernization topics
    let results = [
      {
        title: "VB6 to React/Node.js Modernization Strategy",
        url: "https://modernization-hub.org/vb6-to-web",
        content: "Migrating VB6 forms involves mapping controls (TextBox -> <input>, CommandButton -> <button>) and replacing ADODB recordsets with REST API endpoints or ORMs like Sequelize/Prisma in Node.js."
      },
      {
        title: "Replacing ADODB in Express.js",
        url: "https://node-patterns.dev/replace-adodb",
        content: "When migrating from modDatabase.bas ADODB connections, use a sqlite3 database or a postgres pool. Replace direct SQL command execution with async/await query execution in Express middleware."
      }
    ];

    if (query.toLowerCase().includes('invent') || query.toLowerCase().includes('stock')) {
      results.push({
        title: "Building Real-time Inventory in React",
        url: "https://react-patterns.com/inventory",
        content: "Use React state hooks to display inventory listings. Perform polling or WebSockets to show alert badges when stock drops below thresholds."
      });
    }

    return {
      content: [{ type: "text", text: JSON.stringify({ results }, null, 2) }]
    };
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query,
        search_depth: "basic",
        include_answer: true
      })
    });

    if (!response.ok) {
      throw new Error(`Tavily error (${response.status})`);
    }

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  } catch (err) {
    throw new Error(`search failed: ${err.message}`);
  }
}

module.exports = search;
