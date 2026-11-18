const mongoose = require("mongoose");

async function connect(uri) {
  mongoose.set("strictQuery", false);
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
  return mongoose.connection;
}

module.exports = { connect, mongoose };
