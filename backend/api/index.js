require('dotenv').config();
const app = require('../src/app');
const connectDatabase = require('../src/config/db');

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    try {
      await connectDatabase();
      isConnected = true;
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }
  return app(req, res);
};
