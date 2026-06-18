const runAnalyze = require('./workflows/analyze');
const runMigrate = require('./workflows/migrate');
const runDeploy = require('./workflows/deploy');

async function main() {
  const arg = process.argv[2];

  if (arg === "analyze") {
    await runAnalyze();
  } else if (arg === "migrate") {
    await runMigrate();
  } else if (arg === "deploy") {
    await runDeploy();
  } else {
    // Run all workflows in sequence
    console.log("==========================================");
    console.log("STARTING FULL AUTO-MODERNIZATION PIPELINE");
    console.log("==========================================\n");
    
    await runAnalyze();
    await runMigrate();
    await runDeploy();
    
    console.log("==========================================");
    console.log("AUTO-MODERNIZATION PIPELINE COMPLETED");
    console.log("==========================================");
  }
}

main().catch(err => {
  console.error("Fatal Pipeline Error:", err);
  process.exit(1);
});
