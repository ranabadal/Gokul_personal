const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, 
    type: { type: String, enum: ["today", "upcoming", "expired"], required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    remainingHours: { type: Number }, // Auto-calculated in backend
}, { timestamps: true });

module.exports = mongoose.model("Deal", dealSchema);