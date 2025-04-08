const express = require("express");
const router = express.Router();
const dealController = require("../../Controllers/Tasks/TodaysDealProduct.controller");

// Routes
router.put("/deals/:id", dealController.editDeal);
router.delete("/deals/:id", dealController.deleteDeal);
router.get("/deals/active", dealController.getActiveDeals);
router.get("/deals/upcoming", dealController.getUpcomingDeals);
router.get("/deals/expired", dealController.getExpiredDeals);
router.get("/deals/all", dealController.getAllDeals);
router.post("/deals/add", dealController.createDeal);


module.exports = router;