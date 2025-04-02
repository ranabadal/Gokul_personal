// Controllers/banquetController.js
const Banquet = require('../../Models/Tasks/BanquetHall');



// Add a new banquet
exports.addBanquet = async (req, res) => {
  try {
    const { title, description, price, oldPrice, perPlatePrice, seatingCapacity, rating, images } = req.body;

    // Validate required fields
    if (!title || !description || !price || !seatingCapacity || !images) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const newBanquet = new Banquet({
      title,
      description,
      price,
      oldPrice,
      perPlatePrice,
      seatingCapacity,
      rating,
      images: images.map(image => ({
        data: image.split(',')[1],
        contentType: image.split(',')[0].split(':')[1].split(';')[0]
      }))
    });

    await newBanquet.save();
    res.status(201).json({ success: true, banquet: newBanquet });
  } catch (error) {
    console.error('Error adding banquet:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


// Update an existing banquet
exports.updateBanquet = async (req, res) => {
    try {
      const { title, description, price, oldPrice, perPlatePrice, seatingCapacity, rating, newImages, existingImages } = req.body;
  
      const banquet = await Banquet.findById(req.params.id);
      if (!banquet) {
        return res.status(404).json({ success: false, message: 'Banquet not found' });
      }
  
      // Merge existing images with new images, ensuring no duplication
      banquet.images = [
        ...existingImages,
        ...newImages.map(image => ({
          data: image.data,
          contentType: image.contentType
        }))
      ];
      
      // Update other fields
      banquet.title = title;
      banquet.description = description;
      banquet.price = price;
      banquet.oldPrice = oldPrice;
      banquet.perPlatePrice = perPlatePrice;
      banquet.seatingCapacity = seatingCapacity;
      banquet.rating = rating;
  
      await banquet.save();
  
      res.status(200).json({ success: true, banquet });
    } catch (error) {
      console.error('Error updating banquet:', error);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  };
  
// Get all banquets
exports.getAllBanquets = async (req, res) => {
  try {
    const banquets = await Banquet.find();
    res.status(200).json({ success: true, banquets });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};



// // Get banquet details (without images)
// exports.getAllBanquets = async (req, res) => {
//   try {
//     const banquets = await Banquet.find().select('title description price seatingCapacity rating');
//     res.status(200).json({ success: true, banquets });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error });
//   }
// };

// // Get banquet images separately
// exports.getBanquetImages = async (req, res) => {
//   try {
//     const images = await Banquet.find().select('_id images');
//     res.status(200).json({ success: true, images });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error });
//   }
// };

// Get a banquet by ID
exports.getBanquetById = async (req, res) => {
  try {
    const banquet = await Banquet.findById(req.params.id);
    if (!banquet) return res.status(404).json({ success: false, message: 'Banquet not found' });
    res.status(200).json({ success: true, banquet });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Delete a banquet by ID
exports.deleteBanquet = async (req, res) => {
  try {
    const banquet = await Banquet.findByIdAndDelete(req.params.id);
    if (!banquet) return res.status(404).json({ success: false, message: 'Banquet not found' });
    res.status(200).json({ success: true, message: 'Banquet deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Controllers/banquetController.js

// Controllers/banquetController.js

exports.deleteImage = async (req, res) => {
    try {
      const { banquetId, imageIndex } = req.params;
      console.log(`Attempting to delete image at index ${imageIndex} from banquet with ID ${banquetId}`);
  
      const banquet = await Banquet.findById(banquetId);
      if (!banquet) {
        console.log('Banquet not found');
        return res.status(404).json({ success: false, message: 'Banquet not found' });
      }
  
      if (imageIndex >= 0 && imageIndex < banquet.images.length) {
        banquet.images.splice(imageIndex, 1);
        await banquet.save();
        console.log('Image deleted successfully');
        res.status(200).json({ success: true, message: 'Image deleted successfully' });
      } else {
        console.log('Invalid image index:', imageIndex);
        res.status(400).json({ success: false, message: 'Invalid image index' });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  };
  
  
  exports.editBanquet = async (req, res) => {
    try {
      const { id } = req.params; // Use 'id' instead of 'banquetId'
      const updateData = req.body;
  
      console.log(`Attempting to update banquet with ID ${id}`);
      console.log('Update Data:', updateData);
  
      if (updateData.images) {
        console.log('Received Images:', updateData.images);
      }
  
      const banquet = await Banquet.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  
      if (!banquet) {
        console.log('Banquet not found');
        return res.status(404).json({ success: false, message: 'Banquet not found' });
      }
  
      console.log('Banquet updated successfully', banquet);
      res.status(200).json({ success: true, banquet });
    } catch (error) {
      console.error('Error updating banquet:', error);
      console.error('Detailed Error:', error.stack);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  };
  