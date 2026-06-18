async function docsLookup(args) {
  const { framework, topic } = args || {};
  if (!framework) {
    throw new Error("Missing 'framework' parameter.");
  }

  const lib = framework.toLowerCase();
  const searchTopic = (topic || '').toLowerCase();

  let documentation = "";

  if (lib === "express") {
    documentation = `ExpressJS Documentation Summary:\n` +
      `- Setup: const express = require('express'); const app = express(); app.use(express.json());\n` +
      `- Cors: app.use(require('cors')());\n` +
      `- Database Integration with sqlite3: \n` +
      `  const sqlite3 = require('sqlite3').verbose();\n` +
      `  const db = new sqlite3.Database(':memory:');\n` +
      `- Routing: app.get('/api/resource', (req, res) => { res.json(data); });\n` +
      `- Running: app.listen(port, () => console.log('Server running'));`;
  } else if (lib === "react" || lib === "vite") {
    documentation = `React + Vite SPA Documentation Summary:\n` +
      `- Setup: Initialized via npm create vite@latest.\n` +
      `- UI styling: Premium, harmonized color schemes, modern gradients and fonts.\n` +
      `- Client API requests: Use native fetch inside useEffect or async handlers:\n` +
      `  fetch('/api/customers').then(res => res.json()).then(data => setCustomers(data));\n` +
      `- Forms: Handle state using useState:\n` +
      `  const [form, setForm] = useState({ name: '', email: '' });\n` +
      `  const onChange = (e) => setForm({...form, [e.target.name]: e.target.value});`;
  } else {
    documentation = `Documentation search results for ${framework} - topic: ${topic || 'general'}:\n` +
      `- Use standard npm libraries.\n` +
      `- Ensure errors are caught using try-catch blocks.\n` +
      `- Modern CSS frameworks are recommended for grid and layouts.`;
  }

  return {
    content: [{ type: "text", text: documentation }]
  };
}

module.exports = docsLookup;
