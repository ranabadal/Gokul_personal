// Routes/banquetRoutes.js
const express = require('express');
const router = express.Router();
const banquetController = require('../../Controllers/Tasks/BanquetHallController');

router.get('/banquets', banquetController.getAllBanquets);

router.get('/banquets/:id', banquetController.getBanquetById);
router.post('/banquets', banquetController.addBanquet);
router.put('/banquets/:id', banquetController.updateBanquet);
router.delete('/banquets/:id', banquetController.deleteBanquet);
router.delete('/banquets/:banquetId/images/:imageIndex', banquetController.deleteImage);
router.put('/banquets/:banquetId', banquetController.editBanquet);

module.exports = router;
