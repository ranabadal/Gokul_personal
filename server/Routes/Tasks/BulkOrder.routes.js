const express = require('express');
const router = express.Router();
const bulkOrderController = require('../../Controllers/Tasks/BulkOrderController');

// Get all bulk orders
router.get('/bulkOrders', bulkOrderController.getAllBulkOrders);

// Get a bulk order by ID
router.get('/bulkOrders/:id', bulkOrderController.getBulkOrderById);

// Add a new bulk order
router.post('/bulkOrders', bulkOrderController.addBulkOrder);

// Update a bulk order
router.put('/bulkOrders/:id', bulkOrderController.updateBulkOrder);

// Delete a bulk order
router.delete('/bulkOrders/:id', bulkOrderController.deleteBulkOrder);

// Delete an image from a bulk order by index
router.delete('/bulkOrders/:bulkOrderId/images/:imageIndex', bulkOrderController.deleteBulkOrderImage);

module.exports = router;
