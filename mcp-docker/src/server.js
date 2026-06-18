const readline = require('readline');
const buildImage = require('./tools/buildImage');
const runContainer = require('./tools/runContainer');
const getLogs = require('./tools/getLogs');
const stopContainer = require('./tools/stopContainer');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const tools = [
  {
    name: "buildImage",
    description: "Builds a Docker image using a Dockerfile.",
    inputSchema: {
      type: "object",
      properties: {
        dockerfilePath: { type: "string", description: "Absolute path to the Dockerfile" },
        tag: { type: "string", description: "Tag for the built image (e.g. app-backend:latest)" }
      },
      required: ["dockerfilePath", "tag"]
    }
  },
  {
    name: "runContainer",
    description: "Runs a Docker container from an image.",
    inputSchema: {
      type: "object",
      properties: {
        image: { type: "string", description: "Image tag to run" },
        name: { type: "string", description: "Name to assign to the container" },
        ports: { 
          type: "array", 
          items: { type: "string" }, 
          description: "List of port mappings (e.g. ['5000:5000'])" 
        },
        env: { 
          type: "array", 
          items: { type: "string" }, 
          description: "List of env vars (e.g. ['NODE_ENV=production'])" 
        }
      },
      required: ["image", "name"]
    }
  },
  {
    name: "getLogs",
    description: "Retrieves logs from a running container.",
    inputSchema: {
      type: "object",
      properties: {
        containerId: { type: "string", description: "Container ID or Name" }
      },
      required: ["containerId"]
    }
  },
  {
    name: "stopContainer",
    description: "Stops and removes a running container.",
    inputSchema: {
      type: "object",
      properties: {
        containerId: { type: "string", description: "Container ID or Name" }
      },
      required: ["containerId"]
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
        serverInfo: { name: "mcp-docker", version: "1.0.0" }
      });
    } else if (method === "tools/list") {
      sendResponse(id, { tools });
    } else if (method === "tools/call") {
      const { name, arguments: args } = params || {};
      let result;
      
      switch (name) {
        case "buildImage":
          result = await buildImage(args);
          break;
        case "runContainer":
          result = await runContainer(args);
          break;
        case "getLogs":
          result = await getLogs(args);
          break;
        case "stopContainer":
          result = await stopContainer(args);
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
