// const { GiftBoxesForBulkOrder, GeneralHandbag, GiftBoxCategory } = require("../../../Models/Tasks/BulkOrder/GiftBoxesForBulkOrder");

// // ✅ Get All Categories
// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await GiftBoxCategory.find();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Create a New Category
// exports.createCategory = async (req, res) => {
//   try {
//     const { name, image } = req.body;

//     // ✅ Validate Base64 Format
//     if (!image.startsWith("data:image/")) {
//       return res.status(400).json({ message: "Invalid image format" });
//     }

//     const category = new GiftBoxCategory({ name, image });
//     await category.save();
//     res.status(201).json(category);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // ✅ Update Category
// exports.updateCategory = async (req, res) => {
//   try {
//     const category = await GiftBoxCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(category);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Delete Category
// exports.deleteCategory = async (req, res) => {
//   try {
//     await GiftBoxCategory.findByIdAndDelete(req.params.id);
//     res.json({ message: "Category deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Get All Gift Boxes
// exports.getAllGiftBoxes = async (req, res) => {
//     try {
//         console.log("fetching giftboxes")
//       const giftBoxes = await GiftBoxesForBulkOrder.find().populate("category", "name");
  
//       // If no gift boxes are found, return an empty array
//       if (!giftBoxes || giftBoxes.length === 0) {
//         return res.status(200).json([]);
//       }
  
//       res.status(200).json(giftBoxes);
//     } catch (error) {
//       // Handle unexpected errors gracefully
//       res.status(500).json({ error: "An error occurred while fetching gift boxes." });
//     }
//   };
  
// // // ✅ Create a New Gift Box (With Base64 Image)
// // exports.createGiftBox = async (req, res) => {
// //   try {
// //     const { categoryId, name, image, description, price, minOrderQuantity, matchingHandbags } = req.body;
// //     const category = await GiftBoxCategory.findById(categoryId);
// //     if (!category) return res.status(400).json({ message: "Invalid category" });

// //     if (!image.startsWith("data:image/")) {
// //       return res.status(400).json({ message: "Invalid image format" });
// //     }

// //     const giftBox = new GiftBoxesForBulkOrder({ category: categoryId, name, image, description, price, minOrderQuantity, matchingHandbags });
// //     await giftBox.save();
// //     res.status(201).json(giftBox);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // };


// exports.createGiftBox = async (req, res) => {
//   try {
//     // Expect the frontend to send:
//     // category: the category _id,
//     // name, image, description, price, minOrderQuantity,
//     // and an optional matchingHandbags array.
//     const { category, name, image, description, price, minOrderQuantity, matchingHandbags } = req.body;

//     // Validate all required fields are provided
//     if (!category || !name || !image || !description || !price || !minOrderQuantity) {
//       return res.status(400).json({ message: "Please provide all required fields." });
//     }

//     // Find the category using the provided ID in 'category'
//     const categoryFound = await GiftBoxCategory.findById(category);
//     if (!categoryFound) {
//       return res.status(400).json({ message: "Invalid category" });
//     }

//     // Validate that the main image is in Base64 format
//     if (typeof image !== "string" || !image.startsWith("data:image/")) {
//       return res.status(400).json({ message: "Invalid image format" });
//     }

//     // Validate matchingHandbags if provided:
//     if (matchingHandbags) {
//       if (!Array.isArray(matchingHandbags)) {
//         return res.status(400).json({ message: "Matching handbags must be an array." });
//       }
//       for (let i = 0; i < matchingHandbags.length; i++) {
//         const mh = matchingHandbags[i];
//         // If an image field is provided in a matching handbag, validate its Base64 format
//         if (mh.image && (typeof mh.image !== "string" || !mh.image.startsWith("data:image/"))) {
//           return res.status(400).json({ message: "Invalid matching handbag image format" });
//         }
//       }
//     }

//     // Create and save the new Gift Box
//     const giftBox = new GiftBoxesForBulkOrder({
//       category,  // using the 'category' field from request
//       name,
//       image,
//       description,
//       price,
//       minOrderQuantity,
//       matchingHandbags: matchingHandbags || []
//     });

//     await giftBox.save();
//     res.status(201).json(giftBox);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// // ✅ Get All General Handbags
// exports.getAllGeneralHandbags = async (req, res) => {
//   try {
//     const handbags = await GeneralHandbag.find().populate("category", "name");
//     res.json(handbags);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };// ✅ Create a General Handbag (With Base64 Image)


// exports.createGeneralHandbag = async (req, res) => {
//   try {
//     // Expecting the frontend to send a field named `category`
//     const { category, name, image, price, minOrderQuantity } = req.body;

//     // Validate all required fields are provided
//     if (!category || !name || !image || !price || !minOrderQuantity) {
//       return res.status(400).json({ message: "Please provide all required fields." });
//     }

//     // Find the category using the provided ID in `category`
//     const categoryFound = await GiftBoxCategory.findById(category);
//     if (!categoryFound) {
//       return res.status(400).json({ message: "Invalid category" });
//     }

//     // Validate that the image is in Base64 format
//     if (typeof image !== "string" || !image.startsWith("data:image/")) {
//       return res.status(400).json({ message: "Invalid image format" });
//     }

//     // Create and save the new General Handbag
//     const handbag = new GeneralHandbag({
//       category, // using the 'category' field from the request
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

// exports.updateGiftBox = async (req, res) => {
//     try {
//       const giftBox = await GiftBoxesForBulkOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
//       if (!giftBox) {
//         return res.status(404).json({ message: "Gift Box not found" });
//       }
  
//       res.json({ message: "Gift Box updated successfully", giftBox });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   exports.deleteGiftBox = async (req, res) => {
//     try {
//       const giftBox = await GiftBoxesForBulkOrder.findByIdAndDelete(req.params.id);
  
//       if (!giftBox) {
//         return res.status(404).json({ message: "Gift Box not found" });
//       }
  
//       res.json({ message: "Gift Box deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   exports.updateGeneralHandbag = async (req, res) => {
//     try {
//       const handbag = await GeneralHandbag.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
//       if (!handbag) {
//         return res.status(404).json({ message: "General Handbag not found" });
//       }
  
//       res.json({ message: "General Handbag updated successfully", handbag });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   exports.deleteGeneralHandbag = async (req, res) => {
//     try {
//       const handbag = await GeneralHandbag.findByIdAndDelete(req.params.id);
  
//       if (!handbag) {
//         return res.status(404).json({ message: "General Handbag not found" });
//       }
  
//       res.json({ message: "General Handbag deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

const { GiftBoxesForBulkOrder, GeneralHandbag, GiftBoxCategory } = require("../../../Models/Tasks/BulkOrder/GiftBoxesForBulkOrder");
const cloudinary = require("../../../utils/cloudinary");

// ✅ Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await GiftBoxCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a New Category (Using Cloudinary file upload)
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload the image from the file
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "giftboxes/categories" });
    const category = new GiftBoxCategory({ 
      name, 
      image: { url: result.secure_url, public_id: result.public_id }
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    // Retrieve the existing category document
    const category = await GiftBoxCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update the text field(s)
    category.name = req.body.name || category.name;

    // If a new file is provided via multer, update the image
    if (req.file) {
      // Delete the old image from Cloudinary if it exists
      if (category.image && category.image.public_id) {
        await cloudinary.uploader.destroy(category.image.public_id);
      }
      // Upload new image to Cloudinary (ensure your folder name is correct)
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "bulkorders/categories",
      });
      category.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    // If no file is provided, do nothing with category.image (it remains intact)

    // Save the updated document
    await category.save();
    res.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Category (Deletes Cloudinary image if available)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await GiftBoxCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (category.image && category.image.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }
    await GiftBoxCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Gift Boxes
exports.getAllGiftBoxes = async (req, res) => {
  try {
    console.log("fetching giftboxes");
    const giftBoxes = await GiftBoxesForBulkOrder.find().populate("category", "name");
    if (!giftBoxes || giftBoxes.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(giftBoxes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching gift boxes." });
  }
};

// ✅ Create a New Gift Box (Using Cloudinary file upload)
// Here we assume that the main image is uploaded via multer as req.file.
// Matching handbags (if any) are expected in req.body as JSON (if needed) or can be updated later.
exports.createGiftBox = async (req, res) => {
  try {
    // Expected fields from frontend: category, name, description, price, minOrderQuantity, and optional matchingHandbags.
    const { category, name, description, price, minOrderQuantity, matchingHandbags } = req.body;
    if (!category || !name || !description || !price || !minOrderQuantity) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }
    const categoryFound = await GiftBoxCategory.findById(category);
    if (!categoryFound) {
      return res.status(400).json({ message: "Invalid category" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Gift Box image file is required" });
    }
    // Upload main image of gift box
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "giftboxes/giftboxes" });
    
    // Process matchingHandbags if provided. (Assume matchingHandbags is a JSON-parsable string.)
    let processedMatchingHandbags = [];
    if (matchingHandbags) {
      let mhs = matchingHandbags;
      if (typeof matchingHandbags === "string") {
        mhs = JSON.parse(matchingHandbags);
      }
      processedMatchingHandbags = mhs;
    }
    
    const giftBox = new GiftBoxesForBulkOrder({
      category,
      name,
      image: { url: result.secure_url, public_id: result.public_id },
      description,
      price,
      minOrderQuantity,
      matchingHandbags: processedMatchingHandbags || []
    });
    await giftBox.save();
    res.status(201).json(giftBox);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get All General Handbags
exports.getAllGeneralHandbags = async (req, res) => {
  try {
    const handbags = await GeneralHandbag.find().populate("category", "name");
    res.json(handbags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a General Handbag (Using Cloudinary file upload)
exports.createGeneralHandbag = async (req, res) => {
  try {
    const { category, name, price, minOrderQuantity } = req.body;
    if (!category || !name || !price || !minOrderQuantity) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }
    const categoryFound = await GiftBoxCategory.findById(category);
    if (!categoryFound) {
      return res.status(400).json({ message: "Invalid category" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Handbag image file is required" });
    }
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "giftboxes/handbags" });
    const handbag = new GeneralHandbag({
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
// ✅ Update Gift Box (Using Cloudinary file update logic)



exports.updateGiftBox = async (req, res) => {
  try {
    // Retrieve the existing gift box document.
    const giftBox = await GiftBoxesForBulkOrder.findById(req.params.id);
    if (!giftBox) {
      return res.status(404).json({ message: "Gift Box not found" });
    }
    
    // Update text fields (only if provided in req.body)
    giftBox.name = req.body.name || giftBox.name;
    giftBox.description = req.body.description || giftBox.description;
    giftBox.price = req.body.price || giftBox.price;
    giftBox.minOrderQuantity = req.body.minOrderQuantity || giftBox.minOrderQuantity;
    giftBox.category = req.body.category || giftBox.category;
    
    // (Optional) If your schema supports sweetsQuantity, update it
    if (req.body.sweetsQuantity) {
      giftBox.sweetsQuantity = req.body.sweetsQuantity;
    }
    
    // Update matching handbags if provided.
    // NOTE: If your client sends matchingHandbags as a JSON string, consider parsing it.
    if (req.body.matchingHandbags) {
      // Ensure that matchingHandbags is set properly.
      // If it is coming as a JSON string, you can do:
      // giftBox.matchingHandbags = JSON.parse(req.body.matchingHandbags);
      // Otherwise, assign directly:
      giftBox.matchingHandbags = req.body.matchingHandbags;
    }
    
    // If a new image file is provided, update the image field.
    if (req.file) {
      // Delete the old Cloudinary image if it exists
      if (giftBox.image && giftBox.image.public_id) {
        await cloudinary.uploader.destroy(giftBox.image.public_id);
      }
      // Upload the new file to Cloudinary.
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "bulkorders/giftBoxes", // Use your desired folder name.
      });
      // Update the image field with Cloudinary's response.
      giftBox.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    // Otherwise, if no file is provided, the giftBox.image remains unchanged.
    
    // Save updates
    await giftBox.save();
    res.json({ message: "Gift Box updated successfully", giftBox });
  } catch (error) {
    console.error("Error updating gift box:", error);
    res.status(500).json({ error: error.message });
  }
};
// ✅ Delete Gift Box (Also deletes Cloudinary image)
exports.deleteGiftBox = async (req, res) => {
  try {
    const giftBox = await GiftBoxesForBulkOrder.findById(req.params.id);
    if (!giftBox) {
      return res.status(404).json({ message: "Gift Box not found" });
    }
    if (giftBox.image && giftBox.image.public_id) {
      await cloudinary.uploader.destroy(giftBox.image.public_id);
    }
    await GiftBoxesForBulkOrder.findByIdAndDelete(req.params.id);
    res.json({ message: "Gift Box deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update General Handbag (Using Cloudinary file update logic)
exports.updateGeneralHandbag = async (req, res) => {
  try {
    const handbag = await GeneralHandbag.findById(req.params.id);
    if (!handbag) {
      return res.status(404).json({ message: "General Handbag not found" });
    }
    handbag.name = req.body.name || handbag.name;
    handbag.price = req.body.price || handbag.price;
    handbag.minOrderQuantity = req.body.minOrderQuantity || handbag.minOrderQuantity;
    handbag.category = req.body.category || handbag.category;
    if (req.file) {
      if (handbag.image && handbag.image.public_id) {
        await cloudinary.uploader.destroy(handbag.image.public_id);
      }
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "giftboxes/handbags" });
      handbag.image = { url: result.secure_url, public_id: result.public_id };
    }
    await handbag.save();
    res.json({ message: "General Handbag updated successfully", handbag });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete General Handbag (Also deletes Cloudinary image)
exports.deleteGeneralHandbag = async (req, res) => {
  try {
    const handbag = await GeneralHandbag.findById(req.params.id);
    if (!handbag) {
      return res.status(404).json({ message: "General Handbag not found" });
    }
    if (handbag.image && handbag.image.public_id) {
      await cloudinary.uploader.destroy(handbag.image.public_id);
    }
    await GeneralHandbag.findByIdAndDelete(req.params.id);
    res.json({ message: "General Handbag deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};