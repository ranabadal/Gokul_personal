// models/Menu.js
const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { _id: false }
);

const subSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    limit: { type: Number, default: 1 },
    type: {
      type: String,
      enum: ["radio", "dropdown", "checkbox"],
      default: "radio",
    },
    options: [optionSchema],
  },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    limit: { type: Number, default: 1 },
    type: {
      type: String,
      enum: ["radio", "dropdown", "checkbox"],
      default: "radio",
    },
    options: [optionSchema],
    subSections: [subSectionSchema],
  },
  { _id: false }
);

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sections: [sectionSchema],
  // Optionally, store overall customization defaults
  customizations: {
    welcomeDrinks: [String],
    snacks: [String],
    paneerSnack: String,
    mainCourse: String,
  },
  createdAt: { type: Date, default: Date.now },
});


menuSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Menu", menuSchema);
