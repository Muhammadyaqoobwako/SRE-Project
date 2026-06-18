const readline = require('readline');
const createEpic = require('./tools/createEpic');
const createStory = require('./tools/createStory');
const createTask = require('./tools/createTask');
const updateIssue = require('./tools/updateIssue');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const tools = [
  {
    name: "createEpic",
    description: "Creates a new Epic in Jira.",
    inputSchema: {
      type: "object",
      properties: {
        summary: { type: "string" },
        description: { type: "string" },
        projectKey: { type: "string", description: "Default 'MOD'" }
      },
      required: ["summary"]
    }
  },
  {
    name: "createStory",
    description: "Creates a new Story in Jira, optionally linked to an Epic parent.",
    inputSchema: {
      type: "object",
      properties: {
        summary: { type: "string" },
        description: { type: "string" },
        epicId: { type: "string", description: "Epic Key or ID to link to" },
        projectKey: { type: "string", description: "Default 'MOD'" }
      },
      required: ["summary"]
    }
  },
  {
    name: "createTask",
    description: "Creates a new Task in Jira, optionally linked to a parent issue.",
    inputSchema: {
      type: "object",
      properties: {
        summary: { type: "string" },
        description: { type: "string" },
        parentId: { type: "string", description: "Parent Key or ID to link to" },
        projectKey: { type: "string", description: "Default 'MOD'" }
      },
      required: ["summary"]
    }
  },
  {
    name: "updateIssue",
    description: "Transitions the status of a Jira issue.",
    inputSchema: {
      type: "object",
      properties: {
        issueId: { type: "string", description: "Jira issue key/ID" },
        status: { type: "string", description: "New status or transition name (e.g. In Progress, Done)" }
      },
      required: ["issueId", "status"]
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
        serverInfo: { name: "mcp-jira", version: "1.0.0" }
      });
    } else if (method === "tools/list") {
      sendResponse(id, { tools });
    } else if (method === "tools/call") {
      const { name, arguments: args } = params || {};
      let result;
      
      switch (name) {
        case "createEpic":
          result = await createEpic(args);
          break;
        case "createStory":
          result = await createStory(args);
          break;
        case "createTask":
          result = await createTask(args);
          break;
        case "updateIssue":
          result = await updateIssue(args);
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
