// const express = require("express");
// const router = express.Router();
// const adminController = require("../../../Controllers/Tasks/BulkOrder/GiftBoxesForBulkOrder.controller");

// // ✅ Category Routes
// router.get("/categories", adminController.getAllCategories);
// router.post("/categories", adminController.createCategory);
// router.put("/categories/:id", adminController.updateCategory);
// router.delete("/categories/:id", adminController.deleteCategory);

// // ✅ Gift Box Routes
// router.get("/giftBoxes", adminController.getAllGiftBoxes);
// router.post("/giftBoxes", adminController.createGiftBox);
// router.put("/giftBoxes/:id", adminController.updateGiftBox);
// router.delete("/giftBoxes/:id", adminController.deleteGiftBox);

// // ✅ General Handbag Routes
// router.get("/generalHandbags", adminController.getAllGeneralHandbags);
// router.post("/generalHandbags", adminController.createGeneralHandbag);
// router.put("/generalHandbags/:id", adminController.updateGeneralHandbag);
// router.delete("/generalHandbags/:id", adminController.deleteGeneralHandbag);

// module.exports = router;


const express = require("express");
const router = express.Router();
const adminController = require("../../../Controllers/Tasks/BulkOrder/GiftBoxesForBulkOrder.controller");
const upload = require("../../../Middlewares/upload");

// ✅ Bulkorders Category Routes
router.get("/categories", adminController.getAllCategories);
router.post("/categories", upload.single("image"), adminController.createCategory);
router.put("/categories/:id", upload.single("image"), adminController.updateCategory);
router.delete("/categories/:id", adminController.deleteCategory);

// ✅ Bulkorders Gift Box Routes
router.get("/giftBoxes", adminController.getAllGiftBoxes);
router.post("/giftBoxes", upload.single("image"), adminController.createGiftBox);
router.put("/giftBoxes/:id", upload.single("image"), adminController.updateGiftBox);
router.delete("/giftBoxes/:id", adminController.deleteGiftBox);

// ✅ Bulkorders General Handbag Routes
router.get("/generalHandbags", adminController.getAllGeneralHandbags);
router.post("/generalHandbags", upload.single("image"), adminController.createGeneralHandbag);
router.put("/generalHandbags/:id", upload.single("image"), adminController.updateGeneralHandbag);
router.delete("/generalHandbags/:id", adminController.deleteGeneralHandbag);

module.exports = router;