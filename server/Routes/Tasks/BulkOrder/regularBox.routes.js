// regularBox.routes.js
const express = require("express");
const router = express.Router();
const regularBoxController = require("../../../Controllers/Tasks/BulkOrder/regularBox.controller");

// Get all regular boxes
router.get("/", regularBoxController.getAllRegularBoxes);

// Get a specific regular box by ID
router.get("/:id", regularBoxController.getRegularBoxById);

// Create a new regular box
router.post("/", regularBoxController.createRegularBox);

// Update a regular box by ID
router.put("/:id", regularBoxController.updateRegularBox);

// Delete a regular box by ID
router.delete("/:id", regularBoxController.deleteRegularBox);

module.exports = router;