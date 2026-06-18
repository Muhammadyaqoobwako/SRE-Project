const fs = require('fs').promises;
const path = require('path');

async function listDirectory(args) {
  const { path: dirPath } = args;
  if (!dirPath) {
    throw new Error("Missing 'path' argument.");
  }

  const absolutePath = path.resolve(dirPath);
  try {
    const entries = await fs.readdir(absolutePath, { withFileTypes: true });
    const formatted = entries.map(entry => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
      isFile: entry.isFile()
    }));
    
    return {
      content: [{ type: "text", text: JSON.stringify(formatted, null, 2) }]
    };
  } catch (err) {
    throw new Error(`Failed to list directory at ${absolutePath}: ${err.message}`);
  }
}

module.exports = listDirectory;
