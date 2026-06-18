const path = require('path');

// Load environment configuration from root .env file
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const app = require('./app');
const connectDB = require('./config/db');
const Cashier = require('./models/Cashier');

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Establish connection to MongoDB
  await connectDB();

  // Seed default cashiers if they do not exist (matching legacy authentication credentials)
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
    console.log(`==================================================`);
    console.log(`Modernized Fast-Food Backend listening on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}/api`);
    console.log(`==================================================`);
  });
}

startServer();