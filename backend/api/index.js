const app = require("../src/app");
const connectDatabase = require("../src/config/db");

let initialized = false;

module.exports = async (req, res) => {
  if (!initialized) {
    await connectDatabase();
    initialized = true;
  }

  return app(req, res);
};
