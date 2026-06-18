const { exec } = require('child_process');

function checkDocker() {
  return new Promise((resolve) => {
    exec('docker --version', (err) => {
      resolve(!err);
    });
  });
}

async function getLogs(args) {
  const { containerId } = args || {};
  if (!containerId) {
    throw new Error("Missing 'containerId' parameter.");
  }

  const hasDocker = await checkDocker();

  if (!hasDocker || containerId.startsWith('sim-')) {
    return {
      content: [{
        type: "text",
        text: `[SIMULATED LOGS for ${containerId}]:\n` +
              `> modern-backend@1.0.0 start /app\n` +
              `> node src/index.js\n\n` +
              `[2026-06-08 13:20:10] INFO: Connecting to database...\n` +
              `[2026-06-08 13:20:11] INFO: Database connected successfully.\n` +
              `[2026-06-08 13:20:11] INFO: Modern API Server listening on port 5000\n` +
              `[2026-06-08 13:20:15] GET /api/customers - 200 OK - 12ms\n` +
              `[2026-06-08 13:20:18] GET /api/inventory - 200 OK - 8ms\n`
      }]
    };
  }

  return new Promise((resolve) => {
    const cmd = `docker logs "${containerId}"`;
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        resolve({
          content: [{
            type: "text",
            text: `Failed to get logs for container ${containerId}:\nError: ${err.message}\nStderr: ${stderr}`
          }]
        });
      } else {
        resolve({
          content: [{
            type: "text",
            text: `Logs for container ${containerId}:\nStdout:\n${stdout}\nStderr:\n${stderr}`
          }]
        });
      }
    });
  });
}

module.exports = getLogs;
