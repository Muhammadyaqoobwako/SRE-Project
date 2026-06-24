const path = require('path');
const { MCPServerClient } = require('../agent');

async function runDeploy() {
  console.log("=== Starting Deploy Workflow (Vercel Only) ===");

  const vercelClient = new MCPServerClient("vercel", "mcp-vercel/src/server.js");

  try {
    console.log("Launching Vercel MCP...");
    await vercelClient.start();

    // 1. Deploy Frontend to Vercel
    const frontendPath = path.resolve(__dirname, '../../../modern-app/frontend');
    console.log(`Deploying frontend to Vercel from: ${frontendPath}`);
    
    const frontendDeployResult = await vercelClient.callTool("deployProject", {
      projectPath: frontendPath
    });
    const frontendData = JSON.parse(frontendDeployResult.content[0].text);
    console.log(`Frontend deployment created. URL: ${frontendData.url}`);

    // 2. Deploy Backend to Vercel (as serverless functions)
    const backendPath = path.resolve(__dirname, '../../../modern-app/backend');
    console.log(`Deploying backend to Vercel from: ${backendPath}`);
    
    const backendDeployResult = await vercelClient.callTool("deployProject", {
      projectPath: backendPath
    });
    const backendData = JSON.parse(backendDeployResult.content[0].text);
    console.log(`Backend deployment created. URL: ${backendData.url}`);

    // 3. Check frontend deployment status
    if (frontendData.id) {
      console.log(`Checking frontend deployment status for ID: ${frontendData.id}`);
      const frontendStatus = await vercelClient.callTool("getDeployment", {
        deploymentId: frontendData.id
      });
      const frontendStatusData = JSON.parse(frontendStatus.content[0].text);
      console.log(`Frontend Vercel Deployment status: ${frontendStatusData.status}`);
    }

    // 4. Check backend deployment status
    if (backendData.id) {
      console.log(`Checking backend deployment status for ID: ${backendData.id}`);
      const backendStatus = await vercelClient.callTool("getDeployment", {
        deploymentId: backendData.id
      });
      const backendStatusData = JSON.parse(backendStatus.content[0].text);
      console.log(`Backend Vercel Deployment status: ${backendStatusData.status}`);
    }

    // 5. List all Vercel projects
    console.log("Listing all Vercel projects...");
    const listResult = await vercelClient.callTool("listProjects");
    console.log(`Vercel projects: ${listResult.content[0].text}`);

    console.log("\nDeployment completed successfully! Both frontend and backend deployed to Vercel.");
  } catch (err) {
    console.error("Error running Deploy workflow:", err.message);
  } finally {
    vercelClient.stop();
    console.log("=== Deploy Workflow Finished ===\n");
  }
}

module.exports = runDeploy;
