const express = require("express");
const {
    createQuery,
    getAllQueries,
    getQueryById,
    updateQuery,
    deleteQuery,
    approveQuery
} = require("../../Controllers/Tasks/GiftBoxOrderQueryController");

const {isAuthenticated} = require("../../Middlewares/isAuthenticated"); // Middleware to verify logged-in user
const router = express.Router();

// Routes for CRUD operations (protect routes with authentication)
router.post("/", isAuthenticated, createQuery); // Create
router.get("/", isAuthenticated, getAllQueries); // Read all
router.get("/:id", isAuthenticated, getQueryById); // Read by ID
router.put("/:id", isAuthenticated, updateQuery); // Update
router.delete("/:id", isAuthenticated, deleteQuery); // Delete
router.put("/:id/approve", isAuthenticated, approveQuery); // Delete


module.exports = router;