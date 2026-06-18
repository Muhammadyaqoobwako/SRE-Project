const { isMockMode, getDb, getMockDb } = require('../mongodbClient');

async function queryDocuments(args) {
  const { collection, filter = {} } = args || {};
  if (!collection) {
    throw new Error("Missing 'collection' parameter.");
  }

  if (isMockMode()) {
    const dbData = getMockDb();
    const list = dbData[collection] || [];
    
    // Filter matching simple keys (equality matching)
    const filteredList = list.filter(item => {
      for (const key of Object.keys(filter)) {
        if (item[key] !== filter[key]) return false;
      }
      return true;
    });

    return {
      content: [{ type: "text", text: JSON.stringify(filteredList, null, 2) }]
    };
  }

  try {
    const db = getDb();
    const data = await db.collection(collection).find(filter).toArray();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  } catch (err) {
    throw new Error(`queryDocuments failed: ${err.message}`);
  }
}

module.exports = queryDocuments;
