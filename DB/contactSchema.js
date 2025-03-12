const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true, 
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      enum: ["Work", "School", "Friend", "Family"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userContact", contactSchema);