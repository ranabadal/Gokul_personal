const mongoose = require('mongoose');

const todaysDealProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { data: String, contentType: String }, // Store image as base64 string for simplicity
  discountPrice: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountPercent: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

todaysDealProductSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const TodaysDealProduct = mongoose.model('TodaysDealProduct', todaysDealProductSchema);

module.exports = TodaysDealProduct;
