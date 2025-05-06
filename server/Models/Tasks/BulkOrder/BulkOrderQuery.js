

// const mongoose = require("mongoose");

// const BulkOrderQuerySchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     orders: [
//       {
//         boxName: { type: String, required: true },
//         boxSize: { type: String, required: true },
//         sweets: [
//           {
//             productName: { type: String, required: true },
//             productPrice: { type: Number, required: true, min: 0 }
//           }
//         ],
//         quantity: { type: Number, required: true, min: 1 },
//         totalCost: { type: Number, required: true, min: 0 },
//         address: {
//           province: { type: String, required: true },
//           city: { type: String, required: true },
//           area: { type: String, required: true },
//           landmark: { type: String }
//         },
//         customMessage: { type: String, default: null } // ✅ New field for user message
//       }
//     ],
//     status: {
//       type: String,
//       enum: ["Pending", "Canceled", "Approved"],
//       default: "Pending"
//     }
//   },
//   { timestamps: true }
// );

// const BulkOrderQuery = mongoose.model("BulkOrderQuery", BulkOrderQuerySchema);

// module.exports = BulkOrderQuery;

const mongoose = require("mongoose");

const BulkOrderQuerySchema = new mongoose.Schema({
  // Link order to user (reference) plus additional details directly stored.
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  userNumber: { type: String, required: true },
  userEmail: { type: String, required: true },
  // Optionally, store address details as an object.
  address: {
    province: { type: String },
    city: { type: String },
    area: { type: String },
    landmark: { type: String },
  },

  comments: { type: String, default: "" },

  // Stores selected items: a Map e.g. { "Cham Cham": 9 }
  selectedItems: {
    type: Map,
    of: Number,
  },

  // Array of Regular Box selections (free)
  selectedRegularBoxes: [
    {
      label: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],

  // Gift Box selections (paid)
  giftBoxes: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
      matchingHandbags: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true, min: 1 },
          price: { type: Number, required: true, min: 0 },
        },
      ],
    },
  ],

  // General Handbag selections
  generalHandbags: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
    },
  ],

  // Order status (used for admin actions)
  status: {
    type: String,
    enum: ["Pending", "Processing", "Completed", "Canceled", "Approved"],
    default: "Pending",
  },

  totalCost: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
});

const BulkOrderQuery = mongoose.model("BulkOrderQuery", BulkOrderQuerySchema);
module.exports = BulkOrderQuery;