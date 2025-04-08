const Product = require("../../Models/Tasks/restaurentProducts");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, subcategory, price, image, description } = req.body;

    if (!name || !subcategory || !price || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const product = new Product({ name, subcategory, price, image, description });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, subcategory, price, image, description } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      { name, subcategory, price, image, description }, 
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};