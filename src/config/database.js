const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sujeetsahu9125:sujeetsahu9125%40@namastedevnodejs.dkd1ddw.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };