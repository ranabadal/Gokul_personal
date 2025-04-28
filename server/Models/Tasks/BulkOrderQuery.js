// const mongoose = require("mongoose");

// const BulkOrderQuerySchema = new mongoose.Schema(
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
//       enum: ["Pending", "Canceled", "Approved"],
//       default: "Pending",
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// const BulkOrderQuery = mongoose.model("BulkOrderQuery", BulkOrderQuerySchema);

// module.exports = BulkOrderQuery;

const mongoose = require("mongoose");

const BulkOrderQuerySchema = new mongoose.Schema(
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
        customMessage: { type: String, default: null } // ✅ New field for user message
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

const BulkOrderQuery = mongoose.model("BulkOrderQuery", BulkOrderQuerySchema);

module.exports = BulkOrderQuery;