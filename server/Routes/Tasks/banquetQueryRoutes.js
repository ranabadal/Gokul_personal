const express = require("express");
const {
    createQuery,
  getAllQueries,
  getQueryById,
  updateQuery,
  approveQuery,
  deleteQuery,
  getUserQueries,
  cancelUserOrder
} = require("../../Controllers/Tasks/banquetQueryController");


const { isAuthenticated } = require("../../Middlewares/isAuthenticated"); // Middleware for authentication

const router = express.Router();

// Create a new banquet query
router.post("/", isAuthenticated, createQuery);

// Get all banquet queries
router.get("/", isAuthenticated, getAllQueries);

router.get("/user", isAuthenticated, getUserQueries);


// Get a specific banquet query by ID
router.get("/:id", isAuthenticated, getQueryById);


// Update a banquet query by ID
router.put("/:id", isAuthenticated, updateQuery);

// Delete a banquet query by ID
router.delete("/:id", isAuthenticated, deleteQuery);

router.put("/:id/approve", isAuthenticated, approveQuery);


router.put("/:id/cancel", isAuthenticated, cancelUserOrder);

module.exports = router;