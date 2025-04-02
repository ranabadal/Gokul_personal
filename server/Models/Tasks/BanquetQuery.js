const mongoose = require("mongoose");





const BanquetQuerySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true, // Ensure that a user is always associated with a query
  },
  hallTitle: { type: String },
  hallImage:  { type: String },
  occasion: { type: String },
  guestCount: { type: Number },
  selectedCart: { type: String },
  selectedDates: { type: [String] }, // Dates as strings for simplicity
  preferredTimings: { type: [String] },
  comments: { type: String },
  menuPreferences: { type: Object }, // Save as a JSON object
  totalCost: { type: Number },
  status: {
    type: String,
    enum: ["Pending", "Processed", "Approved"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now }, // Automatically track when the query was created
}
,
  { timestamps: true });

module.exports = mongoose.model("BanquetQuery", BanquetQuerySchema);