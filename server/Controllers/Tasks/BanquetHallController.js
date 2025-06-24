const Banquet = require('../../Models/Tasks/BanquetHall');
const cloudinary = require('../../utils/cloudinary'); // Ensure your Cloudinary configuration is correct

// ✅ Add a new banquet
exports.addBanquet = async (req, res) => {
  try {
    const { title, description, price, oldPrice, perPlatePrice, seatingCapacity, rating } = req.body;
 console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    // Validate required fields
    if (!title || !description || !price || !seatingCapacity) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    // Map the uploaded files to an array of images with Cloudinary URL and public_id
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => ({
        url: file.path,          // Cloudinary URL
        public_id: file.filename // Cloudinary public ID
      }));
    }

    const newBanquet = new Banquet({
      title,
      description,
      price,
      // oldPrice,
       perPlatePrice,
      seatingCapacity,
      // rating,
      images,
    });

    await newBanquet.save();
    res.status(201).json({ success: true, banquet: newBanquet });
  } catch (error) {
    console.error('Error adding banquet:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ Update an existing banquet (using manual object updates)
exports.updateBanquet = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      // oldPrice,
       perPlatePrice,
      seatingCapacity,
      // rating,
      existingImages, // Expecting an array or a JSON stringified array
    } = req.body;

    const banquet = await Banquet.findById(req.params.id);
    if (!banquet) {
      return res.status(404).json({ success: false, message: 'Banquet not found' });
    }

    // Map new files from Cloudinary if provided in req.files
    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = req.files.map(file => ({
        url: file.path,
        public_id: file.filename
      }));
    }

    // Handle existingImages: if not already an array, try to parse it
    let existingImagesArr = [];
    if (existingImages) {
      if (Array.isArray(existingImages)) {
        existingImagesArr = existingImages;
      } else {
        try {
          existingImagesArr = JSON.parse(existingImages);
        } catch (err) {
          console.error("Error parsing existingImages, defaulting to empty array:", err);
        }
      }
    }

    // Merge any previously saved images (sent as existingImages) with new uploads
    banquet.images = [...existingImagesArr, ...newImages];

    // Update the other fields
    banquet.title = title;
    banquet.description = description;
    banquet.price = price;
    // banquet.oldPrice = oldPrice;
    banquet.perPlatePrice = perPlatePrice;
    banquet.seatingCapacity = seatingCapacity;
    // banquet.rating = rating;

    await banquet.save();
    res.status(200).json({ success: true, banquet });
  } catch (error) {
    console.error('Error updating banquet:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ Alternative edit banquet endpoint using findByIdAndUpdate
exports.editBanquet = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      // oldPrice,
      perPlatePrice,
      seatingCapacity,
      // rating,
      existingImages, // Expecting an array or a JSON stringified array
    } = req.body;

    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = req.files.map(file => ({
        url: file.path,
        public_id: file.filename
      }));
    }

    let existingImagesArr = [];
    if (existingImages) {
      if (Array.isArray(existingImages)) {
        existingImagesArr = existingImages;
      } else {
        try {
          existingImagesArr = JSON.parse(existingImages);
        } catch (err) {
          console.error("Error parsing existingImages, defaulting to empty array:", err);
        }
      }
    }

    const updateData = {
      title,
      description,
      price,
      // oldPrice,
      perPlatePrice,
      seatingCapacity,
      // rating,
      images: [...existingImagesArr, ...newImages]
    };

    console.log(`Attempting to update banquet with ID ${id}`);
    console.log('Update Data:', updateData);

    const banquet = await Banquet.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!banquet) {
      console.log('Banquet not found');
      return res.status(404).json({ success: false, message: 'Banquet not found' });
    }

    console.log('Banquet updated successfully', banquet);
    res.status(200).json({ success: true, banquet });
  } catch (error) {
    console.error('Error updating banquet:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ Get all banquets with pagination
exports.getAllBanquets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const banquets = await Banquet.find()
      .select("title description price images") // adjust selection as needed
      .limit(limit)
      .skip(skip);

    const total = await Banquet.countDocuments();

    res.status(200).json({
      success: true,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      banquets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// ✅ Get a banquet by ID
exports.getBanquetById = async (req, res) => {
  try {
    const banquet = await Banquet.findById(req.params.id);
    if (!banquet)
      return res.status(404).json({ success: false, message: 'Banquet not found' });
    res.status(200).json({ success: true, banquet });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// ✅ Delete a banquet by ID
exports.deleteBanquet = async (req, res) => {
  try {
    const banquet = await Banquet.findByIdAndDelete(req.params.id);
    if (!banquet)
      return res.status(404).json({ success: false, message: 'Banquet not found' });
    res.status(200).json({ success: true, message: 'Banquet deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// ✅ Delete a single image from a banquet by index
exports.deleteImage = async (req, res) => {
  try {
    const { banquetId, imageIndex } = req.params;

    const banquet = await Banquet.findById(banquetId);
    if (!banquet) {
      return res.status(404).json({ success: false, message: 'Banquet not found' });
    }

    const index = parseInt(imageIndex);
    if (index >= 0 && index < banquet.images.length) {
      const imageToDelete = banquet.images[index];

      // Delete image from Cloudinary using its public_id
      if (imageToDelete.public_id) {
        await cloudinary.uploader.destroy(imageToDelete.public_id);
      }

      // Remove the image from the MongoDB array and save
      banquet.images.splice(index, 1);
      await banquet.save();

      res.status(200).json({ success: true, message: 'Image deleted successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid image index' });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};