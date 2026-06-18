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

const GITHUB_TOKEN = (process.env.GITHUB_TOKEN || '').trim();
const isMock = !GITHUB_TOKEN || GITHUB_TOKEN.startsWith('mock');

async function githubRequest(endpoint, options = {}) {
  if (isMock) {
    return { mock: true };
  }

  const url = `https://api.github.com${endpoint}`;
  const headers = {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Antigravity-Modernization-Agent',
    ...options.headers
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API Error (${response.status}): ${errorText}`);
  }
  return response.json();
}

module.exports = {
  isMock,
  githubRequest,
  getRepoConfig: () => ({
    owner: process.env.GITHUB_OWNER || 'modernizer-org',
    repo: process.env.GITHUB_REPO || 'modern-inventory-app'
  })
};
