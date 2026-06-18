const { jiraRequest, isMock } = require('../jiraClient');

async function createEpic(args) {
  const { summary, description, projectKey = "KAN" } = args || {};
  if (!summary) {
    throw new Error("Missing 'summary' parameter.");
  }

  if (isMock) {
    const mockKey = `${projectKey}-${Math.floor(Math.random() * 900) + 100}`;
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          key: mockKey,
          id: `id-${mockKey}`,
          self: `https://mock-jira.atlassian.net/browse/${mockKey}`,
          status: "simulated",
          summary,
          description
        }, null, 2)
      }]
    };
  }

  try {
    const data = await jiraRequest('/issue', {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          project: { key: projectKey },
          summary,
          description: description ? {
            type: "doc",
            version: 1,
            content: [{
              type: "paragraph",
              content: [{ type: "text", text: description }]
            }]
          } : undefined,
          issuetype: { name: "Epic" }
        }
      })
    });
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  } catch (err) {
    throw new Error(`createEpic failed: ${err.message}`);
  }
}

module.exports = createEpic;
