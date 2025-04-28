const mongoose = require("mongoose");

const takeawayOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
  totalPrice: { type: Number, required: true },
  orderedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TakeawayOrder", takeawayOrderSchema);