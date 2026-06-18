const path = require('path');
const { MCPServerClient, callLLM } = require('../agent');
const modPrompts = require('../prompts/modernization');

async function runMigrate() {
  console.log("=== Starting Migrate Workflow ===");

  const fsClient = new MCPServerClient("filesystem", "mcp-filesystem/src/server.js");
  const githubClient = new MCPServerClient("github", "mcp-github/src/server.js");

  try {
    console.log("Launching Filesystem MCP...");
    await fsClient.start();
    console.log("Launching GitHub MCP...");
    await githubClient.start();

    // 1. Read legacy code for context
    const legacyPath = path.resolve(__dirname, '../../../legacy-app/VB6/Fast-Food-Management-System-master');
    console.log(`Scanning legacy codebase at: ${legacyPath}`);
    
    const listResult = await fsClient.callTool("listDirectory", { path: legacyPath });
    const files = JSON.parse(listResult.content[0].text);
    console.log(`Found legacy files for migration: ${files.map(f => f.name).join(', ')}`);

    let fullCodebase = "";
    for (const file of files) {
      if (file.isFile && (file.name.endsWith('.frm') || file.name.endsWith('.bas') || file.name.endsWith('.vbp'))) {
        const filePath = path.join(legacyPath, file.name);
        const fileContent = await fsClient.callTool("readFile", { path: filePath });
        fullCodebase += `\n\n--- File: ${file.name} ---\n${fileContent.content[0].text}`;
      }
    }

    // 2. Generate Express Backend
    console.log("Generating modern Express backend...");
    const backendCode = await callLLM(
      "You are a backend engineer. Output only clean JavaScript Express code.",
      modPrompts.migrateBackend(fullCodebase, 'modDatabase.bas')
    );
    const backendFile = path.resolve(__dirname, '../../../modern-app/backend/src/index.js');
    await fsClient.callTool("writeFile", { path: backendFile, content: backendCode });

    // Write Backend package.json
    const backendPkg = {
      name: "modern-backend",
      version: "1.0.0",
      main: "src/index.js",
      scripts: {
        start: "node src/index.js"
      },
      dependencies: {
        express: "^4.18.2",
        cors: "^2.8.5",
        sqlite3: "^5.1.6"
      }
    };
    await fsClient.callTool("writeFile", {
      path: path.resolve(__dirname, '../../../modern-app/backend/package.json'),
      content: JSON.stringify(backendPkg, null, 2)
    });

    // Write Backend Dockerfile
    const backendDockerfile = `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "src/index.js"]
`;
    await fsClient.callTool("writeFile", {
      path: path.resolve(__dirname, '../../../modern-app/backend/Dockerfile'),
      content: backendDockerfile
    });

    // 3. Generate React Frontend
    console.log("Generating modern React frontend...");
    const frontendCode = await callLLM(
      "You are a frontend developer. Output only clean React code.",
      modPrompts.migrateFrontend(fullCodebase, 'legacy Fast Food Management files')
    );
    const frontendFile = path.resolve(__dirname, '../../../modern-app/frontend/src/App.jsx');
    await fsClient.callTool("writeFile", { path: frontendFile, content: frontendCode });

    // Write Frontend package.json
    const frontendPkg = {
      name: "modern-frontend",
      version: "1.0.0",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview"
      },
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0"
      },
      devDependencies: {
        vite: "^4.4.5"
      }
    };
    await fsClient.callTool("writeFile", {
      path: path.resolve(__dirname, '../../../modern-app/frontend/package.json'),
      content: JSON.stringify(frontendPkg, null, 2)
    });

    // Write Frontend Dockerfile
    const frontendDockerfile = `FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
`;
    await fsClient.callTool("writeFile", {
      path: path.resolve(__dirname, '../../../modern-app/frontend/Dockerfile'),
      content: frontendDockerfile
    });

    // Write Frontend src/main.jsx
    const mainJsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;
    await fsClient.callTool("writeFile", {
      path: path.resolve(__dirname, '../../../modern-app/frontend/src/main.jsx'),
      content: mainJsx
    });

    // Write Frontend index.html
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enterprise Modernization Platform</title>
    <!-- Premium Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
    await fsClient.callTool("writeFile", {
      path: path.resolve(__dirname, '../../../modern-app/frontend/index.html'),
      content: indexHtml
    });

    // Write Frontend vite.config.js
    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
`;
    await fsClient.callTool("writeFile", {
      path: path.resolve(__dirname, '../../../modern-app/frontend/vite.config.js'),
      content: viteConfig
    });

    // Write Premium index.css Design System
    const premiumCss = `/* PRESET PREMIUM DESIGN SYSTEM */
:root {
  --bg-gradient: linear-gradient(135deg, #0f0f15 0%, #151522 50%, #1a1a2e 100%);
  --panel-bg: rgba(26, 26, 46, 0.45);
  --panel-border: rgba(255, 255, 255, 0.08);
  --primary: #6c5ce7;
  --primary-hover: #5849c4;
  --primary-glow: rgba(108, 92, 231, 0.45);
  
  --success: #00b894;
  --success-hover: #009477;
  --success-glow: rgba(0, 184, 148, 0.4);
  
  --warning: #fdcb6e;
  --warning-bg: rgba(253, 203, 110, 0.15);
  --warning-border: rgba(253, 203, 110, 0.3);
  
  --text-main: #f5f6fa;
  --text-muted: #a0a8c0;
  --card-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.6);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg-gradient);
  color: var(--text-main);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 50px;
}

.app-header h1 {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(90deg, #a55eea, #45aaf2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
  letter-spacing: -1px;
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.15rem;
  font-weight: 300;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

@media (max-width: 900px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

.card {
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  border-radius: 24px;
  padding: 30px;
  box-shadow: var(--card-shadow);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.15);
}

h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 25px;
  background: linear-gradient(90deg, #ffffff, var(--text-muted));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.modern-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

input {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 14px 18px;
  color: var(--text-main);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

button {
  border: none;
  border-radius: 12px;
  padding: 15px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.2s ease;
}

button:active {
  transform: scale(0.98);
}

.btn-primary {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 4px 15px 0 var(--primary-glow);
}

.btn-primary:hover {
  background: var(--primary-hover);
}

.btn-success {
  background: var(--success);
  color: #fff;
  box-shadow: 0 4px 15px 0 var(--success-glow);
}

.btn-success:hover {
  background: var(--success-hover);
}

.list-section h3 {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--text-muted);
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

li {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s ease;
}

li:hover {
  background: rgba(255, 255, 255, 0.06);
}

.email-text {
  color: var(--primary);
}

.alert-box {
  background: var(--warning-bg);
  border: 1px solid var(--warning-border);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 25px;
}

.alert-box h4 {
  color: var(--warning);
  font-weight: 600;
  margin-bottom: 10px;
}

.alert-item {
  background: transparent;
  border: none;
  padding: 5px 0;
  color: #fff;
  display: list-item;
  list-style-type: disc;
  margin-left: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th {
  text-align: left;
  padding: 12px;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

td {
  padding: 14px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.table-row-low td {
  color: var(--warning);
  font-weight: 600;
}
`;
    await fsClient.callTool("writeFile", {
      path: path.resolve(__dirname, '../../../modern-app/frontend/src/index.css'),
      content: premiumCss
    });

    console.log("Modern codebase successfully generated and styled!");

    // 4. Version Control and PR via GitHub
    console.log("Working on GitHub integration...");
    const branchName = "feature/modern-migration";
    
    await githubClient.callTool("createBranch", { branch: branchName });
    
    // Commit the core components
    await githubClient.callTool("commitFile", {
      path: "modern-app/backend/src/index.js",
      content: backendCode,
      message: "feat: migrate and initialize modern express database routing",
      branch: branchName
    });

    await githubClient.callTool("commitFile", {
      path: "modern-app/frontend/src/App.jsx",
      content: frontendCode,
      message: "feat: migrate and initialize modern React frontend UI forms",
      branch: branchName
    });

    // Create a pull request
    await githubClient.callTool("createPR", {
      title: "Migrate legacy VB6 application to Express backend and React dashboard",
      body: "Closes legacy VB6 application system. Implements modern schema, sqlite layer, REST controllers, and glassmorphic user dashboard.",
      head: branchName,
      base: "main"
    });

    console.log("GitHub tasks successfully committed and Pull Request opened!");
  } catch (err) {
    console.error("Error running Migrate workflow:", err.message);
  } finally {
    fsClient.stop();
    githubClient.stop();
    console.log("=== Migrate Workflow Finished ===\n");
  }
}

module.exports = runMigrate;
