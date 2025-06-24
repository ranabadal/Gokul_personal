



// const mongoose = require("mongoose");

// // ✅ Define Handbag Schema (Used for Matching & General Handbags)
// const HandbagSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   price: { type: Number, required: true, min: 0 },
//   minOrderQuantity: { type: Number, required: true, min: 1 },
// });

// // ✅ Define Gift Box Schema with new fields for sweets
// const GiftBoxesSchema = new mongoose.Schema({
//   category: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "GiftBoxesCategory", 
//     required: true 
//   }, // ✅ Reference Category
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   description: { type: String },
//   price: { type: Number, required: true, min: 0 },
//   minOrderQuantity: { type: Number, required: true, min: 1 },
//   matchingHandbags: [HandbagSchema], // ✅ Stores Matching Handbags
  
//   // New fields:
//   sweetsQuantity: { type: Number, default: 0, min: 0 },
//   preferredSweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
// });

// // ✅ Define General Handbags Schema (Standalone Handbags)
// const GeneralHandbagsSchema = new mongoose.Schema({
//   category: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "GiftBoxesCategory", 
//     required: true 
//   }, // ✅ Reference Category
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   price: { type: Number, required: true, min: 0 },
//   minOrderQuantity: { type: Number, required: true, min: 1 },
// });

// // ✅ Define GiftBoxCategory Schema
// const GiftBoxCategorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String, required: true },
// });

// const GiftBoxes = mongoose.model("GiftBoxes", GiftBoxesSchema);
// const GiftBoxesGeneralHandbags = mongoose.model("GiftBoxesGeneralHandbags", GeneralHandbagsSchema);
// const GiftBoxesCategory = mongoose.model("GiftBoxesCategory", GiftBoxCategorySchema);

// module.exports = { GiftBoxes, GiftBoxesGeneralHandbags, GiftBoxesCategory };



const mongoose = require("mongoose");

// ✅ Define Handbag Schema (Used for Matching & General Handbags)
const HandbagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { 
    url: { type: String, required: true }, // Cloudinary URL
    public_id: { type: String, required: true } // Cloudinary public ID for deletion/updating
  },
  price: { type: Number, required: true, min: 0 },
  minOrderQuantity: { type: Number, required: true, min: 1 },
});

// ✅ Define Gift Box Schema with new fields for sweets
const GiftBoxesSchema = new mongoose.Schema({
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "GiftBoxesCategory", 
    required: true 
  }, 
  name: { type: String, required: true },
  image: { 
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  minOrderQuantity: { type: Number, required: true, min: 1 },
  matchingHandbags: [HandbagSchema],
  sweetsQuantity: { type: Number, default: 0, min: 0 },
  preferredSweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

// ✅ Define General Handbags Schema (Standalone Handbags)
const GeneralHandbagsSchema = new mongoose.Schema({
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "GiftBoxesCategory", 
    required: true 
  }, 
  name: { type: String, required: true },
  image: { 
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  price: { type: Number, required: true, min: 0 },
  minOrderQuantity: { type: Number, required: true, min: 1 },
});

// ✅ Define GiftBoxCategory Schema
const GiftBoxCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { 
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
});

const GiftBoxes = mongoose.model("GiftBoxes", GiftBoxesSchema);
const GiftBoxesGeneralHandbags = mongoose.model("GiftBoxesGeneralHandbags", GeneralHandbagsSchema);
const GiftBoxesCategory = mongoose.model("GiftBoxesCategory", GiftBoxCategorySchema);

module.exports = { GiftBoxes, GiftBoxesGeneralHandbags, GiftBoxesCategory };