const app = require("../src/app");
const connectDatabase = require("../src/config/db");

connectDatabase().catch((err) => {
  console.error("MongoDB connection initialization error:", err);
});

module.exports = app;
