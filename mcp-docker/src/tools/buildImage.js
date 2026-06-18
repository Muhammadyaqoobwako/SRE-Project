const { exec } = require('child_process');
const path = require('path');

function checkDocker() {
  return new Promise((resolve) => {
    exec('docker --version', (err) => {
      resolve(!err);
    });
  });
}

async function buildImage(args) {
  const { dockerfilePath, tag } = args || {};
  if (!dockerfilePath || !tag) {
    throw new Error("Missing 'dockerfilePath' or 'tag' parameter.");
  }

  const hasDocker = await checkDocker();
  const dir = path.dirname(dockerfilePath);
  const file = path.basename(dockerfilePath);

  if (!hasDocker) {
    return {
      content: [{
        type: "text",
        text: `[SIMULATED] Docker is not available. Simulating: docker build -f ${file} -t ${tag} ${dir}\nSuccessfully built image '${tag}' (simulated).`
      }]
    };
  }

  return new Promise((resolve) => {
    const cmd = `docker build -f "${dockerfilePath}" -t "${tag}" "${dir}"`;
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        resolve({
          content: [{
            type: "text",
            text: `Failed to build image ${tag}:\nError: ${err.message}\nStderr: ${stderr}`
          }]
        });
      } else {
        resolve({
          content: [{
            type: "text",
            text: `Successfully built image ${tag}.\nStdout:\n${stdout}`
          }]
        });
      }
    });
  });
}

module.exports = buildImage;
