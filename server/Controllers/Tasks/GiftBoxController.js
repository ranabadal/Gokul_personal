const GiftBox = require('../../Models/Tasks/GiftBox');

// Add a new gift box
exports.addGiftBox = async (req, res) => {
  try {
    const { title, description,size, price, oldPrice, images } = req.body;

    // Validate required fields
    if (!title || !description || !price || !images || !size) {
      return res.status(400).json({ success: false, message: 'Required fields are missing.' });
    }

    const newGiftBox = new GiftBox({
      title,
      description,
      size,
      price,
      oldPrice,
      images: images.map(image => ({
        data: image.split(',')[1], // Base64 content
        contentType: image.split(',')[0].split(':')[1].split(';')[0] // Extract content type
      }))
    });

    await newGiftBox.save();
    res.status(201).json({ success: true, giftBox: newGiftBox });
  } catch (error) {
    console.error('Error adding gift box:', error);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

// Update an existing gift box
exports.updateGiftBox = async (req, res) => {
  try {
    const { title, description, price,size, oldPrice, newImages, existingImages } = req.body;

    const giftBox = await GiftBox.findById(req.params.id);
    if (!giftBox) {
      return res.status(404).json({ success: false, message: 'Gift box not found.' });
    }

    // Merge existing and new images
    giftBox.images = [
      ...(existingImages || []), // Keep existing images if provided
      ...(newImages || []).map(image => ({
        data: image.split(',')[1], // Base64 content
        contentType: image.split(',')[0].split(':')[1].split(';')[0] // Extract content type
      }))
    ];

    // Update other fields
    giftBox.title = title || giftBox.title;
    giftBox.size = size || giftBox.size;
    giftBox.description = description || giftBox.description;
    giftBox.price = price || giftBox.price;
    giftBox.oldPrice = oldPrice || giftBox.oldPrice;

    await giftBox.save();
    res.status(200).json({ success: true, giftBox });
  } catch (error) {
    console.error('Error updating gift box:', error);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

// Get all gift boxes
exports.getAllGiftBoxes = async (req, res) => {
  try {
    const giftBoxes = await GiftBox.find();
    res.status(200).json({ success: true, giftBoxes });
  } catch (error) {
    console.error('Error fetching gift boxes:', error);
    res.status(500).json({ success: false, message: 'Server error.', error });
  }
};

// Get a single gift box by ID
exports.getGiftBoxById = async (req, res) => {
  try {
    const giftBox = await GiftBox.findById(req.params.id);
    if (!giftBox) {
      return res.status(404).json({ success: false, message: 'Gift box not found.' });
    }
    res.status(200).json({ success: true, giftBox });
  } catch (error) {
    console.error('Error fetching gift box:', error);
    res.status(500).json({ success: false, message: 'Server error.', error });
  }
};

// Delete a gift box by ID
exports.deleteGiftBox = async (req, res) => {
  try {
    const giftBox = await GiftBox.findByIdAndDelete(req.params.id);
    if (!giftBox) {
      return res.status(404).json({ success: false, message: 'Gift box not found.' });
    }
    res.status(200).json({ success: true, message: 'Gift box deleted successfully.' });
  } catch (error) {
    console.error('Error deleting gift box:', error);
    res.status(500).json({ success: false, message: 'Server error.', error });
  }
};

// Delete an image from a gift box by index
exports.deleteGiftBoxImage = async (req, res) => {
  try {
    const { giftBoxId, imageIndex } = req.params;

    const giftBox = await GiftBox.findById(giftBoxId);
    if (!giftBox) {
      return res.status(404).json({ success: false, message: 'Gift box not found.' });
    }

    if (imageIndex >= 0 && imageIndex < giftBox.images.length) {
      giftBox.images.splice(imageIndex, 1); // Remove the image
      await giftBox.save();
      res.status(200).json({ success: true, message: 'Image deleted successfully.' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid image index.' });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};
