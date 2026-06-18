const readline = require('readline');
const getRepo = require('./tools/getRepo');
const createBranch = require('./tools/createBranch');
const commitFile = require('./tools/commitFile');
const createPR = require('./tools/createPR');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const tools = [
  {
    name: "getRepo",
    description: "Retrieves metadata about a GitHub repository.",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string" },
        repo: { type: "string" }
      }
    }
  },
  {
    name: "createBranch",
    description: "Creates a new Git branch from a base branch.",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string" },
        repo: { type: "string" },
        branch: { type: "string", description: "Name of new branch" },
        base: { type: "string", description: "Base branch (default main)" }
      },
      required: ["branch"]
    }
  },
  {
    name: "commitFile",
    description: "Commits a single file's content directly to a branch.",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string" },
        repo: { type: "string" },
        path: { type: "string", description: "Relative file path inside the repo" },
        content: { type: "string", description: "File content string" },
        message: { type: "string", description: "Commit message" },
        branch: { type: "string", description: "Target branch" }
      },
      required: ["path", "content"]
    }
  },
  {
    name: "createPR",
    description: "Creates a new Pull Request.",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string" },
        repo: { type: "string" },
        title: { type: "string" },
        body: { type: "string" },
        head: { type: "string", description: "Branch containing changes" },
        base: { type: "string", description: "Branch to merge into" }
      },
      required: ["title", "head"]
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
        serverInfo: { name: "mcp-github", version: "1.0.0" }
      });
    } else if (method === "tools/list") {
      sendResponse(id, { tools });
    } else if (method === "tools/call") {
      const { name, arguments: args } = params || {};
      let result;
      
      switch (name) {
        case "getRepo":
          result = await getRepo(args);
          break;
        case "createBranch":
          result = await createBranch(args);
          break;
        case "commitFile":
          result = await commitFile(args);
          break;
        case "createPR":
          result = await createPR(args);
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
