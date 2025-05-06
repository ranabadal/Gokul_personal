// regularBox.model.js
const mongoose = require("mongoose");

const RegularBoxSchema = new mongoose.Schema(
  {
    boxName: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      // You can restrict the allowed sizes using the enum property.
      type: String,
      required: true,
    //   enum: ["2lb", "4lb", "6lb", "500gm", "1kg", "2kg", "5kg"],
    },
    minOrder: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

const RegularBox = mongoose.model("RegularBox", RegularBoxSchema);

module.exports = RegularBox;