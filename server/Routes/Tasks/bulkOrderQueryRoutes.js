const express = require("express");
const {
    createQuery,
    getAllQueries,
    getBulkQueryById,
    updateQuery,
    deleteQuery,
    approveQuery,
    getUserBulkOrders,
    cancelUserOrder
} = require("../../Controllers/Tasks/BulkOrderQueryController");

const {isAuthenticated} = require("../../Middlewares/isAuthenticated"); // Middleware to verify logged-in user
const router = express.Router();

// Routes for CRUD operations (protect routes with authentication)
router.post("/", isAuthenticated, createQuery); // Create
router.get("/", isAuthenticated, getAllQueries); // Read all
router.get("/user", isAuthenticated, getUserBulkOrders); // Read all
router.get("/:id", isAuthenticated, getBulkQueryById); // Read by ID
router.put("/:id", isAuthenticated, updateQuery); // Update
router.delete("/:id", isAuthenticated, deleteQuery); // Delete
router.put("/:id/approve", isAuthenticated, approveQuery); // Delete
router.put("/:id/cancel", isAuthenticated, cancelUserOrder); // Delete
module.exports = router;