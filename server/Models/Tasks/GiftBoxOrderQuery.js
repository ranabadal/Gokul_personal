// const mongoose = require("mongoose");

// const GiftBoxOrderQuerySchema = new mongoose.Schema(
//   {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User", // Reference to the User model
//         required: true, // Ensure that a user is always associated with a query
//       },
//     boxName: {
//       type: String,
//       required: true,
//     },
//     boxSize: {
//       type: String,
//       required: true,
//     },
//     productName: {
//       type: String,
//       required: true,
//     },
//     productPrice: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//     totalCost: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     address: {
//       province: { type: String, required: true },
//       city: { type: String, required: true },
//       area: { type: String, required: true },
//       landmark: { type: String, required: false },
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "Processed", "Completed"],
//       default: "Pending",
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// const GiftBoxOrderQuery = mongoose.model("GiftBoxOrderQuery", GiftBoxOrderQuerySchema);

// module.exports = GiftBoxOrderQuery;
const mongoose = require("mongoose");

const GiftBoxOrderQuerySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orders: [
      {
        boxName: { type: String, required: true },
        boxSize: { type: String, required: true },
        sweets: [
          {
            productName: { type: String, required: true },
            productPrice: { type: Number, required: true, min: 0 }
          }
        ],
        quantity: { type: Number, required: true, min: 1 },
        totalCost: { type: Number, required: true, min: 0 },
        address: {
          province: { type: String, required: true },
          city: { type: String, required: true },
          area: { type: String, required: true },
          landmark: { type: String }
        },
        customMessage: { type: String, default: null }
      }
    ],
    status: {
      type: String,
      enum: ["Pending", "Canceled", "Approved"],
      default: "Pending"
    }
  },
  { timestamps: true }
);
const GiftBoxOrderQuery = mongoose.model(
  "GiftBoxOrderQuery",
  GiftBoxOrderQuerySchema
);

module.exports = GiftBoxOrderQuery;