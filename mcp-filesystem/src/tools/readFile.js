const fs = require('fs').promises;
const path = require('path');

async function readFile(args) {
  const { path: filePath } = args;
  if (!filePath) {
    throw new Error("Missing 'path' argument.");
  }
  
  // Resolve relative to absolute if necessary, but support absolute paths.
  const absolutePath = path.resolve(filePath);
  try {
    const content = await fs.readFile(absolutePath, 'utf-8');
    return {
      content: [{ type: "text", text: content }]
    };
  } catch (err) {
    throw new Error(`Failed to read file at ${absolutePath}: ${err.message}`);
  }
}

module.exports = readFile;
