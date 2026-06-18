const { githubRequest, isMock, getRepoConfig } = require('../githubClient');

async function createPR(args) {
  const {
    owner = getRepoConfig().owner,
    repo = getRepoConfig().repo,
    title,
    body,
    head,
    base = "main"
  } = args || {};

  if (!title || !head) {
    throw new Error("Missing 'title' or 'head' parameter.");
  }

  if (isMock) {
    return {
      content: [{
        type: "text",
        text: `Simulated creation of Pull Request from '${head}' into '${base}' in ${owner}/${repo}: "${title}"`
      }]
    };
  }

  try {
    const result = await githubRequest(`/repos/${owner}/${repo}/pulls`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        head,
        base
      })
    });

    return {
      content: [{ type: "text", text: `Pull Request created: ${result.html_url}` }]
    };
  } catch (err) {
    throw new Error(`createPR failed: ${err.message}`);
  }
}

module.exports = createPR;
