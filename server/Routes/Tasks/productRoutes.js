// const express = require("express");
// const multer = require("multer");
// const path = require('path');
// const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, getProductReviews } = require("../../Controllers/Tasks/productController");

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../../uploads'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, 
// });

// router.get("/", getAllProducts);
// router.get("/:id", getProductById);
// router.post("/add", upload.array("images", 10), addProduct);
// router.put("/update/:id", upload.array("images", 10), updateProduct);
// router.delete("/delete/:id", deleteProduct);
// router.get("/:id/reviews", getProductReviews);

// module.exports = router;



// const express = require("express");
// const multer = require("multer");
// const path = require('path');
// const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require("../../Controllers/Tasks/productController");

// const router = express.Router();

// // Multer setup for image uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../../uploads'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, 
// });

// router.get("/", getAllProducts);
// router.get("/:id", getProductById);
// router.post("/add", upload.array("images", 10), addProduct); // Max 10 images
// router.put("/update/:id", upload.array("images", 10), updateProduct);
// router.delete("/delete/:id", deleteProduct);

// module.exports = router;


// gokuls 
const express = require('express');
const router = express.Router();
const productController = require('../../Controllers/Tasks/productController');

// Route to get all products with filters and pagination
router.get('/products', productController.getAllProducts);

// Route to get a product by ID
router.get('/products/:id', productController.getProductById);

// Route to add a new product
router.post('/products', productController.addProduct);

// Route to update a product by ID
router.put('/products/:id', productController.updateProduct);

// Route to delete a product by ID
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
