








// const Product = require('../../Models/Tasks/Product');

// // Add a new product
// exports.addProduct = async (req, res) => {
//   try {
//     const { category, subcategory, name, description, price, rating, reviewCount, image, oldPrice, bulkOrderAvailable } = req.body;

//     const newProduct = new Product({
//       category,
//       subcategory,
//       name,
//       description,
//       price,
//       rating,
//       reviewCount,
//       image,
//       oldPrice,
//       bulkOrderAvailable // Added bulk order field
//     });

//     await newProduct.save();
//     res.status(201).json({ success: true, product: newProduct });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error });
//   }
// };

// // Update an existing product
// exports.updateProduct = async (req, res) => {
//   try {
//     const { category, subcategory, name, description, price, rating, reviewCount, image, oldPrice, bulkOrderAvailable } = req.body;

//     const updatedProduct = {
//       category,
//       subcategory,
//       name,
//       description,
//       price,
//       rating,
//       reviewCount,
//       image,
//       oldPrice,
//       bulkOrderAvailable // Added bulk order field
//     };

//     const product = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });
//     if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

//     res.status(200).json({ success: true, product });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error });
//   }
// };

// // Get all products with filters and pagination
// exports.getAllProducts = async (req, res) => {
//   try {
//     const { page = 1, limit = 100 } = req.query;

//     let products = await Product.find()
//       .limit(Number(limit))
//       .skip((Number(page) - 1) * Number(limit));

//     res.status(200).json({ success: true, products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error });
//   }
// };

// // Get a product by ID
// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

//     res.status(200).json({ success: true, product });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error });
//   }
// };

// // Delete a product by ID
// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

//     res.status(200).json({ success: true, message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error });
//   }
// };







const Product = require('../../Models/Tasks/Product');
const cloudinary = require('../../utils/cloudinary'); // Cloudinary config

// ✅ Add a new product with Cloudinary image
exports.addProduct = async (req, res) => {
  try {
    const { category, subcategory, name, description, price, rating, reviewCount, oldPrice, bulkOrderAvailable } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Product image is required' });
    }

    // Cloudinary image storage
    const image = {
      url: req.file.path,
      public_id: req.file.filename,
    };

    const newProduct = new Product({
      category,
      subcategory,
      name,
      description,
      price,
      rating,
      reviewCount,
      image, // Storing Cloudinary image object
      oldPrice,
      bulkOrderAvailable
    });

    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { category, subcategory, name, description, price, bulkOrderAvailable } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    let updatedImage = product.image; // default to existing image

    // Only update image if a new file is provided
    if (req.file) {
      // Check if the current image has a valid public_id before deleting
      if (product.image && product.image.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }
      
      updatedImage = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    // Update other fields
    product.category = category;
    product.subcategory = subcategory;
    product.name = name;
    product.description = description;
    product.price = price;
  
    product.image = updatedImage;
    
    product.bulkOrderAvailable = bulkOrderAvailable;

    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ Get all products with filters and pagination
exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 100 } = req.query;

    let products = await Product.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ Delete a product and remove its Cloudinary image
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(product.image.public_id);

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};