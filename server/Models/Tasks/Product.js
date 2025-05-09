

// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   category: { type: String, required: true },
//   subcategory: { type: String },
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   rating: { type: Number, default: 0 },
//   reviewCount: { type: Number, default: 0 },
//   // image: { 
//   //   data: String, 
//   //   contentType: String 
//   // },
//   image: { type: String, required: true }, // Base64 image string
//   // Fields for Today's Deal Product
 
//   oldPrice: { type: Number },
//    // Flag to identify Today's Deal Product
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// productSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;




const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  image: { type: String, required: true }, // Base64 image string

  // Fields for Today's Deal Product
  oldPrice: { type: Number },
  
  // Flag to identify Today's Deal Product
  bulkOrderAvailable: { type: Boolean, default: false }, // Checkbox for bulk order
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;