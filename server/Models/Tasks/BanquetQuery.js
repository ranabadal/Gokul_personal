const mongoose = require("mongoose");

const BanquetQuerySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Ensure that a user is always associated with a query
    },
    hallTitle: { type: String, required: true },
    hallImage: { type: [String] }, // Allow multiple images
    occasion: { type: String, required: true },
    guestCount: { type: Number, required: true, min: 1 },
    selectedCart: { type: String },
    selectedDates: { type: [String] }, // Array for multiple dates
    preferredTimings: { // ✅ Store start and end time
      start: { type: String, required: true },
      end: { type: String, required: true }
    },
    comments: { type: String },
    menuPreferences: { type: Object }, // ✅ Store selected menu details in JSON format
    totalCost: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Pending", "Processed", "Approved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BanquetQuery", BanquetQuerySchema);