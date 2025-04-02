// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   category: { type: String, required: true },
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   oldPrice: { type: Number, required: false },
//   rating: { type: Number, required: false },
//   reviewCount: { type: Number, required: false },
//   reviews: [{ type: String, required: false }],
//   stockStatus: { type: Boolean, required: true, default: true },
//   images: [{ data: Buffer, contentType: String }] // Array of image data
// });

// module.exports = mongoose.model('Product', productSchema);


// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   category: { type: String, required: true },
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   oldPrice: { type: Number },
//   rating: { type: Number },
//   reviewCount: { type: Number },
//   reviews: [{ user: String, text: String, rating: Number }],
//   stockStatus: { type: Boolean, required: true, default: true },
//   images: [{ data: String, contentType: String }] // Array of base64 encoded image data
// });

// module.exports = mongoose.model('Product', productSchema);



// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   category: { type: String, required: true },
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   rating: { type: Number },
//   reviewCount: { type: Number },
//    stockStatus: { type: Boolean, required: true, default: true },
//   image: { data: String, contentType: String } // Single base64 encoded image data
// });

// module.exports = mongoose.model('Product', productSchema);

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  image: { 
    data: String, 
    contentType: String 
  },
  // Fields for Today's Deal Product
  discountPrice: { type: Number },
  oldPrice: { type: Number },
  discountPercent: { type: Number },
  isTodaysDeal: { type: Boolean, default: false },  // Flag to identify Today's Deal Product
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
