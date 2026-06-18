const { isMockMode, getDb, getMockDb, saveMockDb } = require('../mongodbClient');

async function updateDocument(args) {
  const { collection, filter, update } = args || {};
  if (!collection || !filter || !update) {
    throw new Error("Missing required parameters: 'collection', 'filter', or 'update'.");
  }

  if (isMockMode()) {
    const dbData = getMockDb();
    const list = dbData[collection] || [];
    let count = 0;
    
    // Apply updates
    const updatedList = list.map(item => {
      let match = true;
      for (const key of Object.keys(filter)) {
        if (item[key] !== filter[key]) {
          match = false;
          break;
        }
      }
      if (match) {
        count++;
        // Apply update $set operators or raw objects
        const updateFields = update.$set || update;
        return { ...item, ...updateFields };
      }
      return item;
    });

    dbData[collection] = updatedList;
    saveMockDb(dbData);

    return {
      content: [{ type: "text", text: `Successfully updated ${count} document(s) in collection '${collection}' (Simulated)` }]
    };
  }

  try {
    const db = getDb();
    const result = await db.collection(collection).updateMany(filter, update);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  } catch (err) {
    throw new Error(`updateDocument failed: ${err.message}`);
  }
}

module.exports = updateDocument;
