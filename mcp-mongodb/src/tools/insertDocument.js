const { isMockMode, getDb, getMockDb, saveMockDb } = require('../mongodbClient');

async function insertDocument(args) {
  const { collection, document } = args || {};
  if (!collection || !document) {
    throw new Error("Missing 'collection' or 'document' parameter.");
  }

  if (isMockMode()) {
    const dbData = getMockDb();
    if (!dbData[collection]) {
      dbData[collection] = [];
    }
    
    // Auto-generate numeric ID if not provided
    if (document.id === undefined && document._id === undefined) {
      document.id = Date.now();
    }
    
    dbData[collection].push(document);
    saveMockDb(dbData);

    return {
      content: [{ 
        type: "text", 
        text: `Successfully inserted document into collection '${collection}' (Simulated)`
      }]
    };
  }

  try {
    const db = getDb();
    const result = await db.collection(collection).insertOne(document);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  } catch (err) {
    throw new Error(`insertDocument failed: ${err.message}`);
  }
}

module.exports = insertDocument;
