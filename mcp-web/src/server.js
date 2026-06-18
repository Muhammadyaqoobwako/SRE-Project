const readline = require('readline');
const search = require('./tools/search');
const scrape = require('./tools/scrape');
const docsLookup = require('./tools/docsLookup');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const tools = [
  {
    name: "search",
    description: "Searches the web for modern development strategies, API replacements, and tech information.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" }
      },
      required: ["query"]
    }
  },
  {
    name: "scrape",
    description: "Scrapes the text/markdown content from a specific web URL.",
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "Web page URL" }
      },
      required: ["url"]
    }
  },
  {
    name: "docsLookup",
    description: "Retrieves curated documentation summaries for frameworks like Express, React, Vite.",
    inputSchema: {
      type: "object",
      properties: {
        framework: { type: "string", description: "Target framework/library name" },
        topic: { type: "string", description: "Specific topic to lookup" }
      },
      required: ["framework"]
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
        serverInfo: { name: "mcp-web", version: "1.0.0" }
      });
    } else if (method === "tools/list") {
      sendResponse(id, { tools });
    } else if (method === "tools/call") {
      const { name, arguments: args } = params || {};
      let result;
      
      switch (name) {
        case "search":
          result = await search(args);
          break;
        case "scrape":
          result = await scrape(args);
          break;
        case "docsLookup":
          result = await docsLookup(args);
          break;
        default:
          sendError(id, -32601, `Tool not found: ${name}`);
          return;
      }
      sendResponse(id, result);
    } else {
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
