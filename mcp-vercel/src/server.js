const readline = require('readline');
const deployProject = require('./tools/deployProject');
const listProjects = require('./tools/listProjects');
const getDeployment = require('./tools/getDeployment');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const tools = [
  {
    name: "deployProject",
    description: "Deploys a local project folder/path to Vercel.",
    inputSchema: {
      type: "object",
      properties: {
        projectPath: { type: "string", description: "Absolute path to the project to deploy" }
      },
      required: ["projectPath"]
    }
  },
  {
    name: "listProjects",
    description: "Lists all Vercel projects inside the configured team/account.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "getDeployment",
    description: "Retrieves details and status of a Vercel deployment.",
    inputSchema: {
      type: "object",
      properties: {
        deploymentId: { type: "string", description: "Vercel deployment ID" }
      },
      required: ["deploymentId"]
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
        serverInfo: { name: "mcp-vercel", version: "1.0.0" }
      });
    } else if (method === "tools/list") {
      sendResponse(id, { tools });
    } else if (method === "tools/call") {
      const { name, arguments: args } = params || {};
      let result;
      
      switch (name) {
        case "deployProject":
          result = await deployProject(args);
          break;
        case "listProjects":
          result = await listProjects();
          break;
        case "getDeployment":
          result = await getDeployment(args);
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
