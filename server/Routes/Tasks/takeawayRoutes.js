// const express = require("express");
// const router = express.Router();
// const takeawayController = require("../../Controllers/Tasks/takeawayController");
// const { isAuthenticated } = require("../../Middlewares/isAuthenticated");

// // 📌 Place Order (Checkout)
// router.post("/checkout", isAuthenticated,takeawayController.placeOrder);

// // 📌 Get All Orders (Admin)
// router.get("/orders",isAuthenticated, takeawayController.getOrders);


// router.get("/orders/:orderId/cancel",isAuthenticated, takeawayController.cancelTakeawayOrder);

// // 📌 Update Order Status (Admin)
// router.put("/orders/:orderId/status", isAuthenticated,takeawayController.updateOrderStatus);

// module.exports = router;



const express = require("express");
const router = express.Router();
const takeawayController = require("../../Controllers/Tasks/takeawayController");
const { isAuthenticated } = require("../../Middlewares/isAuthenticated");

// 📌 Debug controller functions
console.log("🛠 Loaded takeawayController functions:", Object.keys(takeawayController));

// 📌 Place Order (Checkout)
router.post("/checkout", isAuthenticated, takeawayController.placeOrder);

// 📌 Get All Orders (Admin)
router.get("/orders", isAuthenticated, takeawayController.getOrders);

// 📌 Accept Order
router.put("/orders/:orderId/accept", isAuthenticated, takeawayController.acceptOrder);

// 📌 Get User order
router.get("/orders/user", isAuthenticated, takeawayController.getUserOrders);

// 📌 Reject Order
router.put("/orders/:orderId/reject", isAuthenticated, takeawayController.rejectOrder);

// 📌 Cancel Order
router.put("/orders/:orderId/cancel", isAuthenticated, takeawayController.cancelTakeawayOrder);

// 📌 Update Order Status (Admin)
if (takeawayController.updateOrderStatus) {
  router.put("/orders/:orderId/status", isAuthenticated, takeawayController.updateOrderStatus);
} else {
  console.warn("⚠️ Warning: updateOrderStatus is undefined in takeawayController!");
}

module.exports = router;