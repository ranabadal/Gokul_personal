const mongoose = require("mongoose");

// ✅ Define Handbag Schema (Used for Matching & General Handbags)
const HandbagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  minOrderQuantity: { type: Number, required: true, min: 1 },
});

// ✅ Define Gift Box Schema
const GiftBoxSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "GiftBoxCategory", required: true }, // ✅ Reference Category
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  minOrderQuantity: { type: Number, required: true, min: 1 },
  matchingHandbags: [HandbagSchema], // ✅ Stores Matching Handbags
});

// ✅ Define General Handbags Schema (Standalone Handbags)
const GeneralHandbagSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "GiftBoxCategory", required: true }, // ✅ Reference Category
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  minOrderQuantity: { type: Number, required: true, min: 1 },
});

// ✅ Define GiftBoxCategory Schema
const GiftBoxCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const GiftBoxesForBulkOrder = mongoose.model("GiftBoxesForBulkOrder", GiftBoxSchema);
const GeneralHandbag = mongoose.model("GeneralHandbag", GeneralHandbagSchema);
const GiftBoxCategory = mongoose.model("GiftBoxCategory", GiftBoxCategorySchema);

module.exports = { GiftBoxesForBulkOrder, GeneralHandbag, GiftBoxCategory };