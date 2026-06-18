const { isMockMode, getDb, getMockDb } = require('../mongodbClient');

async function listCollections() {
  if (isMockMode()) {
    const dbData = getMockDb();
    const collections = Object.keys(dbData).map(name => ({ name }));
    return {
      content: [{ type: "text", text: JSON.stringify(collections, null, 2) }]
    };
  }

  try {
    const db = getDb();
    const collections = await db.listCollections().toArray();
    return {
      content: [{ type: "text", text: JSON.stringify(collections, null, 2) }]
    };
  } catch (err) {
    throw new Error(`listCollections failed: ${err.message}`);
  }
}

module.exports = listCollections;
