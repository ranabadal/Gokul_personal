// const express = require("express");
// const {
//     createQuery,
//     getAllQueries,
//     getBulkQueryById,
//     updateQuery,
//     deleteQuery,
//     approveQuery,
//     getUserBulkOrders,
//     cancelUserOrder
// } = require("../../Controllers/Tasks/BulkOrderQueryController");

// const {isAuthenticated} = require("../../Middlewares/isAuthenticated"); // Middleware to verify logged-in user
// const router = express.Router();

// // Routes for CRUD operations (protect routes with authentication)
// router.post("/", isAuthenticated, createQuery); // Create
// router.get("/", isAuthenticated, getAllQueries); // Read all
// router.get("/user", isAuthenticated, getUserBulkOrders); // Read all
// router.get("/:id", isAuthenticated, getBulkQueryById); // Read by ID
// router.put("/:id", isAuthenticated, updateQuery); // Update
// router.delete("/:id", isAuthenticated, deleteQuery); // Delete
// router.put("/:id/approve", isAuthenticated, approveQuery); // Delete
// router.put("/:id/cancel", isAuthenticated, cancelUserOrder); // Delete
// module.exports = router;





const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../../../Middlewares/isAuthenticated"); // Middleware to verify logged-in user
const bulkOrderController = require("../../../Controllers/Tasks/BulkOrder/BulkOrderQueryController");

// Get all bulk order queries
router.get("/",isAuthenticated, bulkOrderController.getAllQueries);

// Get bulk orders for the logged-in user
router.get("/user", isAuthenticated,bulkOrderController.getUserBulkOrders);

// Get a specific bulk order query by ID
router.get("/:id",isAuthenticated, bulkOrderController.getBulkQueryById);

// Create a new bulk order query
router.post("/", isAuthenticated,bulkOrderController.createQuery);

// Update a bulk order query (admin)
router.put("/:id",isAuthenticated, bulkOrderController.updateQuery);

// Delete a bulk order query (admin)
router.delete("/:id", bulkOrderController.deleteQuery);

router.put("/:id/cancel", isAuthenticated, bulkOrderController.cancelQuery);

// Admin actions: Approve a bulk order query
router.put("/:id/approve", bulkOrderController.approveQuery);

// You can add further routes for rejecting, canceling, or processing if needed.
module.exports = router;