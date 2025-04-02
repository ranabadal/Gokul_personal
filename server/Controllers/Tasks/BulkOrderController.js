const BulkOrder = require('../../Models/Tasks/BulkOrder');

// Add a new bulk order
exports.addBulkOrder = async (req, res) => {
  try {
    const { title, description, price,size, oldPrice, images } = req.body;

    // Validate required fields
    if (!title || !description || !price || !images || !size) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const newBulkOrder = new BulkOrder({
      title,
      description,
      price,
      size,
      oldPrice,
      images: images.map(image => ({
        data: image.split(',')[1], // Extract Base64 data
        contentType: image.split(',')[0].split(':')[1].split(';')[0] // Extract content type
      }))
    });

    await newBulkOrder.save();
    res.status(201).json({ success: true, bulkOrder: newBulkOrder });
  } catch (error) {
    console.error('Error adding bulk order:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update an existing bulk order
exports.updateBulkOrder = async (req, res) => {
  try {
    const { title, description, size, price, oldPrice, newImages, existingImages } = req.body;

    const bulkOrder = await BulkOrder.findById(req.params.id);
    if (!bulkOrder) {
      return res.status(404).json({ success: false, message: 'Bulk order not found' });
    }

    // Merge existing images with new images
    bulkOrder.images = [
      ...existingImages, // Keep existing images
      ...newImages.map(image => ({
        data: image.split(',')[1], // Extract Base64 data
        contentType: image.split(',')[0].split(':')[1].split(';')[0] // Extract content type
      }))
    ];

    // Update other fields
    bulkOrder.title = title;
    bulkOrder.size = size;
    bulkOrder.description = description;
    bulkOrder.price = price;
    bulkOrder.oldPrice = oldPrice;

    await bulkOrder.save();
    res.status(200).json({ success: true, bulkOrder });
  } catch (error) {
    console.error('Error updating bulk order:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all bulk orders
exports.getAllBulkOrders = async (req, res) => {
  try {
    const bulkOrders = await BulkOrder.find();
    res.status(200).json({ success: true, bulkOrders });
  } catch (error) {
    console.error('Error fetching bulk orders:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Get a bulk order by ID
exports.getBulkOrderById = async (req, res) => {
  try {
    const bulkOrder = await BulkOrder.findById(req.params.id);
    if (!bulkOrder) {
      return res.status(404).json({ success: false, message: 'Bulk order not found' });
    }
    res.status(200).json({ success: true, bulkOrder });
  } catch (error) {
    console.error('Error fetching bulk order:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Delete a bulk order by ID
exports.deleteBulkOrder = async (req, res) => {
  try {
    const bulkOrder = await BulkOrder.findByIdAndDelete(req.params.id);
    if (!bulkOrder) {
      return res.status(404).json({ success: false, message: 'Bulk order not found' });
    }
    res.status(200).json({ success: true, message: 'Bulk order deleted successfully' });
  } catch (error) {
    console.error('Error deleting bulk order:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Delete an image by index from a bulk order
exports.deleteBulkOrderImage = async (req, res) => {
  try {
    const { bulkOrderId, imageIndex } = req.params;

    const bulkOrder = await BulkOrder.findById(bulkOrderId);
    if (!bulkOrder) {
      return res.status(404).json({ success: false, message: 'Bulk order not found' });
    }

    if (imageIndex >= 0 && imageIndex < bulkOrder.images.length) {
      bulkOrder.images.splice(imageIndex, 1); // Remove the image
      await bulkOrder.save();
      res.status(200).json({ success: true, message: 'Image deleted successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid image index' });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
