// const express = require("express");
// const {
//     createQuery,
//     getAllQueries,
//     getQueryById,
//     updateQuery,
//     deleteQuery,
//     approveQuery,
//     getUserOrders,
//     cancelUserOrder
// } = require("../../../Controllers/Tasks/GiftBoxes/GiftBoxOrderQueryController");

// const {isAuthenticated} = require("../../../Middlewares/isAuthenticated"); // Middleware to verify logged-in user
// const router = express.Router();

// // Routes for CRUD operations (protect routes with authentication)
// router.post("/", isAuthenticated, createQuery); // Create
// router.get("/", isAuthenticated, getAllQueries); // Read all
// router.get("/user", isAuthenticated, getUserOrders); // Read by ID
// router.get("/:id", isAuthenticated, getQueryById); // Read by ID

// router.put("/:id", isAuthenticated, updateQuery); // Update
// router.delete("/:id", isAuthenticated, deleteQuery); // Delete
// router.put("/:id/cancel", isAuthenticated, cancelUserOrder); // Read by ID
// router.put("/:id/approve", isAuthenticated, approveQuery); // Delete


// module.exports = router;



const express = require("express");
const {
  createQuery,
  getAllQueries,
  getUserOrders,
  getQueryById,
  updateQuery,
  deleteQuery,
  cancelUserOrder,
  approveQuery
} = require("../../../Controllers/Tasks/GiftBoxes/GiftBoxOrderQueryController");
const { isAuthenticated } = require("../../../Middlewares/isAuthenticated");
const router = express.Router();

router.post("/", isAuthenticated, createQuery);
router.get("/", isAuthenticated, getAllQueries);
router.get("/user", isAuthenticated, getUserOrders);
router.get("/:id", isAuthenticated, getQueryById);
router.put("/:id", isAuthenticated, updateQuery);
router.delete("/:id", isAuthenticated, deleteQuery);
router.put("/:id/cancel", isAuthenticated, cancelUserOrder);
router.put("/:id/approve", isAuthenticated, approveQuery);

module.exports = router;