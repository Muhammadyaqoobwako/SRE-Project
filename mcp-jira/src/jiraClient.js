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

const JIRA_API_TOKEN = (process.env.JIRA_API_TOKEN || '').trim();
const JIRA_HOST = (process.env.JIRA_HOST || 'https://muhammadyaqoobwako.atlassian.net/').trim();
const JIRA_EMAIL = (process.env.JIRA_EMAIL || 'muhammadyaqoobwako@gmail.com').trim();
const isMock = !JIRA_API_TOKEN || JIRA_API_TOKEN.startsWith('mock');

async function jiraRequest(endpoint, options = {}) {
  if (isMock) {
    return { mock: true };
  }

  const url = `${JIRA_HOST.replace(/\/$/, '')}/rest/api/3${endpoint}`;
  const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');
  const headers = {
    'Authorization': `Basic ${auth}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...options.headers
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Jira API Error (${response.status}): ${errorText}`);
  }
  return response.json();
}

module.exports = {
  isMock,
  jiraRequest
};
