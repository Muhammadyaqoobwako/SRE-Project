const path = require('path');
const { MCPServerClient, callLLM } = require('../agent');
const docPrompts = require('../prompts/documentation');

async function runAnalyze() {
  console.log("=== Starting Analyze Workflow ===");

  // Initialize MCP clients
  const fsClient = new MCPServerClient("filesystem", "mcp-filesystem/src/server.js");
  const jiraClient = new MCPServerClient("jira", "mcp-jira/src/server.js");

  try {
    console.log("Launching Filesystem MCP...");
    await fsClient.start();
    console.log("Launching Jira MCP...");
    await jiraClient.start();

    // 1. Scan Legacy Codebase
    const legacyPath = path.resolve(__dirname, '../../../legacy-app/VB6/Fast-Food-Management-System-master');
    console.log(`Scanning legacy codebase at: ${legacyPath}`);
    
    const listResult = await fsClient.callTool("listDirectory", { path: legacyPath });
    const files = JSON.parse(listResult.content[0].text);
    console.log(`Found legacy files: ${files.map(f => f.name).join(', ')}`);

    // 2. Read legacy files content
    let codebaseSummary = "";
    for (const file of files) {
      if (file.isFile) {
        const filePath = path.join(legacyPath, file.name);
        const fileContent = await fsClient.callTool("readFile", { path: filePath });
        codebaseSummary += `\n\n--- File: ${file.name} ---\n${fileContent.content[0].text}`;
      }
    }

    // 3. Generate requirements.md
    console.log("Generating requirements.md...");
    const reqText = await callLLM(
      "You are a requirements analyst. Output clean markdown.",
      docPrompts.requirements(codebaseSummary)
    );
    const reqPath = path.resolve(__dirname, '../../../generated-docs/requirements.md');
    await fsClient.callTool("writeFile", { path: reqPath, content: reqText });

    // 4. Generate architecture.md
    console.log("Generating architecture.md...");
    const archText = await callLLM(
      "You are a systems architect. Output clean markdown with mermaid diagrams if applicable.",
      docPrompts.architecture(codebaseSummary)
    );
    const archPath = path.resolve(__dirname, '../../../generated-docs/architecture.md');
    await fsClient.callTool("writeFile", { path: archPath, content: archText });

    // 5. Generate api-spec.md
    console.log("Generating api-spec.md...");
    const apiText = await callLLM(
      "You are an API designer. Output clear markdown specification.",
      docPrompts.apiSpec(codebaseSummary)
    );
    const apiPath = path.resolve(__dirname, '../../../generated-docs/api-spec.md');
    await fsClient.callTool("writeFile", { path: apiPath, content: apiText });

    // 6. Generate migration-plan.md
    console.log("Generating migration-plan.md...");
    const migPlanText = await callLLM(
      "You are a modernization project manager. Output structured markdown.",
      docPrompts.migrationPlan(codebaseSummary)
    );
    const migPlanPath = path.resolve(__dirname, '../../../generated-docs/migration-plan.md');
    await fsClient.callTool("writeFile", { path: migPlanPath, content: migPlanText });

    console.log("Documentation successfully generated and saved to /generated-docs/!");

    // 7. Track issues in Jira
    console.log("Creating Jira tickets...");
    const epicResponse = await jiraClient.callTool("createEpic", {
      summary: "Modernize Legacy Desktop System to Cloud Web App",
      description: "Epic tracking migration of legacy VB6 customer and inventory modules to Express backend and React SPA."
    });
    
    const epicData = JSON.parse(epicResponse.content[0].text);
    console.log(`Created Jira Epic: ${epicData.key}`);

    const story1 = await jiraClient.callTool("createStory", {
      summary: "Migrate Customer Management screen",
      description: "Convert frmCustomer.frm visual control bindings and validation code into React forms and routes.",
      epicId: epicData.key
    });
    const story1Data = JSON.parse(story1.content[0].text);
    console.log(`Created Jira Story 1: ${story1Data.key}`);

    const story2 = await jiraClient.callTool("createStory", {
      summary: "Migrate Inventory operations",
      description: "Implement Express endpoints for inventory retrieval, low stock filtering, and React listings tables.",
      epicId: epicData.key
    });
    const story2Data = JSON.parse(story2.content[0].text);
    console.log(`Created Jira Story 2: ${story2Data.key}`);

    console.log("Jira tasks successfully tracked!");
  } catch (err) {
    console.error("Error running Analyze workflow:", err.message);
  } finally {
    fsClient.stop();
    jiraClient.stop();
    console.log("=== Analyze Workflow Finished ===\n");
  }
}

module.exports = runAnalyze;
