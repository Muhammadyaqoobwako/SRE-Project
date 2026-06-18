const { githubRequest, isMock, getRepoConfig } = require('../githubClient');

async function getRepo(args) {
  const { owner = getRepoConfig().owner, repo = getRepoConfig().repo } = args || {};
  
  if (isMock) {
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          name: repo,
          full_name: `${owner}/${repo}`,
          description: "Modernized Enterprise App Repository (Mocked)",
          html_url: `https://github.com/${owner}/${repo}`,
          default_branch: "main",
          status: "simulated"
        }, null, 2)
      }]
    };
  }

  try {
    const data = await githubRequest(`/repos/${owner}/${repo}`);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  } catch (err) {
    throw new Error(`getRepo failed: ${err.message}`);
  }
}

module.exports = getRepo;
