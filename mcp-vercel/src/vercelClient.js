const fs = require('fs');
const path = require('path');

// Basic helper to load .env if process.env values are not set
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
    // Ignore error loading .env
  }
}

loadEnv();

const VERCEL_TOKEN = process.env.VERCEL_TOKEN || 'mock-vercel-token';
const isMock = !VERCEL_TOKEN || VERCEL_TOKEN.startsWith('mock');

async function vercelRequest(endpoint, options = {}) {
  if (isMock) {
    return { mock: true };
  }

  const teamParam = process.env.VERCEL_TEAM_ID ? `?teamId=${process.env.VERCEL_TEAM_ID}` : '';
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `https://api.vercel.com${endpoint}${teamParam ? `${separator}${teamParam.slice(1)}` : ''}`;
  
  const headers = {
    'Authorization': `Bearer ${VERCEL_TOKEN}`,
    'Content-Type': 'application/json',
    ...options.headers
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Vercel API Error (${response.status}): ${errorText}`);
  }
  return response.json();
}

module.exports = {
  isMock,
  vercelRequest
};
