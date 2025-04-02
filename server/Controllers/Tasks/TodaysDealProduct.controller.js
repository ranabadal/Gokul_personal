const TodaysDealProduct = require('../../Models/Tasks/TodaysDealProduct.model');



// Add a new product
exports.addTodaysDealProduct = async (req, res) => {
  try {
    const { name, image, discountPercent, discountPrice, originalPrice, rating, reviewCount } = req.body;

    const newProduct = new TodaysDealProduct({
      name,
      discountPrice,
      originalPrice,
      discountPercent,
      rating,
      reviewCount,
      image: image ? { data: image.split(',')[1], contentType: image.split(',')[0].split(':')[1].split(';')[0] } : null
    });

    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Update an existing product
exports.updateTodaysDealProduct = async (req, res) => {
  try {
    const { name, image, discountPrice,discountPercent, originalPrice, rating, reviewCount } = req.body;
    const updatedProduct = {
      name,
      discountPrice,
      originalPrice,
      discountPercent,
      rating,
      reviewCount,
      image: image ? { data: image.split(',')[1], contentType: image.split(',')[0].split(':')[1].split(';')[0] } : null
    };

    const product = await TodaysDealProduct.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Get all products with filters and pagination
exports.getAllTodaysDealProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const products = await TodaysDealProduct.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Get a product by ID
exports.getTodaysDealProductById = async (req, res) => {
  try {
    const product = await TodaysDealProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Delete a product by ID
exports.deleteTodaysDealProduct = async (req, res) => {
  try {
    const product = await TodaysDealProduct.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
