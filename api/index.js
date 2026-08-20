require('dotenv').config();
const app = require('../backend/src/app');
const connectDatabase = require('../backend/src/config/db');

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    try {
      await connectDatabase();
      isConnected = true;
    } catch (err) {
      console.error('MongoDB connection error in Vercel serverless function:', err);
    }
  }
  return app(req, res);
};
