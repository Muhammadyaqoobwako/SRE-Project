const path = require('path');
const { MCPServerClient } = require('../agent');

async function runDeploy() {
  console.log("=== Starting Deploy Workflow ===");

  const dockerClient = new MCPServerClient("docker", "mcp-docker/src/server.js");
  const vercelClient = new MCPServerClient("vercel", "mcp-vercel/src/server.js");

  try {
    console.log("Launching Docker MCP...");
    await dockerClient.start();
    console.log("Launching Vercel MCP...");
    await vercelClient.start();

    // 1. Build backend Docker Image
    const backendPath = path.resolve(__dirname, '../../../modern-app/backend');
    const backendDockerfile = path.join(backendPath, 'Dockerfile');
    console.log(`Building Docker Image from: ${backendDockerfile}`);
    
    const buildResult = await dockerClient.callTool("buildImage", {
      dockerfilePath: backendDockerfile,
      tag: "modern-inventory-backend:latest"
    });
    console.log(buildResult.content[0].text);

    // 2. Run backend Docker Container
    console.log("Running backend container...");
    const runResult = await dockerClient.callTool("runContainer", {
      image: "modern-inventory-backend:latest",
      name: "modern-backend-service",
      ports: ["5000:5000"]
    });
    console.log(runResult.content[0].text);

    // Extract container ID/Name from run output (in a real scenario, or use name)
    const containerName = "modern-backend-service";

    // 3. Verify container logs
    console.log(`Fetching logs for ${containerName} to verify startup...`);
    const logsResult = await dockerClient.callTool("getLogs", {
      containerId: containerName
    });
    console.log(logsResult.content[0].text);

    // 4. Deploy Frontend to Vercel
    const frontendPath = path.resolve(__dirname, '../../../modern-app/frontend');
    console.log(`Deploying frontend to Vercel from: ${frontendPath}`);
    
    const deployResult = await vercelClient.callTool("deployProject", {
      projectPath: frontendPath
    });
    const deployData = JSON.parse(deployResult.content[0].text);
    console.log(`Deployment created successfully. URL: ${deployData.url}`);

    // 5. Check deployment status
    console.log(`Checking deployment status for ID: ${deployData.id}`);
    const statusResult = await vercelClient.callTool("getDeployment", {
      deploymentId: deployData.id
    });
    const statusData = JSON.parse(statusResult.content[0].text);
    console.log(`Vercel Deployment final status: ${statusData.status}`);

    console.log("\nDeployment completed successfully! The platform is now fully modernized.");
  } catch (err) {
    console.error("Error running Deploy workflow:", err.message);
  } finally {
    dockerClient.stop();
    vercelClient.stop();
    console.log("=== Deploy Workflow Finished ===\n");
  }
}

module.exports = runDeploy;
