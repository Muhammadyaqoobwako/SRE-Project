const { jiraRequest, isMock } = require('../jiraClient');

async function createStory(args) {
  const { summary, description, epicId, projectKey = "KAN" } = args || {};
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
          parentKey: epicId,
          status: "simulated",
          summary,
          description
        }, null, 2)
      }]
    };
  }

  try {
    const fields = {
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
      issuetype: { name: "Story" }
    };

    if (epicId) {
      fields.parent = { key: epicId };
    }

    const data = await jiraRequest('/issue', {
      method: 'POST',
      body: JSON.stringify({ fields })
    });
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  } catch (err) {
    throw new Error(`createStory failed: ${err.message}`);
  }
}

module.exports = createStory;
