const mongoose = require("mongoose");

const restaurentProductsSchema = new mongoose.Schema({
  name: { type: String, required: true },
//   category: { type: String, required: true }, // "Restaurant" or "Sweets"
category: { type: String, default: "Restaurant" },
  subcategory: { type: String },
  price: { type: String, required: true }, // Example: "₹150"
  image: { type: String, required: true }, // Base64 image string
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("restaurentProducts", restaurentProductsSchema);