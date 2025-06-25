// // Routes/banquetRoutes.js
// const express = require('express');
// const router = express.Router();
// const banquetController = require('../../Controllers/Tasks/BanquetHallController');

// router.get('/banquets', banquetController.getAllBanquets);

// router.get('/banquets/:id', banquetController.getBanquetById);
// router.post('/banquets', banquetController.addBanquet);
// router.put('/banquets/:id', banquetController.updateBanquet);
// router.delete('/banquets/:id', banquetController.deleteBanquet);
// router.delete('/banquets/:banquetId/images/:imageIndex', banquetController.deleteImage);
// router.put('/banquets/:banquetId', banquetController.editBanquet);

// module.exports = router;



const express = require('express');
const router = express.Router();
const banquetController = require('../../Controllers/Tasks/BanquetHallController');
const upload = require('../../Middlewares/upload'); // 🆕 multer middleware for Cloudinary

// Get all banquets
router.get('/banquets', banquetController.getAllBanquets);

// Get banquet by ID
router.get('/banquets/:id', banquetController.getBanquetById);

// Add new banquet (with image upload)
router.post('/banquets', upload.array('images', 5), banquetController.addBanquet);

// Update banquet (with image upload)
router.put('/banquets/:id', upload.array('images', 5), banquetController.updateBanquet);

// Delete entire banquet
router.delete('/banquets/:id', banquetController.deleteBanquet);

// Delete a single image by index
router.delete('/banquets/:banquetId/images/:imageIndex', banquetController.deleteImage);

// Edit other fields (if you’re not uploading new images here)
router.put('/banquets/:banquetId/edit', banquetController.editBanquet); // 🆕 Better naming to avoid conflict

module.exports = router;