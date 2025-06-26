





// const { 
//   GiftBoxes, 
//   GiftBoxesGeneralHandbags, 
//   GiftBoxesCategory 
// } = require("../../../Models/Tasks/GiftBoxes/GiftBox");

// // ✅ Get All Categories
// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await GiftBoxesCategory.find();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Create a New Category
// exports.createCategory = async (req, res) => {
//   try {
//     const { name, image } = req.body;
//     // ✅ Validate Base64 Format for image field
//     if (!image.startsWith("data:image/")) {
//       return res.status(400).json({ message: "Invalid image format" });
//     }
//     const category = new GiftBoxesCategory({ name, image });
//     await category.save();
//     res.status(201).json(category);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // ✅ Update Category
// exports.updateCategory = async (req, res) => {
//   try {
//     const category = await GiftBoxesCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(category);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Delete Category
// exports.deleteCategory = async (req, res) => {
//   try {
//     await GiftBoxesCategory.findByIdAndDelete(req.params.id);
//     res.json({ message: "Category deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Get All Gift Boxes
// exports.getAllGiftBoxes = async (req, res) => {
//   try {
//     console.log("fetching giftboxes");
//     const giftBoxes = await GiftBoxes.find()
//       .populate("category", "name")
//       .populate("preferredSweets", "name image price");
//     if (!giftBoxes || giftBoxes.length === 0) {
//       return res.status(200).json([]);
//     }
//     res.status(200).json(giftBoxes);
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while fetching gift boxes." });
//   }
// };

// // ✅ Get Single Gift Box by ID (to fetch preferred sweets etc.)
// exports.getGiftBoxById = async (req, res) => {
//   try {
//     const giftBox = await GiftBoxes.findById(req.params.id)
//       .populate("preferredSweets", "name image price"); // populate preferred sweets details
//     if (!giftBox) {
//       return res.status(404).json({ message: "Gift box not found" });
//     }
//     res.status(200).json(giftBox);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ✅ Create a New Gift Box (with sweets fields)
// exports.createGiftBox = async (req, res) => {
//   try {
//     // Expected fields from frontend:
//     // category, name, image, description, price, minOrderQuantity, 
//     // matchingHandbags (Array, optional),
//     // sweetsQuantity, and preferredSweets (Array of ObjectIds).
//     const { 
//       category, 
//       name, 
//       image, 
//       description, 
//       price, 
//       minOrderQuantity, 
//       matchingHandbags,
//       sweetsQuantity,
//       preferredSweets
//     } = req.body;

//     if (!category || !name || !image || !description || !price || !minOrderQuantity) {
//       return res.status(400).json({ message: "Please provide all required fields." });
//     }

//     const categoryFound = await GiftBoxesCategory.findById(category);
//     if (!categoryFound) {
//       return res.status(400).json({ message: "Invalid category" });
//     }

//     if (typeof image !== "string" || !image.startsWith("data:image/")) {
//       return res.status(400).json({ message: "Invalid image format" });
//     }

//     if (matchingHandbags) {
//       if (!Array.isArray(matchingHandbags)) {
//         return res.status(400).json({ message: "Matching handbags must be an array." });
//       }
//       for (let i = 0; i < matchingHandbags.length; i++) {
//         const mh = matchingHandbags[i];
//         if (mh.image && (typeof mh.image !== "string" || !mh.image.startsWith("data:image/"))) {
//           return res.status(400).json({ message: "Invalid matching handbag image format" });
//         }
//       }
//     }

//     if (sweetsQuantity && isNaN(sweetsQuantity)) {
//       return res.status(400).json({ message: "sweetsQuantity should be a number." });
//     }
//     if (preferredSweets && !Array.isArray(preferredSweets)) {
//       return res.status(400).json({ message: "preferredSweets must be an array." });
//     }

//     console.log("Preferred Sweets:", preferredSweets);

//     const giftBox = new GiftBoxes({
//       category,
//       name,
//       image,
//       description,
//       price,
//       minOrderQuantity,
//       matchingHandbags: matchingHandbags || [],
//       sweetsQuantity: sweetsQuantity || 0,
//       preferredSweets: preferredSweets || [],
//     });

//     await giftBox.save();
//     res.status(201).json(giftBox);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // ✅ Update Gift Box (updates sweets fields as well)
// exports.updateGiftBox = async (req, res) => {
//   try {
//     const giftBox = await GiftBoxes.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!giftBox) {
//       return res.status(404).json({ message: "Gift Box not found" });
//     }
//     res.json({ message: "Gift Box updated successfully", giftBox });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Delete Gift Box
// exports.deleteGiftBox = async (req, res) => {
//   try {
//     const giftBox = await GiftBoxes.findByIdAndDelete(req.params.id);
//     if (!giftBox) {
//       return res.status(404).json({ message: "Gift Box not found" });
//     }
//     res.json({ message: "Gift Box deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Get All General Handbags
// exports.getAllGeneralHandbags = async (req, res) => {
//   try {
//     const handbags = await GiftBoxesGeneralHandbags.find().populate("category", "name");
//     res.json(handbags);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Create a New General Handbag
// exports.createGeneralHandbag = async (req, res) => {
//   try {
//     const { category, name, image, price, minOrderQuantity } = req.body;
//     if (!category || !name || !image || !price || !minOrderQuantity) {
//       return res.status(400).json({ message: "Please provide all required fields." });
//     }
//     const categoryFound = await GiftBoxesCategory.findById(category);
//     if (!categoryFound) {
//       return res.status(400).json({ message: "Invalid category" });
//     }
//     if (typeof image !== "string" || !image.startsWith("data:image/")) {
//       return res.status(400).json({ message: "Invalid image format" });
//     }
//     const handbag = new GiftBoxesGeneralHandbags({
//       category,
//       name,
//       image,
//       price,
//       minOrderQuantity,
//     });
//     await handbag.save();
//     res.status(201).json(handbag);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // ✅ Update General Handbag
// exports.updateGeneralHandbag = async (req, res) => {
//   try {
//     const handbag = await GiftBoxesGeneralHandbags.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!handbag) {
//       return res.status(404).json({ message: "General Handbag not found" });
//     }
//     res.json({ message: "General Handbag updated successfully", handbag });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Delete General Handbag
// exports.deleteGeneralHandbag = async (req, res) => {
//   try {
//     const handbag = await GiftBoxesGeneralHandbags.findByIdAndDelete(req.params.id);
//     if (!handbag) {
//       return res.status(404).json({ message: "General Handbag not found" });
//     }
//     res.json({ message: "General Handbag deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const { 
  GiftBoxes, 
  GiftBoxesGeneralHandbags, 
  GiftBoxesCategory 
} = require("../../../Models/Tasks/GiftBoxes/GiftBox");
const cloudinary = require("../../../utils/cloudinary");

// ✅ Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await GiftBoxesCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a New Category (Image upload via Cloudinary)
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "Category image is required" });
    }
    
    // Upload image to Cloudinary (folder: categories)
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "categories" });
    
    const category = new GiftBoxesCategory({ 
      name, 
      image: { url: result.secure_url, public_id: result.public_id } 
    });
    
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Update Category (handles image update)
exports.updateCategory = async (req, res) => {
  try {
    const category = await GiftBoxesCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    
    let updatedImage = category.image;
    if (req.file) {
      // Delete the old Cloudinary image
      await cloudinary.uploader.destroy(category.image.public_id);
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "categories" });
      updatedImage = { url: result.secure_url, public_id: result.public_id };
    }
    
    category.name = req.body.name || category.name;
    category.image = updatedImage;
    
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Category (also removes Cloudinary image)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await GiftBoxesCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    
    await cloudinary.uploader.destroy(category.image.public_id);
    await GiftBoxesCategory.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Gift Boxes (with population)
exports.getAllGiftBoxes = async (req, res) => {
  try {
    const giftBoxes = await GiftBoxes.find()
      .populate("category", "name")
      .populate("preferredSweets", "name image price");
    res.status(200).json(giftBoxes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching gift boxes." });
  }
};

// ✅ Get Single Gift Box by ID (to fetch preferred sweets details)
exports.getGiftBoxById = async (req, res) => {
  try {
    const giftBox = await GiftBoxes.findById(req.params.id)
      .populate("preferredSweets", "name image price");
    if (!giftBox) {
      return res.status(404).json({ message: "Gift box not found" });
    }
    res.status(200).json(giftBox);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Create a New Gift Box (with sweets and matching handbags)
exports.createGiftBox = async (req, res) => {
  try {
    const { 
      category, 
      name, 
      description, 
      price, 
      minOrderQuantity, 
      matchingHandbags, 
      sweetsQuantity, 
      preferredSweets 
    } = req.body;
    
    if (!category || !name || !req.file || !description || !price || !minOrderQuantity) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }
    
    const categoryFound = await GiftBoxesCategory.findById(category);
    if (!categoryFound) {
      return res.status(400).json({ message: "Invalid category" });
    }
    
    // Upload gift box image to Cloudinary (folder: gift_boxes)
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "gift_boxes" });
    
    const giftBox = new GiftBoxes({
      category,
      name,
      image: { url: result.secure_url, public_id: result.public_id },
      description,
      price,
      minOrderQuantity,
      matchingHandbags: matchingHandbags || [],
      sweetsQuantity: sweetsQuantity || 0,
      preferredSweets: preferredSweets || []
    });
    
    await giftBox.save();
    res.status(201).json(giftBox);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// // ✅ Update Gift Box (handles image updates)
// exports.updateGiftBox = async (req, res) => {
//   try {
//     // Retrieve the existing gift box document
//     const giftBox = await GiftBoxes.findById(req.params.id);
//     if (!giftBox) {
//       return res.status(404).json({ message: "Gift Box not found" });
//     }
    
//     // Prepare updatedImage by keeping the existing image
//     let updatedImage = giftBox.image;
    
//     // If a new file is provided, process the image update
//     if (req.file) {
//       // Only destroy the previous image if it exists and has a public_id
//       if (giftBox.image && giftBox.image.public_id) {
//         await cloudinary.uploader.destroy(giftBox.image.public_id);
//       }
//       // Upload the new file to Cloudinary using the intended folder
//       const result = await cloudinary.uploader.upload(req.file.path, { folder: "bulkorders/giftBoxes" });
//       updatedImage = { url: result.secure_url, public_id: result.public_id };
//     }
    
//     // Update text fields if provided; else leave unchanged
//     giftBox.name = req.body.name || giftBox.name;
//     giftBox.description = req.body.description || giftBox.description;
//     giftBox.price = req.body.price || giftBox.price;
//     giftBox.minOrderQuantity = req.body.minOrderQuantity || giftBox.minOrderQuantity;
//     giftBox.category = req.body.category || giftBox.category;
    
//     // If matchingHandbags is provided, try to parse it (it could be a JSON string)
//     if (req.body.matchingHandbags) {
//       try {
//         giftBox.matchingHandbags = (typeof req.body.matchingHandbags === "string")
//           ? JSON.parse(req.body.matchingHandbags)
//           : req.body.matchingHandbags;
//       } catch (parseError) {
//         console.error("Error parsing matchingHandbags:", parseError);
//         giftBox.matchingHandbags = []; // Fallback to an empty array
//       }
//     }
    
//     giftBox.sweetsQuantity = req.body.sweetsQuantity || giftBox.sweetsQuantity;
//     giftBox.preferredSweets = req.body.preferredSweets || giftBox.preferredSweets;
    
//     // Always update the image field only if a new image was provided,
//     // otherwise preserve the existing valid image data.
//     giftBox.image = updatedImage;
    
//     // Save the updated document
//     await giftBox.save();
//     res.json({ message: "Gift Box updated successfully", giftBox });
//   } catch (error) {
//     // Log detailed error info to help with debugging
//     console.error("Error updating gift box in controller:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// controllers/giftBoxController.js



exports.updateGiftBox = async (req, res) => {
  try {
    // 1) Fetch your doc
    const giftBox = await GiftBoxes.findById(req.params.id);
    if (!giftBox) {
      return res.status(404).json({ message: 'Gift Box not found' });
    }

    // 2) Determine the final image object:
    let newImageObj;

    // A) If the client uploaded a new file
    if (req.file) {
      // destroy previous if you have its public_id
      if (giftBox.image?.public_id) {
        await cloudinary.uploader.destroy(giftBox.image.public_id);
      }
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: 'bulkorders/giftBoxes'
      });
      newImageObj = {
        url: uploadRes.secure_url,
        public_id: uploadRes.public_id
      };
    }
    // B) Else if the DB currently stores image as a raw string (legacy)
    else if (typeof giftBox.image === 'string') {
      const uploadRes = await cloudinary.uploader.upload(giftBox.image, {
        folder: 'bulkorders/giftBoxes'
      });
      newImageObj = {
        url: uploadRes.secure_url,
        public_id: uploadRes.public_id
      };
    }
    // C) Else if you already have a valid object, keep it
    else if (
      giftBox.image &&
      typeof giftBox.image === 'object' &&
      giftBox.image.url &&
      giftBox.image.public_id
    ) {
      newImageObj = giftBox.image;
    }

    // Assign final image only if we resolved one
    if (newImageObj) {
      giftBox.image = newImageObj;
    }

    // 3) Update other fields (only override if provided)
    giftBox.name             = req.body.name             ?? giftBox.name;
    giftBox.description      = req.body.description      ?? giftBox.description;
    giftBox.category         = req.body.category         ?? giftBox.category;
    giftBox.price            = req.body.price
                                 ? Number(req.body.price)
                                 : giftBox.price;
    giftBox.minOrderQuantity = req.body.minOrderQuantity
                                 ? Number(req.body.minOrderQuantity)
                                 : giftBox.minOrderQuantity;
    giftBox.sweetsQuantity   = req.body.sweetsQuantity
                                 ? Number(req.body.sweetsQuantity)
                                 : giftBox.sweetsQuantity;

    // 4) preferredSweets → parse array or string
    if (req.body.preferredSweets) {
      let ps = req.body.preferredSweets;
      if (typeof ps === 'string') {
        ps = JSON.parse(ps);
      }
      giftBox.preferredSweets = Array.isArray(ps) ? ps : [ps];
    }

    // 5) matchingHandbags → same parsing
    if (req.body.matchingHandbags) {
      let mh = req.body.matchingHandbags;
      if (typeof mh === 'string') {
        mh = JSON.parse(mh);
      }
      giftBox.matchingHandbags = Array.isArray(mh) ? mh : [mh];
    }

    // 6) Save & respond
    await giftBox.save();
    res.json({ success: true, message: 'Gift Box updated', giftBox });
  } catch (err) {
    console.error('Error in updateGiftBox:', err);
    res.status(500).json({ message: err.message });
  }
};
// ✅ Delete Gift Box (removes Cloudinary image)
exports.deleteGiftBox = async (req, res) => {
  try {
    const giftBox = await GiftBoxes.findById(req.params.id);
    if (!giftBox) return res.status(404).json({ message: "Gift Box not found" });
    
    await cloudinary.uploader.destroy(giftBox.image.public_id);
    await GiftBoxes.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Gift Box deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All General Handbags
exports.getAllGeneralHandbags = async (req, res) => {
  try {
    const handbags = await GiftBoxesGeneralHandbags.find().populate("category", "name");
    res.json(handbags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a New General Handbag (with Cloudinary image upload)
exports.createGeneralHandbag = async (req, res) => {
  try {
    const { category, name, price, minOrderQuantity } = req.body;
    if (!category || !name || !req.file || !price || !minOrderQuantity) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }
    
    const categoryFound = await GiftBoxesCategory.findById(category);
    if (!categoryFound) return res.status(400).json({ message: "Invalid category" });
    
    // Upload handbag image to Cloudinary (folder: handbags)
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "handbags" });
    
    const handbag = new GiftBoxesGeneralHandbags({
      category,
      name,
      image: { url: result.secure_url, public_id: result.public_id },
      price,
      minOrderQuantity,
    });
    
    await handbag.save();
    res.status(201).json(handbag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Update General Handbag (handles image update)
exports.updateGeneralHandbag = async (req, res) => {
  try {
    const handbag = await GiftBoxesGeneralHandbags.findById(req.params.id);
    if (!handbag) return res.status(404).json({ message: "General Handbag not found" });
    
    let updatedImage = handbag.image;
    if (req.file) {
      await cloudinary.uploader.destroy(handbag.image.public_id);
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "handbags" });
      updatedImage = { url: result.secure_url, public_id: result.public_id };
    }
    
    handbag.name = req.body.name || handbag.name;
    handbag.price = req.body.price || handbag.price;
    handbag.minOrderQuantity = req.body.minOrderQuantity || handbag.minOrderQuantity;
    if (req.body.category) {
      handbag.category = req.body.category;
    }
    handbag.image = updatedImage;
    
    await handbag.save();
    res.json({ message: "General Handbag updated successfully", handbag });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete General Handbag (removes Cloudinary image)
exports.deleteGeneralHandbag = async (req, res) => {
  try {
    const handbag = await GiftBoxesGeneralHandbags.findById(req.params.id);
    if (!handbag) return res.status(404).json({ message: "General Handbag not found" });
    
    await cloudinary.uploader.destroy(handbag.image.public_id);
    await GiftBoxesGeneralHandbags.findByIdAndDelete(req.params.id);
    
    res.json({ message: "General Handbag deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};