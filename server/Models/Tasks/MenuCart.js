const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  menuName: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  menuImage: { type: String }, // Storing image URL
  isAvailable: { type: Boolean, default: true }
});

const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;