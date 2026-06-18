const readline = require('readline');
const { connectDb } = require('./mongodbClient');
const queryDocuments = require('./tools/queryDocuments');
const insertDocument = require('./tools/insertDocument');
const updateDocument = require('./tools/updateDocument');
const deleteDocument = require('./tools/deleteDocument');
const listCollections = require('./tools/listCollections');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const tools = [
  {
    name: "queryDocuments",
    description: "Queries/finds documents in a MongoDB collection.",
    inputSchema: {
      type: "object",
      properties: {
        collection: { type: "string" },
        filter: { type: "object", description: "Query query filter, e.g. { 'name': 'John' }" }
      },
      required: ["collection"]
    }
  },
  {
    name: "insertDocument",
    description: "Inserts a new document into a collection.",
    inputSchema: {
      type: "object",
      properties: {
        collection: { type: "string" },
        document: { type: "object", description: "Document fields to insert" }
      },
      required: ["collection", "document"]
    }
  },
  {
    name: "updateDocument",
    description: "Updates document(s) matching a filter query in a collection.",
    inputSchema: {
      type: "object",
      properties: {
        collection: { type: "string" },
        filter: { type: "object", description: "Filter selection query" },
        update: { type: "object", description: "Updates to apply or $set object" }
      },
      required: ["collection", "filter", "update"]
    }
  },
  {
    name: "deleteDocument",
    description: "Deletes matching document(s) from a collection.",
    inputSchema: {
      type: "object",
      properties: {
        collection: { type: "string" },
        filter: { type: "object", description: "Filter query to identify target deletion documents" }
      },
      required: ["collection", "filter"]
    }
  },
  {
    name: "listCollections",
    description: "Lists all collections in the current database.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

// Establish database connection first
connectDb().then(() => {
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
          serverInfo: { name: "mcp-mongodb", version: "1.0.0" }
        });
      } else if (method === "tools/list") {
        sendResponse(id, { tools });
      } else if (method === "tools/call") {
        const { name, arguments: args } = params || {};
        let result;
        
        switch (name) {
          case "queryDocuments":
            result = await queryDocuments(args);
            break;
          case "insertDocument":
            result = await insertDocument(args);
            break;
          case "updateDocument":
            result = await updateDocument(args);
            break;
          case "deleteDocument":
            result = await deleteDocument(args);
            break;
          case "listCollections":
            result = await listCollections();
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
}).catch(err => {
  console.error("Critical: Failed to launch database server connection: " + err.message);
  process.exit(1);
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
