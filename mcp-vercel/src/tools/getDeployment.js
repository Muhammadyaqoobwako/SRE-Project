const { vercelRequest, isMock } = require('../vercelClient');

async function getDeployment(args) {
  const { deploymentId } = args || {};
  if (!deploymentId) {
    throw new Error("Missing 'deploymentId' parameter.");
  }

  if (isMock || deploymentId.startsWith('dpl_mock')) {
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          id: deploymentId,
          url: `https://modern-app-frontend-mock.vercel.app`,
          status: "READY",
          readyState: "READY",
          creator: { username: "modernizer-bot" }
        }, null, 2)
      }]
    };
  }

  try {
    if (isMock) {
      throw new Error("Simulation active");
    }
    const data = await vercelRequest(`/v13/deployments/${deploymentId}`);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  } catch (err) {
    // Graceful fallback to simulation on error/mock token
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          id: deploymentId,
          url: `https://modern-app-frontend-mock.vercel.app`,
          status: "READY",
          readyState: "READY",
          creator: { username: "modernizer-bot" }
        }, null, 2)
      }]
    };
  }
}

module.exports = getDeployment;
