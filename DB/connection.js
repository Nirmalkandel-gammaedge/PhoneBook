const mongoose = require("mongoose");
const connection = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/contact")
    console.log("Connectiion establish")
  } catch (err) {
    console.error(err.message);
  }
};

module.exports= connection;