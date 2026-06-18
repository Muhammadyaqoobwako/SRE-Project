const { exec } = require('child_process');

function checkDocker() {
  return new Promise((resolve) => {
    exec('docker --version', (err) => {
      resolve(!err);
    });
  });
}

async function runContainer(args) {
  const { image, name, ports = [], env = [] } = args || {};
  if (!image || !name) {
    throw new Error("Missing 'image' or 'name' parameter.");
  }

  const hasDocker = await checkDocker();
  
  // Format flags
  const portFlags = ports.map(p => `-p ${p}`).join(' ');
  const envFlags = env.map(e => `-e ${e}`).join(' ');

  if (!hasDocker) {
    return {
      content: [{
        type: "text",
        text: `[SIMULATED] Docker is not available. Simulating: docker run -d --name ${name} ${portFlags} ${envFlags} ${image}\nSuccessfully started container '${name}' (ID: sim-${Math.random().toString(36).substring(7)})`
      }]
    };
  }

  return new Promise((resolve) => {
    const cmd = `docker run -d --name "${name}" ${portFlags} ${envFlags} "${image}"`;
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        resolve({
          content: [{
            type: "text",
            text: `Failed to run container ${name}:\nError: ${err.message}\nStderr: ${stderr}`
          }]
        });
      } else {
        resolve({
          content: [{
            type: "text",
            text: `Successfully started container ${name}.\nContainer ID: ${stdout.trim()}`
          }]
        });
      }
    });
  });
}

module.exports = runContainer;
