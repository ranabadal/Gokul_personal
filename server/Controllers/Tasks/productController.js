// const Product = require('../../Models/Tasks/Product');

// // Add a new product
// exports.addProduct = async (req, res) => {
//   try {
//     const { category, name, description, price, rating, reviewCount, image } = req.body;

//     const newProduct = new Product({
//       category,
//       name,
//       description,
//       price,
//       rating,
//       reviewCount,
//       image: image ? { data: image.split(',')[1], contentType: image.split(',')[0].split(':')[1].split(';')[0] } : null
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
//     const { category, name, description, price, rating, reviewCount, image } = req.body;
//     const updatedProduct = {
//       category,
//       name,
//       description,
//       price,
//       rating,
//       reviewCount,
//       image: image ? { data: image.split(',')[1], contentType: image.split(',')[0].split(':')[1].split(';')[0] } : null
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
//     const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

//     const query = {};
//     if (category) query.category = category;
//     if (minPrice) query.price = { $gte: Number(minPrice) };
//     if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

//     const products = await Product.find(query)
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

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { category,subcategory, name, description, price, rating, reviewCount, image, oldPrice } = req.body;

    const newProduct = new Product({
      category,
      subcategory,
      name,
      description,
      price,
      rating,
      reviewCount,
      // image: image ? { data: image.split(',')[1], contentType: image.split(',')[0].split(':')[1].split(';')[0] } : null,
      image,
      
      oldPrice
      
    });

    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const { category,subcategory, name, description, price, rating, reviewCount, image, oldPrice } = req.body;
    const updatedProduct = {
      category,
      subcategory,
      name,
      description,
      price,
      rating,
      reviewCount,
      // image: image ? { data: image.split(',')[1], contentType: image.split(',')[0].split(':')[1].split(';')[0] } : null,
      image,
      
      oldPrice,
      
      
    };

    const product = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Get all products with filters and pagination
exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 100, isTodaysDeal } = req.query;
 
  
    let products = []
   
      products = await Product.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
