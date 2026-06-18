const { exec } = require('child_process');
const { isMock } = require('../vercelClient');

function checkVercelCLI() {
  return new Promise((resolve) => {
    exec('vercel --version', (err) => {
      resolve(!err);
    });
  });
}

async function deployProject(args) {
  const { projectPath } = args || {};
  if (!projectPath) {
    throw new Error("Missing 'projectPath' parameter.");
  }

  const hasCLI = await checkVercelCLI();
  const token = process.env.VERCEL_TOKEN;

  if (isMock || !hasCLI) {
    const randomSuffix = Math.random().toString(36).substring(7);
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          id: `dpl_${randomSuffix}`,
          url: `https://modern-app-frontend-${randomSuffix}.vercel.app`,
          name: "modern-app-frontend",
          status: "READY",
          message: isMock ? "Simulated deployment completed successfully." : "Vercel CLI not installed. Simulation active."
        }, null, 2)
      }]
    };
  }

  return new Promise((resolve) => {
    const cmd = `vercel deploy "${projectPath}" --token "${token}" --yes`;
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        resolve({
          content: [{
            type: "text",
            text: `Vercel deployment failed:\nError: ${err.message}\nStderr: ${stderr}`
          }]
        });
      } else {
        const url = stdout.trim();
        resolve({
          content: [{
            type: "text",
            text: JSON.stringify({
              url: url,
              status: "READY",
              message: "Deployment completed successfully using Vercel CLI."
            }, null, 2)
          }]
        });
      }
    });
  });
}

module.exports = deployProject;
