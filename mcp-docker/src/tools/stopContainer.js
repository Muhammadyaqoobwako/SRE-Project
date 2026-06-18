const { exec } = require('child_process');

function checkDocker() {
  return new Promise((resolve) => {
    exec('docker --version', (err) => {
      resolve(!err);
    });
  });
}

async function stopContainer(args) {
  const { containerId } = args || {};
  if (!containerId) {
    throw new Error("Missing 'containerId' parameter.");
  }

  const hasDocker = await checkDocker();

  if (!hasDocker || containerId.startsWith('sim-')) {
    return {
      content: [{
        type: "text",
        text: `[SIMULATED] Successfully stopped and removed container '${containerId}'.`
      }]
    };
  }

  return new Promise((resolve) => {
    const cmd = `docker stop "${containerId}" && docker rm "${containerId}"`;
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        resolve({
          content: [{
            type: "text",
            text: `Failed to stop container ${containerId}:\nError: ${err.message}\nStderr: ${stderr}`
          }]
        });
      } else {
        resolve({
          content: [{
            type: "text",
            text: `Successfully stopped and removed container ${containerId}.\nStdout:\n${stdout}`
          }]
        });
      }
    });
  });
}

module.exports = stopContainer;
