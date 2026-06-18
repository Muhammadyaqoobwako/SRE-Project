const { githubRequest, isMock, getRepoConfig } = require('../githubClient');

async function createBranch(args) {
  const { 
    owner = getRepoConfig().owner, 
    repo = getRepoConfig().repo, 
    branch, 
    base = "main" 
  } = args || {};

  if (!branch) {
    throw new Error("Missing 'branch' parameter.");
  }

  if (isMock) {
    return {
      content: [{
        type: "text",
        text: `Simulated creating branch '${branch}' from base '${base}' successfully on ${owner}/${repo}`
      }]
    };
  }

  try {
    // 1. Get SHA of base branch
    const baseRef = await githubRequest(`/repos/${owner}/${repo}/git/ref/heads/${base}`);
    const sha = baseRef.object.sha;

    // 2. Create new branch ref
    const newRef = await githubRequest(`/repos/${owner}/${repo}/git/refs`, {
      method: 'POST',
      body: JSON.stringify({
        ref: `refs/heads/${branch}`,
        sha: sha
      })
    });

    return {
      content: [{ type: "text", text: JSON.stringify(newRef, null, 2) }]
    };
  } catch (err) {
    throw new Error(`createBranch failed: ${err.message}`);
  }
}

module.exports = createBranch;
