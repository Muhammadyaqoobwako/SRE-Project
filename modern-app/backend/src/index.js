const path = require('path');

// Load environment configuration from root .env file
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const app = require('./app');
const connectDB = require('./config/db');
const Cashier = require('./models/Cashier');

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Establish connection to database
  await connectDB();

  // Seed default cashiers if they do not exist
  try {
    const cashiersToSeed = [
      { username: 'dorry', password: 'dorry', role: 'cashier' },
      { username: 'timmo', password: 'dorry', role: 'cashier' }
    ];

    for (const cashierData of cashiersToSeed) {
      const exists = await Cashier.findOne({ username: cashierData.username });
      if (!exists) {
        console.log(`Seeding default cashier: ${cashierData.username}...`);
        const cashier = new Cashier(cashierData);
        await cashier.save();
        console.log(`Cashier ${cashierData.username} seeded successfully.`);
      }
    }
  } catch (err) {
    console.error('Error seeding default cashiers:', err.message);
  }

  // Start HTTP API listener
  app.listen(PORT, () => {
    console.log(`Modern API Server listening on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/status`);
  });
}

startServer();