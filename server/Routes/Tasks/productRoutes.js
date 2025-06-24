

// gokuls 
const express = require('express');
const router = express.Router();
const productController = require('../../Controllers/Tasks/productController');
const upload = require('../../Middlewares/upload'); // Cloudinary image middleware

// ✅ Get all products with filters and pagination
router.get('/products', productController.getAllProducts);

// ✅ Get a product by ID
router.get('/products/:id', productController.getProductById);

// ✅ Add a new product (with Cloudinary image upload)
router.post('/products', upload.single("image"), productController.addProduct);

// ✅ Update a product (with optional new Cloudinary image upload)
router.put('/products/:id', upload.single("image"), productController.updateProduct);

// ✅ Delete a product by ID
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;