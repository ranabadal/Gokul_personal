const express = require('express');
const router = express.Router();
const giftBoxController = require('../../Controllers/Tasks/GiftBoxController');

// Get all gift boxes
router.get('/giftBoxes', giftBoxController.getAllGiftBoxes);

// Get a single gift box by ID
router.get('/giftBoxes/:id', giftBoxController.getGiftBoxById);

// Add a new gift box
router.post('/giftBoxes', giftBoxController.addGiftBox);

// Update an existing gift box
router.put('/giftBoxes/:id', giftBoxController.updateGiftBox);

// Delete a gift box by ID
router.delete('/giftBoxes/:id', giftBoxController.deleteGiftBox);

// Delete an image from a gift box by index
router.delete('/giftBoxes/:giftBoxId/images/:imageIndex', giftBoxController.deleteGiftBoxImage);

module.exports = router;
