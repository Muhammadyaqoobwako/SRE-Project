const { githubRequest, isMock, getRepoConfig } = require('../githubClient');

async function commitFile(args) {
  const {
    owner = getRepoConfig().owner,
    repo = getRepoConfig().repo,
    path: filePath,
    content,
    message = `Update ${filePath}`,
    branch
  } = args || {};

  if (!filePath || content === undefined) {
    throw new Error("Missing 'path' or 'content' parameter.");
  }

  if (isMock) {
    return {
      content: [{
        type: "text",
        text: `Simulated committing file '${filePath}' to branch '${branch || 'default'}' on ${owner}/${repo} successfully.`
      }]
    };
  }

  try {
    // Check if the file exists on the branch to get its SHA (needed for updates)
    let sha;
    try {
      const url = `/repos/${owner}/${repo}/contents/${filePath}` + (branch ? `?ref=${branch}` : '');
      const existing = await githubRequest(url);
      sha = existing.sha;
    } catch (e) {
      // File doesn't exist yet, which is fine
    }

    const base64Content = Buffer.from(content).toString('base64');
    const body = {
      message,
      content: base64Content,
      branch
    };
    if (sha) {
      body.sha = sha;
    }

    const result = await githubRequest(`/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      body: JSON.stringify(body)
    });

    return {
      content: [{ type: "text", text: `File committed successfully: ${result.commit.html_url}` }]
    };
  } catch (err) {
    throw new Error(`commitFile failed: ${err.message}`);
  }
}

module.exports = commitFile;
