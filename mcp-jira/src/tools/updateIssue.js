const { jiraRequest, isMock } = require('../jiraClient');

async function updateIssue(args) {
  const { issueId, status } = args || {};
  if (!issueId || !status) {
    throw new Error("Missing 'issueId' or 'status' parameter.");
  }

  if (isMock) {
    return {
      content: [{
        type: "text",
        text: `Simulated transitioning issue ${issueId} to status '${status}' successfully.`
      }]
    };
  }

  try {
    // 1. Get transitions for the issue
    const transitionsData = await jiraRequest(`/issue/${issueId}/transitions`);
    const transition = transitionsData.transitions.find(t => 
      t.name.toLowerCase() === status.toLowerCase() || 
      t.to.name.toLowerCase() === status.toLowerCase()
    );

    if (!transition) {
      throw new Error(`Transition to status '${status}' not found. Available: ${transitionsData.transitions.map(t => t.name).join(', ')}`);
    }

    // 2. Perform transition
    await jiraRequest(`/issue/${issueId}/transitions`, {
      method: 'POST',
      body: JSON.stringify({
        transition: { id: transition.id }
      })
    });

    return {
      content: [{ type: "text", text: `Issue ${issueId} transitioned to ${status} (ID: ${transition.id})` }]
    };
  } catch (err) {
    throw new Error(`updateIssue failed: ${err.message}`);
  }
}

module.exports = updateIssue;
