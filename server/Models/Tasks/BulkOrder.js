const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  data: { type: String, required: true },
  contentType: { type: String, required: true }
});

const bulkOrderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  size: {
    type: String, required: true},
  description: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
//   rating: { type: Number, default: 0 },
  images: [imageSchema]
}, { timestamps: true });

const BulkOrder = mongoose.model('BulkOrder', bulkOrderSchema);

module.exports = BulkOrder;
