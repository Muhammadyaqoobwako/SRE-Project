const fs = require('fs').promises;
const path = require('path');

async function writeFile(args) {
  const { path: filePath, content } = args;
  if (!filePath) {
    throw new Error("Missing 'path' argument.");
  }
  if (content === undefined) {
    throw new Error("Missing 'content' argument.");
  }

  const absolutePath = path.resolve(filePath);
  try {
    await fs.mkdir(path.dirname(absolutePath), { recursive: true });
    await fs.writeFile(absolutePath, content, 'utf-8');
    return {
      content: [{ type: "text", text: `Successfully wrote file to ${absolutePath}` }]
    };
  } catch (err) {
    throw new Error(`Failed to write file to ${absolutePath}: ${err.message}`);
  }
}

module.exports = writeFile;
