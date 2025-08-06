const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sujeetsahu:sujeet1234@namastedevnodejs.arfctyg.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };