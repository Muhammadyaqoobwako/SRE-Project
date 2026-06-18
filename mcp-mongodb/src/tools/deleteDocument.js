const { isMockMode, getDb, getMockDb, saveMockDb } = require('../mongodbClient');

async function deleteDocument(args) {
  const { collection, filter } = args || {};
  if (!collection || !filter) {
    throw new Error("Missing 'collection' or 'filter' parameter.");
  }

  if (isMockMode()) {
    const dbData = getMockDb();
    const list = dbData[collection] || [];
    
    let originalLength = list.length;
    const remainingList = list.filter(item => {
      let match = true;
      for (const key of Object.keys(filter)) {
        if (item[key] !== filter[key]) {
          match = false;
          break;
        }
      }
      return !match;
    });

    const deletedCount = originalLength - remainingList.length;
    dbData[collection] = remainingList;
    saveMockDb(dbData);

    return {
      content: [{ type: "text", text: `Successfully deleted ${deletedCount} document(s) from collection '${collection}' (Simulated)` }]
    };
  }

  try {
    const db = getDb();
    const result = await db.collection(collection).deleteMany(filter);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  } catch (err) {
    throw new Error(`deleteDocument failed: ${err.message}`);
  }
}

module.exports = deleteDocument;
