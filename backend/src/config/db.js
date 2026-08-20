const mongoose = require('mongoose');

let cachedPromise = null;

const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  cachedPromise = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 8000,
    })
    .then((mongooseInstance) => {
      console.log('MongoDB connected successfully');
      return mongooseInstance;
    })
    .catch((err) => {
      cachedPromise = null;
      console.error('MongoDB connection failed:', err.message);
      throw err;
    });

  return cachedPromise;
};

module.exports = connectDatabase;