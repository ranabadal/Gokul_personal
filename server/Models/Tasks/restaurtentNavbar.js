const mongoose = require("mongoose");

const RestaurentNavSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Restaurant", "Sweets"]
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String, // Store Base64 encoded image
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("RestaurentNavSchema", RestaurentNavSchema);