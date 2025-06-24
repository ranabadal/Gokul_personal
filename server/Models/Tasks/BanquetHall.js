// const mongoose = require('mongoose');

// const imageSchema = new mongoose.Schema({
//   data: { type: String, required: true },
//   contentType: { type: String, required: true }
// });

// const banquetSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   oldPrice: { type: Number },
//  perPlatePrice: { type: Number, required: true },
//   seatingCapacity: { type: Number, required: true },
//   rating: { type: Number, default: 0 },
//   images: [imageSchema]
// }, { timestamps: true });

// const Banquet = mongoose.model('Banquet', banquetSchema);

// module.exports = Banquet;
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },         // Cloudinary image URL
  public_id: { type: String, required: true }    // Cloudinary image ID (used to delete/update)
});

const banquetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  // oldPrice: { type: Number },
  seatingCapacity: { type: Number, required: true },
  // rating: { type: Number, default: 0 },
  images: [imageSchema]  // now using Cloudinary format
}, { timestamps: true });

const Banquet = mongoose.model('Banquet', banquetSchema);

module.exports = Banquet;
