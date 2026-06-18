const readline = require('readline');
const { exec } = require('child_process');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const tools = [
  {
    name: "runPlaywrightTests",
    description: "Runs all Playwright automated end-to-end tests.",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "runPlaywrightTestByName",
    description: "Runs a specific Playwright test by its scenario name or title pattern.",
    inputSchema: {
      type: "object",
      properties: {
        testName: { type: "string", description: "Exact title or regular expression pattern of the test" }
      },
      required: ["testName"]
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
        serverInfo: { name: "mcp-playwright", version: "1.0.0" }
      });
    } else if (method === "tools/list") {
      sendResponse(id, { tools });
    } else if (method === "tools/call") {
      const { name, arguments: args } = params || {};
      let result;

      switch (name) {
        case "runPlaywrightTests":
          result = await runTests();
          break;
        case "runPlaywrightTestByName":
          result = await runTestByName(args.testName);
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

function runTests() {
  return new Promise((resolve) => {
    const testDir = path.resolve(__dirname, '../../modern-app/playwright-tests');
    
    // Execute Playwright command in the tests directory
    exec('npx playwright test', { cwd: testDir }, (error, stdout, stderr) => {
      // Return output to LLM client. Note that failing tests will return exit code 1, which generates error, but we still want to report stdout/stderr.
      const output = `STDOUT:\n${stdout}\n\nSTDERR:\n${stderr}`;
      resolve({
        content: [{
          type: "text",
          text: `Playwright run completed.\nExit Code: ${error ? error.code : 0}\n\n${output}`
        }]
      });
    });
  });
}

function runTestByName(testName) {
  return new Promise((resolve) => {
    const testDir = path.resolve(__dirname, '../../modern-app/playwright-tests');
    const escapedName = testName.replace(/"/g, '\\"');
    
    exec(`npx playwright test -g "${escapedName}"`, { cwd: testDir }, (error, stdout, stderr) => {
      const output = `STDOUT:\n${stdout}\n\nSTDERR:\n${stderr}`;
      resolve({
        content: [{
          type: "text",
          text: `Playwright run completed for test matching: "${testName}".\nExit Code: ${error ? error.code : 0}\n\n${output}`
        }]
      });
    });
  });
}

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
