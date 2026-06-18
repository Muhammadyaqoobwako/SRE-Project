const { vercelRequest, isMock } = require('../vercelClient');

async function listProjects() {
  if (isMock) {
    return {
      content: [{
        type: "text",
        text: JSON.stringify([
          {
            id: "prj_mock123",
            name: "modern-app-frontend",
            framework: "vite",
            updatedAt: Date.now()
          }
        ], null, 2)
      }]
    };
  }

  try {
    const data = await vercelRequest('/v9/projects');
    return {
      content: [{ type: "text", text: JSON.stringify(data.projects, null, 2) }]
    };
  } catch (err) {
    throw new Error(`listProjects failed: ${err.message}`);
  }
}

module.exports = listProjects;
