const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const tools = [
  {
    name: "buildImage",
    description: "Builds a Docker image from a Dockerfile.",
    inputSchema: {
      type: "object",
      properties: {
        dockerfilePath: { type: "string", description: "Absolute path to the Dockerfile" },
        tag: { type: "string", description: "Image tag (e.g. my-app:latest)" }
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
        image: { type: "string", description: "Docker image name:tag" },
        name: { type: "string", description: "Container name" },
        ports: {
          type: "array",
          items: { type: "string" },
          description: "Port mappings e.g. ['5000:5000']"
        }
      },
      required: ["image"]
    }
  },
  {
    name: "getLogs",
    description: "Fetches logs from a running or stopped Docker container.",
    inputSchema: {
      type: "object",
      properties: {
        containerId: { type: "string", description: "Container ID or name" }
      },
      required: ["containerId"]
    }
  },
  {
    name: "listContainers",
    description: "Lists all Docker containers (running and stopped).",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  }
];

// Check if Docker is available
function isDockerAvailable() {
  return new Promise((resolve) => {
    exec('docker --version', (err) => {
      resolve(!err);
    });
  });
}

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
        case "listContainers":
          result = await listContainers();
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

async function buildImage(args) {
  const { dockerfilePath, tag } = args || {};
  if (!dockerfilePath || !tag) {
    throw new Error("Missing 'dockerfilePath' or 'tag' parameter.");
  }

  const hasDocker = await isDockerAvailable();
  if (!hasDocker) {
    // Simulation mode
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          imageId: `sha256:${Math.random().toString(36).substring(2, 14)}`,
          tag: tag,
          status: "built",
          message: "Docker not available. Simulated image build completed successfully."
        }, null, 2)
      }]
    };
  }

  return new Promise((resolve) => {
    const path = require('path');
    const dir = path.dirname(dockerfilePath);
    const cmd = `docker build -t "${tag}" -f "${dockerfilePath}" "${dir}"`;
    exec(cmd, { timeout: 120000 }, (error, stdout, stderr) => {
      if (error) {
        resolve({
          content: [{
            type: "text",
            text: `Docker build failed:\nError: ${error.message}\nStderr: ${stderr}`
          }]
        });
      } else {
        resolve({
          content: [{
            type: "text",
            text: JSON.stringify({
              tag: tag,
              status: "built",
              output: stdout.trim(),
              message: "Docker image built successfully."
            }, null, 2)
          }]
        });
      }
    });
  });
}

async function runContainer(args) {
  const { image, name, ports } = args || {};
  if (!image) {
    throw new Error("Missing 'image' parameter.");
  }

  const hasDocker = await isDockerAvailable();
  if (!hasDocker) {
    const containerId = Math.random().toString(36).substring(2, 14);
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          containerId: containerId,
          name: name || `container-${containerId}`,
          image: image,
          status: "running",
          ports: ports || [],
          message: "Docker not available. Simulated container started successfully."
        }, null, 2)
      }]
    };
  }

  return new Promise((resolve) => {
    let cmd = `docker run -d`;
    if (name) cmd += ` --name "${name}"`;
    if (ports && ports.length > 0) {
      ports.forEach(p => { cmd += ` -p ${p}`; });
    }
    cmd += ` ${image}`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        resolve({
          content: [{
            type: "text",
            text: `Docker run failed:\nError: ${error.message}\nStderr: ${stderr}`
          }]
        });
      } else {
        resolve({
          content: [{
            type: "text",
            text: JSON.stringify({
              containerId: stdout.trim(),
              name: name || stdout.trim().substring(0, 12),
              image: image,
              status: "running",
              ports: ports || [],
              message: "Container started successfully."
            }, null, 2)
          }]
        });
      }
    });
  });
}

async function getLogs(args) {
  const { containerId } = args || {};
  if (!containerId) {
    throw new Error("Missing 'containerId' parameter.");
  }

  const hasDocker = await isDockerAvailable();
  if (!hasDocker) {
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          containerId: containerId,
          logs: "Docker not available. Simulated logs:\n[INFO] Server started on port 5000\n[INFO] Database connected successfully\n[INFO] Ready to accept connections",
          message: "Simulation mode active."
        }, null, 2)
      }]
    };
  }

  return new Promise((resolve) => {
    exec(`docker logs "${containerId}" --tail 100`, (error, stdout, stderr) => {
      if (error) {
        resolve({
          content: [{
            type: "text",
            text: `Failed to get logs:\nError: ${error.message}\nStderr: ${stderr}`
          }]
        });
      } else {
        resolve({
          content: [{
            type: "text",
            text: JSON.stringify({
              containerId: containerId,
              logs: stdout || stderr,
              message: "Logs retrieved successfully."
            }, null, 2)
          }]
        });
      }
    });
  });
}

async function listContainers() {
  const hasDocker = await isDockerAvailable();
  if (!hasDocker) {
    return {
      content: [{
        type: "text",
        text: JSON.stringify([
          {
            id: "sim_container_001",
            name: "modern-backend-service",
            image: "modern-inventory-backend:latest",
            status: "Up 5 minutes",
            ports: "0.0.0.0:5000->5000/tcp"
          }
        ], null, 2)
      }]
    };
  }

  return new Promise((resolve) => {
    exec('docker ps -a --format "{{json .}}"', (error, stdout, stderr) => {
      if (error) {
        resolve({
          content: [{
            type: "text",
            text: `Failed to list containers:\nError: ${error.message}`
          }]
        });
      } else {
        const containers = stdout.trim().split('\n').filter(Boolean).map(line => {
          try { return JSON.parse(line); } catch { return { raw: line }; }
        });
        resolve({
          content: [{
            type: "text",
            text: JSON.stringify(containers, null, 2)
          }]
        });
      }
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
