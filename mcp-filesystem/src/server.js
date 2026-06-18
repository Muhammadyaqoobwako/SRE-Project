const readline = require('readline');
const readFile = require('./tools/readFile');
const writeFile = require('./tools/writeFile');
const listDirectory = require('./tools/listDirectory');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const tools = [
  {
    name: "readFile",
    description: "Reads the content of a file from disk.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Absolute or relative file path" }
      },
      required: ["path"]
    }
  },
  {
    name: "writeFile",
    description: "Writes content to a file on disk (creating folders if they don't exist).",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Absolute or relative file path" },
        content: { type: "string", description: "Text content to write" }
      },
      required: ["path", "content"]
    }
  },
  {
    name: "listDirectory",
    description: "Lists all files and directories inside a directory.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Absolute or relative directory path" }
      },
      required: ["path"]
    }
  }
];

rl.on('line', async (line) => {
  if (!line.trim()) return;
  
  let request;
  try {
    request = JSON.parse(line);
  } catch (err) {
    sendError(null, -32700, "Parse error: " + err.message);
    return;
  }

  const { method, params, id } = request;

  try {
    if (method === "initialize") {
      sendResponse(id, {
        protocolVersion: "2024-11-05",
        capabilities: {},
        serverInfo: { name: "mcp-filesystem", version: "1.0.0" }
      });
    } else if (method === "tools/list") {
      sendResponse(id, { tools });
    } else if (method === "tools/call") {
      const { name, arguments: args } = params || {};
      let result;
      
      switch (name) {
        case "readFile":
          result = await readFile(args);
          break;
        case "writeFile":
          result = await writeFile(args);
          break;
        case "listDirectory":
          result = await listDirectory(args);
          break;
        default:
          sendError(id, -32601, `Tool not found: ${name}`);
          return;
      }
      sendResponse(id, result);
    } else {
      // Return standard response for ping or unhandled method
      sendResponse(id, {});
    }
  } catch (err) {
    sendError(id, -32603, err.message);
  }
});

function sendResponse(id, result) {
  if (id !== undefined && id !== null) {
    console.log(JSON.stringify({ jsonrpc: "2.0", id, result }));
  }
}

function sendError(id, code, message) {
  console.log(JSON.stringify({
    jsonrpc: "2.0",
    id: id || null,
    error: { code, message }
  }));
}
