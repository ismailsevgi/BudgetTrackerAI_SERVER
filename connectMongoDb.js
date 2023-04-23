const mongoose = require('mongoose');

const connectingMongoDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb://127.0.0.1:27017/BudgetTrackerAI_Test',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectingMongoDB;
