const express = require("express");
const router = express.Router();
const adminController = require("../../../Controllers/Tasks/BulkOrder/GiftBoxesForBulkOrder.controller");

// ✅ Category Routes
router.get("/categories", adminController.getAllCategories);
router.post("/categories", adminController.createCategory);
router.put("/categories/:id", adminController.updateCategory);
router.delete("/categories/:id", adminController.deleteCategory);

// ✅ Gift Box Routes
router.get("/giftBoxes", adminController.getAllGiftBoxes);
router.post("/giftBoxes", adminController.createGiftBox);
router.put("/giftBoxes/:id", adminController.updateGiftBox);
router.delete("/giftBoxes/:id", adminController.deleteGiftBox);

// ✅ General Handbag Routes
router.get("/generalHandbags", adminController.getAllGeneralHandbags);
router.post("/generalHandbags", adminController.createGeneralHandbag);
router.put("/generalHandbags/:id", adminController.updateGeneralHandbag);
router.delete("/generalHandbags/:id", adminController.deleteGeneralHandbag);

module.exports = router;