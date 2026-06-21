require("dotenv").config();
const mongoose = require("mongoose");
const { connectDb } = require("../config/db");
const { ensureDefaultAdmin } = require("./ensureDefaultAdmin");

connectDb()
  .then(ensureDefaultAdmin)
  .then(() => mongoose.disconnect())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
